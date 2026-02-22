const { spawnSync } = require('child_process');
const fs = require('fs');

try {
    let envFile;
    try {
        envFile = fs.readFileSync('.env', 'utf-16le');
        if (!envFile.includes('DATABASE_URL=')) throw new Error('not 16');
    } catch (e) {
        envFile = fs.readFileSync('.env', 'utf-8');
    }

    const dbUrlLine = envFile.split('\n').find(line => line.trim().startsWith('DATABASE_URL='));
    if (dbUrlLine) {
        const url = dbUrlLine.replace('DATABASE_URL=', '').trim().replace(/"/g, '');
        process.env.DATABASE_URL = url;

        console.log('Running prisma generate...');
        spawnSync('npx.cmd', ['prisma', 'generate'], { env: process.env, stdio: 'inherit' });

        console.log('Running tsx prisma/seed.ts...');
        spawnSync('npx.cmd', ['tsx', 'prisma/seed.ts'], { env: process.env, stdio: 'inherit' });
    } else {
        console.error('DATABASE_URL not found in .env');
    }
} catch (e) {
    console.error(e);
}
