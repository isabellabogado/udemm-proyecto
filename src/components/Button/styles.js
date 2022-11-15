import {StyleSheet} from 'react-native';
import colors from '../../constans/colors';

export default StyleSheet.create({
  container: {
    backgroundColor: colors.buttonPrimaryColor,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
  containerSecondary: {
    backgroundColor: colors.buttonSecondaryColor,

    height: 30,
  },
  text: {
    fontSize: 20,
    color: colors.buttonPrimaryColorText,
  },
  textSecondary: {
    fontSize: 15,
    color: colors.buttonSecondaryColorText,
  },
});

// import { StyleSheet } from "react-native";
// import colors from "../../constans/colors";

// export default StyleSheet.create({

// });
