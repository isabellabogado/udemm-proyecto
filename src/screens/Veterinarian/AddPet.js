import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import TextComponent from '../../components/TextComponent';
import {HeaderComponent} from '../../components/Header/HeaderComponent';
import TextInputComponent from '../../components/Input/TextInputComponent';
import ButtonComponent from '../../components/Button/ButtonComponent';
import ImagePicker from 'react-native-image-crop-picker';
import Colors from '../../constans/Colors';

const AddPet = () => {
  const takePhotoFromCamera = () => {
    ImagePicker.openCamera({
      compressImageMaxWidth: 300,
      compressImageMaxHeight: 300,
      cropping: true,
      compressImageQuality: 0.7,
    })
      .then(image => {
        setCamPhoto(image.path);
      })
      .catch(err => {
        console.log('hola', err);
        Alert.alert('Cámara', 'Error al abrir la cámara');
      });
  };
  const renderPetInput = () => {
    return (
      <ScrollView style={styles.inputContainer}>
        <TextInputComponent placeholder={'Nombre de su mascota'} icon={'paw'} />
        <TextInputComponent placeholder={'Nombre del dueño'} icon={'person'} />
        <TextInputComponent
          placeholder={'Apellido del dueño'}
          icon={'person'}
        />
        <TextInputComponent placeholder={'Mail'} icon={'person'} />
        <TextInputComponent placeholder={'Telefono'} icon={'call'} />
        <TextComponent
          textStyles={{
            textAlign: 'center',
            fontFamily: 'Ubuntu-Medium',
            color: Colors.neutral.gray900,
            fontSize: 14,
            marginTop: 20,
          }}>
          Toca aqui para agregar foto
        </TextComponent>
        <TouchableOpacity
          style={{
            borderRadius: 50,
            height: 90,
            width: 90,
            alignSelf: 'center',
            borderColor: Colors.black,
            borderWidth: 2,
            justifyContent: 'center',
            marginVertical: 20,
          }}
          onPress={takePhotoFromCamera}>
          <Image
            style={styles.camLogo}
            source={require('../../assets/camara.png')}
            resizeMethod="resize"
            resizeMode="cover"
          />
        </TouchableOpacity>
      </ScrollView>
    );
  };
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#6b1c88', '#B43EC6']}
        style={styles.squareGradient}>
        {/* <TextComponent
          textStyles={{
            textAlign: 'center',
            color: Colors.white,
            fontSize: 16,
            fontFamily: 'Ubuntu-Bold',
          }}>
          Agregar paciente/mascota
        </TextComponent> */}
        <HeaderComponent title="Agregar mascota" />
        <View style={{flex: 1, justifyContent: 'center'}}>
          <View
            style={{
              backgroundColor: Colors.white,
              borderRadius: 10,
              marginHorizontal: 20,
              height: '85%',
            }}>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#C0392B',
              }}>
              <Image
                style={styles.logo}
                source={require('../../assets/purpledog.png')}
                resizeMethod="resize"
                resizeMode="cover"
              />
            </View>
            <TextComponent
              textStyles={{
                textAlign: 'center',
                fontFamily: 'Ubuntu-Medium',
                color: Colors.purple,
                fontSize: 18,
                marginTop: 40,
              }}>
              Registra una mascota/paciente
            </TextComponent>

            {renderPetInput()}
            <View
              style={{
                marginHorizontal: 40,
                flex: 1,
                justifyContent: 'flex-end',
                marginBottom: 20,
              }}>
              <ButtonComponent
                customContainer={{
                  backgroundColor: Colors.yellow,
                  borderColor: Colors.yellow,
                }}
                buttonLabel="Continuar"
                Continuar
              />
            </View>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  squareGradient: {
    flex: 1,
    backgroundColor: Colors.secondary,
  },
  inputContainer: {
    paddingHorizontal: 30,
  },
  logo: {
    width: 60,
    height: 60,
    borderRadius: 30,
    position: 'absolute',
    zIndex: 1,
  },
  camLogo: {
    width: 50,
    height: 50,
    alignSelf: 'center',
  },
});

export default AddPet;
