import React from 'react';
import FloatingButton from 'react-native-fab';

import useTheme from 'hooks/useTheme';
import useAddTodoModal from 'hooks/useAddTodoModal';

const Fab = () => {
  const theme = useTheme();
  const [openAddTodoModal] = useAddTodoModal();
  return (
    <FloatingButton
      buttonColor={theme.orange}
      iconTextColor={theme.white}
      onClickAction={openAddTodoModal}
      visible
    />
  );
};

export default Fab;
