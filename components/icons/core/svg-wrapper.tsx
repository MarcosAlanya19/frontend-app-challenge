import { View, ViewProps } from "react-native";
import Svg, { SvgProps } from "react-native-svg";

interface SvgWrapperProps extends SvgProps {
  width?: number;
  height?: number;
  containerProps?: ViewProps;
  children: React.ReactNode;
}

export function SvgWrapper({
  width,
  height,
  containerProps,
  children,
  ...svgProps
}: SvgWrapperProps) {
  return (
    <View {...containerProps}>
      <Svg width={width} height={height} {...svgProps}>
        {children}
      </Svg>
    </View>
  );
}
