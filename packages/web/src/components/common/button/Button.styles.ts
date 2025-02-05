import { CSSProperties } from "react";
import styled from "@emotion/styled";
import mixins from "@styles/mixins";
import { ThemeColorKeyTypes } from "@styles/ThemeTypes";
import { ButtonHierarchy } from "./Button";
import { fonts, type FontsKey } from "@constants/font.constant";

export interface ButtonStyleProps {
  hierarchy?: ButtonHierarchy;
  fontType?: FontsKey;
  textColor?: ThemeColorKeyTypes;
  arrowColor?: ThemeColorKeyTypes;
  bgColor?: ThemeColorKeyTypes;
  fullWidth?: boolean;
  gap?: CSSProperties["gap"];
  width?: CSSProperties["width"];
  height?: CSSProperties["height"];
  radius?: CSSProperties["borderRadius"];
  justify?: CSSProperties["justifyContent"];
  padding?: CSSProperties["padding"];
  minWidth?: CSSProperties["minWidth"];
  hoverColor?: ThemeColorKeyTypes;
  disabledColor?: ThemeColorKeyTypes;
}

export const ButtonWrapper = styled.button<ButtonStyleProps>`
  ${({ justify }) => mixins.flexbox("row", "center", justify ?? "center")};
  gap: ${({ gap }) => {
    if (gap) return typeof gap === "number" ? gap + "px" : gap;
    return "";
  }};
  width: ${({ width, fullWidth }) => {
    if (width) return typeof width === "number" ? width + "px" : width;
    if (fullWidth) return "100%";
    return "auto";
  }};
  min-width: ${({ minWidth }) => {
    if (minWidth)
      return typeof minWidth === "number" ? minWidth + "px" : minWidth;
    return "auto";
  }};
  height: ${({ height }) => {
    if (height) return typeof height === "number" ? height + "px" : height;
    return "auto";
  }};
  border-radius: ${({ radius }) => (radius ? radius : "8px")};
  padding: ${({ padding }) => padding};
  transition: background-color 0.3s ease;
  background-color: ${({ hierarchy, bgColor, theme }) => {
    if (hierarchy === ButtonHierarchy.Primary) return theme.color.background04;
    if (hierarchy === ButtonHierarchy.Gray) return theme.color.background17;
    if (hierarchy === ButtonHierarchy.Dark) return theme.color.background05;
    return theme.color[bgColor ?? "background04"];
  }};

  &.selected,
  &:hover {
    background-color: ${({ hierarchy, theme, hoverColor }) => {
      if (hoverColor) {
        return hoverColor;
      }
      if (hierarchy === ButtonHierarchy.Primary)
        return theme.color.background04Hover;
      if (hierarchy === ButtonHierarchy.Dark)
        return theme.color.background05Hover;
      return;
    }};
    & .arrow-icon path {
      fill: ${({ theme, arrowColor, hierarchy }) => {
        if (hierarchy === ButtonHierarchy.Primary) return theme.color.text09;
        return theme.color[arrowColor ?? "text10"];
      }};
    }
  }
  &:disabled {
    background-color: ${({ hierarchy, theme, disabledColor }) => {
      if (disabledColor) {
        return disabledColor;
      }
      if (hierarchy === ButtonHierarchy.Primary)
        return theme.color.background17;
      return;
    }};
  }

  & .arrow-icon path {
    fill: ${({ theme, arrowColor, hierarchy }) => {
      if (hierarchy === ButtonHierarchy.Primary) return theme.color.text09;
      return theme.color[arrowColor ?? "text18"];
    }};
  }
`;

export const StyledText = styled.span<ButtonStyleProps>`
  ${({ fontType }) => fonts[fontType ?? "body9"]};
  color: ${({ theme, textColor, hierarchy }) => {
    if (hierarchy === ButtonHierarchy.Primary) return theme.color.text09;
    if (hierarchy === ButtonHierarchy.Gray) return theme.color.text20;
    return theme.color[textColor ?? "text03"];
  }};
`;
