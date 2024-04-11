import { ReactElement, useCallback } from 'react';
import { Cities } from '../../../constants';
import { CitiesType } from '../../../types';
import { TabButton } from '../../atoms';
import { createMainRouteWithCity, isCity } from '../../../utils';

type CityTabsProps = {
  onCityChange: (city: CitiesType) => void;
  currTab: CitiesType;
};

function CityTabs({onCityChange, currTab}: CityTabsProps): ReactElement {
  const handleTabChange = useCallback((city: string) => {
    if (isCity(city)) {
      onCityChange(city);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="tabs">
      <section className="locations container">
        <ul className="locations__list tabs__list">
          {
            Object.values(Cities).map((cityName) => (
              <TabButton
                key={cityName}
                tabName={cityName}
                isSelected={cityName.toLowerCase() === currTab.toLowerCase()}
                onClick={handleTabChange}
                link={createMainRouteWithCity(cityName)}
              />
            ))
          }
        </ul>
      </section>
    </div>
  );
}

export default CityTabs;
