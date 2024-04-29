import React, { useState, useEffect, useRef } from "react";
import { environment } from "../global/environment";
import {
  Alert,
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from "react-native";
import {
  btn_style,
  flex_style,
  img_styles,
  margin_styles,
  padding_styles,
  text_style,
} from "../global/global-styles";
import { getDeviceLanguage, loadTranslations } from "../global/localization";
import { responseDataHandler } from "../global/global-functions";
import { height } from "../global/global-constants";
import { getAuthToken, setAuthToken} from '../global/utils/auth.utils';
import { terms, terms_fr } from '../authentication/terms';



export default function LuresForm({ navigation }) {
  const [token, setToken] = useState(null);
  const [profile, setProfile] = useState({});
  const [lures, setLures] = useState([]);
  const [editScreen, setEditScreen] = useState(false);
  const [term, setTerm] = useState(getDeviceLanguage().includes("fr") ? terms_fr : terms);

  useEffect(() => {
    async function getData(){
      const t = await getAuthToken(false);
      setToken(t);
    }
    getData();
  }, []);

  useEffect(() => {
    if (token !== null){
      fetchUserLures();
      fetchProfileInfo();
    }
  }, [token]);

  async function fetchProfileInfo(){
    const url = environment.host + "api/user/get/profileInfo";
    let res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        'x-app-auth': token
      },
    });
    data = await responseDataHandler(res, false);
    if (data) {
      data["user"]["displayName"] = data["user"]["displayName"].split('_')[0];
      setProfile(data["user"]);
    }
  }

  async function fetchUserLures() {
    const url = environment.host + "api/get-lures-for-user";
    let res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        'x-app-auth': token
      },
    });
    data = await responseDataHandler(res, false);
    if (data) {
      setLures(data);
    }
  }

  function showTerms(){
    Alert.alert(loadTranslations("generalTerm"), term, [
      {
        text: "ok",
        style: 'cancel',
      }
    ])
  }


  if (!editScreen){
    return (
      <View style={[padding_styles.space_md,{ backgroundColor: 'white', height: height}]}>
        <TouchableOpacity
          onPress={() => editScreen ? setEditScreen(false) : setEditScreen(true)}
          style={[
            btn_style.button,
            btn_style.round, 
            btn_style.buttonVerySmall,
            margin_styles.top_md,
            
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
            {loadTranslations("edit")}
          </Text>
        </TouchableOpacity>
        <ScrollView
          contentContainerStyle={[
            flex_style.flex,
            flex_style.flexContainer
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
            {profile["displayName"]}'s {loadTranslations('profile')}
          </Text>
        </ScrollView>
        {lures === null ? (
          <Text>{loadTranslations("noUserLures")}</Text>
        ):(
          <FlatList
            data={lures}
            renderItem={({item}) => 
              <View
              style={[
                flex_style.flex,
                flex_style.spaceBetween
              ]}>
                <View
                  style={[
                    flex_style.flex,
                    flex_style.flexColumn,
                    flex_style.wrap,
                    flex_style.spaceBetween,
                    flex_style.width70,
                    margin_styles.vertical_space_md
                  ]}>
                  <Text>{item["model"]} from {item["brand"]}</Text>
                  <Text>Colors:{item["color1"]} & {item["color2"]} </Text>
                  <Text>Size:{item["size"]} </Text>
                  <Text>Weight:{item["weight"]} </Text>
                  <Text>Type:{item["type"]} </Text>
                  <Text>Price:{item["price"]} </Text>
                </View>
                <View style={[
                  flex_style.flexEnd,
                  flex_style.width30
                  ]}>
                  <Image source={{uri: item["image"]}} style={{width: 100, height: 100, resizeMode: 'contain',}}/>
                </View>
              </View>}
            keyExtractor={(item, index) => index.toString()}
          />
        )}
      </View>
    );
  }else {
    return(
      <View style={[padding_styles.space_md, padding_styles.safetyTop, { backgroundColor: 'white', height: height}]}>
        <Text
            style={[
              text_style.sm,
              text_style.primaryColor,
              margin_styles.bottom_md,
              text_style.bold,
              text_style.alignCenter,
            ]}
          >
            {loadTranslations("edit")} {loadTranslations("profile")}
          </Text>
        <TouchableOpacity
            onPress={() => setAuthToken(null)}
            style={[
              btn_style.button, 
              btn_style.round, 
              btn_style.buttonFullWidth, 
              margin_styles.vertical_space_l
              
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
              {loadTranslations("Logout")}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={showTerms}
            style={[
              btn_style.button, 
              btn_style.round, 
              btn_style.buttonFullWidth, 
              margin_styles.vertical_space_l
              
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
              {loadTranslations("terms")}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => editScreen ? setEditScreen(false) : setEditScreen(true)}
            style={[
              btn_style.button, 
              btn_style.round, 
              btn_style.buttonFullWidth, 
              margin_styles.vertical_space_l
              
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
              {loadTranslations("cancel")}
            </Text>
          </TouchableOpacity>
      </View>
    );
  }
}