const fs = require('fs')
var readline = require('readline')
const google = require('googleapis')
const googleAuth = require('google-auth-library')

// If modifying these scopes, delete your previously saved credentials
// at ~/.credentials/calendar-nodejs-quickstart.json
const TOKEN_DIR = (process.env.HOME || process.env.HOMEPATH ||
    process.env.USERPROFILE) + '/.credentials/'
const TOKEN_PATH = TOKEN_DIR + 'calendar-nodejs-quickstart.json'
var SCOPES = ['https://www.googleapis.com/auth/calendar.readonly']

function auth (cb) {
// Load client secrets from a local file.
  fs.readFile('client_secret.json', function processClientSecrets (err, content) {
    if (err) {
      console.log('Error loading client secret file: ' + err)
      return
    }
      // Authorize a client with the loaded credentials, then call the
      // Google Calendar API.
    authorize(JSON.parse(content), cb)
  })
}

exports.list = (query, cb) => {
  auth((oAuth) => {
    listEvents(oAuth, query, (err, eventos) => {
      if (err) return cb(err)

      cb(null, eventos)
    })
  })
}

function listEvents (auth, query, cb) {
  var calendar = google.calendar('v3')
  calendar.events.list({
    auth: auth,
    calendarId: query.id,
    timeMin: (new Date()).toISOString(),
    maxResults: query.quantidade,
    singleEvents: true,
    orderBy: 'startTime'
  }, function (err, response) {
    if (err) {
      console.log('The API returned an error: ' + err)
      return
    }
    var events = response.items
    if (events.length === 0) {
      console.log('No upcoming events found.')
    } else {
      cb(null, events)
    //   console.log('Upcoming 10 events:')
    //   for (var i = 0; i < events.length; i++) {
    //     var event = events[i]
    //     var start = event.start.dateTime || event.start.date
    //     console.log('%s - %s', start, event.summary)
    //   }
    }
  })
}

function storeToken (token) {
  try {
    fs.mkdirSync(TOKEN_DIR)
  } catch (err) {
    if (err.code !== 'EEXIST') {
      throw err
    }
  }
  fs.writeFile(TOKEN_PATH, JSON.stringify(token))
  console.log('Token stored to ' + TOKEN_PATH)
}

function getNewToken (oauth2Client, callback) {
  var authUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES
  })
  console.log('Authorize this app by visiting this url: ', authUrl)
  var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  })
  rl.question('Enter the code from that page here: ', function (code) {
    rl.close()
    oauth2Client.getToken(code, function (err, token) {
      if (err) {
        console.log('Error while trying to retrieve access token', err)
        return
      }
      oauth2Client.credentials = token
      storeToken(token)
      callback(oauth2Client)
    })
  })
}

function authorize (credentials, callback) {
  var clientSecret = credentials.installed.client_secret
  var clientId = credentials.installed.client_id
  var redirectUrl = credentials.installed.redirect_uris[0]
  var auth = new googleAuth()
  var oauth2Client = new auth.OAuth2(clientId, clientSecret, redirectUrl)

    // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH, function (err, token) {
    if (err) {
      getNewToken(oauth2Client, callback)
    } else {
      oauth2Client.credentials = JSON.parse(token)
      callback(oauth2Client)
    }
  })
}
