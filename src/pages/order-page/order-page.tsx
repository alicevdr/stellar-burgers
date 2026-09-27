import { useParams } from 'react-router-dom';
import { OrderInfo } from '@components';
import styles from './order-page.module.css';

export const OrderPage = (): React.JSX.Element => {
  const { number } = useParams();

  return (
    <div className={styles.wrap}>
      <h1 className={`text text_type_digits-default mb-10`}>
        #{number?.padStart(6, '0')}
      </h1>
      <OrderInfo />
    </div>
  );
};