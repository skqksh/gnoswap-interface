import React from "react";
import Button, { ButtonHierarchy } from "@components/common/button/Button";
import Tooltip from "@components/common/tooltip/Tooltip";
import {
  MyLiquidityContentWrapper,
  RewardsContent,
  TooltipDivider,
} from "./MyLiquidityContent.styles";
import { DEVICE_TYPE } from "@styles/media";
import { BalanceTooltipContent, TotalRewardsContent } from "../my-position-card/MyPositionCard";

interface MyLiquidityContentProps {
  content: any;
  breakpoint: DEVICE_TYPE;
  isDisabledButton: boolean;
}

const MyLiquidityContent: React.FC<MyLiquidityContentProps> = ({
  content,
  breakpoint,
  isDisabledButton,
}) => {
  const { totalBalance, dailyEarn, claimRewards } = content;
  const RewardsTooltip = (
    <RewardsContent>
      <div className="list">
        <span className="title">Swap Fees</span>
        <span className="title">${content.swapFees}</span>
      </div>
      <div className="list">
        <div className="coin-info">
          <img
            src={content.poolInfo.tokenPair.tokenA.logoURI}
            alt="token logo"
            className="token-logo"
          />
          <span className="content">
            {content.poolInfo.tokenPair.tokenA.symbol}
          </span>
        </div>
        <span className="content">
          {content.poolInfo.tokenPair.tokenA.composition}
        </span>
      </div>
      <div className="list">
        <div className="coin-info">
          <img
            src={content.poolInfo.tokenPair.tokenB.logoURI}
            alt="token logo"
            className="token-logo"
          />
          <span className="content">
            {content.poolInfo.tokenPair.tokenB.symbol}
          </span>
        </div>
        <span className="content">
          {content.poolInfo.tokenPair.tokenA.composition}
        </span>
      </div>
      <TooltipDivider />
      <div className="list">
        <span className="title">Staking Rewards</span>
        <span className="title">${content.swapFees}</span>
      </div>
      <div className="list">
        <div className="coin-info">
          <img
            src={content.poolInfo.tokenPair.tokenA.logoURI}
            alt="token logo"
            className="token-logo"
          />
          <span className="content">
            {content.poolInfo.tokenPair.tokenA.symbol}
          </span>
        </div>
        <span className="content">
          {content.poolInfo.tokenPair.tokenA.composition}
        </span>
      </div>
      <TooltipDivider />
      <div className="list">
        <span className="title">External Rewards</span>
        <span className="title">${content.swapFees}</span>
      </div>
      <div className="list">
        <div className="coin-info">
          <img
            src={content.poolInfo.tokenPair.tokenB.logoURI}
            alt="token logo"
            className="token-logo"
          />
          <span className="content">
            {content.poolInfo.tokenPair.tokenB.symbol}
          </span>
        </div>
        <span className="content">
          {content.poolInfo.tokenPair.tokenA.composition}
        </span>
      </div>
      <TooltipDivider />
      <div className="list">
        <span className="title">Unclaimable</span>
        <span className="title">${content.swapFees}</span>
      </div>
      <div className="list">
        <div className="coin-info">
          <img
            src={content.poolInfo.tokenPair.tokenA.logoURI}
            alt="token logo"
            className="token-logo"
          />
          <span className="content">
            {content.poolInfo.tokenPair.tokenA.symbol}
          </span>
        </div>
        <span className="content">
          {content.poolInfo.tokenPair.tokenA.composition}
        </span>
      </div>
      <div className="list">
        <div className="coin-info">
          <img
            src={content.poolInfo.tokenPair.tokenB.logoURI}
            alt="token logo"
            className="token-logo"
          />
          <span className="content">
            {content.poolInfo.tokenPair.tokenB.symbol}
          </span>
        </div>
        <span className="content">
          {content.poolInfo.tokenPair.tokenA.composition}
        </span>
      </div>
      <TooltipDivider />
      <p>
        *Swap Fees are only claimable when your
        <br />
        position is unstaked. If you want to claim the
        <br />
        swap fees, please unstake your position first.
      </p>
    </RewardsContent>
  );
  return (
    <MyLiquidityContentWrapper>
      <section>
        <h4>Total Balance</h4>
        <Tooltip placement="top" FloatingContent={<div><BalanceTooltipContent content={content.positionList[0]} /></div>}>
          <span className="content-value">{totalBalance}</span>
        </Tooltip>
      </section>
      <section>
        <h4>Daily Earnings</h4>
        <Tooltip placement="top" FloatingContent={<div><TotalRewardsContent content={content.positionList[0]} isReward/></div>}>
          <span className="content-value">{dailyEarn}</span>
        </Tooltip>
      </section>
      <section>
        {breakpoint === DEVICE_TYPE.MOBILE ? (
          <div className="mobile-wrap">
            <div className="column-wrap">
              <h4>Claimable Rewards</h4>
              <div className="claim-wrap">
                <Tooltip placement="top" FloatingContent={RewardsTooltip}>
                  <span className="content-value has-tooltip">
                    {claimRewards}
                  </span>
                </Tooltip>
              </div>
            </div>
            <Button
              disabled={isDisabledButton}
              text="Claim All"
              style={{
                hierarchy: ButtonHierarchy.Primary,
                width: 86,
                height: 36,
                padding: "10px 16px",
                fontType: "p1",
              }}
            />
          </div>
        ) : (
          <>
            <h4>Claimable Rewards</h4>
            <div className="claim-wrap">
              <Tooltip placement="top" FloatingContent={RewardsTooltip}>
                <span className="content-value has-tooltip">
                  {claimRewards}
                </span>
              </Tooltip>
              <Button
                disabled={isDisabledButton}
                text="Claim All"
                style={{
                  hierarchy: ButtonHierarchy.Primary,
                  height: 36,
                  padding: "0px 16px",
                  fontType: "p1",
                }}
              />
            </div>
          </>
        )}
      </section>
    </MyLiquidityContentWrapper>
  );
};

export default MyLiquidityContent;
