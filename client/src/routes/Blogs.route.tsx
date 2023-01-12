import { AuthRoute } from 'auth';
import { Blogs } from 'components';

const AnecdotesRoute = () => (
  <AuthRoute>
    <Blogs />
  </AuthRoute>
);

export default AnecdotesRoute;
