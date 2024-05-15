import React, { useState, useEffect } from 'react';
import { 
  ScrollView,
   TextInput,
    Modal,
    Text,
    View,
    TouchableOpacity, 
    Alert, 
    ActivityIndicator, 
    Platform,
    StatusBar
} from 'react-native';
import { loadTranslations } from "./global/localization";
import { btn_style, flex_style, form_style, margin_styles, text_style } from "./global/global-styles";
import { Picker as NativePicker } from '@react-native-picker/picker';
import Photo from "./photo/photo";
import { 
  SpacingFormXLarge, 
  SpacingMedium, 
  SpacingXLarge, 
  VALID, 
  primary_color, 
  secondary_color, 
  white,
  IOS,
  NAV_REQUEST_LURE_FORM,
  width
} from "./global/global-constants";
import { environment } from "./global/environment";
import { navigateBack, responseDataHandler } from "./global/global-functions";
import { getAuthToken } from "./global/utils/auth.utils";
import Tooltip, { TooltipChildrenContext } from 'react-native-walkthrough-tooltip';
import {reactIfView} from "./global/global-functions";
import { getNextTutorialForPage, updateTutorialAndGetNext } from "./global/utils/tutorial.utils";


const AddLureModal = (props) => {
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [type, setType] = useState('topwater');
  const [color1, setColor1] = useState('');
  const [color2, setColor2] = useState('');
  const [size, setSize] = useState('');
  const [weight, setWeight] = useState('');
  const [price, setPrice] = useState('');
  const [store, setStore] = useState('');
  const [photoURI, setPhotoURI] = useState('');
  const [loading, setLoading] = useState(false);
  const [currentTutorial, setCurrentTutorial] = useState(null);
  const [initialLoad, setInitialLoad] = useState(true);

  const lure_type = [
  {id: 0, lureType: "topwater"},
  {id: 1, lureType: "chatterbait"},
  {id: 2, lureType: "jig"},
  {id: 3, lureType: "harness"},
  {id: 4, lureType: "float"},
  {id: 5, lureType: "softbait"},
  {id: 6, lureType: "swimbait"},
  {id: 7, lureType: "spinnerbait"},
  {id: 8, lureType: "crankbait"},
  {id: 9, lureType: "jerkbait"},
  {id: 10, lureType: "spoon"}]

  const color_options = [
    {id: 0, color: "blue"},
    {id: 1, color: "white"},
    {id: 2, color: "brown"},
    {id: 3, color: "black"},
    {id: 4, color: "red"},
    {id: 5, color: "pink"},
    {id: 6, color: "gold"},
    {id: 7, color: "grey"},
    {id: 8, color: "green"},
    {id: 9, color: "chartreuse"},
    {id: 10, color: "purple"},
    {id: 11, color: "salmon"},
    {id: 12, color: "orange"},
    {id: 13, color: "yellow"}
  ];

  useEffect(() => {
    const getTut = async () => {
     const tut = await getNextTutorialForPage(NAV_REQUEST_LURE_FORM)
     setCurrentTutorial(tut)
    }
   if (initialLoad) {
     getTut();
     setInitialLoad(false)
    }
  }, []);

  function onCancel() {
    navigateBack()
  }

  async function onSubmit() {
    setLoading(true)
    let formData = new FormData()
    formData.append("brand", brand)
    formData.append("model", model)
    formData.append("type", type)
    formData.append("color1", color1)
    formData.append("color2", color2)
    formData.append("size", size)
    formData.append("weight", weight)
    formData.append("price", price)
    formData.append("store", store)

    let file_name;
    if (!!photoURI){
      file_name = (photoURI.split("/"))[11];
      formData.append("format", "jpg");
      formData.append("media", {
        name: file_name,
        uri: photoURI,
        type: 'image/jpg'
      });
    }

    const url = environment.host + '/api/custom/addLure'
    const token = await getAuthToken();
    const response = await fetch(url, {
      method: 'POST',
      body: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
        'x-app-auth': token
      },
    })
    resp = await responseDataHandler(response)
    setLoading(false)

    Alert.alert('', resp != null ? loadTranslations("requestSucceed") : loadTranslations("requestFailed"), [
      {
        text: 'OK',
        onPress: () => resp != null ? navigateBack() : null,
      },
    ]);
  }

  return (
      <ScrollView style={{ flex: 1, paddingTop: Platform.OS === 'ios' ? 50 : StatusBar.currentHeight, padding: 20 }}>
        <Text style={[text_style.sm, text_style.bold, margin_styles.bottom_md, text_style.primaryColor, text_style.alignCenter]}>
            {loadTranslations("requestNewLure")}
        </Text>

        {reactIfView(currentTutorial == 'store', <Tooltip
          contentStyle={[{backgroundColor: primary_color, height: 60}]}
          backgroundColor={'rgba(0,0,0,0)'}
          isVisible={currentTutorial == 'store'}
          content={<Text style={[text_style.fontColorWhite]}>{loadTranslations("tutLureStore")}</Text>}
          placement="top"
          onClose={async () => {setCurrentTutorial(await updateTutorialAndGetNext('store', NAV_REQUEST_LURE_FORM))}}
        >
          <TooltipChildrenContext.Consumer>
            {({ tooltipDuplicate }) => (
              reactIfView(!tooltipDuplicate,
                <View style={[{height:Platform.OS === 'android' ? 50 : 0, width: width}]}></View>
              )
            )}
          </TooltipChildrenContext.Consumer>
        </Tooltip>
        )}
        <View style={[flex_style.flex, flex_style.spaceBetween]}>
          <Text style={[{marginRight: SpacingMedium, width: SpacingFormXLarge}]}>{loadTranslations("store")}</Text>
          
          <TextInput
            style={[form_style.formControl, form_style.formControlHalfWidth , margin_styles.bottom_md]}
            value={store}
            placeholder="Bass Pro Shops"
            onChangeText={setStore}
            />
        </View>

        {reactIfView(currentTutorial == 'brand', <Tooltip
          contentStyle={[{backgroundColor: primary_color, height: 60}]}
          backgroundColor={'rgba(0,0,0,0)'}
          isVisible={currentTutorial == 'brand'}
          content={<Text style={[text_style.fontColorWhite]}>{loadTranslations("tutLureBrand")}</Text>}
          placement="top"
          onClose={async () => {setCurrentTutorial(await updateTutorialAndGetNext('brand', NAV_REQUEST_LURE_FORM))}}
        >
          <TooltipChildrenContext.Consumer>
            {({ tooltipDuplicate }) => (
              reactIfView(!tooltipDuplicate,
                <View style={[{height:Platform.OS === 'android' ? 50 : 0, width: width}]}></View>
              )
            )}
          </TooltipChildrenContext.Consumer>
        </Tooltip>
        )}
        <View style={[flex_style.flex, flex_style.spaceBetween]}>
          <Text style={[{marginRight: SpacingMedium, width: SpacingFormXLarge}]}>{loadTranslations("brand")}</Text>
          <TextInput
            style={[form_style.formControl, form_style.formControlHalfWidth , margin_styles.bottom_md]}
            placeholder={"Rapala"}
            value={brand}
            onChangeText={setBrand}
            />
        </View>

        {reactIfView(currentTutorial == 'model', <Tooltip
          contentStyle={[{backgroundColor: primary_color, height: 60}]}
          backgroundColor={'rgba(0,0,0,0)'}
          isVisible={currentTutorial == 'model'}
          content={<Text style={[text_style.fontColorWhite]}>{loadTranslations("tutLureModel")}</Text>}
          placement="top"
          onClose={async () => {setCurrentTutorial(await updateTutorialAndGetNext('model', NAV_REQUEST_LURE_FORM))}}
        >
          <TooltipChildrenContext.Consumer>
            {({ tooltipDuplicate }) => (
              reactIfView(!tooltipDuplicate,
                <View style={[{height:Platform.OS === 'android' ? 50 : 0, width: width}]}></View>
              )
            )}
          </TooltipChildrenContext.Consumer>
        </Tooltip>
        )}
        <View style={[flex_style.flex, flex_style.spaceBetween]}>
          <Text style={[{marginRight: SpacingMedium, width: SpacingFormXLarge}]}>{loadTranslations("model")}</Text>
          <TextInput
            style={[form_style.formControl, form_style.formControlHalfWidth , margin_styles.bottom_md]}
            value={model}
            onChangeText={setModel}
            />
        </View>

        {reactIfView(currentTutorial == 'price', <Tooltip
          contentStyle={[{backgroundColor: primary_color, height: 60}]}
          backgroundColor={'rgba(0,0,0,0)'}
          isVisible={currentTutorial == 'price'}
          content={<Text style={[text_style.fontColorWhite]}>{loadTranslations("tutLurePrice")}</Text>}
          placement="top"
          onClose={async () => {setCurrentTutorial(await updateTutorialAndGetNext('price', NAV_REQUEST_LURE_FORM))}}
        >
          <TooltipChildrenContext.Consumer>
            {({ tooltipDuplicate }) => (
              reactIfView(!tooltipDuplicate,
                <View style={[{height:Platform.OS === 'android' ? 50 : 0, width: width}]}></View>
              )
            )}
          </TooltipChildrenContext.Consumer>
        </Tooltip>
        )}
        <View style={[flex_style.flex, flex_style.spaceBetween]}>
          <Text style={[{marginRight: SpacingMedium, width: SpacingFormXLarge}]}>{loadTranslations("price")}</Text>
          <TextInput
            style={[form_style.formControl, form_style.formControlHalfWidth , margin_styles.bottom_md]}
            value={price}
            keyboardType="numeric"
            onChangeText={setPrice}
            />
        </View>

        {reactIfView(currentTutorial == 'length', <Tooltip
          contentStyle={[{backgroundColor: primary_color, height: 60}]}
          backgroundColor={'rgba(0,0,0,0)'}
          isVisible={currentTutorial == 'length'}
          content={<Text style={[text_style.fontColorWhite]}>{loadTranslations("tutLureLength")}</Text>}
          placement="top"
          onClose={async () => {setCurrentTutorial(await updateTutorialAndGetNext('length', NAV_REQUEST_LURE_FORM))}}
          >
            <TooltipChildrenContext.Consumer>
              {({ tooltipDuplicate }) => (
                reactIfView(!tooltipDuplicate,
                  <View style={[{height:Platform.OS === 'android' ? 50 : 0, width: width}]}></View>
                )
              )}
            </TooltipChildrenContext.Consumer>
          </Tooltip>
        )}
        <View style={[flex_style.flex, flex_style.spaceBetween, flex_style.width100]}>
          <View style={[flex_style.flex, {width: SpacingFormXLarge}]}>
            <Text>{loadTranslations("size")}</Text>
            <Text style={[form_style.form_control_required]}>*</Text>
          </View>

          <TextInput
            style={[form_style.formControl, form_style.formControlHalfWidth , margin_styles.bottom_md]}
            value={size}
            onChangeText={setSize}
            keyboardType="numeric"
            />
        </View>
        
        {reactIfView(currentTutorial == 'weight', <Tooltip
          contentStyle={[{backgroundColor: primary_color, height: 60}]}
          backgroundColor={'rgba(0,0,0,0)'}
          isVisible={currentTutorial == 'weight'}
          content={<Text style={[text_style.fontColorWhite]}>{loadTranslations("tutLureWeight")}</Text>}
          placement="top"
          onClose={async () => {setCurrentTutorial(await updateTutorialAndGetNext('weight', NAV_REQUEST_LURE_FORM))}}
        >
          <TooltipChildrenContext.Consumer>
            {({ tooltipDuplicate }) => (
              reactIfView(!tooltipDuplicate,
                <View style={[{height:Platform.OS === 'android' ? 50 : 0, width: width}]}></View>
              )
            )}
          </TooltipChildrenContext.Consumer>
        </Tooltip>
        )}
        <View style={[flex_style.flex, flex_style.spaceBetween]}>
          <View style={[flex_style.flex, {width: SpacingFormXLarge}]}>
            <Text>{loadTranslations("weight")}</Text>
            <Text style={[form_style.form_control_required]}>*</Text>
          </View>

          <TextInput
            style={[form_style.formControl, form_style.formControlHalfWidth , margin_styles.bottom_xs]}
            value={weight}
            onChangeText={setWeight}
            keyboardType="numeric"
            />
        </View>

        {reactIfView(currentTutorial == 'type', <Tooltip
          contentStyle={[{backgroundColor: primary_color, height: 60}]}
          backgroundColor={'rgba(0,0,0,0)'}
          isVisible={currentTutorial == 'type'}
          content={<Text style={[text_style.fontColorWhite]}>{loadTranslations("tutLureType")}</Text>}
          placement="top"
          onClose={async () => {setCurrentTutorial(await updateTutorialAndGetNext('type', NAV_REQUEST_LURE_FORM))}}
        >
          <TooltipChildrenContext.Consumer>
            {({ tooltipDuplicate }) => (
              reactIfView(!tooltipDuplicate,
                <View style={[{height:Platform.OS === 'android' ? 50 : 0, width: width}]}></View>
              )
            )}
          </TooltipChildrenContext.Consumer>
        </Tooltip>
        )}
        <View style={[flex_style.flex, flex_style.spaceBetween, margin_styles.bottom_sm]}>
          <View style={[flex_style.flex, {width: SpacingFormXLarge}, { marginTop: 60 }]}>

            <Text style={[text_style.xs, text_style.bold]}>
              {loadTranslations("type")}
            </Text>
            <Text style={[form_style.form_control_required, { marginTop: 5 }]}>*</Text>
          </View>
          <View style={[form_style.pickerWrapper, { marginTop: -22 }]}>
          <NativePicker
            style={form_style.picker}
            selectedValue={type}
            onValueChange={(itemValue, itemIndex) => setType(itemValue)}
          >
            {lure_type.map((option) => (
              <NativePicker.Item key={option.id} label={option.lureType} value={option.lureType} />
            ))}
          </NativePicker>
          </View>
        </View>
        
        {reactIfView(currentTutorial == 'primaryColor', <Tooltip
          contentStyle={[{backgroundColor: primary_color, height: 40}]}
          backgroundColor={'rgba(0,0,0,0)'}
          isVisible={currentTutorial == 'primaryColor'}
          content={<Text style={[text_style.fontColorWhite]}>{loadTranslations("tutLurePrimaryColor")}</Text>}
          placement="top"
          onClose={async () => {setCurrentTutorial(await updateTutorialAndGetNext('primaryColor', NAV_REQUEST_LURE_FORM))}}
        >
          <TooltipChildrenContext.Consumer>
            {({ tooltipDuplicate }) => (
              reactIfView(!tooltipDuplicate,
                <View style={[{height:Platform.OS === 'android' ? 50 : 0, width: width}]}></View>
              )
            )}
          </TooltipChildrenContext.Consumer>
        </Tooltip>
        )}
        <View style={[flex_style.flex, flex_style.spaceBetween, margin_styles.bottom_sm]}>
          <Text style={[text_style.xs, text_style.bold, {marginTop: 60}]}>
              {loadTranslations("primaryColor")}
            </Text>
            <View style={[form_style.pickerWrapper, { marginTop: -20 }]}>
            <NativePicker
              style={form_style.picker}
              selectedValue={color1}
              onValueChange={(itemValue, itemIndex) => setColor1(itemValue)}
            >
              {color_options.map((option) => (
                <NativePicker.Item key={option.id} label={loadTranslations(option.color)} value={option.color} />
              ))}
            </NativePicker>
            </View>
          </View>
        
        {reactIfView(currentTutorial == 'secondaryColor', <Tooltip
          contentStyle={[{backgroundColor: primary_color, height: 40}]}
          backgroundColor={'rgba(0,0,0,0)'}
          isVisible={currentTutorial == 'secondaryColor'}
          content={<Text style={[text_style.fontColorWhite]}>{loadTranslations("tutLureSecondaryColor")}</Text>}
          placement="top"
          onClose={async () => {setCurrentTutorial(await updateTutorialAndGetNext('secondaryColor', NAV_REQUEST_LURE_FORM))}}
        >
          <TooltipChildrenContext.Consumer>
            {({ tooltipDuplicate }) => (
              reactIfView(!tooltipDuplicate,
                <View style={[{height:Platform.OS === 'android' ? 50 : 0, width: width}]}></View>
              )
            )}
          </TooltipChildrenContext.Consumer>
        </Tooltip>
        )}
        <View style={[flex_style.flex, flex_style.spaceBetween, margin_styles.bottom_sm]}>
          <Text style={[text_style.xs, text_style.bold, {alignSelf: 'center'}, {marginTop: 60}]}>
            {loadTranslations("secondaryColor")}
          </Text>
          <View style={[form_style.pickerWrapper, { marginTop: -20 }]}>
          <NativePicker
            style={form_style.picker}
            selectedValue={color2}
            onValueChange={(itemValue, itemIndex) => setColor2(itemValue)}
          >
            {color_options.map((option) => (
              <NativePicker.Item key={option.id} label={loadTranslations(option.color)} value={option.color} />
            ))}
          </NativePicker>
          </View>
        </View>

        {reactIfView(currentTutorial == 'photo', <Tooltip
          contentStyle={[{backgroundColor: primary_color, height: 60}]}
          backgroundColor={'rgba(0,0,0,0)'}
          isVisible={currentTutorial == 'photo'}
          content={<Text style={[text_style.fontColorWhite]}>{loadTranslations("tutLurePhoto")}</Text>}
          placement="top"
          onClose={async () => {setCurrentTutorial(await updateTutorialAndGetNext('photo', NAV_REQUEST_LURE_FORM))}}
        >
          <TooltipChildrenContext.Consumer>
            {({ tooltipDuplicate }) => (
              reactIfView(!tooltipDuplicate,
                <View style={[{height:Platform.OS === 'android' ? 50 : 0, width: width}]}></View>
              )
            )}
          </TooltipChildrenContext.Consumer>
        </Tooltip>
        )}
        <View style={[margin_styles.bottom_lg, margin_styles.top_md]}>
          <View style={[flex_style.flex, {width: SpacingFormXLarge}]}>
            <Text>{loadTranslations("lurePhoto")}</Text>
            <Text style={[form_style.form_control_required]}>*</Text>
          </View>
          <Photo setPhotoURI={event => setPhotoURI(event)}></Photo>
        </View>

        <TouchableOpacity
          style={[btn_style.button, btn_style.buttonReversed, btn_style.round, margin_styles.bottom_lg]}
          onPress={(event) => onCancel()}
        >
          <Text>
            {loadTranslations("cancel")}
          </Text>
        </TouchableOpacity>
        
        {reactIfView(currentTutorial == 'submit', <Tooltip
          contentStyle={[{backgroundColor: primary_color, height: 60}]}
          backgroundColor={'rgba(0,0,0,0)'}
          isVisible={currentTutorial == 'submit'}
          content={<Text style={[text_style.fontColorWhite]}>{loadTranslations("tutLureSubmit")}</Text>}
          placement="top"
          onClose={async () => {setCurrentTutorial(await updateTutorialAndGetNext('submit', NAV_REQUEST_LURE_FORM))}}
        >
          <TooltipChildrenContext.Consumer>
            {({ tooltipDuplicate }) => (
              reactIfView(!tooltipDuplicate,
                <View style={[{height:Platform.OS === 'android' ? 50 : 0, width: width}]}></View>
              )
            )}
          </TooltipChildrenContext.Consumer>
        </Tooltip>
        )}
        {!loading ?
          <TouchableOpacity
            disabled={!photoURI || !type || !size || !weight}
            style={[btn_style.button, margin_styles.bottom_lg, btn_style.round, (!photoURI || !type || !size || !weight) ? btn_style.disabled : null]}
            onPress={(event) => onSubmit()}
          >
            <Text style={[{color: (!photoURI || !type || !size || !weight) ? white : secondary_color}]}>
              {loadTranslations("submit")}
            </Text>
          </TouchableOpacity>
        : <ActivityIndicator style={[margin_styles.bottom_lg]} size="large" color={primary_color} />}
      </ScrollView>
  );
};

export default AddLureModal;
