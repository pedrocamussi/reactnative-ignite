import React from 'react';
import { StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {useTheme} from 'styled-components';

import { Calendar } from '../../components/Calendar';
import { BackButton } from '../../components/BackButton';
import { Button } from '../../components/Button';

import ArrowSvg from '../../assets/arrow.svg';
import {
  Container,
  Header,
  Title,
  RentalPeriod,
  DateInfo,
  DateTitle,
  DateValue,
  Content,
  Footer
} from './styles';



export function Scheduling(){
    const navigation = useNavigation();

    function handleBack(){
        navigation.goBack();
      }

    function handleConfirmRental(){
      navigation.navigate('SchedulingDetails');
    }  
    const theme = useTheme();
    return(
    <Container>
        <Header>
            <StatusBar
                barStyle="light-content"
                translucent
                backgroundColor="transparent"
                />
            <BackButton 
            onPress={handleBack} 
            color={theme.colors.shape}
            
            />
            <Title>
                Escolha uma {'\n'}
                data de início e {'\n'}
                fim do aluguel
            </Title>
            <RentalPeriod>
                <DateInfo>
                    <DateTitle>DE</DateTitle>
                    <DateValue/>
                </DateInfo>
                <ArrowSvg/>
                <DateInfo>
                    <DateTitle>ATÉ</DateTitle>
                    <DateValue/>
                </DateInfo>
            </RentalPeriod>
        </Header>
        <Content>
            <Calendar/>

        </Content>
        <Footer>
            <Button
                title="Confirmar"
                onPress={handleConfirmRental}
            />
        </Footer>

    </Container>
    );
}