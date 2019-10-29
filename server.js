const express = require('express')
const app = express()
const port = 3000
//memanggil library body parser
const bodyParser = require("body-parser");
//config body parser
app.use(bodyParser.urlencoded({ extended: true})); //menangkap type request dalam bentuk form urlencoded
app.use(bodyParser.json()); //menangkap url dalam bentuk json

//commit dengan message "config body parser"

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

