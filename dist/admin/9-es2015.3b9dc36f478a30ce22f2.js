(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{RSnG:function(l,n,u){"use strict";u.r(n);var t=u("8Y7J");class e{}var o=u("pMnS"),a=u("SVse");class r{constructor(l){this._orderService=l,this.orders=new Array,this.totalCodAmount=0,this.totalPaytmAmount=0,this.totalDeliveryCharge=0,this.totalCollection=0,this.totalCodOrders=0,this.totalPaytmOrders=0}ngOnInit(){this._orderService.getSellReportData({status:localStorage.getItem("orderStatus"),start:localStorage.getItem("deliveryStartDate"),end:localStorage.getItem("deliveryEndDate")}).subscribe(l=>{console.log(l),this.orders=l.data,this.calculateTotal()})}calculateTotal(){if(this.orders.length){for(let l of this.orders)1==l.iscod?(this.totalCodAmount+=l.order_amount,this.totalCodOrders++):(this.totalPaytmAmount+=l.order_amount,this.totalPaytmOrders++),this.totalDeliveryCharge+=l.deliveryCharge;this.totalCollection=this.totalCodAmount+this.totalPaytmAmount+this.totalDeliveryCharge}}}var b=u("huct"),i=t.nb({encapsulation:0,styles:[['.detail[_ngcontent-%COMP%]{padding:30px}h1[_ngcontent-%COMP%]{font:bold 100% sans-serif;letter-spacing:.5em;text-align:center;text-transform:uppercase}table[_ngcontent-%COMP%]{font-size:75%;table-layout:fixed;width:100%;border-collapse:separate;border-spacing:2px}td[_ngcontent-%COMP%], th[_ngcontent-%COMP%]{border-width:1px;padding:.5em;position:relative;text-align:left;border-radius:.25em;border-style:solid}th[_ngcontent-%COMP%]{background:#eee;border-color:#bbb}td[_ngcontent-%COMP%]{border-color:#ddd}table.balance[_ngcontent-%COMP%], table.meta[_ngcontent-%COMP%]{float:right;width:36%}table.balance[_ngcontent-%COMP%]:after, table.meta[_ngcontent-%COMP%]:after{clear:both;content:"";display:table}table.balance[_ngcontent-%COMP%]   td[_ngcontent-%COMP%], table.balance[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]{width:50%}table.balance[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]{text-align:right}']],data:{}});function d(l){return t.Hb(0,[(l()(),t.pb(0,0,null,null,1,"span",[],null,null,null,null,null)),(l()(),t.Fb(-1,null,["COD"]))],null,null)}function c(l){return t.Hb(0,[(l()(),t.pb(0,0,null,null,1,"span",[],null,null,null,null,null)),(l()(),t.Fb(-1,null,["PAYTM"]))],null,null)}function p(l){return t.Hb(0,[(l()(),t.pb(0,0,null,null,20,"tr",[],null,null,null,null,null)),(l()(),t.pb(1,0,null,null,1,"td",[],null,null,null,null,null)),(l()(),t.Fb(2,null,["",""])),(l()(),t.pb(3,0,null,null,1,"td",[],null,null,null,null,null)),(l()(),t.Fb(4,null,["",""])),(l()(),t.pb(5,0,null,null,1,"td",[],null,null,null,null,null)),(l()(),t.Fb(6,null,["",""])),(l()(),t.pb(7,0,null,null,2,"td",[],null,null,null,null,null)),(l()(),t.Fb(8,null,["",""])),t.Cb(9,2),(l()(),t.pb(10,0,null,null,4,"td",[],null,null,null,null,null)),(l()(),t.eb(16777216,null,null,1,null,d)),t.ob(12,16384,null,0,a.j,[t.M,t.J],{ngIf:[0,"ngIf"]},null),(l()(),t.eb(16777216,null,null,1,null,c)),t.ob(14,16384,null,0,a.j,[t.M,t.J],{ngIf:[0,"ngIf"]},null),(l()(),t.pb(15,0,null,null,1,"td",[],null,null,null,null,null)),(l()(),t.Fb(16,null,["",""])),(l()(),t.pb(17,0,null,null,1,"td",[],null,null,null,null,null)),(l()(),t.Fb(18,null,["",""])),(l()(),t.pb(19,0,null,null,1,"td",[],null,null,null,null,null)),(l()(),t.Fb(20,null,["",""]))],(function(l,n){l(n,12,0,1==n.context.$implicit.iscod),l(n,14,0,1!=n.context.$implicit.iscod)}),(function(l,n){l(n,2,0,n.context.$implicit.order_id),l(n,4,0,n.context.$implicit.name),l(n,6,0,n.context.$implicit.user_id);var u=t.Gb(n,8,0,l(n,9,0,t.Ab(n.parent,0),n.context.$implicit.added_date,"dd/MM/yyyy"));l(n,8,0,u),l(n,16,0,n.context.$implicit.order_amount),l(n,18,0,n.context.$implicit.deliveryCharge),l(n,20,0,n.context.$implicit.order_amount+n.context.$implicit.deliveryCharge)}))}function s(l){return t.Hb(0,[t.Bb(0,a.d,[t.s]),(l()(),t.pb(1,0,null,null,56,"div",[["class","detail"]],null,null,null,null,null)),(l()(),t.pb(2,0,null,null,2,"header",[],null,null,null,null,null)),(l()(),t.pb(3,0,null,null,1,"h1",[],null,null,null,null,null)),(l()(),t.Fb(-1,null,["Sell Report"])),(l()(),t.pb(5,0,null,null,21,"table",[],null,null,null,null,null)),(l()(),t.pb(6,0,null,null,17,"thead",[],null,null,null,null,null)),(l()(),t.pb(7,0,null,null,16,"tr",[],null,null,null,null,null)),(l()(),t.pb(8,0,null,null,1,"th",[],null,null,null,null,null)),(l()(),t.Fb(-1,null,["Order No"])),(l()(),t.pb(10,0,null,null,1,"th",[],null,null,null,null,null)),(l()(),t.Fb(-1,null,["Name"])),(l()(),t.pb(12,0,null,null,1,"th",[],null,null,null,null,null)),(l()(),t.Fb(-1,null,["User ID"])),(l()(),t.pb(14,0,null,null,1,"th",[],null,null,null,null,null)),(l()(),t.Fb(-1,null,["Date"])),(l()(),t.pb(16,0,null,null,1,"th",[],null,null,null,null,null)),(l()(),t.Fb(-1,null,["Payment Type"])),(l()(),t.pb(18,0,null,null,1,"th",[],null,null,null,null,null)),(l()(),t.Fb(-1,null,["Order Amount"])),(l()(),t.pb(20,0,null,null,1,"th",[],null,null,null,null,null)),(l()(),t.Fb(-1,null,["Delivery Charge"])),(l()(),t.pb(22,0,null,null,1,"th",[],null,null,null,null,null)),(l()(),t.Fb(-1,null,["Total"])),(l()(),t.pb(24,0,null,null,2,"tbody",[],null,null,null,null,null)),(l()(),t.eb(16777216,null,null,1,null,p)),t.ob(26,278528,null,0,a.i,[t.M,t.J,t.q],{ngForOf:[0,"ngForOf"]},null),(l()(),t.pb(27,0,null,null,30,"table",[["class","balance"]],null,null,null,null,null)),(l()(),t.pb(28,0,null,null,4,"tr",[],null,null,null,null,null)),(l()(),t.pb(29,0,null,null,1,"th",[],null,null,null,null,null)),(l()(),t.Fb(-1,null,["Total COD Collection"])),(l()(),t.pb(31,0,null,null,1,"td",[],null,null,null,null,null)),(l()(),t.Fb(32,null,["",""])),(l()(),t.pb(33,0,null,null,4,"tr",[],null,null,null,null,null)),(l()(),t.pb(34,0,null,null,1,"th",[],null,null,null,null,null)),(l()(),t.Fb(-1,null,["Total Paytm Collection"])),(l()(),t.pb(36,0,null,null,1,"td",[],null,null,null,null,null)),(l()(),t.Fb(37,null,["",""])),(l()(),t.pb(38,0,null,null,4,"tr",[],null,null,null,null,null)),(l()(),t.pb(39,0,null,null,1,"th",[],null,null,null,null,null)),(l()(),t.Fb(-1,null,["Total COD Orders"])),(l()(),t.pb(41,0,null,null,1,"td",[],null,null,null,null,null)),(l()(),t.Fb(42,null,["",""])),(l()(),t.pb(43,0,null,null,4,"tr",[],null,null,null,null,null)),(l()(),t.pb(44,0,null,null,1,"th",[],null,null,null,null,null)),(l()(),t.Fb(-1,null,["Total Paytm Orders"])),(l()(),t.pb(46,0,null,null,1,"td",[],null,null,null,null,null)),(l()(),t.Fb(47,null,["",""])),(l()(),t.pb(48,0,null,null,4,"tr",[],null,null,null,null,null)),(l()(),t.pb(49,0,null,null,1,"th",[],null,null,null,null,null)),(l()(),t.Fb(-1,null,["Total Delivery Charge"])),(l()(),t.pb(51,0,null,null,1,"td",[],null,null,null,null,null)),(l()(),t.Fb(52,null,["",""])),(l()(),t.pb(53,0,null,null,4,"tr",[],null,null,null,null,null)),(l()(),t.pb(54,0,null,null,1,"th",[],null,null,null,null,null)),(l()(),t.Fb(-1,null,["Total Collection"])),(l()(),t.pb(56,0,null,null,1,"td",[],null,null,null,null,null)),(l()(),t.Fb(57,null,["",""]))],(function(l,n){l(n,26,0,n.component.orders)}),(function(l,n){var u=n.component;l(n,32,0,u.totalCodAmount),l(n,37,0,u.totalPaytmAmount),l(n,42,0,u.totalCodOrders),l(n,47,0,u.totalPaytmOrders),l(n,52,0,u.totalDeliveryCharge),l(n,57,0,u.totalCollection)}))}function h(l){return t.Hb(0,[(l()(),t.pb(0,0,null,null,1,"app-delivery-payment-report",[],null,null,null,s,i)),t.ob(1,114688,null,0,r,[b.a],null,null)],(function(l,n){l(n,1,0)}),null)}var g=t.lb("app-delivery-payment-report",r,h,{},{},[]),m=u("iInd");class C{}u.d(n,"OutstandingModuleNgFactory",(function(){return y}));var y=t.mb(e,[],(function(l){return t.yb([t.zb(512,t.j,t.X,[[8,[o.a,g]],[3,t.j],t.v]),t.zb(4608,a.l,a.k,[t.s,[2,a.s]]),t.zb(1073742336,a.b,a.b,[]),t.zb(1073742336,m.m,m.m,[[2,m.r],[2,m.k]]),t.zb(1073742336,C,C,[]),t.zb(1073742336,e,e,[]),t.zb(1024,m.i,(function(){return[[{path:"sell-report",component:r}]]}),[])])}))}}]);