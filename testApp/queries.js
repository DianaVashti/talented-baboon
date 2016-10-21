var promise = require('bluebird');

var options = {
  promiseLib: promise
};

var pgp = require('pg-promise')(options);
var connectionString = 'postgres://localhost:5432/puppies2';
var db = pgp(connectionString);

function getAllPuppies(req, res, next) {
  db.any('SELECT pups.name, pupFur.length FROM pups JOIN pupFur ON pups.name=pupFur.name')
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved ALL puppies'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function getSinglePuppy(req, res, next) {
  var pupID = parseInt(req.params.id);
  db.one('SELECT * FROM pups WHERE id = $1', pupID)
    .then(function ( data ) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved ONE puppy'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function createPuppy(req, res, next) {
  req.body.age = parseInt(req.body.age);
  db.none('INSERT INTO pups(name, breed, age, sex)' +
            'values(${name}, ${breed}, ${age}, ${sex})',
          req.body)
          .then(function () {
            res.status(200)
              .json({
                status: 'success',
                message: 'Inserted one puppy'
              });
          })
          .catch(function (err) {
            return next(err);
          })
}

function updatePuppy(req, res, next) {
  db.none('UPDATE pups SET name=$1, breed=$2, age=$3, sex=$4 WHERE id=$5',
    [req.body.name, req.body.breed, parseInt(req.body.age),
      req.body.sex, parseInt(req.params.id)])
      .then(function () {
        res.status(200)
          .json({
            status: 'success',
            message: 'Updated puppy'
          });
      })
      .catch(function (err) {
        return next(err);
      });
}

function removePuppy(req, res, next) {
  var pupID = parseInt(req.params.id);
  db.result('DELETE FROM pups WHERE id = $1', pupID)
    .then(function (result) {
      res.status(200)
        .json({
          status: 'success',
          message: `Removed ${result.rowCount} puppy`
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

module.exports = {
  getAllPuppies: getAllPuppies,
  getSinglePuppy: getSinglePuppy,
  createPuppy: createPuppy,
  updatePuppy: updatePuppy,
  removePuppy: removePuppy
};
