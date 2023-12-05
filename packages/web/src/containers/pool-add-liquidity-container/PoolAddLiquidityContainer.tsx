import React, { useCallback, useEffect, useMemo, useState } from "react";
import EarnAddLiquidity from "@components/earn-add/earn-add-liquidity/EarnAddLiquidity";
import {
  AddLiquiditySubmitType,
  PriceRangeType,
  SwapFeeTierType,
} from "@constants/option.constant";
import { useTokenAmountInput } from "@hooks/token/use-token-amount-input";
import { TokenModel } from "@models/token/token-model";
import { useWallet } from "@hooks/wallet/use-wallet";
import { useSlippage } from "@hooks/common/use-slippage";
import { useEarnAddLiquidityConfirmModal } from "@hooks/token/use-earn-add-liquidity-confirm-modal";
import { useAtom } from "jotai";
import { SwapState } from "@states/index";
import { useRouter } from "next/router";
import { useConnectWalletModal } from "@hooks/wallet/use-connect-wallet-modal";
import { usePool } from "@hooks/pool/use-pool";
import { useTokenData } from "@hooks/token/use-token-data";
import { useOneClickStakingModal } from "@hooks/earn/use-one-click-staking-modal";

export interface AddLiquidityPriceRage {
  type: PriceRangeType;
  range: {
    minTick: number;
    minPrice: string;
    maxTick: number;
    maxPrice: string;
  };
  apr?: string;
}

export interface PoolTick {
  value: string;
  price: string;
  tick: number;
}

export interface PriceRangeSummary {
  depositRatio: string;
  feeBoost: string;
  estimatedApr: string;
}

export const SWAP_FEE_TIERS: SwapFeeTierType[] = [
  "FEE_100",
  "FEE_500",
  "FEE_3000",
  "FEE_10000",
];

const TEMP_CUSTOM_PRICE_RANGE: AddLiquidityPriceRage[] = [
  {
    type: "Active",
    range: {
      minTick: 6600,
      maxTick: 10200,
      minPrice: "1.2840093675402746",
      maxPrice: "2.1169206358924533",
    },
    apr: "APR 99",
  },
  {
    type: "Passive",
    range: {
      minTick: 6600,
      maxTick: 10200,
      minPrice: "1.2840093675402746",
      maxPrice: "2.1169206358924533",
    },
    apr: "APR 100",
  },
  {
    type: "Custom",
    range: {
      minTick: 6600,
      maxTick: 10200,
      minPrice: "1.2840093675402746",
      maxPrice: "2.1169206358924533",
    },
    apr: "0",
  },
];

const poolTick = {
  value: "1",
  price: "10",
  tick: 1,
};

