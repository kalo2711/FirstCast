import React, { useState } from 'react'
import {
  Alert,
  TouchableOpacity,
  Text,
  View,
  TextInput,
  Image,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  ScrollView
} from 'react-native'
import { Formik } from 'formik'
import * as yup from 'yup'
 import { terms, terms_fr } from './terms'
import * as ImagePicker from 'expo-image-picker'
import { API_REGISTER, CODE, COLOR_ERROR, COLOR_NORMAL, DATA, DATE, DATE_TIME_ID, DISPLAYNAME, 
  EMAIL, ENCODING_BASE_64, ERROR, ERR_CANCELED, ER_DUP_ENTRY, FORM_INPUT, FR, GET, IMAGE_URI, INVALID, IOS, JPG, JWT, NO, OKAY, PASSWORD, 
  POSITION, POST, PROFILE, STATUS, SUCCESS, SpacingSmall, VALID} from '../global/global-constants'
import * as FileSystem from 'expo-file-system'

import {
    margin_styles,
    padding_styles,
    img_styles,
    flex_style,
    form_style,
    text_style,
    btn_style,
  } from '../global/global-styles'
import { setAuthToken, updateTokenInDatabase } from '../global/utils/auth.utils'
import { getDeviceLanguage, loadTranslations } from '../global/localization'
import { environment } from "../global/environment"

/**
 * @description This class is used to display the Sign Up form
 * where the user can register
 */
