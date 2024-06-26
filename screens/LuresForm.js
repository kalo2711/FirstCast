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
  Button,
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
import { ICON_SIZE_XS, NAV_CONDITIONS_FORM, NAV_CONDITIONS_RESULTS, NAV_LURES_FORM, NAV_REQUEST_LURE_FORM, SpacingMedium, height, primary_color, secondary_color_faded, tutorial_styles, width } from "../global/global-constants";
import Tooltip, { TooltipChildrenContext } from 'react-native-walkthrough-tooltip';
import { getNextTutorialForPage, updateTutorialAndGetNext } from "../global/utils/tutorial.utils";
import Icon from "react-native-ico-material-design";
import { addToMyLures } from "../global/utils/add-to-my-lures.util";
import TutorialTooltip from "./TutorialTooltip";
import { setAuthToken } from "../global/utils/auth.utils";

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
      lureOptionsId: lureOptionIdSelected,
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
          contentStyle={[{backgroundColor: primary_color, height: 60}]}
          backgroundColor={'rgba(0,0,0,0)'}
          isVisible={currentTutorial == 'brandOrModel'}
          content={<Text style={[text_style.fontColorWhite]}>{loadTranslations("tutBrandOrModel")}</Text>}
          placement="top"
              onClose={async () => { setCurrentTutorial(await updateTutorialAndGetNext('brandOrModel', NAV_LURES_FORM));
            }}
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
                  <TutorialTooltip conditions={currentTutorial == 'lureSearch'}                 
                  style={tutorial_styles.doubleLine}
                  tutorial='lureSearch'
                  translations='tutLureSearch'
                  tutRoute={NAV_LURES_FORM}
                  setCurrentTutorial={setCurrentTutorial}
                  />
                    <DropdownWithModal noItemsPlaceholder={"noLures"} parentSetModalVisible={setBrandAndModalVisible} setSelectedItem={item => onBrandAndModelSelect(item)} dataset={brandAndModelDataset} onChangeText={ text => onChangeText(text)}></DropdownWithModal>
                <TouchableOpacity
                  onPress={() => { setBrandAndModalVisible(false) }}
                  style={[btn_style.button, btn_style.round, btn_style.buttonReversed, margin_styles.top_md, flex_style.flex]}
                >
                  <Text style={[text_style.primaryColor,
                  text_style.bold,
                  text_style.alignCenter]}>{loadTranslations('close')}</Text>
                </TouchableOpacity>
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
                <TouchableOpacity style={[flex_style.flex, flex_style.column, flex_style.center, flex_style.width100, padding_styles.vertical_space_md,
                { padding: SpacingMedium, borderWidth: lureOptionIdSelected == option.id ? 10 : 0, borderRadius: 50, borderColor: secondary_color_faded }, margin_styles.vertical_space_l]}
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

                  <TutorialTooltip conditions={currentTutorial == 'addToLures' && lureOptions?.length > 0 && index === 0}                 
                  style={tutorial_styles.singleLine}
                  tutorial='addToLures'
                  translations='tutAddToLures'
                  tutRoute={NAV_LURES_FORM}
                  setCurrentTutorial={setCurrentTutorial}
                  />
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
          style={[btn_style.button, btn_style.round, btn_style.buttonFullWidth, lureOptionIdSelected ? null : btn_style.disabled]}
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


function AddToMyLureButton({ option }) {
  const [buttonContent, setButtonContent] = useState(loadTranslations("addToMyLures"));
  const [buttonIcon, setButtonIcon] = useState('add-plus-button')
  const [iconColor, setIconColor] = useState('black');
  const [isLoading, setLoading] = useState(false);

  async function onButtonPress() {
    try {
      if (!isLoading) {
        setLoading(true);
        await addToMyLures(option.id, onPass, onFail, onFailDupe);
        setLoading(false);
      }
    }
    catch (e) {
      console.error(e);
      setLoading(false);
    }
  }


  function onPass() {
    setButtonContent(loadTranslations('addToMyLuresSucceed'));
    setButtonIcon('check-symbol');
    setIconColor('green');
  }
  function onFail() {
    setButtonContent(loadTranslations('addToMyLuresFail'));
    setButtonIcon('close-button');
    setIconColor('red');
  }
  function onFailDupe() {
    setButtonContent(loadTranslations('addToMyLuresDupe'));
    setButtonIcon('close-button');
    setIconColor('red')
  }

  return (
    <View>
      <TouchableOpacity enabled={false} style={[btn_style.button, btn_style.buttonBlackReversed, btn_style.round, btn_style.buttonFullWidth, margin_styles.vertical_space_md]} onPress={onButtonPress} activeOpacity={isLoading ? 1 : 0.2}>
        {isLoading ?
          <View style={[padding_styles.space_s, flex_style.flex, flex_style.center]}>
            <ActivityIndicator style={[]} size="large" color={primary_color} />
          </View>
          :
          <View style={[flex_style.flex, flex_style.center, padding_styles.space_md_horizontal]}>
            <Icon style={[margin_styles.horizontal_space_s]} size={ICON_SIZE_XS} name={buttonIcon} color={iconColor}></Icon>
            <Text style={[text_style.bold, text_style.fontColorBlack]}>{buttonContent}</Text>
          </View>
        }
      </TouchableOpacity>
    </View>

  );
}