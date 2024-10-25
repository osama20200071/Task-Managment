import { ID } from "appwrite";
import { collections, databases } from "./config";

const db = {};

collections.forEach((collection) => {
  db[collection.name] = {
    create: async (payload, permissions, id = ID.unique()) => {
      return await databases.createDocument(
        collection.dbId,
        collection.id,
        id,
        payload,
        permissions
      );
    },
    update: async (payload, id) => {
      return await databases.updateDocument(
        collection.dbId,
        collection.id,
        id,
        payload
      );
    },

    list: async (queries) => {
      return await databases.listDocuments(
        collection.dbId,
        collection.id,
        queries
      );
    },
    delete: async (id) => {
      return await databases.deleteDocument(collection.dbId, collection.id, id);
    },

    get: async (id) => {
      return await databases.getDocument(collection.dbId, collection.id, id);
    },
  };
});

export { db };
