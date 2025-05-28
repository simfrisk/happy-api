import { ThoughtType } from "../types/thoughtType"

export const getSortedThoughts = (
  thoughts: ThoughtType[],
  heartsQuery: boolean
): ThoughtType[] => {
  let sortedThoughts = thoughts

  if (heartsQuery) {
    sortedThoughts = [...thoughts].sort((a, b) => b.hearts - a.hearts)
  }

  return sortedThoughts
}