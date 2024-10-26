import { Account, Client, Databases, Storage, ID } from "appwrite";

export const API_ENDPOINT = import.meta.env.VITE_ENDPOINT;
export const PROJECT_ID = import.meta.env.VITE_PROJECT_ID;
export const DATABASE_ID = import.meta.env.VITE_DATABASE_ID;
export const COLLECTION_ID_TASKS = import.meta.env.VITE_COLLECTION_TASKS_ID;
export const BUCKET_ID = import.meta.env.VITE_BUCKET_ID;

const client = new Client();
client.setEndpoint(API_ENDPOINT).setProject(PROJECT_ID);
const storage = new Storage(client);
const databases = new Databases(client);
const account = new Account(client);

const collections = [
  {
    name: "tasks",
    id: COLLECTION_ID_TASKS,
    dbId: DATABASE_ID,
  },
];

function getImageUrl(fileKey) {
  return storage.getFilePreview(BUCKET_ID, fileKey);
}

async function deleteImage(fileKey) {
  return await storage.deleteFile(BUCKET_ID, fileKey);
}

async function createImage(file) {
  return await storage.createFile(BUCKET_ID, ID.unique(), file);
}

export {
  client,
  databases,
  collections,
  account,
  getImageUrl,
  deleteImage,
  createImage,
};
