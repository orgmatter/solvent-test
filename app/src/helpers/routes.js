import { NftDetails } from '../components/details/NftDetails';

export const routeProps = [
    {
        link: '/nft/details/',
        component: (props) => <NftDetails {...props} />
    },
    {
        link: '/nft/details/:mint',
        component: (props) => <NftDetails {...props} />
    },
]