import request from "@/utils/request";




// 服务目录
export function getServicecatalogs(params) {
    return request({
        url: '/cms/servicecatalogs',
        method: 'get',
        params
    });
}
// 获取云产品详情
export function getProductMessage(params) {
    return request({
        url: `/cms/cloudproducts/${params}`,
        method: "get",
    });
}

// 根据服务目录获取云产品列表
export function getcloudproduct(params) {
    return request({
        url: `/cms/content-manager/explorer/cloudproduct`,
        method: "get",
        params
    });
}
// 查询云服务目录
export function Servicecatalog(params) {
    return request({
        url: `/cms/servicecatalogs`,
        method: "get",
        params: { parentId: 0, _sort: "sort:asc" }
    });
}

// 新建云服务目录信息
export function addServicecatalog(data) {
    return request({
        url: "/cms/servicecatalogs",
        method: "post",
        data
    });
}
// 删除云服务目录信息
export function deleteServicecatalog(params) {
    return request({
        url: `/cms/servicecatalogs/${params}`,
        method: "delete"
    });
}
// 编辑云服务目录信息
export function updateServicecatalog(id, data) {
    return request({
        url: `/cms/servicecatalogs/${id}`,
        method: "put",
        data
    });
}

// 查询云产品
export function cloudproduct(params) {
    return request({
        url: `/cms/cloudproducts`,
        method: "get",
        params
    });
}
// 编辑云产品
export function updatecloudproduct(id, data) {
    return request({
        url: `/cms/cloudproducts/${id}`,
        method: "put",
        data
    });
}

// 新建云产品
export function addaloudproduct(data) {
    return request({
        url: `/cms/cloudproducts`,
        method: "post",
        data
    });
}
// 获取云产品数量
export function getcloudproductcount() {
    return request({
        url: `/cms/cloudproducts/count`,
        method: "get"
    });
}
// 获取云产品详情
export function getcloudproductInfo(id) {
    return request({
        url: `/cms/cloudproducts/${id}`,
        method: "get"
    });
}
// 修改云产品详情
export function editcloudproductInfo(id, data) {
    return request({
        url: `/cms/cloudproducts/${id}`,
        method: "put",
        data
    });
}

// 添加云产品
export function addcloudproduct(data) {
    return request({
        url: `/cms/content-manager/explorer/cloudproduct`,
        method: "post",
        data
    });
}

// 修改图片云产品
export function editcloudproductimg(id, data) {
    return request({
        url: `/cms/content-manager/explorer/cloudproduct/${id}`,
        method: "put",
        data
    });
}

// 删除云产品
export function deletecloudproduct(id) {
    return request({
        url: `/cms/cloudproducts/${id}`,
        method: "delete"
    });
}

// 查询文档类型
export function selectdocumenttypes() {
    return request({
        url: `/cms/documenttypes`,
        method: "get"
    });
}

// 增加文章
export function addDocument(data) {
    return request({
        url: `/cms/documents`,
        method: "post",
        data
    });
}
// 获取文章列表
export function getDocument(params) {
    return request({
        url: `/cms/documents`,
        method: "get",
        params
    });
}
// 获取文章数量
export function getDocumentCount(params) {
    return request({
        url: `/cms/documents/count`,
        method: "get",
        params
    });
}
// 删除文章
export function deleteDocument(id) {
    return request({
        url: `/cms/documents/${id}`,
        method: "delete"
    });
}

// 修改文章
export function editDocument(id, data) {
    return request({
        url: `/cms/documents/${id}`,
        method: "put",
        data
    });
}

// 查询单条文档
export function getDocumentOne(params) {
    return request({
        url: `/cms//documents/${params}`,
        method: "get"
    });
}

// 获取活动列表
export function getActive(params) {
    return request({
        url: `/cms//activitycenters`,
        method: "get",
        params
    });
}
// 获取活动数量
export function getActiveCount(params) {
    return request({
        url: `/cms/activitycenters/count`,
        method: "get",
        params
    });
}

// 增加活动
export function addActive(data) {
    return request({
        url: `/cms/content-manager/explorer/activitycenter`,
        method: "post",
        data
    });
}

// 删除活动
export function delActive(params) {
    return request({
        url: `/cms/activitycenters/${params}`,
        method: "delete"
    });
}
// 编辑活动
export function editActive(params, data) {
    return request({
        url: `/cms/content-manager/explorer/activitycenter/${params}`,
        method: "put",
        data
    });
}

// 查询应用案例
export function selectapplication() {
    return request({
        url: `/cms/applications`,
        method: "get"
    });
}

// 获取应用案例列表
export function getApplication(params) {
    return request({
        url: `/cms/applications`,
        method: "get",
        params
    });
}

// 增加应用案例
export function addsApplication(data) {
    return request({
        url: `/cms/content-manager/explorer/application`,
        method: "post",
        data
    });
}
// 修改应用案例
export function editApplication(id, data) {
    return request({
        url: `/cms/content-manager/explorer/application/${id}`,
        method: "put",
        data
    });
}
// 删除应用案例
export function deleteApplication(id) {
    return request({
        url: `/cms/applications/${id}`,
        method: "delete"
    });
}

// 获取应用案例数量
export function getapplicationcount(params) {
    return request({
        url: `/cms/applications/count`,
        method: "get",
        params
    });
}

