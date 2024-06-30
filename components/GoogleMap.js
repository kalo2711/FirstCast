import { StyleSheet, View, Text } from 'react-native'
import { flex_style, margin_styles } from '../global/global-styles'
import { useState, useEffect } from 'react'
import { width } from '../global/global-constants'
import MapView from 'react-native-maps'
import { Marker, PROVIDER_GOOGLE } from 'react-native-maps'

const LATITUDE_DELTA = 0.015;
const LONGITUDE_DELTA = 0.0121;

export default function GoogleMap(props) {
  const [region, setRegion] = useState({
    latitude: props?.location?.lat,
    longitude: props?.location?.lon,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  });


  const onRegionChangeComplete = (newRegion) => {
    props.setLocation({ lat: newRegion.latitude, lon: newRegion.longitude });
  };

  return (
    <View
      style={[
        flex_style.flex,
        flex_style.column,
        flex_style.center,
        {
          flex: 1,
          width: '100%',
        },
        margin_styles.vertical_space_xl,
      ]}
      min-height={width}
    >
      <View
        style={margin_styles.vertical_space_md}
        width={width}
        height={width}
        min-height={width}
      >
        <MapView
          provider={PROVIDER_GOOGLE}
          region={region}
          onRegionChangeComplete={onRegionChangeComplete}
          style={styles.map}
          min-height={width}
        >
          <Marker
            coordinate={{
              latitude: props?.location?.lat,
              longitude: props?.location?.lon,
            }}
          />
        </MapView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: '100%',
    height: '100%',
  },
});
