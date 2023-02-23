import request from '@/utils/request'
// get请求
export function apiGet (data) {
  return request({
    url: data.url,
    method: 'GET',
    headers: {
      'Content-Type': !data.type ? 'application/json' : 'application/x-www-form-urlencoded'
    },
    params: data.data ? data.data : null
  })
}

// post请求
export function apiPost (data) {
  return request({
    url: data.url,
    method: 'POST',
    headers: {
      'Content-Type': !data.type ? 'application/json' : 'application/x-www-form-urlencoded'
    },
    data: data.data ? data.data : null
  })
}
