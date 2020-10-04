const functions = require('firebase-functions');
const cors = require('cors')({ origin: true });
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

// The Firebase Admin SDK to access Cloud Firestore.
const admin = require('firebase-admin');
admin.initializeApp();

/**
 * Cloud Firestore under the path /addFeed
 * This is used for add feed
 */
exports.addFeed = functions.https.onRequest(async (req, res) => {
    cors(req, res, async () => {
        const { title = '', description = '', image = '', userId = '' } = JSON.parse(req.body);
        console.log(title, description, image, userId, req.body);
        const feed = await (await admin.firestore().collection('feeds').add({ title, description, image, createdDate: new Date(), userId })).get();
        res.json({
            result: `Feed has added successfully`, feed: Object.assign({}, feed.data(), {
                id: feed.id
            })
        });
    });
});

/**
 * Cloud Firestore under the path /updateFeed
 * This is used for update feed by ID
 */
exports.updateFeed = functions.https.onRequest(async (req, res) => {
    cors(req, res, async () => {
        const { title = '', description = '', image = '', userId = '', id } = JSON.parse(req.body);
        const feed = await admin.firestore().collection('feeds').doc(id).update({ title, description, image, createdDate: new Date(), userId });
        res.json({
            result: `Feed has updated successfully`, feed: {
                title, description, image, userId,
                id: feed.id
            }
        });
    });
});

/**
 * Cloud Firestore under the path /feeds
 * This is used for get feed by user id
 */
exports.feeds = functions.https.onRequest(async (req, res) => {
    cors(req, res, async () => {
        const { userId } = req.query;
        const feeds = await admin.firestore().collection('feeds').where("userId", "==", userId).get();
        res.json({
            feeds: feeds.docs.map(doc => (
                Object.assign({}, doc.data(), {
                    id: doc.id
                })
            ))
        });
    });
});

