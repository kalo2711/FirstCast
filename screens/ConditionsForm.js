import { getDeviceLanguage, loadTranslations } from "../global/localization";
import DateTimePicker from "@react-native-community/datetimepicker";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Platform,
  Image,
} from "react-native";
import Checkbox from "expo-checkbox";
import {
  btn_style,
  flex_style,
  form_style,
  img_styles,
  margin_styles,
  padding_styles,
  text_style,
} from "../global/global-styles";
import { navigate, reactIfView } from "../global/global-functions";
import {
  primary_color,
  green_color,
  width,
  black,
  IOS,
  NAV_CONDITIONS_FORM,
  VALID,
  NAV_LURES_RESULTS,
  ANDROID,
  tutorial_styles,
} from "../global/global-constants";
import FishSelect from "../fish-select.js";
import FishSelectItem from "../fish-select-item.js";
import Tooltip, {
  TooltipChildrenContext,
} from "react-native-walkthrough-tooltip";
import {
  getNextTutorialForPage,
  updateTutorialAndGetNext,
} from "../global/utils/tutorial.utils";
import DropdownWithModal from "../components/autocomplete.js";
import * as Location from "expo-location";
import { environment } from "../global/environment";
import { responseDataHandler } from "../global/global-functions";
import TutorialTooltip from "./TutorialTooltip";

