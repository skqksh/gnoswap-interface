import React, { useState, useEffect, useMemo } from "react";
import DashboardInfo from "@components/dashboard/dashboard-info/DashboardInfo";
import { useWindowSize } from "@hooks/common/use-window-size";
import { useGnoswapContext } from "@hooks/common/use-gnoswap-context";
import { DashboardTokenResponse } from "@repositories/dashboard/response/token-response";
import { useQuery } from "@tanstack/react-query";

export interface DashboardTokenInfo {
  gnosAmount: string;
  gnotAmount: string;
}

// const initialDashboardTokenInfo: DashboardTokenInfo = {
//   gnosAmount: "$0.7425",
//   gnotAmount: "$1.8852",
// };

export interface SupplyOverviewInfo {
  totalSupply: string;
  circulatingSupply: string;
  progressBar: string;
  dailyBlockEmissions: string;
  totalStaked: string;
  stakingRatio: string;
}

// const initialSupplyOverviewInfo: SupplyOverviewInfo = {
//   totalSupply: "1,000,000,000 GNS",
//   circulatingSupply: "218,184,885 GNS",
//   progressBar: "580 GNS",
//   dailyBlockEmissions: "580 GNS",
//   totalStaked: "152,412,148 GNS",
//   stakingRatio: "55.15%",
// };

const formatPrice = (price?: string, unit?: string) => {
  if (unit) {
    return price ? `${Number(price).toLocaleString()} ${unit}` : "-";
  }
  return price ? `$${Number(price).toLocaleString()}` : "-";
};

export interface GovernenceOverviewInfo {
  totalXgnosIssued: string;
  holders: string;
  passedProposals: string;
  activeProposals: string;
  communityPool: string;
}

const initialGovernenceOverviewInfo: GovernenceOverviewInfo = {
  totalXgnosIssued: "-",
  holders: "-",
  passedProposals: "-",
  activeProposals: "-",
  communityPool: "-",
};

const DashboardInfoContainer: React.FC = () => {
  const { breakpoint } = useWindowSize();
  const [loading, setLoading] = useState(true);
  const { dashboardRepository } = useGnoswapContext();

  const { data: tokenData, isFetching } = useQuery<
    DashboardTokenResponse,
    Error
  >({
    queryKey: ["dashboardToken"],
    queryFn: dashboardRepository.getDashboardToken,
  });
  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timeout);
  }, []);

  const ratio = useMemo(() => {
    if (!tokenData) return "-";

    return (
      Number(tokenData?.gnstotalStaked) / Number(tokenData?.gnsTotalSupply)
    ).toFixed(2);
  }, [tokenData]);
  return (
    <DashboardInfo
      dashboardTokenInfo={{
        gnosAmount: formatPrice(tokenData?.gnsPrice),
        gnotAmount: formatPrice(tokenData?.gnotPrice),
      }}
      supplyOverviewInfo={{
        circulatingSupply: formatPrice(tokenData?.gnsCirculatingSupply, "GNS"),
        dailyBlockEmissions: formatPrice(
          tokenData?.gnsDailyBlockEmissions,
          "GNS",
        ),
        totalSupply: formatPrice(tokenData?.gnsTotalSupply, "GNS"),
        totalStaked: formatPrice(tokenData?.gnstotalStaked, "GNS"),
        progressBar: ratio === "-" ? "0%" : `${ratio}%`,
        stakingRatio: ratio === "-" ? "-" : Number(ratio).toLocaleString(),
      }}
      governenceOverviewInfo={initialGovernenceOverviewInfo}
      breakpoint={breakpoint}
      loading={loading || isFetching}
    />
  );
};

export default DashboardInfoContainer;
