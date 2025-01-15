// Question: Pourquoi est-il important de valider les variables d'environnement au démarrage ?
// Réponse : Il est important de valider les variables d'environnement au démarrage pour s'assurer que toutes les configurations nécessaires sont présentes et correctes. Cela permet d'éviter des erreurs inattendues et des comportements imprévisibles de l'application en production.

// Question: Que se passe-t-il si une variable requise est manquante ?
// Réponse : Si une variable requise est manquante, l'application peut ne pas fonctionner correctement, ce qui peut entraîner des erreurs critiques, des pannes ou des comportements inattendus. Il est donc crucial de vérifier et de valider toutes les variables d'environnement nécessaires avant de démarrer l'application.

const dotenv = require("dotenv");
dotenv.config();

const requiredEnvVars = ["MONGODB_URI", "MONGODB_DB_NAME", "REDIS_URI"];

// Validation des variables d'environnement
function validateEnv() {
  // Implémenter la validation
  requiredEnvVars.forEach((envVar) => {
    // Si une variable manque, lever une erreur explicative
    if (!process.env[envVar]) {
      throw new Error(`Missing required environment variable: ${envVar}`);
    }
  });
}

module.exports = {
  mongodb: {
    uri: process.env.MONGODB_URI,
    dbName: process.env.MONGODB_DB_NAME,
  },
  redis: {
    uri: process.env.REDIS_URI,
  },
  port: process.env.PORT || 3000,
};
