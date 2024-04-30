import React, { useState } from "react";
import { View, Text, ScrollView, Image, FlatList, StyleSheet } from "react-native";
import {
  btn_style,
  flex_style,
  padding_styles,
  text_style,
  img_styles,
} from "../global/global-styles";
import { primary_color, black } from "../global/global-constants";
import { loadTranslations } from "../global/localization";
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';


export default function LuresResults({ route }) {
  const [previousWeather, setPreviousWeather] = useState({
    "precipitation": false,
    "windGust": 11,
  });
  const [moonPhase, setMoonPhase] = useState({
    "prevPhase": {
      "phase": 4,
      "daysSinceLast": 5
    },
    "nextPhase": {
      "phase": 1,
      "daysUntilNext": 1
    }
  });

  const moonPhaseLabels = {
    1: 'Last Moon Phase: New Moon',
    2: 'Last Moon Phase: First Quarter',
    3: 'Last Moon Phase: Full Moon',
    4: 'Last Moon Phase: Last Quarter'
  };

  const [lures, setLures] = useState([
    {
    "image": "https://www.sail.ca/media/catalog/product/e/t/etic-512-30_506__01_temp.jpg",
    "color1": "brown",
    "color2": "grey",
    "size": "0",
    "weight": "3",
    "brand": "ETIC",
    "model": "Wobbler Weedless Spoon",
    "type": "spoon",
    "price": 3.99
    },
    {
    "image": "https://www.sail.ca/media/catalog/product/b/r/brecks-g22_fw__S19__01.jpg",
    "color1": "grey",
    "color2": "brown",
    "size": "0",
    "weight": "3.12",
    "brand": "LAKE CLEAR",
    "model": "Geneva Spoon",
    "type": "spoon",
    "price": 6.49
    },
    {
    "image": "https://www.sail.ca/media/catalog/product/n/o/normark-ssp5_ft.jpg",
    "color1": "brown",
    "color2": "grey",
    "size": "0",
    "weight": "1",
    "brand": "BLUE FOX",
    "model": "Strobe Spoon",
    "type": "spoon",
    "price": 5.49
    },
    {
    "image": "https://www.sail.ca/media/catalog/product/e/t/etic-512-30_514__01_temp.jpg",
    "color1": "grey",
    "color2": "grey",
    "size": "0",
    "weight": "3",
    "brand": "ETIC",
    "model": "Wobbler Weedless Spoon",
    "type": "spoon",
    "price": 3.99
    },
    {
    "image": "https://www.sail.ca/media/catalog/product/b/r/brecks-g22_hhsgn__S19.jpg",
    "color1": "grey",
    "color2": "gold",
    "size": "0",
    "weight": "3.12",
    "brand": "LAKE CLEAR",
    "model": "Geneva Spoon",
    "type": "spoon",
    "price": 6.49
    },
    {
    "image": "https://www.sail.ca/media/catalog/product/b/r/brecks-g22_rb__S19__01.jpg",
    "color1": "grey",
    "color2": "green",
    "size": "0",
    "weight": "3.12",
    "brand": "LAKE CLEAR",
    "model": "Geneva Spoon",
    "type": "spoon",
    "price": 6.49
    },
    {
    "image": "https://www.sail.ca/media/catalog/product/b/r/brecks-g22_sblu__S19__01.jpg",
    "color1": "grey",
    "color2": "blue",
    "size": "0",
    "weight": "3.12",
    "brand": "LAKE CLEAR",
    "model": "Geneva Spoon",
    "type": "spoon",
    "price": 6.49
    },
    {
    "image": "https://www.sail.ca/media/catalog/product/e/t/etic-512-30_512__01_temp.jpg",
    "color1": "grey",
    "color2": "grey",
    "size": "0",
    "weight": "3",
    "brand": "ETIC",
    "model": "Wobbler Weedless Spoon",
    "type": "spoon",
    "price": 3.99
    },
    {
    "image": "https://www.sail.ca/media/catalog/product/b/r/brecks-g22_hhsg__S19__01.jpg",
    "color1": "green",
    "color2": "grey",
    "size": "0",
    "weight": "3.12",
    "brand": "LAKE CLEAR",
    "model": "Geneva Spoon",
    "type": "spoon",
    "price": 6.49
    },
    {
    "image": "https://www.sail.ca/media/catalog/product/n/o/normark-ssp5_rw.jpg",
    "color1": "grey",
    "color2": "brown",
    "size": "0",
    "weight": "1",
    "brand": "BLUE FOX",
    "model": "Strobe Spoon",
    "type": "spoon",
    "price": 5.49
    },
    {
    "image": "https://www.sail.ca/media/catalog/product/e/t/etic-512-30_535__01_temp.jpg",
    "color1": "brown",
    "color2": "black",
    "size": "0",
    "weight": "3",
    "brand": "ETIC",
    "model": "Wobbler Weedless Spoon",
    "type": "spoon",
    "price": 3.99
    },
    {
    "image": "https://www.sail.ca/media/catalog/product/b/r/brecks-g22_pink__S19__01.jpg",
    "color1": "grey",
    "color2": "red",
    "size": "0",
    "weight": "3.12",
    "brand": "LAKE CLEAR",
    "model": "Geneva Spoon",
    "type": "spoon",
    "price": 6.49
    },
    {
    "image": "https://www.sail.ca/media/catalog/product/d/i/direct-lt0-yb_yellow---black.jpg",
    "color1": "gold",
    "color2": "grey",
    "size": "0",
    "weight": "1",
    "brand": "LENTHOM",
    "model": "Original Spoon - 0.62",
    "type": "spoon",
    "price": 6.99
    },
    {
    "image": "https://www.sail.ca/media/catalog/product/b/r/brecks-g22_s__S19__01.jpg",
    "color1": "grey",
    "color2": "purple",
    "size": "0",
    "weight": "3.12",
    "brand": "LAKE CLEAR",
    "model": "Geneva Spoon",
    "type": "spoon",
    "price": 6.49
    },
    {
    "image": "https://www.sail.ca/media/catalog/product/e/m/emery-4_glo-gl.jpg",
    "color1": "grey",
    "color2": "red",
    "size": "0.25",
    "weight": "1.75",
    "brand": "SWEDISH PIMPLE",
    "model": "Swedish Pimple 4 Ice Fishing Spoon",
    "type": "spoon",
    "price": 8.99
    },
    {
    "image": "https://www.sail.ca/media/catalog/product/e/m/emery-4_fy.jpg",
    "color1": "grey",
    "color2": "green",
    "size": "0.25",
    "weight": "1.75",
    "brand": "SWEDISH PIMPLE",
    "model": "Swedish Pimple 4 Ice Fishing Spoon",
    "type": "spoon",
    "price": 8.99
    },
    {
    "image": "https://www.sail.ca/media/catalog/product/e/m/emery-4_zr.jpg",
    "color1": "grey",
    "color2": "green",
    "size": "0.25",
    "weight": "1.75",
    "brand": "SWEDISH PIMPLE",
    "model": "Swedish Pimple 4 Ice Fishing Spoon",
    "type": "spoon",
    "price": 8.99
    },
    {
    "image": "https://www.sail.ca/media/catalog/product/e/m/emery-4_nickel.jpg",
    "color1": "grey",
    "color2": "blue",
    "size": "0.25",
    "weight": "1.75",
    "brand": "SWEDISH PIMPLE",
    "model": "Swedish Pimple 4 Ice Fishing Spoon",
    "type": "spoon",
    "price": 8.99
    },
    {
    "image": "https://www.sail.ca/media/catalog/product/e/m/emery-4_fo-arg.jpg",
    "color1": "grey",
    "color2": "green",
    "size": "0.25",
    "weight": "1.75",
    "brand": "SWEDISH PIMPLE",
    "model": "Swedish Pimple 4 Ice Fishing Spoon",
    "type": "spoon",
    "price": 8.99
    },
    {
    "image": "https://www.sail.ca/media/catalog/product/e/m/emery-4_ch.jpg",
    "color1": "grey",
    "color2": "green",
    "size": "0.25",
    "weight": "1.75",
    "brand": "SWEDISH PIMPLE",
    "model": "Swedish Pimple 4 Ice Fishing Spoon",
    "type": "spoon",
    "price": 8.99
    },
    {
    "image": "https://www.sail.ca/media/catalog/product/e/m/emery-5_nickel.jpg",
    "color1": "grey",
    "color2": "red",
    "size": "0.33",
    "weight": "1.88",
    "brand": "SWEDISH PIMPLE",
    "model": "Swedish Pimple 5 Ice Fishing Spoon",
    "type": "spoon",
    "price": 9.99
    },
    {
    "image": "https://www.sail.ca/media/catalog/product/e/m/emery-5_ch.jpg",
    "color1": "green",
    "color2": "grey",
    "size": "0.33",
    "weight": "1.88",
    "brand": "SWEDISH PIMPLE",
    "model": "Swedish Pimple 5 Ice Fishing Spoon",
    "type": "spoon",
    "price": 9.99
    },
    {
    "image": "https://www.sail.ca/media/catalog/product/e/m/emery-5_glo-lu.jpg",
    "color1": "grey",
    "color2": "blue",
    "size": "0.33",
    "weight": "1.88",
    "brand": "SWEDISH PIMPLE",
    "model": "Swedish Pimple 5 Ice Fishing Spoon",
    "type": "spoon",
    "price": 9.99
    },
    {
    "image": "https://www.sail.ca/media/catalog/product/e/m/emery-5_fy.jpg",
    "color1": "chartreuse",
    "color2": "grey",
    "size": "0.33",
    "weight": "1.88",
    "brand": "SWEDISH PIMPLE",
    "model": "Swedish Pimple 5 Ice Fishing Spoon",
    "type": "spoon",
    "price": 9.99
    },
    {
    "image": "https://www.sail.ca/media/catalog/product/e/m/emery-5_zr.jpg",
    "color1": "red",
    "color2": "grey",
    "size": "0.33",
    "weight": "1.88",
    "brand": "SWEDISH PIMPLE",
    "model": "Swedish Pimple 5 Ice Fishing Spoon",
    "type": "spoon",
    "price": 9.99
    },
    {
    "image": "https://www.sail.ca/media/catalog/product/e/m/emery-5_g-or.jpg",
    "color1": "grey",
    "color2": "red",
    "size": "0.33",
    "weight": "1.88",
    "brand": "SWEDISH PIMPLE",
    "model": "Swedish Pimple 5 Ice Fishing Spoon",
    "type": "spoon",
    "price": 9.99
    },
    {
    "image": "https://www.sail.ca/media/catalog/product/d/r/drifter-800j_34.jpg",
    "color1": "purple",
    "color2": "grey",
    "size": "10",
    "weight": "3.6",
    "brand": "DRIFTER TACKLE",
    "model": "Believer Crankbait",
    "type": "crankbait",
    "price": 34.99
    },
    {
    "image": "https://www.sail.ca/media/catalog/product/d/r/drifter-800j_8.jpg",
    "color1": "grey",
    "color2": "brown",
    "size": "10",
    "weight": "3.6",
    "brand": "DRIFTER TACKLE",
    "model": "Believer Crankbait",
    "type": "crankbait",
    "price": 34.99
    },
    {
    "image": "https://www.sail.ca/media/catalog/product/h/a/hard-sw105dc_purple-haze__01.jpg",
    "color1": "purple",
    "color2": "grey",
    "size": "12",
    "weight": "0.12",
    "brand": "ACME",
    "model": "D-Chain Kastmaster Glow Eye Spoon - 0.12",
    "type": "spoon",
    "price": 7.49
    },
    {
    "image": "https://www.sail.ca/media/catalog/product/b/r/brecks-s3_gl-blu.jpg",
    "color1": "grey",
    "color2": "blue",
    "size": "3.25",
    "weight": "1",
    "brand": "MEPPS",
    "model": "Syclops Spoon",
    "type": "spoon",
    "price": 5.49
    },
    {
    "image": "https://www.sail.ca/media/catalog/product/c/a/cami9283-celtis_rouge-chrome__01.jpg",
    "color1": "grey",
    "color2": "brown",
    "size": "3.25",
    "weight": "1.825",
    "brand": "CAMI",
    "model": "Celtis Spoon",
    "type": "spoon",
    "price": 6.99
    },
    {
    "image": "https://www.sail.ca/media/catalog/product/b/r/brecks-s3_eb.jpg",
    "color1": "blue",
    "color2": "grey",
    "size": "3.25",
    "weight": "1",
    "brand": "MEPPS",
    "model": "Syclops Spoon",
    "type": "spoon",
    "price": 5.49
    },
    {
    "image": "https://www.sail.ca/media/catalog/product/b/r/brecks-s3_sc.jpg",
    "color1": "brown",
    "color2": "black",
    "size": "3.25",
    "weight": "1",
    "brand": "MEPPS",
    "model": "Syclops Spoon",
    "type": "spoon",
    "price": 5.49
    },
    {
    "image": "https://www.sail.ca/media/catalog/product/c/a/cami9283-celtis_bleu-cuivre__01.jpg",
    "color1": "grey",
    "color2": "red",
    "size": "3.25",
    "weight": "1.825",
    "brand": "CAMI",
    "model": "Celtis Spoon",
    "type": "spoon",
    "price": 6.99
    },
    {
    "image": "https://www.sail.ca/media/catalog/product/c/a/cami9283-celtis_bleu-chrome__01.jpg",
    "color1": "grey",
    "color2": "purple",
    "size": "3.25",
    "weight": "1.825",
    "brand": "CAMI",
    "model": "Celtis Spoon",
    "type": "spoon",
    "price": 6.99
    },
    {
    "image": "https://www.sail.ca/media/catalog/product/b/r/brecks-s3_bluegl.jpg",
    "color1": "grey",
    "color2": "blue",
    "size": "3.25",
    "weight": "1",
    "brand": "MEPPS",
    "model": "Syclops Spoon",
    "type": "spoon",
    "price": 5.49
    },
    {
    "image": "https://www.sail.ca/media/catalog/product/c/a/cami9283-celtis_jaune-chrome__01.jpg",
    "color1": "brown",
    "color2": "grey",
    "size": "3.25",
    "weight": "1.825",
    "brand": "CAMI",
    "model": "Celtis Spoon",
    "type": "spoon",
    "price": 6.99
    },
    {
    "image": "https://www.sail.ca/media/catalog/product/b/r/brecks-s3_oc-.jpg",
    "color1": "brown",
    "color2": "grey",
    "size": "3.25",
    "weight": "1",
    "brand": "MEPPS",
    "model": "Syclops Spoon",
    "type": "spoon",
    "price": 5.49
    },
    {
    "image": "https://www.sail.ca/media/catalog/product/c/a/cami9283-celtis_bleu-or__01.jpg",
    "color1": "grey",
    "color2": "brown",
    "size": "3.25",
    "weight": "1.825",
    "brand": "CAMI",
    "model": "Celtis Spoon",
    "type": "spoon",
    "price": 6.99
    },
    {
    "image": "https://www.sail.ca/media/catalog/product/c/a/cami9283-stdm_sgwb__01.jpg",
    "color1": "grey",
    "color2": "blue",
    "size": "3.5",
    "weight": "1.5",
    "brand": "CAMI",
    "model": "St-Bernard Half Hammered Spoon",
    "type": "spoon",
    "price": 5.99
    },
    {
    "image": "https://www.sail.ca/media/catalog/product/b/r/brecks-s3_g-red__01.jpg",
    "color1": "brown",
    "color2": "grey",
    "size": "3.5",
    "weight": "1",
    "brand": "MEPPS",
    "model": "Syclops Spoon",
    "type": "spoon",
    "price": 5.49
    },
    {
    "image": "https://www.sail.ca/media/catalog/product/c/a/cami9283-stdm_cgwo__01.jpg",
    "color1": "grey",
    "color2": "brown",
    "size": "3.5",
    "weight": "1.5",
    "brand": "CAMI",
    "model": "St-Bernard Half Hammered Spoon",
    "type": "spoon",
    "price": 5.99
    },
    {
    "image": "https://www.sail.ca/media/catalog/product/c/a/cami9283-stdm_gw-40__01.jpg",
    "color1": "grey",
    "color2": "darkslategrey",
    "size": "3.5",
    "weight": "1.5",
    "brand": "CAMI",
    "model": "St-Bernard Half Hammered Spoon",
    "type": "spoon",
    "price": 5.99
    },
    {
    "image": "https://www.sail.ca/media/catalog/product/c/a/cami9283-stdm_scg__01.jpg",
    "color1": "grey",
    "color2": "grey",
    "size": "3.5",
    "weight": "1.5",
    "brand": "CAMI",
    "model": "St-Bernard Half Hammered Spoon",
    "type": "spoon",
    "price": 5.99
    },
    {
    "image": "https://www.sail.ca/media/catalog/product/b/r/brecks-s3_s-red__01.jpg",
    "color1": "grey",
    "color2": "grey",
    "size": "3.5",
    "weight": "1",
    "brand": "MEPPS",
    "model": "Syclops Spoon",
    "type": "spoon",
    "price": 5.49
    },
    {
    "image": "https://www.sail.ca/media/catalog/product/c/a/cami9283-stdm_sgwr__01.jpg",
    "color1": "grey",
    "color2": "red",
    "size": "3.5",
    "weight": "1.5",
    "brand": "CAMI",
    "model": "St-Bernard Half Hammered Spoon",
    "type": "spoon",
    "price": 5.99
    },
    {
    "image": "https://www.sail.ca/media/catalog/product/c/a/cami9283-stdm_gwy__01.jpg",
    "color1": "white",
    "color2": "grey",
    "size": "3.5",
    "weight": "1.5",
    "brand": "CAMI",
    "model": "St-Bernard Half Hammered Spoon",
    "type": "spoon",
    "price": 5.99
    },
    {
    "image": "https://www.sail.ca/media/catalog/product/c/a/cami9283-stdm_cgw50__01.jpg",
    "color1": "grey",
    "color2": "grey",
    "size": "3.5",
    "weight": "1.5",
    "brand": "CAMI",
    "model": "St-Bernard Half Hammered Spoon",
    "type": "spoon",
    "price": 5.99
    },
    {
    "image": "https://www.sail.ca/media/catalog/product/b/r/brecks-s3_mj__01.jpg",
    "color1": "grey",
    "color2": "grey",
    "size": "3.5",
    "weight": "1",
    "brand": "MEPPS",
    "model": "Syclops Spoon",
    "type": "spoon",
    "price": 5.49
    },
    {
    "image": "https://www.sail.ca/media/catalog/product/n/o/normark-ssph5_sm.jpg",
    "color1": "grey",
    "color2": "grey",
    "size": "3.75",
    "weight": "1",
    "brand": "BLUE FOX",
    "model": "Strobe Spoon",
    "type": "spoon",
    "price": 5.49
    },
    {
    "image": "https://www.sail.ca/media/catalog/product/n/o/normark-ssph5_p-per1.jpg",
    "color1": "grey",
    "color2": "green",
    "size": "3.75",
    "weight": "1",
    "brand": "BLUE FOX",
    "model": "Strobe Spoon",
    "type": "spoon",
    "price": 5.49
    },
    {
    "image": "https://www.sail.ca/media/catalog/product/n/o/normark-ssph5_rt.jpg",
    "color1": "blue",
    "color2": "grey",
    "size": "3.75",
    "weight": "1",
    "brand": "BLUE FOX",
    "model": "Strobe Spoon",
    "type": "spoon",
    "price": 5.49
    },
    {
    "image": "https://www.sail.ca/media/catalog/product/b/r/brecks-w70_cop.jpg",
    "color1": "salmon",
    "color2": "black",
    "size": "4",
    "weight": "1",
    "brand": "WILLIAMS",
    "model": "Wabler Spoon",
    "type": "spoon",
    "price": 3.99
    },
    {
    "image": "https://www.sail.ca/media/catalog/product/b/r/brecks-w70-1_fw.jpg",
    "color1": "brown",
    "color2": "grey",
    "size": "4",
    "weight": "1",
    "brand": "WILLIAMS",
    "model": "Wabler Classic Spoon 1oz",
    "type": "spoon",
    "price": 12.99
    },
    {
    "image": "https://www.sail.ca/media/catalog/product/b/r/brecks-w70_ghc.jpg",
    "color1": "brown",
    "color2": "black",
    "size": "4",
    "weight": "1",
    "brand": "WILLIAMS",
    "model": "Wabler Spoon",
    "type": "spoon",
    "price": 3.99
    },
    {
    "image": "https://www.sail.ca/media/catalog/product/b/r/brecks-w70_gold.jpg",
    "color1": "green",
    "color2": "black",
    "size": "4",
    "weight": "1",
    "brand": "WILLIAMS",
    "model": "Wabler Spoon",
    "type": "spoon",
    "price": 3.99
    },
    {
    "image": "https://www.sail.ca/media/catalog/product/b/r/brecks-w70_sn.jpg",
    "color1": "grey",
    "color2": "black",
    "size": "4",
    "weight": "1",
    "brand": "WILLIAMS",
    "model": "Wabler Spoon",
    "type": "spoon",
    "price": 3.99
    },
    {
    "image": "https://www.sail.ca/media/catalog/product/b/r/brecks-w70_tiger-clown__01_temp.jpg",
    "color1": "brown",
    "color2": "grey",
    "size": "4",
    "weight": "1",
    "brand": "WILLIAMS",
    "model": "Wabler Classic Spoon 1oz",
    "type": "spoon",
    "price": 12.99
    },
    {
    "image": "https://www.sail.ca/media/catalog/product/b/r/brecks-w70_shc.jpg",
    "color1": "grey",
    "color2": "black",
    "size": "4",
    "weight": "1",
    "brand": "WILLIAMS",
    "model": "Wabler Spoon",
    "type": "spoon",
    "price": 3.99
    },
    {
    "image": "https://www.sail.ca/media/catalog/product/b/r/brecks-c80_grey.jpg",
    "color1": "grey",
    "color2": "black",
    "size": "5.25",
    "weight": "1",
    "brand": "WILLIAMS",
    "model": "Whitefish Spoon",
    "type": "spoon",
    "price": 10.99
    },
    {
    "image": "https://www.sail.ca/media/catalog/product/b/r/brecks-c80_ghc.jpg",
    "color1": "green",
    "color2": "black",
    "size": "5.25",
    "weight": "1",
    "brand": "WILLIAMS",
    "model": "Whitefish Spoon",
    "type": "spoon",
    "price": 10.99
    },
    {
    "image": "https://www.sail.ca/media/catalog/product/b/r/brecks-c80_hn.jpg",
    "color1": "grey",
    "color2": "brown",
    "size": "5.25",
    "weight": "1",
    "brand": "WILLIAMS",
    "model": "Whitefish Spoon",
    "type": "spoon",
    "price": 13.99
    },
    {
    "image": "https://www.sail.ca/media/catalog/product/b/r/brecks-c80_gold.jpg",
    "color1": "green",
    "color2": "black",
    "size": "5.25",
    "weight": "1",
    "brand": "WILLIAMS",
    "model": "Whitefish Spoon",
    "type": "spoon",
    "price": 10.99
    },
    {
    "image": "https://www.sail.ca/media/catalog/product/b/r/brecks-c80_shc.jpg",
    "color1": "grey",
    "color2": "black",
    "size": "5.25",
    "weight": "1",
    "brand": "WILLIAMS",
    "model": "Whitefish Spoon",
    "type": "spoon",
    "price": 10.99
    },
    {
    "image": "https://www.sail.ca/media/catalog/product/n/o/normark-bfmx5_tsg__01.jpg",
    "color1": "pink",
    "color2": "grey",
    "size": "5.5",
    "weight": "1",
    "brand": "BLUE FOX",
    "model": "Matrixx Spoon",
    "type": "spoon",
    "price": 9.99
    },
    {
    "image": "https://www.sail.ca/media/catalog/product/n/o/normark-bfmx5_kgt.jpg",
    "color1": "grey",
    "color2": "grey",
    "size": "5.5",
    "weight": "1",
    "brand": "BLUE FOX",
    "model": "Matrixx Spoon",
    "type": "spoon",
    "price": 9.99
    },
    {
    "image": "https://www.sail.ca/media/catalog/product/n/o/normark-bfmx5_hbsd-b.JPG",
    "color1": "grey",
    "color2": "blue",
    "size": "5.5",
    "weight": "1",
    "brand": "BLUE FOX",
    "model": "Matrixx Spoon",
    "type": "spoon",
    "price": 9.99
    },
    {
    "image": "https://www.sail.ca/media/catalog/product/n/o/normark-bfmx5_hmc.jpg",
    "color1": "grey",
    "color2": "brown",
    "size": "5.5",
    "weight": "1",
    "brand": "BLUE FOX",
    "model": "Matrixx Spoon",
    "type": "spoon",
    "price": 9.99
    },
    {
    "image": "https://www.sail.ca/media/catalog/product/n/o/normark-bfmx5_bpo.jpg",
    "color1": "grey",
    "color2": "grey",
    "size": "5.5",
    "weight": "1",
    "brand": "BLUE FOX",
    "model": "Matrixx Spoon",
    "type": "spoon",
    "price": 9.99
    },
    {
    "image": "https://www.sail.ca/media/catalog/product/n/o/normark-bfmx5_hsd.jpg",
    "color1": "grey",
    "color2": "grey",
    "size": "5.5",
    "weight": "1",
    "brand": "BLUE FOX",
    "model": "Matrixx Spoon",
    "type": "spoon",
    "price": 9.99
    },
    {
    "image": "https://www.sail.ca/media/catalog/product/n/o/normark-bfmx5_hrt.jpg",
    "color1": "grey",
    "color2": "grey",
    "size": "5.5",
    "weight": "1",
    "brand": "BLUE FOX",
    "model": "Matrixx Spoon",
    "type": "spoon",
    "price": 9.99
    },
    {
    "image": "https://www.sail.ca/media/catalog/product/b/r/brecks-c90_grey.jpg",
    "color1": "grey",
    "color2": "grey",
    "size": "6",
    "weight": "1.5",
    "brand": "WILLIAMS",
    "model": "Whitefish Spoon",
    "type": "spoon",
    "price": 11.99
    },
    {
    "image": "https://www.sail.ca/media/catalog/product/b/r/brecks-c90_tgcl__01_temp.jpg",
    "color1": "brown",
    "color2": "grey",
    "size": "6",
    "weight": "1.5",
    "brand": "WILLIAMS",
    "model": "Whitefish Spoon",
    "type": "spoon",
    "price": 11.99
    },
    {
    "image": "https://www.sail.ca/media/catalog/product/b/r/brecks-c90_h.jpg",
    "color1": "grey",
    "color2": "brown",
    "size": "6",
    "weight": "1.5",
    "brand": "WILLIAMS",
    "model": "Whitefish Spoon",
    "type": "spoon",
    "price": 16.99
    },
    {
    "image": "https://www.sail.ca/media/catalog/product/b/r/brecks-c90_sn.jpg",
    "color1": "grey",
    "color2": "black",
    "size": "6",
    "weight": "1.5",
    "brand": "WILLIAMS",
    "model": "Whitefish Spoon",
    "type": "spoon",
    "price": 11.99
    },
    {
    "image": "https://www.sail.ca/media/catalog/product/b/r/brecks-c90_ghc.jpg",
    "color1": "green",
    "color2": "black",
    "size": "6",
    "weight": "1.5",
    "brand": "WILLIAMS",
    "model": "Whitefish Spoon",
    "type": "spoon",
    "price": 11.99
    },
    {
    "image": "https://www.sail.ca/media/catalog/product/b/r/brecks-c90_hn.jpg",
    "color1": "grey",
    "color2": "brown",
    "size": "6",
    "weight": "1.5",
    "brand": "WILLIAMS",
    "model": "Whitefish Spoon",
    "type": "spoon",
    "price": 16.99
    },
    {
    "image": "https://www.sail.ca/media/catalog/product/l/u/lucky-111650_36-pea.jpg",
    "color1": "grey",
    "color2": "grey",
    "size": "6.5",
    "weight": "0",
    "brand": "LUCKY STRIKE",
    "model": "Canoe Wobbler Spoon - 6.5",
    "type": "spoon",
    "price": 10.99
    },
    {
    "image": "https://www.sail.ca/media/catalog/product/l/u/lucky-111650_363.jpg",
    "color1": "grey",
    "color2": "black",
    "size": "6.5",
    "weight": "0",
    "brand": "LUCKY STRIKE",
    "model": "Canoe Wobbler Spoon - 6.5",
    "type": "spoon",
    "price": 10.99
    },
    {
    "image": "https://www.sail.ca/media/catalog/product/d/i/direct-lt8-rw_red---white.jpg",
    "color1": "grey",
    "color2": "brown",
    "size": "8",
    "weight": "0",
    "brand": "LENTHOM",
    "model": "Original Spoon - 0.25",
    "type": "spoon",
    "price": 4.99
    },
    {
    "image": "https://www.sail.ca/media/catalog/product/d/i/direct-lt8-yb_yellow---black.jpg",
    "color1": "gold",
    "color2": "grey",
    "size": "8",
    "weight": "0",
    "brand": "LENTHOM",
    "model": "Original Spoon - 0.25",
    "type": "spoon",
    "price": 4.99
    },
    {
    "image": "https://www.sail.ca/media/catalog/product/n/o/normark-bmsh09_smelt__01.jpg",
    "color1": "grey",
    "color2": "green",
    "size": "9",
    "weight": "0",
    "brand": "STORM",
    "model": "Boom Shad Soft Swimbait - 9",
    "type": "swimbait",
    "price": 6.99
    },
    {
    "image": "https://www.sail.ca/media/catalog/product/m/u/musky-101_lper.jpg",
    "color1": "brown",
    "color2": "grey",
    "size": "9",
    "weight": "4",
    "brand": "MUSKY INNOVATION",
    "model": "Regular Bull Dawg Crankbait - 9",
    "type": "crankbait",
    "price": 34.99
    },
    {
    "image": "https://www.sail.ca/media/catalog/product/m/u/musky-101_lper.jpg",
    "color1": "brown",
    "color2": "grey",
    "size": "9",
    "weight": "4",
    "brand": "MUSKY INNOVATION",
    "model": "Regular Bull Dawg Crankbait - 9",
    "type": "crankbait",
    "price": 34.99
    }
    ])

    const WeatherAndMoonPhase = ({ weather, moonPhase, waterCondition }) => (
      <View style={styles.weatherContainer}>
        <View style={styles.weatherItem}>
          <MaterialIcons name="dark-mode" size={22} color="black" />
          <Text style={{ marginLeft: 5 }}>
            {moonPhase.prevPhase.phase === 3 || moonPhase.prevPhase.phase === 1 ?
            'Fish might be full from feeding.' : moonPhaseLabels[moonPhase.prevPhase.phase]}
          </Text>
        </View>
        <View style={styles.weatherItem}>
          <MaterialIcons name="water-drop" size={24} color="black" />
          <Text style={{ marginLeft: 5 }}>
            {weather.precipitation ? 'It rained, fish likely fed yesterday!' : 'No precipitations, fish might be hungry!'}
          </Text>
        </View>
        <View style={styles.weatherItem}>
          <MaterialIcons name="air" size={24} color="black" />
          <Text style={{ marginLeft: 5 }}>
            {weather.windGust > 10 && waterCondition !== 'muddy' ? 'Wind yesterday, water is dirtier than expected.' : `${weather.windGust} mph`}
          </Text>
        </View>
        <View style={styles.weatherItem}>
          <MaterialIcons name="brightness-3" size={24} color="black" />
          <Text style={{ marginLeft: 5 }}>
            {moonPhase.nextPhase.daysUntilNext <= 2 && moonPhase.nextPhase.phase === 1 ? 'Next Moon Phase: Fish might be more active.' :
             (moonPhase.nextPhase.phase === 2 || moonPhase.nextPhase.phase === 4) ? 'Next Mon Phase: Fish might be less active.' : ''}
          </Text>
        </View>
      </View>
    );

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Image source={{ uri: item.image }} style={[img_styles.rectangle_image_s, { width: 100 }]} />
      <View style={styles.detailsContainer}>
        <Text style={{ fontWeight: 'bold' }}>{item.brand} - {item.model}</Text>
        <Text>Type: {item.type}</Text>
        <Text>Colors: {item.color1}/{item.color2}</Text>
        <Text>Weight: {item.weight}g</Text>
        <Text style={{ fontWeight: 'bold' }}>Price: ${item.price}</Text>
      </View>
    </View>
  );

  const styles = StyleSheet.create({
    itemContainer: {
      flexDirection: 'row',
      padding: 10,
      alignItems: 'center',
      marginVertical: 7,          
      marginHorizontal: 10,   
      borderRadius: 20,        
      backgroundColor: 'rgba(247, 255, 247, 0.8)',
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.22,
      shadowRadius: 2.22,
      elevation: 3,
    },
    detailsContainer: {
      flex: 1,
      marginLeft: 3,
    },
    weatherContainer: {
      flexDirection: 'column',
      justifyContent: 'space-between',
      padding: 10,
      backgroundColor: 'rgba(253, 253, 253, 1)',
      borderRadius: 20,
      margin: 10,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.22,
      shadowRadius: 2.22,
      elevation: 3,
    },
    weatherItem: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 5
    }
  });

  return (
    <ScrollView style={{ flex: 1, backgroundColor: 'white' }}>
      <Image source={{ uri: "https://storage.googleapis.com/puggum-bucket/Screenshot%202024-04-20%20at%206.14.24%E2%80%AFPM%20(1).jpg" }} style={{ width: '100%', height: 330 }} />
      <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 15, marginTop: 9, marginBottom: 4, }}>
      Lures recommended by expert Lucas Deschenes:
    </Text>
      <WeatherAndMoonPhase weather={previousWeather} moonPhase={moonPhase} />
      <FlatList
        data={lures}
        renderItem={renderItem}
        keyExtractor={(item, index) => `lure-${index}`}
      />
    </ScrollView>
  );
}

