import { Router } from 'express'
import { WithJoinRoutes } from './raw-query-with-join.route.js'
import { WithoutJoinRoutes } from './raw-query-without-join.route.js'

export class AppRouter {
  constructor() {
    this.router = Router()
    this.WithJoinRoutes = new WithJoinRoutes()
    this.WithoutJoinRoutes = new WithoutJoinRoutes()
    this.initializeRoutes()
  }

  initializeRoutes() {
    this.router.use('/join', this.WithJoinRoutes.getRouter())
    this.router.use('/without-join', this.WithoutJoinRoutes.getRouter())
  }

  getRouter() {
    return this.router
  }
}