import React, { useState, useEffect, useRef } from "react";
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
  FlatList,
  ListItem
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
import { getAuthToken} from '../global/utils/auth.utils';



export default function LuresForm({ navigation }) {
  const [token, setToken] = useState(null);
  const [email, setEmail] = useState(null);
  const [lures, setLures] = useState([]);
  const [brandAndModelDataset, setBrandAndModelDataset] = useState([]);
  const [chosenItem, setChosenItem] = useState(null);
  const [lureOptionIdSelected, setLureOptionIdSelected] = useState(null);
  const [lureOptions, setLureOptions] = useState(null);
  const [brandAndModalVisible, setBrandAndModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentTutorial, setCurrentTutorial] = useState(null);
  const [initialLoad, setInitialLoad] = useState(true);

  useEffect(() => {
    async function getData(){
      const t = await getAuthToken(false);
      setToken(t);
    }
    getData();
    // fetch(`/api/get/userNames?emails=${jwt_decode(token).id}`)
  }, []);

  useEffect(() => {
    if (token !== null){
      fetchUserLures();
    }
  }, [token]);

  const handleFormSubmit = () => {
    navigation.navigate("LuresResults", {
      lureOptionsId: lureOptionIdSelected ? lureOptionIdSelected : 3581,
    });
  };



  async function fetchUserLures() {
    console.log(token);
    const url = environment.host + "api/get-lures-for-user";
    let res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        'x-app-auth': token
      },
    });
    console.log(res);
    data = await responseDataHandler(res, false);
    console.log(data);
    if (data) {
      setLures(data);
    }
  }

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
          {loadTranslations('profile')}
        </Text>
      </ScrollView>
      {lures === null ? (
        <Text>You have no lures.</Text>
      ):(
        <FlatList
          data={lures}
          renderItem={({item}) => 
            <View
            style={[
              flex_style.flex,
              // flex_style.wrap,
              flex_style.spaceBetween
            ]}>
              <View
                style={[
                  flex_style.flex,
                  flex_style.wrap,
                  flex_style.spaceBetween,
                  flex_style.width70
                ]}>
                <Text>{item["model"]} from {item["brand"]}</Text>
                <Text>Colors:{item["color1"]} & {item["color2"]}</Text>
                <Text>Size:{item["size"]}</Text>
                <Text>Weight:{item["weight"]}</Text>
                <Text>Brand:{item["brand"]}</Text>
                <Text>Type:{item["type"]}</Text>
                <Text>Price:{item["price"]}</Text>
              </View>
              <View style={[
                flex_style.flexEnd,
                flex_style.width30
                ]}>
                <Image source={{uri: item["image"]}} style={{width: 100, height: 50}}/>
              </View>
            </View>}
          keyExtractor={(item, index) => index.toString()}
        />
      )}
    </View>
  );
}