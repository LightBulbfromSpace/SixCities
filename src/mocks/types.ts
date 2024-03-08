type OfferData = {
  id: string;
  title: string;
  type: string;
  price: number;
  previewImage: string;
  city: {
    name: string;
    location: {
      latitude: number;
      longitude: number;
      zoom: number;
    };
  };
  location: {latitude: number;
    longitude: number;
    zoom: number;
  };
  isFavorite: boolean;
  isPremium: boolean;
  rating: number;
};

type OfferDetailData = {
  id: string;
  title: string;
  description: string;
  type: string;
  price: number;
  images: string[];
  city: {
    name: string;
    location: {
      latitude: number;
      longitude: number;
      zoom: number;
    };
  };
  location: {
    latitude: number;
    longitude: number;
    zoom: number;
  };
  goods: string[];
  host: HostUserType;
  isPremium: boolean;
  isFavorite: boolean;
  rating: number;
  bedrooms: number;
  maxAdults: number;
};

type HostUserType = {
  isPro: boolean;
  name: string;
  avatarUrl: string;
};

type CommentData = {
  id: string;
  comment: string;
  date: string;
  rating: number;
  user: {
    name: string;
    avatarUrl: string;
    isPro: boolean;
  };
};

export type {
  OfferData,
  OfferDetailData,
  HostUserType,
  CommentData,
};
