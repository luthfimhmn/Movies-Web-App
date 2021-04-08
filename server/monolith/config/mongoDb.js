const {MongoClient } = require('mongodb');

async function main () {
  const uri = "mongodb://localhost:27017"
  const client = new MongoClient(uri);

  try {
    await client.connect();

    await listDatabases(client);
    console.log('Connected mongo');
  } catch (e) {
    console.log(e)
  } finally {
    await client.close();
  }
}

async function listDatabases(client){
  databasesList = await client.db().admin().listDatabases();

  console.log("Databases:");
  databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};


main().catch(console.error);