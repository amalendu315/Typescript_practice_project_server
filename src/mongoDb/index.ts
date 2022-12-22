import { MongoClient } from "mongodb";
import  {DB_URI}  from "../config";

const client = new MongoClient(DB_URI);

export async function connectDatabase() {
    await client.connect();
    var db = client.db("sociopedia_master");
    return db;
};