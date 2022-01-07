(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[51],{"367e":function(e,t,s){"use strict";s.r(t);var a=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("q-page",{staticClass:"row justify-evenly"},[s("div",{staticClass:"col-12 q-pa-md"},[s("UserListComponent")],1)])},o=[],n=s("60a3"),i=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticStyle:{width:"100%"}},[e.loading?e._e():s("q-card",{staticClass:"bg-grey-1",attrs:{flat:"",bordered:""}},[s("q-card-section",[s("div",{staticClass:"row items-center justify-between q-table"},[s("div",{staticClass:"col-12 col-sm-auto no-wrap"},[s("div",{staticClass:"q-table__title ellipsis"},[e._v("\n            "+e._s(e.translationContent.WGO_USERS_TITLE)+"\n          ")])]),s("div",{staticClass:"flex q-pb-sm justify-end col-12 col-sm-auto row"},[s("q-btn",{staticClass:"col-12 col-sm-auto q-ml-sm q-mb-sm",attrs:{unelevated:"",color:"primary",icon:"person",label:e.translationContent.WGO_USERS_CREATE_USER_LABEL,"no-caps":""},on:{click:function(){return e.updateUser(null)}}})],1)])]),s("q-card-section",[e.usersListFinal?s("div",[e.usersListFinal.length>0?s("q-card-section",{staticClass:"q-pa-none"},[s("div",{staticClass:"q-pa-none",staticStyle:{width:"100%"}},[e.usersListFinal.length?s("q-list",[e._l(e.usersListFinal,(function(t,a){return[s("UserExpanded",{key:""+t.userName+a,attrs:{userModel:t}},[[s("q-btn",{staticClass:"q-ml-sm",attrs:{flat:"",dense:"",unelevated:"",color:"primary",icon:"edit"},on:{click:function(){return e.updateUser(t)}}}),s("q-btn",{staticClass:"q-ml-sm",attrs:{dense:"",flat:"",unelevated:"",color:"negative",icon:"delete"},on:{click:function(){return e.confirmDeleteUser(t)}}}),s("br")]],2)]}))],2):e._e(),s("div",{staticClass:"q-pa-lg flex flex-center"},[e.usersListFinal.length?s("q-pagination",{attrs:{max:e.maxPage,input:"","icon-first":"skip_previous","icon-last":"skip_next","icon-prev":"fast_rewind","icon-next":"fast_forward"},model:{value:e.currentPage,callback:function(t){e.currentPage=t},expression:"currentPage"}}):e._e()],1)],1)]):e._e(),s("UserUpdateDialog",{attrs:{showModal:e.showUpdateModal,close:function(){return e.showUpdateModal=!1},userModel:e.userSelected}}),s("Loader",{attrs:{loading:e.innerLoading}}),s("ConfirmDialog",{attrs:{icon:"delete",showModal:e.confirm,cancelButton:e.translationContent.WGO_CLOSE_BTN,okButton:e.translationContent.WGO_DELETE_BTN,text:e.translationContent.WGO_USERS_DELETE_USER_MESSAGE,onConfirm:function(){return e.deleteUser()},onClose:function(){return e.confirm=!1}}})],1):e._e()])],1),s("Loader",{attrs:{loading:e.loading}})],1)},l=[],r=s("4bb5");const c={name:"idUser",required:!0,label:"ID",align:"left",field:e=>e.id?e.id.toString():"",sortable:!0,classes:"ellipsis",style:"max-width: 200px"},d={name:"nameUser",required:!0,label:"Name",align:"left",field:e=>e.name?e.name:"",sortable:!0,classes:"ellipsis",style:"max-width: 200px"},u={name:"lastnameUser",required:!0,label:"Lastname",align:"left",field:e=>e.lastName?e.lastName:"",sortable:!0,classes:"ellipsis",style:"max-width: 200px"},p={name:"emailUser",required:!0,label:"Email",align:"left",field:e=>e.email?e.email:"",sortable:!0,classes:"ellipsis",style:"max-width: 200px"},m={name:"usernameUser",required:!0,label:"Username",align:"left",field:e=>e.userName?e.userName:"",sortable:!0,classes:"ellipsis",style:"max-width: 200px"},f={name:"emailConfirmedUser",required:!0,label:"Is Email Confirmed",align:"left",field:e=>e.isEmailConfirmed?"TRUE":"FALSE",sortable:!0,classes:"ellipsis",style:"max-width: 200px"},_={name:"rolesUser",required:!0,label:"Roles",align:"left",field:e=>e.roles?E(e.roles):"",sortable:!0,classes:"ellipsis",style:"max-width: 200px"},h={name:"actionsUser",required:!1,label:"Actions",align:"left",sortable:!1,classes:"ellipsis",style:"max-width: 200px"};function E(e){let t="",s=!0;for(const a of e)s?(s=!1,t=a.name):t+=", "+a.name;return t}const C=[c,p,d,u,m,f,_,h],b=e=>{c.label=e.WGO_USERS_COLUMN_ID_LABEL,p.label=e.WGO_USERS_COLUMN_EMAIL_LABEL,d.label=e.WGO_USERS_COLUMN_NAME_LABEL,u.label=e.WGO_USERS_COLUMN_LASTNAME_LABEL,m.label=e.WGO_USERS_COLUMN_USERNAME_LABEL,_.label=e.WGO_USERS_COLUMN_ROLES_LABEL,h.label=e.WGO_USERS_COLUMN_ACTIONS_LABEL,f.label=e.WGO_USERS_COLUMN_EMAIL_LABEL,f.field=t=>t.isEmailConfirmed?e.WGO_USERS_COLUMN_ENABLED_STATUS:e.WGO_USERS_COLUMN_DISABLED_STATUS};var O=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("Dialog",{attrs:{title:e.getTitle(),showModal:e.showModal,close:e.onClose,loading:e.showLoading}},[s("template",{slot:"content"},[s("UserUpdateComponent",{attrs:{close:e.close,userModel:e.userModel,showLoading:function(t){return e.showLoading=t}}})],1),s("template",{slot:"buttons"})],2)},S=[],L=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",[s("div",{staticClass:"row q-pa-sm"},[s("div",{staticClass:"col-12 col-sm-6"},[s("q-input",{staticClass:"q-ma-sm",attrs:{square:"",outlined:"",autofocus:!0,label:e.translationContent.WGO_USERS_COLUMN_USERNAME_LABEL+" *",dense:"",rules:[function(t){return!!t||e.translationContent.WGO_USERS_ERROR_FIELD_REQUIERED}]},model:{value:e.editProps.userName,callback:function(t){e.$set(e.editProps,"userName",t)},expression:"editProps.userName"}})],1),s("div",{staticClass:"col-12 col-sm-6"},[s("q-input",{staticClass:"q-ma-sm",attrs:{square:"",outlined:"",autofocus:!0,label:e.translationContent.WGO_USERS_COLUMN_EMAIL_LABEL+" *",dense:"",type:"email",error:e.emailError,rules:[function(t){return!!t||e.translationContent.WGO_USERS_ERROR_FIELD_REQUIERED},e.isValidEmail]},model:{value:e.editProps.email,callback:function(t){e.$set(e.editProps,"email",t)},expression:"editProps.email"}})],1),s("div",{staticClass:"col-12 col-sm-6"},[s("q-input",{staticClass:"q-ma-sm",attrs:{square:"",outlined:"",autofocus:!0,label:e.translationContent.WGO_USERS_COLUMN_NAME_LABEL+" *",dense:"",rules:[function(t){return!!t||e.translationContent.WGO_USERS_ERROR_FIELD_REQUIERED}]},model:{value:e.editProps.name,callback:function(t){e.$set(e.editProps,"name",t)},expression:"editProps.name"}})],1),s("div",{staticClass:"col-12 col-sm-6"},[s("q-input",{staticClass:"q-ma-sm",attrs:{square:"",outlined:"",autofocus:!0,label:e.translationContent.WGO_USERS_COLUMN_LASTNAME_LABEL+" *",rules:[function(t){return!!t||e.translationContent.WGO_USERS_ERROR_FIELD_REQUIERED}],dense:""},model:{value:e.editProps.lastName,callback:function(t){e.$set(e.editProps,"lastName",t)},expression:"editProps.lastName"}})],1),s("div",{staticClass:"col-12 col-sm-6"},[s("q-input",{staticClass:"q-ma-sm",attrs:{square:"",outlined:"",autofocus:!0,label:e.translationContent.WGO_USERS_PASSWORD_LABEL+" *",dense:"",rules:[function(t){return!!t||e.translationContent.WGO_USERS_ERROR_FIELD_REQUIERED},e.isSecurePassword],type:e.isPwd?"password":"text"},scopedSlots:e._u([{key:"append",fn:function(){return[s("q-icon",{staticClass:"cursor-pointer",attrs:{name:e.isPwd?"visibility_off":"visibility"},on:{click:function(t){e.isPwd=!e.isPwd}}})]},proxy:!0}]),model:{value:e.editProps.password,callback:function(t){e.$set(e.editProps,"password",t)},expression:"editProps.password"}})],1),s("div",{staticClass:"col-12 col-sm-6"},[s("q-input",{staticClass:"q-ma-sm",attrs:{square:"",outlined:"",autofocus:!0,label:e.translationContent.WGO_USERS_CONFIRMPASSWORD_LABEL+" *",dense:"",rules:[function(t){return!!t||e.translationContent.WGO_USERS_ERROR_CONFIRM_PASSWORD},function(t){return t==e.editProps.password||e.translationContent.WGO_USERS_ERROR_PASSWORD_NOT_MATCH}],type:e.isPwd?"password":"text"},scopedSlots:e._u([{key:"append",fn:function(){return[s("q-icon",{staticClass:"cursor-pointer",attrs:{name:e.isPwd?"visibility_off":"visibility"},on:{click:function(t){e.isPwd=!e.isPwd}}})]},proxy:!0}]),model:{value:e.confirmPassword,callback:function(t){e.confirmPassword=t},expression:"confirmPassword"}})],1),s("div",{staticClass:"col-12 col-sm-6 q-px-sm"},[s("q-select",{staticClass:"q-ma-sm",attrs:{multiple:"",label:e.translationContent.WGO_USERS_COLUMN_ROLES_LABEL+" *",options:e.rolesList,"option-value":"id","option-label":"name"},model:{value:e.editProps.roles,callback:function(t){e.$set(e.editProps,"roles",t)},expression:"editProps.roles"}})],1),s("div",{staticClass:"col-12 col-sm-6"},[s("q-toggle",{staticClass:"q-ma-sm col-md-6",attrs:{label:e.translationContent.WGO_USERS_COLUMN_ISEMAILCONFIRMED_LABEL},model:{value:e.editProps.isEmailConfirmed,callback:function(t){e.$set(e.editProps,"isEmailConfirmed",t)},expression:"editProps.isEmailConfirmed"}})],1)]),s("q-card-section",{staticClass:"justify-around text-primary row q-py-none"},[s("q-btn",{staticClass:"col-12 col-sm-auto q-mt-sm",attrs:{unelevated:"",color:"primary",label:e.translationContent.WGO_CLOSE_BTN},on:{click:function(){return e.close()}}}),s("q-btn",{staticClass:"col-12 col-sm-auto q-mt-sm",attrs:{unelevated:"",color:"primary",disable:!e.isValid(),label:e.translationContent.WGO_SAVE_BTN},on:{click:function(){return e.submitUser()}}})],1)],1)},U=[],v=s("b834"),R=s("ea1a"),y=s("7641"),g=function(e,t,s,a){var o,n=arguments.length,i=n<3?t:null===a?a=Object.getOwnPropertyDescriptor(t,s):a;if("object"===typeof Reflect&&"function"===typeof Reflect.decorate)i=Reflect.decorate(e,t,s,a);else for(var l=e.length-1;l>=0;l--)(o=e[l])&&(i=(n<3?o(i):n>3?o(t,s,i):o(t,s))||i);return n>3&&i&&Object.defineProperty(t,s,i),i},M=function(e,t,s,a){function o(e){return e instanceof s?e:new s((function(t){t(e)}))}return new(s||(s=Promise))((function(s,n){function i(e){try{r(a.next(e))}catch(t){n(t)}}function l(e){try{r(a["throw"](e))}catch(t){n(t)}}function r(e){e.done?s(e.value):o(e.value).then(i,l)}r((a=a.apply(e,t||[])).next())}))};let P=class extends n["Vue"]{constructor(){super(),this.editProps={id:this.userModel?this.userModel.id:0,uuid:this.userModel?this.userModel.uuid:"",email:this.userModel?this.userModel.email:"",name:this.userModel?this.userModel.name:"",lastName:this.userModel?this.userModel.lastName:"",userName:this.userModel?this.userModel.userName:"",isEmailConfirmed:!!this.userModel&&this.userModel.isEmailConfirmed,roles:this.userModel?this.userModel.roles:[],password:this.userModel?this.userModel.password:""},this.confirmPassword="",this.isPwd=!0,this.emailError=!1}mounted(){return M(this,void 0,void 0,(function*(){yield this.loadData()}))}isValidPassword(){return!!this.userModel||this.editProps.password&&this.editProps.password==this.confirmPassword&&1==this.isSecurePassword(this.editProps.password)}isSecurePassword(e){const t=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\.@$!%*?&\+\-])[A-Za-z\d@$!%*?&\.\+\-]{8,}$/;return t.test(e)||this.translationContent.WGO_USERS_ERROR_PASSWORD_STRENGTH}isValid(){return this.editProps.userName&&this.editProps.email&&this.editProps.name&&this.editProps.lastName&&this.isValidPassword()&&1==this.isValidEmail(this.editProps.email)&&this.editProps.roles.length>0}isValidEmail(e){const t=/^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/;return t.test(e)||"Invalid email"}closePopUp(e){e.hide()}submitUser(){return M(this,void 0,void 0,(function*(){this.showLoading(!0);const e=[];for(const{id:a}of this.editProps.roles)e.push(a);const t={id:this.editProps.id,email:this.editProps.email,isEmailConfirmed:this.editProps.isEmailConfirmed,lastName:this.editProps.lastName,name:this.editProps.name,password:this.editProps.password,roles:e,userName:this.editProps.userName,uuid:this.editProps.uuid},s=this.userModel?yield this.updateUser(t):yield this.createUser(t);s?(this.notify({message:this.userModel?this.translationContent.WGO_USERS_SUCCESS_EDIT_ACTION:this.translationContent.WGO_USERS_SUCCESS_CREATE_ACTION,type:"positive"}),this.close()):this.notify({message:"Error on created!",type:"negative"}),this.showLoading(!1)}))}};g([Object(n["Prop"])()],P.prototype,"userModel",void 0),g([Object(n["Prop"])()],P.prototype,"close",void 0),g([Object(n["Prop"])()],P.prototype,"showLoading",void 0),g([Object(r["b"])(y["b"].getTranslations,{namespace:y["e"]})],P.prototype,"translationContent",void 0),g([Object(r["a"])(v["a"].updateUserAdmin,{namespace:v["d"]})],P.prototype,"updateUser",void 0),g([Object(r["a"])(v["a"].createUser,{namespace:v["d"]})],P.prototype,"createUser",void 0),g([Object(r["b"])(v["b"].getRoles,{namespace:v["d"]})],P.prototype,"rolesList",void 0),g([Object(r["a"])(v["a"].allRoles,{namespace:v["d"]})],P.prototype,"loadData",void 0),g([Object(r["a"])(R["a"].notify,{namespace:R["c"]})],P.prototype,"notify",void 0),P=g([Object(n["Component"])({components:{}})],P);var q=P,w=q,N=s("2877"),x=s("27f9"),A=s("0016"),j=s("ddd8"),W=s("9564"),G=s("a370"),D=s("9c40"),I=s("eebe"),T=s.n(I),B=Object(N["a"])(w,L,U,!1,null,null,null),k=B.exports;T()(B,"components",{QInput:x["a"],QIcon:A["a"],QSelect:j["a"],QToggle:W["a"],QCardSection:G["a"],QBtn:D["a"]});var $=s("1d08"),Q=function(e,t,s,a){var o,n=arguments.length,i=n<3?t:null===a?a=Object.getOwnPropertyDescriptor(t,s):a;if("object"===typeof Reflect&&"function"===typeof Reflect.decorate)i=Reflect.decorate(e,t,s,a);else for(var l=e.length-1;l>=0;l--)(o=e[l])&&(i=(n<3?o(i):n>3?o(t,s,i):o(t,s))||i);return n>3&&i&&Object.defineProperty(t,s,i),i};let F=class extends n["Vue"]{constructor(){super(...arguments),this.showLoading=!1}onClose(){this.close&&this.close()}getTitle(){return this.userModel?this.translationContent.WGO_USERS_MODIFY_USER_LABEL:this.translationContent.WGO_USERS_CREATE_USER_LABEL}};Q([Object(r["b"])(y["b"].getTranslations,{namespace:y["e"]})],F.prototype,"translationContent",void 0),Q([Object(n["Prop"])({default:!1})],F.prototype,"showModal",void 0),Q([Object(n["Prop"])()],F.prototype,"close",void 0),Q([Object(n["Prop"])()],F.prototype,"userModel",void 0),F=Q([Object(n["Component"])({components:{UserUpdateComponent:k,Dialog:$["a"]}})],F);var V=F,z=V,Z=Object(N["a"])(z,O,S,!1,null,null,null),H=Z.exports,J=s("616c"),Y=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("Expanded",{attrs:{labels:e.labels,icon:"person",group:"userExpanded"}},[s("template",{slot:"content"},[s("div",{staticClass:"row q-py-sm"},[s("div",{staticClass:"col-12 col-sm-6"},[s("q-input",{staticClass:"q-mx-md q-my-sm",attrs:{readonly:"",square:"",outlined:"",label:e.translationContent.WGO_USERS_COLUMN_USERNAME_LABEL,dense:""},model:{value:e.userModel.userName,callback:function(t){e.$set(e.userModel,"userName",t)},expression:"userModel.userName"}})],1),s("div",{staticClass:"col-12 col-sm-6"},[s("q-input",{staticClass:"q-mx-md q-my-sm",attrs:{readonly:"",square:"",outlined:"",label:e.translationContent.WGO_USERS_COLUMN_EMAIL_LABEL,dense:""},model:{value:e.userModel.email,callback:function(t){e.$set(e.userModel,"email",t)},expression:"userModel.email"}})],1),s("div",{staticClass:"col-12 col-sm-6"},[s("q-input",{staticClass:"q-mx-md q-my-sm",attrs:{readonly:"",square:"",outlined:"",label:e.translationContent.WGO_USERS_COLUMN_NAME_LABEL,dense:""},model:{value:e.userModel.name,callback:function(t){e.$set(e.userModel,"name",t)},expression:"userModel.name"}})],1),s("div",{staticClass:"col-12 col-sm-6"},[s("q-input",{staticClass:"q-mx-md q-my-sm",attrs:{readonly:"",square:"",outlined:"",label:e.translationContent.WGO_USERS_COLUMN_LASTNAME_LABEL,dense:""},model:{value:e.userModel.lastName,callback:function(t){e.$set(e.userModel,"lastName",t)},expression:"userModel.lastName"}})],1),s("div",{staticClass:"col-12 col-sm-6 q-px-sm"},[s("q-select",{staticClass:"q-mx-md q-my-sm",attrs:{readonly:"",multiple:"","option-value":"id","option-label":"name",label:e.translationContent.WGO_USERS_COLUMN_ROLES_LABEL},model:{value:e.userModel.roles,callback:function(t){e.$set(e.userModel,"roles",t)},expression:"userModel.roles"}})],1),s("div",{staticClass:"col-12 col-sm-6"},[s("q-toggle",{staticClass:"q-mx-md q-my-sm",attrs:{disable:"",label:e.translationContent.WGO_USERS_COLUMN_ISEMAILCONFIRMED_LABEL},model:{value:e.userModel.isEmailConfirmed,callback:function(t){e.$set(e.userModel,"isEmailConfirmed",t)},expression:"userModel.isEmailConfirmed"}})],1)])]),s("template",{slot:"buttons"},[e._t("default")],2)],2)},K=[],X=s("bfaf"),ee=function(e,t,s,a){var o,n=arguments.length,i=n<3?t:null===a?a=Object.getOwnPropertyDescriptor(t,s):a;if("object"===typeof Reflect&&"function"===typeof Reflect.decorate)i=Reflect.decorate(e,t,s,a);else for(var l=e.length-1;l>=0;l--)(o=e[l])&&(i=(n<3?o(i):n>3?o(t,s,i):o(t,s))||i);return n>3&&i&&Object.defineProperty(t,s,i),i};let te=class extends n["Vue"]{constructor(){super(...arguments),this.labels=[this.userModel.userName,this.userModel.email,this.getRoles()]}getRoles(){return this.userModel.roles.map((e=>e.name)).join(", ")}};ee([Object(n["Prop"])()],te.prototype,"userModel",void 0),ee([Object(r["b"])(y["b"].getTranslations,{namespace:y["e"]})],te.prototype,"translationContent",void 0),te=ee([Object(n["Component"])({components:{Expanded:X["a"]}})],te);var se=te,ae=se,oe=Object(N["a"])(ae,Y,K,!1,null,null,null),ne=oe.exports;T()(oe,"components",{QInput:x["a"],QSelect:j["a"],QToggle:W["a"]});var ie=s("149f"),le=function(e,t,s,a){var o,n=arguments.length,i=n<3?t:null===a?a=Object.getOwnPropertyDescriptor(t,s):a;if("object"===typeof Reflect&&"function"===typeof Reflect.decorate)i=Reflect.decorate(e,t,s,a);else for(var l=e.length-1;l>=0;l--)(o=e[l])&&(i=(n<3?o(i):n>3?o(t,s,i):o(t,s))||i);return n>3&&i&&Object.defineProperty(t,s,i),i},re=function(e,t,s,a){function o(e){return e instanceof s?e:new s((function(t){t(e)}))}return new(s||(s=Promise))((function(s,n){function i(e){try{r(a.next(e))}catch(t){n(t)}}function l(e){try{r(a["throw"](e))}catch(t){n(t)}}function r(e){e.done?s(e.value):o(e.value).then(i,l)}r((a=a.apply(e,t||[])).next())}))};let ce=class extends n["Vue"]{constructor(){super(),this.loading=!0,this.confirm=!1,this.innerLoading=!0,this.maxPage=0,this.currentPage=1,this.pageItems=5,this.usersCount=0,this.search="",this.showUpdateModal=!1,this.userSelected=null,this.columns=C}mounted(){return re(this,void 0,void 0,(function*(){yield this.registerTranslations(J["b"]),yield this.loadData(),this.editSearch(),this.loading=!1,this.innerLoading=!1}))}updateUser(e){this.userSelected=e,this.showUpdateModal=!0}confirmDeleteUser(e){this.userSelected=e,this.confirm=!0}deleteUser(){return re(this,void 0,void 0,(function*(){if(null!=this.userSelected){const e=yield this.deleteUserAction(this.userSelected);e&&this.notify({message:"User deleted successfully",type:"positive"})}this.confirm=!1}))}setColumnsLabels(){b(this.translationContent)}editSearch(){this.loading=!0,this.currentPage=1,this.usersListFinal=this.usersList.slice(0,this.pageItems),this.usersCount=this.usersList.length,this.maxPage=Math.floor(this.usersCount/this.pageItems)+(this.usersCount%this.pageItems>0?1:0),this.loading=!1}changePage(){this.loading=!0;const e=(this.currentPage-1)*this.pageItems;this.usersListFinal=this.usersList.slice(e,e+this.pageItems),this.loading=!1}};le([Object(r["a"])(v["a"].allUsers,{namespace:v["d"]})],ce.prototype,"loadData",void 0),le([Object(r["a"])(v["a"].deleteUser,{namespace:v["d"]})],ce.prototype,"deleteUserAction",void 0),le([Object(r["a"])(R["a"].notify,{namespace:R["c"]})],ce.prototype,"notify",void 0),le([Object(r["a"])(y["a"].registerTranslations,{namespace:y["e"]})],ce.prototype,"registerTranslations",void 0),le([Object(r["b"])(y["b"].getTranslations,{namespace:y["e"]})],ce.prototype,"translationContent",void 0),le([Object(r["b"])(v["b"].getUsers,{namespace:v["d"]})],ce.prototype,"usersList",void 0),le([Object(n["Watch"])("translationContent")],ce.prototype,"setColumnsLabels",null),le([Object(n["Watch"])("search")],ce.prototype,"editSearch",null),le([Object(n["Watch"])("currentPage"),Object(n["Watch"])("usersList"),Object(n["Watch"])("usersList.length")],ce.prototype,"changePage",null),ce=le([Object(n["Component"])({components:{UserUpdateDialog:H,UserExpanded:ne,ConfirmDialog:ie["a"]}})],ce);var de=ce,ue=de,pe=s("f09f"),me=s("eaac"),fe=s("1c1c"),_e=s("3b16"),he=Object(N["a"])(ue,i,l,!1,null,null,null),Ee=he.exports;T()(he,"components",{QCard:pe["a"],QCardSection:G["a"],QTable:me["a"],QBtn:D["a"],QList:fe["a"],QPagination:_e["a"]});var Ce=function(e,t,s,a){var o,n=arguments.length,i=n<3?t:null===a?a=Object.getOwnPropertyDescriptor(t,s):a;if("object"===typeof Reflect&&"function"===typeof Reflect.decorate)i=Reflect.decorate(e,t,s,a);else for(var l=e.length-1;l>=0;l--)(o=e[l])&&(i=(n<3?o(i):n>3?o(t,s,i):o(t,s))||i);return n>3&&i&&Object.defineProperty(t,s,i),i};let be=class extends n["Vue"]{};be=Ce([Object(n["Component"])({components:{UserListComponent:Ee}})],be);var Oe=be,Se=Oe,Le=s("9989"),Ue=Object(N["a"])(Se,a,o,!1,null,null,null);t["default"]=Ue.exports;T()(Ue,"components",{QPage:Le["a"]})}}]);