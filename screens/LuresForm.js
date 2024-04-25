import React, { useState, useEffect } from "react";
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
import { NAV_CONDITIONS_FORM, NAV_CONDITIONS_RESULTS, NAV_LURES_FORM, NAV_REQUEST_LURE_FORM, SpacingMedium, height, primary_color, secondary_color_faded, width } from "../global/global-constants";
import Tooltip, { TooltipChildrenContext } from 'react-native-walkthrough-tooltip';
import { getNextTutorialForPage, updateTutorialAndGetNext } from "../global/utils/tutorial.utils";
import { getAuthToken } from "../global/utils/auth.utils";

//DO NOT SHIP
import * as SecureStore from 'expo-secure-store'
import { SECURE_STORE_ITEM_KEY } from '../global/global-constants'
import Icon from "react-native-ico-material-design";

export default function LuresForm({ navigation }) {
  const [brandAndModelDataset, setBrandAndModelDataset] = useState([]);
  const [chosenItem, setChosenItem] = useState(null);
  const [lureOptionIdSelected, setLureOptionIdSelected] = useState(null);
  const [lureOptions, setLureOptions] = useState(null);
  const [brandAndModalVisible, setBrandAndModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentTutorial, setCurrentTutorial] = useState(null);
  const [initialLoad, setInitialLoad] = useState(true);

  useEffect(() => {
    const getTut = async () => {
      const tut = await getNextTutorialForPage(NAV_LURES_FORM)
     setCurrentTutorial(tut)
    }
   if (initialLoad) {
     getTut();
     setInitialLoad(false)
    }
 }, []);

  const handleFormSubmit = () => {
    navigation.navigate(NAV_CONDITIONS_RESULTS, {
      lureOptionsId: lureOptionIdSelected ? lureOptionIdSelected : 3581,
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

  //DEBUG SETTING DO NOT PUSH TO MAIN
  async function nukeCache(){
    await SecureStore.setItemAsync(SECURE_STORE_ITEM_KEY, '');
    alert('you done goofed')
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
          {loadTranslations("selectLure")}
        </Text>
          {reactIfView(currentTutorial == 'brandOrModel',
          <View style={[flex_style.flex, flex_style.width100]}>
          <Tooltip
          contentStyle={[{backgroundColor: primary_color, height: 50}]}
          backgroundColor={'rgba(0,0,0,0)'}
          isVisible={currentTutorial == 'brandOrModel'}
          content={<Text style={[text_style.fontColorWhite]}>{loadTranslations("tutBrandOrModel")}</Text>}
          placement="top"
              onClose={async () => { setBrandAndModalVisible(true); setCurrentTutorial(await updateTutorialAndGetNext('brandOrModel', NAV_LURES_FORM))}}
          >
            <TooltipChildrenContext.Consumer>
                {({ tooltipDuplicate }) => (
                  reactIfView(!tooltipDuplicate,
                    <View style={[{height:Platform.OS === 'android' ? 50 : 0, width: width}]}></View>
                    )
              )}
            </TooltipChildrenContext.Consumer>
            </Tooltip>
          </View>
          )}
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
                  <View style={[{ flex: 1, height: height, padding: 20, paddingTop: Platform.OS == 'ios' ? 80 : 0 }]}>
                    <DropdownWithModal noItemsPlaceholder={"noLures"} parentSetModalVisible={setBrandAndModalVisible} setSelectedItem={item => onBrandAndModelSelect(item)} dataset={brandAndModelDataset} onChangeText={ text => onChangeText(text)}></DropdownWithModal>
                  </View>
                </Modal>
            </View>
        }
          {reactIfView(currentTutorial == 'selectOptions' && lureOptions?.length > 0,
          <View style={[flex_style.flex, flex_style.width100]}>
          <Tooltip
          contentStyle={[{backgroundColor: primary_color, height: 50}]}
          backgroundColor={'rgba(0,0,0,0)'}
          isVisible={currentTutorial == 'selectOptions'}
          content={<Text style={[text_style.fontColorWhite]}>{loadTranslations("tutSelectOptions")}</Text>}
          placement="top"
              onClose={async () => {setCurrentTutorial(await updateTutorialAndGetNext('selectOptions', NAV_LURES_FORM))}}
          >
            <TooltipChildrenContext.Consumer>
                {({ tooltipDuplicate }) => (
                  reactIfView(!tooltipDuplicate,
                    <View style={[{height:Platform.OS === 'android' ? 50 : 0, width: width}]}></View>
                    )
              )}
            </TooltipChildrenContext.Consumer>
            </Tooltip>
          </View>
          )}
        {reactIfView(chosenItem?.id && !isLoading,
          <View style={[flex_style.flex, flex_style.column, flex_style.center, flex_style.width100]}>
            {lureOptions?.map((option, index) => 
              <View key={index} style={[flex_style.flex, flex_style.column, flex_style.center]}>
                <TouchableOpacity style={[flex_style.flex, flex_style.column, flex_style.center, flex_style.width100, padding_styles.vertical_space_md, {paddingBottom:SpacingMedium, backgroundColor: lureOptionIdSelected == option.id ? secondary_color_faded : 'transparent'}]}
                onPress={() => setLureOptionIdSelected(option.id)}>
                  <Image style={[img_styles.rectangle_image_s]} source={{uri: option?.image}}></Image>
                  <Text style={[text_style.bold, text_style.xs]}>{option?.brand}</Text>
                  <Text style={[text_style.bold, text_style.xs]}>{option?.model}</Text>
                  {reactIfView(index==0 && currentTutorial == 'optionDescritpion',
                  <View style={[flex_style.flex, flex_style.width100]}>
                  <Tooltip
                  contentStyle={[{backgroundColor: primary_color, height: 50}]}
                  backgroundColor={'rgba(0,0,0,0)'}
                  isVisible={currentTutorial == 'optionDescritpion'}
                  content={<Text style={[text_style.fontColorWhite]}>{loadTranslations("tutOptionDetails")}</Text>}
                  placement="top"
                      onClose={async () => setCurrentTutorial(await updateTutorialAndGetNext('optionDescritpion', NAV_LURES_FORM))}
                  >
                    <TooltipChildrenContext.Consumer>
                        {({ tooltipDuplicate }) => (
                          reactIfView(!tooltipDuplicate,
                            <View style={[{height:Platform.OS === 'android' ? 50 : 0, width: width}]}></View>
                            )
                      )}
                    </TooltipChildrenContext.Consumer>
                    </Tooltip>
                  </View>
                )}
                  <Text style={[text_style.bold, text_style.xs]}>{option?.color1}  {option?.color2 != option?.color1 ? ', '+option?.color2:''}</Text>
                  <Text style={[text_style.bold, text_style.xs]}>{option?.size} {loadTranslations("inch")}</Text>
                  <Text style={[text_style.bold, text_style.xs]}>{option?.weight} {loadTranslations("pound")}</Text>
                  <AddToMyLureButton option={option}/>   
                </TouchableOpacity>
              </View>
            )}
          </View>
        )}
        {reactIfView(!!isLoading && chosenItem?.id,
          <ActivityIndicator style={[margin_styles.bottom_lg]} size="large" color={primary_color} />
        )}
      </ScrollView>
      {reactIfView(currentTutorial == 'requestNewLure',
                  <View style={[flex_style.flex, flex_style.width100]}>
                  <Tooltip
                  contentStyle={[{backgroundColor: primary_color, height: 60}]}
                  backgroundColor={'rgba(0,0,0,0)'}
                  isVisible={currentTutorial == 'requestNewLure'}
                  content={<Text style={[text_style.fontColorWhite]}>{loadTranslations("tutRequestNewLure")}</Text>}
                  placement="top"
                      onClose={async () => setCurrentTutorial(await updateTutorialAndGetNext('requestNewLure', NAV_LURES_FORM))}
                  >
                    <TooltipChildrenContext.Consumer>
                        {({ tooltipDuplicate }) => (
                          reactIfView(!tooltipDuplicate,
                            <View style={[{height:Platform.OS === 'android' ? 50 : 0, width: width}]}></View>
                            )
                      )}
                    </TooltipChildrenContext.Consumer>
                    </Tooltip>
                  </View>
        )}
        <TouchableOpacity style={[btn_style.button, , btn_style.buttonReversed, btn_style.round, btn_style.buttonFullWidth, margin_styles.vertical_space_md]} onPress={event => navigate(NAV_REQUEST_LURE_FORM)}>
          <Text style={[text_style.bold, text_style.fontColorPrimary]}>{loadTranslations("requestNewLure")}</Text>
      </TouchableOpacity>
      {reactIfView(currentTutorial == 'submitButton',
                  <View style={[flex_style.flex, flex_style.width100]}>
                  <Tooltip
                  contentStyle={[{backgroundColor: primary_color, height: 80}]}
                  backgroundColor={'rgba(0,0,0,0)'}
                  isVisible={currentTutorial == 'submitButton'}
                  content={<Text style={[text_style.fontColorWhite]}>{loadTranslations("tutSubmit")}</Text>}
                  placement="top"
                      onClose={async () => setCurrentTutorial(await updateTutorialAndGetNext('submitButton', NAV_LURES_FORM))}
                  >
                    <TooltipChildrenContext.Consumer>
                        {({ tooltipDuplicate }) => (
                          reactIfView(!tooltipDuplicate,
                            <View style={[{height:Platform.OS === 'android' ? 50 : 0, width: width}]}></View>
                            )
                      )}
                    </TooltipChildrenContext.Consumer>
                    </Tooltip>
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
            {loadTranslations("findConditions")}
          </Text>
        </TouchableOpacity>
      </View>
  );
}


function AddToMyLureButton({option}) {
  const [buttonContent, setButtonContent] = useState(loadTranslations("addToMyLures"));
  const [buttonIcon, setButtonIcon] = useState('add-plus-button')
  //to be put into global/utils once we confirm it works
  async function addToMyLures(optionID, onPass, onFail, onFailDuplicate){
    try{
      const url = environment.host + '/api/add-to-user-lures'
      const token = await getAuthToken(false)
      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify({lureOption:optionID}),
        headers: {
          'Content-Type': 'application/json',
          'x-app-auth': token
        },
      });
      const json = await response.json();
      if(json?.error?.code === 'ER_DUP_ENTRY'){
        onFailDuplicate();
        return 
      }
      if(!json || json?.error){
          const errorMsg = json?.error ? json.error : 'AddToUserLures failed.';
          throw new Error(errorMsg)
      }
      console.log(json);
      onPass();
    }
    catch(e){
      console.error(e.stack);
      onFail();
    }
  }
  function onPass(){
    setButtonContent('Adding success');
    setButtonIcon('check-symbol');
  }
  function onFail(){
    setButtonContent('Adding Failed');
    setButtonIcon('close-button');
  }
  function onFailDupe(){
    setButtonContent('Lure already added');
    setButtonIcon('close-button');
  }
 

  return (
    <TouchableOpacity style={[btn_style.button, , btn_style.buttonReversed, btn_style.round, btn_style.buttonFullWidth, margin_styles.vertical_space_md]} onPress={event => { addToMyLures(option.id, onPass, onFail, onFailDupe) }}>
      <Icon name={buttonIcon}></Icon>
      <Text style={[text_style.bold, text_style.fontColorPrimary]}>{buttonContent}</Text>
    </TouchableOpacity>
  );
}