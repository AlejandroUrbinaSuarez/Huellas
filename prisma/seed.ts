import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('Iniciando el seeding de datos de prueba...');

    // 1. Reset Impact Data (just in case)
    await prisma.donationImpact.deleteMany({});

    // Create base Impact Tracker
    await prisma.donationImpact.create({
        data: {
            totalPairsDonated: 1240,
            totalPeopleHelped: 1240,
            activeCampaigns: 3,
        },
    });

    // 2. Clear existing products (optional, for safety during development)
    await prisma.product.deleteMany({});

    // 3. Create sample Products
    const products = await Promise.all([
        prisma.product.create({
            data: {
                name: 'Zapatillas Urbanas Eco',
                description: 'Zapatillas cómodas para el día a día hechas con materiales reciclados.',
                price: 89.90,
                stock: 50,
                imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80',
                categoryId: 'urban'
            }
        }),
        prisma.product.create({
            data: {
                name: 'Botas de Montaña Sendero',
                description: 'Resistentes y seguras para cualquier aventura en la naturaleza.',
                price: 120.00,
                stock: 30,
                imageUrl: 'https://images.unsplash.com/photo-1520639888713-7851133b1ed0?w=500&q=80',
                categoryId: 'outdoor'
            }
        }),
        prisma.product.create({
            data: {
                name: 'Deportivas Ligereza Pro',
                description: 'Diseñadas para correr largas distancias con el máximo confort.',
                price: 95.50,
                stock: 45,
                imageUrl: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=500&q=80',
                categoryId: 'sport'
            }
        }),
        prisma.product.create({
            data: {
                name: 'Clásicas Canvas',
                description: 'Un estilo atemporal que combina con todo.',
                price: 65.00,
                stock: 100,
                imageUrl: 'https://images.unsplash.com/photo-1514989940723-e8e51635b782?w=500&q=80',
                categoryId: 'casual'
            }
        })
    ]);

    console.log('Seeding completado con éxito.');
    console.log(`Se insertaron ${products.length} productos.`);
}

main()
    .catch((e) => {
        console.error('Error durante el seeding:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
