// Question : Pourquoi créer un module séparé pour les connexions aux bases de données ?
// Réponse : Créer un module séparé pour les connexions aux bases de données permet de centraliser et de réutiliser le code de connexion. Cela facilite la maintenance, améliore la lisibilité du code et permet de gérer les connexions de manière cohérente et efficace dans toute l'application.

// Question : Comment gérer proprement la fermeture des connexions ?
// Réponse : Pour gérer proprement la fermeture des connexions, il est important d'écouter les événements de terminaison de l'application (comme 'SIGINT', 'SIGTERM', etc.) et de fermer les connexions aux bases de données dans les gestionnaires de ces événements. Cela garantit que les ressources sont libérées correctement et que les connexions ne restent pas ouvertes inutilement.

const { MongoClient } = require("mongodb");
const redis = require("redis");
const config = require("./env");

let mongoClient, redisClient, db;

async function connectMongo() {
  try {
    // Implémenter la connexion MongoDB
    mongoClient = new MongoClient(config.mongodb.uri);
    await mongoClient.connect();
    db = mongoClient.db(config.mongodb.dbName);
    console.log("Connected to MongoDB");
  } catch (error) {
    // Gérer les erreurs et les retries
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
}

async function connectRedis() {
  try {
    // Implémenter la connexion Redis
    redisClient = redis.createClient({ url: config.redis.uri });
    redisClient.on("error", (err) => console.error("Redis Client Error", err));
    await redisClient.connect();
    console.log("Connected to Redis");
  } catch (error) {
    // Gérer les erreurs et les retries
    console.error("Error connecting to Redis:", error);
    process.exit(1);
  }
}

// Export des fonctions et clients
module.exports = {
  connectMongo,
  connectRedis,
  getMongoClient: () => mongoClient,
  getRedisClient: () => redisClient,
  getDb: () => db,
};