const EarnAddLiquidityContainer: React.FC = () => {
  const [initialized, setInitialized] = useState(false);

  const [swapValue, setSwapValue] = useAtom(SwapState.swap);
  const { tokenA = null, tokenB = null, type = "EXACT_IN" } = swapValue;
  const router = useRouter();
  const { query } = router;

  const [startPrice] = useState<string>("130621891405341611593710811006");
  const tokenAAmountInput = useTokenAmountInput(tokenA);
  const tokenBAmountInput = useTokenAmountInput(tokenB);
  const [swapFeeTier, setSwapFeeTier] = useState<SwapFeeTierType | null>(null);
  const [priceRanges] = useState<AddLiquidityPriceRage[]>(TEMP_CUSTOM_PRICE_RANGE);
  const [priceRange, setPriceRange] = useState<AddLiquidityPriceRage | null>(
    null
  );

  const { openModal: openConnectWalletModal } = useConnectWalletModal();

  const {
    connected: connectedWallet,
    account,
    switchNetwork,
    isSwitchNetwork,
  } = useWallet();
  const { slippage, changeSlippage } = useSlippage();

  const { pools, feetierOfLiquidityMap, createPool } = usePool({ tokenA, tokenB });
  const { tokens, updateTokens, updateTokenPrices } = useTokenData();

  const { openModal: openOneClickModal } = useOneClickStakingModal({
    tokenA,
    tokenB,
    tokenAAmountInput,
    tokenBAmountInput,
    priceRange,
    currentPrice: startPrice,
    swapFeeTier,
  });

  const { openModal: openConfirmModal } = useEarnAddLiquidityConfirmModal({
    tokenA,
    tokenB,
    tokenAAmountInput,
    tokenBAmountInput,
    currentPrice: startPrice,
    priceRange,
    slippage,
    swapFeeTier,
    createPool,
  });

  useEffect(() => {
    if (query?.feeTier) {
      setSwapFeeTier(query?.feeTier as SwapFeeTierType);
    }
  }, [query]);

  useEffect(() => {
    setSwapFeeTier("FEE_3000");
    setPriceRange(TEMP_CUSTOM_PRICE_RANGE[1]);
  }, []);

  const priceRangeSummary: PriceRangeSummary = useMemo(() => {
    return {
      depositRatio: "-",
      feeBoost: "-",
      estimatedApr: "-",
    };
  }, []);

  const submitType: AddLiquiditySubmitType = useMemo(() => {
    if (!connectedWallet) {
      return "CONNECT_WALLET";
    }
    if (isSwitchNetwork) {
      return "SWITCH_NETWORK";
    }
    if (!tokenA || !tokenB) {
      return "INVALID_PAIR";
    }
    if (!Number(tokenAAmountInput.amount) || !Number(tokenBAmountInput.amount)) {
      return "ENTER_AMOUNT";
    }
    if ((Number(tokenAAmountInput.amount) < 0.000001)) {
      return "AMOUNT_TOO_LOW";
    }
    if ((Number(tokenBAmountInput.amount) < 0.000001)) {
      return "AMOUNT_TOO_LOW";
    }
    if (Number(tokenAAmountInput.amount) > Number(parseFloat(tokenAAmountInput.balance.replace(/,/g, "")))) {
      return "INSUFFICIENT_BALANCE";
    }
    if (Number(tokenBAmountInput.amount) > Number(parseFloat(tokenBAmountInput.balance.replace(/,/g, "")))) {
      return "INSUFFICIENT_BALANCE";
    }
    // if (!account?.balances || account.balances.length === 0) {
    //   return "INSUFFICIENT_BALANCE";
    // }
    // if (BigNumber(account.balances[0].amount).isLessThanOrEqualTo(1)) {
    //   return "INSUFFICIENT_BALANCE";
    // }
    if (!priceRange) {
      return "INVALID_RANGE";
    }
    return "CREATE_POOL";
  }, [
    account?.balances,
    connectedWallet,
    priceRange,
    swapFeeTier,
    tokenAAmountInput.amount,
    tokenAAmountInput.balance,
    tokenBAmountInput.amount,
    tokenBAmountInput.balance,
    isSwitchNetwork,
    tokenA,
    tokenB,
  ]);

  useEffect(() => {
    updateTokens();
    updateTokenPrices();
  }, []);

  const selectSwapFeeTier = useCallback((swapFeeTier: SwapFeeTierType) => {
    setSwapFeeTier(swapFeeTier);
  }, []);

  const changePriceRange = useCallback((priceRange: AddLiquidityPriceRage) => {
    setPriceRange(priceRange);
  }, []);

  const changeTokenA = useCallback((token: TokenModel) => {
    setSwapValue((prev) => ({
      tokenA: prev.tokenB?.symbol === token.symbol ? prev.tokenB : token,
      tokenB: prev.tokenB?.symbol === token.symbol ? prev.tokenA : prev.tokenB,
      type: type,
    }));
  }, [type]);

  const changeTokenB = useCallback((token: TokenModel) => {
    setSwapValue((prev) => ({
      tokenB: prev.tokenA?.symbol === token.symbol ? prev.tokenA : token,
      tokenA: prev.tokenA?.symbol === token.symbol ? prev.tokenB : prev.tokenA,
      type: type,
    }));
  }, [type]);

  const submit = useCallback(() => {
    if (submitType === "CONNECT_WALLET") {
      openConnectWalletModal();
      return;
    }
    if (submitType === "SWITCH_NETWORK") {
      switchNetwork();
      return;
    }
    if (submitType !== "CREATE_POOL") {
      return;
    }
    if (!tokenA || !tokenB || !priceRange || !swapFeeTier) {
      return;
    }
    openConfirmModal();
  }, [
    submitType,
    tokenA,
    tokenB,
    priceRange,
    swapFeeTier,
    openConfirmModal,
    openConnectWalletModal,
    switchNetwork,
  ]);

  useEffect(() => {
    if (tokens.length === 0 || Object.keys(router.query).length === 0) {
      return;
    }
    if (!initialized) {
      const currentTokenA = tokens.find(token => token.path === router.query.tokenA) || null;
      const currentTokenB = tokens.find(token => token.path === router.query.tokenB) || null;
      setSwapValue(prev => ({
        ...prev,
        tokenA: currentTokenA,
        tokenB: currentTokenB,
      }));
      setInitialized(true);
      return;
    }
  }, [initialized, router, tokenA?.path, tokenB?.path, tokens]);

  return (
    <EarnAddLiquidity
      mode={"POOL"}
      tokenA={tokenA}
      tokenB={tokenB}
      tokenAInput={tokenAAmountInput}
      tokenBInput={tokenBAmountInput}
      changeTokenA={changeTokenA}
      changeTokenB={changeTokenB}
      feeTiers={SWAP_FEE_TIERS}
      feeTier={swapFeeTier}
      feetierOfLiquidityMap={feetierOfLiquidityMap}
      selectFeeTier={selectSwapFeeTier}
      priceRanges={priceRanges}
      priceRange={priceRange}
      priceRangeSummary={priceRangeSummary}
      changePriceRange={changePriceRange}
      ticks={[poolTick, poolTick, poolTick]}
      pools={pools}
      currentTick={poolTick}
      submitType={submitType}
      submit={submit}
      isEarnAdd={false}
      connected={connectedWallet}
      slippage={slippage}
      changeSlippage={changeSlippage}
      openModal={openOneClickModal}
    />
  );
};

export default EarnAddLiquidityContainer;
