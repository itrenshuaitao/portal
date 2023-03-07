import request from '@/utils/request'
// 首页banner
export const getHomeBanner = data =>{
    return request({
        url: '/website-rest/sbanner',
        method: 'get',
        params: data
    })
}
// 首页产品概览
export const getHomeProductsList = () =>{
    return request({
        url: '/website-rest/ProductsList',
        method: 'get',
    })
}
// 首页核心数据
export const getHomeCoreDataList = (data) =>{
    return request({
        url: '/website-rest/queryCoreData',
        method: 'get',
        params: data
    })
}
// 首页新闻
export const getHomeNewsList = () =>{
    return request({
        url: '/website-rest/NewsList',
        method: 'get',
    })
}
// 首页合作伙伴
export const getHomePartnerList = (params) =>{
    return request({
        url: '/website-rest/queryPartner',
        method: 'get',
        params
    })
}
// 产品列表
export const queryProductsList = (params) =>{
    return request({
        url: '/website-rest/queryProductsList',
        method: 'get',
        params
    })
}
// 产品案例
export const queryCasesList = () =>{
    return request({
        url: '/website-rest/CasesList',
        method: 'get',
    })
}
// 解决方案列表
export const queryIndustryList = (params) =>{
    return request({
        url: '/website-rest/queryIndustryList',
        method: 'get',
        params
    })
}
