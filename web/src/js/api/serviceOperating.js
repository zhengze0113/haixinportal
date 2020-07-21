import request from '@/utils/request';

// ----------------  服务运营统计 Start   ------------------------------
// 服务运营统计
export function getServiceOperatingCount() {
  return request({
    url: '/api/cloud/osms/v1/summary',
    method: 'get'
  });
}

// ----------------  服务运营统计  End   ------------------------------

// ----------------  云服务API Start   ------------------------------

// 云服务列表
export function getCloudServiceList(params) {
  return request({
    url: '/api/cloud/osms/v1/services',
    method: 'get',
    params
  });
}

// 删除云服务
export function deletedCloudService(params) {
  return request({
    url: `/api/cloud/osms/v1/services/${params}`,
    method: 'delete'
  });
}
// 批量删除云服务
export function patchDeletedCloudServiceFun(data) {
  return request({
    url: '/api/cloud/osms/v1/services',
    method: 'batchDelete',
    data
  });
}

// 增加云服务
export function createdCloudService(data) {
  return request({
    url: `/api/cloud/osms/v1/services`,
    method: 'post',
    data
  });
}

// 修改云服务
export function editCloudServiceFun(params, data) {
  return request({
    url: `/api/cloud/osms/v1/services/${params}`,
    method: 'put',
    data
  });
}

// 通过id获取云服务信息
export function queryByIdCloudServiceFun(id) {
  return request({
    url: `/api/cloud/osms/v1/services/${id}`,
    method: 'get'
  });
}

// 通过id获取云服务下的sku
export function queryByIdCloudServiceSku(id) {
  return request({
    url: `/api/cloud/osms/v1/services/${id}/skus`,
    method: 'get'
  });
}

// 通过id获取云服务下的参数组
export function queryByIdCloudServiceParams(id) {
  return request({
    url: `/api/cloud/osms/v1/services/${id}/params`,
    method: 'get'
  });
}
// ----------------  云服务API End   ------------------------------

// ----------------  云服务目录API Start   ------------------------------

// 云服务目录列表
export function getcloudServiceCatalogList(params) {
  return request({
    url: '/api/cloud/osms/v1/catalogs',
    method: 'get',
    params
  });
}

// 创建云服务目录
export function createdcloudServiceCatalog(data) {
  return request({
    url: '/api/cloud/osms/v1/catalogs',
    method: 'post',
    data
  });
}

// 删除云服务目录
export function deletedcloudServiceCatalog(params) {
  return request({
    url: `/api/cloud/osms/v1/catalogs/${params}`,
    method: 'delete'
  });
}

// 获取服务目录信息
export function getServiceCatalogMessage(params) {
  return request({
    url: `/api/cloud/osms/v1/catalogs/${params}`,
    method: 'get'
  });
}

// 获取服务目录子目录信息
export function getServiceSubdirectoryMessage(params) {
  return request({
    url: `/api/cloud/osms/v1/catalogs/${params}/children`,
    method: 'get'
  });
}

// 编辑云服务目录信息
export function updatecloudServiceCatalog(id, data) {
  return request({
    url: `/api/cloud/osms/v1/catalogs/${id}`,
    method: 'put',
    data
  });
}
// ----------------  云服务目录API End   ------------------------------

// ----------------  容量定价API Start   ------------------------------

// 获取容量定价列表
export function getPricesList(params) {
  return request({
    url: '/api/cloud/osms/v1/prices',
    method: 'get',
    params
  });
}

// 更新容量定价
export function postPrices(params, data) {
  return request({
    url: `/api/cloud/osms/v1/prices/${params}`,
    method: 'put',
    data
  });
}
// 添加容量定价
export function createdPrices(data) {
  return request({
    url: '/api/cloud/osms/v1/prices',
    method: 'post',
    data
  });
}

// 单个删除容量定价
export function deletePrices(params) {
  return request({
    url: `/api/cloud/osms/v1/prices/${params}`,
    method: 'delete'
  });
}

// 批量删除容量定价
export function batchDeletePrices(data) {
  return request({
    url: `/api/cloud/osms/v1/prices/`,
    method: 'batchDelete',
    data
  });
}
// 获取容量定价信息
export function getonePrices(id) {
  return request({
    url: `/api/cloud/osms/v1/prices/${id}`,
    method: 'get'
  });
}

// ----------------  容量定价API End     ------------------------------

// ----------------  云资源API Start   -------------------------------
// 云资源列表
export function getResourcesList(params) {
  return request({
    url: '/api/cloud/osms/v1/resources',
    method: 'get',
    params
  });
}
// 添加云资源
export function createdCloudResource(data) {
  return request({
    url: '/api/cloud/osms/v1/resources',
    method: 'post',
    data
  });
}
// 删除云资源
export function deleteCloudResource(params) {
  return request({
    url: `/api/cloud/osms/v1/resources/${params}`,
    method: 'delete'
  });
}

// 删除云资源操作字典信息

export function deleteCloudResourceOperations(resourceId, id) {
  return request({
    url: `/api/cloud/osms/v1/resources/${resourceId}/operations/${id}`,
    method: 'delete'
  });
}

// 批量删除云资源
export function batchDeleteCloudResource(data) {
  return request({
    url: '/api/cloud/osms/v1/resources',
    method: 'batchDelete',
    data
  });
}

