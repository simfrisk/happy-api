//#region ---- Imports ----
import cors from "cors"
import express, { response } from "express"
import thoughtData from "./data.json"
import { authenticateUser } from "./middleware/authenticateUser.js"
import { getThoughtById } from "./endpoints/getThoughtById"
import { getThoughts } from "./endpoints/getThoughts"
import { getSecrets } from "./endpoints/getSecrets"
import { postThought } from "./endpoints/postThought"
import { postLike } from "./endpoints/postLike"
import { postUser } from "./endpoints/postUser"
import { postSession } from "./endpoints/postSession"
import { patchThought } from "./endpoints/patchThought"
import { deleteThought } from "./endpoints/deleteThought"
import { getHome } from "./endpoints/getHome"
import { Thought } from "./models/thought"
import mongoose from "mongoose"
import dotenv from "dotenv";

//#endregion

//#region ---- Set up ----
dotenv.config();

const mongoUrl = process.env.MONGO_URL || 'mongodb://localhost/testing';
// const mongoUrl = 'mongodb://localhost/testing';
mongoose.connect(mongoUrl)

// The setup of the port
const port = process.env.PORT || 8080
const app = express()

// The middleware
app.use(cors())
app.use(express.json())

if (process.env.RESET_DB) {
  const seedDatabase = async () => {
    console.log("🌱 Resetting and seeding database...");
    await Thought.deleteMany({});
    thoughtData.forEach(thought => {
      new Thought(thought).save();
    });
    console.log("✅ Seeding complete.");
  };
  seedDatabase();
}

//#endregion

//#region ---- endpoint ----

app.get("/", getHome(app))
app.get("/thoughts", getThoughts)
app.get("/thoughts/:id", getThoughtById)
app.post("/thoughts", postThought)
app.post("/thoughts/:id/like", postLike)
app.post("/users", postUser)
app.post("/sessions", postSession)
app.patch("/thoughts/:id", patchThought)
app.delete('/thoughts/:id', deleteThought)
app.get("/secrets", authenticateUser, getSecrets)




//#endregion

//#region ---- Starts the server ----
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})

//#endregion