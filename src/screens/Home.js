import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {ScrollView, Text} from 'react-native';

import Header from '../components/Header';
import {todoEffects} from '../actions/todo';
import TaskList from '../components/TaskList';
import NoResults from '../components/NoResults';

const SearchResultView = ({allTodos, keyword}) => {
  let searchResults = [];
  allTodos.forEach(todo => {
    if (todo.text.indexOf(keyword) > -1) {
      searchResults.push(todo);
    }
  });
  return (
    <>
      {searchResults.length ? (
        <TaskList todos={searchResults} />
      ) : (
        <NoResults />
      )}
    </>
  );
};

const DefaultView = ({hasTodosAtAll, dueTodos, ongoingTodos}) => {
  return (
    <>
      {!hasTodosAtAll ? null : (
        <>
          {dueTodos.length ? (
            <TaskList todos={dueTodos} category="Due" />
          ) : null}
          {ongoingTodos.length ? (
            <TaskList todos={ongoingTodos} category="Next" />
          ) : null}
        </>
      )}
    </>
  );
};

const Home = () => {
  const dispatch = useDispatch();
  const dueTodos = useSelector(state => state.todos.due);
  const ongoingTodos = useSelector(state => state.todos.ongoing);
  const keyword = useSelector(state => state.search.keyword);
  const initialized = useSelector(state => state.todos.initialized);

  useEffect(() => {
    dispatch(todoEffects.getAllTodos());
  }, []);
  const allTodos = [...dueTodos, ...ongoingTodos];
  const hasTodosAtAll = allTodos.length;
  const showSearch = keyword;
  if (!initialized) {
    return null;
  }
  return (
    <>
      <Header title="Inbox" allTodos={allTodos} />
      <ScrollView
        style={{
          padding: 20,
          backgroundColor: '#f4f6f8',
          position: 'relative',
        }}>
        {showSearch ? (
          <SearchResultView allTodos={allTodos} keyword={keyword} />
        ) : (
          <DefaultView
            hasTodosAtAll={hasTodosAtAll}
            dueTodos={dueTodos}
            ongoingTodos={ongoingTodos}
          />
        )}
      </ScrollView>
    </>
  );
};

export default Home;
