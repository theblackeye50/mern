const express=require('express');
const router=express.Router();
const User =require('./model/User');

// router.post('/createuser', async(req,res)=>{
//     try {
//         const user= await User.create({
//             name: "John Doe",
//             Email:"johndoe@example.com",
//             country:"United States",
//             pincode:123456
//         })
//     } catch (error) {
//         console.log('server error', error.message);
//         res.status(500).json({success:false, error:"An error occurred while creating your account. Please try again."});
//     }
// })

router.post('/createuser', async (req, res) => {
    try {
        const user = await User.create({
            name: req.body.name,
            Email: req.body.Email,
            country: req.body.country,
            pincode: req.body.pincode,
        });
        
        // After successful user creation, return the response
        res.status(201).json({ success: true, user });
    } catch (error) {
        console.log('server error', error.message);
        res.status(500).json({ success: false, error: 'An error occurred while creating your account. Please try again.' });
    }
});

module.exports=router;
