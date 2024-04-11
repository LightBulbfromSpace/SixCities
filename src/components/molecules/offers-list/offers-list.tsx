import { OfferCard } from '..';
import { OfferCardStyleClassType, OfferData } from '../../../types';

type OffersListProps = {
  offers: OfferData[];
  classNames: string;
  onHoverOnCard?: (id: string) => void;
  onCardLeave?: () => void;
  placeType: OfferCardStyleClassType;
  hasVerticalLayout: boolean;
};

function OffersList(props: OffersListProps) {
  return (
    <div className={props.classNames}>
      {
        props.offers.map((place) => (
          <OfferCard
            {...place}
            key={place.id}
            onMouseEnter={props.onHoverOnCard}
            onMouseLeave={props.onCardLeave}
            placeType={props.placeType}
            hasVerticalLayout={props.hasVerticalLayout}
          />
        ))
      }
    </div>
  );
}

export default OffersList;
