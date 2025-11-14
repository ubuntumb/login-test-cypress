/**
 * Tipos para las APIs de JSONPlaceholder
 */

export interface Post {
  userId: number
  id: number
  title: string
  body: string
}

export interface Comment {
  postId: number
  id: number
  name: string
  email: string
  body: string
}

export interface User {
  id: number
  name: string
  username: string
  email: string
  address: Address
  phone: string
  website: string
  company: Company
}

export interface Address {
  street: string
  suite: string
  city: string
  zipcode: string
  geo: Geo
}

export interface Geo {
  lat: string
  lng: string
}

export interface Company {
  name: string
  catchPhrase: string
  bs: string
}

export interface CreatePostRequest {
  title: string
  body: string
  userId: number
}

export interface UpdatePostRequest {
  id?: number
  userId?: number
  title?: string
  body?: string
}

export interface ApiResponse<T> {
  status: number
  body: T
  headers?: Record<string, string>
}
