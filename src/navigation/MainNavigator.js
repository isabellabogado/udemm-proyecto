import React from 'react';
import {View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {styles} from './styles';
import Screens from './Screens';
import Register from '../screens/Register/part1';
import RegisterStep2 from '../screens/Register/part2';
import TextComponent from '../components/TextComponent';
import {HeaderComponent} from '../components/Header/HeaderComponent';
import Login from '../screens/Login';
import Colors from '../constans/Colors';
import TakePictureScreen from '../screens/Register/photo';
import BottomTabNavigator from './BottomTabNavigator';
import VetHomeScreen from '../screens/Veterinarian/VetHomeScreen';
import AddPet from '../screens/Veterinarian/AddPet';
import VetBottomTab from './VetBottomTab';

const AppStack = createNativeStackNavigator();

const MainNavigator = ({}) => {
  return (
    <View style={styles.container}>
      <NavigationContainer>
        <AppStack.Navigator>
          <AppStack.Screen
            name={Screens.LOGIN}
            component={Login}
            options={{headerShown: false, title: ''}}
          />
          <AppStack.Screen
            name={Screens.REGISTER}
            component={Register}
            options={{
              headerShown: false,
              title: '',
            }}
          />
          <AppStack.Screen
            name={Screens.REGISTER_STEP2}
            component={RegisterStep2}
            options={{
              headerShown: false,
              title: '',
              headerLeft: () => <HeaderComponent />,
            }}
          />
          <AppStack.Screen
            name={Screens.TAKEPHOTOSCREEN}
            component={TakePictureScreen}
            options={{
              headerShown: false,
            }}
          />
          <AppStack.Screen
            name={Screens.PETCLINICHISTORY}
            component={BottomTabNavigator}
            options={{
              headerShown: false,
            }}
          />
          <AppStack.Screen
            name={Screens.VETPROFILE}
            component={VetHomeScreen}
            options={{
              headerShown: false,
            }}
          />
          <AppStack.Screen
            name={Screens.ADDPETSCREEN}
            component={AddPet}
            options={{
              headerShown: false,
            }}
          />
          <AppStack.Screen
            name={Screens.PETINFOSCREEN}
            component={VetBottomTab}
            options={{
              headerShown: false,
            }}
          />
        </AppStack.Navigator>
      </NavigationContainer>
    </View>
  );
};
export default MainNavigator;
