import React, { useState } from "react";
import { View, Text, ScrollView, Image, FlatList, StyleSheet } from "react-native";
import {
  btn_style,
  flex_style,
  padding_styles,
  text_style,
  img_styles,
} from "../global/global-styles";
import { primary_color, black } from "../global/global-constants";
import { loadTranslations } from "../global/localization";
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { useEffect } from "react";
import { environment } from "../global/environment";
import { responseDataHandler } from "../global/global-functions";
import { getAuthToken } from "../global/utils/auth.utils";


export default function LuresResults({ route }) {

  const moonPhaseLabels = {
    1: loadTranslations('lastMoonPhaseNewMoon'),
    2: loadTranslations('lastMoonPhaseFirstQuarter'),
    3: loadTranslations('lastMoonPhaseFullMoon'),
    4: loadTranslations('lastMoonPhaseLastQuarter')
  };

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lures, setLures] = useState(null)
  const [weather, setWeather] = useState(null)
  const [moon, setMoon] = useState(null)


    useEffect(()=>{
      console.log('rtest1')
      console.log(route)
      if(route.params) {
        fetchResultsForConditons()
      }
    },[])

    const fetchResultsForConditons = async () => {
      setLoading(true)
      const url = `${environment.host}api/lures?lat=${route.params.lat}&long=${route.params.long}&species=${route.params.species}&structure=${route.params.structure}&waterClarity=${route.params.waterClarity}&userLures=${route.params.userLures}`
      console.log('test2 :')
      console.log(url)
      const response = await fetch(
        url,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "x-app-auth": getAuthToken()
          },
        }

       
      );

  
      const res = await responseDataHandler(response);
      console.log("test 3")
      console.log(res?.lures.length)
      setLoading(false);
      setLures(res?.lures);
      if(res?.moonPhases) {
        setMoon({
          prevPhase: res?.moonPhases?.prevPhase,
          nextPhase: res?.moonPhases?.nextPhase
        });
      }
      if(res.previousWeather) {
        setWeather({
          precipitation: res?.previousWeather?.data?.precipitation,
          windGust: res?.previousWeather?.data?.windGust
        });
      }
    }


    const WeatherAndMoonPhase = ({ weather, moonPhase, waterCondition }) => (
      <View style={styles.weatherContainer}>
        <View style={styles.weatherItem}>
          <MaterialIcons name="dark-mode" size={22} color="black" />
          <Text style={{ marginLeft: 5 }}>
            {moonPhase.prevPhase.phase === 3 || moonPhase.prevPhase.phase === 1 ?
            loadTranslations('fishFullFromFeeding') : moonPhaseLabels[moonPhase.prevPhase.phase]}
          </Text>
        </View>
        <View style={styles.weatherItem}>
          <MaterialIcons name="water-drop" size={24} color="black" />
          <Text style={{ marginLeft: 5 }}>
            {weather.precipitation ? loadTranslations('rainedFishFed') : loadTranslations('noPrecipitationsFishHungry')}
          </Text>
        </View>
        <View style={styles.weatherItem}>
          <MaterialIcons name="air" size={24} color="black" />
          <Text style={{ marginLeft: 5 }}>
            {weather.windGust > 10 && waterCondition !== 'muddy' ? loadTranslations('windYesterdayWaterDirty')  : `${weather.windGust} mph`}
          </Text>
        </View>
        <View style={styles.weatherItem}>
          <MaterialIcons name="brightness-3" size={24} color="black" />
          <Text style={{ marginLeft: 5 }}>
            {moonPhase.nextPhase.daysUntilNext <= 2 && moonPhase.nextPhase.phase === 1 ? loadTranslations('nextMoonPhaseFishActive') :
             (moonPhase.nextPhase.phase === 2 || moonPhase.nextPhase.phase === 4) ? loadTranslations('nextMoonPhaseFishLessActive') : ''}
          </Text>
        </View>
      </View>
    );

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Image source={{ uri: item.image }} style={[img_styles.rectangle_image_s, { width: 100 }]} />
      <View style={styles.detailsContainer}>
        <Text style={{ fontWeight: 'bold' }}>{item.brand} - {item.model}</Text>
        <Text>{loadTranslations('type')}: {item.type}</Text>
        <Text>{loadTranslations('colors')}: {item.color1}/{item.color2}</Text>
        <Text>{loadTranslations('weight')}: {item.weight}oz</Text>
        <Text style={{ fontWeight: 'bold' }}>{loadTranslations('price')}: ${item.price}</Text>
      </View>
    </View>
  );

  const styles = StyleSheet.create({
    itemContainer: {
      flexDirection: 'row',
      padding: 25,
      alignItems: 'center',
      marginVertical: 7,          
      marginHorizontal: 10,   
      borderRadius: 20,        
      backgroundColor: 'rgba(247, 255, 247, 0.8)',
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.22,
      shadowRadius: 2.22,
      elevation: 3,
    },
    detailsContainer: {
      flex: 1,
      marginLeft: 3,
    },
    weatherContainer: {
      flexDirection: 'column',
      justifyContent: 'space-between',
      padding: 10,
      backgroundColor: 'rgba(253, 253, 253, 1)',
      borderRadius: 20,
      margin: 10,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.22,
      shadowRadius: 2.22,
      elevation: 3,
    },
    weatherItem: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 5
    }
  });

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <Image source={{ uri: "https://storage.googleapis.com/puggum-bucket/Screenshot%202024-04-20%20at%206.14.24%E2%80%AFPM%20(1).jpg" }} style={{ width: '100%', height: 330 }} />
      <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 15, marginTop: 9, marginBottom: 4, }}>
      {loadTranslations('luresRecommendedByLucas')}
    </Text>
    {weather && 
      <WeatherAndMoonPhase weather={weather} moonPhase={moon} />
    }
      <FlatList
        data={lures}
        renderItem={renderItem}
        keyExtractor={(item, index) => `lure-${index}`}
      />
    </View>
  );
}
