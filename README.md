# Hack Points
A bounty system where users can create and complete tasks to win points.
All users' points are added together to make up the Groups total points.

[demo](http://dfirebaugh.github.io/hack-points)

### Project setup:
* run command `docker-compose up --build` to start the app


### User Stories
 - user logs in and sees a board full of bounties
 - user can +1 a bounty to increase it's weight -- can only do this once per bounty
 - user can comment on a bounty
 - user can create a bounty -- bounties are created with one point/weight value
 - when a user completes a bounty, those points get added to users score

 - as bounties gain weight/point value, they get fatter in the UI

 - teams total score can be calculated by adding up all points and is visible at all times
