import {StyleSheet} from 'react-native';
import Colors from '../../constans/Colors';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  inputsContainer: {
    flex: 0.5,
    justifyContent: 'center',
    marginHorizontal: 20,
  },
  buttonsContainer: {
    flex: 0.3,
    justifyContent: 'flex-end',
    overflow: 'hidden',
    marginHorizontal: 45,
  },
  signUpContainer: {marginTop: 15},
  logoContainer: {
    flexDirection: 'row',
    flex: 0.2,
    alignItems: 'center',
    backgroundColor: Colors.secondary,
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginLeft: 20,
  },
  titleContainer: {
    width: '50%',
  },
  title: {
    fontWeight: '600',
    color: Colors.white,
    fontSize: 40,
    textAlign: 'center',
  },
});
