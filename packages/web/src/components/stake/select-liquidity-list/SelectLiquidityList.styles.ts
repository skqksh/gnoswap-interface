import { fonts } from "@constants/font.constant";
import { css, type Theme } from "@emotion/react";
import mixins from "@styles/mixins";
import { inputStyle } from "@components/stake/stake-liquidity/StakeLiquidity.styles";
import { media } from "@styles/media";

export const wrapper = (theme: Theme) => css`
  ${inputStyle(theme)};
  ${mixins.flexbox("column", "center", "center")};
  width: 100%;
  gap: 4px;
  .checked-all-wrap {
    ${mixins.flexbox("row", "center", "space-between")};
    width: 100%;
    height: 32px;
    padding: 0px 15px;
    color: ${theme.color.text10};
    ${fonts.body12};
    .custom-label {
      margin-left: 8px;
    }
    .wrapper-check-label {
      ${mixins.flexbox("row", "center", "flex-start")}
    }
    ${media.mobile} {
      padding: 0 11px;
    }
  }
  ul {
    ${mixins.flexbox("column", "center", "center")};
    gap: 4px;
    width: 100%;
  }
`;
