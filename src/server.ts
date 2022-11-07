import app from "./app";
import AppDataSource from "./data-source";
import "dotenv/config";

(async () => {
  const PORT = process.env.PORT;

  await AppDataSource.initialize()
    .then(() => {
      console.log("Database connected");
    })
    .catch((err) => {
      console.error("Error during Data Source initialization", err);
    });

  app.listen(process.env.PORT || 3000, () => {
    console.log(`Serve running on port ${PORT}`);
  });
})();
