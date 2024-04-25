import React, { useState, useEffect } from "react";
import { environment } from "../global/environment";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Modal,
  ActivityIndicator,
  Platform,
} from "react-native";
import {
  btn_style,
  flex_style,
  img_styles,
  margin_styles,
  padding_styles,
  text_style,
} from "../global/global-styles";
import { loadTranslations } from "../global/localization";
import DropdownWithModal from "../components/autocomplete";
import { navigate, reactIfView, responseDataHandler } from "../global/global-functions";
import { NAV_LURES_FORM, NAV_REQUEST_LURE_FORM, SpacingMedium, height, primary_color, secondary_color_faded, width } from "../global/global-constants";
import Tooltip, { TooltipChildrenContext } from 'react-native-walkthrough-tooltip';
import { getNextTutorialForPage, updateTutorialAndGetNext } from "../global/utils/tutorial.utils";

export default function LuresForm({ navigation }) {
  const [brandAndModelDataset, setBrandAndModelDataset] = useState([]);
  const [chosenItem, setChosenItem] = useState(null);
  const [lureOptionIdSelected, setLureOptionIdSelected] = useState(null);
  const [lureOptions, setLureOptions] = useState(null);
  const [brandAndModalVisible, setBrandAndModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentTutorial, setCurrentTutorial] = useState(null);
  const [initialLoad, setInitialLoad] = useState(true);

  useEffect(() => {
    const getTut = async () => {
      const tut = await getNextTutorialForPage(NAV_LURES_FORM)
     setCurrentTutorial(tut)
    }
   if (initialLoad) {
     getTut();
     setInitialLoad(false)
    }
 }, []);

  const handleFormSubmit = () => {
    navigation.navigate("LuresResults", {
      lureOptionsId: lureOptionIdSelected ? lureOptionIdSelected : 3581,
    });
  };

  async function onChangeText(text) {
    const url = environment.host + "api/lure-autofill?lureName=" + text;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // 'x-app-auth': token
      },
    });
    resp = await responseDataHandler(response, false);
    if (resp) {
      setBrandAndModelDataset(resp.map(lure => { return {title: lure.brand + ' ' + lure.model, image: lure.image, id: lure.id}}));
    }
  }

  async function onBrandAndModelSelect(item) {
    setBrandAndModalVisible(false)
    setChosenItem(item);
    setBrandAndModelDataset([]);
    setIsLoading(true)

    const url = environment.host + "api/lure-options-autofill?lureId=" + item.id;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // 'x-app-auth': token
      },
    });
    resp = await responseDataHandler(response, false);
    setIsLoading(false)
    if (resp) {
      setLureOptions(resp);
    }
  }

  return (
    <View style={[padding_styles.space_md,{ backgroundColor: 'white', height: height}]}>
      <ScrollView
        contentContainerStyle={[
          flex_style.flex,
          flex_style.flexContainer,
          padding_styles.safetyTop,
        ]}
      >
        <Text
          style={[
            text_style.sm,
            text_style.primaryColor,
            margin_styles.bottom_md,
            text_style.bold,
            text_style.alignCenter,
          ]}
        >
          {loadTranslations("profile")}
        </Text>
      </ScrollView>
    </View>
  );
}