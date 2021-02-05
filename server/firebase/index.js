let admin = require("firebase-admin");

let serviceAccount = require("../config/fbServiceAccountKey.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://ecommerce-9670c.firebaseio.com"
});

module.exports = admin