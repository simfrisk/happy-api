import { Request, Response } from "express";
import thoughtData from "../data.json";
import { ThoughtType } from "../types/thoughtType";

const thoughts: ThoughtType[] = thoughtData;

export const getThoughtById = (
  req: Request,
  res: Response
): Response => {
  const thought = thoughts.find(thought => thought._id === req.params.id);

  console.log(thought);

  if (!thought) {
    return res.status(404).send({ error: "Thought not found" });
  }

  return res.json(thought);
};