'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

interface CartItemInput {
    id: string;
    name: string;
    price: number;
    quantity: number;
}

interface ShippingInput {
    fullName: string;
    email: string;
    address: string;
    city: string;
}

/**
 * Procesa la orden simulada en la base de datos de Hostinger
 * 1. Crea la Orden y sus items.
 * 2. Calcula y actualiza el impacto social de donación.
 */
export async function processCheckout(items: CartItemInput[], shipping: ShippingInput, totalAmount: number) {
    try {
        // Calcular donaciones: 1 par donado por cada 2 pares comprados
        const totalPairsPurchased = items.reduce((acc, item) => acc + item.quantity, 0);
        const pairsDonated = Math.floor(totalPairsPurchased / 2);

        // Ejecutar todas las escrituras en la base de datos como una sola Transacción Segura
        const result = await prisma.$transaction(async (tx) => {

            // En el MVP sin Auth real, creamos un usuario ANÓNIMO invitado
            const guestUser = await tx.user.upsert({
                where: { email: shipping.email },
                update: {},
                create: {
                    email: shipping.email,
                    passwordHash: 'guest-checkout'
                }
            });

            // 1. Crear el Pedido (Order)
            const order = await tx.order.create({
                data: {
                    userId: guestUser.id,
                    totalAmount: totalAmount,
                    status: 'PROCESSING', // Estado correcto simulando pago aprobado
                    items: {
                        create: items.map(item => ({
                            productId: item.id,
                            quantity: item.quantity,
                            price: item.price,
                        }))
                    }
                }
            });

            // 2. Actualizar las métricas globales de Impacto si se generaron donaciones
            if (pairsDonated > 0) {
                // Buscar el récord principal de impacto (asumimos que existe el sembrado ID 1)
                const impactRecord = await tx.donationImpact.findFirst();

                if (impactRecord) {
                    await tx.donationImpact.update({
                        where: { id: impactRecord.id },
                        data: {
                            totalPairsDonated: { increment: pairsDonated },
                            // Asumimos 1 zapato = 1 persona ayudada temporalmente
                            totalPeopleHelped: { increment: pairsDonated }
                        }
                    });
                }
            }

            return order;
        });

        // Re-validar las rutas para que el ImpactCounter muestre el nuevo saldo inmediatamente
        revalidatePath('/');
        revalidatePath('/impacto');

        return {
            success: true,
            orderId: result.id,
            impactGenerated: pairsDonated
        };

    } catch (error) {
        console.error('Checkout failed:', error);
        return { success: false, error: 'Failed to process checkout transaction.' };
    }
}
