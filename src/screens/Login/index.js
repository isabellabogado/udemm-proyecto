import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import Colors from '../../constans/Colors';
import {useSelector, useDispatch} from 'react-redux';

import TextComponent from '../../components/TextComponent';
import {useNavigation} from '@react-navigation/native';
import Screens from '../../navigation/Screens';
import LinearGradient from 'react-native-linear-gradient';
import BigCard from '../../components/BigCard/BigCard';
import TextInputComponent from '../../components/Input/TextInputComponent';
import ButtonComponent from '../../components/Button/ButtonComponent';
import {userLogin} from '../../services/apis';
import {useLoaderContext} from '../../hooks/Loader';
import {storeUser} from '../../redux/actions/user/userAction';

const {height} = Dimensions.get('screen');

const Home = () => {
  const isIOS = Platform.OS === 'ios';
  const {setLoading} = useLoaderContext();
  const {navigate} = useNavigation();

  const [mail, setMail] = useState('');
  const [password, setPassword] = useState('');
  const [mailErrorMsg, setMailErrorMsg] = useState('');
  const [passwordErrorMsg, setPasswordErrorMsg] = useState('');
  const dispatch = useDispatch();

  const loginHandler = async body => {
    console.log('hola');
    body = {
      mail: mail,
      pwd: password,
    };
    setLoading(true);
    userLogin(body)
      .then(response => {
        if (Object.keys(response.data).length === 0) {
          Alert.alert('Mail invalido');
          return;
        }

        const user = response.data.Item;
        if (user.isVet) dispatch(storeUser({vetUser: user}));
        else dispatch(storeUser({...user}));

        if (user.isVet) {
          navigate(Screens.VETPROFILE);
          return;
        }
        navigate(Screens.PETCLINICHISTORY, {
          screen: Screens.PETPROFILE,
        });
      })
      .catch(r => {
        console.log('error', r);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const renderLoginInput = () => {
    return (
      <View style={styles.inputContainer}>
        <TextInputComponent
          value={mail.toLowerCase()}
          onChangeText={handleMailInput}
          placeholder={'Ej: mariaperez@gmail.com'}
          icon={'mail'}
          label={'Mail'}
          error={mailErrorMsg.length > 0}
          errorMsg={mailErrorMsg}
          customContainer={{height: 40}}
        />

        <TextInputComponent
          value={password}
          onChangeText={handlePasswordInput}
          placeholder={'********'}
          icon={'lock-closed'}
          secureTextEntry
          label={'Contraseña'}
          error={passwordErrorMsg.length > 0}
          errorMsg={passwordErrorMsg}
          customContainer={{height: 40}}
        />
      </View>
    );
  };
  const handleMailInput = value => {
    const reg =
      /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

    if (value.length === 0) {
      setMailErrorMsg('El campo no puede estar vacío');
      setMail('');
      return true;
    }
    if (!reg.test(value)) {
      setMailErrorMsg('No es un correo válido.');
      setMail(value);
      return true;
    }
    setMail(value);
    setMailErrorMsg('');
    return false;
  };

  const handlePasswordInput = value => {
    if (value.length === 0) {
      setPasswordErrorMsg('Campo obligatorio');
      setPassword('');
      return true;
    }
    setPassword(value);
    setPasswordErrorMsg('');
    return false;
  };

  const renderWhiteCard = () => {
    return (
      <View
        style={{
          backgroundColor: Colors.white,
          borderRadius: 10,
          marginHorizontal: 20,
          height: height * 0.5,
        }}>
        <TextComponent
          textStyles={{
            textAlign: 'center',
            fontFamily: 'Ubuntu-Medium',
            color: Colors.purple,
            fontSize: 20,
            marginVertical: 40,
          }}>
          Ingresa a tu cuenta
        </TextComponent>

        {renderLoginInput()}
        <View style={{marginHorizontal: 20}}>
          <ButtonComponent
            onPress={loginHandler}
            customContainer={{
              marginVertical: 30,
            }}
            buttonLabel="Continuar"
            disabled={mail === '' || password === ''}
          />
        </View>
        {/* <TouchableOpacity>
          <TextComponent
            textStyles={{
              textAlign: 'center',
              fontFamily: 'Ubuntu-Bold',
              color: Colors.neutral.gray500,
              fontSize: 14,
            }}>
            Olvide mi contraseña
          </TextComponent>
        </TouchableOpacity> */}

        <View
          style={{
            flex: 1,
            justifyContent: 'flex-end',
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignSelf: 'center',
            }}>
            <TextComponent
              textStyles={{
                textAlign: 'center',
                fontFamily: 'Ubuntu-Medium',
                color: Colors.neutral.gray900,
                fontSize: 14,
                marginBottom: 20,
              }}>
              No tenes una cuenta?
            </TextComponent>
            <View style={{width: 10}} />
            <TouchableOpacity
              onPress={() => navigate(Screens.REGISTER)}
              style={{flexDirection: 'row'}}>
              <TextComponent
                textStyles={{
                  textAlign: 'center',
                  fontFamily: 'Ubuntu-Bold',
                  color: Colors.secondary,
                  fontSize: 14,
                }}>
                Registrate
              </TextComponent>
            </TouchableOpacity>
          </View>
        </View>
      </View>
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
            <ScrollView style={styles.container}>
              <TextComponent
                textStyles={{
                  textAlign: 'center',
                  color: Colors.white,
                  fontSize: 28,
                  fontFamily: 'OleoScript-Bold',
                }}>
                Vet App
              </TextComponent>
              <View style={{alignSelf: 'center', marginBottom: 50}}>
                <Image
                  style={styles.logo}
                  source={require('../../assets/main-logo.png')}
                  resizeMethod="resize"
                  resizeMode="cover"
                />
              </View>
              {renderWhiteCard()}
            </ScrollView>
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
    marginHorizontal: 20,
  },
  profileCardContainer: {
    marginHorizontal: 20,
  },
  squareGradient: {
    flex: 1,
    backgroundColor: Colors.secondary,
    paddingTop: 25,
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
});
export default Home;
