import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  Modal,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
  FlatList
} from "react-native";
import { reactIfView } from "../global/global-functions";
import { flex_style, form_style, img_styles, margin_styles } from "../global/global-styles";

const ItemModal = ({ isVisible, items, onSelectItem }) => {

  return (
    <View>
      {reactIfView(
        isVisible,
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <FlatList
                data={items.slice()}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={[styles.itemButton, flex_style.flex, ,flex_style.alignCenter]}
                    onPress={(event) => onSelectItem(item)}
                  >
                    <Image style={[img_styles.icon_xxs, margin_styles.horizontal_space_md]} source={{uri:item.image}}></Image>
                    <Text style={[styles.itemText, flex_style.one, flex_style.wrap]}>{item.title}</Text>
                  </TouchableOpacity>
                )}
                keyExtractor={(item, index) => index.toString()}
              />
            </View>
          </View>
      )}
    </View>
  );
};

const DropdownWithModal = ({
  dataset,
  onChangeText,
  placeholder,
  setSelectedItem,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [items, setItems] = useState([]);
  const inputRef = useRef(null);

  useEffect(() => {
    console.log('im getting DS')
    setItems([...dataset]);
    if (dataset?.length > 0) {
      openKeyboard();
    }
    return () => {
      keyboardDidHideListener.remove();
    };
  }, [dataset]);

  const onType = (text) => {
    setInputValue(text);
    onChangeText(text);
  };

  const keyboardDidHideListener = Keyboard.addListener(
    "keyboardDidHide",
    () => {
      setIsModalVisible(false);
    }
  );

  const toggleModal = () => {
    setIsModalVisible(true);
  };

  const openKeyboard = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleSelectItem = (item) => {
    console.log('getting selected')
    console.log(item)
    setSelectedItem(item);
    setInputValue("");
    setIsModalVisible(false);
    Keyboard.dismiss();
  };

  return (
    <View style={styles.container}>
      <TextInput
        ref={inputRef}
        style={[form_style.formControl]}
        value={inputValue}
        placeholder={placeholder}
        onFocus={toggleModal}
        onChangeText={text => onType(text)}
      />
        <ItemModal
          isVisible={!!inputValue}
          items={items}
          onSelectItem={item => handleSelectItem(item)}
        />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 10,
  },
  modalContent: {
    height: 300, // Limit the height of the modal content
  },
  itemButton: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "rgba(230, 230, 230, 1)",
  },
  itemText: {
    fontSize: 16,
  },
});

export default DropdownWithModal;
