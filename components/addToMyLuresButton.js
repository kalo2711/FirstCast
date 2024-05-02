import { useState } from "react";
import { loadTranslations } from "../global/localization";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import Icon from "react-native-ico-material-design";
import { addToMyLures } from "../global/utils/add-to-my-lures.util";
import { ADD_ICON, COLOR_ERROR, COLOR_SUCCEED, X_ICON, primary_color } from "../global/global-constants";
import {
    btn_style,
    flex_style,
    margin_styles,
    padding_styles,
    text_style,
} from "../global/global-styles";


export function AddToMyLureButton({ option }) {
    const [buttonContent, setButtonContent] = useState('');
    const [buttonIcon, setButtonIcon] = useState('add-plus-button')
    const [iconColor, setIconColor] = useState('black');
    const [isLoading, setLoading] = useState(false);

    async function onButtonPress() {
        try {
            if (!isLoading) {
                setLoading(true);
                await addToMyLures(option.id, onPass, onFail, onFailDupe);
                setLoading(false);
            }
        }
        catch (e) {
            console.error(e);
            setLoading(false);
        }
    }


    function onPass() {
        setButtonContent(loadTranslations('addToMyLuresSucceed'));
        setButtonIcon(ADD_ICON);
        setIconColor(COLOR_SUCCEED);
    }
    function onFail() {
        setButtonContent(loadTranslations('addToMyLuresFail'));
        setButtonIcon(X_ICON);
        setIconColor(COLOR_ERROR);
    }
    function onFailDupe() {
        setButtonContent(loadTranslations('addToMyLuresDupe'));
        setButtonIcon(X_ICON);
        setIconColor(COLOR_ERROR)
    }

    return (
        <View>
            <TouchableOpacity enabled={false} style={[btn_style.button, btn_style.buttonReversed, btn_style.round, btn_style.buttonSmall, margin_styles.vertical_space_md]} onPress={onButtonPress} activeOpacity={isLoading ? 1 : 0.2}>
                {isLoading ?
                    <View style={[padding_styles.space_s, flex_style.flex, flex_style.center]}>
                        <ActivityIndicator style={[]} size="large" color={primary_color} />
                    </View>
                    :
                    <View style={[padding_styles.space_s, flex_style.flex, flex_style.center]}>
                        <Icon style={[margin_styles.horizontal_space_s]} name={buttonIcon} color={iconColor}></Icon>
                        <Text style={[text_style.bold, text_style.fontColorPrimary]}>{buttonContent}</Text>
                    </View>
                }
            </TouchableOpacity>
        </View>

    );
}