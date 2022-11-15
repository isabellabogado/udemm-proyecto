import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import TextComponent from '../TextComponent';
import Colors from '../../constans/Colors';

const InfoComponent = ({title, description}) => {
  return (
    <>
      <View style={styles.container}>
        <TextComponent textStyles={{fontWeight: '600'}}>{title}</TextComponent>
        <View style={styles.cardContainer}>
          <TextComponent
            textStyles={{color: Colors.secondary}}
            styles={{marginVertical: 20}}>
            {description}
          </TextComponent>
        </View>
      </View>
      <View style={styles.borderLine} />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
  borderLine: {
    borderWidth: 1,
    borderColor: Colors.neutral.gray100,
  },
});
export default InfoComponent;
