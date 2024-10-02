const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app');
const { admin, bucket } = require('./firebase'); 

dotenv.config({ path: './config.env' });

const db = process.env.DATABASE;

const PORT = process.env.PORT || 3000;

mongoose.connect(db, {
    
}).then(() => {
    console.log('Connected to the MongoDB database.');
}).catch(err => {
    console.error('Database connection error:', err);
});

const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', err => {
    console.log('Unhandled Rejection! Shutting down...');
    console.log(err.name, err.message);
    server.close(() => {
        process.exit(1);
    });
});
