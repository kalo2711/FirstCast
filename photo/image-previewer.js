import React from "react";
import { Image, StyleSheet, View } from "react-native";
// import EditPost from "./edit-post";
import { reactIfView } from "../global/global-functions";
import { height, width } from "../global/global-constants";

export default function ImagePreviewer(props){
    
  return (
    <View height={height}>
        {reactIfView(!!props.photoURI,
          <Image
            source={{ uri: props.photoURI }}
            resizeMode= "cover"
            style={[ component_styles.backgroundVideo ]}
          />
        )}
        {/* <EditPost position={"absolute"} bottom={0} photoURI={props.photoURI} nullifyURI={props.nullifyPhotoURI} /> */}
    </View>
  );
}
    
const component_styles = StyleSheet.create({
  backgroundVideo: {
    height: height,
    width: width,
    position: "absolute",
    top: 0,
    left: 0,
    alignItems: "stretch",
    right: 0
  }
});