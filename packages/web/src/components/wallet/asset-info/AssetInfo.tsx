import { useCallback } from "react";
import IconDownload from "@components/common/icons/IconDownload";
import IconUpload from "@components/common/icons/IconUpload";
import { Asset } from "@containers/asset-list-container/AssetListContainer";
import { AssetInfoWrapper, LoadButton, TableColumn } from "./AssetInfo.styles";
import {
  ASSET_TD_WIDTH,
  MOBILE_ASSET_TD_WIDTH,
  TABLET_ASSET_TD_WIDTH,
} from "@constants/skeleton.constant";
import { DEVICE_TYPE } from "@styles/media";

interface AssetInfoProps {
  asset: Asset;
  deposit: (asset: Asset) => void;
  withdraw: (asset: Asset) => void;
  breakpoint: DEVICE_TYPE;
}

const AssetInfo: React.FC<AssetInfoProps> = ({
  asset,
  deposit,
  withdraw,
  breakpoint,
}) => {
  const { logoUri, name, symbol, chain, balance } = asset;

  const onClickItem = useCallback((symbol: string) => {
    location.href = "/tokens/" + symbol;
  }, []);

  const onClickDeposit = useCallback(() => {
    deposit(asset);
  }, [deposit, asset]);

  const onClickWithdraw = useCallback(() => {
    withdraw(asset);
  }, [withdraw, asset]);

  return breakpoint === DEVICE_TYPE.WEB ? (
    <AssetInfoWrapper>
      <TableColumn
        className="left"
        tdWidth={ASSET_TD_WIDTH[0]}
        onClick={() => onClickItem(symbol)}
      >
        <img className="logo" src={logoUri} alt="logo" />
        <span className="name">{name}</span>
        <span className="symbol">{symbol}</span>
      </TableColumn>
      <TableColumn className="left" tdWidth={ASSET_TD_WIDTH[1]}>
        <span className="chain">{chain}</span>
      </TableColumn>
      <TableColumn className="left" tdWidth={ASSET_TD_WIDTH[2]}>
        <span className="balance">{balance}</span>
      </TableColumn>
      <TableColumn tdWidth={ASSET_TD_WIDTH[3]}>
        <DepositButton onClick={onClickDeposit} />
      </TableColumn>
      <TableColumn tdWidth={ASSET_TD_WIDTH[4]}>
        <WithdrawButton onClick={onClickWithdraw} />
      </TableColumn>
    </AssetInfoWrapper>
  ) : breakpoint === DEVICE_TYPE.TABLET ? (
    <AssetInfoWrapper>
      <TableColumn
        className="left"
        tdWidth={TABLET_ASSET_TD_WIDTH[0]}
        onClick={() => onClickItem(symbol)}
      >
        <img className="logo" src={logoUri} alt="logo" />
        <span className="name">{name}</span>
        <span className="symbol">{symbol}</span>
      </TableColumn>
      <TableColumn className="left" tdWidth={TABLET_ASSET_TD_WIDTH[1]}>
        <span className="chain">{chain}</span>
      </TableColumn>
      <TableColumn className="left" tdWidth={TABLET_ASSET_TD_WIDTH[2]}>
        <span className="balance">{balance}</span>
      </TableColumn>
      <TableColumn tdWidth={TABLET_ASSET_TD_WIDTH[3]}>
        <DepositButton onClick={onClickDeposit} />
      </TableColumn>
      <TableColumn tdWidth={TABLET_ASSET_TD_WIDTH[4]}>
        <WithdrawButton onClick={onClickWithdraw} />
      </TableColumn>
    </AssetInfoWrapper>
  ) : (
    <AssetInfoWrapper>
      <TableColumn
        className="left"
        tdWidth={MOBILE_ASSET_TD_WIDTH[0]}
        onClick={() => onClickItem(symbol)}
      >
        <img className="logo" src={logoUri} alt="logo" />
        <span className="name">{name}</span>
        <span className="symbol">{symbol}</span>
      </TableColumn>
      <TableColumn className="left" tdWidth={MOBILE_ASSET_TD_WIDTH[1]}>
        <span className="chain">{chain}</span>
      </TableColumn>
      <TableColumn className="left" tdWidth={MOBILE_ASSET_TD_WIDTH[2]}>
        <span className="balance">{balance}</span>
      </TableColumn>
      <TableColumn tdWidth={MOBILE_ASSET_TD_WIDTH[3]}>
        <DepositButton onClick={onClickDeposit} />
      </TableColumn>
      <TableColumn tdWidth={MOBILE_ASSET_TD_WIDTH[4]}>
        <WithdrawButton onClick={onClickWithdraw} />
      </TableColumn>
    </AssetInfoWrapper>
  );
};

export const DepositButton = ({
  onClick,
  disabled = false,
}: {
  onClick: () => void;
  disabled?: boolean;
}) => (
  <LoadButton onClick={onClick} disabled={disabled}>
    <IconDownload />
    <span>Deposit</span>
  </LoadButton>
);

export const WithdrawButton = ({
  onClick,
  disabled = false,
}: {
  onClick: () => void;
  disabled?: boolean;
}) => (
  <LoadButton className="withdraw-pd" onClick={onClick} disabled={disabled}>
    <IconUpload className="upload" />
    <span>Withdraw</span>
  </LoadButton>
);

export default AssetInfo;
