const { PrismaClient } = require('@prisma/client');
const fs = require('fs');

async function main() {
    let envFile;
    try {
        envFile = fs.readFileSync('.env', 'utf-16le');
        if (!envFile.includes('DATABASE_URL=')) throw new Error('not 16');
    } catch (e) {
        envFile = fs.readFileSync('.env', 'utf-8');
    }

    const dbUrlLine = envFile.split('\n').find(line => line.trim().startsWith('DATABASE_URL='));
    if (dbUrlLine) {
        process.env.DATABASE_URL = dbUrlLine.replace('DATABASE_URL=', '').trim().replace(/"/g, '');
    }

    const prisma = new PrismaClient();
    const count = await prisma.product.count();
    console.log(`Products in database: ${count}`);
}

main().catch(console.error).finally(() => process.exit(0));
