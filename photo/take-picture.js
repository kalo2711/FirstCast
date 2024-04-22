import { TouchableOpacity } from 'react-native'
import { FontAwesome5 } from '@expo/vector-icons'
import { ICON_SIZE_S, SpacingSmall } from '../global/global-constants'
import { margin_styles } from '../global/global-styles'

/**
 * TakePicture Component for taking a picture using the camera and sends back the photo URI to the App Component
 * @param {props.sendPhotoURI} - Function that sets the photo URI to lastPhotoURI state
 * @param {props.cameraRef} - Reference to the Camera
 * @returns TouchableOpacity component which is the button for taking a picture
 */
export default function TakePicture(props) {
  return (
    <TouchableOpacity
      style={[margin_styles.horizontal_space_md]}
      onPress={async () => {
        if (props.cameraRef.current) {
          let photoURI = (await props.cameraRef.current.takePictureAsync()).uri
          props.sendPhotoURI(photoURI)
        }
      }}
    >
      <FontAwesome5
        name="camera"
        size={ICON_SIZE_S}
        padding={SpacingSmall}
        color="white"
      />
    </TouchableOpacity>
  )
}