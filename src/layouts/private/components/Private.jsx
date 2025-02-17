import { Routes, Route, Navigate } from 'react-router-dom';
import { privateRoutes } from '../../../navigation/Routes';

const PrivateComponent = () => {

  return (
    <Routes>

      {
        privateRoutes.map(({ path, element }) => <Route key={path} path={path} element={element} />)
      }

      <Route path="*" element={<Navigate to="/userDashboard" replace />} />
    </Routes>
  );
};

export default PrivateComponent;