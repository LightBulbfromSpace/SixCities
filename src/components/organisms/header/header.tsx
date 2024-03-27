import { HeaderLogoIcon } from '../../atoms';
import { ReactElement } from 'react';
import { useAuthStatus } from '../../../hooks';
import { APP_ROUTE, AUTH_STATUS } from '../../../constants';
import { ProfileData, SignInButton, SignOutButton } from '../../atoms/header';
import { useAppSelector } from '../../../store/helpers.ts';
import { userSelectors } from '../../../store/slices/user';
import { offersSelectors } from '../../../store/slices/offers';

type HeaderProps = {
  isLogoActive?: boolean;
};

function Header({ isLogoActive }: HeaderProps) {
  const profileData = useAppSelector(userSelectors.user);
  const favoritesCounter = useAppSelector(offersSelectors.favoriteOffers).length;

  const navListData: ReactElement = useAuthStatus() === AUTH_STATUS.Auth ? (
    <>
      <ProfileData
        avatarUrl={profileData?.avatarUrl}
        email={profileData?.email ?? ''}
        favoritesCounter={favoritesCounter}
      />
      <SignOutButton />
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
