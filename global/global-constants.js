import { Dimensions } from "react-native";

const height = Dimensions.get("screen").height - (Dimensions.get("screen").height/15);
const width = Dimensions.get("screen").width;
const primary_color = "rgba(0,51,98,255)";
const primary_color_faded = "rgba(0,51,98,0.5)";
const green_color = "rgba(0, 255, 168, 1)";
const orange_color = "rgb(255, 87, 52)";
const secondary_color = "rgba(0, 255, 200, 1)";
const secondary_color_faded = "rgba(0, 255, 200, 0.2)";
const tertiary_color = "rgba(0, 255, 230, 1)";
const white = "rgb(255, 255, 255)";
const honeydew = "rgba(245, 255, 229, 1)";
const black = "rgb(0, 0, 0)";
const lightgrey = "lightgrey";
const blackText = "black";
const grey_color = "rgba(208, 208, 208, 1)";
const grey_dark_color = "rgba(150, 150, 150, 1)";
const tutorial_transparent = "rgba(0,0,0,0)"

//Spacing
const SpacingExtraSmall = 5;
const SpacingSmall = 10;
const SpacingMedium = 20;
const widthMinusMediumPadding =
  Dimensions.get("screen").width - SpacingMedium - SpacingMedium;
const SpacingLarge = 40;
const SpacingXLarge = 50;

const SpacingFormXLarge = 160


// Text font size
const headerLargeFont = 30;

const headerSmallFont = 20;

// Icons size
const ICON_SIZE_XXS = 16;
const ICON_SIZE_XS = 24;
const ICON_SIZE_S = 30;
const ICON_SIZE = 40;
const ICON_SIZE_XL = 60;

//popup size
const POPUP_WIDTH_S = 100;
const POPUP_WIDTH_M = 140;
const POPUP_WIDTH_L = 180;

const POPUP_HEIGHT_S = 60;
const POPUP_HEIGHT_M = 80;
const POPUP_HEIGHT_L = 100;

// Size for number of lines in tooltips
const SINGLE_LINE = 50;
const DOUBLE_LINE = 60;
const MULTI_LINE = 100
const tutorial_styles = {
  singleLine: [{backgroundColor: primary_color, height: SINGLE_LINE}],
  doubleLine: [{backgroundColor: primary_color, height: DOUBLE_LINE}],
  multiLine: [{backgroundColor: primary_color, height: MULTI_LINE}]
}

// Navigation
const NAV_HOME_LIST = "HomeList";
const NAV_FILTERED_LIST = "FilteredList";
const NAV_WHEEL_LOCATIONS = "LocationList";
const NAV_GENERAL_PROFILE = "generalProfile";
const NAV_TIME = "Time";
const NAV_TUTORIAL = "Tutorial";
const NAV_PROFILE = "Profile";
const NAV_EDIT_PROFILE = "editProfile";
const NAV_AD_PAGE = "adPage";
const NAV_NEW_ADVERTISEMENT = "newAdvertisement";
const NAV_CONDITIONS_FORM = 'ConditionsForm'
const NAV_LURES_FORM = 'Lures'
const NAV_REQUEST_LURE_FORM = 'RequestNewLure'
const NAV_LURES_RESULTS = 'LuresResults'
const NAV_CONDITIONS_RESULTS = 'ConditionsResults'
const NAV_MOON_WEATHER_INFO = 'MoonWeatherInfo'

// Responses
const RES_UNAUTHORIZED = "Unauthorized";
const RES_VALID = "valid";

// string-constant
const ANDROID = "android";
const IOS = "ios";
const PASSWORD = "password";
const EMAIL = "email";
const FORM_INPUT = "form-input";
const DISPLAYNAME = "displayName";
const DATE_TIME_ID = "dateTimePicker";
const WEB_URL = "link";
const PHONE_NUMBER = "generalPhoneNumber";
const POST = "POST";
const GET = "GET";
const JPG = "jpg";
const NO = "No";
const DATE = "date";
const FR = "fr";
const AUTH_HOST = "authHost";
const STATUS = "status";
const VALID = "valid";
const INVALID = "invalid";
const DATA = "data";
const JWT = "jwt";
const ERROR = "error";
const CODE = "code";
const ER_DUP_ENTRY = "ER_DUP_ENTRY";
const ERR_CANCELED = "ERR_CANCELED";
const ENCODING_BASE_64 = "base64";
const PHONE_PAD = "phone-pad";
const IMAGE_URI = "data:image/pngbase64,";
const HOME = "home";
const CIRCLE = "checkbox-multiple-blank-circle";
const HOME_OUTLINE = "home-outline";
const CIRCLE_OUTLINE = "checkbox-multiple-blank-circle-outline";
const PERSON_OUTLINE = "person-outline";
const PERSON = "person";
const PROFILE = "generalProfile";
const ERROR_ICON = "close-circle-outline";
const CORRECT_ICON = "checkmark-circle-outline";
const BIO = "bio";
const PROFILE_IMAGE = "profileImage";
const MEDIA = "media";
const PHOTO = "photo";
const MAX_BUDGET = "maxBudget";
const ADDRESS = "address";
const DEFAULT_IMAGE = "default.jpg";
const JOIN = "join";
const CREATE = "create";
const USD_ICON = "logo-usd";
const HELP_ICON = "help-circle-outline";
const HEIGHT_STRING = "height";
const PADDING = "padding";
const LARGE = "large";
const OKAY = "Okay";
const CANCEL = "cancel";
const MESSAGE = "message";
const SUCCESS = "success";
const LOCATION = "Location*";
const GRANTED = "granted";

