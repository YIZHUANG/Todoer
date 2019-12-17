import React from 'react';
import {View} from 'react-native';
import {useDispatch} from 'react-redux';
import {Icon} from 'react-native-elements';

import useSelector from 'hooks/useSelector';
import useTheme from 'hooks/useTheme';
import {selectAll, clearMultiSelect} from 'actions/multiSelect';
import {todoEffects} from 'actions/todo';
import {iconStyle} from './constants';
import Body, {bodyTypes} from 'components/Typography/Body';
import {Todos} from 'src/types';

const MultiSelect = ({allTodos}: {allTodos: Todos}) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const isSelectAll = useSelector(state => state.multiSelect.selectAll);
  const selectedTodos = useSelector(state => state.multiSelect.selectedTodos);

  function onClearMultiSelect() {
    dispatch(clearMultiSelect());
  }
  function onSelectAll() {
    dispatch(selectAll(allTodos));
  }
  function onRemoveSelectedTodos() {
    dispatch(todoEffects.removeTodos());
  }
  return (
    <View
      style={{
        ...theme.flex({justifyContent: 'space-between'}),
        width: '100%',
      }}>
      <View style={theme.flex()}>
        <Icon
          {...iconStyle}
          onPress={onClearMultiSelect}
          type="material-community"
          name="close"
        />
        <Body
          variant={bodyTypes.light}
          style={{
            fontSize: 18,
          }}
          text={`${selectedTodos.length} selected`}
        />
      </View>
      <View style={theme.flex()}>
        <Icon
          {...iconStyle}
          type="material-community"
          onPress={onSelectAll}
          name={isSelectAll ? 'select-all' : 'select'}
        />
        <Icon
          {...iconStyle}
          type="material-community"
          onPress={onRemoveSelectedTodos}
          name="delete-outline"
        />
      </View>
    </View>
  );
};

export default MultiSelect;
