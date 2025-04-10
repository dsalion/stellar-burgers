import { Preloader } from '@ui';
import { JSX } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAppSelector } from 'src/services/store';

type TProtectedProps = {
  onlyUnAuth?: boolean;
  component: JSX.Element;
};

const Protected = ({
  onlyUnAuth = false,
  component
}: TProtectedProps): JSX.Element => {
  const user = useAppSelector(getUser);
  const isAuthChecked = useAppSelector(getIsAuthChecked);
  const location = useLocation();

  if (!isAuthChecked) {
    return <Preloader />;
  }

  if (!onlyUnAuth && !user) {
    return <Navigate to='/login' state={{ from: location }} />;
  }

  if (onlyUnAuth && user) {
    const { from } = location.state ?? { from: { pathname: '/' } };
    return <Navigate to={from} />;
  }

  return component;
};

export const OnlyAuth = Protected;
export const OnlyUnAuth = ({ component }: { component: JSX.Element }) => (
  <Protected onlyUnAuth component={component} />
);
