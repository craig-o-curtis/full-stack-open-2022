import { AuthRoute } from "../auth";
import { Phonebook } from "../components";

const PhonebookRoute = () => (
  <AuthRoute>
    <Phonebook />
  </AuthRoute>
);

export default PhonebookRoute;
