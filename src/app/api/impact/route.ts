import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
    try {
        const impact = await prisma.donationImpact.findFirst();
        if (!impact) {
            return NextResponse.json({
                totalPairsDonated: 0,
                totalPeopleHelped: 0,
                activeCampaigns: 0,
            });
        }
        return NextResponse.json(impact);
    } catch (error) {
        console.error('Failed to fetch impact data:', error);
        return NextResponse.json({ error: 'Data source error' }, { status: 500 });
    }
}
