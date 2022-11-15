import React from 'react';
import {Image} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Screens from './Screens';
import Colors from '../constans/Colors';
import PetClinicHistory from '../screens/Pet/PetClinicHistory';
import PetVaccineRecord from '../screens/Pet/PetVaccineRecord';
// import PetNextAppointment from '../screens/Pet/PetNextAppointment';
import PetHomeScreen from '../screens/Pet/PetHomeScreen';
const vaccineIcon = require('../assets/vaccine.png');
const clinicHistory = require('../assets/medical-records.png');
const Tab = createBottomTabNavigator();

const getScreenOptions = ({route}) => ({
  tabBarIcon: ({focused, color, size}) => {
    let iconName;

    switch (route.name) {
      case Screens.PETPROFILE:
        iconName = 'paw';
        break;
      case Screens.PETCLINICHISTORY:
        return (
          <Image
            source={clinicHistory}
            style={{width: size, height: size, tintColor: color}}
          />
        );
      case Screens.PETVACCINERECORD:
        iconName = vaccineIcon;
        return (
          <Image
            source={vaccineIcon}
            style={{width: size, height: size, tintColor: color}}
          />
        );
      // case Screens.PETNEXTAPPOINTMENT:
      //   iconName = 'calendar';
      //   break;
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

export default BottomTabNavigator = () => {
  return (
    <Tab.Navigator screenOptions={getScreenOptions}>
      <Tab.Screen
        name={Screens.PETPROFILE}
        component={PetHomeScreen}
        options={{headerShown: false, tabBarShowLabel: false}}
      />
      <Tab.Screen
        name={Screens.PETCLINICHISTORY}
        component={PetClinicHistory}
        options={{headerShown: false, tabBarShowLabel: false}}
      />
      <Tab.Screen
        name={Screens.PETVACCINERECORD}
        component={PetVaccineRecord}
        options={{headerShown: false, tabBarShowLabel: false}}
      />
      {/* <Tab.Screen
        name={Screens.PETNEXTAPPOINTMENT}
        component={PetNextAppointment}
        options={{headerShown: false, tabBarShowLabel: false}}
      /> */}
    </Tab.Navigator>
  );
};
