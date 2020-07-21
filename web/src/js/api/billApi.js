import request from "@/utils/request";

//     获取个人中心月度账单列表
export function getSummaryBills(params) {
  return request({
    url: `/api/cloud/osms/v1/personalCenter/bills`,
    method: "get",
    params
  });
}

//      获取个人中心账单信息
export function getSummaryBillDetails(id) {
  return request({
    url: `/api/cloud/osms/v1/personalCenter/bills/${id} `,
    method: "get"
  });
}
//     获取租户中心月度账单列表
export function getTenantSummaryBills(params) {
  return request({
    url: `/api/cloud/osms/v1/tenantCenter/bills`,
    method: "get",
    params
  });
}

//      获取租户中心账单信息
export function getTenantSummaryBillDetails(id) {
  return request({
    url: `/api/cloud/osms/v1/tenantCenter/bills/${id} `,
    method: "get"
  });
}
//     获取运营中心月度账单列表
export function getOperatingSummaryBills(params) {
  return request({
    url: `/api/cloud/osms/v1/operationsCenter/bills`,
    method: "get",
    params
  });
}

//      获取运营中心账单信息
export function getOperatingSummaryBillDetails(id) {
  return request({
    url: `/api/cloud/osms/v1/operationsCenter/bills/${id} `,
    method: "get"
  });
}
