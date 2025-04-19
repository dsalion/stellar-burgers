import { FC } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { ProfileMenuUI } from '@ui';
import { useAppDispatch } from '../../services/store';
import { logOut } from '../../services/user/user-slice';

export const ProfileMenu: FC = () => {
  const { pathname } = useLocation();
  const dispatch = useAppDispatch();
  const handleLogout = () => {
    dispatch(logOut());
  };

  return <ProfileMenuUI handleLogout={handleLogout} pathname={pathname} />;
};
