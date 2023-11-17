import axios from 'axios'
import { SoccerApiService } from './soccerApiInterface'
import { Response } from '../types/types'

class SoccerApiServiceImpl implements SoccerApiService {

    private soccerApiUrl: string | undefined
    private axiosOptions = {
        headers: {
            ['X-Auth-Token']: process.env.TOKEN_SOCCER_API,
            ['Accept-Encoding']: '',
            ['Content-Type']: 'application/json',
        },
        decompress: true,
    }

    constructor() {
        this.soccerApiUrl = process.env.APP_PORT
    }

    async getCompetition(league: string): Promise<Response> {
        try {
            const url = `${this.soccerApiUrl}/competitions/${league}`
            const axiosRequest = await axios.get(url, this.axiosOptions)
            return { isResult: true, data: axiosRequest.data }
        } catch (error: any) {
            console.log(error.message)
            return { isResult: false, message: error.message }
        }
    }


    async getTeam(league: string): Promise<Response> {
        try {
            const url = `${this.soccerApiUrl}/competitions/${league}/teams`
            const axiosRequest = await axios.get(url, this.axiosOptions)
            return { isResult: true, data: axiosRequest.data }
        } catch (error: any) {
            console.log(error.message)
            return { isResult: false, message: error.message }
        }
    }
}

export default new SoccerApiServiceImpl()