import React, {useEffect} from 'react';
import {Provider} from 'react-redux';

import {SafeAreaView, StatusBar, StyleSheet} from 'react-native';
import MainNavigator from './src/navigation/MainNavigator';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Colors from './src/constans/Colors';
import LoaderContext from './src/hooks/Loader';
import store from './src/redux/store';

const App = () => {
  useEffect(() => {
    Ionicons.loadFont().then();
  }, []);
  return (
    <Provider store={store}>
      <LoaderContext.Provider>
        <SafeAreaView style={{flex: 0, backgroundColor: '#6C1C88'}} />
        <StatusBar
          backgroundColor={Colors.secondary}
          barStyle="dark-content"
          translucent
        />
        <MainNavigator />
        <SafeAreaView style={{flex: 0, backgroundColor: '#B33EC5'}} />
      </LoaderContext.Provider>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
});

export default App;
