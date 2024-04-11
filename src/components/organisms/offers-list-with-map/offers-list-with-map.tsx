import { OfferData, CitiesType } from '../../../types';
import { Map, OffersListWithSort } from '../../molecules';
import { offersActions, offersSelectors } from '../../../store/slices/offers';
import { useActionCreators, useAppSelector } from '../../../store/helpers.ts';
import { useCallback, useEffect, useMemo } from 'react';

type OffersListWithMapProps = {
  offersFromCurrentCity: OfferData[];
  currentCity: CitiesType;
};

function OffersListWithMap({offersFromCurrentCity, currentCity}: OffersListWithMapProps) {
  const { setActiveOfferId } = useActionCreators(offersActions);
  useEffect(() => {
    setActiveOfferId(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleHoverOnCard = useCallback((id: string) => {
    setActiveOfferId(id);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleCardLeave = useCallback(() => {
    setActiveOfferId(null);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const activeOfferId = useAppSelector(offersSelectors.activeOfferId);
  const locations = useMemo(
    () => offersFromCurrentCity.map((offer) => ({ ...offer.location, id: offer.id })),
    [offersFromCurrentCity]
  );

  return (
    <>
      <OffersListWithSort
        city={currentCity}
        offers={offersFromCurrentCity}
        onCardHover={handleHoverOnCard}
        onCardLeave={handleCardLeave}
      />
      <div className="cities__right-section">
        <Map
          classType="cities"
          locations={locations}
          city={offersFromCurrentCity[0].city}
          selectedCardId={activeOfferId}
        />
      </div>
    </>
  );
}

export default OffersListWithMap;
