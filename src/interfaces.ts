export interface Rating{
    rate: number,
    count: number;
}

export interface Product{
    id: number;
    title: string;
    price: number;
    description?: string;
    category: string;
    size: 3 | 4 | 5 | 6 | 7;
    image: string;
    rating: Rating | null;
}

export interface User{
    id: string | number;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    avatarUrl?: string;
    role: 'admin' | 'user' | 'guest';
}