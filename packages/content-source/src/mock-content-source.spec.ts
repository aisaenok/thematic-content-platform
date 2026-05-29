import { contentApi } from './index'
import { mockContentSource } from './mock-content-source'

describe('contentApi', () => {
  it('uses mock content source as the current implementation', () => {
    expect(contentApi.getArticles()).toEqual(mockContentSource.getArticles())
    expect(contentApi.getNewsItems()).toEqual(mockContentSource.getNewsItems())
  })

  it('exposes category and tag queries through the public facade', () => {
    expect(contentApi.getCategories()).toEqual(mockContentSource.getCategories())
    expect(contentApi.getTags()).toEqual(mockContentSource.getTags())
  })

  it('searches content through the public content API facade', () => {
    expect(contentApi.searchContent('xenomorph')).toEqual(
      mockContentSource.searchContent('xenomorph'),
    )
  })
})
