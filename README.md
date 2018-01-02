<p align="center">
  <img src="https://raw.githubusercontent.com/nulldreams/node-lendar/master/calendar.png" alt="Size Limit example"
       width="20%" height="20%">
</p>
<h4 align="center">A simple API using Google Calendar</h4>
<p align="center">	
  <a href="https://saythanks.io/to/nulldreams">
      <img src="https://img.shields.io/badge/Say%20Thanks-!-1EAEDB.svg">
  </a>  
	
  <a href="https://github.com/nulldreams/node-lendar/issues">
      <img src="https://img.shields.io/codeclimate/issues/github/me-and/mdf.svg">
  </a>

  <a href="http://makeapullrequest.com">
      <img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square">
  </a>
</p>

<p align="center">
  <a href="#how-to-use">How To Use</a> •
  <a href="#steps">Steps</a> •
</p>

 ## How To Use

To clone and run this application, you'll need [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com)) installed on your computer. From your command line:

```bash
# Clone this repository
$ git clone https://github.com/nulldreams/node-lendar.git

# Go into the repository
$ cd node-lendar

# Install dependencies
$ npm install

# Run the app
$ npm start
```

## Steps
 - 1º Get a token for your email
 
 `GET localhost:8000/url`
 ```
 {
    "url": "https://accounts.google.com/o/oauth2/auth?access_type=offline&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fcalendar&response_type=code&client_id=1052779624389-9ogddbl60bq63vt0a53mvudfofaud8jo.apps.googleusercontent.com&redirect_uri=urn%3Aietf%3Awg%3Aoauth%3A2.0%3Aoob"
}
 ```
 `Open the url and get the token`
 
  - 2º Store the token on your server
  
  `POST localhost:8000/auth`
  
  `Body application/json`  
  ```
  {
	"code": "__token"
}
  ```
```
Token stored to ${TOKEN_PATH}
```

## Now, have fun 🚀

`GET localhost:8000/eventos`

```
{
    "retorno": [{
        "kind": "calendar#event",
        "etag": "\"3016484312574000\"",
        "id": "_6tlnaqrle5p6cpb4dhmj4phpehkj0qjdepk68sjce1h66r1m71gmkcj76tl7cs3le8pmgpbcc5kmsq1n6lk68ebkcdq6idbe65gmsdjddlk30",
        "status": "confirmed",
        "htmlLink": "https://www.google.com/calendar/event?eid=XzZ0bG5hcXJsZTVwNmNwYjRkaG1qNHBocGVoa2owcWpkZXBrNjhzamNlMWg2NnIxbTcxZ21rY2o3NnRsN2NzM2xlOHBtZ3BiY2M1a21zcTFuNmxrNjhlYmtjZHE2aWRiZTY1Z21zZGpkZGxrMzAgbnVsbGRyZWFtc0Bt",
        "created": "2017-10-17T12:09:16.000Z",
        "updated": "2017-10-17T12:09:16.287Z",
        "summary": "FEMUG-MGA #8 - Tecnospeed",
        "description": "Para ver informações detalhadas sobre eventos criados automaticamente como este, use o app oficial do Google Agenda. https://g.co/calendar\n\nEste evento foi criado com base em um e-mail que você recebeu no Gmail. https://mail.google.com/mail?extsrc=cal&plid=ACUX6DMrpQPeiqbrCIs6MzdrMMTAttS_XIPqmA4\n",
        "location": "Edifício New Tower, Av Duque de Caxias 882, 17º andar, Maringá, Paraná, br, 87020-025",
        "creator": {
            "email": "nulldreams@gmail.com",
            "displayName": "igor souza martins",
            "self": true
        },
        "organizer": {
            "email": "unknownorganizer@calendar.google.com",
            "displayName": "Unknown Organizer"
        },
        "start": {
            "dateTime": "2017-10-28T13:30:00-02:00"
        },
        "end": {
            "dateTime": "2017-10-28T14:30:00-02:00"
        },
        "endTimeUnspecified": true,
        "transparency": "transparent",
        "visibility": "private",
        "iCalUID": "7kukuqrfedlm2f9ti0jmvhdrlpbcl68aj2g7jvpur3helainh75hd9tcti5n1an6mmh0",
        "sequence": 0,
        "attendees": [{
            "email": "nulldreams@gmail.com",
            "displayName": "igor souza martins",
            "self": true,
            "responseStatus": "accepted"
        }],
        "guestsCanInviteOthers": false,
        "privateCopy": true,
        "reminders": {
            "useDefault": true
        },
        "source": {
            "url": "https://mail.google.com/mail?extsrc=cal&plid=ACUX6DMrpQPeiqbrCIs6MzdrMMTAttS_XIPqmA4",
            "title": ""
        }
    }]
}
```
