import JsonPlaceholderApi from '../../support/JsonPlaceholderApi'
import { Post, Comment, CreatePostRequest } from '../../support/api-types'

describe('API REST - Pruebas de Integración', (): void => {
  const api: JsonPlaceholderApi = new JsonPlaceholderApi()

      it('Flujo completo de blog: Crear post', (): void => {
      // 1. Crear un nuevo post
      const newPost: CreatePostRequest = {
        title: 'Mi primera experiencia con la herramienta Cypress',
        body: 'Cypress es una buena herramienta para testing E2E y API',
        userId: 1,
      }

      api.createPost(newPost).then((createResponse) => {
        expect(createResponse.status).to.equal(201)
        const createdPost: Post = createResponse.body
        const postId: number = createdPost.id

        cy.log(`Post creado con ID: ${postId}`)

      })
    })
})