import React, { useState } from "react";
import { environment } from "../global/environment";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Modal,
  ActivityIndicator,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import {
  btn_style,
  flex_style,
  form_style,
  img_styles,
  margin_styles,
  padding_styles,
  text_style,
} from "../global/global-styles";
import { loadTranslations } from "../global/localization";
import DropdownWithModal from "../components/autocomplete";
import { reactIfView, responseDataHandler } from "../global/global-functions";
import AddLureModal from '../add-lure-modal';
import { isLoading } from "expo-font";
import { SpacingExtraSmall, SpacingMedium, SpacingSmall, height, primary_color, primary_color_faded, secondary_color, secondary_color_faded } from "../global/global-constants";

export default function LuresForm({ navigation }) {
  const [lure, setLure] = useState("");
  const [visible, setVisible] = useState(false);
  const [brandAndModelDataset, setBrandAndModelDataset] = useState([]);
  const [chosenItem, setChosenItem] = useState(null);
  const [lureOptionIdSelected, setLureOptionIdSelected] = useState(null);
  const [lureOptions, setLureOptions] = useState(null);
  const [brandAndModalVisible, setBrandAndModalVisible] = useState(false);
  const [selectedLureOption, setSelectedLureOption] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchLureOptions = async (lureId) => {
    // Fetch call to /api/lure-options-autofill with lureId

    return {
      color1: ["Red", "Green", "Blue"],
      color2: ["Yellow", "White", "Black"],
      size: ["Small", "Medium", "Large"],
      weight: ["10g", "20g", "30g"],
      lureOptionsId: "some-id",
    };
  };

  const handleLureSelect = async (selectedLureId) => {
    const options = await fetchLureOptions(selectedLureId);
    setLureOptions(options);
  };

  const handleFormSubmit = () => {
    navigation.navigate("LuresResults", {
      lureOptionsId: lureOptions.lureOptionsId,
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
    console.log(item)
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
          { flexWrap: "wrap"},
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
          {loadTranslations("selectLure")}
        </Text>
        <View style={[flex_style.flex, flex_style.width100, flex_style.center, { alignItems: 'flex-start' }, margin_styles.bottom_md]}>
          {!brandAndModalVisible ?
            <TouchableOpacity
              onPress={() => { setBrandAndModalVisible(true) }}
              style={[btn_style.button, btn_style.round, btn_style.buttonFullWidth, btn_style.buttonReversed]}
            >
              <Text
                style={[
                  text_style.primaryColor,
                  text_style.bold,
                  text_style.alignCenter,
                ]}
              >
                {loadTranslations("brandOrModel")}
              </Text>
            </TouchableOpacity> : 
            <View style={[flex_style.one]}>
                <Modal visible={brandAndModalVisible} animationType="slide">
                  <View style={{ flex: 1, padding: 20 }}>
                    <DropdownWithModal noItemsPlaceholder={"noLures"} parentSetModalVisible={setBrandAndModalVisible} setSelectedItem={item => onBrandAndModelSelect(item)} dataset={brandAndModelDataset} onChangeText={ text => onChangeText(text)}></DropdownWithModal>
                  </View>
                </Modal>
            </View>
          }
        </View>
        {reactIfView(chosenItem?.id && !isLoading,
          <View style={[flex_style.flex, flex_style.column, flex_style.center, flex_style.width100]}>
            {lureOptions?.map(option => 
              <TouchableOpacity style={[flex_style.flex, flex_style.column, flex_style.center, flex_style.width100, padding_styles.vertical_space_md, {paddingBottom:SpacingMedium, backgroundColor: lureOptionIdSelected == option.id ? secondary_color_faded : 'transparent'}]}
              onPress={() => setLureOptionIdSelected(option.id)}>
                <Image style={[img_styles.rectangle_image_s]} source={{uri: option?.image}}></Image>
                <Text style={[text_style.bold, text_style.xs]}>{option?.brand}</Text>
                <Text style={[text_style.bold, text_style.xs]}>{option?.model}</Text>
                <Text style={[text_style.bold, text_style.xs]}>{option?.color1} , {option?.color2}</Text>
                <Text style={[text_style.bold, text_style.xs]}>{option?.size} {loadTranslations("inch")}</Text>
                <Text style={[text_style.bold, text_style.xs]}>{option?.weight} {loadTranslations("pound")}</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
        {reactIfView(!!isLoading && chosenItem?.id,
          <ActivityIndicator style={[margin_styles.bottom_lg]} size="large" color={primary_color} />
        )}
        </ScrollView>
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
            {loadTranslations("findConditions")}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={[btn_style.button, btn_style.buttonBlack, btn_style.round, btn_style.buttonFullWidth, margin_styles.vertical_space_md]} onPress={event => setVisible(true)}>
          <Text style={[text_style.bold, text_style.fontColorWhite]}>{loadTranslations("requestNewLure")}</Text>
        </TouchableOpacity>
        <AddLureModal setVisible={setVisible} visible={visible}></AddLureModal>
      </View>
  );
}
