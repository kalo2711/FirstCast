import { ScrollView, View } from 'react-native'
import { NAV_CONDITIONS_FORM, NAV_GENERAL_PROFILE, NAV_LURES_FORM, NAV_LURES_RESULTS} from '../global/global-constants'
import { flex_style, margin_styles, padding_styles } from '../global/global-styles'
import { useState, useRef, useEffect } from 'react'
import { navigate, reactIfView } from '../global/global-functions'
import NavBar from './NavBar'
import { getAuthToken, setAuthToken } from '../global/utils/auth.utils'

export default function Authentication(props) {
  const [authenticated, setAuthenticated] = useState(null)
  const authenticatedRef = useRef(authenticated)
  const setAuthenticatedRef = async (data) => {
    const auth = await data
    authenticatedRef.current = auth
    setAuthenticated(auth)
  }
  useEffect(() => {
    async function checkAuthentication() {
      setAuthenticatedRef(getAuthToken(false))
    }
    if (!authenticated) {
      checkAuthentication()
    } else {
      navigate(NAV_LURES_FORM)
    }
  }, [authenticated])

  return (
    <ScrollView
    contentContainerStyle={[
      flex_style.one, 
        flex_style.center
    ]}
    >
        <View
        style={[
          flex_style.one,
           flex_style.center
          ]}
        >
          {reactIfView(
            !authenticated,
            <View
              style={[padding_styles.space_md, margin_styles.vertical_space_l]}
            >
              <NavBar socketId={props?.route?.params?.socketId}></NavBar>
            </View>
          )}
        </View>
    </ScrollView>
  )
}
