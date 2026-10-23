import { IngredientDetails, Modal } from '@components';
import { useNavigate } from 'react-router-dom';

export const ModalIngredient = (): React.JSX.Element => {
  const navigate = useNavigate();

  const handleClose = (): void => {
    void navigate(-1);
  };

  return (
    <Modal title="Детали ингредиента" onClose={handleClose}>
      <IngredientDetails />
    </Modal>
  );
};
