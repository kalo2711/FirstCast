import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator } from "react-native";
import {
  btn_style,
  flex_style,
  text_style,
  padding_styles,
  margin_styles,
  img_styles,
} from "../global/global-styles";
import { getAuthToken } from "../global/utils/auth.utils";
import { reactIfView, responseDataHandler } from "../global/global-functions";
import { loadTranslations } from "../global/localization";
import { 
  FISH_STRUCTURES, 
  SpacingMedium, 
  NAV_CONDITIONS_RESULTS, 
  tutorial_styles
} from "../global/global-constants";
import { getNextTutorialForPage } from "../global/utils/tutorial.utils";
import TutorialTooltip from './TutorialTooltip';

const ConditionsResults = ({ route }) => {
  const { lureOptionsId } = route.params;
  const [loading, setLoading] = useState(false)
  const [expandedFish, setExpandedFish] = useState([]);
  const [conditions, setConditions] = useState(        {pike: [
    {
        "time": "midday",
        "season": "Spring",
        "water_clarity": "Muddy",
        "weather": "Sunny",
        "barometric_pressure": "Low",
        "precipitation": "Dry",
        "speed": "medium",
      "depth": 7,
    "water_column": [
        "middle"
      ],
      "structure": [
        "weed",
        "point",
        "channel"
    ],
    },
    {
      "time": "midday",
      "season": "Spring",
      "water_clarity": "Muddy",
      "weather": "Sunny",
      "barometric_pressure": "Low",
      "precipitation": "Dry",
      "speed": "medium",
      "depth": 7,
    "water_column": [
        "middle"
      ],
      "structure": [
        "weed",
        "point",
        "channel"
    ],
    },
    {
      "time": "midday",
      "season": "Spring",
      "water_clarity": "Muddy",
      "weather": "Sunny",
      "barometric_pressure": "Low",
      "precipitation": "Dry",
      "speed": "medium",
      "depth": 7,
    "water_column": [
        "middle"
      ],
      "structure": [
        "weed",
        "point",
        "channel"
    ],
  },
    
    {
        "time": "midday",
        "season": "Spring",
        "water_clarity": "Clear",
        "weather": "Sunny",
        "barometric_pressure": "Low",
        "precipitation": "Dry",
        "speed": "medium",
      "depth": 7,
    "water_column": [
        "middle"
      ],
      "structure": [
        "weed",
        "point",
        "channel"
    ],
    }],
walleye:  [
    {
        "time": "midday",
        "season": "Spring",
        "water_clarity": "Muddy",
        "weather": "Sunny",
        "barometric_pressure": "Low",
        "precipitation": "Dry",
        "speed": "medium",
    "depth": 7,
  "water_column": [
      "middle"
    ],
    "structure": [
      "weed",
      "point",
      "channel"
  ],
    },
    {
        "time": "midday",
        "season": "Spring",
        "water_clarity": "Clear",
        "weather": "Sunny",
        "barometric_pressure": "Low",
        "precipitation": "Dry",
        "speed": "medium",
      "depth": 7,
    "water_column": [
        "middle"
      ],
      "structure": [
        "weed",
        "point",
        "channel"
    ],
    }]
});
const [currentTutorial, setCurrentTutorial] = useState(null);
const [initialLoad, setInitialLoad] = useState(true);

  useEffect(() => {
    const getTut = async () => {
     const tut = await getNextTutorialForPage(NAV_CONDITIONS_RESULTS)
     setCurrentTutorial(tut)
    }
   if (initialLoad) {
     getTut();
     setInitialLoad(false)
    }
  }, []);

  const toggleFishExpansion = (fish) => {
    if (expandedFish.includes(fish)) {
      setExpandedFish(expandedFish.filter(item => item !== fish));
    } else {
      setExpandedFish([...expandedFish, fish]);
    }
  };
  
  const fetchConditionsForLure = async () => {
    setLoading(true)
    const response = await fetch(
      `${environment.host}api/conditions-for-lure?id=${lureOptionsId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-app-auth": getAuthToken()
        },
      }
    );

    const res = await responseDataHandler(response)
    
    setLoading(false)
    if (res) {
      setConditions(res);
    } else {
      console.error("Failed to fetch conditions:", data);
    }
  };


  return (
    <View style={[flex_style.absoluteContainerFull, padding_styles.space_md, padding_styles.safetyTop]}>
      {Object.keys(conditions).map((fishSpecies, index) => (
        <View key={index} style={{ marginBottom: 10 }}>
          <TouchableOpacity style={[btn_style.button, btn_style.round]} onPress={() => toggleFishExpansion(fishSpecies)}>
            <Text style={[text_style.bold, text_style.fontColorWhite]}>
              {loadTranslations(fishSpecies)}
            </Text>
          </TouchableOpacity>
          <TutorialTooltip conditions={currentTutorial == 'Species' && index == 0} style={tutorial_styles.doubleLine} 
            tutorial='Species' translations='tutSpecies' tutRoute={NAV_CONDITIONS_RESULTS}
            setCurrentTutorial={setCurrentTutorial} placement='bottom'/>
          {expandedFish.includes(fishSpecies) && (
            <FlatList
              ListHeaderComponent={<View style={[flex_style.flex, flex_style.center, flex_style.column, margin_styles.vertical_space_md]}>
                
git                 <TutorialTooltip conditions={currentTutorial == 'ConditionsGuide'} style={tutorial_styles.doubleLine} 
                  tutorial='ConditionsGuide' translations='tutConditionsGuide' tutRoute={NAV_CONDITIONS_RESULTS}
                  setCurrentTutorial={setCurrentTutorial} tooltipStyle={{marginTop: 10}}/>

                {reactIfView(expandedFish[0] == 'pike' || expandedFish[0] == 'walleye',
                  <Image style={[img_styles.rectangle_image_md]} source={{uri: "https://storage.googleapis.com/puggum-bucket/Screenshot%202024-04-20%20at%206.14.24%E2%80%AFPM%20(2).jpg"}}></Image>
                )}
                {reactIfView(expandedFish[0] == 'lakeTrout' || expandedFish[0] == 'rainbowtrout' || expandedFish[0] == 'brookTrout' || expandedFish[0] == 'brownTrout',
                  <Image style={[img_styles.rectangle_image_md]} source={{uri: "https://storage.googleapis.com/puggum-bucket/Screenshot%202024-04-20%20at%206.14.24%E2%80%AFPM%20(1).jpg"}}></Image>
                )}
                <Text style={[text_style.xs, text_style.bold]}>{loadTranslations("presentedBy")}</Text>
              </View>}
              data={conditions[fishSpecies]}
              // look here! add index and put tooltips 1 by 1
              renderItem={({ item, index }) => (
                <View style={[margin_styles.vertical_space_md]}>
                  {Object.keys(item).map((keyString, keyIndex) => (<>
                    <TutorialTooltip conditions={currentTutorial == 'TimeOfDay' && keyString == 'time' && index == 0} 
                      style={tutorial_styles.doubleLine} tutorial='TimeOfDay' translations='tutTimeOfDay'
                      tutRoute={NAV_CONDITIONS_RESULTS} setCurrentTutorial={setCurrentTutorial}/>

                    <TutorialTooltip conditions={currentTutorial == 'Season' && keyString == 'season' && index == 0} 
                      style={tutorial_styles.doubleLine} tutorial='Season' translations='tutSeason' 
                      tutRoute={NAV_CONDITIONS_RESULTS} setCurrentTutorial={setCurrentTutorial}/>

                    <TutorialTooltip conditions={currentTutorial == 'ConditionsClarity' && keyString == 'water_clarity' && index == 0} 
                      style={tutorial_styles.doubleLine} tutorial='ConditionsClarity' translations='tutConditionsClarity' 
                      tutRoute={NAV_CONDITIONS_RESULTS} setCurrentTutorial={setCurrentTutorial}/>

                    <TutorialTooltip conditions={currentTutorial == 'ConditionsWeather' && keyString == 'weather' && index == 0} 
                      style={tutorial_styles.doubleLine} tutorial='ConditionsWeather' translations='tutConditionsWeather' 
                      tutRoute={NAV_CONDITIONS_RESULTS} setCurrentTutorial={setCurrentTutorial}/>

                    <TutorialTooltip conditions={currentTutorial == 'BarometricPressure' && keyString == 'barometric_pressure' && index == 0} 
                      style={tutorial_styles.doubleLine} tutorial='BarometricPressure' translations='tutBaroPressure' 
                      tutRoute={NAV_CONDITIONS_RESULTS} setCurrentTutorial={setCurrentTutorial}/>

                    <TutorialTooltip conditions={currentTutorial == 'Rain' && keyString == 'precipitation' && index == 0} 
                      style={tutorial_styles.doubleLine} tutorial='Rain' translations='tutRain' 
                      tutRoute={NAV_CONDITIONS_RESULTS} setCurrentTutorial={setCurrentTutorial}/>

                    <TutorialTooltip conditions={currentTutorial == 'SpeedOfRetrieval' && keyString == 'speed' && index == 0} 
                      style={tutorial_styles.doubleLine} tutorial='SpeedOfRetrieval' translations='tutRetrievalSpeed' 
                      tutRoute={NAV_CONDITIONS_RESULTS} setCurrentTutorial={setCurrentTutorial}/>

                    <TutorialTooltip conditions={currentTutorial == 'Depth' && keyString == 'depth' && index == 0} 
                      style={tutorial_styles.doubleLine} tutorial='Depth' translations='tutDepth' 
                      tutRoute={NAV_CONDITIONS_RESULTS} setCurrentTutorial={setCurrentTutorial}/>

                    <TutorialTooltip conditions={currentTutorial == 'WaterColumn' && keyString == 'water_column' && index == 0} 
                      style={tutorial_styles.doubleLine} tutorial='WaterColumn' translations='tutWaterColumn' 
                      tutRoute={NAV_CONDITIONS_RESULTS} setCurrentTutorial={setCurrentTutorial}/>

                    <TutorialTooltip conditions={currentTutorial == 'Structures' && keyString == 'structure' && index == 0} 
                      style={tutorial_styles.multiLine} tutorial='Structures' translations='tutStructures' 
                      tutRoute={NAV_CONDITIONS_RESULTS} setCurrentTutorial={setCurrentTutorial}/>

                    <View key={keyIndex} style={[flex_style.flex, flex_style.center, margin_styles.vertical_space_xxs]}>
                      {reactIfView(keyString != "structure" && keyString != "water_column"  && keyString != "depth", <>
                      <Text style={[text_style.xs]}>
                        {loadTranslations(keyString) + ": "+ loadTranslations(JSON.stringify(item[keyString]).substring(1, JSON.stringify(item[keyString]).length -1))}
                      </Text></>
                      )}
                      {reactIfView(keyString == "depth",
                      <Text style={[text_style.xs]}>
                        {loadTranslations(keyString) + ": "+ item[keyString] + loadTranslations("feet")}
                      </Text>
                      )}
                      {keyString == "water_column" ? (<>
                        <View style={[flex_style.flex, flex_style.center]}>
                          <Text style={[text_style.xs]}>
                            {loadTranslations(keyString) + ": "}
                          </Text>
                          <View style={[flex_style.flex]}>
                            {item[keyString].map((value, idx) => (
                              <Text key={idx}>
                                {loadTranslations(value)}
                              </Text>
                            ))}
                          </View>
                        </View>
                      </>) : null}
                      
                      {keyString == "structure" ? (<>
                        <View style={[flex_style.flex, flex_style.column, flex_style.center]}>
                          <Text style={[text_style.xs]}>
                            {loadTranslations(keyString)}
                          </Text>
                          {item[keyString].map((value, idx) => (
                            <View style={[flex_style.flex, flex_style.column, flex_style.center]}>
                              <Text style={[text_style.xs, text_style.bold]} key={idx}>
                                {loadTranslations(value)}
                              </Text>
                              <Text>
                              </Text>
                              <Image style={[img_styles.rectangle_image_md, {marginBottom: SpacingMedium}]} source={FISH_STRUCTURES.filter(item => item.name == value)[0]?.image}></Image>
                            </View>
                          ))}
                        </View>
                      </>) : null}
                    </View>
                  </>))}
                </View>
              )}
              keyExtractor={(item, index) => index.toString()}
            />
          )}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    marginBottom: 20,
  },
  image: {
    width: 200,
    height: 200,
    alignSelf: "center",
  },
  infoContainer: {
    padding: 10,
  },
  infoText: {
    fontSize: 16,
    color: "#333",
    marginBottom: 10,
  },
});

export default ConditionsResults;
