import { ComponentStory, ComponentMeta } from "@storybook/react";
import EarnIncentivizedPools from "./EarnIncentivizedPools";
import IncentivizedPoolCardList from "../incentivized-pool-card-list/IncentivizedPoolCardList";
import POOLS from "@repositories/pool/mock/pools.json";
import { PoolMapper } from "@models/pool/mapper/pool-mapper";
import { action } from "@storybook/addon-actions";
import { PoolModel } from "@models/pool/pool-model";

const pool = POOLS.pools[0] as PoolModel;

const cardInfo = PoolMapper.toCardInfo(pool);

export default {
  title: "earn/EarnIncentivizedPools",
  component: EarnIncentivizedPools,
} as ComponentMeta<typeof EarnIncentivizedPools>;

const Template: ComponentStory<typeof EarnIncentivizedPools> = args => (
  <EarnIncentivizedPools
    {...args}
  />
);

export const Default = Template.bind({});
Default.args = {
  cardList: <IncentivizedPoolCardList
    currentIndex={1}
    incentivizedPools={[cardInfo]}
    isFetched={true}
    routeItem={action("routeItem")}
    mobile={false}
    loadMore={false}
    page={1}
    themeKey="dark"
    divRef={null as any}
    onScroll={action("onScroll")}
    width={1440}
    showPagination={false}
  />
};
