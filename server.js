//#region ---- Imports ----
import cors from "cors"
import express from "express"
import thoughtData from "./data.json"
import { getSortedThoughts } from "./utils/getSortedThoughts"
import { getFilteredThoughts } from "./utils/getFiltredThoughts"
import { getThoughtById } from "./endpoints/getThoughtById"
import { getHome } from "./endpoints/getHome"
import { getPages } from "./utils/getPages"
import { mongoose } from "mongoose"
//#endregion

const mongoUrl = process.env.MONGO_URL || 'mongodb://localhost/testing';
mongoose.connect(mongoUrl)

//#region ---- Set up ----
// The setup of the port
const port = process.env.PORT || 8080
const app = express()

// The middleware
app.use(cors())
app.use(express.json())

const ThoughtSchema = new mongoose.Schema({
  _id: String,
  message: String,
  hearts: Number,
  createdAt: {
    type: Date,
    default: Date.now
  },
  __v: Number
})

const Thought = mongoose.model("Thought", ThoughtSchema)

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
// The home with the api documentation
app.get("/", getHome(app))

// The main thoughts and querys
app.get("/thoughts", async (req, res) => {
  try {
    const { minHearts, sort, page } = req.query
    let result = await Thought.find()

    // Filters the hearts by the number and above
    // URL example: http://localhost:8080/thoughts?minHearts=10
    if (minHearts) {
      result = getFilteredThoughts(result, minHearts)
    }

    // Sorts the heart in an accending order
    //URL exapmle: http://localhost:8080/thoughts?sort=hearts
    if (sort === "hearts") {
      result = getSortedThoughts(result, true)
    }

    // Page function
    // URL example: http://localhost:8080/thoughts?page=1
    const pagedResults = getPages(result, page)
    res.json(pagedResults)
  } catch (error) {
    console.error("Error fetching thoughts:", error)
    res.status(500).json({ error: "Failed to fetch thoughts." })
  }
})

//Get an endpoint for a specific thought by ID
// URL example: http://localhost:8080/thoughts/682e48bf4fddf50010bbe737
app.get("/thoughts/:id", getThoughtById)

//#endregion

//#region ---- Starts the server ----
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})

//#endregion