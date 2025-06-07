import { Router } from 'express'
import { WithoutJoinController } from '../controller/raw-query-without-join.controller.js'

export class WithoutJoinRoutes {
  constructor() {
    this.router = Router()
    this.withoutJoinController = new WithoutJoinController()
    this.initializeRoutes()
  }

  initializeRoutes() {
    this.router.get('/authors-with-books', this.withoutJoinController.getAuthorsWithBooks)
    this.router.get('/authors-with-books-and-reviews', this.withoutJoinController.getAuthorsWithBooksAndReviews)
    this.router.get('/authors-with-books-reviews-and-comments', this.withoutJoinController.getAuthorsWithBooksReviewsAndComments)
  }

  getRouter() {
    return this.router
  }
}