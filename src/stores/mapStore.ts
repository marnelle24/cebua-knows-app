import { defineStore } from 'pinia'

interface Region {
  id: string
  name: string
  selected: boolean
}

interface TouristSpot {
  name: string
  description: string
  address: string
  category: string
}

interface MapState {
  selectedRegion: string | null
  regions: Region[]
  touristSpots: TouristSpot[]
  loading: boolean
  error: string | null
  zoomLevel: number
}

export const useMapStore = defineStore('map', {
  state: (): MapState => ({
    selectedRegion: null,
    regions: [],
    touristSpots: [],
    loading: false,
    error: null,
    zoomLevel: 1
  }),

  actions: {
    setSelectedRegion(regionId: string) {
      this.selectedRegion = regionId
      this.regions = this.regions.map(region => ({
        ...region,
        selected: region.id === regionId
      }))
    },

    setZoomLevel(level: number) {
      this.zoomLevel = level
    },

    setTouristSpots(spots: TouristSpot[]) {
      this.touristSpots = spots
    },

    setLoading(status: boolean) {
      this.loading = status
    },

    setError(error: string | null) {
      this.error = error
    },

    resetState() {
      this.selectedRegion = null
      this.touristSpots = []
      this.loading = false
      this.error = null
      this.zoomLevel = 1
    }
  },

  getters: {
    isRegionSelected: (state) => (regionId: string) => {
      return state.selectedRegion === regionId
    },
    
    currentZoomLevel: (state) => state.zoomLevel,
    
    hasError: (state) => !!state.error,
    
    isLoading: (state) => state.loading
  }
})
