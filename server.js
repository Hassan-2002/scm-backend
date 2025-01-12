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


app.listen(port, () => {
   console.log("server is running on ", port);
})
const mongo = async() => await mongoose.connect(process.env.MONGO_URI)
     .then(() => {
     console.log("Connected to MongoDB");
}).catch((error) => {
    console.log("error", error)
})
mongo();
app.get("/", (req, res) => res.send("Hello World!"));
app.use(cors());
app.use(express.json());
app.use("/api/v1/", routes);