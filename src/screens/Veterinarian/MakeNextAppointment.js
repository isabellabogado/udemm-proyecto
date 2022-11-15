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
import {Calendar, LocaleConfig} from 'react-native-calendars';
import ButtonComponent from '../../components/Button/ButtonComponent';
import TextInputComponent from '../../components/Input/TextInputComponent';
import ModalComponent from '../../components/Modal/ModalComponent';
import AppointmentCard from '../../components/AppointmentCard/AppointmentCard';

const MakeNextAppointment = () => {
  const [visible, setVisible] = useState(false);
  const [newAppointmentModal, setNewAppointmentModal] = useState(false);
  const [hasAppointment, setHasAppointment] = useState(false);

  LocaleConfig.locales['fr'] = {
    monthNames: [
      'Enero',
      'Febrero',
      'Marzo',
      'Abril',
      'Mayo',
      'Junio',
      'Julio',
      'Agosto',
      'Septiembre',
      'Octubre',
      'Noviembre',
      'Diciembre',
    ],
    monthNamesShort: [
      'Janv.',
      'Févr.',
      'Mars',
      'Avril',
      'Mai',
      'Juin',
      'Juil.',
      'Août',
      'Sept.',
      'Oct.',
      'Nov.',
      'Déc.',
    ],
    dayNames: [
      'Domingo',
      'Lunes',
      'Martes',
      'Miercoles',
      'Jueves',
      'Viernes',
      'Sábado',
    ],
    dayNamesShort: ['Dom.', 'Lun.', 'Mar.', 'Mie.', 'Jue.', 'Vie.', 'Sáb.'],
    today: "Aujourd'hui",
  };
  LocaleConfig.defaultLocale = 'fr';

  const addNewAppointmentButton = () => {
    return (
      <TouchableOpacity
        style={styles.plusButton}
        onPress={() => setNewAppointmentModal(true)}>
        <Ionicons
          name={'add-circle-sharp'}
          size={30}
          color={Colors.neutral.gray900}
        />
      </TouchableOpacity>
    );
  };
  const buttonHandler = () => {
    setNewAppointmentModal(false);
    setTimeout(() => setVisible(true), 500);
  };
  const renderNewAppintmentModal = () => {
    return (
      <ModalComponent
        customContainer={{height: '72%'}}
        show={newAppointmentModal}>
        <ScrollView>
          <TextComponent
            textStyles={{
              textAlign: 'center',
              color: Colors.neutral.gray900,
              fontSize: 16,
              fontFamily: 'Ubuntu-Medium',
              marginVertical: 20,
            }}>
            PRÓXIMO TURNO
          </TextComponent>
          <Calendar
            initialDate={'2022-09-15'}
            minDate={'2012-05-10'}
            maxDate={'2024-01-01'}
            onDayPress={day => {
              console.log('selected day', day);
            }}
            style={{
              marginHorizontal: 30,
              borderRadius: 8,
              borderWidth: 2,
              borderColor: Colors.neutral.gray500,
              indicatorColor: 'blue',
            }}
          />
          <View style={{marginHorizontal: 30, marginVertical: 20}}>
            <TextInputComponent
              label={'Especialidad'}
              placeholder={'Ej: Rayos'}
            />
            <TextInputComponent
              label={'Sucursal'}
              placeholder={'Av.Corrientes 1234'}
            />
          </View>

          <View style={{marginHorizontal: 60}}>
            <ButtonComponent
              onPress={buttonHandler}
              customContainer={{
                backgroundColor: Colors.yellow,
                borderColor: Colors.yellow,
              }}
              buttonLabel="Reservar turno"
              Reservar
              turno
            />
          </View>
        </ScrollView>
      </ModalComponent>
    );
  };

  const vetAppointmentData = [
    {
      specialityValue: 'Rayos',
      vetClinicValue: 'Av Corrientes 1234',
      date: '10-09-2022',
    },
    {
      specialityValue: 'Laboratorio',
      vetClinicValue: 'Av Corrientes 1234',
      date: '20-10-2022',
    },
    {
      specialityValue: 'Clinico',
      vetClinicValue: 'Av Corrientes 1234',
      date: '12-11-2022',
    },
  ];

  const renderVetAppointmentList = ({item}) => {
    return (
      <AppointmentCard
        specialityValue={item.specialityValue}
        vetClinicValue={item.vetClinicValue}
        date={item.date}
      />
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
          {hasAppointment ? (
            <FlatList
              data={vetAppointmentData}
              renderItem={renderVetAppointmentList}
              ListHeaderComponent={addNewAppointmentButton}
              showsVerticalScrollIndicator={false}
            />
          ) : (
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
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
                  Aún no se agregaron turnos
                </TextComponent>
                <View style={{alignSelf: 'center'}}>
                  <Ionicons name={'calendar'} size={60} color={'#1C2833'} />
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
                {addNewAppointmentButton()}
              </View>
            </View>
          )}
        </View>
      </View>
    );
  };

  const renderModalContent = () => {
    return (
      <ModalComponent
        show={visible}
        customContainer={{heigh: '30%', paddingVertical: 20}}>
        <View style={{alignSelf: 'center'}}>
          <Ionicons
            name={'checkmark-circle-sharp'}
            size={70}
            color={'#2DC876'}
          />
        </View>
        <TextComponent
          textStyles={{
            color: Colors.neutral.gray900,
            fontSize: 18,
            fontFamily: 'Ubuntu-Medium',
            textAlign: 'center',
            marginTop: 20,
          }}>
          Has reservado un turno{'\n'}para Justin
        </TextComponent>
        <View
          style={{
            marginHorizontal: 80,
            flex: 1,
            justifyContent: 'flex-end',
          }}>
          <ButtonComponent
            onPress={() => setVisible(false)}
            customContainer={{
              backgroundColor: Colors.yellow,
              borderColor: Colors.yellow,
            }}
            buttonLabel="Ok"
          />
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
          title={'Sacar turno'}
          customTitleStyle={{fontSize: 16, fontFamily: 'ubuntu-Medium'}}
        />
        {renderPetInfo()}
        {renderModalContent()}
        {renderNewAppintmentModal()}
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
  cardStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: Colors.neutral.gray050,
    borderRadius: 8,
    marginHorizontal: 10,
  },
});

export default MakeNextAppointment;
