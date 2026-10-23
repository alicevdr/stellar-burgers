import { Modal, OrderInfo } from '@components';
import { useNavigate } from 'react-router-dom';

export const ModalOrder = (): React.JSX.Element => {
  const navigate = useNavigate();

  const handleClose = (): void => {
    void navigate(-1);
  };

  return (
    <Modal title="Детали заказа" onClose={handleClose}>
      <OrderInfo />
    </Modal>
  );
};
