!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define(e):(t=t||self).currency=e()}(this,(function(){function t(s,a){if(!(this instanceof t))return new t(s,a);a=Object.assign({},n,a);var o=Math.pow(10,a.precision);this.intValue=s=e(s,a),this.value=s/o,a.increment=a.increment||1/o,a.groups=a.useVedic?i:r,this.s=a,this.p=o}function e(e,n){var r=!(2<arguments.length&&void 0!==arguments[2])||arguments[2],i=n.decimal,s=n.errorOnInvalid,a=n.fromCents,o=Math.pow(10,n.precision),u=e instanceof t;if(u&&a)return e.intValue;if("number"==typeof e||u)i=u?e.value:e;else if("string"==typeof e)s=new RegExp("[^-\\d"+i+"]","g"),i=new RegExp("\\"+i,"g"),i=(i=e.replace(/\((.*)\)/,"-$1").replace(s,"").replace(i,"."))||0;else{if(s)throw Error("Invalid Input");i=0}return a||(i=(i*o).toFixed(4)),r?Math.round(i):i}var n={symbol:"$",separator:",",decimal:".",errorOnInvalid:!1,precision:2,pattern:"!#",negativePattern:"-!#",format:function(t,e){var n=e.pattern,r=e.negativePattern,i=e.symbol,s=e.separator,a=e.decimal;e=e.groups;var o=(""+t).replace(/^-/,"").split("."),u=o[0];return o=o[1],(0<=t.value?n:r).replace("!",i).replace("#",u.replace(e,"$1"+s)+(o?a+o:""))},fromCents:!1},r=/(\d)(?=(\d{3})+\b)/g,i=/(\d)(?=(\d\d)+\d\b)/g;return t.prototype={add:function(n){var r=this.s,i=this.p;return t((this.intValue+e(n,r))/(r.fromCents?1:i),r)},subtract:function(n){var r=this.s,i=this.p;return t((this.intValue-e(n,r))/(r.fromCents?1:i),r)},multiply:function(e){var n=this.s;return t(this.intValue*e/(n.fromCents?1:Math.pow(10,n.precision)),n)},divide:function(n){var r=this.s;return t(this.intValue/e(n,r,!1),r)},distribute:function(e){var n=this.intValue,r=this.p,i=this.s,s=[],a=Math[0<=n?"floor":"ceil"](n/e),o=Math.abs(n-a*e);for(r=i.fromCents?1:r;0!==e;e--){var u=t(a/r,i);0<o--&&(u=u[0<=n?"add":"subtract"](1/r)),s.push(u)}return s},dollars:function(){return~~this.value},cents:function(){return~~(this.intValue%this.p)},format:function(t){var e=this.s;return"function"==typeof t?t(this,e):e.format(this,Object.assign({},e,t))},toString:function(){var t=this.s,e=t.increment;return(Math.round(this.intValue/this.p/e)*e).toFixed(t.precision)},toJSON:function(){return this.value}},t}));
//# sourceMappingURL=index.3e71ab34.js.map