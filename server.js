//#region ---- Imports ----
import cors from "cors"
import express, { response } from "express"
import thoughtData from "./data.json"
import { getThoughtById } from "./endpoints/getThoughtById"
import { getThoughts } from "./endpoints/getThoughts"
import { postThought } from "./endpoints/postThought"
import { patchThought } from "./endpoints/patchThought"
import { deleteThought } from "./endpoints/deleteThought"
import { getHome } from "./endpoints/getHome"
import { Thought } from "./models/thought"
import mongoose from "mongoose"
//#endregion

//#region ---- Set up ----

const mongoUrl = process.env.MONGO_URL || 'mongodb://localhost/testing';
mongoose.connect(mongoUrl)

// The setup of the port
const port = process.env.PORT || 8080
const app = express()

// The middleware
app.use(cors())
app.use(express.json())

if (process.env.RESET_DB) {
  const seedDatabase = async () => {
    await Thought.deleteMany({});
    thoughtData.forEach(thought => {
      new Thought(thought).save();
    });
  };
  seedDatabase();
}

//#endregion

//#region ---- endpoint ----

app.get("/", getHome(app))
app.get("/thoughts", getThoughts)
app.get("/thoughts/:id", getThoughtById)
app.post("/thoughts", postThought)
app.patch("/thoughts/:id", patchThought)
app.delete('/thoughts/:id', deleteThought)

//#endregion

//#region ---- Starts the server ----
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})

//#endregion