//#region ---- Imports ----
import cors from "cors"
import express from "express"
import thoughtDataRaw from "./data.json"
import { getSortedThoughts } from "./utils/getSortedThoughts"
import { getFilteredThoughts } from "./utils/getFiltredThoughts"
import { getThoughtById } from "./endpoints/getThoughtById"
import { getHome } from "./endpoints/getHome"
import { getPages } from "./utils/getPages"
import { ThoughtType } from "./types/thoughtType"
import { Request, Response } from "express";
//#endregion

const thoughtData: ThoughtType[] = thoughtDataRaw;

//#region ---- Set up ----
// The setup of the port
const port = process.env.PORT || 8080
const app = express()

// The middleware
app.use(cors())
app.use(express.json())

//#endregion

//#region ---- endpoint ----
// The home with the api documentation
app.get("/", getHome(app) as express.RequestHandler)

// The main thoughts and querys
app.get("/thoughts", (
  req: Request,
  res: Response
) => {

  interface ThoughtsQueryTypes {
    minHearts?: string
    sort?: string
    page?: string
  }

  const { minHearts, sort, page } = req.query as ThoughtsQueryTypes
  let result = thoughtData

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
  const pagedResults = getPages(result, page ? Number(page) : 1)

  //Renders the Thoughts
  res.json(pagedResults)
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