import React, {Fragment} from 'react';
import useSelector from 'hooks/useSelector';

const ModalDisplay = () => {
  const modals = useSelector(state => state.modal.modals);

  if (!modals.length) {
    return null;
  }
  return (
    <>
      {modals.map((modal, index) => {
        return <Fragment key={index}>{modal.component}</Fragment>;
      })}
    </>
  );
};

export default ModalDisplay;
