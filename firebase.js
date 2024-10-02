const admin = require('firebase-admin');
const serviceAccount = require('./config/mycrafts-c0c2c-firebase-adminsdk-b6m70-8cf8194507.json');

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        storageBucket: 'gs://mycrafts-c0c2c.appspot.com', 
    });
}

const bucket = admin.storage().bucket();

module.exports = { admin, bucket };
