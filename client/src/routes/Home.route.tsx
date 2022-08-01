import { AuthRoute } from "../auth";
import { Home } from "../components";

const HomeRoute = () => (
  <AuthRoute>
    <Home />
  </AuthRoute>
);
export default HomeRoute;
