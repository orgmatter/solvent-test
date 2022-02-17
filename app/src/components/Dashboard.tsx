import React, { useState, useEffect } from 'react';
import { initWallet, disconnectWallet } from '../helpers/wallet';
import { Connection, PublicKey, LAMPORTS_PER_SOL } from '@solana/web3.js';
import { Collectibles } from './Collectibles';
import './display-account.scss';

export const DisplayAccount = (props: any) => {

    const {} = props;

    const [connection, setConnection] = useState<Connection>();
    const [wallet, setWallet] = useState(Object.assign({}));
    const [connectBtnState, setConnectBtnState] = useState('');
    const [walletAddress, setWalletAddress] = useState('');
    const [walletBalance, setWalletBalance] = useState('');
    const [isWalletConnected, setIsWalletConnected] = useState(Boolean);
    const [isNftWalletConnected, setIsNftWalletConnected] = useState(Boolean);

    const getNftWalletConnected = (event: string) => {
        if(event === 'connect') {
            setIsNftWalletConnected(true);
        }else if(event === 'disconnect') {
            setIsNftWalletConnected(false);
        }
    }   

    const getWalletBalance = async (publicKey: PublicKey) => {
       let walletBalance = await connection?.getBalance(publicKey);

       if(walletBalance !== undefined) {
            walletBalance = (walletBalance/LAMPORTS_PER_SOL);
            setWalletBalance(walletBalance as any);
       }
    }

    const clearWalletBalance = async () => {
        setWalletBalance('');
    }

    const handleConnectWallet = async (e: any) => {
        e.preventDefault();
        await initWallet()
        .then(([connection, wallet]) => {
            setConnection(connection);
            setWallet(wallet);

            // set wallet address
            setWalletAddress(wallet.publicKey!.toBase58());
            getWalletBalance(wallet.publicKey as any);
            setIsWalletConnected(wallet.connected);
            getNftWalletConnected('connect');
            // setIsWalletConnected(true)
        })
    }

    const handleDisonnectWallet = async (e: any) => {
        e.preventDefault();
        await disconnectWallet()
        .then((wallet) => {
            setWallet(wallet)

            setWalletAddress('');
            clearWalletBalance();
            setIsWalletConnected(false);
            getNftWalletConnected('disconnect');
        })
    }

    function ConnectWalletBtn(props: any) {

        const {isWalletConnected} = props;

        if(!isWalletConnected) {

            return (
                <div className="display-account-btn-cover-item">
                    <button 
                        className="display-account-btn" 
                        type="button"
                        onClick={handleConnectWallet}
                    >
                        Connect
                    </button>
                </div>
            )
        }else if(isWalletConnected) {

            return (
                <div className="display-account-btn-cover-item">
                    <button 
                        className="display-account-btn" 
                        type="button"
                        onClick={handleDisonnectWallet}
                    >
                        Disconnect
                    </button>
                </div>
            )
        }
        return (
            <div className="display-account-btn-cover-item">
                <button 
                    className="display-account-btn" 
                    type="button"
                    onClick={handleConnectWallet}
                >
                    Connecting
                </button>
            </div>
        )
    }

    useEffect(() => {


    }, [wallet.connected])

    return (
        <>
            <div className="display-account-cover">
                <div className="display-account-cover-flex">
                    <div className="display-account-cover-flex-item">
                        <div className="dispaly-account-inner-cover-flex">
                            <div className="display-account-inner-cover-flex-item">
                                <div className="display-account-column-flex">
                                    <div className="display-account-column-item">
                                        <p className="display-text-label">Address:</p>
                                    </div>
                                    <div className="display-account-column-item">
                                        <p className="display-text">{walletAddress}</p>
                                    </div>
                                </div>
                                <div className="display-account-column-flex">
                                    <div className="display-account-column-item">
                                        <p className="display-text-label">SOL:</p>
                                    </div>
                                    <div className="display-account-column-item">
                                        <p className="display-text">{walletBalance}</p>
                                    </div>
                                </div>
                                <div className="display-account-column-btn-flex">
                                    <div className="display-account-btn-cover-flex">
                                        <ConnectWalletBtn isWalletConnected={isWalletConnected} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Collectibles isNftWalletConnected={isNftWalletConnected} address={wallet.publicKey} />
        </>
    )
}