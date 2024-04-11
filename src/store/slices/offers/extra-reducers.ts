import { OffersStateType } from './index.ts';
import { PayloadAction } from '@reduxjs/toolkit';
import { CommentData, OfferData, OfferDetailData } from '../../../types';
import { MAX_NEARBY_OFFER_PER_PAGE, RequestStatus } from '../../../constants';

const setOffersFulfilled = (state: OffersStateType, action: PayloadAction<OfferData[]>) => {
  state.offers = action.payload;
  state.offersRequestStatus = RequestStatus.Success;
};

const setOffersRejected = (state: OffersStateType) => {
  state.offers = [];
  state.offersRequestStatus = RequestStatus.Error;
};

const setOffersLoading = (state: OffersStateType) => {
  state.offersRequestStatus = RequestStatus.Loading;
};

const toggleFavoriteStatus = (
  state: OffersStateType, action: PayloadAction<unknown, string, { arg: { id: OfferData['id'] } }>
) => {
  const i = state.offers.findIndex(({ id }) => id === action.meta.arg.id);

  if (i > -1) {
    state.offers[i].isFavorite = !state.offers[i].isFavorite;
  }
};

const updateFavorites = (
  state: OffersStateType, action: PayloadAction<OfferData[]>
) => {
  for (let i = 0; i < state.offers.length; i++) {
    state.offers[i].isFavorite = false;
  }

  action.payload.forEach((offer) => {
    const i = state.offers.findIndex(({ id }) => id === offer.id);

    if (i > -1) {
      state.offers[i].isFavorite = true;
    } else {
      state.offers.push(offer);
    }
  });
};

const setDataLoading = (state: OffersStateType) => {
  state.offersRequestStatus = RequestStatus.Loading;
};

const setDetailOfferFulfilled = (state: OffersStateType, action: PayloadAction<OfferDetailData>) => {
  const { payload } = action;
  const offerData = {
    id: payload.id,
    title: payload.title,
    type: payload.type,
    price: payload.price,
    previewImage: payload.previewImage,
    city: payload.city,
    location: payload.location,
    isFavorite: payload.isFavorite,
    isPremium: payload.isPremium,
    rating: payload.rating,
  };
  const index = state.offers.findIndex(({id}) => id === payload.id);

  if (index === -1) {
    state.offers.push(offerData);
  } else {
    state.offers[index] = offerData;
  }

  state.additionalOfferData = {
    id: payload.id,
    description: payload.description,
    images: payload.images,
    goods: payload.goods,
    host: payload.host,
    bedrooms: payload.bedrooms,
    maxAdults: payload.maxAdults,
  };

  state.offersRequestStatus = RequestStatus.Success;
};

const setDetailOfferRejected = (state: OffersStateType) => {
  state.additionalOfferData = null;
  state.offersRequestStatus = RequestStatus.Error;
};

const setNearbyOffersFulfilled = (state: OffersStateType, action: PayloadAction<OfferData[]>) => {
  const nearby = action.payload.slice(0, MAX_NEARBY_OFFER_PER_PAGE);
  const existingOfferIds = new Set(state.offers.map(({ id }) => id));
  const nearbyIds: Array<OfferData['id']> = [];

  nearby.forEach((offer) => {
    if (!existingOfferIds.has(offer.id)) {
      state.offers.push(offer);
      existingOfferIds.add(offer.id); // Prevents adding duplicates within the same action
    }

    nearbyIds.push(offer.id);
  });

  state.nearbyOffersIds = nearbyIds;
  state.offersRequestStatus = RequestStatus.Success;
};

const setNearbyOffersRejected = (state: OffersStateType) => {
  state.nearbyOffersIds = [];
  state.offersRequestStatus = RequestStatus.Error;
};

const setReviewsFulfilled = (state: OffersStateType, action: PayloadAction<CommentData[]>) => {
  state.detailOfferReviews = action.payload;
  state.offersRequestStatus = RequestStatus.Success;
};

const setReviewsRejected = (state: OffersStateType) => {
  state.detailOfferReviews = null;
  state.offersRequestStatus = RequestStatus.Error;
};

const addReviewPending = (state: OffersStateType) => {
  state.reviewRequestStatus = RequestStatus.Loading;
};

const addReviewFulfilled = (state: OffersStateType, action: PayloadAction<CommentData>) => {
  state.detailOfferReviews = [...state.detailOfferReviews ?? [], action.payload];
  state.reviewRequestStatus = RequestStatus.Success;
};

const addReviewRejected = (state: OffersStateType) => {
  state.reviewRequestStatus = RequestStatus.Error;
};


export {
  setOffersFulfilled,
  setOffersRejected,
  setOffersLoading,
  toggleFavoriteStatus,
  updateFavorites,
  setDataLoading,
  setDetailOfferFulfilled,
  setDetailOfferRejected,
  setNearbyOffersFulfilled,
  setNearbyOffersRejected,
  setReviewsFulfilled,
  setReviewsRejected,
  addReviewPending,
  addReviewFulfilled,
  addReviewRejected,
};
