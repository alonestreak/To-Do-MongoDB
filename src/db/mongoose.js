const mongoose = require('mongoose');

try{
    mongoose.connect(process.env.database_url, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    });
    console.log("Connected to MONGO-DB")

}catch(e){
    console.error(e.message);
}