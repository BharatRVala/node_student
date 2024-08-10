const mngoose=require('mongoose');

const PC=new mngoose.Schema({
   
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    }
});

const PS=mngoose.model('PC',PC);

module.exports=PS;
