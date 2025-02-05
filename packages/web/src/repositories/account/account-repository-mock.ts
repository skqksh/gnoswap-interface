import { StorageClient } from "@common/clients/storage-client";
import {
  generateAddress,
  generateNumber,
  generateTime,
  generateNumberPlus,
} from "@common/utils/test-util";
import { StatusOptions } from "@common/values/data-constant";
import {
  AccountHistoryModel,
  TransactionModel,
} from "@models/account/account-history-model";
import { faker } from "@faker-js/faker";
import { AccountRepository, AccountTransactionResponse } from ".";
import { AccountModel } from "@models/account/account-model";
import { AccountBalanceModel } from "@models/account/account-balance-model";

import AccountBalancesData from "./mock/account-balances.json";
import { WalletResponse, SwitchNetworkResponse } from "@common/clients/wallet-client/protocols";

export class AccountRepositoryMock implements AccountRepository {
  private localStorageClient: StorageClient;

  constructor(localStorageClient: StorageClient<any>) {
    this.localStorageClient = localStorageClient;
  }

  public isConnectedWalletBySession = () => {
    const response = this.localStorageClient.get("connectedWallet");
    return response === "connected";
  };

  public setConnectedWallet = (connected: boolean) => {
    if (connected) {
      this.localStorageClient.set("connectedWallet", "connected");
    }
    this.localStorageClient.remove("connectedWallet");
  };

  public getAccount = async (): Promise<AccountModel> => {
    return AccountRepositoryMock.generateAccount();
  };

  public getBalances = async (): Promise<AccountBalanceModel[]> => {
    return AccountBalancesData.balances as AccountBalanceModel[];
  };

  public getTransactions = async (): Promise<AccountTransactionResponse> => {
    return AccountRepositoryMock.generateTransactions();
  };

  public existsWallet = () => {
    return true;
  };

  public addEstablishedSite = async () => {
    return {
      code: 0,
      status: "0",
      type: "0",
      message: "0",
      data: null,
    };
  };

  public sendTransaction = async () => {
    return {
      code: 0,
      status: "0",
      type: "0",
      message: "0",
      data: null,
    };
  };

  public getNotificationsByAddress = async (
    address: string,
  ): Promise<AccountHistoryModel> => {
    const history = this.getHistory();
    if (!history[address]) {
      return {
        txs: [],
      };
    }

    return history[address];
  };

  public createNotification = async (
    address: string,
    transaction: TransactionModel,
  ): Promise<boolean> => {
    const notifications = await this.getNotificationsByAddress(address);
    const transactions = [...notifications.txs, transaction];
    const history = this.getHistory();
    const savedHistory = {
      ...history,
      [address]: {
        txs: transactions,
      },
    };
    this.localStorageClient.set(
      "transaction-history",
      JSON.stringify(savedHistory),
    );
    return true;
  };

  public updateNotificationStatus = async (
    address: string,
    txHash: string,
    status: StatusOptions,
  ): Promise<boolean> => {
    const notifications = await this.getNotificationsByAddress(address);
    const transactions = [...notifications.txs].map(transaction => {
      if (transaction.txHash === txHash) {
        return {
          ...transaction,
          status,
        };
      }
      return transaction;
    });

    const history = this.getHistory();
    const savedHistory = {
      ...history,
      [address]: {
        txs: transactions,
      },
    };

    this.localStorageClient.set(
      "transaction-history",
      JSON.stringify(savedHistory),
    );
    return true;
  };

  public deleteAllNotifications = async (address: string): Promise<boolean> => {
    const history = this.getHistory();
    const savedHistory = {
      ...history,
      [address]: {
        txs: [],
      },
    };
    this.localStorageClient.set(
      "transaction-history",
      JSON.stringify(savedHistory),
    );
    return true;
  };

  private getHistory = () => {
    let historyValue = this.localStorageClient.get("transaction-history");
    if (!historyValue || historyValue === "") {
      historyValue = JSON.stringify({ txs: [] });
      this.localStorageClient.set("transaction-history", historyValue);
    }

    let history: { [key in string]: AccountHistoryModel } = {};
    try {
      history = JSON.parse(historyValue);
    } catch (e) {
      throw new Error("Not found history");
    }
    return history;
  };

  private static generateAccount = (): AccountModel => {
    return {
      status: "ACTIVE",
      address: generateAddress(),
      balances: [],
      publicKeyType: "",
      publicKeyValue: "",
      accountNumber: Math.round(generateNumberPlus()),
      sequence: Math.round(generateNumberPlus()),
      chainId: "test3",
    };
  };

  private static generateTransactions = () => {
    const statusIndex = Math.round(generateNumber(7, 15));
    const txs = [];
    for (let i = 0; i < statusIndex; i++) {
      txs.push(AccountRepositoryMock.generateTransaction());
    }
    return {
      total: txs.length,
      hits: txs.length,
      txs,
    };
  };

  private static generateTransaction = () => {
    const statusIndex = Math.round(generateNumber(1, 3));
    const statuses = ["SUCCESS", "PENDING", "FAILED"];
    return {
      tx_hash: `${generateNumber(1, 1000)}_0`,
      logo: "https://adena.app/assets/images/logo.svg",
      description: faker.word.interjection(),
      status: statuses[statusIndex % 3] as "SUCCESS" | "PENDING" | "FAILED",
      created_at: generateTime().toUTCString(),
    };
  };

  public switchNetwork: (chainId: string) => Promise<WalletResponse<SwitchNetworkResponse>> = async () => {
    return {
      code: 0,
      status: "0",
      type: "0",
      message: "0",
      data: null,
    };
  };
}
