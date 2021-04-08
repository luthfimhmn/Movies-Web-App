const { MongoClient } = require('mongodb');

let database = null

function connectMongodb (cb) {
  const uri = 'mongodb://localhost:27017'

  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })

  client.connect()
    .then(_ => {
      cb(true)
      database = client.db('entertainme')
    })
    .catch(err => {
      cb(false)
      console.log('connect mongodb error !')
      console.log(err);
    })
}

function getDatabase () {
  return database
}

module.exports = {
  connectMongodb,
  getDatabase
}