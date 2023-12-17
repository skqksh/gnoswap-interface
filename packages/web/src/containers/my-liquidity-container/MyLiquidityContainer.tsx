import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import MyLiquidity from "@components/pool/my-liquidity/MyLiquidity";
import { useWindowSize } from "@hooks/common/use-window-size";
import { useWallet } from "@hooks/wallet/use-wallet";
import { useRouter } from "next/router";
import { usePositionData } from "@hooks/common/use-position-data";
import { PoolPositionModel } from "@models/position/pool-position-model";
import { usePosition } from "@hooks/common/use-position";
import { useGnotToGnot } from "@hooks/token/use-gnot-wugnot";



const MyLiquidityContainer: React.FC = () => {
  const router = useRouter();
  const divRef = useRef<HTMLDivElement | null>(null);
  const { breakpoint } = useWindowSize();
  const { connected: connectedWallet, isSwitchNetwork, account } = useWallet();
  const [currentIndex, setCurrentIndex] = useState(1);
  const [positions, setPositions] = useState<PoolPositionModel[]>([]);
  const { getPositionsByPoolId } = usePositionData();
  const { claimAll } = usePosition(positions);
  const [loading, setLoading] = useState(true);
  const { gnot, wugnotPath } = useGnotToGnot();

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timeout);
  }, []);

  const availableRemovePosition = useMemo(() => {
    if (!connectedWallet || isSwitchNetwork) {
      return false;
    }
    return positions.length > 0;
  }, [connectedWallet, isSwitchNetwork, positions.length]);

  const handleClickAddPosition = useCallback(() => {
    router.push("/earn/add?path=" + router.query.path);
  }, [router]);

  const handleClickRemovePosition = useCallback(() => {
    router.push(`${router.asPath}/remove`);
  }, [router]);

  const handleScroll = () => {
    if (divRef.current) {
      const currentScrollX = divRef.current.scrollLeft;
      setCurrentIndex(Math.floor(currentScrollX / 240) + 1);
    }
  };

  const claimAllReward = useCallback(() => {
    claimAll().then(response => {
      if (response !== null) {
        router.reload();
      }
    });
  }, [claimAll, router]);

  useEffect(() => {
    const poolPath = router.query["pool-path"] as string;
    if (!poolPath) {
      return;
    }
    if (account?.address) {
      getPositionsByPoolId(poolPath).then((list: PoolPositionModel[]) => {
        if (list) {
          const temp = list.map((e: PoolPositionModel) => {
            const pool = e.pool;
            return {
              ...e,
              pool: {
                ...pool,
                tokenA: {
                  ...pool.tokenA,
                  path: pool.tokenA?.path === wugnotPath ? (gnot?.path || "") : (pool.tokenA?.path || ""),
                  name: pool.tokenA?.path === wugnotPath ? (gnot?.name || "") : (pool.tokenA?.name || ""),
                  symbol: pool.tokenA?.path === wugnotPath ? (gnot?.symbol || "") : (pool.tokenA?.symbol || ""),
                  logoURI: pool.tokenA?.path === wugnotPath ? (gnot?.logoURI || "") : (pool.tokenA?.logoURI || ""),
                },
                tokenB: {
                  ...pool.tokenB,
                  path: pool.tokenB?.path === wugnotPath ? (gnot?.path || "") : (pool.tokenB?.path || ""),
                  name: pool.tokenB?.path === wugnotPath ? (gnot?.name || "") : (pool.tokenB?.name || ""),
                  symbol: pool.tokenB?.path === wugnotPath ? (gnot?.symbol || "") : (pool.tokenB?.symbol || ""),
                  logoURI: pool.tokenB?.path === wugnotPath ? (gnot?.logoURI || "") : (pool.tokenB?.logoURI || ""),
                },
              }
            };
          });
          return setPositions(temp);
        } else {
          setPositions(list);
        }
      });
    }
  }, [account?.address, getPositionsByPoolId, router.query, gnot]);
  
  return (
    <MyLiquidity
      positions={positions}
      breakpoint={breakpoint}
      connected={connectedWallet}
      isSwitchNetwork={isSwitchNetwork}
      handleClickAddPosition={handleClickAddPosition}
      handleClickRemovePosition={handleClickRemovePosition}
      divRef={divRef}
      onScroll={handleScroll}
      currentIndex={currentIndex}
      claimAll={claimAllReward}
      availableRemovePosition={availableRemovePosition}
      loading={loading}
    />
  );
};

export default MyLiquidityContainer;
