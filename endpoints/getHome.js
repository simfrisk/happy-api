import listEndpoints from "express-list-endpoints";

export const getHome = (app) => (req, res) => {
  const endpoints = listEndpoints(app);
  res.json({
    message: "Welcome to the Happy Thoughts API",
    endpoints,
    thoughtQueries: {
      minimumHearts: "http://localhost:8080/thoughts?minHearts=10",
      sortByHearts: "http://localhost:8080/thoughts?sort=hearts",
      pages: "http://localhost:8080/thoughts?page=1",
      combined: "http://localhost:8080/thoughts?minHearts=5&sort=hearts&page=1"
    }
  });
};