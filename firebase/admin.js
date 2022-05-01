const admin = require("firebase-admin");

const serviceAccount = require("./devter-23058-firebase-adminsdk-76kor-711bd5817e.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export const firestore = admin.firestore();
