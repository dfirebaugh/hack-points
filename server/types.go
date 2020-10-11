package main
import (
	"time"

	"github.com/jackc/pgx/v4/pgxpool"
)

// Database - connection pool to communicate to the db
//  in a concurrently safe manner
type Database struct {
	pool *pgxpool.Pool
}

// Bounty is a task that someone can do
//   users endorse a bounty to increase it's importance
type Bounty struct {
	Title            string
	Message          string
	DateCreated      time.Time
	Deadline         time.Time
	CurrentStatusID  uint8
	DateCompleted    NullTime
	BountyID         uint
	Endorsements     []uint
	EndorsementCount uint8
}

type OperationType string

const (
	Update            OperationType = "update"
	Create                          = "create"
	Endorse                         = "endorse"
	RemoveEndorsement               = "removeEndorsement"
)
