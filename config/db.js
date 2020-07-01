const mongoose = require('mongoose');
require('dotenv').config({ path: 'variables.env' });

const conectarDB = async () => {
    try {
        await mongoose.connect(process.env.DB_MONGO, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true

        });
        console.log('DB Conected ;)');
        
    } catch (error) {
        console.log('There was a Error :(');
        console.log(error);
        process.exit(1); //Detiene la application
    }
}

module.exports = conectarDB;