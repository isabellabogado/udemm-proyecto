import React from 'react';
import {TouchableOpacity, Text, View, Image, FlatList} from 'react-native';
import TextComponent from '../../components/TextComponent';
import Colors from '../../constans/Colors';
import styles from './styles';
import LinearGradient from 'react-native-linear-gradient';
import Card from '../../components/Card/Card';
import InfoComponent from '../../components/InfoComponent.js/InfoComponent';

data = [
  {title: 'Nombre', description: 'Justin'},
  {title: 'Raza', description: 'Coker americano'},
  {title: 'Dueño', description: 'Isabel'},
  {title: 'Peso', description: '12 kilos'},
  {title: 'Edad', description: '13 años'},
  {title: 'Sexo', description: ' Masculino'},
];
const Profile = () => {
  const renderData = ({item}) => {
    return <InfoComponent title={item.title} description={item.description} />;
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#6b1c88', '#B43EC6']}
        style={styles.squareGradient}>
        <TextComponent textStyles={{textAlign: 'center', color: Colors.white}}>
          Mi mascota
        </TextComponent>
      </LinearGradient>
      <View style={styles.bigCard}>
        <View style={styles.ovalShape}>
          <TextComponent
            styles={{marginTop: 10}}
            textStyles={{textAlign: 'center', color: Colors.white}}>
            Justin
          </TextComponent>
        </View>

        <View
          style={{
            alignSelf: 'center',
            alignItems: 'center',
            marginTop: -60,
          }}>
          <Image
            source={require('../../assets/justin.png')}
            style={{
              height: 120,
              width: 120,
              borderRadius: 60,
              borderWidth: 4,
              borderColor: Colors.white,
            }}
          />
        </View>
        <View style={styles.infoContainer}>
          <FlatList data={data} renderItem={renderData} />
        </View>
      </View>
    </View>
  );
};

export default Profile;
