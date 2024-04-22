import React from "react";
import { View, Text, ScrollView, Image, FlatList } from "react-native";
import {
  btn_style,
  flex_style,
  padding_styles,
  text_style,
  img_styles,
} from "../global/global-styles";
import { primary_color, black } from "../global/global-constants";
import { loadTranslations } from "../global/localization";

export default function LuresResults({ route }) {
  const { lures } = route.params;

  const renderItem = ({ item }) => (
    <View
      style={[
        flex_style.flexColumn,
        padding_styles.space_md,
        flex_style.width100,
        btn_style.buttonFullColor,
      ]}
    >
      <Image
        source={{ uri: item.image }}
        style={[img_styles.square_image_md, padding_styles.space_md]}
      />
      <Text
        style={[
          text_style.md,
          text_style.fontColorBlack,
          padding_styles.space_s,
        ]}
      >
        {loadTranslations("type")}: {item.type}
      </Text>
      <Text
        style={[
          text_style.md,
          text_style.fontColorBlack,
          padding_styles.space_s,
        ]}
      >
        {loadTranslations("color")}: {item.color}
      </Text>
      <Text
        style={[
          text_style.md,
          text_style.fontColorBlack,
          padding_styles.space_s,
        ]}
      >
        {loadTranslations("weight")}: {item.weight}
      </Text>
      <Text
        style={[
          text_style.md,
          text_style.fontColorBlack,
          padding_styles.space_s,
        ]}
      >
        {loadTranslations("effectivenessPercentage")}: {item.effectiveness}%
      </Text>
    </View>
  );

  return (
    <ScrollView
      contentContainerStyle={[
        flex_style.flex,
        flex_style.flexContainer,
        padding_styles.safetyTop,
        padding_styles.space_md,
      ]}
    >
      <Text
        style={[
          text_style.xl,
          text_style.primaryColor,
          text_style.bold,
          text_style.alignCenter,
          padding_styles.space_md,
        ]}
      >
        {loadTranslations("recommendedLures")}
      </Text>

      <FlatList
        data={lures}
        renderItem={renderItem}
        keyExtractor={(item, index) => `lure-${index}`}
        contentContainerStyle={flex_style.flex}
      />
    </ScrollView>
  );
}
