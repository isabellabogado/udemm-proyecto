import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import React from 'react';
import TextComponent from '../TextComponent';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Colors from '../../constans/Colors';
const editIcon = require('../../assets/edit.png');
const AppointmentCard = ({date, specialityValue, vetClinicValue}) => {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.cardStyle}>
        <TextComponent
          textStyles={{
            color: Colors.primary,
            fontSize: 14,
            fontFamily: 'Ubuntu-Medium',
          }}>
          Fecha
        </TextComponent>
        <TextComponent
          textStyles={{
            fontFamily: 'Ubuntu-Regular',
            color: Colors.neutral.gray900,
          }}>
          {date}
        </TextComponent>
      </View>
      <View
        style={{
          borderColor: Colors.white,
          borderWidth: 1,
          marginVertical: 6,
        }}
      />
      <View style={styles.cardStyle}>
        <TextComponent
          textStyles={{
            color: Colors.primary,
            fontSize: 14,
            fontFamily: 'Ubuntu-Medium',
          }}>
          Especialidad
        </TextComponent>
        <TextComponent
          textStyles={{
            fontFamily: 'Ubuntu-Regular',
            color: Colors.neutral.gray900,
          }}>
          {specialityValue}
        </TextComponent>
      </View>
      <View
        style={{
          borderColor: Colors.white,
          borderWidth: 1,
          marginVertical: 6,
        }}
      />
      <View style={styles.cardStyle}>
        <TextComponent
          textStyles={{
            color: Colors.primary,
            fontSize: 14,
            fontFamily: 'Ubuntu-Medium',
          }}>
          Sucursal
        </TextComponent>
        <TextComponent
          textStyles={{
            fontFamily: 'Ubuntu-Regular',
            color: Colors.neutral.gray900,
          }}>
          {vetClinicValue}
        </TextComponent>
      </View>
    </View>
  );
};

export default AppointmentCard;

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: Colors.neutral.gray050,
    borderRadius: 8,
    padding: 10,
    marginHorizontal: 15,
    marginVertical: 10,
  },
  cardStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
