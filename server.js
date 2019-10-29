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
    if(!req.body.firstname){
        res.status(400).json({
            statusCode: 400,
            error: "firstname parameter is required",
            message: "firstname parameter is required"
        });
    }
    if(!req.body.lastname){
        res.status(400).json({
            statusCode: 400,
            error: "lastname parameter is required",
            message: "lastname parameter is required"
        });
    }
    // var person = new PersonModel(req.body);
    // var result = await person.save();
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

//detail profile data method get
//http://localhost:3000/profile/detail/idmongo
app.get('/profile/detail/(:id)', async (req, res) => {
    let statusCode = 200
    let message = "Detail Person"
    var person = await PersonModel.findById(req.params.id).exec();
    const response = {
        statusCode: 200,
        error: message,
        content: person
    }
    res.status(statusCode).json(response);
})

//commit -m "create post profile mongo"

//update data profile menggunakan method put
//url http://localhost:3000/profile/update/idmongo
app.put('/profile/update/(:id)', async (req, res) => {
    let statusCode = 200
    let message = "Update Person"
    var person = await PersonModel.findByIdAndUpdate(req.params.id,req.body, {new: true});
    const response = {
        statusCode: statusCode,
        error: message,
        message: message,
        content: person
    }
    res.status(statusCode).json(response);
})

//delete data method get
//url http://localhost:3000/profile/delete/id
app.get('/profile/delete/(:id)', async (req, res) => {
    const checkId = Mongoose.Types.ObjectId.isValid(req.params.id)
    //check dataObject id valid jika valid lakukan eksekusi delete
    let statusCode = 200
    let message = "Delete Person"
    if(checkId){ //jika id valid, delete data
        var person = await PersonModel.findByIdAndDelete(req.params.id).exec();
    }else{
        statusCode = 404,
        message = "Object Id invalid"
        var person = null
    }
    const response = {
        statusCode: statusCode,
        error: message,
        message: message,
        content: person
    }
    res.status(statusCode).json(response);
})

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

