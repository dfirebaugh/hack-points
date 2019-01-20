const User = require('../models/users');

module.exports = {
  getAll: (req, res) => {
    User.find({}, (err, doc) => res.send(doc))
  },
  getMe: (req, res) => {
    const { name, email, img, _id } = req.user;
    res.send({
      name,
      email,
      img,
      id: _id
    });
  },
  getUser: (req, res) => {
    User.findById(req.params.id, (err, doc) => res.send(doc))
  },
  getTotalPoints: (req, res) => {
    User.find({}, (err, doc) => {
      let arr = doc.map(x => x.hackPoints).filter(x => typeof x === "number")
      res.send({
        //summing up all the hackpoints
        totalHackPoints: arr.reduce((acc, value) => acc + value),
      });
    })
  }
}