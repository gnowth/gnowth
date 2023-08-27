export interface Step {
  name: string
}

export interface Tag {
  label: string
}

export interface Ingredient {
  name: string
}

export interface Media {
  src: string
}

export interface Recipe {
  ingredients: Ingredient[]
  media: Media[]
  mediaPrimary: string
  name: string
  steps: Step[]
  tags: Tag[]
}