function SignUp(props) {
  
  const loginValidationSchema = yup.object().shape({
    displayName: yup.string().required(loadTranslations("generalNameRequire")),
    email: yup
      .string()
      .email(loadTranslations("validEmail"))
      .required(loadTranslations("emailRequire")),
    password: yup.string().required(loadTranslations("generalPasswordRequire")),
  })

  const [error, setError] = React.useState(null)
  const [isIOS, setIsIOS] = React.useState(Platform.OS === IOS)
  const [pickedDate, setPickedDate] = useState(new Date())
  const [mode, setMode] = useState(DATE)
  const [show, setShow] = useState(false)
  const [profileImage, setProfileImage] = useState(false)
  const [term, setTerm] = useState(getDeviceLanguage() === FR ? terms_fr : terms)

  
  const sendUserInformationToBackend = async (userInfor) => {
    const url = environment.authHost + API_REGISTER
    try {
      const response = await fetch(url, {
        method: POST,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userInfor),
      })
      let responseJSON = await response.json()
      if (responseJSON[STATUS] == VALID) {
        const token = responseJSON[DATA][JWT]
        setAuthToken(token)
        updateTokenInDatabase(token)
      } else {
        if (responseJSON[ERROR][CODE] == ER_DUP_ENTRY) {
          setError(loadTranslations('generalDuplicateEmailError')
            ,
          )
        } else {
          setError(responseJSON[ERROR][CODE])
        }
      }
    } catch (e) {
      setError(loadTranslations('generalThereWasAnError') + e)
    }
  }



  const onRegisterTap = (inputData) => {
    Alert.alert(loadTranslations("generalTerm"), term, [
      {
        text: loadTranslations("generalNo"),
        style: NO,
      },
      {
        text: loadTranslations("generalCancel"),
      },
      {
        text: loadTranslations("generalTermAgree"),
        onPress: () => registerOption(inputData),
      },
    ])
  }

  async function registerOption(inputData) {
    let newUser = ''
    if (inputData.appleToken) {
      newUser = inputData
    } else {
      const date =
        pickedDate.getDate() === new Date().getDate()
          ? null
          : pickedDate.getDate()

      newUser = {
        displayName: inputData.displayName,
        email: inputData.email,
        year: pickedDate.getFullYear(),
        month: pickedDate.getMonth(),
        day: pickedDate.getDay(),
        password: inputData.password,
        profileImage: profileImage,
        profileImageFormat: JPG,
        dob: date,
      }
    }
    await sendUserInformationToBackend(newUser)
  }

  const showAlertApple = () => {
    Alert.alert(
      loadTranslations("generalWarning"),
      loadTranslations("generalNoEmailAlert"),
      [{ text: OKAY }],
    )
  }

  const invalidUserAlert = () => {
    Alert.alert(
      loadTranslations("generalAccountBlocked"),
      loadTranslations("generalAppleIdRevoked"),
      [{ text: OKAY  }],
    )
  }

  let maxDate = new Date()
  maxDate.setDate(maxDate.getDate())

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    })

    if (!result.cancelled) {
      const base64 = await FileSystem.readAsStringAsync(result.uri, {
        encoding: ENCODING_BASE_64,
      })
      setProfileImage(base64)
    }
  }

  return (
    <ScrollView>
    <View style={[flex_style.one, flex_style.alignCenter, padding_styles.safetyTop]}>
      <Formik
        initialValues={{ displayName: '', email: '', password: '' }}
        validateOnMount={true}
        onSubmit={(values) => onRegisterTap(values)}
        validationSchema={loginValidationSchema}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          touched,
          errors,
          isValid,
        }) => (
          <View style={flex_style.width90} >
            <KeyboardAvoidingView behavior={POSITION} style={flex_style.one}>     
            <View style={[flex_style.flexColumn, flex_style.spaceEvenly]}>
              <Pressable onPress={pickImage}>
                {!profileImage ? (
                  <Image
                    style={[
                      img_styles.icon_md,       
                      padding_styles.space_xs,
                      margin_styles.space_xs,
                    ]}
                    source={require('../assets/adaptive-icon.png')}
                  />
                ) : (
                  <Image
                    source={{
                      uri: IMAGE_URI + profileImage.toString(),
                    }}
                    style={[
                      img_styles.icon_md,       
                      padding_styles.space_xs,
                      margin_styles.space_xs
                    ]}
                  />
                )}
              </Pressable>
            </View >
            <TextInput
              style={[
                form_style.formControl,form_style.formControlFullWidth,
                margin_styles.vertical_space_md,
                {
                  borderColor:
                    errors.displayName && touched.displayName ? COLOR_ERROR : COLOR_NORMAL,
                },
              ]}
              placeholder= {loadTranslations("displayName")}
              placeholderTextColor={COLOR_NORMAL}
              className={FORM_INPUT}
              onChangeText={handleChange(DISPLAYNAME)}
              onBlur={handleBlur(DISPLAYNAME)}
              value={values.displayName}
            />
            <TextInput
              style={[
                form_style.formControl,form_style.formControlFullWidth,
                margin_styles.vertical_space_md,
                {
                  borderColor:
                    (errors.email && touched.email) ||
                    (errors.email && values.email)
                      ? COLOR_ERROR
                      : COLOR_NORMAL,
                },
              ]}
              placeholder={loadTranslations("email")}
              placeholderTextColor={COLOR_NORMAL}
              className= {FORM_INPUT}
              onChangeText={handleChange(EMAIL)}
              onBlur={handleBlur(EMAIL)}
              value={values.email}
            />
            <TextInput
              style={[
                form_style.formControl,form_style.formControlFullWidth,
                margin_styles.vertical_space_md,
                {
                  borderColor:
                    errors.password && touched.password ? COLOR_ERROR : COLOR_NORMAL,
                },
              ]}
              placeholder={loadTranslations("password")}
              placeholderTextColor= {COLOR_NORMAL}
              className= {FORM_INPUT}
              secureTextEntry={true}
              onChangeText={handleChange(PASSWORD)}
              onBlur={handleBlur(PASSWORD)}
              value={values.password}
            />
            {/* <View >
              <View style={[margin_styles.vertical_space_md]}>
                <Button
                  onPress={showDatepicker}
                  title={
                    pickedDate.getDate() != new Date().getDate()
                      ? pickedDate.toDateString()
                      : loadTranslations("generalDateOfBirth")
                  }
                />
              </View>
              {show && (
                <DateTimePicker
                  testID={DATE_TIME_ID}
                  value={pickedDate}
                  mode={DATE}
                  is24Hour={true}
                  display="default"
                  onChange={onChange}
                  maximumDate={maxDate}
                />
              )}
            </View> */}
            {error && (
              <Text
                style={[
                  text_style.error,
                  {
                    marginBottom: SpacingSmall,
                    marginTop: SpacingSmall,
                  },
                ]}
              >
                {error.toString()}
              </Text>
            )}
            <View>
              <View style={[{ opacity: !isValid ? 0.5 : 1 }, margin_styles.vertical_space_md]}>
                <TouchableOpacity
                  style={[btn_style.button, btn_style.buttonBlack, btn_style.round]}
                  disabled={!isValid}
                  onPress={handleSubmit}
                >
                  <Text style={[text_style.fontColorWhite, text_style.bold]}>{loadTranslations("register")}</Text>
                </TouchableOpacity>
              </View>
            </View>

            </KeyboardAvoidingView>
          </View>
        )}
      </Formik>
    </View>
    </ScrollView>
  )
}


export default SignUp
