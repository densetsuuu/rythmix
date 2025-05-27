import React from "react";
import { Text, TextProps, View, StyleSheet, TextStyle } from "react-native";
import MaskedView from "@react-native-masked-view/masked-view";
import { LinearGradient as ExpoLinearGradient } from "expo-linear-gradient";

type GradientVariant = "primary" | "secondary";

interface GradientTextProps extends TextProps {
  variant: GradientVariant;
  block?: boolean;
  shadow?: boolean;
  border?: boolean;
}

const GradientText: React.FC<GradientTextProps> = ({
                                                     shadow = false,
                                                     block,
                                                     variant,
                                                     border = false,
                                                     style,
                                                     children,
                                                     ...props
                                                   }) => {
  const baseStyle = StyleSheet.flatten(style) as TextStyle;

  const fontSize = baseStyle?.fontSize || 14;
  const lineHeight = baseStyle?.lineHeight || fontSize * 1.2;

  const renderBorder = () => {
    const radius = 6;
    const offsets: [number, number][] = [];

    for (let dx = -radius; dx <= radius; dx++) {
      for (let dy = -radius; dy <= radius; dy++) {
        if (dx === 0 && dy === 0) continue;
        offsets.push([dx, dy]);
      }
    }

    return offsets.map(([dx, dy], idx) => (
      <Text
        key={idx}
        {...props}
        style={[
          baseStyle,
          {
            color: "white",
            position: "absolute",
            lineHeight,
            transform: [{ translateX: dx }, { translateY: dy }],
            zIndex: -2,
          },
        ]}
      >
        {children}
      </Text>
    ));
  };

  return (
    <View style={{ position: "relative" }}>
      {border && renderBorder()}

      <MaskedView
        maskElement={
          <Text {...props} style={[baseStyle, { lineHeight }]}>
            {children}
          </Text>
        }
      >
        <ExpoLinearGradient
          colors={["#9899FF", "#FE63FF", "#FF2C00"]}
          start={variant === "primary" ? { x: 0, y: 0 } : { x: 1, y: 0 }}
          end={variant === "primary" ? { x: 1, y: 0 } : { x: 0, y: 0 }}
          style={block ? { width: 384 } : undefined}
        >
          <Text
            {...props}
            style={[baseStyle, { opacity: 0, lineHeight }]}
          >
            {children}
          </Text>
        </ExpoLinearGradient>
      </MaskedView>

      {shadow && (
        <Text
          {...props}
          style={[
            baseStyle,
            {
              lineHeight,
              textShadowColor: "#00000090",
              textShadowOffset: { width: 0, height: 4 },
              textShadowRadius: 4,
              position: "absolute",
              zIndex: -3,
            },
          ]}
        >
          {children}
        </Text>
      )}
    </View>
  );
};

export default GradientText;
