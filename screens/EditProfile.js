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
import { height, NAV_PROFILE } from "../global/global-constants";
import { setAuthToken} from '../global/utils/auth.utils';
import { terms, terms_fr } from '../authentication/terms';



export default function EditProfile({ navigation, route }) {
  const { token } = route.params;
  const { profile } = route.params.profile
  const [term, setTerm] = useState(getDeviceLanguage().includes("fr") ? terms_fr : terms);

  function showTerms(){
    Alert.alert(loadTranslations("generalTerm"), term, [
      {
        text: "ok",
        style: 'cancel',
      }
    ])
  }

  function handleProfileNav(){
    navigation.navigate(NAV_PROFILE);
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
          onPress={() => navigation.navigate(NAV_PROFILE)}
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