!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e(require("react")):"function"==typeof define&&define.amd?define(["react"],e):"object"==typeof exports?exports.StateManager=e(require("react")):t.StateManager=e(t.react)}("undefined"!=typeof self?self:this,(function(t){return function(t){var e={};function n(r){if(e[r])return e[r].exports;var o=e[r]={i:r,l:!1,exports:{}};return t[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=t,n.c=e,n.d=function(t,e,r){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)n.d(r,o,function(e){return t[e]}.bind(null,o));return r},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=2)}([function(e,n){e.exports=t},function(t,e,n){t.exports=function(t){var e={};function n(r){if(e[r])return e[r].exports;var o=e[r]={i:r,l:!1,exports:{}};return t[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=t,n.c=e,n.d=function(t,e,r){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)n.d(r,o,function(e){return t[e]}.bind(null,o));return r},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="/home/runner/work/React-Components/React-Components/packages/store-manager/dist",n(n.s=0)}([function(t,e,n){t.exports=n(1)},function(t,e,n){"use strict";function r(t,e,n){void 0===n&&(n=null);try{var r=e.getItem(t);if(null===r||""===r)return!1;if(n instanceof Array){var o=JSON.parse(r);for(var i in n)if(void 0===o[n[i]])return!1}else if(null!==n&&void 0===(o=JSON.parse(r))[n])return!1}catch(t){return console.log(t),!1}return!0}function o(t,e){return void 0===e&&(e=null),r(t,sessionStorage,e)}function i(t,e){return void 0===e&&(e=null),r(t,localStorage,e)}function s(t,e,n){return void 0===n&&(n={}),c(t,n,e)}function u(t,e,n,o,i,u){void 0===n&&(n=null),void 0===o&&(o=null),void 0===i&&(i={}),void 0===u&&(u=!0);try{if(u&&(r(t,e,o)||s(t,e,i)),null===n){var a=e.getItem(t);return JSON.parse(a)}if(n instanceof Array){a=e.getItem(t);for(var c=JSON.parse(a),l={},f=0,d=n;f<d.length;f++){var p=d[f];if(void 0===c[p])return null;l[p]=c[p]}return l}return a=e.getItem(t),void 0===(c=JSON.parse(a))[n]?null:c[n]}catch(t){return console.log(t),null}}function a(t,e,n,r,o,i){void 0===r&&(r=null),void 0===o&&(o={}),void 0===i&&(i=!0);try{var s=u(t,n,null,r,o,i),a=Object.assign(s,e);return console.log(s,a,"update"),c(t,a,n),!0}catch(t){return console.log(t),!1}}function c(t,e,n){try{var r=JSON.stringify(e);return n.setItem(t,r),!0}catch(t){return console.log(t),!1}}function l(t,e){return void 0===e&&(e={}),s(t,sessionStorage,e)}function f(t,e){return void 0===e&&(e={}),s(t,localStorage,e)}function d(t,e,n,r,o){return void 0===e&&(e=null),void 0===n&&(n=null),void 0===r&&(r={}),void 0===o&&(o=!0),u(t,sessionStorage,e,n,r,o)}function p(t,e,n,r,o){return void 0===e&&(e=null),void 0===n&&(n=null),void 0===r&&(r={}),void 0===o&&(o=!0),u(t,localStorage,e,n,r,o)}function h(t,e,n,r,o){return void 0===n&&(n=null),void 0===r&&(r={}),void 0===o&&(o=!0),a(t,e,sessionStorage,n,r,o)}function v(t,e,n,r,o){return void 0===n&&(n=null),void 0===r&&(r={}),void 0===o&&(o=!0),a(t,e,localStorage,n,r,o)}function g(t,e){return c(t,e,sessionStorage)}function y(t,e){return c(t,e,localStorage)}n.r(e),n.d(e,"checkStorage",(function(){return r})),n.d(e,"checkSession",(function(){return o})),n.d(e,"checkLocal",(function(){return i})),n.d(e,"createStorage",(function(){return s})),n.d(e,"readStorage",(function(){return u})),n.d(e,"updateStorage",(function(){return a})),n.d(e,"writeStorage",(function(){return c})),n.d(e,"createSession",(function(){return l})),n.d(e,"createLocal",(function(){return f})),n.d(e,"readSession",(function(){return d})),n.d(e,"readLocal",(function(){return p})),n.d(e,"updateSession",(function(){return h})),n.d(e,"updateLocal",(function(){return v})),n.d(e,"writeSession",(function(){return g})),n.d(e,"writeLocal",(function(){return y})),n.d(e,"StoreManager",(function(){return S}));var S=function(){function t(t,e){void 0===e&&(e={}),this.tableName=t,this.structure=e}return t.prototype.checkSession=function(){return o(this.tableName,this.structure.keys)},t.prototype.checkLocal=function(){return i(this.tableName,this.structure.keys)},t.prototype.createSession=function(){return l(this.tableName,this.structure)},t.prototype.createLocal=function(){return f(this.tableName,this.structure)},t.prototype.readSession=function(t,e){return void 0===t&&(t=null),void 0===e&&(e=!0),d(this.tableName,t,this.structure.keys,this.structure,e)},t.prototype.readLocal=function(t,e){return void 0===t&&(t=null),void 0===e&&(e=!0),p(this.tableName,t,this.structure.keys,this.structure,e)},t.prototype.updateSession=function(t,e){return void 0===e&&(e=!0),h(this.tableName,t,Object.keys(this.structure),this.structure,e)},t.prototype.updateLocal=function(t,e){return void 0===e&&(e=!0),v(this.tableName,t,Object.keys(this.structure),this.structure,e)},t.prototype.checkStruct=function(t){for(var e=0,n=Object.keys(this.structure);e<n.length;e++)if(void 0===t[n[e]])return!1;return!0},t.prototype.writeSession=function(t,e){return void 0===e&&(e=!1),(e||!!this.checkStruct(t))&&g(this.tableName,t)},t.prototype.writeLocal=function(t,e){return void 0===e&&(e=!1),(e||!!this.checkStruct(t))&&y(this.tableName,t)},t}()}])},function(t,e,n){t.exports=n(3)},function(t,e,n){"use strict";n.r(e),n.d(e,"stateManager",(function(){return d})),n.d(e,"ManageState",(function(){return p})),n.d(e,"useSession",(function(){return l})),n.d(e,"useLocal",(function(){return f}));var r=n(0),o=n(1),i=function(t,e,n,r){return new(n||(n=Promise))((function(o,i){function s(t){try{a(r.next(t))}catch(t){i(t)}}function u(t){try{a(r.throw(t))}catch(t){i(t)}}function a(t){var e;t.done?o(t.value):(e=t.value,e instanceof n?e:new n((function(t){t(e)}))).then(s,u)}a((r=r.apply(t,e||[])).next())}))},s=function(t,e){var n,r,o,i,s={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return i={next:u(0),throw:u(1),return:u(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function u(i){return function(u){return function(i){if(n)throw new TypeError("Generator is already executing.");for(;s;)try{if(n=1,r&&(o=2&i[0]?r.return:i[0]?r.throw||((o=r.return)&&o.call(r),0):r.next)&&!(o=o.call(r,i[1])).done)return o;switch(r=0,o&&(i=[2&i[0],o.value]),i[0]){case 0:case 1:o=i;break;case 4:return s.label++,{value:i[1],done:!1};case 5:s.label++,r=i[1],i=[0];continue;case 7:i=s.ops.pop(),s.trys.pop();continue;default:if(!(o=s.trys,(o=o.length>0&&o[o.length-1])||6!==i[0]&&2!==i[0])){s=0;continue}if(3===i[0]&&(!o||i[1]>o[0]&&i[1]<o[3])){s.label=i[1];break}if(6===i[0]&&s.label<o[1]){s.label=o[1],o=i;break}if(o&&s.label<o[2]){s.label=o[2],s.ops.push(i);break}o[2]&&s.ops.pop(),s.trys.pop();continue}i=e.call(t,s)}catch(t){i=[6,t],r=0}finally{n=o=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}([i,u])}}};function u(t){return new Promise((function(e){return setTimeout(e,t)}))}var a=function(){function t(t){this.localKeys={},this.sessionKeys={},this.storeManagers={},this.loadFunctions={},this.store=void 0===t?{state:{},function:{}}:t}return t.prototype.getStore=function(){return this.store},t.prototype.addState=function(t,e,n){void 0!==this.store.state[t]&&null!==this.store.state[t]||(this.store.state[t]={}),this.store.state[t][e]=n},t.prototype.addFunction=function(t,e,n){void 0!==this.store.function[t]&&null!==this.store.function[t]||(this.store.function[t]={}),this.store.function[t][e]=n},t.prototype.addTo=function(t,e,n,r){void 0===e&&(e=null),void 0===n&&(n=null);try{var o=void 0;if("local"===r)o=this.localKeys;else{if("session"!==r)return!1;o=this.sessionKeys}if("ALL"===t)o.ALL={};else if(t instanceof Array)for(var i=0,s=t;i<s.length;i++){var u=s[i];void 0===o[u]&&(o[u]={}),o[u].all=""}else if("ALL"===e)void 0===o[t]&&(o[t]={}),o[t].all="";else if(e instanceof Array){void 0===o[t]&&(o[t]={});for(var a=0,c=e;a<c.length;a++){var l=c[a];o[t][l]=this.getState(t,l)}}else{if(null===e)return console.log("stored key is set as null"),!1;void 0===o[t]&&(o[t]={}),o[t][e]=this.getState(t,e),null!==n&&(void 0===this.loadFunctions[t]&&(this.loadFunctions[t]={}),this.loadFunctions[t][e]=n)}return!0}catch(t){return console.log(t),!1}},t.prototype.addToSessionSet=function(t,e,n){return void 0===e&&(e=null),void 0===n&&(n=null),this.addTo(t,e,n,"session")},t.prototype.addToLocalSet=function(t,e,n){return void 0===e&&(e=null),void 0===n&&(n=null),this.addTo(t,e,n,"local")},t.prototype.writeStorage=function(t,e){void 0===e&&(e=null);try{var n=void 0,r={};if("session"===t)n=this.sessionKeys;else{if("local"!==t)return!1;n=this.localKeys}if(null===e)if(void 0!==n.ALL)r=this.store.state;else for(var i in n){void 0!==(l=n[i]).all?r[i]=this.store.state[i]:r[i]=l}else if(e instanceof Array)for(var i in e){var s=e[i];void 0!==(l=n[s]).all?r[s]=this.store.state[s]:r[s]=l}else{void 0!==(l=n[e]).all?r[e]=this.store.state[e]:r[e]=l}for(var u in r=this.appendFunc(r)){if(void 0===this.storeManagers[u]){var a=new o.StoreManager(u);this.storeManagers[u]=a}var c=this.storeManagers[u],l=r[u];if("local"===t){if(!c.updateLocal(l))return!1}else if("session"===t){if(!c.updateSession(l))return!1}}return!0}catch(t){return console.log(t),!1}},t.prototype.appendFunc=function(t){for(var e=0,n=Object.keys(t);e<n.length;e++){var r=n[e];void 0!==this.loadFunctions[r]&&(void 0===t[r+"@func"]&&(t[r+"@func"]={}),t[r+"@func"]=this.loadFunctions[r])}return t},t.prototype.writeSession=function(t,e){var n=this;return void 0===e&&(e=0),setTimeout((function(){n.writeStorage("session",t)||console.log("Writing sessionStorage is failed")}),e)},t.prototype.writeLocal=function(t,e){var n=this;return void 0===e&&(e=0),setTimeout((function(){n.writeStorage("local",t)||console.log("Writing localStorage is failed")}),e)},t.prototype.loadStorage=function(t,e){try{var n=!0;if(t instanceof Array)for(var r=0,o=t;r<o.length;r++){var i=o[r];if(void 0!==this.storeManagers[i]){var s=this.storeManagers[i],u=this.getManager(i+"@func");if("local"===e){var a=s.readLocal(),c=u.readSession();if(null==a)continue;this.store.state[i]=Object.assign(this.store.state[i],a),this.resetState(i,a,c)}else{if("session"!==e)return!1;a=s.readSession(),c=u.readSession();if(null==a)continue;this.store.state[i]=Object.assign(this.store.state[i],a),this.resetState(i,a,c)}}else n=!1}else{i=t,s=this.getManager(i),u=this.getManager(i+"@func");if("local"===e){a=s.readLocal(),c=u.readSession();null!=a&&(this.store.state[i]=Object.assign(this.store.state[i],a),this.resetState(i,a,c))}else{if("session"!==e)return!1;a=s.readSession(),c=u.readSession();null!=a&&(this.store.state[i]=Object.assign(this.store.state[i],a),this.resetState(i,a,c))}}return n}catch(t){return console.log(t),!1}},t.prototype.resetState=function(t,e,n){for(var r in e)try{if(null==n||void 0===n[r]||null===n[r]){if(void 0!==this.store.function[t][r])(0,this.store.function[t][r])(e[r]);else if(void 0!==this.store.function[t]["set"+this.firstUpperCase(r)]){(0,this.store.function[t]["set"+this.firstUpperCase(r)])(e[r])}}else{var o=n[r];(0,this.store.function[t][o])(e[r])}}catch(t){console.log(t)}},t.prototype.firstUpperCase=function(t){return t[0].toUpperCase()+t.slice(1)},t.prototype.loadLocal=function(t){return this.loadStorage(t,"local")},t.prototype.loadSession=function(t){return this.loadStorage(t,"session")},t.prototype.setUpdateFunction=function(t){this.updateFunction=t},t.prototype.update=function(){this.updateFunction(this.store)},t.prototype.getFunction=function(t,e){return void 0===this.store.function[t]||void 0===this.store.function[t][e]?null:this.store.function[t][e]},t.prototype.getFunctionAsync=function(t,e,n){return void 0===n&&(n=500),i(this,void 0,void 0,(function(){var r,o;return s(this,(function(i){switch(i.label){case 0:r=(new Date).getMilliseconds(),i.label=1;case 1:return o=(new Date).getMilliseconds(),o-r>n?[3,3]:void 0!==this.store.function[t]&&void 0!==this.store.function[t][e]?[2,this.store.function[t][e]]:[4,u(10)];case 2:return i.sent(),[3,1];case 3:return[2,null]}}))}))},t.prototype.getState=function(t,e){return void 0===this.store.state[t]||void 0===this.store.state[t][e]?null:this.store.state[t][e]},t.prototype.getStateAsync=function(t,e,n){return void 0===n&&(n=500),i(this,void 0,void 0,(function(){var r,o;return s(this,(function(i){switch(i.label){case 0:r=(new Date).getMilliseconds(),i.label=1;case 1:return o=(new Date).getMilliseconds(),o-r>n?[3,3]:void 0!==this.store.state[t]&&void 0!==this.store.state[t][e]?[2,this.store.state[t][e]]:[4,u(10)];case 2:return i.sent(),[3,1];case 3:return[2,null]}}))}))},t.prototype.getManager=function(t){return void 0===this.storeManagers[t]&&(this.storeManagers[t]=new o.StoreManager(t)),this.storeManagers[t]},t}(),c=function(){for(var t=0,e=0,n=arguments.length;e<n;e++)t+=arguments[e].length;var r=Array(t),o=0;for(e=0;e<n;e++)for(var i=arguments[e],s=0,u=i.length;s<u;s++,o++)r[o]=i[s];return r};function l(t,e,n){void 0===e&&(e=!1),void 0===n&&(n=[]),Object(r.useEffect)((function(){e&&d.writeSession(t),d.loadSession(t)}),c([t,e],n))}function f(t,e,n){void 0===e&&(e=!1),void 0===n&&(n=[]),Object(r.useEffect)((function(){e&&d.writeLocal(t),d.loadLocal(t)}),c([t,e],n))}var d=new a;function p(t){var e=Object(r.useState)(),n=(e[0],e[1]);d.setUpdateFunction(n);var o=Object(r.createContext)("");return r.createElement(r.Fragment,null,r.createElement(o.Provider,null,t.children))}e.default=p}])}));