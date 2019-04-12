const express = require('express');
const app = express();
const path = require('path');

const router = express.Router();

router.get('/', function(req,res) {
  res.sendFile(path.join(__dirname+'/index.html'));
});


router.get('/pelicula/nueva', function(req, res) {
  res.sendFile(path.join(__dirname + '/add.html'));
});



router.get('/pelicula/:id', function(req, res) {
  res.sendFile(path.join(__dirname + '/pelicula.html'));
});




//add the router
app.use('/', router);
app.listen(process.env.port || 3001);


app.use("/public", express.static(__dirname + '/public'));

console.log('Running at Port 3000');
console.log("__dirname")
console.log(__dirname)