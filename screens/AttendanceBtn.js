// import React from 'react';
import { StyleSheet, Dimensions, ScrollView } from 'react-native';
import { Block, theme } from 'galio-framework';
import Button from '../components/Button'
import * as React from 'react';
// import { Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
const { width } = Dimensions.get('screen');

function AttendanceButton({ screenName }) {
    const navigation = useNavigation();
    return (
        <Block flex row center>
            <Button round size="small"
              onPress={() => navigation.navigate(screenName)}
            >
              Click to Mark Attendance
            </Button>
        </Block>
    );
}

export default AttendanceButton;