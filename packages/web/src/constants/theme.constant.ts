import { ThemeColorType, WindowSizeType } from "@styles/ThemeTypes";

export const THEME_WINDOW_SIZES: WindowSizeType = {
  desktop: "",
  tablet: "",
  mobile: "",
};

const palette = {
  black: "#0A0E17",
  black2: "#000000",
  white: "#FFFFFF",
  whiteOpacity05: "#FFFFFF80",
  whiteOpacity07: "#FFFFFFB2",
  point: "#0059FF",
  gray600: "#141A29",
  gray500: "#1C2230",
  gray400: "#596782",
  gray300: "#90A2C0",
  gray200: "#C3D2EA",
  gray100: "#E0E8F4",
  gray010: "#DADADA",
  green: "#16C78A",
  green400: "#5CD865",
  brand900: "#060E5A",
  brand800: "#0B166D",
  brand700: "#112188",
  brand600: "#192EA2",
  brand500: "#233DBD",
  brand400: "#536CD7",
  brand300: "#788FEB",
  brand300Opacity03: "#788FEB4D",
  brand200: "#A7B9F8",
  brand100: "#D2DCFB",
  red: "#EA3943",
  red400: "#EE4B3C",
  gray600Opacity: "#141A2980",
  gray100Opacity: "#E0E8F480",
  gray100Opacity06: "#E0E8F466",
  blackOpacity05: "#0A0E1780",
  blackOpacity07: "#0A0E17B2",
  gradient1: "#F3F6FB99",
  gradient2: "#141A2980",
  gradient3: "#141A2900",
  gradient4: "linear-gradient(to left, #536CD7, #A7B9F8)",
  gradient5: "linear-gradient(to right, #59678240, #59678200)",
  gradient6: "linear-gradient(0, #E0E8F4 0%, #E0E8F4 100%)",
  gradient7: "linear-gradient(90deg, rgba(89, 103, 130, 0.25) 0%, rgba(89, 103, 130, 0) 99.91%)",
  gradient8: "linear-gradient(90deg, #E0E8F4 0%, rgba(224, 232, 244, 0) 100%)",
  whiteGradient4: "linear-gradient(to left, #536CD7, #233DBD)",
  redDark: "#ff2e2e66",
  greenDark: "#2eff8266",
  transparent: "transparent",
  none: "none",
  shadowDark: "8px 8px 20px rgba(0, 0, 0, 0.2)",
  shadowDark1: "10px 14px 60px rgba(0, 0, 0, 0.4)",
  shadowLight: "8px 8px 20px rgba(0, 0, 0, 0.08)",
};

const colors = {
  global: {
    ...palette,
  },
  dark: {
    blackBG: palette.black,
    blackOpacity07BG: palette.blackOpacity07,
    blackOpacity05BG: palette.blackOpacity05,
    gray600BG: palette.gray600,
    gray500BG: palette.gray500,
    gray400BG: palette.gray400,
    gray200BG: palette.gray200,
    brand300Opacity03BG: palette.brand300Opacity03,
    whiteText1: palette.gray100,
    gray100Text2: palette.gray100,
    gray200Text3: palette.gray200,
    gray300Text4: palette.gray300,
    gray400Text5: palette.gray400,
    whiteIcon1: palette.white,
    gray100Icon2: palette.gray100,
    gray200Icon3: palette.gray200,
    gray300Icon4: palette.gray300,
    gray400Icon5: palette.gray400,
    gray500Icon6: palette.gray500,
    gray600Border1: palette.gray600,
    gray500Border2: palette.gray500,
    gray400Border3: palette.gray400,
    gray600Hover1: palette.gray600,
    blackOpacity07Hover2: palette.blackOpacity07,
    brand900BG: palette.brand900,
    brand700Tooltip1: palette.brand700,
    brand700TooltipBorder: palette.brand700,
    gradientBG: palette.gradient5,
  },
  white: {
    whiteBG: palette.white,
    whiteOpacity05BG: palette.whiteOpacity05,
    whiteOpacity07BG: palette.whiteOpacity07,
    gray100BG: palette.gray100,
    gray200BG: palette.gray200,
    gray300BG: palette.gray300,
    gray400BG: palette.gray400,
    gray100Opacity05BG: palette.gray100Opacity,
    gray100Text1: palette.gray100,
    gray200Text1: palette.gray200,
    gray300Text1: palette.gray300,
    gray400Text2: palette.gray400,
    gray500Text3: palette.gray500,
    gray200Icon1: palette.gray200,
    gray300Icon1: palette.gray300,
    gray400Icon2: palette.gray400,
    gray500Icon1: palette.gray500,
    whiteBorder1: palette.white,
    whiteIcon1: palette.white,
    gray100Border1: palette.gray100,
    gray200Border2: palette.gray200,
    gray100Opacity04Hover1: palette.gray100Opacity,
    gray100Hover2: palette.gray100Opacity06,
    brand700BG: palette.brand700,
    brand600TooltipBorder: palette.brand600,
    gradient1: palette.gradient1,
    brand300Opacity03BG: palette.brand300Opacity03,
  },
};

