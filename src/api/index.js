import request from '@/utils/request'
// 首页banner
export const getHomeBanner = data =>{
    return request({
        url: '/website-rest/sbanner',
        method: 'get',
        params: data
    })
}
// 内页banner
export const getBanner = data =>{
    return request({
        url: '/website-rest/nbanner',
        method: 'get',
        params: data
    })
}
// 首页产品概览
export const getHomeProductsList = params =>{
    return request({
        url: '/website-rest/ProductsList',
        method: 'get',
        params
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
export const getHomeNewsList = params =>{
    return request({
        url: '/website-rest/NewsList',
        method: 'get',
        params
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
// 产品详情
export const queryProductsById = (params) =>{
    return request({
        url: '/website-rest/findproductsById',
        method: 'get',
        params
    })
}
// 产品案例
export const queryCasesList = params =>{
    return request({
        url: '/website-rest/CasesList',
        method: 'get',
        params
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
// 解决方案案例
export const queryIndustryCaseList = (params) =>{
    return request({
        url: '/website-rest/industryList',
        method: 'get',
        params
    })
}
//全部案例列表
export const queryCaseList = (params) =>{
    return request({
        url: '/website-rest/queryCaseList',
        method: 'get',
        params
    })
}
//案例详情
export const queryCaseById = (params) =>{
    return request({
        url: '/website-rest/findCaseById',
        method: 'get',
        params
    })
}
//新闻列表
export const queryNewsList = (params) =>{
    return request({
        url: '/website-rest/queryNewsList',
        method: 'get',
        params
    })
}
//新闻详情
export const queryNewsById = (params) =>{
    return request({
        url: '/website-rest/findNewsById',
        method: 'get',
        params
    })
}
//视频列表
export const queryVideoList = (params) =>{
    return request({
        url: '/website-rest/queryVideoList',
        method: 'get',
        params
    })
}
//置顶视频列表
export const queryTopVideoList = () =>{
    return request({
        url: '/website-rest/findVideoTop',
        method: 'get',
    })
}