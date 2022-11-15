import React from 'react';
import {TouchableOpacity, View, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/core';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Colors from '../../constans/Colors';
import TextComponent from '../TextComponent';

const HeaderComponent = ({
  arrowColor,
  title,
  customTitleStyle,
  showGoBack = true,
}) => {
  const {goBack} = useNavigation();
  return (
    <TouchableOpacity
      disabled={!showGoBack}
      onPress={() => {
        goBack();
      }}>
      <View style={{flexDirection: 'row', alignItems: 'center', height: 24}}>
        {showGoBack && (
          <Ionicons
            name={'arrow-back'}
            size={24}
            color={Colors.white}
            style={{marginLeft: 20}}
          />
        )}
        {title && (
          <View
            style={{
              flex: 1,
              position: 'absolute',
              width: '100%',
            }}>
            <TextComponent textStyles={[styles.titleStyle, customTitleStyle]}>
              {title}
            </TextComponent>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  titleStyle: {
    textAlign: 'center',
    color: Colors.white,
    fontSize: 28,
    fontFamily: 'OleoScript-Bold',
  },
});

export {HeaderComponent};
