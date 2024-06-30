import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Linking
} from "react-native";
import {
  btn_style,
  flex_style,
  padding_styles,
  text_style,
  img_styles,
  margin_styles,
} from "../global/global-styles";
import {
  primary_color,
  black,
  NAV_LURES_RESULTS,
  tutorial_styles,
  ICON_SIZE_S,
  SpacingExtraSmall,
  height,
  SpacingLarge,
  SpacingFormXLarge,
} from "../global/global-constants";
import { loadTranslations } from "../global/localization";
import { MaterialIcons, FontAwesome5 } from "@expo/vector-icons";
import { environment } from "../global/environment";
import { reactIfView, responseDataHandler } from "../global/global-functions";
import { getAuthToken } from "../global/utils/auth.utils";
import { getNextTutorialForPage } from "../global/utils/tutorial.utils";
import TutorialTooltip from "./TutorialTooltip";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function LuresResults({ route }) {
  const moonPhaseLabels = {
    1: loadTranslations("lastMoonPhaseNewMoon"),
    2: loadTranslations("lastMoonPhaseFirstQuarter"),
    3: loadTranslations("lastMoonPhaseFullMoon"),
    4: loadTranslations("lastMoonPhaseLastQuarter"),
  };

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lures, setLures] = useState(null);
  const [weather, setWeather] = useState(null);
  const [moon, setMoon] = useState(null);
  const [currentTutorial, setCurrentTutorial] = useState(null);
  const [initialLoad, setInitialLoad] = useState(true);
  const [expertImage, setExpertImage] = useState("");
  const [caption, setCaption] = useState("");

  const expertConfig = {
    pike: {
      image:
        "https://storage.googleapis.com/puggum-bucket/Screenshot%202024-04-20%20at%206.14.24%E2%80%AFPM%20(2).jpg",
      caption: loadTranslations("luresRecommendedByHugo"),
    },
    walleye: {
      image:
        "https://storage.googleapis.com/puggum-bucket/Screenshot%202024-04-20%20at%206.14.24%E2%80%AFPM%20(2).jpg",
      caption: loadTranslations("luresRecommendedByHugo"),
    },
    lakeTrout: {
      image:
        "https://storage.googleapis.com/puggum-bucket/lucas_guide.jpg",
      caption: loadTranslations("luresRecommendedByLucas"),
    },
    rainbowTrout: {
      image:
        "https://storage.googleapis.com/puggum-bucket/lucas_guide.jpg",
      caption: loadTranslations("luresRecommendedByLucas"),
    },
    brookTrout: {
      image:
        "https://storage.googleapis.com/puggum-bucket/lucas_guide.jpg",
      caption: loadTranslations("luresRecommendedByLucas"),
    },
    brownTrout: {
      image:
        "https://storage.googleapis.com/puggum-bucket/lucas_guide.jpg",
      caption: loadTranslations("luresRecommendedByLucas"),
    },
    perch: {
      image:
        "https://storage.googleapis.com/puggum-bucket/Untitled%20(30).png",
      caption: loadTranslations("luresRecommendedByFirstCast"),
    },
    bass: {
      image:
        "https://storage.googleapis.com/puggum-bucket/Untitled%20(30).png",
      caption: loadTranslations("luresRecommendedByFirstCast"),
    },
    atlanticSalmon: {
      image:
      "https://storage.googleapis.com/puggum-bucket/lucas_guide.jpg",
      caption: loadTranslations("luresRecommendedByLucas"),
    },
    musky: {
      image: "https://storage.googleapis.com/puggum-bucket/jaques_vadbonqeur.jpeg",
      caption: loadTranslations("luresRecommendedByJaques")
    }
  };

  useEffect(() => {
    if (route.params.species) {
      const config = expertConfig[route.params.species];
      if (config) {
        setExpertImage(config.image);
        setCaption(config.caption);
      }
      fetchResultsForConditons()
    }
  }, [route.params.species]);

  const openURL = (url) => {
    Linking.canOpenURL(url)
      .then((supported) => {
        if (supported) {
          Linking.openURL(url);
        } else {
          console.log("Don't know how to open URI: " + url);
        }
      })
      .catch((err) => console.error('An error occurred', err));
  };

  useEffect(() => {
    const getTut = async () => {
      const tut = await getNextTutorialForPage(NAV_LURES_RESULTS);
      setCurrentTutorial(tut);
    };
    if (initialLoad) {
      getTut();
      setInitialLoad(false);
    }
  }, []);

  const fetchResultsForConditons = async () => {
    setLoading(true);
    const url = `${environment.host}api/lures?lat=${route.params.lat}&timestamp=${route.params.date}&long=${route.params.long}&species=${route.params.species}&structure=${route.params.structure}&waterClarity=${route.params.waterClarity}&userLures=${route.params.userLures}`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-app-auth": await getAuthToken(true),
      },
    });

    const res = await responseDataHandler(response);
    setLoading(false);
    setLures(res?.lures);
    if (res?.moonPhases) {
      setMoon({
        prevPhase: res?.moonPhases?.prevPhase,
        nextPhase: res?.moonPhases?.nextPhase,
      });
    }
    if (res.previousWeather) {
      setWeather({
        precipitation: res?.previousWeather?.data?.precipitation,
        windGust: res?.previousWeather?.data?.windGust,
      });
    }
  };

  const WeatherAndMoonPhase = ({ weather, moonPhase, waterCondition }) => (
    <View style={styles.weatherContainer}>
      <View style={styles.weatherItem}>
        <MaterialIcons name="dark-mode" size={ICON_SIZE_S} color="black" />
        {reactIfView(
          moonPhase.prevPhase.daysSinceLast === 0 &&
            moonPhase.nextPhase.daysUntilNext === 0, //day of
          <Text style={{ marginLeft: SpacingExtraSmall }}>
            {loadTranslations(`todayMoonPhase${moonPhase.prevPhase.phase}`)}
            {moonPhase.prevPhase.phase === 2 || moonPhase.prevPhase.phase === 4
              ? ` : ${loadTranslations("fishLessActive")}`
              : ""}
            {moonPhase.prevPhase.phase === 1 || moonPhase.prevPhase.phase === 3
              ? ` : ${loadTranslations("fishMoreActive")}`
              : ""}
            {loadTranslations("nextMoonPhase")}:{" "}
            {loadTranslations(`lastMoonPhase${moonPhase.nextPhase.phase}`)}{" "}
            {loadTranslations("in")} {moonPhase.nextPhase.daysUntilNext}{" "}
            {loadTranslations("days")}
          </Text>
        )}
        {reactIfView(
          moonPhase.prevPhase.daysSinceLast === 1, // day before
          <View>
            <Text style={{ marginLeft: SpacingExtraSmall }}>
              {loadTranslations("lastMoonPhase")}:{" "}
              {loadTranslations(`lastMoonPhase${moonPhase.prevPhase.phase}`)}{" "}
              {moonPhase.prevPhase.daysSinceLast} {loadTranslations("daysAgo")}
              {moonPhase.prevPhase.phase === 1 ||
              moonPhase.prevPhase.phase === 3
                ? ` : ${loadTranslations("fishFullFromFeedingMoon")}`
                : ""}
            </Text>
            <Text style={{ marginLeft: SpacingExtraSmall }}>
              {loadTranslations("nextMoonPhase")}:{" "}
              {loadTranslations(`lastMoonPhase${moonPhase.nextPhase.phase}`)} in{" "}
              {moonPhase.nextPhase.daysUntilNext} {loadTranslations("days")}
              {moonPhase.nextPhase.daysUntilNext <= 2 &&
              moonPhase.nextPhase.phase === 1
                ? ` : ${loadTranslations("fishMoreActive")}`
                : ""}
            </Text>
          </View>
        )}
        {reactIfView(
          moonPhase.prevPhase.daysSinceLast !== 1 &&
            moonPhase.prevPhase.daysSinceLast !== 0, //else
          <View>
            <Text style={{ marginLeft: SpacingExtraSmall }}>
              {loadTranslations("lastMoonPhase")}:{" "}
              {loadTranslations(`lastMoonPhase${moonPhase.prevPhase.phase}`)}{" "}
              {Math.abs(moonPhase.prevPhase.daysSinceLast)}{" "}
              {loadTranslations("daysAgo")}
              {moonPhase.prevPhase.phase === 1 ||
              moonPhase.prevPhase.phase === 3
                ? ` : ${loadTranslations("fishFullFromFeedingMoon")}`
                : ""}
            </Text>
            <Text style={{ marginLeft: SpacingExtraSmall }}>
              {loadTranslations("nextMoonPhase")}:{" "}
              {loadTranslations(`lastMoonPhase${moonPhase.nextPhase.phase}`)} in{" "}
              {moonPhase.nextPhase.daysUntilNext} {loadTranslations("days")}
              {moonPhase.nextPhase.daysUntilNext <= 2 &&
              moonPhase.nextPhase.phase === 1
                ? ` : ${loadTranslations("fishMoreActive")}`
                : ""}
            </Text>
          </View>
        )}
      </View>
      <View style={styles.weatherItem}>
        <MaterialIcons name="water-drop" size={ICON_SIZE_S} color="black" />
        <Text style={{ marginLeft: 5 }}>
          {weather.precipitation
            ? loadTranslations("rainedFishFed")
            : loadTranslations("noPrecipitationsFishHungry")}
        </Text>
      </View>
      <View style={styles.weatherItem}>
        <MaterialIcons name="air" size={ICON_SIZE_S} color="black" />
        <Text style={{ marginLeft: SpacingExtraSmall }}>
          {weather.windGust > 10 && waterCondition !== "Muddy"
            ? loadTranslations("windYesterdayWaterDirty")
            : `${weather.windGust} mph`}
        </Text>
      </View>
    </View>
  );

  const renderItem = ({ item, index }) => (
  <View key={index} style={padding_styles.horizontal_s}>
    <View style={[styles.itemContainer, flex_style.width100, flex_style.wrap, padding_styles.space_s]}>
        <View style={[flex_style.flex, flex_style.width100]}>
          <View style={[flex_style.width30]}>
            <Image
              source={{ uri: item.image }}
              style={[img_styles.rectangle_image_s, { width: 100 }]}
            />
          </View>
        <View style={[flex_style.width70]}>
          <TutorialTooltip
            conditions={currentTutorial == "LureBrands" && index == 0}
            style={tutorial_styles.singleLine}
            tutorial="LureBrands"
            translations="tutBrands"
            tutRoute={NAV_LURES_RESULTS}
            setCurrentTutorial={setCurrentTutorial}
          />

          <TutorialTooltip
            conditions={currentTutorial == "LureModels" && index == 0}
            style={tutorial_styles.singleLine}
            tutorial="LureModels"
            translations="tutModel"
            tutRoute={NAV_LURES_RESULTS}
            setCurrentTutorial={setCurrentTutorial}
          />
            <View style={[flex_style.flex, flex_style.wrap, flex_style.width100]}>
              <Text style={[text_style.fontColorPrimary, text_style.bold, text_style.sm]}>
                {item.brand} - {item.model}
              </Text>
            </View>

          <TutorialTooltip
            conditions={currentTutorial == "LureType" && index == 0}
            style={tutorial_styles.singleLine}
            tutorial="LureType"
            translations="tutType"
            tutRoute={NAV_LURES_RESULTS}
            setCurrentTutorial={setCurrentTutorial}
          />
          <Text>
            {loadTranslations("type")}: {item.type}
          </Text>

          <TutorialTooltip
            conditions={currentTutorial == "LureColors" && index == 0}
            style={tutorial_styles.doubleLine}
            tutorial="LureColors"
            translations="tutColors"
            tutRoute={NAV_LURES_RESULTS}
            setCurrentTutorial={setCurrentTutorial}
          />
          <Text>
            {loadTranslations("colors")}: {item.color1}/{item.color2}
          </Text>

          <TutorialTooltip
            conditions={currentTutorial == "LureSize" && index == 0}
            style={tutorial_styles.singleLine}
            tutorial="LureSize"
            translations="tutSize"
            tutRoute={NAV_LURES_RESULTS}
            setCurrentTutorial={setCurrentTutorial}
          />
          {/* size attr here */}

          <TutorialTooltip
            conditions={currentTutorial == "LureWeight" && index == 0}
            style={tutorial_styles.singleLine}
            tutorial="LureWeight"
            translations="tutWeight"
            tutRoute={NAV_LURES_RESULTS}
            setCurrentTutorial={setCurrentTutorial}
          />
          {reactIfView(item.weight,
            <Text>
              {loadTranslations("weight")}: {item.weight}oz
            </Text>
          )}
          {reactIfView(item.size, 
            <Text>
              {loadTranslations("size")}: {item.size}"
            </Text>
          )}

            {reactIfView(item?.usage,
              <View style={[margin_styles.bottom_md]}>
                <View style={[flex_style.flex]} key={index}>
                  <Text style={[{width: SpacingFormXLarge}, text_style.bold]}>{loadTranslations('typeOfMethod')}</Text>
                  <Text style={[text_style.bold]}>{loadTranslations('speed')}</Text>
                </View>
                {item?.usage?.map((usage, index) => (
                  <View style={[flex_style.flex]} key={index}>
                    <Text style={[{width: SpacingFormXLarge}]}>{loadTranslations(usage.type)}</Text>
                    <Text>{usage.speed ? (usage.speed + 'mph'): 'NA'}</Text>
                  </View>
                ))}
              </View>
            )}

          <TutorialTooltip
            conditions={currentTutorial == "LurePrice" && index == 0}
            style={tutorial_styles.doubleLine}
            tutorial="LurePrice"
            translations="tutPrice"
            tutRoute={NAV_LURES_RESULTS}
            setCurrentTutorial={setCurrentTutorial}
          />
          <View style={[flex_style.flex, flex_style.alignCenter]}>
            <Text style={[{width: SpacingFormXLarge}]}>
              {loadTranslations("price")}: {item.price} CAD
            </Text>

            {reactIfView(item.link,
              <TouchableOpacity
                onPress={() => openURL(item.link)}>
                <Text style={[text_style.link]}>{loadTranslations('buyNow')}</Text>
              </TouchableOpacity>)}
          </View>
          </View>
      </View>
      <View>
        {reactIfView(item?.rig,
            <View>
                {item?.rig?.map(rig => (
                  <View style={flex_style.flex}>
                    <View style={[flex_style.width30]}>
                      <Image
                        source={{ uri: rig.image }}
                        style={[img_styles.rectangle_image_s, { width: 100 }]}
                      />
                    </View>
                    <View style={[flex_style.flex, flex_style.column, flex_style.width70]}>
                      <Text style={[text_style.fontColorPrimary, text_style.bold, text_style.sm]}>{loadTranslations("rig")} - {rig.name}</Text>
                      {reactIfView(rig.weight, <Text>{rig.weight}oz</Text>)}
                      <View style={[flex_style.flex, flex_style.alignCenter]}>
                        <Text style={[{width: SpacingFormXLarge}]}>
                          {loadTranslations("price")}: {rig.price} CAD
                        </Text>
      
                        {reactIfView(rig.link,
                          <TouchableOpacity
                            onPress={() => openURL(rig.link)}>
                            <Text style={[text_style.link]}>{loadTranslations('buyNow')}</Text>
                          </TouchableOpacity>)}
                      </View>
                    </View>
                  </View>
                ))}
              </View>
              )}
      </View>
      

    </View>
  </View>
  );

  const styles = StyleSheet.create({
    itemContainer: {
      flexDirection: "column",
      padding: 0,
      alignItems: "center",
      marginVertical: 7,
      borderRadius: 20,
      backgroundColor: "rgb(251, 255, 251)",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.22,
      shadowRadius: 2.22,
      elevation: 3,
    },
    weatherContainer: {
      flexDirection: "column",
      justifyContent: "space-between",
      padding: 10,
      backgroundColor: "rgba(253, 253, 253, 1)",
      borderRadius: 20,
      margin: 10,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.22,
      shadowRadius: 2.22,
      elevation: 3,
    },
    weatherItem: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 5,
    },
  });

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      {loading && <View style={[flex_style.center, flex_style.flex, {height: height}]}><ActivityIndicator style={[margin_styles.top_lg, flex_style.center]} size="large" color={primary_color} /></View>}
      {!loading && (
        <View>
        <TutorialTooltip
          conditions={currentTutorial == "ResultsGuide"}
          style={tutorial_styles.doubleLine}
          tutorial="ResultsGuide"
          translations="tutGuide"
          tutRoute={NAV_LURES_RESULTS}
          setCurrentTutorial={setCurrentTutorial}
          placement="bottom"
          tooltipStyle={[{ marginTop: 100 }]}
        />
        {lures && lures.length > 0 ? (
          <View>

              <FlatList
              ListHeaderComponent={
                <View>
                  <Image
                    source={{ uri: expertImage }}
                    style={{ width: "100%", height: 330 }}
                  />
                  <Text
                    style={{
                      textAlign: "center",
                      fontWeight: "bold",
                      fontSize: 15,
                      marginTop: 9,
                      marginBottom: 4,
                    }}
                  >
                    {caption}
                  </Text>
                  {weather && (
                    <WeatherAndMoonPhase
                      weather={weather}
                      moonPhase={moon}
                      waterCondition={route.params.waterClarity}
                    />
                  )}
                </View>
              }
              data={lures}
              renderItem={renderItem}
              keyExtractor={(item, index) => `lure-${index}`}
            />
          </View>
          ) :
            ( <View style={[margin_styles.vertical_space_xxl]}>
              <Text style={[text_style.apple_auth, text_style.alignCenter]}>
                {loadTranslations("noLureForConditions")}
              </Text>
            </View>)}
        </View>
      )}
    </View>
  );
}
