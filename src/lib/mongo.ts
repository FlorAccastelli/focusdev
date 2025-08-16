import { MongoClient, ServerApiVersion } from "mongodb";

let client: MongoClient | null = null;
let promise: Promise<MongoClient> | null = null;

export async function getMongoClient() {
  if (client) return client;

  if (!promise) {
    const uri = process.env.MONGODB_URI;
    if (!uri || !uri.trim()) {
      throw new Error("MONGODB_URI no está definida");
    }

    promise = new MongoClient(uri, {
      serverApi: { version: ServerApiVersion.v1, strict: true, deprecationErrors: true },
    })
      .connect()
      .then((c) => {
        client = c;
        return c;
      });
  }

  return promise;
}

