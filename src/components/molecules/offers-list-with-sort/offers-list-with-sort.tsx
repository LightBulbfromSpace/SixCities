import { OffersList, SortSelector } from '..';
import { OfferData } from '../../../types';
import { SortTypes } from '../../../constants';
import { CitiesType, SortTypesType } from '../../../types';
import { useCallback, useState } from 'react';
import { sortOffers } from '../../../utils';

type OfferCardsListProps = {
  offers: OfferData[];
  city: CitiesType;
  onCardHover: (id: string) => void;
  onCardLeave: () => void;
};

function OffersListWithSort({offers, city, onCardHover, onCardLeave}: OfferCardsListProps) {

  const [currentSort , setCurrentSort] = useState<SortTypesType>(SortTypes.Popular);

  const handleSetSort = useCallback((sort: SortTypesType) => {
    setCurrentSort(sort);
  }, []);

  return (
    <section className="cities__places places">
      <h2 className="visually-hidden">Places</h2>
      <b className="places__found">{offers.length} place{offers.length > 1 && 's'} to stay in {city}</b>
      <SortSelector selectedSort={currentSort} onSelect={handleSetSort}/>
      <OffersList
        offers={sortOffers(currentSort, offers)}
        classNames={'cities__places-list places__list tabs__content'}
        onHoverOnCard={onCardHover}
        onCardLeave={onCardLeave}
        placeType={'cities'}
        hasVerticalLayout
      />
    </section>
  );
}

export default OffersListWithSort;
