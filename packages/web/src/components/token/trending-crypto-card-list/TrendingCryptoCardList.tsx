import React from "react";
import TrendingCryptoCard from "@components/token/trending-crypto-card/TrendingCryptoCard";
import { loadingWrapper, wrapper } from "./TrendingCryptoCardList.styles";
import LoadingSpinner from "@components/common/loading-spinner/LoadingSpinner";

interface TrendingCryptoCardListProps {
  list: any[];
  loading: boolean;
}

const TrendingCryptoCardList: React.FC<TrendingCryptoCardListProps> = ({
  list,
  loading,
}) => {
  if (loading) return(
  <div css={loadingWrapper}>
    <LoadingSpinner />
  </div>);

  if (list.length === 0) {
    return (
      <div css={loadingWrapper}>
        <span>No data</span>
      </div>
    );
  }

  return (
    <div css={wrapper}>
      {list.map((item, idx) => (
        <TrendingCryptoCard item={item} key={idx} />
      ))}
    </div>
  );
};

export default TrendingCryptoCardList;
