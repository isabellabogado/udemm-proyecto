import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import TextComponent from '../../components/TextComponent';
import Colors from '../../constans/Colors';
import {useSelector, useDispatch} from 'react-redux';

import LinearGradient from 'react-native-linear-gradient';
import Card from '../../components/Card/Card';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import Screens from '../../navigation/Screens';
import {SwipeListView} from 'react-native-swipe-list-view';
import ModalComponent from '../../components/Modal/ModalComponent';
import ButtonComponent from '../../components/Button/ButtonComponent';
import QRCodeScanner from 'react-native-qrcode-scanner';
import ImagePicker from 'react-native-image-crop-picker';
import {storeUser} from '../../redux/actions/user/userAction';

const VetHomeScreen = () => {
  const user = useSelector(store => store.user);
  const vetName = `${user?.vetUser?.name} ${user?.vetUser?.surname}`;
  const licence = user?.vetUser?.licence;

  const {navigate} = useNavigation();
  const [hasPatient, setHasPatient] = useState(false);
  const [scanQR, setScanQR] = useState(true);
  const [vetPhoto, setVetPhoto] = useState();

  const [registerModalVisible, setRegisterModalVisible] = useState(false);
  const dispatch = useDispatch();

  const savePhoto = async body => {
    setLoading(true);
    try {
      updatePet(body).then(response => {
        console.log('response ', response);
      });
    } catch (e) {
      console.log('error', e);
    } finally {
      setLoading(false);
    }
  };
  const takePhoto = () => {
    ImagePicker.openCamera({
      compressImageMaxWidth: 300,
      compressImageMaxHeight: 300,
      cropping: true,
      compressImageQuality: 0.7,
    })
      .then(image => {
        console.log('la foto', image);
        const body = {
          owner: ownerMail,
          petId: `${petName} - ${petBirthday}`,
          pet: {
            name: petName,
            birthdate: petBirthday,
            img: image.data,
          },
        };
        setVetPhoto(image.path);
        savePhoto(body);
      })
      .catch(err => {
        console.log('hola', err);
        Alert.alert('Cámara', 'Error al abrir la cámara');
      });
  };

  const renderVetInfo = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          padding: 20,
          backgroundColor: Colors.white,
          borderRadius: 10,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
        }}>
        {/*  <Image
          source={require('../../assets/veterinarian.jpg')}
          style={{
            height: 120,
            width: 120,
            borderRadius: 80,
            borderWidth: 4,
            borderColor: Colors.white,
            alignSelf: 'center',
            alignItems: 'center',
          }}
        /> */}

        {!vetPhoto ? (
          <TouchableOpacity onPress={takePhoto}>
            <View
              style={{
                borderRadius: 40,
                height: 80,
                width: 80,
                justifyContent: 'center',
                backgroundColor: Colors.neutral.gray100,
                alignItems: 'center',
              }}>
              <Image
                source={require('../../assets/dog-vet.png')}
                style={{width: 40, height: 40}}
              />
            </View>
          </TouchableOpacity>
        ) : (
          <Image
            source={{uri: `data:image/png;base64,${vetPhoto}`}}
            style={{
              height: 120,
              width: 120,
              borderRadius: 80,
              borderWidth: 4,
              borderColor: Colors.white,
              alignSelf: 'center',
              alignItems: 'center',
              marginVertical: 10,
            }}
          />
        )}

        <View style={{marginLeft: 10}}>
          <TextComponent
            textStyles={{
              color: Colors.primary,
              fontSize: 16,
              fontFamily: 'Ubuntu-Bold',
            }}>
            Profesional Veterinario
          </TextComponent>
          <View
            style={{
              borderWidth: 1,
              borderColor: Colors.neutral.gray300,
              marginVertical: 8,
            }}
          />
          <View style={{flexDirection: 'row'}}>
            <TextComponent
              textStyles={{
                color: Colors.neutral.gray900,
                fontSize: 14,
                fontFamily: 'Ubuntu-Bold',
              }}>
              Dr. {vetName}
            </TextComponent>
            <Ionicons name={'chevron-down'} size={16} color={Colors.primary} />
          </View>
          {licence && (
            <TextComponent
              textStyles={{
                color: Colors.neutral.gray900,
                fontSize: 14,
                fontFamily: 'Ubuntu-Medium',
                marginTop: 5,
              }}>
              Licencia: {licence}
            </TextComponent>
          )}
        </View>
      </View>
    );
  };
  const onSuccess = e => {
    const qrData = JSON.parse(e.data);

    setScanQR(false);
    dispatch(storeUser({...user, ...qrData.user, isPacient: true}));

    navigate(Screens.PETCLINICHISTORY, {
      screen: Screens.PETPROFILE,
      params: {callBack: setScanQR},
    });
  };
  const renderQr = () => {
    return (
      <View style={{flex: 1}}>
        <QRCodeScanner
          onRead={onSuccess}
          topContent={
            <>
              <TextComponent
                textStyles={{
                  color: Colors.white,
                  fontSize: 16,
                  fontFamily: 'Ubuntu-Medium',
                }}>
                Escanea el QR de tu paciente
              </TextComponent>
            </>
          }
        />
      </View>
    );
  };
  const renderRegisterModal = () => {
    return (
      <ModalComponent
        show={registerModalVisible}
        customContainer={{height: '40%'}}
        dismiss={() => setRegisterModalVisible(false)}
        hasDismissButon>
        <View
          style={{
            paddingHorizontal: 30,
          }}>
          <TextComponent
            textStyles={{
              textAlign: 'center',
              color: Colors.neutral.gray900,
              fontSize: 16,
              fontFamily: 'Ubuntu-Medium',
              marginVertical: 20,
            }}>
            REGISTRO
          </TextComponent>
          <TextComponent
            textStyles={{
              textAlign: 'center',
              color: Colors.neutral.gray900,
              fontSize: 16,
              fontFamily: 'Ubuntu-regular',
              marginVertical: 20,
            }}>
            Elije como registrar a tu paciente
          </TextComponent>
          <View style={{marginTop: 40}}>
            <ButtonComponent
              onPress={() => {
                setRegisterModalVisible(false);
                setTimeout(() => {
                  setScanQR(true);
                }, 500);
              }}
              customContainer={{
                backgroundColor: Colors.yellow,
                borderColor: Colors.yellow,
              }}
              buttonLabel="Escanea QR"
              right={true}
              size={24}
              color={Colors.neutral.gray900}
            />
            <View style={{height: 20}} />
            <ButtonComponent
              customContainer={{
                backgroundColor: Colors.white,
                borderColor: Colors.neutral.gray900,
              }}
              customTextStyle={{color: Colors.neutral.gray900}}
              buttonLabel=" Registro manual"
            />
          </View>
        </View>
      </ModalComponent>
    );
  };
  const renderAddPetButton = () => {
    return (
      <TouchableOpacity
        style={styles.plusButton}
        //onPress={() => navigate(Screens.REGISTER_STEP2, {pet: true})}
        onPress={() => setRegisterModalVisible(true)}>
        <Ionicons
          name={'add-circle-sharp'}
          size={30}
          color={Colors.neutral.gray900}
        />
      </TouchableOpacity>
    );
  };

  const renderPetList = () => {
    return (
      <SwipeListView
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={renderAddPetButton}
        disableRightSwipe
        data={petData}
        rightOpenValue={-56}
        renderItem={(data, rowMap) => (
          <Card
            onPress={() =>
              navigate(Screens.PETINFOSCREEN, {petName: data.item.name})
            }
            customStyles={{
              backgroundColor: Colors.primary,
              borderColor: Colors.primary,
              borderRadius: 10,
              height: 90,
            }}
            title={data.item.name}
            textStyle={{
              color: Colors.white,
            }}
            photo
            source={data.item.source}
            owner={data.item.owner}
          />
        )}
        renderHiddenItem={(data, rowMap) => (
          <View style={styles.rowBack}>
            <TouchableOpacity
              style={{
                backgroundColor: '#C0392B',
                height: 90,
                width: 45,
                justifyContent: 'center',
                borderBottomEndRadius: 10,
                alignItems: 'center',
                borderTopEndRadius: 10,
              }}>
              <Ionicons
                name={'close-circle-outline'}
                size={30}
                color={Colors.white}
              />
            </TouchableOpacity>
          </View>
        )}
      />
    );
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#6b1c88', '#B43EC6']}
        style={styles.squareGradient}>
        <TextComponent
          textStyles={{
            textAlign: 'center',
            color: Colors.white,
            fontSize: 16,
            fontFamily: 'Ubuntu-Bold',
          }}>
          Mi perfil
        </TextComponent>
      </LinearGradient>
      <View
        style={{
          marginHorizontal: 16,
          marginTop: -70,
        }}>
        {renderVetInfo()}
      </View>
      {/* {hasPatient ? (
        <View style={styles.mainContainer}>
          <TextComponent
            textStyles={{
              textAlign: 'center',
              textAlign: 'center',
              color: Colors.neutral.gray900,
              fontSize: 16,
              fontFamily: 'Ubuntu-Bold',
              marginBottom: 20,
            }}>
            Aún no tienes ninguna mascota resgistrada
          </TextComponent>
        </View>
      ) : (
        <View style={styles.feedContainer}>
          <View
            style={{
              marginHorizontal: 16,
              paddingBottom: 50,
              marginTop: 20,
            }}>
            {renderPetList()}
          </View>
        </View>
      )} */}
      {/* {/* {renderRegisterModal()} */}
      {scanQR && renderQr()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.secondary,
  },
  squareGradient: {
    flex: 0.2,
    backgroundColor: Colors.secondary,
  },
  mainContainer: {
    flex: 0.8,
    justifyContent: 'center',
    backgroundColor: Colors.red.darkRed,
  },
  feedContainer: {
    flex: 1,
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginLeft: 20,
  },
  plusButton: {
    alignSelf: 'center',
    marginVertical: 10,
  },
  rowBack: {
    flex: 1,
    height: '100%',
    position: 'absolute',
    right: 13,
  },
});

export default VetHomeScreen;
