// app/api/reddit/comments/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { redditClient } from '@/lib/reddit/client';
import { CommentSort } from '@/types/reddit';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const subreddit = searchParams.get('subreddit');
    const postId = searchParams.get('postId');
    const sort = (searchParams.get('sort') as CommentSort) || 'confidence';

    if (!subreddit || !postId) {
      return NextResponse.json(
        { error: 'subreddit and postId are required' },
        { status: 400 }
      );
    }

    const data = await redditClient.getPost(subreddit, postId, sort);

    return NextResponse.json(data);
  } catch (error: any) {
    console.error('Error fetching comments:', error);
    
    if (error.response?.status === 404) {
      return NextResponse.json(
        { error: 'Post not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(
      { error: 'Failed to fetch comments' },
      { status: 500 }
    );
  }
}