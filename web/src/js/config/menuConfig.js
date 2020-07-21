
import baseURL from "@/api/app.js";
export default [
  {
    menuTxt: "云服务",
    sort: 2,
    category: "cloudService",
    link: baseURL.portalPath+"/serviceCloud.html",
    children: []
  },
  {
    menuTxt: "云工作台",
    category: "work",
    sort: 3,
    children: [
      {
        menuTxt: "容器控制台",
        link: "/#/workbench"
      },
      {
        menuTxt: "DevOps",
        link: "/#/workbench/devops"
      },
      {
        menuTxt: "微服务",
        link: "/#/workbench/microservice"
      },
      {
        menuTxt: "中间件控制台",
        link: "/#/workbench/elasticearch"
      }
    ]
  },

  {
    menuTxt: "运营中心",
    category: "operatingCentre",
    link: "/#/operatingCentre/operationOverview",
    sort: 6
  },
  {
    menuTxt: "租户中心",
    category: "tenement",
    link: "/#/tenementCentre/statistics",
    sort: 7
  },
  {
    menuTxt: "个人中心",
    link: "/#/userCentre/userShoppingCart",
    category: "userCenter",
    sort: 8
  }
];
