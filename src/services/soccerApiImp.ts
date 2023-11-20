import axios from 'axios'
import { ISoccerApiService } from './soccerApi.Interface'
import { Response } from '../types/types'
import { ErrorMessages } from '../common/errors/errors'

class SoccerApiServiceImpl implements ISoccerApiService {
  async getCompetition(league: string): Promise<Response> {
    try {
      const url = `${process.env.URL_SOCCER_API}competitions/${league}`
      const axiosRequest = await axios.get(url, this.generateHeaders())
      if (axiosRequest.data.error) {
        throw new Error(ErrorMessages.CODE_NOT_EXISTS)
      } else {
        return { isResult: true, data: axiosRequest.data }
      }
    } catch (error: any) {
      console.log(error.message)
      throw new Error(ErrorMessages.CODE_NOT_EXISTS)
    }
  }

  async getTeam(league: string): Promise<Response> {
    try {
      const url = `${process.env.URL_SOCCER_API}competitions/${league}/teams`
      const axiosRequest = await axios.get(url, this.generateHeaders())
      return { isResult: true, data: axiosRequest.data }
    } catch (error: any) {
      console.log(error.message)
      return { isResult: false, message: error.message }
    }
  }

  private generateHeaders() {
    const axiosOptions = {
      headers: {
        ['X-Auth-Token']: process.env.TOKEN_SOCCER_API,
        ['Accept-Encoding']: '',
        ['Content-Type']: 'application/json',
      },
      decompress: true,
    }
    return axiosOptions
  }
}

export default new SoccerApiServiceImpl()