const ConditionsForm = ({ navigation }) => {
  const [species, setSpecies] = useState(null);
  const [speciesModalVisible, setSpeciesModalVisible] = useState(false);
  const [temperature, setTemperature] = useState("");
  const [date, setDate] = useState(new Date());
  const [hour, setHour] = useState("");
  const [isSunny, setIsSunny] = useState(false);
  const [currentTutorial, setCurrentTutorial] = useState(null);
  const [isRaining, setIsRaining] = useState(false);
  const [waterClarity, setWaterClarity] = useState("Muddy");
  const [isHighPressure, setIsHighPressure] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(
    Platform.OS === IOS ? true : false
  );
  const [showTimePicker, setShowTimePicker] = useState(
    Platform.OS === IOS ? true : false
  );
  const [initialLoad, setInitialLoad] = useState(true);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isStructureModalVisible, setStructureModalVisible] = useState(false);
  const [autofilledLocations, setAutofilledLocations] = useState([]);
  const [geoCoordinates, setGeoCoordinates] = useState({
    lat: "45.501886",
    lon: "-73.567391",
  });
  const [locationName, setLocationName] = useState("");
  const [userLures, setUserLures] = useState(false);
  const [structure, setStructure] = useState("");
  const [structureInput, setStructureInput] = useState("");

  const waterClarities = [
    {
      id: "muddy",
      name: loadTranslations("muddy"),
      image: require("../assets/muddy-water.jpg"),
    },
    {
      id: "stained",
      name: loadTranslations("stained"),
      image: require("../assets/stained-water.jpg"),
    },
    {
      id: "clear",
      name: loadTranslations("clear"),
      image: require("../assets/clear-water.jpg"),
    },
  ];

  const structures = [
    { id: "weed", title: loadTranslations("weed") },
    { id: "rock", title: loadTranslations("rock") },
    { id: "submerged_items", title: loadTranslations("submerged_items") },
    { id: "drop", title: loadTranslations("drop") },
    { id: "flat", title: loadTranslations("flat") },
    { id: "point", title: loadTranslations("point") },
    { id: "channel", title: loadTranslations("channel") },
    { id: "bay", title: loadTranslations("bay") },
  ];

  useEffect(() => {
    const getTut = async () => {
      const tut = await getNextTutorialForPage(NAV_CONDITIONS_FORM);
      setCurrentTutorial(tut);
    };
    if (initialLoad) {
      getTut();
      setInitialLoad(false);
    }

    (async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          setErrorMsg("Permission to access location was denied");
          return;
        }
        let location = await Location.getCurrentPositionAsync({});
        setGeoCoordinates({
          lat: location.coords.latitude,
          lon: location.coords.longitude,
        });
      } catch (e) {
        console.error("Unable to fetch location: " + e);
      }
    })();
  }, [initialLoad, currentTutorial]); // Empty dependency array to run only once

  const createQueryParametersForAutofill = (lat, lang, radius, value) => {
    return (
      "lat=" +
      lat +
      "&lang=" +
      lang +
      "&radius=" +
      radius +
      "&input=" +
      value +
      "&language=" +
      getDeviceLanguage()
    );
  };

  const getAutofilledLocations = async (value) => {
    const radius = 100;

    const url =
      environment.host +
      "api/locations/autofillLocations?" +
      createQueryParametersForAutofill(
        geoCoordinates.lat,
        geoCoordinates.lon,
        radius,
        value
      );

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    let resp = await responseDataHandler(response);
    resp = updateName(
      resp?.autocompletedLocations ? resp?.autocompletedLocations : []
    );
    setAutofilledLocations(resp);
  };

  function updateName(array) {
    return array.map((x) => ({
      title: x.title,
      id: x.place_id,
      place_id: x.place_id,
    }));
  }

  const onLocationSelected = async (location) => {
    setLocationName(location.title);
    const url = `${environment.host}api/placeIdToLatLong/?placeId=${location.place_id}`;
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      let resp = await responseDataHandler(response);
      if (!resp) {
        console.error(
          "Unable to get geoCoordinates from location: API Response is not valid."
        );
        setLocationName("");
        return;
      }
      let locationData = resp.locationDetails;
      setGeoCoordinates(locationData);
    } catch (e) {
      console.error("Unable to get geoCoordinates from location: " + e);
    }
  };

  const onSelectFish = (selectedFish) => {
    setSpeciesModalVisible(false);
    setSpecies(selectedFish);
  };

  const handleFormSubmit = async () => {
    if (structure && species) {
      date.setHours(hour);
      const routeParams = {
        lat: geoCoordinates.lat,
        long: geoCoordinates.lon,
        species: species.id,
        location: geoCoordinates,
        temperature: temperature,
        date: date.getTime(),
        isSunny: isSunny,
        isRaining: isRaining,
        waterClarity: waterClarity,
        structure: structure,
        userLures: userLures,
      };
      navigate(NAV_LURES_RESULTS, routeParams);
    }
  };

  //Date + Time picker functions
  const onChange = (e, selectedDate) => {
    setDate(selectedDate);
    if (Platform.OS == ANDROID) {
      setShowDatePicker(false);
      setShowTimePicker(false);
    }
  };

  //Return values

  return (
    <ScrollView
      nestedScrollEnabled={true}
      contentContainerStyle={[
        flex_style.flex,
        flex_style.flexContainer,
        padding_styles.safetyTop,
        padding_styles.space_md,
        { flexWrap: "wrap" },
      ]}
    >
      <Text
        style={[
          text_style.sm,
          text_style.primaryColor,
          margin_styles.bottom_md,
          text_style.bold,
          flex_style.width100,
          text_style.alignCenter,
        ]}
      >
        {loadTranslations("howAreYouFishing")}
      </Text>
      <View style={[flex_style.flex, flex_style.width100]}>
        <View style={[flex_style.flex, flex_style.width100]}>
          <Text style={[text_style.xs, text_style.alignLeft]}>
            {loadTranslations("location")}
          </Text>
          <Text style={[text_style.required]}>*</Text>
        </View>
        {reactIfView(
          currentTutorial == "location",
          <Tooltip
            contentStyle={[{ backgroundColor: primary_color, height: 50 }]}
            backgroundColor={"rgba(0,0,0,0)"}
            isVisible={currentTutorial == "location"}
            content={
              <Text style={[text_style.fontColorWhite]}>
                {loadTranslations("tutSetLocation")}
              </Text>
            }
            placement="top"
            onClose={async () => {
              setCurrentTutorial(
                await updateTutorialAndGetNext("location", NAV_CONDITIONS_FORM)
              );
            }}
          >
            <TooltipChildrenContext.Consumer>
              {({ tooltipDuplicate }) =>
                reactIfView(
                  !tooltipDuplicate,
                  <View
                    style={[
                      {
                        height: Platform.OS === "android" ? 50 : 0,
                        width: width,
                      },
                    ]}
                  ></View>
                )
              }
            </TooltipChildrenContext.Consumer>
          </Tooltip>
        )}
      </View>

      <DropdownWithModal
        simple={true}
        showCancelButton={false}
        placeholder={locationName}
        onChangeText={getAutofilledLocations}
        noItemsPlaceholder="locationFetchError"
        dataset={autofilledLocations}
        parentSetModalVisible={setModalVisible}
        setSelectedItem={onLocationSelected}
      />
      <View style={[flex_style.flex, flex_style.width100]}>
        <Text style={[text_style.xs]}>{loadTranslations("temperature")}</Text>
        {reactIfView(
          currentTutorial == "waterTemp",
          <Tooltip
            contentStyle={[{ backgroundColor: primary_color, height: 80 }]}
            backgroundColor={"rgba(0,0,0,0)"}
            isVisible={currentTutorial == "waterTemp"}
            content={
              <Text style={[text_style.fontColorWhite]}>
                {loadTranslations("tutSetTemperature")}
              </Text>
            }
            placement="top"
            onClose={async () => {
              setCurrentTutorial(
                await updateTutorialAndGetNext("waterTemp", NAV_CONDITIONS_FORM)
              );
            }}
          >
            <TooltipChildrenContext.Consumer>
              {({ tooltipDuplicate }) =>
                reactIfView(
                  !tooltipDuplicate,
                  <View
                    style={[
                      {
                        height: Platform.OS === "android" ? 50 : 0,
                        width: width,
                      },
                    ]}
                  ></View>
                )
              }
            </TooltipChildrenContext.Consumer>
          </Tooltip>
        )}
      </View>
      <TextInput
        value={temperature}
        onChangeText={(text) => {
          const sanitizedText = text.replace(/[^0-9]/g, "").slice(0, 2);
          setTemperature(sanitizedText);
        }}
        keyboardType="numeric"
        onBlur={() => {
          if (temperature) {
            setTemperature(`${temperature}°C`);
          }
        }}
        onFocus={() => {
          setTemperature(temperature.replace(" °C", ""));
        }}
        maxLength={2}
        style={[form_style.formControl, text_style.xs, margin_styles.bottom_md]}
        placeholderTextColor={black}
      />
      <View style={[flex_style.flex, flex_style.width100]}>
        {reactIfView(
          currentTutorial == "selectSpecies",
          <Tooltip
            contentStyle={[{ backgroundColor: primary_color, height: 50 }]}
            backgroundColor={"rgba(0,0,0,0)"}
            isVisible={currentTutorial == "selectSpecies"}
            content={
              <Text style={[text_style.fontColorWhite]}>
                {loadTranslations("tutSetSpecies")}
              </Text>
            }
            placement="top"
            onClose={async () => {
              setCurrentTutorial(
                await updateTutorialAndGetNext(
                  "selectSpecies",
                  NAV_CONDITIONS_FORM
                )
              );
            }}
          >
            <TooltipChildrenContext.Consumer>
              {({ tooltipDuplicate }) =>
                reactIfView(
                  !tooltipDuplicate,
                  <View
                    style={[
                      {
                        height: Platform.OS === "android" ? 50 : 0,
                        width: width,
                      },
                    ]}
                  ></View>
                )
              }
            </TooltipChildrenContext.Consumer>
          </Tooltip>
        )}
      </View>
      
      <FishSelect
        visible={speciesModalVisible}
        setVisible={setSpeciesModalVisible}
        selectedFish={species}
        onSelectFish={onSelectFish}
      ></FishSelect>
      <View style={[flex_style.width100, margin_styles.bottom_md]}>
        {!species?.image ? (
          <TouchableOpacity
            onPress={() => {
              setSpeciesModalVisible(true);
            }}
            style={[
              btn_style.button,
              btn_style.round,
              btn_style.buttonFullWidth,
              btn_style.buttonReversed,
              flex_style.flex,
            ]}
          >
            {/* <Text
                style={[
                  text_style.primaryColor,
                  text_style.bold,
                  text_style.alignCenter,
                  flex_style.width100,
                ]}
              >
                {loadTranslations("speciesSelect")}
            </Text> */}
            <Text
              style={[
                text_style.primaryColor,
                text_style.bold,
                text_style.alignCenter,
              ]}
            >
              {loadTranslations("speciesSelect")}
            </Text>
            <Text style={[text_style.required]}>*</Text>
          </TouchableOpacity>
        ) : (
          <FishSelectItem
            isSelected={true}
            fish={species}
            onSelectFish={(event) => setSpeciesModalVisible(true)}
          ></FishSelectItem>
        )}
      </View>
      <View style={[flex_style.flex, flex_style.width100]}>
        <TutorialTooltip
          conditions={currentTutorial == "structure"}
          style={tutorial_styles.multiLine}
          tutorial="structure"
          translations="tutStructure"
          tutRoute={NAV_CONDITIONS_FORM}
          setCurrentTutorial={setCurrentTutorial}
        />
        <View style={[flex_style.flex, flex_style.width100]}>
          <Text style={[text_style.xs, text_style.alignLeft]}>
            {loadTranslations("structureInput")}
          </Text>
          <Text style={[text_style.required]}>*</Text>
        </View>
      </View>
      <DropdownWithModal
        simple={true}
        showCancelButton={false}
        onChangeText={(event) => setStructureInput(event)}
        noItemsPlaceholder="noStructure"
        dataset={structures.filter((item) =>
          item?.title
            ?.toLocaleLowerCase()
            ?.includes(structureInput?.toLocaleLowerCase())
        )}
        parentSetModalVisible={setStructureModalVisible}
        setSelectedItem={(event) => setStructure(event.id)}
      />
      {reactIfView(
        !!structure,
        <View style={[margin_styles.vertical_space_md]}>
          <Text style={[text_style.xs]}>
            {loadTranslations("chosenStructure")}: {loadTranslations(structure)}
          </Text>
        </View>
      )}
      <View
        style={[
          flex_style.flex,
          flex_style.spaceBetween,
          flex_style.one,
          margin_styles.bottom_md,
        ]}
      >
        <View style={[flex_style.flex, flex_style.column, flex_style.width100]}>
          {reactIfView(
            showDatePicker,
            <View style={[flex_style.flex, flex_style.center]}>
              <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode={"date"}
                is24Hour={true}
                onChange={onChange}
              />
            </View>
          )}
          <View style={[flex_style.flex, flex_style.width100]}>
            {reactIfView(
              currentTutorial == "date",
              <Tooltip
                contentStyle={[{ backgroundColor: primary_color, height: 60 }]}
                backgroundColor={"rgba(0,0,0,0)"}
                isVisible={currentTutorial == "date"}
                content={
                  <Text style={[text_style.fontColorWhite]}>
                    {loadTranslations("tutSetDate")}
                  </Text>
                }
                placement="top"
                onClose={async () => {
                  setCurrentTutorial(
                    await updateTutorialAndGetNext("date", NAV_CONDITIONS_FORM)
                  );
                }}
              >
                <TooltipChildrenContext.Consumer>
                  {({ tooltipDuplicate }) =>
                    reactIfView(
                      !tooltipDuplicate,
                      <View
                        style={[
                          {
                            height: Platform.OS === "android" ? 50 : 0,
                            width: width,
                          },
                        ]}
                      ></View>
                    )
                  }
                </TooltipChildrenContext.Consumer>
              </Tooltip>
            )}
          </View>
          {reactIfView(
            Platform.OS == ANDROID,
            <TouchableOpacity
              onPress={() => {
                setShowDatePicker(true);
              }}
              style={[
                btn_style.button,
                btn_style.round,
                btn_style.buttonFullWidth,
                btn_style.buttonReversed,
              ]}
            >
              <Text
                style={[
                  text_style.primaryColor,
                  text_style.bold,
                  text_style.alignCenter,
                ]}
              >
                {date.toDateString()}
              </Text>
            </TouchableOpacity>
          )}
          {reactIfView(
            showTimePicker,
            <View
              style={[
                flex_style.flex,
                flex_style.center,
                margin_styles.vertical_space_md,
              ]}
            >
              <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode={"time"}
                is24Hour={true}
                onChange={onChange}
              />
            </View>
          )}

          <View style={[flex_style.flex, flex_style.width100]}>
            {reactIfView(
              currentTutorial == "time",
              <Tooltip
                contentStyle={[{ backgroundColor: primary_color, height: 50 }]}
                backgroundColor={"rgba(0,0,0,0)"}
                isVisible={currentTutorial == "time"}
                content={
                  <Text style={[text_style.fontColorWhite]}>
                    {loadTranslations("tutSetTime")}
                  </Text>
                }
                placement="top"
                onClose={async () => {
                  setCurrentTutorial(
                    await updateTutorialAndGetNext("time", NAV_CONDITIONS_FORM)
                  );
                }}
              >
                <TooltipChildrenContext.Consumer>
                  {({ tooltipDuplicate }) =>
                    reactIfView(
                      !tooltipDuplicate,
                      <View
                        style={[
                          {
                            height: Platform.OS === "android" ? 50 : 0,
                            width: width,
                          },
                        ]}
                      ></View>
                    )
                  }
                </TooltipChildrenContext.Consumer>
              </Tooltip>
            )}
          </View>

          {reactIfView(
            Platform.OS == ANDROID,
            <TouchableOpacity
              onPress={() => {
                setShowTimePicker(true);
              }}
              style={[
                btn_style.button,
                btn_style.round,
                btn_style.buttonFullWidth,
                btn_style.buttonReversed,
                margin_styles.vertical_space_l,
              ]}
            >
              <Text
                style={[
                  text_style.primaryColor,
                  text_style.bold,
                  flex_style.width100,
                  text_style.alignCenter,
                ]}
              >
                {(date.getHours() < 10 ? "0" : "") +
                  date.getHours() +
                  ":" +
                  (date.getMinutes() < 10 ? "0" : "") +
                  date.getMinutes()}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      <View
        style={[
          flex_style.flex,
          flex_style.width100,
          flex_style.center,
          margin_styles.bottom_md,
        ]}
      >
        <Text style={[text_style.xs]}>{loadTranslations("myLures")}</Text>
        <Checkbox
          style={[margin_styles.horizontal_space_s]}
          value={userLures}
          onValueChange={setUserLures}
        />
      </View>

      <View
        style={[
          flex_style.flex,
          flex_style.column,
          flex_style.width100,
          margin_styles.bottom_md,
        ]}
      >
        <Text
          style={[
            text_style.sm,
            text_style.bold,
            text_style.primaryColor,
            text_style.alignCenter,
          ]}
        >
          {loadTranslations("waterClarity")}
        </Text>

        {reactIfView(
          currentTutorial == "waterClarity",
          <Tooltip
            contentStyle={[{ backgroundColor: primary_color, height: 60 }]}
            backgroundColor={"rgba(0,0,0,0)"}
            isVisible={currentTutorial == "waterClarity"}
            content={
              <Text style={[text_style.fontColorWhite]}>
                {loadTranslations("tutSetWater")}
              </Text>
            }
            placement="top"
            onClose={async () => {
              setCurrentTutorial(
                await updateTutorialAndGetNext(
                  "waterClarity",
                  NAV_CONDITIONS_FORM
                )
              );
            }}
          >
            <TooltipChildrenContext.Consumer>
              {({ tooltipDuplicate }) =>
                reactIfView(
                  !tooltipDuplicate,
                  <View
                    style={[
                      {
                        height: Platform.OS === "android" ? 50 : 0,
                        width: width,
                      },
                    ]}
                  ></View>
                )
              }
            </TooltipChildrenContext.Consumer>
          </Tooltip>
        )}

        <View
          style={[
            flex_style.flex,
            flex_style.spaceBetween,
            margin_styles.vertical_space_md,
          ]}
        >
          {waterClarities.map((waterClarityItem, index) => {
            return (
              <TouchableOpacity
                key={waterClarityItem.name}
                style={[flex_style.flex, flex_style.column, flex_style.center]}
                onPress={(event) => setWaterClarity(waterClarityItem.name)}
              >
                <Image
                  source={waterClarityItem.image}
                  style={[
                    img_styles.rectangle_image_xxs,
                    waterClarity == waterClarityItem.name
                      ? btn_style.buttonReversed
                      : null,
                  ]}
                ></Image>
                <Text
                  style={[
                    waterClarity == waterClarityItem.name
                      ? text_style.bold
                      : null,
                  ]}
                >
                  {waterClarityItem.name}{" "}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      <View style={[flex_style.flex, flex_style.width100]}>
        {reactIfView(
          currentTutorial == "findLures",
          <Tooltip
            contentStyle={[{ backgroundColor: primary_color, height: 80 }]}
            backgroundColor={"rgba(0,0,0,0)"}
            isVisible={currentTutorial == "findLures"}
            content={
              <Text style={[text_style.fontColorWhite]}>
                {loadTranslations("tutConditionsSubmit")}
              </Text>
            }
            placement="top"
            onClose={async () => {
              setCurrentTutorial(
                await updateTutorialAndGetNext("findLures", NAV_CONDITIONS_FORM)
              );
            }}
          >
            <TooltipChildrenContext.Consumer>
              {({ tooltipDuplicate }) =>
                reactIfView(
                  !tooltipDuplicate,
                  <View
                    style={[
                      {
                        height: Platform.OS === "android" ? 50 : 0,
                        width: width,
                      },
                    ]}
                  ></View>
                )
              }
            </TooltipChildrenContext.Consumer>
          </Tooltip>
        )}
      </View>
      <TouchableOpacity
        onPress={(event) => handleFormSubmit()}
        style={[
          btn_style.button,
          btn_style.round,
          btn_style.buttonFullWidth,
          !structure || !species ? btn_style.disabled : null,
        ]}
      >
        <Text
          style={[
            text_style.fontColorWhite,
            text_style.bold,
            flex_style.width100,
            text_style.alignCenter,
          ]}
        >
          {loadTranslations("findLures")}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#13305F", //Color Blue
    paddingHorizontal: 30,
    paddingVertical: 70,
  },
  heading: {
    fontSize: 30,
    color: green_color, //Color Green
    marginBottom: 30,
    marginTop: 20,
    textAlign: "center",
  },
  input: {
    borderWidth: 1.5,
    borderColor: "#FFFFFF", //Color White
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
    color: "#FFFFFF",
  },
  toggleLabel: {
    color: green_color,
    marginTop: 10,
    marginLeft: 0,
    fontSize: 17,
  },
  switchContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  switchText: {
    color: "#FFFFFF",
    marginRight: 10,
    marginLeft: 10,
  },
  pickerLabel: {
    color: green_color,
    marginTop: 20,
    marginLeft: 0,
    marginBottom: 0,
    fontSize: 17,
  },
  picker: {
    marginTop: -20,
  },
  button: {
    marginTop: -25,
  },
  dateTimeContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  dateInput: {
    flex: 1,
    marginRight: 5,
  },
  timeInput: {
    flex: 1,
    marginLeft: 5,
  },
});

export default ConditionsForm;
