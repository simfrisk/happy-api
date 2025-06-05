export const getFilteredThoughts = (thoughts, heartsQuery) => {
  let filteredThoughts = thoughts

  if (heartsQuery) {
    filteredThoughts = filteredThoughts.filter(
      (thought) => Number(thought.hearts) >= Number(heartsQuery)
    )
  }

  return filteredThoughts
};