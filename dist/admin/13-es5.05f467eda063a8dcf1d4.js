(window.webpackJsonp=window.webpackJsonp||[]).push([[13],{cgMK:function(l,n,u){"use strict";u.r(n);var e=u("CcnG"),t=function(){return function(){}}(),i=u("pMnS"),r=u("gIcY"),a=u("Ip0R"),s=function(){function l(l,n){this._config=l,this._mobileService=n,this.editBit=!1,this.brands=new Array,this.cancelMobile()}return l.prototype.ngOnInit=function(){var l=this;this._mobileService.getBrand().subscribe((function(n){200==n.status&&(l.brands=n.data,l.selectedBrand=l.brands[0].brand_id,l.setMobiles())}))},l.prototype.setMobiles=function(){var l=this;this._mobileService.getMobiles(this.selectedBrand).subscribe((function(n){200==n.status&&(l.mobiles=n.data)}),(function(n){alert(l._config.err)}))},l.prototype.cancelMobile=function(){this.mobile={name:"",type:0},this.editBit=!1},l.prototype.editMobile=function(l){this.mobile.id=l.model_id,this.mobile.name=l.model_name,this.mobile.brand_id=this.selectedBrand,this.mobile.type=l.type,this.editBit=!0},l.prototype.addMobile=function(){var l=this;if(this.mobile.brand_id=this.selectedBrand,console.log(this.mobile),""!=this.mobile.name)if(this.editBit)this._mobileService.updateMobile(this.mobile).subscribe((function(n){alert("Mobile updated successfully"),l.cancelMobile(),l.setMobiles()}),(function(l){alert("Mobile is not updated. Please try again later.")}));else{var n=this.brands.find((function(n){return n.brand_id==l.selectedBrand}));this.mobile.name=n.name+" "+this.mobile.name,this._mobileService.addMobile(this.mobile).subscribe((function(n){alert("Mobile is added successfully."),l.cancelMobile(),l.setMobiles()}),(function(l){alert("Mobile is not added. Please try again later.")}))}else alert("Enter the data properly")},l}(),o=u("dQhb"),b=u("t/Na"),c=function(){function l(l,n){this._config=l,this._http=n,this.service="mobile/",this._getMobileUrl=this._config.apiBaseUrl+this.service+"get-mobiles/",this._addMobileUrl=this._config.apiBaseUrl+this.service+"add-mobile",this._updateMobileUrl=this._config.apiBaseUrl+this.service+"update-mobile",this._getBrandUrl=this._config.apiBaseUrl+this.service+"mobile-brand",this._addBrandUrl=this._config.apiBaseUrl+this.service+"add-brand",this._updateBrandUrl=this._config.apiBaseUrl+this.service+"update-brand"}return l.prototype.getMobiles=function(l){var n=this._config.getHeader();return this._http.get(this._getMobileUrl+l,n)},l.prototype.addMobile=function(l){var n=this._config.getHeader();return this._http.post(this._addMobileUrl,l,n)},l.prototype.updateMobile=function(l){var n=this._config.getHeader();return this._http.put(this._updateMobileUrl,l,n)},l.prototype.getBrand=function(){var l=this._config.getHeader();return this._http.get(this._getBrandUrl,l)},l.prototype.addBrand=function(l){var n=this._config.getHeader();return this._http.post(this._addBrandUrl,l,n)},l.prototype.updateBrand=function(l){var n=this._config.getHeader();return this._http.put(this._updateBrandUrl,l,n)},l.ngInjectableDef=e.Mb({factory:function(){return new l(e.Nb(o.a),e.Nb(b.c))},token:l,providedIn:"root"}),l}(),d=e.pb({encapsulation:0,styles:[["i[_ngcontent-%COMP%]{cursor:pointer}"]],data:{}});function g(l){return e.Jb(0,[(l()(),e.rb(0,0,null,null,3,"option",[],null,null,null,null,null)),e.qb(1,147456,null,0,r.m,[e.k,e.D,[2,r.q]],{value:[0,"value"]},null),e.qb(2,147456,null,0,r.u,[e.k,e.D,[8,null]],{value:[0,"value"]},null),(l()(),e.Hb(3,null,["",""]))],(function(l,n){l(n,1,0,n.context.$implicit.brand_id),l(n,2,0,n.context.$implicit.brand_id)}),(function(l,n){l(n,3,0,n.context.$implicit.name)}))}function p(l){return e.Jb(0,[(l()(),e.rb(0,0,null,null,7,"tr",[],null,null,null,null,null)),(l()(),e.rb(1,0,null,null,1,"td",[],null,null,null,null,null)),(l()(),e.Hb(2,null,["",""])),(l()(),e.rb(3,0,null,null,1,"td",[],null,null,null,null,null)),(l()(),e.Hb(4,null,["",""])),(l()(),e.rb(5,0,null,null,2,"td",[],null,null,null,null,null)),(l()(),e.rb(6,0,null,null,1,"i",[["class","material-icons"]],null,[[null,"click"]],(function(l,n,u){var e=!0;return"click"===n&&(e=!1!==l.component.editMobile(l.context.$implicit)&&e),e}),null,null)),(l()(),e.Hb(-1,null,["edit"]))],null,(function(l,n){l(n,2,0,n.context.$implicit.model_id),l(n,4,0,n.context.$implicit.model_name)}))}function m(l){return e.Jb(0,[(l()(),e.rb(0,0,null,null,92,"div",[["class","page-wrapper"]],null,null,null,null,null)),(l()(),e.rb(1,0,null,null,91,"div",[["class","container-fluid"]],null,null,null,null,null)),(l()(),e.rb(2,0,null,null,10,"div",[["class","row page-titles"]],null,null,null,null,null)),(l()(),e.rb(3,0,null,null,2,"div",[["class","col-md-5 align-self-center"]],null,null,null,null,null)),(l()(),e.rb(4,0,null,null,1,"h4",[["class","text-themecolor"]],null,null,null,null,null)),(l()(),e.Hb(-1,null,["Add Mobiles"])),(l()(),e.rb(6,0,null,null,6,"div",[["class","col-md-7 align-self-center text-right"]],null,null,null,null,null)),(l()(),e.rb(7,0,null,null,5,"div",[["class","d-flex justify-content-end align-items-center"]],null,null,null,null,null)),(l()(),e.rb(8,0,null,null,4,"ol",[["class","breadcrumb"]],null,null,null,null,null)),(l()(),e.rb(9,0,null,null,1,"li",[["class","breadcrumb-item"]],null,null,null,null,null)),(l()(),e.Hb(-1,null,["Home"])),(l()(),e.rb(11,0,null,null,1,"li",[["class","breadcrumb-item active"]],null,null,null,null,null)),(l()(),e.Hb(-1,null,["Add Mobiles"])),(l()(),e.rb(13,0,null,null,79,"div",[["class","row"]],null,null,null,null,null)),(l()(),e.rb(14,0,null,null,78,"div",[["class","col-lg-12"]],null,null,null,null,null)),(l()(),e.rb(15,0,null,null,77,"div",[["class","card"]],null,null,null,null,null)),(l()(),e.rb(16,0,null,null,76,"div",[["class","card-body"]],null,null,null,null,null)),(l()(),e.rb(17,0,null,null,57,"form",[["action","#"],["novalidate",""]],[[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"submit"],[null,"reset"]],(function(l,n,u){var t=!0;return"submit"===n&&(t=!1!==e.Cb(l,19).onSubmit(u)&&t),"reset"===n&&(t=!1!==e.Cb(l,19).onReset()&&t),t}),null,null)),e.qb(18,16384,null,0,r.v,[],null,null),e.qb(19,4210688,null,0,r.k,[[8,null],[8,null]],null,null),e.Fb(2048,null,r.c,null,[r.k]),e.qb(21,16384,null,0,r.j,[[4,r.c]],null,null),(l()(),e.rb(22,0,null,null,47,"div",[["class","form-body"]],null,null,null,null,null)),(l()(),e.rb(23,0,null,null,1,"h5",[["class","card-title"]],null,null,null,null,null)),(l()(),e.Hb(-1,null,["About Mobiles"])),(l()(),e.rb(25,0,null,null,0,"hr",[],null,null,null,null,null)),(l()(),e.rb(26,0,null,null,12,"div",[["class","row"]],null,null,null,null,null)),(l()(),e.rb(27,0,null,null,11,"div",[["class","col-md-6"]],null,null,null,null,null)),(l()(),e.rb(28,0,null,null,10,"div",[["class","form-group"]],null,null,null,null,null)),(l()(),e.rb(29,0,null,null,1,"label",[["class","control-label"]],null,null,null,null,null)),(l()(),e.Hb(-1,null,["Mobile Brand"])),(l()(),e.rb(31,0,null,null,7,"select",[["class","form-control"],["name","brands"]],[[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"ngModelChange"],[null,"change"],[null,"blur"]],(function(l,n,u){var t=!0,i=l.component;return"change"===n&&(t=!1!==e.Cb(l,32).onChange(u.target.value)&&t),"blur"===n&&(t=!1!==e.Cb(l,32).onTouched()&&t),"ngModelChange"===n&&(t=!1!==(i.selectedBrand=u)&&t),"change"===n&&(t=!1!==i.setMobiles()&&t),t}),null,null)),e.qb(32,16384,null,0,r.q,[e.D,e.k],null,null),e.Fb(1024,null,r.g,(function(l){return[l]}),[r.q]),e.qb(34,671744,null,0,r.l,[[2,r.c],[8,null],[8,null],[6,r.g]],{name:[0,"name"],model:[1,"model"]},{update:"ngModelChange"}),e.Fb(2048,null,r.h,null,[r.l]),e.qb(36,16384,null,0,r.i,[[4,r.h]],null,null),(l()(),e.gb(16777216,null,null,1,null,g)),e.qb(38,278528,null,0,a.i,[e.O,e.L,e.s],{ngForOf:[0,"ngForOf"]},null),(l()(),e.rb(39,0,null,null,10,"div",[["class","row"]],null,null,null,null,null)),(l()(),e.rb(40,0,null,null,9,"div",[["class","col-md-6"]],null,null,null,null,null)),(l()(),e.rb(41,0,null,null,8,"div",[["class","form-group"]],null,null,null,null,null)),(l()(),e.rb(42,0,null,null,1,"label",[["class","control-label"]],null,null,null,null,null)),(l()(),e.Hb(-1,null,["Mobile Name"])),(l()(),e.rb(44,0,null,null,5,"input",[["class","form-control"],["id","firstName"],["name","mobile_name"],["placeholder","Mobile Name"],["type","text"]],[[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"ngModelChange"],[null,"input"],[null,"blur"],[null,"compositionstart"],[null,"compositionend"]],(function(l,n,u){var t=!0,i=l.component;return"input"===n&&(t=!1!==e.Cb(l,45)._handleInput(u.target.value)&&t),"blur"===n&&(t=!1!==e.Cb(l,45).onTouched()&&t),"compositionstart"===n&&(t=!1!==e.Cb(l,45)._compositionStart()&&t),"compositionend"===n&&(t=!1!==e.Cb(l,45)._compositionEnd(u.target.value)&&t),"ngModelChange"===n&&(t=!1!==(i.mobile.name=u)&&t),t}),null,null)),e.qb(45,16384,null,0,r.d,[e.D,e.k,[2,r.a]],null,null),e.Fb(1024,null,r.g,(function(l){return[l]}),[r.d]),e.qb(47,671744,null,0,r.l,[[2,r.c],[8,null],[8,null],[6,r.g]],{name:[0,"name"],model:[1,"model"]},{update:"ngModelChange"}),e.Fb(2048,null,r.h,null,[r.l]),e.qb(49,16384,null,0,r.i,[[4,r.h]],null,null),(l()(),e.rb(50,0,null,null,18,"div",[["class","row"]],null,null,null,null,null)),(l()(),e.rb(51,0,null,null,17,"div",[["class","col-md-6"]],null,null,null,null,null)),(l()(),e.rb(52,0,null,null,16,"div",[["class","form-group"]],null,null,null,null,null)),(l()(),e.rb(53,0,null,null,1,"label",[["class","control-label"]],null,null,null,null,null)),(l()(),e.Hb(-1,null,["Type"])),(l()(),e.rb(55,0,null,null,13,"select",[["class","form-control"],["name","type"]],[[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"ngModelChange"],[null,"change"],[null,"blur"]],(function(l,n,u){var t=!0,i=l.component;return"change"===n&&(t=!1!==e.Cb(l,56).onChange(u.target.value)&&t),"blur"===n&&(t=!1!==e.Cb(l,56).onTouched()&&t),"ngModelChange"===n&&(t=!1!==(i.mobile.type=u)&&t),t}),null,null)),e.qb(56,16384,null,0,r.q,[e.D,e.k],null,null),e.Fb(1024,null,r.g,(function(l){return[l]}),[r.q]),e.qb(58,671744,null,0,r.l,[[2,r.c],[8,null],[8,null],[6,r.g]],{name:[0,"name"],model:[1,"model"]},{update:"ngModelChange"}),e.Fb(2048,null,r.h,null,[r.l]),e.qb(60,16384,null,0,r.i,[[4,r.h]],null,null),(l()(),e.rb(61,0,null,null,3,"option",[],null,null,null,null,null)),e.qb(62,147456,null,0,r.m,[e.k,e.D,[2,r.q]],{value:[0,"value"]},null),e.qb(63,147456,null,0,r.u,[e.k,e.D,[8,null]],{value:[0,"value"]},null),(l()(),e.Hb(-1,null,["Mobile"])),(l()(),e.rb(65,0,null,null,3,"option",[],null,null,null,null,null)),e.qb(66,147456,null,0,r.m,[e.k,e.D,[2,r.q]],{value:[0,"value"]},null),e.qb(67,147456,null,0,r.u,[e.k,e.D,[8,null]],{value:[0,"value"]},null),(l()(),e.Hb(-1,null,["Others"])),(l()(),e.rb(69,0,null,null,0,"hr",[],null,null,null,null,null)),(l()(),e.rb(70,0,null,null,4,"div",[["class","form-actions m-t-40"]],null,null,null,null,null)),(l()(),e.rb(71,0,null,null,1,"button",[["class","btn btn-success"],["type","submit"]],null,[[null,"click"]],(function(l,n,u){var e=!0;return"click"===n&&(e=!1!==l.component.addMobile()&&e),e}),null,null)),(l()(),e.Hb(-1,null,[" Save"])),(l()(),e.rb(73,0,null,null,1,"button",[["class","btn btn-dark"],["type","button"]],null,[[null,"click"]],(function(l,n,u){var e=!0;return"click"===n&&(e=!1!==l.component.cancelMobile()&&e),e}),null,null)),(l()(),e.Hb(-1,null,["Cancel"])),(l()(),e.rb(75,0,null,null,0,"hr",[],null,null,null,null,null)),(l()(),e.rb(76,0,null,null,3,"div",[["class","form-body"]],null,null,null,null,null)),(l()(),e.rb(77,0,null,null,1,"h5",[["class","card-title"]],null,null,null,null,null)),(l()(),e.Hb(-1,null,["Mobiles"])),(l()(),e.rb(79,0,null,null,0,"hr",[],null,null,null,null,null)),(l()(),e.rb(80,0,null,null,12,"div",[["class","table-responsive"]],null,null,null,null,null)),(l()(),e.rb(81,0,null,null,11,"table",[["class","table product-overview"],["id","myTable"]],null,null,null,null,null)),(l()(),e.rb(82,0,null,null,7,"thead",[],null,null,null,null,null)),(l()(),e.rb(83,0,null,null,6,"tr",[],null,null,null,null,null)),(l()(),e.rb(84,0,null,null,1,"th",[],null,null,null,null,null)),(l()(),e.Hb(-1,null,["Mobile Id"])),(l()(),e.rb(86,0,null,null,1,"th",[],null,null,null,null,null)),(l()(),e.Hb(-1,null,["Name"])),(l()(),e.rb(88,0,null,null,1,"th",[],null,null,null,null,null)),(l()(),e.Hb(-1,null,["Action"])),(l()(),e.rb(90,0,null,null,2,"tbody",[],null,null,null,null,null)),(l()(),e.gb(16777216,null,null,1,null,p)),e.qb(92,278528,null,0,a.i,[e.O,e.L,e.s],{ngForOf:[0,"ngForOf"]},null)],(function(l,n){var u=n.component;l(n,34,0,"brands",u.selectedBrand),l(n,38,0,u.brands),l(n,47,0,"mobile_name",u.mobile.name),l(n,58,0,"type",u.mobile.type),l(n,62,0,0),l(n,63,0,0),l(n,66,0,1),l(n,67,0,1),l(n,92,0,u.mobiles)}),(function(l,n){l(n,17,0,e.Cb(n,21).ngClassUntouched,e.Cb(n,21).ngClassTouched,e.Cb(n,21).ngClassPristine,e.Cb(n,21).ngClassDirty,e.Cb(n,21).ngClassValid,e.Cb(n,21).ngClassInvalid,e.Cb(n,21).ngClassPending),l(n,31,0,e.Cb(n,36).ngClassUntouched,e.Cb(n,36).ngClassTouched,e.Cb(n,36).ngClassPristine,e.Cb(n,36).ngClassDirty,e.Cb(n,36).ngClassValid,e.Cb(n,36).ngClassInvalid,e.Cb(n,36).ngClassPending),l(n,44,0,e.Cb(n,49).ngClassUntouched,e.Cb(n,49).ngClassTouched,e.Cb(n,49).ngClassPristine,e.Cb(n,49).ngClassDirty,e.Cb(n,49).ngClassValid,e.Cb(n,49).ngClassInvalid,e.Cb(n,49).ngClassPending),l(n,55,0,e.Cb(n,60).ngClassUntouched,e.Cb(n,60).ngClassTouched,e.Cb(n,60).ngClassPristine,e.Cb(n,60).ngClassDirty,e.Cb(n,60).ngClassValid,e.Cb(n,60).ngClassInvalid,e.Cb(n,60).ngClassPending)}))}function h(l){return e.Jb(0,[(l()(),e.rb(0,0,null,null,1,"app-add-mobile",[],null,null,null,m,d)),e.qb(1,114688,null,0,s,[o.a,c],null,null)],(function(l,n){l(n,1,0)}),null)}var f=e.nb("app-add-mobile",s,h,{},{},[]),v=function(){function l(l){this._mobileService=l,this.allBrand=new Array}return l.prototype.ngOnInit=function(){this.getBrands()},l.prototype.getBrands=function(){var l=this;this._mobileService.getBrand().subscribe((function(n){(n.status=200)&&(l.allBrand=n.data)}))},l.prototype.addBrand=function(){var l=this,n=prompt("Add Brand Name","");null!=n&&this._mobileService.addBrand({name:n}).subscribe((function(n){200==n.status?l.allBrand=n.data:alert(n.message)}))},l.prototype.updateBrand=function(l){var n=this,u=prompt("Update Brand Name",l.name);null!=u&&this._mobileService.updateBrand({id:l.brand_id,name:u}).subscribe((function(l){200==l.status?n.allBrand=l.data:alert(l.message)}))},l}(),C=e.pb({encapsulation:0,styles:[[".form-body[_ngcontent-%COMP%]{display:-webkit-box;display:flex}.mr-left[_ngcontent-%COMP%]{margin-left:auto!important}i[_ngcontent-%COMP%]{cursor:pointer}"]],data:{}});function _(l){return e.Jb(0,[(l()(),e.rb(0,0,null,null,7,"tr",[],null,null,null,null,null)),(l()(),e.rb(1,0,null,null,1,"td",[],null,null,null,null,null)),(l()(),e.Hb(2,null,["",""])),(l()(),e.rb(3,0,null,null,1,"td",[],null,null,null,null,null)),(l()(),e.Hb(4,null,["",""])),(l()(),e.rb(5,0,null,null,2,"td",[],null,null,null,null,null)),(l()(),e.rb(6,0,null,null,1,"i",[["class","material-icons"]],null,[[null,"click"]],(function(l,n,u){var e=!0;return"click"===n&&(e=!1!==l.component.updateBrand(l.context.$implicit)&&e),e}),null,null)),(l()(),e.Hb(-1,null,["edit"]))],null,(function(l,n){l(n,2,0,n.context.$implicit.brand_id),l(n,4,0,n.context.$implicit.name)}))}function M(l){return e.Jb(0,[(l()(),e.rb(0,0,null,null,36,"div",[["class","page-wrapper"]],null,null,null,null,null)),(l()(),e.rb(1,0,null,null,35,"div",[["class","container-fluid"]],null,null,null,null,null)),(l()(),e.rb(2,0,null,null,10,"div",[["class","row page-titles"]],null,null,null,null,null)),(l()(),e.rb(3,0,null,null,2,"div",[["class","col-md-5 align-self-center"]],null,null,null,null,null)),(l()(),e.rb(4,0,null,null,1,"h4",[["class","text-themecolor"]],null,null,null,null,null)),(l()(),e.Hb(-1,null,["Add Mobile Brand"])),(l()(),e.rb(6,0,null,null,6,"div",[["class","col-md-7 align-self-center text-right"]],null,null,null,null,null)),(l()(),e.rb(7,0,null,null,5,"div",[["class","d-flex justify-content-end align-items-center"]],null,null,null,null,null)),(l()(),e.rb(8,0,null,null,4,"ol",[["class","breadcrumb"]],null,null,null,null,null)),(l()(),e.rb(9,0,null,null,1,"li",[["class","breadcrumb-item"]],null,null,null,null,null)),(l()(),e.Hb(-1,null,["Home"])),(l()(),e.rb(11,0,null,null,1,"li",[["class","breadcrumb-item active"]],null,null,null,null,null)),(l()(),e.Hb(-1,null,["Add Mobile Brand"])),(l()(),e.rb(13,0,null,null,23,"div",[["class","row"]],null,null,null,null,null)),(l()(),e.rb(14,0,null,null,22,"div",[["class","col-lg-12"]],null,null,null,null,null)),(l()(),e.rb(15,0,null,null,21,"div",[["class","card"]],null,null,null,null,null)),(l()(),e.rb(16,0,null,null,20,"div",[["class","card-body"]],null,null,null,null,null)),(l()(),e.rb(17,0,null,null,5,"div",[["class","form-body"]],null,null,null,null,null)),(l()(),e.rb(18,0,null,null,1,"h5",[["class","card-title"]],null,null,null,null,null)),(l()(),e.Hb(-1,null,["Mobile Brands :-"])),(l()(),e.rb(20,0,null,null,0,"span",[["class","mr-left"]],null,null,null,null,null)),(l()(),e.rb(21,0,null,null,1,"button",[["class","btn btn-success"]],null,[[null,"click"]],(function(l,n,u){var e=!0;return"click"===n&&(e=!1!==l.component.addBrand()&&e),e}),null,null)),(l()(),e.Hb(-1,null,["+ Add Brand"])),(l()(),e.rb(23,0,null,null,0,"hr",[],null,null,null,null,null)),(l()(),e.rb(24,0,null,null,12,"div",[["class","table-responsive"]],null,null,null,null,null)),(l()(),e.rb(25,0,null,null,11,"table",[["class","table product-overview"],["id","myTable"]],null,null,null,null,null)),(l()(),e.rb(26,0,null,null,7,"thead",[],null,null,null,null,null)),(l()(),e.rb(27,0,null,null,6,"tr",[],null,null,null,null,null)),(l()(),e.rb(28,0,null,null,1,"th",[],null,null,null,null,null)),(l()(),e.Hb(-1,null,["Brand Id"])),(l()(),e.rb(30,0,null,null,1,"th",[],null,null,null,null,null)),(l()(),e.Hb(-1,null,["Name"])),(l()(),e.rb(32,0,null,null,1,"th",[],null,null,null,null,null)),(l()(),e.Hb(-1,null,["Action"])),(l()(),e.rb(34,0,null,null,2,"tbody",[],null,null,null,null,null)),(l()(),e.gb(16777216,null,null,1,null,_)),e.qb(36,278528,null,0,a.i,[e.O,e.L,e.s],{ngForOf:[0,"ngForOf"]},null)],(function(l,n){l(n,36,0,n.component.allBrand)}),null)}function y(l){return e.Jb(0,[(l()(),e.rb(0,0,null,null,1,"app-add-brand",[],null,null,null,M,C)),e.qb(1,114688,null,0,v,[c],null,null)],(function(l,n){l(n,1,0)}),null)}var B=e.nb("app-add-brand",v,y,{},{},[]),H=u("ZYCi"),q=function(){return function(){}}();u.d(n,"MobileModuleNgFactory",(function(){return k}));var k=e.ob(t,[],(function(l){return e.Ab([e.Bb(512,e.j,e.Z,[[8,[i.a,f,B]],[3,e.j],e.x]),e.Bb(4608,a.l,a.k,[e.u,[2,a.s]]),e.Bb(4608,r.t,r.t,[]),e.Bb(1073742336,a.b,a.b,[]),e.Bb(1073742336,H.m,H.m,[[2,H.r],[2,H.k]]),e.Bb(1073742336,q,q,[]),e.Bb(1073742336,r.s,r.s,[]),e.Bb(1073742336,r.e,r.e,[]),e.Bb(1073742336,t,t,[]),e.Bb(1024,H.i,(function(){return[[{path:"",component:s},{path:"brand",component:v}]]}),[])])}))}}]);