//text Color
const COLOR_ERROR = "red";
const COLOR_NORMAL = "black";

//behavior
const POSITION = "position";

//key
const SECURE_STORE_ITEM_KEY = "x-app-auth";

//url
const API_REGISTER = "api/user/post/registerGoogle";
const ADD_ADVERTISEMENT = "api/advertisements/addAdvertisement";
const GET_PROFILE_INFO = "api/user/get/profileInfo";
const EDIT_PROFILE_INFO = "api/user/post/editInfoMultipart";
const API_LOGIN = "api/user/post/login";
const API_FORGOT_PASSWORD = "api/user/post/forgotpassword";
const API_UPDATE_BLOCKED_DATE = "/api/user/post/updateBlockedDate";
const API_LOGIN_GOOGLE = "api/user/post/loginGoogle";
const API_GET_AD = "api/advertisements/getAdvertisement?id=";
const API_GET_USER_INFO_AD = "api/advertisements/getReferalInfoForAd?id=";
const API_STRUCTURES_FOR_SPECIES = "api/structures-for-species?species="

//errors
const TYPE_ERROR = "TypeError";
const NETWORK_REQUEST_FAILED = "Network request failed";

//sockets
const CREATE_LOBBY = "create-lobby";
const CREATE_WHEEL = "create-wheel";
const JOIN_LOBBY = "join-lobby";
const JOIN_WHEEL = "join-wheel";
const WINNER_INDEX = "winner-index";
const WINNER_INFORMATION = "winner-information";
const LEAVE_LOBBY = "leave-lobby";
const GET_LOBBY_ID = "get-lobby-id";
const USER_JOINED = "user-joined";
const LOBBY_LOCATION = "lobby-locations";
const ADD_LOCATION = "add-location";
const REMOVE_LOCATION = "remove-location";

//sytems
const HARDWAREBACKPRESS = "hardwareBackPress";

//SQL
const AD_TABLE_SELECT_PARAMS = [
  "dateOfCreation",
  "Views",
  "Addition to Wheel",
  "Spins Won",
  "References",
];

//DOLLAR
const DOLLAR_AMOUNTS = {
  CENT: "0.01",
  NICKEL: "0.05",
  DOLLAR: "1",
  FIFTY_CENTS: "0.50",
};

const AD_AMOUNT_VALUE = {
  TWENTY_VALUE: "20",
  TWENTY_LABEL: "20.00",
  FIFTY_VALUE: "50",
  FIFTY_LABEL: "50.00",
  ONE_HUNDRED_VALUE: "100",
  ONE_HUNDRED_LABEL: "100.00",
  TWO_FIFTY_VALUE: "250",
  TWO_FIFTY_LABEL: "250.00",
  FIVE_HUNDRED_VALUE: "500",
  FIVE_HUNDRED_LABEL: "500.00",
};

const NAV_AUTHENTICATION = "auth";

const CANADIAN_CURRENCY = "CAD";

const FISH_STRUCTURES = [
    {name: 'rock', image: require('../assets/structures/Rock.jpg') },
    {name: 'rock2d', image: require('../assets/structures/2d-Rock.jpg') },
    {name: 'channel', image: require('../assets/structures/Channel.jpg') },
    {name: 'drop', image: require('../assets/structures/Drop.jpg') },
    {name: 'flat', image: require('../assets/structures/Flat.jpg') },
    {name: 'submerged', image: require('../assets/structures/2d-Submerged_Items.png') },
    {name: 'point', image: require('../assets/structures/Point.jpg') },
    {name: 'weed', image: require('../assets/structures/2d-Weed.jpg') },
    {name: 'bay', image: require('../assets/structures/bay.jpg') },
]

