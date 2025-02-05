import { fonts } from "@constants/font.constant";
import styled from "@emotion/styled";
import { media } from "@styles/media";
import mixins from "@styles/mixins";

export const WalletBalanceDetailWrapper = styled.div`
  ${mixins.flexbox("row", "flex-start", "flex-start")};
  width: 100%;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.color.background03};
  border: 1px solid ${({ theme }) => theme.color.border02};
  @media (max-width: 968px) {
    flex-direction: column;
  }
  ${media.mobile} {
    flex-direction: column;
  }
`;

export const InfoWrapper = styled.div`
  ${mixins.flexbox("row", "center", "flex-start")};
  border-left: 1px solid ${({ theme }) => theme.color.border02};
  width: 100%;
  padding: 24px 36px;
  gap: 16px;
  height: 121px;
  ${media.tablet} {
    padding: 24px;
  }
  ${media.mobile} {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 12px;
    height: auto;
    border-left: none;
  }
  .column-batch {
    ${mixins.flexbox("column", "flex-start", "flex-start")};
    gap: 8px;
  }

  .title-wrapper {
    ${mixins.flexbox("row", "center", "center")};
    gap: 4px;
    flex-shrink: 0;

    .title {
      flex-shrink: 0;
      ${fonts.body12}
      color: ${({ theme }) => theme.color.text04};
    }

    svg {
      width: 16px;
      height: 16px;
    }
    path {
      fill: ${({ theme }) => theme.color.icon03};
    }
  }

  .value-wrapper {
    ${mixins.flexbox("row", "flex-end", "center")};
    width: 100%;

    ${media.mobile} {
      gap: 8px;
    }
    .value {
      display: inline-flex;
      width: 100%;
      ${fonts.body2};
      color: ${({ theme }) => theme.color.text02};
      ${media.tablet} {
        ${fonts.body4};
      }
      ${media.mobile} {
        ${fonts.body6};
      }
    }
    .button-wrapper {
      flex-shrink: 0;
    }
  }
`;

export const InfoTooltipContent = styled.div`
  ${mixins.flexbox("column", "flex-start", "flex-start")};
  width: calc(300px - 32px);
  ${fonts.body12};
  color: ${({ theme }) => theme.color.text15};
  background-color: ${({ theme }) => theme.color.background14};
`;
