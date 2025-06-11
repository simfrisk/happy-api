//#region ---- Imports ----

import dotenv from "dotenv"
import cors from "cors"
import express, { response } from "express"
import mongoose from "mongoose"

import { authenticateUser } from "./middleware/authenticateUser.js"
import { resetDatabase } from "./setup/resetDatabase.js"

import { getHome } from "./endpoints/getHome"
import { getSecrets } from "./endpoints/getSecrets"
import { getThoughtById } from "./endpoints/getThoughtById"
import { getThoughts } from "./endpoints/getThoughts"
import { postLike } from "./endpoints/postLike"
import { postSession } from "./endpoints/postSession"
import { postThought } from "./endpoints/postThought"
import { postUser } from "./endpoints/postUser"
import { patchThought } from "./endpoints/patchThought"
import { deleteThought } from "./endpoints/deleteThought"

//#endregion

//#region ---- Set up ----

// Runs the env file
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

// Reset the database with: RESET_DB=true npm start 
resetDatabase()

//#endregion

//#region ---- endpoint ----

app.get("/", getHome(app))
app.get("/thoughts", getThoughts)
app.get("/thoughts/:id", getThoughtById)
app.get("/secrets", authenticateUser, getSecrets)
app.post("/thoughts", authenticateUser, postThought)
app.post("/thoughts/:id/like", postLike)
app.post("/users", postUser)
app.post("/sessions", postSession)
app.patch("/thoughts/:id", patchThought)
app.delete('/thoughts/:id', deleteThought)

//#endregion

//#region ---- Starts the server ----
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})

//#endregion