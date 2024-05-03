import {
  primary_color,
  SpacingExtraSmall,
  SpacingSmall,
  SpacingMedium,
  SpacingLarge,
  width,
  primary_color_faded,
  height,
  headerLargeFont,
  white,
  black,
  lightgrey,
  grey_color,
  secondary_color
} from './global-constants'
import { StyleSheet } from 'react-native'

export const flex_style = StyleSheet.create({
  flex: {
    display: 'flex',
    flexDirection: 'row'
  },
  flexColumn: {
    display: 'flex',
    flexDirection: 'column'
  },
  wrap: {
    flexWrap: 'wrap'
  },
  one: {
    flex: 1
  },
  column: {
    flexDirection: 'column'
  },
  maxWidth: {
    width: width,
    padding: SpacingSmall,
    flexWrap: 'wrap'
  },
  flexEnd: {
    justifyContent: 'flex-end'
  },
  spaceBetween: {
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  spaceEvenly: {
    alignItems: 'center',
    justifyContent: 'space-evenly'
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  alignCenter: {
    alignItems: 'center',
  },
  justifyCenter: {
    justifyContent: 'center',
  },
  absoluteContainer: {
    position: 'absolute',
    backgroundColor: 'transparent'
  },
  absoluteContainerFull: {
    position: 'absolute',
    backgroundColor: 'transparent',
    height: height,
    width: width
  },
  flexContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-evenly'
  },
  width100: {
    width: '100%'
  },
  width90: {
    width: '90%'
  },
  width80: {
    width: '80%'
  },
  width70: {
    width: '70%'
  },
  width50: {
    width: '50%'
  },
  width30: {
    width: '30%'
  },
  flexBetweenContainer: {
    flexDirection: 'column',
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  whiteBackground: {
    backgroundColor: 'white'
  }
})

export const form_style = StyleSheet.create({
  formControl: {
    width: '100%',
    borderColor: black,
    borderWidth: 1,
    padding: SpacingExtraSmall,
    borderRadius: SpacingExtraSmall
  },
  formLabel: {
    marginRight: SpacingMedium
  },
  formControlFullWidth: {
    width: '100%',
  },
  formControlHalfWidth: {
    width: '50%',
  },
  form_button: {
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    height: 44,
    borderColor: primary_color,
    borderWidth: 1,
    backgroundColor: 'white'
  },
  form_button_google: {
    borderColor: 'blue',
    borderWidth: 1
  },
  form_button_apple: {
    borderWidth: 0,
    backgroundColor: 'transparent'
  },
  form_control_flex: {
    flex: 1
  },
  form_control_required: {
    color: 'red',
    fontSize: 16,
    marginLeft: 5
  }
})

export const z_index = StyleSheet.create({
  priority: {
    zIndex: 1
  },
  secondary: {
    zIndex: 0
  }
})

export const text_style = StyleSheet.create({
  bold: {
    fontFamily: 'open-sans-bold'
  },
  xl: {
    fontFamily: 'open-sans-regular',
    fontSize: 55
  },
  md: {
    fontFamily: 'open-sans-regular',
    fontSize: 34
  },
  sm: {
    fontFamily: 'open-sans-regular',
    fontSize: 21
  },
  xxs: {
    fontFamily: 'open-sans-regular',
    fontSize: 13
  },
  xs: {
    fontFamily: 'open-sans-regular',
    fontSize: 15
  },
  apple_auth: {
    fontSize: 17,
    fontWeight: '500'
  },
  primaryColor: {
    color: primary_color
  },
  secondaryColor: {
    color: secondary_color
  },
  alignCenter: {
    textAlign: 'center'
  },
  alignRight: {
    textAlign: 'right'
  },
  alignLeft: {
    textAlign: 'left'
  },
  error: {
    color: 'red',
    textAlign: 'center'
  },
  whiteTitle: {
    fontFamily: 'open-sans-regular',
    fontSize: headerLargeFont,
    fontStyle: 'italic'
  },
  italicText: {
    textAlign: 'center',
    fontStyle: 'italic',
    fontSize: headerLargeFont
  },
  fontColorWhite: {
    fontFamily: 'open-sans-regular',
    color: white
  },
  fontColorPurple: {
    fontFamily: 'open-sans-regular',
    color: primary_color
  },
  fontColorBlack: {
    fontFamily: 'open-sans-regular',
    color: black
  },
  fontColorRed: {
    fontFamily: 'open-sans-regular',
    color: 'red'
  },
  fontColorGrey: {
    fontFamily: 'open-sans-regular',
    color: grey_color
  },
  fontColorPrimary: {
    fontFamily: 'open-sans-regular',
    color: primary_color
  },
  required: {
    color: 'red',
    fontSize: SpacingMedium,
    marginLeft: SpacingExtraSmall
  },
})

export const bio_style = StyleSheet.create({
  borderColor: primary_color,
  borderWidth: 1,
  width: 250
})

export const basic_border_style = StyleSheet.create({
  borderWidth: 1
})

export const btn_style = StyleSheet.create({
  backgroundColorBlackTint: {
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  backgroundColorNone: {
    backgroundColor: 'transparent'
  },
  button: {
    backgroundColor: primary_color,
    paddingVertical: 10,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    // fontFamily: 'open-sans-bold'
  },
  buttonUnderline: {
    borderBottomColor: black,
    borderBottomWidth: 5,
    borderRadius: 0
  },
  buttonReversed: {
    borderColor: primary_color,
    borderWidth: 1,
    backgroundColor: 'transparent'
  },
  buttonBlackReversed: {
    borderColor: black,
    borderWidth: 1,
    backgroundColor: 'transparent'
  },
  lightOpacity: {
    borderWidth: 1,
    backgroundColor:'rgba(255,255,255,0.5)'
  },
  buttonReversedDisabled: {
    borderColor: lightgrey
  },
  buttonFixedWidth: {
    width: 150
  },
  buttonSmall: {
    width: 200
  },
  buttonVerySmall: {
    width: 50
  },
  buttonTopPadding: {
    paddingTop: 10  
  },
  buttonFullWidth: {
    width: '100%'
  },
  buttonDisabled: {
    backgroundColor: lightgrey
  },
  buttonBlack: {
    backgroundColor: black,
    width: '100%'
  },
  buttonFullColor: {
    backgroundColor: primary_color_faded
  },
  disabled: {
    backgroundColor: grey_color,
    color: white
  },
  navButton: {
    backgroundColor: primary_color_faded,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 'bold'
  },
  round: {
    borderRadius: 50
  }
})

export const margin_styles = StyleSheet.create({
  vertical_space_xxs: {
    marginVertical: 2
  },
  vertical_space_xs: {
    marginVertical: 5
  },
  vertical_space_md: {
    marginVertical: 13
  },
  vertical_space_l: {
    marginVertical: 21
  },
  vertical_space_xl: {
    marginVertical: 34
  },
  vertical_space_xxl: {
    marginVertical: 55
  },
  horizontal_space_xs: {
    marginHorizontal: 5
  },
  horizontal_space_s: {
    marginHorizontal: SpacingSmall
  },
  horizontal_space_md: {
    marginHorizontal: SpacingMedium
  },
  horizontal_space_lg: {
    marginHorizontal: SpacingLarge
  },
  space_xs: {
    margin: SpacingExtraSmall
  },
  space_s: {
    margin: SpacingSmall
  },
  space_md: {
    margin: SpacingMedium
  },
  space_lg: {
    margin: SpacingLarge
  },
  bottom_xs: {
    marginBottom: SpacingExtraSmall
  },
  bottom_md: {
    marginBottom: SpacingMedium
  },
  bottom_lg: {
    marginBottom: SpacingLarge
  },
  top_md: {
    marginTop: SpacingMedium
  },
  top_xs: {
    marginTop: SpacingExtraSmall
  },
  top_md: {
    marginTop: SpacingMedium
  },
  top_lg: {
    marginTop: SpacingLarge
  }
})

export const img_styles = StyleSheet.create({
  icon_xxs: {
    width: height / 12,
    height: height / 12,
    resizeMode: 'contain'
  },
  icon_xxxs: {
    width: height / 14,
    height: height / 14,
    resizeMode: 'contain'
  },
  imageHolder: {
    alignSelf: 'center',
  },
  circular_image_holder: {
    borderWidth: 1,
    width: 150,
    height: 150,
    borderRadius: 150
  },
  icon_xs: {
    flex: 1,
    height: height / 5,
    width: width / 5,
    resizeMode: 'contain'
  },
  icon_s: {
    flex: 1,
    height: height / 4,
    width: width / 4,
    resizeMode: 'contain'
  },
  icon_md: {
    height: height / 5,
    width: width / 3,
    resizeMode: 'contain'
  },
  oauth_icon : {
    width: 12,
    height: 12
  },
  circular_image_s: {
    width: 50,
    height: 50,
    borderRadius: 150
  },
  circular_image_md: {
    width: 100,
    height: 100,
    borderRadius: 150
  },
  circular_image_lg: {
    width: 150,
    height: 150,
    borderRadius: 150
  },
  rectangle_image_xxs: {
    width: 100,
    height: 50,
    resizeMode: 'contain'
  },
  rectangle_image_xs: {
    width: 100,
    marginLeft: 10,
    height: 70,
    resizeMode: 'contain'
  },
  rectangle_image_s: {
    width: 200,
    height: 100,
    resizeMode: 'contain'
  },
  rectangle_image_md: {
    width: 300,
    height: 200,
    resizeMode: 'contain'
  },
  square_image_s: {
    width: 50,
    height: 50
  },
  square_image_md: {
    width: 100,
    height: 100
  },
  square_image_lg: {
    width: 150,
    height: 150
  },
  square_image_xlg: {
    width: 200,
    height: 200
  }
})

export const padding_styles = StyleSheet.create({
  none: {
    padding: 0
  },
  safetyTop: {
    paddingTop: 50
  },
  space_xs: {
    padding: SpacingExtraSmall
  },
  space_s: {
    padding: SpacingSmall
  },
  space_ms: {
    padding: SpacingSmall + SpacingExtraSmall
  },
  space_md: {
    padding: SpacingMedium
  },
  space_md_vertical: {
    paddingVertical: SpacingMedium
  },
  space_md_horizontal: {
    paddingHorizontal: SpacingMedium
  },
  space_ms_horizontal: {
    paddingHorizontal: SpacingSmall + SpacingExtraSmall
  },
  space_s_horizontal: {
    paddingHorizontal: SpacingSmall
  },
  space_xs_horizontal: {
    paddingHorizontal: SpacingExtraSmall
  },
  space_lg: {
    padding: SpacingLarge
  },
  horizontal_s:{
    paddingHorizontal: SpacingSmall
  }
})

export const navbar_styles = StyleSheet.create({
  oneThirdWidth: {
    width: width / 3,
    height: 40
  },
  halfWidth: {
    width: width / 2
  },
  navContainer: {
    flexDirection: 'row',
    backgroundColor: white,
    height: height / 15
  }
})
