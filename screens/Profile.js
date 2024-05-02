import React, { useState, useEffect, useRef } from "react";
import { environment } from "../global/environment";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
  StyleSheet
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
import { responseDataHandler} from "../global/global-functions";
import { height, NAV_EDIT_PROFILE } from "../global/global-constants";
import { getAuthToken, setAuthToken} from '../global/utils/auth.utils';
import { terms, terms_fr } from '../authentication/terms';



export default function Profile({ navigation }) {
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

  function handleEditNav(){
    navigation.navigate(NAV_EDIT_PROFILE, {
      token: token,
      profile: profile
    });
  }

  const styles = StyleSheet.create({
    itemContainer: {
      flexDirection: 'row',
      padding: 25,
      alignItems: 'center',
      marginVertical: 7,          
      marginHorizontal: 10,   
      borderRadius: 20,        
      backgroundColor: 'rgba(247, 255, 247, 0.8)',
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.22,
      shadowRadius: 2.22,
      elevation: 3,
    },
    detailsContainer: {
      flex: 1,
      marginLeft: 3,
    }
  });
  
  return (
    <View style={[padding_styles.space_md,{ backgroundColor: 'white', height: height}]}>
      <View
        style={[
          flex_style.flex,
          flex_style.width100,
          flex_style.spaceBetween,
          padding_styles.space_md_vertical
        ]}
      >
        <Text
          style={[
            text_style.sm,
            text_style.primaryColor,
            text_style.bold,
          ]}
        >
          {profile["displayName"]}'s {loadTranslations('profile')}
        </Text>
        <TouchableOpacity
          onPress={handleEditNav}
          style={[
            btn_style.button,
            btn_style.round, 
            btn_style.buttonVerySmall,
          ]}
        >
        <Text
          style={[
            text_style.fontColorWhite,
            text_style.bold,
            text_style.alignCenter,
          ]}
        >
          {loadTranslations("edit")}
        </Text>
        </TouchableOpacity>
      </View>
      {lures === null ? (
        <Text>{loadTranslations("noUserLures")}</Text>
      ):(
        <FlatList
          data={lures}
          renderItem={({item}) => 
          <View style={styles.itemContainer}>
            <Image source={{ uri: item.image }} style={[img_styles.rectangle_image_xs, { width: 100 }]} />
            <View style={styles.detailsContainer}>
              <Text style={{ fontWeight: 'bold' }}>{item.brand} - {item.model}</Text>
              <Text>{loadTranslations('type')}: {item.type}</Text>
              <Text>{loadTranslations('colors')}: {item.color1}/{item.color2}</Text>
              <Text>{loadTranslations('weight')}: {item.weight}oz</Text>
              <Text style={{ fontWeight: 'bold' }}>{loadTranslations('price')}: ${item.price}</Text>
            </View>
          </View>}
          keyExtractor={(item, index) => index.toString()}
        />
      )}
    </View>
  );
}