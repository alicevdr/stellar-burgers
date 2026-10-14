import { useNavigate } from 'react-router-dom';

import { IngredientDetails, Modal } from '@components';

export const ModalIngredient = (): React.JSX.Element => {
  const navigate = useNavigate();

  const handleClose = () => {
    navigate(-1);
  };

  return (
    <Modal title="Детали ингредиента" onClose={handleClose}>
      <IngredientDetails />
    </Modal>
  );
};