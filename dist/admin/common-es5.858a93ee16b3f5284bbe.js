(window.webpackJsonp=window.webpackJsonp||[]).push([[1],{JrI2:function(t,e,i){"use strict";i.d(e,"a",(function(){return a}));var r=i("CcnG"),o=i("dQhb"),s=i("t/Na"),a=function(){function t(t,e){this._config=t,this._http=e,this.service="category/",this.getCategoryUrl=this._config.apiBaseUrl+this.service+"getCategory/",this.addCategoryUrl=this._config.apiBaseUrl+this.service+"add-category",this.editCategoryUrl=this._config.apiBaseUrl+this.service+"edit-category",this.getSubCategoryUrl=this._config.apiBaseUrl+this.service+"subCategory/",this.addSubCategoryUrl=this._config.apiBaseUrl+this.service+"add-subcategory",this.editSubCategoryUrl=this._config.apiBaseUrl+this.service+"edit-subcategory",this.countCategoryUrl=this._config.apiBaseUrl+this.service+"count-category",this._getAllCategoryUrl=this._config.apiBaseUrl+this.service}return t.prototype.getAllCategories=function(){var t=this._config.getHeader();return this._http.get(this._getAllCategoryUrl,t)},t.prototype.addCategory=function(t){var e=this._config.getHeader();return this._http.post(this.addCategoryUrl,t,e)},t.prototype.editCategory=function(t){var e=this._config.getHeader();return this._http.put(this.editCategoryUrl,t,e)},t.prototype.getCategory=function(t){var e=this._config.getHeader();return this._http.get(this.getCategoryUrl+t,e)},t.prototype.addSubCategory=function(t){var e=this._config.getHeader();return this._http.post(this.addSubCategoryUrl,t,e)},t.prototype.editSubCategory=function(t){var e=this._config.getHeader();return this._http.put(this.editSubCategoryUrl,t,e)},t.prototype.getSubCategory=function(t,e){var i=this._config.getHeader();return this._http.get(this.getSubCategoryUrl+t+"/"+e,i)},t.prototype.countCategory=function(){var t=this._config.getHeader();return this._http.get(this.countCategoryUrl,t)},t.ngInjectableDef=r.Jb({factory:function(){return new t(r.Kb(o.a),r.Kb(s.c))},token:t,providedIn:"root"}),t}()},xkcU:function(t,e,i){"use strict";i.d(e,"a",(function(){return a}));var r=i("CcnG"),o=i("dQhb"),s=i("t/Na"),a=function(){function t(t,e){this._config=t,this._http=e,this.service="attribute/",this.addAttributeUrl=this._config.apiBaseUrl+this.service+"add-attribute-value",this.editAttributeUrl=this._config.apiBaseUrl+this.service+"edit-attribute-value/",this.getAttributeUrl=this._config.apiBaseUrl+this.service+"attributeValues/"}return t.prototype.addAttributeValue=function(t){var e=this._config.getHeader();return this._http.post(this.addAttributeUrl,t,e)},t.prototype.editAttribute=function(t,e){var i=this._config.getHeader();return this._http.put(this.editAttributeUrl+e,t,i)},t.prototype.getAttributes=function(t,e){var i=this._config.getHeader();return this._http.get(this.getAttributeUrl+e+"/"+t,i)},t.ngInjectableDef=r.Jb({factory:function(){return new t(r.Kb(o.a),r.Kb(s.c))},token:t,providedIn:"root"}),t}()}}]);