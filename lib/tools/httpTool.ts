import { HttpService } from "@nestjs/axios";

const httpService = new HttpService();
const get = async function <T>(url: string, params: any): Promise<T> {
    const keys = Object.keys(params)
    url = url + '?'
    keys.forEach(key => {
        url = `${url}${key}=${params[key]}&`

    })
    return new Promise<T>(e => {
        httpService.get(url, {}).subscribe(res => {
            e(res.data as T)
        })
    })
}
export default {
    get
}