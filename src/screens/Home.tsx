import React, {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {View, StyleSheet} from 'react-native';
import SplashScreen from 'react-native-splash-screen';

import Header from 'src/components/Header';
import {todoEffects} from 'actions/todo';
import TaskList from 'src/components/TaskList';
import NoResults from 'src/components/NoResults';
import EmptyTodos from 'src/components/EmptyTodos';
import useSelector from 'hooks/useSelector';
import {Todos} from 'src/types';
import useTheme from 'hooks/useTheme';
import {Theme} from 'styles/theme';
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
  dueTodos,
  ongoingTodos,
  hasTodosAtAll,
}: {
  dueTodos: Todos;
  ongoingTodos: Todos;
  hasTodosAtAll: boolean;
}) => {
  const t = useTranslate();
  if (!hasTodosAtAll) {
    return <EmptyTodos />;
  }
  return (
    <ScrollContainer>
      {dueTodos.length ? (
        <TaskList todos={dueTodos} category={t('DUE')} />
      ) : null}
      {ongoingTodos.length ? (
        <TaskList todos={ongoingTodos} category={t('NEXT')} />
      ) : null}
    </ScrollContainer>
  );
};

const Home = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const [appReady, setAppReady] = useState(false);
  const dueTodos = useSelector(state => state.todos.due);
  const ongoingTodos = useSelector(state => state.todos.ongoing);
  const keyword = useSelector(state => state.search.keyword);
  const initialized = useSelector(state => state.todos.initialized);
  const t = useTranslate();
  const styles = createStyles(theme);
  useEffect(() => {
    dispatch(todoEffects.getAllTodos());
  }, []);
  useEffect(() => {
    if (initialized && !appReady) {
      setAppReady(true);
      SplashScreen.hide();
    }
  }, [initialized]);
  const allTodos = [...dueTodos, ...ongoingTodos];
  const hasTodosAtAll = !!allTodos.length;
  const showSearch = keyword;
  if (!initialized) {
    return null;
  }
  return (
    <>
      <Header title={t('YOUR_PLANS')} allTodos={allTodos} />
      <View style={styles.container}>
        {showSearch ? (
          <SearchResultView allTodos={allTodos} keyword={keyword} />
        ) : (
          <DefaultView
            hasTodosAtAll={hasTodosAtAll}
            dueTodos={dueTodos}
            ongoingTodos={ongoingTodos}
          />
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

export default Home;
