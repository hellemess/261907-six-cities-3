import './loading-screen.css';

function LoadingScreen(): JSX.Element {
  return (
    <div className='page  page--gray'>
      <div className='loader' data-testid='loader' />
    </div>
  );
}

export default LoadingScreen;
