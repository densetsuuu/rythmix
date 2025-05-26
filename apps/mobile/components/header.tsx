// @ts-ignore
import HeaderSVG from '../assets/svg/header.svg';
import {View} from "react-native";

export function Header() {
    return (<View className="flex bg-rythmix-black items-center justify-center pb-4 pt-20 mt-[-70px]">
                <HeaderSVG width={191} height={34} />
            </View>);

}