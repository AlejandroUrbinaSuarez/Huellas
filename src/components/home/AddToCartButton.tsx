'use client';

import { useCartStore } from '@/store/cartStore';
import { ShoppingCart } from 'lucide-react';
import { useState } from 'react';

interface AddToCartButtonProps {
    product: {
        id: string;
        name: string;
        price: number | any; // Prisma Decimal interop
        imageUrl: string | null;
    };
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
    const { addItem, setIsCartOpen } = useCartStore();
    const [isAdded, setIsAdded] = useState(false);

    const handleAddToCart = () => {
        addItem({
            id: product.id,
            name: product.name,
            price: Number(product.price),
            imageUrl: product.imageUrl,
        });

        setIsAdded(true);
        setIsCartOpen(true); // Abre el carrito automáticamente

        setTimeout(() => {
            setIsAdded(false);
        }, 2000);
    };

    return (
        <button
            onClick={handleAddToCart}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${isAdded
                    ? 'bg-accent text-white scale-105'
                    : 'bg-brand-900 hover:bg-brand-800 text-white'
                }`}
        >
            <ShoppingCart className="w-4 h-4" />
            {isAdded ? '¡Agregado!' : 'Comprar'}
        </button>
    );
}
