import {ReactElement, useEffect} from 'react';
import { Header, OffersListWithMap } from '../../organisms';
import { CityTabs, MainEmptyState } from '../../molecules';
import { AppRoute, Cities, RequestStatus } from '../../../constants';
import { CitiesType } from '../../../types';
import { redirect, useNavigate, useParams } from 'react-router-dom';
import { createMainRouteWithCity, isCity } from '../../../utils';
import classNames from 'classnames';
import { useAppSelector } from '../../../store/helpers.ts';
import { capitalize } from '../../../utils';
import { offersSelectors } from '../../../store/slices/offers';
import { Loader } from '../../molecules';

function MainPage(): ReactElement | null {
  const filterCityName = (city: string) => isCity(city) ? city : null;
  const navigate = useNavigate();

  const { city: cityFromPath = Cities.Paris } = useParams();

  const currentCity = filterCityName(capitalize(cityFromPath?.toLowerCase() ?? ''));
  const offersFromCurrentCity = useAppSelector(offersSelectors.offers)
    .filter((item) => item.city.name === currentCity);
  const requestStatus = useAppSelector(offersSelectors.offersRequestStatus);

  useEffect(() => {
    if (!currentCity) {
      navigate(AppRoute.NotFound);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentCity]);

  if (!currentCity) {
    return null;
  }

  const isEmpty = offersFromCurrentCity.length === 0;
  const mainClassName = classNames(
    'page__main',
    'page__main--index',
    {'page__main--index-empty': isEmpty },
  );
  const divClassname = classNames(
    'container',
    'cities__places-container',
    {'cities__places-container--empty': isEmpty},
  );

  const handleCitySelect = (cityName: CitiesType) => {
    redirect(createMainRouteWithCity(cityName));
  };

  return (
    <div className="page page--gray page--main" data-testid="main-page">
      <Header isLogoActive/>
      <main className={mainClassName}>
        <h1 className="visually-hidden">Cities</h1>
        <CityTabs onCityChange={handleCitySelect} currTab={currentCity}/>
        {
          requestStatus === RequestStatus.Loading
            ? <Loader/>
            : (
              <div className="cities">
                <div className={divClassname}>
                  {
                    isEmpty
                      ? <MainEmptyState city={currentCity}/>
                      : <OffersListWithMap offersFromCurrentCity={offersFromCurrentCity} currentCity={currentCity} />
                  }
                </div>
              </div>
            )
        }
      </main>
    </div>
  );
}

export default MainPage;
