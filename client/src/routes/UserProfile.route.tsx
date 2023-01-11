import { AuthRoute } from 'auth';
import { UserProfile } from 'components';

const UserProfileRoute = () => (
  <AuthRoute>
    <UserProfile />
  </AuthRoute>
);

export default UserProfileRoute;
