import { defineStore } from 'pinia'

interface APICache {
  [key: string]: {
    data: string
    timestamp: number
  }
}

interface APIState {
  cache: APICache
  loading: boolean
  error: string | null
  cacheExpiration: number // in milliseconds
}

export const useAPIStore = defineStore('api', {
  state: (): APIState => ({
    cache: {},
    loading: false,
    error: null,
    cacheExpiration: 30 * 60 * 1000 // 30 minutes
  }),

  actions: {
    async fetchFromOpenAI(prompt: string, location: string) {
      const cacheKey = `${location}-${prompt}`
      
      // Check cache first
      if (this.isCacheValid(cacheKey)) {
        return this.cache[cacheKey].data
      }

      this.loading = true
      this.error = null

      try {
        const apiKey = import.meta.env.VITE_OPENAI_API_KEY
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
          },
          body: JSON.stringify({
            model: 'gpt-3.5-turbo',
            messages: [{ role: 'user', content: prompt }],
            temperature: 0.7
          })
        })

        if (!response.ok) {
          throw new Error('Failed to fetch data from OpenAI')
        }

        const data = await response.json()
        const result = data.choices[0].message.content

        // Cache the result
        this.cache[cacheKey] = {
          data: result,
          timestamp: Date.now()
        }

        return result
      } catch (error) {
        this.error = error instanceof Error ? error.message : 'An error occurred'
        throw error
      } finally {
        this.loading = false
      }
    },

    isCacheValid(key: string): boolean {
      if (!this.cache[key]) return false
      
      const timestamp = this.cache[key].timestamp
      return Date.now() - timestamp < this.cacheExpiration
    },

    clearCache() {
      this.cache = {}
    },

    setCacheExpiration(duration: number) {
      this.cacheExpiration = duration
    }
  },

  getters: {
    isLoading: (state) => state.loading,
    hasError: (state) => !!state.error,
    errorMessage: (state) => state.error
  }
})
