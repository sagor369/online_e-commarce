interface Product {
    id: number;
    name: string;
    price: number;
    bgcolor: string;
}
const Data: Product[] = [
    {
        id: 1,
        name: 'T Shirts',
        price: 399,
        bgcolor: '#715A35;'
    },
    {
        id: 2,
        name: 'Hoodies',
        price: 599,
        bgcolor: '#212645'
    },
    {
        id: 3,
        name: 'Polos',
        price: 499,
        bgcolor: '#715A35'
    },
    {
        id: 4,
        name: 'Mugs',
        price: 199,
        bgcolor: '#C46921'
    },
    {
        id: 5,
        name: 'Bags',
        price: 599,
        bgcolor: '#C3B6A4'
    },
    {
        id: 6,
        name: 'Photo Pillows',
        price: 299,
        bgcolor: '#94645F'
    }
]
export default Data;