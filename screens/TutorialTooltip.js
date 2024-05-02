import React from "react";
import { View, Text, Platform } from "react-native";
import {
  text_style,
} from "../global/global-styles";
import { loadTranslations } from "../global/localization";
import { 
  width, 
  tutorial_transparent,
} from "../global/global-constants";
import { reactIfView } from "../global/global-functions";
import Tooltip, { TooltipChildrenContext } from 'react-native-walkthrough-tooltip';
import { updateTutorialAndGetNext } from "../global/utils/tutorial.utils";

const TutorialTooltip = ({conditions, style, tutorial, translations, tutRoute, 
  setCurrentTutorial, placement="top", tooltipStyle}) => {
  return <>
    {reactIfView(conditions, <Tooltip
      contentStyle={style}
      backgroundColor={tutorial_transparent}
      isVisible={conditions}
      content={<Text style={[text_style.fontColorWhite]}>{loadTranslations(translations)}</Text>}
      placement={placement}
      tooltipStyle={tooltipStyle}
      onClose={async () => {setCurrentTutorial(await updateTutorialAndGetNext(tutorial, tutRoute))}}
    >
      <TooltipChildrenContext.Consumer>
        {({ tooltipDuplicate }) => (
          reactIfView(!tooltipDuplicate,
            <View style={[{height:Platform.OS === 'android' ? 50 : 0, width: width}]}></View>
          )
        )}
      </TooltipChildrenContext.Consumer>
    </Tooltip>
    )}
  </>
}

export default TutorialTooltip;