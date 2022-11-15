import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import TextComponent from '../TextComponent';
import Colors from '../../constans/Colors';

const ClinicHistoryCard = ({date, observation, vetName, onPress}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.cardContainer}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
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
              fontSize: 14,
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
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <TextComponent
            textStyles={{
              color: Colors.primary,
              fontSize: 14,
              fontFamily: 'Ubuntu-Medium',
            }}>
            Motivo
          </TextComponent>
        </View>

        <TextComponent
          textStyles={{
            fontFamily: 'Ubuntu-Regular',
            color: Colors.neutral.gray900,
            fontSize: 14,
          }}
          styles={{marginVertical: 10}}>
          {observation}
        </TextComponent>
        <View
          style={{
            borderColor: Colors.white,
            borderWidth: 1,
            marginVertical: 6,
          }}
        />

        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <TextComponent
            textStyles={{
              color: Colors.primary,
              fontSize: 14,
              fontFamily: 'Ubuntu-Medium',
            }}>
            Veterinario
          </TextComponent>
          <TextComponent
            textStyles={{
              fontFamily: 'Ubuntu-Regular',
              color: Colors.neutral.gray900,
              fontSize: 14,
            }}>
            {vetName}
          </TextComponent>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 15,
    marginVertical: 10,
  },
  cardContainer: {
    flex: 1,
    backgroundColor: Colors.neutral.gray050,
    borderColor: Colors.neutral.gray050,
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
  },
});

export default ClinicHistoryCard;
