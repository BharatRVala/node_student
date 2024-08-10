const mngoose = require('mongoose');

const url="mongodb+srv://bharat:bharat@cluster0.kqpz9z8.mongodb.net/studd"

mngoose.connect(url,{
    useNewUrlParser:true,
    useUnifiedTopology:true
});

const db=mngoose.connection;
db.on('connected',()=>{
    console.log("Database connected");
})
module.exports=db;