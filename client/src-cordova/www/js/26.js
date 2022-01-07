(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[26],{"181e":function(t,e,o){"use strict";o("43d5")},"43d5":function(t,e,o){},"64d1":function(t,e,o){"use strict";o.r(e);var i=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("Products")},r=[],s=o("60a3"),c=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"q-pa-md",staticStyle:{width:"100%"}},[t.userLogged&&t.userLogged.isAdmin?o("q-table",{attrs:{bordered:"",flat:"",title:"",data:t.filterProducts,columns:t.columns,"row-key":"nameProduct",loading:t.loading},scopedSlots:t._u([{key:"top",fn:function(){return[o("div",{staticClass:"row items-center justify-between q-table"},[o("div",{staticClass:"col-12 col-sm-auto no-wrap"},[o("div",{staticClass:"q-table__title ellipsis"},[t._v("\n            Products\n          ")])]),o("div",{staticClass:"flex q-pb-sm justify-end col-12 col-sm-auto row"},[t.userLogged&&t.userLogged.isAdmin?o("q-btn",{staticClass:"col-12 col-sm-auto q-ml-sm q-mb-sm",attrs:{unelevated:"",color:"primary","no-caps":"",icon:"add",label:"Create Product"},on:{click:function(){return t.showEditProductDialog(null)}}}):t._e()],1)]),o("div",{staticClass:"row q-col-gutter-none justify-end",staticStyle:{width:"100%"}},[o("div",{staticClass:"col-12 col-md-3"},[o("FilterSelect",{attrs:{label:"Type",options:t.typeOptions,filterProp:"label",value:t.filter.type},on:{onChange:function(e){t.setType(e)}}})],1),o("div",{staticClass:"col-12 col-md-3"},[o("q-input",{attrs:{clearable:"",dense:"",outlined:"",prefix:"Name: "},model:{value:t.nameProductFilter,callback:function(e){t.nameProductFilter=e},expression:"nameProductFilter"}})],1)])]},proxy:!0},{key:"loading",fn:function(){return[o("Loader",{attrs:{loading:!0}})]},proxy:!0},{key:"body-cell-buttons",fn:function(e){return[o("q-td",{attrs:{props:e}},[o("div",[o("q-btn",{attrs:{unelevated:"",color:"primary",icon:"more_vert",dense:""}},[o("q-menu",[o("q-list",{staticStyle:{"min-width":"100px"}},[o("q-item",{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{clickable:""},on:{click:function(){return t.showProductDialog(e.row)}}},[o("q-item-section",{attrs:{avatar:""}},[o("q-avatar",{attrs:{icon:"assignment"}})],1),o("q-item-section",[t._v("Details")])],1),o("q-item",{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{clickable:""},on:{click:function(){return t.showEditProductDialog(e.row)}}},[o("q-item-section",{attrs:{avatar:""}},[o("q-avatar",{attrs:{icon:"edit"}})],1),o("q-item-section",[t._v("Edit")])],1)],1)],1)],1)],1)])]}}],null,!1,3054289057)}):t._e(),o("AddProductEditorDialog",{attrs:{productToEdit:t.selectedProduct,showModal:t.showAddProductDialog,close:function(){return t.showAddProductDialog=!1}}}),o("ViewerProductDialog",{attrs:{product:t.selectedProduct,showModal:t.showViewProductDialog,close:function(){return t.showViewProductDialog=!1}}})],1)},n=[],l=o("4bb5"),a=o("127a"),d=o("7155");const u={name:"nameProduct",required:!0,label:"Name",align:"left",field:"name",sortable:!0,classes:"ellipsis",style:"max-width: 100px"},p={name:"sellPriceProduct",align:"left",label:"Sell Price",field:"sellPrice",sortable:!0,classes:"ellipsis",style:"max-width: 250px"},m={name:"buyPriceProduct",label:"Buy Price",field:t=>1===t.type?t.buyPrice.toString():"-",align:"left",sortable:!0,classes:"ellipsis",style:"max-width: 100px"},f={name:"typeProduct",label:"Type",field:t=>Object(d["g"])(t.type),align:"left",sortable:!0,classes:"ellipsis",style:"max-width: 100px"},h={name:"unitCountProduct",label:"Count",field:t=>1===t.type?t.unitCount.toString():"-",align:"left",sortable:!0,classes:"ellipsis",style:"max-width: 100px"},y={name:"buttons",label:"",align:"",field:"name",style:"max-width: 100px"},b=[u,m,p,h,f,y];var P=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("Dialog",{attrs:{showModal:t.showModal,loading:t.showLoading,title:t.getTitle(),close:function(){return t.onClose()},styleDialog:"width: 400px; max-width: 80vw"}},[o("template",{slot:"content"},[o("AddProductEditor",{attrs:{productToEdit:t.productToEdit,close:function(){return t.onClose()},showLoading:function(e){return t.showLoading=e}}})],1)],2)},g=[],v=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",[o("q-input",{staticClass:"q-mx-md q-mb-lg q-mt-md",attrs:{square:"",outlined:"",label:"Name",autofocus:!0,dense:""},model:{value:t.product.name,callback:function(e){t.$set(t.product,"name",e)},expression:"product.name"}}),o("q-input",{staticClass:"q-mx-md q-my-lg",attrs:{square:"",outlined:"",label:"Description",autogrow:"",dense:""},model:{value:t.product.description,callback:function(e){t.$set(t.product,"description",e)},expression:"product.description"}}),t.isUpdateProduct?o("q-input",{staticClass:"q-mx-md q-my-lg",attrs:{square:"",outlined:"",value:t.productType.label,label:"Type",readonly:"",dense:""}}):o("div",{staticClass:"q-mx-md q-my-lg"},[o("FilterSelect",{attrs:{clearable:!1,label:"Type",options:t.typeOptions,filterProp:"label",value:t.productType},on:{onChange:function(e){t.setType(e)}}})],1),1===t.productType.value?o("q-input",{staticClass:"q-mx-md q-my-lg",attrs:{square:"",outlined:"",type:"number",label:"Buy Price",dense:""},model:{value:t.product.buyPrice,callback:function(e){t.$set(t.product,"buyPrice",e)},expression:"product.buyPrice"}}):t._e(),o("q-input",{staticClass:"q-mx-md q-my-lg",attrs:{square:"",outlined:"",type:"number",label:"Sell Price",dense:""},model:{value:t.product.sellPrice,callback:function(e){t.$set(t.product,"sellPrice",e)},expression:"product.sellPrice"}}),1===t.productType.value?o("q-input",{staticClass:"q-mx-md q-my-lg",attrs:{square:"",outlined:"",type:"number",label:"Unit Count",dense:""},model:{value:t.product.unitCount,callback:function(e){t.$set(t.product,"unitCount",e)},expression:"product.unitCount"}}):t._e(),o("MediaListEditor",{attrs:{items:t.product.docs,addItems:function(e){t.docsToAdd=e},title:"Bild documents",changeValue:function(){},showLoading:t.showLoading}}),o("q-card-section",{staticClass:"row items-center justify-center text-primary q-mt-md"},[o("q-btn",{staticClass:"col-12 col-sm-auto",attrs:{unelevated:"",color:"primary",align:"center",disable:!t.isValid(),label:t.isUpdateProduct?"Update":"Create"},on:{click:function(){return t.addProductClick()}}})],1)],1)},w=[],q=o("04f3"),C=o("7c62"),O=o("ea1a"),j=function(t,e,o,i){var r,s=arguments.length,c=s<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,o):i;if("object"===typeof Reflect&&"function"===typeof Reflect.decorate)c=Reflect.decorate(t,e,o,i);else for(var n=t.length-1;n>=0;n--)(r=t[n])&&(c=(s<3?r(c):s>3?r(e,o,c):r(e,o))||c);return s>3&&c&&Object.defineProperty(e,o,c),c},x=function(t,e,o,i){function r(t){return t instanceof o?t:new o((function(e){e(t)}))}return new(o||(o=Promise))((function(o,s){function c(t){try{l(i.next(t))}catch(e){s(e)}}function n(t){try{l(i["throw"](t))}catch(e){s(e)}}function l(t){t.done?o(t.value):r(t.value).then(c,n)}l((i=i.apply(t,e||[])).next())}))};let D=class extends s["Vue"]{constructor(){super(),this.docsToAdd=[],this.typeOptions=Object(d["f"])(),this.isUpdateProduct=!!this.productToEdit,this.product=this.isUpdateProduct?this.productToEdit:{id:0,name:"",description:"",buyPrice:0,sellPrice:0,unitCount:0,type:1,docs:[]},this.productType={value:this.product.type,label:Object(d["g"])(this.product.type)}}setType(t){this.productType=t}isValid(){return!!this.product.name&&!!this.product.sellPrice&&(this.product.buyPrice||1!==this.productType.value)&&(this.product.unitCount||1!==this.productType.value)}addProductClick(){return x(this,void 0,void 0,(function*(){this.showLoading(!0);const t=this.isUpdateProduct?yield this.updateProduct({id:this.productToEdit.id,name:this.product.name,description:this.product.description,buyPrice:1===this.product.type?this.product.buyPrice:0,sellPrice:this.product.sellPrice,type:this.productType.value,unitCount:1===this.product.type?this.product.unitCount:0,docs:this.docsToAdd}):yield this.addProduct({name:this.product.name,description:this.product.description,buyPrice:1===this.product.type?this.product.buyPrice:0,sellPrice:this.product.sellPrice,type:this.productType.value,unitCount:1===this.product.type?this.product.unitCount:0,docs:this.docsToAdd});this.showLoading(!1),t&&(this.notify({message:`Product ${this.isUpdateProduct?"updated":"created"} successfully`,type:"positive"}),this.close&&this.close())}))}};j([Object(s["Prop"])()],D.prototype,"close",void 0),j([Object(s["Prop"])()],D.prototype,"showLoading",void 0),j([Object(s["Prop"])()],D.prototype,"productToEdit",void 0),j([Object(l["a"])(a["b"].addProduct,{namespace:a["d"]})],D.prototype,"addProduct",void 0),j([Object(l["a"])(a["b"].updateProduct,{namespace:a["d"]})],D.prototype,"updateProduct",void 0),j([Object(l["a"])(O["a"].notify,{namespace:O["c"]})],D.prototype,"notify",void 0),D=j([Object(s["Component"])({components:{MediaListEditor:q["a"],FilterSelect:C["a"]}})],D);var T=D,E=T,_=o("2877"),L=o("27f9"),k=o("a370"),S=o("9c40"),R=o("eebe"),V=o.n(R),A=Object(_["a"])(E,v,w,!1,null,null,null),$=A.exports;V()(A,"components",{QInput:L["a"],QCardSection:k["a"],QBtn:S["a"]});var F=o("1d08"),Q=function(t,e,o,i){var r,s=arguments.length,c=s<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,o):i;if("object"===typeof Reflect&&"function"===typeof Reflect.decorate)c=Reflect.decorate(t,e,o,i);else for(var n=t.length-1;n>=0;n--)(r=t[n])&&(c=(s<3?r(c):s>3?r(e,o,c):r(e,o))||c);return s>3&&c&&Object.defineProperty(e,o,c),c};let M=class extends s["Vue"]{constructor(){super(...arguments),this.showLoading=!1}onClose(){this.close&&this.close()}getTitle(){return this.productToEdit?"Edit product":"Create product"}};Q([Object(s["Prop"])({default:!1})],M.prototype,"showModal",void 0),Q([Object(s["Prop"])()],M.prototype,"close",void 0),Q([Object(s["Prop"])()],M.prototype,"productToEdit",void 0),M=Q([Object(s["Component"])({components:{AddProductEditor:$,Dialog:F["a"]}})],M);var U=M,N=U,I=Object(_["a"])(N,P,g,!1,null,null,null),B=I.exports,J=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("Dialog",{attrs:{showModal:t.showModal,loading:t.showLoading,title:"View product",close:function(){return t.onClose()},styleDialog:"width: 400px; max-width: 80vw"}},[o("template",{slot:"content"},[o("ViewerProduct",{attrs:{product:t.product,close:function(){return t.onClose()},showLoading:function(e){return t.showLoading=e}}})],1)],2)},G=[],W=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",[o("q-input",{staticClass:"q-mx-md q-mb-lg q-mt-md",attrs:{square:"",outlined:"",label:"Name",readonly:"",dense:""},model:{value:t.product.name,callback:function(e){t.$set(t.product,"name",e)},expression:"product.name"}}),o("q-input",{staticClass:"q-mx-md q-my-lg",attrs:{square:"",outlined:"",label:"Description",autogrow:"",readonly:"",dense:""},model:{value:t.product.description,callback:function(e){t.$set(t.product,"description",e)},expression:"product.description"}}),o("q-input",{staticClass:"q-mx-md q-my-lg",attrs:{square:"",outlined:"",label:"Type",readonly:"",dense:""},model:{value:t.type,callback:function(e){t.type=e},expression:"type"}}),1===t.product.type?o("q-input",{staticClass:"q-mx-md q-my-lg",attrs:{square:"",outlined:"",type:"number",label:"Buy Price",readonly:"",dense:""},model:{value:t.product.buyPrice,callback:function(e){t.$set(t.product,"buyPrice",e)},expression:"product.buyPrice"}}):t._e(),o("q-input",{staticClass:"q-mx-md q-my-lg",attrs:{square:"",outlined:"",type:"number",label:"Sell Price",readonly:"",dense:""},model:{value:t.product.sellPrice,callback:function(e){t.$set(t.product,"sellPrice",e)},expression:"product.sellPrice"}}),1===t.product.type?o("q-input",{staticClass:"q-mx-md q-my-lg",attrs:{square:"",outlined:"",type:"number",label:"Unit Count",readonly:"",dense:""},model:{value:t.product.unitCount,callback:function(e){t.$set(t.product,"unitCount",e)},expression:"product.unitCount"}}):t._e(),t.product.docs&&t.product.docs.length>0?o("MediaListViewer",{attrs:{title:"Bild documents",items:t.product.docs,showLoading:t.showLoading}}):t._e(),o("q-card-section",{staticClass:"row items-center justify-center text-primary",attrs:{align:"right"}},[o("q-btn",{staticClass:"col-12 col-sm-auto",attrs:{unelevated:"",color:"primary",align:"center",label:"Close"},on:{click:function(){return t.close()}}})],1)],1)},K=[],Y=o("e8aa"),z=function(t,e,o,i){var r,s=arguments.length,c=s<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,o):i;if("object"===typeof Reflect&&"function"===typeof Reflect.decorate)c=Reflect.decorate(t,e,o,i);else for(var n=t.length-1;n>=0;n--)(r=t[n])&&(c=(s<3?r(c):s>3?r(e,o,c):r(e,o))||c);return s>3&&c&&Object.defineProperty(e,o,c),c};let H=class extends s["Vue"]{constructor(){super(),this.type=Object(d["g"])(this.product.type)}};z([Object(s["Prop"])()],H.prototype,"close",void 0),z([Object(s["Prop"])()],H.prototype,"showLoading",void 0),z([Object(s["Prop"])({required:!0})],H.prototype,"product",void 0),H=z([Object(s["Component"])({components:{MediaListViewer:Y["a"]}})],H);var X=H,Z=X,tt=Object(_["a"])(Z,W,K,!1,null,null,null),et=tt.exports;V()(tt,"components",{QInput:L["a"],QCardSection:k["a"],QBtn:S["a"]});var ot=function(t,e,o,i){var r,s=arguments.length,c=s<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,o):i;if("object"===typeof Reflect&&"function"===typeof Reflect.decorate)c=Reflect.decorate(t,e,o,i);else for(var n=t.length-1;n>=0;n--)(r=t[n])&&(c=(s<3?r(c):s>3?r(e,o,c):r(e,o))||c);return s>3&&c&&Object.defineProperty(e,o,c),c};let it=class extends s["Vue"]{constructor(){super(...arguments),this.showLoading=!1}onClose(){this.close&&this.close()}};ot([Object(s["Prop"])({default:!1})],it.prototype,"showModal",void 0),ot([Object(s["Prop"])()],it.prototype,"close",void 0),ot([Object(s["Prop"])({required:!0})],it.prototype,"product",void 0),it=ot([Object(s["Component"])({components:{ViewerProduct:et,Dialog:F["a"]}})],it);var rt=it,st=rt,ct=Object(_["a"])(st,J,G,!1,null,null,null),nt=ct.exports,lt=o("b5ce");function at(t,e){return!e||(!e.type||!e.type.value||e.type.value===t.type)&&(!e.name||-1!==t.name.toLowerCase().indexOf(e.name.toLowerCase()))}function dt(t,e){return t.filter((t=>at(t,e)))}const ut=Object(d["f"])();var pt=o("1239"),mt=function(t,e,o,i){var r,s=arguments.length,c=s<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,o):i;if("object"===typeof Reflect&&"function"===typeof Reflect.decorate)c=Reflect.decorate(t,e,o,i);else for(var n=t.length-1;n>=0;n--)(r=t[n])&&(c=(s<3?r(c):s>3?r(e,o,c):r(e,o))||c);return s>3&&c&&Object.defineProperty(e,o,c),c},ft=function(t,e,o,i){function r(t){return t instanceof o?t:new o((function(e){e(t)}))}return new(o||(o=Promise))((function(o,s){function c(t){try{l(i.next(t))}catch(e){s(e)}}function n(t){try{l(i["throw"](t))}catch(e){s(e)}}function l(t){t.done?o(t.value):r(t.value).then(c,n)}l((i=i.apply(t,e||[])).next())}))};let ht=class extends s["Vue"]{constructor(){super(),this.filterProducts=this.products,this.loading=!1,this.columns=b,this.showAddProductDialog=!1,this.showConfirmPayDialog=!1,this.showViewProductDialog=!1,this.selectedProduct=null,this.typeOptions=ut,this.nameProductFilter="",this.filterProducts=this.products?this.products:[],this.filter=this.getFilterStore()||{type:void 0,name:""},this.nameProductFilter=this.filter?this.filter.name:""}showConfimDialog(t){this.selectedProduct=t,this.showConfirmPayDialog=!0}showEditProductDialog(t){return ft(this,void 0,void 0,(function*(){if(t){this.loading=!0;const e=t?yield this.loadDetails(t):t;this.loading=!1,this.selectedProduct=e}else this.selectedProduct=t;this.showAddProductDialog=!0}))}showProductDialog(t){return ft(this,void 0,void 0,(function*(){this.loading=!0;const e=yield this.loadDetails(t);this.loading=!1,this.selectedProduct=e,this.showViewProductDialog=!0}))}setfilterProducts(){localStorage.setItem(pt["a"].KEY_PRODUCTS_FILTER,JSON.stringify(this.filter)),this.filterProducts=dt(this.products,this.filter)}setType(t){this.filter=Object.assign(Object.assign({},this.filter),{type:t||void 0})}setNameFilter(t){this.filter=Object.assign(Object.assign({},this.filter),{name:t})}getFilterStore(){const t=localStorage.getItem(pt["a"].KEY_PRODUCTS_FILTER);return t?JSON.parse(t):null}mounted(){return ft(this,void 0,void 0,(function*(){this.loading=!0,yield this.loadData(!1),this.setfilterProducts(),this.loading=!1}))}};mt([Object(l["a"])(a["b"].loadProducts,{namespace:a["d"]})],ht.prototype,"loadData",void 0),mt([Object(l["a"])(a["b"].loadProductDetail,{namespace:a["d"]})],ht.prototype,"loadDetails",void 0),mt([Object(l["b"])(a["c"].getProducts,{namespace:a["d"]})],ht.prototype,"products",void 0),mt([Object(l["b"])(lt["a"].USER_LOGGED_GETTER,{namespace:lt["a"].USER_NAMESPACE})],ht.prototype,"userLogged",void 0),mt([Object(s["Watch"])("filter"),Object(s["Watch"])("products")],ht.prototype,"setfilterProducts",null),mt([Object(s["Watch"])("nameProductFilter")],ht.prototype,"setNameFilter",null),ht=mt([Object(s["Component"])({components:{AddProductEditorDialog:B,ViewerProductDialog:nt,FilterSelect:C["a"]}})],ht);var yt=ht,bt=yt,Pt=(o("181e"),o("eaac")),gt=o("db86"),vt=o("4e73"),wt=o("1c1c"),qt=o("66e5"),Ct=o("4074"),Ot=o("cb32"),jt=o("65c6"),xt=o("7f67"),Dt=Object(_["a"])(bt,c,n,!1,null,"845bb540",null),Tt=Dt.exports;V()(Dt,"components",{QTable:Pt["a"],QBtn:S["a"],QInput:L["a"],QTd:gt["a"],QMenu:vt["a"],QList:wt["a"],QItem:qt["a"],QItemSection:Ct["a"],QAvatar:Ot["a"],QToolbar:jt["a"]}),V()(Dt,"directives",{ClosePopup:xt["a"]});var Et=function(t,e,o,i){var r,s=arguments.length,c=s<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,o):i;if("object"===typeof Reflect&&"function"===typeof Reflect.decorate)c=Reflect.decorate(t,e,o,i);else for(var n=t.length-1;n>=0;n--)(r=t[n])&&(c=(s<3?r(c):s>3?r(e,o,c):r(e,o))||c);return s>3&&c&&Object.defineProperty(e,o,c),c};let _t=class extends s["Vue"]{};_t=Et([Object(s["Component"])({components:{Products:Tt}})],_t);var Lt=_t,kt=Lt,St=Object(_["a"])(kt,i,r,!1,null,null,null);e["default"]=St.exports}}]);