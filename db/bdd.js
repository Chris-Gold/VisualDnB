//On crée une base de données.
 var MongoClient = require('mongodb').MongoClient;
 var url = "mongodb://localhost:27017/visualdnb";
//
// MongoClient.connect(url, function(err, db) {
//   if (err) throw err;
//   console.log("Database visualdnb created!");
//   db.close();
// });

// On crée une collection "administration" dans cette base de données.
// var url = "mongodb://localhost:27017/";
// MongoClient.connect(url, function(err, db) {
//   if (err) throw err;
//   var dbo = db.db("visualdnb");
//   dbo.createCollection("administration", function(err, res) {
//     if (err) throw err;
//     console.log("Collection administration created!");
//     db.close();
//   });
// });

// On insert des données dans la collection "expPro".
// MongoClient.connect(url, function(err, db) {
//   if (err) throw err;
//   var dbo = db.db("visualdnb");
//   var xp = [
//     { identifiant: "visualdnbadmin", mdp: "visualdnbmdp", admin: false},
//   ];
//   dbo.collection("administration").insertMany(xp, function(err, res) {
//     if (err) throw err;
//     console.log("Number of documents inserted: " + res.insertedCount);
//     db.close();
//   });
// });

//On supprime la collection expPro (commentaire car supprime automatiquement sinon.)
// MongoClient.connect(url, function(err, db) {
//   if (err) throw err;
//   var dbo = db.db("visualdnb");
//   dbo.collection("administration").drop(function(err, delOK) {
//     if (err) throw err;
//     if (delOK) console.log("Collection deleted");
//     db.close();
//   });
// });

// On affiche dans le terminal notre bdd.
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("visualdnb");
  dbo.collection("administration").find().toArray(function(err, result) {
    if (err) throw err;
    console.log(result);
    db.close();
  });
});
