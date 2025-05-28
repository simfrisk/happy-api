import cors from "cors"
import express from "express"
import thoughtData from "./data.json"
import listEndpoints from 'express-list-endpoints'

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
  const endpoints = listEndpoints(app)
  res.json({
    message: "Welcome to the Happy Thoughts API",
    endpoints: endpoints
  })

});

app.get("/thoughts", (req, res) => {

  const { hearts } = req.query

  let sortedThoughts = thoughtData

  if (hearts) {
    sortedThoughts = sortedThoughts.sort((a, b) => a.hearts - b.hearts)
  }

  res.json(sortedThoughts)
})

app.get("/thoughts/:id", (req, res) => {
  const thought = thoughtData.find(thought => thought._id === req.params.id)

  console.log(thought)

  if (!thought) {
    return res.send("error: Thought not found")
  }

  res.json(thought)
})

// app.get("/flowers", (req, res) => {

//   const { color, symbol } = req.query

//   let filteredFlowers = flowerData

//   if (color) {
//     filteredFlowers = filteredFlowers.filter(flower => flower.color.toLowerCase() === color.toLowerCase())
//   }

//   if (symbol) {
//     filteredFlowers = filteredFlowers.filter(flower =>
//       flower.symbolism.some(word => word.toLowerCase() === symbol.toLowerCase())
//     )
//   }

//   res.json(filteredFlowers)
// })


// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
