import { Routes, Route, Navigate } from 'react-router-dom';
import { publicRoutes } from '../../../navigation/Routes';

const PublicComponent = () => {

  return (
    <Routes>

      {
        publicRoutes.map(({ path, element }) => <Route key={path} path={path} element={element} />)
      }

      <Route path="*" element={<Navigate to="/signin" replace />} />
    </Routes>
  );
};

export default PublicComponent;