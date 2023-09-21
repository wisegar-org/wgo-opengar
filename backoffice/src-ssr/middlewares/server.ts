import { ssrMiddleware } from "quasar/wrappers";

export default ssrMiddleware(({ app }) => {
  app.get("/tmp", (req, res) => {
    res.send("Send response");
  });
});
