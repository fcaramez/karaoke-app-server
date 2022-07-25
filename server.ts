const app = require("./app");
const PORT: number | string = 5005 || process.env.PORT;

app.listen(PORT, () => {
  console.log("Server listening on PORT", PORT);
});
