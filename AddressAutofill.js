import React, { useState } from "react";
import { View } from "react-native";
import { AutocompleteDropdown } from "react-native-autocomplete-dropdown";
import {
  SpacingXLarge,
  primary_color,
  width,
  SpacingSmall,
  SpacingMedium,
} from "./global/global-constants";
import { environment } from "./environment";
import { getDeviceLanguage } from "./i18n/localization";
import { responseDataHandler } from "./global/global-functions";

export default function AddressAutofill(props) {
  /*
    HOW TO USE MODULE:
    <AddressAutofill addToListOfLocations={(x) => {console.log(x)}} placeholder='Enter Address' route={{params: {location: {lat: '45.46498616653648', long: '-73.79416660341609'}, radius: '100'}}}/>
    */
  const [autofilledLocations, setAutofilledLocations] = useState([]);

  function updateName(array) {
    array = array.map((x) => ({
      title: x.name + ", " + x.secondaryName,
      id: x.place_id,
      place_id: x.place_id,
      secondaryName: x.secondaryName,
    }));
    return array;
  }

  let onSelectedValue = (selectedLocationEvent) => {
    const placeId = autofilledLocations
      .filter((item) => item.title === selectedLocationEvent.title)
      .map((item) => item.place_id);

    const name = autofilledLocations
      .filter((item) => item.title === selectedLocationEvent.title)
      .map((item) => item.title);

    const selectedLocation = { placeId: placeId[0], name: name[0] };
    props.addToListOfLocations(selectedLocation);
  };

  const getter = (value) => {
    getAutofilledLocations(value);
  };

  const createQueryParametersForAutofill = (lat, lang, radius, value) => {
    return (
      "lat=" +
      lat +
      "&lang=" +
      lang +
      "&radius=" +
      radius +
      "&input=" +
      value +
      "&language=" +
      getDeviceLanguage()
    );
  };

  const getAutofilledLocations = async (value) => {
    let params;
    if (props.route.params) {
      params = props.route.params;
    } else {
      params = props.params;
    }
    const url =
      environment.host +
      "api/locations/autofillLocations?" +
      createQueryParametersForAutofill(
        params.location.lat,
        params.location.long,
        params.radius,
        value
      );
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    let resp = await responseDataHandler(response);
    resp = updateName(
      resp?.autocompletedLocations ? resp?.autocompletedLocations : []
    );
    setAutofilledLocations(resp);
  };

  return (
    <AutocompleteDropdown
      inputContainerStyle={{ width: width - SpacingMedium }}
      clearOnFocus={true}
      clearOnBlur={true}
      closeOnSubmit={false}
      onChangeText={getter}
      onSelectItem={(event) => {
        if (event?.title) {
          onSelectedValue(event);
        }
      }}
      dataSet={autofilledLocations}
      textInputProps={{
        style: {
          color: primary_color,
          height: SpacingXLarge,
          width: "90%",
        },
        placeholder: props.placeholder,
        autoCorrect: false,
        autoCapitalize: "none",
      }}
    />
  );
}
