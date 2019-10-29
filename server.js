const express = require('express')
const app = express()
const port = 3000
const bodyParser = require("body-parser");

app.get('/', (req, res) => res.send('Hello World!'))

//membuat request post
app.post('/hello', function(req, res){
    const respon = {
        statusCode: 200,
        error: "",
        message: "Hello json"
    }
    res.json(respon);
})

app.listen(port, () => console.log(`Example app listening on port ${port}`))

