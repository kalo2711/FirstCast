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
import { FISH_STRUCTURES, SpacingMedium, primary_color } from "../global/global-constants";
import { environment } from "../global/environment";

const ConditionsResults = ({ route }) => {
  const [loading, setLoading] = useState(false)
  const [expandedFish, setExpandedFish] = useState([]);
  const [conditions, setConditions] = useState(null);
  const [lureOptionsId, setLureOptionsId] = useState(route.params.lureOptionsId);

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
  };


  return (
    <View style={[flex_style.absoluteContainerFull, padding_styles.space_md, padding_styles.safetyTop]}>
      {(!!conditions && !loading) && Object.keys(conditions).map((fishSpecies, index) => (
        <View key={index} style={{ marginBottom: 10 }}>
          <TouchableOpacity style={[btn_style.button, btn_style.round]} onPress={() => toggleFishExpansion(fishSpecies)}>
            <Text style={[text_style.bold, text_style.fontColorWhite]}>
              {loadTranslations(fishSpecies)}
            </Text>
          </TouchableOpacity>
          {expandedFish.includes(fishSpecies) && (
            <FlatList
              ListHeaderComponent={<View style={[flex_style.flex, flex_style.center, flex_style.column, margin_styles.vertical_space_md]}>
                {reactIfView(expandedFish[0] == 'pike' || expandedFish[0] == 'walleye',
                  <Image style={[img_styles.rectangle_image_md]} source={{uri: "https://storage.googleapis.com/puggum-bucket/Screenshot%202024-04-20%20at%206.14.24%E2%80%AFPM%20(2).jpg"}}></Image>
                )}
                {reactIfView(expandedFish[0] == 'lakeTrout' || expandedFish[0] == 'rainbowTrout' || expandedFish[0] == 'brookTrout' || expandedFish[0] == 'brownTrout',
                  <Image style={[img_styles.rectangle_image_md]} source={{uri: "https://storage.googleapis.com/puggum-bucket/Screenshot%202024-04-20%20at%206.14.24%E2%80%AFPM%20(1).jpg"}}></Image>
                )}
                <Text style={[text_style.xs, text_style.bold]}>{loadTranslations("presentedBy")}</Text>
              </View>}
              data={conditions[fishSpecies]}
              renderItem={({ item }) => (
                <View style={[margin_styles.vertical_space_md]}>
                  {Object.keys(item).map((keyString, index) => (
                    <View key={index} style={[flex_style.flex, flex_style.center, margin_styles.vertical_space_xxs]}>                      
                      {reactIfView(keyString != "structure" && keyString != "water_column"  && keyString != "depth",
                      <Text style={[text_style.xs]}>
                        {loadTranslations(keyString) + ": "+ loadTranslations(JSON.stringify(item[keyString]).substring(1, JSON.stringify(item[keyString]).length -1))}
                      </Text>
                      )}
                      {reactIfView(keyString == "depth",
                      <Text style={[text_style.xs]}>
                        {loadTranslations(keyString) + ": "+ item[keyString] + loadTranslations("feet")}
                      </Text>
                      )}
                      
                    {keyString == "water_column" ? (
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
                      ) : null}
                      
                      {keyString == "structure" ? (
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
                    ) : null}
                  </View>
                  ))}
                </View>
              )}
              keyExtractor={(item, index) => index.toString()}
            />
          )}
        </View>
      ))}
      {conditions && (Object.keys(conditions).length === 0 && !loading) && <View style={[flex_style.flex, flex_style.center]}><Text style={[text_style.bold, text_style.alignCenter, text_style.fontColorRed]}>{loadTranslations("noInfoOnLure")}</Text></View>}
      {loading && <ActivityIndicator style={[margin_styles.bottom_lg]} size="large" color={primary_color} />}
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
