package main

const getStatusQuery = `SELECT status, id FROM hackpoints.statuses LIMIT 20;`

const getBountyQuery = `SELECT * FROM hackpoints.bounty_v where bounty_id = $1 LIMIT 1000;`

const getAllBountyQuery = `SELECT * FROM hackpoints.bounty_v LIMIT 1000;`

const createBountyQuery = `INSERT INTO hackpoints.bounties(
	title, message, deadline, date_created, current_status_id)
	VALUES ($1, $2, $3, $3, 1);`

const updateBountyQuery = `
--WITH updated AS (
	UPDATE hackpoints.bounties
	SET title=$2, message=$3, current_status_id=$4
	WHERE bounty_id = $1
--	RETURNING *)
--SELECT bounty_v.*
--	FROM updated 
--	INNER JOIN hackpoints.bounty_v ON updated.bounty_id = bounty_v.bounty_id;
	`

const deleteBountyQuery = `DELETE FROM hackpoints.bounties
WHERE bounty_id = $1;`

const endorseBountyQuery = `INSERT INTO hackpoints.bounty_endorsements(
	user_id, bounty_id)
	VALUES ($1, $2);`

const removeEndorseBountyQuery = `DELETE
FROM hackpoints.bounty_endorsements
where user_id = $1 and bounty_id = $2;`
