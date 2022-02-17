// @ts-ignore
import Wallet from '@project-serum/sol-wallet-adapter';
import { useWallet, useConnection } from '@solana/wallet-adapter-react';
import { PhantomWalletAdapter, LedgerWalletAdapter } from '@solana/wallet-adapter-wallets';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';

import {
    PublicKey,
    Transaction,
    sendAndConfirmTransaction,
    SystemProgram,
    TransactionInstruction,
    Connection,
    clusterApiUrl,
    TokenBalance,
} from '@solana/web3.js';
import * as anchor from '@project-serum/anchor';
import { getParsedNftAccountsByOwner, createConnectionConfig, isValidSolanaAddress, resolveToWalletAddress } from '@nfteyez/sol-rayz';
import EventEmitter from 'eventemitter3';

interface ConnectOpts {
    onlyIfTrusted: boolean;
}


export interface WalletAdapter extends EventEmitter {
    publicKey: PublicKey | null;
    signTransaction: (transaction: Transaction) => Promise<Transaction>;
    connect: (opts?: Partial<ConnectOpts>) => Promise<void>;
}

const cluster = clusterApiUrl(WalletAdapterNetwork.Devnet);
const connection = new Connection(cluster, 'confirmed');
const wallet:PhantomWalletAdapter = new PhantomWalletAdapter();



export const initWallet = async (): Promise<[Connection, PhantomWalletAdapter]> => {
    wallet.on('connect', (publicKey) => {
        console.log('connected to: ', publicKey.toBase58());
    })
    await wallet.connect();

    localStorage.setItem('wallet-state', 'connected')
    return [connection, wallet];
}

export const disconnectWallet = async (): Promise<PhantomWalletAdapter> => {
    await wallet.disconnect();

    localStorage.setItem('wallet-state', 'disconnected')
    return wallet;
} 

export const getAccountInfo = async (): Promise<[PublicKey, number]> => {
    const walletAccountInfo = await connection.getAccountInfo(wallet.publicKey as any);
    const balance = await connection.getBalance(wallet.publicKey as any)

    return [walletAccountInfo?.owner as any, balance];
}

export const getNftList = async (address: PublicKey) => {
    try {
        if(connection) {
            const connect = createConnectionConfig(clusterApiUrl(WalletAdapterNetwork.Devnet));
            const result = isValidSolanaAddress(wallet.publicKey as any);

            const nfts = await getParsedNftAccountsByOwner({
                publicAddress: address,
                connection: connect,
            })
            console.log('nfts: ', nfts);

            return nfts;   
        }
    }catch(error) {
        console.log(error)
    }
}

export const getWallet = async (): Promise<PhantomWalletAdapter> => {
    return await wallet;
}

