import React from 'react';
import {useSelector} from 'react-redux';

const ModalDisplay = () => {
  const component = useSelector(state => state.modal.component);

  if (component) {
    return <>{component}</>;
  }
  return null;
};

export default ModalDisplay;
