import {
  View,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import ClinicHistoryCard from '../../components/HistoryCard/ClinicHistoryCard';
import LinearGradient from 'react-native-linear-gradient';
import TextComponent from '../../components/TextComponent';
import {HeaderComponent} from '../../components/Header/HeaderComponent';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Colors from '../../constans/Colors';
import ModalComponent from '../../components/Modal/ModalComponent';
import ButtonComponent from '../../components/Button/ButtonComponent';
import TextInputComponent from '../../components/Input/TextInputComponent';
const VaccineRecordScreen = () => {
  const vaccineIcon = require('../../assets/drugs.png');

  const [visible, setVisible] = useState(false);
  const [hasVaccineRecord, setHasVaccineRecord] = useState(true);

  const renderAddPetButton = () => {
    return (
      <TouchableOpacity
        style={styles.plusButton}
        onPress={() => setVisible(true)}>
        <Ionicons
          name={'add-circle-sharp'}
          size={30}
          color={Colors.neutral.gray900}
        />
      </TouchableOpacity>
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
        <View style={{flex: 0.3}}>
          <Image
            source={require('../../assets/justin.png')}
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
        <View style={{flex: 0.7, marginTop: 20}}>
          {hasVaccineRecord ? (
            <FlatList
              data={vaccineData}
              renderItem={renderVaccineRecordList}
              showsVerticalScrollIndicator={false}
              ListHeaderComponent={renderAddPetButton}
            />
          ) : (
            <View
              style={{
                flex: 1,
                backgroundColor: Colors.neutral.gray100,
                borderBottomEndRadius: 10,
                borderBottomLeftRadius: 10,
              }}>
              <View style={{flex: 0.8, justifyContent: 'center'}}>
                <TextComponent
                  textStyles={{
                    textAlign: 'center',
                    textAlign: 'center',
                    color: Colors.neutral.gray900,
                    fontSize: 16,
                    fontFamily: 'Ubuntu-Bold',
                    marginBottom: 20,
                  }}>
                  Aún no se registraron vacunas
                </TextComponent>
                <View style={{alignSelf: 'center'}}>
                  <Image source={vaccineIcon} style={{width: 60, height: 60}} />
                </View>
              </View>
              <View
                style={{
                  flex: 0.2,
                  alignSelf: 'flex-end',
                  paddingRight: 16,
                  justifyContent: 'flex-end',
                  paddingBottom: 16,
                }}>
                {renderAddPetButton()}
              </View>
            </View>
          )}
        </View>
      </View>
    );
  };

  const vaccineData = [
    {
      vacName: 'Parvovirus',
      date: '10-12-2021',
      expiration: '10-12-2031',
      stamp: 'Image',
      vetName: 'Valentina Juarez',
    },
    {
      vacName: 'Parvovirus',
      date: '10-12-2021',
      expiration: '10-12-2031',
      stamp: 'Image',
      vetName: 'Valentina Juarez',
    },
  ];

  const renderVaccineRecordList = ({item}) => {
    return (
      <View style={styles.cardContainer}>
        <View style={styles.cardStyle}>
          <View style={styles.cardRow}>
            <TextComponent
              textStyles={{
                color: Colors.primary,
                fontSize: 14,
                fontFamily: 'Ubuntu-Medium',
              }}>
              Vacuna
            </TextComponent>
            <TextComponent
              textStyles={{
                fontFamily: 'Ubuntu-Regular',
                color: Colors.neutral.gray900,
              }}>
              {item.vacName}
            </TextComponent>
          </View>
          <View
            style={{
              borderColor: Colors.white,
              borderWidth: 1,
              marginVertical: 6,
            }}
          />
          <View style={styles.cardRow}>
            <TextComponent
              textStyles={{
                color: Colors.primary,
                fontSize: 14,
                fontFamily: 'Ubuntu-Medium',
              }}>
              Fecha de aplicación
            </TextComponent>
            <TextComponent
              textStyles={{
                fontFamily: 'Ubuntu-Regular',
                color: Colors.neutral.gray900,
              }}>
              {item.date}
            </TextComponent>
          </View>
          <View
            style={{
              borderColor: Colors.white,
              borderWidth: 1,
              marginVertical: 6,
            }}
          />
          <View style={styles.cardRow}>
            <TextComponent
              textStyles={{
                color: Colors.primary,
                fontSize: 14,
                fontFamily: 'Ubuntu-Medium',
              }}>
              Fecha de expiración
            </TextComponent>
            <TextComponent
              textStyles={{
                fontFamily: 'Ubuntu-Regular',
                color: Colors.neutral.gray900,
              }}>
              {item.expiration}
            </TextComponent>
          </View>
          <View
            style={{
              borderColor: Colors.white,
              borderWidth: 1,
              marginVertical: 6,
            }}
          />
          <View style={styles.cardRow}>
            <TextComponent
              textStyles={{
                color: Colors.primary,

                fontSize: 14,
                fontFamily: 'Ubuntu-Medium',
              }}>
              Stamp
            </TextComponent>
            <TextComponent
              textStyles={{
                fontFamily: 'Ubuntu-Regular',
                color: Colors.neutral.gray900,
              }}>
              {item.stamp}
            </TextComponent>
          </View>
          <View
            style={{
              borderColor: Colors.white,
              borderWidth: 1,
              marginVertical: 6,
            }}
          />
          <View style={styles.cardRow}>
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
              }}>
              {item.vetName}
            </TextComponent>
          </View>
        </View>
      </View>
    );
  };

  const renderModalContent = () => {
    return (
      <ScrollView>
        <TextComponent
          textStyles={{
            textAlign: 'center',
            color: Colors.neutral.gray900,
            fontSize: 16,
            fontFamily: 'Ubuntu-Bold',
            marginVertical: 20,
          }}>
          AGREGAR UNA VACUNA
        </TextComponent>
        <View
          style={{
            backgroundColor: Colors.primary,
            flexDirection: 'row',
            borderRadius: 5,
            height: 40,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <TextComponent
            textStyles={{
              textAlign: 'center',
              color: Colors.white,
              fontSize: 14,
              fontFamily: 'Ubuntu-Bold',
            }}>
            Fecha de hoy:
          </TextComponent>
          <View style={{width: 20}} />
          <TextComponent
            textStyles={{
              textAlign: 'center',
              color: Colors.white,
              fontSize: 14,
              fontFamily: 'Ubuntu-Bold',
            }}>
            12/12/2022
          </TextComponent>
        </View>
        <View style={{marginVertical: 15}}>
          <TextInputComponent
            label={'Vacuna'}
            placeholder="Nombre de la vacuna"
            customContainer={{height: 40}}
            maxLength={30}
          />

          <TextInputComponent
            label={'Expiración'}
            placeholder="Fecha de Expiración"
            customContainer={{height: 40}}
            maxLength={30}
          />
          <TextInputComponent
            label={'Imagen de la estampa'}
            placeholder="Cargar una foto"
            customContainer={{height: 40}}
            maxLength={30}
          />
        </View>
        <View style={{marginHorizontal: 30, marginBottom: 30}}>
          <ButtonComponent
            onPress={() => setVisible(false)}
            customContainer={{
              backgroundColor: Colors.yellow,
              borderColor: Colors.yellow,
            }}
            buttonLabel="Aplicar"
          />
        </View>
      </ScrollView>
    );
  };
  const addVaccineModal = () => {
    return (
      <ModalComponent show={visible} customContainer={{height: '48%'}}>
        <View
          style={{
            paddingHorizontal: 30,
          }}>
          {renderModalContent()}
        </View>
      </ModalComponent>
    );
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#6b1c88', '#B43EC6']}
        style={styles.squareGradient}>
        <HeaderComponent
          title={'Vacunas'}
          customTitleStyle={{fontSize: 16, fontFamily: 'ubuntu-Medium'}}
          showGoBack={false}
        />
        {renderPetInfo()}
        {addVaccineModal()}
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

  infoContainer: {justifyContent: 'center', marginHorizontal: 20},
  plusButton: {
    alignSelf: 'center',
  },
  cardContainer: {
    marginHorizontal: 15,
    marginVertical: 10,
  },
  cardStyle: {
    backgroundColor: Colors.neutral.gray050,
    borderRadius: 8,
    padding: 10,
  },
  cardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default VaccineRecordScreen;
