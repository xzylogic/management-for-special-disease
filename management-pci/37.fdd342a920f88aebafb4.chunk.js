webpackJsonp([37],{"3zrr":function(n,l,e){"use strict";var t=e("/oeL"),i=e("XBt6");e.d(l,"a",function(){return a});var o={downloadOrigin:"api/operational/channel"},a=function(){function n(n,l){this.app=n,this.httpService=l}return n.prototype.downloadOriginConfig=function(){return new i.m({title:"基础数据维护",subTitle:"渠道来源维护",ifHome:!0,homeRouter:"/download-origin",currentRouter:"/download-origin"})},n.prototype.getDownloadOrigin=function(){return this.httpService.get(""+this.app.pci.BASE_URL+o.downloadOrigin)},n.prototype.downloadOriginCreate=function(n){return this.httpService.post(""+this.app.pci.BASE_URL+o.downloadOrigin,n)},n.prototype.downloadOriginUpdate=function(n,l){return this.httpService.put(""+this.app.pci.BASE_URL+o.downloadOrigin+"/"+n,l)},n.prototype.downloadOriginDel=function(n){return this.httpService.del(""+this.app.pci.BASE_URL+o.downloadOrigin+"/"+n)},n.ctorParameters=function(){return[{type:void 0,decorators:[{type:t.Inject,args:["app"]}]},{type:void 0,decorators:[{type:t.Inject,args:["http"]}]}]},n}()},"BH+U":function(n,l,e){"use strict";function t(n){return u["ɵvid"](0,[(n()(),u["ɵeld"](0,null,null,1,"div",[],null,null,null,null,null)),(n()(),u["ɵted"](null,["Loading..."]))],null,null)}function i(n){return u["ɵvid"](0,[(n()(),u["ɵeld"](0,null,null,1,"div",[["class","center"]],null,null,null,null,null)),(n()(),u["ɵted"](null,["\n          ","\n        "]))],null,function(n,l){n(l,1,0,l.component.downloadOriginTable.errorMessage)})}function o(n){return u["ɵvid"](0,[(n()(),u["ɵeld"](0,null,null,7,"div",[],null,null,null,null,null)),(n()(),u["ɵted"](null,["\n          "])),(n()(),u["ɵeld"](0,null,null,4,"div",[["class","content__table"]],null,null,null,null,null)),(n()(),u["ɵted"](null,["\n            "])),(n()(),u["ɵeld"](0,null,null,1,"app-lib-table",[],null,[[null,"handleEmmit"]],function(n,l,e){var t=!0,i=n.component;if("handleEmmit"===l){t=!1!==i.gotoHandle(e)&&t}return t},c.a,c.b)),u["ɵdid"](114688,null,0,s.a,[],{table:[0,"table"]},{handleEmmit:"handleEmmit"}),(n()(),u["ɵted"](null,["\n          "])),(n()(),u["ɵted"](null,["\n        "]))],function(n,l){n(l,5,0,l.component.downloadOriginTable)},null)}function a(n){return u["ɵvid"](0,[(n()(),u["ɵeld"](0,null,null,35,"app-container",[],null,null,null,p.a,p.b)),u["ɵdid"](114688,null,0,g.b,[],{config:[0,"config"]},null),(n()(),u["ɵted"](null,["\n  "])),(n()(),u["ɵeld"](0,null,0,7,"div",[["class","addition"]],null,null,null,null,null)),(n()(),u["ɵted"](null,["\n    "])),(n()(),u["ɵeld"](0,null,null,4,"button",[["class","mat-raised-button"],["md-raised-button",""]],[[8,"disabled",0]],[[null,"click"]],function(n,l,e){var t=!0,i=n.component;if("click"===l){t=!1!==i.newData()&&t}return t},f.c,f.d)),u["ɵdid"](16384,null,0,m.K,[[2,m.L],u.ElementRef],null,null),u["ɵdid"](180224,null,0,m._27,[u.Renderer2,u.ElementRef,v.c,m.f],null,null),u["ɵdid"](16384,null,0,m._94,[],null,null),(n()(),u["ɵted"](0,["新增渠道"])),(n()(),u["ɵted"](null,["\n  "])),(n()(),u["ɵted"](null,["\n  "])),(n()(),u["ɵeld"](0,null,1,22,"div",[["class","content"]],null,null,null,null,null)),(n()(),u["ɵted"](null,["\n    "])),(n()(),u["ɵeld"](0,null,null,19,"md-tab-group",[["class","mat-tab-group"],["dynamicHeight","true"]],[[2,"mat-tab-group-dynamic-height",null],[2,"mat-tab-group-inverted-header",null]],null,null,f.i,f.j)),u["ɵdid"](10534912,null,1,m._88,[u.Renderer2],{dynamicHeight:[0,"dynamicHeight"]},null),u["ɵqud"](603979776,1,{_tabs:1}),u["ɵdid"](16384,null,0,m.K,[[2,m.L],u.ElementRef],null,null),(n()(),u["ɵted"](null,["\n      "])),(n()(),u["ɵeld"](16777216,null,null,13,"md-tab",[["label","渠道来源列表"]],null,null,null,f.k,f.l)),u["ɵdid"](114688,[[1,4]],1,m._89,[u.ViewContainerRef],{textLabel:[0,"textLabel"]},null),u["ɵqud"](335544320,2,{templateLabel:0}),u["ɵdid"](16384,null,0,m.K,[[2,m.L],u.ElementRef],null,null),(n()(),u["ɵted"](0,["\n        "])),(n()(),u["ɵand"](16777216,null,0,1,null,t)),u["ɵdid"](16384,null,0,w.m,[u.ViewContainerRef,u.TemplateRef],{ngIf:[0,"ngIf"]},null),(n()(),u["ɵted"](0,["\n        "])),(n()(),u["ɵand"](16777216,null,0,1,null,i)),u["ɵdid"](16384,null,0,w.m,[u.ViewContainerRef,u.TemplateRef],{ngIf:[0,"ngIf"]},null),(n()(),u["ɵted"](0,["\n        "])),(n()(),u["ɵand"](16777216,null,0,1,null,o)),u["ɵdid"](16384,null,0,w.m,[u.ViewContainerRef,u.TemplateRef],{ngIf:[0,"ngIf"]},null),(n()(),u["ɵted"](0,["\n      "])),(n()(),u["ɵted"](null,["\n    "])),(n()(),u["ɵted"](null,["\n  "])),(n()(),u["ɵted"](null,["\n"]))],function(n,l){var e=l.component;n(l,1,0,e.containerConfig);n(l,15,0,"true");n(l,20,0,"渠道来源列表"),n(l,25,0,!e.downloadOriginTable.lists&&e.downloadOriginTable.loading),n(l,28,0,!e.downloadOriginTable.lists&&!e.downloadOriginTable.loading&&!!e.downloadOriginTable.errorMessage),n(l,31,0,e.downloadOriginTable.lists)},function(n,l){n(l,5,0,u["ɵnov"](l,7).disabled||null),n(l,14,0,u["ɵnov"](l,15).dynamicHeight,"below"===u["ɵnov"](l,15).headerPosition)})}function r(n){return u["ɵvid"](0,[(n()(),u["ɵand"](16777216,null,null,1,null,a)),u["ɵdid"](16384,null,0,w.m,[u.ViewContainerRef,u.TemplateRef],{ngIf:[0,"ngIf"]},null),(n()(),u["ɵted"](null,["\n"]))],function(n,l){n(l,1,0,l.component.containerConfig)},null)}function d(n){return u["ɵvid"](0,[(n()(),u["ɵeld"](0,null,null,1,"app-download-origin",[],null,null,null,r,k)),u["ɵdid"](114688,null,0,b.a,["action",h.a,y.a,m.H],null,null)],function(n,l){n(l,1,0)},null)}var u=e("/oeL"),c=e("qhUV"),s=e("fAnl"),p=e("tPRk"),g=e("rFxa"),f=e("v6Q/"),m=e("Z04r"),v=e("p4Sk"),w=e("qbdv"),b=e("GGL6"),h=e("3zrr"),y=e("x7qE");e.d(l,"a",function(){return T});var O=[],k=u["ɵcrt"]({encapsulation:2,styles:O,data:{}}),T=u["ɵccf"]("app-download-origin",b.a,d,{},{},[])},GGL6:function(n,l,e){"use strict";var t=e("/oeL"),i=e("Z04r"),o=e("3zrr"),a=e("x7qE"),r=e("XBt6"),d=e("EXdN");e.d(l,"a",function(){return u});var u=function(){function n(n,l,e,t){this.action=n,this.downloadOriginService=l,this.downloadOriginTableService=e,this.dialog=t}return n.prototype.ngOnInit=function(){this.containerConfig=this.downloadOriginService.downloadOriginConfig(),this.downloadOriginTable=new r.h({titles:this.downloadOriginTableService.setTitles(),ifPage:!0}),this.reset()},n.prototype.reset=function(){this.getDownloadOrigins()},n.prototype.getDownloadOrigins=function(){var n=this;this.downloadOriginTable.reset(),this.downloadOriginService.getDownloadOrigin().subscribe(function(l){n.downloadOriginTable.loading=!1,l.data&&0===l.data.length&&0===l.code?n.downloadOriginTable.errorMessage=d.a.nullMsg:l.data&&0===l.code?n.downloadOriginTable.lists=l.data:n.downloadOriginTable.errorMessage=l.msg||d.a.otherMsg},function(l){n.downloadOriginTable.loading=!1,console.log(l),n.downloadOriginTable.errorMessage=d.a.netErrMsg})},n.prototype.newData=function(){this.downloadOrigin()},n.prototype.gotoHandle=function(n){var l=this,t=n.value;if("edit"===n.key&&this.downloadOrigin(t),"del"===n.key){var i=new r.j({title:"您确定要删除渠道名称为"+t.name+"？",message:"",buttons:[{key:"topass",value:"确定",color:"primary"},{key:"tocancel",value:"取消",color:""}]});e.i(r.k)(i,this.dialog).afterClosed().subscribe(function(n){n&&"topass"===n.key&&l.toDelDownload(t.id)})}},n.prototype.downloadOrigin=function(n){var l=this,t=new r.j({title:(n?"编辑":"新增")+"渠道来源",message:"",buttons:[{key:"confirm",value:"确定",color:"primary"},{key:"cancel",value:"取消",color:""}],forms:[{key:"name",label:"渠道名称",value:n&&n.name||""},{key:"alias",label:"渠道别名",value:n&&n.alias||""}]});e.i(r.k)(t,this.dialog).afterClosed().subscribe(function(e){e&&"confirm"===e.key&&e.value&&n?l.getValue({name:e.value[0].value,alias:e.value[1].value},!0,n.id):e&&"confirm"===e.key&&e.value&&!n&&l.getValue({name:e.value[0].value,alias:e.value[1].value},!1)})},n.prototype.getValue=function(n,l,t){var i=this;l?this.downloadOriginService.downloadOriginUpdate(t,n).subscribe(function(n){0===n.code?(e.i(r.f)(d.a.saveSuccess,i.dialog),i.reset()):e.i(r.f)(n.msg||d.a.saveError,i.dialog)},function(n){console.log(n),e.i(r.f)(d.a.netErrMsg,i.dialog)}):this.downloadOriginService.downloadOriginCreate(n).subscribe(function(n){0===n.code?(e.i(r.f)(d.a.saveSuccess,i.dialog),i.reset()):e.i(r.f)(n.msg||d.a.saveError,i.dialog)},function(n){console.log(n),e.i(r.f)(d.a.netErrMsg,i.dialog)})},n.prototype.toDelDownload=function(n){var l=this;this.downloadOriginService.downloadOriginDel(n).subscribe(function(n){0===n.code?(e.i(r.f)("删除成功",l.dialog),l.reset()):e.i(r.f)(n.msg||"删除失败",l.dialog)},function(n){console.log(n),e.i(r.f)("删除失败",l.dialog)})},n.ctorParameters=function(){return[{type:void 0,decorators:[{type:t.Inject,args:["action"]}]},{type:o.a},{type:a.a},{type:i.H}]},n}()},"Ln/8":function(n,l,e){"use strict";Object.defineProperty(l,"__esModule",{value:!0});var t=e("/oeL"),i=e("M9u2"),o=e("BH+U"),a=e("bm2B"),r=e("qbdv"),d=e("p4Sk"),u=e("fc+i"),c=e("Z04r"),s=e("CPp0"),p=e("k5hN"),g=e("3zrr"),f=e("x7qE"),m=e("v9cq"),v=e("07hk"),w=e("BkNc"),b=e("gcG0"),h=e("GGL6"),y=e("JGhA");e.d(l,"DownloadOriginModuleNgFactory",function(){return O});var O=t["ɵcmf"](i.a,[],function(n){return t["ɵmod"]([t["ɵmpd"](512,t.ComponentFactoryResolver,t["ɵCodegenComponentFactoryResolver"],[[8,[o.a]],[3,t.ComponentFactoryResolver],t.NgModuleRef]),t["ɵmpd"](4608,a.a,a.a,[]),t["ɵmpd"](4608,r.a,r.b,[t.LOCALE_ID]),t["ɵmpd"](6144,d.a,null,[u.u]),t["ɵmpd"](4608,d.b,d.b,[[2,d.a]]),t["ɵmpd"](4608,d.c,d.c,[]),t["ɵmpd"](5120,c.a,c.b,[[3,c.a],t.NgZone,d.c]),t["ɵmpd"](5120,c.c,c.d,[[3,c.c],c.a]),t["ɵmpd"](4608,c.e,c.e,[c.a,c.c]),t["ɵmpd"](4608,d.d,d.d,[]),t["ɵmpd"](5120,c.f,c.O,[[3,c.f],t.NgZone,d.c]),t["ɵmpd"](5120,c.g,c.h,[[3,c.g],[2,s.a],u.b]),t["ɵmpd"](4608,p.a,p.a,[]),t["ɵmpd"](4608,"search",p.a,[]),t["ɵmpd"](4608,g.a,g.a,["app","http"]),t["ɵmpd"](4608,f.a,f.a,[]),t["ɵmpd"](4608,m.a,m.a,[]),t["ɵmpd"](512,a.c,a.c,[]),t["ɵmpd"](512,a.d,a.d,[]),t["ɵmpd"](512,r.d,r.d,[]),t["ɵmpd"](512,d.e,d.e,[]),t["ɵmpd"](512,c.p,c.p,[]),t["ɵmpd"](512,d.f,d.f,[]),t["ɵmpd"](256,c.q,!0,[]),t["ɵmpd"](512,c.r,c.r,[[2,u.u],[2,c.q]]),t["ɵmpd"](512,d.g,d.g,[]),t["ɵmpd"](512,c.s,c.s,[]),t["ɵmpd"](512,c.t,c.t,[]),t["ɵmpd"](512,d.h,d.h,[]),t["ɵmpd"](512,c.u,c.u,[]),t["ɵmpd"](512,c.v,c.v,[]),t["ɵmpd"](512,c.w,c.w,[]),t["ɵmpd"](512,c.x,c.x,[]),t["ɵmpd"](512,v.a,v.a,[]),t["ɵmpd"](512,w.x,w.x,[[2,w.m],[2,w.c]]),t["ɵmpd"](512,b.a,b.a,[]),t["ɵmpd"](512,i.a,i.a,[]),t["ɵmpd"](1024,w.t,function(){return[[{path:"",component:h.a,canActivate:[y.a]}]]},[])])})},M9u2:function(n,l,e){"use strict";var t=e("GGL6"),i=e("JGhA");e.d(l,"a",function(){return o});var o=(t.a,i.a,function(){function n(){}return n}())},v9cq:function(n,l,e){"use strict";var t=e("XBt6");e.d(l,"a",function(){return i});var i=function(){function n(){}return n.prototype.setForm=function(n){var l=[];return l.push(new t.c({key:"name",label:"渠道名称",value:n&&n.name||"",required:!0,order:1}),new t.c({key:"alias",label:"渠道别名",value:n&&n.alias||"",required:!0,order:2})),l.sort(function(n,l){return n.order-l.order})},n}()},x7qE:function(n,l,e){"use strict";var t=e("XBt6");e.d(l,"a",function(){return i});var i=function(){function n(){}return n.prototype.setTitles=function(){return[new t.l({name:"序号",key:"id"}),new t.l({name:"渠道名称",key:"name"}),new t.l({name:"渠道别名",key:"alias"}),new t.l({name:"渠道链接",key:"url"}),new t.l({name:"编辑",key:"edit",controlType:t.g.button}),new t.l({name:"删除",key:"del",controlType:t.g.button})]},n}()}});