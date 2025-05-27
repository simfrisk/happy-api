import cors from "cors"
import express from "express"
import thoughtData from "./data.json"

// Defines the port the app will run on. Defaults to 8080, but can be overridden
// when starting the server. Example command to overwrite PORT env variable value:
// PORT=9000 npm start
const port = process.env.PORT || 8080
const app = express()

// Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(express.json())

// Start defining your routes here
app.get("/", (req, res) => {
  res.send("Hello Simon!")
})

app.get("/thoughts", (req, res) => {
  res.json(thoughtData)
})

app.get("/thoughts/:id", (req, res) => {
  const thought = thoughtData.find(thought => thought._id === req.params.id)

  console.log(thought)

  if (!thought) {
    return res.send("error: Thought not found")
  }

  res.json(thought)
})

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
