import React from "react";
import { Text, TextProps, View } from "react-native";
import MaskedView from "@react-native-masked-view/masked-view";
import { LinearGradient as ExpoLinearGradient } from "expo-linear-gradient";

type GradientVariant = "primary" | "secondary";

interface GradientTextProps extends TextProps {
  variant: GradientVariant;
  block?: boolean;
  shadow?: boolean;
}

const GradientText: React.FC<GradientTextProps> = ({ shadow = false, block, variant, style, children, ...props }) => {
  return (
    <View style={{ position: 'relative' }}>
      {/* Masque le texte derrière le gradient */}
      <MaskedView maskElement={<Text {...props} style={style}>{children}</Text>}>
        <ExpoLinearGradient
          colors={["#9899FF", "#FE63FF", "#FF2C00"]}
          start={variant === "primary" ? { x: 0, y: 0 } : { x: 1, y: 0 }}
          end={variant === "primary" ? { x: 1, y: 0 } : { x: 0, y: 0 }}
          className={block ? "w-96" : ""}
        >
          <Text {...props} style={[style, { opacity: 0 }]}>{children}</Text>
        </ExpoLinearGradient>
      </MaskedView>
      {/* Applique l'ombre sur un conteneur parent */}
      { shadow && (
        <Text {...props} className="font-black uppercase text-2xl"
              style={[
                style,
                {
                  textShadowColor: "#00000090",
                  textShadowOffset: { width: 0, height: 4 },
                  textShadowRadius: 4,
                  position: 'absolute',
                  zIndex: -1,
                },
              ]}>{children}</Text>
      )}

    </View>
  );
};

export default GradientText;
