(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{"JQi/":function(l,n,u){"use strict";u.r(n);var t=u("CcnG"),r=function(){return function(){}}(),e=u("pMnS"),i=u("ZYCi"),a=u("Ip0R"),c=function(){function l(l,n){this._orderService=l,this._config=n,this.limit=0,this.displayPages=new Array,this.currentPage=1,this.lastPage=1,this.orders=new Array,this.currentStatus=0}return l.prototype.ngOnInit=function(){this.limit=this._config.displayLimit,this.getOrderByStatus(0)},l.prototype.getOrderByStatus=function(l){var n=this;this.currentStatus=l,this._orderService.getOrdersByStatus({status:l,pageno:this.currentPage-1}).subscribe((function(l){if(200==l.status){n.lastPage=Math.ceil(l.count/n.limit),n.orders=l.data;for(var u=0;u<n.orders.length;u++){var t=JSON.parse(n.orders[u].thumbnail);n.orders[u].thumbnail=t.length>0?n._config.thumbnailUrl+t[0]:""}n.setPagination()}}))},l.prototype.changeStatus=function(l,n,u){var t=this;this._orderService.changeStatus({status:l,order_id:n.order_id}).subscribe((function(l){t._config.showMessage(l.message),200==l.status&&t.orders.splice(u,1)}))},l.prototype.setPagination=function(){var l;if(delete this.displayPages,this.displayPages=new Array,this.currentPage>5&&this.currentPage<this.lastPage-5){l=this.currentPage-5;for(var n=0;n<this.currentPage+5;n++)this.displayPages.push(l),l+=1}else if(this.currentPage<5)for(n=0;n<10&&(this.displayPages.push(n+1),n+1!=this.lastPage);n++);else for(n=this.lastPage-10;n<=this.lastPage;n++)n>0&&this.displayPages.push(n)},l.prototype.changePage=function(l){this.currentPage=l,this.getOrderByStatus(this.currentStatus)},l}(),s=u("dQhb"),o=u("t/Na"),b=function(){function l(l,n){this._config=l,this._http=n,this.service="order/",this._getOrderByStatusUrl=this._config.apiBaseUrl+this.service+"get-orders-by-status",this.changeStatusUrl=this._config.apiBaseUrl+this.service+"change-status",this._getOrderDetailUrl=this._config.apiBaseUrl+this.service+"get-order-detail"}return l.prototype.getOrdersByStatus=function(l){var n=this._config.getHeader();return this._http.post(this._getOrderByStatusUrl,l,n)},l.prototype.changeStatus=function(l){var n=this._config.getHeader();return this._http.post(this.changeStatusUrl,l,n)},l.prototype.getOrderDetail=function(l){var n=this._config.getHeader();return this._http.post(this._getOrderDetailUrl,l,n)},l.ngInjectableDef=t.Jb({factory:function(){return new l(t.Kb(s.a),t.Kb(o.c))},token:l,providedIn:"root"}),l}(),d=t.pb({encapsulation:0,styles:[["table[_ngcontent-%COMP%]{width:100%}.btn[_ngcontent-%COMP%]{margin-bottom:10px}"]],data:{}});function g(l){return t.Gb(0,[(l()(),t.rb(0,0,null,null,1,"button",[["class","btn btn-outline-success"]],null,[[null,"click"]],(function(l,n,u){var t=!0;return"click"===n&&(t=!1!==l.component.changeStatus(1,l.parent.context.$implicit,l.parent.context.index)&&t),t}),null,null)),(l()(),t.Fb(-1,null,[" Accept Order "]))],null,null)}function f(l){return t.Gb(0,[(l()(),t.rb(0,0,null,null,1,"button",[["class","btn btn-outline-success"]],null,null,null,null,null)),(l()(),t.Fb(-1,null,[" Dispatch Order "]))],null,null)}function h(l){return t.Gb(0,[(l()(),t.rb(0,0,null,null,1,"button",[["class","btn btn-outline-danger"]],null,[[null,"click"]],(function(l,n,u){var t=!0;return"click"===n&&(t=!1!==l.component.changeStatus(5,l.parent.context.$implicit,l.parent.context.index)&&t),t}),null,null)),(l()(),t.Fb(-1,null,[" Cancel Order "]))],null,null)}function p(l){return t.Gb(0,[(l()(),t.rb(0,0,null,null,26,"tr",[],null,null,null,null,null)),(l()(),t.rb(1,0,null,null,1,"td",[],null,null,null,null,null)),(l()(),t.Fb(2,null,["",""])),(l()(),t.rb(3,0,null,null,1,"td",[],null,null,null,null,null)),(l()(),t.Fb(4,null,["",""])),(l()(),t.rb(5,0,null,null,1,"td",[],null,null,null,null,null)),(l()(),t.Fb(6,null,["",""])),(l()(),t.rb(7,0,null,null,1,"td",[],null,null,null,null,null)),(l()(),t.Fb(8,null,["",""])),(l()(),t.rb(9,0,null,null,1,"td",[],null,null,null,null,null)),(l()(),t.Fb(10,null,["",""])),(l()(),t.rb(11,0,null,null,2,"td",[],null,null,null,null,null)),(l()(),t.rb(12,0,null,null,1,"a",[["target","_blank"]],[[8,"href",4]],null,null,null,null)),(l()(),t.rb(13,0,null,null,0,"img",[["height","50"],["width","50"]],[[8,"src",4]],null,null,null,null)),(l()(),t.rb(14,0,null,null,12,"td",[],null,null,null,null,null)),(l()(),t.rb(15,0,null,null,11,"div",[],null,null,null,null,null)),(l()(),t.rb(16,0,null,null,4,"a",[],[[1,"target",0],[8,"href",4]],[[null,"click"]],(function(l,n,u){var r=!0;return"click"===n&&(r=!1!==t.Cb(l,17).onClick(u.button,u.ctrlKey,u.metaKey,u.shiftKey)&&r),r}),null,null)),t.qb(17,671744,null,0,i.l,[i.k,i.a,a.g],{routerLink:[0,"routerLink"]},null),(l()(),t.rb(18,0,null,null,2,"button",[["class","btn btn-outline-primary"]],null,null,null,null,null)),(l()(),t.rb(19,0,null,null,1,"i",[["class","material-icons"]],null,null,null,null,null)),(l()(),t.Fb(-1,null,["visibility"])),(l()(),t.gb(16777216,null,null,1,null,g)),t.qb(22,16384,null,0,a.i,[t.O,t.L],{ngIf:[0,"ngIf"]},null),(l()(),t.gb(16777216,null,null,1,null,f)),t.qb(24,16384,null,0,a.i,[t.O,t.L],{ngIf:[0,"ngIf"]},null),(l()(),t.gb(16777216,null,null,1,null,h)),t.qb(26,16384,null,0,a.i,[t.O,t.L],{ngIf:[0,"ngIf"]},null)],(function(l,n){var u=n.component;l(n,17,0,t.vb(1,"../order-detail/",n.context.$implicit.order_id,"")),l(n,22,0,0==u.currentStatus),l(n,24,0,1==u.currentStatus),l(n,26,0,1==u.currentStatus||0==u.currentStatus)}),(function(l,n){l(n,2,0,n.context.$implicit.order_id),l(n,4,0,n.context.$implicit.name),l(n,6,0,n.context.$implicit.user_id),l(n,8,0,n.context.$implicit.collectable_amount),l(n,10,0,n.context.$implicit.added_date),l(n,12,0,n.context.$implicit.thumbnail),l(n,13,0,n.context.$implicit.thumbnail),l(n,16,0,t.Cb(n,17).target,t.Cb(n,17).href)}))}function m(l){return t.Gb(0,[(l()(),t.rb(0,0,null,null,18,"div",[["class","table-responsive"]],null,null,null,null,null)),(l()(),t.rb(1,0,null,null,17,"table",[["class","table product-overview"]],null,null,null,null,null)),(l()(),t.rb(2,0,null,null,14,"tr",[],null,null,null,null,null)),(l()(),t.rb(3,0,null,null,1,"th",[],null,null,null,null,null)),(l()(),t.Fb(-1,null,["Order ID"])),(l()(),t.rb(5,0,null,null,1,"th",[],null,null,null,null,null)),(l()(),t.Fb(-1,null,["Name"])),(l()(),t.rb(7,0,null,null,1,"th",[],null,null,null,null,null)),(l()(),t.Fb(-1,null,["User ID"])),(l()(),t.rb(9,0,null,null,1,"th",[],null,null,null,null,null)),(l()(),t.Fb(-1,null,["Amount"])),(l()(),t.rb(11,0,null,null,1,"th",[],null,null,null,null,null)),(l()(),t.Fb(-1,null,["Date Time"])),(l()(),t.rb(13,0,null,null,1,"th",[],null,null,null,null,null)),(l()(),t.Fb(-1,null,["Image"])),(l()(),t.rb(15,0,null,null,1,"th",[],null,null,null,null,null)),(l()(),t.Fb(-1,null,["Action"])),(l()(),t.gb(16777216,null,null,1,null,p)),t.qb(18,278528,null,0,a.h,[t.O,t.L,t.s],{ngForOf:[0,"ngForOf"]},null)],(function(l,n){l(n,18,0,n.component.orders)}),null)}function v(l){return t.Gb(0,[(l()(),t.rb(0,0,null,null,1,"div",[["class","error"]],null,null,null,null,null)),(l()(),t.Fb(-1,null,[" No Orders Found. "]))],null,null)}function k(l){return t.Gb(0,[(l()(),t.rb(0,0,null,null,2,"li",[["class","page-item"]],null,[[null,"click"]],(function(l,n,u){var t=!0;return"click"===n&&(t=!1!==l.component.changePage(1)&&t),t}),null,null)),(l()(),t.rb(1,0,null,null,1,"a",[["class","page-link"]],null,null,null,null,null)),(l()(),t.Fb(-1,null,["First"]))],null,null)}function y(l){return t.Gb(0,[(l()(),t.rb(0,0,null,null,2,"li",[["class","page-item"]],null,[[null,"click"]],(function(l,n,u){var t=!0,r=l.component;return"click"===n&&(t=!1!==r.changePage(r.currentPage-1)&&t),t}),null,null)),(l()(),t.rb(1,0,null,null,1,"a",[["class","page-link"]],null,null,null,null,null)),(l()(),t.rb(2,0,null,null,0,"i",[["class","ion-md-skip-backward"]],null,null,null,null,null))],null,null)}function O(l){return t.Gb(0,[(l()(),t.rb(0,0,null,null,2,"li",[["class","page-item"]],[[2,"active",null]],[[null,"click"]],(function(l,n,u){var t=!0;return"click"===n&&(t=!1!==l.component.changePage(l.context.$implicit)&&t),t}),null,null)),(l()(),t.rb(1,0,null,null,1,"a",[["class","page-link"]],null,null,null,null,null)),(l()(),t.Fb(2,null,["",""]))],null,(function(l,n){l(n,0,0,n.context.$implicit==n.component.currentPage),l(n,2,0,n.context.$implicit)}))}function _(l){return t.Gb(0,[(l()(),t.rb(0,0,null,null,2,"li",[["class","page-item"]],null,[[null,"click"]],(function(l,n,u){var t=!0,r=l.component;return"click"===n&&(t=!1!==r.changePage(r.currentPage+1)&&t),t}),null,null)),(l()(),t.rb(1,0,null,null,1,"a",[["class","page-link"]],null,null,null,null,null)),(l()(),t.rb(2,0,null,null,0,"i",[["class","ion-md-skip-forward"]],null,null,null,null,null))],null,null)}function P(l){return t.Gb(0,[(l()(),t.rb(0,0,null,null,2,"li",[["class","page-item"]],null,[[null,"click"]],(function(l,n,u){var t=!0,r=l.component;return"click"===n&&(t=!1!==r.changePage(r.lastPage)&&t),t}),null,null)),(l()(),t.rb(1,0,null,null,1,"a",[["class","page-link"]],null,null,null,null,null)),(l()(),t.Fb(-1,null,["Last"]))],null,null)}function F(l){return t.Gb(0,[(l()(),t.rb(0,0,null,null,12,"div",[["class","card-footer"]],null,null,null,null,null)),(l()(),t.rb(1,0,null,null,11,"nav",[["aria-label","Page"]],null,null,null,null,null)),(l()(),t.rb(2,0,null,null,10,"ul",[["class","pagination justify-content-center"]],null,null,null,null,null)),(l()(),t.gb(16777216,null,null,1,null,k)),t.qb(4,16384,null,0,a.i,[t.O,t.L],{ngIf:[0,"ngIf"]},null),(l()(),t.gb(16777216,null,null,1,null,y)),t.qb(6,16384,null,0,a.i,[t.O,t.L],{ngIf:[0,"ngIf"]},null),(l()(),t.gb(16777216,null,null,1,null,O)),t.qb(8,278528,null,0,a.h,[t.O,t.L,t.s],{ngForOf:[0,"ngForOf"]},null),(l()(),t.gb(16777216,null,null,1,null,_)),t.qb(10,16384,null,0,a.i,[t.O,t.L],{ngIf:[0,"ngIf"]},null),(l()(),t.gb(16777216,null,null,1,null,P)),t.qb(12,16384,null,0,a.i,[t.O,t.L],{ngIf:[0,"ngIf"]},null)],(function(l,n){var u=n.component;l(n,4,0,1!=u.currentPage),l(n,6,0,1!=u.currentPage),l(n,8,0,u.displayPages),l(n,10,0,u.currentPage!=u.lastPage),l(n,12,0,u.currentPage!=u.lastPage)}),null)}function S(l){return t.Gb(0,[(l()(),t.rb(0,0,null,null,45,"div",[["class","page-wrapper"]],null,null,null,null,null)),(l()(),t.rb(1,0,null,null,44,"div",[["class","container-fluid"]],null,null,null,null,null)),(l()(),t.rb(2,0,null,null,10,"div",[["class","row page-titles"]],null,null,null,null,null)),(l()(),t.rb(3,0,null,null,2,"div",[["class","col-md-5 align-self-center"]],null,null,null,null,null)),(l()(),t.rb(4,0,null,null,1,"h4",[["class","text-themecolor"]],null,null,null,null,null)),(l()(),t.Fb(-1,null,["Manage Order"])),(l()(),t.rb(6,0,null,null,6,"div",[["class","col-md-7 align-self-center text-right"]],null,null,null,null,null)),(l()(),t.rb(7,0,null,null,5,"div",[["class","d-flex justify-content-end align-items-center"]],null,null,null,null,null)),(l()(),t.rb(8,0,null,null,4,"ol",[["class","breadcrumb"]],null,null,null,null,null)),(l()(),t.rb(9,0,null,null,1,"li",[["class","breadcrumb-item"]],null,null,null,null,null)),(l()(),t.Fb(-1,null,["Home"])),(l()(),t.rb(11,0,null,null,1,"li",[["class","breadcrumb-item active"]],null,null,null,null,null)),(l()(),t.Fb(-1,null,["Manage Order"])),(l()(),t.rb(13,0,null,null,32,"div",[["class","row"]],null,null,null,null,null)),(l()(),t.rb(14,0,null,null,31,"div",[["class","col-lg-12"]],null,null,null,null,null)),(l()(),t.rb(15,0,null,null,30,"div",[["class","card"]],null,null,null,null,null)),(l()(),t.rb(16,0,null,null,27,"div",[["class","card-body"]],null,null,null,null,null)),(l()(),t.rb(17,0,null,null,1,"h5",[["class","card-title"]],null,null,null,null,null)),(l()(),t.Fb(-1,null,["Orders :-"])),(l()(),t.rb(19,0,null,null,20,"ul",[["class","nav nav-tabs"]],null,null,null,null,null)),(l()(),t.rb(20,0,null,null,3,"li",[["class","nav-item"]],null,[[null,"click"]],(function(l,n,u){var t=!0;return"click"===n&&(t=!1!==l.component.getOrderByStatus(0)&&t),t}),null,null)),(l()(),t.rb(21,0,null,null,2,"a",[["class","nav-link"],["routerLink","."]],[[2,"active",null],[1,"target",0],[8,"href",4]],[[null,"click"]],(function(l,n,u){var r=!0;return"click"===n&&(r=!1!==t.Cb(l,22).onClick(u.button,u.ctrlKey,u.metaKey,u.shiftKey)&&r),r}),null,null)),t.qb(22,671744,null,0,i.l,[i.k,i.a,a.g],{routerLink:[0,"routerLink"]},null),(l()(),t.Fb(-1,null,["Recieved Orders"])),(l()(),t.rb(24,0,null,null,3,"li",[["class","nav-item"]],[[2,"active",null]],[[null,"click"]],(function(l,n,u){var t=!0;return"click"===n&&(t=!1!==l.component.getOrderByStatus(1)&&t),t}),null,null)),(l()(),t.rb(25,0,null,null,2,"a",[["class","nav-link"],["routerLink","."]],[[1,"target",0],[8,"href",4]],[[null,"click"]],(function(l,n,u){var r=!0;return"click"===n&&(r=!1!==t.Cb(l,26).onClick(u.button,u.ctrlKey,u.metaKey,u.shiftKey)&&r),r}),null,null)),t.qb(26,671744,null,0,i.l,[i.k,i.a,a.g],{routerLink:[0,"routerLink"]},null),(l()(),t.Fb(-1,null,["Confirmed Order"])),(l()(),t.rb(28,0,null,null,3,"li",[["class","nav-item"]],[[2,"active",null]],[[null,"click"]],(function(l,n,u){var t=!0;return"click"===n&&(t=!1!==l.component.getOrderByStatus(2)&&t),t}),null,null)),(l()(),t.rb(29,0,null,null,2,"a",[["class","nav-link"],["routerLink","."]],[[1,"target",0],[8,"href",4]],[[null,"click"]],(function(l,n,u){var r=!0;return"click"===n&&(r=!1!==t.Cb(l,30).onClick(u.button,u.ctrlKey,u.metaKey,u.shiftKey)&&r),r}),null,null)),t.qb(30,671744,null,0,i.l,[i.k,i.a,a.g],{routerLink:[0,"routerLink"]},null),(l()(),t.Fb(-1,null,["Shipped Order"])),(l()(),t.rb(32,0,null,null,3,"li",[["class","nav-item"]],[[2,"active",null]],[[null,"click"]],(function(l,n,u){var t=!0;return"click"===n&&(t=!1!==l.component.getOrderByStatus(3)&&t),t}),null,null)),(l()(),t.rb(33,0,null,null,2,"a",[["class","nav-link"],["routerLink","."]],[[1,"target",0],[8,"href",4]],[[null,"click"]],(function(l,n,u){var r=!0;return"click"===n&&(r=!1!==t.Cb(l,34).onClick(u.button,u.ctrlKey,u.metaKey,u.shiftKey)&&r),r}),null,null)),t.qb(34,671744,null,0,i.l,[i.k,i.a,a.g],{routerLink:[0,"routerLink"]},null),(l()(),t.Fb(-1,null,["Delivered Order"])),(l()(),t.rb(36,0,null,null,3,"li",[["class","nav-item"]],[[2,"active",null]],[[null,"click"]],(function(l,n,u){var t=!0;return"click"===n&&(t=!1!==l.component.getOrderByStatus(5)&&t),t}),null,null)),(l()(),t.rb(37,0,null,null,2,"a",[["class","nav-link"],["routerLink","."]],[[1,"target",0],[8,"href",4]],[[null,"click"]],(function(l,n,u){var r=!0;return"click"===n&&(r=!1!==t.Cb(l,38).onClick(u.button,u.ctrlKey,u.metaKey,u.shiftKey)&&r),r}),null,null)),t.qb(38,671744,null,0,i.l,[i.k,i.a,a.g],{routerLink:[0,"routerLink"]},null),(l()(),t.Fb(-1,null,["Cancelled Order"])),(l()(),t.gb(16777216,null,null,1,null,m)),t.qb(41,16384,null,0,a.i,[t.O,t.L],{ngIf:[0,"ngIf"]},null),(l()(),t.gb(16777216,null,null,1,null,v)),t.qb(43,16384,null,0,a.i,[t.O,t.L],{ngIf:[0,"ngIf"]},null),(l()(),t.gb(16777216,null,null,1,null,F)),t.qb(45,16384,null,0,a.i,[t.O,t.L],{ngIf:[0,"ngIf"]},null)],(function(l,n){var u=n.component;l(n,22,0,"."),l(n,26,0,"."),l(n,30,0,"."),l(n,34,0,"."),l(n,38,0,"."),l(n,41,0,u.orders.length>0),l(n,43,0,u.orders.length<1),l(n,45,0,u.orders.length>0)}),(function(l,n){var u=n.component;l(n,21,0,0==u.currentStatus,t.Cb(n,22).target,t.Cb(n,22).href),l(n,24,0,1==u.currentStatus),l(n,25,0,t.Cb(n,26).target,t.Cb(n,26).href),l(n,28,0,2==u.currentStatus),l(n,29,0,t.Cb(n,30).target,t.Cb(n,30).href),l(n,32,0,3==u.currentStatus),l(n,33,0,t.Cb(n,34).target,t.Cb(n,34).href),l(n,36,0,4==u.currentStatus),l(n,37,0,t.Cb(n,38).target,t.Cb(n,38).href)}))}function C(l){return t.Gb(0,[(l()(),t.rb(0,0,null,null,1,"app-manage-order",[],null,null,null,S,d)),t.qb(1,114688,null,0,c,[b,s.a],null,null)],(function(l,n){l(n,1,0)}),null)}var L=t.nb("app-manage-order",c,C,{},{},[]),I=function(){function l(l,n,u){this._orderService=l,this._route=n,this._config=u,this.order={},this.order_details=new Array}return l.prototype.ngOnInit=function(){var l=this;this._route.params.subscribe((function(n){l._orderService.getOrderDetail({order_id:n.id}).subscribe((function(n){if(console.log(n),200==n.status){var u=n;l.order=u.order[0],l.order_details=u.order_detail;for(var t=0;t<l.order_details.length;t++)l.order_details[t].variant=JSON.parse(l.order_details[t].variant);l.order.name=l.order_details[0].variant.name}else l._config.showMessage(n.message)}),(function(n){l._config.showMessage("Order detail not found")}))}))},l}(),w=t.pb({encapsulation:0,styles:[[""]],data:{}});function x(l){return t.Gb(0,[(l()(),t.rb(0,0,null,null,20,"div",[["class","page-wrapper"]],null,null,null,null,null)),(l()(),t.rb(1,0,null,null,19,"div",[["class","container-fluid"]],null,null,null,null,null)),(l()(),t.rb(2,0,null,null,10,"div",[["class","row page-titles"]],null,null,null,null,null)),(l()(),t.rb(3,0,null,null,2,"div",[["class","col-md-5 align-self-center"]],null,null,null,null,null)),(l()(),t.rb(4,0,null,null,1,"h4",[["class","text-themecolor"]],null,null,null,null,null)),(l()(),t.Fb(-1,null,["Order Detail"])),(l()(),t.rb(6,0,null,null,6,"div",[["class","col-md-7 align-self-center text-right"]],null,null,null,null,null)),(l()(),t.rb(7,0,null,null,5,"div",[["class","d-flex justify-content-end align-items-center"]],null,null,null,null,null)),(l()(),t.rb(8,0,null,null,4,"ol",[["class","breadcrumb"]],null,null,null,null,null)),(l()(),t.rb(9,0,null,null,1,"li",[["class","breadcrumb-item"]],null,null,null,null,null)),(l()(),t.Fb(-1,null,["Home"])),(l()(),t.rb(11,0,null,null,1,"li",[["class","breadcrumb-item active"]],null,null,null,null,null)),(l()(),t.Fb(-1,null,["Order Detail"])),(l()(),t.rb(13,0,null,null,7,"div",[["class","row"]],null,null,null,null,null)),(l()(),t.rb(14,0,null,null,6,"div",[["class","col-lg-12"]],null,null,null,null,null)),(l()(),t.rb(15,0,null,null,5,"div",[["class","card"]],null,null,null,null,null)),(l()(),t.rb(16,0,null,null,4,"div",[["class","card-body"]],null,null,null,null,null)),(l()(),t.rb(17,0,null,null,1,"h5",[["class","card-title"]],null,null,null,null,null)),(l()(),t.Fb(18,null,["Order Id : ",""])),(l()(),t.rb(19,0,null,null,1,"div",[],null,null,null,null,null)),(l()(),t.Fb(20,null,["Name : ",""]))],null,(function(l,n){var u=n.component;l(n,18,0,u.order.order_id),l(n,20,0,u.order.name)}))}function B(l){return t.Gb(0,[(l()(),t.rb(0,0,null,null,1,"app-order-detail",[],null,null,null,x,w)),t.qb(1,114688,null,0,I,[b,i.a,s.a],null,null)],(function(l,n){l(n,1,0)}),null)}var q=t.nb("app-order-detail",I,B,{},{},[]),K=function(){return function(){}}();u.d(n,"OrderModuleNgFactory",(function(){return G}));var G=t.ob(r,[],(function(l){return t.Ab([t.Bb(512,t.j,t.Z,[[8,[e.a,L,q]],[3,t.j],t.x]),t.Bb(4608,a.k,a.j,[t.u,[2,a.r]]),t.Bb(1073742336,a.b,a.b,[]),t.Bb(1073742336,i.m,i.m,[[2,i.r],[2,i.k]]),t.Bb(1073742336,K,K,[]),t.Bb(1073742336,r,r,[]),t.Bb(1024,i.i,(function(){return[[{path:"manage-order",component:c},{path:"order-detail/:id",component:I}]]}),[])])}))}}]);