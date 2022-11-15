import {
  View,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import React, {useState} from 'react';
import Colors from '../../constans/Colors';

import TextComponent from '../../components/TextComponent';
import Card from '../../components/Card/Card';
import {useNavigation} from '@react-navigation/native';
import Screens from '../../navigation/Screens';
import LinearGradient from 'react-native-linear-gradient';
import {HeaderComponent} from '../../components/Header/HeaderComponent';

const {height} = Dimensions.get('screen');

const Register = () => {
  const {goBack} = useNavigation();
  const {navigate} = useNavigation();
  const [pet, setPet] = useState(false);
  const [person, setPerson] = useState(false);

  const optionInfo = [
    {
      title: 'Tengo mascota',

      onPress: () => navigate(Screens.REGISTER_STEP2, {pet: true}),
      image: require('../../assets/dog-logo.png'),
    },
    {
      title: 'Soy veterinario/a',

      onPress: () => navigate(Screens.REGISTER_STEP2, {vet: true}),
      image: require('../../assets/dog-vet.png'),
    },
  ];

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity onPress={item.onPress}>
        <View
          style={{
            backgroundColor: Colors.white,
            height: 160,
            borderRadius: 10,
            width: 140,
            justifyContent: 'center',
            alignItems: 'center',
            margin: 10,
          }}>
          <View
            style={{
              height: 80,
              width: 80,
              backgroundColor: Colors.neutral.gray050,
              borderRadius: 40,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              style={{height: 50, width: 50}}
              source={item.image}
              resizeMethod="resize"
              resizeMode="cover"
            />
          </View>

          <TextComponent
            textStyles={{
              textAlign: 'center',
              color: Colors.black,
              fontSize: 14,
              fontFamily: 'Ubuntu-Medium',
              marginTop: 10,
            }}>
            {item.title}
          </TextComponent>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#6b1c88', '#B43EC6']}
        style={styles.squareGradient}>
        <HeaderComponent />
        <TextComponent
          textStyles={{
            textAlign: 'center',
            color: Colors.white,
            fontSize: 28,
            fontFamily: 'OleoScript-Bold',
          }}>
          Vet App
        </TextComponent>
        <View style={{alignSelf: 'center'}}>
          <Image
            style={styles.logo}
            source={require('../../assets/main-logo.png')}
            resizeMethod="resize"
            resizeMode="cover"
          />
        </View>
        <View
          style={{
            justifyContent: 'center',
            flex: 1,
          }}>
          <TextComponent
            textStyles={{
              textAlign: 'center',
              color: Colors.white,
              fontSize: 16,
              fontFamily: 'Ubuntu-regular',
              marginBottom: 50,
            }}>
            Comenza elegiendo tu perfil
          </TextComponent>

          <View
            style={{
              alignSelf: 'center',
              flex: 0.4,
            }}>
            <FlatList
              data={optionInfo}
              renderItem={renderItem}
              horizontal
              scrollEnabled={true}
            />
          </View>

          <View
            style={{
              flexDirection: 'row',
              alignSelf: 'center',
              flex: 0.2,
            }}>
            <TextComponent
              textStyles={{
                textAlign: 'center',
                fontFamily: 'Ubuntu-Medium',
                color: Colors.white,
                fontSize: 14,
                marginBottom: 20,
              }}>
              Ya tenes una cuenta?
            </TextComponent>
            <View style={{width: 10}} />
            <TouchableOpacity
              onPress={() => goBack()}
              style={{flexDirection: 'row'}}>
              <TextComponent
                textStyles={{
                  textAlign: 'center',
                  fontFamily: 'Ubuntu-Bold',
                  color: Colors.yellow,
                  fontSize: 14,
                }}>
                Logueate
              </TextComponent>
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputContainer: {
    marginHorizontal: 20,
    marginTop: 20,
  },
  profileCardContainer: {
    marginHorizontal: 20,
  },
  titleStyle: {
    marginBottom: 30,
    marginVertical: 30,
    fontSize: 40,
  },
  squareGradient: {
    flex: 1,
    backgroundColor: Colors.secondary,
  },
  logo: {
    width: 50,
    height: 50,
    borderRadius: 10,
  },
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
export default Register;
