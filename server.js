const express = require('express')
const app = express()
const port = 3000
//memanggil library body parser
const bodyParser = require("body-parser");
//config body parser
app.use(bodyParser.urlencoded({ extended: true})); //menangkap type request dalam bentuk form urlencoded
app.use(bodyParser.json()); //menangkap url dalam bentuk json

//commit dengan message "config body parser"

const Mongoose = require('./MongoModel/MongoConfig') //koneksi ke file MongoConfig
const PersonModel = Mongoose.model("person", {
    firstname: String, // field firstname
    lastname: String // field lastname
})

// commit -m "memanggil MongoConfig dan membuat model PersonModel sebagai 
// penampung collections person"

app.post('/profile/create', async(req, res) => {
    //Do something here
    console.log(req.body)
    var person = new PersonModel(req.body);
    var result = await person.save();
    const insert = {
        firstname: req.body.firstname,
        lastname: req.body.lastname
    }
    var person = new PersonModel(insert);
    var result = await person.save();
    const response = {
        statusCode: 200,
        error: "",
        message: "create Person",
        content: result
    }
    res.json(response);
})

//url http://localhost:3000/profile/list
app.get('/profile/list', async (req, res) => {
    //Do something here
    var person = await PersonModel.find().exec();
    const response = {
        statusCode: 200,
        error: "",
        message: "create Person",
        content: person
    }
    res.json(response);
})
//commit -m "menampilkan semua data"

//commit -m "create post profile mongo"

//membuat request post
app.post('/hello', function(req, res){
    const respon = {
        statusCode: 200,
        error: "",
        message: "Hello json",
        content: req.body
    }
    res.json(respon);
})

app.listen(port, () => console.log(`Example app listening on port ${port}`))

