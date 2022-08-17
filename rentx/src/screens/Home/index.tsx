import { useNavigation } from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import { StatusBar } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

import {api} from '../../services/api'; 
import {CarDTO} from '../../dtos/CarDTO';

import Logo from '../../assets/logo.svg';

import { Car } from '../../components/Car';

import {
  Container,
  HeaderContent,
  Header,
  TotalCars,
  CarList
} from './styles';

export function Home(){
  const [cars, setCars] = useState<CarDTO[]>([]);
  const [load, setLoad] = useState(true);
  const navigation = useNavigation();

  function handleCarDetails(car: CarDTO) {
    navigation.navigate('CarDetails', {car})
  }

  async function getCars(){
    const response = await api.get('/cars');
    console.log('hello');
  }

  useEffect(() => {
    async function fetchCars(){
      try {
        const response = await api.get('/cars');
        setCars(response.data);
        console.log('response.data');
      } catch (e) {
        console.log(e);
      }finally{
        setLoad(false);
      }
    }
    fetchCars();
  },[])

  return(
    <Container>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <Header>
        <HeaderContent>
          <Logo 
            width={RFValue(108)}
            height={RFValue(12)} 
          />
          <TotalCars>
            Total de 12 carros
          </TotalCars>
        </HeaderContent>
      </Header>
      <CarList
        data={cars}
        keyExtractor={item => String(item.id)}
        renderItem={({item}) => <Car data={item} onPress={() => handleCarDetails(item)}/>} 
      />
    </Container>
    );
}