import { StyleSheet, Text, View, TouchableOpacity, Touchable, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation, useRoute, useIsFocused } from '@react-navigation/core';
import { getStorage, getDownloadURL, ref as sRef } from "firebase/storage";
import rData from '../../json/thankYouGrace.json';
import AppLoading from 'expo-app-loading';
import { Svg } from 'expo';
import { getDatabase, ref, set, get, child, onValue, push } from "firebase/database";
import {
  useFonts,
  Nunito_200ExtraLight,
  Nunito_300Light,
  Nunito_400Regular,
  Nunito_500Medium,
  Nunito_600SemiBold,
  Nunito_700Bold,
  Nunito_800ExtraBold,
  Nunito_900Black,
  Nunito_200ExtraLight_Italic,
  Nunito_300Light_Italic,
  Nunito_400Regular_Italic,
  Nunito_500Medium_Italic,
  Nunito_600SemiBold_Italic,
  Nunito_700Bold_Italic,
  Nunito_800ExtraBold_Italic,
  Nunito_900Black_Italic,
} from '@expo-google-fonts/nunito';
import { async } from '@firebase/util';
import { render } from 'react-dom';
import LoadingAnimation from '../../components/LoadingAnimation';



const MultiplayerDisplayRes = () => {

  let [fontsLoaded] = useFonts({
    Nunito_200ExtraLight,
    Nunito_300Light,
    Nunito_400Regular,
    Nunito_500Medium,
    Nunito_600SemiBold,
    Nunito_700Bold,
    Nunito_800ExtraBold,
    Nunito_900Black,
    Nunito_200ExtraLight_Italic,
    Nunito_300Light_Italic,
    Nunito_400Regular_Italic,
    Nunito_500Medium_Italic,
    Nunito_600SemiBold_Italic,
    Nunito_700Bold_Italic,
    Nunito_800ExtraBold_Italic,
    Nunito_900Black_Italic,
  });

  const storage = getStorage();
  const route = useRoute();
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  let restaurantList = [];
  const [restaurantOne, setRestaurantOne] = useState("");
  const [restaurantTwo, setRestaurantTwo] = useState("");
  const [restaurantThree, setRestaurantThree] = useState("");
  var imagesRef1 = sRef(storage, 'images/' + restaurantOne + '.jpg');
  var imagesRef2 = sRef(storage, 'images/' + restaurantTwo + '.jpg');
  var imagesRef3 = sRef(storage, 'images/' + restaurantThree + '.jpg');
  const [show, setShow] = useState(false);
  var displayedRestaurants = [];
  const [realDisplayedRestaurants, setRealDisplayedRestaurants] = useState([]);
  const [imageUrl1, setImageUrl1] = useState(undefined);
  const [imageUrl2, setImageUrl2] = useState(undefined);
  const [imageUrl3, setImageUrl3] = useState(undefined);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const result = route.params;
  const roomID = route.params.roomID;
  const [imagesLoaded, setImagesLoaded] = useState(3);
  const back = () => {
    navigation.navigate("HomeScreen")
  }



  useEffect(() => {

    if (isFocused) {
      console.log("use effect triggered");
      setImagesLoaded(0);
      renderScreen();
    
    }
  }, [refreshTrigger]);

  const renderScreen = async () => {
    const db = getDatabase();


    
      for (let index = 0; index < rData.length; index++) {
        if (rData[index].SPEED === result.Q1 && rData[index].MOOD === result.Q2 && rData[index].WEATHER === result.Q3) {
          restaurantList.push(rData[index]);
        }
      }

    
    pickRestaurants();
    setImages();
  };

  const pickRestaurants = () => {

    displayedRestaurants = [];
    for (let index = 0; index < 3; index++) {
      var random = Math.floor(Math.random() * restaurantList.length);

      displayedRestaurants.push(restaurantList[random]);

      restaurantList.splice(random, 1);
    }
    setRestaurantOne(displayedRestaurants[0].RESTAURANT);
    setRestaurantTwo(displayedRestaurants[1].RESTAURANT);
    setRestaurantThree(displayedRestaurants[2].RESTAURANT);
    setRealDisplayedRestaurants(displayedRestaurants);
    imagesRef1 = sRef(storage, 'images/' + displayedRestaurants[0].RESTAURANT + '.jpg');
    imagesRef2 = sRef(storage, 'images/' + displayedRestaurants[1].RESTAURANT + '.jpg');
    imagesRef3 = sRef(storage, 'images/' + displayedRestaurants[2].RESTAURANT + '.jpg');
  }

  const setImages = () => {
    getDownloadURL(imagesRef1)
      .then((url) => {
        console.log(url)
        setImageUrl1(url);
      }).catch((error) => {
        console.log(error)
      });
    getDownloadURL(imagesRef2)
      .then((url) => {
        console.log(url)
        setImageUrl2(url);
      }).catch((error) => {
        console.log(error)
      });
    getDownloadURL(imagesRef3)
      .then((url) => {
        console.log(url)
        setImageUrl3(url);
      }).catch((error) => {
        console.log(error)
      });

  }




  
  
  const refreshScreen = () => {
    setRefreshTrigger(refreshTrigger + 1);
    setImagesLoaded(0);
    console.log("refresh screen triggered");
    // setShow(false);
    // setTimeout(() => setShow(true), 1000);
  }

  const navigateToRestaurant = (index) => {

    try {
      navigation.navigate("ResInfo", {
        name: realDisplayedRestaurants[index].RESTAURANT,
        fsr: realDisplayedRestaurants[index].FSR,
        address: realDisplayedRestaurants[index].ADDRESS,
        location: realDisplayedRestaurants[index].LOCATION,
        latitude: realDisplayedRestaurants[index].LATITUDE,
        longitude: realDisplayedRestaurants[index].LONGITUDE,
        type: realDisplayedRestaurants[index].TYPE,
        phone: realDisplayedRestaurants[index].PHONE,
        price: realDisplayedRestaurants[index].PRICE,
        popular: realDisplayedRestaurants[index].POPULAR,
        recommendation: realDisplayedRestaurants[index].RECOMMENDATION,
        monday: realDisplayedRestaurants[index].M,
        tuesday: realDisplayedRestaurants[index].T,
        wednesday: realDisplayedRestaurants[index].W,
        thursday: realDisplayedRestaurants[index].TH,
        friday: realDisplayedRestaurants[index].F,
        saturday: realDisplayedRestaurants[index].S,
        sunday: realDisplayedRestaurants[index].SU,
        tea: realDisplayedRestaurants[index].TEA,

      })

    } catch (error) {
      console.log(error);
    }

  }


  if (!fontsLoaded) {
    return <LoadingAnimation />
  } else {
    return (

      <View style={styles.background}>
        {imagesLoaded > 2 ? null :
          <LoadingAnimation />
        }
        
        <View style={styles.topSpacer}>
          {imagesLoaded > 2 ? <Text style={styles.pageLabel}>RESTAURANTS</Text> : null}
          
        </View>

        <TouchableOpacity
          onPress={() => navigateToRestaurant(0)}
          style={styles.leftButton}
        >
          <View style={styles.buttonImage}>
            <Image
              source={require('../../assets/restaurantFrame.png')}
              style={styles.pictureFrame}
            />
            <Image
              source={{ uri: imageUrl1 }}
              style={styles.leftImage}
              onLoad={() => setImagesLoaded(imagesLoaded + 1)}
            />
          </View>

          <Text style={styles.restaurantLabel}>{restaurantOne}</Text>
        </TouchableOpacity>


        <TouchableOpacity
          onPress={() => navigateToRestaurant(1)}
          style={styles.rightButton}
        >
          <View style={styles.buttonImage}>
            <Image
              source={require('../../assets/restaurantFrame.png')}
              style={styles.pictureFrame}
            />
            <Image
              source={{ uri: imageUrl2 }}
              style={styles.rightImage}
              onLoad={() => setImagesLoaded(imagesLoaded + 1)}
            />
          </View>

          <Text style={styles.restaurantLabel}>{restaurantTwo}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigateToRestaurant(2)}
          style={styles.leftButton}
        >
          <View style={styles.buttonImage}>
            <Image
              source={require('../../assets/restaurantFrame.png')}
              style={styles.pictureFrame}
            />
            <Image
              source={{ uri: imageUrl3 }}
              style={styles.leftImage}
              onLoad={() => setImagesLoaded(imagesLoaded + 1)}
            />
          </View>

          <Text style={styles.restaurantLabel}>{restaurantThree}</Text>

        </TouchableOpacity>

        

        <TouchableOpacity
          onPress={() => refreshScreen()}
          style={styles.refreshButton}>
          <Text style={styles.refreshButtonText}>SHOW ME NEW LIST</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={back}
        >
          <Text>Back</Text>
        </TouchableOpacity>

      </View>

    )
  }

}

