// app/api/reddit/search/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { redditClient } from '@/lib/reddit/client';
import { TimeFilter } from '@/types/reddit';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get('q');
    const subreddit = searchParams.get('subreddit') || undefined;
    const sort = (searchParams.get('sort') as any) || 'relevance';
    const timeFilter = searchParams.get('t') as TimeFilter | undefined;
    const after = searchParams.get('after') || undefined;
    const limit = parseInt(searchParams.get('limit') || '25');

    if (!query) {
      return NextResponse.json(
        { error: 'Search query is required' },
        { status: 400 }
      );
    }

    const data = await redditClient.searchPosts(query, {
      subreddit,
      sort,
      timeFilter,
      after,
      limit,
    });

    return NextResponse.json(data);
  } catch (error: any) {
    console.error('Error searching posts:', error);
    
    return NextResponse.json(
      { error: 'Failed to search posts' },
      { status: 500 }
    );
  }
}