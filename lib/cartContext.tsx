"use client";

import { createContext, ReactNode, useContext, useEffect, useState } from "react";

export interface CartItem {
    id: number;
    title: string;
    price: number;
    image: string;
    quantity: number;
    color: string;
}

interface CartContextType {
    items: CartItem[];
    addItem: (product: Omit<CartItem, 'quantity'>, quantity?: number) => void;
    removeItem: (id: number) => void;
    updateQuantity: (id: number, quantity: number) => void;
    clearCart: () => void;
    total: number;
    itemCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([]);
    const [isHydrated, setIsHydrated] = useState(false);


    useEffect(() => {
        const stored = localStorage.getItem('cartItems')

        if(stored) {
            setItems(JSON.parse(stored))
        }
        setIsHydrated(true)
    }, []);

    useEffect(() => {
        if (isHydrated) {
            localStorage.setItem('cartItems', JSON.stringify(items));
        }
    }, [items, isHydrated])

    const addItem = (product: Omit<CartItem, 'quantity'>, quantity: number = 1) => {
        setItems(prevItems => {
            const existingItem = prevItems.find(item => item.id === product.id && item.color === product.color);
            if (existingItem) {
                return prevItems.map(item =>
                    item.id === product.id && item.color === product.color
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                );
            }
            return [...prevItems, { ...product, quantity }];
        });
    };

    const removeItem = (id: number) => {
        setItems(prevItems => prevItems.filter(item => item.id !== id));
    };

    const updateQuantity = (id: number, quantity: number) => {
        setItems(prevItems => 
            prevItems.map(item =>
                item.id === id
                    ? { ...item, quantity }
                    : item
            )
        )
    }
        
    const clearCart = () => {
        setItems([]);
    };

    const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const itemCount = items.reduce((acc, item) => acc + item.quantity, 0);

    return (
        <CartContext.Provider value={{
            items,
            addItem,
            removeItem,
            updateQuantity,
            clearCart,
            total,
            itemCount,
        }}>
            {children}
        </CartContext.Provider>
    )
}

export function useCart() {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
}