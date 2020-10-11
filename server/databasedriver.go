package main
import (
	"context"
	"errors"
	"fmt"
	"log"
	"os"

	"github.com/jackc/pgx"
	"github.com/jackc/pgx/v4/pgxpool"
)

func postgreSQLDatabase() (*pgxpool.Pool, error) {
	conn, err := pgxpool.Connect(context.Background(), os.Getenv("DATABASE_URL"))
	if err != nil {
		fmt.Fprintf(os.Stderr, "Unable to connect to database: %v\n", err)
		os.Exit(1)
	}

	fmt.Println("Successfully connected!")
	return conn, err
}

// NewDB - sets up connection pool so that we can connect to the db in a
//   concurrently safe manner
func NewDB() (*Database, error) {
	var err error

	db := &Database{}

	connection, err := postgreSQLDatabase()
	if err != nil {
		return db, err
	}

	db.pool = connection

	return db, nil
}

// GetStatuses returns a list of possible statuses
func (db *Database) GetStatuses() []string {
	rows, err := db.pool.Query(context.Background(), getStatusQuery)
	if err != nil {
		log.Fatalf("conn.Query failed: %v", err)
	}

	defer rows.Close()

	var statusList []string

	// Iterate through the result set
	for rows.Next() {
		var id int32
		var status string
		err = rows.Scan(&status, &id)
		if err != nil {
			log.Fatal(err)
		}

		statusList = append(statusList, status)
	}

	return statusList
}

// GetBounty - returns bounty based on id
func (db *Database) GetBounty(id string, bounties *[]Bounty) error {
	var err error

	if len(id) == 0 {
		rows, err := db.pool.Query(context.Background(), getAllBountyQuery)
		if err != nil {
			return err
		}

		// Iterate through the result set
		for rows.Next() {
			b := Bounty{}
			err = rows.Scan(
				&b.Title, &b.Message, &b.DateCreated, &b.Deadline, &b.CurrentStatusID,
				&b.DateCompleted, &b.BountyID, &b.EndorsementCount, &b.Endorsements)
			if err != nil {
				log.Fatal(err)
			}

			*bounties = append(*bounties, b)
		}

	} else {
		b := Bounty{}
		db.pool.QueryRow(context.Background(), getBountyQuery, id).Scan(&b.Title, &b.Message, &b.DateCreated, &b.Deadline, &b.CurrentStatusID, &b.DateCompleted, &b.BountyID, &b.EndorsementCount, &b.Endorsements)
		if err != nil {
			return err
		}

		if b.BountyID == 0 {
			return errors.New("no bounty found")
		}

		*bounties = append(*bounties, b)
	}

	return nil
}

// CreateBounty - Creates a bounty in the db
func (db *Database) CreateBounty(b *Bounty) (Bounty, error) {
	nb := Bounty{}

	row := db.pool.QueryRow(context.Background(), createBountyQuery, b.Title, b.Message, b.Deadline).Scan(&nb.Title, &nb.Message, &nb.DateCreated, &nb.Deadline, &nb.CurrentStatusID, &nb.DateCompleted, &nb.BountyID)

	if row == pgx.ErrNoRows {
		return nb, errors.New("no rows affected")
	}
	return nb, nil
}

// UpdateBounty - Updates a bounty in the db
func (db *Database) UpdateBounty(id string, ub *Bounty) (Bounty, error) {
	var nb Bounty
	var bounties []Bounty

	// get the current values
	err := db.GetBounty(id, &bounties)

	if err != nil {
		return nb, err
	}

	b := BountyMerge(bounties[0], *ub)

	err = db.pool.QueryRow(
		context.Background(), updateBountyQuery,
		b.BountyID, b.Title, b.Message, b.CurrentStatusID).Scan(
		&nb.Title, &nb.Message, &nb.DateCreated, &nb.Deadline, &nb.CurrentStatusID,
		&nb.DateCompleted, &nb.BountyID, &b.EndorsementCount, &b.Endorsements)

	if err != nil {
		return nb, err
	}

	return nb, nil
}

// EndorseBounty - user Endorse a bounty in the db
func (db *Database) EndorseBounty(id string) (Bounty, error) {
	var bounty Bounty

	// temp
	userID := 1

	_, err := db.pool.Query(context.Background(), endorseBountyQuery, userID, id)
	if err != nil {
		return bounty, err
	}

	return bounty, err
}

// RemoveEndorseBounty - user Endorse a bounty in the db
func (db *Database) RemoveEndorseBounty(id string) (Bounty, error) {
	var bounty Bounty

	// temp
	userID := 1

	_, err := db.pool.Query(context.Background(), removeEndorseBountyQuery, userID, id)
	if err != nil {
		return bounty, err
	}

	return bounty, err
}

// DeleteBounty - Deletes a bounty in the db
func (db *Database) DeleteBounty(id string) ([]Bounty, error) {
	var bounties []Bounty

	_, err := db.pool.Query(context.Background(), deleteBountyQuery, id)
	if err != nil {
		return bounties, err
	}

	return bounties, err
}
