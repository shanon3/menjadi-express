const Mongoose = require("mongoose"); //memanggil library moongose
Mongoose.connect('mongodb://localhost/belajarmongo'); //mengkoneksikan ke db mongo
module.exports = Mongoose; //export module Mongoose

//commit -m "config mongo dan koneksi ke mongo"