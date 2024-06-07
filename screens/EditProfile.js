import React, { useState } from "react";
import {
  Alert,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import {
  btn_style,
  flex_style,
  margin_styles,
  padding_styles,
  text_style,
} from "../global/global-styles";
import { getDeviceLanguage, loadTranslations } from "../global/localization";
import { height, NAV_PROFILE, NAV_SUBSCRIPTION } from "../global/global-constants";
import { getAuthToken, setAuthToken} from '../global/utils/auth.utils';
import { terms, terms_fr } from '../authentication/terms';
import { environment } from "../global/environment";
import { responseDataHandler } from "../global/global-functions";



export default function EditProfile({ navigation, route }) {
  const [term, setTerm] = useState(getDeviceLanguage().includes("fr") ? terms_fr : terms);

  function showTerms(){
    Alert.alert(loadTranslations("generalTerm"), term, [
      {
        text: "ok",
        style: 'cancel',
      }
    ])
  }

  async function deleteAccount(){
    const url = environment.authHost + 'api/user/post/deleteUser'
    const token = await getAuthToken()
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'x-app-auth': token
      },
    })
    resp = await responseDataHandler(response)
    if (resp) {
      setAuthToken(null)
    }
  }

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
          onPress={showTerms}
          style={[
            btn_style.button, 
            btn_style.round, 
            btn_style.buttonFullWidth, 
            btn_style.buttonReversed,
            margin_styles.vertical_space_l
            
          ]}
        >
          <Text
            style={[
              text_style.bold,
              flex_style.width100,
              text_style.alignCenter,
            ]}
          >
            {loadTranslations("terms")}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate(NAV_SUBSCRIPTION, {
            token: route.token,
          })}
          style={[
            btn_style.button, 
            btn_style.round, 
            btn_style.buttonFullWidth, 
            btn_style.buttonReversed,
            margin_styles.vertical_space_l
            
          ]}
        >
          <Text
            style={[
              text_style.bold,
              flex_style.width100,
              text_style.alignCenter,
            ]}
          >
            Subscription
          </Text>
        </TouchableOpacity>
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
          onPress={deleteAccount}
          style={[
            btn_style.button, 
            btn_style.round, 
            btn_style.buttonFullWidth, 
            margin_styles.vertical_space_l,
            btn_style.red
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
            {loadTranslations("deleteAccount")}
          </Text>
        </TouchableOpacity>
    </View>
  );
}