import React from 'react';
import { Text, TouchableOpacity, Image } from 'react-native';
import { flex_style, form_style, img_styles } from "./global/global-styles";
import { black, primary_color, secondary_color } from "./global/global-constants";
import { loadTranslations } from './global/localization';
const FishSelectItem = ({ onSelectFish, isSelected, fish }) => {

  return (
    <TouchableOpacity
      style={[flex_style.flex, flex_style.column, flex_style.center, form_style.formControl, flex_style.width100, {borderColor: isSelected  ? secondary_color : black}]}
      onPress={(event) => onSelectFish(fish)}
    >
      <Image source={fish.image} style={[img_styles.rectangle_image_s]} />
      <Text style={{ color: isSelected ? primary_color : 'black' }}>{loadTranslations(fish.name)} </Text>
    </TouchableOpacity>
  );
};

export default FishSelectItem;
