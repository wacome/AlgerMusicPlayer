import { serveNcmApi } from 'netease-cloud-music-api-alger'

// 创建 API 服务
const ncmApi = serveNcmApi({ port: 9000 })

export function onRequest(context) {
    return ncmApi(context.request) 
}
