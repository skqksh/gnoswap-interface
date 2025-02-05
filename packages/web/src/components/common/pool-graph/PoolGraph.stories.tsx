import PoolGraph, { type PoolGraphProps } from "./PoolGraph";
import { Meta, StoryObj } from "@storybook/react";
import POOLS from "@repositories/pool/mock/pools.json";
import { PoolModel } from "@models/pool/pool-model";

const pool = POOLS.pools[0] as PoolModel;

export default {
  title: "common/PoolGraph",
  component: PoolGraph,
} as Meta<typeof PoolGraph>;

export const Default: StoryObj<PoolGraphProps> = {
  args: {
    tokenA: pool.tokenA,
    tokenB: pool.tokenB,
    bins: pool.bins,
    mouseover: true,
    currentTick: 18,
    width: 600,
    height: 400,
    zoomable: false,
  },
};