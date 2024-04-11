import { ReviewComment } from '../index.ts';
import { CommentData } from '../../../types';
import { MAX_REVIEWS_PER_PAGE } from '../../../constants';

type ReviewsListProps = {
  reviews: CommentData[];
};

const prepareReviews = (reviews: CommentData[]) => (
  [...reviews]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, MAX_REVIEWS_PER_PAGE)
);

function ReviewsList({reviews}: ReviewsListProps) {
  return (
    <ul className="reviews__list">
      {
        prepareReviews(reviews)
          .map((review) => <ReviewComment key={review.id} review={review}/>)
      }
    </ul>
  );
}

export default ReviewsList;
