import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  Image,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import Colors from '../../constans/Colors';
import {useNavigation, useRoute} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import {CommonActions} from '@react-navigation/native';

import TextInputComponent from '../../components/Input/TextInputComponent';
import {HeaderComponent} from '../../components/Header/HeaderComponent';
import ImagePicker from 'react-native-image-crop-picker';
import Screens from '../../navigation/Screens';
import TextComponent from '../../components/TextComponent';
import ButtonComponent from '../../components/Button/ButtonComponent';
import {updatePet} from '../../services/apis';
import {useLoaderContext} from '../../hooks/Loader';
import {useSelector} from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';

const {height} = Dimensions.get('screen');

const TakePictureScreen = () => {
  const {setLoading} = useLoaderContext();
  const {dispatch} = useNavigation();
  const route = useRoute();
  const user = useSelector(store => store.user);

  const {petName, petBirthday} = route.params;

  const [haspicture, setHaspicture] = useState(false);

  console.log('haspicture', haspicture);

  const savePhoto = async body => {
    setLoading(true);
    try {
      updatePet(body)
        .then(response => {
          console.log('response ', response);
          dispatch(
            CommonActions.reset({
              index: 0,
              routes: [
                {
                  name: Screens.PETCLINICHISTORY,
                  state: {
                    routes: [
                      {
                        name: Screens.PETPROFILE,
                        params: user,
                      },
                    ],
                  },
                },
              ],
            }),
          );
        })
        .finally(() => {
          setLoading(false);
        });
    } catch (e) {
      setLoading(false);
      console.log('error', e);
    }
  };

  const takePhoto = () => {
    setLoading(true);
    ImagePicker.openCamera({
      compressImageMaxWidth: 200,
      compressImageMaxHeight: 200,
      cropping: true,
      compressImageQuality: 0.5,
      includeBase64: true,
    })
      .then(image => {
        if (image.path) {
          setHaspicture(true);
        }
        const body = {
          owner: user.mail,
          petId: `${petName} - ${petBirthday}`,
          pet: {
            name: petName,
            birthdate: petBirthday,
            img: image.data,
          },
        };
        savePhoto(body);
      })
      .finally(() => {
        setLoading(false);
      })
      .catch(err => {
        console.log('hola', err);
        Alert.alert('Cámara', 'Error al abrir la cámara');
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#6b1c88', '#B43EC6']}
        style={styles.squareGradient}>
        <HeaderComponent title={'Vet App'} />
        <View style={{flex: 1, justifyContent: 'center'}}>
          <View
            style={{
              backgroundColor: Colors.white,
              borderRadius: 10,
              marginHorizontal: 40,
              height: '60%',
              marginTop: 20,
            }}>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <Image
                style={styles.dogLogo}
                source={require('../../assets/purpledog.png')}
                resizeMethod="resize"
                resizeMode="cover"
              />
            </View>
            <TextComponent
              textStyles={{
                color: Colors.neutral.gray900,
                textAlign: 'center',
                fontSize: 20,
                fontFamily: 'Ubuntu-Bold',
                marginTop: 40,
              }}>
              Ya casi terminamos!
            </TextComponent>
            <TextComponent
              textStyles={{
                color: Colors.neutral.gray900,
                textAlign: 'center',
                fontSize: 16,
                fontFamily: 'Ubuntu-Bold',
                marginTop: 40,
              }}>
              Toma una foto de tu mascota
            </TextComponent>
            <TextComponent
              textStyles={{
                color: Colors.neutral.gray800,
                textAlign: 'center',
                fontSize: 14,
                fontFamily: 'Ubuntu-Medium',
                marginTop: 40,
              }}>
              Necesitamos la foto de tu{'\n'}mascota para que el veterinario
              pueda identificarla.
            </TextComponent>

            <Image
              style={styles.logo}
              source={require('../../assets/camara.png')}
              resizeMethod="resize"
              resizeMode="cover"
            />
            <View
              style={{
                marginHorizontal: 40,
                flex: 1,
                justifyContent: 'flex-end',
                marginBottom: 40,
              }}>
              {haspicture ? (
                <View style={{alignSelf: 'center'}}>
                  <Ionicons
                    name={'checkmark-circle'}
                    size={50}
                    color={'#4FAF83'}
                  />
                </View>
              ) : (
                <ButtonComponent
                  onPress={takePhoto}
                  customContainer={{
                    backgroundColor: Colors.yellow,
                    borderColor: Colors.yellow,
                  }}
                  buttonLabel="Continuar"
                />
              )}
            </View>
          </View>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },

  profileCardContainer: {
    marginHorizontal: 20,
  },
  titleStyle: {
    marginBottom: 30,
    marginVertical: 30,
  },
  squareGradient: {
    flex: 1,
    backgroundColor: Colors.secondary,
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 10,
    alignSelf: 'center',
    marginTop: 20,
  },
  dogLogo: {
    width: 60,
    height: 60,
    borderRadius: 30,
    position: 'absolute',
    zIndex: 1,
  },
});
export default TakePictureScreen;
