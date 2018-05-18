# Hack Points
A bounty system where users can create and complete tasks to win points.
All users' points are added together to make up the Groups total points.


### Project setup:
* Download [mongodb](https://www.mongodb.com/download-center#community)
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

You will need to setup an oauth token with
[slack](https://api.slack.com/docs/oauth)


* run `npm run dev` to spin up the webserver



### TODO:
Fix user Auth -- maybe add local auth
Create key based api on /api/v1/users/ and /api/v1/bounties/
Create workflow for creation/approval/completion of a bounty
Create view for bounties
Update manifest.json

### Flow:
A user creates a bounty.
Bounties get posted to a board of all bounties
When a Bounty is completed, the user who completed it gains points from the bounty

### Feature Goals:
Total Points Bar for the entire group is visible at all times.
Drag and Drop bounties to change the bounties state/status
Leaderboard
The group can set goals for when a milestone is reached
Request training buttons
Badges -- e.g. qualified laser user


### API
`/api/v1/` -- returns information about current logged on users

`/api/v1/bounties/` -- returns all bounties
