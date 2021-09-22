(function(){function n(t,r,e){if(t===r)return 0!==t||1/t==1/r;if(null==t||null==r)return t===r;if(t._chain&&(t=t._wrapped),r._chain&&(r=r._wrapped),t.isEqual&&_.isFunction(t.isEqual))return t.isEqual(r);if(r.isEqual&&_.isFunction(r.isEqual))return r.isEqual(t);var u=a.call(t);if(u!=a.call(r))return!1;switch(u){case"[object String]":return t==String(r);case"[object Number]":return t!=+t?r!=+r:0==t?1/t==1/r:t==+r;case"[object Date]":case"[object Boolean]":return+t==+r;case"[object RegExp]":return t.source==r.source&&t.global==r.global&&t.multiline==r.multiline&&t.ignoreCase==r.ignoreCase}if("object"!=typeof t||"object"!=typeof r)return!1;for(var i=e.length;i--;)if(e[i]==t)return!0;e.push(t);i=0;var c=!0;if("[object Array]"==u){if(c=(i=t.length)==r.length)for(;i--&&(c=i in t==i in r&&n(t[i],r[i],e)););}else{if("constructor"in t!="constructor"in r||t.constructor!=r.constructor)return!1;for(var o in t)if(_.has(t,o)&&(i++,!(c=_.has(r,o)&&n(t[o],r[o],e))))break;if(c){for(o in r)if(_.has(r,o)&&!i--)break;c=!i}}return e.pop(),c}var t=this,r=t._,e={},u=Array.prototype,i=Object.prototype,c=u.slice,o=u.unshift,a=i.toString,l=i.hasOwnProperty,f=u.forEach,p=u.map,s=u.reduce,h=u.reduceRight,d=u.filter,v=u.every,y=u.some,g=u.indexOf,m=u.lastIndexOf,b=(i=Array.isArray,Object.keys),x=Function.prototype.bind,_=function(n){return new S(n)};"undefined"!=typeof exports?("undefined"!=typeof module&&module.exports&&(exports=module.exports=_),exports._=_):t._=_,_.VERSION="1.3.1";var j=_.each=_.forEach=function(n,t,r){if(null!=n)if(f&&n.forEach===f)n.forEach(t,r);else if(n.length===+n.length)for(var u=0,i=n.length;u<i&&(!(u in n)||t.call(r,n[u],u,n)!==e);u++);else for(u in n)if(_.has(n,u)&&t.call(r,n[u],u,n)===e)break};_.map=_.collect=function(n,t,r){var e=[];return null==n?e:p&&n.map===p?n.map(t,r):(j(n,(function(n,u,i){e[e.length]=t.call(r,n,u,i)})),n.length===+n.length&&(e.length=n.length),e)},_.reduce=_.foldl=_.inject=function(n,t,r,e){var u=arguments.length>2;if(null==n&&(n=[]),s&&n.reduce===s)return e&&(t=_.bind(t,e)),u?n.reduce(t,r):n.reduce(t);if(j(n,(function(n,i,c){u?r=t.call(e,r,n,i,c):(r=n,u=!0)})),!u)throw new TypeError("Reduce of empty array with no initial value");return r},_.reduceRight=_.foldr=function(n,t,r,e){var u=arguments.length>2;if(null==n&&(n=[]),h&&n.reduceRight===h)return e&&(t=_.bind(t,e)),u?n.reduceRight(t,r):n.reduceRight(t);var i=_.toArray(n).reverse();return e&&!u&&(t=_.bind(t,e)),u?_.reduce(i,t,r,e):_.reduce(i,t)},_.find=_.detect=function(n,t,r){var e;return A(n,(function(n,u,i){if(t.call(r,n,u,i))return e=n,!0})),e},_.filter=_.select=function(n,t,r){var e=[];return null==n?e:d&&n.filter===d?n.filter(t,r):(j(n,(function(n,u,i){t.call(r,n,u,i)&&(e[e.length]=n)})),e)},_.reject=function(n,t,r){var e=[];return null==n||j(n,(function(n,u,i){t.call(r,n,u,i)||(e[e.length]=n)})),e},_.every=_.all=function(n,t,r){var u=!0;return null==n?u:v&&n.every===v?n.every(t,r):(j(n,(function(n,i,c){if(!(u=u&&t.call(r,n,i,c)))return e})),u)};var A=_.some=_.any=function(n,t,r){t||(t=_.identity);var u=!1;return null==n?u:y&&n.some===y?n.some(t,r):(j(n,(function(n,i,c){if(u||(u=t.call(r,n,i,c)))return e})),!!u)};_.include=_.contains=function(n,t){var r=!1;return null==n?r:g&&n.indexOf===g?-1!=n.indexOf(t):r=A(n,(function(n){return n===t}))},_.invoke=function(n,t){var r=c.call(arguments,2);return _.map(n,(function(n){return(_.isFunction(t)?t||n:n[t]).apply(n,r)}))},_.pluck=function(n,t){return _.map(n,(function(n){return n[t]}))},_.max=function(n,t,r){if(!t&&_.isArray(n))return Math.max.apply(Math,n);if(!t&&_.isEmpty(n))return-1/0;var e={computed:-1/0};return j(n,(function(n,u,i){(u=t?t.call(r,n,u,i):n)>=e.computed&&(e={value:n,computed:u})})),e.value},_.min=function(n,t,r){if(!t&&_.isArray(n))return Math.min.apply(Math,n);if(!t&&_.isEmpty(n))return 1/0;var e={computed:1/0};return j(n,(function(n,u,i){(u=t?t.call(r,n,u,i):n)<e.computed&&(e={value:n,computed:u})})),e.value},_.shuffle=function(n){var t,r=[];return j(n,(function(n,e){0==e?r[0]=n:(t=Math.floor(Math.random()*(e+1)),r[e]=r[t],r[t]=n)})),r},_.sortBy=function(n,t,r){return _.pluck(_.map(n,(function(n,e,u){return{value:n,criteria:t.call(r,n,e,u)}})).sort((function(n,t){var r=n.criteria,e=t.criteria;return r<e?-1:r>e?1:0})),"value")},_.groupBy=function(n,t){var r={},e=_.isFunction(t)?t:function(n){return n[t]};return j(n,(function(n,t){var u=e(n,t);(r[u]||(r[u]=[])).push(n)})),r},_.sortedIndex=function(n,t,r){r||(r=_.identity);for(var e=0,u=n.length;e<u;){var i=e+u>>1;r(n[i])<r(t)?e=i+1:u=i}return e},_.toArray=function(n){return n?n.toArray?n.toArray():_.isArray(n)||_.isArguments(n)?c.call(n):_.values(n):[]},_.size=function(n){return _.toArray(n).length},_.first=_.head=function(n,t,r){return null==t||r?n[0]:c.call(n,0,t)},_.initial=function(n,t,r){return c.call(n,0,n.length-(null==t||r?1:t))},_.last=function(n,t,r){return null==t||r?n[n.length-1]:c.call(n,Math.max(n.length-t,0))},_.rest=_.tail=function(n,t,r){return c.call(n,null==t||r?1:t)},_.compact=function(n){return _.filter(n,(function(n){return!!n}))},_.flatten=function(n,t){return _.reduce(n,(function(n,r){return _.isArray(r)?n.concat(t?r:_.flatten(r)):(n[n.length]=r,n)}),[])},_.without=function(n){return _.difference(n,c.call(arguments,1))},_.uniq=_.unique=function(n,t,r){r=r?_.map(n,r):n;var e=[];return _.reduce(r,(function(r,u,i){return 0!=i&&(!0===t?_.last(r)==u:_.include(r,u))||(r[r.length]=u,e[e.length]=n[i]),r}),[]),e},_.union=function(){return _.uniq(_.flatten(arguments,!0))},_.intersection=_.intersect=function(n){var t=c.call(arguments,1);return _.filter(_.uniq(n),(function(n){return _.every(t,(function(t){return _.indexOf(t,n)>=0}))}))},_.difference=function(n){var t=_.flatten(c.call(arguments,1));return _.filter(n,(function(n){return!_.include(t,n)}))},_.zip=function(){for(var n=c.call(arguments),t=_.max(_.pluck(n,"length")),r=Array(t),e=0;e<t;e++)r[e]=_.pluck(n,""+e);return r},_.indexOf=function(n,t,r){if(null==n)return-1;var e;if(r)return n[r=_.sortedIndex(n,t)]===t?r:-1;if(g&&n.indexOf===g)return n.indexOf(t);for(r=0,e=n.length;r<e;r++)if(r in n&&n[r]===t)return r;return-1},_.lastIndexOf=function(n,t){if(null==n)return-1;if(m&&n.lastIndexOf===m)return n.lastIndexOf(t);for(var r=n.length;r--;)if(r in n&&n[r]===t)return r;return-1},_.range=function(n,t,r){arguments.length<=1&&(t=n||0,n=0);r=arguments[2]||1;for(var e=Math.max(Math.ceil((t-n)/r),0),u=0,i=Array(e);u<e;)i[u++]=n,n+=r;return i};var w=function(){};_.bind=function(n,t){var r,e;if(n.bind===x&&x)return x.apply(n,c.call(arguments,1));if(!_.isFunction(n))throw new TypeError;return e=c.call(arguments,2),r=function(){if(!(this instanceof r))return n.apply(t,e.concat(c.call(arguments)));w.prototype=n.prototype;var u=new w,i=n.apply(u,e.concat(c.call(arguments)));return Object(i)===i?i:u}},_.bindAll=function(n){var t=c.call(arguments,1);return 0==t.length&&(t=_.functions(n)),j(t,(function(t){n[t]=_.bind(n[t],n)})),n},_.memoize=function(n,t){var r={};return t||(t=_.identity),function(){var e=t.apply(this,arguments);return _.has(r,e)?r[e]:r[e]=n.apply(this,arguments)}},_.delay=function(n,t){var r=c.call(arguments,2);return setTimeout((function(){return n.apply(n,r)}),t)},_.defer=function(n){return _.delay.apply(_,[n,1].concat(c.call(arguments,1)))},_.throttle=function(n,t){var r,e,u,i,c,o=_.debounce((function(){c=i=!1}),t);return function(){r=this,e=arguments,u||(u=setTimeout((function(){u=null,c&&n.apply(r,e),o()}),t)),i?c=!0:n.apply(r,e),o(),i=!0}},_.debounce=function(n,t){var r;return function(){var e=this,u=arguments;clearTimeout(r),r=setTimeout((function(){r=null,n.apply(e,u)}),t)}},_.once=function(n){var t,r=!1;return function(){return r?t:(r=!0,t=n.apply(this,arguments))}},_.wrap=function(n,t){return function(){var r=[n].concat(c.call(arguments,0));return t.apply(this,r)}},_.compose=function(){var n=arguments;return function(){for(var t=arguments,r=n.length-1;r>=0;r--)t=[n[r].apply(this,t)];return t[0]}},_.after=function(n,t){return n<=0?t():function(){if(--n<1)return t.apply(this,arguments)}},_.keys=b||function(n){if(n!==Object(n))throw new TypeError("Invalid object");var t,r=[];for(t in n)_.has(n,t)&&(r[r.length]=t);return r},_.values=function(n){return _.map(n,_.identity)},_.functions=_.methods=function(n){var t,r=[];for(t in n)_.isFunction(n[t])&&r.push(t);return r.sort()},_.extend=function(n){return j(c.call(arguments,1),(function(t){for(var r in t)n[r]=t[r]})),n},_.defaults=function(n){return j(c.call(arguments,1),(function(t){for(var r in t)null==n[r]&&(n[r]=t[r])})),n},_.clone=function(n){return _.isObject(n)?_.isArray(n)?n.slice():_.extend({},n):n},_.tap=function(n,t){return t(n),n},_.isEqual=function(t,r){return n(t,r,[])},_.isEmpty=function(n){if(_.isArray(n)||_.isString(n))return 0===n.length;for(var t in n)if(_.has(n,t))return!1;return!0},_.isElement=function(n){return!(!n||1!=n.nodeType)},_.isArray=i||function(n){return"[object Array]"==a.call(n)},_.isObject=function(n){return n===Object(n)},_.isArguments=function(n){return"[object Arguments]"==a.call(n)},_.isArguments(arguments)||(_.isArguments=function(n){return!(!n||!_.has(n,"callee"))}),_.isFunction=function(n){return"[object Function]"==a.call(n)},_.isString=function(n){return"[object String]"==a.call(n)},_.isNumber=function(n){return"[object Number]"==a.call(n)},_.isNaN=function(n){return n!=n},_.isBoolean=function(n){return!0===n||!1===n||"[object Boolean]"==a.call(n)},_.isDate=function(n){return"[object Date]"==a.call(n)},_.isRegExp=function(n){return"[object RegExp]"==a.call(n)},_.isNull=function(n){return null===n},_.isUndefined=function(n){return void 0===n},_.has=function(n,t){return l.call(n,t)},_.noConflict=function(){return t._=r,this},_.identity=function(n){return n},_.times=function(n,t,r){for(var e=0;e<n;e++)t.call(r,e)},_.escape=function(n){return(""+n).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#x27;").replace(/\//g,"&#x2F;")},_.mixin=function(n){j(_.functions(n),(function(t){k(t,_[t]=n[t])}))};var E=0;_.uniqueId=function(n){var t=E++;return n?n+t:t},_.templateSettings={evaluate:/<%([\s\S]+?)%>/g,interpolate:/<%=([\s\S]+?)%>/g,escape:/<%-([\s\S]+?)%>/g};var O=/.^/,q=function(n){return n.replace(/\\\\/g,"\\").replace(/\\'/g,"'")};_.template=function(n,t){var r=_.templateSettings,e=(r="var __p=[],print=function(){__p.push.apply(__p,arguments);};with(obj||{}){__p.push('"+n.replace(/\\/g,"\\\\").replace(/'/g,"\\'").replace(r.escape||O,(function(n,t){return"',_.escape("+q(t)+"),'"})).replace(r.interpolate||O,(function(n,t){return"',"+q(t)+",'"})).replace(r.evaluate||O,(function(n,t){return"');"+q(t).replace(/[\r\n\t]/g," ")+";__p.push('"})).replace(/\r/g,"\\r").replace(/\n/g,"\\n").replace(/\t/g,"\\t")+"');}return __p.join('');",new Function("obj","_",r));return t?e(t,_):function(n){return e.call(this,n,_)}},_.chain=function(n){return _(n).chain()};var S=function(n){this._wrapped=n};_.prototype=S.prototype;var F=function(n,t){return t?_(n).chain():n},k=function(n,t){S.prototype[n]=function(){var n=c.call(arguments);return o.call(n,this._wrapped),F(t.apply(_,n),this._chain)}};_.mixin(_),j("pop,push,reverse,shift,sort,splice,unshift".split(","),(function(n){var t=u[n];S.prototype[n]=function(){var r=this._wrapped;t.apply(r,arguments);var e=r.length;return("shift"==n||"splice"==n)&&0===e&&delete r[0],F(r,this._chain)}})),j(["concat","join","slice"],(function(n){var t=u[n];S.prototype[n]=function(){return F(t.apply(this._wrapped,arguments),this._chain)}})),S.prototype.chain=function(){return this._chain=!0,this},S.prototype.value=function(){return this._wrapped}}).call(this);