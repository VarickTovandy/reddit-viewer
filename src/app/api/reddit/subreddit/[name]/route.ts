// app/api/reddit/subreddit/[name]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { redditClient } from '@/lib/reddit/client';
import { SortOption, TimeFilter } from '@/types/reddit';

export const dynamic = 'force-dynamic';

export async function GET(
  request: NextRequest,
  { params }: { params: { name: string } }
) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const sort = (searchParams.get('sort') as SortOption) || 'hot';
    const timeFilter = searchParams.get('t') as TimeFilter | undefined;
    const after = searchParams.get('after') || undefined;
    const limit = parseInt(searchParams.get('limit') || '25');

    const data = await redditClient.getSubredditPosts(
      params.name,
      sort,
      {
        timeFilter,
        after,
        limit,
      }
    );

    return NextResponse.json(data);
  } catch (error: any) {
    console.error('Error fetching subreddit:', error);
    
    if (error.response?.status === 404) {
      return NextResponse.json(
        { error: 'Subreddit not found' },
        { status: 404 }
      );
    }

    if (error.response?.status === 403) {
      return NextResponse.json(
        { error: 'This subreddit is private or banned' },
        { status: 403 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to fetch subreddit data' },
      { status: 500 }
    );
  }
}