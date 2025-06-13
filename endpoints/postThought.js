import { Thought } from "../models/thought";

export const postThought = async (req, res) => {
  const { message } = req.body;
  const user = req.user;

  try {
    const newThought = new Thought({
      message,
      createdBy: user._id
    });

    const savedNewThought = await newThought.save();

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
      message: "Thought created"
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      response: error,
      message: "Could not post thought"
    });
  }
};