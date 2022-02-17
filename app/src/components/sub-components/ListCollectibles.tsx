import React, { useEffect, useState } from 'react';
import './list-collectibles.scss';
import { Link } from 'react-router-dom';
import { routeProps } from '../../helpers/routes';

export const ListCollectibles = (props: any) => {

    const { nftList, keyIndex } = props;

    const { key, updateAuthority, mint, data } = nftList;
    const { name, symbol, uri } = data;

    const [imageUri, setImageUri] = useState();

    const collectible = {
        mint,
        data,
        imageUri,
        name,
        symbol
    }

    console.log('image url: ', uri);

    useEffect(() => {

        async function fetchUri() {
            await fetch(uri, {
                method: 'GET',
            })
            .then(initResult => initResult.json())
            .then(response => {
                const { image } = response;
                setImageUri(image);
            })
        }
        fetchUri();

    }, [])
    
    return (
        <Link className="link-card-cover" 
            to={`/nft/details/${mint}`}
            state={
                {collectible}
            }
        >
            <div className="list-collectibles-cover-flex-item" key={keyIndex}>
                <div className="header">
                    <div className="image-cover-flex">
                        <div className="image-cover-item">
                            <img className="img-elem" src={imageUri && imageUri} alt={`NFT Image`} />
                        </div>
                    </div>
                </div>
                <div className="footer">
                    <div className="name-cover">
                        <p className="name-p">{name}</p>
                    </div>
                    <div className="symbol-cover">
                        <p className="symbol-p">{symbol}</p>
                    </div>
                    <div className="btn-cover-flex">
                        <div className="btn-cover-item">
                            <button className="btn-elem" type="button">
                                <Link className="link-elem" 
                                    to={`/nft/details/${mint}`}
                                    state={
                                        {collectible}
                                    }
                                    title="View Bucket"
                                    
                                >
                                    View Bucket
                                </Link>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    )
}