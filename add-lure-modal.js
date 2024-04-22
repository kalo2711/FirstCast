import React, { useState } from 'react';
import { ScrollView, TextInput, Modal, Text, View, TouchableOpacity, Alert, ActivityIndicator} from 'react-native';
import { loadTranslations } from "./global/localization";
import { btn_style, flex_style, form_style, margin_styles, text_style } from "./global/global-styles";
import { Picker as NativePicker } from '@react-native-picker/picker';
import Photo from "./photo/photo";
import { SpacingFormXLarge, SpacingMedium, SpacingXLarge, VALID, primary_color, secondary_color, white } from "./global/global-constants";
import { environment } from "./global/environment";
import { navigateBack, responseDataHandler } from "./global/global-functions";
import { getAuthToken } from "./global/utils/auth.utils";

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
    const token = await getAuthToken(false)
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
      <ScrollView style={{ flex: 1, padding: 20 }}>
        <Text style={[text_style.sm, text_style.bold, margin_styles.bottom_md, text_style.primaryColor, text_style.alignCenter]}>
            {loadTranslations("requestNewLure")}
        </Text>
        <View style={[flex_style.flex, flex_style.spaceBetween]}>
          <Text style={[{marginRight: SpacingMedium, width: SpacingFormXLarge}]}>{loadTranslations("store")}</Text>
          <TextInput
            style={[form_style.formControl, form_style.formControlHalfWidth , margin_styles.bottom_md]}
            value={store}
            placeholder="Bass Pro Shops"
            onChangeText={setStore}
            />
        </View>
        <View style={[flex_style.flex, flex_style.spaceBetween]}>
          <Text style={[{marginRight: SpacingMedium, width: SpacingFormXLarge}]}>{loadTranslations("brand")}</Text>
          <TextInput
            style={[form_style.formControl, form_style.formControlHalfWidth , margin_styles.bottom_md]}
            placeholder={"Rapala"}
            value={brand}
            onChangeText={setBrand}
            />
        </View>
        <View style={[flex_style.flex, flex_style.spaceBetween]}>
          <Text style={[{marginRight: SpacingMedium, width: SpacingFormXLarge}]}>{loadTranslations("model")}</Text>
          <TextInput
            style={[form_style.formControl, form_style.formControlHalfWidth , margin_styles.bottom_md]}
            value={model}
            onChangeText={setModel}
            />
        </View>

        <View style={[flex_style.flex, flex_style.spaceBetween]}>
          <Text style={[{marginRight: SpacingMedium, width: SpacingFormXLarge}]}>{loadTranslations("price")}</Text>
          <TextInput
            style={[form_style.formControl, form_style.formControlHalfWidth , margin_styles.bottom_md]}
            value={price}
            keyboardType="numeric"
            onChangeText={setPrice}
            />
        </View>
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
        <View style={[flex_style.flex, flex_style.spaceBetween]}>

          <View style={[flex_style.flex, {width: SpacingFormXLarge}]}>
            <Text>{loadTranslations("weight")}</Text>
            <Text style={[form_style.form_control_required]}>*</Text>
          </View>

          <TextInput
            style={[form_style.formControl, form_style.formControlHalfWidth , margin_styles.bottom_md]}
            value={weight}
            onChangeText={setWeight}
            keyboardType="numeric"
            />
        </View>

        <View style={[flex_style.flex, flex_style.spaceBetween, margin_styles.bottom_sm]}>
          <View style={[flex_style.flex, {width: SpacingFormXLarge}]}>

            <Text style={[text_style.xs, text_style.bold]}>
              {loadTranslations("type")}
            </Text>
            <Text style={[form_style.form_control_required]}>*</Text>
          </View>

          <NativePicker
            style={[{width: 200}]}
            selectedValue={type}
            onValueChange={(itemValue, itemIndex) => setType(itemValue)}
          >
            {lure_type.map((option) => (
              <NativePicker.Item key={option.id} label={option.lureType} value={option.lureType} />
            ))}
          </NativePicker>
        </View>
        
        <View style={[flex_style.flex, flex_style.spaceBetween, margin_styles.bottom_sm]}>
        <Text style={[text_style.xs, text_style.bold]}>
            {loadTranslations("primaryColor")}
          </Text>
          <NativePicker
            style={[{width: 200}]}
            selectedValue={color1}
            onValueChange={(itemValue, itemIndex) => setColor1(itemValue)}
          >
            {color_options.map((option) => (
              <NativePicker.Item key={option.id} label={loadTranslations(option.color)} value={option.color} />
            ))}
            </NativePicker>
          </View>

        <View style={[flex_style.flex, flex_style.spaceBetween, margin_styles.bottom_sm]}>
          <Text style={[text_style.xs, text_style.bold]}>
            {loadTranslations("secondaryColor")}
          </Text>
          <NativePicker
            style={[{width: 200}]}
            selectedValue={color2}
            onValueChange={(itemValue, itemIndex) => setColor2(itemValue)}
          >
            {color_options.map((option) => (
              <NativePicker.Item key={option.id} label={loadTranslations(option.color)} value={option.color} />
            ))}
          </NativePicker>
        </View>
        <View style={[margin_styles.bottom_lg]}>
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
