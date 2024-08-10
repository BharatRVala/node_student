const express = require('express');
const app = express();
const db = require('./db');
require('dotenv').config();
const Ps = require('./SC');
const port = process.env.port || 3000;

const bodyParser = require('body-parser');
const { error } = require('console');
app.use(bodyParser.json());
app.get('/', (req, res) => {
    res.send("Hello World");
});

app.get('/getdata', async(req, res) => {
    try{
        const data=await Ps.find();
        res.status(200).send(data);
    }catch(error){
        res.status(500).json({message:error.message});
    }
})

app.post('/insert', async(req, res) => {

    try{
        const data=req.body;
        const np=new Ps(data);
        const pdata=await np.save();
        res.status(201).send("data inserted").json(data);

    }catch(error){  
        res.status(500).json({message:error.message});
    }

})



app.get('/find/:id', async(req, res) => {
const id=req.params.id;
try{
    const data=await Ps.findById(id);
    if(!data) res.status(404).send("data not found");
    else res.status(200).send(data);
}catch(error){
    res.status(500).send("data not found");
}
})

app.put('/:id', async(req, res) => {
    
    try{
        const id=req.params.id;
        const data=req.body;
        const response=await Ps.findByIdAndUpdate(id,data,{
            new:true,
            runValidators:true,
        });
        if(!response) {
            return res.status(404).send("data not found");
        }
        console.log("data updated");
        res.status(200).json(response);
    }catch(error){
        res.status(500).send("data not found"); 
    }
})


app.delete('/:id', async(req, res) => {
    try{    
        const id=req.params.id;
        const response=await Ps.findByIdAndDelete(id);
        if(!response) {
            return res.status(404).send("data not found");
        }
        console.log("data deleted");
        res.send("data deleted");
        res.status(200).json(response);
    }catch(error){
       
        res.status(500).send("data not found");
    }
})
 
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});