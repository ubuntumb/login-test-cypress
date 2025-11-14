/**
 * API Helper para JSONPlaceholder
 * Encapsula las llamadas a la API con métodos reutilizables
 * Similar al Page Object Model pero para APIs
 */

import { Post, Comment, CreatePostRequest, UpdatePostRequest } from '../support/api-types'

class JsonPlaceholderApi {
  private readonly baseUrl: string = 'https://jsonplaceholder.typicode.com'

/**
 * Obtener url base
 * @returns 
 */
  public getBaseUrl(): string {
    return this.baseUrl;
  }

  /**
   * GET - Obtener todos los posts
   */
  getAllPosts(): Cypress.Chainable<Cypress.Response<Post[]>> {
    return cy.request<Post[]>({
      method: 'GET',
      url: `${this.baseUrl}/posts`,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }

  /**
   * GET - Obtener un post por ID
   */
  getPostById(postId: number): Cypress.Chainable<Cypress.Response<Post>> {
    return cy.request<Post>({
      method: 'GET',
      url: `${this.baseUrl}/posts/${postId}`,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }

  /**
   * GET - Obtener comentarios de un post
   */
  getPostComments(postId: number): Cypress.Chainable<Cypress.Response<Comment[]>> {
    return cy.request<Comment[]>({
      method: 'GET',
      url: `${this.baseUrl}/posts/${postId}/comments`,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }

  /**
   * GET - Obtener comentarios usando query parameters
   */
  getCommentsByPostId(postId: number): Cypress.Chainable<Cypress.Response<Comment[]>> {
    return cy.request<Comment[]>({
      method: 'GET',
      url: `${this.baseUrl}/comments`,
      qs: {
        postId: postId,
      },
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }

  /**
   * POST - Crear un nuevo post
   */
  createPost(postData: CreatePostRequest): Cypress.Chainable<Cypress.Response<Post>> {
    return cy.request<Post>({
      method: 'POST',
      url: `${this.baseUrl}/posts`,
      body: postData,
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
    })
  }

  /**
   * PUT - Actualizar completamente un post
   */
  updatePost(postId: number, postData: UpdatePostRequest): Cypress.Chainable<Cypress.Response<Post>> {
    return cy.request<Post>({
      method: 'PUT',
      url: `${this.baseUrl}/posts/${postId}`,
      body: {
        ...postData,
        id: postId,
      },
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
    })
  }

  /**
   * PATCH - Actualizar parcialmente un post
   */
  patchPost(postId: number, partialData: Partial<Post>): Cypress.Chainable<Cypress.Response<Post>> {
    return cy.request<Post>({
      method: 'PATCH',
      url: `${this.baseUrl}/posts/${postId}`,
      body: partialData,
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
    })
  }

  /**
   * DELETE - Eliminar un post
   */
  deletePost(postId: number): Cypress.Chainable<Cypress.Response<{}>> {
    return cy.request<{}>({
      method: 'DELETE',
      url: `${this.baseUrl}/posts/${postId}`,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }

  /**
   * Método de utilidad para verificar la estructura de un post
   */
  verifyPostStructure(post: Post): void {
    expect(post).to.have.property('userId').that.is.a('number')
    expect(post).to.have.property('id').that.is.a('number')
    expect(post).to.have.property('title').that.is.a('string')
    expect(post).to.have.property('body').that.is.a('string')
  }

  /**
   * Método de utilidad para verificar la estructura de un comentario
   */
  verifyCommentStructure(comment: Comment): void {
    expect(comment).to.have.property('postId').that.is.a('number')
    expect(comment).to.have.property('id').that.is.a('number')
    expect(comment).to.have.property('name').that.is.a('string')
    expect(comment).to.have.property('email').that.is.a('string').that.includes('@')
    expect(comment).to.have.property('body').that.is.a('string')
  }
}

export default JsonPlaceholderApi
