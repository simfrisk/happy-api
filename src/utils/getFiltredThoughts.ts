import { ThoughtType } from "../types/thoughtType";

export const getFilteredThoughts = (
  thoughts: ThoughtType[],
  heartsQuery: string
): ThoughtType[] => {
  let filteredThoughts = thoughts

  if (heartsQuery) {
    filteredThoughts = filteredThoughts.filter(
      (thought) => Number(thought.hearts) >= Number(heartsQuery)
    )
  }

  return filteredThoughts
};