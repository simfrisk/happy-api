import thoughtData from "../data.json";

export const getThoughtById = (req, res) => {
  const thought = thoughtData.find(thought => thought._id === req.params.id);

  console.log(thought);

  if (!thought) {
    return res.status(404).send({ error: "Thought not found" });
  }

  res.json(thought);
};