import type { Media } from './assets'

export type Recipe = {
  name: string
  ingredients: Ingredient[]
  methods: string[]
  media: Media[]
}

export type Ingredient = {
  name: string
}
