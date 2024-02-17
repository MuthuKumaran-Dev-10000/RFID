const admin = require('firebase-admin');
const serviceAccount = require('./convo-74155-firebase-adminsdk-js7hz-fac0240420.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://rfidsample-c13cc-default-rtdb.firebaseio.com/'
});

const db = admin.database();
const ref = db.ref('RFID/entries/');

ref.once('value', (snapshot) => {
  const entries = snapshot.val();

  if (entries) {
    Object.keys(entries).forEach((entryId) => {
      const entry = entries[entryId];
      console.log(`Entry ID: ${entryId}`);
      console.log(`Duration: ${entry.duration}`);
      console.log(`Status: ${entry.status}`);
      console.log('-------------------------');
    });
  } else {
    console.log('No entries found.');
  }

  process.exit(0);
}, (errorObject) => {
  console.error('The read failed: ' + errorObject.code);
});
