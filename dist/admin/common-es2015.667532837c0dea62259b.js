(window.webpackJsonp=window.webpackJsonp||[]).push([[1],{JrI2:function(t,e,i){"use strict";i.d(e,"a",(function(){return g}));var r=i("8Y7J"),s=i("dQhb"),a=i("IheW");let g=(()=>{class t{constructor(t,e){this._config=t,this._http=e,this.service="category/",this.getCategoryUrl=this._config.apiBaseUrl+this.service+"getCategory/",this.addCategoryUrl=this._config.apiBaseUrl+this.service+"add-category",this.editCategoryUrl=this._config.apiBaseUrl+this.service+"edit-category",this.getSubCategoryUrl=this._config.apiBaseUrl+this.service+"subCategory/",this.addSubCategoryUrl=this._config.apiBaseUrl+this.service+"add-subcategory",this.editSubCategoryUrl=this._config.apiBaseUrl+this.service+"edit-subcategory",this.countCategoryUrl=this._config.apiBaseUrl+this.service+"count-category",this._getAllCategoryUrl=this._config.apiBaseUrl+this.service,this._getCategoryByIdUrl=this._config.apiBaseUrl+this.service+"get-category/"}getAllCategories(){let t=this._config.getHeader();return this._http.get(this._getAllCategoryUrl,t)}getCategoryById(t){let e=this._config.getHeader();return this._http.get(this._getCategoryByIdUrl+t,e)}addCategory(t){let e=this._config.getHeader();return this._http.post(this.addCategoryUrl,t,e)}editCategory(t){let e=this._config.getHeader();return this._http.put(this.editCategoryUrl,t,e)}getCategory(t){let e=this._config.getHeader();return this._http.get(this.getCategoryUrl+t,e)}addSubCategory(t){let e=this._config.getHeader();return this._http.post(this.addSubCategoryUrl,t,e)}editSubCategory(t){let e=this._config.getHeader();return this._http.put(this.editSubCategoryUrl,t,e)}getSubCategory(t,e){let i=this._config.getHeader();return this._http.get(this.getSubCategoryUrl+t+"/"+e,i)}countCategory(){let t=this._config.getHeader();return this._http.get(this.countCategoryUrl,t)}}return t.ngInjectableDef=r.Hb({factory:function(){return new t(r.Ib(s.a),r.Ib(a.c))},token:t,providedIn:"root"}),t})()},xkcU:function(t,e,i){"use strict";i.d(e,"a",(function(){return g}));var r=i("8Y7J"),s=i("dQhb"),a=i("IheW");let g=(()=>{class t{constructor(t,e){this._config=t,this._http=e,this.service="attribute/",this.addAttributeUrl=this._config.apiBaseUrl+this.service+"add-attribute-value",this.editAttributeUrl=this._config.apiBaseUrl+this.service+"edit-attribute-value/",this.getAttributeUrl=this._config.apiBaseUrl+this.service+"attributeValues/"}addAttributeValue(t){let e=this._config.getHeader();return this._http.post(this.addAttributeUrl,t,e)}editAttribute(t,e){let i=this._config.getHeader();return this._http.put(this.editAttributeUrl+e,t,i)}getAttributes(t,e){let i=this._config.getHeader();return this._http.get(this.getAttributeUrl+e+"/"+t,i)}}return t.ngInjectableDef=r.Hb({factory:function(){return new t(r.Ib(s.a),r.Ib(a.c))},token:t,providedIn:"root"}),t})()}}]);