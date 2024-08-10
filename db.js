const mngoose = require('mongoose');
require('dotenv').config();

const url=process.env.db_url;

mngoose.connect(url,{
    useNewUrlParser:true,
    useUnifiedTopology:true
});

const db=mngoose.connection;
db.on('connected',()=>{
    console.log("Database connected");
})
module.exports=db;