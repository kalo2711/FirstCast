import React, { useState } from 'react';
import { View, Text, TextInput, Modal,FlatList, Image } from 'react-native';
import FishSelectItem from "./fish-select-item";
const FishSelect = ({ visible, selectedFish, onSelectFish }) => {
  const [searchText, setSearchText] = useState('');

  const fishData = [
    { id: 1, name: 'Atlantic Salmon', image: require('./assets/fish/atlanticSalmon.png') },
    { id: 2, name: 'Bass', image: require('./assets/fish/bass.jpg') },
    { id: 3, name: 'Brook Trout', image: require('./assets/fish/brookTrout.jpg') },
    { id: 4, name: 'Brown Trout', image: require('./assets/fish/brownTrout.jpg') },
    { id: 5, name: 'Burbot', image: require('./assets/fish/burbot.jpg') },
    { id: 6, name: 'Catifsh', image: require('./assets/fish/catfish.jpg') },
    { id: 7, name: 'Chinook Salmon', image: require('./assets/fish/chinook.jpg') },
    { id: 8, name: 'Crappie', image: require('./assets/fish/crappie.jpg') },
    { id: 9, name: 'Lake Trout', image: require('./assets/fish/lakeTrout.jpg') },
    { id: 10, name: 'Ouinaniche', image: require('./assets/fish/ouananiche.jpg') },
    { id: 11, name: 'Perch', image: require('./assets/fish/perch.jpg') },
    { id: 12, name: 'Pike', image: require('./assets/fish/pike.jpg') },
    { id: 13, name: 'Rainbow Trout', image: require('./assets/fish/rainbowTrout.jpg') },
    { id: 14, name: 'Steelhead', image: require('./assets/fish/steelhead.jpg') },
    { id: 15, name: 'Walleye', image: require('./assets/fish/walleye.jpg') },
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
          placeholder="Search fish..."
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
