
import app from "./app"
const PORT: number | string = 3000 || process.env.PORT;

app.listen(PORT, () => {
  console.log("Server listening on PORT", PORT);
});

