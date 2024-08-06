import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator, Pressable } from "react-native";
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
import { FISH_STRUCTURES, SpacingMedium, grey_dark_color, primary_color } from "../global/global-constants";
import { environment } from "../global/environment";
import { Ionicons, Octicons } from "@expo/vector-icons";
import FilterModal from './FilterModal';


const ConditionsResults = ({ route }) => {
  const [loading, setLoading] = useState(false)
  const [expandedFish, setExpandedFish] = useState([]);
  const [conditions, setConditions] = useState(null);
  const [originalConditions, setOriginalConditions] = useState(null);
  const [lureOptionsId, setLureOptionsId] = useState(route.params.lureOptionsId);
  const [modalVisible, setModalVisible] = useState(false);
  const [filterModalVisible, setFilterModalVisible] = useState(false);



  useEffect(() => {
    fetchConditionsForLure();
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
    setConditions(res);
    setOriginalConditions({...res});
  };

  const applyFilters = (filters) => {
    const filteredConditions = {};

    if (filters.length === 0) {
      setConditions(originalConditions);
      setFilterModalVisible(false);
    }
    else {
      Object.keys(conditions).forEach(fishSpecies => {
        const filteredResults = conditions[fishSpecies].filter(condition => {
          const matchWaterCondition = filters.waterCondition.length === 0 || filters.waterCondition.includes(condition.water_clarity);
          const matchWeatherCondition = filters.weatherCondition.length === 0 || filters.weatherCondition.includes(condition.weather);
          const matchTimeCondition = filters.timeCondition.length === 0 || filters.timeCondition.includes(condition.time);
          const matchFishingStructure = filters.fishingStructure.length === 0 || filters.fishingStructure.some(struct => condition.structure.includes(struct));
          const matchDepth = filters.depth.length === 0 || filters.depth.includes(condition.depth > 10 ? 'Deep' : 'Shallow');
  
          return matchWaterCondition && matchWeatherCondition && matchTimeCondition && matchFishingStructure && matchDepth;
        });
  
        if (filteredResults.length > 0) {
          filteredConditions[fishSpecies] = filteredResults;
        }
      });
  
      setConditions(filteredConditions);
      setFilterModalVisible(false);
    }
  };

  const Card = ({ children }) => (
    <View style={styles.card}>
      {children}
    </View>
  );
  
  
  return (
    <View style={[flex_style.absoluteContainerFull, padding_styles.space_md, padding_styles.safetyTop]}>
       {(!loading && (!conditions || Object.keys(conditions).length === 0)) && (
      <View style={[flex_style.flex, flex_style.column]}>
        <Text style={[text_style.bold, text_style.alignCenter, text_style.fontColorRed]}>
          {loadTranslations('noResultsMatchFilters')}
          </Text>
          <TouchableOpacity style={[btn_style.button, btn_style.round, styles.speciesButton]} onPress={() => applyFilters([])}>
            <Text style={[text_style.bold, text_style.fontColorWhite]}>
              {loadTranslations('reset')}
            </Text>
        </TouchableOpacity>
      </View>
    )}
      {(!!conditions && !loading) && Object.keys(conditions).map((fishSpecies, index) => (
        <View key={index} style={{ marginBottom: 10 }}>
          <View style={styles.buttonContainer}>
    <View style={styles.filterContainer}>
      <Pressable onPress={() => setFilterModalVisible(true)} style={styles.filterButton}>
        <Ionicons name="filter" size={26} color={grey_dark_color} />
        <Text style={styles.filterText}>{loadTranslations('filter')}</Text>
      </Pressable>
    </View>
    <TouchableOpacity style={[btn_style.button, btn_style.round, styles.speciesButton]} onPress={() => toggleFishExpansion(fishSpecies)}>
      <Text style={[text_style.bold, text_style.fontColorWhite]}>
        {loadTranslations(fishSpecies)}
      </Text>
    </TouchableOpacity>
          </View>
          {expandedFish.includes(fishSpecies) && (
            <FlatList
              ListHeaderComponent={<View style={[flex_style.flex, flex_style.center, flex_style.column, margin_styles.vertical_space_md]}>
                {reactIfView(expandedFish[0] == 'pike' || expandedFish[0] == 'walleye',
                  <Image style={[img_styles.rectangle_image_md]} source={{uri: "https://storage.googleapis.com/puggum-bucket/Screenshot%202024-04-20%20at%206.14.24%E2%80%AFPM%20(2).jpg"}}></Image>
                )}
                {reactIfView(expandedFish[0] == 'lakeTrout' || expandedFish[0] == 'rainbowTrout' || expandedFish[0] == 'brookTrout' || expandedFish[0] == 'brownTrout' || expandedFish[0] == 'atlanticSalmon',
                  <Image style={[img_styles.rectangle_image_md]} source={{uri: "https://storage.googleapis.com/puggum-bucket/lucas_guide.jpg"}}></Image>
                )}
                {reactIfView(expandedFish[0] == 'musky',
                  <Image style={[img_styles.rectangle_image_md]} source={{uri: "https://storage.googleapis.com/puggum-bucket/jaques_vadbonqeur.jpeg"}}></Image>
                )}
                <Text style={[text_style.xs, text_style.bold, { marginTop: 20 }]}>{loadTranslations("presentedBy")}</Text>
              </View>}
              data={conditions[fishSpecies]}
              renderItem={({ item }) => (
                <Card>
                <View style={[margin_styles.vertical_space_md]}>
                  {Object.keys(item).map((keyString, index) => (
                    <View key={index} style={[flex_style.flex, flex_style.center, margin_styles.vertical_space_xxs]}>                      
                      {reactIfView(keyString != "structure" && keyString != "water_column"  && keyString != "depth",
                      <View style={flex_style.flex}>
                      <Text style={[text_style.xs, text_style.bold]}>
                        {loadTranslations(keyString) + ": "}
                      </Text>
                      <Text style={[text_style.xs]}>
                        {loadTranslations(JSON.stringify(item[keyString]).substring(1, JSON.stringify(item[keyString]).length - 1))}
                      </Text>
                    </View>
                      )}
                      {reactIfView(keyString == "depth",
                      <View style={flex_style.flex}>
                      <Text style={[text_style.xs, text_style.bold]}>
                        {loadTranslations(keyString) + ": "}
                      </Text>
                      <Text style={[text_style.xs]}>
                        {item[keyString] + loadTranslations("feet")}
                      </Text>
                    </View>
                      )}
                      
                    {keyString == "water_column" ? (
                        <View style={[flex_style.flex, flex_style.center]}>
                          <Text style={[text_style.xs, text_style.bold]}>
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
                      ) : null}
                      
                      {keyString == "structure" ? (
                        <View style={[flex_style.flex, flex_style.column, flex_style.center]}>
                          <Text style={[text_style.xs, text_style.bold]}>
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
                    ) : null}
                  </View>
                  ))}
                </View>
                </Card>
              )}
              keyExtractor={(item, index) => index.toString()}
            />
          )}
        </View>
      ))}
      {conditions && (Object.keys(conditions).length === 0 && !loading) && <View style={[flex_style.flex, flex_style.center]}><Text style={[text_style.bold, text_style.alignCenter, text_style.fontColorRed]}>{loadTranslations("noInfoOnLure")}</Text></View>}
      {loading && <ActivityIndicator style={[margin_styles.bottom_lg]} size="large" color={primary_color} />}

          <FilterModal
          visible={filterModalVisible}
          onClose={() => setFilterModalVisible(false)}
          applyFilters={applyFilters}
          conditions={{
          waterCondition: ['Murky', 'Clear'],
          weatherCondition: ['Sunny', 'Cloudy'],
          timeCondition: ['Morning', 'Midday'],
          fishingStructure: ['Weed', 'Rock'],
          depth: ['Shallow', 'Deep']
  }}
/>

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
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  filterContainer: {
    padding: 10,
  },
  filterText: {
    fontSize: 15,
    fontWeight: "500",
    marginLeft: -4, 
    textAlign: 'center', 
  },
  speciesButton: {
    marginLeft: 10, 
    flex: 1, 
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
    elevation: 2, 
    shadowColor: '#000', 
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
  },
});

export default ConditionsResults;
