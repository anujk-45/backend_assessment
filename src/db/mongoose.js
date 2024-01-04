const mongoose = require('mongoose')
const URI = "mongodb+srv://anujkumarjaimini025:zHGGzdpkDwmPNTny@cluster0.t7k1xgz.mongodb.net/?retryWrites=true&w=majority";


const connectDB = async() => {
  await mongoose.connect(URI);
  console.log('Database Connected'); 
}

module.exports = connectDB;