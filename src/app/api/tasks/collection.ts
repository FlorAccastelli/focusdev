import { getMongoClient } from "../../../lib/mongo";

export async function tasksCol() {
  const client = await getMongoClient();

  const dbName = process.env.MONGODB_DB || "focusdev_prod";
  const db = client.db(dbName);
  const col = db.collection("tasks");

  // Crear índices solo una vez, no en cada request
  if (process.env.NODE_ENV === "development") {
    await col.createIndex({ userId: 1, createdAt: -1 });
    await col.createIndex({ title: 1 });
  }

  return col;
}

