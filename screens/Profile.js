import React, { useState, useEffect, useRef } from "react";
import { environment } from "../global/environment";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Platform,
  StatusBar,
  TextInput,
  FlatList,
  StyleSheet,
  Modal,
  ActivityIndicator
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
import { height, ICON_SIZE_XS, NAV_EDIT_PROFILE, primary_color } from "../global/global-constants";
import { getAuthToken, setAuthToken} from '../global/utils/auth.utils';
import { terms, terms_fr } from '../authentication/terms';
import Icon from "react-native-ico-material-design";


export default function Profile({ navigation }) {
  const [token, setToken] = useState(null);
  const [profile, setProfile] = useState({});
  const [lures, setLures] = useState([]);
  const [editScreen, setEditScreen] = useState(false);
  const [term, setTerm] = useState(getDeviceLanguage().includes("fr") ? terms_fr : terms);

  const [myLuresOpen, setMyLuresOpen] = useState(false);

  useEffect(() => {
    async function getData(){
      const t = await getAuthToken(false);
      setToken(t);
    }
    getData();
  }, []);

  useEffect(() => {
    if (token !== null){
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

  

  function handleEditNav(){
    navigation.navigate(NAV_EDIT_PROFILE, {
      token: token,
      profile: profile
    });
  }

  return (
    <View style={[padding_styles.space_md,padding_styles.safetyTop,{ backgroundColor: 'white', height: height}]}>
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
      {token !== null && (
        <>
          <TouchableOpacity
            onPress={() => {
              setMyLuresOpen(!myLuresOpen);
            }}
            style={[
              btn_style.button,
              btn_style.round,
              btn_style.buttonFullWidth,
              btn_style.buttonReversed,
              flex_style.flex,
            ]}
          >
            <Text
              style={[
                text_style.primaryColor,
                text_style.bold,
                text_style.alignCenter,
              ]}
            >
              {loadTranslations("profileLures")}
            </Text>
            <Icon style={[margin_styles.left_s]} size={ICON_SIZE_XS} name={myLuresOpen? 'expand-arrow':'expand-button'} color={primary_color}></Icon>
          </TouchableOpacity>
          {myLuresOpen && (
            <MyLures
              data={lures}
              visible={myLuresOpen}
              setVisible={() => { setMyLuresOpen(false); }}
              token={token}
            />
          )}
        </>
      )}
    </View>
  );
}

function MyLures({ visible,token}){

  const [data,setData] = useState([]);
  const [loading,setLoading] = useState(false);
  
  useEffect(()=>{
    try {
      if (visible) {
          async function fetchUserLures() {
            setLoading(true);
            const url = environment.host + "api/get-lures-for-user";
            let res = await fetch(url, {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                'x-app-auth': token
              },
            });
            json = await responseDataHandler(res, false);
            if (json) {
              setData(json);
              setLoading(false);
            }
          }
          fetchUserLures();
      }
    }
    catch(e){
      console.error(e);
      setData([]);
      setLoading(false);
    }
    
  },[visible])

  const styles = StyleSheet.create({
    itemContainer: {
      flexDirection: 'row',
      padding: 10,
      alignItems: 'center',
      marginVertical: 7,          
      marginHorizontal: 10,   
      borderRadius: 20,        
      backgroundColor: 'rgb(251, 255, 251)',
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
    
      <View style={{ flex: 1,paddingTop: Platform.OS === 'ios' ? 65 : StatusBar.currentHeight, padding: 20 }}>
         {loading?
         <ActivityIndicator style={[margin_styles.bottom_lg,{flex: 1}]} size="large" color={primary_color}/>:
         (data.length === 0?
          <Text style={{flex: 1}}>{loadTranslations('noUserLures')}</Text>:
          <FlatList
            data={data}
            renderItem={({ item }) =>
              <View style={styles.itemContainer}>
                <Image source={{ uri: item.image }} style={[img_styles.rectangle_image_s, { width: 100 }]} />
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