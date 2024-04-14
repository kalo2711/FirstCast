import { createNavigationContainerRef } from "@react-navigation/native";
import { StackActions } from "@react-navigation/routers";
export const navigationRef = createNavigationContainerRef();
import {
  NAV_AUTHENTICATION,
  RES_UNAUTHORIZED,
  RES_VALID,
} from "./global-constants";

export function reactIfView(property, DOM) {
  return property && DOM;
}

export function navigate(name, params) {
  if (navigationRef.isReady()) {
    navigationRef.current.dispatch(StackActions.push(name, params));
  }
}

export function navigateBack() {
  if (navigationRef.canGoBack()) {
    navigationRef.goBack(null);
  }
}

export async function responseDataHandler(response, navigateIfNotauth = true) {
  try {
    responseJSON = await response.json();
    console.log(responseJSON);
    if (responseJSON.status === RES_VALID) {
      return responseJSON.data;
    } else {
      return null;
    }
  } catch (e) {
    if (e.toString().includes(RES_UNAUTHORIZED) && navigateIfNotauth) {
      await setAuthToken(null);
      navigate(NAV_AUTHENTICATION);
    }
  }
}
