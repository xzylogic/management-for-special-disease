import { Action } from '@ngrx/store';
import { NavState, Sidebar } from './navigation.state';
import { INIT_NAV, InitNavAction, UPDATE_TAG, UpdateTagAction } from './navigation.action';

export function NavReducer(state: NavState = {navigation: SIDEBARS}, action: Action): NavState {
  switch (action.type) {
    case INIT_NAV:
      return handleInitNavAction(state, <any>action);
    case UPDATE_TAG:
      return handleUpdateTagAction(state, <any>action);
    default:
      return state;
  }
}

function handleInitNavAction(state: NavState, action: InitNavAction): NavState {
  let nav = state.navigation;
  nav.forEach(obj => {
    obj.active = false;
    obj.open = false;
    if (obj.link.replace('/', '') === action.payload.path) {
      obj.active = true;
    }
    if (obj.subBars) {
      obj.subBars.forEach(subObj => {
        subObj.active = false;
        if (subObj.link.replace('/', '') === action.payload.path) {
          subObj.active = true;
          obj.open = true;
        }
      });
    }
  });
  return {navigation: nav};
}

function handleUpdateTagAction(state: NavState, action: UpdateTagAction): NavState {
  let nav = state.navigation;
  nav.map(sidebars => {
    if (sidebars.subBars) {
      sidebars.subBars.forEach(subObj => {
        if (subObj.key === action.payload.key && action.payload.tag != 0) {
          subObj.tag = action.payload.tag;
          if (sidebars.key === action.payload.group) {
            sidebars.tag = 1;
          }
        }
      });
    }
  });
  return {navigation: nav};
}

