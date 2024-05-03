import { useEffect, useState, useRef } from "react";
import {
  ICON_SIZE_XS,
  NAV_AUTHENTICATION,
  NAV_EDIT_PROFILE,
  NAV_GENERAL_PROFILE,
  NAV_HOME_LIST,
  NAV_PROFILE,
  NAV_CONDITIONS_FORM,
  NAV_LURES_FORM,
  grey_color,
  lightgrey,
  primary_color,
  NAV_CONDITIONS_RESULTS,
  NAV_LURES_RESULTS,
} from "./global/global-constants";
import { navigate } from "./global/global-functions";
import {
  btn_style,
  flex_style,
  margin_styles,
  navbar_styles,
  text_style,
} from "./global/global-styles";
import { Ionicons, FontAwesome5, AntDesign } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";
import { loadTranslations } from "./global/localization";
import { useNavigationState } from "@react-navigation/native";
import { getAuthToken } from "./global/utils/auth.utils";

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
    const isInStartPage = currentPage === NAV_AUTHENTICATION || currentPage == null || currentPage === undefined
    async function checkAuthentication() {
      const token = await getAuthToken(!isInStartPage);
      if (token) {
        setAuthenticated(true);
      }
    }
    checkAuthentication();

    const currentRouteName = navigationState?.routes[navigationState.index].name;
    setCurrentPage(currentRouteName);
  }, [navigationState, currentPage]);

  return (
    <View>
      {!!authenticated && currentPage !== NAV_AUTHENTICATION ? (
        <View
          style={[
            flex_style.spaceEvenly,
            flex_style.column,
            margin_styles.vertical_space_xs,
            navbar_styles.navContainer,
          ]}
        >
          <Pressable
            onPress={() => navigate(NAV_CONDITIONS_FORM)}
            style={[
              btn_style.button,
              navbar_styles.halfWidth,
              btn_style.backgroundColorNone,
            ]}
          >
            <View style={flex_style.center}>
              <FontAwesome5 name="cloud-sun" size={ICON_SIZE_XS} color={(currentPage === NAV_CONDITIONS_FORM || currentPage === NAV_LURES_RESULTS) ? primary_color : grey_color} />
              <Text
                style={
                  (currentPage === NAV_CONDITIONS_FORM || currentPage === NAV_LURES_RESULTS)
                    ? text_style.fontColorBlack
                    : text_style.fontColorGrey
                }
              >
                {loadTranslations("navConditions")}
              </Text>
            </View>
          </Pressable>
          <Pressable
            onPress={() => navigate(NAV_LURES_FORM)}
            style={[
              btn_style.button,
              navbar_styles.halfWidth,
              btn_style.backgroundColorNone,
            ]}
          >
            <View style={flex_style.center}>
              <Ionicons name="fish" size={ICON_SIZE_XS} color={(currentPage === NAV_LURES_FORM || currentPage === NAV_CONDITIONS_RESULTS) ? primary_color : lightgrey} />
              <Text
                style={
                  (currentPage === NAV_LURES_FORM || currentPage === NAV_CONDITIONS_RESULTS)
                    ? text_style.fontColorBlack
                    : text_style.fontColorGrey
                }
              >
                {loadTranslations("navLures")}
              </Text>
            </View>
          </Pressable>
          <Pressable
            onPress={() => navigate(NAV_PROFILE)}
            style={[
              btn_style.button,
              navbar_styles.halfWidth,
              btn_style.backgroundColorNone,
            ]}
          >
            <View style={flex_style.center}>
              <AntDesign name="profile" size={ICON_SIZE_XS} color={currentPage === NAV_PROFILE ? primary_color : grey_color} />
              <Text
                style={
                  currentPage === NAV_PROFILE
                    ? text_style.fontColorBlack
                    : text_style.fontColorGrey
                }
              >
                {loadTranslations("profile")}
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
