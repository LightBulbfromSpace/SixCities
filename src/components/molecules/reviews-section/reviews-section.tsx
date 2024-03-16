import { CommentData } from '../../../types';
import { ReviewForm, ReviewsList } from '..';
import { useAuthStatus } from '../../../hooks';
import { AUTH_STATUS } from '../../../constants';

type ReviewsSectionProps = {
  reviews: CommentData[];
};

function ReviewsSection({reviews}: ReviewsSectionProps) {
  return (
    <section className="offer__reviews reviews">
      <h2 className="reviews__title">
        Reviews · <span className="reviews__amount">{reviews.length}</span>
      </h2>
      <ReviewsList reviews={reviews} />
      {useAuthStatus() === AUTH_STATUS.Auth && <ReviewForm />}
    </section>
  );
}

export default ReviewsSection;
