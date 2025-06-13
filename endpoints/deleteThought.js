import { Thought } from "../models/thought"

export const deleteThought = async (req, res) => {
  const { id } = req.params
  const userId = req.user._id;

  try {
    const thought = await Thought.findById(id)

    if (!thought) {
      return res.status(404).json({
        success: false,
        response: null,
        message: 'Thought could not be found'
      })
    }

    // Check if the current user owns the thought
    if (thought.createdBy.toString() !== userId.toString()) {
      return res.status(403).json({
        success: false,
        message: "You are not allowed to delete this thought"
      });
    }

    await thought.deleteOne();

    res.status(200).json({
      success: true,
      response: thought,
      message: 'The thought was deleted'
    })

  } catch (error) {
    res.status(500).json({
      success: false,
      response: error,
      message: 'Could not delete thought'
    }
    )
  }
}