import { CameraView, useCameraPermissions } from 'expo-camera';
import React, { useRef, useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { height, SpacingLarge, width } from "../global/global-constants";
import ControlFlash from "./control-flash";
import ImagePreviewer from "./image-previewer.js";
import RotateCamera from "./rotate-camera";
import TakePicture from "./take-picture";
import { loadTranslations } from "../global/localization.js";
// import { useIsFocused } from '@react-navigation/native';

export default function Photo(props) {
  const [permission, requestPermission] = useCameraPermissions();
  // const [type, setType] = useState(Camera.Constants.Type.back);
  const [flashType, setFlashType] = useState("off");
  const [lastPhotoURI, setLastPhotoURI] = useState(null);
  const cameraRef = useRef(null);
  // const isFocused = useIsFocused();

  // Function for setting the photo URI to null
  // Passed down to DeleteTakenPicture Child Component
  nullifyPhotoURI = () => {
    setLastPhotoURI(null);
  }


  // Function for setting the photo URI to the picture taken by the camera
  // Passed down to TakePicture Child Component
  // sendPhotoURI = photoURI => {
  //   setLastPhotoURI(photoURI);
  //   props.setPhotoURI(setPhotoURI)
  // }

  function sendPhotoURI(photoURI) {
    setLastPhotoURI(photoURI);
    props.setPhotoURI(photoURI)
  }

  // Function for setting the Camera Type (front or back camera)
  // Passed down to RotateCamera Child Component
  setCameraType = type => {
    setType(type);
  }

  // Function for setting the Camera Flash Type (front or back camera)
  // Passed down to RotateCamera Child Component
  setFlash = type => {
    setFlashType(type);
  }

  // Function for updating the previwing status of the Camera before and after previwing the taken video
  // Passed down to VideoPreviewer Child Component
  updatePreviewingStatus = status => {
    updatePreviewStatus(status);
  }



  if (!permission?.granted) {
    // Camera permissions are not granted yet.
    return (
      <View>
        <Text style={{ textAlign: 'center' }}>${loadTranslations("cameraPerm")}</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  // Checks if the last Photo URI is not null and sets the image background to the previous Photo URI if it's true
  else if (lastPhotoURI !== null) {
    return (
      <ImagePreviewer photoURI={lastPhotoURI} nullifyPhotoURI={nullifyPhotoURI}></ImagePreviewer>
    );
  }

  return (
    <CameraView style={{ flex: 1 }} ref={cameraRef}>
      <View
        style={[ component_styles.buttonContainer ]}
      >
        <View style={[ component_styles.innerContainer]}>
          <ControlFlash setFlashType={event => setFlashType(flashType == 'on' ? 'off' : 'on')} flashType={flashType} />     
        </View>
        <View style={[ component_styles.innerContainer, component_styles.innerContainerBottom]}>
          <TakePicture sendPhotoURI={sendPhotoURI} cameraRef={cameraRef} />
        </View>
      </View>
    </CameraView>
  );
}

// Styles
const component_styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: "transparent",
    flex: 1,
    height: height,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 40, // Make the lower part not stick to the phone's main buttons
  },
  innerContainer: {
    display: "flex",
    flexDirection: "row",
    width: width,
    justifyContent: "space-between",
    alignItems: "center",
    padding: SpacingLarge
  },
  innerContainerBottom: {
    width: "auto"
  }
});