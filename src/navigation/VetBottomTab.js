import React from 'react';
import {Image} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Screens from './Screens';
import Colors from '../constans/Colors';
import ClinicHistoryScreen from '../screens/Veterinarian/ClinicHistoryScreen';
import PetInfoScreen from '../screens/Veterinarian/PetInfoScreen';
import MakeNextAppointment from '../screens/Veterinarian/MakeNextAppointment';
import VaccineRecordScreen from '../screens/Veterinarian/VaccineRecordScreen';

const Tab = createBottomTabNavigator();
const vaccineIcon = require('../assets/injection.png');
const clinicHistory = require('../assets/clinic-history.png');

const getScreenOptions = ({route}) => ({
  tabBarIcon: ({focused, color, size}) => {
    let iconName;

    switch (route.name) {
      case Screens.PETINFOSCREEN:
        iconName = 'paw';
        break;
      case Screens.CLINICHISTORYSCREEN:
        return (
          <Image
            source={clinicHistory}
            style={{width: size, height: size, tintColor: color}}
          />
        );

      case Screens.VETAPPOINTMENTSCREEN:
        iconName = vaccineIcon;
        return (
          <Image
            source={vaccineIcon}
            style={{width: size, height: size, tintColor: color}}
          />
        );
      case Screens.VACCINEINFOSCREEN:
        iconName = 'calendar';
        break;
    }

    return <Ionicons name={iconName} size={size} color={color} />;
  },
  tabBarActiveTintColor: Colors.white,
  tabBarInactiveTintColor: Colors.secondary,

  tabBarStyle: {
    height: 75,
    backgroundColor: Colors.primary,
    position: 'absolute',
    left: 16,
    right: 16,
    borderRadius: 10,
    elevation: 0,
  },
});

export default VetBottomTaB = () => {
  return (
    <Tab.Navigator screenOptions={getScreenOptions}>
      <Tab.Screen
        name={Screens.PETINFOSCREEN}
        component={PetInfoScreen}
        options={{headerShown: false, tabBarShowLabel: false}}
      />
      <Tab.Screen
        name={Screens.CLINICHISTORYSCREEN}
        component={ClinicHistoryScreen}
        options={{headerShown: false, tabBarShowLabel: false}}
      />
      <Tab.Screen
        name={Screens.VETAPPOINTMENTSCREEN}
        component={VaccineRecordScreen}
        options={{headerShown: false, tabBarShowLabel: false}}
      />
      <Tab.Screen
        name={Screens.VACCINEINFOSCREEN}
        component={MakeNextAppointment}
        options={{headerShown: false, tabBarShowLabel: false}}
      />
    </Tab.Navigator>
  );
};
