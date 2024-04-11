import { RatingButton } from '../../molecules';
import { ChangeEvent, ChangeEventHandler, FormEventHandler, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/helpers.ts';
import { addCommentAction } from '../../../store/slices/offers/thunk.ts';
import { offersSelectors } from '../../../store/slices/offers';
import { RequestStatus, ReviewLength } from '../../../constants';
import { ReviewType } from '../../../types';
import { useDetailOffer } from '../../../hooks';

type HandleOnChangeType = ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>;

function ReviewForm() {
  const dispatch = useAppDispatch();
  const initialReviewState: ReviewType = {
    rating: 0,
    comment: '',
  };

  const [review, setReview] = useState(initialReviewState);

  const handleChange: HandleOnChangeType = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.currentTarget;

    setReview({
      ...review,
      [name]: name === 'rating' ? Number(value) : value,
    });
  };


  const offerId = useDetailOffer()?.id || '';

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    dispatch(
      addCommentAction({
        id: offerId,
        comment: review.comment,
        rating: review.rating,
      })
    )
      .unwrap()
      .then(() => {
        setReview(initialReviewState);
      })
      // eslint-disable-next-line no-console
      .catch(console.error);
  };

  const isLoading = useAppSelector(offersSelectors.reviewRequestStatus) === RequestStatus.Loading;

  return (
    <form className="reviews__form form" onSubmit={handleSubmit}>
      <label className="reviews__label form__label" htmlFor="review">
        Your review
      </label>
      <div className="reviews__rating-form form__rating">
        <RatingButton handleChange={handleChange} value={review.rating} isDisabled={isLoading}/>
      </div>
      <textarea
        className="reviews__textarea form__textarea"
        id="comment"
        name="comment"
        placeholder="Tell how was your stay, what you like and what can be improved"
        value={review.comment}
        onChange={handleChange}
        disabled={isLoading}
      />
      <div className="reviews__button-wrapper" >
        <p className="reviews__help">
          To submit review please make sure to set{' '}
          <span className="reviews__star">rating</span> and describe
          your stay with at least{' '}
          <b className="reviews__text-amount">50 characters</b> and no longer than <b className="reviews__text-amount">300 characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={
            review.comment.length < ReviewLength.Min
            || review.comment.length > ReviewLength.Max
            || review.rating <= 0
            || isLoading
          }
        >
          Submit
        </button>
      </div>
    </form>
  );
}

export default ReviewForm;
