import React, { useState, useEffect } from "react";
import TokenInfoContent from "@components/token/token-info-content/TokenInfoContent";
import { MATH_NEGATIVE_TYPE } from "@constants/option.constant";

export const performanceInit = [
  {
    createdAt: "Today",
    amount: {
      status: MATH_NEGATIVE_TYPE.NEGATIVE,
      value: "-$152.25",
    },
    change: {
      status: MATH_NEGATIVE_TYPE.POSITIVE,
      value: "+17.43%",
    },
  },
  {
    createdAt: "30 day",
    amount: {
      status: MATH_NEGATIVE_TYPE.NEGATIVE,
      value: "-$152.25",
    },
    change: {
      status: MATH_NEGATIVE_TYPE.POSITIVE,
      value: "+17.43%",
    },
  },
  {
    createdAt: "60 day",
    amount: {
      status: MATH_NEGATIVE_TYPE.NEGATIVE,
      value: "-$152.25",
    },
    change: {
      status: MATH_NEGATIVE_TYPE.POSITIVE,
      value: "+17.43%",
    },
  },
  {
    createdAt: "90 day",
    amount: {
      status: MATH_NEGATIVE_TYPE.NEGATIVE,
      value: "-$152.25",
    },
    change: {
      status: MATH_NEGATIVE_TYPE.POSITIVE,
      value: "+17.43%",
    },
  },
];

export const priceInfomationInit = {
  priceChange1h: {
    status: MATH_NEGATIVE_TYPE.NEGATIVE,
    value: "-54.00%",
  },
  priceChange24h: {
    status: MATH_NEGATIVE_TYPE.POSITIVE,
    value: "+54.00%",
  },
  priceChange7d: {
    status: MATH_NEGATIVE_TYPE.NEGATIVE,
    value: "-54.00%",
  },
  priceChange30d: {
    status: MATH_NEGATIVE_TYPE.POSITIVE,
    value: "+54.00%",
  },
};

export const marketInformationInit = {
  popularity: "#1",
  tvl: "$230.12M",
  volume24h: "$230.12M",
  fees24h: "$230.12M",
};

const TokenInfoContentContainer: React.FC = () => {
  const [loadingPricePerform, setLoadingPricePerform] = useState(true);
  const [loadingPriceInfo, setLoadingPriceInfo] = useState(true);
  const [loadingMarketInfo, setLoadingMarketInfo] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoadingPricePerform(false);
      setLoadingPriceInfo(false);
      setLoadingMarketInfo(false);
    }, 2000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <TokenInfoContent
      performance={performanceInit}
      priceInfo={priceInfomationInit}
      marketInfo={marketInformationInit}
      loadingPricePerform={loadingPricePerform}
      loadingPriceInfo={loadingPriceInfo}
      loadingMarketInfo={loadingMarketInfo}
    />
  );
};

export default TokenInfoContentContainer;
