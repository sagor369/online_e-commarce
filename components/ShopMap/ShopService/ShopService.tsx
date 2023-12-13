import React from 'react';

const ShopService = () => {
    const service = [
        "Digital Printing", "Instant Photo Print ", "Phot Book ", "Corporate Gifts", "Brochures and Pamphlets", "Photo Gift ", "Business Cards", "T-shirts"
    ]
    return (
        <div>
            <ul style={{ listStyleType: "square" }}>
                {
                    service.map(item => <li className='inline-black'>{item} </li>)
                }
            </ul>
        </div>
    );
};

export default ShopService;