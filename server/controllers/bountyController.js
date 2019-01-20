const Bounty = require('../models/bounties');
const ObjectID = require('mongodb').ObjectID;
module.exports = {
  get: (req, res) => {
    Bounty.findById(req.params.bountyid, (err, doc) => {
      if (err) res.send(err);
      res.json(doc);
    });
  },
  getAll: (req, res) => {
    Bounty.find({}, (err, doc) => {
      res.send(doc);
    })
  },
  delete: (req, res) => {
    Bounty.findOneAndDelete(
      {
        _id: req.params.bountyid,
      },
      (err, bounty) => {
        if (err) return res.status(500).send(err);
        const response = {
          message: "Bounty successfully deleted",
          id: req.params.bountyid
        };
        return res.status(200).send(response);
      })
  },
  update: (req, res) => {
    const bountyUpdate = {
      title: req.body.title,
      message: req.body.message
    }

    Bounty.findOne({ _id: req.params.bountyid }, (err, doc) => {
      if (req.user.id !== doc.createdBy.id) {
        Bounty.update({ _id: req.params.bountyid }, bountyUpdate, (err, raw) => {
          if (err) {
            res.send(err);
          }
          // save the bounty
          res.json({
            message: 'Bounty updated!',
            update: raw
          });
        })
      }
      else {
        res.json({
          message: 'you did not create this bounty'
        })
      }
    })

  },
  endorse: (req, res) => {
    //find bounty add user to the endorsements array
    Bounty.findById(req.params.bountyid, (err, doc) => {
      err && res.send(err);
      doc.endorsements.includes(req.body.username) === false &&
        doc.endorsements.push(req.body.username)
      doc.save((err, result) => {
        if (err) {
          res.json({
            err: err.message,
            id: doc.id,
          });
        } else {
          res.json({
            message: 'Bounty point value has been decreased by one!',
            id: doc.id,
            endorsements: doc.endorsements
          });
        }
      });
    })
  },
  removeEndorse: (req, res) => {
    //find bounty remove user to the endorsements array
    Bounty.findById(req.params.bountyid, (err, doc) => {
      err && res.send(err);
      doc.endorsements.includes(req.body.username) === true &&
        doc.endorsements.splice(doc.endorsements.indexOf(req.body.username), 1)

      doc.save((err, result) => {
        if (err) {
          res.json({
            err: err.message,
            id: doc.id,
          });
        } else {
          res.json({
            message: 'Bounty point value has been decreased by one!',
            id: doc.id,
            endorsements: doc.endorsements
          });
        }
      });
    })
  },
  post: (req, res) => {
    const { name, email, img, _id } = req.user;
    let bounty = new Bounty({
      title: req.body.title,
      message: req.body.message,
      status: req.body.status,
      pointValue: req.body.pointValue,
      createdBy: {
        name,
        email,
        img,
        id: _id
      },//req.body.createdBy,
      createdIcon: req.body.createdIcon,
      endorsements: []
    });

    bounty.save((err, result) => {
      if (err) {
        res.json({
          err: err.message,
          id: bounty.id,
        });
      } else {
        res.json({
          message: 'success!',
          id: bounty.id,
        });
      }
    });
  }
}