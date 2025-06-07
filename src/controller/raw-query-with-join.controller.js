import { WithJoinService } from '../service/raw-query-with-join.service.js'

export class WithJoinController {
  constructor() {
    this.withJoinService = new WithJoinService()
  }

  getAuthorsWithBooks = async (req, res) => {
    const { time, queryCount, data } = await this.withJoinService.getAuthorsWithBooks()
    res.status(200).json({
      message: 'Get Authors with Books with Join',
      time: `${time} ms`,
      query_count: queryCount,
      data,
    })
  }

  getAuthorsWithBooksAndReviews = async (req, res) => {
    const { time, queryCount, data } = await this.withJoinService.getAuthorsWithBooksAndReviews()
    res.status(200).json({
      message: 'Get Authors with Books and Reviews with Join',
      time: `${time} ms`,
      query_count: queryCount,
      data,
    })
  }

  getAuthorsWithBooksReviewsAndComments = async (req, res) => {
    const { time, queryCount, data } = await this.withJoinService.getAuthorsWithBooksReviewsAndComments()
    res.status(200).json({
      message: 'Get Authors with Books, Reviews and Comments with Join',
      time: `${time} ms`,
      query_count: queryCount,
      data,
    })
  }
}