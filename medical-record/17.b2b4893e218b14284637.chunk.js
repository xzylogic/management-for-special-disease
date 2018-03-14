webpackJsonp([17],{"a1+v":function(l,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var t=e("LMZF"),u=e("UHIZ"),a=e("zUGF"),i=e("rFxa"),d=function(){function l(l,n){this.app=l,this.httpService=n}return l.prototype.downloadConfig=function(){return new i.b({title:"\u6570\u636e\u7edf\u8ba1",subTitle:"\u6e20\u9053\u6765\u6e90\u7edf\u8ba1",ifHome:!0,homeRouter:"/download-statistics",currentRouter:"/download-statistics"})},l.prototype.getDownloadStatistics=function(l,n,e){return this.httpService.get(this.app.pci.BASE_URL+"api/operational/pv?startTime="+l+"&endTime="+n+"&product="+e)},l}(),o=function(){function l(){}return l.prototype.setTitles=function(){return[new a.c({name:"\u6e20\u9053\u6765\u6e90",key:"name"}),new a.c({name:"PV",key:"pv"}),new a.c({name:"UV",key:"uv"}),new a.c({name:"IOS\u4e0b\u8f7d\u91cf",key:"ios"}),new a.c({name:"Android\u4e0b\u8f7d\u91cf",key:"android"})]},l.prototype.setMainTitles=function(){return[new a.c({name:"\u6e20\u9053\u6765\u6e90",key:"name"}),new a.c({name:"PV",key:"pv"}),new a.c({name:"UV",key:"uv"})]},l}(),r=e("EXdN"),s=function(){function l(l,n,e){this.search=l,this.service=n,this.tableService=e}return l.prototype.ngOnInit=function(){this.containerConfig=this.service.downloadConfig(),this.mainTable=new a.b({titles:this.tableService.setMainTitles(),ifPage:!0}),this.userTable=new a.b({titles:this.tableService.setTitles(),ifPage:!0}),this.doctorTable=new a.b({titles:this.tableService.setTitles(),ifPage:!0}),this.queryMainDate=this.search.setDefaultRange(),this.queryUserDate=this.search.setDefaultRange(),this.queryDoctorDate=this.search.setDefaultRange(),this.getMainQueryResult(),this.getUserQueryResult(),this.getDoctorQueryResult()},l.prototype.getMainQueryResult=function(){var l=this;this.queryMainDate&&this.queryMainDate.indexOf("\u81f3")<0&&(this.queryMainDate+=" \u81f3 "+this.queryMainDate),this.mainTable.reset();var n=this.search.getStartAndEnd(this.queryMainDate);this.service.getDownloadStatistics(n.start,n.end,2).subscribe(function(n){l.mainTable.loading=!1,n.data&&0===n.code?l.mainTable.lists=n.data:l.mainTable.errorMessage=n.msg||r.a.otherMsg},function(n){l.mainTable.loading=!1,console.log(n),l.mainTable.errorMessage=r.a.netErrMsg})},l.prototype.getUserQueryResult=function(){var l=this;this.queryUserDate&&this.queryUserDate.indexOf("\u81f3")<0&&(this.queryUserDate+=" \u81f3 "+this.queryUserDate),this.userTable.reset();var n=this.search.getStartAndEnd(this.queryUserDate);this.service.getDownloadStatistics(n.start,n.end,0).subscribe(function(n){l.userTable.loading=!1,n.data&&0===n.code?(l.userTable.lists=n.data,l.format(l.userTable.lists)):l.userTable.errorMessage=n.msg||r.a.otherMsg},function(n){l.userTable.loading=!1,console.log(n),l.userTable.errorMessage=r.a.netErrMsg})},l.prototype.getDoctorQueryResult=function(){var l=this;this.queryDoctorDate&&this.queryDoctorDate.indexOf("\u81f3")<0&&(this.queryDoctorDate+=" \u81f3 "+this.queryDoctorDate),this.doctorTable.reset();var n=this.search.getStartAndEnd(this.queryDoctorDate);this.service.getDownloadStatistics(n.start,n.end,1).subscribe(function(n){l.doctorTable.loading=!1,n.data&&0===n.code?(l.doctorTable.lists=n.data,l.format(l.doctorTable.lists)):l.doctorTable.errorMessage=n.msg||r.a.otherMsg},function(n){l.doctorTable.loading=!1,console.log(n),l.doctorTable.errorMessage=r.a.netErrMsg})},l.prototype.format=function(l){"object"==typeof l&&l.forEach(function(l){l.ios=l.ios+"/"+l.ios_u,l.android=l.android+"/"+l.android_u})},l}(),c=e("JGhA"),g=function(){},p=e("QLv2"),m=e("fAnl"),b=e("EcWV"),f=e("wu+X"),v=e("ZFRd"),h=e("0nO6"),y=e("zT0V"),T=e("3t/X"),C=e("ESfO"),R=e("ghl+"),D=e("V8+5"),w=e("8Xfy"),q=e("yxpl"),M=e("vgc3"),I=e("Un6q"),V=t["\u0275crt"]({encapsulation:2,styles:[],data:{}});function k(l){return t["\u0275vid"](0,[(l()(),t["\u0275eld"](0,0,null,null,1,"div",[],null,null,null,null,null)),(l()(),t["\u0275ted"](-1,null,["Loading..."]))],null,null)}function E(l){return t["\u0275vid"](0,[(l()(),t["\u0275eld"](0,0,null,null,1,"div",[["class","center"]],null,null,null,null,null)),(l()(),t["\u0275ted"](1,null,["\n          ","\n        "]))],null,function(l,n){l(n,1,0,n.component.mainTable.errorMessage)})}function S(l){return t["\u0275vid"](0,[(l()(),t["\u0275eld"](0,0,null,null,7,"div",[],null,null,null,null,null)),(l()(),t["\u0275ted"](-1,null,["\n          "])),(l()(),t["\u0275eld"](2,0,null,null,4,"div",[["class","content__table"]],null,null,null,null,null)),(l()(),t["\u0275ted"](-1,null,["\n            "])),(l()(),t["\u0275eld"](4,0,null,null,1,"app-lib-table",[],null,null,null,p.b,p.a)),t["\u0275did"](5,573440,null,0,m.a,[],{table:[0,"table"]},null),(l()(),t["\u0275ted"](-1,null,["\n          "])),(l()(),t["\u0275ted"](-1,null,["\n        "]))],function(l,n){l(n,5,0,n.component.mainTable)},null)}function U(l){return t["\u0275vid"](0,[(l()(),t["\u0275eld"](0,0,null,null,1,"div",[],null,null,null,null,null)),(l()(),t["\u0275ted"](-1,null,["Loading..."]))],null,null)}function x(l){return t["\u0275vid"](0,[(l()(),t["\u0275eld"](0,0,null,null,1,"div",[["class","center"]],null,null,null,null,null)),(l()(),t["\u0275ted"](1,null,["\n          ","\n        "]))],null,function(l,n){l(n,1,0,n.component.userTable.errorMessage)})}function L(l){return t["\u0275vid"](0,[(l()(),t["\u0275eld"](0,0,null,null,7,"div",[],null,null,null,null,null)),(l()(),t["\u0275ted"](-1,null,["\n          "])),(l()(),t["\u0275eld"](2,0,null,null,4,"div",[["class","content__table"]],null,null,null,null,null)),(l()(),t["\u0275ted"](-1,null,["\n            "])),(l()(),t["\u0275eld"](4,0,null,null,1,"app-lib-table",[],null,null,null,p.b,p.a)),t["\u0275did"](5,573440,null,0,m.a,[],{table:[0,"table"]},null),(l()(),t["\u0275ted"](-1,null,["\n          "])),(l()(),t["\u0275ted"](-1,null,["\n        "]))],function(l,n){l(n,5,0,n.component.userTable)},null)}function P(l){return t["\u0275vid"](0,[(l()(),t["\u0275eld"](0,0,null,null,1,"div",[],null,null,null,null,null)),(l()(),t["\u0275ted"](-1,null,["Loading..."]))],null,null)}function _(l){return t["\u0275vid"](0,[(l()(),t["\u0275eld"](0,0,null,null,1,"div",[["class","center"]],null,null,null,null,null)),(l()(),t["\u0275ted"](1,null,["\n          ","\n        "]))],null,function(l,n){l(n,1,0,n.component.doctorTable.errorMessage)})}function N(l){return t["\u0275vid"](0,[(l()(),t["\u0275eld"](0,0,null,null,7,"div",[],null,null,null,null,null)),(l()(),t["\u0275ted"](-1,null,["\n          "])),(l()(),t["\u0275eld"](2,0,null,null,4,"div",[["class","content__table"]],null,null,null,null,null)),(l()(),t["\u0275ted"](-1,null,["\n            "])),(l()(),t["\u0275eld"](4,0,null,null,1,"app-lib-table",[],null,null,null,p.b,p.a)),t["\u0275did"](5,573440,null,0,m.a,[],{table:[0,"table"]},null),(l()(),t["\u0275ted"](-1,null,["\n          "])),(l()(),t["\u0275ted"](-1,null,["\n        "]))],function(l,n){l(n,5,0,n.component.doctorTable)},null)}function Q(l){return t["\u0275vid"](0,[(l()(),t["\u0275eld"](0,0,null,null,109,"app-container",[],null,null,null,b.b,b.a)),t["\u0275did"](1,114688,null,0,i.a,[],{config:[0,"config"]},null),(l()(),t["\u0275ted"](-1,null,["\n  "])),(l()(),t["\u0275eld"](3,0,null,1,105,"div",[["class","content"]],null,null,null,null,null)),(l()(),t["\u0275ted"](-1,null,["\n    "])),(l()(),t["\u0275eld"](5,0,null,null,102,"mat-tab-group",[["class","mat-tab-group"],["dynamicHeight","true"]],[[2,"mat-tab-group-dynamic-height",null],[2,"mat-tab-group-inverted-header",null]],null,null,f.c,f.b)),t["\u0275did"](6,3325952,null,1,v.e,[t.ElementRef,t.ChangeDetectorRef],{dynamicHeight:[0,"dynamicHeight"]},null),t["\u0275qud"](603979776,1,{_tabs:1}),(l()(),t["\u0275ted"](-1,null,["\n      "])),(l()(),t["\u0275eld"](9,16777216,null,null,31,"mat-tab",[["label","\u5168\u90e8\u6765\u6e90\u7edf\u8ba1"]],null,null,null,f.d,f.a)),t["\u0275did"](10,770048,[[1,4]],1,v.b,[t.ViewContainerRef],{textLabel:[0,"textLabel"]},null),t["\u0275qud"](335544320,2,{templateLabel:0}),(l()(),t["\u0275ted"](-1,0,["\n        "])),(l()(),t["\u0275eld"](13,0,null,0,17,"form",[["novalidate",""],["style","padding: 16px"]],[[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"submit"],[null,"reset"]],function(l,n,e){var u=!0;return"submit"===n&&(u=!1!==t["\u0275nov"](l,15).onSubmit(e)&&u),"reset"===n&&(u=!1!==t["\u0275nov"](l,15).onReset()&&u),u},null,null)),t["\u0275did"](14,16384,null,0,h.x,[],null,null),t["\u0275did"](15,4210688,null,0,h.q,[[8,null],[8,null]],null,null),t["\u0275prd"](2048,null,h.c,null,[h.q]),t["\u0275did"](17,16384,null,0,h.p,[h.c],null,null),(l()(),t["\u0275ted"](-1,null,["\n          "])),(l()(),t["\u0275eld"](19,0,null,null,1,"app-search",[],[[8,"className",0]],[[null,"valueChange"]],function(l,n,e){var t=!0;return"valueChange"===n&&(t=!1!==(l.component.queryMainDate=e)&&t),t},y.b,y.a)),t["\u0275did"](20,4440064,null,0,T.a,[],{type:[0,"type"],label:[1,"label"],value:[2,"value"]},{valueChange:"valueChange"}),(l()(),t["\u0275ted"](-1,null,["\n          "])),(l()(),t["\u0275eld"](22,0,null,null,7,"button",[["class","mat-icon-button"],["color","primary"],["mat-icon-button",""],["type","button"]],[[8,"disabled",0]],[[null,"click"]],function(l,n,e){var t=!0;return"click"===n&&(t=!1!==l.component.getMainQueryResult()&&t),t},C.b,C.a)),t["\u0275did"](23,180224,null,0,R.b,[t.ElementRef,D.a,w.i],{color:[0,"color"]},null),t["\u0275did"](24,16384,null,0,R.e,[],null,null),(l()(),t["\u0275ted"](-1,0,["\n            "])),(l()(),t["\u0275eld"](26,0,null,0,2,"mat-icon",[["class","mat-icon"],["role","img"]],null,null,null,q.b,q.a)),t["\u0275did"](27,638976,null,0,M.b,[t.ElementRef,M.d,[8,null]],null,null),(l()(),t["\u0275ted"](-1,0,["search"])),(l()(),t["\u0275ted"](-1,0,["\n          "])),(l()(),t["\u0275ted"](-1,null,["\n        "])),(l()(),t["\u0275ted"](-1,0,["\n        "])),(l()(),t["\u0275and"](16777216,null,0,1,null,k)),t["\u0275did"](33,16384,null,0,I.l,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null),(l()(),t["\u0275ted"](-1,0,["\n        "])),(l()(),t["\u0275and"](16777216,null,0,1,null,E)),t["\u0275did"](36,16384,null,0,I.l,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null),(l()(),t["\u0275ted"](-1,0,["\n        "])),(l()(),t["\u0275and"](16777216,null,0,1,null,S)),t["\u0275did"](39,16384,null,0,I.l,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null),(l()(),t["\u0275ted"](-1,0,["\n      "])),(l()(),t["\u0275ted"](-1,null,["\n      "])),(l()(),t["\u0275eld"](42,16777216,null,null,31,"mat-tab",[["label","\u7528\u6237\u6e20\u9053\u6765\u6e90\u7edf\u8ba1"]],null,null,null,f.d,f.a)),t["\u0275did"](43,770048,[[1,4]],1,v.b,[t.ViewContainerRef],{textLabel:[0,"textLabel"]},null),t["\u0275qud"](335544320,3,{templateLabel:0}),(l()(),t["\u0275ted"](-1,0,["\n        "])),(l()(),t["\u0275eld"](46,0,null,0,17,"form",[["novalidate",""],["style","padding: 16px"]],[[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"submit"],[null,"reset"]],function(l,n,e){var u=!0;return"submit"===n&&(u=!1!==t["\u0275nov"](l,48).onSubmit(e)&&u),"reset"===n&&(u=!1!==t["\u0275nov"](l,48).onReset()&&u),u},null,null)),t["\u0275did"](47,16384,null,0,h.x,[],null,null),t["\u0275did"](48,4210688,null,0,h.q,[[8,null],[8,null]],null,null),t["\u0275prd"](2048,null,h.c,null,[h.q]),t["\u0275did"](50,16384,null,0,h.p,[h.c],null,null),(l()(),t["\u0275ted"](-1,null,["\n          "])),(l()(),t["\u0275eld"](52,0,null,null,1,"app-search",[],[[8,"className",0]],[[null,"valueChange"]],function(l,n,e){var t=!0;return"valueChange"===n&&(t=!1!==(l.component.queryUserDate=e)&&t),t},y.b,y.a)),t["\u0275did"](53,4440064,null,0,T.a,[],{type:[0,"type"],label:[1,"label"],value:[2,"value"]},{valueChange:"valueChange"}),(l()(),t["\u0275ted"](-1,null,["\n          "])),(l()(),t["\u0275eld"](55,0,null,null,7,"button",[["class","mat-icon-button"],["color","primary"],["mat-icon-button",""],["type","button"]],[[8,"disabled",0]],[[null,"click"]],function(l,n,e){var t=!0;return"click"===n&&(t=!1!==l.component.getUserQueryResult()&&t),t},C.b,C.a)),t["\u0275did"](56,180224,null,0,R.b,[t.ElementRef,D.a,w.i],{color:[0,"color"]},null),t["\u0275did"](57,16384,null,0,R.e,[],null,null),(l()(),t["\u0275ted"](-1,0,["\n            "])),(l()(),t["\u0275eld"](59,0,null,0,2,"mat-icon",[["class","mat-icon"],["role","img"]],null,null,null,q.b,q.a)),t["\u0275did"](60,638976,null,0,M.b,[t.ElementRef,M.d,[8,null]],null,null),(l()(),t["\u0275ted"](-1,0,["search"])),(l()(),t["\u0275ted"](-1,0,["\n          "])),(l()(),t["\u0275ted"](-1,null,["\n        "])),(l()(),t["\u0275ted"](-1,0,["\n        "])),(l()(),t["\u0275and"](16777216,null,0,1,null,U)),t["\u0275did"](66,16384,null,0,I.l,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null),(l()(),t["\u0275ted"](-1,0,["\n        "])),(l()(),t["\u0275and"](16777216,null,0,1,null,x)),t["\u0275did"](69,16384,null,0,I.l,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null),(l()(),t["\u0275ted"](-1,0,["\n        "])),(l()(),t["\u0275and"](16777216,null,0,1,null,L)),t["\u0275did"](72,16384,null,0,I.l,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null),(l()(),t["\u0275ted"](-1,0,["\n      "])),(l()(),t["\u0275ted"](-1,null,["\n      "])),(l()(),t["\u0275eld"](75,16777216,null,null,31,"mat-tab",[["label","\u533b\u751f\u6e20\u9053\u6765\u6e90\u7edf\u8ba1"]],null,null,null,f.d,f.a)),t["\u0275did"](76,770048,[[1,4]],1,v.b,[t.ViewContainerRef],{textLabel:[0,"textLabel"]},null),t["\u0275qud"](335544320,4,{templateLabel:0}),(l()(),t["\u0275ted"](-1,0,["\n        "])),(l()(),t["\u0275eld"](79,0,null,0,17,"form",[["novalidate",""],["style","padding: 16px"]],[[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"submit"],[null,"reset"]],function(l,n,e){var u=!0;return"submit"===n&&(u=!1!==t["\u0275nov"](l,81).onSubmit(e)&&u),"reset"===n&&(u=!1!==t["\u0275nov"](l,81).onReset()&&u),u},null,null)),t["\u0275did"](80,16384,null,0,h.x,[],null,null),t["\u0275did"](81,4210688,null,0,h.q,[[8,null],[8,null]],null,null),t["\u0275prd"](2048,null,h.c,null,[h.q]),t["\u0275did"](83,16384,null,0,h.p,[h.c],null,null),(l()(),t["\u0275ted"](-1,null,["\n          "])),(l()(),t["\u0275eld"](85,0,null,null,1,"app-search",[],[[8,"className",0]],[[null,"valueChange"]],function(l,n,e){var t=!0;return"valueChange"===n&&(t=!1!==(l.component.queryDoctorDate=e)&&t),t},y.b,y.a)),t["\u0275did"](86,4440064,null,0,T.a,[],{type:[0,"type"],label:[1,"label"],value:[2,"value"]},{valueChange:"valueChange"}),(l()(),t["\u0275ted"](-1,null,["\n          "])),(l()(),t["\u0275eld"](88,0,null,null,7,"button",[["class","mat-icon-button"],["color","primary"],["mat-icon-button",""],["type","button"]],[[8,"disabled",0]],[[null,"click"]],function(l,n,e){var t=!0;return"click"===n&&(t=!1!==l.component.getDoctorQueryResult()&&t),t},C.b,C.a)),t["\u0275did"](89,180224,null,0,R.b,[t.ElementRef,D.a,w.i],{color:[0,"color"]},null),t["\u0275did"](90,16384,null,0,R.e,[],null,null),(l()(),t["\u0275ted"](-1,0,["\n            "])),(l()(),t["\u0275eld"](92,0,null,0,2,"mat-icon",[["class","mat-icon"],["role","img"]],null,null,null,q.b,q.a)),t["\u0275did"](93,638976,null,0,M.b,[t.ElementRef,M.d,[8,null]],null,null),(l()(),t["\u0275ted"](-1,0,["search"])),(l()(),t["\u0275ted"](-1,0,["\n          "])),(l()(),t["\u0275ted"](-1,null,["\n        "])),(l()(),t["\u0275ted"](-1,0,["\n        "])),(l()(),t["\u0275and"](16777216,null,0,1,null,P)),t["\u0275did"](99,16384,null,0,I.l,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null),(l()(),t["\u0275ted"](-1,0,["\n        "])),(l()(),t["\u0275and"](16777216,null,0,1,null,_)),t["\u0275did"](102,16384,null,0,I.l,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null),(l()(),t["\u0275ted"](-1,0,["\n        "])),(l()(),t["\u0275and"](16777216,null,0,1,null,N)),t["\u0275did"](105,16384,null,0,I.l,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null),(l()(),t["\u0275ted"](-1,0,["\n      "])),(l()(),t["\u0275ted"](-1,null,["\n    "])),(l()(),t["\u0275ted"](-1,null,["\n  "])),(l()(),t["\u0275ted"](-1,null,["\n"]))],function(l,n){var e=n.component;l(n,1,0,e.containerConfig),l(n,6,0,"true"),l(n,10,0,"\u5168\u90e8\u6765\u6e90\u7edf\u8ba1"),l(n,20,0,"1","\u8bf7\u9009\u62e9\u65e5\u671f",e.queryMainDate),l(n,23,0,"primary"),l(n,27,0),l(n,33,0,!e.mainTable.lists&&e.mainTable.loading),l(n,36,0,!e.mainTable.lists&&!e.mainTable.loading&&!!e.mainTable.errorMessage),l(n,39,0,e.mainTable.lists),l(n,43,0,"\u7528\u6237\u6e20\u9053\u6765\u6e90\u7edf\u8ba1"),l(n,53,0,"1","\u8bf7\u9009\u62e9\u65e5\u671f",e.queryUserDate),l(n,56,0,"primary"),l(n,60,0),l(n,66,0,!e.userTable.lists&&e.userTable.loading),l(n,69,0,!e.userTable.lists&&!e.userTable.loading&&!!e.userTable.errorMessage),l(n,72,0,e.userTable.lists),l(n,76,0,"\u533b\u751f\u6e20\u9053\u6765\u6e90\u7edf\u8ba1"),l(n,86,0,"1","\u8bf7\u9009\u62e9\u65e5\u671f",e.queryDoctorDate),l(n,89,0,"primary"),l(n,93,0),l(n,99,0,!e.doctorTable.lists&&e.doctorTable.loading),l(n,102,0,!e.doctorTable.lists&&!e.doctorTable.loading&&!!e.doctorTable.errorMessage),l(n,105,0,e.doctorTable.lists)},function(l,n){l(n,5,0,t["\u0275nov"](n,6).dynamicHeight,"below"===t["\u0275nov"](n,6).headerPosition),l(n,13,0,t["\u0275nov"](n,17).ngClassUntouched,t["\u0275nov"](n,17).ngClassTouched,t["\u0275nov"](n,17).ngClassPristine,t["\u0275nov"](n,17).ngClassDirty,t["\u0275nov"](n,17).ngClassValid,t["\u0275nov"](n,17).ngClassInvalid,t["\u0275nov"](n,17).ngClassPending),l(n,19,0,t["\u0275nov"](n,20).hostClass),l(n,22,0,t["\u0275nov"](n,23).disabled||null),l(n,46,0,t["\u0275nov"](n,50).ngClassUntouched,t["\u0275nov"](n,50).ngClassTouched,t["\u0275nov"](n,50).ngClassPristine,t["\u0275nov"](n,50).ngClassDirty,t["\u0275nov"](n,50).ngClassValid,t["\u0275nov"](n,50).ngClassInvalid,t["\u0275nov"](n,50).ngClassPending),l(n,52,0,t["\u0275nov"](n,53).hostClass),l(n,55,0,t["\u0275nov"](n,56).disabled||null),l(n,79,0,t["\u0275nov"](n,83).ngClassUntouched,t["\u0275nov"](n,83).ngClassTouched,t["\u0275nov"](n,83).ngClassPristine,t["\u0275nov"](n,83).ngClassDirty,t["\u0275nov"](n,83).ngClassValid,t["\u0275nov"](n,83).ngClassInvalid,t["\u0275nov"](n,83).ngClassPending),l(n,85,0,t["\u0275nov"](n,86).hostClass),l(n,88,0,t["\u0275nov"](n,89).disabled||null)})}function A(l){return t["\u0275vid"](0,[(l()(),t["\u0275and"](16777216,null,null,1,null,Q)),t["\u0275did"](1,16384,null,0,I.l,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null),(l()(),t["\u0275ted"](-1,null,["\n"]))],function(l,n){l(n,1,0,n.component.containerConfig)},null)}var O=t["\u0275ccf"]("app-download-statistics",s,function(l){return t["\u0275vid"](0,[(l()(),t["\u0275eld"](0,0,null,null,1,"app-download-statistics",[],null,null,null,A,V)),t["\u0275did"](1,114688,null,0,s,["search",d,o],null,null)],function(l,n){l(n,1,0)},null)},{},{},[]),j=e("l6RC"),F=e("ppgG"),Z=e("4jwp"),H=e("9iV4"),G=e("RyBE"),X=e("k5hN"),B=e("j5BN"),z=e("CZgk"),J=e("07hk"),W=e("gcG0");e.d(n,"DownloadStatisticsModuleNgFactory",function(){return K});var K=t["\u0275cmf"](g,[],function(l){return t["\u0275mod"]([t["\u0275mpd"](512,t.ComponentFactoryResolver,t["\u0275CodegenComponentFactoryResolver"],[[8,[O]],[3,t.ComponentFactoryResolver],t.NgModuleRef]),t["\u0275mpd"](4608,I.n,I.m,[t.LOCALE_ID,[2,I.v]]),t["\u0275mpd"](6144,j.b,null,[I.d]),t["\u0275mpd"](4608,j.c,j.c,[[2,j.b]]),t["\u0275mpd"](4608,D.a,D.a,[]),t["\u0275mpd"](4608,F.b,F.b,[]),t["\u0275mpd"](5120,Z.d,Z.b,[[3,Z.d],t.NgZone,D.a]),t["\u0275mpd"](5120,Z.g,Z.f,[[3,Z.g],D.a,t.NgZone]),t["\u0275mpd"](4608,w.k,w.k,[D.a]),t["\u0275mpd"](4608,w.j,w.j,[w.k,t.NgZone,I.d]),t["\u0275mpd"](136192,w.d,w.b,[[3,w.d],I.d]),t["\u0275mpd"](5120,w.n,w.m,[[3,w.n],[2,w.l],I.d]),t["\u0275mpd"](5120,w.i,w.g,[[3,w.i],t.NgZone,D.a]),t["\u0275mpd"](5120,M.d,M.a,[[3,M.d],[2,H.c],G.c,[2,I.d]]),t["\u0275mpd"](4608,h.y,h.y,[]),t["\u0275mpd"](4608,X.a,X.a,[]),t["\u0275mpd"](4608,"search",X.a,[]),t["\u0275mpd"](4608,d,d,["app","http"]),t["\u0275mpd"](4608,o,o,[]),t["\u0275mpd"](512,I.c,I.c,[]),t["\u0275mpd"](512,j.a,j.a,[]),t["\u0275mpd"](256,B.e,!0,[]),t["\u0275mpd"](512,B.l,B.l,[[2,B.e]]),t["\u0275mpd"](512,z.g,z.g,[]),t["\u0275mpd"](512,D.b,D.b,[]),t["\u0275mpd"](512,B.w,B.w,[]),t["\u0275mpd"](512,F.c,F.c,[]),t["\u0275mpd"](512,Z.c,Z.c,[]),t["\u0275mpd"](512,v.i,v.i,[]),t["\u0275mpd"](512,w.a,w.a,[]),t["\u0275mpd"](512,R.d,R.d,[]),t["\u0275mpd"](512,M.c,M.c,[]),t["\u0275mpd"](512,J.a,J.a,[]),t["\u0275mpd"](512,h.v,h.v,[]),t["\u0275mpd"](512,h.j,h.j,[]),t["\u0275mpd"](512,u.m,u.m,[[2,u.r],[2,u.k]]),t["\u0275mpd"](512,W.a,W.a,[]),t["\u0275mpd"](512,g,g,[]),t["\u0275mpd"](1024,u.i,function(){return[[{path:"",component:s,canActivate:[c.a]}]]},[])])})}});