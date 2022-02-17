import React, { FC, useMemo, useState, useEffect } from 'react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider, WalletDisconnectButton, WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { 
  PhantomWalletAdapter,
  LedgerWalletAdapter,
 } from '@solana/wallet-adapter-wallets';
import { clusterApiUrl, PublicKey, Transaction, Keypair, Connection, AccountInfo } from '@solana/web3.js';
import BN from 'bn.js';

// Default styles that can be overridden by your app provider.publicKey
require('@solana/wallet-adapter-react-ui/styles.css');

// type DisplayEncoding = "utf8" | "hex";
// type PhantomEvent = "disconnect" | "connect";
// type PhantomRequestMethod =
//   | "connect"
//   | "disconnect"
//   | "signTransaction"
//   | "signAllTransactions"
//   | "signMessage";

// interface ConnectOpts {
//     onlyIfTrusted: boolean;
//   }

// interface PhantomProvider {
//     publicKey: PublicKey | PublicKeyInitData;
//     isConnected: boolean | null;
//     autoApprove: boolean | null;
//     signTransaction: (transaction: Transaction) => Promise<Transaction>;
//     signAllTransactions: (transactions: Transaction[]) => Promise<Transaction[]>;
//     signMessage: (
//       message: Uint8Array | string,
//       display?: DisplayEncoding
//     ) => Promise<any>;
//     connect: (opts?: Partial<ConnectOpts>) => Promise<void>;
//     disconnect: () => Promise<void>;
//     on: (event: PhantomEvent, handler: (args: any) => void) => void;
//     request: (method: PhantomRequestMethod, params: any) => Promise<any>;
//   }

const getProvider = () => {
    
    if('solana' in window) {
        const provider = (window as any).solana;

        if(provider.isPhantom) {
            return provider;
        }

        window.open('https://phantom.com', '_blank')
    }
}
 
export const Wallet: FC = () =>  {

    const provider = getProvider();

    const network = WalletAdapterNetwork.Devnet;
    const endpoints = useMemo(() => clusterApiUrl(network), [network]);

    const wallets = useMemo(() => [
        new PhantomWalletAdapter(),
        new LedgerWalletAdapter()
    ], [network]);

    const connection = new Connection(clusterApiUrl(network));

    const getAccountInfo = async (): Promise<any> => {
       const accountInfo = await connection.getAccountInfo(provider!.publicKey!);

        console.log('account: ', accountInfo?.data);
    }


    useEffect(() => {

        if(provider) {

            getAccountInfo();
            provider.connect({'onlyIfTrusted': true});
            return () => {
                provider.disconnect()
            }

        }

    }, [provider]);


  return (
    <ConnectionProvider endpoint={endpoints}>
      <WalletProvider wallets={wallets}>
          <WalletModalProvider>
            {provider && provider.isConnected === null ?  <WalletDisconnectButton />
            :<WalletMultiButton />}
          </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}
