const express=require('express');
const router=express.Router();

router.post('./data',(req,res)=>{
    
    try {
        
        res.send(global.fetch_data);

    } catch (error) {
        console.log('error',error.message);
    }
} )