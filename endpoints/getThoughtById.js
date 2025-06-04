import { response } from "express";
import thoughtData from "../data.json";
import { Thought } from "../models/thought";

export const getThoughtById = async (req, res) => {
  const { id } = req.params

  try {
    const thought = await Thought.findById(id)
    if (!thought) {
      return res.status(400).json({
        success: false,
        response: null,
        message: 'Thought not found'
      })
    }
    res.status(200).json({
      success: true,
      response: thought,
      message: 'The flower was found'
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      response: error,
      message: 'Thought could not be found'
    })
  }

}

//   const thought = thoughtData.find(thought => thought._id === req.params.id);

//   console.log(thought);

//   if (!thought) {
//     return res.status(404).send({ error: "Thought not found" });
//   }

//   res.json(thought);
// };