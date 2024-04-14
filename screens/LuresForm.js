import React, { useState } from "react";
import { environment } from "../global/environment";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import {
  btn_style,
  flex_style,
  form_style,
  margin_styles,
  padding_styles,
  text_style,
} from "../global/global-styles";
import { primary_color, black, green_color } from "../global/global-constants";
import { loadTranslations } from "../global/localization";
import DropdownWithModal from "../components/autocomplete";
import { responseDataHandler } from "../global/global-functions";
import AddLureModal from "../add-lure-modal"

export default function LuresForm({ navigation }) {
  const [lure, setLure] = useState("");
  const [visible, setVisible] = useState(false);
  const [brandAndModelDataset, setBrandAndModelDataset] = useState([]);
  const [brandAndModelText, setBrandAndModelText] = useState("");
  const [lureOptions, setLureOptions] = useState({
    color1: "",
    color2: "",
    size: "",
    weight: "",
    lureOptionsId: "",
  });

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
    setBrandAndModelText(text);
    const url = environment.host + "/api/lure-autofill?lureName=" + text;
    console.log(url);
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // 'x-app-auth': token
      },
    });
    resp = await responseDataHandler(response);
    if (resp) {
      setBrandAndModelDataset(resp);
    }
  }

  function onBrandAndModelSelect(item) {
    setBrandAndModelText(item.title);
    setBrandAndModelDataset([]);
  }

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
          text_style.alignCenter,
        ]}
      >
        {loadTranslations("selectLure")}
      </Text>
      <TextInput
        placeholder={loadTranslations("lure")}
        value={lure}
        onChangeText={(text) => setLure(text)}
        style={[form_style.formControl, text_style.sm, margin_styles.bottom_md]}
        placeholderTextColor={black}
        onBlur={() => handleLureSelect(lure)}
      />
      <DropdownWithModal
        dataset={brandAndModelDataset}
        onChangeText={onChangeText}
        placeholder={""}
        setSelectedItem={onBrandAndModelSelect}
      ></DropdownWithModal>
      <View
        style={[
          flex_style.flex,
          flex_style.spaceBetween,
          flex_style.one,
          margin_styles.bottom_md,
        ]}
      >
        {/* <Picker
          selectedValue={lureOptions.color1}
          onValueChange={(itemValue) =>
            setLureOptions({ ...lureOptions, color1: itemValue })
          }
          style={[form_style.formControl, text_style.sm]}
        >
          {lureOptions.color1?.map((color) => (
            <Picker.Item key={color} label={color} value={color} />
          ))}
        </Picker>
        <Picker
          selectedValue={lureOptions.color2}
          onValueChange={(itemValue) =>
            setLureOptions({ ...lureOptions, color2: itemValue })
          }
          style={[form_style.formControl, text_style.sm]}
        >
          {lureOptions.color2?.map((color) => (
            <Picker.Item key={color} label={color} value={color} />
          ))}
        </Picker> */}
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
    </ScrollView>
  );
}
