import React from 'react';
import {View, Text} from 'react-native';
import {Image} from 'react-native-elements';

const EmptyTodos = () => {
  return (
    <View
      style={{
        flex: 1,
        marginTop: '20%',
        paddingBottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Image
        source={require('../static/magnifier.png')}
        style={{width: 150, height: 150}}
      />
      <Text>What's on your mind?</Text>
    </View>
  );
};

export default EmptyTodos;
