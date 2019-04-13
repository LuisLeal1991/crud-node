import express from 'express';
import path from 'path';
import 'dotenv/config';


const app = express();
const router = express.Router();


router.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/public/index.html'));
});


router.get('/pelicula/nueva', function(req, res) {
  res.sendFile(path.join(__dirname + '/public/add.html'));
});


router.get('/pelicula/editar/:id', function(req, res) {
  res.sendFile(path.join(__dirname + '/public/edit.html'));
});


router.get('/pelicula/ver/:id', function(req, res) {
  res.sendFile(path.join(__dirname + '/public/pelicula.html'));
});


//add the router
app.use('/', router);
app.listen(process.env.PORT || 3001, function() {
  console.log(`Running at Port ${process.env.PORT}`);
});


app.use("/public", express.static(__dirname + '/public'));

