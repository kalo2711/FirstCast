import React, { useEffect } from 'react'
import {
  TouchableOpacity,
  Text,
  View,
  TextInput,
  Alert,
  Image,
  Platform,
} from 'react-native'
import { Formik } from 'formik'
import * as yup from 'yup'

import { API_FORGOT_PASSWORD, API_LOGIN, AUTH_HOST, CANCEL, COLOR_ERROR, COLOR_NORMAL, DATA, EMAIL, FORM_INPUT, IOS, MESSAGE, PASSWORD, POST, STATUS, VALID } from '../global/global-constants'
import { responseDataHandler } from '../global/global-functions'
import {
  btn_style,
    flex_style,
    form_style,
    img_styles,
    margin_styles,
    padding_styles,
    text_style,
  } from '../global/global-styles'
  import {
    setAuthToken,
    updateTokenInDatabase,
  } from '../global/utils/auth.utils'
import { loadTranslations } from '../global/localization'
import { environment } from "../global/environment"

/**
 * @description This class is used to display the log in form
 * where the user can log in or reset their password
 */
function LogIn(props) {
  const loginValidationSchema = yup.object().shape({
    email: yup
      .string()
      .email(loadTranslations("generalCalidEmail"))
      .required(loadTranslations("generalEmailRequire")),
    password: yup.string().required(loadTranslations("generalPasswordRequire")),
  })

  const [error, setError] = React.useState(null)
  const [isIOS, setIsIOS] = React.useState(Platform.OS === IOS)

  useEffect(() => {
  }, )


  async function onSignInTap(data) {
    const url = environment[AUTH_HOST] + API_LOGIN
    try {
      const response = await fetch(url, {
        method: POST,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      let resp = await responseDataHandler(response)
      if (resp) {
        const token = resp.jwt
        await setAuthToken(token)
        updateTokenInDatabase(token, props.socketId)
      } else {
        setError(resp.message)
      }
    } catch (e) {
      setError(loadTranslations("generalSignInError") + e)
    }
  }

  const onForgotTap = (email) => {
    Alert.alert(
      loadTranslations("generalPasswordReset"),
      loadTranslations("generalPasswordResetSendEmail"),
      [
        {
          text: loadTranslations("cancel"),
          style: CANCEL,
        },
        { text: loadTranslations("reset"), onPress: () => resetOption(email) },
      ],
    )
  }

  async function resetOption(valueEmail) {
    const url = environment[AUTH_HOST] +  API_FORGOT_PASSWORD
    const userEmail = {
      email: valueEmail,
    }

    try {
      const response = await fetch(url, {
        method: POST,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userEmail),
      })
      let responseJSON = await response.json()
      if (responseJSON[STATUS] == VALID) {
        setError(responseJSON[DATA][MESSAGE])
      }
    } catch (e) {
      setError(loadTranslations("generalResetEmailError") + e)
    }
  }

  const invalidUserAlert = () => {
    Alert.alert(
      loadTranslations("generalAccountBlocked"),
      loadTranslations("generalAppleIdRevoked"),
      [{ text: OKAY  }],
    )
  }

  return (
    <View style={[flex_style.one, flex_style.alignCenter, padding_styles.safetyTop]}>
      <Image
        style={[
          img_styles.icon_md,
          padding_styles.space_xs,
          margin_styles.space_xs,
        ]}
        source={require('../assets/adaptive-icon.png')}
      />
      <Formik
      initialValues={{ email: '', password: '' }}
      validateOnMount={true}
      onSubmit={(values) => onSignInTap(values)}
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
        <View style={flex_style.width90}>
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
            className={FORM_INPUT}
            onChangeText={handleChange(EMAIL)}
            onBlur={handleBlur(EMAIL)}
            value={values.email}
          />

          <TextInput
            style={[
              margin_styles.vertical_space_md,
              form_style.formControl,form_style.formControlFullWidth,
              {
                borderColor:
                  errors.password && touched.password ? COLOR_ERROR : COLOR_NORMAL,
              },
            ]}
            placeholder={loadTranslations("password")}
            placeholderTextColor={COLOR_NORMAL}
            className={FORM_INPUT}
            secureTextEntry={true}
            onChangeText={handleChange(PASSWORD)}
            onBlur={handleBlur(PASSWORD)}
            value={values.password}
          />

          {error && (
            <Text style={[text_style.error, margin_styles.vertical_space_xs]}>
              {error}
            </Text>
          )}

          <View style={[margin_styles.vertical_space_md]}>
            <View opacity={!isValid ? 0.5 : 1}>
              <TouchableOpacity
                style={[
                  btn_style.button, btn_style.buttonBlack, btn_style.round
                ]}
                disabled={!isValid}
                onPress={handleSubmit}
              >
                <Text style={[text_style.xs, text_style.fontColorWhite, text_style.bold]}>{loadTranslations("signin")}</Text>
              </TouchableOpacity>
            </View>
            </View>

            <View
              style={[{ opacity: !errors.email && values.email ? 1 : 0.5 }]}
            >
              <TouchableOpacity
                style={[btn_style.button, btn_style.buttonBlackReversed, btn_style.round]}
                disabled={!errors.email && values.email ? false : true}
                onPress={() => onForgotTap(values.email)}
              >
                <Text style={[text_style.xs, text_style.bold]}>{loadTranslations("forgotPassword")}</Text>
              </TouchableOpacity>
            </View>
          </View>
      )}
      </Formik>
    </View>
  )
}
export default LogIn