// 获取云资源信息
export function getCloudResourceInfo(id) {
  return request({
    url: `/api/cloud/osms/v1/resources/${id}`,
    method: 'get'
  });
}
// 编辑云资源
export function editCloudResourceInfo(id, data) {
  return request({
    url: `/api/cloud/osms/v1/resources/${id}`,
    method: 'put',
    data
  });
}
// 删除云资源中的操作数据字典
export function deleteCloudResourceDist(resourceId, distId) {
  return request({
    url: `/api/cloud/osms/v1/resources/${resourceId}/operations/${distId}`,
    method: 'delete'
  });
}
// ----------------  云资源API End     -------------------------------

// ----------------  云服务SKU API Start     -------------------------------

// 云服务SKU列表
export function getSKUList(params) {
  return request({
    url: '/api/cloud/osms/v1/skus',
    method: 'get',
    params
  });
}

// 删除sku
export function deleteSKU(params) {
  return request({
    url: `/api/cloud/osms/v1/skus/${params}`,
    method: 'delete'
  });
}

// 批量删除sku
export function batchDeletesku(data) {
  return request({
    url: '/api/cloud/osms/v1/skus',
    method: 'batchDelete',
    data
  });
}

// 创建云服务sku
export function createdSKU(data) {
  return request({
    url: '/api/cloud/osms/v1/skus',
    method: 'post',
    data
  });
}

// 获取单个sku信息
export function getResourcesSkuInfo(params) {
  return request({
    url: `/api/cloud/osms/v1/skus/${params}`,
    method: 'get'
  });
}
// 获取SKU规格信息
export function getskuspecs(skuid) {
  return request({
    url: `/api/cloud/osms/v1/skus/${skuid}/specs`,
    method: 'get'
  });
}

// 编辑sku规格信息
export function editskuspace(skuid, id, data) {
  return request({
    url: `/api/cloud/osms/v1/skus/${skuid}/specs/${id}`,
    method: 'put',
    data
  });
}

// 添加sku规格信息
export function addSKUspace(skuid, data) {
  return request({
    url: `/api/cloud/osms/v1/skus/${skuid}/specs`,
    method: 'post',
    data
  });
}

// 删除指定的sku的规格信息
export function deleteskuspace(sku, id) {
  return request({
    url: `/api/cloud/osms/v1/skus/${sku}/specs/${id}`,
    method: 'delete'
  });
}
// 编辑sku
export function editskuid(id, data) {
  return request({
    url: `/api/cloud/osms/v1/skus/${id}`,
    method: 'put',
    data
  });
}

// 修改sku状态
export function editskuState(id, data) {
  return request({
    url: `/api/cloud/osms/v1/skus/state/${id}`,
    method: 'put',
    data
  });
}
// 获取云服务规格关联的计价信息接口
export function getskuPrice(id) {
  return request({
    url: `/api/cloud/osms/v1/skus/${id}/price`,
    method: 'get'
  });
}

export function getProject() {
  return request({
    url: '/api/cloud/cmss/v1/pass/project?envId=1',
    method: 'get'
  });
}

// ----------------  资源SKU API End     -------------------------------

// ----------------  订阅管理 API Start     -------------------------------
// 获取服务订阅列表接口
export function getRss(params) {
  return request({
    url: '/api/cloud/osms/v1/rss',
    method: 'get',
    params
  });
}
// 新建服务订阅接口
export function addRss(data) {
  return request({
    url: '/api/cloud/osms/v1/rss',
    method: 'post',
    data
  });
}
// 删除服务订阅接口
export function deleteRss(id) {
  return request({
    url: `/api/cloud/osms/v1/rss/${id}`,
    method: 'delete'
  });
}
// 编辑服务订阅接口
export function editRss(id, data) {
  return request({
    url: `/api/cloud/osms/v1/rss/${id}`,
    method: 'put',
    data
  });
}
// 获取服务订阅详情
export function getRssInfo(id) {
  return request({
    url: `/api/cloud/osms/v1/rss/${id}`,
    method: 'get'
  });
}
// ----------------  订阅管理 API End     -------------------------------
// ----------------  参数组 API Start     -------------------------------
// 获取参数组列表接口
export function getParams(params) {
  return request({
    url: '/api/cloud/osms/v1/params',
    method: 'get',
    params
  });
}
// 新增参数组接口
export function addParams(data) {
  return request({
    url: '/api/cloud/osms/v1/params',
    method: 'post',
    data
  });
}
// 编辑参数组接口
export function editParams(id, data) {
  return request({
    url: `/api/cloud/osms/v1/params/${id}`,
    method: 'put',
    data
  });
}
// 删除参数组接口
export function deleteParams(params) {
  return request({
    url: `/api/cloud/osms/v1/params/${id}`,
    method: 'get',
    params
  });
}
// 获取参数组详情接口
export function getParamsInfo(id) {
  return request({
    url: `/api/cloud/osms/v1/params/${id}`,
    method: 'get'
  });
}
// 参数组发布接口
export function publishParams(id) {
  return request({
    url: `/api/cloud/osms/v1/params/publish/${id}`,
    method: 'put'
  });
}
// ----------------  参数组 API End     -------------------------------
