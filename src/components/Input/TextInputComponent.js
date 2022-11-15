import {View, TextInput} from 'react-native';
import React from 'react';
import Colors from '../../constans/Colors';
import styles from './styles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import TextComponent from '../TextComponent';

const TextInputComponent = ({
  placeholder,
  value,
  onChangeText,
  keyboardType,
  icon,
  secureTextEntry,
  label,
  customContainer,
  numberOfLines,
  maxLength,
  error,
  errorMsg,
  onBlur = () => {},
}) => {
  return (
    <>
      <View>
        <View
          style={{
            backgroundColor: Colors.white,
            position: 'absolute',
            left: 20,
            top: 8,
          }}>
          <TextComponent
            textStyles={{
              color: Colors.neutral.gray900,
              fontSize: 14,
              fontFamily: 'Ubuntu-Bold',
            }}>
            {label}
          </TextComponent>
        </View>
      </View>
      <View
        style={[
          !error ? styles.container : styles.errorContainer,
          customContainer,
        ]}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View style={{marginHorizontal: 10}}>
            <Ionicons name={icon} size={16} color={Colors.neutral.gray900} />
          </View>

          <TextInput
            placeholder={placeholder}
            placeholderTextColor={Colors.neutral.gray200}
            value={value}
            onChangeText={onChangeText}
            keyboardType={keyboardType}
            secureTextEntry={secureTextEntry}
            numberOfLines={numberOfLines}
            maxLength={maxLength}
            style={{
              color: Colors.black,
              fontFamily: 'Ubuntu-regular',
              fontSize: 16,
              width: '90%',
              height: 30,
            }}
            onBlur={onBlur}
          />
        </View>
        {!!errorMsg && (
          <View
            style={{
              position: 'absolute',
              top: 40,
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
              {errorMsg}
            </TextComponent>
          </View>
        )}
      </View>
    </>
  );
};

export default TextInputComponent;
