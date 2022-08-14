import { AuthRoute } from "../auth";
import { Feedback } from "../components";

const FeedbackRoute = () => (
  <AuthRoute>
    <Feedback />
  </AuthRoute>
);

export default FeedbackRoute;
