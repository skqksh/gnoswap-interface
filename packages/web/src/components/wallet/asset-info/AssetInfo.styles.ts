import { fonts } from "@constants/font.constant";
import styled from "@emotion/styled";
import { media } from "@styles/media";
import mixins from "@styles/mixins";

export const AssetInfoWrapper = styled.div`
  transition: background-color 0.3s ease;
  cursor: pointer;
  min-width: 100%;
  height: 68px;
  color: ${({ theme }) => theme.color.text01};
  ${mixins.flexbox("row", "center", "flex-start")};
  ${fonts.body11};
  &:not(:first-of-type) {
    border-top: 1px solid ${({ theme }) => theme.color.border02};
  }
  &:hover {
    background-color: ${({ theme }) => theme.color.hover04};
  }

  .logo {
    width: 20px;
    height: 20px;
  }

  .name {
    margin: 0px 8px;
  }

  .symbol {
    ${fonts.body12};
    color: ${({ theme }) => theme.color.text04};
  }
`;

export const TableColumn = styled.div<{ tdWidth: number }>`
  width: ${({ tdWidth }) => `${tdWidth}px`};
  min-width: ${({ tdWidth }) => `${tdWidth}px`};
  height: 100%;
  ${mixins.flexbox("row", "center", "flex-end")};
  .logo {
    margin-left: 16px;
  }
  .name,
  .chain,
  .balance {
    color: ${({ theme }) => theme.color.text02};
  }
  .chain {
    padding: 16px;
    ${media.tablet} {
      padding: 16px 0px 16px 12px;
    }
  }
  .balance {
    padding: 16px;
    ${media.tablet} {
      padding: 16px 0px;
    }
  }
  &.left {
    flex-shrink: 0;
    justify-content: flex-start;
  }
`;

export const LoadButton = styled.button`
  ${mixins.flexbox("row", "center", "center")};
  color: ${({ theme }) => theme.color.text04};
  gap: 4px;
  &.withdraw-pd {
    padding-right: 16px;
  }
  &,
  svg * {
    transition: all 0.3s ease;
  }
  svg {
    width: 16px;
    height: 16px;
    * {
      fill: ${({ theme }) => theme.color.icon03};
    }
  }

  &:hover {
    color: ${({ theme }) => theme.color.text03};
    svg * {
      fill: ${({ theme }) => theme.color.icon07};
    }
  }
`;
