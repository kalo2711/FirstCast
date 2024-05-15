import { useState } from 'react'
import { Pressable, Text, View } from 'react-native'

import LogIn from './Login.js'
import SignUp from './SignUp.js'
import { btn_style, margin_styles, flex_style, navbar_styles, padding_styles } from '../global/global-styles.js'
import { loadTranslations } from '../global/localization.js'
import { SpacingXLarge } from "../global/global-constants.js"

const FIRST = 'first'
const SECOND = 'second'
/**
 * @description This class is used to display the nav bar
 * where the user can switch from log in to sign up
 */
export default function NavBar(props) {
  const [activeButton, setActiveButton] = useState(SECOND)

  return (
    <View style={[flex_style.flexColumn]}>
      <View style={[flex_style.flex, margin_styles.vertical_space_xs, flex_style.maxWidth, {justifyContent: 'space-around'}]}>
        <Pressable
          onPress={() => setActiveButton(FIRST)}
          style={[
            btn_style.button,
            navbar_styles.oneThirdWidth,
            btn_style.backgroundColorNone,
            padding_styles.none,
            activeButton === FIRST ? btn_style.buttonUnderline : null,
            {height: SpacingXLarge}
          ]}
        >
          <Text>{loadTranslations("login")}</Text>
        </Pressable>

        <Pressable
          onPress={() => setActiveButton(SECOND)}
          style={[
            btn_style.button,
            activeButton === SECOND ? btn_style.buttonUnderline : null,
            navbar_styles.oneThirdWidth,
            btn_style.backgroundColorNone,
            padding_styles.none,
            {height: SpacingXLarge}
          ]}
        >
          <Text >{loadTranslations("signup")}</Text>
        </Pressable>

      </View>

      {activeButton === FIRST && <LogIn socketId={props.socketId} />}
      {activeButton === SECOND && <SignUp socketId={props.socketId}/>}
    </View>
  )
}

