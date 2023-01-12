import { AuthRoute } from 'auth';
import { Course } from 'components';

const CourseRoute = () => (
  <AuthRoute>
    <Course />
  </AuthRoute>
);

export default CourseRoute;
