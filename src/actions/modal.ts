import {ModalTypes} from 'src/types';

export const OPEN_MODAL = 'OPEN_MODAL';
export const CLOSE_MODAL = 'CLOSE_MODAL';

export const openModal = ({
  name,
  key,
  component,
}: {
  name: ModalTypes;
  key: string;
  component: React.ReactNode;
}) => {
  return {
    type: OPEN_MODAL,
    component,
    key,
    name,
  };
};
export const closeModal = (key: string) => {
  return {
    type: CLOSE_MODAL,
    key,
  };
};
