import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Pressable,
  Modal,
  TouchableOpacity,
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
  NAV_MOON_CYCLES,
  tutorial_styles,
  ICON_SIZE_S,
  SpacingExtraSmall,
  height,
} from "../global/global-constants";
import { loadTranslations } from "../global/localization";
import { MaterialIcons, FontAwesome5 } from "@expo/vector-icons";
import { environment } from "../global/environment";
import { reactIfView, responseDataHandler, navigateBack } from "../global/global-functions";

const moonCycleInfo = [
  {title: loadTranslations("tidesTitle"), text: loadTranslations("infoTides")},
  {title: loadTranslations("lightLevelsTitle"), text: loadTranslations("infoLightLevels")},
  {title: loadTranslations("feedingTitle"), text: loadTranslations("infoFeedingPatterns")},
  {title: loadTranslations("bioRhythmsTitle"), text: loadTranslations("infoBioRhythms")}
]

const InfoItem = ({title, text}) => {
  return (
    <View style={{marginBottom: 10}}>
      <Text style={{fontSize: 14, lineHeight: 20, fontWeight: "bold"}}>{title}</Text>
      <Text style={{fontSize: 14, lineHeight: 20}}>{text}</Text>
    </View>
  )
}

function MoonInfo() {
  return (<>
    <ScrollView style={{padding: 20, marginTop: 30}}>
      <Text style={{fontStyle: "italic"}}>
        {loadTranslations("moonCycleInfo")}
      </Text>
      <Text style={{fontWeight: "bold", fontSize: 24}}>
        {loadTranslations("moonCycleTitle")}
      </Text>
      <FlatList 
        data={moonCycleInfo}
        renderItem={({item}) => {
          return (
            <InfoItem title={item.title} text={item.text}/>
          )
        }}
      />
    </ScrollView>
    <TouchableOpacity
      onPress={() => { navigateBack() }}
      style={[btn_style.button, btn_style.round, btn_style.buttonReversed, flex_style.flex]}
    >
      <Text style={[text_style.primaryColor,
      text_style.bold,
      text_style.alignCenter]}>{loadTranslations('close')}</Text>
    </TouchableOpacity>
  </>)
}

export default MoonInfo;