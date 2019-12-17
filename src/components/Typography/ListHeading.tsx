import React from 'react';
import SubHeading from './SubHeading';
import useTheme from 'hooks/useTheme';

const ListHeading = ({text, style = {}}) => {
  const theme = useTheme();
  return (
    <SubHeading
      style={{
        color: theme.orange,
        fontSize: 17,
        ...style,
      }}
      text={text}
    />
  );
};

export default ListHeading;
