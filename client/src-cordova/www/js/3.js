(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[3],{"162c":function(t,e,o){"use strict";o.r(e);var n=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("q-page",{staticClass:"row justify-evenly"},[o("div",{staticClass:"col-12 col-md-10 q-pa-md"},[o("div",[1===t.imgList.length?o("div",[o("q-img",{staticClass:"bg-grey-1 rounded-borders",attrs:{height:"min(700px,50vw);",src:t.imgList[0]}})],1):t.showCarousel()?o("q-carousel",{staticClass:"bg-grey-1 rounded-borders",attrs:{animated:"",arrows:t.showArrow(),navigation:t.showArrow(),infinite:"","control-type":"unelevated","control-color":"primary",height:"calc(min(700px,50vw))"},model:{value:t.slide,callback:function(e){t.slide=e},expression:"slide"}},t._l(t.imgList,(function(t,e){return o("q-carousel-slide",{key:e,staticClass:"q-pa-none",attrs:{name:e,"img-src":t}})})),1):t._e()],1),o("div",{staticClass:"block-text-card"},[o("h4",[t._v(t._s(t.item.title))]),o("h5",[t._v("Anno scolastico: "+t._s(t.item.class))]),o("p",{staticClass:"text-body1",domProps:{innerHTML:t._s(t.item.description)}})]),t.enrollment?o("ContactInscriptionFrom",{attrs:{event:t.item}}):t._e()],1)])},i=[],s=o("8d14"),a=o("aec3"),r=o("60a3"),l=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("q-card",{attrs:{flat:""}},[o("q-form",{on:{submit:t.onSubmit,reset:t.onReset}},[o("q-input",{staticClass:"q-my-sm",attrs:{filled:"",standout:"bg-primary text-white",label:"Nome *","lazy-rules":"ondemand",autocomplete:"new-password",rules:[function(t){return t&&t.length>0||"Il campo è obbligatiorio"}]},model:{value:t.formContact.nome,callback:function(e){t.$set(t.formContact,"nome",e)},expression:"formContact.nome"}}),o("q-input",{staticClass:"q-my-sm",attrs:{filled:"",standout:"bg-primary text-white",label:"Cognome *","lazy-rules":"ondemand",autocomplete:"new-password",rules:[function(t){return t&&t.length>0||"Il campo è obbligatiorio"}]},model:{value:t.formContact.cognome,callback:function(e){t.$set(t.formContact,"cognome",e)},expression:"formContact.cognome"}}),t.pollConfig?o("q-select",{staticClass:"q-my-sm",attrs:{filled:"",label:t.pollConfig.labels.class+" *",options:t.pollConfig.options.class,standout:"bg-primary text-white","lazy-rules":"ondemand",autocomplete:"new-password",rules:[function(t){return!!t&&t.length>0||"Il campo è obbligatiorio"}]},model:{value:t.formContact.class,callback:function(e){t.$set(t.formContact,"class",e)},expression:"formContact.class"}}):t._e(),o("q-input",{staticClass:"q-my-sm",attrs:{filled:"",standout:"bg-primary text-white",type:"email","lazy-rules":"ondemand",label:"Indirizzo email *",autocomplete:"new-password",rules:[function(t){return t&&t.length>0||"Il campo è obbligatiorio"}]},model:{value:t.formContact.email,callback:function(e){t.$set(t.formContact,"email",e)},expression:"formContact.email"}}),o("q-input",{staticClass:"q-my-sm",attrs:{filled:"",standout:"bg-primary text-white",label:"Telefono *",type:"number","lazy-rules":"ondemand",autocomplete:"new-password",rules:[function(t){return t&&t.length>0||"Il campo è obbligatiorio"}]},model:{value:t.formContact.phone,callback:function(e){t.$set(t.formContact,"phone",e)},expression:"formContact.phone"}}),o("q-input",{staticClass:"q-my-sm",attrs:{filled:"",standout:"bg-primary text-white",type:"textarea",label:"Messaggio",autocomplete:"new-password","lazy-rules":"ondemand"},model:{value:t.formContact.message,callback:function(e){t.$set(t.formContact,"message",e)},expression:"formContact.message"}}),o("div",{staticClass:"row display-flex justify-center q-my-sm"},[o("q-btn",{attrs:{unelevated:"",label:"Invia",type:"submit",color:"primary"}})],1)],1),o("Loader",{attrs:{loading:t.showLoader}})],1)},c=[],m=o("436b"),u=o("4bb5"),p=o("4afd"),d=o("f658"),f=o("dec1"),h=o("ea1a"),g=function(t,e,o,n){var i,s=arguments.length,a=s<3?e:null===n?n=Object.getOwnPropertyDescriptor(e,o):n;if("object"===typeof Reflect&&"function"===typeof Reflect.decorate)a=Reflect.decorate(t,e,o,n);else for(var r=t.length-1;r>=0;r--)(i=t[r])&&(a=(s<3?i(a):s>3?i(e,o,a):i(e,o))||a);return s>3&&a&&Object.defineProperty(e,o,a),a},b=function(t,e,o,n){function i(t){return t instanceof o?t:new o((function(e){e(t)}))}return new(o||(o=Promise))((function(o,s){function a(t){try{l(n.next(t))}catch(e){s(e)}}function r(t){try{l(n["throw"](t))}catch(e){s(e)}}function l(t){t.done?o(t.value):i(t.value).then(a,r)}l((n=n.apply(t,e||[])).next())}))};let y=class extends r["Vue"]{constructor(){super(...arguments),this.formContact={id:0,nome:"",cognome:"",email:"",phone:"",message:"",class:""},this.showLoader=!1,this.pollConfig=null}onSubmit(){return b(this,void 0,void 0,(function*(){this.showLoader=!0,(yield this.createInscription(Object.assign(Object.assign({},this.formContact),{eventId:this.event.id})))?(yield this.sendEmailMessage(),this.showLoader=!1,m["a"].create({title:"Assemblea dei Genitori Vezia",message:"Grazie!",cancel:{unelevated:!0,color:"primary",label:"Chiudere"},ok:!1,persistent:!0}),this.onReset()):(this.showLoader=!1,this.notify({message:"Iscrizione non riuscita",type:"negative"}))}))}sendEmailMessage(){return b(this,void 0,void 0,(function*(){const t=this.formContact;let e=`<p>Nome: ${t.nome} ${t.cognome}</p></br>`;e+=`<p>Indirizzo email: ${t.email}</p></br>`,e+=`<p>Telefono: ${t.phone}</p></br></br>`,e+=`<p>${t.message.split("\n").join("</p><p>")}</p>`;const o=`Iscrizione - ${this.event.title}`;return!!(yield this.sendEmail({subject:`Oggetto: ${o}`,body:e,to:`<${t.email}> "${t.nome} ${t.cognome}"`}))||(this.notify({message:"L'invio della posta non è riuscito",type:"negative"}),!1)}))}onReset(){this.formContact={id:0,nome:"",cognome:"",email:"",phone:"",message:"",class:""}}mounted(){return b(this,void 0,void 0,(function*(){const t=new d["a"];this.pollConfig=yield t.getPollConfig()}))}};g([Object(u["a"])(f["a"].sendEmailFromToAddressAndApp,{namespace:f["c"]})],y.prototype,"sendEmail",void 0),g([Object(u["a"])(p["a"].agvCreateInscription,{namespace:p["e"]})],y.prototype,"createInscription",void 0),g([Object(u["a"])(h["a"].notify,{namespace:h["c"]})],y.prototype,"notify",void 0),g([Object(r["Prop"])()],y.prototype,"event",void 0),y=g([Object(r["Component"])({})],y);var v=y,C=v,w=o("2877"),x=o("f09f"),I=o("0378"),j=o("27f9"),q=o("ddd8"),L=o("9c40"),O=o("eebe"),$=o.n(O),z=Object(w["a"])(C,l,c,!1,null,null,null),_=z.exports;$()(z,"components",{QCard:x["a"],QForm:I["a"],QInput:j["a"],QSelect:q["a"],QBtn:L["a"]});var k=o("5848"),P=function(t,e,o,n){var i,s=arguments.length,a=s<3?e:null===n?n=Object.getOwnPropertyDescriptor(e,o):n;if("object"===typeof Reflect&&"function"===typeof Reflect.decorate)a=Reflect.decorate(t,e,o,n);else for(var r=t.length-1;r>=0;r--)(i=t[r])&&(a=(s<3?i(a):s>3?i(e,o,a):i(e,o))||a);return s>3&&a&&Object.defineProperty(e,o,a),a},Q=function(t,e,o,n){function i(t){return t instanceof o?t:new o((function(e){e(t)}))}return new(o||(o=Promise))((function(o,s){function a(t){try{l(n.next(t))}catch(e){s(e)}}function r(t){try{l(n["throw"](t))}catch(e){s(e)}}function l(t){t.done?o(t.value):i(t.value).then(a,r)}l((n=n.apply(t,e||[])).next())}))};let R=class extends r["Vue"]{constructor(){super(),this.item={},this.slide=1,this.nameCourse="",this.enrollment=!1,this.path=location.origin,this.imgList=[],this.itemService=new a["a"]}showArrow(){return!!this.imgList&&this.imgList.length>1}showCarousel(){return!!this.imgList&&this.imgList.length>0}setItemList(){this.imgList=this.item.imgList?this.item.imgList.filter((t=>!!t.url)).map((t=>t.url||"")):[]}created(){return Q(this,void 0,void 0,(function*(){this.item=yield this.loadItem(parseInt(this.itemId.toString())),this.item&&(this.item.enrollment=!(this.itemService.compareStrDate(this.item.startDate,new Date(Date.now()))<0||this.item.state===s["b"].Cancelled)&&this.item.enrollment),this.enrollment=!this.item||!this.item.enrollment.toString()||!!this.item.enrollment,this.nameCourse=this.item?this.item.title:"-"}))}};P([Object(r["Prop"])()],R.prototype,"itemId",void 0),P([Object(u["a"])(k["a"].agvGetEvent,{namespace:k["d"]})],R.prototype,"loadItem",void 0),P([Object(r["Watch"])("item")],R.prototype,"setItemList",null),R=P([Object(r["Component"])({components:{ContactInscriptionFrom:_}})],R);var S=R,A=S,E=(o("c5324"),o("9989")),D=o("068f3"),F=o("880c"),M=o("62cd"),T=Object(w["a"])(A,n,i,!1,null,"09a08470",null);e["default"]=T.exports;$()(T,"components",{QPage:E["a"],QImg:D["a"],QCarousel:F["a"],QCarouselSlide:M["a"]})},"515b":function(t,e,o){},c5324:function(t,e,o){"use strict";o("515b")}}]);