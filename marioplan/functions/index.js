const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

// use following command to deploy this functions to firebase cloud function
// firebase deploy --only functions

const createNotification = notification => {
  return admin
    .firestore()
    .collection('notifications')
    .add(notification)
    .then(doc => console.log('notification added: ', doc))
}

exports.projectCreated = functions
  .firestore
  .document('projects/{projectId}')
  .onCreate((doc) => {

    const project = doc.data;
    const notification = {
      content: 'Added a new project',
      user: `${project.autherFirstName} ${project.autherLastName}`,
      time: admin.firestore.FieldValue.serverTimestamp()
    }

    return createNotification(notification);
  })

exports.userJoined = functions
  .auth
  .user()
  .onCreate( user => {
    return admin
      .firestore()
      .collection('users')
      .doc(user.uid)
      .get()
      .then( doc => {
        
        const newUser = doc.data;;
        const notification = {
          content: 'Joined the party',
          user: `${newUser.firstName} ${newUser.lastName}`,
          time: admin.firestore.FieldValue.serverTimestamp()
        }
        
        return createNotification(notification);
      })
  })