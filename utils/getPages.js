export const getPages = (result, page = 1, pageLenght = 10) => {
  const pageNumber = Number(page)
  const start = (pageNumber - 1) * pageLenght
  const end = start + pageLenght
  return result.slice(start, end)
}