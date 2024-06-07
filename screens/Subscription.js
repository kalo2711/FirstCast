import React, { useState, useEffect } from "react";
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
import { 
  height, 
  NAV_PROFILE,
  MONTHLY_PRICE_ID,
  YEARLY_PRICE_ID,
  LIFETIME_PIRCE_ID,
   } from "../global/global-constants";
import { getAuthToken, setAuthToken} from '../global/utils/auth.utils';
import { terms, terms_fr } from '../authentication/terms';
import { environment } from "../global/environment";
import { responseDataHandler } from "../global/global-functions";



export default function Subscription({ navigation, route }) {
  const [sub, setSub] = useState({});
  const [cus, setCus] = useState({});
  const [date, setDate] = useState('');
  const [plan, setPlan] = useState('');
  const [last4,setLast4] = useState('');
  const [token, setToken] = useState("");

  useEffect(async () => {
    await fetchSubData();
    await fetchCusData();
    
    await fetchPayment(cus.invoice_settings.default_payment_method);
    getPlan(sub.sub.plan.id);
    getDate(sub.sub.start_date);
  }, []);

  function getPlan(id){
    if (id === MONTHLY_PRICE_ID){
      setPlan("monthly");
    }else if (id === YEARLY_PRICE_ID){
      setPlan("yearly");
    }else{
      setPlan("lifetime");
    }
  }

  function getDate(timestamp){
    let date = new Date(timestamp);
    setPlan(date.toString());
  }

  async function fetchSubData(){
    const url = environment.authHost + "api/user/subinfo";
    let res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        'x-app-auth': route.token
      }
    });
    
    const data = await responseDataHandler(res, false);
    if (data) {
      setSub(data);
    }
  }
  
  async function fetchCusData(){
    const url = environment.authHost + "api/user/customer";
    let res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        'x-app-auth': route.token
      },
    });
    const data = await responseDataHandler(res, false);
    if (data) {
      setCus(data);
    }else {
      return null;
    }
  }

  async function fetchPayment(id){
    const url = environment.host + "payments/paymentMethod";
    let res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({"paymentId": id})
    });
    const data = await responseDataHandler(res, false);
    if (data) {
      setLast4(data);
    }else {
      return null;
    }
  }

  async function cancelSub(){

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
          Subscription
        </Text>
        <Text
          style={[
            text_style.xs,
            text_style.primaryColor,
            margin_styles.bottom_md,
            text_style.bold,
          ]}
        >
          Plan: {plan}
        </Text>
        <Text
          style={[
            text_style.xs,
            text_style.primaryColor,
            margin_styles.bottom_md,
            text_style.bold,
          ]}
        >
          Date subscribed: {date}
        </Text>
        <Text
          style={[
            text_style.xs,
            text_style.primaryColor,
            margin_styles.bottom_md,
            text_style.bold,
          ]}
        >
          Payment Method: {last4}
        </Text>
        <TouchableOpacity
          onPress={cancelSub()}
          style={[
            btn_style.button, 
            btn_style.round, 
            btn_style.buttonFullWidth, 
            btn_style.buttonReversed,
            btn_style.red,
            margin_styles.vertical_space_l
            
          ]}
        >
          <Text
            style={[
              text_style.bold,
              text_style.fontColorWhite,
              flex_style.width100,
              text_style.alignCenter,
            ]}
          >
            cancel subscription
          </Text>
        </TouchableOpacity>
    </View>
  );
}