import { IncentivizedOptions } from "@common/values";
import { SwapFeeTierType } from "@constants/option.constant";
import { TokenModel } from "@models/token/token-model";
import { PoolBinModel } from "../pool-bin-model";
import { PoolRewardInfo } from "./pool-reward-info";

/**
 * Todo: Change data structure
 */
export interface PoolCardInfo {
  poolId: string;

  incentivizedType: IncentivizedOptions;

  tokenA: TokenModel;

  tokenB: TokenModel;

  feeTier: SwapFeeTierType;

  liquidity: string;

  apr: string;

  volume24h: string;

  fees24h: string;

  rewards: PoolRewardInfo[];

  price: number;

  currentTick: number;

  bins: PoolBinModel[];
}
