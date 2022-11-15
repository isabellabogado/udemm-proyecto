import {View, StyleSheet} from 'react-native';
import React from 'react';
import TextComponent from '../TextComponent';
import Colors from '../../constans/Colors';

const ToastComponent = ({description}) => {
  return (
    <View style={styles.container}>
      <TextComponent type={'body'} textStyles={styles.textStyle}>
        {description}
      </TextComponent>
    </View>
  );
};

export default ToastComponent;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 54,
    backgroundColor: Colors.neutral.gray900,
    justifyContent: 'center',
    position: 'absolute',
    bottom: 0,
  },
  textStyle: {
    color: Colors.white,
    textAlign: 'center',
    fontSize: 14,
    fontFamily: 'Ubuntu-Medium',
    textAlign: 'center',
  },
});
