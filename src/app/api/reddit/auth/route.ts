import { NextRequest, NextResponse } from 'next/server';
import { redditClient } from '@/lib/reddit/client';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    console.log('Testing Reddit API connection...');
    
    // Test the connection by fetching r/programming hot posts
    const data = await redditClient.getSubredditPosts('programming', 'hot', {
      limit: 5,
    });

    console.log('✅ Reddit API connection successful!');

    return NextResponse.json({
      success: true,
      message: 'Reddit API connection successful!',
      postsRetrieved: data.data.children.length,
      sample: data.data.children[0]?.data.title || 'No posts found',
    });
  } catch (error: any) {
    console.error('❌ Reddit API test failed:', error);
    
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Failed to connect to Reddit API',
        details: error.response?.data || null,
      },
      { status: 500 }
    );
  }
}