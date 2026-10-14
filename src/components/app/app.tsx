import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

import { fetchIngredients } from '@slices/ingredients-slice';
import {
  AppHeader,
  ProtectedRoute,
  ModalOrder,
  ModalIngredient,
} from '@components';
import {
  ConstructorPage,
  Feed,
  Login,
  Register,
  ForgotPassword,
  ResetPassword,
  Profile,
  ProfileOrders,
  NotFound404,
  IngredientPage,
  OrderPage,
} from '@pages';
import { fetchUser, setAuthChecked } from '@slices/user-slice';
import { useDispatch } from '@services/store';

import '../../index.css';
import styles from './app.module.css';

const App = (): React.JSX.Element => {
  const dispatch = useDispatch();
  const location = useLocation();
  const background = location.state?.background;

  useEffect(() => {
    dispatch(fetchIngredients());
    if (localStorage.getItem('refreshToken')) {
      dispatch(fetchUser());
    } else {
      dispatch(setAuthChecked(true));
    }
  }, [dispatch]);

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes location={background || location}>
        <Route path="/" element={<ConstructorPage />} />
        <Route path="/feed" element={<Feed />} />
        <Route path="/ingredients/:id" element={<IngredientPage />} />
        <Route path="/feed/:number" element={<OrderPage />} />

        {/* ⬇️ ЗАЩИЩЁННЫЙ маршрут */}
        <Route
          path="/profile/orders/:number"
          element={
            <ProtectedRoute>
              <OrderPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/login"
          element={
            <ProtectedRoute onlyUnAuth>
              <Login />
            </ProtectedRoute>
          }
        />
        <Route
          path="/register"
          element={
            <ProtectedRoute onlyUnAuth>
              <Register />
            </ProtectedRoute>
          }
        />
        <Route
          path="/forgot-password"
          element={
            <ProtectedRoute onlyUnAuth>
              <ForgotPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path="/reset-password"
          element={
            <ProtectedRoute onlyUnAuth>
              <ResetPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile/orders"
          element={
            <ProtectedRoute>
              <ProfileOrders />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<NotFound404 />} />
      </Routes>

      {background && (
        <Routes>
          <Route path="/ingredients/:id" element={<ModalIngredient />} />
          <Route path="/feed/:number" element={<ModalOrder />} />
          <Route
            path="/profile/orders/:number"
            element={
              <ProtectedRoute>
                <ModalOrder />
              </ProtectedRoute>
            }
          />
        </Routes>
      )}
    </div>
  );
};

export default App;