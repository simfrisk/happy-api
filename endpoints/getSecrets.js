export const getSecrets = (req, res) => {
  res.json({ secret: "This is secret" });
};

// app.get("/secrets", authenticateUser)
// app.get("/secrets", (req, res) => {
//   res.json({
//     secret: "This is secret"
//   })
// })