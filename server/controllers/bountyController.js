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
    Bounty.findOne({ _id: req.params.bountyid }, (err, doc) => {
      if (String(req.user.id) === String(doc.createdBy.id)) {
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
      }
      else {
        res.json({
          message: "You do not own this bounty!"
        })
      }
    })
  },
  update: (req, res) => {
    const bountyUpdate = {}

    if (req.body.title) {
      bountyUpdate.title = req.body.title;
    }

    if (req.body.mess) {
      bountyUpdate.message = req.body.message;
    }

    if (req.body.status) {
      bountyUpdate.status = req.body.status;
    }

    Bounty.findOne({ _id: req.params.bountyid }, (err, doc) => {
      if (!doc.dateCompleted) {
        if (String(req.user.id) === String(doc.createdBy.id)) {
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
      }
    })

  },
  complete: (req, res) => {
    const bountyUpdate = {
      completedBy: req.body.createdById,
      status: "COMPLETED",
      dateCompleted: Date.now()
    }
    Bounty.findOne({ _id: req.params.bountyid }, (err, doc) => {
      if (!doc.dateCompleted) {
        if (String(req.user.id) === String(doc.createdBy.id)) {
          Bounty.update({ _id: req.params.bountyid }, bountyUpdate, (err, raw) => {
            if (err) {
              res.send(err);
            }
            // save the bounty
            res.json({
              message: `Bounty Completed By -- ${req.body.createdById}!`,
              update: raw
            });
          })
        }
      }
    })
  },
  submit: (req, res) => {
    const submissionMessage = {
      message: req.body.message,
      user: req.user.id,
      date: Date.now()
    }

    Bounty.update({ _id: req.params.bountyid },
      {
        $push: { submissionBoard: submissionMessage }
      }, (err, raw) => {
        if (err) {
          res.send({ message: err });
        }
        // save the bounty
        res.json(submissionMessage)
      })
  },
  toggleEndorse: (req, res) => {
    //find bounty add user to the endorsements array
    Bounty.findById(req.params.bountyid, (err, doc) => {
      err && res.json({ message: err });

      const endorsed = doc.endorsements.includes(req.user.id)
      endorsed ?
        doc.endorsements.splice(doc.endorsements.indexOf(req.user.id), 1) :
        doc.endorsements.push(req.user.id);
      doc.save((err, result) => {
        if (err) {
          res.json({
            message: err.message,
            err: err.message,
            id: doc.id,
          });
        } else {
          const message = endorsed ? 'Removing endorsement!' : 'Adding endorsement!'
          res.json({
            message: message,
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
          message: err.message,
          id: bounty.id,
        });
      } else {
        res.json({
          message: 'Bounty created!',
          id: bounty.id,
        });
      }
    });
  }
}