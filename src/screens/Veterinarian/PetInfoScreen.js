import {View, StyleSheet, Image, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';

import LinearGradient from 'react-native-linear-gradient';
import TextComponent from '../../components/TextComponent';
import {HeaderComponent} from '../../components/Header/HeaderComponent';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Colors from '../../constans/Colors';
import PetInfoCard from '../../components/PetInfoCard/PetInfoCard';
import {useRoute} from '@react-navigation/native';
import {useLoaderContext} from '../../hooks/Loader';
import {getPet} from '../../services/apis';

const PetInfoScreen = () => {
  const route = useRoute();
  const {setLoading} = useLoaderContext();

  const {id, mail} = route.params;
  const dogLogo = require('../../assets/dog-logo.png');
  const weighingLogo = require('../../assets/weighing-logo.png');
  const dogSchedule = require('../../assets/dog-schedule.png');
  const pets = require('../../assets/pets.png');
  const [hasMedicalRecord, setHasMedicalRecord] = useState(false);
  const [petInfo, setPetInfo] = useState();

  const getPetInfo = async () => {
    setLoading(true);
    try {
      await getPet(mail).then(response => {
        const [
          tmpPetName,
          tmpPetBirthdayDay,
          tmpPetBirthdayMonth,
          tmpPetBirthdayYear,
        ] = id.split('-');

        const petFound = response.data.Items.find(
          ({pet}) =>
            pet.name === tmpPetName &&
            pet.birthday ===
              `${tmpPetBirthdayDay}-${tmpPetBirthdayMonth}-${tmpPetBirthdayYear}`,
        );
        setPetInfo(petFound.pet);
      });
    } catch (e) {
      setLoading(false);
      console.log('error', e);
    }
  };

  useEffect(() => {
    // if (!petInfo) getPetInfo();
    getPetInfo();
  }, []);

  const petData = [
    {label: 'Raza', image: dogLogo, description: petInfo?.breed || ''},
    {
      label: 'Peso',
      image: weighingLogo,
      description: `${petInfo?.weight || 0} kgs`,
    },
    {label: 'Tamaño', image: pets, description: petInfo?.size},
    {
      label: 'Edad',
      image: dogSchedule,
      description: petInfo?.age && `${petInfo?.age} Años`,
    },
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
          <Image
            source={{uri: `data:image/png;base64,${petInfo?.img}`}}
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

          <TextComponent
            textStyles={{
              color: Colors.primary,
              fontSize: 18,
              fontFamily: 'Ubuntu-Bold',
              textAlign: 'center',
            }}>
            Justin
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
              Dueño: Damian Mussi
            </TextComponent>
            <Ionicons name={'chevron-down'} size={16} color={Colors.primary} />
          </View>
        </View>
        <View
          style={{
            flex: 0.7,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <FlatList data={petData} numColumns={2} renderItem={renderItem} />
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

export default PetInfoScreen;
