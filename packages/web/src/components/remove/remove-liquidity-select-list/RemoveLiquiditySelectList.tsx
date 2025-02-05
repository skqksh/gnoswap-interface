import React, { useCallback } from "react";
import { RemoveLiquiditySelectListWrapper } from "./RemoveLiquiditySelectList.styles";
import { LPPositionModel } from "@models/position/lp-position-model";
import RemoveLiquiditySelectListItem from "../remove-liquidity-select-list-item/RemoveLiquiditySelectListItem";

interface RemoveLiquiditySelectListProps {
  selectedAll: boolean;
  lpPositions: LPPositionModel[];
  selectedIds: string[];
  select: (id: string) => void;
  selectAll: () => void;
  width: number;
}

const RemoveLiquiditySelectList: React.FC<RemoveLiquiditySelectListProps> = ({
  selectedAll,
  lpPositions,
  selectedIds,
  select,
  selectAll,
  width,
}) => {

  const isSelectLiquidity = useCallback((lpPosition: LPPositionModel) => {
    return selectedIds.findIndex(id => id === lpPosition.lpRewardId) > -1;
  }, [selectedIds]);

  return (
    <RemoveLiquiditySelectListWrapper>
      <div className="checked-all-wrap">
        <div className="wrapper-check-label">
          <input
            id="checkbox-all"
            type="checkbox"
            checked={selectedAll}
            onChange={selectAll}
          />
          <label htmlFor="checkbox-all" />
          <span className="custom-label">Select All</span>
        </div>
        <span>Liquidity</span>
      </div>
      <ul>
        {lpPositions.map((lpPosition, index) => (
          <RemoveLiquiditySelectListItem
            key={index}
            lpPosition={lpPosition}
            selected={isSelectLiquidity(lpPosition)}
            select={select}
            width={width}
          />
        ))}
      </ul>
    </RemoveLiquiditySelectListWrapper>
  );
};

export default RemoveLiquiditySelectList;
