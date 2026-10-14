import { useEffect } from 'react';
import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { fetchFeeds } from '@slices/feed-slice';
import { useDispatch, useSelector } from '@services/store';
import type { RootState } from '@services/store';

export const Feed = (): React.JSX.Element => {
  const dispatch = useDispatch();
  const orders = useSelector((state: RootState) => state.feed.orders);
  const isLoading = useSelector((state: RootState) => state.feed.isLoading);

  useEffect(() => {
    dispatch(fetchFeeds());
  }, [dispatch]);

  const handleGetFeeds = (): void => {
    dispatch(fetchFeeds());
  };

  if (isLoading && !orders.length) {
    return <Preloader />;
  }

  return <FeedUI orders={orders} handleGetFeeds={handleGetFeeds} />;
};