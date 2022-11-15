import {StyleSheet} from 'react-native';
import Colors from '../../constans/Colors';

const styles = StyleSheet.create({
  container: {
    borderWidth: 1.5,
    marginVertical: 15,
    borderColor: Colors.neutral.gray700,
    borderRadius: 25,
    height: 50,
    justifyContent: 'center',
    zIndex: -1,
  },
  errorContainer: {
    borderWidth: 1.5,
    marginVertical: 15,
    borderColor: Colors.red.darkRed,
    borderRadius: 25,
    height: 50,
    justifyContent: 'center',
    zIndex: -1,
  },
});

export default styles;
