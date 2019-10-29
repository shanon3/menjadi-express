//panggil library express
var express = require('express');
//panggil library router
var router = express.Router();
//panggil model
const Models = require('../models/index')

/** GET users listing  **/
//http://localhost:3000/todo/

router.get('/', function(req, res, next){
    res.send('hello todo');
});

//create
router.post('/create', async (req, res) => {
    //Do something here
    console.log(req.body)
    try{
        const todo = await Models.Todos.create(req.body)
        const response = {
            statusCode: 200,
            error: "",
            message: "create Todo",
            content: todo,
            contentB: req.body //lihat request yang dikirim 
        }
        res.json(response);
    }catch(err){
        const response = {
            statusCode: 404, 
            message: err.message,
            error: err
        }
        res.status(404).json(response)
    }
})

module.exports = router;

