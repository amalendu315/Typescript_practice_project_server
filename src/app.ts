import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { connectDatabase } from "./mongoDb";
import { PORT } from "./config";
import routes from "./routes";

const app = express();

//App Config
app.use("/assets",express.static(path.join(__dirname, "public/assets")))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cors());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy:"cross-origin" }));
app.use(morgan("common"));

//Routes

app.use("/api",routes);

//MongoDB Connection
connectDatabase().then((db) => {
    console.log("Connected to MongoDB");
    app.locals.db = db;
    app.listen(PORT,()=>{
        console.log(`Server is running on port ${PORT}`);
    })
}).catch((err) => {
    console.log(err);
    process.exit(1);
});