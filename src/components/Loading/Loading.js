import React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import Colors from '../../constans/Colors';

const Loading = ({size = 'large'}) => {
  return (
    <View
      style={{
        ...StyleSheet.absoluteFillObject,
        position: 'absolute',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: `#00000090`,
        zIndex: 3,
      }}>
      <ActivityIndicator
        size={size}
        color={Colors.purple}
        style={{zIndex: 40}}
      />
    </View>
  );
};

export default Loading;
