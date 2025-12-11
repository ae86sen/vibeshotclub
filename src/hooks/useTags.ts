'use client'

import useSWR from 'swr'
import type { Tag, TagType } from '@/types/database'

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export function useTags() {
  const { data, error, isLoading, mutate } = useSWR('/api/tags', fetcher)

  // Group tags by type (slug)
  const tagsByType = (data?.tags as Tag[] | undefined)?.reduce(
    (acc, tag) => {
      const typeKey = tag.type
      if (!acc[typeKey]) acc[typeKey] = []
      acc[typeKey].push(tag)
      return acc
    },
    {} as Record<string, Tag[]>
  )

  return {
    tags: (data?.tags as Tag[]) ?? [],
    tagsByType,
    isLoading,
    isError: error,
    mutate,
  }
}

export function useTagTypes() {
  const { data, error, isLoading, mutate } = useSWR('/api/tag-types', fetcher)

  return {
    tagTypes: (data?.tagTypes as TagType[]) ?? [],
    isLoading,
    isError: error,
    mutate,
  }
}
