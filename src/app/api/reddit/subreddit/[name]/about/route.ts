// app/api/reddit/subreddit/[name]/about/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { redditClient } from '@/lib/reddit/client';

export const dynamic = 'force-dynamic';

export async function GET(
  request: NextRequest,
  { params }: { params: { name: string } }
) {
  try {
    const data = await redditClient.getSubredditInfo(params.name);

    return NextResponse.json(data);
  } catch (error: any) {
    console.error('Error fetching subreddit info:', error);
    
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
      { error: 'Failed to fetch subreddit info' },
      { status: 500 }
    );
  }
}