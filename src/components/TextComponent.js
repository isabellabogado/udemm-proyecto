import {View, Text} from 'react-native';
import React from 'react';

const TextComponent = ({children, styles, textStyles}) => {
  return (
    <View style={styles}>
      <Text style={textStyles}>{children}</Text>
    </View>
  );
};

export default TextComponent;
