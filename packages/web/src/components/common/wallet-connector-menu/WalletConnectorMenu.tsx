import React, {
  useCallback,
  useMemo,
  useRef,
  useState,
} from "react";
import Button, { ButtonHierarchy } from "@components/common/button/Button";
import IconAdenaLogo from "@components/common/icons/defaultIcon/IconAdenaLogo";
import IconCopy from "@components/common/icons/IconCopy";
import IconOpenLink from "@components/common/icons/IconOpenLink";
import IconExit from "@components/common/icons/IconExit";
import {
  AmountInfoBox,
  CopyTooltip,
  IconButton,
  MenuHeader,
  Overlay,
  ThemeSelector,
  WalletConnectorMenuWrapper,
} from "./WalletConnectorMenu.styles";
import { formatAddress } from "@utils/string-utils";
import ThemeModeContainer from "@containers/theme-mode-container/ThemeModeContainer";
import { AccountModel } from "@models/account/account-model";
import IconPolygon from "../icons/IconPolygon";
import IconFailed from "../icons/IconFailed";

const URL_REDIRECT =
  "https://gnoscan.io/accounts/g14qvahvnnllzwl9ehn3mkph248uapsehwgfe4pt";

interface IconButtonClickProps {
  copyClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  openLinkClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  themeKey: "dark" | "light";
  copied: boolean;
  onClickDisconnect: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const IconButtonMaker: React.FC<IconButtonClickProps> = ({
  copyClick,
  openLinkClick,
  themeKey,
  copied,
  onClickDisconnect,
}) => {
  return (
    <>
      <IconButton onClick={copyClick}>
        <IconCopy className="action-icon" />
        {copied && (
          <CopyTooltip>
            <div className={`box ${themeKey}-shadow`}>
              <span>Copied!</span>
            </div>
            <IconPolygon className="polygon-icon" />
          </CopyTooltip>
        )}
      </IconButton>
      <IconButton onClick={openLinkClick}>
        <IconOpenLink className="action-icon" />
      </IconButton>
      <IconButton onClick={onClickDisconnect}>
        <IconExit className="action-icon" />
      </IconButton>
    </>
  );
};

interface WalletConnectorMenuProps {
  account: AccountModel | null;
  connected: boolean;
  connectAdenaClient: () => void;
  disconnectWallet: () => void;
  onMenuToggle: () => void;
  themeKey: "dark" | "light";
  switchNetwork: () => void;
  isSwitchNetwork: boolean;
}

const WalletConnectorMenu: React.FC<WalletConnectorMenuProps> = ({
  account,
  connected,
  connectAdenaClient,
  disconnectWallet,
  onMenuToggle,
  themeKey,
  switchNetwork,
  isSwitchNetwork,
}) => {
  const [copied, setCopied] = useState(false);
  const copyClick = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (e) {
      throw new Error("Copy Error!");
    }
  };
  const openLinkClick = () => {
    window.open(URL_REDIRECT, "_blank");
  };

  const menuRef = useRef<HTMLDivElement | null>(null);

  const balanceText = useMemo(() => `${account?.balances[0].amount} ${account?.balances[0].currency}` || "0 GNOT", [account?.balances]);

  const onClickDisconnect = useCallback(() => {
    disconnectWallet();
  }, [disconnectWallet]);

  const connect = useCallback(() => {
    onMenuToggle();
    connectAdenaClient();
  }, [connectAdenaClient]);

  return (
    <>
      <WalletConnectorMenuWrapper ref={menuRef} width={window?.innerWidth}>
        {connected ? (
          <div className="button-container">
            <MenuHeader>
              {isSwitchNetwork ? (
                <IconFailed className="fail-icon" />
              ) : (
                <IconAdenaLogo />
              )}
              <span className="user-address">
                {formatAddress(account?.address || "")}
              </span>
              <IconButtonMaker
                copyClick={copyClick}
                openLinkClick={openLinkClick}
                themeKey={themeKey}
                copied={copied}
                onClickDisconnect={onClickDisconnect}
              />
            </MenuHeader>
            {isSwitchNetwork ? (
              <Button
                text="Switch Network"
                onClick={switchNetwork}
                style={{
                  hierarchy: ButtonHierarchy.Primary,
                  fontType: "body9",
                  fullWidth: true,
                  height: 41,
                  justify: "center",
                }}
                className="switch-network"
              />
            ) : (
              <AmountInfoBox>{balanceText}</AmountInfoBox>
            )}
          </div>
        ) : (
          <div className="button-container">
            <Button
              text="Wallet Login"
              onClick={connect}
              style={{
                hierarchy: ButtonHierarchy.Primary,
                fontType: "body9",
                fullWidth: true,
                height: 41,
                justify: "center",
              }}
            />
          </div>
        )}
        <div className="theme-container">
          <ThemeSelector>
            <span>Theme</span>
            <ThemeModeContainer />
          </ThemeSelector>
        </div>
      </WalletConnectorMenuWrapper>
      <Overlay onClick={onMenuToggle} />
    </>
  );
};

export default WalletConnectorMenu;
