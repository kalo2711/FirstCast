import { StatusBar } from "expo-status-bar";
import { loadTranslations } from "../global/localization";
import DateTimePicker from "@react-native-community/datetimepicker";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Switch,
  ScrollView,
  Platform,
  TouchableHighlight,
  Image
} from "react-native";
import {
  btn_style,
  flex_style,
  form_style,
  img_styles,
  margin_styles,
  padding_styles,
  text_style,
} from "../global/global-styles";
import {reactIfView} from "../global/global-functions";
import {
  primary_color,
  green_color,
  width,
  black,
  IOS,
  secondary_color,
  NAV_CONDITIONS_FORM,
} from "../global/global-constants";
import * as Font from "expo-font";
import FishSelect from "../fish-select.js";
import FishSelectItem from "../fish-select-item.js";
import Tooltip, { TooltipChildrenContext } from 'react-native-walkthrough-tooltip';
import { getNextTutorialForPage, updateTutorialAndGetNext } from "../global/utils/tutorial.utils";

const ConditionsForm = () => {
  const [species, setSpecies] = useState(null);
  const [speciesModalVisible, setSpeciesModalVisible] = useState(false);
  const [location, setLocation] = useState("");
  const [temperature, setTemperature] = useState("");
  const [date, setDate] = useState(new Date());
  const [hour, setHour] = useState("");
  const [isSunny, setIsSunny] = useState(false);
  const [currentTutorial, setCurrentTutorial] = useState(null);
  const [isRaining, setIsRaining] = useState(false);
  const [waterClarity, setWaterClarity] = useState("Muddy");
  const [isHighPressure, setIsHighPressure] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(Platform.OS === IOS ? true : false);
  const [showTimePicker, setShowTimePicker] = useState(Platform.OS === IOS ? true : false);
  const [fontLoaded, setFontLoaded] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);

  const waterClarities = [
    { id: 1, name: loadTranslations('muddy'), image: require('../assets/muddy-water.jpg') },
    { id: 2, name: loadTranslations('stained'), image: require('../assets/stained-water.jpg') },
    { id: 3, name: loadTranslations('clear'), image: require('../assets/clear-water.jpg') },
  ]
  
  useEffect(() => {
     const getTut = async () => {
      const tut = await getNextTutorialForPage(NAV_CONDITIONS_FORM)
      setCurrentTutorial(tut)
     }
    if (initialLoad) {
      getTut();
      setInitialLoad(false)
     }
  }, []); // Empty dependency array to run only once
  

  const onSelectFish = (selectedFish) => {
    setSpeciesModalVisible(false)
    setSpecies(selectedFish)
  }

  const handleFormSubmit = () => {
    const speciesName = species.name
    console.log({
      speciesName,
      location,
      temperature,
      date,
      hour,
      isSunny,
      isRaining,
      waterClarity,
      biometricPressure,
    });
  };

  //Date + Time picker functions
  const onChange = (e, selectedDate) => {
    setDate(selectedDate);
    setShowDatePicker(false);
  };

  //Return values

  return (
    <ScrollView
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
          text_style.alignCenter
        ]}
      >
        {loadTranslations("howAreYouFishing")}
      </Text>
        <View style={[flex_style.flex, flex_style.width100]}>
        <Text style={[text_style.xs]}>{loadTranslations("location")}</Text>
        {reactIfView(currentTutorial == 'location',
        <Tooltip
        contentStyle={[{backgroundColor: primary_color, height: 50}]}
        backgroundColor={'rgba(0,0,0,0)'}
        isVisible={currentTutorial == 'location'}
        content={<Text style={[text_style.fontColorWhite]}>{loadTranslations("tutSetLocation")}</Text>}
        placement="top"
        onClose={async () => {setCurrentTutorial(await updateTutorialAndGetNext('location', NAV_CONDITIONS_FORM))}}
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
        </View>
        <TextInput
          value={location}
          onChangeText={setLocation}
          style={[form_style.formControl, text_style.xs, margin_styles.bottom_md]}
          placeholderTextColor={black}
      />
      <View style={[flex_style.flex, flex_style.width100]}>
        <Text style={[text_style.xs]}>{loadTranslations("temperature")}</Text>
        {reactIfView(currentTutorial == 'waterTemp',
          <Tooltip
            contentStyle={[{ backgroundColor: primary_color, height: 80 }]}
            backgroundColor={'rgba(0,0,0,0)'}
            isVisible={currentTutorial == 'waterTemp'}
            content={<Text style={[text_style.fontColorWhite]}>{loadTranslations("tutSetTemperature")}</Text>}
            placement="top"
            onClose={async () => {setCurrentTutorial(await updateTutorialAndGetNext('waterTemp', NAV_CONDITIONS_FORM))}}
          >
            <TooltipChildrenContext.Consumer>
              {({ tooltipDuplicate }) => (
                reactIfView(!tooltipDuplicate,
                  <View style={[{ height: Platform.OS === 'android' ? 50 : 0, width: width }]}></View>
                )
              )}
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
      {reactIfView(currentTutorial == 'selectSpecies',
        <Tooltip
            contentStyle={[{backgroundColor: primary_color, height: 50}]}
            backgroundColor={'rgba(0,0,0,0)'}
            isVisible={currentTutorial == 'selectSpecies'}
            content={<Text style={[text_style.fontColorWhite]}>{loadTranslations("tutSetSpecies")}</Text>}
            placement="top"
            onClose={async () => {setCurrentTutorial(await updateTutorialAndGetNext('selectSpecies', NAV_CONDITIONS_FORM))}}
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
      </View>
        <FishSelect visible={speciesModalVisible} selectedFish={species} onSelectFish={onSelectFish}></FishSelect>
        <View style={[flex_style.width100, margin_styles.bottom_md]}>
          {!species?.image ? 
            <TouchableOpacity
            onPress={() => {setSpeciesModalVisible(true)}}
            style={[btn_style.button, btn_style.round, btn_style.buttonFullWidth, btn_style.buttonReversed]}
            >
              <Text
                style={[
                  text_style.primaryColor,
                  text_style.bold,
                  text_style.alignCenter,
                  flex_style.width100,
                ]}
              >
                {loadTranslations("speciesSelect")}
              </Text>
          </TouchableOpacity> :
            <FishSelectItem isSelected={true} fish={species} onSelectFish={event => setSpeciesModalVisible(true)}></FishSelectItem>
          }
        </View>

      <View
        style={[
          flex_style.flex,
          flex_style.spaceBetween,
          flex_style.one,
          margin_styles.bottom_md,
        ]}
      >
        <View style={[
          flex_style.flex,
          flex_style.column,
          flex_style.width100
        ]}>
          {reactIfView(showDatePicker,  
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

            {reactIfView(currentTutorial == 'date',
          <Tooltip
            contentStyle={[{ backgroundColor: primary_color, height: 60 }]}
            backgroundColor={'rgba(0,0,0,0)'}
            isVisible={currentTutorial == 'date'}
            content={<Text style={[text_style.fontColorWhite]}>{loadTranslations("tutSetDate")}</Text>}
            placement="top"
            onClose={async () => {setCurrentTutorial(await updateTutorialAndGetNext('date', NAV_CONDITIONS_FORM))}}
          >
            <TooltipChildrenContext.Consumer>
              {({ tooltipDuplicate }) => (
                reactIfView(!tooltipDuplicate,
                  <View style={[{ height: Platform.OS === 'android' ? 50 : 0, width: width }]}></View>
                )
              )}
            </TooltipChildrenContext.Consumer>
          </Tooltip>
            )}
          </View>
          {reactIfView(Platform.OS !== "ios",
            <TouchableOpacity
            onPress={() => {setShowDatePicker(true)}}
            style={[btn_style.button, btn_style.round, btn_style.buttonFullWidth, btn_style.buttonReversed]}
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
            {reactIfView(showTimePicker,
            <View style={[flex_style.flex, flex_style.center, margin_styles.vertical_space_md]}>         
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

          {reactIfView(currentTutorial == 'time',
          <Tooltip
          contentStyle={[{ backgroundColor: primary_color, height: 50 }]}
          backgroundColor={'rgba(0,0,0,0)'}
          isVisible={currentTutorial == 'time'}
          content={<Text style={[text_style.fontColorWhite]}>{loadTranslations("tutSetTime")}</Text>}
          placement="top"
          onClose={async () => {setCurrentTutorial(await updateTutorialAndGetNext('time', NAV_CONDITIONS_FORM))}}
          >
            <TooltipChildrenContext.Consumer>
              {({ tooltipDuplicate }) => (
                reactIfView(!tooltipDuplicate,
                  <View style={[{ height: Platform.OS === 'android' ? 50 : 0, width: width }]}></View>
                )
              )}
            </TooltipChildrenContext.Consumer>
          </Tooltip>
          )}
          </View>
  
          {reactIfView(Platform.OS != 'ios',
            <TouchableOpacity
            onPress={() => {setShowDatePicker(true)}}
            style={[btn_style.button, btn_style.round, btn_style.buttonFullWidth, btn_style.buttonReversed, margin_styles.vertical_space_l]}
          >
            <Text
              style={[
                text_style.primaryColor,
                text_style.bold,
                flex_style.width100,
                text_style.alignCenter,
              ]}
            >
              {date.getHours() + ":" + date.getMinutes()}
            </Text>
          </TouchableOpacity>
          )}

        </View>
        
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

        {reactIfView(currentTutorial == 'waterClarity',
          <Tooltip
            contentStyle={[{ backgroundColor: primary_color, height: 60 }]}
            backgroundColor={'rgba(0,0,0,0)'}
            isVisible={currentTutorial == 'waterClarity'}
            content={<Text style={[text_style.fontColorWhite]}>{loadTranslations("tutSetWater")}</Text>}
            placement="top"
            onClose={async () => {setCurrentTutorial(await updateTutorialAndGetNext('waterClarity', NAV_CONDITIONS_FORM))}}
          >
            <TooltipChildrenContext.Consumer>
              {({ tooltipDuplicate }) => (
                reactIfView(!tooltipDuplicate,
                  <View style={[{ height: Platform.OS === 'android' ? 50 : 0, width: width }]}></View>
                )
              )}
            </TooltipChildrenContext.Consumer>
          </Tooltip>
        )}

        <View style={[flex_style.flex, flex_style.spaceBetween, margin_styles.vertical_space_md]}>
          {waterClarities.map((waterClarityItem, index) => {
            return (
              <TouchableOpacity index={waterClarityItem.name} style={[flex_style.flex, flex_style.column, flex_style.center]} onPress={event => setWaterClarity(waterClarityItem.name)}>
                <Image source={waterClarityItem.image} style={[img_styles.rectangle_image_xxs, waterClarity == waterClarityItem.name ? btn_style.buttonReversed : null]}></Image>
                <Text style={[waterClarity == waterClarityItem.name ? text_style.bold : null]}>{waterClarityItem.name}</Text>
              </TouchableOpacity>
            )
          })}
        </View>
      </View>


      {/* {reactIfView(date.getDate() > ((new Date().getDate()) + 7),
        <View styles={[flex_style.flex, flex_style.column, flex_style.width100]}>
        <Text
          style={[
            text_style.primaryColor,
            text_style.sm,
            text_style.bold,
            text_style.alignCenter,
          ]}
        >
          {loadTranslations("weather")}
        </Text>
        <View
          style={[
            styles.switchContainer,
            margin_styles.vertical_space_md,
            flex_style.width100,
          ]}
        >
          <Text
            style={[
              text_style.sm,
              text_style.black,
              flex_style.one,
              text_style.alignCenter,
            ]}
          >
            {loadTranslations("sun")}
          </Text>
          <Switch
            value={isSunny}
            onValueChange={setIsSunny}
            trackColor={{ false: primary_color, true: green_color }}
            thumbColor={isSunny ? "#f4f3f4" : "#f4f3f4"}
          />
          <Text
            style={[
              text_style.sm,
              text_style.black,
              flex_style.one,
              text_style.alignCenter,
            ]}
          >
            {loadTranslations("cloudy")}
          </Text>
        </View>

        <View
          style={[
            styles.switchContainer,
            margin_styles.vertical_space_md,
            flex_style.width100,
          ]}
        >
          <Text
            style={[
              text_style.sm,
              text_style.black,
              flex_style.one,
              text_style.alignCenter,
            ]}
          >
            {loadTranslations("dry")}
          </Text>
          <Switch
            value={isRaining}
            onValueChange={setIsRaining}
            trackColor={{ false: primary_color, true: green_color }}
            thumbColor={isRaining ? "#f4f3f4" : "#f4f3f4"}
          />
          <Text
            style={[
              text_style.sm,
              text_style.black,
              flex_style.one,
              text_style.alignCenter,
            ]}
          >
            {loadTranslations("raining")}
          </Text>
        </View>

        <Text
          style={[
            text_style.primaryColor,
            text_style.sm,
            text_style.bold,
            text_style.alignCenter,
          ]}
        >
          {loadTranslations("bioPressure")}
        </Text>

        <View
          style={[
            styles.switchContainer,
            margin_styles.vertical_space_md,
            flex_style.width100,
          ]}
        >
          <Text
            style={[
              text_style.sm,
              text_style.black,
              flex_style.one,
              text_style.alignCenter,
            ]}
          >
            {loadTranslations("low")}
          </Text>
          <Switch
            value={isHighPressure}
            onValueChange={setIsHighPressure}
            style={styles.switch}
            trackColor={{ false: primary_color, true: green_color }}
            thumbColor={isHighPressure ? "#f4f3f4" : "#f4f3f4"}
          />
          <Text
            style={[
              text_style.sm,
              text_style.black,
              flex_style.one,
              text_style.alignCenter,
            ]}
          >
            {loadTranslations("high")}
          </Text>
          </View>
        </View>
      )} */}
        <View style={[flex_style.flex, flex_style.width100]}>
        {reactIfView(currentTutorial == 'findLures',
        <Tooltip
        contentStyle={[{backgroundColor: primary_color, height: 80}]}
        backgroundColor={'rgba(0,0,0,0)'}
        isVisible={currentTutorial == 'findLures'}
        content={<Text style={[text_style.fontColorWhite]}>{loadTranslations("tutConditionsSubmit")}</Text>}
        placement="top"
        onClose={async () => {setCurrentTutorial(await updateTutorialAndGetNext('findLures', NAV_CONDITIONS_FORM))}}
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
        </View>
      <TouchableOpacity
        onPress={handleFormSubmit}
        style={[btn_style.button, btn_style.round, btn_style.buttonFullWidth]}
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