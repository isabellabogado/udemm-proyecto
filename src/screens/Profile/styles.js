import {StyleSheet} from 'react-native';
import Colors from '../../constans/Colors';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  ovalShape: {
    height: 100,
    width: '99%',
    backgroundColor: Colors.purple,
    borderBottomEndRadius: 70,
    borderBottomLeftRadius: 70,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignSelf: 'center',
    marginTop: 1,
  },
  squareGradient: {
    height: 100,
    backgroundColor: Colors.secondary,
  },
  bigCard: {
    borderWidth: 2,
    borderColor: Colors.white,
    height: '90%',
    backgroundColor: Colors.white,
    marginHorizontal: 20,
    borderRadius: 20,
    marginTop: -50,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  infoContainer: {justifyContent: 'center', marginHorizontal: 20},
});
