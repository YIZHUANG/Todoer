import React from 'react';
import {View, Text} from 'react-native';
import {Image} from 'react-native-elements';

const NoResult = () => {
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
      <Text>We can't find anything that match your search</Text>
    </View>
  );
};

export default NoResult;
