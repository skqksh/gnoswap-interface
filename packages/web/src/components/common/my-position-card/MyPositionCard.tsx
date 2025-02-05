import { RANGE_STATUS_OPTION } from "@constants/option.constant";
import { POSITION_CONTENT_LABEL } from "@containers/my-position-card-list-container/MyPositionCardListContainer";
import Badge, { BADGE_TYPE } from "@components/common/badge/Badge";
import DoubleLogo from "@components/common/double-logo/DoubleLogo";
import RangeBadge from "@components/common/range-badge/RangeBadge";
import {
  MyPositionCardWrapper,
  MyPositionCardWrapperBorder,
} from "./MyPositionCard.styles";
import BarAreaGraph from "../bar-area-graph/BarAreaGraph";
import { useState } from "react";

interface MyPositionCardProps {
  item: any;
  movePoolDetail: (id: string) => void;
  mobile: boolean;
  currentIndex?: number;
}

const MyPositionCard: React.FC<MyPositionCardProps> = ({
  item,
  movePoolDetail,
  mobile,
  currentIndex,
}) => {
  const { tokenPair } = item;
  const [isHiddenStart, setIsHiddenStart] = useState(false);

  const handleClickShowRange = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setIsHiddenStart(!isHiddenStart);
  };

  return (
    <MyPositionCardWrapperBorder
      className={["special-card", ""][Math.floor(Math.random() * 2)]}
    >
      <div className="base-border">
        <MyPositionCardWrapper
          stakeType={item.stakeType}
          onClick={() => movePoolDetail("1")}
        >
          <div className="title-wrapper">
            <div className="box-header">
              <DoubleLogo
                left={tokenPair.tokenA.logoURI}
                right={tokenPair.tokenB.logoURI}
              />
              <span>{`${tokenPair.tokenA.symbol}/${tokenPair.tokenB.symbol}`}</span>
            </div>
            <div className="badge-group">
              <Badge
                type={BADGE_TYPE.DARK_DEFAULT}
                text={<>
                Incentivized
                <DoubleLogo
                  size={16}
                  left={tokenPair.tokenA.logoURI}
                  right={tokenPair.tokenB.logoURI}
                />
                </>}
              />
              <Badge
                type={BADGE_TYPE.DARK_DEFAULT}
                text={`${item.feeRate} Fee`}
              />
            </div>
          </div>
          <div className="list-wrapper">
            <div className="list-header">
              <span className="label-text">{POSITION_CONTENT_LABEL.VALUE}</span>
              <span className="label-text">{POSITION_CONTENT_LABEL.APR}</span>
            </div>
            <div className="list-content">
              <span>{item.value}</span>
              {item.stakeType === "STAKED"
                ? `${POSITION_CONTENT_LABEL.STAR_TAG}${item.apr}`
                : item.apr}
            </div>
          </div>
          <div className="pool-price-graph" onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}>
            <div className="price-range-info">
              <div className="current-price" onClick={handleClickShowRange}>
                <span>{isHiddenStart ? "Show Range" : "Hide Range"}</span>
              </div>
              <RangeBadge
                status={
                  item.inRange
                    ? RANGE_STATUS_OPTION.IN
                    : RANGE_STATUS_OPTION.OUT
                }
              />
            </div>
            <div className="chart-wrapper">
              <BarAreaGraph
                width={mobile ? 226 : 258}
                height={80}
                currentTick={item.currentTick}
                minLabel={item.minLabel}
                maxLabel={item.maxLabel}
                minTick={item.minTick}
                maxTick={item.maxTick}
                datas={item.ticks}
                isHiddenStart={isHiddenStart}
                currentIndex={currentIndex}
              />
            </div>
            <div className="min-max-price">
              <div className="price-section">
                <span className="label-text">
                  {POSITION_CONTENT_LABEL.MIN_PRICE}
                </span>
                <span className="label-text">{item.minPriceAmount}</span>
              </div>
              <div className="price-section">
                <span className="label-text">
                  {POSITION_CONTENT_LABEL.MAX_PRICE}
                </span>
                <span className="label-text">{item.maxPriceAmount}</span>
              </div>
            </div>
          </div>
        </MyPositionCardWrapper>
      </div>
    </MyPositionCardWrapperBorder>
  );
};

export default MyPositionCard;
