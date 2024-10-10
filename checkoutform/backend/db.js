const mongoose=require('mongoose');

const mongoDB= async()=>{

  try {
    const database = 'mongodb://localhost:27017/electronic_device';
     await mongoose.connect(database);
     console.log("mongoDB connected");
     const fetched_data = await mongoose.connection.db.collection("devices").find({}).toArray();
     global.fetched_data=fetched_data;
    //  console.log('data:', fetched_data);
    
  } catch (error) {
    console.log('error from db:',error.message);
  }
}

module.exports= mongoDB;