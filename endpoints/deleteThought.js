import { Thought } from "../models/thought"

export const deleteThought = async (req, res) => {
  const { id } = req.params

  try {
    const thought = await Thought.findByIdAndDelete(id)

    if (!thought) {
      return res.status(404).json({
        success: false,
        response: null,
        message: 'Thought could not be deleted'
      })
    }
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