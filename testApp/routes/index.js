var express = require('express');
var router = express.Router();

var db = require('../queries');

router.get('/', function(req, res){
  res.render('index', {
  });
  return;
})

router.get('/api/puppies', db.getAllPuppies);
router.get('/api/puppies/name', db.getSinglePuppy);
router.post('/api/puppies', db.createPuppy);
router.put('/api/puppies/:id', db.updatePuppy);
router.delete('/api/puppies/:id', db.removePuppy);

module.exports = router;
