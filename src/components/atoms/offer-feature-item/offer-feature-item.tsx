type OfferFeatureType = 'entire' | 'bedrooms' | 'adults';

type OfferFeatureItemProps = {
  content: string;
  type: OfferFeatureType;
};
function OfferFeatureItem({content, type}: OfferFeatureItemProps) {
  return <li className={`offer__feature offer__feature--${type}`} data-testid="offer-feature-item">{content}</li>;
}

export default OfferFeatureItem;
