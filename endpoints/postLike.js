import { Thought } from "../models/thought";

export const postLike = async (req, res) => {
  const { id } = req.params;

  try {
    const updatedThought = await Thought.findByIdAndUpdate(
      id,
      { $inc: { hearts: 1 } },
      { new: true }
    );

    if (!updatedThought) {
      return res.status(400).json({
        success: false,
        response: null,
        message: 'Thought could not be liked'
      });
    }

    res.status(201).json({
      success: true,
      response: updatedThought,
      message: 'Thought successfully liked'
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      response: error,
      message: 'Could not like thought to the database'
    });
  }
};