let SIDEBARS = [
  new Sidebar({
    key: 'statistics',
    title: '数据统计',
    ifSub: true,
    subBars: [
      new Sidebar({
        key: 'registerstatistics',
        title: '注册量统计',
        link: '/register-statistics'
      }),
      new Sidebar({
        key: 'activenessstatistics',
        title: '日活跃度统计',
        link: '/activeness-statistics'
      }),
      new Sidebar({
        key: 'periodstatistics',
        title: '活跃度统计',
        link: '/period-statistics'
      }),
      new Sidebar({
        key: 'businessstatistics',
        title: '业务数据统计',
        link: '/business-statistics'
      }),
      new Sidebar({
        key: 'downloadtatistics',
        title: '渠道来源统计',
        link: '/download-statistics'
      }),
      new Sidebar({
        key: 'fatherstatistics',
        title: '父亲节统计',
        link: '/father-statistics'
      })
    ]
  }),
  new Sidebar({
    key: 'doctorgroup',
    title: '医生管理',
    ifSub: true,
    tag: 0,
    subBars: [
      new Sidebar({
        key: 'doctor',
        title: '医生信息管理',
        link: '/doctor',
        tag: 0
      }),
      new Sidebar({
        key: 'doctorgroup',
        title: '医生小组管理',
        link: '/doctor-group',
        tag: 0
      }),
      new Sidebar({
        key: 'doctoraccount',
        title: '医生账户管理',
        link: '/doctor-account',
        tag: 0
      }),
      new Sidebar({
        key: 'relationship',
        title: '医患关联管理',
        link: '/relationship',
        tag: 0
      })
    ]
  }),
  new Sidebar({
    key: 'usergroup',
    title: '患者管理',
    ifSub: true,
    tag: 0,
    subBars: [
      new Sidebar({
        key: 'user',
        title: '患者信息管理',
        link: '/user'
      }),
      new Sidebar({
        key: 'userorder',
        title: '患者订单管理',
        link: '/user-order',
        tag: 0
      }),
      new Sidebar({
        key: 'usercertification',
        title: '实名认证管理',
        link: '/user-certification',
        tag: 0
      }),
      new Sidebar({
        key: 'healthdata',
        title: '患者体征数据管理',
        link: '/health-data',
        tag: 0
      })
    ]
  }),
  new Sidebar({
    key: 'integral',
    title: '积分管理',
    ifSub: true,
    tag: 0,
    subBars: [
      new Sidebar({
        key: 'integralDetail',
        title: '积分明细',
        link: '/integral-detail'
      }),
      new Sidebar({
        key: 'integralOrder',
        title: '积分商品订单管理',
        link: '/integral-order',
        tag: 0
      }),
      new Sidebar({
        key: 'integralCommodity',
        title: '积分商品维护',
        link: '/integral-commodity'
      })
    ]
  }),
  new Sidebar({
    key: 'healthnews',
    title: '健康资讯',
    link: '/health-news'
  }),
  new Sidebar({
    key: 'commodity',
    title: '商品维护',
    link: '/commodity'
  }),
  new Sidebar({
    key: 'servicegroup',
    title: '服务维护',
    ifSub: true,
    subBars: [
      new Sidebar({
        key: 'basicservice',
        title: '基础服务维护',
        link: '/basic-service'
      }),
      new Sidebar({
        key: 'healthservice',
        title: '第三方服务维护',
        link: '/health-service'
      }),
      new Sidebar({
        key: 'packageservice',
        title: '套餐包服务维护',
        link: '/package-service'
      }),
      new Sidebar({
        key: 'servicespec',
        title: '服务规格维护',
        link: '/service-spec'
      }),
    ]
  }),
  new Sidebar({
    key: 'basicgroup',
    title: '基础数据维护',
    ifSub: true,
    subBars: [
      new Sidebar({
        key: 'hospital',
        title: '医院数据维护',
        link: '/hospital'
      }),
      new Sidebar({
        key: 'departmant',
        title: '科室数据维护',
        link: '/department'
      }),
      new Sidebar({
        key: 'doctortitle',
        title: '职称数据维护',
        link: '/doctor-title'
      }),
      new Sidebar({
        key: 'doctorsort',
        title: '医生排序',
        link: '/doctor-sort'
      }),
      new Sidebar({
        key: 'newsclassify',
        title: '健康资讯分类数据维护',
        link: '/news-classify'
      }),
      new Sidebar({
        key: 'discomfortsymptom',
        title: '不适症状数据维护',
        link: '/discomfort-symptom'
      }),
      new Sidebar({
        key: 'followupplan',
        title: '随访计划模版数据维护',
        link: '/follow-up-plan'
      }),
      new Sidebar({
        key: 'flowergrade',
        title: '鲜花等级数据维护',
        link: '/flower-grade'
      }),
      new Sidebar({
        key: 'drug',
        title: '药品数据维护',
        link: '/drug'
      }),
      new Sidebar({
        key: 'healthorganization',
        title: '第三方机构数据维护',
        link: '/health-organization'
      }),
      new Sidebar({
        key: 'inspectioncategory',
        title: '检查类目维护',
        link: '/inspection-category'
      }),
      new Sidebar({
        key: 'inspectionitem',
        title: '检查子项目维护',
        link: '/inspection-item'
      }),
      new Sidebar({
        key: 'pushtime',
        title: '推送时间维护',
        link: '/push-time'
      }),
      new Sidebar({
        key: 'downloadorigin',
        title: '下载渠道维护',
        link: '/download-origin'
      })
    ]
  }),
  new Sidebar({
    key: 'datacollection',
    title: '病史资料录入',
    link: '/data-collection'
  }),
  new Sidebar({
    key: 'versioncontrol',
    title: '版本控制',
    link: '/version-control'
  }),
  new Sidebar({
    key: 'subscribe',
    title: '服务号管理',
    ifSub: true,
    subBars: [
      new Sidebar({
        key: 'assessmentrisk',
        title: '风险评估管理',
        link: '/assessment-risk'
      }),
      new Sidebar({
        key: 'familyaccount',
        title: '家庭账号维护',
        link: '/family-account'
      }),
      new Sidebar({
        key: 'lecture',
        title: '讲座管理',
        link: '/lecture'
      }),
      new Sidebar({
        key: 'custommenu',
        title: '自定义菜单',
        link: '/custom-menu'
      }),
      new Sidebar({
        key: 'autoreply',
        title: '自动回复维护',
        link: '/auto-reply'
      })
    ]
  }),
  new Sidebar({
    key: 'adsmanagement',
    title: '广告位管理',
    ifSub: true,
    subBars: [
      new Sidebar({
        key: 'ad-doctor',
        title: '广告位管理-医生端',
        link: '/ad-doctor'
      }),
      new Sidebar({
        key: 'ad-patient',
        title: '广告位管理-患者端',
        link: '/ad-patient'
      })
    ]
  }),
  new Sidebar({
    key: 'operationpush',
    title: '运营推送',
    link: '/operation-push'
  })
];
