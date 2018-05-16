# Hack Points
A bounty system where users can create and complete tasks to win points.
All users' points are added together to make up the Groups total points.


### Project setup:
* Download mongodb
* start `mongod --dbpath=<path to data>`  make sure this continues to run in the background
* navigate to project root and run `npm install` to install dependencies
* create a `.env` to store environmental variables:
    > GITHUB_KEY=
    >
    > GITHUB_SECRET=
    >
    > SLACK_KEY=
    >
    > SLACK_SECRET=
    >
    > MONGO_URI=mongodb://localhost:27017/hackerpoints
    >
    > PORT=8080
    >
    > APP_URL=http://localhost:8080/

You will need to setup an oauth token with [slack](https://api.slack.com/docs/oauth)


* run `npm run dev` to spin up the webserver



### TODO:
Create key based api on /api/users/ and /api/bounties/
Create workflow for creation/approval/completion of a bounty
Create view for bounties
Update manifest.json

### Flow:
A user creates a bounty.
Bounties get posted to a board of all bounties
User can chose to claim a bounty once completed

### Feature Goals:
Leaderboard
Total Points for the entire group is visible at all times.
The group can set goals for when a milestone is reached
request training buttons
badges -- e.g. qualified laser user


### API
`/api/v1/` -- returns information about current logged on users
`/api/v1/bounties/` -- returns all bounties
