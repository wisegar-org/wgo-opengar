(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[43],{d8f2:function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("q-page",{staticClass:"row justify-evenly"},[a("div",{staticClass:"col-12 q-pa-md"},[a("ContactAdminComponent",{attrs:{keyMapTitleField:t.keyMapTitleField,keyContactTitleField:t.keyContactTitleField,keyContactContentField:t.keyContactContentField,contactPageTitle:t.contactPageTitle,contactNameField:t.contactNameField,phoneNumberField:t.phoneNumberField,addressField:t.addressField,emailField:t.emailField,mapField:t.mapField,mapPreviewField:t.mapPreviewField,successSave:t.successSave,failSave:t.failSave,keyMapTitle:t.keyMapTitle,keyContactTitle:t.keyContactTitle,keyContactContent:t.keyContactContent}})],1)])},o=[],i=a("60a3"),s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticStyle:{width:"100%"}},[t.loading?t._e():a("q-card",{staticClass:"bg-grey-1",attrs:{flat:"",bordered:""}},[a("q-card-section",[a("div",{staticClass:"row items-center justify-between q-table"},[a("div",{staticClass:"col-12 col-sm-auto no-wrap"},[a("div",{staticClass:"q-table__title ellipsis"},[t._v("\n            "+t._s(t.getContent(t.contactPageTitle))+"\n          ")])]),a("div",{staticClass:"flex q-pb-sm justify-end col-12 col-sm-auto row"},[a("q-btn",{staticClass:"col-12 col-sm-auto q-ml-sm q-mb-sm",attrs:{unelevated:"",color:"primary",icon:"save",label:t.translationContent.WGO_SAVE_BTN,"no-caps":""},on:{click:function(){return t.clickSaveContactData()}}})],1)])]),a("q-card-section",[t._v("\n      "+t._s(t.translationContent.WGO_CASINA_CONTACT_ADMIN_PAGE_MAP_TITLE_FIELD)+"\n      "),a("TranslationComponent",{attrs:{translation:t.objMapTitle,onChange:function(e,a){return t.onChangeIndexContent(t.translationsMapTitle,e,a)}}}),a("q-input",{attrs:{dense:"",outlined:"",square:"",standout:"bg-primary text-white",label:t.getContent(t.mapField),type:"textarea"},model:{value:t.mapPath,callback:function(e){t.mapPath=e},expression:"mapPath"}}),a("br"),a("div",{staticClass:"text-h6"},[t._v(t._s(t.getContent(t.mapPreviewField)))]),a("iframe",{staticStyle:{border:"0"},attrs:{tabindex:"0",src:t.mapPath,width:"250px",height:"250px",frameborder:"0",allowfullscreen:"allowfullscreen","aria-hidden":"false"}}),a("br"),a("q-input",{attrs:{dense:"",outlined:"",square:"",standout:"bg-primary text-white",label:t.getContent(t.contactNameField)},model:{value:t.contactName,callback:function(e){t.contactName=e},expression:"contactName"}}),a("br"),a("q-input",{attrs:{dense:"",outlined:"",square:"",standout:"bg-primary text-white",label:t.getContent(t.addressField)},model:{value:t.address,callback:function(e){t.address=e},expression:"address"}}),a("br"),a("q-input",{attrs:{dense:"",outlined:"",square:"",standout:"bg-primary text-white",label:t.getContent(t.phoneNumberField)},model:{value:t.phoneNumber,callback:function(e){t.phoneNumber=e},expression:"phoneNumber"}}),a("br"),a("q-input",{attrs:{dense:"",outlined:"",square:"",standout:"bg-primary text-white",label:t.getContent(t.emailField)},model:{value:t.email,callback:function(e){t.email=e},expression:"email"}}),a("br"),t._v("\n      "+t._s(t.translationContent.WGO_CASINA_CONTACT_ADMIN_PAGE_CONTACT_TITLE_FIELD)+"\n      "),a("TranslationComponent",{attrs:{translation:t.objContactTitle,onChange:function(e,a){return t.onChangeIndexContent(t.translationsContactTitle,e,a)}}}),t._v("\n      "+t._s(t.translationContent.WGO_CASINA_CONTACT_ADMIN_PAGE_CONTACT_CONTENT_FIELD)+"\n      "),a("TranslationComponent",{attrs:{translation:t.objContactContent,onChange:function(e,a){return t.onChangeIndexContent(t.translationsContactContent,e,a)}}})],1)],1),a("Loader",{attrs:{loading:t.loading}})],1)},l=[],c=a("4bb5"),r=a("0064"),d=a("7fa3"),p=a("ea1a"),C=a("7641"),h=function(t,e,a,n){var o,i=arguments.length,s=i<3?e:null===n?n=Object.getOwnPropertyDescriptor(e,a):n;if("object"===typeof Reflect&&"function"===typeof Reflect.decorate)s=Reflect.decorate(t,e,a,n);else for(var l=t.length-1;l>=0;l--)(o=t[l])&&(s=(i<3?o(s):i>3?o(e,a,s):o(e,a))||s);return i>3&&s&&Object.defineProperty(e,a,s),s},T=function(t,e,a,n){function o(t){return t instanceof a?t:new a((function(e){e(t)}))}return new(a||(a=Promise))((function(a,i){function s(t){try{c(n.next(t))}catch(e){i(e)}}function l(t){try{c(n["throw"](t))}catch(e){i(e)}}function c(t){t.done?a(t.value):o(t.value).then(s,l)}c((n=n.apply(t,e||[])).next())}))};let _=class extends i["Vue"]{constructor(){super(),this.loading=!0,this.contactName="",this.address="",this.phoneNumber="",this.email="",this.mapPath="",this.moduleName="finance",this.objMapTitle={key:this.keyMapTitle,id:this.keyMapTitle},this.objContactTitle={key:this.keyContactTitle,id:this.keyContactTitle},this.objContactContent={key:this.keyContactContent,id:this.keyContactContent},this.translationsMapTitle={},this.translationsContactTitle={},this.translationsContactContent={}}getContent(t){return t in this.translationContent?this.translationContent[t]:t}getTranslationItem(t,e){return Object.keys(t).map((a=>{const n=parseInt(a);return{languageId:n,key:e,value:t[n]}}))}clickSaveContactData(){return T(this,void 0,void 0,(function*(){this.loading=!0;let t=!0,e=[];if(e=e.concat(this.getTranslationItem(this.translationsMapTitle,this.keyMapTitle),this.getTranslationItem(this.translationsContactTitle,this.keyContactTitle),this.getTranslationItem(this.translationsContactContent,this.keyContactContent)),e.forEach((e=>{t=t&&this.setTranslation(e)})),t){const t={module:this.moduleName,contactName:this.contactName,address:this.address,email:this.email,phoneNumber:this.phoneNumber,mapPath:this.mapPath};(yield this.setContactData(t))?this.notify({message:this.getContent(this.successSave),type:"positive"}):this.notify({message:this.getContent(this.failSave),type:"negative"})}else this.notify({message:this.getContent(this.failSave),type:"negative"});this.loading=!1}))}onChangeIndexContent(t,e,a){t[e]=a}created(){return T(this,void 0,void 0,(function*(){yield this.registerTranslations({[this.keyMapTitleField]:!1,[this.keyContactTitleField]:!1,[this.keyContactContentField]:!1,[this.contactPageTitle]:!1,[this.contactNameField]:!1,[this.phoneNumberField]:!1,[this.addressField]:!1,[this.emailField]:!1,[this.mapField]:!1,[this.mapPreviewField]:!1,[this.successSave]:!1,[this.failSave]:!1,[this.keyMapTitle]:!1,[this.keyContactTitle]:!1,[this.keyContactContent]:!1}),this.objMapTitle.value=this.getContent(this.keyMapTitle),this.objContactTitle.value=this.getContent(this.keyContactTitle),this.objContactContent.value=this.getContent(this.keyContactContent);const t=yield this.loadContactData(this.moduleName);this.contactName=t.contactName,this.address=t.address,this.phoneNumber=t.phoneNumber,this.email=t.email,this.mapPath=t.mapPath,this.loading=!1}))}};h([Object(c["a"])(r["a"].getContact,{namespace:r["d"]})],_.prototype,"loadContactData",void 0),h([Object(c["a"])(r["a"].saveContact,{namespace:r["d"]})],_.prototype,"setContactData",void 0),h([Object(c["b"])(r["b"].getContactData,{namespace:r["d"]})],_.prototype,"contactData",void 0),h([Object(c["a"])(p["a"].notify,{namespace:p["c"]})],_.prototype,"notify",void 0),h([Object(c["a"])(C["a"].registerTranslations,{namespace:C["e"]})],_.prototype,"registerTranslations",void 0),h([Object(c["b"])(C["b"].getTranslations,{namespace:C["e"]})],_.prototype,"translationContent",void 0),h([Object(c["b"])(C["b"].getLanguage,{namespace:C["e"]})],_.prototype,"language",void 0),h([Object(c["a"])(C["a"].setTranslation,{namespace:C["e"]})],_.prototype,"setTranslation",void 0),h([Object(i["Prop"])()],_.prototype,"keyMapTitleField",void 0),h([Object(i["Prop"])()],_.prototype,"keyContactTitleField",void 0),h([Object(i["Prop"])()],_.prototype,"keyContactContentField",void 0),h([Object(i["Prop"])()],_.prototype,"contactPageTitle",void 0),h([Object(i["Prop"])()],_.prototype,"contactNameField",void 0),h([Object(i["Prop"])()],_.prototype,"phoneNumberField",void 0),h([Object(i["Prop"])()],_.prototype,"addressField",void 0),h([Object(i["Prop"])()],_.prototype,"emailField",void 0),h([Object(i["Prop"])()],_.prototype,"mapField",void 0),h([Object(i["Prop"])()],_.prototype,"mapPreviewField",void 0),h([Object(i["Prop"])()],_.prototype,"successSave",void 0),h([Object(i["Prop"])()],_.prototype,"failSave",void 0),h([Object(i["Prop"])()],_.prototype,"keyMapTitle",void 0),h([Object(i["Prop"])()],_.prototype,"keyContactTitle",void 0),h([Object(i["Prop"])()],_.prototype,"keyContactContent",void 0),_=h([Object(i["Component"])({components:{TranslationComponent:d["a"]}})],_);var m=_,u=m,N=a("2877"),y=a("f09f"),b=a("a370"),v=a("eaac"),A=a("9c40"),O=a("27f9"),F=a("eebe"),f=a.n(F),g=Object(N["a"])(u,s,l,!1,null,null,null),E=g.exports;f()(g,"components",{QCard:y["a"],QCardSection:b["a"],QTable:v["a"],QBtn:A["a"],QInput:O["a"]});var I=function(t,e,a,n){var o,i=arguments.length,s=i<3?e:null===n?n=Object.getOwnPropertyDescriptor(e,a):n;if("object"===typeof Reflect&&"function"===typeof Reflect.decorate)s=Reflect.decorate(t,e,a,n);else for(var l=t.length-1;l>=0;l--)(o=t[l])&&(s=(i<3?o(s):i>3?o(e,a,s):o(e,a))||s);return i>3&&s&&Object.defineProperty(e,a,s),s};let P=class extends i["Vue"]{constructor(){super(...arguments),this.keyMapTitleField="WGO_FINANCE_CONTACT_ADMIN_PAGE_MAP_TITLE_FIELD",this.keyContactTitleField="WGO_FINANCE_CONTACT_ADMIN_PAGE_CONTACT_TITLE_FIELD",this.keyContactContentField="WGO_FINANCE_CONTACT_ADMIN_PAGE_CONTACT_CONTENT_FIELD",this.contactPageTitle="WGO_FINANCE_CONTACT_ADMIN_PAGE_TITLE",this.contactNameField="WGO_FINANCE_CONTACT_ADMIN_PAGE_CONTACT_NAME_FIELD",this.phoneNumberField="WGO_FINANCE_CONTACT_ADMIN_PAGE_PHONE_NUMBER_FIELD",this.addressField="WGO_FINANCE_CONTACT_ADMIN_PAGE_ADDRESS_FIELD",this.emailField="WGO_FINANCE_CONTACT_ADMIN_PAGE_EMAIL_FIELD",this.mapField="WGO_FINANCE_CONTACT_ADMIN_PAGE_MAP_FIELD",this.mapPreviewField="WGO_FINANCE_CONTACT_ADMIN_PAGE_MAP_PREVIEW_FIELD",this.successSave="WGO_FINANCE_CONTACT_ADMIN_PAGE_SUCCESS_SAVE",this.failSave="WGO_FINANCE_CONTACT_ADMIN_PAGE_FAIL_SAVE",this.keyMapTitle="WGO_FINANCE_MAP_CONTENT_TITLE",this.keyContactTitle="WGO_FINANCE_CONTACT_TITLE",this.keyContactContent="WGO_FINANCE_CONTACT_BODY"}};P=I([Object(i["Component"])({components:{ContactAdminComponent:E}})],P);var k=P,j=k,M=a("9989"),D=Object(N["a"])(j,n,o,!1,null,null,null);e["default"]=D.exports;f()(D,"components",{QPage:M["a"]})}}]);