// 获取新闻列表
export function getNews(params) {
    return request({
        url: `/cms/journalisms`,
        method: "get",
        params
    });
}
// 获取新闻数量
export function getNewsCount(params) {
    return request({
        url: `/cms/journalisms/count`,
        method: "get",
        params
    });
}

// 增加新闻
export function addNews(data) {
    return request({
        url: `/cms/content-manager/explorer/journalism`,
        method: "post",
        data
    });
}

// 删除新闻
export function delNews(params) {
    return request({
        url: `/cms/journalisms/${params}`,
        method: "delete"
    });
}
// 编辑新闻
export function editNews(params, data) {
    return request({
        url: `/cms/content-manager/explorer/journalism/${params}`,
        method: "put",
        data
    });
}

// 获取轮播图列表
export function getRecommendationarrays(params) {
    return request({
        url: `/cms/recommendationarrays`,
        method: "get",
        params
    });
}
// 获取轮播图数量
export function getRecommendationarraysCount(params) {
    return request({
        url: `/cms/recommendationarrays/count`,
        method: "get",
        params
    });
}

// 获取轮播图类型列表
export function getrecommendations(params) {
    return request({
        url: `/cms/recommendations`,
        method: "get",
        params
    });
}

// 获取轮播图类型
export function getrecommendationsType(params) {
    return request({
        url: `/cms/recommendations/${params}`,
        method: "get"
    });
}

// 增加轮播图
export function addRecommendationarrays(data) {
    return request({
        url: `/cms/content-manager/explorer/recommendationarray`,
        method: "post",
        data
    });
}

// 删除轮播图
export function delRecommendationarrays(params) {
    return request({
        url: `/cms/recommendationarrays/${params}`,
        method: "delete"
    });
}
// 编辑轮播图
export function editRecommendationarrays(params, data) {
    return request({
        url: `/cms/content-manager/explorer/recommendationarray/${params}`,
        method: "put",
        data
    });
}
// --------------------帮助中心------------
// 帮助中心列表
export function getHelptitles() {
    return request({
        url: "/cms/helptitles",
        method: "get"
    });
}
// 新建帮助中心目录
export function addHelptitles(data) {
    return request({
        url: "/cms/content-manager/explorer/helptitle/?source=content-manager",
        method: "POST",
        data
    });
}
// 编辑帮助中心目录/helps/:_id
export function editHelptitles(params, data) {
    return request({
        url: `/cms/content-manager/explorer/helptitle/${params}?source=content-manager`,
        method: "PUT",
        data
    });
}
// 删除帮助中心目录
export function deleteHelptitles(params) {
    return request({
        url: `/cms/content-manager/explorer/helptitle/${params}?source=content-manager`,
        method: "delete"
    });
}
// 删除帮助中心第二层目录
export function deleteHelptype(params) {
    return request({
        url: `/cms/content-manager/explorer/helptype/${params}?source=content-manager`,
        method: "delete"
    });
}
// 查询帮助中心第二层目录
export function getHelptitlesSecondFloor(params) {
    return request({
        url: `/cms/content-manager/explorer/helptitle/${params}?source=content-manager`,
        method: "get"
    });
}
// 查询帮助中心第三层目录
export function getHelptitlesThreeLayers(params) {
    return request({
        url: `/cms/content-manager/explorer/helptype/${params}?source=content-manager`,
        method: "get"
    });
}
// 查询帮助中心第三层目录下具体详情
export function getHelptitlesThreeLayersParticulars(params) {
    return request({
        url: `/cms/content-manager/explorer/helparticle/${params}?source=content-manager`,
        method: "get"
    });
}
// 修改帮助中心第三层目录下具体详情
export function updateHelptitlesThreeLayersParticulars(params, data) {
    return request({
        url: `/cms/content-manager/explorer/helparticle/${params}?source=content-manager`,
        method: "put",
        data
    });
}
// 删除帮助中心第三层目录下具体详情
export function dateleHelptitlesThreeLayersParticulars(params) {
    return request({
        url: `/cms/content-manager/explorer/helparticle/${params}?source=content-manager`,
        method: "delete"
    });
}
// 修改帮助中心第二层目录
export function updateHelptyes(params, data) {
    return request({
        url: `/cms/helptypes/${params}`,
        method: "put",
        data
    });
}
// 新增帮助中心第二层目录
export function creatHelptyes(data) {
    return request({
        url: `/cms/content-manager/explorer/helptype/?source=content-manager`,
        method: "post",
        data
    });
}
// 新增帮助中心第三层目录
export function createHelparticle(data) {
    return request({
        url: `/cms/content-manager/explorer/helparticle/?source=content-manager`,
        method: "post",
        data
    });
}
// 新增帮助中心第三层目录详情内容
export function createHelpcontent(data) {
    return request({
        url: `/cms/content-manager/explorer/helpcontent/?source=content-manager`,
        method: "post",
        data
    });
}
// 修改帮助中心第三层目录详情内容
export function updateHelpcontent(params, data) {
    return request({
        url: `/cms/content-manager/explorer/helpcontent/${params}?source=content-manager`,
        method: "put",
        data
    });
}
// 上传图片
export function addUploadImg(data) {
    return request({
        url: "/cms/upload",
        method: "post",
        data
    });
}
// 上传图片
export function deleteUploadImg(data) {
    return request({
        url: `/cms/upload/files/${id}`,
        method: "delete"
    });
}