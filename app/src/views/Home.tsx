import React, {} from 'react';
import { Wallet } from '../components/Wallet';
import { DisplayAccount } from '../components/Dashboard';
import { Collectibles } from '../components/Collectibles';
import './home.scss';


export const Home = (props: any) => {

    const { } = props;

    return (
        <div className="homepage-cover">
            <div className="homepage-cover-flex">
                <div className="homepage-cover-flex-item">
                    <DisplayAccount />
                    <Collectibles />
                </div>
            </div>
        </div>
    )
}