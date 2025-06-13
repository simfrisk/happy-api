import { Thought } from "../models/thought";
import { getPages } from "../utils/getPages";
import { getSortedThoughts } from "../utils/getSortedThoughts";
import { getFilteredThoughts } from "../utils/getFiltredThoughts"

export const getThoughts = async (req, res) => {
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
    } else {
      // Always sort by createdAt descending if not sorting by hearts
      result = result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    // Page function
    // URL example: http://localhost:8080/thoughts?page=1
    const pagedResults = getPages(result, page)
    // const totalPages = Math.ceil(result.length / 10)

    // res.json({
    //   pagedResults,
    //   totalPages
    // })
    res.json(pagedResults)
  } catch (error) {
    console.error("Error fetching thoughts:", error)
    res.status(500).json({ error: "Failed to fetch thoughts." })
  }
}

