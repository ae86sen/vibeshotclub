import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

// GET - 获取已发布的提示词列表 (公开只读)
export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient()
    const { searchParams } = new URL(request.url)

    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')
    const tagId = searchParams.get('tag')
    const featured = searchParams.get('featured')

    // Build query - only published prompts
    let query = supabase
      .from('prompts')
      .select(
        `
        *,
        prompt_tags (
          tag_id,
          tags (id, name, type, type_id, color)
        )
      `,
        { count: 'exact' }
      )
      .eq('is_published', true)
      .order('is_featured', { ascending: false })
      .order('sort_order', { ascending: false })
      .order('created_at', { ascending: false })

    // Filters
    if (featured === 'true') {
      query = query.eq('is_featured', true)
    }

    // Pagination
    const from = (page - 1) * limit
    const to = from + limit - 1
    query = query.range(from, to)

    const { data, error, count } = await query

    if (error) {
      console.error('Supabase query error:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    // 单独获取 prompt_images
    let imagesMap: Record<string, Array<{ id: string; image_url: string; thumbnail_url: string | null; sort_order: number }>> = {}
    if (data && data.length > 0) {
      const promptIds = data.map(p => p.id)
      const { data: images } = await supabase
        .from('prompt_images')
        .select('id, prompt_id, image_url, thumbnail_url, sort_order')
        .in('prompt_id', promptIds)
        .order('sort_order', { ascending: true })

      if (images) {
        images.forEach(img => {
          if (!imagesMap[img.prompt_id]) {
            imagesMap[img.prompt_id] = []
          }
          imagesMap[img.prompt_id].push(img)
        })
      }
    }

    // Transform data to flatten tags and add images
    const prompts = data?.map((prompt) => ({
      ...prompt,
      tags: prompt.prompt_tags?.map((pt: { tags: unknown }) => pt.tags) || [],
      images: imagesMap[prompt.id] || [],
      prompt_tags: undefined,
    }))

    // Filter by tag if needed (post-query filter for many-to-many)
    let filteredPrompts = prompts
    if (tagId) {
      filteredPrompts = prompts?.filter((p) =>
        p.tags.some((t: { id: string }) => t.id === tagId)
      )
    }

    return NextResponse.json({
      prompts: filteredPrompts,
      pagination: {
        page,
        limit,
        total: count || 0,
        totalPages: Math.ceil((count || 0) / limit),
      },
    })
  } catch (error) {
    console.error('Get prompts error:', error)
    return NextResponse.json({ error: '获取提示词失败' }, { status: 500 })
  }
}
