(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[14],{2340:function(t,e,n){"use strict";n.r(e);var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("q-page",{staticClass:"row justify-evenly"},[n("div",{staticClass:"col-12"},[n("IndexContent"),n("div",{staticClass:"row"},[n("div",{staticClass:"col-12"},[n("ScheduleComponent")],1),n("div",{staticClass:"col-12"},[n("MapComponent")],1),n("div",{staticClass:"col-12"},[n("ContactComponent")],1)])],1)])},i=[],o=n("60a3"),s=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"q-pa-md"},[n("div",{domProps:{innerHTML:t._s(t.getContent(t.contactTitle))}}),n("div",{domProps:{innerHTML:t._s(t.getContent(t.contactBody))}}),n("q-input",{attrs:{label:t.getContent(t.nameFieldLabel),placeholder:t.getContent(t.nameFieldPlaceholder)},model:{value:t.name,callback:function(e){t.name=e},expression:"name"}}),n("q-input",{attrs:{label:t.getContent(t.emailFieldLabel),placeholder:t.getContent(t.emailFieldPlaceholder),type:"email"},model:{value:t.email,callback:function(e){t.email=e},expression:"email"}}),n("q-input",{attrs:{label:t.getContent(t.msgFieldLabel),placeholder:t.getContent(t.msgFieldPlaceholder),type:"textarea"},model:{value:t.msg,callback:function(e){t.msg=e},expression:"msg"}}),n("br"),n("div",{staticClass:"flex justify-center items-center"},[n("q-btn",{attrs:{unelevated:"",label:t.getContent(t.btnSendLabel),color:"primary"},on:{click:function(){return t.sendEmail()}}})],1)],1)},r=[],c=n("4bb5"),l=n("ea1a"),d=n("dec1"),p=n("7641"),u=function(t,e,n,a){var i,o=arguments.length,s=o<3?e:null===a?a=Object.getOwnPropertyDescriptor(e,n):a;if("object"===typeof Reflect&&"function"===typeof Reflect.decorate)s=Reflect.decorate(t,e,n,a);else for(var r=t.length-1;r>=0;r--)(i=t[r])&&(s=(o<3?i(s):o>3?i(e,n,s):i(e,n))||s);return o>3&&s&&Object.defineProperty(e,n,s),s},m=function(t,e,n,a){function i(t){return t instanceof n?t:new n((function(e){e(t)}))}return new(n||(n=Promise))((function(n,o){function s(t){try{c(a.next(t))}catch(e){o(e)}}function r(t){try{c(a["throw"](t))}catch(e){o(e)}}function c(t){t.done?n(t.value):i(t.value).then(s,r)}c((a=a.apply(t,e||[])).next())}))};let h=class extends o["Vue"]{constructor(){super(),this.contactTitle="WGO_CASINA_CONTACT_TITLE",this.contactBody="WGO_CASINA_CONTACT_BODY",this.nameFieldLabel="WGO_CASINA_CONTACT_FIELD_NAME_LABEL",this.nameFieldPlaceholder="WGO_CASINA_CONTACT_FIELD_NAME_PLACEHOLDER",this.emailFieldLabel="WGO_CASINA_CONTACT_FIELD_EMAIL_LABEL",this.emailFieldPlaceholder="WGO_CASINA_CONTACT_FIELD_EMAIL_PLACEHOLDER",this.msgFieldLabel="WGO_CASINA_CONTACT_FIELD_MESSAGE_LABEL",this.msgFieldPlaceholder="WGO_CASINA_CONTACT_FIELD_MESSAGE_PLACEHOLDER",this.btnSendLabel="WGO_CASINA_CONTACT_BUTTON_SEND_LABEL",this.subjectEmail="WGO_CASINA_CONTACT_EMAIL_SUBJECT",this.successEmailSend="WGO_CASINA_CONTACT_EMAIL_SUCCESS_MESSAGE",this.failEmailSend="WGO_CASINA_CONTACT_EMAIL_FAIL_MESSAGE",this.loading=!0,this.name="",this.email="",this.msg=""}getContent(t){return t in this.translationContent?this.translationContent[t]:t}sendEmail(){return m(this,void 0,void 0,(function*(){this.loading=!0;let t=`<p>${this.getContent(this.nameFieldLabel)}: ${this.name}</p>`;t+=`<p>${this.getContent(this.emailFieldLabel)}: ${this.email}</p><br/>`,t+=`<p>${this.msg.split("\n").join("</p><p>")}</p>`,(yield this.sendEmailAction({subject:this.getContent(this.subjectEmail),body:t,to:`<${this.email}> "${this.name}"`}))?(this.loading=!1,this.notify({message:this.getContent(this.successEmailSend),type:"negative"})):(this.loading=!1,this.notify({message:this.getContent(this.failEmailSend),type:"negative"}))}))}created(){return m(this,void 0,void 0,(function*(){yield this.registerTranslations({[this.contactTitle]:!1,[this.contactBody]:!1,[this.nameFieldLabel]:!1,[this.nameFieldPlaceholder]:!1,[this.emailFieldLabel]:!1,[this.emailFieldPlaceholder]:!1,[this.msgFieldLabel]:!1,[this.msgFieldPlaceholder]:!1,[this.btnSendLabel]:!1,[this.subjectEmail]:!1,[this.successEmailSend]:!1,[this.failEmailSend]:!1}),this.loading=!1}))}};u([Object(c["a"])(d["a"].sendEmailFromToAddressAndApp,{namespace:d["c"]})],h.prototype,"sendEmailAction",void 0),u([Object(c["a"])(l["a"].notify,{namespace:l["c"]})],h.prototype,"notify",void 0),u([Object(c["a"])(p["a"].registerTranslations,{namespace:p["e"]})],h.prototype,"registerTranslations",void 0),u([Object(c["b"])(p["b"].getTranslations,{namespace:p["e"]})],h.prototype,"translationContent",void 0),h=u([Object(o["Component"])({components:{}})],h);var f=h,C=f,g=n("2877"),b=n("27f9"),v=n("9c40"),_=n("eebe"),y=n.n(_),O=Object(g["a"])(C,s,r,!1,null,null,null),T=O.exports;y()(O,"components",{QInput:b["a"],QBtn:v["a"]});var A=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"q-pa-md"},[n("div",{domProps:{innerHTML:t._s(t.getContent(t.mapTitleSection))}}),n("iframe",{staticStyle:{border:"0"},attrs:{tabindex:"0",src:t.mapPath,width:"100%",height:"500",frameborder:"0",allowfullscreen:"allowfullscreen","aria-hidden":"false"}}),n("div",[n("q-card",{staticClass:"my-card",attrs:{flat:""}},[n("q-card-section",[n("div",{staticClass:"text-h6 text-center"},[t._v(t._s(t.contactName))]),n("div",{staticClass:"text-body1 text-center"},[t._v(t._s(t.address))]),n("br"),n("div",{staticClass:"text-body1 text-center"},[t._v("\n          "+t._s(t.getContent(t.contentMapPhoneNumberLabel))+": "+t._s(t.phoneNumber)+"\n        ")]),n("div",{staticClass:"text-body1 text-center"},[t._v("\n          "+t._s(t.getContent(t.contentMapEmailLabel))+": "+t._s(t.email)+"\n        ")])])],1)],1)])},j=[],E=n("546a"),S=function(t,e,n,a){var i,o=arguments.length,s=o<3?e:null===a?a=Object.getOwnPropertyDescriptor(e,n):a;if("object"===typeof Reflect&&"function"===typeof Reflect.decorate)s=Reflect.decorate(t,e,n,a);else for(var r=t.length-1;r>=0;r--)(i=t[r])&&(s=(o<3?i(s):o>3?i(e,n,s):i(e,n))||s);return o>3&&s&&Object.defineProperty(e,n,s),s},L=function(t,e,n,a){function i(t){return t instanceof n?t:new n((function(e){e(t)}))}return new(n||(n=Promise))((function(n,o){function s(t){try{c(a.next(t))}catch(e){o(e)}}function r(t){try{c(a["throw"](t))}catch(e){o(e)}}function c(t){t.done?n(t.value):i(t.value).then(s,r)}c((a=a.apply(t,e||[])).next())}))};let P=class extends o["Vue"]{constructor(){super(),this.contentMapPhoneNumberLabel="WGO_CASINA_MAP_CONTACT_NUMBER_LABEL",this.contentMapEmailLabel="WGO_CASINA_MAP_CONTACT_EMAIL_LABEL",this.mapTitleSection="WGO_CASINA_MAP_CONTENT_TITLE",this.loading=!0,this.contactName="",this.address="",this.phoneNumber="",this.email="",this.mapPath=""}getContent(t){return t in this.translationContent?this.translationContent[t]:t}created(){return L(this,void 0,void 0,(function*(){yield this.registerTranslations({[this.contentMapPhoneNumberLabel]:!0,[this.contentMapEmailLabel]:!0,[this.mapTitleSection]:!1});const t=yield this.loadContactData();this.contactName=t.contactName,this.address=t.address,this.phoneNumber=t.phoneNumber,this.email=t.email,this.mapPath=t.mapPath,this.loading=!1}))}};S([Object(c["a"])(E["a"].getContact,{namespace:E["d"]})],P.prototype,"loadContactData",void 0),S([Object(c["b"])(E["b"].getContactData,{namespace:E["d"]})],P.prototype,"contactData",void 0),S([Object(c["a"])(p["a"].registerTranslations,{namespace:p["e"]})],P.prototype,"registerTranslations",void 0),S([Object(c["b"])(p["b"].getTranslations,{namespace:p["e"]})],P.prototype,"translationContent",void 0),P=S([Object(o["Component"])({components:{}})],P);var x=P,N=x,I=n("f09f"),q=n("a370"),D=Object(g["a"])(N,A,j,!1,null,null,null),M=D.exports;y()(D,"components",{QCard:I["a"],QCardSection:q["a"]});var w=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"q-pa-md"},[n("div",{domProps:{innerHTML:t._s(t.getContent(t.scheduleTitle))}}),n("div",{domProps:{innerHTML:t._s(t.getContent(t.scheduleContent))}})])},R=[],F=function(t,e,n,a){var i,o=arguments.length,s=o<3?e:null===a?a=Object.getOwnPropertyDescriptor(e,n):a;if("object"===typeof Reflect&&"function"===typeof Reflect.decorate)s=Reflect.decorate(t,e,n,a);else for(var r=t.length-1;r>=0;r--)(i=t[r])&&(s=(o<3?i(s):o>3?i(e,n,s):i(e,n))||s);return o>3&&s&&Object.defineProperty(e,n,s),s},G=function(t,e,n,a){function i(t){return t instanceof n?t:new n((function(e){e(t)}))}return new(n||(n=Promise))((function(n,o){function s(t){try{c(a.next(t))}catch(e){o(e)}}function r(t){try{c(a["throw"](t))}catch(e){o(e)}}function c(t){t.done?n(t.value):i(t.value).then(s,r)}c((a=a.apply(t,e||[])).next())}))};let B=class extends o["Vue"]{constructor(){super(),this.scheduleTitle="WGO_CASINA_SCHEDULE_TITLE",this.scheduleContent="WGO_CASINA_SCHEDULE_CONTENT",this.loading=!0}getContent(t){return t in this.translationContent?this.translationContent[t]:t}created(){return G(this,void 0,void 0,(function*(){yield this.registerTranslations({[this.scheduleTitle]:!1,[this.scheduleContent]:!1}),this.loading=!1}))}};F([Object(c["a"])(p["a"].registerTranslations,{namespace:p["e"]})],B.prototype,"registerTranslations",void 0),F([Object(c["b"])(p["b"].getTranslations,{namespace:p["e"]})],B.prototype,"translationContent",void 0),B=F([Object(o["Component"])({components:{}})],B);var H=B,W=H,$=Object(g["a"])(W,w,R,!1,null,null,null),Q=$.exports,z=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("Loader",{attrs:{loading:t.innerLoading||t.loading}}),t.innerLoading?t._e():n("div",[n("MediaDiv",{attrs:{image:t.indexContent.image}}),n("div",{staticClass:"q-pt-xl q-pb-lg",domProps:{innerHTML:t._s(t.translationContent.CASINA_INDEX_CONTENT_TEXT)}}),n("div",{staticClass:"q-pt-xl q-pb-lg",domProps:{innerHTML:t._s(t.translationContent.CASINA_INDEX_SERVICES_TEXT)}}),n("div",{staticClass:"row justify-around q-py-xl"},[t._l(t.services,(function(t){return[n("div",{key:"services"+t.id,staticClass:"col-12 col-sm-5 col-md-4 q-pa-md"},[n("SimpleCard",{attrs:{title:t.content.title,description:t.content.description}})],1)]}))],2),n("div",{staticClass:"q-pt-xl q-pb-lg",domProps:{innerHTML:t._s(t.translationContent.CASINA_INDEX_DOCTORS_TEXT)}}),t.doctors.length>1?n("div",{staticClass:"row justify-around q-pt-xl q-pb-lg"},[t._l(t.doctors,(function(t){return[n("div",{key:"doctors"+t.id,staticClass:"col-12 col-sm-5 col-md-4 q-pa-md"},[n("ProfileCard",{attrs:{image:t.image,icon:"badge",name:t.content.name,description:t.content.description,email:t.content.email}})],1)]}))],2):1===t.doctors.length?n("div",{staticClass:"q-pa-md"},[n("HorizontalProfileCard",{attrs:{image:t.doctors[0].image,icon:"badge",name:t.doctors[0].content.name,description:t.doctors[0].content.description,email:t.doctors[0].content.email}})],1):t._e()],1)],1)},k=[],V=n("7bf7"),U=n("0dd7"),X=n("28e4"),J=n("4159"),Y=n("1e1a"),K=n("b568"),Z=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("q-card",{staticClass:"text-center",staticStyle:{"min-height":"250px"},attrs:{flat:"",bordered:""}},[n("q-card-section",{staticClass:"q-pb-none"},[n("div",[t._v(t._s(t.title))])]),n("q-card-section",{staticClass:"q-pt-none text-grey-7",domProps:{innerHTML:t._s(t.getDescription())}})],1)},tt=[],et=n("5697"),nt=function(t,e,n,a){var i,o=arguments.length,s=o<3?e:null===a?a=Object.getOwnPropertyDescriptor(e,n):a;if("object"===typeof Reflect&&"function"===typeof Reflect.decorate)s=Reflect.decorate(t,e,n,a);else for(var r=t.length-1;r>=0;r--)(i=t[r])&&(s=(o<3?i(s):o>3?i(e,n,s):i(e,n))||s);return o>3&&s&&Object.defineProperty(e,n,s),s};let at=class extends o["Vue"]{getDescription(){return Object(et["a"])(this.description,380,3)}};nt([Object(o["Prop"])()],at.prototype,"title",void 0),nt([Object(o["Prop"])()],at.prototype,"description",void 0),at=nt([Object(o["Component"])({})],at);var it=at,ot=it,st=Object(g["a"])(ot,Z,tt,!1,null,null,null),rt=st.exports;y()(st,"components",{QCard:I["a"],QCardSection:q["a"]});var ct=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("q-card",{staticClass:"row q-py-md",staticStyle:{"min-height":"480px","align-content":"space-between","justify-content":"space-evenly","text-align":"center"},attrs:{flat:"",bordered:""}},[n("div",{staticClass:"col-12"},[n("q-card-section",[n("div",{staticClass:"flex justify-center"},[t.image&&t.image.url?n("q-avatar",{attrs:{size:t.avatarSize}},[n("q-img",{staticClass:"bg-grey-1 rounded-borders",attrs:{src:t.image.url,ratio:1}})],1):n("q-avatar",{attrs:{color:"primary",icon:t.icon,size:t.avatarSize}})],1)]),n("q-card-section",[n("div",[t._v(t._s(t.name))]),n("div",{staticClass:"q-pt-none text-grey-7",domProps:{innerHTML:t._s(t.getDescription())}})])],1),n("q-card-section",[n("a",{attrs:{href:t.getMailTo(),target:"_blank"}},[t._v(" "+t._s(t.email)+" ")])])],1)},lt=[],dt=function(t,e,n,a){var i,o=arguments.length,s=o<3?e:null===a?a=Object.getOwnPropertyDescriptor(e,n):a;if("object"===typeof Reflect&&"function"===typeof Reflect.decorate)s=Reflect.decorate(t,e,n,a);else for(var r=t.length-1;r>=0;r--)(i=t[r])&&(s=(o<3?i(s):o>3?i(e,n,s):i(e,n))||s);return o>3&&s&&Object.defineProperty(e,n,s),s};let pt=class extends o["Vue"]{constructor(){super(...arguments),this.avatarSize="170px"}getMailTo(){return`mailto:${this.email}`}getDescription(){return Object(et["a"])(this.description,300,3)}};dt([Object(o["Prop"])()],pt.prototype,"image",void 0),dt([Object(o["Prop"])()],pt.prototype,"icon",void 0),dt([Object(o["Prop"])()],pt.prototype,"name",void 0),dt([Object(o["Prop"])()],pt.prototype,"description",void 0),dt([Object(o["Prop"])()],pt.prototype,"email",void 0),pt=dt([Object(o["Component"])({components:{MediaDiv:X["a"]}})],pt);var ut=pt,mt=ut,ht=n("cb32"),ft=n("068f3"),Ct=Object(g["a"])(mt,ct,lt,!1,null,null,null),gt=Ct.exports;y()(Ct,"components",{QCard:I["a"],QCardSection:q["a"],QAvatar:ht["a"],QImg:ft["a"]});var bt=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("q-card",{staticClass:"row q-py-md",staticStyle:{"align-content":"space-between","justify-content":"space-evenly","text-align":"center"},attrs:{flat:"",bordered:""}},[n("div",{staticClass:"col-5 flex",staticStyle:{height:"350px","align-content":"center","justify-content":"center","align-self":"center"}},[n("q-card-section",[n("div",{staticClass:"flex justify-center self-center"},[t.image&&t.image.url?n("q-avatar",{attrs:{size:t.avatarSize}},[n("q-img",{staticClass:"bg-grey-1 rounded-borders",attrs:{src:t.image.url,ratio:1}})],1):n("q-avatar",{attrs:{color:"primary",icon:t.icon,size:t.avatarSize}})],1)])],1),n("q-card-section",{staticClass:"col-12 col-sm-7 row align-content: space-between; q-mt-sm q-mb-lg"},[n("div",{staticClass:"col-12",staticStyle:{height:"100%"}},[n("div",[t._v(t._s(t.name))]),n("div",{staticClass:"text-grey-7",domProps:{innerHTML:t._s(t.getDescription())}})]),n("div",{staticClass:"col-12 q-pb-lg"},[n("a",{attrs:{href:t.getMailTo(),target:"_blank"}},[t._v(" "+t._s(t.email)+" ")])])])],1)},vt=[],_t=function(t,e,n,a){var i,o=arguments.length,s=o<3?e:null===a?a=Object.getOwnPropertyDescriptor(e,n):a;if("object"===typeof Reflect&&"function"===typeof Reflect.decorate)s=Reflect.decorate(t,e,n,a);else for(var r=t.length-1;r>=0;r--)(i=t[r])&&(s=(o<3?i(s):o>3?i(e,n,s):i(e,n))||s);return o>3&&s&&Object.defineProperty(e,n,s),s};let yt=class extends o["Vue"]{constructor(){super(...arguments),this.avatarSize="270px"}getMailTo(){return`mailto:${this.email}`}getDescription(){return Object(et["a"])(this.description,1500,3)}};_t([Object(o["Prop"])()],yt.prototype,"image",void 0),_t([Object(o["Prop"])()],yt.prototype,"icon",void 0),_t([Object(o["Prop"])()],yt.prototype,"name",void 0),_t([Object(o["Prop"])()],yt.prototype,"description",void 0),_t([Object(o["Prop"])()],yt.prototype,"email",void 0),yt=_t([Object(o["Component"])({components:{MediaDiv:X["a"]}})],yt);var Ot=yt,Tt=Ot,At=Object(g["a"])(Tt,bt,vt,!1,null,null,null),jt=At.exports;y()(At,"components",{QCard:I["a"],QCardSection:q["a"],QAvatar:ht["a"],QImg:ft["a"]});var Et=function(t,e,n,a){var i,o=arguments.length,s=o<3?e:null===a?a=Object.getOwnPropertyDescriptor(e,n):a;if("object"===typeof Reflect&&"function"===typeof Reflect.decorate)s=Reflect.decorate(t,e,n,a);else for(var r=t.length-1;r>=0;r--)(i=t[r])&&(s=(o<3?i(s):o>3?i(e,n,s):i(e,n))||s);return o>3&&s&&Object.defineProperty(e,n,s),s},St=function(t,e,n,a){function i(t){return t instanceof n?t:new n((function(e){e(t)}))}return new(n||(n=Promise))((function(n,o){function s(t){try{c(a.next(t))}catch(e){o(e)}}function r(t){try{c(a["throw"](t))}catch(e){o(e)}}function c(t){t.done?n(t.value):i(t.value).then(s,r)}c((a=a.apply(t,e||[])).next())}))};let Lt=class extends o["Vue"]{constructor(){super(...arguments),this.innerLoading=!0,this.doctors=[],this.services=[],this.loading=!1}loadDataCards(){return St(this,void 0,void 0,(function*(){this.loading=!0;const t=yield this.loadDoctors({type:J["a"],urlApi:Y["a"].API_STATIC_BASE,lang:this.language?this.language.id:0});this.doctors=t;const e=yield this.loadServices({type:K["a"],urlApi:Y["a"].API_STATIC_BASE,lang:this.language?this.language.id:0});this.services=e,this.loading=!1}))}created(){return St(this,void 0,void 0,(function*(){yield this.registerTranslations(U["d"]),yield this.loadCasinaIndexContent(),yield this.loadDataCards(),this.innerLoading=!1}))}};Et([Object(c["a"])(V["a"].loadCasinaIndexContent,{namespace:V["e"]})],Lt.prototype,"loadCasinaIndexContent",void 0),Et([Object(c["b"])(V["b"].getIndexContent,{namespace:V["e"]})],Lt.prototype,"indexContent",void 0),Et([Object(c["a"])(p["a"].registerTranslations,{namespace:p["e"]})],Lt.prototype,"registerTranslations",void 0),Et([Object(c["b"])(p["b"].getTranslations,{namespace:p["e"]})],Lt.prototype,"translationContent",void 0),Et([Object(c["a"])(V["a"].getDoctorsByType,{namespace:V["e"]})],Lt.prototype,"loadDoctors",void 0),Et([Object(c["a"])(V["a"].getServicesByType,{namespace:V["e"]})],Lt.prototype,"loadServices",void 0),Et([Object(c["b"])(p["b"].getLanguage,{namespace:p["e"]})],Lt.prototype,"language",void 0),Et([Object(o["Watch"])("language")],Lt.prototype,"loadDataCards",null),Lt=Et([Object(o["Component"])({components:{MediaDiv:X["a"],SimpleCard:rt,ProfileCard:gt,HorizontalProfileCard:jt}})],Lt);var Pt=Lt,xt=Pt,Nt=Object(g["a"])(xt,z,k,!1,null,null,null),It=Nt.exports,qt=function(t,e,n,a){var i,o=arguments.length,s=o<3?e:null===a?a=Object.getOwnPropertyDescriptor(e,n):a;if("object"===typeof Reflect&&"function"===typeof Reflect.decorate)s=Reflect.decorate(t,e,n,a);else for(var r=t.length-1;r>=0;r--)(i=t[r])&&(s=(o<3?i(s):o>3?i(e,n,s):i(e,n))||s);return o>3&&s&&Object.defineProperty(e,n,s),s};let Dt=class extends o["Vue"]{};Dt=qt([Object(o["Component"])({components:{ContactComponent:T,MapComponent:M,ScheduleComponent:Q,IndexContent:It}})],Dt);var Mt=Dt,wt=Mt,Rt=(n("9f73"),n("9989")),Ft=Object(g["a"])(wt,a,i,!1,null,"45609484",null);e["default"]=Ft.exports;y()(Ft,"components",{QPage:Rt["a"]})},"3abf":function(t,e,n){},"9f73":function(t,e,n){"use strict";n("3abf")}}]);