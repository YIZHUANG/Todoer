import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';

import useSelector from 'hooks/useSelector';
import Header from 'src/components/Header';
import TaskList from 'src/components/TaskList';
import NoResults from 'src/components/NoResults';
import EmptyTodos from 'src/components/EmptyTodos';
import {Todos} from 'src/types';
import {Theme} from 'styles/theme';
import useTheme from 'hooks/useTheme';
import ScrollContainer from 'components/ScrollContainer';
import useTranslate from 'hooks/useTranslate';

const SearchResultView = ({
  allTodos,
  keyword,
}: {
  allTodos: Todos;
  keyword: string;
}) => {
  let searchResults = [];
  allTodos.forEach(todo => {
    if (todo.text.indexOf(keyword) > -1) {
      searchResults.push(todo);
    }
  });
  if (!!searchResults.length) {
    return (
      <ScrollContainer>
        <TaskList todos={searchResults} />
      </ScrollContainer>
    );
  }
  return <NoResults />;
};

const DefaultView = ({
  hasTodosAtAll,
  pastTodos,
}: {
  hasTodosAtAll: boolean;
  pastTodos: Todos;
}) => {
  const t = useTranslate();
  if (!hasTodosAtAll) {
    return <EmptyTodos />;
  }
  return (
    <ScrollContainer>
      <TaskList todos={pastTodos} category={t('PAST')} />
    </ScrollContainer>
  );
};

const Completed = () => {
  const pastTodos = useSelector(state => state.todos.past);
  const keyword = useSelector(state => state.search.keyword);
  const theme = useTheme();
  const styles = createStyles(theme);
  const showSearch = keyword;
  const hasTodosAtAll = !!pastTodos.length;
  const t = useTranslate();
  return (
    <>
      <Header title={t('COMPLETED')} allTodos={pastTodos} />
      <View style={styles.container}>
        {showSearch ? (
          <SearchResultView allTodos={pastTodos} keyword={keyword} />
        ) : (
          <DefaultView hasTodosAtAll={hasTodosAtAll} pastTodos={pastTodos} />
        )}
      </View>
    </>
  );
};

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      height: '100%',
      backgroundColor: theme.light,
      position: 'relative',
    },
  });

export default Completed;
