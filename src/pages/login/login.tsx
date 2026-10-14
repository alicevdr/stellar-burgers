import { LoginUI } from '@ui-pages';
import { type SyntheticEvent, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { loginUser } from '@slices/user-slice';
import { useDispatch, useSelector } from '@services/store';
import type { RootState } from '@services/store';

export const Login = (): React.JSX.Element => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const error = useSelector((state: RootState) => state.user.error);

  const handleSubmit = (e: SyntheticEvent): void => {
    e.preventDefault();

    dispatch(loginUser({ email, password }))
      .unwrap()
      .then(() => {
        const from = location.state?.from?.pathname || '/';
        navigate(from, { replace: true });
      })
      .catch(() => {
      });
  };

  return (
    <LoginUI
      errorText={error ?? ''}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};