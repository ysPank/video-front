(this["webpackJsonpvideo-front"]=this["webpackJsonpvideo-front"]||[]).push([[0],{431:function(e,t,n){},432:function(e,t,n){"use strict";n.r(t);var r,c,a,i=n(0),o=n(28),u=n.n(o),s=n(436),l=n(37),d=n(61),f=n(132),b=n.n(f),j=n(438),O=n(105),p={PENDING:1,APPROVED:2,FINISHED:3},v="GET_USERS",h="GET_USERS_SUCCESS",g="GET_USERS_ERROR",x="UPDATE_ME",m="CALL_MODAL_STATUS",w="SET_CALL",k="SET_TWILLIO_CONFIG",C="SET_TWILLIO_CONFIG_SUCCESS",y="SET_TWILLIO_CONFIG_FAIL",E=function(e){return{type:m,payload:e}},S=function(e){return{type:w,payload:e}},T=function(e){return{type:y,payload:e}},I=n(42),D=n(43),L=n(223),R=n.n(L),_=n(226),A=n.n(_),M=(n(249),Object(D.a)(R.a)(r||(r=Object(I.a)(["\n    margin-top: 0;\n    font-size: clamp(1rem, 10vw, 3.5rem);\n    line-height: 1.2;\n"])))),N=Object(D.a)(A.a)(c||(c=Object(I.a)(["\n    margin-bottom: 0 !important;\n"]))),U="USER_JOINED",P="USER_LEFT",G="MY_DATA",F="USER_UPDATED",W="REQUESTED_CALL",H="ACCEPTED_CALL",V="DECLINED_CALL",J="OFFER",z="ANSWER",B="ICE_CANDIDATE",Y="CUSTOM_ERROR",q=n(227),X=n(228),K=n(229),Q=n(134),Z="vc-user",$=(a=Z,function(){return JSON.parse(localStorage.getItem(a)||null)}),ee=function(e){return function(t){return localStorage.setItem(e,JSON.stringify(t))}}(Z),te=new(function(){function e(){Object(q.a)(this,e)}return Object(X.a)(e,[{key:"initConnection",value:function(){var e={path:"/socket",transports:["websocket"]},t=$();t&&(e.query={name:t}),this.socket=Object(K.io)("yspank.tk",e)}},{key:"emit",value:function(e,t){this.socket.emit(e,t)}}]),e}());te.initConnection();var ne,re,ce,ae=function(){var e=te.socket;return Object(Q.b)((function(t){var n=function(e,n){return t({event:e,data:n})};return e.onAny(n),function(){return e.offAny(n)}}))},ie=te,oe=function(e){return ie.emit(V,{id:e})},ue=function(e){return ie.emit(B,e)},se=function(e){return ie.emit(z,e)},le=(n(362),n(8)),de=function(e,t){var n=t.caller,r=t.status;return e&&r===p.PENDING?"Your invitation is pending":e||r!==p.PENDING?"Call has been finished":"You've been invited to chat by ".concat((null===n||void 0===n?void 0:n.name)||"Anonymus")},fe=Object(l.b)((function(e){return{user:e.users.me,call:e.calls.call}}),{setModal:E,setCall:S})((function(e){var t,n=e.user,r=e.call,c=e.setCall,a=e.setModal,i=n.id===(null===r||void 0===r||null===(t=r.caller)||void 0===t?void 0:t.id);return(null===r||void 0===r?void 0:r.id)&&(null===r||void 0===r?void 0:r.status)?Object(le.jsxs)(j.a,{footer:null,visible:!0,closable:!1,maskClosable:!1,destroyOnClose:!0,children:[Object(le.jsx)(M,{children:de(i,r)}),r.status===p.PENDING&&Object(le.jsxs)(le.Fragment,{children:[!i&&Object(le.jsx)(O.a,{onClick:function(){return e=r.id,ie.emit(H,{id:e});var e},children:"Accept"}),Object(le.jsx)(O.a,{onClick:function(){oe(r.id),c(null),a(!1)},children:"Cancel"})]})]}):null})),be=function(e){return{type:v,payload:e}},je=function(e){return{type:h,payload:e}},Oe=n(230),pe=n.n(Oe),ve=n(437),he=n(233),ge=n(47),xe=n(151),me=n.n(xe),we=n(232),ke=n.n(we),Ce=n(439),ye=n(440),Ee=1,Se=2,Te=3,Ie=(ne={},Object(ge.a)(ne,Ee,null),Object(ge.a)(ne,Se,Object(le.jsx)(Ce.a,{})),Object(ge.a)(ne,Te,Object(le.jsx)(ye.a,{})),ne),De=Object(D.a)(me.a)(re||(re=Object(I.a)(["\n  padding: .5rem 2rem;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  box-shadow: 0 .6rem 1.2rem 0 rgba(68, 79, 84, 0.05);\n  background: white;\n"]))),Le=Object(l.b)(null,{setModal:E})((function(e){var t=e.user,n=t.id,r=t.name,c=t.status,a=e.setModal;return Object(le.jsxs)(De,{children:[Object(le.jsxs)("div",{children:[r," ",Ie[c]]}),Object(le.jsx)(ke.a,{disabled:c!==Ee,onClick:function(){var e;c===Ee&&(e=n,ie.emit(W,{calleeId:e}),a(!0))},children:"Invite"})]})})),Re=Object(l.b)((function(e){var t=e.users;return{users:t.users,pagination:t.pagination,isLoading:t.isLoading,me:t.me}}),{getUsers:be})((function(e){var t=e.me,n=e.users,r=e.pagination,c=e.isLoading,a=e.getUsers,o=Object(i.useMemo)((function(){return n.filter((function(e){return e.id!==(null===t||void 0===t?void 0:t.id)}))}),[n]);return Object(le.jsx)(pe.a,{initialLoad:!1,pageStart:0,loadMore:a,hasMore:r.totalCount<n.length,useWindow:!1,children:Object(le.jsx)(ve.b,{dataSource:o,renderItem:function(e){return Object(le.jsx)(Le,{user:e},e.id)},children:c&&Object(le.jsx)(he.a,{})})})})),_e=n(22),Ae=n.n(_e),Me=n(25),Ne=n(98),Ue=n(65),Pe={unlimited:"Unlimited",highest:"1080p",normal:"720p",minecraft:"Minecraft"},Ge=(ce={},Object(ge.a)(ce,Pe.unlimited,{width:{ideal:4096},height:{ideal:2160}}),Object(ge.a)(ce,Pe.highest,{width:1920,height:1080}),Object(ge.a)(ce,Pe.normal,{width:1280,height:720}),Object(ge.a)(ce,Pe.minecraft,{width:50,height:25}),ce),Fe=Object.values(Pe),We={label:"SOCKET",style:"color: green;"},He={label:"API",style:"color: blue; background: white;"},Ve={label:"DEBUG"},Je=function(e){var t=e.label,n=e.style;return function(e){return console.log("%c\n  ".concat(t," at ").concat((new Date).toISOString(),":\n  ").concat(JSON.stringify(e),"\n"),n)}},ze=Je({label:"WEB_RTC",style:"color: red;"}),Be=(Je(We),Je(He));Je(Ve);var Ye,qe,Xe,Ke,Qe=function(e,t){t.createOffer().then((function(e){return t.setLocalDescription(e)})).then((function(){return n={target:e,caller:ie.socket.id,sdp:t.localDescription},ie.emit(J,n);var n})).catch(ze)},Ze=function(){return window.onbeforeunload=function(){return"Are you sure you want to leave?"},function(){return window.onbeforeunload=null}},$e=function(e){return new Promise((function(t){var n=document.createElement("canvas");e.onloadeddata=function(){console.log(e.videoWidth),n.width=e.videoWidth,n.height=e.videoHeight,n.getContext("2d").drawImage(e,0,0,n.width,n.height);var r=n.toDataURL();t(r)}}))},et=n(441),tt=n(442),nt=n(443),rt=n(444),ct=n(445),at=n(107),it=(n(408),D.a.div(Ye||(Ye=Object(I.a)(["\n  position: absolute;\n  width: 100%;\n  height: 3rem;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  z-index: 1;\n  background: var(--grayish);\n  padding: 0 1rem;\n\n  svg {\n    margin-right: 1rem;\n\n    path {\n      fill: var(--dark);\n    }\n  }\n"])))),ot=function(e){var t=e.toggleMinify,n=e.toggleMute,r=e.setResolution,c=e.handleHangup,a=e.resolution,i=e.isMinified,o=e.isMuted;return Object(le.jsxs)(it,{children:[Object(le.jsxs)("div",{children:[i?Object(le.jsx)(et.a,{onClick:t}):Object(le.jsx)(tt.a,{onClick:t}),o?Object(le.jsx)(nt.a,{onClick:n}):Object(le.jsx)(rt.a,{onClick:n}),Object(le.jsx)(ct.a,{onClick:c})]}),Object(le.jsx)("div",{children:Object(le.jsx)(at.a,{value:a,onChange:r,children:Fe.map((function(e){return Object(le.jsx)(at.a.Option,{value:e,children:e},"resolution-".concat(e))}))})})]})},ut=n(139),st=n.n(ut),lt={position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!1,draggable:!1,progress:void 0},dt=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=t.withToast,r=void 0!==n&&n;return e.then((function(e){return e.data})).catch((function(e){Be(e),r&&d.b.error(e.message,lt)}))},ft="".concat("https://yspank.tk/api","/").concat("v1"),bt=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.limit,n=void 0===t?20:t,r=e.offset,c=void 0===r?0:r;return dt(st.a.get("".concat(ft,"/users"),{params:{limit:n,offset:c}}))},jt=function(){return dt(st.a.get("".concat(ft,"/twilio/config")),{withToast:!0})},Ot=function(e){return dt(st.a.post("https://07g3bqzaxf.execute-api.eu-central-1.amazonaws.com/handleImageViolation",{file:e})).then((function(e){if(!e.isSafe)throw new Error}))},pt=1,vt=2,ht=3,gt=function(e){var t=e.closeToast,n=e.acceptVideo;return Object(le.jsxs)("div",{children:[Object(le.jsx)("div",{children:"Cup alert!"}),Object(le.jsx)(O.a,{onClick:function(){n(),t()},children:"Show anyway"})]})},xt=D.a.div(qe||(qe=Object(I.a)(["\n  position: relative;\n"]))),mt=D.a.video(Xe||(Xe=Object(I.a)(["\n  width: ",";\n  object-fit: cover;\n  height: ",";\n  ","\n  filter: ",";\n"])),(function(e){return e.isMinified?"250px":"100%"}),(function(e){return e.isMinified?"100px":"100%"}),(function(e){return e.isMinified?"\n  top: 3rem;\n  left: 0;\n  position: absolute;\n":""}),(function(e){return e.status!==vt?"blur(30px)":"none"})),wt=Object(l.b)((function(e){var t=e.users.me,n=e.calls;return{user:t,call:n.call,config:n.config}}),{setCall:S})((function(e){var t,n=e.call,r=e.user,c=e.setCall,a=e.config,o=e.history,u=Object(i.useRef)(ie.socket),s=Object(i.useRef)(null===(t=[null===n||void 0===n?void 0:n.caller,null===n||void 0===n?void 0:n.callee].find((function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.id;return t!==(null===r||void 0===r?void 0:r.id)})))||void 0===t?void 0:t.socketId),l=Object(i.useRef)(),f=Object(i.useRef)(),b=Object(i.useRef)(),j=Object(i.useRef)(),O=Object(i.useState)(function(){var e,t=navigator.connection||navigator.mozConnection||navigator.webkitConnection;return(null===t||void 0===t?void 0:t.saveData)||(null===t||void 0===t||null===(e=t.effectiveType)||void 0===e?void 0:e.includes("2g"))?Pe.minecraft:"3g"===(null===t||void 0===t?void 0:t.effectiveType)?Pe.normal:Pe.unlimited}()),p=Object(Ue.a)(O,2),v=p[0],h=p[1],g=Object(i.useState)(!0),x=Object(Ue.a)(g,2),m=x[0],w=x[1],k=Object(i.useState)(!1),C=Object(Ue.a)(k,2),y=C[0],E=C[1],S=Object(i.useState)(pt),T=Object(Ue.a)(S,2),I=T[0],D=T[1],L=Object(i.useState)({audio:!0,video:Ge[v]}),R=Object(Ue.a)(L,1)[0],_=function(){!function(){var e;console.log(l),null===(e=l.current)||void 0===e||e.close(),l.current=void 0}(),f.current&&f.current.getTracks().forEach((function(e){return e.stop()}))},A=function(){var e=Object(Ne.a)(Ae.a.mark((function e(t){var n;return Ae.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:n=t.streams,j.current.srcObject=n[0],$e(j.current).then(Ot).then((function(){return D(vt)})).catch((function(){D(ht),d.b.warning(Object(le.jsx)(gt,{acceptVideo:function(){return D(vt)}}),Object(Me.a)(Object(Me.a)({},lt),{},{autoClose:!1}))}));case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();function M(e){var t=new RTCPeerConnection(a);return t.onicecandidate=function(e){return function(){var e=(arguments.length>0&&void 0!==arguments[0]?arguments[0]:{}).candidate,t=arguments.length>1?arguments[1]:void 0;e&&ue({target:t,candidate:e})}(e,s.current)},t.ontrack=A,t.onnegotiationneeded=function(){return Qe(e,t)},t}function N(){return(N=Object(Ne.a)(Ae.a.mark((function e(t){return Ae.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:l.current=M(t),f.current.getTracks().forEach((function(e){return l.current.addTrack(e,f.current)}));case 2:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function U(e){return P.apply(this,arguments)}function P(){return(P=Object(Ne.a)(Ae.a.mark((function e(t){return Ae.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:l.current=M(),l.current.setRemoteDescription(new RTCSessionDescription(t.sdp)).then((function(){return f.current.getTracks().forEach((function(e){return l.current.addTrack(e,f.current)}))})).then((function(){return l.current.createAnswer()})).then((function(e){return l.current.setLocalDescription(e),e})).then((function(e){se({target:t.caller,caller:u.current.id,sdp:e})}));case 2:case"end":return e.stop()}}),e)})))).apply(this,arguments)}return Object(i.useEffect)((function(){if(!(null===n||void 0===n?void 0:n.id))return o.replace("/"),!1;var e=[],t=Ze(),c=[J,z,B];return navigator.mediaDevices.getUserMedia(R).then((function(t){b.current.srcObject=t,f.current=t,r.id===(null===n||void 0===n?void 0:n.callerId)&&function(e){N.apply(this,arguments)}(n.callee.socketId),e.push(U,(function(e){return function(e,t){t.current.setRemoteDescription(new RTCSessionDescription(e.sdp)).catch(ze)}(e,l)}),(function(e){return function(e,t){try{var n=new RTCIceCandidate(e);t.current.addIceCandidate(n).catch(ze)}catch(r){ze("candidate error")}}(e,l)})),u.current.once(J,e[0]),u.current.once(z,e[1]),u.current.on(B,e[2])})),function(){t(),_(),l.current=void 0,e.forEach((function(e,t){return ie.socket.off(c[t],e)}))}}),[]),Object(le.jsx)(xt,{children:Object(le.jsxs)("div",{children:[Object(le.jsx)(ot,{setResolution:function(e){f.current.getVideoTracks().forEach((function(t){h((function(){return e})),t.applyConstraints(Ge[e])}))},toggleMinify:function(){return w((function(e){return!e}))},toggleMute:function(){var e=f.current.getAudioTracks(),t=e[0].enabled;E(!t),e[0].enabled=!t},handleHangup:function(){oe(n.id),c(null),Ze()(),o.replace("/")},isMinified:m,isMuted:y,resolution:v}),Object(le.jsx)(mt,{ref:j,autoPlay:!0,fullHeight:m,status:I}),Object(le.jsx)(mt,{ref:b,muted:!0,autoPlay:!0,isMinified:m,status:vt})]})})})),kt=function(){var e=Object(l.c)((function(e){return e.users.me})),t=Object(i.useState)(),n=Object(Ue.a)(t,2),r=n[0],c=n[1],a=Object(i.useState)(),o=Object(Ue.a)(a,2),u=o[0],s=o[1];return Object(i.useEffect)((function(){(null===e||void 0===e?void 0:e.name)!==r&&c(e.name)}),[e]),Object(le.jsx)(N,{editable:{onChange:c,onEnd:function(){return c((function(e){var t;return t={name:e},ie.emit(F,t),s((function(){return!1})),e}))},onCancel:function(){c((function(){return e.name})),s((function(){return!1}))},onStart:function(){return s(!0)},editing:u,maxLength:50},children:r})},Ct=Object(D.a)(f.Header)(Ke||(Ke=Object(I.a)(["\n  padding: 2rem;\n  background: var(--whitey);\n\n  svg {\n    fill: var(--dark);\n  }\n"]))),yt=function(){return Object(le.jsx)(Ct,{children:Object(le.jsx)(kt,{})})},Et=Object(l.b)((function(e){return{modalOpen:e.calls.modalOpen}}),{getUsers:be,getTwilioConfig:function(e){return{type:k,payload:e}}})((function(e){var t=e.getUsers,n=e.modalOpen,r=e.getTwilioConfig;return Object(i.useEffect)((function(){r(),t()}),[t,r]),Object(le.jsxs)(b.a,{children:[Object(le.jsx)(yt,{}),Object(le.jsxs)("main",{children:[Object(le.jsxs)(s.c,{children:[Object(le.jsx)(s.a,{exact:!0,path:"/",component:Re}),Object(le.jsx)(s.a,{exact:!0,path:"/call",component:wt})]}),n&&Object(le.jsx)(fe,{})]})]})})),St=n(74),Tt={users:[],isLoading:!1,me:null,pagination:{limit:20,offset:0,totalCount:null}},It={modalOpen:!1,call:{id:null,callerId:null,calleeId:null,status:p.PENDING},config:[]},Dt=Object(St.b)({users:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:Tt,t=arguments.length>1?arguments[1]:void 0,n=t.type,r=t.payload;switch(n){case v:return Object(Me.a)(Object(Me.a)({},e),{},{isLoading:!0});case h:return Object(Me.a)(Object(Me.a)({},e),{},{isLoading:!1},r);case g:return Object(Me.a)(Object(Me.a)({},e),{},{isLoading:!1,users:[]});case x:return Object(Me.a)(Object(Me.a)({},e),{},{me:r});default:return Object(Me.a)({},e)}},calls:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:It,t=arguments.length>1?arguments[1]:void 0,n=t.type,r=t.payload;switch(n){case m:return Object(Me.a)(Object(Me.a)({},e),{},{modalOpen:r});case w:return Object(Me.a)(Object(Me.a)({},e),{},{call:r});case k:return Object(Me.a)({},e);case C:return Object(Me.a)(Object(Me.a)({},e),{},{config:r});case y:return Object(Me.a)(Object(Me.a)({},e),{},{config:[]});default:return Object(Me.a)({},e)}}}),Lt=n(15),Rt=n(45),_t=function(e){var t=e.nextOffset,n=e.totalCount,r=e.limit;return{totalCount:n,limit:void 0===r?20:r,offset:t}},At=Ae.a.mark(Ut),Mt=Ae.a.mark(Gt),Nt=Ae.a.mark(Ft);function Ut(){return Ae.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(Lt.g)(v,Gt);case 2:case"end":return e.stop()}}),At)}var Pt=function(e){return Object(Ne.a)(Ae.a.mark((function t(){return Ae.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.abrupt("return",bt(e));case 1:case"end":return t.stop()}}),t)})))};function Gt(){var e,t,n,r,c,a;return Ae.a.wrap((function(i){for(;;)switch(i.prev=i.next){case 0:return i.next=2,Object(Lt.e)((function(e){return e.users}));case 2:return e=i.sent,t=e.offset,n=e.users,i.prev=5,i.next=8,Object(Lt.b)(Pt({offset:t}));case 8:return r=i.sent,c=r.data,a=r.pagination,i.next=13,Object(Lt.d)(je({pagination:_t(a),users:[].concat(Object(Rt.a)(n),Object(Rt.a)(c))}));case 13:i.next=19;break;case 15:return i.prev=15,i.t0=i.catch(5),i.next=19,Object(Lt.d)({type:g});case 19:case"end":return i.stop()}}),Mt,null,[[5,15]])}function Ft(){return Ae.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(Lt.a)([Object(Lt.c)(Ut)]);case 2:case"end":return e.stop()}}),Nt)}var Wt=function(e,t){return[].concat(Object(Rt.a)(e.slice(0,t)),Object(Rt.a)(e.slice(t+1)))},Ht=n(56),Vt=Object(Ht.a)(),Jt=Ae.a.mark(Bt),zt=Ae.a.mark(Yt);function Bt(){var e,t;return Ae.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,Object(Lt.b)(ae);case 2:e=n.sent,t=Ae.a.mark((function t(){var n,r,c,a,i,o,u;return Ae.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,Object(Lt.f)(e);case 2:return n=t.sent,r=n.event,c=n.data,t.next=7,Object(Lt.e)((function(e){return e.users.me}));case 7:a=t.sent,i=void 0,t.t0=r,t.next=t.t0===Y?12:t.t0===G?14:t.t0===W?18:t.t0===V?24:t.t0===H?34:t.t0===U?43:t.t0===F?49:t.t0===P?57:63;break;case 12:return d.b.error(c,lt),t.abrupt("break",64);case 14:return ee(c.name),t.next=17,Object(Lt.d)({type:x,payload:c});case 17:return t.abrupt("break",64);case 18:return t.next=20,Object(Lt.d)(S(c));case 20:if(a.id===c.caller.id){t.next=23;break}return t.next=23,Object(Lt.d)(E(!0));case 23:return t.abrupt("break",64);case 24:return t.next=26,Object(Lt.e)((function(e){return e.calls.call}));case 26:return o=t.sent,t.next=29,Object(Lt.d)(S(Object(Me.a)(Object(Me.a)({},o),{},{status:p.CANCELED})));case 29:return t.next=31,Object(Lt.d)(E(!1));case 31:return Vt.replace("/"),d.b.error("Call has been canceled by other user.",lt),t.abrupt("break",64);case 34:return t.next=36,Object(Lt.e)((function(e){return e.calls.call}));case 36:return u=t.sent,t.next=39,Object(Lt.d)(S(Object(Me.a)(Object(Me.a)({},u),{},{status:p.APPROVED})));case 39:return t.next=41,Object(Lt.d)(E(!1));case 41:return Vt.push("/call"),t.abrupt("break",64);case 43:return t.next=45,Object(Lt.e)((function(e){return e.users.users}));case 45:return i=t.sent,t.next=48,Object(Lt.d)(je({users:[c].concat(Object(Rt.a)(i))}));case 48:return t.abrupt("break",64);case 49:if(c.id===a.id){t.next=56;break}return t.next=52,Object(Lt.e)((function(e){return e.users.users}));case 52:return i=t.sent,t.next=55,Object(Lt.d)(je({users:(s=i,l=i.findIndex((function(e){return e.id===c.id})),f=c,[].concat(Object(Rt.a)(s.slice(0,l)),[f],Object(Rt.a)(s.slice(l+1))))}));case 55:case 56:return t.abrupt("break",64);case 57:return t.next=59,Object(Lt.e)((function(e){return e.users.users}));case 59:return i=t.sent,t.next=62,Object(Lt.d)(je({users:Wt(i,i.findIndex((function(e){return e.id===c})))}));case 62:case 63:return t.abrupt("break",64);case 64:case"end":return t.stop()}var s,l,f}),t)}));case 4:return n.delegateYield(t(),"t0",6);case 6:n.next=4;break;case 8:case"end":return n.stop()}}),Jt)}function Yt(){return Ae.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(Lt.a)([Object(Lt.c)(Bt)]);case 2:case"end":return e.stop()}}),zt)}var qt=Ae.a.mark(Qt),Xt=Ae.a.mark(Zt),Kt=Ae.a.mark($t);function Qt(){return Ae.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(Lt.h)(k,Zt);case 2:case"end":return e.stop()}}),qt)}function Zt(){var e;return Ae.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,Object(Lt.b)(jt);case 3:return e=t.sent,t.next=6,Object(Lt.d)({type:C,payload:e});case 6:t.next=12;break;case 8:return t.prev=8,t.t0=t.catch(0),t.next=12,Object(Lt.d)(T());case 12:case"end":return t.stop()}}),Xt,null,[[0,8]])}function $t(){return Ae.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(Lt.a)([Object(Lt.c)(Qt)]);case 2:case"end":return e.stop()}}),Kt)}var en=Ae.a.mark(tn);function tn(e){return Ae.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(Lt.a)([Ft(),$t(),Yt()]);case 2:case"end":return e.stop()}}),en)}var nn=Object(Q.a)(),rn=[nn];var cn=function(e){var t=St.c;window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;var n=Object(St.d)(Dt,e,t(St.a.apply(void 0,rn)));return nn.run(tn),n}();n(430),n(431);u.a.render(Object(le.jsx)(l.a,{store:cn,children:Object(le.jsxs)(i.Suspense,{fallback:Object(le.jsx)("div",{className:"loading"}),children:[Object(le.jsx)(d.a,{}),Object(le.jsx)(s.b,{history:Vt,children:Object(le.jsx)(Et,{})})]})}),document.getElementById("root"))}},[[432,1,2]]]);
//# sourceMappingURL=main.9ae61b70.chunk.js.map