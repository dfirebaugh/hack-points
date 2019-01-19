# Hack Points
A bounty system where users can create and complete tasks to win points.
All users' points are added together to make up the Groups total points.

[demo](http://dfirebaugh.github.io/hack-points)

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
    > APP_URL=/

You will need to setup an oauth token with
[slack](https:/api.slack.com/docs/oauth)


* run `npm run dev` to spin up the webserver



### User Stories
 - user logs in and sees a board full of bounties
 - user can +1 a bounty to increase it's weight -- can only do this once per bounty
 - user can comment on a bounty
 - user can create a bounty -- bounties are created with one point/weight value
 - when a user completes a bounty, those points get added to users score

 - as bounties gain weight/point value, they get fatter in the UI

 - teams total score can be calculated by adding up all points and is visible at all times
