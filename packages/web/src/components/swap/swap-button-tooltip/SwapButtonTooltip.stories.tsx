import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import SwapButtonTooltip from "./SwapButtonTooltip";
import { css } from "@emotion/react";
import { SwapSummaryInfo } from "@models/swap/swap-summary-info";

const swapSummaryInfo: SwapSummaryInfo = {
  tokenA: {
    chainId: "test3",
    address: "0x111111111117dC0aa78b770fA6A738034120C302",
    path: "gno.land/r/demo/1inch",
    name: "1inch",
    symbol: "1INCH",
    decimals: 6,
    logoURI: "https://assets.coingecko.com/coins/images/13469/thumb/1inch-token.png?1608803028",
    priceId: "1inch",
    createdAt: "1999-01-01T00:00:01Z"
  },
  tokenB: {
    chainId: "test3",
    address: "0x111111111117dC0aa78b770fA6A738034120C302",
    path: "gno.land/r/demo/1inch",
    name: "1inch",
    symbol: "1INCH",
    decimals: 6,
    logoURI: "https://assets.coingecko.com/coins/images/13469/thumb/1inch-token.png?1608803028",
    priceId: "1inch",
    createdAt: "1999-01-01T00:00:01Z"
  },
  swapDirection: "EXACT_IN",
  swapRate: 1.14,
  swapRateUSD: 1.14,
  priceImpact: 0.3,
  guaranteedAmount: {
    amount: 45124,
    currency: "GNOT"
  },
  gasFee: {
    amount: 0.000001,
    currency: "GNOT"
  },
  gasFeeUSD: 0.1
};

export default {
  title: "swap/SwapButtonTooltip",
  component: SwapButtonTooltip,
} as ComponentMeta<typeof SwapButtonTooltip>;

const Template: ComponentStory<typeof SwapButtonTooltip> = args => (
  <div css={wrapper}>
    <div>
      <SwapButtonTooltip {...args} />
    </div>
  </div>
);

export const Default = Template.bind({});
Default.args = {
  swapSummaryInfo,
};

const wrapper = () => css`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  margin-top: 200px;
`;
