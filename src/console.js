if (typeof FEATURE_NO_IE === 'undefined') {
  // References to IE 9 in this file mean the *real* IE 9 browser, not IE 11 in 9 emulation mode.
  // Note that in IE 9, until the F12 are actually opened window.console is undefined!
  let con = window.console = window.console || {};
  let nop = function() {};
  // console.memory is actually Chrome-only at this point,
  // but Aurelia does not use it so we're cutting down on "polyfills" here.
  // Moreover, that object is utterly useless in other browsers, as all stats would actually be 'undefined'
  if (!con.memory) con.memory = {};
  ('assert,clear,count,debug,dir,dirxml,error,exception,group,' +
   'groupCollapsed,groupEnd,info,log,markTimeline,profile,profiles,profileEnd,' +
   'show,table,time,timeEnd,timeline,timelineEnd,timeStamp,trace,warn')
    .split(',')
    .forEach(m => { if (!con[m]) con[m] = nop; });

  // This is really f***ed up IE 9 stuff.
  // You can be in a situation where console.log is an object, not a function.
  // And the magic voodoo below that should _not_ work (the Function.prototype.call.bind(object,...) part)
  // actually kicks IE 9 into converting that object into a real function that actually logs stuff.
  // See http://patik.com/blog/complete-cross-browser-console-log/
  if (typeof con.log === 'object') {
    'log,info,warn,error,assert,dir,clear,profile,profileEnd'
      .split(',')
      .forEach(function(method) {
        console[method] = this.bind(console[method], console);
      }, Function.prototype.call);
  }
}
