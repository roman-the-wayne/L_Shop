interface Rating{
    rate: number,
    count: number;
}

interface Product{
    id: number;
    title: string;
    price: number;
    description?: string;
    category: string;
    image: string;
    rating: Rating | null;
}

interface User{
    id: string | number;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    avatarUrl?: string;
    role: 'admin' | 'user' | 'guest';
}