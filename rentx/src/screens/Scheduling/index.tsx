import React, { useState } from 'react';
import { format } from 'date-fns';
import { Alert, StatusBar } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import {useTheme} from 'styled-components';

import { getPlataformDate } from '../../utils/getPlataformDate';
import { CarDTO } from '../../dtos/CarDTO';
import { Calendar, DayProps, generateInterval , MarkedDateProps} from '../../components/Calendar';
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



interface Params{
    car: CarDTO;
  }

interface RentalPeriod{
    startFormatted: string;
    endFormatted: string;
}


export function Scheduling(){
    
    const [lastSelectedDate, setLastSelectedDate] = useState<DayProps>({} as DayProps);
    const [markedDates, setMarkedDates] = useState<MarkedDateProps>({} as MarkedDateProps);
    const [rentalPeriod, setRentalPeriod] = useState <RentalPeriod>({} as RentalPeriod)

    const theme = useTheme();
    const route = useRoute();
    const {car} = route.params as Params;
    const navigation = useNavigation();

    function handleBack(){
        navigation.goBack();
      }

    function handleConfirmRental(){
        if(!rentalPeriod.startFormatted || !rentalPeriod.endFormatted ){
            Alert.alert('Selecione o intervalo para alugar.')
        }else {
            navigation.navigate('SchedulingDetails', {
                car,
                dates: Object.keys(markedDates)
            });
        }
      }  
    
    
    function handleChangeDates(date: DayProps){
        let start = !lastSelectedDate.timestamp ? date : lastSelectedDate;
        let end = date;

        if(start.timestamp > end.timestamp){
            start = end;
            end = start;
        }

        setLastSelectedDate(end);
        const interval = generateInterval(start, end);
        setMarkedDates(interval);

        const firstDate = Object.keys(interval)[0];
        const endDate = Object.keys(interval)[Object.keys(interval).length - 1];

        setRentalPeriod({
            startFormatted: format(getPlataformDate(new Date(firstDate)), 'dd/MM/yyyy'),
            endFormatted: format(getPlataformDate(new Date(endDate)), 'dd/MM/yyyy'),
        })
    }

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
                    <DateValue selected={!!rentalPeriod.startFormatted}>{rentalPeriod.startFormatted}</DateValue>
                </DateInfo>
                <ArrowSvg/>
                <DateInfo>
                    <DateTitle>ATÉ</DateTitle>
                    <DateValue selected={!!rentalPeriod.endFormatted}>{rentalPeriod.endFormatted}</DateValue>
                </DateInfo>
            </RentalPeriod>
        </Header>
        <Content>
            <Calendar
                markedDates={markedDates}
                onDayPress={handleChangeDates}
            />

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