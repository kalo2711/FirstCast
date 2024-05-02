import React, { useState } from 'react';
import { View, Text, TextInput, Modal,FlatList, Image } from 'react-native';
import FishSelectItem from "./fish-select-item";
import { loadTranslations } from './global/localization';
const FishSelect = ({ visible, selectedFish, onSelectFish }) => {
  const [searchText, setSearchText] = useState('');

  const fishData = [
    { id: 'atlanticSalmon', name: 'Atlantic Salmon', image: require('./assets/fish/atlanticSalmon.png') },
    { id: 'bass', name: 'Bass', image: require('./assets/fish/bass.jpg') },
    { id: 'brookTrout', name: 'Brook Trout', image: require('./assets/fish/brookTrout.jpg') },
    { id: 'brownTrout', name: 'Brown Trout', image: require('./assets/fish/brownTrout.jpg') },
    { id: 'burbot', name: 'Burbot', image: require('./assets/fish/burbot.jpg') },
    { id: 'catifsh', name: 'Catifsh', image: require('./assets/fish/catfish.jpg') },
    { id: 'chinookSalmon', name: 'Chinook Salmon', image: require('./assets/fish/chinook.jpg') },
    { id: 'crappie', name: 'Crappie', image: require('./assets/fish/crappie.jpg') },
    { id: 'lakeTrout', name: 'Lake Trout', image: require('./assets/fish/lakeTrout.jpg') },
    { id: 'ouinaniche', name: 'Ouinaniche', image: require('./assets/fish/ouananiche.jpg') },
    { id: 'perch', name: 'Perch', image: require('./assets/fish/perch.jpg') },
    { id: 'pike', name: 'Pike', image: require('./assets/fish/pike.jpg') },
    { id: 'rainbowTrout', name: 'Rainbow Trout', image: require('./assets/fish/rainbowTrout.jpg') },
    { id: 'steelhead', name: 'Steelhead', image: require('./assets/fish/steelhead.jpg') },
    { id: 'walleye', name: 'Walleye', image: require('./assets/fish/walleye.jpg') },
  ];

  const renderItem = ({ item }) => {
    let fish = item;
    const isSelected = selectedFish && selectedFish.id === item.id;
    return (
      <FishSelectItem onSelectFish={onSelectFish} isSelected={isSelected} fish={fish}></FishSelectItem>
    );
  };

  return (
    <Modal visible={visible} animationType="slide">
      <View style={{ flex: 1, padding: 20 }}>
        <TextInput
          style={{ marginBottom: 20, padding: 10, borderWidth: 1, borderColor: 'gray', borderRadius: 5 }}
          placeholder={loadTranslations('searchFish')}
          value={searchText}
          onChangeText={setSearchText}
        />
        <FlatList
          data={fishData.filter(fish => fish.name.toLowerCase().includes(searchText.toLowerCase()))}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        />
      </View>
    </Modal>
  );
};

export default FishSelect;
