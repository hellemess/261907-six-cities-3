import {useEffect} from 'react';
import {useParams} from 'react-router-dom';
import cn from 'classnames';
import {AuthorizationStatus, BookMarkButtonClass, CardClass, MapClass} from '../../const';
import {capitalize} from '../../utils';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {requestNearPlacesAction, requestReviewsForOfferAction, requestStandaloneOfferAction} from '../../store/api-action';
import NotFoundScreen from '../not-found-screen/not-found-screen';
import Header from '../../component/header/header';
import UserInfo from '../../component/user-info/user-info';
import BookmarkButton from '../../component/bookmark-button/bookmark-button';
import ReviewsList from '../../component/reviews-list/reviews-list';
import CommentForm from '../../component/comment-form/comment-form';
import Map from '../../component/map/map';
import OffersList from '../../component/offers-list/offers-list';
import LoadingScreen from '../loading-screen/loading-screen';

type IsLoading = {
  offer: boolean;
  reviews: boolean;
  nearPlaces: boolean;
};

function OfferScreen(): JSX.Element {
  const params = useParams();

  const isLoading: IsLoading = {
    offer: useAppSelector((state) => state.isStandaloneOfferLoading),
    reviews: useAppSelector((state) => state.isReviewsLoading),
    nearPlaces: useAppSelector((state) => state.isNearPlacesLoading)
  };

  const requestedOffer = useAppSelector((state) => state.requestedOffer);
  const reviews = useAppSelector((state) => state.reviews);
  const nearPlaces = useAppSelector((state) => state.nearPlaces);
  const isOfferNotFound = useAppSelector((state) => state.isOfferNotFound);
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);
  const isAuthorized = authorizationStatus === AuthorizationStatus.Auth;

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (params.id) {
      dispatch(requestStandaloneOfferAction(params.id));
      dispatch(requestReviewsForOfferAction(params.id));
      dispatch(requestNearPlacesAction(params.id));
    }
  }, [dispatch, params.id]);

  if (isOfferNotFound) {
    return <NotFoundScreen />;
  }

  if (isLoading.offer || isLoading.reviews || isLoading.nearPlaces || requestedOffer === null) {
    return <LoadingScreen />;
  }

  return (
    <div className='page'>
      <Header>
        <UserInfo />
      </Header>
      <main className='page__main  page__main--offer'>
        <section className='offer'>
          <div className='offer__gallery-container  container'>
            <div className='offer__gallery'>
              {requestedOffer.images.map((image) => (
                <div key={image} className='offer__image-wrapper'>
                  <img className='offer__image' src={image} alt='Photo studio' />
                </div>
              ))}
            </div>
          </div>
          <div className='offer__container  container'>
            <div className='offer__wrapper'>
              {requestedOffer.isPremium && <div className='offer__mark'><span>Premium</span></div>}
              <div className='offer__name-wrapper'>
                <h1 className='offer__name'>{requestedOffer.title}</h1>
                <BookmarkButton className={BookMarkButtonClass.Offer} isFavorite={requestedOffer.isFavorite} />
              </div>
              <div className='offer__rating  rating'>
                <div className='offer__stars  rating__stars'>
                  <span style={{width: `${requestedOffer.rating * 20}%`}} />
                  <span className='visually-hidden'>Rating</span>
                </div>
                <span className='offer__rating-value  rating__value'>{requestedOffer.rating}</span>
              </div>
              <ul className='offer__features'>
                <li className='offer__feature  offer__feature--entire'>
                  {capitalize(requestedOffer.type)}
                </li>
                <li className='offer__feature  offer__feature--bedrooms'>
                  {requestedOffer.bedrooms} Bedrooms
                </li>
                <li className='offer__feature  offer__feature--adults'>
                  Max {requestedOffer.maxAdults} adults
                </li>
              </ul>
              <div className='offer__price'>
                <b className='offer__price-value'>&euro;{requestedOffer.price}</b>
                <span className='offer__price-text'>&nbsp;night</span>
              </div>
              <div className='offer__inside'>
                <h2 className='offer__inside-title'>What&apos;s inside</h2>
                <ul className='offer__inside-list'>
                  {requestedOffer.goods.map((good) => <li key={good} className='offer__inside-item'>{good}</li>)}
                </ul>
              </div>
              <div className='offer__host'>
                <h2 className='offer__host-title'>Meet the host</h2>
                <div className='offer__host-user  user'>
                  <div
                    className={cn(
                      'offer__avatar-wrapper  user__avatar-wrapper',
                      {'offer__avatar-wrapper--pro': requestedOffer.host.isPro}
                    )}
                  >
                    <img className='offer__avatar user__avatar' src={requestedOffer.host.avatarUrl} width='74' height='74' alt='Host avatar' />
                  </div>
                  <span className='offer__user-name'>{requestedOffer.host.name}</span>
                  {requestedOffer.host.isPro && <span className='offer__user-status'>Pro</span>}
                </div>
                <div className='offer__description'>
                  <p className='offer__text'>{requestedOffer.description}</p>
                </div>
              </div>
              <section className='offer__reviews  reviews'>
                <h2 className='reviews__title'>
                  Reviews &middot;
                  <span className='reviews__amount'>{reviews.length}</span>
                </h2>
                <ReviewsList reviews={reviews} />
                {isAuthorized && <CommentForm />}
              </section>
            </div>
          </div>
          <Map className={MapClass.Offer} offers={nearPlaces} />
        </section>
        <div className='container'>
          <section className='near-places  places'>
            <h2 className='near-places__title'>Other places in the neighbourhood</h2>
            <OffersList className={CardClass.NearPlaces} offers={nearPlaces} />
          </section>
        </div>
      </main>
    </div>
  );
}

export default OfferScreen;
