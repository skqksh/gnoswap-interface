import styled from "@emotion/styled";
import { fonts } from "@constants/font.constant";
import { media } from "@styles/media";

export const TokenChartGraphWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.color.background15};
  border-radius: 8px;
  justify-content: space-between;

  .data-wrapper {
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 757px;

    .graph {
      border-bottom: 1px solid ${({ theme }) => theme.color.border02};
      border-right: 1px solid ${({ theme }) => theme.color.border02};
    }
    @media (max-width: 930px) {
      max-width: 800px;
    }
    .xaxis-wrapper {
      display: flex;
      flex-direction: row;
      height: 40px;
      width: 100%;
      align-items: center;
      padding: 0 12px;
      justify-content: space-between;
      ${fonts.body12};
      color: ${({ theme }) => theme.color.text04};
      
      span {
        ${fonts.body12};
        color: ${({ theme }) => theme.color.text04};
        ${media.mobile} {
          ${fonts.p4};
        }
      }
      ${media.mobile} {
        height: 30px;
        padding: 0 4px;
      }
    }
  }

  .yaxis-wrapper {
    text-align: center;
    display: flex;
    flex-direction: column-reverse;
    min-width: 50px;
    margin-bottom: 40px;
    padding: 8px 0;
    justify-content: space-between;
    span {
      ${fonts.body12};
      color: ${({ theme }) => theme.color.text04};
    }
    .large-text {
      ${fonts.body12};
    }
    .medium-text {
      ${fonts.p4}
    }
    .small-text {
      ${fonts.p6}
      font-size: 11px;
    }
    ${media.mobile} {
      ${fonts.p7};
      margin-bottom: 30px;
      min-width: 40px;
      padding: 4px 0;
      span {
        ${fonts.p7};
      }
      .large-text {
        ${fonts.p4};
      }
      .medium-text {
        ${fonts.p6}
      }
      .small-text {
        ${fonts.p7}
      }
    }
  }
`;
