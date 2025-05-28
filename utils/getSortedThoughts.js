
export const getSortedThoughts = (thoughts, heartsQuery) => {
  let sortedThoughts = thoughts

  if (heartsQuery) {
    sortedThoughts = [...thoughts].sort((a, b) => b.hearts - a.hearts)
  }

  return sortedThoughts
}