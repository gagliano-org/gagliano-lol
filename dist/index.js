var __create = Object.create;
var __defProp = Object.defineProperty;
var __getProtoOf = Object.getPrototypeOf;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __toESM = (mod, isNodeMode, target) => {
  target = mod != null ? __create(__getProtoOf(mod)) : {};
  const to = isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target;
  for (let key of __getOwnPropNames(mod))
    if (!__hasOwnProp.call(to, key))
      __defProp(to, key, {
        get: () => mod[key],
        enumerable: true
      });
  return to;
};
var __commonJS = (cb, mod) => () => (mod || cb((mod = { exports: {} }).exports, mod), mod.exports);

// /Users/Ari/zaion/node_modules/page/page.js
var require_page = __commonJS((exports, module) => {
  (function(global, factory) {
    typeof exports === "object" && typeof module !== "undefined" ? module.exports = factory() : typeof define === "function" && define.amd ? define(factory) : global.page = factory();
  })(exports, function() {
    var isarray2 = Array.isArray || function(arr) {
      return Object.prototype.toString.call(arr) == "[object Array]";
    };
    var pathToRegexp_12 = pathToRegexp2;
    var parse_12 = parse2;
    var compile_12 = compile2;
    var tokensToFunction_12 = tokensToFunction2;
    var tokensToRegExp_12 = tokensToRegExp2;
    var PATH_REGEXP2 = new RegExp([
      "(\\\\.)",
      "([\\/.])?(?:(?:\\:(\\w+)(?:\\(((?:\\\\.|[^()])+)\\))?|\\(((?:\\\\.|[^()])+)\\))([+*?])?|(\\*))"
    ].join("|"), "g");
    function parse2(str) {
      var tokens = [];
      var key = 0;
      var index = 0;
      var path = "";
      var res;
      while ((res = PATH_REGEXP2.exec(str)) != null) {
        var m = res[0];
        var escaped = res[1];
        var offset = res.index;
        path += str.slice(index, offset);
        index = offset + m.length;
        if (escaped) {
          path += escaped[1];
          continue;
        }
        if (path) {
          tokens.push(path);
          path = "";
        }
        var prefix = res[2];
        var name = res[3];
        var capture = res[4];
        var group = res[5];
        var suffix = res[6];
        var asterisk = res[7];
        var repeat = suffix === "+" || suffix === "*";
        var optional = suffix === "?" || suffix === "*";
        var delimiter = prefix || "/";
        var pattern = capture || group || (asterisk ? ".*" : "[^" + delimiter + "]+?");
        tokens.push({
          name: name || key++,
          prefix: prefix || "",
          delimiter,
          optional,
          repeat,
          pattern: escapeGroup2(pattern)
        });
      }
      if (index < str.length) {
        path += str.substr(index);
      }
      if (path) {
        tokens.push(path);
      }
      return tokens;
    }
    function compile2(str) {
      return tokensToFunction2(parse2(str));
    }
    function tokensToFunction2(tokens) {
      var matches = new Array(tokens.length);
      for (var i = 0;i < tokens.length; i++) {
        if (typeof tokens[i] === "object") {
          matches[i] = new RegExp("^" + tokens[i].pattern + "$");
        }
      }
      return function(obj) {
        var path = "";
        var data = obj || {};
        for (var i2 = 0;i2 < tokens.length; i2++) {
          var token = tokens[i2];
          if (typeof token === "string") {
            path += token;
            continue;
          }
          var value = data[token.name];
          var segment;
          if (value == null) {
            if (token.optional) {
              continue;
            } else {
              throw new TypeError('Expected "' + token.name + '" to be defined');
            }
          }
          if (isarray2(value)) {
            if (!token.repeat) {
              throw new TypeError('Expected "' + token.name + '" to not repeat, but received "' + value + '"');
            }
            if (value.length === 0) {
              if (token.optional) {
                continue;
              } else {
                throw new TypeError('Expected "' + token.name + '" to not be empty');
              }
            }
            for (var j = 0;j < value.length; j++) {
              segment = encodeURIComponent(value[j]);
              if (!matches[i2].test(segment)) {
                throw new TypeError('Expected all "' + token.name + '" to match "' + token.pattern + '", but received "' + segment + '"');
              }
              path += (j === 0 ? token.prefix : token.delimiter) + segment;
            }
            continue;
          }
          segment = encodeURIComponent(value);
          if (!matches[i2].test(segment)) {
            throw new TypeError('Expected "' + token.name + '" to match "' + token.pattern + '", but received "' + segment + '"');
          }
          path += token.prefix + segment;
        }
        return path;
      };
    }
    function escapeString2(str) {
      return str.replace(/([.+*?=^!:${}()[\]|\/])/g, "\\$1");
    }
    function escapeGroup2(group) {
      return group.replace(/([=!:$\/()])/g, "\\$1");
    }
    function attachKeys2(re, keys) {
      re.keys = keys;
      return re;
    }
    function flags2(options) {
      return options.sensitive ? "" : "i";
    }
    function regexpToRegexp2(path, keys) {
      var groups = path.source.match(/\((?!\?)/g);
      if (groups) {
        for (var i = 0;i < groups.length; i++) {
          keys.push({
            name: i,
            prefix: null,
            delimiter: null,
            optional: false,
            repeat: false,
            pattern: null
          });
        }
      }
      return attachKeys2(path, keys);
    }
    function arrayToRegexp2(path, keys, options) {
      var parts = [];
      for (var i = 0;i < path.length; i++) {
        parts.push(pathToRegexp2(path[i], keys, options).source);
      }
      var regexp = new RegExp("(?:" + parts.join("|") + ")", flags2(options));
      return attachKeys2(regexp, keys);
    }
    function stringToRegexp2(path, keys, options) {
      var tokens = parse2(path);
      var re = tokensToRegExp2(tokens, options);
      for (var i = 0;i < tokens.length; i++) {
        if (typeof tokens[i] !== "string") {
          keys.push(tokens[i]);
        }
      }
      return attachKeys2(re, keys);
    }
    function tokensToRegExp2(tokens, options) {
      options = options || {};
      var strict = options.strict;
      var end = options.end !== false;
      var route = "";
      var lastToken = tokens[tokens.length - 1];
      var endsWithSlash = typeof lastToken === "string" && /\/$/.test(lastToken);
      for (var i = 0;i < tokens.length; i++) {
        var token = tokens[i];
        if (typeof token === "string") {
          route += escapeString2(token);
        } else {
          var prefix = escapeString2(token.prefix);
          var capture = token.pattern;
          if (token.repeat) {
            capture += "(?:" + prefix + capture + ")*";
          }
          if (token.optional) {
            if (prefix) {
              capture = "(?:" + prefix + "(" + capture + "))?";
            } else {
              capture = "(" + capture + ")?";
            }
          } else {
            capture = prefix + "(" + capture + ")";
          }
          route += capture;
        }
      }
      if (!strict) {
        route = (endsWithSlash ? route.slice(0, -2) : route) + "(?:\\/(?=$))?";
      }
      if (end) {
        route += "$";
      } else {
        route += strict && endsWithSlash ? "" : "(?=\\/|$)";
      }
      return new RegExp("^" + route, flags2(options));
    }
    function pathToRegexp2(path, keys, options) {
      keys = keys || [];
      if (!isarray2(keys)) {
        options = keys;
        keys = [];
      } else if (!options) {
        options = {};
      }
      if (path instanceof RegExp) {
        return regexpToRegexp2(path, keys, options);
      }
      if (isarray2(path)) {
        return arrayToRegexp2(path, keys, options);
      }
      return stringToRegexp2(path, keys, options);
    }
    pathToRegexp_12.parse = parse_12;
    pathToRegexp_12.compile = compile_12;
    pathToRegexp_12.tokensToFunction = tokensToFunction_12;
    pathToRegexp_12.tokensToRegExp = tokensToRegExp_12;
    var hasDocument2 = typeof document !== "undefined";
    var hasWindow2 = typeof window !== "undefined";
    var hasHistory2 = typeof history !== "undefined";
    var hasProcess2 = typeof process !== "undefined";
    var clickEvent2 = hasDocument2 && document.ontouchstart ? "touchstart" : "click";
    var isLocation2 = hasWindow2 && !!(window.history.location || window.location);
    function Page2() {
      this.callbacks = [];
      this.exits = [];
      this.current = "";
      this.len = 0;
      this._decodeURLComponents = true;
      this._base = "";
      this._strict = false;
      this._running = false;
      this._hashbang = false;
      this.clickHandler = this.clickHandler.bind(this);
      this._onpopstate = this._onpopstate.bind(this);
    }
    Page2.prototype.configure = function(options) {
      var opts = options || {};
      this._window = opts.window || hasWindow2 && window;
      this._decodeURLComponents = opts.decodeURLComponents !== false;
      this._popstate = opts.popstate !== false && hasWindow2;
      this._click = opts.click !== false && hasDocument2;
      this._hashbang = !!opts.hashbang;
      var _window = this._window;
      if (this._popstate) {
        _window.addEventListener("popstate", this._onpopstate, false);
      } else if (hasWindow2) {
        _window.removeEventListener("popstate", this._onpopstate, false);
      }
      if (this._click) {
        _window.document.addEventListener(clickEvent2, this.clickHandler, false);
      } else if (hasDocument2) {
        _window.document.removeEventListener(clickEvent2, this.clickHandler, false);
      }
      if (this._hashbang && hasWindow2 && !hasHistory2) {
        _window.addEventListener("hashchange", this._onpopstate, false);
      } else if (hasWindow2) {
        _window.removeEventListener("hashchange", this._onpopstate, false);
      }
    };
    Page2.prototype.base = function(path) {
      if (arguments.length === 0)
        return this._base;
      this._base = path;
    };
    Page2.prototype._getBase = function() {
      var base = this._base;
      if (!!base)
        return base;
      var loc = hasWindow2 && this._window && this._window.location;
      if (hasWindow2 && this._hashbang && loc && loc.protocol === "file:") {
        base = loc.pathname;
      }
      return base;
    };
    Page2.prototype.strict = function(enable) {
      if (arguments.length === 0)
        return this._strict;
      this._strict = enable;
    };
    Page2.prototype.start = function(options) {
      var opts = options || {};
      this.configure(opts);
      if (opts.dispatch === false)
        return;
      this._running = true;
      var url;
      if (isLocation2) {
        var window2 = this._window;
        var loc = window2.location;
        if (this._hashbang && ~loc.hash.indexOf("#!")) {
          url = loc.hash.substr(2) + loc.search;
        } else if (this._hashbang) {
          url = loc.search + loc.hash;
        } else {
          url = loc.pathname + loc.search + loc.hash;
        }
      }
      this.replace(url, null, true, opts.dispatch);
    };
    Page2.prototype.stop = function() {
      if (!this._running)
        return;
      this.current = "";
      this.len = 0;
      this._running = false;
      var window2 = this._window;
      this._click && window2.document.removeEventListener(clickEvent2, this.clickHandler, false);
      hasWindow2 && window2.removeEventListener("popstate", this._onpopstate, false);
      hasWindow2 && window2.removeEventListener("hashchange", this._onpopstate, false);
    };
    Page2.prototype.show = function(path, state, dispatch, push) {
      var ctx = new Context2(path, state, this), prev = this.prevContext;
      this.prevContext = ctx;
      this.current = ctx.path;
      if (dispatch !== false)
        this.dispatch(ctx, prev);
      if (ctx.handled !== false && push !== false)
        ctx.pushState();
      return ctx;
    };
    Page2.prototype.back = function(path, state) {
      var page3 = this;
      if (this.len > 0) {
        var window2 = this._window;
        hasHistory2 && window2.history.back();
        this.len--;
      } else if (path) {
        setTimeout(function() {
          page3.show(path, state);
        });
      } else {
        setTimeout(function() {
          page3.show(page3._getBase(), state);
        });
      }
    };
    Page2.prototype.redirect = function(from, to) {
      var inst = this;
      if (typeof from === "string" && typeof to === "string") {
        page2.call(this, from, function(e) {
          setTimeout(function() {
            inst.replace(to);
          }, 0);
        });
      }
      if (typeof from === "string" && typeof to === "undefined") {
        setTimeout(function() {
          inst.replace(from);
        }, 0);
      }
    };
    Page2.prototype.replace = function(path, state, init, dispatch) {
      var ctx = new Context2(path, state, this), prev = this.prevContext;
      this.prevContext = ctx;
      this.current = ctx.path;
      ctx.init = init;
      ctx.save();
      if (dispatch !== false)
        this.dispatch(ctx, prev);
      return ctx;
    };
    Page2.prototype.dispatch = function(ctx, prev) {
      var i = 0, j = 0, page3 = this;
      function nextExit() {
        var fn = page3.exits[j++];
        if (!fn)
          return nextEnter();
        fn(prev, nextExit);
      }
      function nextEnter() {
        var fn = page3.callbacks[i++];
        if (ctx.path !== page3.current) {
          ctx.handled = false;
          return;
        }
        if (!fn)
          return unhandled2.call(page3, ctx);
        fn(ctx, nextEnter);
      }
      if (prev) {
        nextExit();
      } else {
        nextEnter();
      }
    };
    Page2.prototype.exit = function(path, fn) {
      if (typeof path === "function") {
        return this.exit("*", path);
      }
      var route = new Route2(path, null, this);
      for (var i = 1;i < arguments.length; ++i) {
        this.exits.push(route.middleware(arguments[i]));
      }
    };
    Page2.prototype.clickHandler = function(e) {
      if (this._which(e) !== 1)
        return;
      if (e.metaKey || e.ctrlKey || e.shiftKey)
        return;
      if (e.defaultPrevented)
        return;
      var el = e.target;
      var eventPath = e.path || (e.composedPath ? e.composedPath() : null);
      if (eventPath) {
        for (var i = 0;i < eventPath.length; i++) {
          if (!eventPath[i].nodeName)
            continue;
          if (eventPath[i].nodeName.toUpperCase() !== "A")
            continue;
          if (!eventPath[i].href)
            continue;
          el = eventPath[i];
          break;
        }
      }
      while (el && el.nodeName.toUpperCase() !== "A")
        el = el.parentNode;
      if (!el || el.nodeName.toUpperCase() !== "A")
        return;
      var svg = typeof el.href === "object" && el.href.constructor.name === "SVGAnimatedString";
      if (el.hasAttribute("download") || el.getAttribute("rel") === "external")
        return;
      var link = el.getAttribute("href");
      if (!this._hashbang && this._samePath(el) && (el.hash || link === "#"))
        return;
      if (link && link.indexOf("mailto:") > -1)
        return;
      if (svg ? el.target.baseVal : el.target)
        return;
      if (!svg && !this.sameOrigin(el.href))
        return;
      var path = svg ? el.href.baseVal : el.pathname + el.search + (el.hash || "");
      path = path[0] !== "/" ? "/" + path : path;
      if (hasProcess2 && path.match(/^\/[a-zA-Z]:\//)) {
        path = path.replace(/^\/[a-zA-Z]:\//, "/");
      }
      var orig = path;
      var pageBase = this._getBase();
      if (path.indexOf(pageBase) === 0) {
        path = path.substr(pageBase.length);
      }
      if (this._hashbang)
        path = path.replace("#!", "");
      if (pageBase && orig === path && (!isLocation2 || this._window.location.protocol !== "file:")) {
        return;
      }
      e.preventDefault();
      this.show(orig);
    };
    Page2.prototype._onpopstate = function() {
      var loaded = false;
      if (!hasWindow2) {
        return function() {
        };
      }
      if (hasDocument2 && document.readyState === "complete") {
        loaded = true;
      } else {
        window.addEventListener("load", function() {
          setTimeout(function() {
            loaded = true;
          }, 0);
        });
      }
      return function onpopstate(e) {
        if (!loaded)
          return;
        var page3 = this;
        if (e.state) {
          var path = e.state.path;
          page3.replace(path, e.state);
        } else if (isLocation2) {
          var loc = page3._window.location;
          page3.show(loc.pathname + loc.search + loc.hash, undefined, undefined, false);
        }
      };
    }();
    Page2.prototype._which = function(e) {
      e = e || hasWindow2 && this._window.event;
      return e.which == null ? e.button : e.which;
    };
    Page2.prototype._toURL = function(href) {
      var window2 = this._window;
      if (typeof URL === "function" && isLocation2) {
        return new URL(href, window2.location.toString());
      } else if (hasDocument2) {
        var anc = window2.document.createElement("a");
        anc.href = href;
        return anc;
      }
    };
    Page2.prototype.sameOrigin = function(href) {
      if (!href || !isLocation2)
        return false;
      var url = this._toURL(href);
      var window2 = this._window;
      var loc = window2.location;
      return loc.protocol === url.protocol && loc.hostname === url.hostname && (loc.port === url.port || loc.port === "" && (url.port == 80 || url.port == 443));
    };
    Page2.prototype._samePath = function(url) {
      if (!isLocation2)
        return false;
      var window2 = this._window;
      var loc = window2.location;
      return url.pathname === loc.pathname && url.search === loc.search;
    };
    Page2.prototype._decodeURLEncodedURIComponent = function(val) {
      if (typeof val !== "string") {
        return val;
      }
      return this._decodeURLComponents ? decodeURIComponent(val.replace(/\+/g, " ")) : val;
    };
    function createPage2() {
      var pageInstance = new Page2;
      function pageFn() {
        return page2.apply(pageInstance, arguments);
      }
      pageFn.callbacks = pageInstance.callbacks;
      pageFn.exits = pageInstance.exits;
      pageFn.base = pageInstance.base.bind(pageInstance);
      pageFn.strict = pageInstance.strict.bind(pageInstance);
      pageFn.start = pageInstance.start.bind(pageInstance);
      pageFn.stop = pageInstance.stop.bind(pageInstance);
      pageFn.show = pageInstance.show.bind(pageInstance);
      pageFn.back = pageInstance.back.bind(pageInstance);
      pageFn.redirect = pageInstance.redirect.bind(pageInstance);
      pageFn.replace = pageInstance.replace.bind(pageInstance);
      pageFn.dispatch = pageInstance.dispatch.bind(pageInstance);
      pageFn.exit = pageInstance.exit.bind(pageInstance);
      pageFn.configure = pageInstance.configure.bind(pageInstance);
      pageFn.sameOrigin = pageInstance.sameOrigin.bind(pageInstance);
      pageFn.clickHandler = pageInstance.clickHandler.bind(pageInstance);
      pageFn.create = createPage2;
      Object.defineProperty(pageFn, "len", {
        get: function() {
          return pageInstance.len;
        },
        set: function(val) {
          pageInstance.len = val;
        }
      });
      Object.defineProperty(pageFn, "current", {
        get: function() {
          return pageInstance.current;
        },
        set: function(val) {
          pageInstance.current = val;
        }
      });
      pageFn.Context = Context2;
      pageFn.Route = Route2;
      return pageFn;
    }
    function page2(path, fn) {
      if (typeof path === "function") {
        return page2.call(this, "*", path);
      }
      if (typeof fn === "function") {
        var route = new Route2(path, null, this);
        for (var i = 1;i < arguments.length; ++i) {
          this.callbacks.push(route.middleware(arguments[i]));
        }
      } else if (typeof path === "string") {
        this[typeof fn === "string" ? "redirect" : "show"](path, fn);
      } else {
        this.start(path);
      }
    }
    function unhandled2(ctx) {
      if (ctx.handled)
        return;
      var current;
      var page3 = this;
      var window2 = page3._window;
      if (page3._hashbang) {
        current = isLocation2 && this._getBase() + window2.location.hash.replace("#!", "");
      } else {
        current = isLocation2 && window2.location.pathname + window2.location.search;
      }
      if (current === ctx.canonicalPath)
        return;
      page3.stop();
      ctx.handled = false;
      isLocation2 && (window2.location.href = ctx.canonicalPath);
    }
    function escapeRegExp2(s) {
      return s.replace(/([.+*?=^!:${}()[\]|/\\])/g, "\\$1");
    }
    function Context2(path, state, pageInstance) {
      var _page = this.page = pageInstance || page2;
      var window2 = _page._window;
      var hashbang = _page._hashbang;
      var pageBase = _page._getBase();
      if (path[0] === "/" && path.indexOf(pageBase) !== 0)
        path = pageBase + (hashbang ? "#!" : "") + path;
      var i = path.indexOf("?");
      this.canonicalPath = path;
      var re = new RegExp("^" + escapeRegExp2(pageBase));
      this.path = path.replace(re, "") || "/";
      if (hashbang)
        this.path = this.path.replace("#!", "") || "/";
      this.title = hasDocument2 && window2.document.title;
      this.state = state || {};
      this.state.path = path;
      this.querystring = ~i ? _page._decodeURLEncodedURIComponent(path.slice(i + 1)) : "";
      this.pathname = _page._decodeURLEncodedURIComponent(~i ? path.slice(0, i) : path);
      this.params = {};
      this.hash = "";
      if (!hashbang) {
        if (!~this.path.indexOf("#"))
          return;
        var parts = this.path.split("#");
        this.path = this.pathname = parts[0];
        this.hash = _page._decodeURLEncodedURIComponent(parts[1]) || "";
        this.querystring = this.querystring.split("#")[0];
      }
    }
    Context2.prototype.pushState = function() {
      var page3 = this.page;
      var window2 = page3._window;
      var hashbang = page3._hashbang;
      page3.len++;
      if (hasHistory2) {
        window2.history.pushState(this.state, this.title, hashbang && this.path !== "/" ? "#!" + this.path : this.canonicalPath);
      }
    };
    Context2.prototype.save = function() {
      var page3 = this.page;
      if (hasHistory2) {
        page3._window.history.replaceState(this.state, this.title, page3._hashbang && this.path !== "/" ? "#!" + this.path : this.canonicalPath);
      }
    };
    function Route2(path, options, page3) {
      var _page = this.page = page3 || globalPage2;
      var opts = options || {};
      opts.strict = opts.strict || _page._strict;
      this.path = path === "*" ? "(.*)" : path;
      this.method = "GET";
      this.regexp = pathToRegexp_12(this.path, this.keys = [], opts);
    }
    Route2.prototype.middleware = function(fn) {
      var self = this;
      return function(ctx, next) {
        if (self.match(ctx.path, ctx.params)) {
          ctx.routePath = self.path;
          return fn(ctx, next);
        }
        next();
      };
    };
    Route2.prototype.match = function(path, params) {
      var keys = this.keys, qsIndex = path.indexOf("?"), pathname = ~qsIndex ? path.slice(0, qsIndex) : path, m = this.regexp.exec(decodeURIComponent(pathname));
      if (!m)
        return false;
      delete params[0];
      for (var i = 1, len = m.length;i < len; ++i) {
        var key = keys[i - 1];
        var val = this.page._decodeURLEncodedURIComponent(m[i]);
        if (val !== undefined || !hasOwnProperty.call(params, key.name)) {
          params[key.name] = val;
        }
      }
      return true;
    };
    var globalPage2 = createPage2();
    var page_js2 = globalPage2;
    var default_12 = globalPage2;
    page_js2.default = default_12;
    return page_js2;
  });
});

// /Users/Ari/zaion/node_modules/@zaionstate/ui/dist/index.js
var tempoTrascorso = function(dataUnix, lingua) {
  const oraAttuale = Date.now();
  const data = new Date(dataUnix);
  const diff = (oraAttuale - Number(data)) / 1000;
  const secondi = Math.floor(diff) % 60;
  const minuti = Math.floor(diff / 60) % 60;
  const ore = Math.floor(diff / 3600) % 24;
  const giorni = Math.floor(diff / 86400) % 7;
  const settimane = Math.floor(diff / 604800) % 52;
  const anni = Math.floor(diff / 31536000);
  if (lingua === "it") {
    if (anni >= 1)
      return `${anni} ${anni === 1 ? "anno" : "anni"} fa`;
    if (settimane >= 1)
      return `${settimane} ${settimane === 1 ? "settimana" : "settimane"} fa`;
    if (giorni >= 1)
      return `${giorni} ${giorni === 1 ? "giorno" : "giorni"} fa`;
    if (ore >= 1)
      return `${ore} ${ore === 1 ? "ora" : "ore"} fa`;
    if (minuti >= 1)
      return `${minuti} ${minuti === 1 ? "minuto" : "minuti"} fa`;
    return `${secondi}  ${secondi === 1 ? "secondi" : "secondi"} fa`;
  } else {
    if (anni >= 1)
      return `${anni} ${anni === 1 ? "day" : "days"} ago`;
    if (settimane >= 1)
      return `${settimane} ${settimane === 1 ? "week" : "weeks"} ago`;
    if (giorni >= 1)
      return `${giorni} ${giorni === 1 ? "day" : "days"} ago`;
    if (ore >= 1)
      return `${ore} ${ore === 1 ? "hour" : "hours"} ago`;
    if (minuti >= 1)
      return `${minuti} ${minuti === 1 ? "minute" : "minutes"} ago`;
    return `${secondi} ${secondi === 1 ? "second" : "seconds"} ago`;
  }
};
var UserAgent;
(function(UserAgent2) {

  class UserAgentInfo {
    #userAgent;
    value;
    constructor(window2) {
      this.#userAgent = window2.navigator.userAgent;
      this.value = this.#makeUserAgentInfos(this.#userAgent);
    }
    get isMobile() {
      return UserAgent2.isMobile(this.#userAgent);
    }
    #parseUserAgent(userAgent) {
      return userAgent.split("(").map((e) => e.trim()).map((e) => e.split(")")).flat().map((e) => e.trim()).map((e) => e.split(";")).flat().map((e) => e.trim());
    }
    #makeUserAgentInfos(userAgent) {
      const arr = this.#parseUserAgent(userAgent);
      const obj = {
        userAgent: arr[0],
        device: arr[1],
        operatingSystem: arr[2],
        webKitVersion: arr[3],
        layoutEngine: arr[4],
        browser: arr[5].split("/")[0],
        browserVersion: arr[5].split("/")[1]
      };
      return obj;
    }
  }
  UserAgent2.UserAgentInfo = UserAgentInfo;
  UserAgent2.isMobile = (userAgent) => /iPhone|iPad|iPod|Android|webOS|BlackBerry|Windows Phone/i.test(userAgent);
})(UserAgent || (UserAgent = {}));

class App {
  value;
  constructor(value) {
    this.value = value;
    const mkcb = this.makeEmitCb;
    const mkecb = this.makeEmitEventCb;
    this.value.userAgent = new App.UserAgent.UserAgentInfo(this.value.window);
    this.value.isWebln = App.WebLN.isWebLN(this.value.window);
    this.value.window.addEventListener("load", mkecb(App.events.load));
    this.value.window.addEventListener("DOMContentLoaded", mkcb(App.events.dom));
    this.themeQuery.addEventListener("change", mkecb(App.events.themeChange));
    this.orientationQuery.addEventListener("change", mkcb(App.events.orientationChange));
    this.value.isMinWIth768 = this.minWidth768Query.matches;
    this.minWidth768Query.addEventListener("change", mkcb(App.events.minWidth768Change));
    this.maxWidth320Query.addEventListener("change", mkcb(App.events.maxWidth320Change));
    this.maxWidth420Query.addEventListener("change", mkcb(App.events.maxWidth420Change));
  }
  get themeQuery() {
    return App.getThemeQuery(this.value.window);
  }
  get orientationQuery() {
    return App.getOrientation(this.value.window);
  }
  get minWidth768Query() {
    return App.getMinWith768(this.value.window);
  }
  get maxWidth320Query() {
    return App.getMaxWidth320(this.value.window);
  }
  get maxWidth420Query() {
    return App.getMaxWidth420(this.value.window);
  }
  makeEmitCb = (type) => (data) => this.emit(type, data);
  makeEmitEventCb = (type) => (data) => this.emit(type, data);
  requestProvider = async () => {
    this.emit(App.events.requestedProvider);
    try {
      setTimeout(async () => {
        globalThis.that = window.WebLN.requestProvider;
        this.value.webln = await window.WebLN.requestProvider();
        this.emit(App.events.gotProvider);
      }, 100);
    } catch (error) {
      console.log("passed here too");
      this.emit(App.events.noProvider);
    }
  };
  checkNostr = () => {
    if (window.nostr) {
      this.emit(App.events.nostr, window.nostr);
    } else {
      console.log("nostr not found");
    }
  };
  #subscribers = new Map;
  #eventSubs = new Map;
  emit(type, data = undefined) {
    if (data) {
      if ("matches" in data) {
        const subscribers = this.#subscribers.get(type);
        if (subscribers) {
          subscribers.forEach((e) => {
            e(this, data);
          });
        } else
          throw new Error(`no subscriber for this event: ${type}`);
      } else {
        const subscribers = this.#eventSubs.get(type);
        if (subscribers) {
          subscribers.forEach((e) => {
            e(this, data);
          });
        } else
          throw new Error(`no subscriber for this event: ${type}`);
      }
    } else {
      const subscribers = this.#subscribers.get(type);
      if (subscribers) {
        subscribers.forEach((e) => {
          e(this, undefined);
        });
      } else
        throw new Error(`no subscriber for this event: ${type}`);
    }
  }
  on(type, subscriber) {
    const subscribers = this.#subscribers.get(type);
    const eventSub = this.#eventSubs.get(type);
    if (type === App.events.load || type === App.events.dom || type === App.events.nostr) {
      if (eventSub) {
        eventSub.push(subscriber);
      } else
        this.#eventSubs.set(type, [subscriber]);
    } else {
      if (subscribers)
        subscribers.push(subscriber);
      else
        this.#subscribers.set(type, [subscriber]);
    }
    return this;
  }
  appendTo = (to, element) => {
    if (to === "body") {
      this.value.window.document.getElementsByTagName(to)[0].appendChild(element);
    } else {
      this.value.window.document.getElementById(to)?.appendChild(element);
    }
  };
  appendToBody = (element) => {
    return this.appendTo("body", element);
  };
  setBodyClassName = (className) => {
    const body = this.value.window.document.getElementsByTagName("body").item(0);
    if (body) {
      body.className = className;
    }
  };
  get(path) {
    const filtered = this.value.nodeslist.filter((e) => e.path === path);
    if (filtered.length === 1)
      return filtered[0];
    return this.value.nodeslist.filter((e) => e.path === path);
  }
}
(function(App2) {
  let events;
  (function(events2) {
    events2["dom"] = "dom";
    events2["load"] = "load";
    events2["noProvider"] = "no-provider";
    events2["gotProvider"] = "got-provider";
    events2["nostr"] = "nostr";
    events2["themeChange"] = "themeChange";
    events2["orientationChange"] = "orientationChange";
    events2["minWidth768Change"] = "minWidth768Change";
    events2["maxWidth320Change"] = "maxWidth320Change";
    events2["maxWidth420Change"] = "maxWidth420Change";
    events2["requestedProvider"] = "requestedProvider";
    events2["relaymessage"] = "relaymessage";
  })(events = App2.events || (App2.events = {}));
  App2.getThemeQuery = (window2) => checkMediaQuery(window2)("(prefers-color-scheme: dark)");
  App2.getOrientation = (window2) => checkMediaQuery(window2)("(orientation: landscape)");
  App2.getMinWith768 = (window2) => checkMediaQuery(window2)("(min-width: 768px)");
  App2.getMaxWidth320 = (window2) => checkMediaQuery(window2)("(max-width: 320px)");
  App2.getMaxWidth420 = (window2) => checkMediaQuery(window2)("(max-width: 420px)");

  class MediaQueryManager {
    window2;
    static THEME = "(prefers-color-scheme: dark)";
    static ORIENTATION = "(orientation: landscape)";
    static MIN_W = (amount) => `(min-width: ${amount}px)`;
    static MAX_W = (amount) => `(max-width: ${amount}px)`;
    constructor(window2) {
      this.window = window2;
    }
    #configure = (string) => {
      return this.window.matchMedia(string);
    };
    theme = this.#configure(MediaQueryManager.THEME);
    orientation = this.#configure(MediaQueryManager.ORIENTATION);
    minWidth768 = this.#configure(MediaQueryManager.MIN_W(768));
    maxWidth320 = this.#configure(MediaQueryManager.MAX_W(320));
    maxWidth420 = this.#configure(MediaQueryManager.MAX_W(420));
  }
  const checkMediaQuery = (window2) => (string) => window2.matchMedia(string);
  let WebLN;
  (function(WebLN2) {
    WebLN2.isWebLN = (window2) => window2.WebLN ? true : false;
  })(WebLN = App2.WebLN || (App2.WebLN = {}));
  App2.UserAgent = UserAgent;
  App2.tempoTrascorso = tempoTrascorso;
})(App || (App = {}));

class UIDesign {
  #element;
  uiNode;
  constructor(prop) {
    this.value = prop;
    this.#element = document.createElement(this.value.tag);
    this.#element.id = this.value.id ? this.value.id : UIDesign.generateId();
    this.#element.className = this.value.className;
    this.uiNode = new UINode(this.#element);
    this.path = this.#element.id;
    UIDesign.nodeslist.push(this);
  }
  addChild(value) {
    value.path = `${this.path}/${value.path}`;
    if (!this.children)
      this.children = [];
    this.children.push(value);
    return this;
  }
  setInnerText(text) {
    UIDesign.setInnerText(text)(this.element);
    return this;
  }
  setTextContent(text) {
    UIDesign.setInnerText(text)(this.element);
    return this;
  }
  setEventListener(event, cb) {
    UIDesign.setEventListener(event, cb)(this.element);
    return this;
  }
  setHtmlAttribute(attribute, value) {
    UIDesign.setHtmlAttribute(attribute)(value)(this.element);
    return this;
  }
  setClassName(className) {
    UIDesign.setClassName(className)(this.element);
  }
  get element() {
    const cb = (newNode) => (node) => {
      const stack = [node];
      const rootnode = newNode;
      while (stack.length) {
        const current = stack.pop();
        if (current) {
          const children = current.children;
          if (children) {
            children.forEach((c) => {
              current.uiNode.addChild(c.uiNode);
              stack.push(c);
            });
          }
        }
      }
      return rootnode;
    };
    return UINode.build(cb(this.uiNode)(this));
  }
  getChildrenElements() {
    if (this.uiNode.children) {
      const children = this.uiNode.children.map((e) => e.value);
      if (children.length === 1)
        this.uiNode.children.map((e) => e.value)[0];
      else
        return this.uiNode.children.map((e) => e.value);
    } else
      return;
  }
}
(function(UIDesign2) {
  UIDesign2.nodeslist = [];
  UIDesign2.generateId = () => `9x${(BigInt(Math.round(Math.random() * 10000000000000000)) * BigInt(Math.round(Math.random() * 10000000000000000))).toString(16).slice(0, 16)}`;
  UIDesign2.setInnerText = (text) => (e) => {
    e.innerText = text;
    return e;
  };
  UIDesign2.setTextContent = (text) => (e) => {
    e.textContent = text;
  };
  UIDesign2.setEventListener = (event, cb) => (e) => {
    e.addEventListener(event, cb);
  };
  UIDesign2.setHtmlAttribute = (attribute) => (value) => (el) => {
    el.setAttribute(attribute, value);
    return el;
  };
  UIDesign2.setStyleAttribute = (attribute) => (value) => (e) => {
    e.style[attribute] = value;
    return e;
  };
  UIDesign2.setClassName = (className) => (e) => {
    e.className = className;
    return e;
  };
  UIDesign2.debug = (color) => (isDebug) => (el) => {
    if (isDebug)
      UIDesign2.setStyleAttribute("backgroundColor")(color)(el);
  };
})(UIDesign || (UIDesign = {}));

class UINode {
  value;
  constructor(value) {
    this.value = value;
    this.children = undefined;
  }
  addChild(value) {
    if (!this.children)
      this.children = [];
    this.children.push(value);
    return this;
  }
}
(function(UINode2) {
  UINode2.dfs = (cb) => (node) => {
    let stack = [node];
    let res = [];
    while (stack.length) {
      const current = stack.pop();
      res.push(current);
      if (current) {
        const children = current.children;
        if (children)
          cb(children, current, stack);
      }
    }
    return node.value;
  };
  UINode2.build = UINode2.dfs((children, current, stack) => {
    children.forEach((c) => {
      current.value.appendChild(c.value);
      stack.push(c);
    });
  });
})(UINode || (UINode = {}));
var Dom;
(function(Dom2) {
  let css_attributes_codes;
  (function(css_attributes_codes2) {
    css_attributes_codes2["position"] = "pos";
    css_attributes_codes2["width"] = "w";
    css_attributes_codes2["height"] = "h";
    css_attributes_codes2["max_height"] = "mh";
    css_attributes_codes2["calculated_height"] = "ch";
    css_attributes_codes2["overflow"] = "of";
    css_attributes_codes2["padding"] = "p";
    css_attributes_codes2["padding_top"] = "pt";
    css_attributes_codes2["padding_right"] = "pr";
    css_attributes_codes2["padding_bottom"] = "pb";
    css_attributes_codes2["padding_left"] = "pl";
    css_attributes_codes2["margin"] = "m";
    css_attributes_codes2["margin_top"] = "mt";
    css_attributes_codes2["margin_right"] = "mr";
    css_attributes_codes2["margin_bottom"] = "mb";
    css_attributes_codes2["margin_left"] = "ml";
    css_attributes_codes2["border"] = "b";
    css_attributes_codes2["border_top"] = "bt";
    css_attributes_codes2["border_right"] = "br";
    css_attributes_codes2["border_bottom"] = "bb";
    css_attributes_codes2["border_left"] = "bl";
    css_attributes_codes2["border_radius"] = "brad";
    css_attributes_codes2["box_sizing"] = "box";
    css_attributes_codes2["align_items"] = "ai";
    css_attributes_codes2["align_self"] = "as";
    css_attributes_codes2["justify_content"] = "jc";
    css_attributes_codes2["justify_self"] = "js";
    css_attributes_codes2["object_fit"] = "of";
    css_attributes_codes2["font_weight"] = "fw";
    css_attributes_codes2["background"] = "back";
    css_attributes_codes2["outline"] = "ol";
  })(css_attributes_codes = Dom2.css_attributes_codes || (Dom2.css_attributes_codes = {}));
})(Dom || (Dom = {}));
var parse = function(str) {
  var tokens = [];
  var key = 0;
  var index = 0;
  var path = "";
  var res;
  while ((res = PATH_REGEXP.exec(str)) != null) {
    var m = res[0];
    var escaped = res[1];
    var offset = res.index;
    path += str.slice(index, offset);
    index = offset + m.length;
    if (escaped) {
      path += escaped[1];
      continue;
    }
    if (path) {
      tokens.push(path);
      path = "";
    }
    var prefix = res[2];
    var name = res[3];
    var capture = res[4];
    var group = res[5];
    var suffix = res[6];
    var asterisk = res[7];
    var repeat = suffix === "+" || suffix === "*";
    var optional = suffix === "?" || suffix === "*";
    var delimiter = prefix || "/";
    var pattern = capture || group || (asterisk ? ".*" : "[^" + delimiter + "]+?");
    tokens.push({
      name: name || key++,
      prefix: prefix || "",
      delimiter,
      optional,
      repeat,
      pattern: escapeGroup(pattern)
    });
  }
  if (index < str.length) {
    path += str.substr(index);
  }
  if (path) {
    tokens.push(path);
  }
  return tokens;
};
var compile = function(str) {
  return tokensToFunction(parse(str));
};
var tokensToFunction = function(tokens) {
  var matches = new Array(tokens.length);
  for (var i = 0;i < tokens.length; i++) {
    if (typeof tokens[i] === "object") {
      matches[i] = new RegExp("^" + tokens[i].pattern + "$");
    }
  }
  return function(obj) {
    var path = "";
    var data = obj || {};
    for (var i2 = 0;i2 < tokens.length; i2++) {
      var token = tokens[i2];
      if (typeof token === "string") {
        path += token;
        continue;
      }
      var value = data[token.name];
      var segment;
      if (value == null) {
        if (token.optional) {
          continue;
        } else {
          throw new TypeError('Expected "' + token.name + '" to be defined');
        }
      }
      if (isarray(value)) {
        if (!token.repeat) {
          throw new TypeError('Expected "' + token.name + '" to not repeat, but received "' + value + '"');
        }
        if (value.length === 0) {
          if (token.optional) {
            continue;
          } else {
            throw new TypeError('Expected "' + token.name + '" to not be empty');
          }
        }
        for (var j = 0;j < value.length; j++) {
          segment = encodeURIComponent(value[j]);
          if (!matches[i2].test(segment)) {
            throw new TypeError('Expected all "' + token.name + '" to match "' + token.pattern + '", but received "' + segment + '"');
          }
          path += (j === 0 ? token.prefix : token.delimiter) + segment;
        }
        continue;
      }
      segment = encodeURIComponent(value);
      if (!matches[i2].test(segment)) {
        throw new TypeError('Expected "' + token.name + '" to match "' + token.pattern + '", but received "' + segment + '"');
      }
      path += token.prefix + segment;
    }
    return path;
  };
};
var escapeString = function(str) {
  return str.replace(/([.+*?=^!:${}()[\]|\/])/g, "\\$1");
};
var escapeGroup = function(group) {
  return group.replace(/([=!:$\/()])/g, "\\$1");
};
var attachKeys = function(re, keys) {
  re.keys = keys;
  return re;
};
var flags = function(options) {
  return options.sensitive ? "" : "i";
};
var regexpToRegexp = function(path, keys) {
  var groups = path.source.match(/\((?!\?)/g);
  if (groups) {
    for (var i = 0;i < groups.length; i++) {
      keys.push({
        name: i,
        prefix: null,
        delimiter: null,
        optional: false,
        repeat: false,
        pattern: null
      });
    }
  }
  return attachKeys(path, keys);
};
var arrayToRegexp = function(path, keys, options) {
  var parts = [];
  for (var i = 0;i < path.length; i++) {
    parts.push(pathToRegexp(path[i], keys, options).source);
  }
  var regexp = new RegExp("(?:" + parts.join("|") + ")", flags(options));
  return attachKeys(regexp, keys);
};
var stringToRegexp = function(path, keys, options) {
  var tokens = parse(path);
  var re = tokensToRegExp(tokens, options);
  for (var i = 0;i < tokens.length; i++) {
    if (typeof tokens[i] !== "string") {
      keys.push(tokens[i]);
    }
  }
  return attachKeys(re, keys);
};
var tokensToRegExp = function(tokens, options) {
  options = options || {};
  var strict = options.strict;
  var end = options.end !== false;
  var route = "";
  var lastToken = tokens[tokens.length - 1];
  var endsWithSlash = typeof lastToken === "string" && /\/$/.test(lastToken);
  for (var i = 0;i < tokens.length; i++) {
    var token = tokens[i];
    if (typeof token === "string") {
      route += escapeString(token);
    } else {
      var prefix = escapeString(token.prefix);
      var capture = token.pattern;
      if (token.repeat) {
        capture += "(?:" + prefix + capture + ")*";
      }
      if (token.optional) {
        if (prefix) {
          capture = "(?:" + prefix + "(" + capture + "))?";
        } else {
          capture = "(" + capture + ")?";
        }
      } else {
        capture = prefix + "(" + capture + ")";
      }
      route += capture;
    }
  }
  if (!strict) {
    route = (endsWithSlash ? route.slice(0, -2) : route) + "(?:\\/(?=$))?";
  }
  if (end) {
    route += "$";
  } else {
    route += strict && endsWithSlash ? "" : "(?=\\/|$)";
  }
  return new RegExp("^" + route, flags(options));
};
var pathToRegexp = function(path, keys, options) {
  keys = keys || [];
  if (!isarray(keys)) {
    options = keys;
    keys = [];
  } else if (!options) {
    options = {};
  }
  if (path instanceof RegExp) {
    return regexpToRegexp(path, keys, options);
  }
  if (isarray(path)) {
    return arrayToRegexp(path, keys, options);
  }
  return stringToRegexp(path, keys, options);
};
var Page = function() {
  this.callbacks = [];
  this.exits = [];
  this.current = "";
  this.len = 0;
  this._decodeURLComponents = true;
  this._base = "";
  this._strict = false;
  this._running = false;
  this._hashbang = false;
  this.clickHandler = this.clickHandler.bind(this);
  this._onpopstate = this._onpopstate.bind(this);
};
var createPage = function() {
  var pageInstance = new Page;
  function pageFn() {
    return page.apply(pageInstance, arguments);
  }
  pageFn.callbacks = pageInstance.callbacks;
  pageFn.exits = pageInstance.exits;
  pageFn.base = pageInstance.base.bind(pageInstance);
  pageFn.strict = pageInstance.strict.bind(pageInstance);
  pageFn.start = pageInstance.start.bind(pageInstance);
  pageFn.stop = pageInstance.stop.bind(pageInstance);
  pageFn.show = pageInstance.show.bind(pageInstance);
  pageFn.back = pageInstance.back.bind(pageInstance);
  pageFn.redirect = pageInstance.redirect.bind(pageInstance);
  pageFn.replace = pageInstance.replace.bind(pageInstance);
  pageFn.dispatch = pageInstance.dispatch.bind(pageInstance);
  pageFn.exit = pageInstance.exit.bind(pageInstance);
  pageFn.configure = pageInstance.configure.bind(pageInstance);
  pageFn.sameOrigin = pageInstance.sameOrigin.bind(pageInstance);
  pageFn.clickHandler = pageInstance.clickHandler.bind(pageInstance);
  pageFn.create = createPage;
  Object.defineProperty(pageFn, "len", {
    get: function() {
      return pageInstance.len;
    },
    set: function(val) {
      pageInstance.len = val;
    }
  });
  Object.defineProperty(pageFn, "current", {
    get: function() {
      return pageInstance.current;
    },
    set: function(val) {
      pageInstance.current = val;
    }
  });
  pageFn.Context = Context;
  pageFn.Route = Route;
  return pageFn;
};
var page = function(path, fn) {
  if (typeof path === "function") {
    return page.call(this, "*", path);
  }
  if (typeof fn === "function") {
    var route = new Route(path, null, this);
    for (var i = 1;i < arguments.length; ++i) {
      this.callbacks.push(route.middleware(arguments[i]));
    }
  } else if (typeof path === "string") {
    this[typeof fn === "string" ? "redirect" : "show"](path, fn);
  } else {
    this.start(path);
  }
};
var unhandled = function(ctx) {
  if (ctx.handled)
    return;
  var current;
  var page2 = this;
  var window2 = page2._window;
  if (page2._hashbang) {
    current = isLocation && this._getBase() + window2.location.hash.replace("#!", "");
  } else {
    current = isLocation && window2.location.pathname + window2.location.search;
  }
  if (current === ctx.canonicalPath)
    return;
  page2.stop();
  ctx.handled = false;
  isLocation && (window2.location.href = ctx.canonicalPath);
};
var escapeRegExp = function(s) {
  return s.replace(/([.+*?=^!:${}()[\]|/\\])/g, "\\$1");
};
var Context = function(path, state, pageInstance) {
  var _page = this.page = pageInstance || page;
  var window2 = _page._window;
  var hashbang = _page._hashbang;
  var pageBase = _page._getBase();
  if (path[0] === "/" && path.indexOf(pageBase) !== 0)
    path = pageBase + (hashbang ? "#!" : "") + path;
  var i = path.indexOf("?");
  this.canonicalPath = path;
  var re = new RegExp("^" + escapeRegExp(pageBase));
  this.path = path.replace(re, "") || "/";
  if (hashbang)
    this.path = this.path.replace("#!", "") || "/";
  this.title = hasDocument && window2.document.title;
  this.state = state || {};
  this.state.path = path;
  this.querystring = ~i ? _page._decodeURLEncodedURIComponent(path.slice(i + 1)) : "";
  this.pathname = _page._decodeURLEncodedURIComponent(~i ? path.slice(0, i) : path);
  this.params = {};
  this.hash = "";
  if (!hashbang) {
    if (!~this.path.indexOf("#"))
      return;
    var parts = this.path.split("#");
    this.path = this.pathname = parts[0];
    this.hash = _page._decodeURLEncodedURIComponent(parts[1]) || "";
    this.querystring = this.querystring.split("#")[0];
  }
};
var Route = function(path, options, page2) {
  var _page = this.page = page2 || globalPage;
  var opts = options || {};
  opts.strict = opts.strict || _page._strict;
  this.path = path === "*" ? "(.*)" : path;
  this.method = "GET";
  this.regexp = pathToRegexp_1(this.path, this.keys = [], opts);
};
var isarray = Array.isArray || function(arr) {
  return Object.prototype.toString.call(arr) == "[object Array]";
};
var pathToRegexp_1 = pathToRegexp;
var parse_1 = parse;
var compile_1 = compile;
var tokensToFunction_1 = tokensToFunction;
var tokensToRegExp_1 = tokensToRegExp;
var PATH_REGEXP = new RegExp([
  "(\\\\.)",
  "([\\/.])?(?:(?:\\:(\\w+)(?:\\(((?:\\\\.|[^()])+)\\))?|\\(((?:\\\\.|[^()])+)\\))([+*?])?|(\\*))"
].join("|"), "g");
pathToRegexp_1.parse = parse_1;
pathToRegexp_1.compile = compile_1;
pathToRegexp_1.tokensToFunction = tokensToFunction_1;
pathToRegexp_1.tokensToRegExp = tokensToRegExp_1;
var hasDocument = typeof document !== "undefined";
var hasWindow = typeof window !== "undefined";
var hasHistory = typeof history !== "undefined";
var hasProcess = typeof process !== "undefined";
var clickEvent = hasDocument && document.ontouchstart ? "touchstart" : "click";
var isLocation = hasWindow && !!(window.history.location || window.location);
Page.prototype.configure = function(options) {
  var opts = options || {};
  this._window = opts.window || hasWindow && window;
  this._decodeURLComponents = opts.decodeURLComponents !== false;
  this._popstate = opts.popstate !== false && hasWindow;
  this._click = opts.click !== false && hasDocument;
  this._hashbang = !!opts.hashbang;
  var _window = this._window;
  if (this._popstate) {
    _window.addEventListener("popstate", this._onpopstate, false);
  } else if (hasWindow) {
    _window.removeEventListener("popstate", this._onpopstate, false);
  }
  if (this._click) {
    _window.document.addEventListener(clickEvent, this.clickHandler, false);
  } else if (hasDocument) {
    _window.document.removeEventListener(clickEvent, this.clickHandler, false);
  }
  if (this._hashbang && hasWindow && !hasHistory) {
    _window.addEventListener("hashchange", this._onpopstate, false);
  } else if (hasWindow) {
    _window.removeEventListener("hashchange", this._onpopstate, false);
  }
};
Page.prototype.base = function(path) {
  if (arguments.length === 0)
    return this._base;
  this._base = path;
};
Page.prototype._getBase = function() {
  var base = this._base;
  if (!!base)
    return base;
  var loc = hasWindow && this._window && this._window.location;
  if (hasWindow && this._hashbang && loc && loc.protocol === "file:") {
    base = loc.pathname;
  }
  return base;
};
Page.prototype.strict = function(enable) {
  if (arguments.length === 0)
    return this._strict;
  this._strict = enable;
};
Page.prototype.start = function(options) {
  var opts = options || {};
  this.configure(opts);
  if (opts.dispatch === false)
    return;
  this._running = true;
  var url;
  if (isLocation) {
    var window2 = this._window;
    var loc = window2.location;
    if (this._hashbang && ~loc.hash.indexOf("#!")) {
      url = loc.hash.substr(2) + loc.search;
    } else if (this._hashbang) {
      url = loc.search + loc.hash;
    } else {
      url = loc.pathname + loc.search + loc.hash;
    }
  }
  this.replace(url, null, true, opts.dispatch);
};
Page.prototype.stop = function() {
  if (!this._running)
    return;
  this.current = "";
  this.len = 0;
  this._running = false;
  var window2 = this._window;
  this._click && window2.document.removeEventListener(clickEvent, this.clickHandler, false);
  hasWindow && window2.removeEventListener("popstate", this._onpopstate, false);
  hasWindow && window2.removeEventListener("hashchange", this._onpopstate, false);
};
Page.prototype.show = function(path, state, dispatch, push) {
  var ctx = new Context(path, state, this), prev = this.prevContext;
  this.prevContext = ctx;
  this.current = ctx.path;
  if (dispatch !== false)
    this.dispatch(ctx, prev);
  if (ctx.handled !== false && push !== false)
    ctx.pushState();
  return ctx;
};
Page.prototype.back = function(path, state) {
  var page2 = this;
  if (this.len > 0) {
    var window2 = this._window;
    hasHistory && window2.history.back();
    this.len--;
  } else if (path) {
    setTimeout(function() {
      page2.show(path, state);
    });
  } else {
    setTimeout(function() {
      page2.show(page2._getBase(), state);
    });
  }
};
Page.prototype.redirect = function(from, to) {
  var inst = this;
  if (typeof from === "string" && typeof to === "string") {
    page.call(this, from, function(e) {
      setTimeout(function() {
        inst.replace(to);
      }, 0);
    });
  }
  if (typeof from === "string" && typeof to === "undefined") {
    setTimeout(function() {
      inst.replace(from);
    }, 0);
  }
};
Page.prototype.replace = function(path, state, init, dispatch) {
  var ctx = new Context(path, state, this), prev = this.prevContext;
  this.prevContext = ctx;
  this.current = ctx.path;
  ctx.init = init;
  ctx.save();
  if (dispatch !== false)
    this.dispatch(ctx, prev);
  return ctx;
};
Page.prototype.dispatch = function(ctx, prev) {
  var i = 0, j = 0, page2 = this;
  function nextExit() {
    var fn = page2.exits[j++];
    if (!fn)
      return nextEnter();
    fn(prev, nextExit);
  }
  function nextEnter() {
    var fn = page2.callbacks[i++];
    if (ctx.path !== page2.current) {
      ctx.handled = false;
      return;
    }
    if (!fn)
      return unhandled.call(page2, ctx);
    fn(ctx, nextEnter);
  }
  if (prev) {
    nextExit();
  } else {
    nextEnter();
  }
};
Page.prototype.exit = function(path, fn) {
  if (typeof path === "function") {
    return this.exit("*", path);
  }
  var route = new Route(path, null, this);
  for (var i = 1;i < arguments.length; ++i) {
    this.exits.push(route.middleware(arguments[i]));
  }
};
Page.prototype.clickHandler = function(e) {
  if (this._which(e) !== 1)
    return;
  if (e.metaKey || e.ctrlKey || e.shiftKey)
    return;
  if (e.defaultPrevented)
    return;
  var el = e.target;
  var eventPath = e.path || (e.composedPath ? e.composedPath() : null);
  if (eventPath) {
    for (var i = 0;i < eventPath.length; i++) {
      if (!eventPath[i].nodeName)
        continue;
      if (eventPath[i].nodeName.toUpperCase() !== "A")
        continue;
      if (!eventPath[i].href)
        continue;
      el = eventPath[i];
      break;
    }
  }
  while (el && el.nodeName.toUpperCase() !== "A")
    el = el.parentNode;
  if (!el || el.nodeName.toUpperCase() !== "A")
    return;
  var svg = typeof el.href === "object" && el.href.constructor.name === "SVGAnimatedString";
  if (el.hasAttribute("download") || el.getAttribute("rel") === "external")
    return;
  var link = el.getAttribute("href");
  if (!this._hashbang && this._samePath(el) && (el.hash || link === "#"))
    return;
  if (link && link.indexOf("mailto:") > -1)
    return;
  if (svg ? el.target.baseVal : el.target)
    return;
  if (!svg && !this.sameOrigin(el.href))
    return;
  var path = svg ? el.href.baseVal : el.pathname + el.search + (el.hash || "");
  path = path[0] !== "/" ? "/" + path : path;
  if (hasProcess && path.match(/^\/[a-zA-Z]:\//)) {
    path = path.replace(/^\/[a-zA-Z]:\//, "/");
  }
  var orig = path;
  var pageBase = this._getBase();
  if (path.indexOf(pageBase) === 0) {
    path = path.substr(pageBase.length);
  }
  if (this._hashbang)
    path = path.replace("#!", "");
  if (pageBase && orig === path && (!isLocation || this._window.location.protocol !== "file:")) {
    return;
  }
  e.preventDefault();
  this.show(orig);
};
Page.prototype._onpopstate = function() {
  var loaded = false;
  if (!hasWindow) {
    return function() {
    };
  }
  if (hasDocument && document.readyState === "complete") {
    loaded = true;
  } else {
    window.addEventListener("load", function() {
      setTimeout(function() {
        loaded = true;
      }, 0);
    });
  }
  return function onpopstate(e) {
    if (!loaded)
      return;
    var page2 = this;
    if (e.state) {
      var path = e.state.path;
      page2.replace(path, e.state);
    } else if (isLocation) {
      var loc = page2._window.location;
      page2.show(loc.pathname + loc.search + loc.hash, undefined, undefined, false);
    }
  };
}();
Page.prototype._which = function(e) {
  e = e || hasWindow && this._window.event;
  return e.which == null ? e.button : e.which;
};
Page.prototype._toURL = function(href) {
  var window2 = this._window;
  if (typeof URL === "function" && isLocation) {
    return new URL(href, window2.location.toString());
  } else if (hasDocument) {
    var anc = window2.document.createElement("a");
    anc.href = href;
    return anc;
  }
};
Page.prototype.sameOrigin = function(href) {
  if (!href || !isLocation)
    return false;
  var url = this._toURL(href);
  var window2 = this._window;
  var loc = window2.location;
  return loc.protocol === url.protocol && loc.hostname === url.hostname && (loc.port === url.port || loc.port === "" && (url.port == 80 || url.port == 443));
};
Page.prototype._samePath = function(url) {
  if (!isLocation)
    return false;
  var window2 = this._window;
  var loc = window2.location;
  return url.pathname === loc.pathname && url.search === loc.search;
};
Page.prototype._decodeURLEncodedURIComponent = function(val) {
  if (typeof val !== "string") {
    return val;
  }
  return this._decodeURLComponents ? decodeURIComponent(val.replace(/\+/g, " ")) : val;
};
Context.prototype.pushState = function() {
  var page2 = this.page;
  var window2 = page2._window;
  var hashbang = page2._hashbang;
  page2.len++;
  if (hasHistory) {
    window2.history.pushState(this.state, this.title, hashbang && this.path !== "/" ? "#!" + this.path : this.canonicalPath);
  }
};
Context.prototype.save = function() {
  var page2 = this.page;
  if (hasHistory) {
    page2._window.history.replaceState(this.state, this.title, page2._hashbang && this.path !== "/" ? "#!" + this.path : this.canonicalPath);
  }
};
Route.prototype.middleware = function(fn) {
  var self = this;
  return function(ctx, next) {
    if (self.match(ctx.path, ctx.params)) {
      ctx.routePath = self.path;
      return fn(ctx, next);
    }
    next();
  };
};
Route.prototype.match = function(path, params) {
  var keys = this.keys, qsIndex = path.indexOf("?"), pathname = ~qsIndex ? path.slice(0, qsIndex) : path, m = this.regexp.exec(decodeURIComponent(pathname));
  if (!m)
    return false;
  delete params[0];
  for (var i = 1, len = m.length;i < len; ++i) {
    var key = keys[i - 1];
    var val = this.page._decodeURLEncodedURIComponent(m[i]);
    if (val !== undefined || !hasOwnProperty.call(params, key.name)) {
      params[key.name] = val;
    }
  }
  return true;
};
var globalPage = createPage();
var page_js = globalPage;
var default_1 = globalPage;
page_js.default = default_1;
var page_default = page_js;
var stringToJsHtmlConfigurator = (parser) => (string) => {
  const element = parser.parseFromString(string, "text/html");
  return element.body.childNodes;
};
var updateElementConfigurator = (parser, attach, deleteContent, stringToJsHtmlConfigurator2, baseElementId = "content") => (htmlstring) => {
  const content = document.getElementById(baseElementId);
  deleteContent(content);
  const nodes = stringToJsHtmlConfigurator2(parser)(htmlstring);
  attach(content, nodes);
};
var attach = (element, nodes) => {
  nodes.forEach((n) => element.appendChild(n));
};
var deleteContent = async (content) => {
  if (content.firstChild) {
    while (content.firstChild) {
      content.removeChild(content.firstChild);
    }
  }
  return true;
};

class Pager {
  constructor(options) {
    this.parser = options.parser;
    this.stringToJsHtml = stringToJsHtmlConfigurator(this.parser);
    this.updateElement = updateElementConfigurator(this.parser, attach, deleteContent, stringToJsHtmlConfigurator, options.baseElementId);
  }
  route(route, callback) {
    page_default(route, callback);
    return this;
  }
  resolve() {
    page_default();
  }
  callbackMaker(htmlContent) {
    return () => {
      this.updateElement(htmlContent);
    };
  }
}

// src/index.js
var import_page = __toESM(require_page(), 1);
async function load(ctx, next) {
  console.log(ctx);
  const container = document.getElementById("container");
  console.log(container);
  const res = await fetch(`assets/giacomo/${ctx.params.filename}`);
  const text = await res.text();
  container.innerHTML;
  if (container.firstChild) {
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
  }
  container.innerHTML = text;
}
console.log("gagliano kick asses");
console.log("bumbalacaca");
var pager = new Pager({ parser: new DOMParser });
var indexhtml = `
<div id="container">
  <h1>Gagliano Family =)</h1>
  <h3>we are</h3>
  <a href="./giacomo">Giacomo</a>
  <a href="./arianna">Arianna</a>
  <a href="./noa">Noa Josephine</a>
  <a href="./mia">Mia Jacqueline</a>
  <a href="./era">Era Jasmine</a>
  <a href="./blog">Blogs</a>
</div>
`;
var giacomohtml = `
<div id="container">
  <a id="back" href="./">back</a>
  <p>my Name is Giacomo, here you can find some of the cool stuff I do.</p>
  <p>
    I am working with my team,of which
    <a href="./arianna">arianna</a> on a cool project that we called
    Zaion Network
  </p>
</div>
`;
var arihtml = `
<div id="container">
  <a id="back" href="./">back</a>
  <p>my Name is Arianna, here you can find some of the cool stuff I do.</p>
  <p>
    I am working with my team,of which
    <a href="./giacomo">giacomo</a> on a cool project that we called
    Zaion Network
  </p>
</div>
`;
var noahtml = ``;
var miahtml = ``;
var erahtml = ``;
var blogHtml = `
<div id="container"></div>
`;
var index = pager.callbackMaker(indexhtml);
var giacomo = pager.callbackMaker(giacomohtml);
var ari = pager.callbackMaker(arihtml);
var noa = pager.callbackMaker(noahtml);
var mia = pager.callbackMaker(miahtml);
var era = pager.callbackMaker(erahtml);
var blog = async () => {
  const res = await fetch("/blogs");
  const text = await res.text();
  const json = JSON.parse(text);
  pager.callbackMaker(blogHtml)();
  const container = document.getElementById("container");
  const commonclass = "flex fd_column w_maxc ps_c p_1rem";
  const giacomoContainer = new UIDesign({
    tag: "div",
    id: "giacomo-container",
    className: commonclass
  });
  const ariContainer = new UIDesign({
    tag: "div",
    id: "ari-container",
    className: commonclass
  });
  const giacomotitle = new UIDesign({ tag: "h3", id: "giacomo-title" });
  const arititle = new UIDesign({ tag: "h3", id: "ari-title" });
  giacomotitle.setInnerText("Giacomo");
  arititle.setInnerText("Arianna");
  giacomoContainer.addChild(giacomotitle);
  ariContainer.addChild(arititle);
  const createA = (id) => {
    const a = new UIDesign({ tag: "a", id });
    a.setInnerText(id);
    a.setHtmlAttribute("href", `./blog/${id}`);
    return a;
  };
  const giacomoBlogs = json.giacomo.map((e) => createA(e));
  const ariBlogs = json.arianna.map((e) => createA(e));
  giacomoBlogs.forEach((ui2) => giacomoContainer.addChild(ui2));
  ariBlogs.forEach((ui2) => ariContainer.addChild(ui2));
  container.appendChild(giacomoContainer.element);
  container.appendChild(ariContainer.element);
  container.id = "flex container";
  container.className = "flex pc_c ta_c w_100vw h_100vh";
  console.log(giacomoBlogs);
};
import_page.default("/", index);
import_page.default("/giacomo", giacomo);
import_page.default("/arianna", ari);
import_page.default("/noa", noa);
import_page.default("/mia", mia);
import_page.default("/era", era);
import_page.default("/blog", blog);
import_page.default("/blog/:filename", load);
import_page.default();
