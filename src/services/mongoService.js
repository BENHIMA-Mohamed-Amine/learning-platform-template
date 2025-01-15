// Question: Pourquoi créer des services séparés ?
// Réponse : La création de services indépendants dans une architecture permet un découplage qui simplifie l'évolution de chaque service, réduit l'impact des pannes et améliore la scalabilité en allouant les ressources de manière optimale.

const { ObjectId } = require("mongodb");
const config = require("../config/db");

async function insertOne(collection, document) {
  try {
    const result = await config
      .getDb()
      .collection(collection)
      .insertOne({
        ...document,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    return result;
  } catch (error) {
    throw new Error(`Error creating document: ${error.message}`);
  }
}

async function insertMany(collection, documents) {
  try {
    const result = await config
      .getDb()
      .collection(collection)
      .insertMany(
        documents.map((doc) => ({
          ...doc,
          createdAt: new Date(),
          updatedAt: new Date(),
        }))
      );
    return result;
  } catch (error) {
    throw new Error(`Error creating multiple documents: ${error.message}`);
  }
}

async function findOneById(collection, id) {
  try {
    if (!ObjectId.isValid(id)) throw new Error("Invalid ObjectId format");
    const result = await config
      .getDb()
      .collection(collection)
      .findOne({ _id: new ObjectId(id) });
    if (!result) throw new Error("Not found !");
    return result;
  } catch (error) {
    throw new Error(`Error finding document: ${error.message}`);
  }
}

async function find(collection, query = {}, options = {}) {
  try {
    const { limit = 0, skip = 0, sort = {} } = options;
    return await config
      .getDb()
      .collection(collection)
      .find(query)
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .toArray();
  } catch (error) {
    throw new Error(`Error finding documents: ${error.message}`);
  }
}

async function updateOneById(collection, query, updateData) {
  try {
    if (!ObjectId.isValid(id)) throw new Error("Invalid ObjectId format");
    const result = await config
      .getDb()
      .collection(collection)
      .updateOne(query, {
        $set: {
          ...updateData,
          updatedAt: new Date(),
        },
      });
    return result.modifiedCount > 0;
  } catch (error) {
    throw new Error(`Error updating document: ${error.message}`);
  }
}

async function updateMany(collection, query, update) {
  try {
    const result = await config
      .getDb()
      .collection(collection)
      .updateMany(query, {
        $set: {
          ...update,
          updatedAt: new Date(),
        },
      });
    return result.modifiedCount;
  } catch (error) {
    throw new Error(`Error updating multiple documents: ${error.message}`);
  }
}

async function deleteOneById(collection, id) {
  try {
    if (!ObjectId.isValid(id)) throw new Error("Invalid ObjectId format");
    const result = await config
      .getDb()
      .collection(collection)
      .deleteOne({ _id: new ObjectId(id) });
    return result.deletedCount > 0;
  } catch (error) {
    throw new Error(`Error deleting document: ${error.message}`);
  }
}

async function deleteMany(collection, query) {
  try {
    const result = await config
      .getDb()
      .collection(collection)
      .deleteMany(query);
    return result.deletedCount;
  } catch (error) {
    throw new Error(`Error deleting multiple documents: ${error.message}`);
  }
}

module.exports = {
  insertOne,
  insertMany,
  findOneById,
  find,
  updateOneById,
  updateMany,
  deleteOneById,
  deleteMany,
};
