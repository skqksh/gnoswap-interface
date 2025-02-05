import { fonts } from "@constants/font.constant";
import { css, type Theme } from "@emotion/react";
import mixins from "@styles/mixins";
import { media } from "@styles/media";

export const wrapper = (theme: Theme) => css`
  ${mixins.flexbox("row", "center", "flex-start")};
  h3 {
    color: ${theme.color.text01};
    ${fonts.body11};
    margin-right: 12px;
  }
  button {
    ${mixins.flexbox("row", "center", "center")};
    ${fonts.p4};
    gap: 4px;
    height: 24px;
    background-color: ${theme.color.background11};
    border-radius: 4px;
    padding: 0px 8px;
    color: ${theme.color.text05};
    margin-left: 4px;
    .link-icon {
      width: 16px;
      height: 16px;
      * {
        fill: ${theme.color.icon03};
      }
    }
  }
  button:hover {
    span {
      color: ${theme.color.text03};
    }
    transition: all 0.3s ease;
    .link-icon {
      * {
        fill: ${theme.color.icon07};
      }
    }
  }
  .group-button {
    ${mixins.flexbox("row", "flex-start", "flex-start")};
  }
  ${media.mobile} {
    ${mixins.flexbox("column", "flex-start", "flex-start")};
    gap: 8px;
    .group-button {
      ${mixins.flexbox("row", "center", "flex-start")};
      button {
        &:first-of-type {
          margin-left: 0;
        }
      }
    }
    margin-top: 8px;
  }
`;
