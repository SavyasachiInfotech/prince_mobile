(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{XZ1w:function(l,n,u){"use strict";u.r(n);var t=u("8Y7J");class e{}var i=u("pMnS"),a=u("s7LF"),s=u("SVse");class r{constructor(l,n){this._attributeService=l,this._config=n,this.editBit=!1,this.displayPages=new Array,this.limit=this._config.displayLimit,this.cancelAttribute(),this.setAttributes()}ngOnInit(){this._attributeService.countAttribute().subscribe(l=>{200==l.status&&(this.lastPage=Math.ceil(l.data[0].count/this.limit))})}setAttributes(){this._attributeService.getAttributes(0).subscribe(l=>{console.log(l),200==l.status&&(this.attributes=l.attributes)},l=>{alert(this._config.err)})}cancelAttribute(){this.editBit=!1,this.attribute={name:"",description:""}}saveAttribute(){""==this.attribute.name?alert("Enter the data properly"):this.editBit?this._attributeService.editAttribute({name:this.attribute.name},this.attribute.attribute_id).subscribe(l=>{200==l.status?(alert("Attribute updated successfully."),this.setAttributes(),this.cancelAttribute()):alert("Attribute not updated. Please try again later.")},l=>{alert(this._config.err)}):this._attributeService.addAttribute(this.attribute).subscribe(l=>{200==l.status?(alert("Attribute added successfully."),this.setAttributes(),this.cancelAttribute()):alert("Attribute not added. Please try again later.")},l=>{alert(this._config.err)})}editAttributeRequest(l){this.attribute=l,this.editBit=!0}}var b=u("dQhb"),c=u("IheW");let o=(()=>{class l{constructor(l,n){this._config=l,this._http=n,this.service="attribute/",this.addAttributeUrl=this._config.apiBaseUrl+this.service+"add-attribute",this.editAttributeUrl=this._config.apiBaseUrl+this.service+"edit-attribute/",this.getAttributeUrl=this._config.apiBaseUrl+this.service+"getAttributes/",this.countAttributeUrl=this._config.apiBaseUrl+this.service+"count-attribute"}addAttribute(l){let n=this._config.getHeader();return this._http.post(this.addAttributeUrl,l,n)}editAttribute(l,n){let u=this._config.getHeader();return this._http.put(this.editAttributeUrl+n,l,u)}getAttributes(l){let n=this._config.getHeader();return this._http.get(this.getAttributeUrl+l,n)}countAttribute(){return this._http.get(this.countAttributeUrl)}}return l.ngInjectableDef=t.Hb({factory:function(){return new l(t.Ib(b.a),t.Ib(c.c))},token:l,providedIn:"root"}),l})();var d=t.nb({encapsulation:0,styles:[["i[_ngcontent-%COMP%]{cursor:pointer}"]],data:{}});function p(l){return t.Eb(0,[(l()(),t.pb(0,0,null,null,7,"tr",[],null,null,null,null,null)),(l()(),t.pb(1,0,null,null,1,"td",[],null,null,null,null,null)),(l()(),t.Db(2,null,["",""])),(l()(),t.pb(3,0,null,null,1,"td",[],null,null,null,null,null)),(l()(),t.Db(4,null,["",""])),(l()(),t.pb(5,0,null,null,2,"td",[],null,null,null,null,null)),(l()(),t.pb(6,0,null,null,1,"i",[["class","material-icons"]],null,[[null,"click"]],(function(l,n,u){var t=!0;return"click"===n&&(t=!1!==l.component.editAttributeRequest(l.context.$implicit)&&t),t}),null,null)),(l()(),t.Db(-1,null,["edit"]))],null,(function(l,n){l(n,2,0,n.context.$implicit.attribute_id),l(n,4,0,n.context.$implicit.name)}))}function g(l){return t.Eb(0,[(l()(),t.pb(0,0,null,null,60,"div",[["class","page-wrapper"]],null,null,null,null,null)),(l()(),t.pb(1,0,null,null,59,"div",[["class","container-fluid"]],null,null,null,null,null)),(l()(),t.pb(2,0,null,null,10,"div",[["class","row page-titles"]],null,null,null,null,null)),(l()(),t.pb(3,0,null,null,2,"div",[["class","col-md-5 align-self-center"]],null,null,null,null,null)),(l()(),t.pb(4,0,null,null,1,"h4",[["class","text-themecolor"]],null,null,null,null,null)),(l()(),t.Db(-1,null,["Add Attributes"])),(l()(),t.pb(6,0,null,null,6,"div",[["class","col-md-7 align-self-center text-right"]],null,null,null,null,null)),(l()(),t.pb(7,0,null,null,5,"div",[["class","d-flex justify-content-end align-items-center"]],null,null,null,null,null)),(l()(),t.pb(8,0,null,null,4,"ol",[["class","breadcrumb"]],null,null,null,null,null)),(l()(),t.pb(9,0,null,null,1,"li",[["class","breadcrumb-item"]],null,null,null,null,null)),(l()(),t.Db(-1,null,["Home"])),(l()(),t.pb(11,0,null,null,1,"li",[["class","breadcrumb-item active"]],null,null,null,null,null)),(l()(),t.Db(-1,null,["Add Attributes"])),(l()(),t.pb(13,0,null,null,47,"div",[["class","row"]],null,null,null,null,null)),(l()(),t.pb(14,0,null,null,46,"div",[["class","col-lg-12"]],null,null,null,null,null)),(l()(),t.pb(15,0,null,null,45,"div",[["class","card"]],null,null,null,null,null)),(l()(),t.pb(16,0,null,null,44,"div",[["class","card-body"]],null,null,null,null,null)),(l()(),t.pb(17,0,null,null,25,"form",[["action","#"],["novalidate",""]],[[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"submit"],[null,"reset"]],(function(l,n,u){var e=!0;return"submit"===n&&(e=!1!==t.Ab(l,19).onSubmit(u)&&e),"reset"===n&&(e=!1!==t.Ab(l,19).onReset()&&e),e}),null,null)),t.ob(18,16384,null,0,a.u,[],null,null),t.ob(19,4210688,null,0,a.k,[[8,null],[8,null]],null,null),t.Bb(2048,null,a.c,null,[a.k]),t.ob(21,16384,null,0,a.j,[[4,a.c]],null,null),(l()(),t.pb(22,0,null,null,15,"div",[["class","form-body"]],null,null,null,null,null)),(l()(),t.pb(23,0,null,null,1,"h5",[["class","card-title"]],null,null,null,null,null)),(l()(),t.Db(-1,null,["About Attribute"])),(l()(),t.pb(25,0,null,null,0,"hr",[],null,null,null,null,null)),(l()(),t.pb(26,0,null,null,10,"div",[["class","row"]],null,null,null,null,null)),(l()(),t.pb(27,0,null,null,9,"div",[["class","col-md-6"]],null,null,null,null,null)),(l()(),t.pb(28,0,null,null,8,"div",[["class","form-group"]],null,null,null,null,null)),(l()(),t.pb(29,0,null,null,1,"label",[["class","control-label"]],null,null,null,null,null)),(l()(),t.Db(-1,null,["Attribute Name"])),(l()(),t.pb(31,0,null,null,5,"input",[["class","form-control"],["id","firstName"],["name","att_name"],["placeholder","Attribute-Name"],["type","text"]],[[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"ngModelChange"],[null,"input"],[null,"blur"],[null,"compositionstart"],[null,"compositionend"]],(function(l,n,u){var e=!0,i=l.component;return"input"===n&&(e=!1!==t.Ab(l,32)._handleInput(u.target.value)&&e),"blur"===n&&(e=!1!==t.Ab(l,32).onTouched()&&e),"compositionstart"===n&&(e=!1!==t.Ab(l,32)._compositionStart()&&e),"compositionend"===n&&(e=!1!==t.Ab(l,32)._compositionEnd(u.target.value)&&e),"ngModelChange"===n&&(e=!1!==(i.attribute.name=u)&&e),e}),null,null)),t.ob(32,16384,null,0,a.d,[t.B,t.k,[2,a.a]],null,null),t.Bb(1024,null,a.g,(function(l){return[l]}),[a.d]),t.ob(34,671744,null,0,a.l,[[2,a.c],[8,null],[8,null],[6,a.g]],{name:[0,"name"],model:[1,"model"]},{update:"ngModelChange"}),t.Bb(2048,null,a.h,null,[a.l]),t.ob(36,16384,null,0,a.i,[[4,a.h]],null,null),(l()(),t.pb(37,0,null,null,0,"hr",[],null,null,null,null,null)),(l()(),t.pb(38,0,null,null,4,"div",[["class","form-actions m-t-40"]],null,null,null,null,null)),(l()(),t.pb(39,0,null,null,1,"button",[["class","btn btn-success"],["type","submit"]],null,[[null,"click"]],(function(l,n,u){var t=!0;return"click"===n&&(t=!1!==l.component.saveAttribute()&&t),t}),null,null)),(l()(),t.Db(-1,null,[" Save "])),(l()(),t.pb(41,0,null,null,1,"button",[["class","btn btn-dark"],["type","button"]],null,[[null,"click"]],(function(l,n,u){var t=!0;return"click"===n&&(t=!1!==l.component.cancelAttribute()&&t),t}),null,null)),(l()(),t.Db(-1,null,[" Cancel "])),(l()(),t.pb(43,0,null,null,0,"hr",[],null,null,null,null,null)),(l()(),t.pb(44,0,null,null,3,"div",[["class","form-body"]],null,null,null,null,null)),(l()(),t.pb(45,0,null,null,1,"h5",[["class","card-title"]],null,null,null,null,null)),(l()(),t.Db(-1,null,["Attributes"])),(l()(),t.pb(47,0,null,null,0,"hr",[],null,null,null,null,null)),(l()(),t.pb(48,0,null,null,12,"div",[["class","table-responsive"]],null,null,null,null,null)),(l()(),t.pb(49,0,null,null,11,"table",[["class","table product-overview"],["id","myTable"]],null,null,null,null,null)),(l()(),t.pb(50,0,null,null,7,"thead",[],null,null,null,null,null)),(l()(),t.pb(51,0,null,null,6,"tr",[],null,null,null,null,null)),(l()(),t.pb(52,0,null,null,1,"th",[],null,null,null,null,null)),(l()(),t.Db(-1,null,["Attribute Id"])),(l()(),t.pb(54,0,null,null,1,"th",[],null,null,null,null,null)),(l()(),t.Db(-1,null,["Name"])),(l()(),t.pb(56,0,null,null,1,"th",[],null,null,null,null,null)),(l()(),t.Db(-1,null,["Action"])),(l()(),t.pb(58,0,null,null,2,"tbody",[],null,null,null,null,null)),(l()(),t.eb(16777216,null,null,1,null,p)),t.ob(60,278528,null,0,s.h,[t.M,t.J,t.q],{ngForOf:[0,"ngForOf"]},null)],(function(l,n){var u=n.component;l(n,34,0,"att_name",u.attribute.name),l(n,60,0,u.attributes)}),(function(l,n){l(n,17,0,t.Ab(n,21).ngClassUntouched,t.Ab(n,21).ngClassTouched,t.Ab(n,21).ngClassPristine,t.Ab(n,21).ngClassDirty,t.Ab(n,21).ngClassValid,t.Ab(n,21).ngClassInvalid,t.Ab(n,21).ngClassPending),l(n,31,0,t.Ab(n,36).ngClassUntouched,t.Ab(n,36).ngClassTouched,t.Ab(n,36).ngClassPristine,t.Ab(n,36).ngClassDirty,t.Ab(n,36).ngClassValid,t.Ab(n,36).ngClassInvalid,t.Ab(n,36).ngClassPending)}))}function h(l){return t.Eb(0,[(l()(),t.pb(0,0,null,null,1,"app-add-attribute",[],null,null,null,g,d)),t.ob(1,114688,null,0,r,[o,b.a],null,null)],(function(l,n){l(n,1,0)}),null)}var A=t.lb("app-add-attribute",r,h,{},{},[]);class v{constructor(l,n,u){this._attributeValueService=l,this._attributeService=n,this._config=u,this.editBit=!1,this.cancelAttribute(),this.setAttributes()}ngOnInit(){}setAttributes(){this._attributeService.getAttributes(0).subscribe(l=>{200==l.status&&(console.log(l),this.attributes=l.attributes)},l=>{alert(this._config.err)}),this._attributeValueService.getAttributes(0,2).subscribe(l=>{200==l.status&&(this.values=l.attributeValues)})}changeAttribute(){this._attributeValueService.getAttributes(0,this.attribute.attribute_id).subscribe(l=>{this.values=200==l.status?l.attributeValues:new Array})}cancelAttribute(){this.editBit=!1,this.attribute={attribute_id:2,value:""}}saveAttribute(){""==this.attribute.value?alert("Enter the data properly"):this.editBit?this._attributeValueService.editAttribute(this.attribute,this.attribute.attribute_value_id).subscribe(l=>{200==l.status?(alert("Attribute updated successfully."),this.setAttributes(),this.cancelAttribute()):alert("Attribute not updated. Please try again later.")},l=>{alert(this._config.err)}):this._attributeValueService.addAttributeValue(this.attribute).subscribe(l=>{200==l.status?(alert("Attribute added successfully."),this.setAttributes(),this.cancelAttribute()):alert("Attribute not added. Please try again later.")},l=>{alert(this._config.err)})}editAttributeRequest(l){this.attribute=l,this.editBit=!0}}var m=u("xkcU"),f=t.nb({encapsulation:0,styles:[["i[_ngcontent-%COMP%]{cursor:pointer}"]],data:{}});function _(l){return t.Eb(0,[(l()(),t.pb(0,0,null,null,3,"option",[],null,null,null,null,null)),t.ob(1,147456,null,0,a.m,[t.k,t.B,[2,a.q]],{value:[0,"value"]},null),t.ob(2,147456,null,0,a.t,[t.k,t.B,[8,null]],{value:[0,"value"]},null),(l()(),t.Db(3,null,["",""]))],(function(l,n){l(n,1,0,n.context.$implicit.attribute_id),l(n,2,0,n.context.$implicit.attribute_id)}),(function(l,n){l(n,3,0,n.context.$implicit.name)}))}function C(l){return t.Eb(0,[(l()(),t.pb(0,0,null,null,1,"span",[],null,null,null,null,null)),(l()(),t.Db(1,null,["",""]))],null,(function(l,n){l(n,1,0,n.parent.context.$implicit.name)}))}function y(l){return t.Eb(0,[(l()(),t.pb(0,0,null,null,2,"span",[],null,null,null,null,null)),(l()(),t.eb(16777216,null,null,1,null,C)),t.ob(2,16384,null,0,s.i,[t.M,t.J],{ngIf:[0,"ngIf"]},null)],(function(l,n){l(n,2,0,n.context.$implicit.attribute_id==n.parent.context.$implicit.attribute_id)}),null)}function D(l){return t.Eb(0,[(l()(),t.pb(0,0,null,null,10,"tr",[],null,null,null,null,null)),(l()(),t.pb(1,0,null,null,1,"td",[],null,null,null,null,null)),(l()(),t.Db(2,null,["",""])),(l()(),t.pb(3,0,null,null,1,"td",[],null,null,null,null,null)),(l()(),t.Db(4,null,["",""])),(l()(),t.pb(5,0,null,null,2,"td",[],null,null,null,null,null)),(l()(),t.eb(16777216,null,null,1,null,y)),t.ob(7,278528,null,0,s.h,[t.M,t.J,t.q],{ngForOf:[0,"ngForOf"]},null),(l()(),t.pb(8,0,null,null,2,"td",[],null,null,null,null,null)),(l()(),t.pb(9,0,null,null,1,"i",[["class","material-icons"]],null,[[null,"click"]],(function(l,n,u){var t=!0;return"click"===n&&(t=!1!==l.component.editAttributeRequest(l.context.$implicit)&&t),t}),null,null)),(l()(),t.Db(-1,null,["edit"]))],(function(l,n){l(n,7,0,n.component.attributes)}),(function(l,n){l(n,2,0,n.context.$implicit.attribute_value_id),l(n,4,0,n.context.$implicit.value)}))}function k(l){return t.Eb(0,[(l()(),t.pb(0,0,null,null,77,"div",[["class","page-wrapper"]],null,null,null,null,null)),(l()(),t.pb(1,0,null,null,76,"div",[["class","container-fluid"]],null,null,null,null,null)),(l()(),t.pb(2,0,null,null,12,"div",[["class","row page-titles"]],null,null,null,null,null)),(l()(),t.pb(3,0,null,null,2,"div",[["class","col-md-5 align-self-center"]],null,null,null,null,null)),(l()(),t.pb(4,0,null,null,1,"h4",[["class","text-themecolor"]],null,null,null,null,null)),(l()(),t.Db(-1,null,["Add Attribute's Value"])),(l()(),t.pb(6,0,null,null,8,"div",[["class","col-md-7 align-self-center text-right"]],null,null,null,null,null)),(l()(),t.pb(7,0,null,null,7,"div",[["class","d-flex justify-content-end align-items-center"]],null,null,null,null,null)),(l()(),t.pb(8,0,null,null,6,"ol",[["class","breadcrumb"]],null,null,null,null,null)),(l()(),t.pb(9,0,null,null,1,"li",[["class","breadcrumb-item"]],null,null,null,null,null)),(l()(),t.Db(-1,null,["Home"])),(l()(),t.pb(11,0,null,null,1,"li",[["class","breadcrumb-item"]],null,null,null,null,null)),(l()(),t.Db(-1,null,["Attribute"])),(l()(),t.pb(13,0,null,null,1,"li",[["class","breadcrumb-item active"]],null,null,null,null,null)),(l()(),t.Db(-1,null,["Add Attribute's Value"])),(l()(),t.pb(15,0,null,null,62,"div",[["class","row"]],null,null,null,null,null)),(l()(),t.pb(16,0,null,null,61,"div",[["class","col-lg-12"]],null,null,null,null,null)),(l()(),t.pb(17,0,null,null,60,"div",[["class","card"]],null,null,null,null,null)),(l()(),t.pb(18,0,null,null,59,"div",[["class","card-body"]],null,null,null,null,null)),(l()(),t.pb(19,0,null,null,38,"form",[["action","#"],["novalidate",""]],[[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"submit"],[null,"reset"]],(function(l,n,u){var e=!0;return"submit"===n&&(e=!1!==t.Ab(l,21).onSubmit(u)&&e),"reset"===n&&(e=!1!==t.Ab(l,21).onReset()&&e),e}),null,null)),t.ob(20,16384,null,0,a.u,[],null,null),t.ob(21,4210688,null,0,a.k,[[8,null],[8,null]],null,null),t.Bb(2048,null,a.c,null,[a.k]),t.ob(23,16384,null,0,a.j,[[4,a.c]],null,null),(l()(),t.pb(24,0,null,null,28,"div",[["class","form-body"]],null,null,null,null,null)),(l()(),t.pb(25,0,null,null,1,"h5",[["class","card-title"]],null,null,null,null,null)),(l()(),t.Db(-1,null,["About Attribute Value"])),(l()(),t.pb(27,0,null,null,0,"hr",[],null,null,null,null,null)),(l()(),t.pb(28,0,null,null,12,"div",[["class","row"]],null,null,null,null,null)),(l()(),t.pb(29,0,null,null,11,"div",[["class","col-md-6"]],null,null,null,null,null)),(l()(),t.pb(30,0,null,null,10,"div",[["class","form-group"]],null,null,null,null,null)),(l()(),t.pb(31,0,null,null,1,"label",[["class","control-label"]],null,null,null,null,null)),(l()(),t.Db(-1,null,["Attribute"])),(l()(),t.pb(33,0,null,null,7,"select",[["class","form-control"],["data-placeholder","Choose an Attribute"],["name","attribute"],["tabindex","1"]],[[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"ngModelChange"],[null,"change"],[null,"blur"]],(function(l,n,u){var e=!0,i=l.component;return"change"===n&&(e=!1!==t.Ab(l,34).onChange(u.target.value)&&e),"blur"===n&&(e=!1!==t.Ab(l,34).onTouched()&&e),"ngModelChange"===n&&(e=!1!==(i.attribute.attribute_id=u)&&e),"change"===n&&(e=!1!==i.changeAttribute()&&e),e}),null,null)),t.ob(34,16384,null,0,a.q,[t.B,t.k],null,null),t.Bb(1024,null,a.g,(function(l){return[l]}),[a.q]),t.ob(36,671744,null,0,a.l,[[2,a.c],[8,null],[8,null],[6,a.g]],{name:[0,"name"],model:[1,"model"]},{update:"ngModelChange"}),t.Bb(2048,null,a.h,null,[a.l]),t.ob(38,16384,null,0,a.i,[[4,a.h]],null,null),(l()(),t.eb(16777216,null,null,1,null,_)),t.ob(40,278528,null,0,s.h,[t.M,t.J,t.q],{ngForOf:[0,"ngForOf"]},null),(l()(),t.pb(41,0,null,null,10,"div",[["class","row"]],null,null,null,null,null)),(l()(),t.pb(42,0,null,null,9,"div",[["class","col-md-6"]],null,null,null,null,null)),(l()(),t.pb(43,0,null,null,8,"div",[["class","form-group"]],null,null,null,null,null)),(l()(),t.pb(44,0,null,null,1,"label",[["class","control-label"]],null,null,null,null,null)),(l()(),t.Db(-1,null,["Attribute Value"])),(l()(),t.pb(46,0,null,null,5,"input",[["class","form-control"],["id","firstName"],["name","value"],["placeholder","Attribute value"],["type","text"]],[[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"ngModelChange"],[null,"input"],[null,"blur"],[null,"compositionstart"],[null,"compositionend"]],(function(l,n,u){var e=!0,i=l.component;return"input"===n&&(e=!1!==t.Ab(l,47)._handleInput(u.target.value)&&e),"blur"===n&&(e=!1!==t.Ab(l,47).onTouched()&&e),"compositionstart"===n&&(e=!1!==t.Ab(l,47)._compositionStart()&&e),"compositionend"===n&&(e=!1!==t.Ab(l,47)._compositionEnd(u.target.value)&&e),"ngModelChange"===n&&(e=!1!==(i.attribute.value=u)&&e),e}),null,null)),t.ob(47,16384,null,0,a.d,[t.B,t.k,[2,a.a]],null,null),t.Bb(1024,null,a.g,(function(l){return[l]}),[a.d]),t.ob(49,671744,null,0,a.l,[[2,a.c],[8,null],[8,null],[6,a.g]],{name:[0,"name"],model:[1,"model"]},{update:"ngModelChange"}),t.Bb(2048,null,a.h,null,[a.l]),t.ob(51,16384,null,0,a.i,[[4,a.h]],null,null),(l()(),t.pb(52,0,null,null,0,"hr",[],null,null,null,null,null)),(l()(),t.pb(53,0,null,null,4,"div",[["class","form-actions m-t-40"]],null,null,null,null,null)),(l()(),t.pb(54,0,null,null,1,"button",[["class","btn btn-success"],["type","submit"]],null,[[null,"click"]],(function(l,n,u){var t=!0;return"click"===n&&(t=!1!==l.component.saveAttribute()&&t),t}),null,null)),(l()(),t.Db(-1,null,[" Save "])),(l()(),t.pb(56,0,null,null,1,"button",[["class","btn btn-dark"],["type","button"]],null,[[null,"click"]],(function(l,n,u){var t=!0;return"click"===n&&(t=!1!==l.component.cancelAttribute()&&t),t}),null,null)),(l()(),t.Db(-1,null,[" Cancel "])),(l()(),t.pb(58,0,null,null,0,"hr",[],null,null,null,null,null)),(l()(),t.pb(59,0,null,null,3,"div",[["class","form-body"]],null,null,null,null,null)),(l()(),t.pb(60,0,null,null,1,"h5",[["class","card-title"]],null,null,null,null,null)),(l()(),t.Db(-1,null,["Attribute's Values"])),(l()(),t.pb(62,0,null,null,0,"hr",[],null,null,null,null,null)),(l()(),t.pb(63,0,null,null,14,"div",[["class","table-responsive"]],null,null,null,null,null)),(l()(),t.pb(64,0,null,null,13,"table",[["class","table product-overview"],["id","myTable"]],null,null,null,null,null)),(l()(),t.pb(65,0,null,null,9,"thead",[],null,null,null,null,null)),(l()(),t.pb(66,0,null,null,8,"tr",[],null,null,null,null,null)),(l()(),t.pb(67,0,null,null,1,"th",[],null,null,null,null,null)),(l()(),t.Db(-1,null,["Attribute Value Id"])),(l()(),t.pb(69,0,null,null,1,"th",[],null,null,null,null,null)),(l()(),t.Db(-1,null,["Value"])),(l()(),t.pb(71,0,null,null,1,"th",[],null,null,null,null,null)),(l()(),t.Db(-1,null,["Attribute"])),(l()(),t.pb(73,0,null,null,1,"th",[],null,null,null,null,null)),(l()(),t.Db(-1,null,["Action"])),(l()(),t.pb(75,0,null,null,2,"tbody",[],null,null,null,null,null)),(l()(),t.eb(16777216,null,null,1,null,D)),t.ob(77,278528,null,0,s.h,[t.M,t.J,t.q],{ngForOf:[0,"ngForOf"]},null)],(function(l,n){var u=n.component;l(n,36,0,"attribute",u.attribute.attribute_id),l(n,40,0,u.attributes),l(n,49,0,"value",u.attribute.value),l(n,77,0,u.values)}),(function(l,n){l(n,19,0,t.Ab(n,23).ngClassUntouched,t.Ab(n,23).ngClassTouched,t.Ab(n,23).ngClassPristine,t.Ab(n,23).ngClassDirty,t.Ab(n,23).ngClassValid,t.Ab(n,23).ngClassInvalid,t.Ab(n,23).ngClassPending),l(n,33,0,t.Ab(n,38).ngClassUntouched,t.Ab(n,38).ngClassTouched,t.Ab(n,38).ngClassPristine,t.Ab(n,38).ngClassDirty,t.Ab(n,38).ngClassValid,t.Ab(n,38).ngClassInvalid,t.Ab(n,38).ngClassPending),l(n,46,0,t.Ab(n,51).ngClassUntouched,t.Ab(n,51).ngClassTouched,t.Ab(n,51).ngClassPristine,t.Ab(n,51).ngClassDirty,t.Ab(n,51).ngClassValid,t.Ab(n,51).ngClassInvalid,t.Ab(n,51).ngClassPending)}))}function B(l){return t.Eb(0,[(l()(),t.pb(0,0,null,null,1,"app-add-attribute-value",[],null,null,null,k,f)),t.ob(1,114688,null,0,v,[m.a,o,b.a],null,null)],(function(l,n){l(n,1,0)}),null)}var x=t.lb("app-add-attribute-value",v,B,{},{},[]),w=u("iInd");class V{}u.d(n,"AttributeModuleNgFactory",(function(){return S}));var S=t.mb(e,[],(function(l){return t.yb([t.zb(512,t.j,t.X,[[8,[i.a,A,x]],[3,t.j],t.v]),t.zb(4608,s.k,s.j,[t.s,[2,s.r]]),t.zb(4608,a.s,a.s,[]),t.zb(1073742336,s.b,s.b,[]),t.zb(1073742336,w.m,w.m,[[2,w.r],[2,w.k]]),t.zb(1073742336,V,V,[]),t.zb(1073742336,a.r,a.r,[]),t.zb(1073742336,a.e,a.e,[]),t.zb(1073742336,e,e,[]),t.zb(1024,w.i,(function(){return[[{path:"",component:r},{path:"attribute-value",component:v}]]}),[])])}))}}]);