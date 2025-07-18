import {PointerEvent} from 'react';
import {Link} from 'react-router-dom';
import {AppRoute, AuthorizationStatus} from '../../const';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {logoutAction} from '../../store/api-action';
import {getAuthorizationStatus, getUser, getUserProcessing} from '../../store/user-process/user-process.selectors';
import {getFavorites} from '../../store/app-data/app-data.selectors';

function UserInfo(): JSX.Element {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const user = useAppSelector(getUser);
  const favoriteOffers = useAppSelector(getFavorites);
  const isUserProcessing = useAppSelector(getUserProcessing);
  const isAuthorized = authorizationStatus === AuthorizationStatus.Auth;
  const favoritesCount = favoriteOffers.length;
  const dispatch = useAppDispatch();

  const handleSignOut = (evt: PointerEvent<HTMLAnchorElement>) => {
    evt.preventDefault();

    if (isUserProcessing) {
      return;
    }

    dispatch(logoutAction());
  };

  return (
    <nav className='header__nav' data-testid='user-info'>
      <ul className='header__nav-list'>
        <li className='header__nav-item  user'>
          <Link className='header__nav-link  header__nav-link--profile' to={isAuthorized ? AppRoute.Favorites : AppRoute.Login}>
            <div className='header__avatar-wrapper  user__avatar-wrapper' />
            {isAuthorized
              ? (
                <>
                  <span className='header__user-name  user__name'>{user?.email}</span>
                  <span className='header__favorite-count'>{favoritesCount}</span>
                </>
              )
              : <span className='header__login'>Sign in</span>}
          </Link>
        </li>
        {isAuthorized && (
          <li className='header__nav-item'>
            <a className='header__nav-link' href='#' onClick={handleSignOut} >
              <span className='header__signout'>Sign out</span>
            </a>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default UserInfo;
