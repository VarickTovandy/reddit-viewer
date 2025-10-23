// app/api/reddit/search/subreddits/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { redditClient } from '@/lib/reddit/client';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const query = searchParams.get('q');
        const limit = parseInt(searchParams.get('limit') || '5');

        if (!query || query.trim().length === 0) {
            return NextResponse.json({ data: { children: [] } });
        }

        const data = await redditClient.searchSubreddits(query, limit);

        return NextResponse.json(data);
    } catch (error: any) {
        console.error('Error searching subreddits:', error);

        return NextResponse.json(
            { error: 'Failed to search subreddits' },
            { status: 500 }
        );
    }
}