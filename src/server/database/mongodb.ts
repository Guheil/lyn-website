import 'server-only';
import { MongoClient, ServerApiVersion } from 'mongodb';
import { getEnv } from '@/server/config/env';

declare global { var __realEstadoMongoClientPromise: Promise<MongoClient> | undefined; }
function createClient() { const { MONGODB_URI } = getEnv(); return new MongoClient(MONGODB_URI, { serverApi: { version: ServerApiVersion.v1, strict: true, deprecationErrors: true }, maxPoolSize: 10, minPoolSize: 0, connectTimeoutMS: 10000, serverSelectionTimeoutMS: 10000 }); }
export async function getMongoClient() {
  if (!global.__realEstadoMongoClientPromise) global.__realEstadoMongoClientPromise = createClient().connect();
  try { return await global.__realEstadoMongoClientPromise; } catch (error) { global.__realEstadoMongoClientPromise = undefined; throw error; }
}
export async function getDatabase() { const { MONGODB_DB_NAME } = getEnv(); return (await getMongoClient()).db(MONGODB_DB_NAME); }
