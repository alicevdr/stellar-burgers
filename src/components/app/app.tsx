import React from 'react';
import { Routes, Route } from 'react-router-dom';

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
} from '@pages';

import '../../index.css';
import styles from './app.module.css';

const App = (): React.JSX.Element => (
  <div className={styles.app}>
    <AppHeader />
    <Routes>
      {/* --- Открытые маршруты --- */}
      <Route path="/" element={<ConstructorPage />} />
      <Route path="/feed" element={<Feed />} />

      {/* --- Модалки на открытых маршрутах --- */}
      <Route path="/feed/:number" element={<ModalOrder />} />
      <Route path="/ingredients/:id" element={<ModalIngredient />} />

      {/* --- Защищённые маршруты (пока заглушка) --- */}
      <Route
        path="/login"
        element={
          <ProtectedRoute>
            <Login />
          </ProtectedRoute>
        }
      />
      <Route
        path="/register"
        element={
          <ProtectedRoute>
            <Register />
          </ProtectedRoute>
        }
      />
      <Route
        path="/forgot-password"
        element={
          <ProtectedRoute>
            <ForgotPassword />
          </ProtectedRoute>
        }
      />
      <Route
        path="/reset-password"
        element={
          <ProtectedRoute>
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
      <Route
        path="/profile/orders/:number"
        element={
          <ProtectedRoute>
            <ModalOrder />
          </ProtectedRoute>
        }
      />

      {/* --- 404 --- */}
      <Route path="*" element={<NotFound404 />} />
    </Routes>
  </div>
);

export default App;