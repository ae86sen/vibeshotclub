'use client'

import useSWR from 'swr'
import type { PromptWithTags } from '@/types/database'

const fetcher = (url: string) => fetch(url).then((res) => res.json())

interface UsePromptsOptions {
  page?: number
  limit?: number
  tag?: string
  tags?: string[]
  search?: string
  featured?: boolean
}

export function usePrompts(options: UsePromptsOptions = {}) {
  const { page = 1, limit = 20, tag, tags, search, featured } = options

  const params = new URLSearchParams()
  params.set('page', String(page))
  params.set('limit', String(limit))
  if (tag) params.set('tag', tag)
  if (tags && tags.length > 0) params.set('tags', tags.join(','))
  if (search) params.set('search', search)
  if (featured) params.set('featured', 'true')

  const { data, error, isLoading, mutate } = useSWR(
    `/api/prompts?${params.toString()}`,
    fetcher
  )

  return {
    prompts: (data?.prompts as PromptWithTags[]) ?? [],
    pagination: data?.pagination,
    isLoading,
    isError: error,
    mutate,
  }
}
