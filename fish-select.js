import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Modal,FlatList, Image, Platform, TouchableOpacity, StatusBar, ActivityIndicator } from 'react-native';
import { environment } from "./global/environment";
import FishSelectItem from "./fish-select-item";
import { loadTranslations } from './global/localization';
import { btn_style, flex_style, margin_styles, text_style } from './global/global-styles';
import { primary_color } from "./global/global-constants";
const FishSelect = ({ visible, setVisible, selectedFish, onSelectFish,lat,long}) => {
  const [searchText, setSearchText] = useState('');
  const [locationFish,setLocationFish] = useState([]);
  const [loading,setLoading] = useState(false);
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
    { id: 'pike', name: 'Pike', image: require('./assets/fish/pike.jpg') },
    { id: 'perch', name: 'Perch', image: require('./assets/fish/perch.jpg') },
    { id: 'musky', name: 'Musky', image: require('./assets/fish/musky.jpg') },
    { id: 'rainbowTrout', name: 'Rainbow Trout', image: require('./assets/fish/rainbowTrout.jpg') },
    { id: 'steelhead', name: 'Steelhead', image: require('./assets/fish/steelhead.jpg') },
    { id: 'walleye', name: 'Walleye', image: require('./assets/fish/walleye.jpg') },
  ];

  useEffect(()=>{
    setLoading(true);
    const url = environment.host + `/api/species-per-location?lat=${lat}&long=${long}`
    fetch(url)
    .then(resp=>resp.json())
    .then(json=>{
      setLocationFish(fishData.filter(fish => json?.data?.includes(fish.name)));
    })
    .catch(e=>{
      console.error(e);
      setLocationFish([]);
    })
    .finally(()=>{
      setLoading(false);
    })
  },[visible])

  const renderItem = ({ item }) => {
    const isSelected = selectedFish && selectedFish.id === item.id;
    return (
      <FishSelectItem onSelectFish={onSelectFish} isSelected={isSelected} fish={item}></FishSelectItem>
    );
  };

  return (
    <Modal visible={visible} animationType="slide">
      <View style={{ flex: 1,paddingTop: Platform.OS === 'ios' ? 65 : StatusBar.currentHeight, padding: 20 }}>
        <TextInput
          style={{ marginBottom: 20, padding: 10, borderWidth: 1, borderColor: 'gray', borderRadius: 5, }}
          placeholder={loadTranslations('searchFish')}
          placeholderTextColor="#686868"
          value={searchText}
          onChangeText={setSearchText}
        />
        {
          loading ? <ActivityIndicator style={[margin_styles.bottom_lg,{flex: 1}]} size="large" color={primary_color}/>:
          (locationFish.length == 0?
            <Text style={{flex: 1}}>{loadTranslations('noFishInLocation')}</Text>:
            <FlatList
              data={locationFish.filter(fish => fish?.name?.toLowerCase()?.includes(searchText.toLowerCase()))}
              renderItem={renderItem}
              keyExtractor={(item) => item.id.toString()}
              ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
            />)
        }
        <TouchableOpacity
          onPress={() => { setVisible(false) }}
          style={[btn_style.button, btn_style.round, btn_style.buttonReversed, margin_styles.top_md, flex_style.flex]}
        >
          <Text style={[text_style.primaryColor,
          text_style.bold,
          text_style.alignCenter]}>{loadTranslations('close')}</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default FishSelect;
