import clientPromise from "../../../lib/mongo";

export async function tasksCol() {
  const client = await clientPromise;
  const dbName = process.env.MONGODB_DB!;
  const db = client.db(dbName);
  const col = db.collection("tasks");
  await col.createIndex({ userId: 1, createdAt: -1 });
  await col.createIndex({ title: 1 });
  return col;
}
