import { TouchableOpacity } from "react-native";
import { MaterialIcons,Entypo } from "@expo/vector-icons";
import { ICON_SIZE, SpacingSmall } from "../global/global-constants";
import { Camera } from "expo-camera";

export default function ControlFlash(props){

  return (

    <TouchableOpacity
      onPress={() => {
        props.setFlashType(
          props.flashType === Camera.Constants.FlashMode.torch
            ? props.camera.Constants.FlashMode.off
            : props.camera.Constants.FlashMode.torch
        );
      }}>
      {
        props.flashType === Camera.Constants.FlashMode.torch ? 
          <MaterialIcons name="flash-off" size={ICON_SIZE} padding={SpacingSmall} color="white" /> :
          <Entypo name="flash" size={ICON_SIZE} padding={SpacingSmall} color="white" />          
      }
    </TouchableOpacity>

    )
}