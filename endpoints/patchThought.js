import { Thought } from "../models/thought"

export const patchThought = async (req, res) => {
  const { id } = req.params
  const { newMessage } = req.body

  try {
    const thought = await Thought.findByIdAndUpdate(id, { message: newMessage }, { new: true, runValidators: true })
    if (!thought) {
      return res.status(400).json({
        success: false,
        response: null,
        message: 'Thought could not be changed'
      });
    }

    res.status(201).json({
      success: true,
      response: thought,
      message: 'Thought successfully changed'
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      response: error,
      message: 'Could not change thought in the database'
    });
  }
}