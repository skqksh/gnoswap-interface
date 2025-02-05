import React from "react";
import { MATH_NEGATIVE_TYPE } from "@constants/option.constant";
import { cx } from "@emotion/css";
import { wrapper } from "./PricePerformanceList.styles";
import { SHAPE_TYPES, skeletonTokenDetail } from "@constants/skeleton.constant";

interface PricePerformanceListProps {
  list: any[];
  loading: boolean;
}

const TITLE_LIST = ["Period", "Amount", "Change"];

const PricePerformanceList: React.FC<PricePerformanceListProps> = ({
  list,
  loading,
}) => {
  return (
    <div css={wrapper}>
      <div className="title-wrap">
        {TITLE_LIST.map((title, idx) => (
          <span className={cx("title", { left: idx === 0 })} key={idx}>
            {title}
          </span>
        ))}
      </div>
      <div className="performance-wrap">
        {list.map((item, idx) => (
          <div className="performance-list" key={idx}>
            <span className="createdAt">{item.createdAt}</span>
            {!loading && <span
              className={cx({
                negative: item.amount.status === MATH_NEGATIVE_TYPE.NEGATIVE,
              })}
            >
              {item.amount.value}
            </span>}
            {loading && <span
              css={skeletonTokenDetail("100%", SHAPE_TYPES.ROUNDED_SQUARE)}
            />}
            {loading && <span
              css={skeletonTokenDetail("100%", SHAPE_TYPES.ROUNDED_SQUARE)}
            />}
            {!loading && <span
              className={cx({
                negative: item.change.status === MATH_NEGATIVE_TYPE.NEGATIVE,
              })}
            >
              {item.change.value}
            </span>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PricePerformanceList;
