import GoogleMaps from '@/components/ShopMap/Googlemap/GoogleMap';
import AddressShop from '@/components/ShopMap/ShopAddress/AddressShop';
import ShopService from '@/components/ShopMap/ShopService/ShopService';
import React from 'react';

const StorPage = () => {
    return (
        <div>
            <GoogleMaps></GoogleMaps>
            <AddressShop></AddressShop> 
            <ShopService></ShopService>
        </div>
    );
};

export default StorPage;