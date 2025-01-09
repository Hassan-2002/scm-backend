import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import routes from "./routes/routes.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(routes);    

const PORT = process.env.PORT || 5000;

app.listen(port, () => {
   console.log("server is running on ", port);
})
mongoose.connect(process.env.MONGO_URL).then(() => {
     console.log("Connected to MongoDB");
}).catch((error) => {
    console.log("error", error)
})
app.use(cors());
app.use(express.json());
app.use("/api/v1/", routes);