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
import {useSelector, useDispatch} from 'react-redux';

import ClinicHistoryCard from '../../components/HistoryCard/ClinicHistoryCard';
import LinearGradient from 'react-native-linear-gradient';
import TextComponent from '../../components/TextComponent';
import {HeaderComponent} from '../../components/Header/HeaderComponent';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Colors from '../../constans/Colors';
import ModalComponent from '../../components/Modal/ModalComponent';
import TextInputComponent from '../../components/Input/TextInputComponent';
import ButtonComponent from '../../components/Button/ButtonComponent';
import moment from 'moment';
import {useLoaderContext} from '../../hooks/Loader';
import {updatePet} from '../../services/apis';
import {storePet} from '../../redux/actions/pet/petAction';

const {height} = Dimensions.get('screen');

const PetClinicHistory = () => {
  const {setLoading} = useLoaderContext();

  const clinicHistory = require('../../assets/clinic-history-doc.png');
  const [dogInfo] = useSelector(store => store.pets.pets);
  const user = useSelector(store => store.user);

  const dispatch = useDispatch();

  const [addRecordModal, setAddRecordModal] = useState(false);
  const [cardInfo, setCardInfo] = useState(false);
  const [date, setDate] = useState(moment.utc().format('DD/MM/YYYY'));
  const [reason, setReason] = useState('');
  const [treatment, setTreatment] = useState('');
  const [medication, setMedication] = useState('');
  const [diagnostic, setDiagnostic] = useState('');
  const [medicalTest, setMedicalTest] = useState('');
  const [results, setResults] = useState('');

  const [reasonErrorMsg, setReasonErrorMsg] = useState('');
  const [medicalTestErrorMsg, setMedicalTestErrorMsg] = useState('');
  const [resultsErrorMsg, setResultsErrorMsg] = useState('');
  const [treatmentErrorMsg, setTreatmentErrorMsg] = useState('');
  const [medicationErrorMsg, setMedicationErrorMsg] = useState('');
  const [diagnosticErrorMsg, setDiagnosticErrorMsg] = useState('');

  const addClinicRecord = async () => {
    setLoading(true);
    setAddRecordModal(false);
    const appoitments = dogInfo?.appoitments ? [...dogInfo.appoitments] : [];
    appoitments.push({
      date: moment.utc().format('MM/DD/YYYY'),
      reason,
      treatment,
      medication,
      diagnostic,
      medicalTest,
      results,
      vetName: `${user.vetUser.name} ${user.vetUser.surname} ${user.vetUser.licence}`,
    });
    const body = {
      owner: user.mail,
      petId: `${dogInfo?.name} - ${dogInfo?.birthdate}`,
      pet: {
        ...dogInfo,
        appoitments,
      },
    };
    try {
      updatePet(body)
        .then(response => {
          setDate(moment.utc().format('DD/MM/YYYY'));
          setReason('');
          setTreatment('');
          setMedication('');
          setDiagnostic('');
          setMedicalTest('');
          setResults('');
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

  const renderHistoryRecord = ({item}) => {
    return (
      <ClinicHistoryCard
        onPress={() => setCardInfo(item)}
        date={moment(item.date).format('DD/MM/YYYY')}
        observation={item.reason}
        vetName={item.vetName}
        editOnpress={() => editButtonHandler(item)}
      />
    );
  };

  const renderAddPetButton = () => {
    return (
      <TouchableOpacity
        style={styles.plusButton}
        onPress={() => {
          setAddRecordModal(true);
          setReason('');
          setMedicalTest('');
          setResults('');
          setTreatment('');
          setMedication('');
          setDiagnostic('');
        }}>
        <Ionicons
          name={'add-circle-sharp'}
          size={30}
          color={Colors.neutral.gray900}
        />
      </TouchableOpacity>
    );
  };

  const handleReasonInput = value => {
    if (value.length === 0) {
      setReasonErrorMsg('Campo obligatorio');
      setReason('');
      return true;
    }
    setReason(value);
    setReasonErrorMsg('');
    return false;
  };

  const handleMedicalTestInput = value => {
    if (value.length === 0) {
      setMedicalTestErrorMsg('Campo obligatorio');
      setMedicalTest('');
      return true;
    }
    setMedicalTest(value);
    setMedicalTestErrorMsg('');
    return false;
  };

  const handleResultsInput = value => {
    if (value.length === 0) {
      setResultsErrorMsg('Campo obligatorio');
      setResults('');
      return true;
    }
    setResults(value);
    setResultsErrorMsg('');
    return false;
  };
  const handleTreatmentInput = value => {
    if (value.length === 0) {
      setTreatmentErrorMsg('Campo obligatorio');
      setTreatment('');
      return true;
    }
    setTreatment(value);
    setTreatmentErrorMsg('');
    return false;
  };
  const handleMedicationInput = value => {
    if (value.length === 0) {
      setMedicationErrorMsg('Campo obligatorio');
      setMedication('');
      return true;
    }
    setMedication(value);
    setMedicationErrorMsg('');
    return false;
  };
  const handleDiagnosticInput = value => {
    if (value.length === 0) {
      setDiagnosticErrorMsg('Campo obligatorio');
      setDiagnostic('');
      return true;
    }
    setDiagnostic(value);
    setDiagnosticErrorMsg('');
    return false;
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
          CONSULTA
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
            {date}
          </TextComponent>
        </View>

        <View style={{marginVertical: 10}}>
          <TextInputComponent
            value={reason}
            onChangeText={handleReasonInput}
            label={'Motivo de la consulta'}
            placeholder="Escribe aqui"
            customContainer={{height: 40}}
            maxLength={30}
            error={reasonErrorMsg.length > 0}
            errorMsg={reasonErrorMsg}
          />

          <TextInputComponent
            value={medicalTest}
            onChangeText={handleMedicalTestInput}
            label={'Pruebas realizadas'}
            placeholder="Escribe aqui"
            customContainer={{height: 40}}
            maxLength={30}
            error={medicalTestErrorMsg.length > 0}
            errorMsg={medicalTestErrorMsg}
          />

          <TextInputComponent
            value={results}
            onChangeText={handleResultsInput}
            label={'Resultados'}
            placeholder={'Escribe aqui'}
            customContainer={{height: 40}}
            maxLength={30}
            error={resultsErrorMsg.length > 0}
            errorMsg={resultsErrorMsg}
          />

          <TextInputComponent
            value={treatment}
            onChangeText={handleTreatmentInput}
            label={'Tratamiento'}
            placeholder={'Escribe aqui'}
            customContainer={{height: 40}}
            maxLength={30}
            error={treatmentErrorMsg.length > 0}
            errorMsg={treatmentErrorMsg}
          />

          <TextInputComponent
            value={medication}
            onChangeText={handleMedicationInput}
            label={'Medicacion recetada'}
            placeholder={'Escribe aqui'}
            customContainer={{height: 40}}
            maxLength={30}
            error={medicationErrorMsg.length > 0}
            errorMsg={medicationErrorMsg}
          />

          <TextInputComponent
            value={diagnostic}
            onChangeText={handleDiagnosticInput}
            label={'Diagnostico'}
            placeholder={'Escribe aqui'}
            customContainer={{height: 40}}
            maxLength={30}
            error={diagnosticErrorMsg.length > 0}
            errorMsg={diagnosticErrorMsg}
          />
        </View>
        <View style={{marginTop: 10}}>
          <ButtonComponent
            onPress={addClinicRecord}
            buttonLabel={'Agendar'}
            disabled={
              reasonErrorMsg !== '' ||
              medicalTestErrorMsg !== '' ||
              resultsErrorMsg !== '' ||
              treatmentErrorMsg !== '' ||
              medicationErrorMsg !== '' ||
              diagnosticErrorMsg !== '' ||
              reason === '' ||
              medicalTest === '' ||
              results === '' ||
              treatment === '' ||
              medication === '' ||
              diagnostic === ''
            }
          />
        </View>
      </ScrollView>
    );
  };
  const addMedicalRecordModal = () => {
    return (
      <ModalComponent
        show={addRecordModal}
        customContainer={{height: height * 0.77}}
        hasDismissButon
        dismiss={() => setAddRecordModal(false)}>
        <View
          style={{
            paddingHorizontal: 30,
          }}>
          {renderModalContent()}
        </View>
      </ModalComponent>
    );
  };
  const renderCardInfo = () => {
    console.log('ITEEM', cardInfo);
    return (
      <ModalComponent
        show={!!cardInfo}
        customContainer={{height: height * 0.42}}
        hasDismissButon
        dismiss={() => setCardInfo(false)}>
        <TextComponent
          textStyles={{
            textAlign: 'center',
            color: Colors.neutral.gray900,
            fontSize: 14,
            fontFamily: 'Ubuntu-Bold',
            marginBottom: 20,
          }}>
          DETALLE DE LA CITA
        </TextComponent>
        <View style={styles.cardContainer}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <TextComponent
              textStyles={{
                color: Colors.primary,
                fontSize: 14,
                fontFamily: 'Ubuntu-Medium',
              }}>
              Fecha
            </TextComponent>

            <TextComponent textStyles={styles.cardText}>
              {cardInfo.date}
            </TextComponent>
          </View>
          <View style={styles.line} />
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <TextComponent
              textStyles={{
                color: Colors.primary,
                fontSize: 14,
                fontFamily: 'Ubuntu-Medium',
              }}>
              Veterinario
            </TextComponent>

            <TextComponent textStyles={styles.cardText}>
              {cardInfo.vetName}
            </TextComponent>
          </View>
          <View style={styles.line} />
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <TextComponent
              textStyles={{
                color: Colors.primary,
                fontSize: 14,
                fontFamily: 'Ubuntu-Medium',
              }}>
              Motivo de consulta
            </TextComponent>
            <TextComponent textStyles={styles.cardText}>
              {cardInfo.reason}
            </TextComponent>
          </View>
          <View style={styles.line} />
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <TextComponent
              textStyles={{
                color: Colors.primary,
                fontSize: 14,
                fontFamily: 'Ubuntu-Medium',
              }}>
              Tratamiento
            </TextComponent>
            <TextComponent textStyles={styles.cardText}>
              {cardInfo.treatment}
            </TextComponent>
          </View>
          <View style={styles.line} />
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <TextComponent
              textStyles={{
                color: Colors.primary,
                fontSize: 14,
                fontFamily: 'Ubuntu-Medium',
              }}>
              Medicación
            </TextComponent>
            <TextComponent textStyles={styles.cardText}>
              {cardInfo.medication}
            </TextComponent>
          </View>
          <View style={styles.line} />
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <TextComponent
              textStyles={{
                color: Colors.primary,
                fontSize: 14,
                fontFamily: 'Ubuntu-Medium',
              }}>
              Pruebas realizadas
            </TextComponent>
            <TextComponent textStyles={styles.cardText}>
              {cardInfo.medicalTest}
            </TextComponent>
          </View>
          <View style={styles.line} />
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <TextComponent
              textStyles={{
                color: Colors.primary,
                fontSize: 14,
                fontFamily: 'Ubuntu-Medium',
              }}>
              Diagnostico
            </TextComponent>
            <TextComponent textStyles={styles.cardText}>
              {cardInfo.diagnostic}
            </TextComponent>
          </View>
          <View style={styles.line} />
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <TextComponent
              textStyles={{
                color: Colors.primary,
                fontSize: 14,
                fontFamily: 'Ubuntu-Medium',
              }}>
              Resultados
            </TextComponent>
            <TextComponent textStyles={styles.cardText}>
              {cardInfo.results}
            </TextComponent>
          </View>
        </View>
      </ModalComponent>
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
        <View
          style={{
            flex: 0.8,
          }}>
          {dogInfo?.appoitments?.length > 0 ? (
            <FlatList
              showsVerticalScrollIndicator={false}
              data={dogInfo.appoitments.sort((a, b) => {
                return moment(b.date).valueOf() - moment(a.date).valueOf();
              })}
              renderItem={renderHistoryRecord}
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
                  Aún no se registraron citas
                </TextComponent>
                <View style={{alignSelf: 'center'}}>
                  <Image
                    source={clinicHistory}
                    style={{width: 60, height: 60}}
                  />
                </View>
              </View>
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
          title={'Historial Clinico'}
          customTitleStyle={{fontSize: 16, fontFamily: 'ubuntu-Medium'}}
          showGoBack={false}
        />
        {renderPetInfo()}
        {addMedicalRecordModal()}
        {renderCardInfo()}
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
  cardContainer: {
    backgroundColor: Colors.neutral.gray050,
    borderColor: Colors.neutral.gray050,
    borderWidth: 1,
    borderRadius: 10,
    padding: 20,
    marginHorizontal: 10,
  },
  cardText: {
    fontFamily: 'Ubuntu-Regular',
    color: Colors.neutral.gray900,
    fontSize: 14,
  },
  line: {
    borderColor: Colors.white,
    borderWidth: 1,
    marginVertical: 6,
  },
});

export default PetClinicHistory;
