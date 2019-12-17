import React from 'react';
import {useSelector} from 'react-redux';
import {ScrollView} from 'react-native';

import Header from 'src/components/Header';
import TaskList from 'src/components/TaskList';
import NoResults from 'src/components/NoResults';
import EmptyTodos from 'src/components/EmptyTodos';

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

const DefaultView = ({hasTodosAtAll, pastTodos}) => {
  return (
    <>
      {!hasTodosAtAll ? (
        <EmptyTodos />
      ) : (
        <>
          {pastTodos.length ? (
            <TaskList todos={pastTodos} category="Completed" />
          ) : null}
        </>
      )}
    </>
  );
};

const Completed = () => {
  const pastTodos = useSelector(state => state.todos.past);
  const keyword = useSelector(state => state.search.keyword);
  const showSearch = keyword;
  const hasTodosAtAll = pastTodos.length;
  return (
    <>
      <Header title="Completed" allTodos={pastTodos} />
      <ScrollView
        style={{
          padding: 20,
          backgroundColor: '#f4f6f8',
        }}>
        {showSearch ? (
          <SearchResultView allTodos={pastTodos} keyword={keyword} />
        ) : (
          <DefaultView hasTodosAtAll={hasTodosAtAll} pastTodos={pastTodos} />
        )}
      </ScrollView>
    </>
  );
};

export default Completed;
