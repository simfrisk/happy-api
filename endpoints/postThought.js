import { Thought } from "../models/thought";

export const postThought = async (req, res) => {
  const { message } = req.body;
  const newThought = new Thought({ message })

  try {
    const savedNewThought = await newThought.save()

    if (!savedNewThought) {
      return res.status(400).json({
        success: false,
        response: null,
        message: 'Thought could not be saved'
      });
    }

    res.status(201).json({
      success: true,
      response: savedNewThought,
      message: 'Thought successfully saved'
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      response: error,
      message: 'Could not save thought to the database'
    });
  }
}