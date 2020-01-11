var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
/*var db = {
  company:{
    name,address
  },
  location:[
    {
      "Containment Sump ID":"REG STP",
      "Containment Sump Material":"POLY"
    }
  ]
}*/