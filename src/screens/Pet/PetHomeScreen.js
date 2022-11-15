import {
  View,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';

import LinearGradient from 'react-native-linear-gradient';
import TextComponent from '../../components/TextComponent';
import {HeaderComponent} from '../../components/Header/HeaderComponent';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Colors from '../../constans/Colors';
import PetInfoCard from '../../components/PetInfoCard/PetInfoCard';
import ModalComponent from '../../components/Modal/ModalComponent';
import QRCode from 'react-native-qrcode-svg';
import TextInputComponent from '../../components/Input/TextInputComponent';
import ButtonComponent from '../../components/Button/ButtonComponent';
import {getPet, updatePet} from '../../services/apis';
import {useLoaderContext} from '../../hooks/Loader';

import {storePet} from '../../redux/actions/pet/petAction';
import {useRoute} from '@react-navigation/native';

const {height} = Dimensions.get('screen');
const PetHomeScreen = () => {
  const route = useRoute();
  const params = route.params;

  const edit = require('../../assets/edit.png');
  const user = useSelector(store => store.user);
  //   user.isPacient

  const [dogInfo] = useSelector(store => store.pets.pets);

  const {setLoading} = useLoaderContext();

  const dogVet = require('../../assets/dog-vet.png');

  const dogLogo = require('../../assets/dog-logo.png');
  const weighingLogo = require('../../assets/bascula.png');
  const dogSchedule = require('../../assets/dog-schedule.png');
  const pets = require('../../assets/pets.png');

  const [showQr, setShowQr] = useState(false);
  const [editOption, setEditOption] = useState(false);
  const [visible, setVisible] = useState(false);
  const [breed, setBreed] = useState('');
  const [weight, setWeight] = useState('');
  const [size, setSize] = useState('');
  const [age, setAge] = useState('');
  const dispatch = useDispatch();

  const addPetInfo = async body => {
    setLoading(true);
    try {
      updatePet(body)
        .then(response => {
          setWeight('');
          setAge('');
          setBreed('');
          setSize('');
          dispatch(storePet(body.pet));
        })
        .finally(() => {
          setLoading(false);
        });
    } catch (e) {
      setLoading(false);
      console.log('error', e);
    }
  };
  const getPetInfo = async () => {
    setLoading(true);
    try {
      await getPet(user.mail).then(response => {
        dispatch(storePet(response.data.Items[0].pet));
      });
    } catch (e) {
      console.log('error', e);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    console.log('params', params);
    if (params) {
      if (params.isVet) {
        params.callBack(true);
      }
    }
  }, []);

  useEffect(() => {
    getPetInfo();
  }, []);

  const petData = [
    {label: 'Raza', image: dogLogo, description: dogInfo?.breed},
    {label: 'Peso', image: weighingLogo, description: `${dogInfo?.weight} kgs`},
    {label: 'Tamaño', image: pets, description: dogInfo?.size},
    {label: 'Edad', image: dogSchedule, description: `${dogInfo?.age} Años`},
  ];

  const renderItem = ({item}) => {
    return (
      <View
        style={{
          margin: 10,
        }}>
        <PetInfoCard
          label={item.label}
          image={item.image}
          description={item.description}
        />
      </View>
    );
  };
  const renderQrModal = () => {
    return (
      <ModalComponent
        show={showQr}
        customContainer={{height: height * 0.46}}
        dismiss={() => setShowQr(false)}
        hasDismissButon>
        <View
          style={{
            paddingHorizontal: 30,
          }}>
          <TextComponent
            textStyles={{
              textAlign: 'center',
              color: Colors.black,
              fontSize: 14,
              fontFamily: 'Ubuntu-regular',
              marginVertical: 20,
            }}>
            Presentale este QR al veterinario para{'\n'}
            {'\n'}que acceda a la ficha de tu mascota.
          </TextComponent>
          <View style={{alignSelf: 'center', marginTop: 16}}>
            <QRCode
              // logo={require('../../assets/main-logo.png')}
              logoSize={40}
              value={JSON.stringify({
                user: user,
                id: `${dogInfo?.name}-${dogInfo?.birthday}`,
              })}
              size={200}
              color={Colors.primary}
            />
          </View>
        </View>
      </ModalComponent>
    );
  };
  const addInfoButton = () => {
    return (
      <TouchableOpacity onPress={() => setVisible(true)}>
        <View style={{marginRight: 10, marginBottom: 10}}>
          <Ionicons
            name={'add-circle-sharp'}
            size={30}
            color={Colors.neutral.gray900}
          />
        </View>
      </TouchableOpacity>
    );
  };
  const addInfoHandler = () => {
    const body = {
      owner: user.mail,
      petId: `${dogInfo?.name} - ${dogInfo?.birthdate}`,
      pet: {
        ...dogInfo,
        birthday: dogInfo.birthdate,
        breed,
        weight,
        size,
        age,
      },
    };
    setVisible(false);
    addPetInfo(body);
  };
  const renderModalContent = () => {
    return (
      <View>
        <TextComponent
          textStyles={{
            textAlign: 'center',
            color: Colors.neutral.gray900,
            fontSize: 16,
            fontFamily: 'Ubuntu-Bold',
            marginBottom: 6,
          }}>
          {editOption
            ? `Información sobre ${dogInfo?.name}`
            : 'AGREGA INFORMACIÓN'}
        </TextComponent>

        <TextInputComponent
          value={breed}
          onChangeText={setBreed}
          label={'Raza'}
          placeholder="Escribe aqui"
          maxLength={30}
        />

        <TextInputComponent
          value={weight}
          onChangeText={setWeight}
          label={'Peso'}
          placeholder="Escribe aqui"
          maxLength={30}
        />

        <TextInputComponent
          value={size}
          onChangeText={setSize}
          label={'Tamaño'}
          placeholder={'Escribe aqui'}
          maxLength={30}
        />
        <TextInputComponent
          value={age}
          onChangeText={setAge}
          label={'Edad'}
          placeholder={'Escribe aqui'}
          maxLength={10}
          keyboardType={'numeric'}
        />

        <ButtonComponent
          disabled={breed == '' || weight === ' ' || size === '' || age === ''}
          buttonLabel={editOption ? 'Confirmar' : 'Agregar'}
          onPress={addInfoHandler}
        />
      </View>
    );
  };
  const addInfoModal = () => {
    return (
      <ModalComponent
        show={visible}
        customContainer={{height: height * 0.53}}
        hasDismissButon
        dismiss={() => {
          setWeight('');
          setAge('');
          setBreed('');
          setSize('');
          setVisible(false);
        }}>
        <View
          style={{
            paddingHorizontal: 30,
          }}>
          {renderModalContent()}
        </View>
      </ModalComponent>
    );
  };
  const renderPetInfo = () => {
    return (
      <View
        style={{
          borderRadius: 10,
          backgroundColor: Colors.white,
          flex: 0.9,
          marginHorizontal: 16,
          marginVertical: 16,
        }}>
        <View style={{flex: 0.3, marginBottom: 50}}>
          <View style={{flexDirection: 'row', alignSelf: 'center'}}>
            <Image
              source={{uri: `data:image/png;base64,${dogInfo?.img}`}}
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
            {dogInfo?.size && (
              <View
                style={{
                  position: 'absolute',
                  right: -100,
                  top: 15,
                }}>
                <TouchableOpacity
                  onPress={() => {
                    setEditOption(true);
                    setWeight(dogInfo.weight);
                    setAge(dogInfo.age);
                    setBreed(dogInfo.breed);
                    setSize(dogInfo.size);
                    setVisible(true);
                  }}>
                  <Image
                    source={edit}
                    style={{
                      width: 24,
                      height: 24,
                      tintColor: Colors.neutral.gray900,
                    }}
                  />
                </TouchableOpacity>
              </View>
            )}
          </View>

          <TextComponent
            textStyles={{
              color: Colors.primary,
              fontSize: 18,
              fontFamily: 'Ubuntu-Bold',
              textAlign: 'center',
            }}>
            {dogInfo?.name}
          </TextComponent>

          <View
            style={{
              borderWidth: 1,
              borderColor: Colors.neutral.gray300,
              marginVertical: 8,
              marginHorizontal: 16,
            }}
          />
          <View
            style={{
              flexDirection: 'row',
              alignSelf: 'center',
            }}>
            <TextComponent
              textStyles={{
                color: Colors.neutral.gray900,
                fontSize: 14,
                fontFamily: 'Ubuntu-Bold',
              }}>
              {`Dueño: ${user.name} ${user.surname}`}
            </TextComponent>
            <Ionicons name={'chevron-down'} size={16} color={Colors.primary} />
          </View>
        </View>
        <View style={{flex: 1}}>
          {dogInfo?.size ? (
            <View style={{alignSelf: 'center', marginTop: 30}}>
              <FlatList
                data={petData}
                numColumns={2}
                renderItem={renderItem}
                ListFooterComponent={
                  !user.isPacient && (
                    <View style={{alignSelf: 'center', marginTop: 15}}>
                      <TouchableOpacity onPress={() => setShowQr(true)}>
                        <Ionicons
                          name={'qr-code-outline'}
                          size={40}
                          color={Colors.primary}
                        />
                      </TouchableOpacity>
                    </View>
                  )
                }
              />
            </View>
          ) : (
            <View
              style={{
                flex: 1,
                backgroundColor: Colors.neutral.gray050,
                marginTop: 20,
              }}>
              <View style={{flex: 0.9, justifyContent: 'center'}}>
                <View
                  style={{
                    alignSelf: 'center',
                    alignItems: 'center',
                  }}>
                  <TextComponent
                    textStyles={{
                      textAlign: 'center',
                      textAlign: 'center',
                      color: Colors.neutral.gray900,
                      fontSize: 16,
                      fontFamily: 'Ubuntu-Medium',
                      marginBottom: 20,
                    }}>
                    Agrega información sobre tu masacota
                  </TextComponent>
                </View>
                <View style={{alignSelf: 'center'}}>{addInfoButton()}</View>
              </View>
              {user.isPacient && (
                <View
                  style={{
                    flex: 0.1,
                    justifyContent: 'flex-end',
                  }}>
                  <View
                    style={{
                      alignSelf: 'flex-end',
                    }}>
                    {addInfoButton()}
                  </View>
                </View>
              )}
            </View>
          )}
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#6b1c88', '#B43EC6']}
        style={styles.squareGradient}>
        <HeaderComponent
          title={'Perfil'}
          customTitleStyle={{fontSize: 16, fontFamily: 'ubuntu-Medium'}}
          showGoBack={false}
        />
        {renderPetInfo()}
        {renderQrModal()}
        {addInfoModal()}
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
  },
});

export default PetHomeScreen;