export {
  height,
  width,
  widthMinusMediumPadding,
  primary_color,
  primary_color_faded,
  green_color,
  orange_color,
  secondary_color,
  secondary_color_faded,
  tertiary_color,
  white,
  honeydew,
  black,
  blackText,
  headerLargeFont,
  headerSmallFont,
  grey_color,
  grey_dark_color,
  SpacingExtraSmall,
  SpacingSmall,
  SpacingMedium,
  SpacingLarge,
  SpacingXLarge,
  SpacingFormXLarge,
  ICON_SIZE_XXS,
  ICON_SIZE_XS,
  ICON_SIZE_S,
  ICON_SIZE,
  ICON_SIZE_XL,
  NAV_HOME_LIST,
  NAV_WHEEL_LOCATIONS,
  NAV_FILTERED_LIST,
  NAV_GENERAL_PROFILE,
  NAV_AUTHENTICATION,
  NAV_AD_PAGE,
  PASSWORD,
  EMAIL,
  WEB_URL,
  DISPLAYNAME,
  PHONE_NUMBER,
  DATE_TIME_ID,
  FORM_INPUT,
  COLOR_ERROR,
  COLOR_NORMAL,
  POST,
  JPG,
  NO,
  DATE,
  FR,
  ERROR,
  AUTH_HOST,
  STATUS,
  VALID,
  API_LOGIN,
  CIRCLE,
  CIRCLE_OUTLINE,
  DATA,
  JWT,
  CANCEL,
  IMAGE_URI,
  PHONE_PAD,
  CODE,
  ER_DUP_ENTRY,
  ERR_CANCELED,
  ENCODING_BASE_64,
  POSITION,
  SECURE_STORE_ITEM_KEY,
  API_REGISTER,
  API_GET_AD,
  API_GET_USER_INFO_AD,
  NAV_PROFILE,
  NAV_EDIT_PROFILE,
  RES_UNAUTHORIZED,
  RES_VALID,
  HOME,
  HOME_OUTLINE,
  PERSON_OUTLINE,
  PERSON,
  PROFILE,
  OKAY,
  GET,
  INVALID,
  API_FORGOT_PASSWORD,
  NETWORK_REQUEST_FAILED,
  TYPE_ERROR,
  MEDIA,
  PROFILE_IMAGE,
  BIO,
  NAV_NEW_ADVERTISEMENT,
  NAV_TUTORIAL,
  NAV_TIME,
  NAV_CONDITIONS_FORM,
  NAV_LURES_FORM,
  NAV_REQUEST_LURE_FORM,
  NAV_LURES_RESULTS,
  NAV_CONDITIONS_RESULTS,
  ADDRESS,
  MAX_BUDGET,
  PHOTO,
  ADD_ADVERTISEMENT,
  GET_PROFILE_INFO,
  EDIT_PROFILE_INFO,
  DEFAULT_IMAGE,
  ERROR_ICON,
  CORRECT_ICON,
  MESSAGE,
  API_UPDATE_BLOCKED_DATE,
  CREATE_LOBBY,
  CREATE_WHEEL,
  JOIN_LOBBY,
  JOIN_WHEEL,
  WINNER_INDEX,
  WINNER_INFORMATION,
  LEAVE_LOBBY,
  GET_LOBBY_ID,
  USER_JOINED,
  LOBBY_LOCATION,
  JOIN,
  CREATE,
  ADD_LOCATION,
  REMOVE_LOCATION,
  HARDWAREBACKPRESS,
  lightgrey,
  USD_ICON,
  ANDROID,
  IOS,
  HEIGHT_STRING,
  PADDING,
  LARGE,
  HELP_ICON,
  AD_TABLE_SELECT_PARAMS,
  DOLLAR_AMOUNTS,
  POPUP_WIDTH_S,
  POPUP_WIDTH_M,
  POPUP_WIDTH_L,
  POPUP_HEIGHT_S,
  POPUP_HEIGHT_M,
  POPUP_HEIGHT_L,
  CANADIAN_CURRENCY,
  FISH_STRUCTURES,
  AD_AMOUNT_VALUE,
  SUCCESS,
  API_LOGIN_GOOGLE,
  LOCATION,
  GRANTED,
  SINGLE_LINE,
  DOUBLE_LINE,
  MULTI_LINE,
  tutorial_transparent,
  tutorial_styles,
  API_STRUCTURES_FOR_SPECIES,
  NAV_MOON_WEATHER_INFO,
};