export default MultiplayerDisplayRes

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#E5E5E5',
    height: '100%',
    flex: 1,
  },
  topSpacer: {
    marginTop: '25%',
    marginBottom: '15%'
  },
  pageLabel: {
    fontFamily: 'Nunito_600SemiBold',
    fontSize: 20,
    textAlign: 'center',
  },
  leftButton: {
    left: '10%',
    // borderRadius: 1000,
    // borderWidth: 1,
    height: '20%',
    aspectRatio: 1,
  },
  rightButton: {
    left: '50%',
    // borderRadius: 1000,
    height: '20%',
    aspectRatio: 1,
    // borderWidth: 1,
  },
  buttonImage: {
    justifyContent: 'center',
  },
  leftImage: {
    width: '80%',
    left: '11%',
    top: '7%',
    aspectRatio: 1,
    borderRadius: 1000,

  },
  rightImage: {
    width: '80%',
    left: '11%',
    top: '7%',
    aspectRatio: 1,
    borderRadius: 1000,


  },
  pictureFrame: {
    position: 'absolute',
    // left: '-5%',
    width: '102%',
    height: '128%',
    aspectRatio: 1,
    top: '-7%',
  },
  restaurantLabel: {
    fontFamily: 'Nunito_400Regular',
    fontSize: 15,
    top: '18%',
    alignSelf: 'center',

  },

  refreshButton: {
    marginTop: '10%',
  },

  refreshButtonText: {
    fontFamily: 'Nunito_500Medium',
    textDecorationLine: 'underline',
    alignSelf: 'center',
  }



})