import { render } from "@testing-library/react";
import { Provider as JotaiProvider } from "jotai";
import GnoswapThemeProvider from "@providers/gnoswap-theme-provider/GnoswapThemeProvider";
import WithDrawModal from "./WithDrawModal";
import { DEVICE_TYPE } from "@styles/media";
import { TokenModel } from "@models/token/token-model";

describe("WithDrawModal Component", () => {
  it("WithDrawModal render", () => {
    const mockProps = {
      breakpoint: DEVICE_TYPE.WEB,
      withdrawInfo: {
        chainId: "dev",
        createdAt: "2023-10-10T08:48:46+09:00",
        name: "Gnoswap",
        address: "g1sqaft388ruvsseu97r04w4rr4szxkh4nn6xpax",
        path: "gno.land/r/gnos",
        decimals: 4,
        symbol: "GNOT",
        logoURI:
          "https://raw.githubusercontent.com/onbloc/gno-token-resource/main/gno-native/images/gnot.svg",
        priceId: "gno.land/r/gnos",
      },
      fromToken: {
        chainId: "dev",
        createdAt: "2023-10-10T08:48:46+09:00",
        name: "Gnoswap",
        address: "g1sqaft388ruvsseu97r04w4rr4szxkh4nn6xpax",
        path: "gno.land/r/gnos",
        decimals: 4,
        symbol: "GNOT",
        logoURI:
          "https://raw.githubusercontent.com/onbloc/gno-token-resource/main/gno-native/images/gnot.svg",
        priceId: "gno.land/r/gnos",
      },
      toToken: {
        chainId: "dev",
        createdAt: "2023-10-10T08:48:46+09:00",
        name: "Gnoswap",
        address: "g1sqaft388ruvsseu97r04w4rr4szxkh4nn6xpax",
        path: "gno.land/r/gnos",
        decimals: 4,
        symbol: "GNOT",
        logoURI:
          "https://raw.githubusercontent.com/onbloc/gno-token-resource/main/gno-native/images/gnot.svg",
        priceId: "gno.land/r/gnos",
      },
      connected: true,
      changeToken: () => null,
      close: () => null,
    };

    render(
      <JotaiProvider>
        <GnoswapThemeProvider>
          <WithDrawModal {...mockProps} />
        </GnoswapThemeProvider>
      </JotaiProvider>,
    );
  });
});
