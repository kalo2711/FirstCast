import { useEffect, useState, useRef } from "react";
import {
  CIRCLE,
  CIRCLE_OUTLINE,
  ICON_SIZE_XS,
  NAV_AUTHENTICATION,
  NAV_EDIT_PROFILE,
  NAV_GENERAL_PROFILE,
  NAV_HOME_LIST,
  NAV_PROFILE,
  NAV_LURES_FORM,
  NAV_TUTORIAL,
  PERSON,
  PERSON_OUTLINE,
  PROFILE,
  black,
  grey_color,
  primary_color,
} from "./global/global-constants";
import { navigate } from "./global/global-functions";
import {
  btn_style,
  flex_style,
  margin_styles,
  navbar_styles,
  text_style,
} from "./global/global-styles";
import { Ionicons } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";
import { loadTranslations } from "./global/localization";
// import { getAuthToken } from "../../utils/auth.util";
import { useNavigationState } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { setAuthToken } from "./global/utils/auth.utils";

export default function Navigation() {
  const [authenticated, setAuthenticated] = useState(false);
  const navigationState = useNavigationState((state) => state);
  const [currentPage, _setCurrentPage] = useState(null);
  const currentPageRef = useRef(currentPage);

  const setCurrentPage = (currentPage) => {
    currentPageRef.current = currentPage;
    _setCurrentPage(currentPage);
  };

  useEffect(() => {
    const currentRouteName =
      navigationState?.routes[navigationState.index].name;
    setCurrentPage(currentRouteName);
  }, [navigationState, currentPage]);

  useEffect(() => {
    async function checkAuthentication() {
      //   const token = await getAuthToken(false);
      setAuthenticated(true);
    }
    checkAuthentication();
  });

  const handleProfilePress = () => {
    navigate(authenticated ? NAV_PROFILE : NAV_AUTHENTICATION);
  };

  const handleHomePress = () => {
    navigate(Conditions);
  };

  const homeColorCondition = () => {
    return (
      currentPage !== NAV_PROFILE &&
      currentPage !== NAV_EDIT_PROFILE &&
      currentPage !== NAV_AUTHENTICATION
    );
  };

  return (
    <View>
      {true ? (
        <View
          style={[
            flex_style.spaceEvenly,
            flex_style.column,
            margin_styles.vertical_space_xs,
            navbar_styles.navContainer,
          ]}
        >
          <Pressable
            onPress={() => handleHomePress()}
            style={[
              btn_style.navButton,
              navbar_styles.halfWidth,
              btn_style.backgroundColorNone,
            ]}
            disabled={homeColorCondition()}
          >
            <View style={flex_style.center}>
              <MaterialCommunityIcons
                name={homeColorCondition() ? CIRCLE : CIRCLE_OUTLINE}
                size={ICON_SIZE_XS}
                color={homeColorCondition() ? black : grey_color}
              />
              <Text
                style={
                  homeColorCondition()
                    ? text_style.fontColorBlack
                    : text_style.fontColorGrey
                }
              >
                {loadTranslations("generalHome")}
              </Text>
            </View>
          </Pressable>
          <Pressable
            onPress={() => handleProfilePress()}
            style={[
              btn_style.button,
              navbar_styles.halfWidth,
              btn_style.backgroundColorNone,
            ]}
            disabled={!homeColorCondition()}
          >
            <View style={flex_style.center}>
              <Ionicons
                name={!homeColorCondition() ? PERSON : PERSON_OUTLINE}
                size={ICON_SIZE_XS}
                color={!homeColorCondition() ? black : grey_color}
              />
              <Text
                style={
                  !homeColorCondition()
                    ? text_style.fontColorBlack
                    : text_style.fontColorGrey
                }
              >
                {loadTranslations("generalProfile")}
              </Text>
            </View>
          </Pressable>
        </View>
      ) : (
        <View></View>
      )}
    </View>
  );
}
