import * as React from 'react';
import {
  GestureResponderEvent,
  Modal,
  StyleSheet,
  View,
  ViewStyle,
  KeyboardAvoidingView,
  TouchableOpacity,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Colors from '../../constans/Colors';

const ModalComponent = ({
  show,
  dismiss,
  dismissStyle,
  dismissIconStyle,
  children,
  customContainer,
  hasDismissButon,
  animationType = 'slide',
}) => {
  return (
    <Modal animationType={animationType} transparent={true} visible={show}>
      <KeyboardAvoidingView
        keyboardVerticalOffset={0.3}
        behavior={'padding'}
        style={{flex: 1}}>
        <View style={styles.backdrop}>
          <View style={[styles.container, customContainer]}>
            {hasDismissButon && (
              <TouchableOpacity
                onPress={dismiss}
                style={[styles.dismiss, dismissStyle]}>
                <Ionicons
                  name={'close'}
                  size={24}
                  color={Colors.neutral.gray900}
                />
              </TouchableOpacity>
            )}
            {children}
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default ModalComponent;

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  container: {
    height: '30%',
    marginHorizontal: 35,
    borderTopWidth: 0.5,
    borderColor: 'transparent',
    backgroundColor: 'white',
    borderRadius: 8,
  },
  dismiss: {
    alignItems: 'flex-end',
  },
});
