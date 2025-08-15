import { MongoClient, MongoClientOptions, ServerApiVersion } from "mongodb";

const uri = process.env.MONGODB_URI!;
const options: MongoClientOptions = {
  serverApi: { version: ServerApiVersion.v1, strict: true, deprecationErrors: true },
};

declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

const clientPromise: Promise<MongoClient> =
  global._mongoClientPromise ?? new MongoClient(uri, options).connect();

if (process.env.NODE_ENV === "development") {
  global._mongoClientPromise = clientPromise;
}

export default clientPromise;
