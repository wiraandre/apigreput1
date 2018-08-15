const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');

//Cara menggunakan package cors dan body pasrser

//untuk komunikasi antar server
app.use(cors());

//untuk membaca API yang kita buat dan membaca data yang dikirimkan si Client
app.use(bodyParser.json());

//Buat Database
//nedb database sederhana yang berbentuk java scriprt
const DataGrep = require('nedb'); //Membuat database

//Auto membuat file table .json di
const db = {};
(db.auth = new DataGrep({ filename: '.data/auth.json', autoload: true })),
  (db.user = new DataGrep({ filename: '.data/user.json', autoload: true })),
  (db.resto = new DataGrep({ filename: '.data/resto.json', autoload: true })),
  (db.foods = new DataGrep({ filename: '.data/foods.json', autoload: true })),
  (db.order = new DataGrep({ filename: '.data/order.json', autoload: true })),
  ///////////
  //   app.get('/', (req, res) => {
  //     //proses
  //     res.send('ok');
  //   });

  // app.get("/api/data",(req, res) => {

  // })

  app.get('/resto', (req, res) => {
    db.resto.find({}, (err, done) => {
      if (err) {
        res.send('ini Erorr!!');
        return;
      }
      res.send(done);
    });
  });

app.get('/resto/:id', (req, res) => {
  db.resto.find({ _id: req.params.id }, (err, done) => {
    if (err) {
      res.send('ini Erorr!!');
      return;
    }
    res.send(done);
  });
});

app.post('/resto', (req, res) => {
  const data = {
    namaresto: req.body.namaresto,
    gambarest: req.body.gambarest,
    alamat: req.body.alamat,
    lat: req.body.lat,
    lng: req.body.lng
  };
  db.resto.insert(data, (err, done) => {
    if (err) {
      res.send('erorr bro');
      return;
    }
    res.send(done);
  });
});

//kenapa id? kenapa ndak _id?
//because :id adalah sebuah nama parameter yang diisi bebas, yang penting itu setelah update harus disesuaikan. misal kita mau mengambil _id, namanya harus sama.
app.put('/resto/:id', (req, res) => {
  console.log(req.body);
  const data = {
    namaresto: req.body.namaresto,
    gambarest: req.body.gambarest,
    alamat: req.body.alamat,
    lat: req.body.lat,
    lng: req.body.lng
  };

  db.resto.update({ _id: req.params.id }, data, {}, (err, numReplaced) => {
    res.send('ok');
  });
});

app.delete('/resto/:id', (req, res) => {
  db.resto.remove({ _id: req.params.id }, {}, (err, done) => {
    res.send('ok');
  });
});

var listener = app.listen(8000, function() {
  console.log('server kamu di port ' + listener.address().port);
});
