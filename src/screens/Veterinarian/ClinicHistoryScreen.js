import {
  View,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import ClinicHistoryCard from '../../components/HistoryCard/ClinicHistoryCard';
import LinearGradient from 'react-native-linear-gradient';
import TextComponent from '../../components/TextComponent';
import {HeaderComponent} from '../../components/Header/HeaderComponent';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Colors from '../../constans/Colors';
import ModalComponent from '../../components/Modal/ModalComponent';
import TextInputComponent from '../../components/Input/TextInputComponent';
import ButtonComponent from '../../components/Button/ButtonComponent';
import ToastComponent from '../../components/Toast/ToastComponent';
import {SwipeListView} from 'react-native-swipe-list-view';

const {height} = Dimensions.get('screen');

const ClinicHistoryScreen = () => {
  const clinicHistory = require('../../assets/clinic-history-doc.png');
  const editIcon = require('../../assets/edit.png');
  const [hasMedicalRecord, setHasMedicalRecord] = useState(false);

  const [showEditToast, setShowEditToast] = useState(false);
  const [visible, setVisible] = useState(false);
  const [editOption, setEditOption] = useState(false);

  clinicHistoryData = [
    {
      date: '12-04-2021',
      observation: 'Aqui van las observaciones de la consulta veterinaria',
      vetName: 'Dra Monica Baez',
    },
    {
      date: '08-06-2021',
      observation: 'Aqui van las observaciones de la consulta veterinaria',
      vetName: 'Dra Monica Baez',
    },
    {
      date: '14-09-2021',
      observation: 'Aqui van las observaciones de la consulta veterinaria',
      vetName: 'Dra Juliana Vera',
    },
  ];

  const editButtonHandler = ({item}) => {
    console.log('item', item);
    setEditOption(true);
    setVisible(true);
  };

  const renderHistoryRecord = () => {
    return (
      <SwipeListView
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={renderAddPetButton}
        disableRightSwipe
        data={clinicHistoryData}
        rightOpenValue={-40}
        renderItem={(data, rowMap) => (
          <ClinicHistoryCard
            date={data.item.date}
            observation={data.item.observation}
            vetName={data.item.vetName}
            editOnpress={() => editButtonHandler(item)}
          />
        )}
        renderHiddenItem={(data, rowMap) => (
          <View style={styles.rowBack}>
            <View
              style={{
                backgroundColor: Colors.neutral.gray900,
                height: '44%',
                width: 45,
                justifyContent: 'center',
                borderTopEndRadius: 10,
                alignItems: 'center',
              }}>
              <TouchableOpacity onPress={editButtonHandler}>
                <Image
                  source={editIcon}
                  style={{
                    width: 40,
                    height: 40,
                    tintColor: Colors.white,
                  }}
                />
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={{
                backgroundColor: Colors.red.darkRed,
                height: '40%',
                width: 45,
                justifyContent: 'center',
                borderBottomEndRadius: 10,
                alignItems: 'center',
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
          flex: 0.9,
          marginHorizontal: 16,
          marginVertical: 16,
          backgroundColor: Colors.white,
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
        <View
          style={{
            flex: 0.7,
            marginTop: 20,
          }}>
          {hasMedicalRecord ? (
            <View>
              {renderHistoryRecord()}
              {showEditToast && (
                <ToastComponent description={'Editaste el historial clinico'} />
              )}
            </View>
          ) : (
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                backgroundColor: Colors.neutral.gray100,
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
                  Aún no se registraron citas
                </TextComponent>
                <View style={{alignSelf: 'center'}}>
                  <Image
                    source={clinicHistory}
                    style={{width: 60, height: 60}}
                  />
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

  const buttonHandler = () => {
    setVisible(false);
    setEditOption(false);
    setShowEditToast(true);
    setTimeout(() => setShowEditToast(false), 8000);
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
            marginVertical: 20,
          }}>
          DIAGNÓSTICO
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
            Fecha de hoy
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
            label={'Motivo de la consulta'}
            placeholder="Escribe aqui"
            customContainer={{height: 40}}
            maxLength={30}
          />

          <TextInputComponent
            label={'Pruebas realizadas'}
            placeholder="Escribe aqui"
            customContainer={{height: 40}}
            maxLength={30}
          />

          <TextInputComponent
            label={'Resultados'}
            placeholder={'Escribe aqui'}
            customContainer={{height: 40}}
            maxLength={30}
          />
          <TextInputComponent
            label={'Tratamiento'}
            placeholder={'Escribe aqui'}
            customContainer={{height: 40}}
            maxLength={10}
          />
          <TextInputComponent
            label={'Medicacion recetada'}
            placeholder={'Escribe aqui'}
            customContainer={{height: 40}}
            maxLength={30}
          />
          <TextInputComponent
            label={'Diagnostico'}
            placeholder={'Escribe aqui'}
            customContainer={{height: 40}}
            maxLength={30}
          />
        </View>
        <View style={{marginHorizontal: 30}}>
          <ButtonComponent
            onPress={() => (editOption ? buttonHandler() : setVisible(false))}
            customContainer={{
              backgroundColor: Colors.yellow,
              borderColor: Colors.yellow,
            }}
            buttonLabel={editOption ? 'Editar' : 'Agendar'}
          />
        </View>
      </View>
    );
  };
  const addMedicalRecordModal = () => {
    return (
      <ModalComponent show={visible}>
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
          title={'Historial Clinico'}
          customTitleStyle={{fontSize: 16, fontFamily: 'ubuntu-Medium'}}
          showGoBack={false}
        />
        {renderPetInfo()}
        {addMedicalRecordModal()}
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
  plusButton: {
    alignSelf: 'center',
  },
  rowBack: {
    flex: 1,
    height: 177,
    position: 'absolute',
    right: 15,
    top: 10,
  },
});

export default ClinicHistoryScreen;