export const DARK_THEME_COLORS: ThemeColorType = {
  background01: colors.dark.blackBG,
  background02: colors.dark.gray500BG,
  background03: colors.global.gray600Opacity,
  background04: colors.global.brand500,
  background04Hover: colors.global.brand600,
  background05: colors.global.gray500,
  background05Hover: colors.global.gray600,
  background06: colors.dark.gray600BG,
  background07: colors.global.gray400,
  background08: colors.global.gray600Opacity,
  background09: colors.dark.blackOpacity07Hover2,
  background10: colors.dark.brand900BG,
  background11: colors.dark.gray600BG,
  background12: colors.dark.gray500BG,
  background13: colors.global.gray500,
  background14: colors.dark.brand900BG,
  background15: colors.dark.blackBG,
  background16: colors.dark.gray200BG,
  background17: colors.dark.gray400BG,
  background18: colors.global.brand900,
  background19: colors.global.brand300Opacity03,
  background20: colors.dark.blackOpacity07BG,
  background21: colors.dark.brand900BG,
  background22: colors.global.none,
  background23: colors.dark.gradientBG,
  background24: colors.global.brand500,
  background25: colors.dark.blackBG,
  bgLoading: colors.global.black2,
  backgroundOpacity: colors.dark.blackOpacity07BG,
  backgroundOpacity2: colors.dark.blackOpacity07BG,
  backgroundOpacity3: colors.global.gray600Opacity,
  backgroundOpacity4: colors.dark.brand300Opacity03BG,
  backgroundOpacity5: colors.dark.blackOpacity05BG,
  backgroundGradient: colors.dark.gray600BG,
  backgroundGradient2: colors.global.gradient2,
  backgroundGradient3: colors.global.gradient3,
  backgroundGradient4: colors.global.gradient4,
  backgroundGradient5: colors.global.gradient5,
  backgroundGradient6: colors.global.gradient7,
  border01: colors.dark.gray600Border1,
  border02: colors.dark.gray500Border2,
  border03: colors.dark.gray400Border3,
  border04: colors.dark.brand700TooltipBorder,
  border05: colors.global.gray400,
  border06: colors.global.brand500,
  border07: colors.global.gray100,
  border08: colors.dark.gray400Border3,
  border09: colors.dark.gray500Border2,
  border10: colors.dark.gray600Border1,
  border11: colors.dark.gray500Border2,
  border12: colors.dark.blackOpacity07BG,
  border13: colors.dark.gray600Border1,
  border14: colors.global.transparent,
  border15: colors.dark.gray400Border3,
  border16: colors.dark.brand700TooltipBorder,
  hover01: colors.dark.gray600Hover1,
  hover02: colors.dark.blackOpacity07Hover2,
  hover03: colors.dark.gray500BG,
  hover04: colors.dark.gray600Hover1,
  hover05: colors.dark.gray600Hover1,
  text01: colors.dark.whiteText1,
  text02: colors.dark.gray100Text2,
  text03: colors.dark.gray200Text3,
  text04: colors.dark.gray400Text5,
  text05: colors.dark.gray300Text4,
  text06: colors.global.brand100,
  text07: colors.global.brand400,
  text08: colors.global.brand300,
  text09: colors.dark.whiteText1,
  text10: colors.dark.gray300Text4,
  text11: colors.dark.gray100Text2,
  text12: colors.dark.gray200Text3,
  text13: colors.dark.whiteText1,
  text14: colors.dark.whiteText1,
  text15: colors.global.brand100,
  text16: colors.dark.gray200Text3,
  text17: colors.dark.gray400Text5,
  text18: colors.dark.whiteText1,
  text19: colors.dark.gray100Text2,
  text20: colors.dark.gray100Text2,
  text21: colors.global.brand100,
  text22: colors.dark.gray400Text5,
  text23: colors.dark.gray100Text2,
  text24: colors.global.brand500,
  text25: colors.global.brand200,
  text26: colors.global.brand500,
  icon01: colors.dark.gray100Icon2,
  icon02: colors.dark.gray200Icon3,
  icon03: colors.dark.gray400Icon5,
  icon04: colors.global.gray010,
  icon05: colors.dark.gray300Icon4,
  icon06: colors.global.brand400,
  icon07: colors.dark.gray200Icon3,
  icon08: colors.dark.gray400Icon5,
  icon09: colors.global.black2,
  icon10: colors.dark.gray200Icon3,
  icon11: colors.dark.gray100Icon2,
  icon13: colors.dark.whiteIcon1,
  icon14: colors.global.brand300,
  icon15: colors.dark.gray100Icon2,
  icon16: colors.dark.gray300Icon4,
  tooltipBackground: colors.dark.brand900BG,
  point: colors.global.point,
  green01: colors.global.green,
  green02: colors.global.green400,
  red01: colors.global.red,
  red02: colors.global.red400,
  select: colors.dark.gray600Hover1,
  redDark: colors.global.redDark,
  greenDark: colors.global.greenDark,
  shadow: colors.global.shadowDark,
  shadow01: colors.global.shadowDark1,
  shadow02: colors.global.shadowDark,
};

