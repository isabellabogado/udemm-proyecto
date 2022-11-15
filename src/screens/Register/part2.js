import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  Image,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import React, {useState} from 'react';
import Colors from '../../constans/Colors';
import {useNavigation, useRoute} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import BigCard from '../../components/BigCard/BigCard';
import TextInputComponent from '../../components/Input/TextInputComponent';
import {HeaderComponent} from '../../components/Header/HeaderComponent';
import ImagePicker from 'react-native-image-crop-picker';
import Screens from '../../navigation/Screens';
import ButtonComponent from '../../components/Button/ButtonComponent';
import TextComponent from '../../components/TextComponent';
import {registerOwner, registerPet} from '../../services/apis';
import {useLoaderContext} from '../../hooks/Loader';
import {useSelector, useDispatch} from 'react-redux';
import {storeUser} from '../../redux/actions/user/userAction';
import Ionicons from 'react-native-vector-icons/Ionicons';

const {height} = Dimensions.get('screen');

const RegisterStep2 = () => {
  const {setLoading} = useLoaderContext();

  const {navigate} = useNavigation();
  const route = useRoute();

  const {pet, vet} = route.params;
  const dispatch = useDispatch();
  const [ownerName, setOwnerName] = useState('');
  const [petName, setPetName] = useState('');
  const [ownerSurname, setOwnerSurname] = useState('');
  const [ownerPassword, setOwnerPassword] = useState('');
  const [ownerMail, setOwnerMail] = useState('');
  const [ownerPhone, setOwnerPhone] = useState('');
  const [petBirthday, setPetBirthday] = useState('');
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');

  const [petNameErrorMsg, setPetNameErrorMsg] = useState('');
  const [ownerNameErrorMsg, setOwnerNameErrorMsg] = useState('');
  const [ownerSurnameErrorMsg, setOwnerSurnameErrorMsg] = useState('');
  const [ownerMailErrorMsg, setOwnerMailErrorMsg] = useState('');
  const [ownerPasswordErrorMsg, setOwnerPasswordErrorMsg] = useState('');
  const [ownerPhoneErrorMsg, setOwnerPhoneErrorMsg] = useState('');
  const [dayErrorMsg, setDayErrorMsg] = useState('');
  const [monthErrorMsg, setMonthErrorMsg] = useState('');
  const [yearErrorMsg, setYearErrorMsg] = useState('');

  const [vetName, setVetName] = useState('');
  const [vetSurname, setVetSurname] = useState('');
  const [vetMail, setVetMail] = useState('');
  const [vetPhone, setVetPhone] = useState('');
  const [vetLicence, setVetLicence] = useState('');
  const [vetPassword, setVetPassword] = useState('');

  const [vetNameErrorMsg, setVetNameErrorMsg] = useState('');
  const [vetSurnameErrorMsg, setVetSurnameErrorMsg] = useState('');
  const [vetMailErrorMsg, setVetMailErrorMsg] = useState('');
  const [vetPhoneErrorMsg, setVetPhoneErrorMsg] = useState('');
  const [vetLicenceErrorMsg, setVetLicenceErrorMsg] = useState('');
  const [vetPasswordErrorMsg, setVetPasswordErrorMsg] = useState('');

  const handleOwnerPhoneInput = value => {
    if (value.length === 0) {
      setOwnerPhoneErrorMsg('Campo obligatorio');
      setOwnerPhone('');
      return true;
    }
    setOwnerPhone(value);
    setOwnerPhoneErrorMsg('');
    return false;
  };
  const handleOwnerPasswordInput = value => {
    if (value.length === 0) {
      setOwnerPasswordErrorMsg('Campo obligatorio');
      setOwnerPassword('');
      return true;
    }
    setOwnerPassword(value);
    setOwnerPasswordErrorMsg('');
    return false;
  };
  const handleOwnerSurnameInput = value => {
    if (value.length === 0) {
      setOwnerSurnameErrorMsg('Campo obligatorio');
      setOwnerSurname('');
      return true;
    }
    setOwnerSurname(value);
    setOwnerSurnameErrorMsg('');
    return false;
  };
  const handleOwnerNameInput = value => {
    if (value.length === 0) {
      setOwnerNameErrorMsg('Campo obligatorio');
      setOwnerName('');
      return true;
    }
    setOwnerName(value);
    setOwnerNameErrorMsg('');
    return false;
  };
  const handlePetNameInput = value => {
    if (value.length === 0) {
      setPetNameErrorMsg('Campo obligatorio');
      setPetName('');
      return true;
    }
    setPetName(value);
    setPetNameErrorMsg('');
    return false;
  };

  const handleOwnerMailInput = value => {
    const reg =
      /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

    if (value.length === 0) {
      setOwnerMailErrorMsg('El campo no puede estar vacío');
      setOwnerMail('');
      return true;
    }
    if (!reg.test(value)) {
      setOwnerMailErrorMsg('No es un correo válido.');
      setOwnerMail(value);
      return true;
    }
    setOwnerMail(value);
    setOwnerMailErrorMsg('');
    return false;
  };

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
  handleVetPhoneInput;
  const nextStep = async body => {
    setLoading(true);
    try {
      registerPet(body).then(response => {
        dispatch(
          storeUser({name: ownerName, surname: ownerSurname, mail: ownerMail}),
        );
        pet
          ? navigate(Screens.TAKEPHOTOSCREEN, {
              petName,
              petBirthday: `${month}/${day}/${year}`,
            })
          : navigate(Screens.VETPROFILE, {vet: true});
      });
    } catch (e) {
      console.log('error', e);
    } finally {
      setLoading(false);
    }
  };
  const completeRegister = async () => {
    setLoading(true);
    const petBody = {
      mail: ownerMail,
      pwd: ownerPassword,
      phone: ownerPhone,
      name: ownerName,
      surname: ownerSurname,
      isVet: false,
    };
    const vetBody = {
      mail: vetMail,
      pwd: vetPassword,
      phone: vetPhone,
      name: vetName,
      surname: vetSurname,
      isVet: true,
      licence: vetLicence,
    };

    try {
      await registerOwner(vet ? vetBody : petBody).then(response => {
        if (vet) {
          const user = {
            mail: vetMail,
            pwd: vetPassword,
            phone: vetPhone,
            name: vetName,
            surname: vetSurname,
            isVet: true,
          };

          if (user.isVet) dispatch(storeUser({vetUser: user}));

          navigate(Screens.VETPROFILE);
          return;
        } else
          nextStep({
            owner: ownerMail,
            pet: {
              birthdate: petBirthday,
              name: petName,
            },
          });
      });
    } catch (e) {
      console.log('error', e);
    } finally {
      setLoading(false);
    }
  };
  const handleVetNameInput = value => {
    if (value.length === 0) {
      setVetNameErrorMsg('Campo obligatorio');
      setVetName('');
      return true;
    }
    setVetName(value);
    setVetNameErrorMsg('');
    return false;
  };
  const handleVetSurnameInput = value => {
    if (value.length === 0) {
      setVetSurnameErrorMsg('Campo obligatorio');
      setVetSurname('');
      return true;
    }
    setVetSurname(value);
    setVetSurnameErrorMsg('');
    return false;
  };
  const handleVetMailInput = value => {
    const reg =
      /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

    if (value.length === 0) {
      setVetMailErrorMsg('Campo obligatorio');
      setVetMail('');
      return true;
    }
    if (!reg.test(value)) {
      setVetMailErrorMsg('No es un correo válido.');
      setVetMail(value);
      return true;
    }
    setVetMail(value);
    setVetMailErrorMsg('');
    return false;
  };
  const handleVetPhoneInput = value => {
    if (value.length === 0) {
      setVetPhoneErrorMsg('Campo obligatorio');
      setVetPhone('');
      return true;
    }
    setVetPhone(value);
    setVetPhoneErrorMsg('');
    return false;
  };
  const handleVetLicenceInput = value => {
    if (value.length === 0) {
      setVetLicenceErrorMsg('Campo obligatorio');
      setVetLicence('');
      return true;
    }
    setVetLicence(value);
    setVetLicenceErrorMsg('');
    return false;
  };
  const handleVetPasswordInput = value => {
    if (value.length === 0) {
      setVetPasswordErrorMsg('Campo obligatorio');
      setVetPassword('');
      return true;
    }
    setVetPassword(value);
    setVetPasswordErrorMsg('');
    return false;
  };
  const renderVetInput = () => {
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.inputContainer}>
        <TextInputComponent
          value={vetName}
          onChangeText={handleVetNameInput}
          icon={'person'}
          placeholder={'Escriba su nombre'}
          label={'Nombre'}
          error={vetNameErrorMsg.length > 0}
          errorMsg={vetNameErrorMsg}
          customContainer={{height: 40}}
        />
        <TextInputComponent
          value={vetSurname}
          onChangeText={handleVetSurnameInput}
          label={'Apellido'}
          icon={'person'}
          placeholder={'Escriba su apellido'}
          error={vetSurnameErrorMsg.length > 0}
          errorMsg={vetSurnameErrorMsg}
          customContainer={{height: 40}}
        />
        <TextInputComponent
          value={vetMail.toLowerCase()}
          onChangeText={handleVetMailInput}
          label={'Mail'}
          icon={'mail'}
          placeholder={'Escriba su mail'}
          error={vetMailErrorMsg.length > 0}
          errorMsg={vetMailErrorMsg}
          customContainer={{height: 40}}
        />
        <TextInputComponent
          value={vetPhone}
          onChangeText={handleVetPhoneInput}
          label={'Teléfono'}
          icon={'call'}
          placeholder={'Escriba su telefono'}
          error={vetPhoneErrorMsg.length > 0}
          errorMsg={vetPhoneErrorMsg}
          maxLength={10}
          keyboardType={'numeric'}
          customContainer={{height: 40}}
        />
        <TextInputComponent
          value={vetLicence}
          onChangeText={handleVetLicenceInput}
          label={'Matricula'}
          placeholder={'Escriba su matricula'}
          icon={'person'}
          error={vetLicenceErrorMsg.length > 0}
          errorMsg={vetLicenceErrorMsg}
          customContainer={{height: 40}}
        />
        <TextInputComponent
          value={vetPassword}
          onChangeText={handleVetPasswordInput}
          label={'Contraseña'}
          icon={'lock-closed'}
          placeholder={'Escriba su contraseña'}
          secureTextEntry
          error={vetPasswordErrorMsg.length > 0}
          errorMsg={vetPasswordErrorMsg}
          customContainer={{height: 40}}
        />
      </ScrollView>
    );
  };
  const renderPetInput = () => {
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.inputContainer}>
        <TextInputComponent
          label={'Nombre'}
          placeholder={'Escriba su nombre'}
          icon={'person'}
          value={ownerName}
          onChangeText={handleOwnerNameInput}
          customContainer={{height: 40}}
          error={ownerNameErrorMsg.length > 0}
          errorMsg={ownerNameErrorMsg}
        />
        <TextInputComponent
          label={'Apellido'}
          placeholder={'Escriba su apellido'}
          icon={'person'}
          value={ownerSurname}
          onChangeText={handleOwnerSurnameInput}
          customContainer={{height: 40}}
          error={ownerSurnameErrorMsg.length > 0}
          errorMsg={ownerSurnameErrorMsg}
        />
        <TextInputComponent
          label={'Mail'}
          placeholder={'Escriba su mail'}
          icon={'person'}
          value={ownerMail.toLowerCase()}
          onChangeText={handleOwnerMailInput}
          customContainer={{height: 40}}
          error={ownerMailErrorMsg.length > 0}
          errorMsg={ownerMailErrorMsg}
        />

        <TextInputComponent
          label={'Contraseña'}
          placeholder={'Escriba su contraseña'}
          icon={'lock-closed'}
          secureTextEntry
          value={ownerPassword}
          onChangeText={handleOwnerPasswordInput}
          customContainer={{height: 40}}
          error={ownerPasswordErrorMsg.length > 0}
          errorMsg={ownerPasswordErrorMsg}
        />

        <TextInputComponent
          label={'Teléfono'}
          placeholder={'Escriba su teléfono'}
          icon={'call'}
          value={ownerPhone}
          onChangeText={handleOwnerPhoneInput}
          maxLength={10}
          customContainer={{height: 40}}
          keyboardType={'numeric'}
          error={ownerPhoneErrorMsg.length > 0}
          errorMsg={ownerPhoneErrorMsg}
        />
        <TextInputComponent
          label={'Nombre de su mascota'}
          placeholder={'Escriba el nombre de su mascota'}
          icon={'paw'}
          value={petName}
          onChangeText={handlePetNameInput}
          customContainer={{height: 40}}
          error={petNameErrorMsg.length > 0}
          errorMsg={petNameErrorMsg}
        />
        <TextComponent
          textStyles={{
            color: Colors.neutral.gray900,
            fontSize: 14,
            fontFamily: 'Ubuntu-Bold',
          }}>
          Fecha de Nacimiento
        </TextComponent>
        <View
          style={{
            flexDirection: 'row',
          }}>
          <TextInputComponent
            value={day}
            onChangeText={handleDayInput}
            label={'Día'}
            placeholder="Ej:10"
            customContainer={{width: '30%', height: 40}}
            maxLength={2}
            onBlur={handleOnBlurDayInput}
            error={!!dayErrorMsg}
            keyboardType={'numeric'}
          />
          <View style={{width: 15}} />
          <TextInputComponent
            value={month}
            onChangeText={handleMonthInput}
            label={'Mes'}
            placeholder="Ej:10"
            customContainer={{width: '30%', height: 40}}
            maxLength={2}
            onBlur={handleOnBlurMonthInput}
            error={!!monthErrorMsg}
            keyboardType={'numeric'}
          />
          <View style={{width: 15}} />
          <TextInputComponent
            value={year}
            onChangeText={handleYearInput}
            label={'Año'}
            placeholder="Ej:2022"
            customContainer={{width: '30%', height: 40}}
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
              position: 'absolute',
              bottom: -2,
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
      </ScrollView>
    );
  };

  return (
    <SafeAreaView
      style={[
        StyleSheet.absoluteFillObject,
        {backgroundColor: Colors.secondary},
      ]}>
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={height * 0.1}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} style={{flex: 1}}>
          <LinearGradient
            colors={['#6b1c88', '#B43EC6']}
            style={styles.squareGradient}>
            <HeaderComponent title="Vet App" />
            <View style={{flex: 1, justifyContent: 'center'}}>
              <View
                style={{
                  backgroundColor: Colors.white,
                  borderRadius: 10,
                  marginHorizontal: 20,
                  height: vet ? height * 0.7 : height * 0.8,
                }}>
                <View style={{justifyContent: 'center', alignItems: 'center'}}>
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
                    color: Colors.neutral.gray900,
                    fontSize: 16,
                    marginTop: 40,
                  }}>
                  Ingresa tus datos
                </TextComponent>

                {vet ? renderVetInput() : renderPetInput()}

                <View
                  style={{
                    paddingHorizontal: 30,
                    marginBottom: 20,
                  }}>
                  <ButtonComponent
                    onPress={completeRegister}
                    buttonLabel="Continuar"
                    disabled={
                      vet
                        ? vetName === '' ||
                          vetPassword === '' ||
                          vetLicence === '' ||
                          vetMail === '' ||
                          vetSurname === '' ||
                          vetPhone === ''
                        : ownerName === '' ||
                          ownerSurname === '' ||
                          ownerMail === '' ||
                          ownerPassword === '' ||
                          ownerPhone === '' ||
                          petName === '' ||
                          yearErrorMsg !== '' ||
                          monthErrorMsg !== '' ||
                          dayErrorMsg !== '' ||
                          year === '' ||
                          month === '' ||
                          day === ''
                    }
                  />
                </View>
              </View>
            </View>
          </LinearGradient>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputContainer: {
    paddingHorizontal: 30,
    paddingTop: 30,
  },
  squareGradient: {
    flex: 1,
    backgroundColor: Colors.secondary,
  },
  logo: {
    width: 60,
    height: 60,
    borderRadius: 30,
    position: 'absolute',
    zIndex: 1,
  },
  dogFace: {
    width: 65,
    height: 65,
    zIndex: 1,
    position: 'absolute',
  },
});
export default RegisterStep2;
