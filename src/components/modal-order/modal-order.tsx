import { useNavigate } from 'react-router-dom';

import { Modal, OrderInfo } from '@components';

export const ModalOrder = (): React.JSX.Element => {
  const navigate = useNavigate();

  const handleClose = () => {
    navigate(-1); // вернуться на предыдущую страницу
  };

  return (
    <Modal title="Детали заказа" onClose={handleClose}>
      <OrderInfo />
    </Modal>
  );
};