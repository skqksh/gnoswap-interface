import React, { useCallback, useEffect, useMemo, useState } from "react";
import { IncentivizedOptions, type FeeOptions } from "@common/values/data-constant";
import PoolList from "@components/earn/pool-list/PoolList";
import { type TokenPairInfo } from "@models/token/token-pair-info";
import { ValuesType } from "utility-types";
import { useAtom, useAtomValue } from "jotai";
import { CommonState } from "@states/index";
import { useRouter } from "next/router";
import { usePoolData } from "@hooks/pool/use-pool-data";
import useClickOutside from "@hooks/common/use-click-outside";
import { ThemeState } from "@states/index";
export interface Pool {
  poolId: string;
  tokenPair: TokenPairInfo;
  feeRate: FeeOptions;
  liquidity: string;
  apr: string;
  volume24h: string;
  fees24h: string;
  rewards: Array<string>;
  incentiveType: POOL_TYPE;
  tickInfo: {
    ticks: string[];
    currentTick: number;
  };
}

export interface PoolSortOption {
  key: TABLE_HEAD;
  direction: "asc" | "desc";
}

export const TABLE_HEAD = {
  POOL_NAME: "Pool Name",
  LIQUIDITY: "Liquidity",
  VOLUME: "Volume (24h)",
  FEES: "Fees (24h)",
  APR: "APR",
  REWARDS: "Rewards",
  LIQUIDITY_PLOT: "Liquidity Plot",
} as const;

export type TABLE_HEAD = ValuesType<typeof TABLE_HEAD>;

export const POOL_TYPE = {
  ALL: "All",
  INCENTIVIZED: "Incentivized",
  NON_INCENTIVIZED: "Non-Incentivized",
} as const;

export type POOL_TYPE = ValuesType<typeof POOL_TYPE>;

const PoolListContainer: React.FC = () => {
  const [poolType, setPoolType] = useState<POOL_TYPE>(POOL_TYPE.ALL);
  const [page, setPage] = useState(0);
  const [keyword, setKeyword] = useState("");
  const [sortOption, setTokenSortOption] = useState<PoolSortOption>();
  const [searchIcon, setSearchIcon] = useState(false);
  const [breakpoint] = useAtom(CommonState.breakpoint);
  const router = useRouter();
  const { poolListInfos, isFetchedPools, updatePools } = usePoolData();
  const [componentRef, isClickOutside, setIsInside] = useClickOutside();

  const themeKey = useAtomValue(ThemeState.themeKey);

  useEffect(() => {
    updatePools();
  }, []);

  useEffect(() => {
    if (!keyword) {
      if (isClickOutside) {
        setSearchIcon(false);
      }
    }
  }, [isClickOutside, keyword]);

  const sortedPoolListInfos = useMemo(() => {
    function filteredPoolType(poolType: POOL_TYPE, incentivizedType: IncentivizedOptions) {
      switch (poolType) {
        case "Incentivized":
          return incentivizedType !== "INCENTIVIZED";
        case "Non-Incentivized":
          return incentivizedType === "NON_INCENTIVIZED";
        default:
          break;
      }
      return true;
    }

    return poolListInfos.filter(info => {
      if (keyword !== "") {
        return info.tokenA.name.toLowerCase().includes(keyword.toLowerCase()) ||
          info.tokenB.name.toLowerCase().includes(keyword.toLowerCase()) ||
          info.tokenA.symbol.toLowerCase().includes(keyword.toLowerCase()) ||
          info.tokenB.symbol.toLowerCase().includes(keyword.toLowerCase());
      }

      return filteredPoolType(poolType, info.incentivizedType);
    });
  }, [keyword, poolListInfos, poolType]);

  const totalPage = useMemo(() => {
    return Math.floor(sortedPoolListInfos.length / 20) + 1;
  }, [sortedPoolListInfos.length]);

  const routeItem = (id: string) => {
    router.push(`/earn/pool/${id}`);
  };
  const onTogleSearch = () => {
    setSearchIcon(prev => !prev);
    setIsInside(true);
  };

  const changePoolType = useCallback((newType: string) => {
    switch (newType) {
      case POOL_TYPE.ALL:
        setPoolType(POOL_TYPE.ALL);
        break;
      case POOL_TYPE.INCENTIVIZED:
        setPoolType(POOL_TYPE.INCENTIVIZED);
        break;
      case POOL_TYPE.NON_INCENTIVIZED:
        setPoolType(POOL_TYPE.NON_INCENTIVIZED);
        break;
      default:
        setPoolType(POOL_TYPE.ALL);
    }
  }, []);

  const search = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  }, []);

  const movePage = useCallback((newPage: number) => {
    setPage(newPage);
  }, []);

  const sort = useCallback(
    (item: TABLE_HEAD) => {
      const key = item;
      const direction =
        sortOption?.key !== item
          ? "desc"
          : sortOption.direction === "asc"
            ? "desc"
            : "asc";

      setTokenSortOption({
        key,
        direction,
      });
    },
    [sortOption],
  );

  const isSortOption = useCallback((head: TABLE_HEAD) => {
    const disableItems = ["Rewards", "Liquidity Plot"];
    return !disableItems.includes(head);
  }, []);

  return (
    <PoolList
      pools={sortedPoolListInfos}
      isFetched={isFetchedPools}
      poolType={poolType}
      changePoolType={changePoolType}
      search={search}
      keyword={keyword}
      currentPage={page}
      totalPage={totalPage}
      movePage={movePage}
      sortOption={sortOption}
      sort={sort}
      isSortOption={isSortOption}
      breakpoint={breakpoint}
      routeItem={routeItem}
      searchIcon={searchIcon}
      onTogleSearch={onTogleSearch}
      searchRef={componentRef}
      themeKey={themeKey}
    />
  );
};

export default PoolListContainer;
