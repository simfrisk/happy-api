import cors from "cors"
import express from "express"
import thoughtData from "./data.json"
import { getSortedThoughts } from "./utils/getSortedThoughts"
import { getFilteredThoughts } from "./utils/getFiltredThoughts"
import { getThoughtById } from "./endpoints/getThoughtById"
import { getHome } from "./endpoints/getHome"

// The setup of the port
const port = process.env.PORT || 8080
const app = express()

// The middleware
app.use(cors())
app.use(express.json())

// The home with the api documentation
app.get("/", getHome(app))

// The main thoughts and querys
app.get("/thoughts", (req, res) => {
  const { minHearts, sort } = req.query

  let result = thoughtData

  // Filters the hearts by the number and above
  if (minHearts) {
    result = getFilteredThoughts(result, minHearts)
  }

  // Sorts the heart in an accending order
  if (sort === "hearts") {
    result = getSortedThoughts(result, true)
  }

  res.json(result)
})

//Get an endpoint for a specific thought by ID
app.get("/thoughts/:id", getThoughtById)


// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
