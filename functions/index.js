const firebase = require('firebase-admin');
const functions = require('firebase-functions');
const raven = require('raven');

firebase.initializeApp(functions.config().firebase);
raven.config(functions.config().sentry.url).install();

exports.clientToken = functions.https.onRequest(require('./lib/spotify-auth').clientToken);

exports.exchangeCode = functions.https.onRequest(require('./lib/spotify-auth').exchangeCode);

exports.processVotes = functions.database.ref('/votes/{partyId}/{trackId}/{userId}')
    .onWrite(require('./lib/vote-processor').handler);

exports.refreshToken = functions.https.onRequest(require('./lib/spotify-auth').refreshToken);
