import { MongoClient} from "mongodb";

const client = new MongoClient(process.env.ATLAS_URI);

const DATABASE_NAME = "portfolio_db";

try {
  await client.connect();

  await client.db("admin").command({ ping: 1 });
  console.log("You've successfully connected to mongodb");
} catch (error) {
  console.error(error);
}

let db = client.db(DATABASE_NAME);

export default db;