import React, { useState } from "react";
import { environment } from "../global/environment";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Modal,
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
import AddLureModal from "../add-lure-modal"

export default function LuresForm({ navigation }) {
  const [lure, setLure] = useState("");
  const [visible, setVisible] = useState(false);
  const [brandAndModelDataset, setBrandAndModelDataset] = useState([]);
  const [chosenItem, setChosenItem] = useState(null);
  const [lureOptionId, setlureOptionId] = useState(null);
  const [lureOptions, setLureOptions] = useState(null);
  const [brandAndModalVisible, setBrandAndModalVisible] = useState(false);
  const [selectedLureOption, setSelectedLureOption] = useState(null);

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

  function onBrandAndModelSelect(item) {
    setBrandAndModalVisible(false)
    setChosenItem(item);
    setBrandAndModelDataset([]);
  }

  return (
    <View
      style={[
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
                  <DropdownWithModal setSelectedItem={item => onBrandAndModelSelect(item)} dataset={brandAndModelDataset} onChangeText={ text => onChangeText(text)}></DropdownWithModal>
                </View>
              </Modal>
          </View>
        }
        {/* <TextInput
          value={lure}
          onChangeText={(text) => onChangeText(text)}
          style={[form_style.formControl, flex_style.one, text_style.sm, margin_styles.bottom_md]}
          placeholderTextColor={black}
          onBlur={() => handleLureSelect(lure)}
        /> */}
      </View>
          <Text style={[text_style.bold, text_style.xs]}>{chosenItem?.title}</Text>
          <Image style={[img_styles.icon_md]} source={{uri: chosenItem?.image}}></Image>
      {reactIfView(lureOptionId,
        <View>
        <View
          style={[
            flex_style.flex,
            flex_style.spaceBetween,
            flex_style.one,
            margin_styles.bottom_md,
          ]}
        >
          <Picker
            selectedValue={lureOptions?.color1}
            onValueChange={(itemValue) =>
              setLureOptions({ ...lureOptions, color1: itemValue })
            }
            style={[form_style.formControl, text_style.cs]}
          >
            {lureOptions?.color1?.map((color) => (
              <Picker.Item key={color} label={color} value={color} />
            ))}
          </Picker>
          <Picker
            selectedValue={lureOptions?.color2}
            onValueChange={(itemValue) =>
              setLureOptions({ ...lureOptions, color2: itemValue })
            }
            style={[form_style.formControl, text_style.sm]}
          >
            {lureOptions?.color2?.map((color) => (
              <Picker.Item key={color} label={color} value={color} />
            ))}
          </Picker>
        </View>
        <View
          style={[
            flex_style.flex,
            flex_style.spaceBetween,
            flex_style.one,
            margin_styles.bottom_md,
          ]}
        >
          {/* <Picker
            selectedValue={lureOptions.size}
            onValueChange={(itemValue) =>
              setLureOptions({ ...lureOptions, size: itemValue })
            }
            style={[form_style.formControl, text_style.sm]}
          >
            {lureOptions.size?.map((size) => (
              <Picker.Item key={size} label={size} value={size} />
            ))}
          </Picker>
          <Picker
            selectedValue={lureOptions.weight}
            onValueChange={(itemValue) =>
              setLureOptions({ ...lureOptions, weight: itemValue })
            }
            style={[form_style.formControl, text_style.sm]}
          >
            {lureOptions.weight?.map((weight) => (
              <Picker.Item key={weight} label={weight} value={weight} />
            ))}
          </Picker> */}
        </View>
      </View>
      )}
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
          {loadTranslations("submit")}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={[btn_style.button, btn_style.buttonBlack, btn_style.round, btn_style.buttonFullWidth, margin_styles.vertical_space_md]} onPress={event => setVisible(true)}>
        <Text style={[text_style.bold, text_style.fontColorWhite]}>{loadTranslations("requestNewLure")}</Text>
      </TouchableOpacity>
      <AddLureModal setVisible={setVisible} visible={visible}></AddLureModal>
    </View>
  );
}
