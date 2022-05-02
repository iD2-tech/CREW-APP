import { StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { useNavigation, useIsFocused, useRoute } from '@react-navigation/core'
import { getDatabase, ref, set, get, child, onValue, push } from "firebase/database";
import { useEffect } from 'react/cjs/react.development';
import { getAuth } from "firebase/auth";
import AppLoading from 'expo-app-loading';

const WaitingRoom = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const roomID = route.params;
    const [playerList, setPlayerList] = useState([]);

    useEffect(() => {
        try {
            const db = getDatabase();
            const usersRef = ref(db, 'lobby/' + roomID + '/users');
            onValue(usersRef, (snapshot) => {
                console.log(snapshot);
                
            })
            
        } catch (error) {
            console.log(error);
        }
    })


    const goBack = () => {
        navigation.goBack();
    }
    return (
        <View>
            <Text>WaitingRoom</Text>
            <TouchableOpacity
            onPress={goBack}
            style={{top: 500}}>
                <Text>BACK</Text>
            </TouchableOpacity>
            <Text style={{top: 500}}>{roomID}</Text>
        </View>
    )
}

export default WaitingRoom;