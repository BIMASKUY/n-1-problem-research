import { Router } from 'express'
import { WithJoinController } from '../controller/raw-query-with-join.controller.js'

export class WithJoinRoutes {
  constructor() {
    this.router = Router()
    this.withJoinController = new WithJoinController()
    this.initializeRoutes()
  }

  initializeRoutes() {
    this.router.get('/authors-with-books', this.withJoinController.getAuthorsWithBooks)
    this.router.get('/authors-with-books-and-reviews', this.withJoinController.getAuthorsWithBooksAndReviews)
    this.router.get('/authors-with-books-reviews-and-comments', this.withJoinController.getAuthorsWithBooksReviewsAndComments)
  } 

  getRouter() {
    return this.router
  }
}