export const LIGHT_THEME_COLORS: ThemeColorType = {
  background01: colors.white.whiteBG,
  background02: colors.white.whiteBG,
  background03: colors.white.whiteBG,
  background04: colors.global.brand500,
  background04Hover: colors.global.brand600,
  background05: colors.white.gray100BG,
  background05Hover: colors.white.gray100Opacity04Hover1,
  background06: colors.white.whiteBG,
  background07: colors.global.gray600,
  background08: colors.global.gray100Opacity06,
  background09: colors.white.gray100BG,
  background10: colors.white.gray100BG,
  background11: colors.white.gray100Opacity05BG,
  background12: colors.white.gray200BG,
  background13: colors.white.gray100Opacity05BG,
  background14: colors.global.brand700,
  background15: colors.white.gray100Opacity05BG,
  background16: colors.white.gray200BG,
  background17: colors.white.gray400BG,
  background18: colors.global.gray100Opacity06,
  background19: colors.global.brand300Opacity03,
  background20: colors.white.whiteBG,
  background21: colors.global.whiteGradient4,
  background22: colors.global.brand500,
  background23: colors.white.whiteBG,
  background24: colors.global.brand600,
  background25: colors.white.gray100BG,
  bgLoading: colors.white.whiteBG,
  backgroundOpacity: colors.white.gray100Opacity05BG,
  backgroundOpacity2: colors.white.whiteOpacity07BG,
  backgroundOpacity3: colors.white.gray100Opacity05BG,
  backgroundOpacity4: colors.white.brand300Opacity03BG,
  backgroundOpacity5: colors.white.whiteOpacity05BG,
  backgroundGradient: colors.white.gray100BG,
  backgroundGradient2: colors.white.gradient1,
  backgroundGradient3: colors.white.whiteBG,
  backgroundGradient4: colors.global.whiteGradient4,
  backgroundGradient5: colors.global.gradient6,
  backgroundGradient6: colors.global.gradient8,
  border01: colors.white.gray100Border1,
  border02: colors.white.gray100Border1,
  border03: colors.white.gray200Border2,
  border04: colors.white.brand600TooltipBorder,
  border05: colors.global.gray400,
  border06: colors.global.point,
  border07: colors.global.gray100,
  border08: colors.white.gray100Border1,
  border09: colors.white.whiteBorder1,
  border10: colors.white.whiteBorder1,
  border11: colors.white.gray200Border2,
  border12: colors.white.gray100Border1,
  border13: colors.global.transparent,
  border14: colors.white.gray100Border1,
  border15: colors.global.gray300,
  border16: colors.white.gray100Border1,
  hover01: colors.white.gray100Opacity04Hover1,
  hover02: colors.white.gray100Hover2,
  hover03: colors.white.gray100Opacity04Hover1,
  hover04: colors.white.gray100Hover2,
  hover05: colors.global.brand400,
  text01: colors.white.gray500Text3,
  text02: colors.white.gray500Text3,
  text03: colors.white.gray400Text2,
  text04: colors.white.gray300Text1,
  text05: colors.white.gray300Text1,
  text06: colors.global.brand100,
  text07: colors.global.brand400,
  text08: colors.global.brand300,
  text09: colors.global.white,
  text10: colors.white.gray400Text2,
  text11: colors.white.gray300Text1,
  text12: colors.white.gray300Text1,
  text13: colors.white.gray200Text1,
  text14: colors.white.gray400Text2,
  text15: colors.white.gray100Text1,
  text16: colors.white.gray500Text3,
  text17: colors.white.gray200Text1,
  text18: colors.white.gray300Text1,
  text19: colors.white.gray400Text2,
  text20: colors.global.white,
  text21: colors.white.gray300Text1,
  text22: colors.white.gray400Text2,
  text23: colors.global.point,
  text24: colors.global.brand500,
  text25: colors.global.brand500,
  text26: colors.global.brand100,
  icon01: colors.white.gray300Icon1,
  icon02: colors.white.gray300Icon1,
  icon03: colors.white.gray300Icon1,
  icon04: colors.global.gray010,
  icon05: colors.white.gray300Icon1,
  icon06: colors.global.brand400,
  icon07: colors.white.gray400Icon2,
  icon08: colors.white.gray200Icon1,
  icon09: colors.global.black2,
  icon10: colors.white.gray500Icon1,
  icon11: colors.white.gray400Icon2,
  icon13: colors.white.whiteIcon1,
  icon14: colors.global.brand300,
  icon15: colors.global.white,
  icon16: colors.white.gray400Icon2,
  tooltipBackground: colors.white.brand700BG,
  point: colors.global.point,
  green01: colors.global.green,
  green02: colors.global.green400,
  red01: colors.global.red,
  red02: colors.global.red400,
  select: colors.global.white,
  redDark: colors.global.redDark,
  greenDark: colors.global.greenDark,
  shadow: colors.global.shadowLight,
  shadow01: colors.global.shadowLight,
  shadow02: colors.global.none,
};
