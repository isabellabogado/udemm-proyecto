import {View, Text, StyleSheet} from 'react-native';
import React from 'react';

import Colors from '../../constans/Colors';

const BigCard = ({children, customContainer, onPress}) => {
  return (
    <View style={{flex: 1}}>
      <View style={[styles.cardContainer, customContainer]}>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    borderWidth: 2,
    borderColor: Colors.white,
    backgroundColor: Colors.white,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
export default BigCard;
