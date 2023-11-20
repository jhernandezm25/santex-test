import axios from 'axios'
import { ISoccerApiService } from './soccerApi.Interface'
import { Response } from '../types/types'

class SoccerApiServiceImpl implements ISoccerApiService {
  async getCompetition(league: string): Promise<Response> {
    try {
      const url = `${process.env.URL_SOCCER_API}competitions/${league}`
      const axiosRequest = await axios.get(url, this.generateHeaders())
      return { isResult: true, data: axiosRequest.data }
    } catch (error: any) {
      console.log(error.message)
      return { isResult: false, message: error.message }
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
