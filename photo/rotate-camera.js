import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { ICON_SIZE, SpacingSmall } from "../global/global-constants";

/**
 * RotateCamera Component for rotating the side of the camera
 * @param {props.camera} - Camera Object
 * @returns TouchableOpacity component which is the button for taking a rotating the camera
 */
  
export default function RotateCamera(props){
  
  return (

    <TouchableOpacity
      onPress={() => {
        props.setCameraType(
          props.type === props.camera.Constants.Type.back
            ? props.camera.Constants.Type.front
            : props.camera.Constants.Type.back
        );
      }}
    >
      <Ionicons name="camera-reverse" size={ICON_SIZE} padding={SpacingSmall} color="white" />
    </TouchableOpacity>

  ) 
}