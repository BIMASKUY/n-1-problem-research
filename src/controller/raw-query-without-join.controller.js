import { WithoutJoinService } from '../service/raw-query-without-join.service.js'

export class WithoutJoinController {
  constructor() {
    this.withoutJoinService = new WithoutJoinService()
  }

  getAuthorsWithBooks = async (req, res) => {
    const { time, queryCount, data } = await this.withoutJoinService.getAuthorsWithBooks()
    res.status(200).json({
      message: 'Get Authors with Books without Join',
      time: `${time} ms`,
      query_count: queryCount,
      data,
    })
  }

  getAuthorsWithBooksAndReviews = async (req, res) => {
    const { time, queryCount, data } = await this.withoutJoinService.getAuthorsWithBooksAndReviews()
    res.status(200).json({
      message: 'Get Authors with Books and Reviews without Join',
      time: `${time} ms`,
      query_count: queryCount,
      data,
    })
  }

  getAuthorsWithBooksReviewsAndComments = async (req, res) => {
    const { time, queryCount, data } = await this.withoutJoinService.getAuthorsWithBooksReviewsAndComments()
    res.status(200).json({
      message: 'Get Authors with Books, Reviews and Comments without Join',
      time: `${time} ms`,
      query_count: queryCount,
      data,
    })
  }
}