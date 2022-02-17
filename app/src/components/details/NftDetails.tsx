import React, {} from 'react';
import { useLocation, useMatch, useParams } from 'react-router-dom';
import { routeProps } from '../../helpers/routes';
import './nft-details.scss';

export const NftDetails = (props: any) => {

    const { link } = props;
    let params = useParams();
    let match = useMatch(link);
    const { collectible } = useLocation().state as any;

    const { mint, symbol, name, data, imageUri } = collectible;
    
    return (
        <div className="nft-detail-cover">
            <div className="nft-detail-cover-flex">
                <div className="nft-detail-cover-item">
                    <div className="nft-detail-header">
                        <div className="image-cover-flex">
                            <div className="image-cover-item">
                                <img className="image-elem" src={imageUri} alt="NFT Image" />
                            </div>
                        </div>
                    </div>
                    <div className="nft-detail-footer">
                        <div className="nft-detail-footer-item">
                            <div className="name-cover-item">
                                <p className="name-p">NAME: {name}</p>
                            </div>
                            <div className="symbol-cover-item">
                                <p className="symbol-p">SYMBOL: {symbol}</p>
                            </div>
                            <div className="mint-cover-item">
                                <p className="mint-p">MINT: {mint}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}