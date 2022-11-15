import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import Colors from '../../constans/Colors';

const ButtonComponent = ({
  onPress,
  customContainer,
  customTextStyle,
  buttonLabel,
  disabled,
}) => {
  return (
    <TouchableOpacity
      style={[
        disabled ? styles.disabledContainer : styles.container,
        customContainer,
      ]}
      onPress={onPress}
      disabled={disabled}>
      <Text style={[styles.textStyle, customTextStyle]}>{buttonLabel}</Text>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.yellow,
    borderColor: Colors.yellow,
    borderWidth: 1,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    width: '100%',
    alignItems: 'center',
  },
  textStyle: {
    color: Colors.neutral.gray900,
    fontSize: 16,
    fontFamily: 'Ubuntu-Bold',
  },
  disabledContainer: {
    backgroundColor: Colors.neutral.gray100,
    borderColor: Colors.neutral.gray100,
    borderWidth: 1,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    width: '100%',
    alignItems: 'center',
  },
});
export default ButtonComponent;
