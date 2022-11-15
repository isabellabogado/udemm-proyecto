import {
  View,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import React, {useState} from 'react';
import ClinicHistoryCard from '../../components/HistoryCard/ClinicHistoryCard';
import LinearGradient from 'react-native-linear-gradient';
import TextComponent from '../../components/TextComponent';
import {HeaderComponent} from '../../components/Header/HeaderComponent';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Colors from '../../constans/Colors';
import {useSelector, useDispatch} from 'react-redux';

import ModalComponent from '../../components/Modal/ModalComponent';
import ButtonComponent from '../../components/Button/ButtonComponent';
import TextInputComponent from '../../components/Input/TextInputComponent';
import moment from 'moment';
import {updatePet} from '../../services/apis';
import {useLoaderContext} from '../../hooks/Loader';
import {storePet} from '../../redux/actions/pet/petAction';

const {height} = Dimensions.get('screen');

const PetVaccineRecord = () => {
  const {setLoading} = useLoaderContext();

  const vaccineIcon = require('../../assets/drugs.png');
  const [dogInfo] = useSelector(store => store.pets.pets);
  const user = useSelector(store => store.user);

  const [visible, setVisible] = useState(false);
  const [vaccineName, setVaccineName] = useState('');
  const [date, setDate] = useState(moment.utc().format('DD/MM/YYYY'));

  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');

  const [dayErrorMsg, setDayErrorMsg] = useState('');
  const [monthErrorMsg, setMonthErrorMsg] = useState('');
  const [yearErrorMsg, setYearErrorMsg] = useState('');

  const [vaccineNameErrorMsg, setVaccineNameErrorMsg] = useState('');

  const dispatch = useDispatch();

  const handleOnBlurDayInput = () => {
    if (day > 31 || day < 1) {
      setDayErrorMsg('Fecha invalida');
      return;
    }
    if (day.length === 1) {
      setDay(`0${day}`);
    }
    setDayErrorMsg('');
  };

  const handleOnBlurMonthInput = () => {
    if (month > 12 || month < 1) {
      setMonthErrorMsg('Fecha invalida');
      return;
    }
    if (month.length === 1) {
      setMonth(`0${month}`);
    }
    setMonthErrorMsg('');
  };

  const handleOnBlurYearInput = () => {
    if (year < 2000 || year.length !== 4) {
      setYearErrorMsg('Fecha invalida');
      return;
    }
    setYearErrorMsg('');
  };

  const addVaccine = async () => {
    setLoading(true);
    setVisible(false);
    const vaccines = dogInfo.vaccines ? [...dogInfo.vaccines] : [];
    vaccines.push({
      date: moment.utc().format('MM/DD/YYYY'),
      vaccineName,
      vaccineExpiration: `${month}/${day}/${year}`,
      vetName: `${user.vetUser.name} ${user.vetUser.surname} ${user.vetUser.licence}`,
    });
    const body = {
      owner: user.mail,
      petId: `${dogInfo?.name} - ${dogInfo?.birthdate}`,
      pet: {
        ...dogInfo,
        vaccines,
      },
    };
    try {
      updatePet(body)
        .then(response => {
          setVaccineName('');
          setDay('');
          setYear('');
          setMonth('');
          setDate(moment.utc().format('DD/MM/YYYY'));
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
  const handleVaccineNameInput = value => {
    if (value.length === 0) {
      setVaccineNameErrorMsg('Campo obligatorio');
      setVaccineName('');
      return true;
    }
    setVaccineName(value);
    setVaccineNameErrorMsg('');
    return false;
  };
  const handleDayInput = value => {
    if (value.length === 0) {
      setDay('');
      return true;
    }
    setDay(value);
    return false;
  };
  const handleMonthInput = value => {
    if (value.length === 0) {
      setMonth('');
      return true;
    }
    setMonth(value);
    return false;
  };
  const handleYearInput = value => {
    if (value.length === 0) {
      setYear('');
      return true;
    }
    setYear(value);
    return false;
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
          <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            <View>
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

              <TextComponent
                textStyles={{
                  color: Colors.primary,
                  fontSize: 18,
                  fontFamily: 'Ubuntu-Bold',
                  textAlign: 'center',
                }}>
                {dogInfo?.name}
              </TextComponent>
            </View>
            {user.isPacient && (
              <View
                style={{
                  position: 'absolute',
                  right: 18,
                  top: 15,
                }}>
                {renderAddPetButton()}
              </View>
            )}
          </View>
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
        <View style={{flex: 0.8}}>
          {dogInfo?.vaccines?.sort((a, b) => {
            return (
              moment(a.vaccineExpiration).valueOf() -
              moment(b.vaccineExpiration).valueOf()
            );
          }).length > 0 ? (
            <FlatList
              data={dogInfo?.vaccines}
              renderItem={renderVaccineRecordList}
              showsVerticalScrollIndicator={false}
            />
          ) : (
            <View
              style={{
                flex: 1,
                backgroundColor: Colors.neutral.gray050,
                borderBottomEndRadius: 10,
                borderBottomLeftRadius: 10,
              }}>
              <View style={{flex: 0.9, justifyContent: 'center'}}>
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
            </View>
          )}
        </View>
      </View>
    );
  };

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
              {item.vaccineName}
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
              {moment(item.date).format('DD/MM/YYYY')}
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
              {item.vaccineExpiration}
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

  const buttonHandler = () => {
    setVisible(false);
    addVaccine();
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
            {date}
          </TextComponent>
        </View>
        <View style={{marginVertical: 15}}>
          <TextInputComponent
            value={vaccineName}
            onChangeText={handleVaccineNameInput}
            label={'Vacuna'}
            placeholder="Nombre de la vacuna"
            customContainer={{height: 40}}
            maxLength={30}
            error={vaccineNameErrorMsg.length > 0}
            errorMsg={vaccineNameErrorMsg}
          />
          <TextComponent
            textStyles={{
              color: Colors.neutral.gray900,
              fontSize: 14,
              fontFamily: 'Ubuntu-Bold',
              marginTop: 10,
            }}>
            Fecha de Expiración:
          </TextComponent>
          <View style={{flexDirection: 'row'}}>
            <TextInputComponent
              value={day}
              onChangeText={handleDayInput}
              label={'Día'}
              placeholder="Ej:10"
              customContainer={{width: 80, height: 40, marginRight: 10}}
              maxLength={2}
              onBlur={handleOnBlurDayInput}
              error={!!dayErrorMsg}
              keyboardType={'numeric'}
            />
            <TextInputComponent
              value={month}
              onChangeText={handleMonthInput}
              label={'Mes'}
              placeholder="Ej:10"
              customContainer={{width: 80, height: 40, marginRight: 10}}
              maxLength={2}
              onBlur={handleOnBlurMonthInput}
              error={!!monthErrorMsg}
              keyboardType={'numeric'}
            />
            <TextInputComponent
              value={year}
              onChangeText={handleYearInput}
              label={'Año'}
              placeholder="Ej:2022"
              customContainer={{width: 80, height: 40, marginRight: 10}}
              maxLength={4}
              onBlur={handleOnBlurYearInput}
              error={!!yearErrorMsg}
              keyboardType={'numeric'}
            />
          </View>
          {(yearErrorMsg !== '' ||
            monthErrorMsg !== '' ||
            dayErrorMsg !== '') && (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <View style={{marginRight: 5}}>
                <Ionicons
                  name={'alert-circle-outline'}
                  size={14}
                  color={Colors.red.darkRed}
                />
              </View>
              <TextComponent
                textStyles={{
                  color: Colors.red.darkRed,
                  fontFamily: 'Ubuntu-regular',
                  fontSize: 14,
                }}>
                Fecha invalida
              </TextComponent>
            </View>
          )}
        </View>
        <View style={{marginBottom: 30}}>
          <ButtonComponent
            disabled={
              yearErrorMsg !== '' ||
              monthErrorMsg !== '' ||
              dayErrorMsg !== '' ||
              vaccineNameErrorMsg !== '' ||
              year === '' ||
              month === '' ||
              day === '' ||
              vaccineName === ''
            }
            onPress={buttonHandler}
            buttonLabel="Aceptar"
          />
        </View>
      </ScrollView>
    );
  };
  const addVaccineModal = () => {
    return (
      <ModalComponent
        show={visible}
        customContainer={{height: height * 0.47}}
        hasDismissButon
        dismiss={() => {
          setVisible(false);
          setDay('');
          setMonth('');
          setYear('');
          setVaccineName('');
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

export default PetVaccineRecord;
