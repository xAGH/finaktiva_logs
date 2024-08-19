const dbName = process.env.MONGO_INITDB_DATABASE ?? 'Registration'
const colletionName = process.env.MONGO_INITDB_COLLECTION ?? 'EventLogs'
const user = process.env.MONGO_INITDB_ROOT_USERNAME ?? 'finaktiva'
const password = process.env.MONGO_INITDB_ROOT_PASSWORD ?? 'finaktiva'
db = db.getSiblingDB(dbName);
db.createCollection(colletionName);
if (user && password) {
  db.createUser({
    user,
    pwd: password,
    roles: [
      {
        role: 'readWrite',
        db: dbName
      }
    ]
  });
}
