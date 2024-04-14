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
} from "react-native";
import { reactIfView } from "../global/global-functions";
import { SpacingLarge, height, width } from "../global/global-constants";

const ItemModal = ({ isVisible, items, onSelectItem }) => {
  return (
    <View>
      {reactIfView(
        isVisible,
        <TouchableWithoutFeedback onPress={onSelectItem}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              {items.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.itemButton}
                  onPress={() => onSelectItem(item)}
                >
                  <Text style={styles.itemText}>{item.brand + item.model}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </TouchableWithoutFeedback>
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
    setItems([...dataset]);
    if (dataset.length > 0) {
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
    setSelectedItem(item);
    setInputValue("");
    setIsModalVisible(false);
    Keyboard.dismiss();
  };

  return (
    <View style={styles.container}>
      <TextInput
        ref={inputRef}
        style={[styles.input, { marginBottom: isModalVisible ? 0 : 50 }]}
        value={inputValue}
        placeholder={placeholder}
        onFocus={toggleModal}
        onChangeText={onType}
      />
      {isModalVisible && (
        <ItemModal
          isVisible={isModalVisible}
          items={items}
          onSelectItem={handleSelectItem}
        />
      )}
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
  input: {
    width: width - SpacingLarge,
    height: 40,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
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
