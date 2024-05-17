import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  Keyboard,
  FlatList,
} from 'react-native';
import { SpacingLarge, width, black } from "../global/global-constants";
import { btn_style, flex_style, img_styles, margin_styles, text_style } from "../global/global-styles";
import { loadTranslations } from "../global/localization";
import { reactIfView } from "../global/global-functions";

const Item = ({item, onPress}) => (
  <TouchableOpacity
  style={[styles.itemButton, flex_style.flex, ,flex_style.alignCenter]}
  onPress={(event) =>onPress(item)}
>
  {(reactIfView(item.image,<Image style={[img_styles.icon_xxs, margin_styles.horizontal_space_md]} source={{ uri: item.image }} /> ))}
  <Text style={[styles.itemText, flex_style.one, flex_style.wrap]}>{item.title}</Text>
</TouchableOpacity>
);


const DropdownWithModal = ({ dataset, onChangeText, placeholder, setSelectedItem, parentSetModalVisible, noItemsPlaceholder, showCancelButton, simple }) => {
  const [inputValue, setInputValue] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [items, setItems] = useState([]);
  const inputRef = useRef(null);

  useEffect(() => {
    setItems([...dataset]);
      return () => {
        keyboardDidHideListener.remove();
      };
  }, [dataset]);
   
  const onType = (text) => {
    setInputValue(text);
    onChangeText(text);
  };
  
  const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
    setIsModalVisible(false);
  });

  const toggleModal = () => {
    setIsModalVisible(true);
  };

  const handleSelectItem = (item) => {
    setSelectedItem(item);
    setInputValue('');
    setIsModalVisible(false);
    Keyboard.dismiss();
  };

  const renderItem = ({ item }) => {
    return (
      <Item
      key={item.id.toString()}
      item={item}
      onPress={() =>{handleSelectItem(item)}}
    />
    );
  }

  return (
      <View style={[styles.container, {justifyContent: 'space-between'}]}>
        <TextInput
          ref={inputRef}
          style={[styles.input]}
          value={inputValue}
          placeholder={placeholder}
          placeholderTextColor={black}
          onFocus={toggleModal}
          onChangeText={onType}
              />
      {!!inputValue && (
        simple? 
        items.map((item) => renderItem({ item, key: item.id.toString() })) 
        :
        <FlatList
        nestedScrollEnabled={true}
        style={styles.modalContainer}
        data={items}
        renderItem={renderItem}
        keyExtractor={(item, index) => item.id.toString()}
      />
      )}
      {reactIfView(!!inputValue && items?.length < 1,
        <Text style={[text_style.alignCenter, text_style.xs, text_style.fontColorRed]}>{loadTranslations(noItemsPlaceholder)}</Text>
      )}
      {showCancelButton && 
        <TouchableOpacity style={[btn_style.button, btn_style.buttonBlack, btn_style.round, btn_style.buttonFullWidth, margin_styles.vertical_space_md]} onPress={event => parentSetModalVisible(false)}>
          <Text style={[text_style.bold, text_style.fontColorWhite]}>{loadTranslations("cancel")}</Text>
        </TouchableOpacity>
      }
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 10
  },
  modalContent: {
    height: 300, // Limit the height of the modal content
  },
  input: {
    width: width - SpacingLarge,
    height: 40,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5
  },
  itemButton: {
    padding: 10,
    borderBottomWidth: 1,
      borderColor: '#ccc',
    backgroundColor: 'rgba(230, 230, 230, 1)'
  },
  itemText: {
    fontSize: 16,
  },
});

export default DropdownWithModal;