import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, Image, StyleSheet, 
  FlatList, TouchableOpacity, Platform } from "react-native";
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
  width, 
  primary_color,
  tutorial_transparent,
  tutorial_styles
} from "../global/global-constants";
import Tooltip, { TooltipChildrenContext } from 'react-native-walkthrough-tooltip';
import { getNextTutorialForPage, updateTutorialAndGetNext } from "../global/utils/tutorial.utils";

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
    // fetchConditionsForLure();   
  }, []);

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
      `${environment.host}/api/conditions-for-lure?lureOptionsId=${lureOptionsId}`,
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
          {reactIfView(currentTutorial == 'Species' && index == 0, <Tooltip
            contentStyle={tutorial_styles.doubleLine}
            backgroundColor={tutorial_transparent}
            isVisible={currentTutorial == 'Species'}
            content={<Text style={[text_style.fontColorWhite]}>{loadTranslations("tutSpecies")}</Text>}
            placement="top"
            onClose={async () => {setCurrentTutorial(await updateTutorialAndGetNext('Species', NAV_CONDITIONS_RESULTS))}}
          >
            <TooltipChildrenContext.Consumer>
              {({ tooltipDuplicate }) => (
                reactIfView(!tooltipDuplicate,
                  <View style={[{height:Platform.OS === 'android' ? 50 : 0, width: width}]}></View>
                )
              )}
            </TooltipChildrenContext.Consumer>
          </Tooltip>
          )}
          <TouchableOpacity style={[btn_style.button, btn_style.round]} onPress={() => toggleFishExpansion(fishSpecies)}>
            <Text style={[text_style.bold, text_style.fontColorWhite]}>
              {loadTranslations(fishSpecies)}
            </Text>
          </TouchableOpacity>
          {expandedFish.includes(fishSpecies) && (
            <FlatList
              ListHeaderComponent={<View style={[flex_style.flex, flex_style.center, flex_style.column, margin_styles.vertical_space_md]}>
                {reactIfView(currentTutorial == 'ConditionsGuide' && index == 0, <Tooltip
                  contentStyle={tutorial_styles.doubleLine}
                  backgroundColor={tutorial_transparent}
                  isVisible={currentTutorial == 'ConditionsGuide'}
                  content={<Text style={[text_style.fontColorWhite]}>{loadTranslations("tutConditionsGuide")}</Text>}
                  placement="top"
                  onClose={async () => {setCurrentTutorial(await updateTutorialAndGetNext('ConditionsGuide', NAV_CONDITIONS_RESULTS))}}
                >
                  <TooltipChildrenContext.Consumer>
                    {({ tooltipDuplicate }) => (
                      reactIfView(!tooltipDuplicate,
                        <View style={[{height:Platform.OS === 'android' ? 50 : 0, width: width}]}></View>
                      )
                    )}
                  </TooltipChildrenContext.Consumer>
                </Tooltip>
                )}
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
                    {reactIfView(currentTutorial == 'TimeOfDay' && keyString == 'time' && index == 0, <Tooltip
                      contentStyle={tutorial_styles.doubleLine}
                      backgroundColor={tutorial_transparent}
                      isVisible={currentTutorial == 'TimeOfDay'}
                      content={<Text style={[text_style.fontColorWhite]}>{loadTranslations("tutTimeOfDay")}</Text>}
                      placement="top"
                      onClose={async () => {setCurrentTutorial(await updateTutorialAndGetNext('TimeOfDay', NAV_CONDITIONS_RESULTS))}}
                    >
                      <TooltipChildrenContext.Consumer>
                        {({ tooltipDuplicate }) => (
                          reactIfView(!tooltipDuplicate,
                            <View style={[{height:Platform.OS === 'android' ? 50 : 0, width: width}]}></View>
                          )
                        )}
                      </TooltipChildrenContext.Consumer>
                    </Tooltip>
                    )}

                    {reactIfView(currentTutorial == 'Season' && keyString == 'season' && index == 0, <Tooltip
                      contentStyle={tutorial_styles.doubleLine}
                      backgroundColor={tutorial_transparent}
                      isVisible={currentTutorial == 'Season'}
                      content={<Text style={[text_style.fontColorWhite]}>{loadTranslations("tutSeason")}</Text>}
                      placement="top"
                      onClose={async () => {setCurrentTutorial(await updateTutorialAndGetNext('Season', NAV_CONDITIONS_RESULTS))}}
                    >
                      <TooltipChildrenContext.Consumer>
                        {({ tooltipDuplicate }) => (
                          reactIfView(!tooltipDuplicate,
                            <View style={[{height:Platform.OS === 'android' ? 50 : 0, width: width}]}></View>
                          )
                        )}
                      </TooltipChildrenContext.Consumer>
                    </Tooltip>
                    )}

                    {reactIfView(currentTutorial == 'ConditionsClarity' && keyString == 'water_clarity' && index == 0, <Tooltip
                      contentStyle={tutorial_styles.doubleLine}
                      backgroundColor={tutorial_transparent}
                      isVisible={currentTutorial == 'ConditionsClarity'}
                      content={<Text style={[text_style.fontColorWhite]}>{loadTranslations("tutConditionsClarity")}</Text>}
                      placement="top"
                      onClose={async () => {setCurrentTutorial(await updateTutorialAndGetNext('ConditionsClarity', NAV_CONDITIONS_RESULTS))}}
                    >
                      <TooltipChildrenContext.Consumer>
                        {({ tooltipDuplicate }) => (
                          reactIfView(!tooltipDuplicate,
                            <View style={[{height:Platform.OS === 'android' ? 50 : 0, width: width}]}></View>
                          )
                        )}
                      </TooltipChildrenContext.Consumer>
                    </Tooltip>
                    )}

                    {reactIfView(currentTutorial == 'ConditionsWeather' && keyString == 'weather' && index == 0, <Tooltip
                      contentStyle={tutorial_styles.doubleLine}
                      backgroundColor={tutorial_transparent}
                      isVisible={currentTutorial == 'ConditionsWeather'}
                      content={<Text style={[text_style.fontColorWhite]}>{loadTranslations("tutConditionsWeather")}</Text>}
                      placement="top"
                      onClose={async () => {setCurrentTutorial(await updateTutorialAndGetNext('ConditionsWeather', NAV_CONDITIONS_RESULTS))}}
                    >
                      <TooltipChildrenContext.Consumer>
                        {({ tooltipDuplicate }) => (
                          reactIfView(!tooltipDuplicate,
                            <View style={[{height:Platform.OS === 'android' ? 50 : 0, width: width}]}></View>
                          )
                        )}
                      </TooltipChildrenContext.Consumer>
                    </Tooltip>
                    )}

                    {reactIfView(currentTutorial == 'BarometricPressure' && keyString == 'barometric_pressure' && index == 0, <Tooltip
                      contentStyle={tutorial_styles.doubleLine}
                      backgroundColor={tutorial_transparent}
                      isVisible={currentTutorial == 'BarometricPressure'}
                      content={<Text style={[text_style.fontColorWhite]}>{loadTranslations("tutBaroPressure")}</Text>}
                      placement="top"
                      onClose={async () => {setCurrentTutorial(await updateTutorialAndGetNext('BarometricPressure', NAV_CONDITIONS_RESULTS))}}
                    >
                      <TooltipChildrenContext.Consumer>
                        {({ tooltipDuplicate }) => (
                          reactIfView(!tooltipDuplicate,
                            <View style={[{height:Platform.OS === 'android' ? 50 : 0, width: width}]}></View>
                          )
                        )}
                      </TooltipChildrenContext.Consumer>
                    </Tooltip>
                    )}

                    {reactIfView(currentTutorial == 'Rain' && keyString == 'precipitation' && index == 0, <Tooltip
                      contentStyle={tutorial_styles.doubleLine}
                      backgroundColor={tutorial_transparent}
                      isVisible={currentTutorial == 'Rain'}
                      content={<Text style={[text_style.fontColorWhite]}>{loadTranslations("tutRain")}</Text>}
                      placement="top"
                      onClose={async () => {setCurrentTutorial(await updateTutorialAndGetNext('Rain', NAV_CONDITIONS_RESULTS))}}
                    >
                      <TooltipChildrenContext.Consumer>
                        {({ tooltipDuplicate }) => (
                          reactIfView(!tooltipDuplicate,
                            <View style={[{height:Platform.OS === 'android' ? 50 : 0, width: width}]}></View>
                          )
                        )}
                      </TooltipChildrenContext.Consumer>
                    </Tooltip>
                    )}

                    {reactIfView(currentTutorial == 'SpeedOfRetrieval' && keyString == 'speed' && index == 0, <Tooltip
                      contentStyle={tutorial_styles.doubleLine}
                      backgroundColor={tutorial_transparent}
                      isVisible={currentTutorial == 'SpeedOfRetrieval'}
                      content={<Text style={[text_style.fontColorWhite]}>{loadTranslations("tutRetrievalSpeed")}</Text>}
                      placement="top"
                      onClose={async () => {setCurrentTutorial(await updateTutorialAndGetNext('SpeedOfRetrieval', NAV_CONDITIONS_RESULTS))}}
                    >
                      <TooltipChildrenContext.Consumer>
                        {({ tooltipDuplicate }) => (
                          reactIfView(!tooltipDuplicate,
                            <View style={[{height:Platform.OS === 'android' ? 50 : 0, width: width}]}></View>
                          )
                        )}
                      </TooltipChildrenContext.Consumer>
                    </Tooltip>
                    )}

                    {reactIfView(currentTutorial == 'Depth' && keyString == 'depth' && index == 0, <Tooltip
                      contentStyle={tutorial_styles.doubleLine}
                      backgroundColor={tutorial_transparent}
                      isVisible={currentTutorial == 'Depth'}
                      content={<Text style={[text_style.fontColorWhite]}>{loadTranslations("tutDepth")}</Text>}
                      placement="top"
                      onClose={async () => {setCurrentTutorial(await updateTutorialAndGetNext('Depth', NAV_CONDITIONS_RESULTS))}}
                    >
                      <TooltipChildrenContext.Consumer>
                        {({ tooltipDuplicate }) => (
                          reactIfView(!tooltipDuplicate,
                            <View style={[{height:Platform.OS === 'android' ? 50 : 0, width: width}]}></View>
                          )
                        )}
                      </TooltipChildrenContext.Consumer>
                    </Tooltip>
                    )}

                    {reactIfView(currentTutorial == 'WaterColumn' && keyString == 'water_column' && index == 0, <Tooltip
                      contentStyle={tutorial_styles.doubleLine}
                      backgroundColor={tutorial_transparent}
                      isVisible={currentTutorial == 'WaterColumn'}
                      content={<Text style={[text_style.fontColorWhite]}>{loadTranslations("tutWaterColumn")}</Text>}
                      placement="top"
                      onClose={async () => {setCurrentTutorial(await updateTutorialAndGetNext('WaterColumn', NAV_CONDITIONS_RESULTS))}}
                    >
                      <TooltipChildrenContext.Consumer>
                        {({ tooltipDuplicate }) => (
                          reactIfView(!tooltipDuplicate,
                            <View style={[{height:Platform.OS === 'android' ? 50 : 0, width: width}]}></View>
                          )
                        )}
                      </TooltipChildrenContext.Consumer>
                    </Tooltip>
                    )}

                    {reactIfView(currentTutorial == 'Structures' && keyString == 'structure' && index == 0, <Tooltip
                      contentStyle={tutorial_styles.weatherAndMoonLine}
                      backgroundColor={tutorial_transparent}
                      isVisible={currentTutorial == 'Structures'}
                      content={<Text style={[text_style.fontColorWhite]}>{loadTranslations("tutStructures")}</Text>}
                      placement="top"
                      onClose={async () => {setCurrentTutorial(await updateTutorialAndGetNext('Structures', NAV_CONDITIONS_RESULTS))}}
                    >
                      <TooltipChildrenContext.Consumer>
                        {({ tooltipDuplicate }) => (
                          reactIfView(!tooltipDuplicate,
                            <View style={[{height:Platform.OS === 'android' ? 50 : 0, width: width}]}></View>
                          )
                        )}
                      </TooltipChildrenContext.Consumer>
                    </Tooltip>
                    )}

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
