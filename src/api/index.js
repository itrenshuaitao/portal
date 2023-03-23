import request from '@/utils/request'
// 首页banner
export const getHomeBanner = data => {
    return request({
        url: '/website-rest/sbanner',
        method: 'get',
        params: data
    })
}
// 内页banner
export const getBanner = data => {
    return request({
        url: '/website-rest/nbanner',
        method: 'get',
        params: data
    })
}
// 首页产品概览
export const getHomeProductsList = params => {
    return request({
        url: '/website-rest/ProductsList',
        method: 'get',
        params
    })
}
// 首页核心数据
export const getHomeCoreDataList = (data) => {
    return request({
        url: '/website-rest/queryCoreData',
        method: 'get',
        params: data
    })
}
// 首页新闻
export const getHomeNewsList = params => {
    return request({
        url: '/website-rest/NewsList',
        method: 'get',
        params
    })
}
// 首页合作伙伴
export const getHomePartnerList = (params) => {
    return request({
        url: '/website-rest/queryPartner',
        method: 'get',
        params
    })
}
// 预约体验转发
export const bookingSendmail = data => {
    return request({
        url: '/website-rest/sendmail',
        method: 'post',
        data
    })
}
// 产品列表
export const queryProductsList = (params) => {
    return request({
        url: '/website-rest/queryProductsList',
        method: 'get',
        params
    })
}
// 产品详情
export const queryProductsById = (params) => {
    return request({
        url: '/website-rest/findproductsById',
        method: 'get',
        params
    })
}
// 产品案例
export const queryCasesList = params => {
    return request({
        url: '/website-rest/CasesList',
        method: 'get',
        params
    })
}
// 解决方案列表
export const queryIndustryList = (params) => {
    return request({
        url: '/website-rest/queryIndustryList',
        method: 'get',
        params
    })
}
// 解决方案案例
export const queryIndustryCaseList = (params) => {
    return request({
        url: '/website-rest/industryList',
        method: 'get',
        params
    })
}
//全部案例列表
export const queryCaseList = (params) => {
    return request({
        url: '/website-rest/queryCaseList',
        method: 'get',
        params
    })
}
//案例详情
export const queryCaseById = (params) => {
    return request({
        url: '/website-rest/findCaseById',
        method: 'get',
        params
    })
}
//新闻列表
export const queryNewsList = (params) => {
    return request({
        url: '/website-rest/queryNewsList',
        method: 'get',
        params
    })
}
//新闻详情
export const queryNewsById = (params) => {
    return request({
        url: '/website-rest/findNewsById',
        method: 'get',
        params
    })
}
//非置顶视频列表
export const queryVideoList = (params) => {
    return request({
        url: '/website-rest/querytopList',
        method: 'get',
        params
    })
}
//置顶视频列表
export const queryTopVideoList = () => {
    return request({
        url: '/website-rest/findVideoTop',
        method: 'get',
    })
}

//公司介绍-栏目是否展示
export const queryCompanylist = () => {
    return request({
        url: '/website-rest/companylist',
        method: 'get',
        params: { pageIndex: 1, pageSize: 10 }
    })
}
//公司介绍-企业介绍
export const queryFindfirmById = () => {
    return request({
        url: '/website-rest/firmList',
        method: 'get',
    })
}
//公司介绍-核心数据
export const queryFindcoredataById = () => {
    return request({
        url: '/website-rest/coredataList',
        method: 'get',
    })
}
//公司介绍-企业文化
export const queryFindCultureById = () => {
    return request({
        url: '/website-rest/CultureList',
        method: 'get',
    })
}
// 公司介绍-发展历程
export const queryFindhistoryById = () => {
    return request({
        url: '/website-rest/findhistoryVoList',
        method: 'get',
        params: { companyId: 4 }
    })
}
// 公司介绍-发展历程背景图片
// export const queryFindhistoryBg = params => {
//     return request({
//         url: '/website-rest/queryhistoryImgList',
//         method: 'get',
//         params
//     })
// }
// 公司介绍-服务网络
export const queryNnetworkLists = () => {
    return request({
        url: '/website-rest/networkLists',
        method: 'get',
    })
}
// 公司介绍-荣誉证书
export const queryFindCertById = () => {
    return request({
        url: '/website-rest/findCertById',
        method: 'get',
        params: { companyId: 6 }
    })
}
// 人才招聘-图片
export const queryRecruitimgList = () => {
    return request({
        url: '/website-rest/queryimgList',
        method: 'get',
    })
}
// 人才招聘-岗位列表
export const queryJobList = params => {
    return request({
        url: '/website-rest/queryjobList',
        method: 'get',
        params
    })
}
// 人才招聘-简历提交
export const subResume = data => {
    return request({
        url: '/website-rest/sendmailhtml',
        method: 'post',
        data
    })
}
// 联系我们-图片
export const queryContactImg = () => {
    return request({
        url: '/website-rest/findUsById',
        method: 'get',
        params:{
            contactId:1
        }
    })
}
// 联系我们-地图
export const queryContactMap = () => {
    return request({
        url: '/website-rest/maplists',
        method: 'get',
    })
}