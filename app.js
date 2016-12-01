var express = require('express');
var http = require('http');
var path = require('path');
var bodyParser = require('body-parser');
var PouchDB = require('pouchdb');
var app = express();
var CryptoJS = require("crypto-js");
var cred = new PouchDB('http://localhost:5984/credentials');
var book = new PouchDB('http://localhost:5984/books');
var demo = new PouchDB('http://localhost:5984/demo');
var cookieParser = require('cookie-parser');
var session = require('cookie-session');
app.set('port', 3000);

app.use(express.static(path.normalize(__dirname + '/')));
app.use(bodyParser.json());

var expiryDate = new Date( Date.now() +  60 * 60 * 1000 );
app.use(session({
        name: 'qwe13da',
        secret: '23dqe',
        resave: false,
         saveUninitialized: true,
        keys: ['key1', 'key2'],
        cookie: { secure: true,
            httpOnly: true,
            expires: expiryDate

        }
    })
);
app.use(express.static('public'));
app.use(cookieParser());

app.post('/sign-up', function (req, res) {
    var ciphertext = CryptoJS.AES.encrypt(req.body.password, 'my grandmother smokes a pipe');

    function postMess(req, data) {
        cred.put({
            _id: req.body.login,
            name: req.body.name,
            surname: req.body.surname,
            password: ciphertext.toString(),
            email: req.body.email
        }).then(function (response) {
            console.info(response);
        }).catch(function (err) {
            console.error(err);
        });
    }

    res.send('all ok');
});

app.get('/auth/:id', function (req, res) {
    if(req.params.id == req.cookies.cookieId){
        res.send('user logined')
    }
});

app.get('/books', function (req, res) {
    book.allDocs({include_docs: true}).then(function (doc) {
        res.send(doc);
    });

});

app.get('/read/:id', function (req, res) {
    demo.get(req.params.id).then(function (doc) {
        res.send(doc);
    });
});

app.get('/book/:id', function (req, res) {
    book.get(req.params.id).then(function (doc) {
        res.send(doc);
    });
});

app.post('/create-book', function (req, res) {
    function postMess(req, data) {
        cred.put({
            name: req.body.name,
            surname: req.body.surname,
            password: ciphertext.toString(),
            email: req.body.email
        }).then(function (response) {
            console.info(response);
        }).catch(function (err) {
            console.error(err);
        });
    }

    postMess(req, ciphertext)
});

http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});

app.post('/login', function (req, res) {

    cred.get(req.body.log).then(function (doc) {
            var bytes = CryptoJS.AES.decrypt(doc.password, 'my grandmother smokes a pipe');
            var plaintext = bytes.toString(CryptoJS.enc.Utf8);
            try {
                if (req.body.pass == plaintext) {
                    console.info(req.body.log + ' is here');
                    res.send(req.cookies.cookieId);
                }
                else {
                    throw ('неверный логин или пароль')
                }
            }
            catch (e) {
                res.send(e)
            }
        })
        .catch(function (err) {
            res.send(err)
     });
});
