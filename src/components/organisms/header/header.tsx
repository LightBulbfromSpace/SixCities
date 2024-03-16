import { HeaderLogoIcon } from '../../atoms';
import { ReactElement } from 'react';
import { useAuthStatus } from '../../../hooks';
import { APP_ROUTE, AUTH_STATUS } from '../../../constants';
import { ProfileData, SignInButton, SignOutButton } from '../../atoms/header';

// todo: remove later
type ProfileDataProps = {
  link: string;
  email: string;
  favoritesCounter: number;
};

type HeaderProps = {
  isLogoActive?: boolean;
};

function Header({ isLogoActive }: HeaderProps) {
  //todo: get info from Redux (?)
  const profileData: ProfileDataProps = {
    link: APP_ROUTE.Favorites,
    email: 'Oliver.conner@gmail.com',
    favoritesCounter: 3,
  };

  const navListData: ReactElement = useAuthStatus() === AUTH_STATUS.Auth ? (
    <>
      <ProfileData
        link={profileData.link}
        email={profileData.email}
        favoritesCounter={profileData.favoritesCounter}
      />
      <SignOutButton link={'#'} />
    </>
  ) : (
    <SignInButton link={APP_ROUTE.Login} />
  );

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <HeaderLogoIcon isActive={isLogoActive} size="medium"/>
          <nav className="header__nav">
            <ul className="header__nav-list">
              {navListData}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
