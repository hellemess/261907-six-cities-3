const AUTHORIZATION_TOKEN_KEY = 'six-cities-token';

const BACKEND_URL = 'https://15.design.htmlacademy.pro/six-cities';

const CITIES = ['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'];

const EMAIL_CHECKING_REGEXP = new RegExp(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/);

const ERROR_TIMEOUT = 2000;

const MIN_COMMENT_LENGTH = 50;

const REQUEST_TIMEOUT = 5000;

const URL_MARKER = '/img/pin.svg';

const URL_MARKER_ACTIVE = '/img/pin-active.svg';

enum ApiRoute {
  Offers = '/offers',
  Favorite = '/favorite',
  Comments = '/comments',
  Login = '/login',
  Logout = '/logout'
}

enum AppRoute {
  Main = '/',
  Login = '/login',
  Favorites = '/favorites',
  Offer = '/offer',
  Offers = '/offers',
  Comments = '/comments'
}

enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN'
}

enum BookMarkButtonClass {
  PlaceCard = 'place-card',
  Offer = 'offer'
}

enum CardClass {
  Cities = 'cities',
  Favorites = 'favorites',
  NearPlaces = 'near-places'
}

enum MapClass {
  Cities = 'cities',
  Offer = 'offer'
}

enum Rating {
  Perfect = 'perfect',
  Good = 'good',
  NotBad = 'not bad',
  Badly = 'badly',
  Terribly = 'terribly'
}

enum Sorting {
  Popular = 'Popular',
  PriceAsc = 'Price: low to high',
  PriceDesc = 'Price: high to low',
  TopRated = 'Top rated first'
}

export {
  AUTHORIZATION_TOKEN_KEY,
  BACKEND_URL,
  CITIES,
  EMAIL_CHECKING_REGEXP,
  ERROR_TIMEOUT,
  MIN_COMMENT_LENGTH,
  REQUEST_TIMEOUT,
  URL_MARKER,
  URL_MARKER_ACTIVE,
  ApiRoute,
  AppRoute,
  AuthorizationStatus,
  BookMarkButtonClass,
  CardClass,
  MapClass,
  Rating,
  Sorting
};
