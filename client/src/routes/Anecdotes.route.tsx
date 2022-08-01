import { AuthRoute } from "../auth";
import { Anecdotes } from "../components";

const AnecdotesRoute = () => (
  <AuthRoute>
    <Anecdotes />
  </AuthRoute>
);

export default AnecdotesRoute;
