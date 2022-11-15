import {View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import Colors from '../../constans/Colors';
import Ionicons from 'react-native-vector-icons/Ionicons';

import TextComponent from '../TextComponent';

const Card = ({
  title,
  customStyles,
  textStyle,
  icon,
  onPress,
  photo,
  source,
  owner,
}) => {
  return (
    <View style={[styles.cardContainer, customStyles]} onPress={onPress}>
      <TouchableOpacity onPress={onPress}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          {photo && (
            <View style={{marginLeft: 15}}>
              <Image
                source={source}
                style={{
                  height: 70,
                  width: 70,
                  borderRadius: 40,
                }}
              />
            </View>
          )}
          <View>
            <TextComponent textStyles={[styles.text, textStyle]}>
              {title}
            </TextComponent>
            <View
              style={{
                borderWidth: 1,
                borderColor: Colors.white,
                marginLeft: 20,
                marginVertical: 10,
                width: '100%',
              }}
            />
            <TextComponent textStyles={[styles.text, textStyle]}>
              Dueño: {owner}
            </TextComponent>
          </View>
          <View style={{alignItems: 'flex-end', flex: 1, marginRight: 10}}>
            <Ionicons name={icon} size={30} color={Colors.white} />
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: Colors.white,
    borderColor: Colors.white,
    borderWidth: 1,
    borderRadius: 30,
    height: 50,
    justifyContent: 'center',
    marginBottom: 20,
  },
  text: {
    color: Colors.primary,
    fontFamily: 'Ubuntu-Bold',
    fontSize: 14,
    marginLeft: 20,
  },
});

export default Card;
