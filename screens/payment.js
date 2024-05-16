import React, { useState, useEffect } from "react";
import { useStripe } from '@stripe/stripe-react-native';
import {
  View,
  Text,
  ScrollView,
  Image,
  FlatList,
  StyleSheet,
  Pressable,
  TouchableOpacity
} from "react-native";
import {
  btn_style,
  flex_style,
  padding_styles,
  text_style,
  img_styles,
  margin_styles
} from "../global/global-styles";
import {
  primary_color,
  black,
  NAV_LURES_RESULTS,
  tutorial_styles,
  ICON_SIZE_S,
  SpacingExtraSmall,
  RES_VALID
} from "../global/global-constants";
import { loadTranslations } from "../global/localization";
import { MaterialIcons, FontAwesome5 } from "@expo/vector-icons";
import { environment } from "../global/environment";
import { reactIfView, responseDataHandler } from "../global/global-functions";
import { getAuthToken } from "../global/utils/auth.utils";
import { getNextTutorialForPage } from "../global/utils/tutorial.utils";
import TutorialTooltip from "./TutorialTooltip";

export default function Intent() {
  const [intetnId, setIntentId] = useState('');
  const { initPaymentSheet, presentPaymentSheet } = useStripe();

  const createIntent = async () => {
    const url = `${environment.host}/payments/intent`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-app-auth": getAuthToken(),
      },
      body: JSON.stringify({amount: 1250})
    });
    

    let responseJSON = await response.json();
    if (responseJSON.status === RES_VALID) {
      return responseJSON.paymentIntent;
    } else {
      return null;
    }
    // setIntentId(data.paymentIntent);
  };

  const onCheckout = async () => {
    // 1. Create a payment intent
    const response = await createIntent();
    console.log(response);
    // 2. Initialize the Payment sheet
    const { error: paymentSheetError } = await initPaymentSheet({
		  merchantDisplayName: 'Example, Inc.',
		  paymentIntentClientSecret: response.data.paymentIntent,
		  defaultBillingDetails: {
		    name: 'Jane Doe',//change to profile name
		  },
		});

		if (paymentSheetError) {
		  Alert.alert('Something went wrong', paymentSheetError.message);
      console.log("no good 2");
		  return;
		}
    console.log("here2");
    // 3. Present the Payment Sheet from Stripe
    const { error: paymentError } = await presentPaymentSheet();

    if (paymentError) {
      Alert.alert(`Error code: ${paymentError.code}`, paymentError.message);
      return;
    }
    console.log("here3");
    // 4. If payment ok -> create the order
    onCreateOrder();
  };

  const onCreateOrder = async () => {
    const result = await createOrder({
      items: cartItems,
      subtotal,
      deliveryFee,
      total,
      customer: {
        name: 'Vadim',
        address: 'My home',
        email: 'vadim@notjust.dev',
      },
    });

    if (result.data?.status === 'OK') {
      Alert.alert(
        'Order has been submitted',
        `Your order reference is: ${result.data.data.ref}`
      );
      dispatch(cartSlice.actions.clear());
    }
  };

  return (
    <ScrollView
      nestedScrollEnabled={true}
      contentContainerStyle={[
        flex_style.flex,
        flex_style.flexContainer,
        padding_styles.safetyTop,
        padding_styles.space_md,
        { flexWrap: "wrap" },
      ]}
    >
      <View
        style={[
          flex_style.flex,
          flex_style.width100,
          flex_style.spaceBetween
        ]}>
        <TouchableOpacity
          onPress={() => {
            onCheckout();
          }}
          style={[
            btn_style.button,
            btn_style.buttonOneThirdWidth,
            btn_style.buttonReversed,
            margin_styles.vertical_space_l,
          ]}
        >
          <Text
            style={[
              text_style.primaryColor,
              text_style.bold,
              flex_style.width100,
              text_style.alignCenter,
            ]}
          >4.99$ </Text>
          <Text>per month </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            onCheckout();
          }}
          style={[
            btn_style.button,
            btn_style.buttonOneThirdWidth,
            btn_style.buttonReversed,
            margin_styles.vertical_space_l,
          ]}
        >
          <Text
            style={[
              text_style.primaryColor,
              text_style.bold,
              flex_style.width100,
              text_style.alignCenter,
            ]}
          >9.99$ </Text>
          <Text>per year </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            onCheckout();
          }}
          style={[
            btn_style.button,
            btn_style.buttonOneThirdWidth,
            btn_style.buttonReversed,
            margin_styles.vertical_space_l,
          ]}
        >
          <Text
            style={[
              text_style.primaryColor,
              text_style.bold,
              flex_style.width100,
              text_style.alignCenter,
            ]}
          >75$ </Text>
          <Text>for life </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};
