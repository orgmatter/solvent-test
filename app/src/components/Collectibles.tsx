import React, { useEffect, useState } from 'react';
import { getNftList, getWallet } from '../helpers/wallet';
import { ListCollectibles } from './sub-components/ListCollectibles';
import './collectibles.scss';

export const Collectibles = (props: any) => {

    const { isNftWalletConnected, address } = props;

    const [nftLists, setNftLists] = useState([]);
    const [nftListLoading, setNftListLoading] = useState(false);

    const handleLoadCollectibles = async (e: any) => {
        e.preventDefault();
        getNftList(address)
        .then(nfts => {
            setNftLists(nfts as any);
            setNftListLoading(true);
        }) 
    } 

    useEffect(() => {
        if(isNftWalletConnected) {
            getNftList(address)
            .then(nfts => {
                setNftLists(nfts as any);
                setNftListLoading(true);
            }) 
        }

    }, []);
    
    return isNftWalletConnected ? (
        <div className="collectibles-cover">
            <div className="collectibles-cover-flex">
                <div className="collectibles-cover-flex-item">
                    <div className="list-collectibles-cover">
                        <div className="list-collectibles-cover-flex">
                            {
                                nftLists.length > 0 ? nftLists.map((nftList, index) => {
                                    console.log('nft list: ', nftList)

                                    return (
                                        <ListCollectibles nftList={nftList} keyIndex={index} />
                                    )
                                }):
                                <div className="" style={{width: '100%', display: 'flex', justifyContent: 'center'}}>
                                    <p>There are no collectibles found for that account</p>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    ):
    (
        <>
            <div className="" style={{width: '100%', display: 'flex', justifyContent: 'center'}}>
                <button onClick={handleLoadCollectibles}>Load collectibles</button>
            </div>
        </>
    )
}