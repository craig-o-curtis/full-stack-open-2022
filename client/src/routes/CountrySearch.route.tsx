import { AuthRoute } from "../auth";
import { CountrySearch } from "../components";

const CountrySearchRoute = () => (
  <AuthRoute>
    <CountrySearch />
  </AuthRoute>
);

export default CountrySearchRoute;
