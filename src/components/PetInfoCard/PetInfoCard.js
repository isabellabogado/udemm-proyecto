import {View, Image, StyleSheet} from 'react-native';
import React from 'react';
import TextComponent from '../TextComponent';
import Colors from '../../constans/Colors';

const PetInfoCard = ({label, image, description}) => {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.cardStyle}>
        <TextComponent
          textStyles={{
            color: Colors.primary,
            fontSize: 16,
            fontFamily: 'Ubuntu-Medium',
            textAlign: 'center',
          }}>
          {label}
        </TextComponent>
        <View
          style={{
            alignSelf: 'center',
            marginVertical: 10,
          }}>
          <Image
            source={image}
            style={{
              width: 60,
              height: 60,
              tintColor: '#201F1F',
            }}
          />
        </View>
        <TextComponent
          textStyles={{
            fontFamily: 'Ubuntu-Medium',
            color: Colors.neutral.gray900,
            marginBottom: 10,
          }}>
          {description}
        </TextComponent>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
  },
  cardStyle: {
    backgroundColor: Colors.neutral.gray050,
    borderRadius: 8,
    height: 140,
    width: 140,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default PetInfoCard;
