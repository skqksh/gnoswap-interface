import React from "react";
import {
  BlankIncentivizedCard,
  IncentivizedWrapper,
  PoolListWrapper,
} from "./IncentivizedPoolCardList.styles";
import IncentivizedPoolCard from "@components/earn/incentivized-pool-card/IncentivizedPoolCard";
import { SHAPE_TYPES, skeletonStyle } from "@constants/skeleton.constant";
import LoadMoreButton from "@components/common/load-more-button/LoadMoreButton";
import { PoolCardInfo } from "@models/pool/info/pool-card-info";
export interface IncentivizedPoolCardListProps {
  incentivizedPools: PoolCardInfo[];
  loadMore: boolean;
  isFetched: boolean;
  onClickLoadMore?: () => void;
  currentIndex: number;
  routeItem: (id: string) => void;
  mobile: boolean;
  page: number;
  themeKey: "dark" | "light";
  divRef: React.RefObject<HTMLDivElement>;
  onScroll: () => void;
  showPagination: boolean;
  width: number;
}

const IncentivizedPoolCardList: React.FC<IncentivizedPoolCardListProps> = ({
  incentivizedPools,
  loadMore,
  isFetched,
  onClickLoadMore,
  currentIndex,
  routeItem,
  mobile,
  page,
  themeKey,
  divRef,
  onScroll,
  showPagination,
  width,
}) => {
  return (
    <IncentivizedWrapper>
      <PoolListWrapper ref={divRef} onScroll={onScroll}>
        {isFetched &&
          incentivizedPools.length > 0 &&
          incentivizedPools.slice(0, page * 8).map((info, index) => (
            <IncentivizedPoolCard pool={info} key={index} routeItem={routeItem} themeKey={themeKey}/>
          ))}
        {isFetched &&
          incentivizedPools.length > 0 && incentivizedPools.length < 8 && incentivizedPools.length % 4 !== 0 &&
          (Array((incentivizedPools.length > 4 ? 8 : (width <= 1180 && width >= 1000) ? 3 : 4) - incentivizedPools.length).fill(1)).map((_, index) => (
            <BlankIncentivizedCard key={index}/>
          ))}
        {!isFetched &&
          Array.from({ length: 8 }).map((_, index) => (
            <span
              key={index}
              className="card-skeleton"
              css={skeletonStyle("100%", SHAPE_TYPES.ROUNDED_SQUARE)}
            />
          ))}
      </PoolListWrapper>
      {!mobile && (
        incentivizedPools.length > 8 &&
        onClickLoadMore && (
          <LoadMoreButton show={loadMore} onClick={onClickLoadMore} />
        )
      )}
      {showPagination &&
        <div className="box-indicator">
          <span className="current-page">{currentIndex}</span>
          <span>/</span>
          <span>{incentivizedPools.length}</span>
        </div>}
    </IncentivizedWrapper>
  );
};

export default IncentivizedPoolCardList;
