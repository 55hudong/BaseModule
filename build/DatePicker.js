(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["DatePicker"] = factory();
	else
		root["DatePicker"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/build/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

/* Zepto v1.1.6 - zepto event ajax form ie - zeptojs.com/license */

var Zepto = module.exports = (function() {
  var undefined, key, $, classList, emptyArray = [], slice = emptyArray.slice, filter = emptyArray.filter,
    document = window.document,
    elementDisplay = {}, classCache = {},
    cssNumber = { 'column-count': 1, 'columns': 1, 'font-weight': 1, 'line-height': 1,'opacity': 1, 'z-index': 1, 'zoom': 1 },
    fragmentRE = /^\s*<(\w+|!)[^>]*>/,
    singleTagRE = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
    tagExpanderRE = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/ig,
    rootNodeRE = /^(?:body|html)$/i,
    capitalRE = /([A-Z])/g,

    // special attributes that should be get/set via method calls
    methodAttributes = ['val', 'css', 'html', 'text', 'data', 'width', 'height', 'offset'],

    adjacencyOperators = [ 'after', 'prepend', 'before', 'append' ],
    table = document.createElement('table'),
    tableRow = document.createElement('tr'),
    containers = {
      'tr': document.createElement('tbody'),
      'tbody': table, 'thead': table, 'tfoot': table,
      'td': tableRow, 'th': tableRow,
      '*': document.createElement('div')
    },
    readyRE = /complete|loaded|interactive/,
    simpleSelectorRE = /^[\w-]*$/,
    class2type = {},
    toString = class2type.toString,
    zepto = {},
    camelize, uniq,
    tempParent = document.createElement('div'),
    propMap = {
      'tabindex': 'tabIndex',
      'readonly': 'readOnly',
      'for': 'htmlFor',
      'class': 'className',
      'maxlength': 'maxLength',
      'cellspacing': 'cellSpacing',
      'cellpadding': 'cellPadding',
      'rowspan': 'rowSpan',
      'colspan': 'colSpan',
      'usemap': 'useMap',
      'frameborder': 'frameBorder',
      'contenteditable': 'contentEditable'
    },
    isArray = Array.isArray ||
      function(object){ return object instanceof Array }

  zepto.matches = function(element, selector) {
    if (!selector || !element || element.nodeType !== 1) return false
    var matchesSelector = element.webkitMatchesSelector || element.mozMatchesSelector ||
                          element.oMatchesSelector || element.matchesSelector
    if (matchesSelector) return matchesSelector.call(element, selector)
    // fall back to performing a selector:
    var match, parent = element.parentNode, temp = !parent
    if (temp) (parent = tempParent).appendChild(element)
    match = ~zepto.qsa(parent, selector).indexOf(element)
    temp && tempParent.removeChild(element)
    return match
  }

  function type(obj) {
    return obj == null ? String(obj) :
      class2type[toString.call(obj)] || "object"
  }

  function isFunction(value) { return type(value) == "function" }
  function isWindow(obj)     { return obj != null && obj == obj.window }
  function isDocument(obj)   { return obj != null && obj.nodeType == obj.DOCUMENT_NODE }
  function isObject(obj)     { return type(obj) == "object" }
  function isPlainObject(obj) {
    return isObject(obj) && !isWindow(obj) && Object.getPrototypeOf(obj) == Object.prototype
  }
  function likeArray(obj) { return typeof obj.length == 'number' }

  function compact(array) { return filter.call(array, function(item){ return item != null }) }
  function flatten(array) { return array.length > 0 ? $.fn.concat.apply([], array) : array }
  camelize = function(str){ return str.replace(/-+(.)?/g, function(match, chr){ return chr ? chr.toUpperCase() : '' }) }
  function dasherize(str) {
    return str.replace(/::/g, '/')
           .replace(/([A-Z]+)([A-Z][a-z])/g, '$1_$2')
           .replace(/([a-z\d])([A-Z])/g, '$1_$2')
           .replace(/_/g, '-')
           .toLowerCase()
  }
  uniq = function(array){ return filter.call(array, function(item, idx){ return array.indexOf(item) == idx }) }

  function classRE(name) {
    return name in classCache ?
      classCache[name] : (classCache[name] = new RegExp('(^|\\s)' + name + '(\\s|$)'))
  }

  function maybeAddPx(name, value) {
    return (typeof value == "number" && !cssNumber[dasherize(name)]) ? value + "px" : value
  }

  function defaultDisplay(nodeName) {
    var element, display
    if (!elementDisplay[nodeName]) {
      element = document.createElement(nodeName)
      document.body.appendChild(element)
      display = getComputedStyle(element, '').getPropertyValue("display")
      element.parentNode.removeChild(element)
      display == "none" && (display = "block")
      elementDisplay[nodeName] = display
    }
    return elementDisplay[nodeName]
  }

  function children(element) {
    return 'children' in element ?
      slice.call(element.children) :
      $.map(element.childNodes, function(node){ if (node.nodeType == 1) return node })
  }

  // `$.zepto.fragment` takes a html string and an optional tag name
  // to generate DOM nodes nodes from the given html string.
  // The generated DOM nodes are returned as an array.
  // This function can be overriden in plugins for example to make
  // it compatible with browsers that don't support the DOM fully.
  zepto.fragment = function(html, name, properties) {
    var dom, nodes, container

    // A special case optimization for a single tag
    if (singleTagRE.test(html)) dom = $(document.createElement(RegExp.$1))

    if (!dom) {
      if (html.replace) html = html.replace(tagExpanderRE, "<$1></$2>")
      if (name === undefined) name = fragmentRE.test(html) && RegExp.$1
      if (!(name in containers)) name = '*'

      container = containers[name]
      container.innerHTML = '' + html
      dom = $.each(slice.call(container.childNodes), function(){
        container.removeChild(this)
      })
    }

    if (isPlainObject(properties)) {
      nodes = $(dom)
      $.each(properties, function(key, value) {
        if (methodAttributes.indexOf(key) > -1) nodes[key](value)
        else nodes.attr(key, value)
      })
    }

    return dom
  }

  // `$.zepto.Z` swaps out the prototype of the given `dom` array
  // of nodes with `$.fn` and thus supplying all the Zepto functions
  // to the array. Note that `__proto__` is not supported on Internet
  // Explorer. This method can be overriden in plugins.
  zepto.Z = function(dom, selector) {
    dom = dom || []
    dom.__proto__ = $.fn
    dom.selector = selector || ''
    return dom
  }

  // `$.zepto.isZ` should return `true` if the given object is a Zepto
  // collection. This method can be overriden in plugins.
  zepto.isZ = function(object) {
    return object instanceof zepto.Z
  }

  // `$.zepto.init` is Zepto's counterpart to jQuery's `$.fn.init` and
  // takes a CSS selector and an optional context (and handles various
  // special cases).
  // This method can be overriden in plugins.
  zepto.init = function(selector, context) {
    var dom
    // If nothing given, return an empty Zepto collection
    if (!selector) return zepto.Z()
    // Optimize for string selectors
    else if (typeof selector == 'string') {
      selector = selector.trim()
      // If it's a html fragment, create nodes from it
      // Note: In both Chrome 21 and Firefox 15, DOM error 12
      // is thrown if the fragment doesn't begin with <
      if (selector[0] == '<' && fragmentRE.test(selector))
        dom = zepto.fragment(selector, RegExp.$1, context), selector = null
      // If there's a context, create a collection on that context first, and select
      // nodes from there
      else if (context !== undefined) return $(context).find(selector)
      // If it's a CSS selector, use it to select nodes.
      else dom = zepto.qsa(document, selector)
    }
    // If a function is given, call it when the DOM is ready
    else if (isFunction(selector)) return $(document).ready(selector)
    // If a Zepto collection is given, just return it
    else if (zepto.isZ(selector)) return selector
    else {
      // normalize array if an array of nodes is given
      if (isArray(selector)) dom = compact(selector)
      // Wrap DOM nodes.
      else if (isObject(selector))
        dom = [selector], selector = null
      // If it's a html fragment, create nodes from it
      else if (fragmentRE.test(selector))
        dom = zepto.fragment(selector.trim(), RegExp.$1, context), selector = null
      // If there's a context, create a collection on that context first, and select
      // nodes from there
      else if (context !== undefined) return $(context).find(selector)
      // And last but no least, if it's a CSS selector, use it to select nodes.
      else dom = zepto.qsa(document, selector)
    }
    // create a new Zepto collection from the nodes found
    return zepto.Z(dom, selector)
  }

  // `$` will be the base `Zepto` object. When calling this
  // function just call `$.zepto.init, which makes the implementation
  // details of selecting nodes and creating Zepto collections
  // patchable in plugins.
  $ = function(selector, context){
    return zepto.init(selector, context)
  }

  function extend(target, source, deep) {
    for (key in source)
      if (deep && (isPlainObject(source[key]) || isArray(source[key]))) {
        if (isPlainObject(source[key]) && !isPlainObject(target[key]))
          target[key] = {}
        if (isArray(source[key]) && !isArray(target[key]))
          target[key] = []
        extend(target[key], source[key], deep)
      }
      else if (source[key] !== undefined) target[key] = source[key]
  }

  // Copy all but undefined properties from one or more
  // objects to the `target` object.
  $.extend = function(target){
    var deep, args = slice.call(arguments, 1)
    if (typeof target == 'boolean') {
      deep = target
      target = args.shift()
    }
    args.forEach(function(arg){ extend(target, arg, deep) })
    return target
  }

  // `$.zepto.qsa` is Zepto's CSS selector implementation which
  // uses `document.querySelectorAll` and optimizes for some special cases, like `#id`.
  // This method can be overriden in plugins.
  zepto.qsa = function(element, selector){
    var found,
        maybeID = selector[0] == '#',
        maybeClass = !maybeID && selector[0] == '.',
        nameOnly = maybeID || maybeClass ? selector.slice(1) : selector, // Ensure that a 1 char tag name still gets checked
        isSimple = simpleSelectorRE.test(nameOnly)
    return (isDocument(element) && isSimple && maybeID) ?
      ( (found = element.getElementById(nameOnly)) ? [found] : [] ) :
      (element.nodeType !== 1 && element.nodeType !== 9) ? [] :
      slice.call(
        isSimple && !maybeID ?
          maybeClass ? element.getElementsByClassName(nameOnly) : // If it's simple, it could be a class
          element.getElementsByTagName(selector) : // Or a tag
          element.querySelectorAll(selector) // Or it's not simple, and we need to query all
      )
  }

  function filtered(nodes, selector) {
    return selector == null ? $(nodes) : $(nodes).filter(selector)
  }

  $.contains = document.documentElement.contains ?
    function(parent, node) {
      return parent !== node && parent.contains(node)
    } :
    function(parent, node) {
      while (node && (node = node.parentNode))
        if (node === parent) return true
      return false
    }

  function funcArg(context, arg, idx, payload) {
    return isFunction(arg) ? arg.call(context, idx, payload) : arg
  }

  function setAttribute(node, name, value) {
    value == null ? node.removeAttribute(name) : node.setAttribute(name, value)
  }

  // access className property while respecting SVGAnimatedString
  function className(node, value){
    var klass = node.className || '',
        svg   = klass && klass.baseVal !== undefined

    if (value === undefined) return svg ? klass.baseVal : klass
    svg ? (klass.baseVal = value) : (node.className = value)
  }

  // "true"  => true
  // "false" => false
  // "null"  => null
  // "42"    => 42
  // "42.5"  => 42.5
  // "08"    => "08"
  // JSON    => parse if valid
  // String  => self
  function deserializeValue(value) {
    try {
      return value ?
        value == "true" ||
        ( value == "false" ? false :
          value == "null" ? null :
          +value + "" == value ? +value :
          /^[\[\{]/.test(value) ? $.parseJSON(value) :
          value )
        : value
    } catch(e) {
      return value
    }
  }

  $.type = type
  $.isFunction = isFunction
  $.isWindow = isWindow
  $.isArray = isArray
  $.isPlainObject = isPlainObject

  $.isEmptyObject = function(obj) {
    var name
    for (name in obj) return false
    return true
  }

  $.inArray = function(elem, array, i){
    return emptyArray.indexOf.call(array, elem, i)
  }

  $.camelCase = camelize
  $.trim = function(str) {
    return str == null ? "" : String.prototype.trim.call(str)
  }

  // plugin compatibility
  $.uuid = 0
  $.support = { }
  $.expr = { }

  $.map = function(elements, callback){
    var value, values = [], i, key
    if (likeArray(elements))
      for (i = 0; i < elements.length; i++) {
        value = callback(elements[i], i)
        if (value != null) values.push(value)
      }
    else
      for (key in elements) {
        value = callback(elements[key], key)
        if (value != null) values.push(value)
      }
    return flatten(values)
  }

  $.each = function(elements, callback){
    var i, key
    if (likeArray(elements)) {
      for (i = 0; i < elements.length; i++)
        if (callback.call(elements[i], i, elements[i]) === false) return elements
    } else {
      for (key in elements)
        if (callback.call(elements[key], key, elements[key]) === false) return elements
    }

    return elements
  }

  $.grep = function(elements, callback){
    return filter.call(elements, callback)
  }

  if (window.JSON) $.parseJSON = JSON.parse

  // Populate the class2type map
  $.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(i, name) {
    class2type[ "[object " + name + "]" ] = name.toLowerCase()
  })

  // Define methods that will be available on all
  // Zepto collections
  $.fn = {
    // Because a collection acts like an array
    // copy over these useful array functions.
    forEach: emptyArray.forEach,
    reduce: emptyArray.reduce,
    push: emptyArray.push,
    sort: emptyArray.sort,
    indexOf: emptyArray.indexOf,
    concat: emptyArray.concat,

    // `map` and `slice` in the jQuery API work differently
    // from their array counterparts
    map: function(fn){
      return $($.map(this, function(el, i){ return fn.call(el, i, el) }))
    },
    slice: function(){
      return $(slice.apply(this, arguments))
    },

    ready: function(callback){
      // need to check if document.body exists for IE as that browser reports
      // document ready when it hasn't yet created the body element
      if (readyRE.test(document.readyState) && document.body) callback($)
      else document.addEventListener('DOMContentLoaded', function(){ callback($) }, false)
      return this
    },
    get: function(idx){
      return idx === undefined ? slice.call(this) : this[idx >= 0 ? idx : idx + this.length]
    },
    toArray: function(){ return this.get() },
    size: function(){
      return this.length
    },
    remove: function(){
      return this.each(function(){
        if (this.parentNode != null)
          this.parentNode.removeChild(this)
      })
    },
    each: function(callback){
      emptyArray.every.call(this, function(el, idx){
        return callback.call(el, idx, el) !== false
      })
      return this
    },
    filter: function(selector){
      if (isFunction(selector)) return this.not(this.not(selector))
      return $(filter.call(this, function(element){
        return zepto.matches(element, selector)
      }))
    },
    add: function(selector,context){
      return $(uniq(this.concat($(selector,context))))
    },
    is: function(selector){
      return this.length > 0 && zepto.matches(this[0], selector)
    },
    not: function(selector){
      var nodes=[]
      if (isFunction(selector) && selector.call !== undefined)
        this.each(function(idx){
          if (!selector.call(this,idx)) nodes.push(this)
        })
      else {
        var excludes = typeof selector == 'string' ? this.filter(selector) :
          (likeArray(selector) && isFunction(selector.item)) ? slice.call(selector) : $(selector)
        this.forEach(function(el){
          if (excludes.indexOf(el) < 0) nodes.push(el)
        })
      }
      return $(nodes)
    },
    has: function(selector){
      return this.filter(function(){
        return isObject(selector) ?
          $.contains(this, selector) :
          $(this).find(selector).size()
      })
    },
    eq: function(idx){
      return idx === -1 ? this.slice(idx) : this.slice(idx, + idx + 1)
    },
    first: function(){
      var el = this[0]
      return el && !isObject(el) ? el : $(el)
    },
    last: function(){
      var el = this[this.length - 1]
      return el && !isObject(el) ? el : $(el)
    },
    find: function(selector){
      var result, $this = this
      if (!selector) result = $()
      else if (typeof selector == 'object')
        result = $(selector).filter(function(){
          var node = this
          return emptyArray.some.call($this, function(parent){
            return $.contains(parent, node)
          })
        })
      else if (this.length == 1) result = $(zepto.qsa(this[0], selector))
      else result = this.map(function(){ return zepto.qsa(this, selector) })
      return result
    },
    closest: function(selector, context){
      var node = this[0], collection = false
      if (typeof selector == 'object') collection = $(selector)
      while (node && !(collection ? collection.indexOf(node) >= 0 : zepto.matches(node, selector)))
        node = node !== context && !isDocument(node) && node.parentNode
      return $(node)
    },
    parents: function(selector){
      var ancestors = [], nodes = this
      while (nodes.length > 0)
        nodes = $.map(nodes, function(node){
          if ((node = node.parentNode) && !isDocument(node) && ancestors.indexOf(node) < 0) {
            ancestors.push(node)
            return node
          }
        })
      return filtered(ancestors, selector)
    },
    parent: function(selector){
      return filtered(uniq(this.pluck('parentNode')), selector)
    },
    children: function(selector){
      return filtered(this.map(function(){ return children(this) }), selector)
    },
    contents: function() {
      return this.map(function() { return slice.call(this.childNodes) })
    },
    siblings: function(selector){
      return filtered(this.map(function(i, el){
        return filter.call(children(el.parentNode), function(child){ return child!==el })
      }), selector)
    },
    empty: function(){
      return this.each(function(){ this.innerHTML = '' })
    },
    // `pluck` is borrowed from Prototype.js
    pluck: function(property){
      return $.map(this, function(el){ return el[property] })
    },
    show: function(){
      return this.each(function(){
        this.style.display == "none" && (this.style.display = '')
        if (getComputedStyle(this, '').getPropertyValue("display") == "none")
          this.style.display = defaultDisplay(this.nodeName)
      })
    },
    replaceWith: function(newContent){
      return this.before(newContent).remove()
    },
    wrap: function(structure){
      var func = isFunction(structure)
      if (this[0] && !func)
        var dom   = $(structure).get(0),
            clone = dom.parentNode || this.length > 1

      return this.each(function(index){
        $(this).wrapAll(
          func ? structure.call(this, index) :
            clone ? dom.cloneNode(true) : dom
        )
      })
    },
    wrapAll: function(structure){
      if (this[0]) {
        $(this[0]).before(structure = $(structure))
        var children
        // drill down to the inmost element
        while ((children = structure.children()).length) structure = children.first()
        $(structure).append(this)
      }
      return this
    },
    wrapInner: function(structure){
      var func = isFunction(structure)
      return this.each(function(index){
        var self = $(this), contents = self.contents(),
            dom  = func ? structure.call(this, index) : structure
        contents.length ? contents.wrapAll(dom) : self.append(dom)
      })
    },
    unwrap: function(){
      this.parent().each(function(){
        $(this).replaceWith($(this).children())
      })
      return this
    },
    clone: function(){
      return this.map(function(){ return this.cloneNode(true) })
    },
    hide: function(){
      return this.css("display", "none")
    },
    toggle: function(setting){
      return this.each(function(){
        var el = $(this)
        ;(setting === undefined ? el.css("display") == "none" : setting) ? el.show() : el.hide()
      })
    },
    prev: function(selector){ return $(this.pluck('previousElementSibling')).filter(selector || '*') },
    next: function(selector){ return $(this.pluck('nextElementSibling')).filter(selector || '*') },
    html: function(html){
      return 0 in arguments ?
        this.each(function(idx){
          var originHtml = this.innerHTML
          $(this).empty().append( funcArg(this, html, idx, originHtml) )
        }) :
        (0 in this ? this[0].innerHTML : null)
    },
    text: function(text){
      return 0 in arguments ?
        this.each(function(idx){
          var newText = funcArg(this, text, idx, this.textContent)
          this.textContent = newText == null ? '' : ''+newText
        }) :
        (0 in this ? this[0].textContent : null)
    },
    attr: function(name, value){
      var result
      return (typeof name == 'string' && !(1 in arguments)) ?
        (!this.length || this[0].nodeType !== 1 ? undefined :
          (!(result = this[0].getAttribute(name)) && name in this[0]) ? this[0][name] : result
        ) :
        this.each(function(idx){
          if (this.nodeType !== 1) return
          if (isObject(name)) for (key in name) setAttribute(this, key, name[key])
          else setAttribute(this, name, funcArg(this, value, idx, this.getAttribute(name)))
        })
    },
    removeAttr: function(name){
      return this.each(function(){ this.nodeType === 1 && name.split(' ').forEach(function(attribute){
        setAttribute(this, attribute)
      }, this)})
    },
    prop: function(name, value){
      name = propMap[name] || name
      return (1 in arguments) ?
        this.each(function(idx){
          this[name] = funcArg(this, value, idx, this[name])
        }) :
        (this[0] && this[0][name])
    },
    data: function(name, value){
      var attrName = 'data-' + name.replace(capitalRE, '-$1').toLowerCase()

      var data = (1 in arguments) ?
        this.attr(attrName, value) :
        this.attr(attrName)

      return data !== null ? deserializeValue(data) : undefined
    },
    val: function(value){
      return 0 in arguments ?
        this.each(function(idx){
          this.value = funcArg(this, value, idx, this.value)
        }) :
        (this[0] && (this[0].multiple ?
           $(this[0]).find('option').filter(function(){ return this.selected }).pluck('value') :
           this[0].value)
        )
    },
    offset: function(coordinates){
      if (coordinates) return this.each(function(index){
        var $this = $(this),
            coords = funcArg(this, coordinates, index, $this.offset()),
            parentOffset = $this.offsetParent().offset(),
            props = {
              top:  coords.top  - parentOffset.top,
              left: coords.left - parentOffset.left
            }

        if ($this.css('position') == 'static') props['position'] = 'relative'
        $this.css(props)
      })
      if (!this.length) return null
      var obj = this[0].getBoundingClientRect()
      return {
        left: obj.left + window.pageXOffset,
        top: obj.top + window.pageYOffset,
        width: Math.round(obj.width),
        height: Math.round(obj.height)
      }
    },
    css: function(property, value){
      if (arguments.length < 2) {
        var computedStyle, element = this[0]
        if(!element) return
        computedStyle = getComputedStyle(element, '')
        if (typeof property == 'string')
          return element.style[camelize(property)] || computedStyle.getPropertyValue(property)
        else if (isArray(property)) {
          var props = {}
          $.each(property, function(_, prop){
            props[prop] = (element.style[camelize(prop)] || computedStyle.getPropertyValue(prop))
          })
          return props
        }
      }

      var css = ''
      if (type(property) == 'string') {
        if (!value && value !== 0)
          this.each(function(){ this.style.removeProperty(dasherize(property)) })
        else
          css = dasherize(property) + ":" + maybeAddPx(property, value)
      } else {
        for (key in property)
          if (!property[key] && property[key] !== 0)
            this.each(function(){ this.style.removeProperty(dasherize(key)) })
          else
            css += dasherize(key) + ':' + maybeAddPx(key, property[key]) + ';'
      }

      return this.each(function(){ this.style.cssText += ';' + css })
    },
    index: function(element){
      return element ? this.indexOf($(element)[0]) : this.parent().children().indexOf(this[0])
    },
    hasClass: function(name){
      if (!name) return false
      return emptyArray.some.call(this, function(el){
        return this.test(className(el))
      }, classRE(name))
    },
    addClass: function(name){
      if (!name) return this
      return this.each(function(idx){
        if (!('className' in this)) return
        classList = []
        var cls = className(this), newName = funcArg(this, name, idx, cls)
        newName.split(/\s+/g).forEach(function(klass){
          if (!$(this).hasClass(klass)) classList.push(klass)
        }, this)
        classList.length && className(this, cls + (cls ? " " : "") + classList.join(" "))
      })
    },
    removeClass: function(name){
      return this.each(function(idx){
        if (!('className' in this)) return
        if (name === undefined) return className(this, '')
        classList = className(this)
        funcArg(this, name, idx, classList).split(/\s+/g).forEach(function(klass){
          classList = classList.replace(classRE(klass), " ")
        })
        className(this, classList.trim())
      })
    },
    toggleClass: function(name, when){
      if (!name) return this
      return this.each(function(idx){
        var $this = $(this), names = funcArg(this, name, idx, className(this))
        names.split(/\s+/g).forEach(function(klass){
          (when === undefined ? !$this.hasClass(klass) : when) ?
            $this.addClass(klass) : $this.removeClass(klass)
        })
      })
    },
    scrollTop: function(value){
      if (!this.length) return
      var hasScrollTop = 'scrollTop' in this[0]
      if (value === undefined) return hasScrollTop ? this[0].scrollTop : this[0].pageYOffset
      return this.each(hasScrollTop ?
        function(){ this.scrollTop = value } :
        function(){ this.scrollTo(this.scrollX, value) })
    },
    scrollLeft: function(value){
      if (!this.length) return
      var hasScrollLeft = 'scrollLeft' in this[0]
      if (value === undefined) return hasScrollLeft ? this[0].scrollLeft : this[0].pageXOffset
      return this.each(hasScrollLeft ?
        function(){ this.scrollLeft = value } :
        function(){ this.scrollTo(value, this.scrollY) })
    },
    position: function() {
      if (!this.length) return

      var elem = this[0],
        // Get *real* offsetParent
        offsetParent = this.offsetParent(),
        // Get correct offsets
        offset       = this.offset(),
        parentOffset = rootNodeRE.test(offsetParent[0].nodeName) ? { top: 0, left: 0 } : offsetParent.offset()

      // Subtract element margins
      // note: when an element has margin: auto the offsetLeft and marginLeft
      // are the same in Safari causing offset.left to incorrectly be 0
      offset.top  -= parseFloat( $(elem).css('margin-top') ) || 0
      offset.left -= parseFloat( $(elem).css('margin-left') ) || 0

      // Add offsetParent borders
      parentOffset.top  += parseFloat( $(offsetParent[0]).css('border-top-width') ) || 0
      parentOffset.left += parseFloat( $(offsetParent[0]).css('border-left-width') ) || 0

      // Subtract the two offsets
      return {
        top:  offset.top  - parentOffset.top,
        left: offset.left - parentOffset.left
      }
    },
    offsetParent: function() {
      return this.map(function(){
        var parent = this.offsetParent || document.body
        while (parent && !rootNodeRE.test(parent.nodeName) && $(parent).css("position") == "static")
          parent = parent.offsetParent
        return parent
      })
    }
  }

  // for now
  $.fn.detach = $.fn.remove

  // Generate the `width` and `height` functions
  ;['width', 'height'].forEach(function(dimension){
    var dimensionProperty =
      dimension.replace(/./, function(m){ return m[0].toUpperCase() })

    $.fn[dimension] = function(value){
      var offset, el = this[0]
      if (value === undefined) return isWindow(el) ? el['inner' + dimensionProperty] :
        isDocument(el) ? el.documentElement['scroll' + dimensionProperty] :
        (offset = this.offset()) && offset[dimension]
      else return this.each(function(idx){
        el = $(this)
        el.css(dimension, funcArg(this, value, idx, el[dimension]()))
      })
    }
  })

  function traverseNode(node, fun) {
    fun(node)
    for (var i = 0, len = node.childNodes.length; i < len; i++)
      traverseNode(node.childNodes[i], fun)
  }

  // Generate the `after`, `prepend`, `before`, `append`,
  // `insertAfter`, `insertBefore`, `appendTo`, and `prependTo` methods.
  adjacencyOperators.forEach(function(operator, operatorIndex) {
    var inside = operatorIndex % 2 //=> prepend, append

    $.fn[operator] = function(){
      // arguments can be nodes, arrays of nodes, Zepto objects and HTML strings
      var argType, nodes = $.map(arguments, function(arg) {
            argType = type(arg)
            return argType == "object" || argType == "array" || arg == null ?
              arg : zepto.fragment(arg)
          }),
          parent, copyByClone = this.length > 1
      if (nodes.length < 1) return this

      return this.each(function(_, target){
        parent = inside ? target : target.parentNode

        // convert all methods to a "before" operation
        target = operatorIndex == 0 ? target.nextSibling :
                 operatorIndex == 1 ? target.firstChild :
                 operatorIndex == 2 ? target :
                 null

        var parentInDocument = $.contains(document.documentElement, parent)

        nodes.forEach(function(node){
          if (copyByClone) node = node.cloneNode(true)
          else if (!parent) return $(node).remove()

          parent.insertBefore(node, target)
          if (parentInDocument) traverseNode(node, function(el){
            if (el.nodeName != null && el.nodeName.toUpperCase() === 'SCRIPT' &&
               (!el.type || el.type === 'text/javascript') && !el.src)
              window['eval'].call(window, el.innerHTML)
          })
        })
      })
    }

    // after    => insertAfter
    // prepend  => prependTo
    // before   => insertBefore
    // append   => appendTo
    $.fn[inside ? operator+'To' : 'insert'+(operatorIndex ? 'Before' : 'After')] = function(html){
      $(html)[operator](this)
      return this
    }
  })

  zepto.Z.prototype = $.fn

  // Export internal API functions in the `$.zepto` namespace
  zepto.uniq = uniq
  zepto.deserializeValue = deserializeValue
  $.zepto = zepto

  return $
})()

;(function($){
  var _zid = 1, undefined,
      slice = Array.prototype.slice,
      isFunction = $.isFunction,
      isString = function(obj){ return typeof obj == 'string' },
      handlers = {},
      specialEvents={},
      focusinSupported = 'onfocusin' in window,
      focus = { focus: 'focusin', blur: 'focusout' },
      hover = { mouseenter: 'mouseover', mouseleave: 'mouseout' }

  specialEvents.click = specialEvents.mousedown = specialEvents.mouseup = specialEvents.mousemove = 'MouseEvents'

  function zid(element) {
    return element._zid || (element._zid = _zid++)
  }
  function findHandlers(element, event, fn, selector) {
    event = parse(event)
    if (event.ns) var matcher = matcherFor(event.ns)
    return (handlers[zid(element)] || []).filter(function(handler) {
      return handler
        && (!event.e  || handler.e == event.e)
        && (!event.ns || matcher.test(handler.ns))
        && (!fn       || zid(handler.fn) === zid(fn))
        && (!selector || handler.sel == selector)
    })
  }
  function parse(event) {
    var parts = ('' + event).split('.')
    return {e: parts[0], ns: parts.slice(1).sort().join(' ')}
  }
  function matcherFor(ns) {
    return new RegExp('(?:^| )' + ns.replace(' ', ' .* ?') + '(?: |$)')
  }

  function eventCapture(handler, captureSetting) {
    return handler.del &&
      (!focusinSupported && (handler.e in focus)) ||
      !!captureSetting
  }

  function realEvent(type) {
    return hover[type] || (focusinSupported && focus[type]) || type
  }

  function add(element, events, fn, data, selector, delegator, capture){
    var id = zid(element), set = (handlers[id] || (handlers[id] = []))
    events.split(/\s/).forEach(function(event){
      if (event == 'ready') return $(document).ready(fn)
      var handler   = parse(event)
      handler.fn    = fn
      handler.sel   = selector
      // emulate mouseenter, mouseleave
      if (handler.e in hover) fn = function(e){
        var related = e.relatedTarget
        if (!related || (related !== this && !$.contains(this, related)))
          return handler.fn.apply(this, arguments)
      }
      handler.del   = delegator
      var callback  = delegator || fn
      handler.proxy = function(e){
        e = compatible(e)
        if (e.isImmediatePropagationStopped()) return
        e.data = data
        var result = callback.apply(element, e._args == undefined ? [e] : [e].concat(e._args))
        if (result === false) e.preventDefault(), e.stopPropagation()
        return result
      }
      handler.i = set.length
      set.push(handler)
      if ('addEventListener' in element)
        element.addEventListener(realEvent(handler.e), handler.proxy, eventCapture(handler, capture))
    })
  }
  function remove(element, events, fn, selector, capture){
    var id = zid(element)
    ;(events || '').split(/\s/).forEach(function(event){
      findHandlers(element, event, fn, selector).forEach(function(handler){
        delete handlers[id][handler.i]
      if ('removeEventListener' in element)
        element.removeEventListener(realEvent(handler.e), handler.proxy, eventCapture(handler, capture))
      })
    })
  }

  $.event = { add: add, remove: remove }

  $.proxy = function(fn, context) {
    var args = (2 in arguments) && slice.call(arguments, 2)
    if (isFunction(fn)) {
      var proxyFn = function(){ return fn.apply(context, args ? args.concat(slice.call(arguments)) : arguments) }
      proxyFn._zid = zid(fn)
      return proxyFn
    } else if (isString(context)) {
      if (args) {
        args.unshift(fn[context], fn)
        return $.proxy.apply(null, args)
      } else {
        return $.proxy(fn[context], fn)
      }
    } else {
      throw new TypeError("expected function")
    }
  }

  $.fn.bind = function(event, data, callback){
    return this.on(event, data, callback)
  }
  $.fn.unbind = function(event, callback){
    return this.off(event, callback)
  }
  $.fn.one = function(event, selector, data, callback){
    return this.on(event, selector, data, callback, 1)
  }

  var returnTrue = function(){return true},
      returnFalse = function(){return false},
      ignoreProperties = /^([A-Z]|returnValue$|layer[XY]$)/,
      eventMethods = {
        preventDefault: 'isDefaultPrevented',
        stopImmediatePropagation: 'isImmediatePropagationStopped',
        stopPropagation: 'isPropagationStopped'
      }

  function compatible(event, source) {
    if (source || !event.isDefaultPrevented) {
      source || (source = event)

      $.each(eventMethods, function(name, predicate) {
        var sourceMethod = source[name]
        event[name] = function(){
          this[predicate] = returnTrue
          return sourceMethod && sourceMethod.apply(source, arguments)
        }
        event[predicate] = returnFalse
      })

      if (source.defaultPrevented !== undefined ? source.defaultPrevented :
          'returnValue' in source ? source.returnValue === false :
          source.getPreventDefault && source.getPreventDefault())
        event.isDefaultPrevented = returnTrue
    }
    return event
  }

  function createProxy(event) {
    var key, proxy = { originalEvent: event }
    for (key in event)
      if (!ignoreProperties.test(key) && event[key] !== undefined) proxy[key] = event[key]

    return compatible(proxy, event)
  }

  $.fn.delegate = function(selector, event, callback){
    return this.on(event, selector, callback)
  }
  $.fn.undelegate = function(selector, event, callback){
    return this.off(event, selector, callback)
  }

  $.fn.live = function(event, callback){
    $(document.body).delegate(this.selector, event, callback)
    return this
  }
  $.fn.die = function(event, callback){
    $(document.body).undelegate(this.selector, event, callback)
    return this
  }

  $.fn.on = function(event, selector, data, callback, one){
    var autoRemove, delegator, $this = this
    if (event && !isString(event)) {
      $.each(event, function(type, fn){
        $this.on(type, selector, data, fn, one)
      })
      return $this
    }

    if (!isString(selector) && !isFunction(callback) && callback !== false)
      callback = data, data = selector, selector = undefined
    if (isFunction(data) || data === false)
      callback = data, data = undefined

    if (callback === false) callback = returnFalse

    return $this.each(function(_, element){
      if (one) autoRemove = function(e){
        remove(element, e.type, callback)
        return callback.apply(this, arguments)
      }

      if (selector) delegator = function(e){
        var evt, match = $(e.target).closest(selector, element).get(0)
        if (match && match !== element) {
          evt = $.extend(createProxy(e), {currentTarget: match, liveFired: element})
          return (autoRemove || callback).apply(match, [evt].concat(slice.call(arguments, 1)))
        }
      }

      add(element, event, callback, data, selector, delegator || autoRemove)
    })
  }
  $.fn.off = function(event, selector, callback){
    var $this = this
    if (event && !isString(event)) {
      $.each(event, function(type, fn){
        $this.off(type, selector, fn)
      })
      return $this
    }

    if (!isString(selector) && !isFunction(callback) && callback !== false)
      callback = selector, selector = undefined

    if (callback === false) callback = returnFalse

    return $this.each(function(){
      remove(this, event, callback, selector)
    })
  }

  $.fn.trigger = function(event, args){
    event = (isString(event) || $.isPlainObject(event)) ? $.Event(event) : compatible(event)
    event._args = args
    return this.each(function(){
      // handle focus(), blur() by calling them directly
      if (event.type in focus && typeof this[event.type] == "function") this[event.type]()
      // items in the collection might not be DOM elements
      else if ('dispatchEvent' in this) this.dispatchEvent(event)
      else $(this).triggerHandler(event, args)
    })
  }

  // triggers event handlers on current element just as if an event occurred,
  // doesn't trigger an actual event, doesn't bubble
  $.fn.triggerHandler = function(event, args){
    var e, result
    this.each(function(i, element){
      e = createProxy(isString(event) ? $.Event(event) : event)
      e._args = args
      e.target = element
      $.each(findHandlers(element, event.type || event), function(i, handler){
        result = handler.proxy(e)
        if (e.isImmediatePropagationStopped()) return false
      })
    })
    return result
  }

  // shortcut methods for `.bind(event, fn)` for each event type
  ;('focusin focusout focus blur load resize scroll unload click dblclick '+
  'mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave '+
  'change select keydown keypress keyup error').split(' ').forEach(function(event) {
    $.fn[event] = function(callback) {
      return (0 in arguments) ?
        this.bind(event, callback) :
        this.trigger(event)
    }
  })

  $.Event = function(type, props) {
    if (!isString(type)) props = type, type = props.type
    var event = document.createEvent(specialEvents[type] || 'Events'), bubbles = true
    if (props) for (var name in props) (name == 'bubbles') ? (bubbles = !!props[name]) : (event[name] = props[name])
    event.initEvent(type, bubbles, true)
    return compatible(event)
  }

})(Zepto)

;(function($){
  var jsonpID = 0,
      document = window.document,
      key,
      name,
      rscript = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
      scriptTypeRE = /^(?:text|application)\/javascript/i,
      xmlTypeRE = /^(?:text|application)\/xml/i,
      jsonType = 'application/json',
      htmlType = 'text/html',
      blankRE = /^\s*$/,
      originAnchor = document.createElement('a')

  originAnchor.href = window.location.href

  // trigger a custom event and return false if it was cancelled
  function triggerAndReturn(context, eventName, data) {
    var event = $.Event(eventName)
    $(context).trigger(event, data)
    return !event.isDefaultPrevented()
  }

  // trigger an Ajax "global" event
  function triggerGlobal(settings, context, eventName, data) {
    if (settings.global) return triggerAndReturn(context || document, eventName, data)
  }

  // Number of active Ajax requests
  $.active = 0

  function ajaxStart(settings) {
    if (settings.global && $.active++ === 0) triggerGlobal(settings, null, 'ajaxStart')
  }
  function ajaxStop(settings) {
    if (settings.global && !(--$.active)) triggerGlobal(settings, null, 'ajaxStop')
  }

  // triggers an extra global event "ajaxBeforeSend" that's like "ajaxSend" but cancelable
  function ajaxBeforeSend(xhr, settings) {
    var context = settings.context
    if (settings.beforeSend.call(context, xhr, settings) === false ||
        triggerGlobal(settings, context, 'ajaxBeforeSend', [xhr, settings]) === false)
      return false

    triggerGlobal(settings, context, 'ajaxSend', [xhr, settings])
  }
  function ajaxSuccess(data, xhr, settings, deferred) {
    var context = settings.context, status = 'success'
    settings.success.call(context, data, status, xhr)
    if (deferred) deferred.resolveWith(context, [data, status, xhr])
    triggerGlobal(settings, context, 'ajaxSuccess', [xhr, settings, data])
    ajaxComplete(status, xhr, settings)
  }
  // type: "timeout", "error", "abort", "parsererror"
  function ajaxError(error, type, xhr, settings, deferred) {
    var context = settings.context
    settings.error.call(context, xhr, type, error)
    if (deferred) deferred.rejectWith(context, [xhr, type, error])
    triggerGlobal(settings, context, 'ajaxError', [xhr, settings, error || type])
    ajaxComplete(type, xhr, settings)
  }
  // status: "success", "notmodified", "error", "timeout", "abort", "parsererror"
  function ajaxComplete(status, xhr, settings) {
    var context = settings.context
    settings.complete.call(context, xhr, status)
    triggerGlobal(settings, context, 'ajaxComplete', [xhr, settings])
    ajaxStop(settings)
  }

  // Empty function, used as default callback
  function empty() {}

  $.ajaxJSONP = function(options, deferred){
    if (!('type' in options)) return $.ajax(options)

    var _callbackName = options.jsonpCallback,
      callbackName = ($.isFunction(_callbackName) ?
        _callbackName() : _callbackName) || ('jsonp' + (++jsonpID)),
      script = document.createElement('script'),
      originalCallback = window[callbackName],
      responseData,
      abort = function(errorType) {
        $(script).triggerHandler('error', errorType || 'abort')
      },
      xhr = { abort: abort }, abortTimeout

    if (deferred) deferred.promise(xhr)

    $(script).on('load error', function(e, errorType){
      clearTimeout(abortTimeout)
      $(script).off().remove()

      if (e.type == 'error' || !responseData) {
        ajaxError(null, errorType || 'error', xhr, options, deferred)
      } else {
        ajaxSuccess(responseData[0], xhr, options, deferred)
      }

      window[callbackName] = originalCallback
      if (responseData && $.isFunction(originalCallback))
        originalCallback(responseData[0])

      originalCallback = responseData = undefined
    })

    if (ajaxBeforeSend(xhr, options) === false) {
      abort('abort')
      return xhr
    }

    window[callbackName] = function(){
      responseData = arguments
    }

    script.src = options.url.replace(/\?(.+)=\?/, '?$1=' + callbackName)
    document.head.appendChild(script)

    if (options.timeout > 0) abortTimeout = setTimeout(function(){
      abort('timeout')
    }, options.timeout)

    return xhr
  }

  $.ajaxSettings = {
    // Default type of request
    type: 'GET',
    // Callback that is executed before request
    beforeSend: empty,
    // Callback that is executed if the request succeeds
    success: empty,
    // Callback that is executed the the server drops error
    error: empty,
    // Callback that is executed on request complete (both: error and success)
    complete: empty,
    // The context for the callbacks
    context: null,
    // Whether to trigger "global" Ajax events
    global: true,
    // Transport
    xhr: function () {
      return new window.XMLHttpRequest()
    },
    // MIME types mapping
    // IIS returns Javascript as "application/x-javascript"
    accepts: {
      script: 'text/javascript, application/javascript, application/x-javascript',
      json:   jsonType,
      xml:    'application/xml, text/xml',
      html:   htmlType,
      text:   'text/plain'
    },
    // Whether the request is to another domain
    crossDomain: false,
    // Default timeout
    timeout: 0,
    // Whether data should be serialized to string
    processData: true,
    // Whether the browser should be allowed to cache GET responses
    cache: true
  }

  function mimeToDataType(mime) {
    if (mime) mime = mime.split(';', 2)[0]
    return mime && ( mime == htmlType ? 'html' :
      mime == jsonType ? 'json' :
      scriptTypeRE.test(mime) ? 'script' :
      xmlTypeRE.test(mime) && 'xml' ) || 'text'
  }

  function appendQuery(url, query) {
    if (query == '') return url
    return (url + '&' + query).replace(/[&?]{1,2}/, '?')
  }

  // serialize payload and append it to the URL for GET requests
  function serializeData(options) {
    if (options.processData && options.data && $.type(options.data) != "string")
      options.data = $.param(options.data, options.traditional)
    if (options.data && (!options.type || options.type.toUpperCase() == 'GET'))
      options.url = appendQuery(options.url, options.data), options.data = undefined
  }

  $.ajax = function(options){
    var settings = $.extend({}, options || {}),
        deferred = $.Deferred && $.Deferred(),
        urlAnchor
    for (key in $.ajaxSettings) if (settings[key] === undefined) settings[key] = $.ajaxSettings[key]

    ajaxStart(settings)

    if (!settings.crossDomain) {
      urlAnchor = document.createElement('a')
      urlAnchor.href = settings.url
      urlAnchor.href = urlAnchor.href
      settings.crossDomain = (originAnchor.protocol + '//' + originAnchor.host) !== (urlAnchor.protocol + '//' + urlAnchor.host)
    }

    if (!settings.url) settings.url = window.location.toString()
    serializeData(settings)

    var dataType = settings.dataType, hasPlaceholder = /\?.+=\?/.test(settings.url)
    if (hasPlaceholder) dataType = 'jsonp'

    if (settings.cache === false || (
         (!options || options.cache !== true) &&
         ('script' == dataType || 'jsonp' == dataType)
        ))
      settings.url = appendQuery(settings.url, '_=' + Date.now())

    if ('jsonp' == dataType) {
      if (!hasPlaceholder)
        settings.url = appendQuery(settings.url,
          settings.jsonp ? (settings.jsonp + '=?') : settings.jsonp === false ? '' : 'callback=?')
      return $.ajaxJSONP(settings, deferred)
    }

    var mime = settings.accepts[dataType],
        headers = { },
        setHeader = function(name, value) { headers[name.toLowerCase()] = [name, value] },
        protocol = /^([\w-]+:)\/\//.test(settings.url) ? RegExp.$1 : window.location.protocol,
        xhr = settings.xhr(),
        nativeSetHeader = xhr.setRequestHeader,
        abortTimeout

    if (deferred) deferred.promise(xhr)

    if (!settings.crossDomain) setHeader('X-Requested-With', 'XMLHttpRequest')
    setHeader('Accept', mime || '*/*')
    if (mime = settings.mimeType || mime) {
      if (mime.indexOf(',') > -1) mime = mime.split(',', 2)[0]
      xhr.overrideMimeType && xhr.overrideMimeType(mime)
    }
    if (settings.contentType || (settings.contentType !== false && settings.data && settings.type.toUpperCase() != 'GET'))
      setHeader('Content-Type', settings.contentType || 'application/x-www-form-urlencoded')

    if (settings.headers) for (name in settings.headers) setHeader(name, settings.headers[name])
    xhr.setRequestHeader = setHeader

    xhr.onreadystatechange = function(){
      if (xhr.readyState == 4) {
        xhr.onreadystatechange = empty
        clearTimeout(abortTimeout)
        var result, error = false
        if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304 || (xhr.status == 0 && protocol == 'file:')) {
          dataType = dataType || mimeToDataType(settings.mimeType || xhr.getResponseHeader('content-type'))
          result = xhr.responseText

          try {
            // http://perfectionkills.com/global-eval-what-are-the-options/
            if (dataType == 'script')    (1,eval)(result)
            else if (dataType == 'xml')  result = xhr.responseXML
            else if (dataType == 'json') result = blankRE.test(result) ? null : $.parseJSON(result)
          } catch (e) { error = e }

          if (error) ajaxError(error, 'parsererror', xhr, settings, deferred)
          else ajaxSuccess(result, xhr, settings, deferred)
        } else {
          ajaxError(xhr.statusText || null, xhr.status ? 'error' : 'abort', xhr, settings, deferred)
        }
      }
    }

    if (ajaxBeforeSend(xhr, settings) === false) {
      xhr.abort()
      ajaxError(null, 'abort', xhr, settings, deferred)
      return xhr
    }

    if (settings.xhrFields) for (name in settings.xhrFields) xhr[name] = settings.xhrFields[name]

    var async = 'async' in settings ? settings.async : true
    xhr.open(settings.type, settings.url, async, settings.username, settings.password)

    for (name in headers) nativeSetHeader.apply(xhr, headers[name])

    if (settings.timeout > 0) abortTimeout = setTimeout(function(){
        xhr.onreadystatechange = empty
        xhr.abort()
        ajaxError(null, 'timeout', xhr, settings, deferred)
      }, settings.timeout)

    // avoid sending empty string (#319)
    xhr.send(settings.data ? settings.data : null)
    return xhr
  }

  // handle optional data/success arguments
  function parseArguments(url, data, success, dataType) {
    if ($.isFunction(data)) dataType = success, success = data, data = undefined
    if (!$.isFunction(success)) dataType = success, success = undefined
    return {
      url: url
    , data: data
    , success: success
    , dataType: dataType
    }
  }

  $.get = function(/* url, data, success, dataType */){
    return $.ajax(parseArguments.apply(null, arguments))
  }

  $.post = function(/* url, data, success, dataType */){
    var options = parseArguments.apply(null, arguments)
    options.type = 'POST'
    return $.ajax(options)
  }

  $.getJSON = function(/* url, data, success */){
    var options = parseArguments.apply(null, arguments)
    options.dataType = 'json'
    return $.ajax(options)
  }

  $.fn.load = function(url, data, success){
    if (!this.length) return this
    var self = this, parts = url.split(/\s/), selector,
        options = parseArguments(url, data, success),
        callback = options.success
    if (parts.length > 1) options.url = parts[0], selector = parts[1]
    options.success = function(response){
      self.html(selector ?
        $('<div>').html(response.replace(rscript, "")).find(selector)
        : response)
      callback && callback.apply(self, arguments)
    }
    $.ajax(options)
    return this
  }

  var escape = encodeURIComponent

  function serialize(params, obj, traditional, scope){
    var type, array = $.isArray(obj), hash = $.isPlainObject(obj)
    $.each(obj, function(key, value) {
      type = $.type(value)
      if (scope) key = traditional ? scope :
        scope + '[' + (hash || type == 'object' || type == 'array' ? key : '') + ']'
      // handle data in serializeArray() format
      if (!scope && array) params.add(value.name, value.value)
      // recurse into nested objects
      else if (type == "array" || (!traditional && type == "object"))
        serialize(params, value, traditional, key)
      else params.add(key, value)
    })
  }

  $.param = function(obj, traditional){
    var params = []
    params.add = function(key, value) {
      if ($.isFunction(value)) value = value()
      if (value == null) value = ""
      this.push(escape(key) + '=' + escape(value))
    }
    serialize(params, obj, traditional)
    return params.join('&').replace(/%20/g, '+')
  }
})(Zepto)

;(function($){
  $.fn.serializeArray = function() {
    var name, type, result = [],
      add = function(value) {
        if (value.forEach) return value.forEach(add)
        result.push({ name: name, value: value })
      }
    if (this[0]) $.each(this[0].elements, function(_, field){
      type = field.type, name = field.name
      if (name && field.nodeName.toLowerCase() != 'fieldset' &&
        !field.disabled && type != 'submit' && type != 'reset' && type != 'button' && type != 'file' &&
        ((type != 'radio' && type != 'checkbox') || field.checked))
          add($(field).val())
    })
    return result
  }

  $.fn.serialize = function(){
    var result = []
    this.serializeArray().forEach(function(elm){
      result.push(encodeURIComponent(elm.name) + '=' + encodeURIComponent(elm.value))
    })
    return result.join('&')
  }

  $.fn.submit = function(callback) {
    if (0 in arguments) this.bind('submit', callback)
    else if (this.length) {
      var event = $.Event('submit')
      this.eq(0).trigger(event)
      if (!event.isDefaultPrevented()) this.get(0).submit()
    }
    return this
  }

})(Zepto)

;(function($){
  // __proto__ doesn't exist on IE<11, so redefine
  // the Z function to use object extension instead
  if (!('__proto__' in {})) {
    $.extend($.zepto, {
      Z: function(dom, selector){
        dom = dom || []
        $.extend(dom, $.fn)
        dom.selector = selector || ''
        dom.__Z = true
        return dom
      },
      // this is a kludge but works
      isZ: function(object){
        return $.type(object) === 'array' && '__Z' in object
      }
    })
  }

  // getComputedStyle shouldn't freak out when called
  // without a valid element as argument
  try {
    getComputedStyle(undefined)
  } catch(e) {
    var nativeGetComputedStyle = getComputedStyle;
    window.getComputedStyle = function(element){
      try {
        return nativeGetComputedStyle(element)
      } catch(e) {
        return null
      }
    }
  }
})(Zepto)

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Utils = __webpack_require__(2);

var _Utils2 = _interopRequireDefault(_Utils);

var _cssPlugin = __webpack_require__(3);

var _cssPlugin2 = _interopRequireDefault(_cssPlugin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*
 * Tween.js
 * t: current time（当前时间）；
 * b: beginning value（初始值）；
 * c: change in value（变化量）； 说明： 假设 y 从 100 - 1000, 变化量应该是900
 * d: duration（持续时间）。
 * you can visit 'http://easings.net/zh-cn' to get effect
 */
var TweenType = {
    Linear: function Linear(t, b, c, d) {
        return c * t / d + b;
    },
    Quad: {
        easeIn: function easeIn(t, b, c, d) {
            return c * (t /= d) * t + b;
        },
        easeOut: function easeOut(t, b, c, d) {
            return -c * (t /= d) * (t - 2) + b;
        },
        easeInOut: function easeInOut(t, b, c, d) {
            if ((t /= d / 2) < 1) return c / 2 * t * t + b;
            return -c / 2 * (--t * (t - 2) - 1) + b;
        }
    },
    Cubic: {
        easeIn: function easeIn(t, b, c, d) {
            return c * (t /= d) * t * t + b;
        },
        easeOut: function easeOut(t, b, c, d) {
            return c * ((t = t / d - 1) * t * t + 1) + b;
        },
        easeInOut: function easeInOut(t, b, c, d) {
            if ((t /= d / 2) < 1) return c / 2 * t * t * t + b;
            return c / 2 * ((t -= 2) * t * t + 2) + b;
        }
    },
    Quart: {
        easeIn: function easeIn(t, b, c, d) {
            return c * (t /= d) * t * t * t + b;
        },
        easeOut: function easeOut(t, b, c, d) {
            return -c * ((t = t / d - 1) * t * t * t - 1) + b;
        },
        easeInOut: function easeInOut(t, b, c, d) {
            if ((t /= d / 2) < 1) return c / 2 * t * t * t * t + b;
            return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
        }
    },
    Quint: {
        easeIn: function easeIn(t, b, c, d) {
            return c * (t /= d) * t * t * t * t + b;
        },
        easeOut: function easeOut(t, b, c, d) {
            return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
        },
        easeInOut: function easeInOut(t, b, c, d) {
            if ((t /= d / 2) < 1) return c / 2 * t * t * t * t * t + b;
            return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
        }
    },
    Sine: {
        easeIn: function easeIn(t, b, c, d) {
            return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
        },
        easeOut: function easeOut(t, b, c, d) {
            return c * Math.sin(t / d * (Math.PI / 2)) + b;
        },
        easeInOut: function easeInOut(t, b, c, d) {
            return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
        }
    },
    Expo: {
        easeIn: function easeIn(t, b, c, d) {
            return t == 0 ? b : c * Math.pow(2, 10 * (t / d - 1)) + b;
        },
        easeOut: function easeOut(t, b, c, d) {
            return t == d ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b;
        },
        easeInOut: function easeInOut(t, b, c, d) {
            if (t == 0) return b;
            if (t == d) return b + c;
            if ((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
            return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
        }
    },
    Circ: {
        easeIn: function easeIn(t, b, c, d) {
            return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
        },
        easeOut: function easeOut(t, b, c, d) {
            return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
        },
        easeInOut: function easeInOut(t, b, c, d) {
            if ((t /= d / 2) < 1) return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
            return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
        }
    },
    Elastic: {
        easeIn: function easeIn(t, b, c, d, a, p) {
            var s;
            if (t == 0) return b;
            if ((t /= d) == 1) return b + c;
            if (typeof p == "undefined") p = d * .3;
            if (!a || a < Math.abs(c)) {
                s = p / 4;
                a = c;
            } else {
                s = p / (2 * Math.PI) * Math.asin(c / a);
            }
            return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
        },
        easeOut: function easeOut(t, b, c, d, a, p) {
            var s;
            if (t == 0) return b;
            if ((t /= d) == 1) return b + c;
            if (typeof p == "undefined") p = d * .3;
            if (!a || a < Math.abs(c)) {
                a = c;
                s = p / 4;
            } else {
                s = p / (2 * Math.PI) * Math.asin(c / a);
            }
            return a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b;
        },
        easeInOut: function easeInOut(t, b, c, d, a, p) {
            var s;
            if (t == 0) return b;
            if ((t /= d / 2) == 2) return b + c;
            if (typeof p == "undefined") p = d * (.3 * 1.5);
            if (!a || a < Math.abs(c)) {
                a = c;
                s = p / 4;
            } else {
                s = p / (2 * Math.PI) * Math.asin(c / a);
            }
            if (t < 1) return -.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
            return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p) * .5 + c + b;
        }
    },
    Back: {
        easeIn: function easeIn(t, b, c, d, s) {
            if (typeof s == "undefined") s = 1.70158;
            return c * (t /= d) * t * ((s + 1) * t - s) + b;
        },
        easeOut: function easeOut(t, b, c, d, s) {
            if (typeof s == "undefined") s = 1.70158;
            return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
        },
        easeInOut: function easeInOut(t, b, c, d, s) {
            if (typeof s == "undefined") s = 1.70158;
            if ((t /= d / 2) < 1) return c / 2 * (t * t * (((s *= 1.525) + 1) * t - s)) + b;
            return c / 2 * ((t -= 2) * t * (((s *= 1.525) + 1) * t + s) + 2) + b;
        }
    },
    Bounce: {
        easeIn: function easeIn(t, b, c, d) {
            return c - TweenType.Bounce.easeOut(d - t, 0, c, d) + b;
        },
        easeOut: function easeOut(t, b, c, d) {
            if ((t /= d) < 1 / 2.75) {
                return c * (7.5625 * t * t) + b;
            } else if (t < 2 / 2.75) {
                return c * (7.5625 * (t -= 1.5 / 2.75) * t + .75) + b;
            } else if (t < 2.5 / 2.75) {
                return c * (7.5625 * (t -= 2.25 / 2.75) * t + .9375) + b;
            } else {
                return c * (7.5625 * (t -= 2.625 / 2.75) * t + .984375) + b;
            }
        },
        easeInOut: function easeInOut(t, b, c, d) {
            if (t < d / 2) {
                return TweenType.Bounce.easeIn(t * 2, 0, c, d) * .5 + b;
            } else {
                return TweenType.Bounce.easeOut(t * 2 - d, 0, c, d) * .5 + c * .5 + b;
            }
        }
    }
};

var requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame;

var Tween = function () {

    /**
     * 哪个插件支持该目标
     */
    function Tween(target, fromProps, toProps, duration, ease) {
        var _this = this;

        _classCallCheck(this, Tween);

        this._events = {
            onUpdate: null,
            onComplete: null
        };

        // 这里两者都是同时拷贝，而不改变其自身属性，因为css样式以后需要引入额外插件来支持，现阶段只能在onUpdate事件里面手动维护
        this.fromProps = _Utils2.default.clone(fromProps);
        this._fromPropsOrigin = _Utils2.default.clone(fromProps);
        this.toProps = toProps;
        this.ease = ease;
        this.duration = duration;

        this._running = false;

        Tween.plugins.forEach(function (plugin, index) {
            if (plugin.isSupport(target)) {
                _this._pluginIndex = index;
            }
        });

        if (!_Utils2.default.isUndefined(this._pluginIndex)) {
            console.info("命中了插件：" + Tween.plugins[this._pluginIndex].name);
        }
    }

    /**
     * 缓动动画执行时候的帧率，在缓动停止的时候会设置成0
     */


    /**
     * 缓动动画已经运行时间
     * 说明： 通过不断累积每一帧所花费的时间
     */


    _createClass(Tween, [{
        key: "onUpdate",
        value: function onUpdate(callback) {
            this._events.onUpdate = callback;
            return this;
        }
    }, {
        key: "onComplete",
        value: function onComplete(callback) {
            this._events.onComplete = callback;
            return this;
        }

        /**
         * 开始动画
         * 说明： stop()之后的动画会重新开始
         * @return {Tween}
         */

    }, {
        key: "start",
        value: function start() {
            this._running = true;
            this._runningTime = 0;
            this.fps = 0;

            requestAnimationFrame(this._update.bind(this));

            return this;
        }

        /**
         * 停止动画
         * @return {Tween}
         */

    }, {
        key: "stop",
        value: function stop() {
            this._running = false;
            this._startTime = null;
            this.fps = 0;
            return this;
        }

        /**
         * 上一帧的时间
         */

    }, {
        key: "_update",
        value: function _update(now) {
            var _this2 = this;

            // 初始化开始时间
            if (_Utils2.default.isUndefined(this._lastTime)) {
                this._lastTime = now;
                requestAnimationFrame(this._update.bind(this));
                return false;
            }

            this.fps = 1000 / (now - this._lastTime);

            this._runningTime += now - this._lastTime;

            if (this._runningTime >= this.duration) {
                this.stop();
                this._fixedInEnd();
                this._events.onComplete && this._events.onComplete.call(this.fromProps);
            }

            this._events.onUpdate && this._events.onUpdate.call(this.fromProps);

            // 计算需要缓动的属性和对应值
            Object.keys(this.toProps).forEach(function (prop) {

                _this2.fromProps[prop] = _this2.ease(_this2._runningTime, _this2._fromPropsOrigin[prop], _this2.toProps[prop] - _this2._fromPropsOrigin[prop], _this2.duration);
            });

            if (this._running) {
                this._lastTime = now;
                requestAnimationFrame(this._update.bind(this));
            }
        }

        /**
         * 将缓动属性对齐
         * 说明： 因为结束时间几乎不可能卡在结束的那一毫秒，所以结束后需要手动将误差对齐
         * @private
         */

    }, {
        key: "_fixedInEnd",
        value: function _fixedInEnd() {
            var _this3 = this;

            Object.keys(this.toProps).forEach(function (prop) {
                _this3.fromProps[prop] = _this3.toProps[prop];
            });
        }

        /**
         * 以对象自身属性为起点，缓动到目标属性
         * @param target 选中对象
         * @param toProps 目标属性
         * @param duration {number} 耗时。 单位毫秒
         * @param ease 缓动类型
         * @param callback {Function} 完成之后的回调
         */

    }], [{
        key: "to",
        value: function to(target, toProps, duration) {
            var ease = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : Tween.Ease.Linear;
            var callback = arguments[4];


            // 构建一个fromProps，重新生成一个Tween对象
            var fromProps = {};
            for (var i in toProps) {
                if (toProps.hasOwnProperty(i)) fromProps[i] = target[i];
            }

            var tween = new Tween(target, fromProps, toProps, duration, ease);

            if (callback) {
                tween.onComplete(callback);
            }

            return tween;
        }

        /**
         * 指定对象开始属性，缓动到目标属性
         * @param target 选中对象
         * @param fromProps 开始属性
         * @param toProps 目标属性
         * @param duration {number} 耗时。 单位毫秒
         * @param ease 缓动类型
         * @param callback {Function} 完成之后的回调
         */

    }, {
        key: "fromTo",
        value: function fromTo(target, fromProps, toProps, duration) {
            var ease = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : Tween.Ease.Linear;
            var callback = arguments[5];


            var tween = new Tween(target, fromProps, toProps, duration, ease);

            if (callback) {
                tween.onComplete(callback);
            }

            return tween;
        }
    }]);

    return Tween;
}();

// 设置为静态属性


Tween.Ease = TweenType;

Tween.plugins = [_cssPlugin2.default];

var tester = {

    player: document.createElement("div"),

    init: function init() {
        this.player.className = "test-doter";
        this.player.style.position = "absolute";
        this.player.style.top = "0";
        this.player.style.left = "0";
        this.player.style.width = "30px";
        this.player.style.height = "30px";
        this.player.style.background = "red";
        this.player.style.borderRadius = "50%";
        this.player.style.zIndex = "11111";

        document.body.appendChild(this.player);
    }
};

tester.init();

window.t = Tween.to({ x: 0, y: 0 }, { x: window.innerWidth - 30, y: window.innerHeight - 30 }, 2000, Tween.Ease.Cubic.easeInOut).onUpdate(function () {
    console.log(this.x, this.y);
    tester.player.style.top = this.y + "px";
    tester.player.style.left = this.x + "px";
}).onComplete(function () {
    console.info("I'm finish");
});

exports.default = Tween;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Created by coffee on 02/03/2017.
 */

var Utils = function () {
    function Utils() {
        _classCallCheck(this, Utils);
    }

    _createClass(Utils, null, [{
        key: "isObject",
        value: function isObject(target) {
            return (typeof target === "undefined" ? "undefined" : _typeof(target)) === "object";
        }
    }, {
        key: "isNumber",
        value: function isNumber(target) {
            return typeof target === "number";
        }
    }, {
        key: "isFunction",
        value: function isFunction(target) {
            return typeof target === "function";
        }
    }, {
        key: "isUndefined",
        value: function isUndefined(target) {
            return typeof target === "undefined";
        }
    }, {
        key: "isArray",
        value: function isArray(target) {
            return Array.isArray(target);
        }
    }, {
        key: "isNull",
        value: function isNull(target) {
            return target === null;
        }
    }, {
        key: "isLikeArray",
        value: function isLikeArray(target) {
            return Utils.isArray(target) && Utils.isNumber(target.length);
        }

        /**
         * 对数组、伪数组、对象属性列表进行遍历
         * @param target
         * @param callback
         * @return {boolean}
         */

    }, {
        key: "each",
        value: function each(target, callback) {
            if (!Utils.isFunction(callback)) return false;

            if (Utils.isArray(target) || Utils.isLikeArray(target)) {
                Array.prototype.forEach.call(target, callback);
            }
            //else if(Utils.isObject(target)){
            //
            //    let keys = Object.keys(target);
            //
            //    keys.forEach((e, i) => {
            //        callback.call(this, e, i)
            //    });
            //
            //}
        }

        /**
         * 克隆一个数组
         * 说明：这个和自带的不同，该函数会自动对列表里面的对象进行深拷贝
         * @param targetArray
         * @return {any[]}
         */

    }, {
        key: "_cloneArray",
        value: function _cloneArray(targetArray) {

            var newArray = [];

            targetArray.forEach(function (ele, index) {
                switch (typeof ele === "undefined" ? "undefined" : _typeof(ele)) {
                    case "number":
                    case "undefined":
                    case "string":
                    case "boolean":
                        newArray[index] = ele;
                        break;

                    case "object":
                        if (Utils.isNull(ele)) {
                            newArray[index] = null;
                        } else if (Utils.isArray(ele)) {
                            newArray[index] = Utils.cloneArray(ele);
                        } else {
                            newArray[index] = Utils.clone(ele);
                        }
                }
            });

            return newArray;
        }

        /**
         * 克隆一个对象或者数组
         * 说明：参数如果是number,undefined,null,string,boolean等基础类型会直接返回自身
         * @param target 任何对象或者数组
         * @return {{}}
         */

    }, {
        key: "clone",
        value: function clone(target) {

            if (Utils.isArray(target)) {
                return Utils._cloneArray(target);
            }

            var newTarget = {};

            Object.keys(target).forEach(function (prop) {

                switch (_typeof(target[prop])) {

                    case "number":
                    case "undefined":
                    case "string":
                    case "boolean":
                        newTarget[prop] = target[prop];
                        break;

                    case "object":
                        if (Utils.isNull(target[prop])) {
                            newTarget[prop] = null;
                        } else {
                            newTarget[prop] = Utils.clone(target[prop]);
                        }
                }
            });

            return Object.keys(newTarget).length > 0 ? newTarget : target;
        }
    }]);

    return Utils;
}();

exports.default = Utils;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 * CSS元素的缓动组件
 * Created by coffee on 07/03/2017.
 *
 * 支持缓动的属性
 * - 已支持： width, height, top, left, right, bottom, margin, padding
 * - 待支持： transform, color, opacity
 */

var cssPlugin = {

    name: "cssPlugin",

    version: "0.0.1",

    /**
     * 该插件能否支持目标对象
     * @param target
     */
    isSupport: function isSupport(target) {
        return target instanceof HTMLElement;
    },


    // 支持的属性
    _supportList: ["left", "right", "top", "bottom", "width", "height", "margin", "margin-left", "margin-right", "margin-top", "margin-bottom", "padding", "padding-left", "padding-right", "padding-top", "padding-bottom"],

    // 可以合并的属性，设计到后续的解析的拆分
    _supportMergeList: ["margin", "padding"],

    _example: {
        "width": {
            value: 1.63,
            unit: "rem"
        },

        // 如果设置的是整个margin，那么转换后的键会有四个，设置的时候也需要合并回去。反之，单独运算。
        "margin": {
            "top": {
                value: 100,
                unit: "rem"
            },
            "bottom": {
                value: 100,
                unit: "px"
            }
        }

    },

    _update: function _update(htmlEleTarget) {},


    /**
     * 读取HTML元素上style属性的值，解析成可以读取的对象
     * @private
     */
    _parse: function _parse() {},


    /**
     *
     * @return {{}}
     * @private
     */
    _parseProps: function _parseProps(props) {
        var styleDict = {};

        return styleDict;
    }
};

exports.default = cssPlugin;

/***/ }),
/* 4 */,
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Created by coffee on 23/02/2017.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */

var _webpackZepto = __webpack_require__(0);

var _webpackZepto2 = _interopRequireDefault(_webpackZepto);

var _scroll = __webpack_require__(6);

var _scroll2 = _interopRequireDefault(_scroll);

var _index = __webpack_require__(1);

var _index2 = _interopRequireDefault(_index);

var _datePicker = __webpack_require__(7);

var _datePicker2 = _interopRequireDefault(_datePicker);

__webpack_require__(8);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

window.$ = _webpackZepto2.default;

var DatePicker = function () {
  function DatePicker() {
    _classCallCheck(this, DatePicker);

    document.body.insertAdjacentHTML("beforeEnd", _datePicker2.default);

    (0, _webpackZepto2.default)(".ff-picker-scroll").each(function (i, e) {

      window["s" + i] = new _scroll2.default({
        el: e
      });
    });
  }

  /**
   * 重新设置开始日期
   */


  _createClass(DatePicker, [{
    key: "setStartDate",
    value: function setStartDate() {}

    /**
     * 重新设置结束日期
     */

  }, {
    key: "setEndDate",
    value: function setEndDate() {}
  }, {
    key: "show",
    value: function show() {}
  }, {
    key: "hide",
    value: function hide() {}

    /**
     * 渲染日期的HTML结构
     * @private
     */

  }, {
    key: "_render",
    value: function _render() {}
  }]);

  return DatePicker;
}();

module.exports = DatePicker;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Created by coffee on 28/02/2017.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */

var _webpackZepto = __webpack_require__(0);

var _webpackZepto2 = _interopRequireDefault(_webpackZepto);

var _index = __webpack_require__(1);

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Scroll = function () {
    function Scroll() {
        var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        _classCallCheck(this, Scroll);

        var defaults = this.defaults = _webpackZepto2.default.extend({

            el: null, // 需要设置滚动的父级元素，需要为dom原生对象

            onChange: null, // 列表选中改变后发生的回调

            items: [], // 列表项， 会自动生成HTML结构添加到父级元素
            itemHeight: 0, // 每个item的高度，自动生成

            offset: 2, // 在顶部加入偏移量，让第一个选择在中间。
            offsetHeight: 0, // 动态计算需要偏移的高度

            showCount: 5 // 最多显示几个，超出的会被隐藏

        }, options);

        /**
         * 滚动组件的父级元素
         */
        this.scrollWrapper = (0, _webpackZepto2.default)(defaults.el);

        /**
         * 列表选项，由它负责位移
         */
        this.scrollList = this.scrollWrapper.find(".ff-picker-list");
        this.scrollListItem = this.scrollList.find(".ff-picker-item");

        this.defaults.itemHeight = this.scrollListItem.height();
        this.defaults.offsetHeight = this.defaults.itemHeight * 2;

        this.defaults.maxTop = this.defaults.offsetHeight;
        this.defaults.minTop = this.scrollList.height() - this.defaults.offsetHeight - this.defaults.itemHeight;

        console.log(this.defaults.maxTop, this.defaults.minTop);

        this._scrollY(0);

        this._init();
    }

    /**
     * 滑动停止的时候，滚动元素在最后0.2s附带的速度
     */


    _createClass(Scroll, [{
        key: "_init",
        value: function _init() {
            var _this3 = this;

            var _this = this;

            this.scrollWrapper.height(this.defaults.itemHeight * 5);
            this.scrollListItem.eq(0).addClass("active").siblings().removeClass("active");

            var startY = 0,
                endY = 0,
                originY = 0;

            /**
             * 运动速度计算思路：
             * 记录上一帧的触发时间和距离，和当前进行对比得出速度。
             */
            var speedRecord = {

                _prevTime: null, // 上一次计算位置的时间，一般来说每隔0.2s就会刷新一次
                _prevY: null, // 上一个计算时间单位中的位置。 用来计算最后0.2s的速度

                _running: false,

                _speed: {
                    x: 0,
                    y: 0
                },

                /**
                 * 开始记录每帧中的速度
                 */
                start: function start() {
                    var _this2 = this;

                    this._running = true;

                    var lastTime = void 0,
                        lastY = void 0;

                    var go = function go(now) {

                        if (!lastTime) {
                            lastTime = now;
                            lastY = endY;
                        }

                        var interval = now - lastTime;

                        _this2._speed.y = (lastY - endY) / (interval / 1000);

                        lastTime = now;
                        lastY = endY;
                        if (_this2._running) {
                            window.requestAnimationFrame(go);
                        }
                    };

                    window.requestAnimationFrame(go);
                },
                stop: function stop() {
                    this._running = false;
                },


                /**
                 * 返回一个对象，包含着x轴的速度和y轴的速度
                 * @return {{x: number, y: number}}
                 */
                getSpeed: function getSpeed() {
                    return this._speed;
                }
            };

            this.scrollList.on("touchstart", function (event) {

                startY = endY = event.changedTouches[0].pageY;

                originY = _this3._getOriginY();

                console.log("event type: " + event.type + ".");

                speedRecord.start();
            }).on("touchmove", function (event) {
                event.preventDefault();

                console.log("event type: " + event.type + ".");

                endY = event.changedTouches[0].pageY;

                _this3._scrollY(endY - startY + originY);
            }).on("touchend", function (event) {
                speedRecord.stop();

                console.log("event type: " + event.type + ".");

                console.log("speed: " + speedRecord.getSpeed().y + "px/s");

                _this3._startInertia(speedRecord.getSpeed());
            });
        }

        /**
         * 对滚动元素执行惯性动画
         * @private
         */

    }, {
        key: "_startInertia",
        value: function _startInertia(speed) {

            var _this = this;

            var y = this._getOriginY();

            this.tween = _index2.default.to({ speed: speed.y }, { speed: 0 }, 500);

            this.tween.onUpdate(function () {

                console.log(this.speed);

                _this._scrollY(_this._getOriginY() + -this.speed * _this.tween.fps / 1000 * 0.5);
            }).onComplete(function () {});

            this.tween.start();
        }
    }, {
        key: "_stopInertia",
        value: function _stopInertia() {}

        /**
         * 计算当前命中的列表项
         * 说明：以可视区域的下边框为界, 命中的选项高出自身一半，便视为命中
         * 取值范围： start: 0, end: items.length-1
         * @private
         */

    }, {
        key: "_getCurrentIndex",
        value: function _getCurrentIndex() {

            var y = this._getOriginY() - this.defaults.itemHeight;

            var index = Math.round(y / this.defaults.itemHeight);

            //console.log(y%this.defaults.itemHeight);

            return -(index + 1);
        }
    }, {
        key: "_scrollY",
        value: function _scrollY() {
            var y = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;


            if (y > this.defaults.maxTop - this.defaults.offsetHeight) {
                return;
            }

            if (y < this.defaults.minTop - this.defaults.offsetHeight) {
                return;
            }

            this.scrollList.css({
                transform: "translate3d(0, " + (y + this.defaults.offsetHeight) + "px, 0)",
                webkitTransform: "translate3d(0, " + (y + this.defaults.offsetHeight) + "px, 0)"
            });
        }

        /**
         * 获取元素已经滚动的位置
         * @return {*}
         * @private
         */

    }, {
        key: "_getOriginY",
        value: function _getOriginY() {

            // 通过正则将style属性里面的transform3d的y轴值提取出来。例如：translate3d(0px, 50px, 0px)
            var y = /\(.+,\s?([.0-9-]+)(px|rem)?,\s*?[.0-9-]+(px|rem)?\)/.exec(this.scrollList.css("transform"))[1];
            y = parseFloat(y);

            return y ? y - this.defaults.offsetHeight : null;
        }
    }]);

    return Scroll;
}();

exports.default = Scroll;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = "\n<div class=\"ff-picker ff-date-picker\">\n\n    <div class=\"ff-picker-mask\"></div>\n\n    <div class=\"ff-picker-dialog\">\n\n        <!-- header -->\n        <div class=\"ff-picker-head\">\n\n            <a class=\"ff-picker-action\" data-action=\"cancel\" href=\"\">取消</a>\n\n            <a class=\"ff-picker-action\" data-action=\"select\" href=\"\">确定</a>\n\n        </div>\n\n        <!-- body -->\n        <div class=\"ff-picker-body\">\n\n            <div class=\"ff-picker-group ff-picker-scroll\" data-value=\"\">\n                <div class=\"ff-picker-list\">\n                    <div class=\"ff-picker-item\" data-value=\"2012\">2012年</div>\n                    <div class=\"ff-picker-item\" data-value=\"2013\">2013年</div>\n                    <div class=\"ff-picker-item\" data-value=\"2014\">2014年</div>\n                    <div class=\"ff-picker-item\" data-value=\"2015\">2015年</div>\n                    <div class=\"ff-picker-item\" data-value=\"2016\">2016年</div>\n                    <div class=\"ff-picker-item\" data-value=\"2017\">2017年</div>\n                    <div class=\"ff-picker-item\" data-value=\"2018\">2018年</div>\n                    <div class=\"ff-picker-item\" data-value=\"2019\">2019年</div>\n                    <div class=\"ff-picker-item\" data-value=\"2020\">2020年</div>\n                    <div class=\"ff-picker-item\" data-value=\"2021\">2021年</div>\n                    <div class=\"ff-picker-item\" data-value=\"2012\">2012年</div>\n                    <div class=\"ff-picker-item\" data-value=\"2013\">2013年</div>\n                    <div class=\"ff-picker-item\" data-value=\"2014\">2014年</div>\n                    <div class=\"ff-picker-item\" data-value=\"2015\">2015年</div>\n                    <div class=\"ff-picker-item\" data-value=\"2016\">2016年</div>\n                    <div class=\"ff-picker-item\" data-value=\"2017\">2017年</div>\n                    <div class=\"ff-picker-item\" data-value=\"2018\">2018年</div>\n                    <div class=\"ff-picker-item\" data-value=\"2019\">2019年</div>\n                    <div class=\"ff-picker-item\" data-value=\"2020\">2020年</div>\n                    <div class=\"ff-picker-item\" data-value=\"2021\">2021年</div>\n                    <div class=\"ff-picker-item\" data-value=\"2012\">2012年</div>\n                    <div class=\"ff-picker-item\" data-value=\"2013\">2013年</div>\n                    <div class=\"ff-picker-item\" data-value=\"2014\">2014年</div>\n                    <div class=\"ff-picker-item\" data-value=\"2015\">2015年</div>\n                    <div class=\"ff-picker-item\" data-value=\"2016\">2016年</div>\n                    <div class=\"ff-picker-item\" data-value=\"2017\">2017年</div>\n                    <div class=\"ff-picker-item\" data-value=\"2018\">2018年</div>\n                    <div class=\"ff-picker-item\" data-value=\"2019\">2019年</div>\n                    <div class=\"ff-picker-item\" data-value=\"2020\">2020年</div>\n                    <div class=\"ff-picker-item\" data-value=\"2021\">2021年</div>\n                    <div class=\"ff-picker-item\" data-value=\"2012\">2012年</div>\n                    <div class=\"ff-picker-item\" data-value=\"2013\">2013年</div>\n                    <div class=\"ff-picker-item\" data-value=\"2014\">2014年</div>\n                    <div class=\"ff-picker-item\" data-value=\"2015\">2015年</div>\n                    <div class=\"ff-picker-item\" data-value=\"2016\">2016年</div>\n                    <div class=\"ff-picker-item\" data-value=\"2017\">2017年</div>\n                    <div class=\"ff-picker-item\" data-value=\"2018\">2018年</div>\n                    <div class=\"ff-picker-item\" data-value=\"2019\">2019年</div>\n                    <div class=\"ff-picker-item\" data-value=\"2020\">2020年</div>\n                    <div class=\"ff-picker-item\" data-value=\"2021\">2021年</div>\n                    <div class=\"ff-picker-item\" data-value=\"2012\">2012年</div>\n                    <div class=\"ff-picker-item\" data-value=\"2013\">2013年</div>\n                    <div class=\"ff-picker-item\" data-value=\"2014\">2014年</div>\n                    <div class=\"ff-picker-item\" data-value=\"2015\">2015年</div>\n                    <div class=\"ff-picker-item\" data-value=\"2016\">2016年</div>\n                    <div class=\"ff-picker-item\" data-value=\"2017\">2017年</div>\n                    <div class=\"ff-picker-item\" data-value=\"2018\">2018年</div>\n                    <div class=\"ff-picker-item\" data-value=\"2019\">2019年</div>\n                    <div class=\"ff-picker-item\" data-value=\"2020\">2020年</div>\n                    <div class=\"ff-picker-item\" data-value=\"2021\">2021年</div>\n                    <div class=\"ff-picker-item\" data-value=\"2012\">2012年</div>\n                    <div class=\"ff-picker-item\" data-value=\"2013\">2013年</div>\n                    <div class=\"ff-picker-item\" data-value=\"2014\">2014年</div>\n                    <div class=\"ff-picker-item\" data-value=\"2015\">2015年</div>\n                    <div class=\"ff-picker-item\" data-value=\"2016\">2016年</div>\n                    <div class=\"ff-picker-item\" data-value=\"2017\">2017年</div>\n                    <div class=\"ff-picker-item\" data-value=\"2018\">2018年</div>\n                    <div class=\"ff-picker-item\" data-value=\"2019\">2019年</div>\n                    <div class=\"ff-picker-item\" data-value=\"2020\">2020年</div>\n                    <div class=\"ff-picker-item\" data-value=\"2021\">2021年</div>\n\n                </div>\n            </div>\n\n            <div class=\"ff-picker-group ff-picker-scroll\">\n                <div class=\"ff-picker-mask\"></div>\n                <div class=\"ff-picker-area\"></div>\n                <div class=\"ff-picker-list\">\n                    <div class=\"ff-picker-item\">7月</div>\n                    <div class=\"ff-picker-item\">8月</div>\n                    <div class=\"ff-picker-item\">9月</div>\n                    <div class=\"ff-picker-item\">11月</div>\n                    <div class=\"ff-picker-item\">12月</div>\n                </div>\n            </div>\n\n            <div class=\"ff-picker-group ff-picker-scroll\">\n                <div class=\"ff-picker-mask\"></div>\n                <div class=\"ff-picker-area\"></div>\n                <div class=\"ff-picker-list\">\n                    <div class=\"ff-picker-item\">24日</div>\n                    <div class=\"ff-picker-item\">25日</div>\n                    <div class=\"ff-picker-item\">26日</div>\n                    <div class=\"ff-picker-item\">27日</div>\n                    <div class=\"ff-picker-item\">28日</div>\n                </div>\n            </div>\n\n\n        </div>\n\n    </div>\n\n</div>";

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(9);
if (typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(11)(content, {});
if (content.locals) module.exports = content.locals;
// Hot Module Replacement
if (false) {
	// When the styles change, update the <style> tags
	if (!content.locals) {
		module.hot.accept("!!../../node_modules/css-loader/index.js!../../node_modules/sass-loader/lib/loader.js!./datePicker.scss", function () {
			var newContent = require("!!../../node_modules/css-loader/index.js!../../node_modules/sass-loader/lib/loader.js!./datePicker.scss");
			if (typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function () {
		update();
	});
}

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(10)();
// imports


// module
exports.push([module.i, "@charset \"UTF-8\";\n/**\n * 文本溢出隐藏\n */\n/**\n * 按钮边框清除\n */\n/**\n * 浮动清理\n */\n/**\n * 背景图片设置\n */\n/*程序主色调*/\n/**/\n#__bs_notify__ {\n  font-size: 16px; }\n\nbody {\n  -webkit-tap-highlight-color: transparent;\n  -webkit-text-size-adjust: none;\n  -webkit-backface-visibility: hidden;\n  -webkit-font-smoothing: antialiased;\n  font: 12px/1.5 arial, \"\\5FAE\\8F6F\\96C5\\9ED1\"; }\n\na {\n  color: inherit;\n  text-decoration: none; }\n\nli {\n  list-style: none; }\n\n.clearfix:before, .clearfix:after {\n  content: \" \";\n  display: block;\n  clear: both; }\n\n.text-center {\n  text-align: center; }\n\n.text-bold {\n  font-weight: bolder; }\n\nhtml, body {\n  width: 100%;\n  height: 100%; }\n\n.ff-date-picker {\n  position: fixed;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%; }\n  .ff-picker-mask {\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n    background-color: rgba(0, 0, 0, 0.6);\n    z-index: -1; }\n  .ff-picker-dialog {\n    position: absolute;\n    left: 0;\n    bottom: 0;\n    width: 100%;\n    background-color: #fff; }\n  .ff-picker-head {\n    display: flex;\n    padding: .15rem;\n    border-bottom: 1px solid #f5f5f5; }\n    .ff-picker-head .ff-picker-action {\n      flex: 1;\n      text-align: center; }\n      .ff-picker-head .ff-picker-action:first-child {\n        border-right: 1px solid #f5f5f5; }\n  .ff-picker-body {\n    display: flex;\n    padding: .65rem .25rem;\n    font-size: .28rem;\n    text-align: center; }\n    .ff-picker-group {\n      flex: 1;\n      overflow: hidden;\n      position: relative; }\n      .ff-picker-group:before, .ff-picker-group:after {\n        content: \" \";\n        display: block;\n        position: absolute;\n        top: 1rem;\n        left: 0;\n        width: 100%;\n        height: 1px;\n        background-color: #e5e5e5; }\n      .ff-picker-group:after {\n        top: 1.5rem; }\n    .ff-picker-body .ff-picker-list .ff-picker-item {\n      line-height: 0.5rem;\n      color: rgba(65, 65, 65, 0.8); }\n      .ff-picker-body .ff-picker-list .ff-picker-item.active {\n        color: #000; }\n", ""]);

// exports


/***/ }),
/* 10 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function() {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		var result = [];
		for(var i = 0; i < this.length; i++) {
			var item = this[i];
			if(item[2]) {
				result.push("@media " + item[2] + "{" + item[1] + "}");
			} else {
				result.push(item[1]);
			}
		}
		return result.join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};


/***/ }),
/* 11 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
var stylesInDom = {},
	memoize = function(fn) {
		var memo;
		return function () {
			if (typeof memo === "undefined") memo = fn.apply(this, arguments);
			return memo;
		};
	},
	isOldIE = memoize(function() {
		return /msie [6-9]\b/.test(self.navigator.userAgent.toLowerCase());
	}),
	getHeadElement = memoize(function () {
		return document.head || document.getElementsByTagName("head")[0];
	}),
	singletonElement = null,
	singletonCounter = 0,
	styleElementsInsertedAtTop = [];

module.exports = function(list, options) {
	if(typeof DEBUG !== "undefined" && DEBUG) {
		if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};
	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (typeof options.singleton === "undefined") options.singleton = isOldIE();

	// By default, add <style> tags to the bottom of <head>.
	if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

	var styles = listToStyles(list);
	addStylesToDom(styles, options);

	return function update(newList) {
		var mayRemove = [];
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			domStyle.refs--;
			mayRemove.push(domStyle);
		}
		if(newList) {
			var newStyles = listToStyles(newList);
			addStylesToDom(newStyles, options);
		}
		for(var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];
			if(domStyle.refs === 0) {
				for(var j = 0; j < domStyle.parts.length; j++)
					domStyle.parts[j]();
				delete stylesInDom[domStyle.id];
			}
		}
	};
}

function addStylesToDom(styles, options) {
	for(var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];
		if(domStyle) {
			domStyle.refs++;
			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}
			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];
			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}
			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles(list) {
	var styles = [];
	var newStyles = {};
	for(var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};
		if(!newStyles[id])
			styles.push(newStyles[id] = {id: id, parts: [part]});
		else
			newStyles[id].parts.push(part);
	}
	return styles;
}

function insertStyleElement(options, styleElement) {
	var head = getHeadElement();
	var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
	if (options.insertAt === "top") {
		if(!lastStyleElementInsertedAtTop) {
			head.insertBefore(styleElement, head.firstChild);
		} else if(lastStyleElementInsertedAtTop.nextSibling) {
			head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			head.appendChild(styleElement);
		}
		styleElementsInsertedAtTop.push(styleElement);
	} else if (options.insertAt === "bottom") {
		head.appendChild(styleElement);
	} else {
		throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
	}
}

function removeStyleElement(styleElement) {
	styleElement.parentNode.removeChild(styleElement);
	var idx = styleElementsInsertedAtTop.indexOf(styleElement);
	if(idx >= 0) {
		styleElementsInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement(options) {
	var styleElement = document.createElement("style");
	styleElement.type = "text/css";
	insertStyleElement(options, styleElement);
	return styleElement;
}

function createLinkElement(options) {
	var linkElement = document.createElement("link");
	linkElement.rel = "stylesheet";
	insertStyleElement(options, linkElement);
	return linkElement;
}

function addStyle(obj, options) {
	var styleElement, update, remove;

	if (options.singleton) {
		var styleIndex = singletonCounter++;
		styleElement = singletonElement || (singletonElement = createStyleElement(options));
		update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
		remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
	} else if(obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function") {
		styleElement = createLinkElement(options);
		update = updateLink.bind(null, styleElement);
		remove = function() {
			removeStyleElement(styleElement);
			if(styleElement.href)
				URL.revokeObjectURL(styleElement.href);
		};
	} else {
		styleElement = createStyleElement(options);
		update = applyToTag.bind(null, styleElement);
		remove = function() {
			removeStyleElement(styleElement);
		};
	}

	update(obj);

	return function updateStyle(newObj) {
		if(newObj) {
			if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
				return;
			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;
		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag(styleElement, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (styleElement.styleSheet) {
		styleElement.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = styleElement.childNodes;
		if (childNodes[index]) styleElement.removeChild(childNodes[index]);
		if (childNodes.length) {
			styleElement.insertBefore(cssNode, childNodes[index]);
		} else {
			styleElement.appendChild(cssNode);
		}
	}
}

function applyToTag(styleElement, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		styleElement.setAttribute("media", media)
	}

	if(styleElement.styleSheet) {
		styleElement.styleSheet.cssText = css;
	} else {
		while(styleElement.firstChild) {
			styleElement.removeChild(styleElement.firstChild);
		}
		styleElement.appendChild(document.createTextNode(css));
	}
}

function updateLink(linkElement, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	if(sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = linkElement.href;

	linkElement.href = URL.createObjectURL(blob);

	if(oldSrc)
		URL.revokeObjectURL(oldSrc);
}


/***/ })
/******/ ])["default"];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCBmZmZhZDEyNThhMzA1MWE2NTQ1YiIsIndlYnBhY2s6Ly8vKHdlYnBhY2spLXplcHRvL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9Ud2Vlbi9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbGlicy9VdGlscy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvVHdlZW4vcGx1Z2lucy9jc3NQbHVnaW4uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0RhdGVQaWNrZXIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0RhdGVQaWNrZXIvc2Nyb2xsLmpzIiwid2VicGFjazovLy8uL3NyYy9EYXRlUGlja2VyL2RhdGVQaWNrZXIuaHRtbCIsIndlYnBhY2s6Ly8vLi9zcmMvRGF0ZVBpY2tlci9kYXRlUGlja2VyLnNjc3MiLCJ3ZWJwYWNrOi8vLy4vc3JjL0RhdGVQaWNrZXIvZGF0ZVBpY2tlci5zY3NzP2E1ZmEiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvYWRkU3R5bGVzLmpzIl0sIm5hbWVzIjpbIlR3ZWVuVHlwZSIsIkxpbmVhciIsInQiLCJiIiwiYyIsImQiLCJRdWFkIiwiZWFzZUluIiwiZWFzZU91dCIsImVhc2VJbk91dCIsIkN1YmljIiwiUXVhcnQiLCJRdWludCIsIlNpbmUiLCJNYXRoIiwiY29zIiwiUEkiLCJzaW4iLCJFeHBvIiwicG93IiwiQ2lyYyIsInNxcnQiLCJFbGFzdGljIiwiYSIsInAiLCJzIiwiYWJzIiwiYXNpbiIsIkJhY2siLCJCb3VuY2UiLCJyZXF1ZXN0QW5pbWF0aW9uRnJhbWUiLCJ3aW5kb3ciLCJ3ZWJraXRSZXF1ZXN0QW5pbWF0aW9uRnJhbWUiLCJUd2VlbiIsInRhcmdldCIsImZyb21Qcm9wcyIsInRvUHJvcHMiLCJkdXJhdGlvbiIsImVhc2UiLCJfZXZlbnRzIiwib25VcGRhdGUiLCJvbkNvbXBsZXRlIiwiY2xvbmUiLCJfZnJvbVByb3BzT3JpZ2luIiwiX3J1bm5pbmciLCJwbHVnaW5zIiwiZm9yRWFjaCIsInBsdWdpbiIsImluZGV4IiwiaXNTdXBwb3J0IiwiX3BsdWdpbkluZGV4IiwiaXNVbmRlZmluZWQiLCJjb25zb2xlIiwiaW5mbyIsIm5hbWUiLCJjYWxsYmFjayIsIl9ydW5uaW5nVGltZSIsImZwcyIsIl91cGRhdGUiLCJiaW5kIiwiX3N0YXJ0VGltZSIsIm5vdyIsIl9sYXN0VGltZSIsInN0b3AiLCJfZml4ZWRJbkVuZCIsImNhbGwiLCJPYmplY3QiLCJrZXlzIiwicHJvcCIsIkVhc2UiLCJpIiwiaGFzT3duUHJvcGVydHkiLCJ0d2VlbiIsInRlc3RlciIsInBsYXllciIsImRvY3VtZW50IiwiY3JlYXRlRWxlbWVudCIsImluaXQiLCJjbGFzc05hbWUiLCJzdHlsZSIsInBvc2l0aW9uIiwidG9wIiwibGVmdCIsIndpZHRoIiwiaGVpZ2h0IiwiYmFja2dyb3VuZCIsImJvcmRlclJhZGl1cyIsInpJbmRleCIsImJvZHkiLCJhcHBlbmRDaGlsZCIsInRvIiwieCIsInkiLCJpbm5lcldpZHRoIiwiaW5uZXJIZWlnaHQiLCJsb2ciLCJVdGlscyIsIkFycmF5IiwiaXNBcnJheSIsImlzTnVtYmVyIiwibGVuZ3RoIiwiaXNGdW5jdGlvbiIsImlzTGlrZUFycmF5IiwicHJvdG90eXBlIiwidGFyZ2V0QXJyYXkiLCJuZXdBcnJheSIsImVsZSIsImlzTnVsbCIsImNsb25lQXJyYXkiLCJfY2xvbmVBcnJheSIsIm5ld1RhcmdldCIsImNzc1BsdWdpbiIsInZlcnNpb24iLCJIVE1MRWxlbWVudCIsIl9zdXBwb3J0TGlzdCIsIl9zdXBwb3J0TWVyZ2VMaXN0IiwiX2V4YW1wbGUiLCJ2YWx1ZSIsInVuaXQiLCJodG1sRWxlVGFyZ2V0IiwiX3BhcnNlIiwiX3BhcnNlUHJvcHMiLCJwcm9wcyIsInN0eWxlRGljdCIsIiQiLCJEYXRlUGlja2VyIiwiaW5zZXJ0QWRqYWNlbnRIVE1MIiwiZWFjaCIsImUiLCJlbCIsIm1vZHVsZSIsImV4cG9ydHMiLCJTY3JvbGwiLCJvcHRpb25zIiwiZGVmYXVsdHMiLCJleHRlbmQiLCJvbkNoYW5nZSIsIml0ZW1zIiwiaXRlbUhlaWdodCIsIm9mZnNldCIsIm9mZnNldEhlaWdodCIsInNob3dDb3VudCIsInNjcm9sbFdyYXBwZXIiLCJzY3JvbGxMaXN0IiwiZmluZCIsInNjcm9sbExpc3RJdGVtIiwibWF4VG9wIiwibWluVG9wIiwiX3Njcm9sbFkiLCJfaW5pdCIsIl90aGlzIiwiZXEiLCJhZGRDbGFzcyIsInNpYmxpbmdzIiwicmVtb3ZlQ2xhc3MiLCJzdGFydFkiLCJlbmRZIiwib3JpZ2luWSIsInNwZWVkUmVjb3JkIiwiX3ByZXZUaW1lIiwiX3ByZXZZIiwiX3NwZWVkIiwic3RhcnQiLCJsYXN0VGltZSIsImxhc3RZIiwiZ28iLCJpbnRlcnZhbCIsImdldFNwZWVkIiwib24iLCJldmVudCIsImNoYW5nZWRUb3VjaGVzIiwicGFnZVkiLCJfZ2V0T3JpZ2luWSIsInR5cGUiLCJwcmV2ZW50RGVmYXVsdCIsIl9zdGFydEluZXJ0aWEiLCJzcGVlZCIsInJvdW5kIiwiY3NzIiwidHJhbnNmb3JtIiwid2Via2l0VHJhbnNmb3JtIiwiZXhlYyIsInBhcnNlRmxvYXQiLCJjb250ZW50IiwicmVxdWlyZSIsInVwZGF0ZSIsImxvY2FscyIsImhvdCIsImFjY2VwdCIsIm5ld0NvbnRlbnQiLCJpZCIsImRpc3Bvc2UiXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCxPO0FDVkE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7QUM3REE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLGlCQUFpQjtBQUN4QyxpQkFBaUIsNEdBQTRHO0FBQzdIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxtQkFBbUI7QUFDbkI7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsdUJBQXVCOztBQUV2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsOEJBQThCO0FBQzlCLDhCQUE4QjtBQUM5Qiw4QkFBOEI7QUFDOUIsOEJBQThCO0FBQzlCO0FBQ0E7QUFDQTtBQUNBLDJCQUEyQjs7QUFFM0IsMkJBQTJCLDBDQUEwQyxzQkFBc0I7QUFDM0YsMkJBQTJCO0FBQzNCLDJCQUEyQixvREFBb0Qsc0NBQXNDO0FBQ3JIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQXlCLCtDQUErQyxvQ0FBb0M7O0FBRTVHO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsK0NBQStDLHNDQUFzQztBQUNyRjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0JBQStCLDRCQUE0QjtBQUMzRDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FB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QUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLDBDQUEwQyx5Q0FBeUM7QUFDbkY7QUFDQTtBQUNBOztBQUVBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUCxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsQ0FBQzs7QUFFRCxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFD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QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBOztBQUVBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdURBQXVEO0FBQ3ZEOztBQUVBLDZCQUE2QixtQkFBbUI7O0FBRWhEOztBQUVBOztBQUVBO0FBQ0E7QUFDQSIsImZpbGUiOiJEYXRlUGlja2VyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW10sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1wiRGF0ZVBpY2tlclwiXSA9IGZhY3RvcnkoKTtcblx0ZWxzZVxuXHRcdHJvb3RbXCJEYXRlUGlja2VyXCJdID0gZmFjdG9yeSgpO1xufSkodGhpcywgZnVuY3Rpb24oKSB7XG5yZXR1cm4gXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbiIsIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi9idWlsZC9cIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSA1KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCBmZmZhZDEyNThhMzA1MWE2NTQ1YiIsIi8qIFplcHRvIHYxLjEuNiAtIHplcHRvIGV2ZW50IGFqYXggZm9ybSBpZSAtIHplcHRvanMuY29tL2xpY2Vuc2UgKi9cblxudmFyIFplcHRvID0gbW9kdWxlLmV4cG9ydHMgPSAoZnVuY3Rpb24oKSB7XG4gIHZhciB1bmRlZmluZWQsIGtleSwgJCwgY2xhc3NMaXN0LCBlbXB0eUFycmF5ID0gW10sIHNsaWNlID0gZW1wdHlBcnJheS5zbGljZSwgZmlsdGVyID0gZW1wdHlBcnJheS5maWx0ZXIsXG4gICAgZG9jdW1lbnQgPSB3aW5kb3cuZG9jdW1lbnQsXG4gICAgZWxlbWVudERpc3BsYXkgPSB7fSwgY2xhc3NDYWNoZSA9IHt9LFxuICAgIGNzc051bWJlciA9IHsgJ2NvbHVtbi1jb3VudCc6IDEsICdjb2x1bW5zJzogMSwgJ2ZvbnQtd2VpZ2h0JzogMSwgJ2xpbmUtaGVpZ2h0JzogMSwnb3BhY2l0eSc6IDEsICd6LWluZGV4JzogMSwgJ3pvb20nOiAxIH0sXG4gICAgZnJhZ21lbnRSRSA9IC9eXFxzKjwoXFx3K3whKVtePl0qPi8sXG4gICAgc2luZ2xlVGFnUkUgPSAvXjwoXFx3KylcXHMqXFwvPz4oPzo8XFwvXFwxPnwpJC8sXG4gICAgdGFnRXhwYW5kZXJSRSA9IC88KD8hYXJlYXxicnxjb2x8ZW1iZWR8aHJ8aW1nfGlucHV0fGxpbmt8bWV0YXxwYXJhbSkoKFtcXHc6XSspW14+XSopXFwvPi9pZyxcbiAgICByb290Tm9kZVJFID0gL14oPzpib2R5fGh0bWwpJC9pLFxuICAgIGNhcGl0YWxSRSA9IC8oW0EtWl0pL2csXG5cbiAgICAvLyBzcGVjaWFsIGF0dHJpYnV0ZXMgdGhhdCBzaG91bGQgYmUgZ2V0L3NldCB2aWEgbWV0aG9kIGNhbGxzXG4gICAgbWV0aG9kQXR0cmlidXRlcyA9IFsndmFsJywgJ2NzcycsICdodG1sJywgJ3RleHQnLCAnZGF0YScsICd3aWR0aCcsICdoZWlnaHQnLCAnb2Zmc2V0J10sXG5cbiAgICBhZGphY2VuY3lPcGVyYXRvcnMgPSBbICdhZnRlcicsICdwcmVwZW5kJywgJ2JlZm9yZScsICdhcHBlbmQnIF0sXG4gICAgdGFibGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0YWJsZScpLFxuICAgIHRhYmxlUm93ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndHInKSxcbiAgICBjb250YWluZXJzID0ge1xuICAgICAgJ3RyJzogZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGJvZHknKSxcbiAgICAgICd0Ym9keSc6IHRhYmxlLCAndGhlYWQnOiB0YWJsZSwgJ3Rmb290JzogdGFibGUsXG4gICAgICAndGQnOiB0YWJsZVJvdywgJ3RoJzogdGFibGVSb3csXG4gICAgICAnKic6IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgfSxcbiAgICByZWFkeVJFID0gL2NvbXBsZXRlfGxvYWRlZHxpbnRlcmFjdGl2ZS8sXG4gICAgc2ltcGxlU2VsZWN0b3JSRSA9IC9eW1xcdy1dKiQvLFxuICAgIGNsYXNzMnR5cGUgPSB7fSxcbiAgICB0b1N0cmluZyA9IGNsYXNzMnR5cGUudG9TdHJpbmcsXG4gICAgemVwdG8gPSB7fSxcbiAgICBjYW1lbGl6ZSwgdW5pcSxcbiAgICB0ZW1wUGFyZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JyksXG4gICAgcHJvcE1hcCA9IHtcbiAgICAgICd0YWJpbmRleCc6ICd0YWJJbmRleCcsXG4gICAgICAncmVhZG9ubHknOiAncmVhZE9ubHknLFxuICAgICAgJ2Zvcic6ICdodG1sRm9yJyxcbiAgICAgICdjbGFzcyc6ICdjbGFzc05hbWUnLFxuICAgICAgJ21heGxlbmd0aCc6ICdtYXhMZW5ndGgnLFxuICAgICAgJ2NlbGxzcGFjaW5nJzogJ2NlbGxTcGFjaW5nJyxcbiAgICAgICdjZWxscGFkZGluZyc6ICdjZWxsUGFkZGluZycsXG4gICAgICAncm93c3Bhbic6ICdyb3dTcGFuJyxcbiAgICAgICdjb2xzcGFuJzogJ2NvbFNwYW4nLFxuICAgICAgJ3VzZW1hcCc6ICd1c2VNYXAnLFxuICAgICAgJ2ZyYW1lYm9yZGVyJzogJ2ZyYW1lQm9yZGVyJyxcbiAgICAgICdjb250ZW50ZWRpdGFibGUnOiAnY29udGVudEVkaXRhYmxlJ1xuICAgIH0sXG4gICAgaXNBcnJheSA9IEFycmF5LmlzQXJyYXkgfHxcbiAgICAgIGZ1bmN0aW9uKG9iamVjdCl7IHJldHVybiBvYmplY3QgaW5zdGFuY2VvZiBBcnJheSB9XG5cbiAgemVwdG8ubWF0Y2hlcyA9IGZ1bmN0aW9uKGVsZW1lbnQsIHNlbGVjdG9yKSB7XG4gICAgaWYgKCFzZWxlY3RvciB8fCAhZWxlbWVudCB8fCBlbGVtZW50Lm5vZGVUeXBlICE9PSAxKSByZXR1cm4gZmFsc2VcbiAgICB2YXIgbWF0Y2hlc1NlbGVjdG9yID0gZWxlbWVudC53ZWJraXRNYXRjaGVzU2VsZWN0b3IgfHwgZWxlbWVudC5tb3pNYXRjaGVzU2VsZWN0b3IgfHxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgZWxlbWVudC5vTWF0Y2hlc1NlbGVjdG9yIHx8IGVsZW1lbnQubWF0Y2hlc1NlbGVjdG9yXG4gICAgaWYgKG1hdGNoZXNTZWxlY3RvcikgcmV0dXJuIG1hdGNoZXNTZWxlY3Rvci5jYWxsKGVsZW1lbnQsIHNlbGVjdG9yKVxuICAgIC8vIGZhbGwgYmFjayB0byBwZXJmb3JtaW5nIGEgc2VsZWN0b3I6XG4gICAgdmFyIG1hdGNoLCBwYXJlbnQgPSBlbGVtZW50LnBhcmVudE5vZGUsIHRlbXAgPSAhcGFyZW50XG4gICAgaWYgKHRlbXApIChwYXJlbnQgPSB0ZW1wUGFyZW50KS5hcHBlbmRDaGlsZChlbGVtZW50KVxuICAgIG1hdGNoID0gfnplcHRvLnFzYShwYXJlbnQsIHNlbGVjdG9yKS5pbmRleE9mKGVsZW1lbnQpXG4gICAgdGVtcCAmJiB0ZW1wUGFyZW50LnJlbW92ZUNoaWxkKGVsZW1lbnQpXG4gICAgcmV0dXJuIG1hdGNoXG4gIH1cblxuICBmdW5jdGlvbiB0eXBlKG9iaikge1xuICAgIHJldHVybiBvYmogPT0gbnVsbCA/IFN0cmluZyhvYmopIDpcbiAgICAgIGNsYXNzMnR5cGVbdG9TdHJpbmcuY2FsbChvYmopXSB8fCBcIm9iamVjdFwiXG4gIH1cblxuICBmdW5jdGlvbiBpc0Z1bmN0aW9uKHZhbHVlKSB7IHJldHVybiB0eXBlKHZhbHVlKSA9PSBcImZ1bmN0aW9uXCIgfVxuICBmdW5jdGlvbiBpc1dpbmRvdyhvYmopICAgICB7IHJldHVybiBvYmogIT0gbnVsbCAmJiBvYmogPT0gb2JqLndpbmRvdyB9XG4gIGZ1bmN0aW9uIGlzRG9jdW1lbnQob2JqKSAgIHsgcmV0dXJuIG9iaiAhPSBudWxsICYmIG9iai5ub2RlVHlwZSA9PSBvYmouRE9DVU1FTlRfTk9ERSB9XG4gIGZ1bmN0aW9uIGlzT2JqZWN0KG9iaikgICAgIHsgcmV0dXJuIHR5cGUob2JqKSA9PSBcIm9iamVjdFwiIH1cbiAgZnVuY3Rpb24gaXNQbGFpbk9iamVjdChvYmopIHtcbiAgICByZXR1cm4gaXNPYmplY3Qob2JqKSAmJiAhaXNXaW5kb3cob2JqKSAmJiBPYmplY3QuZ2V0UHJvdG90eXBlT2Yob2JqKSA9PSBPYmplY3QucHJvdG90eXBlXG4gIH1cbiAgZnVuY3Rpb24gbGlrZUFycmF5KG9iaikgeyByZXR1cm4gdHlwZW9mIG9iai5sZW5ndGggPT0gJ251bWJlcicgfVxuXG4gIGZ1bmN0aW9uIGNvbXBhY3QoYXJyYXkpIHsgcmV0dXJuIGZpbHRlci5jYWxsKGFycmF5LCBmdW5jdGlvbihpdGVtKXsgcmV0dXJuIGl0ZW0gIT0gbnVsbCB9KSB9XG4gIGZ1bmN0aW9uIGZsYXR0ZW4oYXJyYXkpIHsgcmV0dXJuIGFycmF5Lmxlbmd0aCA+IDAgPyAkLmZuLmNvbmNhdC5hcHBseShbXSwgYXJyYXkpIDogYXJyYXkgfVxuICBjYW1lbGl6ZSA9IGZ1bmN0aW9uKHN0cil7IHJldHVybiBzdHIucmVwbGFjZSgvLSsoLik/L2csIGZ1bmN0aW9uKG1hdGNoLCBjaHIpeyByZXR1cm4gY2hyID8gY2hyLnRvVXBwZXJDYXNlKCkgOiAnJyB9KSB9XG4gIGZ1bmN0aW9uIGRhc2hlcml6ZShzdHIpIHtcbiAgICByZXR1cm4gc3RyLnJlcGxhY2UoLzo6L2csICcvJylcbiAgICAgICAgICAgLnJlcGxhY2UoLyhbQS1aXSspKFtBLVpdW2Etel0pL2csICckMV8kMicpXG4gICAgICAgICAgIC5yZXBsYWNlKC8oW2EtelxcZF0pKFtBLVpdKS9nLCAnJDFfJDInKVxuICAgICAgICAgICAucmVwbGFjZSgvXy9nLCAnLScpXG4gICAgICAgICAgIC50b0xvd2VyQ2FzZSgpXG4gIH1cbiAgdW5pcSA9IGZ1bmN0aW9uKGFycmF5KXsgcmV0dXJuIGZpbHRlci5jYWxsKGFycmF5LCBmdW5jdGlvbihpdGVtLCBpZHgpeyByZXR1cm4gYXJyYXkuaW5kZXhPZihpdGVtKSA9PSBpZHggfSkgfVxuXG4gIGZ1bmN0aW9uIGNsYXNzUkUobmFtZSkge1xuICAgIHJldHVybiBuYW1lIGluIGNsYXNzQ2FjaGUgP1xuICAgICAgY2xhc3NDYWNoZVtuYW1lXSA6IChjbGFzc0NhY2hlW25hbWVdID0gbmV3IFJlZ0V4cCgnKF58XFxcXHMpJyArIG5hbWUgKyAnKFxcXFxzfCQpJykpXG4gIH1cblxuICBmdW5jdGlvbiBtYXliZUFkZFB4KG5hbWUsIHZhbHVlKSB7XG4gICAgcmV0dXJuICh0eXBlb2YgdmFsdWUgPT0gXCJudW1iZXJcIiAmJiAhY3NzTnVtYmVyW2Rhc2hlcml6ZShuYW1lKV0pID8gdmFsdWUgKyBcInB4XCIgOiB2YWx1ZVxuICB9XG5cbiAgZnVuY3Rpb24gZGVmYXVsdERpc3BsYXkobm9kZU5hbWUpIHtcbiAgICB2YXIgZWxlbWVudCwgZGlzcGxheVxuICAgIGlmICghZWxlbWVudERpc3BsYXlbbm9kZU5hbWVdKSB7XG4gICAgICBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChub2RlTmFtZSlcbiAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoZWxlbWVudClcbiAgICAgIGRpc3BsYXkgPSBnZXRDb21wdXRlZFN0eWxlKGVsZW1lbnQsICcnKS5nZXRQcm9wZXJ0eVZhbHVlKFwiZGlzcGxheVwiKVxuICAgICAgZWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGVsZW1lbnQpXG4gICAgICBkaXNwbGF5ID09IFwibm9uZVwiICYmIChkaXNwbGF5ID0gXCJibG9ja1wiKVxuICAgICAgZWxlbWVudERpc3BsYXlbbm9kZU5hbWVdID0gZGlzcGxheVxuICAgIH1cbiAgICByZXR1cm4gZWxlbWVudERpc3BsYXlbbm9kZU5hbWVdXG4gIH1cblxuICBmdW5jdGlvbiBjaGlsZHJlbihlbGVtZW50KSB7XG4gICAgcmV0dXJuICdjaGlsZHJlbicgaW4gZWxlbWVudCA/XG4gICAgICBzbGljZS5jYWxsKGVsZW1lbnQuY2hpbGRyZW4pIDpcbiAgICAgICQubWFwKGVsZW1lbnQuY2hpbGROb2RlcywgZnVuY3Rpb24obm9kZSl7IGlmIChub2RlLm5vZGVUeXBlID09IDEpIHJldHVybiBub2RlIH0pXG4gIH1cblxuICAvLyBgJC56ZXB0by5mcmFnbWVudGAgdGFrZXMgYSBodG1sIHN0cmluZyBhbmQgYW4gb3B0aW9uYWwgdGFnIG5hbWVcbiAgLy8gdG8gZ2VuZXJhdGUgRE9NIG5vZGVzIG5vZGVzIGZyb20gdGhlIGdpdmVuIGh0bWwgc3RyaW5nLlxuICAvLyBUaGUgZ2VuZXJhdGVkIERPTSBub2RlcyBhcmUgcmV0dXJuZWQgYXMgYW4gYXJyYXkuXG4gIC8vIFRoaXMgZnVuY3Rpb24gY2FuIGJlIG92ZXJyaWRlbiBpbiBwbHVnaW5zIGZvciBleGFtcGxlIHRvIG1ha2VcbiAgLy8gaXQgY29tcGF0aWJsZSB3aXRoIGJyb3dzZXJzIHRoYXQgZG9uJ3Qgc3VwcG9ydCB0aGUgRE9NIGZ1bGx5LlxuICB6ZXB0by5mcmFnbWVudCA9IGZ1bmN0aW9uKGh0bWwsIG5hbWUsIHByb3BlcnRpZXMpIHtcbiAgICB2YXIgZG9tLCBub2RlcywgY29udGFpbmVyXG5cbiAgICAvLyBBIHNwZWNpYWwgY2FzZSBvcHRpbWl6YXRpb24gZm9yIGEgc2luZ2xlIHRhZ1xuICAgIGlmIChzaW5nbGVUYWdSRS50ZXN0KGh0bWwpKSBkb20gPSAkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoUmVnRXhwLiQxKSlcblxuICAgIGlmICghZG9tKSB7XG4gICAgICBpZiAoaHRtbC5yZXBsYWNlKSBodG1sID0gaHRtbC5yZXBsYWNlKHRhZ0V4cGFuZGVyUkUsIFwiPCQxPjwvJDI+XCIpXG4gICAgICBpZiAobmFtZSA9PT0gdW5kZWZpbmVkKSBuYW1lID0gZnJhZ21lbnRSRS50ZXN0KGh0bWwpICYmIFJlZ0V4cC4kMVxuICAgICAgaWYgKCEobmFtZSBpbiBjb250YWluZXJzKSkgbmFtZSA9ICcqJ1xuXG4gICAgICBjb250YWluZXIgPSBjb250YWluZXJzW25hbWVdXG4gICAgICBjb250YWluZXIuaW5uZXJIVE1MID0gJycgKyBodG1sXG4gICAgICBkb20gPSAkLmVhY2goc2xpY2UuY2FsbChjb250YWluZXIuY2hpbGROb2RlcyksIGZ1bmN0aW9uKCl7XG4gICAgICAgIGNvbnRhaW5lci5yZW1vdmVDaGlsZCh0aGlzKVxuICAgICAgfSlcbiAgICB9XG5cbiAgICBpZiAoaXNQbGFpbk9iamVjdChwcm9wZXJ0aWVzKSkge1xuICAgICAgbm9kZXMgPSAkKGRvbSlcbiAgICAgICQuZWFjaChwcm9wZXJ0aWVzLCBmdW5jdGlvbihrZXksIHZhbHVlKSB7XG4gICAgICAgIGlmIChtZXRob2RBdHRyaWJ1dGVzLmluZGV4T2Yoa2V5KSA+IC0xKSBub2Rlc1trZXldKHZhbHVlKVxuICAgICAgICBlbHNlIG5vZGVzLmF0dHIoa2V5LCB2YWx1ZSlcbiAgICAgIH0pXG4gICAgfVxuXG4gICAgcmV0dXJuIGRvbVxuICB9XG5cbiAgLy8gYCQuemVwdG8uWmAgc3dhcHMgb3V0IHRoZSBwcm90b3R5cGUgb2YgdGhlIGdpdmVuIGBkb21gIGFycmF5XG4gIC8vIG9mIG5vZGVzIHdpdGggYCQuZm5gIGFuZCB0aHVzIHN1cHBseWluZyBhbGwgdGhlIFplcHRvIGZ1bmN0aW9uc1xuICAvLyB0byB0aGUgYXJyYXkuIE5vdGUgdGhhdCBgX19wcm90b19fYCBpcyBub3Qgc3VwcG9ydGVkIG9uIEludGVybmV0XG4gIC8vIEV4cGxvcmVyLiBUaGlzIG1ldGhvZCBjYW4gYmUgb3ZlcnJpZGVuIGluIHBsdWdpbnMuXG4gIHplcHRvLlogPSBmdW5jdGlvbihkb20sIHNlbGVjdG9yKSB7XG4gICAgZG9tID0gZG9tIHx8IFtdXG4gICAgZG9tLl9fcHJvdG9fXyA9ICQuZm5cbiAgICBkb20uc2VsZWN0b3IgPSBzZWxlY3RvciB8fCAnJ1xuICAgIHJldHVybiBkb21cbiAgfVxuXG4gIC8vIGAkLnplcHRvLmlzWmAgc2hvdWxkIHJldHVybiBgdHJ1ZWAgaWYgdGhlIGdpdmVuIG9iamVjdCBpcyBhIFplcHRvXG4gIC8vIGNvbGxlY3Rpb24uIFRoaXMgbWV0aG9kIGNhbiBiZSBvdmVycmlkZW4gaW4gcGx1Z2lucy5cbiAgemVwdG8uaXNaID0gZnVuY3Rpb24ob2JqZWN0KSB7XG4gICAgcmV0dXJuIG9iamVjdCBpbnN0YW5jZW9mIHplcHRvLlpcbiAgfVxuXG4gIC8vIGAkLnplcHRvLmluaXRgIGlzIFplcHRvJ3MgY291bnRlcnBhcnQgdG8galF1ZXJ5J3MgYCQuZm4uaW5pdGAgYW5kXG4gIC8vIHRha2VzIGEgQ1NTIHNlbGVjdG9yIGFuZCBhbiBvcHRpb25hbCBjb250ZXh0IChhbmQgaGFuZGxlcyB2YXJpb3VzXG4gIC8vIHNwZWNpYWwgY2FzZXMpLlxuICAvLyBUaGlzIG1ldGhvZCBjYW4gYmUgb3ZlcnJpZGVuIGluIHBsdWdpbnMuXG4gIHplcHRvLmluaXQgPSBmdW5jdGlvbihzZWxlY3RvciwgY29udGV4dCkge1xuICAgIHZhciBkb21cbiAgICAvLyBJZiBub3RoaW5nIGdpdmVuLCByZXR1cm4gYW4gZW1wdHkgWmVwdG8gY29sbGVjdGlvblxuICAgIGlmICghc2VsZWN0b3IpIHJldHVybiB6ZXB0by5aKClcbiAgICAvLyBPcHRpbWl6ZSBmb3Igc3RyaW5nIHNlbGVjdG9yc1xuICAgIGVsc2UgaWYgKHR5cGVvZiBzZWxlY3RvciA9PSAnc3RyaW5nJykge1xuICAgICAgc2VsZWN0b3IgPSBzZWxlY3Rvci50cmltKClcbiAgICAgIC8vIElmIGl0J3MgYSBodG1sIGZyYWdtZW50LCBjcmVhdGUgbm9kZXMgZnJvbSBpdFxuICAgICAgLy8gTm90ZTogSW4gYm90aCBDaHJvbWUgMjEgYW5kIEZpcmVmb3ggMTUsIERPTSBlcnJvciAxMlxuICAgICAgLy8gaXMgdGhyb3duIGlmIHRoZSBmcmFnbWVudCBkb2Vzbid0IGJlZ2luIHdpdGggPFxuICAgICAgaWYgKHNlbGVjdG9yWzBdID09ICc8JyAmJiBmcmFnbWVudFJFLnRlc3Qoc2VsZWN0b3IpKVxuICAgICAgICBkb20gPSB6ZXB0by5mcmFnbWVudChzZWxlY3RvciwgUmVnRXhwLiQxLCBjb250ZXh0KSwgc2VsZWN0b3IgPSBudWxsXG4gICAgICAvLyBJZiB0aGVyZSdzIGEgY29udGV4dCwgY3JlYXRlIGEgY29sbGVjdGlvbiBvbiB0aGF0IGNvbnRleHQgZmlyc3QsIGFuZCBzZWxlY3RcbiAgICAgIC8vIG5vZGVzIGZyb20gdGhlcmVcbiAgICAgIGVsc2UgaWYgKGNvbnRleHQgIT09IHVuZGVmaW5lZCkgcmV0dXJuICQoY29udGV4dCkuZmluZChzZWxlY3RvcilcbiAgICAgIC8vIElmIGl0J3MgYSBDU1Mgc2VsZWN0b3IsIHVzZSBpdCB0byBzZWxlY3Qgbm9kZXMuXG4gICAgICBlbHNlIGRvbSA9IHplcHRvLnFzYShkb2N1bWVudCwgc2VsZWN0b3IpXG4gICAgfVxuICAgIC8vIElmIGEgZnVuY3Rpb24gaXMgZ2l2ZW4sIGNhbGwgaXQgd2hlbiB0aGUgRE9NIGlzIHJlYWR5XG4gICAgZWxzZSBpZiAoaXNGdW5jdGlvbihzZWxlY3RvcikpIHJldHVybiAkKGRvY3VtZW50KS5yZWFkeShzZWxlY3RvcilcbiAgICAvLyBJZiBhIFplcHRvIGNvbGxlY3Rpb24gaXMgZ2l2ZW4sIGp1c3QgcmV0dXJuIGl0XG4gICAgZWxzZSBpZiAoemVwdG8uaXNaKHNlbGVjdG9yKSkgcmV0dXJuIHNlbGVjdG9yXG4gICAgZWxzZSB7XG4gICAgICAvLyBub3JtYWxpemUgYXJyYXkgaWYgYW4gYXJyYXkgb2Ygbm9kZXMgaXMgZ2l2ZW5cbiAgICAgIGlmIChpc0FycmF5KHNlbGVjdG9yKSkgZG9tID0gY29tcGFjdChzZWxlY3RvcilcbiAgICAgIC8vIFdyYXAgRE9NIG5vZGVzLlxuICAgICAgZWxzZSBpZiAoaXNPYmplY3Qoc2VsZWN0b3IpKVxuICAgICAgICBkb20gPSBbc2VsZWN0b3JdLCBzZWxlY3RvciA9IG51bGxcbiAgICAgIC8vIElmIGl0J3MgYSBodG1sIGZyYWdtZW50LCBjcmVhdGUgbm9kZXMgZnJvbSBpdFxuICAgICAgZWxzZSBpZiAoZnJhZ21lbnRSRS50ZXN0KHNlbGVjdG9yKSlcbiAgICAgICAgZG9tID0gemVwdG8uZnJhZ21lbnQoc2VsZWN0b3IudHJpbSgpLCBSZWdFeHAuJDEsIGNvbnRleHQpLCBzZWxlY3RvciA9IG51bGxcbiAgICAgIC8vIElmIHRoZXJlJ3MgYSBjb250ZXh0LCBjcmVhdGUgYSBjb2xsZWN0aW9uIG9uIHRoYXQgY29udGV4dCBmaXJzdCwgYW5kIHNlbGVjdFxuICAgICAgLy8gbm9kZXMgZnJvbSB0aGVyZVxuICAgICAgZWxzZSBpZiAoY29udGV4dCAhPT0gdW5kZWZpbmVkKSByZXR1cm4gJChjb250ZXh0KS5maW5kKHNlbGVjdG9yKVxuICAgICAgLy8gQW5kIGxhc3QgYnV0IG5vIGxlYXN0LCBpZiBpdCdzIGEgQ1NTIHNlbGVjdG9yLCB1c2UgaXQgdG8gc2VsZWN0IG5vZGVzLlxuICAgICAgZWxzZSBkb20gPSB6ZXB0by5xc2EoZG9jdW1lbnQsIHNlbGVjdG9yKVxuICAgIH1cbiAgICAvLyBjcmVhdGUgYSBuZXcgWmVwdG8gY29sbGVjdGlvbiBmcm9tIHRoZSBub2RlcyBmb3VuZFxuICAgIHJldHVybiB6ZXB0by5aKGRvbSwgc2VsZWN0b3IpXG4gIH1cblxuICAvLyBgJGAgd2lsbCBiZSB0aGUgYmFzZSBgWmVwdG9gIG9iamVjdC4gV2hlbiBjYWxsaW5nIHRoaXNcbiAgLy8gZnVuY3Rpb24ganVzdCBjYWxsIGAkLnplcHRvLmluaXQsIHdoaWNoIG1ha2VzIHRoZSBpbXBsZW1lbnRhdGlvblxuICAvLyBkZXRhaWxzIG9mIHNlbGVjdGluZyBub2RlcyBhbmQgY3JlYXRpbmcgWmVwdG8gY29sbGVjdGlvbnNcbiAgLy8gcGF0Y2hhYmxlIGluIHBsdWdpbnMuXG4gICQgPSBmdW5jdGlvbihzZWxlY3RvciwgY29udGV4dCl7XG4gICAgcmV0dXJuIHplcHRvLmluaXQoc2VsZWN0b3IsIGNvbnRleHQpXG4gIH1cblxuICBmdW5jdGlvbiBleHRlbmQodGFyZ2V0LCBzb3VyY2UsIGRlZXApIHtcbiAgICBmb3IgKGtleSBpbiBzb3VyY2UpXG4gICAgICBpZiAoZGVlcCAmJiAoaXNQbGFpbk9iamVjdChzb3VyY2Vba2V5XSkgfHwgaXNBcnJheShzb3VyY2Vba2V5XSkpKSB7XG4gICAgICAgIGlmIChpc1BsYWluT2JqZWN0KHNvdXJjZVtrZXldKSAmJiAhaXNQbGFpbk9iamVjdCh0YXJnZXRba2V5XSkpXG4gICAgICAgICAgdGFyZ2V0W2tleV0gPSB7fVxuICAgICAgICBpZiAoaXNBcnJheShzb3VyY2Vba2V5XSkgJiYgIWlzQXJyYXkodGFyZ2V0W2tleV0pKVxuICAgICAgICAgIHRhcmdldFtrZXldID0gW11cbiAgICAgICAgZXh0ZW5kKHRhcmdldFtrZXldLCBzb3VyY2Vba2V5XSwgZGVlcClcbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKHNvdXJjZVtrZXldICE9PSB1bmRlZmluZWQpIHRhcmdldFtrZXldID0gc291cmNlW2tleV1cbiAgfVxuXG4gIC8vIENvcHkgYWxsIGJ1dCB1bmRlZmluZWQgcHJvcGVydGllcyBmcm9tIG9uZSBvciBtb3JlXG4gIC8vIG9iamVjdHMgdG8gdGhlIGB0YXJnZXRgIG9iamVjdC5cbiAgJC5leHRlbmQgPSBmdW5jdGlvbih0YXJnZXQpe1xuICAgIHZhciBkZWVwLCBhcmdzID0gc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpXG4gICAgaWYgKHR5cGVvZiB0YXJnZXQgPT0gJ2Jvb2xlYW4nKSB7XG4gICAgICBkZWVwID0gdGFyZ2V0XG4gICAgICB0YXJnZXQgPSBhcmdzLnNoaWZ0KClcbiAgICB9XG4gICAgYXJncy5mb3JFYWNoKGZ1bmN0aW9uKGFyZyl7IGV4dGVuZCh0YXJnZXQsIGFyZywgZGVlcCkgfSlcbiAgICByZXR1cm4gdGFyZ2V0XG4gIH1cblxuICAvLyBgJC56ZXB0by5xc2FgIGlzIFplcHRvJ3MgQ1NTIHNlbGVjdG9yIGltcGxlbWVudGF0aW9uIHdoaWNoXG4gIC8vIHVzZXMgYGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGxgIGFuZCBvcHRpbWl6ZXMgZm9yIHNvbWUgc3BlY2lhbCBjYXNlcywgbGlrZSBgI2lkYC5cbiAgLy8gVGhpcyBtZXRob2QgY2FuIGJlIG92ZXJyaWRlbiBpbiBwbHVnaW5zLlxuICB6ZXB0by5xc2EgPSBmdW5jdGlvbihlbGVtZW50LCBzZWxlY3Rvcil7XG4gICAgdmFyIGZvdW5kLFxuICAgICAgICBtYXliZUlEID0gc2VsZWN0b3JbMF0gPT0gJyMnLFxuICAgICAgICBtYXliZUNsYXNzID0gIW1heWJlSUQgJiYgc2VsZWN0b3JbMF0gPT0gJy4nLFxuICAgICAgICBuYW1lT25seSA9IG1heWJlSUQgfHwgbWF5YmVDbGFzcyA/IHNlbGVjdG9yLnNsaWNlKDEpIDogc2VsZWN0b3IsIC8vIEVuc3VyZSB0aGF0IGEgMSBjaGFyIHRhZyBuYW1lIHN0aWxsIGdldHMgY2hlY2tlZFxuICAgICAgICBpc1NpbXBsZSA9IHNpbXBsZVNlbGVjdG9yUkUudGVzdChuYW1lT25seSlcbiAgICByZXR1cm4gKGlzRG9jdW1lbnQoZWxlbWVudCkgJiYgaXNTaW1wbGUgJiYgbWF5YmVJRCkgP1xuICAgICAgKCAoZm91bmQgPSBlbGVtZW50LmdldEVsZW1lbnRCeUlkKG5hbWVPbmx5KSkgPyBbZm91bmRdIDogW10gKSA6XG4gICAgICAoZWxlbWVudC5ub2RlVHlwZSAhPT0gMSAmJiBlbGVtZW50Lm5vZGVUeXBlICE9PSA5KSA/IFtdIDpcbiAgICAgIHNsaWNlLmNhbGwoXG4gICAgICAgIGlzU2ltcGxlICYmICFtYXliZUlEID9cbiAgICAgICAgICBtYXliZUNsYXNzID8gZWxlbWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKG5hbWVPbmx5KSA6IC8vIElmIGl0J3Mgc2ltcGxlLCBpdCBjb3VsZCBiZSBhIGNsYXNzXG4gICAgICAgICAgZWxlbWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShzZWxlY3RvcikgOiAvLyBPciBhIHRhZ1xuICAgICAgICAgIGVsZW1lbnQucXVlcnlTZWxlY3RvckFsbChzZWxlY3RvcikgLy8gT3IgaXQncyBub3Qgc2ltcGxlLCBhbmQgd2UgbmVlZCB0byBxdWVyeSBhbGxcbiAgICAgIClcbiAgfVxuXG4gIGZ1bmN0aW9uIGZpbHRlcmVkKG5vZGVzLCBzZWxlY3Rvcikge1xuICAgIHJldHVybiBzZWxlY3RvciA9PSBudWxsID8gJChub2RlcykgOiAkKG5vZGVzKS5maWx0ZXIoc2VsZWN0b3IpXG4gIH1cblxuICAkLmNvbnRhaW5zID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNvbnRhaW5zID9cbiAgICBmdW5jdGlvbihwYXJlbnQsIG5vZGUpIHtcbiAgICAgIHJldHVybiBwYXJlbnQgIT09IG5vZGUgJiYgcGFyZW50LmNvbnRhaW5zKG5vZGUpXG4gICAgfSA6XG4gICAgZnVuY3Rpb24ocGFyZW50LCBub2RlKSB7XG4gICAgICB3aGlsZSAobm9kZSAmJiAobm9kZSA9IG5vZGUucGFyZW50Tm9kZSkpXG4gICAgICAgIGlmIChub2RlID09PSBwYXJlbnQpIHJldHVybiB0cnVlXG4gICAgICByZXR1cm4gZmFsc2VcbiAgICB9XG5cbiAgZnVuY3Rpb24gZnVuY0FyZyhjb250ZXh0LCBhcmcsIGlkeCwgcGF5bG9hZCkge1xuICAgIHJldHVybiBpc0Z1bmN0aW9uKGFyZykgPyBhcmcuY2FsbChjb250ZXh0LCBpZHgsIHBheWxvYWQpIDogYXJnXG4gIH1cblxuICBmdW5jdGlvbiBzZXRBdHRyaWJ1dGUobm9kZSwgbmFtZSwgdmFsdWUpIHtcbiAgICB2YWx1ZSA9PSBudWxsID8gbm9kZS5yZW1vdmVBdHRyaWJ1dGUobmFtZSkgOiBub2RlLnNldEF0dHJpYnV0ZShuYW1lLCB2YWx1ZSlcbiAgfVxuXG4gIC8vIGFjY2VzcyBjbGFzc05hbWUgcHJvcGVydHkgd2hpbGUgcmVzcGVjdGluZyBTVkdBbmltYXRlZFN0cmluZ1xuICBmdW5jdGlvbiBjbGFzc05hbWUobm9kZSwgdmFsdWUpe1xuICAgIHZhciBrbGFzcyA9IG5vZGUuY2xhc3NOYW1lIHx8ICcnLFxuICAgICAgICBzdmcgICA9IGtsYXNzICYmIGtsYXNzLmJhc2VWYWwgIT09IHVuZGVmaW5lZFxuXG4gICAgaWYgKHZhbHVlID09PSB1bmRlZmluZWQpIHJldHVybiBzdmcgPyBrbGFzcy5iYXNlVmFsIDoga2xhc3NcbiAgICBzdmcgPyAoa2xhc3MuYmFzZVZhbCA9IHZhbHVlKSA6IChub2RlLmNsYXNzTmFtZSA9IHZhbHVlKVxuICB9XG5cbiAgLy8gXCJ0cnVlXCIgID0+IHRydWVcbiAgLy8gXCJmYWxzZVwiID0+IGZhbHNlXG4gIC8vIFwibnVsbFwiICA9PiBudWxsXG4gIC8vIFwiNDJcIiAgICA9PiA0MlxuICAvLyBcIjQyLjVcIiAgPT4gNDIuNVxuICAvLyBcIjA4XCIgICAgPT4gXCIwOFwiXG4gIC8vIEpTT04gICAgPT4gcGFyc2UgaWYgdmFsaWRcbiAgLy8gU3RyaW5nICA9PiBzZWxmXG4gIGZ1bmN0aW9uIGRlc2VyaWFsaXplVmFsdWUodmFsdWUpIHtcbiAgICB0cnkge1xuICAgICAgcmV0dXJuIHZhbHVlID9cbiAgICAgICAgdmFsdWUgPT0gXCJ0cnVlXCIgfHxcbiAgICAgICAgKCB2YWx1ZSA9PSBcImZhbHNlXCIgPyBmYWxzZSA6XG4gICAgICAgICAgdmFsdWUgPT0gXCJudWxsXCIgPyBudWxsIDpcbiAgICAgICAgICArdmFsdWUgKyBcIlwiID09IHZhbHVlID8gK3ZhbHVlIDpcbiAgICAgICAgICAvXltcXFtcXHtdLy50ZXN0KHZhbHVlKSA/ICQucGFyc2VKU09OKHZhbHVlKSA6XG4gICAgICAgICAgdmFsdWUgKVxuICAgICAgICA6IHZhbHVlXG4gICAgfSBjYXRjaChlKSB7XG4gICAgICByZXR1cm4gdmFsdWVcbiAgICB9XG4gIH1cblxuICAkLnR5cGUgPSB0eXBlXG4gICQuaXNGdW5jdGlvbiA9IGlzRnVuY3Rpb25cbiAgJC5pc1dpbmRvdyA9IGlzV2luZG93XG4gICQuaXNBcnJheSA9IGlzQXJyYXlcbiAgJC5pc1BsYWluT2JqZWN0ID0gaXNQbGFpbk9iamVjdFxuXG4gICQuaXNFbXB0eU9iamVjdCA9IGZ1bmN0aW9uKG9iaikge1xuICAgIHZhciBuYW1lXG4gICAgZm9yIChuYW1lIGluIG9iaikgcmV0dXJuIGZhbHNlXG4gICAgcmV0dXJuIHRydWVcbiAgfVxuXG4gICQuaW5BcnJheSA9IGZ1bmN0aW9uKGVsZW0sIGFycmF5LCBpKXtcbiAgICByZXR1cm4gZW1wdHlBcnJheS5pbmRleE9mLmNhbGwoYXJyYXksIGVsZW0sIGkpXG4gIH1cblxuICAkLmNhbWVsQ2FzZSA9IGNhbWVsaXplXG4gICQudHJpbSA9IGZ1bmN0aW9uKHN0cikge1xuICAgIHJldHVybiBzdHIgPT0gbnVsbCA/IFwiXCIgOiBTdHJpbmcucHJvdG90eXBlLnRyaW0uY2FsbChzdHIpXG4gIH1cblxuICAvLyBwbHVnaW4gY29tcGF0aWJpbGl0eVxuICAkLnV1aWQgPSAwXG4gICQuc3VwcG9ydCA9IHsgfVxuICAkLmV4cHIgPSB7IH1cblxuICAkLm1hcCA9IGZ1bmN0aW9uKGVsZW1lbnRzLCBjYWxsYmFjayl7XG4gICAgdmFyIHZhbHVlLCB2YWx1ZXMgPSBbXSwgaSwga2V5XG4gICAgaWYgKGxpa2VBcnJheShlbGVtZW50cykpXG4gICAgICBmb3IgKGkgPSAwOyBpIDwgZWxlbWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFsdWUgPSBjYWxsYmFjayhlbGVtZW50c1tpXSwgaSlcbiAgICAgICAgaWYgKHZhbHVlICE9IG51bGwpIHZhbHVlcy5wdXNoKHZhbHVlKVxuICAgICAgfVxuICAgIGVsc2VcbiAgICAgIGZvciAoa2V5IGluIGVsZW1lbnRzKSB7XG4gICAgICAgIHZhbHVlID0gY2FsbGJhY2soZWxlbWVudHNba2V5XSwga2V5KVxuICAgICAgICBpZiAodmFsdWUgIT0gbnVsbCkgdmFsdWVzLnB1c2godmFsdWUpXG4gICAgICB9XG4gICAgcmV0dXJuIGZsYXR0ZW4odmFsdWVzKVxuICB9XG5cbiAgJC5lYWNoID0gZnVuY3Rpb24oZWxlbWVudHMsIGNhbGxiYWNrKXtcbiAgICB2YXIgaSwga2V5XG4gICAgaWYgKGxpa2VBcnJheShlbGVtZW50cykpIHtcbiAgICAgIGZvciAoaSA9IDA7IGkgPCBlbGVtZW50cy5sZW5ndGg7IGkrKylcbiAgICAgICAgaWYgKGNhbGxiYWNrLmNhbGwoZWxlbWVudHNbaV0sIGksIGVsZW1lbnRzW2ldKSA9PT0gZmFsc2UpIHJldHVybiBlbGVtZW50c1xuICAgIH0gZWxzZSB7XG4gICAgICBmb3IgKGtleSBpbiBlbGVtZW50cylcbiAgICAgICAgaWYgKGNhbGxiYWNrLmNhbGwoZWxlbWVudHNba2V5XSwga2V5LCBlbGVtZW50c1trZXldKSA9PT0gZmFsc2UpIHJldHVybiBlbGVtZW50c1xuICAgIH1cblxuICAgIHJldHVybiBlbGVtZW50c1xuICB9XG5cbiAgJC5ncmVwID0gZnVuY3Rpb24oZWxlbWVudHMsIGNhbGxiYWNrKXtcbiAgICByZXR1cm4gZmlsdGVyLmNhbGwoZWxlbWVudHMsIGNhbGxiYWNrKVxuICB9XG5cbiAgaWYgKHdpbmRvdy5KU09OKSAkLnBhcnNlSlNPTiA9IEpTT04ucGFyc2VcblxuICAvLyBQb3B1bGF0ZSB0aGUgY2xhc3MydHlwZSBtYXBcbiAgJC5lYWNoKFwiQm9vbGVhbiBOdW1iZXIgU3RyaW5nIEZ1bmN0aW9uIEFycmF5IERhdGUgUmVnRXhwIE9iamVjdCBFcnJvclwiLnNwbGl0KFwiIFwiKSwgZnVuY3Rpb24oaSwgbmFtZSkge1xuICAgIGNsYXNzMnR5cGVbIFwiW29iamVjdCBcIiArIG5hbWUgKyBcIl1cIiBdID0gbmFtZS50b0xvd2VyQ2FzZSgpXG4gIH0pXG5cbiAgLy8gRGVmaW5lIG1ldGhvZHMgdGhhdCB3aWxsIGJlIGF2YWlsYWJsZSBvbiBhbGxcbiAgLy8gWmVwdG8gY29sbGVjdGlvbnNcbiAgJC5mbiA9IHtcbiAgICAvLyBCZWNhdXNlIGEgY29sbGVjdGlvbiBhY3RzIGxpa2UgYW4gYXJyYXlcbiAgICAvLyBjb3B5IG92ZXIgdGhlc2UgdXNlZnVsIGFycmF5IGZ1bmN0aW9ucy5cbiAgICBmb3JFYWNoOiBlbXB0eUFycmF5LmZvckVhY2gsXG4gICAgcmVkdWNlOiBlbXB0eUFycmF5LnJlZHVjZSxcbiAgICBwdXNoOiBlbXB0eUFycmF5LnB1c2gsXG4gICAgc29ydDogZW1wdHlBcnJheS5zb3J0LFxuICAgIGluZGV4T2Y6IGVtcHR5QXJyYXkuaW5kZXhPZixcbiAgICBjb25jYXQ6IGVtcHR5QXJyYXkuY29uY2F0LFxuXG4gICAgLy8gYG1hcGAgYW5kIGBzbGljZWAgaW4gdGhlIGpRdWVyeSBBUEkgd29yayBkaWZmZXJlbnRseVxuICAgIC8vIGZyb20gdGhlaXIgYXJyYXkgY291bnRlcnBhcnRzXG4gICAgbWFwOiBmdW5jdGlvbihmbil7XG4gICAgICByZXR1cm4gJCgkLm1hcCh0aGlzLCBmdW5jdGlvbihlbCwgaSl7IHJldHVybiBmbi5jYWxsKGVsLCBpLCBlbCkgfSkpXG4gICAgfSxcbiAgICBzbGljZTogZnVuY3Rpb24oKXtcbiAgICAgIHJldHVybiAkKHNsaWNlLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykpXG4gICAgfSxcblxuICAgIHJlYWR5OiBmdW5jdGlvbihjYWxsYmFjayl7XG4gICAgICAvLyBuZWVkIHRvIGNoZWNrIGlmIGRvY3VtZW50LmJvZHkgZXhpc3RzIGZvciBJRSBhcyB0aGF0IGJyb3dzZXIgcmVwb3J0c1xuICAgICAgLy8gZG9jdW1lbnQgcmVhZHkgd2hlbiBpdCBoYXNuJ3QgeWV0IGNyZWF0ZWQgdGhlIGJvZHkgZWxlbWVudFxuICAgICAgaWYgKHJlYWR5UkUudGVzdChkb2N1bWVudC5yZWFkeVN0YXRlKSAmJiBkb2N1bWVudC5ib2R5KSBjYWxsYmFjaygkKVxuICAgICAgZWxzZSBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgZnVuY3Rpb24oKXsgY2FsbGJhY2soJCkgfSwgZmFsc2UpXG4gICAgICByZXR1cm4gdGhpc1xuICAgIH0sXG4gICAgZ2V0OiBmdW5jdGlvbihpZHgpe1xuICAgICAgcmV0dXJuIGlkeCA9PT0gdW5kZWZpbmVkID8gc2xpY2UuY2FsbCh0aGlzKSA6IHRoaXNbaWR4ID49IDAgPyBpZHggOiBpZHggKyB0aGlzLmxlbmd0aF1cbiAgICB9LFxuICAgIHRvQXJyYXk6IGZ1bmN0aW9uKCl7IHJldHVybiB0aGlzLmdldCgpIH0sXG4gICAgc2l6ZTogZnVuY3Rpb24oKXtcbiAgICAgIHJldHVybiB0aGlzLmxlbmd0aFxuICAgIH0sXG4gICAgcmVtb3ZlOiBmdW5jdGlvbigpe1xuICAgICAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbigpe1xuICAgICAgICBpZiAodGhpcy5wYXJlbnROb2RlICE9IG51bGwpXG4gICAgICAgICAgdGhpcy5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHRoaXMpXG4gICAgICB9KVxuICAgIH0sXG4gICAgZWFjaDogZnVuY3Rpb24oY2FsbGJhY2spe1xuICAgICAgZW1wdHlBcnJheS5ldmVyeS5jYWxsKHRoaXMsIGZ1bmN0aW9uKGVsLCBpZHgpe1xuICAgICAgICByZXR1cm4gY2FsbGJhY2suY2FsbChlbCwgaWR4LCBlbCkgIT09IGZhbHNlXG4gICAgICB9KVxuICAgICAgcmV0dXJuIHRoaXNcbiAgICB9LFxuICAgIGZpbHRlcjogZnVuY3Rpb24oc2VsZWN0b3Ipe1xuICAgICAgaWYgKGlzRnVuY3Rpb24oc2VsZWN0b3IpKSByZXR1cm4gdGhpcy5ub3QodGhpcy5ub3Qoc2VsZWN0b3IpKVxuICAgICAgcmV0dXJuICQoZmlsdGVyLmNhbGwodGhpcywgZnVuY3Rpb24oZWxlbWVudCl7XG4gICAgICAgIHJldHVybiB6ZXB0by5tYXRjaGVzKGVsZW1lbnQsIHNlbGVjdG9yKVxuICAgICAgfSkpXG4gICAgfSxcbiAgICBhZGQ6IGZ1bmN0aW9uKHNlbGVjdG9yLGNvbnRleHQpe1xuICAgICAgcmV0dXJuICQodW5pcSh0aGlzLmNvbmNhdCgkKHNlbGVjdG9yLGNvbnRleHQpKSkpXG4gICAgfSxcbiAgICBpczogZnVuY3Rpb24oc2VsZWN0b3Ipe1xuICAgICAgcmV0dXJuIHRoaXMubGVuZ3RoID4gMCAmJiB6ZXB0by5tYXRjaGVzKHRoaXNbMF0sIHNlbGVjdG9yKVxuICAgIH0sXG4gICAgbm90OiBmdW5jdGlvbihzZWxlY3Rvcil7XG4gICAgICB2YXIgbm9kZXM9W11cbiAgICAgIGlmIChpc0Z1bmN0aW9uKHNlbGVjdG9yKSAmJiBzZWxlY3Rvci5jYWxsICE9PSB1bmRlZmluZWQpXG4gICAgICAgIHRoaXMuZWFjaChmdW5jdGlvbihpZHgpe1xuICAgICAgICAgIGlmICghc2VsZWN0b3IuY2FsbCh0aGlzLGlkeCkpIG5vZGVzLnB1c2godGhpcylcbiAgICAgICAgfSlcbiAgICAgIGVsc2Uge1xuICAgICAgICB2YXIgZXhjbHVkZXMgPSB0eXBlb2Ygc2VsZWN0b3IgPT0gJ3N0cmluZycgPyB0aGlzLmZpbHRlcihzZWxlY3RvcikgOlxuICAgICAgICAgIChsaWtlQXJyYXkoc2VsZWN0b3IpICYmIGlzRnVuY3Rpb24oc2VsZWN0b3IuaXRlbSkpID8gc2xpY2UuY2FsbChzZWxlY3RvcikgOiAkKHNlbGVjdG9yKVxuICAgICAgICB0aGlzLmZvckVhY2goZnVuY3Rpb24oZWwpe1xuICAgICAgICAgIGlmIChleGNsdWRlcy5pbmRleE9mKGVsKSA8IDApIG5vZGVzLnB1c2goZWwpXG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgICByZXR1cm4gJChub2RlcylcbiAgICB9LFxuICAgIGhhczogZnVuY3Rpb24oc2VsZWN0b3Ipe1xuICAgICAgcmV0dXJuIHRoaXMuZmlsdGVyKGZ1bmN0aW9uKCl7XG4gICAgICAgIHJldHVybiBpc09iamVjdChzZWxlY3RvcikgP1xuICAgICAgICAgICQuY29udGFpbnModGhpcywgc2VsZWN0b3IpIDpcbiAgICAgICAgICAkKHRoaXMpLmZpbmQoc2VsZWN0b3IpLnNpemUoKVxuICAgICAgfSlcbiAgICB9LFxuICAgIGVxOiBmdW5jdGlvbihpZHgpe1xuICAgICAgcmV0dXJuIGlkeCA9PT0gLTEgPyB0aGlzLnNsaWNlKGlkeCkgOiB0aGlzLnNsaWNlKGlkeCwgKyBpZHggKyAxKVxuICAgIH0sXG4gICAgZmlyc3Q6IGZ1bmN0aW9uKCl7XG4gICAgICB2YXIgZWwgPSB0aGlzWzBdXG4gICAgICByZXR1cm4gZWwgJiYgIWlzT2JqZWN0KGVsKSA/IGVsIDogJChlbClcbiAgICB9LFxuICAgIGxhc3Q6IGZ1bmN0aW9uKCl7XG4gICAgICB2YXIgZWwgPSB0aGlzW3RoaXMubGVuZ3RoIC0gMV1cbiAgICAgIHJldHVybiBlbCAmJiAhaXNPYmplY3QoZWwpID8gZWwgOiAkKGVsKVxuICAgIH0sXG4gICAgZmluZDogZnVuY3Rpb24oc2VsZWN0b3Ipe1xuICAgICAgdmFyIHJlc3VsdCwgJHRoaXMgPSB0aGlzXG4gICAgICBpZiAoIXNlbGVjdG9yKSByZXN1bHQgPSAkKClcbiAgICAgIGVsc2UgaWYgKHR5cGVvZiBzZWxlY3RvciA9PSAnb2JqZWN0JylcbiAgICAgICAgcmVzdWx0ID0gJChzZWxlY3RvcikuZmlsdGVyKGZ1bmN0aW9uKCl7XG4gICAgICAgICAgdmFyIG5vZGUgPSB0aGlzXG4gICAgICAgICAgcmV0dXJuIGVtcHR5QXJyYXkuc29tZS5jYWxsKCR0aGlzLCBmdW5jdGlvbihwYXJlbnQpe1xuICAgICAgICAgICAgcmV0dXJuICQuY29udGFpbnMocGFyZW50LCBub2RlKVxuICAgICAgICAgIH0pXG4gICAgICAgIH0pXG4gICAgICBlbHNlIGlmICh0aGlzLmxlbmd0aCA9PSAxKSByZXN1bHQgPSAkKHplcHRvLnFzYSh0aGlzWzBdLCBzZWxlY3RvcikpXG4gICAgICBlbHNlIHJlc3VsdCA9IHRoaXMubWFwKGZ1bmN0aW9uKCl7IHJldHVybiB6ZXB0by5xc2EodGhpcywgc2VsZWN0b3IpIH0pXG4gICAgICByZXR1cm4gcmVzdWx0XG4gICAgfSxcbiAgICBjbG9zZXN0OiBmdW5jdGlvbihzZWxlY3RvciwgY29udGV4dCl7XG4gICAgICB2YXIgbm9kZSA9IHRoaXNbMF0sIGNvbGxlY3Rpb24gPSBmYWxzZVxuICAgICAgaWYgKHR5cGVvZiBzZWxlY3RvciA9PSAnb2JqZWN0JykgY29sbGVjdGlvbiA9ICQoc2VsZWN0b3IpXG4gICAgICB3aGlsZSAobm9kZSAmJiAhKGNvbGxlY3Rpb24gPyBjb2xsZWN0aW9uLmluZGV4T2Yobm9kZSkgPj0gMCA6IHplcHRvLm1hdGNoZXMobm9kZSwgc2VsZWN0b3IpKSlcbiAgICAgICAgbm9kZSA9IG5vZGUgIT09IGNvbnRleHQgJiYgIWlzRG9jdW1lbnQobm9kZSkgJiYgbm9kZS5wYXJlbnROb2RlXG4gICAgICByZXR1cm4gJChub2RlKVxuICAgIH0sXG4gICAgcGFyZW50czogZnVuY3Rpb24oc2VsZWN0b3Ipe1xuICAgICAgdmFyIGFuY2VzdG9ycyA9IFtdLCBub2RlcyA9IHRoaXNcbiAgICAgIHdoaWxlIChub2Rlcy5sZW5ndGggPiAwKVxuICAgICAgICBub2RlcyA9ICQubWFwKG5vZGVzLCBmdW5jdGlvbihub2RlKXtcbiAgICAgICAgICBpZiAoKG5vZGUgPSBub2RlLnBhcmVudE5vZGUpICYmICFpc0RvY3VtZW50KG5vZGUpICYmIGFuY2VzdG9ycy5pbmRleE9mKG5vZGUpIDwgMCkge1xuICAgICAgICAgICAgYW5jZXN0b3JzLnB1c2gobm9kZSlcbiAgICAgICAgICAgIHJldHVybiBub2RlXG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgcmV0dXJuIGZpbHRlcmVkKGFuY2VzdG9ycywgc2VsZWN0b3IpXG4gICAgfSxcbiAgICBwYXJlbnQ6IGZ1bmN0aW9uKHNlbGVjdG9yKXtcbiAgICAgIHJldHVybiBmaWx0ZXJlZCh1bmlxKHRoaXMucGx1Y2soJ3BhcmVudE5vZGUnKSksIHNlbGVjdG9yKVxuICAgIH0sXG4gICAgY2hpbGRyZW46IGZ1bmN0aW9uKHNlbGVjdG9yKXtcbiAgICAgIHJldHVybiBmaWx0ZXJlZCh0aGlzLm1hcChmdW5jdGlvbigpeyByZXR1cm4gY2hpbGRyZW4odGhpcykgfSksIHNlbGVjdG9yKVxuICAgIH0sXG4gICAgY29udGVudHM6IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHRoaXMubWFwKGZ1bmN0aW9uKCkgeyByZXR1cm4gc2xpY2UuY2FsbCh0aGlzLmNoaWxkTm9kZXMpIH0pXG4gICAgfSxcbiAgICBzaWJsaW5nczogZnVuY3Rpb24oc2VsZWN0b3Ipe1xuICAgICAgcmV0dXJuIGZpbHRlcmVkKHRoaXMubWFwKGZ1bmN0aW9uKGksIGVsKXtcbiAgICAgICAgcmV0dXJuIGZpbHRlci5jYWxsKGNoaWxkcmVuKGVsLnBhcmVudE5vZGUpLCBmdW5jdGlvbihjaGlsZCl7IHJldHVybiBjaGlsZCE9PWVsIH0pXG4gICAgICB9KSwgc2VsZWN0b3IpXG4gICAgfSxcbiAgICBlbXB0eTogZnVuY3Rpb24oKXtcbiAgICAgIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24oKXsgdGhpcy5pbm5lckhUTUwgPSAnJyB9KVxuICAgIH0sXG4gICAgLy8gYHBsdWNrYCBpcyBib3Jyb3dlZCBmcm9tIFByb3RvdHlwZS5qc1xuICAgIHBsdWNrOiBmdW5jdGlvbihwcm9wZXJ0eSl7XG4gICAgICByZXR1cm4gJC5tYXAodGhpcywgZnVuY3Rpb24oZWwpeyByZXR1cm4gZWxbcHJvcGVydHldIH0pXG4gICAgfSxcbiAgICBzaG93OiBmdW5jdGlvbigpe1xuICAgICAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbigpe1xuICAgICAgICB0aGlzLnN0eWxlLmRpc3BsYXkgPT0gXCJub25lXCIgJiYgKHRoaXMuc3R5bGUuZGlzcGxheSA9ICcnKVxuICAgICAgICBpZiAoZ2V0Q29tcHV0ZWRTdHlsZSh0aGlzLCAnJykuZ2V0UHJvcGVydHlWYWx1ZShcImRpc3BsYXlcIikgPT0gXCJub25lXCIpXG4gICAgICAgICAgdGhpcy5zdHlsZS5kaXNwbGF5ID0gZGVmYXVsdERpc3BsYXkodGhpcy5ub2RlTmFtZSlcbiAgICAgIH0pXG4gICAgfSxcbiAgICByZXBsYWNlV2l0aDogZnVuY3Rpb24obmV3Q29udGVudCl7XG4gICAgICByZXR1cm4gdGhpcy5iZWZvcmUobmV3Q29udGVudCkucmVtb3ZlKClcbiAgICB9LFxuICAgIHdyYXA6IGZ1bmN0aW9uKHN0cnVjdHVyZSl7XG4gICAgICB2YXIgZnVuYyA9IGlzRnVuY3Rpb24oc3RydWN0dXJlKVxuICAgICAgaWYgKHRoaXNbMF0gJiYgIWZ1bmMpXG4gICAgICAgIHZhciBkb20gICA9ICQoc3RydWN0dXJlKS5nZXQoMCksXG4gICAgICAgICAgICBjbG9uZSA9IGRvbS5wYXJlbnROb2RlIHx8IHRoaXMubGVuZ3RoID4gMVxuXG4gICAgICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uKGluZGV4KXtcbiAgICAgICAgJCh0aGlzKS53cmFwQWxsKFxuICAgICAgICAgIGZ1bmMgPyBzdHJ1Y3R1cmUuY2FsbCh0aGlzLCBpbmRleCkgOlxuICAgICAgICAgICAgY2xvbmUgPyBkb20uY2xvbmVOb2RlKHRydWUpIDogZG9tXG4gICAgICAgIClcbiAgICAgIH0pXG4gICAgfSxcbiAgICB3cmFwQWxsOiBmdW5jdGlvbihzdHJ1Y3R1cmUpe1xuICAgICAgaWYgKHRoaXNbMF0pIHtcbiAgICAgICAgJCh0aGlzWzBdKS5iZWZvcmUoc3RydWN0dXJlID0gJChzdHJ1Y3R1cmUpKVxuICAgICAgICB2YXIgY2hpbGRyZW5cbiAgICAgICAgLy8gZHJpbGwgZG93biB0byB0aGUgaW5tb3N0IGVsZW1lbnRcbiAgICAgICAgd2hpbGUgKChjaGlsZHJlbiA9IHN0cnVjdHVyZS5jaGlsZHJlbigpKS5sZW5ndGgpIHN0cnVjdHVyZSA9IGNoaWxkcmVuLmZpcnN0KClcbiAgICAgICAgJChzdHJ1Y3R1cmUpLmFwcGVuZCh0aGlzKVxuICAgICAgfVxuICAgICAgcmV0dXJuIHRoaXNcbiAgICB9LFxuICAgIHdyYXBJbm5lcjogZnVuY3Rpb24oc3RydWN0dXJlKXtcbiAgICAgIHZhciBmdW5jID0gaXNGdW5jdGlvbihzdHJ1Y3R1cmUpXG4gICAgICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uKGluZGV4KXtcbiAgICAgICAgdmFyIHNlbGYgPSAkKHRoaXMpLCBjb250ZW50cyA9IHNlbGYuY29udGVudHMoKSxcbiAgICAgICAgICAgIGRvbSAgPSBmdW5jID8gc3RydWN0dXJlLmNhbGwodGhpcywgaW5kZXgpIDogc3RydWN0dXJlXG4gICAgICAgIGNvbnRlbnRzLmxlbmd0aCA/IGNvbnRlbnRzLndyYXBBbGwoZG9tKSA6IHNlbGYuYXBwZW5kKGRvbSlcbiAgICAgIH0pXG4gICAgfSxcbiAgICB1bndyYXA6IGZ1bmN0aW9uKCl7XG4gICAgICB0aGlzLnBhcmVudCgpLmVhY2goZnVuY3Rpb24oKXtcbiAgICAgICAgJCh0aGlzKS5yZXBsYWNlV2l0aCgkKHRoaXMpLmNoaWxkcmVuKCkpXG4gICAgICB9KVxuICAgICAgcmV0dXJuIHRoaXNcbiAgICB9LFxuICAgIGNsb25lOiBmdW5jdGlvbigpe1xuICAgICAgcmV0dXJuIHRoaXMubWFwKGZ1bmN0aW9uKCl7IHJldHVybiB0aGlzLmNsb25lTm9kZSh0cnVlKSB9KVxuICAgIH0sXG4gICAgaGlkZTogZnVuY3Rpb24oKXtcbiAgICAgIHJldHVybiB0aGlzLmNzcyhcImRpc3BsYXlcIiwgXCJub25lXCIpXG4gICAgfSxcbiAgICB0b2dnbGU6IGZ1bmN0aW9uKHNldHRpbmcpe1xuICAgICAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbigpe1xuICAgICAgICB2YXIgZWwgPSAkKHRoaXMpXG4gICAgICAgIDsoc2V0dGluZyA9PT0gdW5kZWZpbmVkID8gZWwuY3NzKFwiZGlzcGxheVwiKSA9PSBcIm5vbmVcIiA6IHNldHRpbmcpID8gZWwuc2hvdygpIDogZWwuaGlkZSgpXG4gICAgICB9KVxuICAgIH0sXG4gICAgcHJldjogZnVuY3Rpb24oc2VsZWN0b3IpeyByZXR1cm4gJCh0aGlzLnBsdWNrKCdwcmV2aW91c0VsZW1lbnRTaWJsaW5nJykpLmZpbHRlcihzZWxlY3RvciB8fCAnKicpIH0sXG4gICAgbmV4dDogZnVuY3Rpb24oc2VsZWN0b3IpeyByZXR1cm4gJCh0aGlzLnBsdWNrKCduZXh0RWxlbWVudFNpYmxpbmcnKSkuZmlsdGVyKHNlbGVjdG9yIHx8ICcqJykgfSxcbiAgICBodG1sOiBmdW5jdGlvbihodG1sKXtcbiAgICAgIHJldHVybiAwIGluIGFyZ3VtZW50cyA/XG4gICAgICAgIHRoaXMuZWFjaChmdW5jdGlvbihpZHgpe1xuICAgICAgICAgIHZhciBvcmlnaW5IdG1sID0gdGhpcy5pbm5lckhUTUxcbiAgICAgICAgICAkKHRoaXMpLmVtcHR5KCkuYXBwZW5kKCBmdW5jQXJnKHRoaXMsIGh0bWwsIGlkeCwgb3JpZ2luSHRtbCkgKVxuICAgICAgICB9KSA6XG4gICAgICAgICgwIGluIHRoaXMgPyB0aGlzWzBdLmlubmVySFRNTCA6IG51bGwpXG4gICAgfSxcbiAgICB0ZXh0OiBmdW5jdGlvbih0ZXh0KXtcbiAgICAgIHJldHVybiAwIGluIGFyZ3VtZW50cyA/XG4gICAgICAgIHRoaXMuZWFjaChmdW5jdGlvbihpZHgpe1xuICAgICAgICAgIHZhciBuZXdUZXh0ID0gZnVuY0FyZyh0aGlzLCB0ZXh0LCBpZHgsIHRoaXMudGV4dENvbnRlbnQpXG4gICAgICAgICAgdGhpcy50ZXh0Q29udGVudCA9IG5ld1RleHQgPT0gbnVsbCA/ICcnIDogJycrbmV3VGV4dFxuICAgICAgICB9KSA6XG4gICAgICAgICgwIGluIHRoaXMgPyB0aGlzWzBdLnRleHRDb250ZW50IDogbnVsbClcbiAgICB9LFxuICAgIGF0dHI6IGZ1bmN0aW9uKG5hbWUsIHZhbHVlKXtcbiAgICAgIHZhciByZXN1bHRcbiAgICAgIHJldHVybiAodHlwZW9mIG5hbWUgPT0gJ3N0cmluZycgJiYgISgxIGluIGFyZ3VtZW50cykpID9cbiAgICAgICAgKCF0aGlzLmxlbmd0aCB8fCB0aGlzWzBdLm5vZGVUeXBlICE9PSAxID8gdW5kZWZpbmVkIDpcbiAgICAgICAgICAoIShyZXN1bHQgPSB0aGlzWzBdLmdldEF0dHJpYnV0ZShuYW1lKSkgJiYgbmFtZSBpbiB0aGlzWzBdKSA/IHRoaXNbMF1bbmFtZV0gOiByZXN1bHRcbiAgICAgICAgKSA6XG4gICAgICAgIHRoaXMuZWFjaChmdW5jdGlvbihpZHgpe1xuICAgICAgICAgIGlmICh0aGlzLm5vZGVUeXBlICE9PSAxKSByZXR1cm5cbiAgICAgICAgICBpZiAoaXNPYmplY3QobmFtZSkpIGZvciAoa2V5IGluIG5hbWUpIHNldEF0dHJpYnV0ZSh0aGlzLCBrZXksIG5hbWVba2V5XSlcbiAgICAgICAgICBlbHNlIHNldEF0dHJpYnV0ZSh0aGlzLCBuYW1lLCBmdW5jQXJnKHRoaXMsIHZhbHVlLCBpZHgsIHRoaXMuZ2V0QXR0cmlidXRlKG5hbWUpKSlcbiAgICAgICAgfSlcbiAgICB9LFxuICAgIHJlbW92ZUF0dHI6IGZ1bmN0aW9uKG5hbWUpe1xuICAgICAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbigpeyB0aGlzLm5vZGVUeXBlID09PSAxICYmIG5hbWUuc3BsaXQoJyAnKS5mb3JFYWNoKGZ1bmN0aW9uKGF0dHJpYnV0ZSl7XG4gICAgICAgIHNldEF0dHJpYnV0ZSh0aGlzLCBhdHRyaWJ1dGUpXG4gICAgICB9LCB0aGlzKX0pXG4gICAgfSxcbiAgICBwcm9wOiBmdW5jdGlvbihuYW1lLCB2YWx1ZSl7XG4gICAgICBuYW1lID0gcHJvcE1hcFtuYW1lXSB8fCBuYW1lXG4gICAgICByZXR1cm4gKDEgaW4gYXJndW1lbnRzKSA/XG4gICAgICAgIHRoaXMuZWFjaChmdW5jdGlvbihpZHgpe1xuICAgICAgICAgIHRoaXNbbmFtZV0gPSBmdW5jQXJnKHRoaXMsIHZhbHVlLCBpZHgsIHRoaXNbbmFtZV0pXG4gICAgICAgIH0pIDpcbiAgICAgICAgKHRoaXNbMF0gJiYgdGhpc1swXVtuYW1lXSlcbiAgICB9LFxuICAgIGRhdGE6IGZ1bmN0aW9uKG5hbWUsIHZhbHVlKXtcbiAgICAgIHZhciBhdHRyTmFtZSA9ICdkYXRhLScgKyBuYW1lLnJlcGxhY2UoY2FwaXRhbFJFLCAnLSQxJykudG9Mb3dlckNhc2UoKVxuXG4gICAgICB2YXIgZGF0YSA9ICgxIGluIGFyZ3VtZW50cykgP1xuICAgICAgICB0aGlzLmF0dHIoYXR0ck5hbWUsIHZhbHVlKSA6XG4gICAgICAgIHRoaXMuYXR0cihhdHRyTmFtZSlcblxuICAgICAgcmV0dXJuIGRhdGEgIT09IG51bGwgPyBkZXNlcmlhbGl6ZVZhbHVlKGRhdGEpIDogdW5kZWZpbmVkXG4gICAgfSxcbiAgICB2YWw6IGZ1bmN0aW9uKHZhbHVlKXtcbiAgICAgIHJldHVybiAwIGluIGFyZ3VtZW50cyA/XG4gICAgICAgIHRoaXMuZWFjaChmdW5jdGlvbihpZHgpe1xuICAgICAgICAgIHRoaXMudmFsdWUgPSBmdW5jQXJnKHRoaXMsIHZhbHVlLCBpZHgsIHRoaXMudmFsdWUpXG4gICAgICAgIH0pIDpcbiAgICAgICAgKHRoaXNbMF0gJiYgKHRoaXNbMF0ubXVsdGlwbGUgP1xuICAgICAgICAgICAkKHRoaXNbMF0pLmZpbmQoJ29wdGlvbicpLmZpbHRlcihmdW5jdGlvbigpeyByZXR1cm4gdGhpcy5zZWxlY3RlZCB9KS5wbHVjaygndmFsdWUnKSA6XG4gICAgICAgICAgIHRoaXNbMF0udmFsdWUpXG4gICAgICAgIClcbiAgICB9LFxuICAgIG9mZnNldDogZnVuY3Rpb24oY29vcmRpbmF0ZXMpe1xuICAgICAgaWYgKGNvb3JkaW5hdGVzKSByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uKGluZGV4KXtcbiAgICAgICAgdmFyICR0aGlzID0gJCh0aGlzKSxcbiAgICAgICAgICAgIGNvb3JkcyA9IGZ1bmNBcmcodGhpcywgY29vcmRpbmF0ZXMsIGluZGV4LCAkdGhpcy5vZmZzZXQoKSksXG4gICAgICAgICAgICBwYXJlbnRPZmZzZXQgPSAkdGhpcy5vZmZzZXRQYXJlbnQoKS5vZmZzZXQoKSxcbiAgICAgICAgICAgIHByb3BzID0ge1xuICAgICAgICAgICAgICB0b3A6ICBjb29yZHMudG9wICAtIHBhcmVudE9mZnNldC50b3AsXG4gICAgICAgICAgICAgIGxlZnQ6IGNvb3Jkcy5sZWZ0IC0gcGFyZW50T2Zmc2V0LmxlZnRcbiAgICAgICAgICAgIH1cblxuICAgICAgICBpZiAoJHRoaXMuY3NzKCdwb3NpdGlvbicpID09ICdzdGF0aWMnKSBwcm9wc1sncG9zaXRpb24nXSA9ICdyZWxhdGl2ZSdcbiAgICAgICAgJHRoaXMuY3NzKHByb3BzKVxuICAgICAgfSlcbiAgICAgIGlmICghdGhpcy5sZW5ndGgpIHJldHVybiBudWxsXG4gICAgICB2YXIgb2JqID0gdGhpc1swXS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKVxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgbGVmdDogb2JqLmxlZnQgKyB3aW5kb3cucGFnZVhPZmZzZXQsXG4gICAgICAgIHRvcDogb2JqLnRvcCArIHdpbmRvdy5wYWdlWU9mZnNldCxcbiAgICAgICAgd2lkdGg6IE1hdGgucm91bmQob2JqLndpZHRoKSxcbiAgICAgICAgaGVpZ2h0OiBNYXRoLnJvdW5kKG9iai5oZWlnaHQpXG4gICAgICB9XG4gICAgfSxcbiAgICBjc3M6IGZ1bmN0aW9uKHByb3BlcnR5LCB2YWx1ZSl7XG4gICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA8IDIpIHtcbiAgICAgICAgdmFyIGNvbXB1dGVkU3R5bGUsIGVsZW1lbnQgPSB0aGlzWzBdXG4gICAgICAgIGlmKCFlbGVtZW50KSByZXR1cm5cbiAgICAgICAgY29tcHV0ZWRTdHlsZSA9IGdldENvbXB1dGVkU3R5bGUoZWxlbWVudCwgJycpXG4gICAgICAgIGlmICh0eXBlb2YgcHJvcGVydHkgPT0gJ3N0cmluZycpXG4gICAgICAgICAgcmV0dXJuIGVsZW1lbnQuc3R5bGVbY2FtZWxpemUocHJvcGVydHkpXSB8fCBjb21wdXRlZFN0eWxlLmdldFByb3BlcnR5VmFsdWUocHJvcGVydHkpXG4gICAgICAgIGVsc2UgaWYgKGlzQXJyYXkocHJvcGVydHkpKSB7XG4gICAgICAgICAgdmFyIHByb3BzID0ge31cbiAgICAgICAgICAkLmVhY2gocHJvcGVydHksIGZ1bmN0aW9uKF8sIHByb3Ape1xuICAgICAgICAgICAgcHJvcHNbcHJvcF0gPSAoZWxlbWVudC5zdHlsZVtjYW1lbGl6ZShwcm9wKV0gfHwgY29tcHV0ZWRTdHlsZS5nZXRQcm9wZXJ0eVZhbHVlKHByb3ApKVxuICAgICAgICAgIH0pXG4gICAgICAgICAgcmV0dXJuIHByb3BzXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgdmFyIGNzcyA9ICcnXG4gICAgICBpZiAodHlwZShwcm9wZXJ0eSkgPT0gJ3N0cmluZycpIHtcbiAgICAgICAgaWYgKCF2YWx1ZSAmJiB2YWx1ZSAhPT0gMClcbiAgICAgICAgICB0aGlzLmVhY2goZnVuY3Rpb24oKXsgdGhpcy5zdHlsZS5yZW1vdmVQcm9wZXJ0eShkYXNoZXJpemUocHJvcGVydHkpKSB9KVxuICAgICAgICBlbHNlXG4gICAgICAgICAgY3NzID0gZGFzaGVyaXplKHByb3BlcnR5KSArIFwiOlwiICsgbWF5YmVBZGRQeChwcm9wZXJ0eSwgdmFsdWUpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBmb3IgKGtleSBpbiBwcm9wZXJ0eSlcbiAgICAgICAgICBpZiAoIXByb3BlcnR5W2tleV0gJiYgcHJvcGVydHlba2V5XSAhPT0gMClcbiAgICAgICAgICAgIHRoaXMuZWFjaChmdW5jdGlvbigpeyB0aGlzLnN0eWxlLnJlbW92ZVByb3BlcnR5KGRhc2hlcml6ZShrZXkpKSB9KVxuICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgIGNzcyArPSBkYXNoZXJpemUoa2V5KSArICc6JyArIG1heWJlQWRkUHgoa2V5LCBwcm9wZXJ0eVtrZXldKSArICc7J1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uKCl7IHRoaXMuc3R5bGUuY3NzVGV4dCArPSAnOycgKyBjc3MgfSlcbiAgICB9LFxuICAgIGluZGV4OiBmdW5jdGlvbihlbGVtZW50KXtcbiAgICAgIHJldHVybiBlbGVtZW50ID8gdGhpcy5pbmRleE9mKCQoZWxlbWVudClbMF0pIDogdGhpcy5wYXJlbnQoKS5jaGlsZHJlbigpLmluZGV4T2YodGhpc1swXSlcbiAgICB9LFxuICAgIGhhc0NsYXNzOiBmdW5jdGlvbihuYW1lKXtcbiAgICAgIGlmICghbmFtZSkgcmV0dXJuIGZhbHNlXG4gICAgICByZXR1cm4gZW1wdHlBcnJheS5zb21lLmNhbGwodGhpcywgZnVuY3Rpb24oZWwpe1xuICAgICAgICByZXR1cm4gdGhpcy50ZXN0KGNsYXNzTmFtZShlbCkpXG4gICAgICB9LCBjbGFzc1JFKG5hbWUpKVxuICAgIH0sXG4gICAgYWRkQ2xhc3M6IGZ1bmN0aW9uKG5hbWUpe1xuICAgICAgaWYgKCFuYW1lKSByZXR1cm4gdGhpc1xuICAgICAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbihpZHgpe1xuICAgICAgICBpZiAoISgnY2xhc3NOYW1lJyBpbiB0aGlzKSkgcmV0dXJuXG4gICAgICAgIGNsYXNzTGlzdCA9IFtdXG4gICAgICAgIHZhciBjbHMgPSBjbGFzc05hbWUodGhpcyksIG5ld05hbWUgPSBmdW5jQXJnKHRoaXMsIG5hbWUsIGlkeCwgY2xzKVxuICAgICAgICBuZXdOYW1lLnNwbGl0KC9cXHMrL2cpLmZvckVhY2goZnVuY3Rpb24oa2xhc3Mpe1xuICAgICAgICAgIGlmICghJCh0aGlzKS5oYXNDbGFzcyhrbGFzcykpIGNsYXNzTGlzdC5wdXNoKGtsYXNzKVxuICAgICAgICB9LCB0aGlzKVxuICAgICAgICBjbGFzc0xpc3QubGVuZ3RoICYmIGNsYXNzTmFtZSh0aGlzLCBjbHMgKyAoY2xzID8gXCIgXCIgOiBcIlwiKSArIGNsYXNzTGlzdC5qb2luKFwiIFwiKSlcbiAgICAgIH0pXG4gICAgfSxcbiAgICByZW1vdmVDbGFzczogZnVuY3Rpb24obmFtZSl7XG4gICAgICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uKGlkeCl7XG4gICAgICAgIGlmICghKCdjbGFzc05hbWUnIGluIHRoaXMpKSByZXR1cm5cbiAgICAgICAgaWYgKG5hbWUgPT09IHVuZGVmaW5lZCkgcmV0dXJuIGNsYXNzTmFtZSh0aGlzLCAnJylcbiAgICAgICAgY2xhc3NMaXN0ID0gY2xhc3NOYW1lKHRoaXMpXG4gICAgICAgIGZ1bmNBcmcodGhpcywgbmFtZSwgaWR4LCBjbGFzc0xpc3QpLnNwbGl0KC9cXHMrL2cpLmZvckVhY2goZnVuY3Rpb24oa2xhc3Mpe1xuICAgICAgICAgIGNsYXNzTGlzdCA9IGNsYXNzTGlzdC5yZXBsYWNlKGNsYXNzUkUoa2xhc3MpLCBcIiBcIilcbiAgICAgICAgfSlcbiAgICAgICAgY2xhc3NOYW1lKHRoaXMsIGNsYXNzTGlzdC50cmltKCkpXG4gICAgICB9KVxuICAgIH0sXG4gICAgdG9nZ2xlQ2xhc3M6IGZ1bmN0aW9uKG5hbWUsIHdoZW4pe1xuICAgICAgaWYgKCFuYW1lKSByZXR1cm4gdGhpc1xuICAgICAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbihpZHgpe1xuICAgICAgICB2YXIgJHRoaXMgPSAkKHRoaXMpLCBuYW1lcyA9IGZ1bmNBcmcodGhpcywgbmFtZSwgaWR4LCBjbGFzc05hbWUodGhpcykpXG4gICAgICAgIG5hbWVzLnNwbGl0KC9cXHMrL2cpLmZvckVhY2goZnVuY3Rpb24oa2xhc3Mpe1xuICAgICAgICAgICh3aGVuID09PSB1bmRlZmluZWQgPyAhJHRoaXMuaGFzQ2xhc3Moa2xhc3MpIDogd2hlbikgP1xuICAgICAgICAgICAgJHRoaXMuYWRkQ2xhc3Moa2xhc3MpIDogJHRoaXMucmVtb3ZlQ2xhc3Moa2xhc3MpXG4gICAgICAgIH0pXG4gICAgICB9KVxuICAgIH0sXG4gICAgc2Nyb2xsVG9wOiBmdW5jdGlvbih2YWx1ZSl7XG4gICAgICBpZiAoIXRoaXMubGVuZ3RoKSByZXR1cm5cbiAgICAgIHZhciBoYXNTY3JvbGxUb3AgPSAnc2Nyb2xsVG9wJyBpbiB0aGlzWzBdXG4gICAgICBpZiAodmFsdWUgPT09IHVuZGVmaW5lZCkgcmV0dXJuIGhhc1Njcm9sbFRvcCA/IHRoaXNbMF0uc2Nyb2xsVG9wIDogdGhpc1swXS5wYWdlWU9mZnNldFxuICAgICAgcmV0dXJuIHRoaXMuZWFjaChoYXNTY3JvbGxUb3AgP1xuICAgICAgICBmdW5jdGlvbigpeyB0aGlzLnNjcm9sbFRvcCA9IHZhbHVlIH0gOlxuICAgICAgICBmdW5jdGlvbigpeyB0aGlzLnNjcm9sbFRvKHRoaXMuc2Nyb2xsWCwgdmFsdWUpIH0pXG4gICAgfSxcbiAgICBzY3JvbGxMZWZ0OiBmdW5jdGlvbih2YWx1ZSl7XG4gICAgICBpZiAoIXRoaXMubGVuZ3RoKSByZXR1cm5cbiAgICAgIHZhciBoYXNTY3JvbGxMZWZ0ID0gJ3Njcm9sbExlZnQnIGluIHRoaXNbMF1cbiAgICAgIGlmICh2YWx1ZSA9PT0gdW5kZWZpbmVkKSByZXR1cm4gaGFzU2Nyb2xsTGVmdCA/IHRoaXNbMF0uc2Nyb2xsTGVmdCA6IHRoaXNbMF0ucGFnZVhPZmZzZXRcbiAgICAgIHJldHVybiB0aGlzLmVhY2goaGFzU2Nyb2xsTGVmdCA/XG4gICAgICAgIGZ1bmN0aW9uKCl7IHRoaXMuc2Nyb2xsTGVmdCA9IHZhbHVlIH0gOlxuICAgICAgICBmdW5jdGlvbigpeyB0aGlzLnNjcm9sbFRvKHZhbHVlLCB0aGlzLnNjcm9sbFkpIH0pXG4gICAgfSxcbiAgICBwb3NpdGlvbjogZnVuY3Rpb24oKSB7XG4gICAgICBpZiAoIXRoaXMubGVuZ3RoKSByZXR1cm5cblxuICAgICAgdmFyIGVsZW0gPSB0aGlzWzBdLFxuICAgICAgICAvLyBHZXQgKnJlYWwqIG9mZnNldFBhcmVudFxuICAgICAgICBvZmZzZXRQYXJlbnQgPSB0aGlzLm9mZnNldFBhcmVudCgpLFxuICAgICAgICAvLyBHZXQgY29ycmVjdCBvZmZzZXRzXG4gICAgICAgIG9mZnNldCAgICAgICA9IHRoaXMub2Zmc2V0KCksXG4gICAgICAgIHBhcmVudE9mZnNldCA9IHJvb3ROb2RlUkUudGVzdChvZmZzZXRQYXJlbnRbMF0ubm9kZU5hbWUpID8geyB0b3A6IDAsIGxlZnQ6IDAgfSA6IG9mZnNldFBhcmVudC5vZmZzZXQoKVxuXG4gICAgICAvLyBTdWJ0cmFjdCBlbGVtZW50IG1hcmdpbnNcbiAgICAgIC8vIG5vdGU6IHdoZW4gYW4gZWxlbWVudCBoYXMgbWFyZ2luOiBhdXRvIHRoZSBvZmZzZXRMZWZ0IGFuZCBtYXJnaW5MZWZ0XG4gICAgICAvLyBhcmUgdGhlIHNhbWUgaW4gU2FmYXJpIGNhdXNpbmcgb2Zmc2V0LmxlZnQgdG8gaW5jb3JyZWN0bHkgYmUgMFxuICAgICAgb2Zmc2V0LnRvcCAgLT0gcGFyc2VGbG9hdCggJChlbGVtKS5jc3MoJ21hcmdpbi10b3AnKSApIHx8IDBcbiAgICAgIG9mZnNldC5sZWZ0IC09IHBhcnNlRmxvYXQoICQoZWxlbSkuY3NzKCdtYXJnaW4tbGVmdCcpICkgfHwgMFxuXG4gICAgICAvLyBBZGQgb2Zmc2V0UGFyZW50IGJvcmRlcnNcbiAgICAgIHBhcmVudE9mZnNldC50b3AgICs9IHBhcnNlRmxvYXQoICQob2Zmc2V0UGFyZW50WzBdKS5jc3MoJ2JvcmRlci10b3Atd2lkdGgnKSApIHx8IDBcbiAgICAgIHBhcmVudE9mZnNldC5sZWZ0ICs9IHBhcnNlRmxvYXQoICQob2Zmc2V0UGFyZW50WzBdKS5jc3MoJ2JvcmRlci1sZWZ0LXdpZHRoJykgKSB8fCAwXG5cbiAgICAgIC8vIFN1YnRyYWN0IHRoZSB0d28gb2Zmc2V0c1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgdG9wOiAgb2Zmc2V0LnRvcCAgLSBwYXJlbnRPZmZzZXQudG9wLFxuICAgICAgICBsZWZ0OiBvZmZzZXQubGVmdCAtIHBhcmVudE9mZnNldC5sZWZ0XG4gICAgICB9XG4gICAgfSxcbiAgICBvZmZzZXRQYXJlbnQ6IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHRoaXMubWFwKGZ1bmN0aW9uKCl7XG4gICAgICAgIHZhciBwYXJlbnQgPSB0aGlzLm9mZnNldFBhcmVudCB8fCBkb2N1bWVudC5ib2R5XG4gICAgICAgIHdoaWxlIChwYXJlbnQgJiYgIXJvb3ROb2RlUkUudGVzdChwYXJlbnQubm9kZU5hbWUpICYmICQocGFyZW50KS5jc3MoXCJwb3NpdGlvblwiKSA9PSBcInN0YXRpY1wiKVxuICAgICAgICAgIHBhcmVudCA9IHBhcmVudC5vZmZzZXRQYXJlbnRcbiAgICAgICAgcmV0dXJuIHBhcmVudFxuICAgICAgfSlcbiAgICB9XG4gIH1cblxuICAvLyBmb3Igbm93XG4gICQuZm4uZGV0YWNoID0gJC5mbi5yZW1vdmVcblxuICAvLyBHZW5lcmF0ZSB0aGUgYHdpZHRoYCBhbmQgYGhlaWdodGAgZnVuY3Rpb25zXG4gIDtbJ3dpZHRoJywgJ2hlaWdodCddLmZvckVhY2goZnVuY3Rpb24oZGltZW5zaW9uKXtcbiAgICB2YXIgZGltZW5zaW9uUHJvcGVydHkgPVxuICAgICAgZGltZW5zaW9uLnJlcGxhY2UoLy4vLCBmdW5jdGlvbihtKXsgcmV0dXJuIG1bMF0udG9VcHBlckNhc2UoKSB9KVxuXG4gICAgJC5mbltkaW1lbnNpb25dID0gZnVuY3Rpb24odmFsdWUpe1xuICAgICAgdmFyIG9mZnNldCwgZWwgPSB0aGlzWzBdXG4gICAgICBpZiAodmFsdWUgPT09IHVuZGVmaW5lZCkgcmV0dXJuIGlzV2luZG93KGVsKSA/IGVsWydpbm5lcicgKyBkaW1lbnNpb25Qcm9wZXJ0eV0gOlxuICAgICAgICBpc0RvY3VtZW50KGVsKSA/IGVsLmRvY3VtZW50RWxlbWVudFsnc2Nyb2xsJyArIGRpbWVuc2lvblByb3BlcnR5XSA6XG4gICAgICAgIChvZmZzZXQgPSB0aGlzLm9mZnNldCgpKSAmJiBvZmZzZXRbZGltZW5zaW9uXVxuICAgICAgZWxzZSByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uKGlkeCl7XG4gICAgICAgIGVsID0gJCh0aGlzKVxuICAgICAgICBlbC5jc3MoZGltZW5zaW9uLCBmdW5jQXJnKHRoaXMsIHZhbHVlLCBpZHgsIGVsW2RpbWVuc2lvbl0oKSkpXG4gICAgICB9KVxuICAgIH1cbiAgfSlcblxuICBmdW5jdGlvbiB0cmF2ZXJzZU5vZGUobm9kZSwgZnVuKSB7XG4gICAgZnVuKG5vZGUpXG4gICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IG5vZGUuY2hpbGROb2Rlcy5sZW5ndGg7IGkgPCBsZW47IGkrKylcbiAgICAgIHRyYXZlcnNlTm9kZShub2RlLmNoaWxkTm9kZXNbaV0sIGZ1bilcbiAgfVxuXG4gIC8vIEdlbmVyYXRlIHRoZSBgYWZ0ZXJgLCBgcHJlcGVuZGAsIGBiZWZvcmVgLCBgYXBwZW5kYCxcbiAgLy8gYGluc2VydEFmdGVyYCwgYGluc2VydEJlZm9yZWAsIGBhcHBlbmRUb2AsIGFuZCBgcHJlcGVuZFRvYCBtZXRob2RzLlxuICBhZGphY2VuY3lPcGVyYXRvcnMuZm9yRWFjaChmdW5jdGlvbihvcGVyYXRvciwgb3BlcmF0b3JJbmRleCkge1xuICAgIHZhciBpbnNpZGUgPSBvcGVyYXRvckluZGV4ICUgMiAvLz0+IHByZXBlbmQsIGFwcGVuZFxuXG4gICAgJC5mbltvcGVyYXRvcl0gPSBmdW5jdGlvbigpe1xuICAgICAgLy8gYXJndW1lbnRzIGNhbiBiZSBub2RlcywgYXJyYXlzIG9mIG5vZGVzLCBaZXB0byBvYmplY3RzIGFuZCBIVE1MIHN0cmluZ3NcbiAgICAgIHZhciBhcmdUeXBlLCBub2RlcyA9ICQubWFwKGFyZ3VtZW50cywgZnVuY3Rpb24oYXJnKSB7XG4gICAgICAgICAgICBhcmdUeXBlID0gdHlwZShhcmcpXG4gICAgICAgICAgICByZXR1cm4gYXJnVHlwZSA9PSBcIm9iamVjdFwiIHx8IGFyZ1R5cGUgPT0gXCJhcnJheVwiIHx8IGFyZyA9PSBudWxsID9cbiAgICAgICAgICAgICAgYXJnIDogemVwdG8uZnJhZ21lbnQoYXJnKVxuICAgICAgICAgIH0pLFxuICAgICAgICAgIHBhcmVudCwgY29weUJ5Q2xvbmUgPSB0aGlzLmxlbmd0aCA+IDFcbiAgICAgIGlmIChub2Rlcy5sZW5ndGggPCAxKSByZXR1cm4gdGhpc1xuXG4gICAgICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uKF8sIHRhcmdldCl7XG4gICAgICAgIHBhcmVudCA9IGluc2lkZSA/IHRhcmdldCA6IHRhcmdldC5wYXJlbnROb2RlXG5cbiAgICAgICAgLy8gY29udmVydCBhbGwgbWV0aG9kcyB0byBhIFwiYmVmb3JlXCIgb3BlcmF0aW9uXG4gICAgICAgIHRhcmdldCA9IG9wZXJhdG9ySW5kZXggPT0gMCA/IHRhcmdldC5uZXh0U2libGluZyA6XG4gICAgICAgICAgICAgICAgIG9wZXJhdG9ySW5kZXggPT0gMSA/IHRhcmdldC5maXJzdENoaWxkIDpcbiAgICAgICAgICAgICAgICAgb3BlcmF0b3JJbmRleCA9PSAyID8gdGFyZ2V0IDpcbiAgICAgICAgICAgICAgICAgbnVsbFxuXG4gICAgICAgIHZhciBwYXJlbnRJbkRvY3VtZW50ID0gJC5jb250YWlucyhkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQsIHBhcmVudClcblxuICAgICAgICBub2Rlcy5mb3JFYWNoKGZ1bmN0aW9uKG5vZGUpe1xuICAgICAgICAgIGlmIChjb3B5QnlDbG9uZSkgbm9kZSA9IG5vZGUuY2xvbmVOb2RlKHRydWUpXG4gICAgICAgICAgZWxzZSBpZiAoIXBhcmVudCkgcmV0dXJuICQobm9kZSkucmVtb3ZlKClcblxuICAgICAgICAgIHBhcmVudC5pbnNlcnRCZWZvcmUobm9kZSwgdGFyZ2V0KVxuICAgICAgICAgIGlmIChwYXJlbnRJbkRvY3VtZW50KSB0cmF2ZXJzZU5vZGUobm9kZSwgZnVuY3Rpb24oZWwpe1xuICAgICAgICAgICAgaWYgKGVsLm5vZGVOYW1lICE9IG51bGwgJiYgZWwubm9kZU5hbWUudG9VcHBlckNhc2UoKSA9PT0gJ1NDUklQVCcgJiZcbiAgICAgICAgICAgICAgICghZWwudHlwZSB8fCBlbC50eXBlID09PSAndGV4dC9qYXZhc2NyaXB0JykgJiYgIWVsLnNyYylcbiAgICAgICAgICAgICAgd2luZG93WydldmFsJ10uY2FsbCh3aW5kb3csIGVsLmlubmVySFRNTClcbiAgICAgICAgICB9KVxuICAgICAgICB9KVxuICAgICAgfSlcbiAgICB9XG5cbiAgICAvLyBhZnRlciAgICA9PiBpbnNlcnRBZnRlclxuICAgIC8vIHByZXBlbmQgID0+IHByZXBlbmRUb1xuICAgIC8vIGJlZm9yZSAgID0+IGluc2VydEJlZm9yZVxuICAgIC8vIGFwcGVuZCAgID0+IGFwcGVuZFRvXG4gICAgJC5mbltpbnNpZGUgPyBvcGVyYXRvcisnVG8nIDogJ2luc2VydCcrKG9wZXJhdG9ySW5kZXggPyAnQmVmb3JlJyA6ICdBZnRlcicpXSA9IGZ1bmN0aW9uKGh0bWwpe1xuICAgICAgJChodG1sKVtvcGVyYXRvcl0odGhpcylcbiAgICAgIHJldHVybiB0aGlzXG4gICAgfVxuICB9KVxuXG4gIHplcHRvLloucHJvdG90eXBlID0gJC5mblxuXG4gIC8vIEV4cG9ydCBpbnRlcm5hbCBBUEkgZnVuY3Rpb25zIGluIHRoZSBgJC56ZXB0b2AgbmFtZXNwYWNlXG4gIHplcHRvLnVuaXEgPSB1bmlxXG4gIHplcHRvLmRlc2VyaWFsaXplVmFsdWUgPSBkZXNlcmlhbGl6ZVZhbHVlXG4gICQuemVwdG8gPSB6ZXB0b1xuXG4gIHJldHVybiAkXG59KSgpXG5cbjsoZnVuY3Rpb24oJCl7XG4gIHZhciBfemlkID0gMSwgdW5kZWZpbmVkLFxuICAgICAgc2xpY2UgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UsXG4gICAgICBpc0Z1bmN0aW9uID0gJC5pc0Z1bmN0aW9uLFxuICAgICAgaXNTdHJpbmcgPSBmdW5jdGlvbihvYmopeyByZXR1cm4gdHlwZW9mIG9iaiA9PSAnc3RyaW5nJyB9LFxuICAgICAgaGFuZGxlcnMgPSB7fSxcbiAgICAgIHNwZWNpYWxFdmVudHM9e30sXG4gICAgICBmb2N1c2luU3VwcG9ydGVkID0gJ29uZm9jdXNpbicgaW4gd2luZG93LFxuICAgICAgZm9jdXMgPSB7IGZvY3VzOiAnZm9jdXNpbicsIGJsdXI6ICdmb2N1c291dCcgfSxcbiAgICAgIGhvdmVyID0geyBtb3VzZWVudGVyOiAnbW91c2VvdmVyJywgbW91c2VsZWF2ZTogJ21vdXNlb3V0JyB9XG5cbiAgc3BlY2lhbEV2ZW50cy5jbGljayA9IHNwZWNpYWxFdmVudHMubW91c2Vkb3duID0gc3BlY2lhbEV2ZW50cy5tb3VzZXVwID0gc3BlY2lhbEV2ZW50cy5tb3VzZW1vdmUgPSAnTW91c2VFdmVudHMnXG5cbiAgZnVuY3Rpb24gemlkKGVsZW1lbnQpIHtcbiAgICByZXR1cm4gZWxlbWVudC5femlkIHx8IChlbGVtZW50Ll96aWQgPSBfemlkKyspXG4gIH1cbiAgZnVuY3Rpb24gZmluZEhhbmRsZXJzKGVsZW1lbnQsIGV2ZW50LCBmbiwgc2VsZWN0b3IpIHtcbiAgICBldmVudCA9IHBhcnNlKGV2ZW50KVxuICAgIGlmIChldmVudC5ucykgdmFyIG1hdGNoZXIgPSBtYXRjaGVyRm9yKGV2ZW50Lm5zKVxuICAgIHJldHVybiAoaGFuZGxlcnNbemlkKGVsZW1lbnQpXSB8fCBbXSkuZmlsdGVyKGZ1bmN0aW9uKGhhbmRsZXIpIHtcbiAgICAgIHJldHVybiBoYW5kbGVyXG4gICAgICAgICYmICghZXZlbnQuZSAgfHwgaGFuZGxlci5lID09IGV2ZW50LmUpXG4gICAgICAgICYmICghZXZlbnQubnMgfHwgbWF0Y2hlci50ZXN0KGhhbmRsZXIubnMpKVxuICAgICAgICAmJiAoIWZuICAgICAgIHx8IHppZChoYW5kbGVyLmZuKSA9PT0gemlkKGZuKSlcbiAgICAgICAgJiYgKCFzZWxlY3RvciB8fCBoYW5kbGVyLnNlbCA9PSBzZWxlY3RvcilcbiAgICB9KVxuICB9XG4gIGZ1bmN0aW9uIHBhcnNlKGV2ZW50KSB7XG4gICAgdmFyIHBhcnRzID0gKCcnICsgZXZlbnQpLnNwbGl0KCcuJylcbiAgICByZXR1cm4ge2U6IHBhcnRzWzBdLCBuczogcGFydHMuc2xpY2UoMSkuc29ydCgpLmpvaW4oJyAnKX1cbiAgfVxuICBmdW5jdGlvbiBtYXRjaGVyRm9yKG5zKSB7XG4gICAgcmV0dXJuIG5ldyBSZWdFeHAoJyg/Ol58ICknICsgbnMucmVwbGFjZSgnICcsICcgLiogPycpICsgJyg/OiB8JCknKVxuICB9XG5cbiAgZnVuY3Rpb24gZXZlbnRDYXB0dXJlKGhhbmRsZXIsIGNhcHR1cmVTZXR0aW5nKSB7XG4gICAgcmV0dXJuIGhhbmRsZXIuZGVsICYmXG4gICAgICAoIWZvY3VzaW5TdXBwb3J0ZWQgJiYgKGhhbmRsZXIuZSBpbiBmb2N1cykpIHx8XG4gICAgICAhIWNhcHR1cmVTZXR0aW5nXG4gIH1cblxuICBmdW5jdGlvbiByZWFsRXZlbnQodHlwZSkge1xuICAgIHJldHVybiBob3Zlclt0eXBlXSB8fCAoZm9jdXNpblN1cHBvcnRlZCAmJiBmb2N1c1t0eXBlXSkgfHwgdHlwZVxuICB9XG5cbiAgZnVuY3Rpb24gYWRkKGVsZW1lbnQsIGV2ZW50cywgZm4sIGRhdGEsIHNlbGVjdG9yLCBkZWxlZ2F0b3IsIGNhcHR1cmUpe1xuICAgIHZhciBpZCA9IHppZChlbGVtZW50KSwgc2V0ID0gKGhhbmRsZXJzW2lkXSB8fCAoaGFuZGxlcnNbaWRdID0gW10pKVxuICAgIGV2ZW50cy5zcGxpdCgvXFxzLykuZm9yRWFjaChmdW5jdGlvbihldmVudCl7XG4gICAgICBpZiAoZXZlbnQgPT0gJ3JlYWR5JykgcmV0dXJuICQoZG9jdW1lbnQpLnJlYWR5KGZuKVxuICAgICAgdmFyIGhhbmRsZXIgICA9IHBhcnNlKGV2ZW50KVxuICAgICAgaGFuZGxlci5mbiAgICA9IGZuXG4gICAgICBoYW5kbGVyLnNlbCAgID0gc2VsZWN0b3JcbiAgICAgIC8vIGVtdWxhdGUgbW91c2VlbnRlciwgbW91c2VsZWF2ZVxuICAgICAgaWYgKGhhbmRsZXIuZSBpbiBob3ZlcikgZm4gPSBmdW5jdGlvbihlKXtcbiAgICAgICAgdmFyIHJlbGF0ZWQgPSBlLnJlbGF0ZWRUYXJnZXRcbiAgICAgICAgaWYgKCFyZWxhdGVkIHx8IChyZWxhdGVkICE9PSB0aGlzICYmICEkLmNvbnRhaW5zKHRoaXMsIHJlbGF0ZWQpKSlcbiAgICAgICAgICByZXR1cm4gaGFuZGxlci5mbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpXG4gICAgICB9XG4gICAgICBoYW5kbGVyLmRlbCAgID0gZGVsZWdhdG9yXG4gICAgICB2YXIgY2FsbGJhY2sgID0gZGVsZWdhdG9yIHx8IGZuXG4gICAgICBoYW5kbGVyLnByb3h5ID0gZnVuY3Rpb24oZSl7XG4gICAgICAgIGUgPSBjb21wYXRpYmxlKGUpXG4gICAgICAgIGlmIChlLmlzSW1tZWRpYXRlUHJvcGFnYXRpb25TdG9wcGVkKCkpIHJldHVyblxuICAgICAgICBlLmRhdGEgPSBkYXRhXG4gICAgICAgIHZhciByZXN1bHQgPSBjYWxsYmFjay5hcHBseShlbGVtZW50LCBlLl9hcmdzID09IHVuZGVmaW5lZCA/IFtlXSA6IFtlXS5jb25jYXQoZS5fYXJncykpXG4gICAgICAgIGlmIChyZXN1bHQgPT09IGZhbHNlKSBlLnByZXZlbnREZWZhdWx0KCksIGUuc3RvcFByb3BhZ2F0aW9uKClcbiAgICAgICAgcmV0dXJuIHJlc3VsdFxuICAgICAgfVxuICAgICAgaGFuZGxlci5pID0gc2V0Lmxlbmd0aFxuICAgICAgc2V0LnB1c2goaGFuZGxlcilcbiAgICAgIGlmICgnYWRkRXZlbnRMaXN0ZW5lcicgaW4gZWxlbWVudClcbiAgICAgICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKHJlYWxFdmVudChoYW5kbGVyLmUpLCBoYW5kbGVyLnByb3h5LCBldmVudENhcHR1cmUoaGFuZGxlciwgY2FwdHVyZSkpXG4gICAgfSlcbiAgfVxuICBmdW5jdGlvbiByZW1vdmUoZWxlbWVudCwgZXZlbnRzLCBmbiwgc2VsZWN0b3IsIGNhcHR1cmUpe1xuICAgIHZhciBpZCA9IHppZChlbGVtZW50KVxuICAgIDsoZXZlbnRzIHx8ICcnKS5zcGxpdCgvXFxzLykuZm9yRWFjaChmdW5jdGlvbihldmVudCl7XG4gICAgICBmaW5kSGFuZGxlcnMoZWxlbWVudCwgZXZlbnQsIGZuLCBzZWxlY3RvcikuZm9yRWFjaChmdW5jdGlvbihoYW5kbGVyKXtcbiAgICAgICAgZGVsZXRlIGhhbmRsZXJzW2lkXVtoYW5kbGVyLmldXG4gICAgICBpZiAoJ3JlbW92ZUV2ZW50TGlzdGVuZXInIGluIGVsZW1lbnQpXG4gICAgICAgIGVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihyZWFsRXZlbnQoaGFuZGxlci5lKSwgaGFuZGxlci5wcm94eSwgZXZlbnRDYXB0dXJlKGhhbmRsZXIsIGNhcHR1cmUpKVxuICAgICAgfSlcbiAgICB9KVxuICB9XG5cbiAgJC5ldmVudCA9IHsgYWRkOiBhZGQsIHJlbW92ZTogcmVtb3ZlIH1cblxuICAkLnByb3h5ID0gZnVuY3Rpb24oZm4sIGNvbnRleHQpIHtcbiAgICB2YXIgYXJncyA9ICgyIGluIGFyZ3VtZW50cykgJiYgc2xpY2UuY2FsbChhcmd1bWVudHMsIDIpXG4gICAgaWYgKGlzRnVuY3Rpb24oZm4pKSB7XG4gICAgICB2YXIgcHJveHlGbiA9IGZ1bmN0aW9uKCl7IHJldHVybiBmbi5hcHBseShjb250ZXh0LCBhcmdzID8gYXJncy5jb25jYXQoc2xpY2UuY2FsbChhcmd1bWVudHMpKSA6IGFyZ3VtZW50cykgfVxuICAgICAgcHJveHlGbi5femlkID0gemlkKGZuKVxuICAgICAgcmV0dXJuIHByb3h5Rm5cbiAgICB9IGVsc2UgaWYgKGlzU3RyaW5nKGNvbnRleHQpKSB7XG4gICAgICBpZiAoYXJncykge1xuICAgICAgICBhcmdzLnVuc2hpZnQoZm5bY29udGV4dF0sIGZuKVxuICAgICAgICByZXR1cm4gJC5wcm94eS5hcHBseShudWxsLCBhcmdzKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuICQucHJveHkoZm5bY29udGV4dF0sIGZuKVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiZXhwZWN0ZWQgZnVuY3Rpb25cIilcbiAgICB9XG4gIH1cblxuICAkLmZuLmJpbmQgPSBmdW5jdGlvbihldmVudCwgZGF0YSwgY2FsbGJhY2spe1xuICAgIHJldHVybiB0aGlzLm9uKGV2ZW50LCBkYXRhLCBjYWxsYmFjaylcbiAgfVxuICAkLmZuLnVuYmluZCA9IGZ1bmN0aW9uKGV2ZW50LCBjYWxsYmFjayl7XG4gICAgcmV0dXJuIHRoaXMub2ZmKGV2ZW50LCBjYWxsYmFjaylcbiAgfVxuICAkLmZuLm9uZSA9IGZ1bmN0aW9uKGV2ZW50LCBzZWxlY3RvciwgZGF0YSwgY2FsbGJhY2spe1xuICAgIHJldHVybiB0aGlzLm9uKGV2ZW50LCBzZWxlY3RvciwgZGF0YSwgY2FsbGJhY2ssIDEpXG4gIH1cblxuICB2YXIgcmV0dXJuVHJ1ZSA9IGZ1bmN0aW9uKCl7cmV0dXJuIHRydWV9LFxuICAgICAgcmV0dXJuRmFsc2UgPSBmdW5jdGlvbigpe3JldHVybiBmYWxzZX0sXG4gICAgICBpZ25vcmVQcm9wZXJ0aWVzID0gL14oW0EtWl18cmV0dXJuVmFsdWUkfGxheWVyW1hZXSQpLyxcbiAgICAgIGV2ZW50TWV0aG9kcyA9IHtcbiAgICAgICAgcHJldmVudERlZmF1bHQ6ICdpc0RlZmF1bHRQcmV2ZW50ZWQnLFxuICAgICAgICBzdG9wSW1tZWRpYXRlUHJvcGFnYXRpb246ICdpc0ltbWVkaWF0ZVByb3BhZ2F0aW9uU3RvcHBlZCcsXG4gICAgICAgIHN0b3BQcm9wYWdhdGlvbjogJ2lzUHJvcGFnYXRpb25TdG9wcGVkJ1xuICAgICAgfVxuXG4gIGZ1bmN0aW9uIGNvbXBhdGlibGUoZXZlbnQsIHNvdXJjZSkge1xuICAgIGlmIChzb3VyY2UgfHwgIWV2ZW50LmlzRGVmYXVsdFByZXZlbnRlZCkge1xuICAgICAgc291cmNlIHx8IChzb3VyY2UgPSBldmVudClcblxuICAgICAgJC5lYWNoKGV2ZW50TWV0aG9kcywgZnVuY3Rpb24obmFtZSwgcHJlZGljYXRlKSB7XG4gICAgICAgIHZhciBzb3VyY2VNZXRob2QgPSBzb3VyY2VbbmFtZV1cbiAgICAgICAgZXZlbnRbbmFtZV0gPSBmdW5jdGlvbigpe1xuICAgICAgICAgIHRoaXNbcHJlZGljYXRlXSA9IHJldHVyblRydWVcbiAgICAgICAgICByZXR1cm4gc291cmNlTWV0aG9kICYmIHNvdXJjZU1ldGhvZC5hcHBseShzb3VyY2UsIGFyZ3VtZW50cylcbiAgICAgICAgfVxuICAgICAgICBldmVudFtwcmVkaWNhdGVdID0gcmV0dXJuRmFsc2VcbiAgICAgIH0pXG5cbiAgICAgIGlmIChzb3VyY2UuZGVmYXVsdFByZXZlbnRlZCAhPT0gdW5kZWZpbmVkID8gc291cmNlLmRlZmF1bHRQcmV2ZW50ZWQgOlxuICAgICAgICAgICdyZXR1cm5WYWx1ZScgaW4gc291cmNlID8gc291cmNlLnJldHVyblZhbHVlID09PSBmYWxzZSA6XG4gICAgICAgICAgc291cmNlLmdldFByZXZlbnREZWZhdWx0ICYmIHNvdXJjZS5nZXRQcmV2ZW50RGVmYXVsdCgpKVxuICAgICAgICBldmVudC5pc0RlZmF1bHRQcmV2ZW50ZWQgPSByZXR1cm5UcnVlXG4gICAgfVxuICAgIHJldHVybiBldmVudFxuICB9XG5cbiAgZnVuY3Rpb24gY3JlYXRlUHJveHkoZXZlbnQpIHtcbiAgICB2YXIga2V5LCBwcm94eSA9IHsgb3JpZ2luYWxFdmVudDogZXZlbnQgfVxuICAgIGZvciAoa2V5IGluIGV2ZW50KVxuICAgICAgaWYgKCFpZ25vcmVQcm9wZXJ0aWVzLnRlc3Qoa2V5KSAmJiBldmVudFtrZXldICE9PSB1bmRlZmluZWQpIHByb3h5W2tleV0gPSBldmVudFtrZXldXG5cbiAgICByZXR1cm4gY29tcGF0aWJsZShwcm94eSwgZXZlbnQpXG4gIH1cblxuICAkLmZuLmRlbGVnYXRlID0gZnVuY3Rpb24oc2VsZWN0b3IsIGV2ZW50LCBjYWxsYmFjayl7XG4gICAgcmV0dXJuIHRoaXMub24oZXZlbnQsIHNlbGVjdG9yLCBjYWxsYmFjaylcbiAgfVxuICAkLmZuLnVuZGVsZWdhdGUgPSBmdW5jdGlvbihzZWxlY3RvciwgZXZlbnQsIGNhbGxiYWNrKXtcbiAgICByZXR1cm4gdGhpcy5vZmYoZXZlbnQsIHNlbGVjdG9yLCBjYWxsYmFjaylcbiAgfVxuXG4gICQuZm4ubGl2ZSA9IGZ1bmN0aW9uKGV2ZW50LCBjYWxsYmFjayl7XG4gICAgJChkb2N1bWVudC5ib2R5KS5kZWxlZ2F0ZSh0aGlzLnNlbGVjdG9yLCBldmVudCwgY2FsbGJhY2spXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuICAkLmZuLmRpZSA9IGZ1bmN0aW9uKGV2ZW50LCBjYWxsYmFjayl7XG4gICAgJChkb2N1bWVudC5ib2R5KS51bmRlbGVnYXRlKHRoaXMuc2VsZWN0b3IsIGV2ZW50LCBjYWxsYmFjaylcbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgJC5mbi5vbiA9IGZ1bmN0aW9uKGV2ZW50LCBzZWxlY3RvciwgZGF0YSwgY2FsbGJhY2ssIG9uZSl7XG4gICAgdmFyIGF1dG9SZW1vdmUsIGRlbGVnYXRvciwgJHRoaXMgPSB0aGlzXG4gICAgaWYgKGV2ZW50ICYmICFpc1N0cmluZyhldmVudCkpIHtcbiAgICAgICQuZWFjaChldmVudCwgZnVuY3Rpb24odHlwZSwgZm4pe1xuICAgICAgICAkdGhpcy5vbih0eXBlLCBzZWxlY3RvciwgZGF0YSwgZm4sIG9uZSlcbiAgICAgIH0pXG4gICAgICByZXR1cm4gJHRoaXNcbiAgICB9XG5cbiAgICBpZiAoIWlzU3RyaW5nKHNlbGVjdG9yKSAmJiAhaXNGdW5jdGlvbihjYWxsYmFjaykgJiYgY2FsbGJhY2sgIT09IGZhbHNlKVxuICAgICAgY2FsbGJhY2sgPSBkYXRhLCBkYXRhID0gc2VsZWN0b3IsIHNlbGVjdG9yID0gdW5kZWZpbmVkXG4gICAgaWYgKGlzRnVuY3Rpb24oZGF0YSkgfHwgZGF0YSA9PT0gZmFsc2UpXG4gICAgICBjYWxsYmFjayA9IGRhdGEsIGRhdGEgPSB1bmRlZmluZWRcblxuICAgIGlmIChjYWxsYmFjayA9PT0gZmFsc2UpIGNhbGxiYWNrID0gcmV0dXJuRmFsc2VcblxuICAgIHJldHVybiAkdGhpcy5lYWNoKGZ1bmN0aW9uKF8sIGVsZW1lbnQpe1xuICAgICAgaWYgKG9uZSkgYXV0b1JlbW92ZSA9IGZ1bmN0aW9uKGUpe1xuICAgICAgICByZW1vdmUoZWxlbWVudCwgZS50eXBlLCBjYWxsYmFjaylcbiAgICAgICAgcmV0dXJuIGNhbGxiYWNrLmFwcGx5KHRoaXMsIGFyZ3VtZW50cylcbiAgICAgIH1cblxuICAgICAgaWYgKHNlbGVjdG9yKSBkZWxlZ2F0b3IgPSBmdW5jdGlvbihlKXtcbiAgICAgICAgdmFyIGV2dCwgbWF0Y2ggPSAkKGUudGFyZ2V0KS5jbG9zZXN0KHNlbGVjdG9yLCBlbGVtZW50KS5nZXQoMClcbiAgICAgICAgaWYgKG1hdGNoICYmIG1hdGNoICE9PSBlbGVtZW50KSB7XG4gICAgICAgICAgZXZ0ID0gJC5leHRlbmQoY3JlYXRlUHJveHkoZSksIHtjdXJyZW50VGFyZ2V0OiBtYXRjaCwgbGl2ZUZpcmVkOiBlbGVtZW50fSlcbiAgICAgICAgICByZXR1cm4gKGF1dG9SZW1vdmUgfHwgY2FsbGJhY2spLmFwcGx5KG1hdGNoLCBbZXZ0XS5jb25jYXQoc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpKSlcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBhZGQoZWxlbWVudCwgZXZlbnQsIGNhbGxiYWNrLCBkYXRhLCBzZWxlY3RvciwgZGVsZWdhdG9yIHx8IGF1dG9SZW1vdmUpXG4gICAgfSlcbiAgfVxuICAkLmZuLm9mZiA9IGZ1bmN0aW9uKGV2ZW50LCBzZWxlY3RvciwgY2FsbGJhY2spe1xuICAgIHZhciAkdGhpcyA9IHRoaXNcbiAgICBpZiAoZXZlbnQgJiYgIWlzU3RyaW5nKGV2ZW50KSkge1xuICAgICAgJC5lYWNoKGV2ZW50LCBmdW5jdGlvbih0eXBlLCBmbil7XG4gICAgICAgICR0aGlzLm9mZih0eXBlLCBzZWxlY3RvciwgZm4pXG4gICAgICB9KVxuICAgICAgcmV0dXJuICR0aGlzXG4gICAgfVxuXG4gICAgaWYgKCFpc1N0cmluZyhzZWxlY3RvcikgJiYgIWlzRnVuY3Rpb24oY2FsbGJhY2spICYmIGNhbGxiYWNrICE9PSBmYWxzZSlcbiAgICAgIGNhbGxiYWNrID0gc2VsZWN0b3IsIHNlbGVjdG9yID0gdW5kZWZpbmVkXG5cbiAgICBpZiAoY2FsbGJhY2sgPT09IGZhbHNlKSBjYWxsYmFjayA9IHJldHVybkZhbHNlXG5cbiAgICByZXR1cm4gJHRoaXMuZWFjaChmdW5jdGlvbigpe1xuICAgICAgcmVtb3ZlKHRoaXMsIGV2ZW50LCBjYWxsYmFjaywgc2VsZWN0b3IpXG4gICAgfSlcbiAgfVxuXG4gICQuZm4udHJpZ2dlciA9IGZ1bmN0aW9uKGV2ZW50LCBhcmdzKXtcbiAgICBldmVudCA9IChpc1N0cmluZyhldmVudCkgfHwgJC5pc1BsYWluT2JqZWN0KGV2ZW50KSkgPyAkLkV2ZW50KGV2ZW50KSA6IGNvbXBhdGlibGUoZXZlbnQpXG4gICAgZXZlbnQuX2FyZ3MgPSBhcmdzXG4gICAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbigpe1xuICAgICAgLy8gaGFuZGxlIGZvY3VzKCksIGJsdXIoKSBieSBjYWxsaW5nIHRoZW0gZGlyZWN0bHlcbiAgICAgIGlmIChldmVudC50eXBlIGluIGZvY3VzICYmIHR5cGVvZiB0aGlzW2V2ZW50LnR5cGVdID09IFwiZnVuY3Rpb25cIikgdGhpc1tldmVudC50eXBlXSgpXG4gICAgICAvLyBpdGVtcyBpbiB0aGUgY29sbGVjdGlvbiBtaWdodCBub3QgYmUgRE9NIGVsZW1lbnRzXG4gICAgICBlbHNlIGlmICgnZGlzcGF0Y2hFdmVudCcgaW4gdGhpcykgdGhpcy5kaXNwYXRjaEV2ZW50KGV2ZW50KVxuICAgICAgZWxzZSAkKHRoaXMpLnRyaWdnZXJIYW5kbGVyKGV2ZW50LCBhcmdzKVxuICAgIH0pXG4gIH1cblxuICAvLyB0cmlnZ2VycyBldmVudCBoYW5kbGVycyBvbiBjdXJyZW50IGVsZW1lbnQganVzdCBhcyBpZiBhbiBldmVudCBvY2N1cnJlZCxcbiAgLy8gZG9lc24ndCB0cmlnZ2VyIGFuIGFjdHVhbCBldmVudCwgZG9lc24ndCBidWJibGVcbiAgJC5mbi50cmlnZ2VySGFuZGxlciA9IGZ1bmN0aW9uKGV2ZW50LCBhcmdzKXtcbiAgICB2YXIgZSwgcmVzdWx0XG4gICAgdGhpcy5lYWNoKGZ1bmN0aW9uKGksIGVsZW1lbnQpe1xuICAgICAgZSA9IGNyZWF0ZVByb3h5KGlzU3RyaW5nKGV2ZW50KSA/ICQuRXZlbnQoZXZlbnQpIDogZXZlbnQpXG4gICAgICBlLl9hcmdzID0gYXJnc1xuICAgICAgZS50YXJnZXQgPSBlbGVtZW50XG4gICAgICAkLmVhY2goZmluZEhhbmRsZXJzKGVsZW1lbnQsIGV2ZW50LnR5cGUgfHwgZXZlbnQpLCBmdW5jdGlvbihpLCBoYW5kbGVyKXtcbiAgICAgICAgcmVzdWx0ID0gaGFuZGxlci5wcm94eShlKVxuICAgICAgICBpZiAoZS5pc0ltbWVkaWF0ZVByb3BhZ2F0aW9uU3RvcHBlZCgpKSByZXR1cm4gZmFsc2VcbiAgICAgIH0pXG4gICAgfSlcbiAgICByZXR1cm4gcmVzdWx0XG4gIH1cblxuICAvLyBzaG9ydGN1dCBtZXRob2RzIGZvciBgLmJpbmQoZXZlbnQsIGZuKWAgZm9yIGVhY2ggZXZlbnQgdHlwZVxuICA7KCdmb2N1c2luIGZvY3Vzb3V0IGZvY3VzIGJsdXIgbG9hZCByZXNpemUgc2Nyb2xsIHVubG9hZCBjbGljayBkYmxjbGljayAnK1xuICAnbW91c2Vkb3duIG1vdXNldXAgbW91c2Vtb3ZlIG1vdXNlb3ZlciBtb3VzZW91dCBtb3VzZWVudGVyIG1vdXNlbGVhdmUgJytcbiAgJ2NoYW5nZSBzZWxlY3Qga2V5ZG93biBrZXlwcmVzcyBrZXl1cCBlcnJvcicpLnNwbGl0KCcgJykuZm9yRWFjaChmdW5jdGlvbihldmVudCkge1xuICAgICQuZm5bZXZlbnRdID0gZnVuY3Rpb24oY2FsbGJhY2spIHtcbiAgICAgIHJldHVybiAoMCBpbiBhcmd1bWVudHMpID9cbiAgICAgICAgdGhpcy5iaW5kKGV2ZW50LCBjYWxsYmFjaykgOlxuICAgICAgICB0aGlzLnRyaWdnZXIoZXZlbnQpXG4gICAgfVxuICB9KVxuXG4gICQuRXZlbnQgPSBmdW5jdGlvbih0eXBlLCBwcm9wcykge1xuICAgIGlmICghaXNTdHJpbmcodHlwZSkpIHByb3BzID0gdHlwZSwgdHlwZSA9IHByb3BzLnR5cGVcbiAgICB2YXIgZXZlbnQgPSBkb2N1bWVudC5jcmVhdGVFdmVudChzcGVjaWFsRXZlbnRzW3R5cGVdIHx8ICdFdmVudHMnKSwgYnViYmxlcyA9IHRydWVcbiAgICBpZiAocHJvcHMpIGZvciAodmFyIG5hbWUgaW4gcHJvcHMpIChuYW1lID09ICdidWJibGVzJykgPyAoYnViYmxlcyA9ICEhcHJvcHNbbmFtZV0pIDogKGV2ZW50W25hbWVdID0gcHJvcHNbbmFtZV0pXG4gICAgZXZlbnQuaW5pdEV2ZW50KHR5cGUsIGJ1YmJsZXMsIHRydWUpXG4gICAgcmV0dXJuIGNvbXBhdGlibGUoZXZlbnQpXG4gIH1cblxufSkoWmVwdG8pXG5cbjsoZnVuY3Rpb24oJCl7XG4gIHZhciBqc29ucElEID0gMCxcbiAgICAgIGRvY3VtZW50ID0gd2luZG93LmRvY3VtZW50LFxuICAgICAga2V5LFxuICAgICAgbmFtZSxcbiAgICAgIHJzY3JpcHQgPSAvPHNjcmlwdFxcYltePF0qKD86KD8hPFxcL3NjcmlwdD4pPFtePF0qKSo8XFwvc2NyaXB0Pi9naSxcbiAgICAgIHNjcmlwdFR5cGVSRSA9IC9eKD86dGV4dHxhcHBsaWNhdGlvbilcXC9qYXZhc2NyaXB0L2ksXG4gICAgICB4bWxUeXBlUkUgPSAvXig/OnRleHR8YXBwbGljYXRpb24pXFwveG1sL2ksXG4gICAgICBqc29uVHlwZSA9ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgIGh0bWxUeXBlID0gJ3RleHQvaHRtbCcsXG4gICAgICBibGFua1JFID0gL15cXHMqJC8sXG4gICAgICBvcmlnaW5BbmNob3IgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJylcblxuICBvcmlnaW5BbmNob3IuaHJlZiA9IHdpbmRvdy5sb2NhdGlvbi5ocmVmXG5cbiAgLy8gdHJpZ2dlciBhIGN1c3RvbSBldmVudCBhbmQgcmV0dXJuIGZhbHNlIGlmIGl0IHdhcyBjYW5jZWxsZWRcbiAgZnVuY3Rpb24gdHJpZ2dlckFuZFJldHVybihjb250ZXh0LCBldmVudE5hbWUsIGRhdGEpIHtcbiAgICB2YXIgZXZlbnQgPSAkLkV2ZW50KGV2ZW50TmFtZSlcbiAgICAkKGNvbnRleHQpLnRyaWdnZXIoZXZlbnQsIGRhdGEpXG4gICAgcmV0dXJuICFldmVudC5pc0RlZmF1bHRQcmV2ZW50ZWQoKVxuICB9XG5cbiAgLy8gdHJpZ2dlciBhbiBBamF4IFwiZ2xvYmFsXCIgZXZlbnRcbiAgZnVuY3Rpb24gdHJpZ2dlckdsb2JhbChzZXR0aW5ncywgY29udGV4dCwgZXZlbnROYW1lLCBkYXRhKSB7XG4gICAgaWYgKHNldHRpbmdzLmdsb2JhbCkgcmV0dXJuIHRyaWdnZXJBbmRSZXR1cm4oY29udGV4dCB8fCBkb2N1bWVudCwgZXZlbnROYW1lLCBkYXRhKVxuICB9XG5cbiAgLy8gTnVtYmVyIG9mIGFjdGl2ZSBBamF4IHJlcXVlc3RzXG4gICQuYWN0aXZlID0gMFxuXG4gIGZ1bmN0aW9uIGFqYXhTdGFydChzZXR0aW5ncykge1xuICAgIGlmIChzZXR0aW5ncy5nbG9iYWwgJiYgJC5hY3RpdmUrKyA9PT0gMCkgdHJpZ2dlckdsb2JhbChzZXR0aW5ncywgbnVsbCwgJ2FqYXhTdGFydCcpXG4gIH1cbiAgZnVuY3Rpb24gYWpheFN0b3Aoc2V0dGluZ3MpIHtcbiAgICBpZiAoc2V0dGluZ3MuZ2xvYmFsICYmICEoLS0kLmFjdGl2ZSkpIHRyaWdnZXJHbG9iYWwoc2V0dGluZ3MsIG51bGwsICdhamF4U3RvcCcpXG4gIH1cblxuICAvLyB0cmlnZ2VycyBhbiBleHRyYSBnbG9iYWwgZXZlbnQgXCJhamF4QmVmb3JlU2VuZFwiIHRoYXQncyBsaWtlIFwiYWpheFNlbmRcIiBidXQgY2FuY2VsYWJsZVxuICBmdW5jdGlvbiBhamF4QmVmb3JlU2VuZCh4aHIsIHNldHRpbmdzKSB7XG4gICAgdmFyIGNvbnRleHQgPSBzZXR0aW5ncy5jb250ZXh0XG4gICAgaWYgKHNldHRpbmdzLmJlZm9yZVNlbmQuY2FsbChjb250ZXh0LCB4aHIsIHNldHRpbmdzKSA9PT0gZmFsc2UgfHxcbiAgICAgICAgdHJpZ2dlckdsb2JhbChzZXR0aW5ncywgY29udGV4dCwgJ2FqYXhCZWZvcmVTZW5kJywgW3hociwgc2V0dGluZ3NdKSA9PT0gZmFsc2UpXG4gICAgICByZXR1cm4gZmFsc2VcblxuICAgIHRyaWdnZXJHbG9iYWwoc2V0dGluZ3MsIGNvbnRleHQsICdhamF4U2VuZCcsIFt4aHIsIHNldHRpbmdzXSlcbiAgfVxuICBmdW5jdGlvbiBhamF4U3VjY2VzcyhkYXRhLCB4aHIsIHNldHRpbmdzLCBkZWZlcnJlZCkge1xuICAgIHZhciBjb250ZXh0ID0gc2V0dGluZ3MuY29udGV4dCwgc3RhdHVzID0gJ3N1Y2Nlc3MnXG4gICAgc2V0dGluZ3Muc3VjY2Vzcy5jYWxsKGNvbnRleHQsIGRhdGEsIHN0YXR1cywgeGhyKVxuICAgIGlmIChkZWZlcnJlZCkgZGVmZXJyZWQucmVzb2x2ZVdpdGgoY29udGV4dCwgW2RhdGEsIHN0YXR1cywgeGhyXSlcbiAgICB0cmlnZ2VyR2xvYmFsKHNldHRpbmdzLCBjb250ZXh0LCAnYWpheFN1Y2Nlc3MnLCBbeGhyLCBzZXR0aW5ncywgZGF0YV0pXG4gICAgYWpheENvbXBsZXRlKHN0YXR1cywgeGhyLCBzZXR0aW5ncylcbiAgfVxuICAvLyB0eXBlOiBcInRpbWVvdXRcIiwgXCJlcnJvclwiLCBcImFib3J0XCIsIFwicGFyc2VyZXJyb3JcIlxuICBmdW5jdGlvbiBhamF4RXJyb3IoZXJyb3IsIHR5cGUsIHhociwgc2V0dGluZ3MsIGRlZmVycmVkKSB7XG4gICAgdmFyIGNvbnRleHQgPSBzZXR0aW5ncy5jb250ZXh0XG4gICAgc2V0dGluZ3MuZXJyb3IuY2FsbChjb250ZXh0LCB4aHIsIHR5cGUsIGVycm9yKVxuICAgIGlmIChkZWZlcnJlZCkgZGVmZXJyZWQucmVqZWN0V2l0aChjb250ZXh0LCBbeGhyLCB0eXBlLCBlcnJvcl0pXG4gICAgdHJpZ2dlckdsb2JhbChzZXR0aW5ncywgY29udGV4dCwgJ2FqYXhFcnJvcicsIFt4aHIsIHNldHRpbmdzLCBlcnJvciB8fCB0eXBlXSlcbiAgICBhamF4Q29tcGxldGUodHlwZSwgeGhyLCBzZXR0aW5ncylcbiAgfVxuICAvLyBzdGF0dXM6IFwic3VjY2Vzc1wiLCBcIm5vdG1vZGlmaWVkXCIsIFwiZXJyb3JcIiwgXCJ0aW1lb3V0XCIsIFwiYWJvcnRcIiwgXCJwYXJzZXJlcnJvclwiXG4gIGZ1bmN0aW9uIGFqYXhDb21wbGV0ZShzdGF0dXMsIHhociwgc2V0dGluZ3MpIHtcbiAgICB2YXIgY29udGV4dCA9IHNldHRpbmdzLmNvbnRleHRcbiAgICBzZXR0aW5ncy5jb21wbGV0ZS5jYWxsKGNvbnRleHQsIHhociwgc3RhdHVzKVxuICAgIHRyaWdnZXJHbG9iYWwoc2V0dGluZ3MsIGNvbnRleHQsICdhamF4Q29tcGxldGUnLCBbeGhyLCBzZXR0aW5nc10pXG4gICAgYWpheFN0b3Aoc2V0dGluZ3MpXG4gIH1cblxuICAvLyBFbXB0eSBmdW5jdGlvbiwgdXNlZCBhcyBkZWZhdWx0IGNhbGxiYWNrXG4gIGZ1bmN0aW9uIGVtcHR5KCkge31cblxuICAkLmFqYXhKU09OUCA9IGZ1bmN0aW9uKG9wdGlvbnMsIGRlZmVycmVkKXtcbiAgICBpZiAoISgndHlwZScgaW4gb3B0aW9ucykpIHJldHVybiAkLmFqYXgob3B0aW9ucylcblxuICAgIHZhciBfY2FsbGJhY2tOYW1lID0gb3B0aW9ucy5qc29ucENhbGxiYWNrLFxuICAgICAgY2FsbGJhY2tOYW1lID0gKCQuaXNGdW5jdGlvbihfY2FsbGJhY2tOYW1lKSA/XG4gICAgICAgIF9jYWxsYmFja05hbWUoKSA6IF9jYWxsYmFja05hbWUpIHx8ICgnanNvbnAnICsgKCsranNvbnBJRCkpLFxuICAgICAgc2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0JyksXG4gICAgICBvcmlnaW5hbENhbGxiYWNrID0gd2luZG93W2NhbGxiYWNrTmFtZV0sXG4gICAgICByZXNwb25zZURhdGEsXG4gICAgICBhYm9ydCA9IGZ1bmN0aW9uKGVycm9yVHlwZSkge1xuICAgICAgICAkKHNjcmlwdCkudHJpZ2dlckhhbmRsZXIoJ2Vycm9yJywgZXJyb3JUeXBlIHx8ICdhYm9ydCcpXG4gICAgICB9LFxuICAgICAgeGhyID0geyBhYm9ydDogYWJvcnQgfSwgYWJvcnRUaW1lb3V0XG5cbiAgICBpZiAoZGVmZXJyZWQpIGRlZmVycmVkLnByb21pc2UoeGhyKVxuXG4gICAgJChzY3JpcHQpLm9uKCdsb2FkIGVycm9yJywgZnVuY3Rpb24oZSwgZXJyb3JUeXBlKXtcbiAgICAgIGNsZWFyVGltZW91dChhYm9ydFRpbWVvdXQpXG4gICAgICAkKHNjcmlwdCkub2ZmKCkucmVtb3ZlKClcblxuICAgICAgaWYgKGUudHlwZSA9PSAnZXJyb3InIHx8ICFyZXNwb25zZURhdGEpIHtcbiAgICAgICAgYWpheEVycm9yKG51bGwsIGVycm9yVHlwZSB8fCAnZXJyb3InLCB4aHIsIG9wdGlvbnMsIGRlZmVycmVkKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYWpheFN1Y2Nlc3MocmVzcG9uc2VEYXRhWzBdLCB4aHIsIG9wdGlvbnMsIGRlZmVycmVkKVxuICAgICAgfVxuXG4gICAgICB3aW5kb3dbY2FsbGJhY2tOYW1lXSA9IG9yaWdpbmFsQ2FsbGJhY2tcbiAgICAgIGlmIChyZXNwb25zZURhdGEgJiYgJC5pc0Z1bmN0aW9uKG9yaWdpbmFsQ2FsbGJhY2spKVxuICAgICAgICBvcmlnaW5hbENhbGxiYWNrKHJlc3BvbnNlRGF0YVswXSlcblxuICAgICAgb3JpZ2luYWxDYWxsYmFjayA9IHJlc3BvbnNlRGF0YSA9IHVuZGVmaW5lZFxuICAgIH0pXG5cbiAgICBpZiAoYWpheEJlZm9yZVNlbmQoeGhyLCBvcHRpb25zKSA9PT0gZmFsc2UpIHtcbiAgICAgIGFib3J0KCdhYm9ydCcpXG4gICAgICByZXR1cm4geGhyXG4gICAgfVxuXG4gICAgd2luZG93W2NhbGxiYWNrTmFtZV0gPSBmdW5jdGlvbigpe1xuICAgICAgcmVzcG9uc2VEYXRhID0gYXJndW1lbnRzXG4gICAgfVxuXG4gICAgc2NyaXB0LnNyYyA9IG9wdGlvbnMudXJsLnJlcGxhY2UoL1xcPyguKyk9XFw/LywgJz8kMT0nICsgY2FsbGJhY2tOYW1lKVxuICAgIGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQoc2NyaXB0KVxuXG4gICAgaWYgKG9wdGlvbnMudGltZW91dCA+IDApIGFib3J0VGltZW91dCA9IHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgIGFib3J0KCd0aW1lb3V0JylcbiAgICB9LCBvcHRpb25zLnRpbWVvdXQpXG5cbiAgICByZXR1cm4geGhyXG4gIH1cblxuICAkLmFqYXhTZXR0aW5ncyA9IHtcbiAgICAvLyBEZWZhdWx0IHR5cGUgb2YgcmVxdWVzdFxuICAgIHR5cGU6ICdHRVQnLFxuICAgIC8vIENhbGxiYWNrIHRoYXQgaXMgZXhlY3V0ZWQgYmVmb3JlIHJlcXVlc3RcbiAgICBiZWZvcmVTZW5kOiBlbXB0eSxcbiAgICAvLyBDYWxsYmFjayB0aGF0IGlzIGV4ZWN1dGVkIGlmIHRoZSByZXF1ZXN0IHN1Y2NlZWRzXG4gICAgc3VjY2VzczogZW1wdHksXG4gICAgLy8gQ2FsbGJhY2sgdGhhdCBpcyBleGVjdXRlZCB0aGUgdGhlIHNlcnZlciBkcm9wcyBlcnJvclxuICAgIGVycm9yOiBlbXB0eSxcbiAgICAvLyBDYWxsYmFjayB0aGF0IGlzIGV4ZWN1dGVkIG9uIHJlcXVlc3QgY29tcGxldGUgKGJvdGg6IGVycm9yIGFuZCBzdWNjZXNzKVxuICAgIGNvbXBsZXRlOiBlbXB0eSxcbiAgICAvLyBUaGUgY29udGV4dCBmb3IgdGhlIGNhbGxiYWNrc1xuICAgIGNvbnRleHQ6IG51bGwsXG4gICAgLy8gV2hldGhlciB0byB0cmlnZ2VyIFwiZ2xvYmFsXCIgQWpheCBldmVudHNcbiAgICBnbG9iYWw6IHRydWUsXG4gICAgLy8gVHJhbnNwb3J0XG4gICAgeGhyOiBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gbmV3IHdpbmRvdy5YTUxIdHRwUmVxdWVzdCgpXG4gICAgfSxcbiAgICAvLyBNSU1FIHR5cGVzIG1hcHBpbmdcbiAgICAvLyBJSVMgcmV0dXJucyBKYXZhc2NyaXB0IGFzIFwiYXBwbGljYXRpb24veC1qYXZhc2NyaXB0XCJcbiAgICBhY2NlcHRzOiB7XG4gICAgICBzY3JpcHQ6ICd0ZXh0L2phdmFzY3JpcHQsIGFwcGxpY2F0aW9uL2phdmFzY3JpcHQsIGFwcGxpY2F0aW9uL3gtamF2YXNjcmlwdCcsXG4gICAgICBqc29uOiAgIGpzb25UeXBlLFxuICAgICAgeG1sOiAgICAnYXBwbGljYXRpb24veG1sLCB0ZXh0L3htbCcsXG4gICAgICBodG1sOiAgIGh0bWxUeXBlLFxuICAgICAgdGV4dDogICAndGV4dC9wbGFpbidcbiAgICB9LFxuICAgIC8vIFdoZXRoZXIgdGhlIHJlcXVlc3QgaXMgdG8gYW5vdGhlciBkb21haW5cbiAgICBjcm9zc0RvbWFpbjogZmFsc2UsXG4gICAgLy8gRGVmYXVsdCB0aW1lb3V0XG4gICAgdGltZW91dDogMCxcbiAgICAvLyBXaGV0aGVyIGRhdGEgc2hvdWxkIGJlIHNlcmlhbGl6ZWQgdG8gc3RyaW5nXG4gICAgcHJvY2Vzc0RhdGE6IHRydWUsXG4gICAgLy8gV2hldGhlciB0aGUgYnJvd3NlciBzaG91bGQgYmUgYWxsb3dlZCB0byBjYWNoZSBHRVQgcmVzcG9uc2VzXG4gICAgY2FjaGU6IHRydWVcbiAgfVxuXG4gIGZ1bmN0aW9uIG1pbWVUb0RhdGFUeXBlKG1pbWUpIHtcbiAgICBpZiAobWltZSkgbWltZSA9IG1pbWUuc3BsaXQoJzsnLCAyKVswXVxuICAgIHJldHVybiBtaW1lICYmICggbWltZSA9PSBodG1sVHlwZSA/ICdodG1sJyA6XG4gICAgICBtaW1lID09IGpzb25UeXBlID8gJ2pzb24nIDpcbiAgICAgIHNjcmlwdFR5cGVSRS50ZXN0KG1pbWUpID8gJ3NjcmlwdCcgOlxuICAgICAgeG1sVHlwZVJFLnRlc3QobWltZSkgJiYgJ3htbCcgKSB8fCAndGV4dCdcbiAgfVxuXG4gIGZ1bmN0aW9uIGFwcGVuZFF1ZXJ5KHVybCwgcXVlcnkpIHtcbiAgICBpZiAocXVlcnkgPT0gJycpIHJldHVybiB1cmxcbiAgICByZXR1cm4gKHVybCArICcmJyArIHF1ZXJ5KS5yZXBsYWNlKC9bJj9dezEsMn0vLCAnPycpXG4gIH1cblxuICAvLyBzZXJpYWxpemUgcGF5bG9hZCBhbmQgYXBwZW5kIGl0IHRvIHRoZSBVUkwgZm9yIEdFVCByZXF1ZXN0c1xuICBmdW5jdGlvbiBzZXJpYWxpemVEYXRhKG9wdGlvbnMpIHtcbiAgICBpZiAob3B0aW9ucy5wcm9jZXNzRGF0YSAmJiBvcHRpb25zLmRhdGEgJiYgJC50eXBlKG9wdGlvbnMuZGF0YSkgIT0gXCJzdHJpbmdcIilcbiAgICAgIG9wdGlvbnMuZGF0YSA9ICQucGFyYW0ob3B0aW9ucy5kYXRhLCBvcHRpb25zLnRyYWRpdGlvbmFsKVxuICAgIGlmIChvcHRpb25zLmRhdGEgJiYgKCFvcHRpb25zLnR5cGUgfHwgb3B0aW9ucy50eXBlLnRvVXBwZXJDYXNlKCkgPT0gJ0dFVCcpKVxuICAgICAgb3B0aW9ucy51cmwgPSBhcHBlbmRRdWVyeShvcHRpb25zLnVybCwgb3B0aW9ucy5kYXRhKSwgb3B0aW9ucy5kYXRhID0gdW5kZWZpbmVkXG4gIH1cblxuICAkLmFqYXggPSBmdW5jdGlvbihvcHRpb25zKXtcbiAgICB2YXIgc2V0dGluZ3MgPSAkLmV4dGVuZCh7fSwgb3B0aW9ucyB8fCB7fSksXG4gICAgICAgIGRlZmVycmVkID0gJC5EZWZlcnJlZCAmJiAkLkRlZmVycmVkKCksXG4gICAgICAgIHVybEFuY2hvclxuICAgIGZvciAoa2V5IGluICQuYWpheFNldHRpbmdzKSBpZiAoc2V0dGluZ3Nba2V5XSA9PT0gdW5kZWZpbmVkKSBzZXR0aW5nc1trZXldID0gJC5hamF4U2V0dGluZ3Nba2V5XVxuXG4gICAgYWpheFN0YXJ0KHNldHRpbmdzKVxuXG4gICAgaWYgKCFzZXR0aW5ncy5jcm9zc0RvbWFpbikge1xuICAgICAgdXJsQW5jaG9yID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpXG4gICAgICB1cmxBbmNob3IuaHJlZiA9IHNldHRpbmdzLnVybFxuICAgICAgdXJsQW5jaG9yLmhyZWYgPSB1cmxBbmNob3IuaHJlZlxuICAgICAgc2V0dGluZ3MuY3Jvc3NEb21haW4gPSAob3JpZ2luQW5jaG9yLnByb3RvY29sICsgJy8vJyArIG9yaWdpbkFuY2hvci5ob3N0KSAhPT0gKHVybEFuY2hvci5wcm90b2NvbCArICcvLycgKyB1cmxBbmNob3IuaG9zdClcbiAgICB9XG5cbiAgICBpZiAoIXNldHRpbmdzLnVybCkgc2V0dGluZ3MudXJsID0gd2luZG93LmxvY2F0aW9uLnRvU3RyaW5nKClcbiAgICBzZXJpYWxpemVEYXRhKHNldHRpbmdzKVxuXG4gICAgdmFyIGRhdGFUeXBlID0gc2V0dGluZ3MuZGF0YVR5cGUsIGhhc1BsYWNlaG9sZGVyID0gL1xcPy4rPVxcPy8udGVzdChzZXR0aW5ncy51cmwpXG4gICAgaWYgKGhhc1BsYWNlaG9sZGVyKSBkYXRhVHlwZSA9ICdqc29ucCdcblxuICAgIGlmIChzZXR0aW5ncy5jYWNoZSA9PT0gZmFsc2UgfHwgKFxuICAgICAgICAgKCFvcHRpb25zIHx8IG9wdGlvbnMuY2FjaGUgIT09IHRydWUpICYmXG4gICAgICAgICAoJ3NjcmlwdCcgPT0gZGF0YVR5cGUgfHwgJ2pzb25wJyA9PSBkYXRhVHlwZSlcbiAgICAgICAgKSlcbiAgICAgIHNldHRpbmdzLnVybCA9IGFwcGVuZFF1ZXJ5KHNldHRpbmdzLnVybCwgJ189JyArIERhdGUubm93KCkpXG5cbiAgICBpZiAoJ2pzb25wJyA9PSBkYXRhVHlwZSkge1xuICAgICAgaWYgKCFoYXNQbGFjZWhvbGRlcilcbiAgICAgICAgc2V0dGluZ3MudXJsID0gYXBwZW5kUXVlcnkoc2V0dGluZ3MudXJsLFxuICAgICAgICAgIHNldHRpbmdzLmpzb25wID8gKHNldHRpbmdzLmpzb25wICsgJz0/JykgOiBzZXR0aW5ncy5qc29ucCA9PT0gZmFsc2UgPyAnJyA6ICdjYWxsYmFjaz0/JylcbiAgICAgIHJldHVybiAkLmFqYXhKU09OUChzZXR0aW5ncywgZGVmZXJyZWQpXG4gICAgfVxuXG4gICAgdmFyIG1pbWUgPSBzZXR0aW5ncy5hY2NlcHRzW2RhdGFUeXBlXSxcbiAgICAgICAgaGVhZGVycyA9IHsgfSxcbiAgICAgICAgc2V0SGVhZGVyID0gZnVuY3Rpb24obmFtZSwgdmFsdWUpIHsgaGVhZGVyc1tuYW1lLnRvTG93ZXJDYXNlKCldID0gW25hbWUsIHZhbHVlXSB9LFxuICAgICAgICBwcm90b2NvbCA9IC9eKFtcXHctXSs6KVxcL1xcLy8udGVzdChzZXR0aW5ncy51cmwpID8gUmVnRXhwLiQxIDogd2luZG93LmxvY2F0aW9uLnByb3RvY29sLFxuICAgICAgICB4aHIgPSBzZXR0aW5ncy54aHIoKSxcbiAgICAgICAgbmF0aXZlU2V0SGVhZGVyID0geGhyLnNldFJlcXVlc3RIZWFkZXIsXG4gICAgICAgIGFib3J0VGltZW91dFxuXG4gICAgaWYgKGRlZmVycmVkKSBkZWZlcnJlZC5wcm9taXNlKHhocilcblxuICAgIGlmICghc2V0dGluZ3MuY3Jvc3NEb21haW4pIHNldEhlYWRlcignWC1SZXF1ZXN0ZWQtV2l0aCcsICdYTUxIdHRwUmVxdWVzdCcpXG4gICAgc2V0SGVhZGVyKCdBY2NlcHQnLCBtaW1lIHx8ICcqLyonKVxuICAgIGlmIChtaW1lID0gc2V0dGluZ3MubWltZVR5cGUgfHwgbWltZSkge1xuICAgICAgaWYgKG1pbWUuaW5kZXhPZignLCcpID4gLTEpIG1pbWUgPSBtaW1lLnNwbGl0KCcsJywgMilbMF1cbiAgICAgIHhoci5vdmVycmlkZU1pbWVUeXBlICYmIHhoci5vdmVycmlkZU1pbWVUeXBlKG1pbWUpXG4gICAgfVxuICAgIGlmIChzZXR0aW5ncy5jb250ZW50VHlwZSB8fCAoc2V0dGluZ3MuY29udGVudFR5cGUgIT09IGZhbHNlICYmIHNldHRpbmdzLmRhdGEgJiYgc2V0dGluZ3MudHlwZS50b1VwcGVyQ2FzZSgpICE9ICdHRVQnKSlcbiAgICAgIHNldEhlYWRlcignQ29udGVudC1UeXBlJywgc2V0dGluZ3MuY29udGVudFR5cGUgfHwgJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCcpXG5cbiAgICBpZiAoc2V0dGluZ3MuaGVhZGVycykgZm9yIChuYW1lIGluIHNldHRpbmdzLmhlYWRlcnMpIHNldEhlYWRlcihuYW1lLCBzZXR0aW5ncy5oZWFkZXJzW25hbWVdKVxuICAgIHhoci5zZXRSZXF1ZXN0SGVhZGVyID0gc2V0SGVhZGVyXG5cbiAgICB4aHIub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24oKXtcbiAgICAgIGlmICh4aHIucmVhZHlTdGF0ZSA9PSA0KSB7XG4gICAgICAgIHhoci5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBlbXB0eVxuICAgICAgICBjbGVhclRpbWVvdXQoYWJvcnRUaW1lb3V0KVxuICAgICAgICB2YXIgcmVzdWx0LCBlcnJvciA9IGZhbHNlXG4gICAgICAgIGlmICgoeGhyLnN0YXR1cyA+PSAyMDAgJiYgeGhyLnN0YXR1cyA8IDMwMCkgfHwgeGhyLnN0YXR1cyA9PSAzMDQgfHwgKHhoci5zdGF0dXMgPT0gMCAmJiBwcm90b2NvbCA9PSAnZmlsZTonKSkge1xuICAgICAgICAgIGRhdGFUeXBlID0gZGF0YVR5cGUgfHwgbWltZVRvRGF0YVR5cGUoc2V0dGluZ3MubWltZVR5cGUgfHwgeGhyLmdldFJlc3BvbnNlSGVhZGVyKCdjb250ZW50LXR5cGUnKSlcbiAgICAgICAgICByZXN1bHQgPSB4aHIucmVzcG9uc2VUZXh0XG5cbiAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gaHR0cDovL3BlcmZlY3Rpb25raWxscy5jb20vZ2xvYmFsLWV2YWwtd2hhdC1hcmUtdGhlLW9wdGlvbnMvXG4gICAgICAgICAgICBpZiAoZGF0YVR5cGUgPT0gJ3NjcmlwdCcpICAgICgxLGV2YWwpKHJlc3VsdClcbiAgICAgICAgICAgIGVsc2UgaWYgKGRhdGFUeXBlID09ICd4bWwnKSAgcmVzdWx0ID0geGhyLnJlc3BvbnNlWE1MXG4gICAgICAgICAgICBlbHNlIGlmIChkYXRhVHlwZSA9PSAnanNvbicpIHJlc3VsdCA9IGJsYW5rUkUudGVzdChyZXN1bHQpID8gbnVsbCA6ICQucGFyc2VKU09OKHJlc3VsdClcbiAgICAgICAgICB9IGNhdGNoIChlKSB7IGVycm9yID0gZSB9XG5cbiAgICAgICAgICBpZiAoZXJyb3IpIGFqYXhFcnJvcihlcnJvciwgJ3BhcnNlcmVycm9yJywgeGhyLCBzZXR0aW5ncywgZGVmZXJyZWQpXG4gICAgICAgICAgZWxzZSBhamF4U3VjY2VzcyhyZXN1bHQsIHhociwgc2V0dGluZ3MsIGRlZmVycmVkKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGFqYXhFcnJvcih4aHIuc3RhdHVzVGV4dCB8fCBudWxsLCB4aHIuc3RhdHVzID8gJ2Vycm9yJyA6ICdhYm9ydCcsIHhociwgc2V0dGluZ3MsIGRlZmVycmVkKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGFqYXhCZWZvcmVTZW5kKHhociwgc2V0dGluZ3MpID09PSBmYWxzZSkge1xuICAgICAgeGhyLmFib3J0KClcbiAgICAgIGFqYXhFcnJvcihudWxsLCAnYWJvcnQnLCB4aHIsIHNldHRpbmdzLCBkZWZlcnJlZClcbiAgICAgIHJldHVybiB4aHJcbiAgICB9XG5cbiAgICBpZiAoc2V0dGluZ3MueGhyRmllbGRzKSBmb3IgKG5hbWUgaW4gc2V0dGluZ3MueGhyRmllbGRzKSB4aHJbbmFtZV0gPSBzZXR0aW5ncy54aHJGaWVsZHNbbmFtZV1cblxuICAgIHZhciBhc3luYyA9ICdhc3luYycgaW4gc2V0dGluZ3MgPyBzZXR0aW5ncy5hc3luYyA6IHRydWVcbiAgICB4aHIub3BlbihzZXR0aW5ncy50eXBlLCBzZXR0aW5ncy51cmwsIGFzeW5jLCBzZXR0aW5ncy51c2VybmFtZSwgc2V0dGluZ3MucGFzc3dvcmQpXG5cbiAgICBmb3IgKG5hbWUgaW4gaGVhZGVycykgbmF0aXZlU2V0SGVhZGVyLmFwcGx5KHhociwgaGVhZGVyc1tuYW1lXSlcblxuICAgIGlmIChzZXR0aW5ncy50aW1lb3V0ID4gMCkgYWJvcnRUaW1lb3V0ID0gc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgICAgICB4aHIub25yZWFkeXN0YXRlY2hhbmdlID0gZW1wdHlcbiAgICAgICAgeGhyLmFib3J0KClcbiAgICAgICAgYWpheEVycm9yKG51bGwsICd0aW1lb3V0JywgeGhyLCBzZXR0aW5ncywgZGVmZXJyZWQpXG4gICAgICB9LCBzZXR0aW5ncy50aW1lb3V0KVxuXG4gICAgLy8gYXZvaWQgc2VuZGluZyBlbXB0eSBzdHJpbmcgKCMzMTkpXG4gICAgeGhyLnNlbmQoc2V0dGluZ3MuZGF0YSA/IHNldHRpbmdzLmRhdGEgOiBudWxsKVxuICAgIHJldHVybiB4aHJcbiAgfVxuXG4gIC8vIGhhbmRsZSBvcHRpb25hbCBkYXRhL3N1Y2Nlc3MgYXJndW1lbnRzXG4gIGZ1bmN0aW9uIHBhcnNlQXJndW1lbnRzKHVybCwgZGF0YSwgc3VjY2VzcywgZGF0YVR5cGUpIHtcbiAgICBpZiAoJC5pc0Z1bmN0aW9uKGRhdGEpKSBkYXRhVHlwZSA9IHN1Y2Nlc3MsIHN1Y2Nlc3MgPSBkYXRhLCBkYXRhID0gdW5kZWZpbmVkXG4gICAgaWYgKCEkLmlzRnVuY3Rpb24oc3VjY2VzcykpIGRhdGFUeXBlID0gc3VjY2Vzcywgc3VjY2VzcyA9IHVuZGVmaW5lZFxuICAgIHJldHVybiB7XG4gICAgICB1cmw6IHVybFxuICAgICwgZGF0YTogZGF0YVxuICAgICwgc3VjY2Vzczogc3VjY2Vzc1xuICAgICwgZGF0YVR5cGU6IGRhdGFUeXBlXG4gICAgfVxuICB9XG5cbiAgJC5nZXQgPSBmdW5jdGlvbigvKiB1cmwsIGRhdGEsIHN1Y2Nlc3MsIGRhdGFUeXBlICovKXtcbiAgICByZXR1cm4gJC5hamF4KHBhcnNlQXJndW1lbnRzLmFwcGx5KG51bGwsIGFyZ3VtZW50cykpXG4gIH1cblxuICAkLnBvc3QgPSBmdW5jdGlvbigvKiB1cmwsIGRhdGEsIHN1Y2Nlc3MsIGRhdGFUeXBlICovKXtcbiAgICB2YXIgb3B0aW9ucyA9IHBhcnNlQXJndW1lbnRzLmFwcGx5KG51bGwsIGFyZ3VtZW50cylcbiAgICBvcHRpb25zLnR5cGUgPSAnUE9TVCdcbiAgICByZXR1cm4gJC5hamF4KG9wdGlvbnMpXG4gIH1cblxuICAkLmdldEpTT04gPSBmdW5jdGlvbigvKiB1cmwsIGRhdGEsIHN1Y2Nlc3MgKi8pe1xuICAgIHZhciBvcHRpb25zID0gcGFyc2VBcmd1bWVudHMuYXBwbHkobnVsbCwgYXJndW1lbnRzKVxuICAgIG9wdGlvbnMuZGF0YVR5cGUgPSAnanNvbidcbiAgICByZXR1cm4gJC5hamF4KG9wdGlvbnMpXG4gIH1cblxuICAkLmZuLmxvYWQgPSBmdW5jdGlvbih1cmwsIGRhdGEsIHN1Y2Nlc3Mpe1xuICAgIGlmICghdGhpcy5sZW5ndGgpIHJldHVybiB0aGlzXG4gICAgdmFyIHNlbGYgPSB0aGlzLCBwYXJ0cyA9IHVybC5zcGxpdCgvXFxzLyksIHNlbGVjdG9yLFxuICAgICAgICBvcHRpb25zID0gcGFyc2VBcmd1bWVudHModXJsLCBkYXRhLCBzdWNjZXNzKSxcbiAgICAgICAgY2FsbGJhY2sgPSBvcHRpb25zLnN1Y2Nlc3NcbiAgICBpZiAocGFydHMubGVuZ3RoID4gMSkgb3B0aW9ucy51cmwgPSBwYXJ0c1swXSwgc2VsZWN0b3IgPSBwYXJ0c1sxXVxuICAgIG9wdGlvbnMuc3VjY2VzcyA9IGZ1bmN0aW9uKHJlc3BvbnNlKXtcbiAgICAgIHNlbGYuaHRtbChzZWxlY3RvciA/XG4gICAgICAgICQoJzxkaXY+JykuaHRtbChyZXNwb25zZS5yZXBsYWNlKHJzY3JpcHQsIFwiXCIpKS5maW5kKHNlbGVjdG9yKVxuICAgICAgICA6IHJlc3BvbnNlKVxuICAgICAgY2FsbGJhY2sgJiYgY2FsbGJhY2suYXBwbHkoc2VsZiwgYXJndW1lbnRzKVxuICAgIH1cbiAgICAkLmFqYXgob3B0aW9ucylcbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgdmFyIGVzY2FwZSA9IGVuY29kZVVSSUNvbXBvbmVudFxuXG4gIGZ1bmN0aW9uIHNlcmlhbGl6ZShwYXJhbXMsIG9iaiwgdHJhZGl0aW9uYWwsIHNjb3BlKXtcbiAgICB2YXIgdHlwZSwgYXJyYXkgPSAkLmlzQXJyYXkob2JqKSwgaGFzaCA9ICQuaXNQbGFpbk9iamVjdChvYmopXG4gICAgJC5lYWNoKG9iaiwgZnVuY3Rpb24oa2V5LCB2YWx1ZSkge1xuICAgICAgdHlwZSA9ICQudHlwZSh2YWx1ZSlcbiAgICAgIGlmIChzY29wZSkga2V5ID0gdHJhZGl0aW9uYWwgPyBzY29wZSA6XG4gICAgICAgIHNjb3BlICsgJ1snICsgKGhhc2ggfHwgdHlwZSA9PSAnb2JqZWN0JyB8fCB0eXBlID09ICdhcnJheScgPyBrZXkgOiAnJykgKyAnXSdcbiAgICAgIC8vIGhhbmRsZSBkYXRhIGluIHNlcmlhbGl6ZUFycmF5KCkgZm9ybWF0XG4gICAgICBpZiAoIXNjb3BlICYmIGFycmF5KSBwYXJhbXMuYWRkKHZhbHVlLm5hbWUsIHZhbHVlLnZhbHVlKVxuICAgICAgLy8gcmVjdXJzZSBpbnRvIG5lc3RlZCBvYmplY3RzXG4gICAgICBlbHNlIGlmICh0eXBlID09IFwiYXJyYXlcIiB8fCAoIXRyYWRpdGlvbmFsICYmIHR5cGUgPT0gXCJvYmplY3RcIikpXG4gICAgICAgIHNlcmlhbGl6ZShwYXJhbXMsIHZhbHVlLCB0cmFkaXRpb25hbCwga2V5KVxuICAgICAgZWxzZSBwYXJhbXMuYWRkKGtleSwgdmFsdWUpXG4gICAgfSlcbiAgfVxuXG4gICQucGFyYW0gPSBmdW5jdGlvbihvYmosIHRyYWRpdGlvbmFsKXtcbiAgICB2YXIgcGFyYW1zID0gW11cbiAgICBwYXJhbXMuYWRkID0gZnVuY3Rpb24oa2V5LCB2YWx1ZSkge1xuICAgICAgaWYgKCQuaXNGdW5jdGlvbih2YWx1ZSkpIHZhbHVlID0gdmFsdWUoKVxuICAgICAgaWYgKHZhbHVlID09IG51bGwpIHZhbHVlID0gXCJcIlxuICAgICAgdGhpcy5wdXNoKGVzY2FwZShrZXkpICsgJz0nICsgZXNjYXBlKHZhbHVlKSlcbiAgICB9XG4gICAgc2VyaWFsaXplKHBhcmFtcywgb2JqLCB0cmFkaXRpb25hbClcbiAgICByZXR1cm4gcGFyYW1zLmpvaW4oJyYnKS5yZXBsYWNlKC8lMjAvZywgJysnKVxuICB9XG59KShaZXB0bylcblxuOyhmdW5jdGlvbigkKXtcbiAgJC5mbi5zZXJpYWxpemVBcnJheSA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBuYW1lLCB0eXBlLCByZXN1bHQgPSBbXSxcbiAgICAgIGFkZCA9IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAgIGlmICh2YWx1ZS5mb3JFYWNoKSByZXR1cm4gdmFsdWUuZm9yRWFjaChhZGQpXG4gICAgICAgIHJlc3VsdC5wdXNoKHsgbmFtZTogbmFtZSwgdmFsdWU6IHZhbHVlIH0pXG4gICAgICB9XG4gICAgaWYgKHRoaXNbMF0pICQuZWFjaCh0aGlzWzBdLmVsZW1lbnRzLCBmdW5jdGlvbihfLCBmaWVsZCl7XG4gICAgICB0eXBlID0gZmllbGQudHlwZSwgbmFtZSA9IGZpZWxkLm5hbWVcbiAgICAgIGlmIChuYW1lICYmIGZpZWxkLm5vZGVOYW1lLnRvTG93ZXJDYXNlKCkgIT0gJ2ZpZWxkc2V0JyAmJlxuICAgICAgICAhZmllbGQuZGlzYWJsZWQgJiYgdHlwZSAhPSAnc3VibWl0JyAmJiB0eXBlICE9ICdyZXNldCcgJiYgdHlwZSAhPSAnYnV0dG9uJyAmJiB0eXBlICE9ICdmaWxlJyAmJlxuICAgICAgICAoKHR5cGUgIT0gJ3JhZGlvJyAmJiB0eXBlICE9ICdjaGVja2JveCcpIHx8IGZpZWxkLmNoZWNrZWQpKVxuICAgICAgICAgIGFkZCgkKGZpZWxkKS52YWwoKSlcbiAgICB9KVxuICAgIHJldHVybiByZXN1bHRcbiAgfVxuXG4gICQuZm4uc2VyaWFsaXplID0gZnVuY3Rpb24oKXtcbiAgICB2YXIgcmVzdWx0ID0gW11cbiAgICB0aGlzLnNlcmlhbGl6ZUFycmF5KCkuZm9yRWFjaChmdW5jdGlvbihlbG0pe1xuICAgICAgcmVzdWx0LnB1c2goZW5jb2RlVVJJQ29tcG9uZW50KGVsbS5uYW1lKSArICc9JyArIGVuY29kZVVSSUNvbXBvbmVudChlbG0udmFsdWUpKVxuICAgIH0pXG4gICAgcmV0dXJuIHJlc3VsdC5qb2luKCcmJylcbiAgfVxuXG4gICQuZm4uc3VibWl0ID0gZnVuY3Rpb24oY2FsbGJhY2spIHtcbiAgICBpZiAoMCBpbiBhcmd1bWVudHMpIHRoaXMuYmluZCgnc3VibWl0JywgY2FsbGJhY2spXG4gICAgZWxzZSBpZiAodGhpcy5sZW5ndGgpIHtcbiAgICAgIHZhciBldmVudCA9ICQuRXZlbnQoJ3N1Ym1pdCcpXG4gICAgICB0aGlzLmVxKDApLnRyaWdnZXIoZXZlbnQpXG4gICAgICBpZiAoIWV2ZW50LmlzRGVmYXVsdFByZXZlbnRlZCgpKSB0aGlzLmdldCgwKS5zdWJtaXQoKVxuICAgIH1cbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbn0pKFplcHRvKVxuXG47KGZ1bmN0aW9uKCQpe1xuICAvLyBfX3Byb3RvX18gZG9lc24ndCBleGlzdCBvbiBJRTwxMSwgc28gcmVkZWZpbmVcbiAgLy8gdGhlIFogZnVuY3Rpb24gdG8gdXNlIG9iamVjdCBleHRlbnNpb24gaW5zdGVhZFxuICBpZiAoISgnX19wcm90b19fJyBpbiB7fSkpIHtcbiAgICAkLmV4dGVuZCgkLnplcHRvLCB7XG4gICAgICBaOiBmdW5jdGlvbihkb20sIHNlbGVjdG9yKXtcbiAgICAgICAgZG9tID0gZG9tIHx8IFtdXG4gICAgICAgICQuZXh0ZW5kKGRvbSwgJC5mbilcbiAgICAgICAgZG9tLnNlbGVjdG9yID0gc2VsZWN0b3IgfHwgJydcbiAgICAgICAgZG9tLl9fWiA9IHRydWVcbiAgICAgICAgcmV0dXJuIGRvbVxuICAgICAgfSxcbiAgICAgIC8vIHRoaXMgaXMgYSBrbHVkZ2UgYnV0IHdvcmtzXG4gICAgICBpc1o6IGZ1bmN0aW9uKG9iamVjdCl7XG4gICAgICAgIHJldHVybiAkLnR5cGUob2JqZWN0KSA9PT0gJ2FycmF5JyAmJiAnX19aJyBpbiBvYmplY3RcbiAgICAgIH1cbiAgICB9KVxuICB9XG5cbiAgLy8gZ2V0Q29tcHV0ZWRTdHlsZSBzaG91bGRuJ3QgZnJlYWsgb3V0IHdoZW4gY2FsbGVkXG4gIC8vIHdpdGhvdXQgYSB2YWxpZCBlbGVtZW50IGFzIGFyZ3VtZW50XG4gIHRyeSB7XG4gICAgZ2V0Q29tcHV0ZWRTdHlsZSh1bmRlZmluZWQpXG4gIH0gY2F0Y2goZSkge1xuICAgIHZhciBuYXRpdmVHZXRDb21wdXRlZFN0eWxlID0gZ2V0Q29tcHV0ZWRTdHlsZTtcbiAgICB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZSA9IGZ1bmN0aW9uKGVsZW1lbnQpe1xuICAgICAgdHJ5IHtcbiAgICAgICAgcmV0dXJuIG5hdGl2ZUdldENvbXB1dGVkU3R5bGUoZWxlbWVudClcbiAgICAgIH0gY2F0Y2goZSkge1xuICAgICAgICByZXR1cm4gbnVsbFxuICAgICAgfVxuICAgIH1cbiAgfVxufSkoWmVwdG8pXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gKHdlYnBhY2spLXplcHRvL2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSAwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAyIiwiaW1wb3J0IFV0aWxzIGZyb20gIFwiLi4vbGlicy9VdGlsc1wiO1xuaW1wb3J0IGNzc1BsdWdpbiBmcm9tIFwiLi9wbHVnaW5zL2Nzc1BsdWdpblwiO1xuXG4vKlxuICogVHdlZW4uanNcbiAqIHQ6IGN1cnJlbnQgdGltZe+8iOW9k+WJjeaXtumXtO+8ie+8m1xuICogYjogYmVnaW5uaW5nIHZhbHVl77yI5Yid5aeL5YC877yJ77ybXG4gKiBjOiBjaGFuZ2UgaW4gdmFsdWXvvIjlj5jljJbph4/vvInvvJsg6K+05piO77yaIOWBh+iuviB5IOS7jiAxMDAgLSAxMDAwLCDlj5jljJbph4/lupTor6XmmK85MDBcbiAqIGQ6IGR1cmF0aW9u77yI5oyB57ut5pe26Ze077yJ44CCXG4gKiB5b3UgY2FuIHZpc2l0ICdodHRwOi8vZWFzaW5ncy5uZXQvemgtY24nIHRvIGdldCBlZmZlY3RcbiAqL1xubGV0IFR3ZWVuVHlwZSA9IHtcbiAgICBMaW5lYXI6IGZ1bmN0aW9uKHQsIGIsIGMsIGQpIHsgcmV0dXJuIGMqdC9kICsgYjsgfSxcbiAgICBRdWFkOiB7XG4gICAgICAgIGVhc2VJbjogZnVuY3Rpb24odCwgYiwgYywgZCkge1xuICAgICAgICAgICAgcmV0dXJuIGMgKiAodCAvPSBkKSAqIHQgKyBiO1xuICAgICAgICB9LFxuICAgICAgICBlYXNlT3V0OiBmdW5jdGlvbih0LCBiLCBjLCBkKSB7XG4gICAgICAgICAgICByZXR1cm4gLWMgKih0IC89IGQpKih0LTIpICsgYjtcbiAgICAgICAgfSxcbiAgICAgICAgZWFzZUluT3V0OiBmdW5jdGlvbih0LCBiLCBjLCBkKSB7XG4gICAgICAgICAgICBpZiAoKHQgLz0gZCAvIDIpIDwgMSkgcmV0dXJuIGMgLyAyICogdCAqIHQgKyBiO1xuICAgICAgICAgICAgcmV0dXJuIC1jIC8gMiAqICgoLS10KSAqICh0LTIpIC0gMSkgKyBiO1xuICAgICAgICB9XG4gICAgfSxcbiAgICBDdWJpYzoge1xuICAgICAgICBlYXNlSW46IGZ1bmN0aW9uKHQsIGIsIGMsIGQpIHtcbiAgICAgICAgICAgIHJldHVybiBjICogKHQgLz0gZCkgKiB0ICogdCArIGI7XG4gICAgICAgIH0sXG4gICAgICAgIGVhc2VPdXQ6IGZ1bmN0aW9uKHQsIGIsIGMsIGQpIHtcbiAgICAgICAgICAgIHJldHVybiBjICogKCh0ID0gdC9kIC0gMSkgKiB0ICogdCArIDEpICsgYjtcbiAgICAgICAgfSxcbiAgICAgICAgZWFzZUluT3V0OiBmdW5jdGlvbih0LCBiLCBjLCBkKSB7XG4gICAgICAgICAgICBpZiAoKHQgLz0gZCAvIDIpIDwgMSkgcmV0dXJuIGMgLyAyICogdCAqIHQqdCArIGI7XG4gICAgICAgICAgICByZXR1cm4gYyAvIDIqKCh0IC09IDIpICogdCAqIHQgKyAyKSArIGI7XG4gICAgICAgIH1cbiAgICB9LFxuICAgIFF1YXJ0OiB7XG4gICAgICAgIGVhc2VJbjogZnVuY3Rpb24odCwgYiwgYywgZCkge1xuICAgICAgICAgICAgcmV0dXJuIGMgKiAodCAvPSBkKSAqIHQgKiB0KnQgKyBiO1xuICAgICAgICB9LFxuICAgICAgICBlYXNlT3V0OiBmdW5jdGlvbih0LCBiLCBjLCBkKSB7XG4gICAgICAgICAgICByZXR1cm4gLWMgKiAoKHQgPSB0L2QgLSAxKSAqIHQgKiB0KnQgLSAxKSArIGI7XG4gICAgICAgIH0sXG4gICAgICAgIGVhc2VJbk91dDogZnVuY3Rpb24odCwgYiwgYywgZCkge1xuICAgICAgICAgICAgaWYgKCh0IC89IGQgLyAyKSA8IDEpIHJldHVybiBjIC8gMiAqIHQgKiB0ICogdCAqIHQgKyBiO1xuICAgICAgICAgICAgcmV0dXJuIC1jIC8gMiAqICgodCAtPSAyKSAqIHQgKiB0KnQgLSAyKSArIGI7XG4gICAgICAgIH1cbiAgICB9LFxuICAgIFF1aW50OiB7XG4gICAgICAgIGVhc2VJbjogZnVuY3Rpb24odCwgYiwgYywgZCkge1xuICAgICAgICAgICAgcmV0dXJuIGMgKiAodCAvPSBkKSAqIHQgKiB0ICogdCAqIHQgKyBiO1xuICAgICAgICB9LFxuICAgICAgICBlYXNlT3V0OiBmdW5jdGlvbih0LCBiLCBjLCBkKSB7XG4gICAgICAgICAgICByZXR1cm4gYyAqICgodCA9IHQvZCAtIDEpICogdCAqIHQgKiB0ICogdCArIDEpICsgYjtcbiAgICAgICAgfSxcbiAgICAgICAgZWFzZUluT3V0OiBmdW5jdGlvbih0LCBiLCBjLCBkKSB7XG4gICAgICAgICAgICBpZiAoKHQgLz0gZCAvIDIpIDwgMSkgcmV0dXJuIGMgLyAyICogdCAqIHQgKiB0ICogdCAqIHQgKyBiO1xuICAgICAgICAgICAgcmV0dXJuIGMgLyAyKigodCAtPSAyKSAqIHQgKiB0ICogdCAqIHQgKyAyKSArIGI7XG4gICAgICAgIH1cbiAgICB9LFxuICAgIFNpbmU6IHtcbiAgICAgICAgZWFzZUluOiBmdW5jdGlvbih0LCBiLCBjLCBkKSB7XG4gICAgICAgICAgICByZXR1cm4gLWMgKiBNYXRoLmNvcyh0L2QgKiAoTWF0aC5QSS8yKSkgKyBjICsgYjtcbiAgICAgICAgfSxcbiAgICAgICAgZWFzZU91dDogZnVuY3Rpb24odCwgYiwgYywgZCkge1xuICAgICAgICAgICAgcmV0dXJuIGMgKiBNYXRoLnNpbih0L2QgKiAoTWF0aC5QSS8yKSkgKyBiO1xuICAgICAgICB9LFxuICAgICAgICBlYXNlSW5PdXQ6IGZ1bmN0aW9uKHQsIGIsIGMsIGQpIHtcbiAgICAgICAgICAgIHJldHVybiAtYyAvIDIgKiAoTWF0aC5jb3MoTWF0aC5QSSAqIHQvZCkgLSAxKSArIGI7XG4gICAgICAgIH1cbiAgICB9LFxuICAgIEV4cG86IHtcbiAgICAgICAgZWFzZUluOiBmdW5jdGlvbih0LCBiLCBjLCBkKSB7XG4gICAgICAgICAgICByZXR1cm4gKHQ9PTApID8gYiA6IGMgKiBNYXRoLnBvdygyLCAxMCAqICh0L2QgLSAxKSkgKyBiO1xuICAgICAgICB9LFxuICAgICAgICBlYXNlT3V0OiBmdW5jdGlvbih0LCBiLCBjLCBkKSB7XG4gICAgICAgICAgICByZXR1cm4gKHQ9PWQpID8gYiArIGMgOiBjICogKC1NYXRoLnBvdygyLCAtMTAgKiB0L2QpICsgMSkgKyBiO1xuICAgICAgICB9LFxuICAgICAgICBlYXNlSW5PdXQ6IGZ1bmN0aW9uKHQsIGIsIGMsIGQpIHtcbiAgICAgICAgICAgIGlmICh0PT0wKSByZXR1cm4gYjtcbiAgICAgICAgICAgIGlmICh0PT1kKSByZXR1cm4gYitjO1xuICAgICAgICAgICAgaWYgKCh0IC89IGQgLyAyKSA8IDEpIHJldHVybiBjIC8gMiAqIE1hdGgucG93KDIsIDEwICogKHQgLSAxKSkgKyBiO1xuICAgICAgICAgICAgcmV0dXJuIGMgLyAyICogKC1NYXRoLnBvdygyLCAtMTAgKiAtLXQpICsgMikgKyBiO1xuICAgICAgICB9XG4gICAgfSxcbiAgICBDaXJjOiB7XG4gICAgICAgIGVhc2VJbjogZnVuY3Rpb24odCwgYiwgYywgZCkge1xuICAgICAgICAgICAgcmV0dXJuIC1jICogKE1hdGguc3FydCgxIC0gKHQgLz0gZCkgKiB0KSAtIDEpICsgYjtcbiAgICAgICAgfSxcbiAgICAgICAgZWFzZU91dDogZnVuY3Rpb24odCwgYiwgYywgZCkge1xuICAgICAgICAgICAgcmV0dXJuIGMgKiBNYXRoLnNxcnQoMSAtICh0ID0gdC9kIC0gMSkgKiB0KSArIGI7XG4gICAgICAgIH0sXG4gICAgICAgIGVhc2VJbk91dDogZnVuY3Rpb24odCwgYiwgYywgZCkge1xuICAgICAgICAgICAgaWYgKCh0IC89IGQgLyAyKSA8IDEpIHJldHVybiAtYyAvIDIgKiAoTWF0aC5zcXJ0KDEgLSB0ICogdCkgLSAxKSArIGI7XG4gICAgICAgICAgICByZXR1cm4gYyAvIDIgKiAoTWF0aC5zcXJ0KDEgLSAodCAtPSAyKSAqIHQpICsgMSkgKyBiO1xuICAgICAgICB9XG4gICAgfSxcbiAgICBFbGFzdGljOiB7XG4gICAgICAgIGVhc2VJbjogZnVuY3Rpb24odCwgYiwgYywgZCwgYSwgcCkge1xuICAgICAgICAgICAgdmFyIHM7XG4gICAgICAgICAgICBpZiAodD09MCkgcmV0dXJuIGI7XG4gICAgICAgICAgICBpZiAoKHQgLz0gZCkgPT0gMSkgcmV0dXJuIGIgKyBjO1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBwID09IFwidW5kZWZpbmVkXCIpIHAgPSBkICogLjM7XG4gICAgICAgICAgICBpZiAoIWEgfHwgYSA8IE1hdGguYWJzKGMpKSB7XG4gICAgICAgICAgICAgICAgcyA9IHAgLyA0O1xuICAgICAgICAgICAgICAgIGEgPSBjO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBzID0gcCAvICgyICogTWF0aC5QSSkgKiBNYXRoLmFzaW4oYyAvIGEpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIC0oYSAqIE1hdGgucG93KDIsIDEwICogKHQgLT0gMSkpICogTWF0aC5zaW4oKHQgKiBkIC0gcykgKiAoMiAqIE1hdGguUEkpIC8gcCkpICsgYjtcbiAgICAgICAgfSxcbiAgICAgICAgZWFzZU91dDogZnVuY3Rpb24odCwgYiwgYywgZCwgYSwgcCkge1xuICAgICAgICAgICAgdmFyIHM7XG4gICAgICAgICAgICBpZiAodD09MCkgcmV0dXJuIGI7XG4gICAgICAgICAgICBpZiAoKHQgLz0gZCkgPT0gMSkgcmV0dXJuIGIgKyBjO1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBwID09IFwidW5kZWZpbmVkXCIpIHAgPSBkICogLjM7XG4gICAgICAgICAgICBpZiAoIWEgfHwgYSA8IE1hdGguYWJzKGMpKSB7XG4gICAgICAgICAgICAgICAgYSA9IGM7XG4gICAgICAgICAgICAgICAgcyA9IHAgLyA0O1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBzID0gcC8oMipNYXRoLlBJKSAqIE1hdGguYXNpbihjL2EpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIChhICogTWF0aC5wb3coMiwgLTEwICogdCkgKiBNYXRoLnNpbigodCAqIGQgLSBzKSAqICgyICogTWF0aC5QSSkgLyBwKSArIGMgKyBiKTtcbiAgICAgICAgfSxcbiAgICAgICAgZWFzZUluT3V0OiBmdW5jdGlvbih0LCBiLCBjLCBkLCBhLCBwKSB7XG4gICAgICAgICAgICB2YXIgcztcbiAgICAgICAgICAgIGlmICh0PT0wKSByZXR1cm4gYjtcbiAgICAgICAgICAgIGlmICgodCAvPSBkIC8gMikgPT0gMikgcmV0dXJuIGIrYztcbiAgICAgICAgICAgIGlmICh0eXBlb2YgcCA9PSBcInVuZGVmaW5lZFwiKSBwID0gZCAqICguMyAqIDEuNSk7XG4gICAgICAgICAgICBpZiAoIWEgfHwgYSA8IE1hdGguYWJzKGMpKSB7XG4gICAgICAgICAgICAgICAgYSA9IGM7XG4gICAgICAgICAgICAgICAgcyA9IHAgLyA0O1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBzID0gcCAvICgyICAqTWF0aC5QSSkgKiBNYXRoLmFzaW4oYyAvIGEpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHQgPCAxKSByZXR1cm4gLS41ICogKGEgKiBNYXRoLnBvdygyLCAxMCogKHQgLT0xICkpICogTWF0aC5zaW4oKHQgKiBkIC0gcykgKiAoMiAqIE1hdGguUEkpIC8gcCkpICsgYjtcbiAgICAgICAgICAgIHJldHVybiBhICogTWF0aC5wb3coMiwgLTEwICogKHQgLT0gMSkpICogTWF0aC5zaW4oKHQgKiBkIC0gcykgKiAoMiAqIE1hdGguUEkpIC8gcCApICogLjUgKyBjICsgYjtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgQmFjazoge1xuICAgICAgICBlYXNlSW46IGZ1bmN0aW9uKHQsIGIsIGMsIGQsIHMpIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgcyA9PSBcInVuZGVmaW5lZFwiKSBzID0gMS43MDE1ODtcbiAgICAgICAgICAgIHJldHVybiBjICogKHQgLz0gZCkgKiB0ICogKChzICsgMSkgKiB0IC0gcykgKyBiO1xuICAgICAgICB9LFxuICAgICAgICBlYXNlT3V0OiBmdW5jdGlvbih0LCBiLCBjLCBkLCBzKSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIHMgPT0gXCJ1bmRlZmluZWRcIikgcyA9IDEuNzAxNTg7XG4gICAgICAgICAgICByZXR1cm4gYyAqICgodCA9IHQvZCAtIDEpICogdCAqICgocyArIDEpICogdCArIHMpICsgMSkgKyBiO1xuICAgICAgICB9LFxuICAgICAgICBlYXNlSW5PdXQ6IGZ1bmN0aW9uKHQsIGIsIGMsIGQsIHMpIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgcyA9PSBcInVuZGVmaW5lZFwiKSBzID0gMS43MDE1ODtcbiAgICAgICAgICAgIGlmICgodCAvPSBkIC8gMikgPCAxKSByZXR1cm4gYyAvIDIgKiAodCAqIHQgKiAoKChzICo9ICgxLjUyNSkpICsgMSkgKiB0IC0gcykpICsgYjtcbiAgICAgICAgICAgIHJldHVybiBjIC8gMiooKHQgLT0gMikgKiB0ICogKCgocyAqPSAoMS41MjUpKSArIDEpICogdCArIHMpICsgMikgKyBiO1xuICAgICAgICB9XG4gICAgfSxcbiAgICBCb3VuY2U6IHtcbiAgICAgICAgZWFzZUluOiBmdW5jdGlvbih0LCBiLCBjLCBkKSB7XG4gICAgICAgICAgICByZXR1cm4gYyAtIFR3ZWVuVHlwZS5Cb3VuY2UuZWFzZU91dChkLXQsIDAsIGMsIGQpICsgYjtcbiAgICAgICAgfSxcbiAgICAgICAgZWFzZU91dDogZnVuY3Rpb24odCwgYiwgYywgZCkge1xuICAgICAgICAgICAgaWYgKCh0IC89IGQpIDwgKDEgLyAyLjc1KSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBjICogKDcuNTYyNSAqIHQgKiB0KSArIGI7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHQgPCAoMiAvIDIuNzUpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGMgKiAoNy41NjI1ICogKHQgLT0gKDEuNSAvIDIuNzUpKSAqIHQgKyAuNzUpICsgYjtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodCA8ICgyLjUgLyAyLjc1KSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBjICogKDcuNTYyNSAqICh0IC09ICgyLjI1IC8gMi43NSkpICogdCArIC45Mzc1KSArIGI7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiBjICogKDcuNTYyNSAqICh0IC09ICgyLjYyNSAvIDIuNzUpKSAqIHQgKyAuOTg0Mzc1KSArIGI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGVhc2VJbk91dDogZnVuY3Rpb24odCwgYiwgYywgZCkge1xuICAgICAgICAgICAgaWYgKHQgPCBkIC8gMikge1xuICAgICAgICAgICAgICAgIHJldHVybiBUd2VlblR5cGUuQm91bmNlLmVhc2VJbih0ICogMiwgMCwgYywgZCkgKiAuNSArIGI7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiBUd2VlblR5cGUuQm91bmNlLmVhc2VPdXQodCAqIDIgLSBkLCAwLCBjLCBkKSAqIC41ICsgYyAqIC41ICsgYjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn07XG5cbmNvbnN0IHJlcXVlc3RBbmltYXRpb25GcmFtZSA9IHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHwgd2luZG93LndlYmtpdFJlcXVlc3RBbmltYXRpb25GcmFtZTtcblxuY2xhc3MgVHdlZW57XG5cbiAgICBfc3RhcnRUaW1lOm51bWJlcjtcblxuICAgIC8qKlxuICAgICAqIOe8k+WKqOWKqOeUu+W3sue7j+i/kOihjOaXtumXtFxuICAgICAqIOivtOaYju+8miDpgJrov4fkuI3mlq3ntK/np6/mr4/kuIDluKfmiYDoirHotLnnmoTml7bpl7RcbiAgICAgKi9cbiAgICBfcnVubmluZ1RpbWU6bnVtYmVyO1xuXG4gICAgLyoqXG4gICAgICog5ZOq5Liq5o+S5Lu25pSv5oyB6K+l55uu5qCHXG4gICAgICovXG4gICAgX3BsdWdpbkluZGV4Om51bWJlcjtcblxuICAgIC8qKlxuICAgICAqIOe8k+WKqOWKqOeUu+aJp+ihjOaXtuWAmeeahOW4p+eOh++8jOWcqOe8k+WKqOWBnOatoueahOaXtuWAmeS8muiuvue9ruaIkDBcbiAgICAgKi9cbiAgICBmcHM6bnVtYmVyO1xuXG4gICAgY29uc3RydWN0b3IodGFyZ2V0OmFueSwgZnJvbVByb3BzOmFueSwgdG9Qcm9wczphbnksIGR1cmF0aW9uOm51bWJlciwgZWFzZTpUd2VlblR5cGUpe1xuXG4gICAgICAgIHRoaXMuX2V2ZW50cyA9IHtcbiAgICAgICAgICAgIG9uVXBkYXRlOiBudWxsLFxuICAgICAgICAgICAgb25Db21wbGV0ZTogbnVsbFxuICAgICAgICB9O1xuXG4gICAgICAgIC8vIOi/memHjOS4pOiAhemDveaYr+WQjOaXtuaLt+i0ne+8jOiAjOS4jeaUueWPmOWFtuiHqui6q+WxnuaAp++8jOWboOS4umNzc+agt+W8j+S7peWQjumcgOimgeW8leWFpemineWkluaPkuS7tuadpeaUr+aMge+8jOeOsOmYtuauteWPquiDveWcqG9uVXBkYXRl5LqL5Lu26YeM6Z2i5omL5Yqo57u05oqkXG4gICAgICAgIHRoaXMuZnJvbVByb3BzID0gVXRpbHMuY2xvbmUoZnJvbVByb3BzKTtcbiAgICAgICAgdGhpcy5fZnJvbVByb3BzT3JpZ2luID0gVXRpbHMuY2xvbmUoZnJvbVByb3BzKTtcbiAgICAgICAgdGhpcy50b1Byb3BzID0gdG9Qcm9wcztcbiAgICAgICAgdGhpcy5lYXNlID0gZWFzZTtcbiAgICAgICAgdGhpcy5kdXJhdGlvbiA9IGR1cmF0aW9uO1xuXG4gICAgICAgIHRoaXMuX3J1bm5pbmcgPSBmYWxzZTtcblxuICAgICAgICBUd2Vlbi5wbHVnaW5zLmZvckVhY2goKHBsdWdpbiwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgIGlmKHBsdWdpbi5pc1N1cHBvcnQodGFyZ2V0KSl7XG4gICAgICAgICAgICAgICAgdGhpcy5fcGx1Z2luSW5kZXggPSBpbmRleDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYoIVV0aWxzLmlzVW5kZWZpbmVkKHRoaXMuX3BsdWdpbkluZGV4KSl7XG4gICAgICAgICAgICBjb25zb2xlLmluZm8oXCLlkb3kuK3kuobmj5Lku7bvvJpcIiArIFR3ZWVuLnBsdWdpbnNbdGhpcy5fcGx1Z2luSW5kZXhdLm5hbWUpO1xuICAgICAgICB9XG5cblxuICAgIH1cblxuICAgIG9uVXBkYXRlKGNhbGxiYWNrOkZ1bmN0aW9uKTp0aGlze1xuICAgICAgICB0aGlzLl9ldmVudHMub25VcGRhdGUgPSBjYWxsYmFjaztcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgb25Db21wbGV0ZShjYWxsYmFjazpGdW5jdGlvbik6dGhpc3tcbiAgICAgICAgdGhpcy5fZXZlbnRzLm9uQ29tcGxldGUgPSBjYWxsYmFjaztcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5byA5aeL5Yqo55S7XG4gICAgICog6K+05piO77yaIHN0b3AoKeS5i+WQjueahOWKqOeUu+S8mumHjeaWsOW8gOWni1xuICAgICAqIEByZXR1cm4ge1R3ZWVufVxuICAgICAqL1xuICAgIHN0YXJ0KCk6dGhpc3tcbiAgICAgICAgdGhpcy5fcnVubmluZyA9IHRydWU7XG4gICAgICAgIHRoaXMuX3J1bm5pbmdUaW1lID0gMDtcbiAgICAgICAgdGhpcy5mcHMgPSAwO1xuXG4gICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSh0aGlzLl91cGRhdGUuYmluZCh0aGlzKSk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5YGc5q2i5Yqo55S7XG4gICAgICogQHJldHVybiB7VHdlZW59XG4gICAgICovXG4gICAgc3RvcCgpOnRoaXN7XG4gICAgICAgIHRoaXMuX3J1bm5pbmcgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5fc3RhcnRUaW1lID0gbnVsbDtcbiAgICAgICAgdGhpcy5mcHMgPSAwO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDkuIrkuIDluKfnmoTml7bpl7RcbiAgICAgKi9cbiAgICBfbGFzdFRpbWU6bnVtYmVyO1xuXG4gICAgX3VwZGF0ZShub3cpe1xuXG4gICAgICAgIC8vIOWIneWni+WMluW8gOWni+aXtumXtFxuICAgICAgICBpZihVdGlscy5pc1VuZGVmaW5lZCh0aGlzLl9sYXN0VGltZSkpe1xuICAgICAgICAgICAgdGhpcy5fbGFzdFRpbWUgPSBub3c7XG4gICAgICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGhpcy5fdXBkYXRlLmJpbmQodGhpcykpO1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5mcHMgPSAxMDAwLyhub3cgLSB0aGlzLl9sYXN0VGltZSk7XG5cbiAgICAgICAgdGhpcy5fcnVubmluZ1RpbWUgKz0gbm93IC0gdGhpcy5fbGFzdFRpbWU7XG5cbiAgICAgICAgaWYodGhpcy5fcnVubmluZ1RpbWUgPj0gdGhpcy5kdXJhdGlvbil7XG4gICAgICAgICAgICB0aGlzLnN0b3AoKTtcbiAgICAgICAgICAgIHRoaXMuX2ZpeGVkSW5FbmQoKTtcbiAgICAgICAgICAgIHRoaXMuX2V2ZW50cy5vbkNvbXBsZXRlICYmIHRoaXMuX2V2ZW50cy5vbkNvbXBsZXRlLmNhbGwodGhpcy5mcm9tUHJvcHMpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fZXZlbnRzLm9uVXBkYXRlICYmIHRoaXMuX2V2ZW50cy5vblVwZGF0ZS5jYWxsKHRoaXMuZnJvbVByb3BzKTtcblxuICAgICAgICAvLyDorqHnrpfpnIDopoHnvJPliqjnmoTlsZ7mgKflkozlr7nlupTlgLxcbiAgICAgICAgT2JqZWN0LmtleXModGhpcy50b1Byb3BzKS5mb3JFYWNoKChwcm9wKSA9PiB7XG5cbiAgICAgICAgICAgIHRoaXMuZnJvbVByb3BzW3Byb3BdID0gdGhpcy5lYXNlKHRoaXMuX3J1bm5pbmdUaW1lLCB0aGlzLl9mcm9tUHJvcHNPcmlnaW5bcHJvcF0sIHRoaXMudG9Qcm9wc1twcm9wXSAtIHRoaXMuX2Zyb21Qcm9wc09yaWdpbltwcm9wXSwgdGhpcy5kdXJhdGlvbik7XG5cbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYodGhpcy5fcnVubmluZyl7XG4gICAgICAgICAgICB0aGlzLl9sYXN0VGltZSA9IG5vdztcbiAgICAgICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSh0aGlzLl91cGRhdGUuYmluZCh0aGlzKSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDlsIbnvJPliqjlsZ7mgKflr7npvZBcbiAgICAgKiDor7TmmI7vvJog5Zug5Li657uT5p2f5pe26Ze05Yeg5LmO5LiN5Y+v6IO95Y2h5Zyo57uT5p2f55qE6YKj5LiA5q+r56eS77yM5omA5Lul57uT5p2f5ZCO6ZyA6KaB5omL5Yqo5bCG6K+v5beu5a+56b2QXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBfZml4ZWRJbkVuZCgpe1xuICAgICAgICBPYmplY3Qua2V5cyh0aGlzLnRvUHJvcHMpLmZvckVhY2goKHByb3ApID0+IHtcbiAgICAgICAgICAgIHRoaXMuZnJvbVByb3BzW3Byb3BdID0gdGhpcy50b1Byb3BzW3Byb3BdO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDku6Xlr7nosaHoh6rouqvlsZ7mgKfkuLrotbfngrnvvIznvJPliqjliLDnm67moIflsZ7mgKdcbiAgICAgKiBAcGFyYW0gdGFyZ2V0IOmAieS4reWvueixoVxuICAgICAqIEBwYXJhbSB0b1Byb3BzIOebruagh+WxnuaAp1xuICAgICAqIEBwYXJhbSBkdXJhdGlvbiB7bnVtYmVyfSDogJfml7bjgIIg5Y2V5L2N5q+r56eSXG4gICAgICogQHBhcmFtIGVhc2Ug57yT5Yqo57G75Z6LXG4gICAgICogQHBhcmFtIGNhbGxiYWNrIHtGdW5jdGlvbn0g5a6M5oiQ5LmL5ZCO55qE5Zue6LCDXG4gICAgICovXG4gICAgc3RhdGljIHRvKHRhcmdldDphbnkgLCB0b1Byb3BzOmFueSwgZHVyYXRpb246bnVtYmVyLCBlYXNlOlR3ZWVuVHlwZSA9IFR3ZWVuLkVhc2UuTGluZWFyLCBjYWxsYmFjaz86RnVuY3Rpb24pOiBUd2VlbntcblxuICAgICAgICAvLyDmnoTlu7rkuIDkuKpmcm9tUHJvcHPvvIzph43mlrDnlJ/miJDkuIDkuKpUd2VlbuWvueixoVxuICAgICAgICBsZXQgZnJvbVByb3BzID0ge307XG4gICAgICAgIGZvcihsZXQgaSBpbiB0b1Byb3BzKXtcbiAgICAgICAgICAgIGlmKHRvUHJvcHMuaGFzT3duUHJvcGVydHkoaSkpIGZyb21Qcm9wc1tpXSA9IHRhcmdldFtpXTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCB0d2VlbiA9IG5ldyBUd2Vlbih0YXJnZXQsIGZyb21Qcm9wcywgdG9Qcm9wcywgZHVyYXRpb24sIGVhc2UpO1xuXG4gICAgICAgIGlmKGNhbGxiYWNrKXtcbiAgICAgICAgICAgIHR3ZWVuLm9uQ29tcGxldGUoY2FsbGJhY2spO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHR3ZWVuO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOaMh+WumuWvueixoeW8gOWni+WxnuaAp++8jOe8k+WKqOWIsOebruagh+WxnuaAp1xuICAgICAqIEBwYXJhbSB0YXJnZXQg6YCJ5Lit5a+56LGhXG4gICAgICogQHBhcmFtIGZyb21Qcm9wcyDlvIDlp4vlsZ7mgKdcbiAgICAgKiBAcGFyYW0gdG9Qcm9wcyDnm67moIflsZ7mgKdcbiAgICAgKiBAcGFyYW0gZHVyYXRpb24ge251bWJlcn0g6ICX5pe244CCIOWNleS9jeavq+enklxuICAgICAqIEBwYXJhbSBlYXNlIOe8k+WKqOexu+Wei1xuICAgICAqIEBwYXJhbSBjYWxsYmFjayB7RnVuY3Rpb259IOWujOaIkOS5i+WQjueahOWbnuiwg1xuICAgICAqL1xuICAgIHN0YXRpYyBmcm9tVG8odGFyZ2V0OmFueSwgZnJvbVByb3BzOmFueSwgdG9Qcm9wczphbnksIGR1cmF0aW9uOm51bWJlciwgZWFzZTpUd2VlblR5cGUgPSBUd2Vlbi5FYXNlLkxpbmVhciwgY2FsbGJhY2s/OkZ1bmN0aW9uKTogVHdlZW57XG5cbiAgICAgICAgbGV0IHR3ZWVuID0gbmV3IFR3ZWVuKHRhcmdldCwgZnJvbVByb3BzLCB0b1Byb3BzLCBkdXJhdGlvbiwgZWFzZSk7XG5cbiAgICAgICAgaWYoY2FsbGJhY2spe1xuICAgICAgICAgICAgdHdlZW4ub25Db21wbGV0ZShjYWxsYmFjayk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdHdlZW47XG4gICAgfVxuXG59XG5cbi8vIOiuvue9ruS4uumdmeaAgeWxnuaAp1xuVHdlZW4uRWFzZSA9IFR3ZWVuVHlwZTtcblxuVHdlZW4ucGx1Z2lucyA9IFtcbiAgICBjc3NQbHVnaW5cbl07XG5cbmNvbnN0IHRlc3RlciA9IHtcblxuICAgIHBsYXllcjogZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKSxcblxuICAgIGluaXQoKXtcbiAgICAgICAgdGhpcy5wbGF5ZXIuY2xhc3NOYW1lID0gXCJ0ZXN0LWRvdGVyXCI7XG4gICAgICAgIHRoaXMucGxheWVyLnN0eWxlLnBvc2l0aW9uID0gXCJhYnNvbHV0ZVwiO1xuICAgICAgICB0aGlzLnBsYXllci5zdHlsZS50b3AgPSBcIjBcIjtcbiAgICAgICAgdGhpcy5wbGF5ZXIuc3R5bGUubGVmdCA9IFwiMFwiO1xuICAgICAgICB0aGlzLnBsYXllci5zdHlsZS53aWR0aCA9IFwiMzBweFwiO1xuICAgICAgICB0aGlzLnBsYXllci5zdHlsZS5oZWlnaHQgPSBcIjMwcHhcIjtcbiAgICAgICAgdGhpcy5wbGF5ZXIuc3R5bGUuYmFja2dyb3VuZCA9IFwicmVkXCI7XG4gICAgICAgIHRoaXMucGxheWVyLnN0eWxlLmJvcmRlclJhZGl1cyA9IFwiNTAlXCI7XG4gICAgICAgIHRoaXMucGxheWVyLnN0eWxlLnpJbmRleCA9IFwiMTExMTFcIjtcblxuICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHRoaXMucGxheWVyKTtcbiAgICB9XG5cbn07XG5cbnRlc3Rlci5pbml0KCk7XG5cbndpbmRvdy50ID0gVHdlZW4udG8oe3g6IDAsIHk6MH0sIHt4OiB3aW5kb3cuaW5uZXJXaWR0aCAtIDMwLCB5OiB3aW5kb3cuaW5uZXJIZWlnaHQgLSAzMH0sIDIwMDAsIFR3ZWVuLkVhc2UuQ3ViaWMuZWFzZUluT3V0KVxuICAgIC5vblVwZGF0ZShmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMueCwgdGhpcy55KTtcbiAgICAgICAgdGVzdGVyLnBsYXllci5zdHlsZS50b3AgPSBgJHt0aGlzLnl9cHhgO1xuICAgICAgICB0ZXN0ZXIucGxheWVyLnN0eWxlLmxlZnQgPSBgJHt0aGlzLnh9cHhgO1xuICAgIH0pXG4gICAgLm9uQ29tcGxldGUoZnVuY3Rpb24gKCkge1xuICAgICAgICBjb25zb2xlLmluZm8oXCJJJ20gZmluaXNoXCIpO1xuICAgIH0pO1xuXG5cbmV4cG9ydCBkZWZhdWx0IFR3ZWVuO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9Ud2Vlbi9pbmRleC5qcyIsIi8qKlxuICogQ3JlYXRlZCBieSBjb2ZmZWUgb24gMDIvMDMvMjAxNy5cbiAqL1xuXG5jbGFzcyBVdGlsc3tcblxuICAgIHN0YXRpYyBpc09iamVjdCh0YXJnZXQpOmJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdHlwZW9mIHRhcmdldCA9PT0gXCJvYmplY3RcIjtcbiAgICB9XG5cbiAgICBzdGF0aWMgaXNOdW1iZXIodGFyZ2V0KTpib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHR5cGVvZiB0YXJnZXQgPT09IFwibnVtYmVyXCI7XG4gICAgfVxuXG4gICAgc3RhdGljIGlzRnVuY3Rpb24odGFyZ2V0KTpib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHR5cGVvZiB0YXJnZXQgPT09IFwiZnVuY3Rpb25cIjtcbiAgICB9XG5cbiAgICBzdGF0aWMgaXNVbmRlZmluZWQodGFyZ2V0KTpib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHR5cGVvZiB0YXJnZXQgPT09IFwidW5kZWZpbmVkXCI7XG4gICAgfVxuXG4gICAgc3RhdGljIGlzQXJyYXkodGFyZ2V0KTpib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIEFycmF5LmlzQXJyYXkodGFyZ2V0KTtcbiAgICB9XG5cbiAgICBzdGF0aWMgaXNOdWxsKHRhcmdldCk6Ym9vbGVhbntcbiAgICAgICAgcmV0dXJuIHRhcmdldCA9PT0gbnVsbDtcbiAgICB9XG5cbiAgICBzdGF0aWMgaXNMaWtlQXJyYXkodGFyZ2V0KTpib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIFV0aWxzLmlzQXJyYXkodGFyZ2V0KSAmJiBVdGlscy5pc051bWJlcih0YXJnZXQubGVuZ3RoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDlr7nmlbDnu4TjgIHkvKrmlbDnu4TjgIHlr7nosaHlsZ7mgKfliJfooajov5vooYzpgY3ljoZcbiAgICAgKiBAcGFyYW0gdGFyZ2V0XG4gICAgICogQHBhcmFtIGNhbGxiYWNrXG4gICAgICogQHJldHVybiB7Ym9vbGVhbn1cbiAgICAgKi9cbiAgICBzdGF0aWMgZWFjaCh0YXJnZXQsIGNhbGxiYWNrKXtcbiAgICAgICAgaWYoIVV0aWxzLmlzRnVuY3Rpb24oY2FsbGJhY2spKSByZXR1cm4gZmFsc2U7XG5cbiAgICAgICAgaWYoVXRpbHMuaXNBcnJheSh0YXJnZXQpIHx8IFV0aWxzLmlzTGlrZUFycmF5KHRhcmdldCkpe1xuICAgICAgICAgICAgQXJyYXkucHJvdG90eXBlLmZvckVhY2guY2FsbCh0YXJnZXQsIGNhbGxiYWNrKTtcbiAgICAgICAgfVxuICAgICAgICAvL2Vsc2UgaWYoVXRpbHMuaXNPYmplY3QodGFyZ2V0KSl7XG4gICAgICAgIC8vXG4gICAgICAgIC8vICAgIGxldCBrZXlzID0gT2JqZWN0LmtleXModGFyZ2V0KTtcbiAgICAgICAgLy9cbiAgICAgICAgLy8gICAga2V5cy5mb3JFYWNoKChlLCBpKSA9PiB7XG4gICAgICAgIC8vICAgICAgICBjYWxsYmFjay5jYWxsKHRoaXMsIGUsIGkpXG4gICAgICAgIC8vICAgIH0pO1xuICAgICAgICAvL1xuICAgICAgICAvL31cblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOWFi+mahuS4gOS4quaVsOe7hFxuICAgICAqIOivtOaYju+8mui/meS4quWSjOiHquW4pueahOS4jeWQjO+8jOivpeWHveaVsOS8muiHquWKqOWvueWIl+ihqOmHjOmdoueahOWvueixoei/m+ihjOa3seaLt+i0nVxuICAgICAqIEBwYXJhbSB0YXJnZXRBcnJheVxuICAgICAqIEByZXR1cm4ge2FueVtdfVxuICAgICAqL1xuICAgIHN0YXRpYyBfY2xvbmVBcnJheSh0YXJnZXRBcnJheTogYW55W10pe1xuXG4gICAgICAgIGxldCBuZXdBcnJheTphbnlbXSA9IFtdO1xuXG4gICAgICAgIHRhcmdldEFycmF5LmZvckVhY2goKGVsZSwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgIHN3aXRjaCAodHlwZW9mIGVsZSl7XG4gICAgICAgICAgICAgICAgY2FzZSBcIm51bWJlclwiOlxuICAgICAgICAgICAgICAgIGNhc2UgXCJ1bmRlZmluZWRcIjpcbiAgICAgICAgICAgICAgICBjYXNlIFwic3RyaW5nXCI6XG4gICAgICAgICAgICAgICAgY2FzZSBcImJvb2xlYW5cIjpcbiAgICAgICAgICAgICAgICAgICAgbmV3QXJyYXlbaW5kZXhdID0gZWxlO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2UgXCJvYmplY3RcIjpcbiAgICAgICAgICAgICAgICAgICAgaWYoVXRpbHMuaXNOdWxsKGVsZSkpe1xuICAgICAgICAgICAgICAgICAgICAgICAgbmV3QXJyYXlbaW5kZXhdID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgfWVsc2UgaWYoVXRpbHMuaXNBcnJheShlbGUpKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ld0FycmF5W2luZGV4XSA9IFV0aWxzLmNsb25lQXJyYXkoZWxlKTtcbiAgICAgICAgICAgICAgICAgICAgfWVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgbmV3QXJyYXlbaW5kZXhdID0gVXRpbHMuY2xvbmUoZWxlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gbmV3QXJyYXk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5YWL6ZqG5LiA5Liq5a+56LGh5oiW6ICF5pWw57uEXG4gICAgICog6K+05piO77ya5Y+C5pWw5aaC5p6c5pivbnVtYmVyLHVuZGVmaW5lZCxudWxsLHN0cmluZyxib29sZWFu562J5Z+656GA57G75Z6L5Lya55u05o6l6L+U5Zue6Ieq6LqrXG4gICAgICogQHBhcmFtIHRhcmdldCDku7vkvZXlr7nosaHmiJbogIXmlbDnu4RcbiAgICAgKiBAcmV0dXJuIHt7fX1cbiAgICAgKi9cbiAgICBzdGF0aWMgY2xvbmUodGFyZ2V0OiBhbnl8YW55W10pe1xuXG4gICAgICAgIGlmKFV0aWxzLmlzQXJyYXkodGFyZ2V0KSl7XG4gICAgICAgICAgICByZXR1cm4gVXRpbHMuX2Nsb25lQXJyYXkodGFyZ2V0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBuZXdUYXJnZXQgPSB7fTtcblxuICAgICAgICBPYmplY3Qua2V5cyh0YXJnZXQpLmZvckVhY2gocHJvcCA9PiB7XG5cbiAgICAgICAgICAgIHN3aXRjaCAodHlwZW9mIHRhcmdldFtwcm9wXSl7XG5cbiAgICAgICAgICAgICAgICBjYXNlIFwibnVtYmVyXCI6XG4gICAgICAgICAgICAgICAgY2FzZSBcInVuZGVmaW5lZFwiOlxuICAgICAgICAgICAgICAgIGNhc2UgXCJzdHJpbmdcIjpcbiAgICAgICAgICAgICAgICBjYXNlIFwiYm9vbGVhblwiOlxuICAgICAgICAgICAgICAgICAgICBuZXdUYXJnZXRbcHJvcF0gPSB0YXJnZXRbcHJvcF07XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgY2FzZSBcIm9iamVjdFwiOlxuICAgICAgICAgICAgICAgICAgICBpZihVdGlscy5pc051bGwodGFyZ2V0W3Byb3BdKSl7XG4gICAgICAgICAgICAgICAgICAgICAgICBuZXdUYXJnZXRbcHJvcF0gPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ld1RhcmdldFtwcm9wXSA9IFV0aWxzLmNsb25lKHRhcmdldFtwcm9wXSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIE9iamVjdC5rZXlzKG5ld1RhcmdldCkubGVuZ3RoID4gMCA/IG5ld1RhcmdldCA6IHRhcmdldDtcbiAgICB9XG5cbn1cblxuXG5leHBvcnQgZGVmYXVsdCBVdGlscztcblxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2xpYnMvVXRpbHMuanMiLCIvKipcbiAqIENTU+WFg+e0oOeahOe8k+WKqOe7hOS7tlxuICogQ3JlYXRlZCBieSBjb2ZmZWUgb24gMDcvMDMvMjAxNy5cbiAqXG4gKiDmlK/mjIHnvJPliqjnmoTlsZ7mgKdcbiAqIC0g5bey5pSv5oyB77yaIHdpZHRoLCBoZWlnaHQsIHRvcCwgbGVmdCwgcmlnaHQsIGJvdHRvbSwgbWFyZ2luLCBwYWRkaW5nXG4gKiAtIOW+heaUr+aMge+8miB0cmFuc2Zvcm0sIGNvbG9yLCBvcGFjaXR5XG4gKi9cblxuXG5jb25zdCBjc3NQbHVnaW4gPSB7XG5cbiAgICBuYW1lOiBcImNzc1BsdWdpblwiLFxuXG4gICAgdmVyc2lvbjogXCIwLjAuMVwiLFxuXG4gICAgLyoqXG4gICAgICog6K+l5o+S5Lu26IO95ZCm5pSv5oyB55uu5qCH5a+56LGhXG4gICAgICogQHBhcmFtIHRhcmdldFxuICAgICAqL1xuICAgIGlzU3VwcG9ydCh0YXJnZXQ6SFRNTEVsZW1lbnQpe1xuICAgICAgICByZXR1cm4gdGFyZ2V0IGluc3RhbmNlb2YgSFRNTEVsZW1lbnQ7XG4gICAgfSxcblxuICAgIC8vIOaUr+aMgeeahOWxnuaAp1xuICAgIF9zdXBwb3J0TGlzdDogW1xuICAgICAgICBcImxlZnRcIiwgXCJyaWdodFwiLCBcInRvcFwiLCBcImJvdHRvbVwiLFxuICAgICAgICBcIndpZHRoXCIsIFwiaGVpZ2h0XCIsXG4gICAgICAgIFwibWFyZ2luXCIsIFwibWFyZ2luLWxlZnRcIiwgXCJtYXJnaW4tcmlnaHRcIiwgXCJtYXJnaW4tdG9wXCIsIFwibWFyZ2luLWJvdHRvbVwiLFxuICAgICAgICBcInBhZGRpbmdcIiwgXCJwYWRkaW5nLWxlZnRcIiwgXCJwYWRkaW5nLXJpZ2h0XCIsIFwicGFkZGluZy10b3BcIiwgXCJwYWRkaW5nLWJvdHRvbVwiXG4gICAgXSxcblxuICAgIC8vIOWPr+S7peWQiOW5tueahOWxnuaAp++8jOiuvuiuoeWIsOWQjue7reeahOino+aekOeahOaLhuWIhlxuICAgIF9zdXBwb3J0TWVyZ2VMaXN0OiBbXG4gICAgICAgIFwibWFyZ2luXCIsIFwicGFkZGluZ1wiXG4gICAgXSxcblxuICAgIF9leGFtcGxlOiB7XG4gICAgICAgIFwid2lkdGhcIjoge1xuICAgICAgICAgICAgdmFsdWU6IDEuNjMsXG4gICAgICAgICAgICB1bml0OiBcInJlbVwiXG4gICAgICAgIH0sXG5cbiAgICAgICAgLy8g5aaC5p6c6K6+572u55qE5piv5pW05LiqbWFyZ2lu77yM6YKj5LmI6L2s5o2i5ZCO55qE6ZSu5Lya5pyJ5Zub5Liq77yM6K6+572u55qE5pe25YCZ5Lmf6ZyA6KaB5ZCI5bm25Zue5Y6744CC5Y+N5LmL77yM5Y2V54us6L+Q566X44CCXG4gICAgICAgIFwibWFyZ2luXCI6IHtcbiAgICAgICAgICAgIFwidG9wXCI6IHtcbiAgICAgICAgICAgICAgICB2YWx1ZTogMTAwLFxuICAgICAgICAgICAgICAgIHVuaXQ6IFwicmVtXCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcImJvdHRvbVwiOiB7XG4gICAgICAgICAgICAgICAgdmFsdWU6IDEwMCxcbiAgICAgICAgICAgICAgICB1bml0OiBcInB4XCJcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgfSxcblxuICAgIF91cGRhdGUoaHRtbEVsZVRhcmdldCl7XG5cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICog6K+75Y+WSFRNTOWFg+e0oOS4inN0eWxl5bGe5oCn55qE5YC877yM6Kej5p6Q5oiQ5Y+v5Lul6K+75Y+W55qE5a+56LGhXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBfcGFyc2UoKXtcblxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEByZXR1cm4ge3t9fVxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgX3BhcnNlUHJvcHMocHJvcHM6IGFueSl7XG4gICAgICAgIGxldCBzdHlsZURpY3QgPSB7fTtcblxuICAgICAgICByZXR1cm4gc3R5bGVEaWN0O1xuICAgIH1cblxufTtcblxuXG5leHBvcnQgZGVmYXVsdCBjc3NQbHVnaW47XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL1R3ZWVuL3BsdWdpbnMvY3NzUGx1Z2luLmpzIiwiLyoqXG4gKiBDcmVhdGVkIGJ5IGNvZmZlZSBvbiAyMy8wMi8yMDE3LlxuICovXG5cbmltcG9ydCAkIGZyb20gXCJ3ZWJwYWNrLXplcHRvXCI7XG5pbXBvcnQgU2Nyb2xsIGZyb20gXCIuL3Njcm9sbFwiO1xuXG5pbXBvcnQgVHdlZW4gZnJvbSBcIi4uL1R3ZWVuL2luZGV4XCI7XG5cbmltcG9ydCBodG1sU3RyIGZyb20gXCIuL2RhdGVQaWNrZXIuaHRtbFwiO1xuaW1wb3J0IFwiLi9kYXRlUGlja2VyLnNjc3NcIjtcblxud2luZG93LiQgPSAkO1xuXG5jbGFzcyBEYXRlUGlja2Vye1xuXG4gICAgY29uc3RydWN0b3IoKXtcblxuICAgICAgICBkb2N1bWVudC5ib2R5Lmluc2VydEFkamFjZW50SFRNTChcImJlZm9yZUVuZFwiLCBodG1sU3RyKTtcblxuICAgICAgICAkKFwiLmZmLXBpY2tlci1zY3JvbGxcIikuZWFjaCgoaSwgZSkgPT4ge1xuXG4gICAgICAgICAgICB3aW5kb3dbXCJzXCIgKyBpXSA9IG5ldyBTY3JvbGwoe1xuICAgICAgICAgICAgICAgIGVsOiBlXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDph43mlrDorr7nva7lvIDlp4vml6XmnJ9cbiAgICAgKi9cbiAgICBzZXRTdGFydERhdGUoKXtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOmHjeaWsOiuvue9rue7k+adn+aXpeacn1xuICAgICAqL1xuICAgIHNldEVuZERhdGUoKXtcblxuICAgIH1cblxuICAgIHNob3coKXtcblxuICAgIH1cblxuICAgIGhpZGUoKXtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOa4suafk+aXpeacn+eahEhUTUznu5PmnoRcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIF9yZW5kZXIoKXtcblxuICAgIH1cblxufVxuXG5cbm1vZHVsZS5leHBvcnRzID0gRGF0ZVBpY2tlcjtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvRGF0ZVBpY2tlci9pbmRleC5qcyIsIi8qKlxuICogQ3JlYXRlZCBieSBjb2ZmZWUgb24gMjgvMDIvMjAxNy5cbiAqL1xuXG5pbXBvcnQgJCBmcm9tIFwid2VicGFjay16ZXB0b1wiO1xuaW1wb3J0IFR3ZWVuIGZyb20gXCIuLi9Ud2Vlbi9pbmRleFwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTY3JvbGx7XG5cbiAgICAvKipcbiAgICAgKiDmu5HliqjlgZzmraLnmoTml7blgJnvvIzmu5rliqjlhYPntKDlnKjmnIDlkI4wLjJz6ZmE5bim55qE6YCf5bqmXG4gICAgICovXG4gICAgc3BlZWRYOm51bWJlcjtcbiAgICBzcGVlZFk6bnVtYmVyO1xuXG4gICAgdHdlZW46VHdlZW47XG5cbiAgICBjb25zdHJ1Y3RvcihvcHRpb25zID0ge30pe1xuXG4gICAgICAgIGxldCBkZWZhdWx0cyA9IHRoaXMuZGVmYXVsdHMgPSAkLmV4dGVuZCh7XG5cbiAgICAgICAgICAgIGVsOiBudWxsLCAvLyDpnIDopoHorr7nva7mu5rliqjnmoTniLbnuqflhYPntKDvvIzpnIDopoHkuLpkb23ljp/nlJ/lr7nosaFcblxuICAgICAgICAgICAgb25DaGFuZ2U6IG51bGwsIC8vIOWIl+ihqOmAieS4reaUueWPmOWQjuWPkeeUn+eahOWbnuiwg1xuXG4gICAgICAgICAgICBpdGVtcyAgICAgOiBbXSwgLy8g5YiX6KGo6aG577yMIOS8muiHquWKqOeUn+aIkEhUTUznu5PmnoTmt7vliqDliLDniLbnuqflhYPntKBcbiAgICAgICAgICAgIGl0ZW1IZWlnaHQ6IDAsIC8vIOavj+S4qml0ZW3nmoTpq5jluqbvvIzoh6rliqjnlJ/miJBcblxuICAgICAgICAgICAgb2Zmc2V0ICAgICAgOiAyLCAvLyDlnKjpobbpg6jliqDlhaXlgY/np7vph4/vvIzorqnnrKzkuIDkuKrpgInmi6nlnKjkuK3pl7TjgIJcbiAgICAgICAgICAgIG9mZnNldEhlaWdodDogMCwgLy8g5Yqo5oCB6K6h566X6ZyA6KaB5YGP56e755qE6auY5bqmXG5cbiAgICAgICAgICAgIHNob3dDb3VudDogNSwgLy8g5pyA5aSa5pi+56S65Yeg5Liq77yM6LaF5Ye655qE5Lya6KKr6ZqQ6JePXG5cbiAgICAgICAgfSwgb3B0aW9ucyk7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIOa7muWKqOe7hOS7tueahOeItue6p+WFg+e0oFxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5zY3JvbGxXcmFwcGVyID0gJChkZWZhdWx0cy5lbCk7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIOWIl+ihqOmAiemhue+8jOeUseWug+i0n+i0o+S9jeenu1xuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5zY3JvbGxMaXN0ID0gdGhpcy5zY3JvbGxXcmFwcGVyLmZpbmQoXCIuZmYtcGlja2VyLWxpc3RcIik7XG4gICAgICAgIHRoaXMuc2Nyb2xsTGlzdEl0ZW0gPSB0aGlzLnNjcm9sbExpc3QuZmluZChcIi5mZi1waWNrZXItaXRlbVwiKTtcblxuICAgICAgICB0aGlzLmRlZmF1bHRzLml0ZW1IZWlnaHQgICA9IHRoaXMuc2Nyb2xsTGlzdEl0ZW0uaGVpZ2h0KCk7XG4gICAgICAgIHRoaXMuZGVmYXVsdHMub2Zmc2V0SGVpZ2h0ID0gdGhpcy5kZWZhdWx0cy5pdGVtSGVpZ2h0ICogMjtcblxuICAgICAgICB0aGlzLmRlZmF1bHRzLm1heFRvcCA9IHRoaXMuZGVmYXVsdHMub2Zmc2V0SGVpZ2h0O1xuICAgICAgICB0aGlzLmRlZmF1bHRzLm1pblRvcCA9IHRoaXMuc2Nyb2xsTGlzdC5oZWlnaHQoKSAtIHRoaXMuZGVmYXVsdHMub2Zmc2V0SGVpZ2h0IC0gdGhpcy5kZWZhdWx0cy5pdGVtSGVpZ2h0O1xuXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuZGVmYXVsdHMubWF4VG9wLCB0aGlzLmRlZmF1bHRzLm1pblRvcCk7XG5cbiAgICAgICAgdGhpcy5fc2Nyb2xsWSgwKTtcblxuICAgICAgICB0aGlzLl9pbml0KCk7XG4gICAgfVxuXG4gICAgX2luaXQoKXtcbiAgICAgICAgbGV0IF90aGlzID0gdGhpcztcblxuICAgICAgICB0aGlzLnNjcm9sbFdyYXBwZXIuaGVpZ2h0KHRoaXMuZGVmYXVsdHMuaXRlbUhlaWdodCo1KTtcbiAgICAgICAgdGhpcy5zY3JvbGxMaXN0SXRlbS5lcSgwKS5hZGRDbGFzcyhcImFjdGl2ZVwiKS5zaWJsaW5ncygpLnJlbW92ZUNsYXNzKFwiYWN0aXZlXCIpO1xuXG4gICAgICAgIGxldCBzdGFydFk6IG51bWJlciAgPSAwLFxuICAgICAgICAgICAgZW5kWTogbnVtYmVyICAgID0gMCxcbiAgICAgICAgICAgIG9yaWdpblk6IG51bWJlciA9IDA7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIOi/kOWKqOmAn+W6puiuoeeul+aAnei3r++8mlxuICAgICAgICAgKiDorrDlvZXkuIrkuIDluKfnmoTop6blj5Hml7bpl7Tlkozot53nprvvvIzlkozlvZPliY3ov5vooYzlr7nmr5Tlvpflh7rpgJ/luqbjgIJcbiAgICAgICAgICovXG4gICAgICAgIGxldCBzcGVlZFJlY29yZCA9IHtcblxuICAgICAgICAgICAgX3ByZXZUaW1lOiBudWxsLCAvLyDkuIrkuIDmrKHorqHnrpfkvY3nva7nmoTml7bpl7TvvIzkuIDoiKzmnaXor7Tmr4/pmpQwLjJz5bCx5Lya5Yi35paw5LiA5qyhXG4gICAgICAgICAgICBfcHJldlk6IG51bGwsIC8vIOS4iuS4gOS4quiuoeeul+aXtumXtOWNleS9jeS4reeahOS9jee9ruOAgiDnlKjmnaXorqHnrpfmnIDlkI4wLjJz55qE6YCf5bqmXG5cbiAgICAgICAgICAgIF9ydW5uaW5nOiBmYWxzZSxcblxuICAgICAgICAgICAgX3NwZWVkOiB7XG4gICAgICAgICAgICAgICAgeDogMCxcbiAgICAgICAgICAgICAgICB5OiAwXG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIOW8gOWni+iusOW9leavj+W4p+S4reeahOmAn+W6plxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBzdGFydCgpe1xuXG4gICAgICAgICAgICAgICAgdGhpcy5fcnVubmluZyA9IHRydWU7XG5cbiAgICAgICAgICAgICAgICBsZXQgbGFzdFRpbWU6bnVtYmVyLFxuICAgICAgICAgICAgICAgICAgICBsYXN0WTpudW1iZXI7XG5cbiAgICAgICAgICAgICAgICBsZXQgZ28gPSAobm93Om51bWJlcikgPT4ge1xuXG4gICAgICAgICAgICAgICAgICAgIGlmKCFsYXN0VGltZSl7XG4gICAgICAgICAgICAgICAgICAgICAgICBsYXN0VGltZSA9IG5vdztcbiAgICAgICAgICAgICAgICAgICAgICAgIGxhc3RZID0gZW5kWTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGxldCBpbnRlcnZhbCA9IG5vdyAtIGxhc3RUaW1lO1xuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3NwZWVkLnkgPSAobGFzdFkgLSBlbmRZKS8oaW50ZXJ2YWwvMTAwMCk7XG5cbiAgICAgICAgICAgICAgICAgICAgbGFzdFRpbWUgPSBub3c7XG4gICAgICAgICAgICAgICAgICAgIGxhc3RZID0gZW5kWTtcbiAgICAgICAgICAgICAgICAgICAgaWYodGhpcy5fcnVubmluZyl7XG4gICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKGdvKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZ28pO1xuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgc3RvcCgpe1xuICAgICAgICAgICAgICAgIHRoaXMuX3J1bm5pbmcgPSBmYWxzZTtcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICog6L+U5Zue5LiA5Liq5a+56LGh77yM5YyF5ZCr552AeOi9tOeahOmAn+W6puWSjHnovbTnmoTpgJ/luqZcbiAgICAgICAgICAgICAqIEByZXR1cm4ge3t4OiBudW1iZXIsIHk6IG51bWJlcn19XG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIGdldFNwZWVkKCl7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3NwZWVkO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIHRoaXMuc2Nyb2xsTGlzdC5vbihcInRvdWNoc3RhcnRcIiwgKGV2ZW50OiBUb3VjaEV2ZW50KSA9PiB7XG5cbiAgICAgICAgICAgIHN0YXJ0WSA9IGVuZFkgPSBldmVudC5jaGFuZ2VkVG91Y2hlc1swXS5wYWdlWTtcblxuICAgICAgICAgICAgb3JpZ2luWSA9IHRoaXMuX2dldE9yaWdpblkoKTtcblxuICAgICAgICAgICAgY29uc29sZS5sb2coYGV2ZW50IHR5cGU6ICR7ZXZlbnQudHlwZX0uYCk7XG5cbiAgICAgICAgICAgIHNwZWVkUmVjb3JkLnN0YXJ0KCk7XG5cbiAgICAgICAgfSkub24oXCJ0b3VjaG1vdmVcIiwgKGV2ZW50OiBUb3VjaEV2ZW50KSA9PiB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgZXZlbnQgdHlwZTogJHtldmVudC50eXBlfS5gKTtcblxuICAgICAgICAgICAgZW5kWSA9IGV2ZW50LmNoYW5nZWRUb3VjaGVzWzBdLnBhZ2VZO1xuXG4gICAgICAgICAgICB0aGlzLl9zY3JvbGxZKGVuZFkgLSBzdGFydFkgKyBvcmlnaW5ZKTtcblxuICAgICAgICB9KS5vbihcInRvdWNoZW5kXCIsIChldmVudCkgPT4ge1xuICAgICAgICAgICAgc3BlZWRSZWNvcmQuc3RvcCgpO1xuXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgZXZlbnQgdHlwZTogJHtldmVudC50eXBlfS5gKTtcblxuICAgICAgICAgICAgY29uc29sZS5sb2coYHNwZWVkOiAke3NwZWVkUmVjb3JkLmdldFNwZWVkKCkueX1weC9zYCk7XG5cbiAgICAgICAgICAgIHRoaXMuX3N0YXJ0SW5lcnRpYShzcGVlZFJlY29yZC5nZXRTcGVlZCgpKTtcblxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDlr7nmu5rliqjlhYPntKDmiafooYzmg6/mgKfliqjnlLtcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIF9zdGFydEluZXJ0aWEoc3BlZWQpe1xuXG4gICAgICAgIGxldCBfdGhpcyA9IHRoaXM7XG5cbiAgICAgICAgbGV0IHkgPSB0aGlzLl9nZXRPcmlnaW5ZKCk7XG5cbiAgICAgICAgdGhpcy50d2VlbiA9IFR3ZWVuLnRvKHtzcGVlZDogc3BlZWQueX0sIHtzcGVlZDogMH0sIDUwMCk7XG5cbiAgICAgICAgdGhpcy50d2Vlbi5vblVwZGF0ZShmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuc3BlZWQpO1xuXG4gICAgICAgICAgICBfdGhpcy5fc2Nyb2xsWShfdGhpcy5fZ2V0T3JpZ2luWSgpICsgLXRoaXMuc3BlZWQqX3RoaXMudHdlZW4uZnBzLzEwMDAqMC41KTtcblxuXG4gICAgICAgIH0pLm9uQ29tcGxldGUoZnVuY3Rpb24gKCkge1xuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLnR3ZWVuLnN0YXJ0KCk7XG4gICAgfVxuXG4gICAgX3N0b3BJbmVydGlhKCl7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDorqHnrpflvZPliY3lkb3kuK3nmoTliJfooajpoblcbiAgICAgKiDor7TmmI7vvJrku6Xlj6/op4bljLrln5/nmoTkuIvovrnmoYbkuLrnlYwsIOWRveS4reeahOmAiemhuemrmOWHuuiHqui6q+S4gOWNiu+8jOS+v+inhuS4uuWRveS4rVxuICAgICAqIOWPluWAvOiMg+WbtO+8miBzdGFydDogMCwgZW5kOiBpdGVtcy5sZW5ndGgtMVxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgX2dldEN1cnJlbnRJbmRleCgpOm51bWJlcntcblxuICAgICAgICBsZXQgeTpudW1iZXIgPSB0aGlzLl9nZXRPcmlnaW5ZKCkgLSB0aGlzLmRlZmF1bHRzLml0ZW1IZWlnaHQ7XG5cbiAgICAgICAgbGV0IGluZGV4Om51bWJlciA9IE1hdGgucm91bmQoeS90aGlzLmRlZmF1bHRzLml0ZW1IZWlnaHQpO1xuXG4gICAgICAgIC8vY29uc29sZS5sb2coeSV0aGlzLmRlZmF1bHRzLml0ZW1IZWlnaHQpO1xuXG4gICAgICAgIHJldHVybiAtKGluZGV4ICsgMSk7XG5cbiAgICB9XG5cbiAgICBfc2Nyb2xsWSh5OiBudW1iZXIgPSAwKXtcblxuICAgICAgICBpZih5ID4gdGhpcy5kZWZhdWx0cy5tYXhUb3AgLSB0aGlzLmRlZmF1bHRzLm9mZnNldEhlaWdodCl7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZih5IDwgdGhpcy5kZWZhdWx0cy5taW5Ub3AgLSB0aGlzLmRlZmF1bHRzLm9mZnNldEhlaWdodCl7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnNjcm9sbExpc3QuY3NzKHtcbiAgICAgICAgICAgIHRyYW5zZm9ybSAgICAgIDogYHRyYW5zbGF0ZTNkKDAsICR7IHkgKyB0aGlzLmRlZmF1bHRzLm9mZnNldEhlaWdodH1weCwgMClgLFxuICAgICAgICAgICAgd2Via2l0VHJhbnNmb3JtOiBgdHJhbnNsYXRlM2QoMCwgJHsgeSArIHRoaXMuZGVmYXVsdHMub2Zmc2V0SGVpZ2h0fXB4LCAwKWBcbiAgICAgICAgfSk7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDojrflj5blhYPntKDlt7Lnu4/mu5rliqjnmoTkvY3nva5cbiAgICAgKiBAcmV0dXJuIHsqfVxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgX2dldE9yaWdpblkoKTpudW1iZXJ7XG5cbiAgICAgICAgLy8g6YCa6L+H5q2j5YiZ5bCGc3R5bGXlsZ7mgKfph4zpnaLnmoR0cmFuc2Zvcm0zZOeahHnovbTlgLzmj5Dlj5blh7rmnaXjgILkvovlpoLvvJp0cmFuc2xhdGUzZCgwcHgsIDUwcHgsIDBweClcbiAgICAgICAgbGV0IHk6bnVtYmVyID0gL1xcKC4rLFxccz8oWy4wLTktXSspKHB4fHJlbSk/LFxccyo/Wy4wLTktXSsocHh8cmVtKT9cXCkvLmV4ZWModGhpcy5zY3JvbGxMaXN0LmNzcyhcInRyYW5zZm9ybVwiKSlbMV07XG4gICAgICAgIHkgPSBwYXJzZUZsb2F0KHkpO1xuXG4gICAgICAgIHJldHVybiB5ID8geSAtIHRoaXMuZGVmYXVsdHMub2Zmc2V0SGVpZ2h0IDogbnVsbDtcbiAgICB9XG5cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9EYXRlUGlja2VyL3Njcm9sbC5qcyIsImV4cG9ydCBkZWZhdWx0IFwiXFxuPGRpdiBjbGFzcz1cXFwiZmYtcGlja2VyIGZmLWRhdGUtcGlja2VyXFxcIj5cXG5cXG4gICAgPGRpdiBjbGFzcz1cXFwiZmYtcGlja2VyLW1hc2tcXFwiPjwvZGl2PlxcblxcbiAgICA8ZGl2IGNsYXNzPVxcXCJmZi1waWNrZXItZGlhbG9nXFxcIj5cXG5cXG4gICAgICAgIDwhLS0gaGVhZGVyIC0tPlxcbiAgICAgICAgPGRpdiBjbGFzcz1cXFwiZmYtcGlja2VyLWhlYWRcXFwiPlxcblxcbiAgICAgICAgICAgIDxhIGNsYXNzPVxcXCJmZi1waWNrZXItYWN0aW9uXFxcIiBkYXRhLWFjdGlvbj1cXFwiY2FuY2VsXFxcIiBocmVmPVxcXCJcXFwiPuWPlua2iDwvYT5cXG5cXG4gICAgICAgICAgICA8YSBjbGFzcz1cXFwiZmYtcGlja2VyLWFjdGlvblxcXCIgZGF0YS1hY3Rpb249XFxcInNlbGVjdFxcXCIgaHJlZj1cXFwiXFxcIj7noa7lrpo8L2E+XFxuXFxuICAgICAgICA8L2Rpdj5cXG5cXG4gICAgICAgIDwhLS0gYm9keSAtLT5cXG4gICAgICAgIDxkaXYgY2xhc3M9XFxcImZmLXBpY2tlci1ib2R5XFxcIj5cXG5cXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJmZi1waWNrZXItZ3JvdXAgZmYtcGlja2VyLXNjcm9sbFxcXCIgZGF0YS12YWx1ZT1cXFwiXFxcIj5cXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwiZmYtcGlja2VyLWxpc3RcXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwiZmYtcGlja2VyLWl0ZW1cXFwiIGRhdGEtdmFsdWU9XFxcIjIwMTJcXFwiPjIwMTLlubQ8L2Rpdj5cXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcImZmLXBpY2tlci1pdGVtXFxcIiBkYXRhLXZhbHVlPVxcXCIyMDEzXFxcIj4yMDEz5bm0PC9kaXY+XFxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJmZi1waWNrZXItaXRlbVxcXCIgZGF0YS12YWx1ZT1cXFwiMjAxNFxcXCI+MjAxNOW5tDwvZGl2PlxcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwiZmYtcGlja2VyLWl0ZW1cXFwiIGRhdGEtdmFsdWU9XFxcIjIwMTVcXFwiPjIwMTXlubQ8L2Rpdj5cXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcImZmLXBpY2tlci1pdGVtXFxcIiBkYXRhLXZhbHVlPVxcXCIyMDE2XFxcIj4yMDE25bm0PC9kaXY+XFxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJmZi1waWNrZXItaXRlbVxcXCIgZGF0YS12YWx1ZT1cXFwiMjAxN1xcXCI+MjAxN+W5tDwvZGl2PlxcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwiZmYtcGlja2VyLWl0ZW1cXFwiIGRhdGEtdmFsdWU9XFxcIjIwMThcXFwiPjIwMTjlubQ8L2Rpdj5cXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcImZmLXBpY2tlci1pdGVtXFxcIiBkYXRhLXZhbHVlPVxcXCIyMDE5XFxcIj4yMDE55bm0PC9kaXY+XFxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJmZi1waWNrZXItaXRlbVxcXCIgZGF0YS12YWx1ZT1cXFwiMjAyMFxcXCI+MjAyMOW5tDwvZGl2PlxcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwiZmYtcGlja2VyLWl0ZW1cXFwiIGRhdGEtdmFsdWU9XFxcIjIwMjFcXFwiPjIwMjHlubQ8L2Rpdj5cXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcImZmLXBpY2tlci1pdGVtXFxcIiBkYXRhLXZhbHVlPVxcXCIyMDEyXFxcIj4yMDEy5bm0PC9kaXY+XFxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJmZi1waWNrZXItaXRlbVxcXCIgZGF0YS12YWx1ZT1cXFwiMjAxM1xcXCI+MjAxM+W5tDwvZGl2PlxcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwiZmYtcGlja2VyLWl0ZW1cXFwiIGRhdGEtdmFsdWU9XFxcIjIwMTRcXFwiPjIwMTTlubQ8L2Rpdj5cXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcImZmLXBpY2tlci1pdGVtXFxcIiBkYXRhLXZhbHVlPVxcXCIyMDE1XFxcIj4yMDE15bm0PC9kaXY+XFxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJmZi1waWNrZXItaXRlbVxcXCIgZGF0YS12YWx1ZT1cXFwiMjAxNlxcXCI+MjAxNuW5tDwvZGl2PlxcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwiZmYtcGlja2VyLWl0ZW1cXFwiIGRhdGEtdmFsdWU9XFxcIjIwMTdcXFwiPjIwMTflubQ8L2Rpdj5cXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcImZmLXBpY2tlci1pdGVtXFxcIiBkYXRhLXZhbHVlPVxcXCIyMDE4XFxcIj4yMDE45bm0PC9kaXY+XFxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJmZi1waWNrZXItaXRlbVxcXCIgZGF0YS12YWx1ZT1cXFwiMjAxOVxcXCI+MjAxOeW5tDwvZGl2PlxcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwiZmYtcGlja2VyLWl0ZW1cXFwiIGRhdGEtdmFsdWU9XFxcIjIwMjBcXFwiPjIwMjDlubQ8L2Rpdj5cXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcImZmLXBpY2tlci1pdGVtXFxcIiBkYXRhLXZhbHVlPVxcXCIyMDIxXFxcIj4yMDIx5bm0PC9kaXY+XFxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJmZi1waWNrZXItaXRlbVxcXCIgZGF0YS12YWx1ZT1cXFwiMjAxMlxcXCI+MjAxMuW5tDwvZGl2PlxcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwiZmYtcGlja2VyLWl0ZW1cXFwiIGRhdGEtdmFsdWU9XFxcIjIwMTNcXFwiPjIwMTPlubQ8L2Rpdj5cXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcImZmLXBpY2tlci1pdGVtXFxcIiBkYXRhLXZhbHVlPVxcXCIyMDE0XFxcIj4yMDE05bm0PC9kaXY+XFxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJmZi1waWNrZXItaXRlbVxcXCIgZGF0YS12YWx1ZT1cXFwiMjAxNVxcXCI+MjAxNeW5tDwvZGl2PlxcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwiZmYtcGlja2VyLWl0ZW1cXFwiIGRhdGEtdmFsdWU9XFxcIjIwMTZcXFwiPjIwMTblubQ8L2Rpdj5cXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcImZmLXBpY2tlci1pdGVtXFxcIiBkYXRhLXZhbHVlPVxcXCIyMDE3XFxcIj4yMDE35bm0PC9kaXY+XFxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJmZi1waWNrZXItaXRlbVxcXCIgZGF0YS12YWx1ZT1cXFwiMjAxOFxcXCI+MjAxOOW5tDwvZGl2PlxcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwiZmYtcGlja2VyLWl0ZW1cXFwiIGRhdGEtdmFsdWU9XFxcIjIwMTlcXFwiPjIwMTnlubQ8L2Rpdj5cXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcImZmLXBpY2tlci1pdGVtXFxcIiBkYXRhLXZhbHVlPVxcXCIyMDIwXFxcIj4yMDIw5bm0PC9kaXY+XFxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJmZi1waWNrZXItaXRlbVxcXCIgZGF0YS12YWx1ZT1cXFwiMjAyMVxcXCI+MjAyMeW5tDwvZGl2PlxcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwiZmYtcGlja2VyLWl0ZW1cXFwiIGRhdGEtdmFsdWU9XFxcIjIwMTJcXFwiPjIwMTLlubQ8L2Rpdj5cXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcImZmLXBpY2tlci1pdGVtXFxcIiBkYXRhLXZhbHVlPVxcXCIyMDEzXFxcIj4yMDEz5bm0PC9kaXY+XFxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJmZi1waWNrZXItaXRlbVxcXCIgZGF0YS12YWx1ZT1cXFwiMjAxNFxcXCI+MjAxNOW5tDwvZGl2PlxcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwiZmYtcGlja2VyLWl0ZW1cXFwiIGRhdGEtdmFsdWU9XFxcIjIwMTVcXFwiPjIwMTXlubQ8L2Rpdj5cXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcImZmLXBpY2tlci1pdGVtXFxcIiBkYXRhLXZhbHVlPVxcXCIyMDE2XFxcIj4yMDE25bm0PC9kaXY+XFxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJmZi1waWNrZXItaXRlbVxcXCIgZGF0YS12YWx1ZT1cXFwiMjAxN1xcXCI+MjAxN+W5tDwvZGl2PlxcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwiZmYtcGlja2VyLWl0ZW1cXFwiIGRhdGEtdmFsdWU9XFxcIjIwMThcXFwiPjIwMTjlubQ8L2Rpdj5cXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcImZmLXBpY2tlci1pdGVtXFxcIiBkYXRhLXZhbHVlPVxcXCIyMDE5XFxcIj4yMDE55bm0PC9kaXY+XFxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJmZi1waWNrZXItaXRlbVxcXCIgZGF0YS12YWx1ZT1cXFwiMjAyMFxcXCI+MjAyMOW5tDwvZGl2PlxcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwiZmYtcGlja2VyLWl0ZW1cXFwiIGRhdGEtdmFsdWU9XFxcIjIwMjFcXFwiPjIwMjHlubQ8L2Rpdj5cXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcImZmLXBpY2tlci1pdGVtXFxcIiBkYXRhLXZhbHVlPVxcXCIyMDEyXFxcIj4yMDEy5bm0PC9kaXY+XFxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJmZi1waWNrZXItaXRlbVxcXCIgZGF0YS12YWx1ZT1cXFwiMjAxM1xcXCI+MjAxM+W5tDwvZGl2PlxcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwiZmYtcGlja2VyLWl0ZW1cXFwiIGRhdGEtdmFsdWU9XFxcIjIwMTRcXFwiPjIwMTTlubQ8L2Rpdj5cXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcImZmLXBpY2tlci1pdGVtXFxcIiBkYXRhLXZhbHVlPVxcXCIyMDE1XFxcIj4yMDE15bm0PC9kaXY+XFxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJmZi1waWNrZXItaXRlbVxcXCIgZGF0YS12YWx1ZT1cXFwiMjAxNlxcXCI+MjAxNuW5tDwvZGl2PlxcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwiZmYtcGlja2VyLWl0ZW1cXFwiIGRhdGEtdmFsdWU9XFxcIjIwMTdcXFwiPjIwMTflubQ8L2Rpdj5cXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcImZmLXBpY2tlci1pdGVtXFxcIiBkYXRhLXZhbHVlPVxcXCIyMDE4XFxcIj4yMDE45bm0PC9kaXY+XFxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJmZi1waWNrZXItaXRlbVxcXCIgZGF0YS12YWx1ZT1cXFwiMjAxOVxcXCI+MjAxOeW5tDwvZGl2PlxcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwiZmYtcGlja2VyLWl0ZW1cXFwiIGRhdGEtdmFsdWU9XFxcIjIwMjBcXFwiPjIwMjDlubQ8L2Rpdj5cXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcImZmLXBpY2tlci1pdGVtXFxcIiBkYXRhLXZhbHVlPVxcXCIyMDIxXFxcIj4yMDIx5bm0PC9kaXY+XFxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJmZi1waWNrZXItaXRlbVxcXCIgZGF0YS12YWx1ZT1cXFwiMjAxMlxcXCI+MjAxMuW5tDwvZGl2PlxcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwiZmYtcGlja2VyLWl0ZW1cXFwiIGRhdGEtdmFsdWU9XFxcIjIwMTNcXFwiPjIwMTPlubQ8L2Rpdj5cXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcImZmLXBpY2tlci1pdGVtXFxcIiBkYXRhLXZhbHVlPVxcXCIyMDE0XFxcIj4yMDE05bm0PC9kaXY+XFxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJmZi1waWNrZXItaXRlbVxcXCIgZGF0YS12YWx1ZT1cXFwiMjAxNVxcXCI+MjAxNeW5tDwvZGl2PlxcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwiZmYtcGlja2VyLWl0ZW1cXFwiIGRhdGEtdmFsdWU9XFxcIjIwMTZcXFwiPjIwMTblubQ8L2Rpdj5cXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcImZmLXBpY2tlci1pdGVtXFxcIiBkYXRhLXZhbHVlPVxcXCIyMDE3XFxcIj4yMDE35bm0PC9kaXY+XFxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJmZi1waWNrZXItaXRlbVxcXCIgZGF0YS12YWx1ZT1cXFwiMjAxOFxcXCI+MjAxOOW5tDwvZGl2PlxcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwiZmYtcGlja2VyLWl0ZW1cXFwiIGRhdGEtdmFsdWU9XFxcIjIwMTlcXFwiPjIwMTnlubQ8L2Rpdj5cXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcImZmLXBpY2tlci1pdGVtXFxcIiBkYXRhLXZhbHVlPVxcXCIyMDIwXFxcIj4yMDIw5bm0PC9kaXY+XFxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJmZi1waWNrZXItaXRlbVxcXCIgZGF0YS12YWx1ZT1cXFwiMjAyMVxcXCI+MjAyMeW5tDwvZGl2PlxcblxcbiAgICAgICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgICA8L2Rpdj5cXG5cXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJmZi1waWNrZXItZ3JvdXAgZmYtcGlja2VyLXNjcm9sbFxcXCI+XFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcImZmLXBpY2tlci1tYXNrXFxcIj48L2Rpdj5cXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwiZmYtcGlja2VyLWFyZWFcXFwiPjwvZGl2PlxcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJmZi1waWNrZXItbGlzdFxcXCI+XFxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJmZi1waWNrZXItaXRlbVxcXCI+N+aciDwvZGl2PlxcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwiZmYtcGlja2VyLWl0ZW1cXFwiPjjmnIg8L2Rpdj5cXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcImZmLXBpY2tlci1pdGVtXFxcIj455pyIPC9kaXY+XFxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJmZi1waWNrZXItaXRlbVxcXCI+MTHmnIg8L2Rpdj5cXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcImZmLXBpY2tlci1pdGVtXFxcIj4xMuaciDwvZGl2PlxcbiAgICAgICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgICA8L2Rpdj5cXG5cXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJmZi1waWNrZXItZ3JvdXAgZmYtcGlja2VyLXNjcm9sbFxcXCI+XFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcImZmLXBpY2tlci1tYXNrXFxcIj48L2Rpdj5cXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwiZmYtcGlja2VyLWFyZWFcXFwiPjwvZGl2PlxcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJmZi1waWNrZXItbGlzdFxcXCI+XFxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJmZi1waWNrZXItaXRlbVxcXCI+MjTml6U8L2Rpdj5cXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcImZmLXBpY2tlci1pdGVtXFxcIj4yNeaXpTwvZGl2PlxcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwiZmYtcGlja2VyLWl0ZW1cXFwiPjI25pelPC9kaXY+XFxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJmZi1waWNrZXItaXRlbVxcXCI+Mjfml6U8L2Rpdj5cXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcImZmLXBpY2tlci1pdGVtXFxcIj4yOOaXpTwvZGl2PlxcbiAgICAgICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgICA8L2Rpdj5cXG5cXG5cXG4gICAgICAgIDwvZGl2PlxcblxcbiAgICA8L2Rpdj5cXG5cXG48L2Rpdj5cIjtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvRGF0ZVBpY2tlci9kYXRlUGlja2VyLmh0bWwiLCIvLyBzdHlsZS1sb2FkZXI6IEFkZHMgc29tZSBjc3MgdG8gdGhlIERPTSBieSBhZGRpbmcgYSA8c3R5bGU+IHRhZ1xuXG4vLyBsb2FkIHRoZSBzdHlsZXNcbnZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanMhLi9kYXRlUGlja2VyLnNjc3NcIik7XG5pZih0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcbi8vIGFkZCB0aGUgc3R5bGVzIHRvIHRoZSBET01cbnZhciB1cGRhdGUgPSByZXF1aXJlKFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvYWRkU3R5bGVzLmpzXCIpKGNvbnRlbnQsIHt9KTtcbmlmKGNvbnRlbnQubG9jYWxzKSBtb2R1bGUuZXhwb3J0cyA9IGNvbnRlbnQubG9jYWxzO1xuLy8gSG90IE1vZHVsZSBSZXBsYWNlbWVudFxuaWYobW9kdWxlLmhvdCkge1xuXHQvLyBXaGVuIHRoZSBzdHlsZXMgY2hhbmdlLCB1cGRhdGUgdGhlIDxzdHlsZT4gdGFnc1xuXHRpZighY29udGVudC5sb2NhbHMpIHtcblx0XHRtb2R1bGUuaG90LmFjY2VwdChcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanMhLi9kYXRlUGlja2VyLnNjc3NcIiwgZnVuY3Rpb24oKSB7XG5cdFx0XHR2YXIgbmV3Q29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4vZGF0ZVBpY2tlci5zY3NzXCIpO1xuXHRcdFx0aWYodHlwZW9mIG5ld0NvbnRlbnQgPT09ICdzdHJpbmcnKSBuZXdDb250ZW50ID0gW1ttb2R1bGUuaWQsIG5ld0NvbnRlbnQsICcnXV07XG5cdFx0XHR1cGRhdGUobmV3Q29udGVudCk7XG5cdFx0fSk7XG5cdH1cblx0Ly8gV2hlbiB0aGUgbW9kdWxlIGlzIGRpc3Bvc2VkLCByZW1vdmUgdGhlIDxzdHlsZT4gdGFnc1xuXHRtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24oKSB7IHVwZGF0ZSgpOyB9KTtcbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvRGF0ZVBpY2tlci9kYXRlUGlja2VyLnNjc3MiLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXCIpKCk7XG4vLyBpbXBvcnRzXG5cblxuLy8gbW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCJAY2hhcnNldCBcXFwiVVRGLThcXFwiO1xcbi8qKlxcbiAqIOaWh+acrOa6ouWHuumakOiXj1xcbiAqL1xcbi8qKlxcbiAqIOaMiemSrui+ueahhua4hemZpFxcbiAqL1xcbi8qKlxcbiAqIOa1ruWKqOa4heeQhlxcbiAqL1xcbi8qKlxcbiAqIOiDjOaZr+WbvueJh+iuvue9rlxcbiAqL1xcbi8q56iL5bqP5Li76Imy6LCDKi9cXG4vKiovXFxuI19fYnNfbm90aWZ5X18ge1xcbiAgZm9udC1zaXplOiAxNnB4OyB9XFxuXFxuYm9keSB7XFxuICAtd2Via2l0LXRhcC1oaWdobGlnaHQtY29sb3I6IHRyYW5zcGFyZW50O1xcbiAgLXdlYmtpdC10ZXh0LXNpemUtYWRqdXN0OiBub25lO1xcbiAgLXdlYmtpdC1iYWNrZmFjZS12aXNpYmlsaXR5OiBoaWRkZW47XFxuICAtd2Via2l0LWZvbnQtc21vb3RoaW5nOiBhbnRpYWxpYXNlZDtcXG4gIGZvbnQ6IDEycHgvMS41IGFyaWFsLCBcXFwiXFxcXDVGQUVcXFxcOEY2RlxcXFw5NkM1XFxcXDlFRDFcXFwiOyB9XFxuXFxuYSB7XFxuICBjb2xvcjogaW5oZXJpdDtcXG4gIHRleHQtZGVjb3JhdGlvbjogbm9uZTsgfVxcblxcbmxpIHtcXG4gIGxpc3Qtc3R5bGU6IG5vbmU7IH1cXG5cXG4uY2xlYXJmaXg6YmVmb3JlLCAuY2xlYXJmaXg6YWZ0ZXIge1xcbiAgY29udGVudDogXFxcIiBcXFwiO1xcbiAgZGlzcGxheTogYmxvY2s7XFxuICBjbGVhcjogYm90aDsgfVxcblxcbi50ZXh0LWNlbnRlciB7XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7IH1cXG5cXG4udGV4dC1ib2xkIHtcXG4gIGZvbnQtd2VpZ2h0OiBib2xkZXI7IH1cXG5cXG5odG1sLCBib2R5IHtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgaGVpZ2h0OiAxMDAlOyB9XFxuXFxuLmZmLWRhdGUtcGlja2VyIHtcXG4gIHBvc2l0aW9uOiBmaXhlZDtcXG4gIHRvcDogMDtcXG4gIGxlZnQ6IDA7XFxuICB3aWR0aDogMTAwJTtcXG4gIGhlaWdodDogMTAwJTsgfVxcbiAgLmZmLXBpY2tlci1tYXNrIHtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICB0b3A6IDA7XFxuICAgIGxlZnQ6IDA7XFxuICAgIHdpZHRoOiAxMDAlO1xcbiAgICBoZWlnaHQ6IDEwMCU7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCwgMCwgMCwgMC42KTtcXG4gICAgei1pbmRleDogLTE7IH1cXG4gIC5mZi1waWNrZXItZGlhbG9nIHtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICBsZWZ0OiAwO1xcbiAgICBib3R0b206IDA7XFxuICAgIHdpZHRoOiAxMDAlO1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmOyB9XFxuICAuZmYtcGlja2VyLWhlYWQge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBwYWRkaW5nOiAuMTVyZW07XFxuICAgIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjZjVmNWY1OyB9XFxuICAgIC5mZi1waWNrZXItaGVhZCAuZmYtcGlja2VyLWFjdGlvbiB7XFxuICAgICAgZmxleDogMTtcXG4gICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7IH1cXG4gICAgICAuZmYtcGlja2VyLWhlYWQgLmZmLXBpY2tlci1hY3Rpb246Zmlyc3QtY2hpbGQge1xcbiAgICAgICAgYm9yZGVyLXJpZ2h0OiAxcHggc29saWQgI2Y1ZjVmNTsgfVxcbiAgLmZmLXBpY2tlci1ib2R5IHtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgcGFkZGluZzogLjY1cmVtIC4yNXJlbTtcXG4gICAgZm9udC1zaXplOiAuMjhyZW07XFxuICAgIHRleHQtYWxpZ246IGNlbnRlcjsgfVxcbiAgICAuZmYtcGlja2VyLWdyb3VwIHtcXG4gICAgICBmbGV4OiAxO1xcbiAgICAgIG92ZXJmbG93OiBoaWRkZW47XFxuICAgICAgcG9zaXRpb246IHJlbGF0aXZlOyB9XFxuICAgICAgLmZmLXBpY2tlci1ncm91cDpiZWZvcmUsIC5mZi1waWNrZXItZ3JvdXA6YWZ0ZXIge1xcbiAgICAgICAgY29udGVudDogXFxcIiBcXFwiO1xcbiAgICAgICAgZGlzcGxheTogYmxvY2s7XFxuICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgICAgICB0b3A6IDFyZW07XFxuICAgICAgICBsZWZ0OiAwO1xcbiAgICAgICAgd2lkdGg6IDEwMCU7XFxuICAgICAgICBoZWlnaHQ6IDFweDtcXG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6ICNlNWU1ZTU7IH1cXG4gICAgICAuZmYtcGlja2VyLWdyb3VwOmFmdGVyIHtcXG4gICAgICAgIHRvcDogMS41cmVtOyB9XFxuICAgIC5mZi1waWNrZXItYm9keSAuZmYtcGlja2VyLWxpc3QgLmZmLXBpY2tlci1pdGVtIHtcXG4gICAgICBsaW5lLWhlaWdodDogMC41cmVtO1xcbiAgICAgIGNvbG9yOiByZ2JhKDY1LCA2NSwgNjUsIDAuOCk7IH1cXG4gICAgICAuZmYtcGlja2VyLWJvZHkgLmZmLXBpY2tlci1saXN0IC5mZi1waWNrZXItaXRlbS5hY3RpdmUge1xcbiAgICAgICAgY29sb3I6ICMwMDA7IH1cXG5cIiwgXCJcIl0pO1xuXG4vLyBleHBvcnRzXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyIS4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanMhLi9zcmMvRGF0ZVBpY2tlci9kYXRlUGlja2VyLnNjc3Ncbi8vIG1vZHVsZSBpZCA9IDlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLypcblx0TUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcblx0QXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuKi9cbi8vIGNzcyBiYXNlIGNvZGUsIGluamVjdGVkIGJ5IHRoZSBjc3MtbG9hZGVyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCkge1xuXHR2YXIgbGlzdCA9IFtdO1xuXG5cdC8vIHJldHVybiB0aGUgbGlzdCBvZiBtb2R1bGVzIGFzIGNzcyBzdHJpbmdcblx0bGlzdC50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuXHRcdHZhciByZXN1bHQgPSBbXTtcblx0XHRmb3IodmFyIGkgPSAwOyBpIDwgdGhpcy5sZW5ndGg7IGkrKykge1xuXHRcdFx0dmFyIGl0ZW0gPSB0aGlzW2ldO1xuXHRcdFx0aWYoaXRlbVsyXSkge1xuXHRcdFx0XHRyZXN1bHQucHVzaChcIkBtZWRpYSBcIiArIGl0ZW1bMl0gKyBcIntcIiArIGl0ZW1bMV0gKyBcIn1cIik7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRyZXN1bHQucHVzaChpdGVtWzFdKTtcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIHJlc3VsdC5qb2luKFwiXCIpO1xuXHR9O1xuXG5cdC8vIGltcG9ydCBhIGxpc3Qgb2YgbW9kdWxlcyBpbnRvIHRoZSBsaXN0XG5cdGxpc3QuaSA9IGZ1bmN0aW9uKG1vZHVsZXMsIG1lZGlhUXVlcnkpIHtcblx0XHRpZih0eXBlb2YgbW9kdWxlcyA9PT0gXCJzdHJpbmdcIilcblx0XHRcdG1vZHVsZXMgPSBbW251bGwsIG1vZHVsZXMsIFwiXCJdXTtcblx0XHR2YXIgYWxyZWFkeUltcG9ydGVkTW9kdWxlcyA9IHt9O1xuXHRcdGZvcih2YXIgaSA9IDA7IGkgPCB0aGlzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHR2YXIgaWQgPSB0aGlzW2ldWzBdO1xuXHRcdFx0aWYodHlwZW9mIGlkID09PSBcIm51bWJlclwiKVxuXHRcdFx0XHRhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2lkXSA9IHRydWU7XG5cdFx0fVxuXHRcdGZvcihpID0gMDsgaSA8IG1vZHVsZXMubGVuZ3RoOyBpKyspIHtcblx0XHRcdHZhciBpdGVtID0gbW9kdWxlc1tpXTtcblx0XHRcdC8vIHNraXAgYWxyZWFkeSBpbXBvcnRlZCBtb2R1bGVcblx0XHRcdC8vIHRoaXMgaW1wbGVtZW50YXRpb24gaXMgbm90IDEwMCUgcGVyZmVjdCBmb3Igd2VpcmQgbWVkaWEgcXVlcnkgY29tYmluYXRpb25zXG5cdFx0XHQvLyAgd2hlbiBhIG1vZHVsZSBpcyBpbXBvcnRlZCBtdWx0aXBsZSB0aW1lcyB3aXRoIGRpZmZlcmVudCBtZWRpYSBxdWVyaWVzLlxuXHRcdFx0Ly8gIEkgaG9wZSB0aGlzIHdpbGwgbmV2ZXIgb2NjdXIgKEhleSB0aGlzIHdheSB3ZSBoYXZlIHNtYWxsZXIgYnVuZGxlcylcblx0XHRcdGlmKHR5cGVvZiBpdGVtWzBdICE9PSBcIm51bWJlclwiIHx8ICFhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2l0ZW1bMF1dKSB7XG5cdFx0XHRcdGlmKG1lZGlhUXVlcnkgJiYgIWl0ZW1bMl0pIHtcblx0XHRcdFx0XHRpdGVtWzJdID0gbWVkaWFRdWVyeTtcblx0XHRcdFx0fSBlbHNlIGlmKG1lZGlhUXVlcnkpIHtcblx0XHRcdFx0XHRpdGVtWzJdID0gXCIoXCIgKyBpdGVtWzJdICsgXCIpIGFuZCAoXCIgKyBtZWRpYVF1ZXJ5ICsgXCIpXCI7XG5cdFx0XHRcdH1cblx0XHRcdFx0bGlzdC5wdXNoKGl0ZW0pO1xuXHRcdFx0fVxuXHRcdH1cblx0fTtcblx0cmV0dXJuIGxpc3Q7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcbi8vIG1vZHVsZSBpZCA9IDEwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qXG5cdE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG5cdEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiovXG52YXIgc3R5bGVzSW5Eb20gPSB7fSxcblx0bWVtb2l6ZSA9IGZ1bmN0aW9uKGZuKSB7XG5cdFx0dmFyIG1lbW87XG5cdFx0cmV0dXJuIGZ1bmN0aW9uICgpIHtcblx0XHRcdGlmICh0eXBlb2YgbWVtbyA9PT0gXCJ1bmRlZmluZWRcIikgbWVtbyA9IGZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG5cdFx0XHRyZXR1cm4gbWVtbztcblx0XHR9O1xuXHR9LFxuXHRpc09sZElFID0gbWVtb2l6ZShmdW5jdGlvbigpIHtcblx0XHRyZXR1cm4gL21zaWUgWzYtOV1cXGIvLnRlc3Qoc2VsZi5uYXZpZ2F0b3IudXNlckFnZW50LnRvTG93ZXJDYXNlKCkpO1xuXHR9KSxcblx0Z2V0SGVhZEVsZW1lbnQgPSBtZW1vaXplKGZ1bmN0aW9uICgpIHtcblx0XHRyZXR1cm4gZG9jdW1lbnQuaGVhZCB8fCBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcImhlYWRcIilbMF07XG5cdH0pLFxuXHRzaW5nbGV0b25FbGVtZW50ID0gbnVsbCxcblx0c2luZ2xldG9uQ291bnRlciA9IDAsXG5cdHN0eWxlRWxlbWVudHNJbnNlcnRlZEF0VG9wID0gW107XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24obGlzdCwgb3B0aW9ucykge1xuXHRpZih0eXBlb2YgREVCVUcgIT09IFwidW5kZWZpbmVkXCIgJiYgREVCVUcpIHtcblx0XHRpZih0eXBlb2YgZG9jdW1lbnQgIT09IFwib2JqZWN0XCIpIHRocm93IG5ldyBFcnJvcihcIlRoZSBzdHlsZS1sb2FkZXIgY2Fubm90IGJlIHVzZWQgaW4gYSBub24tYnJvd3NlciBlbnZpcm9ubWVudFwiKTtcblx0fVxuXG5cdG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuXHQvLyBGb3JjZSBzaW5nbGUtdGFnIHNvbHV0aW9uIG9uIElFNi05LCB3aGljaCBoYXMgYSBoYXJkIGxpbWl0IG9uIHRoZSAjIG9mIDxzdHlsZT5cblx0Ly8gdGFncyBpdCB3aWxsIGFsbG93IG9uIGEgcGFnZVxuXHRpZiAodHlwZW9mIG9wdGlvbnMuc2luZ2xldG9uID09PSBcInVuZGVmaW5lZFwiKSBvcHRpb25zLnNpbmdsZXRvbiA9IGlzT2xkSUUoKTtcblxuXHQvLyBCeSBkZWZhdWx0LCBhZGQgPHN0eWxlPiB0YWdzIHRvIHRoZSBib3R0b20gb2YgPGhlYWQ+LlxuXHRpZiAodHlwZW9mIG9wdGlvbnMuaW5zZXJ0QXQgPT09IFwidW5kZWZpbmVkXCIpIG9wdGlvbnMuaW5zZXJ0QXQgPSBcImJvdHRvbVwiO1xuXG5cdHZhciBzdHlsZXMgPSBsaXN0VG9TdHlsZXMobGlzdCk7XG5cdGFkZFN0eWxlc1RvRG9tKHN0eWxlcywgb3B0aW9ucyk7XG5cblx0cmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZShuZXdMaXN0KSB7XG5cdFx0dmFyIG1heVJlbW92ZSA9IFtdO1xuXHRcdGZvcih2YXIgaSA9IDA7IGkgPCBzdHlsZXMubGVuZ3RoOyBpKyspIHtcblx0XHRcdHZhciBpdGVtID0gc3R5bGVzW2ldO1xuXHRcdFx0dmFyIGRvbVN0eWxlID0gc3R5bGVzSW5Eb21baXRlbS5pZF07XG5cdFx0XHRkb21TdHlsZS5yZWZzLS07XG5cdFx0XHRtYXlSZW1vdmUucHVzaChkb21TdHlsZSk7XG5cdFx0fVxuXHRcdGlmKG5ld0xpc3QpIHtcblx0XHRcdHZhciBuZXdTdHlsZXMgPSBsaXN0VG9TdHlsZXMobmV3TGlzdCk7XG5cdFx0XHRhZGRTdHlsZXNUb0RvbShuZXdTdHlsZXMsIG9wdGlvbnMpO1xuXHRcdH1cblx0XHRmb3IodmFyIGkgPSAwOyBpIDwgbWF5UmVtb3ZlLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHR2YXIgZG9tU3R5bGUgPSBtYXlSZW1vdmVbaV07XG5cdFx0XHRpZihkb21TdHlsZS5yZWZzID09PSAwKSB7XG5cdFx0XHRcdGZvcih2YXIgaiA9IDA7IGogPCBkb21TdHlsZS5wYXJ0cy5sZW5ndGg7IGorKylcblx0XHRcdFx0XHRkb21TdHlsZS5wYXJ0c1tqXSgpO1xuXHRcdFx0XHRkZWxldGUgc3R5bGVzSW5Eb21bZG9tU3R5bGUuaWRdO1xuXHRcdFx0fVxuXHRcdH1cblx0fTtcbn1cblxuZnVuY3Rpb24gYWRkU3R5bGVzVG9Eb20oc3R5bGVzLCBvcHRpb25zKSB7XG5cdGZvcih2YXIgaSA9IDA7IGkgPCBzdHlsZXMubGVuZ3RoOyBpKyspIHtcblx0XHR2YXIgaXRlbSA9IHN0eWxlc1tpXTtcblx0XHR2YXIgZG9tU3R5bGUgPSBzdHlsZXNJbkRvbVtpdGVtLmlkXTtcblx0XHRpZihkb21TdHlsZSkge1xuXHRcdFx0ZG9tU3R5bGUucmVmcysrO1xuXHRcdFx0Zm9yKHZhciBqID0gMDsgaiA8IGRvbVN0eWxlLnBhcnRzLmxlbmd0aDsgaisrKSB7XG5cdFx0XHRcdGRvbVN0eWxlLnBhcnRzW2pdKGl0ZW0ucGFydHNbal0pO1xuXHRcdFx0fVxuXHRcdFx0Zm9yKDsgaiA8IGl0ZW0ucGFydHMubGVuZ3RoOyBqKyspIHtcblx0XHRcdFx0ZG9tU3R5bGUucGFydHMucHVzaChhZGRTdHlsZShpdGVtLnBhcnRzW2pdLCBvcHRpb25zKSk7XG5cdFx0XHR9XG5cdFx0fSBlbHNlIHtcblx0XHRcdHZhciBwYXJ0cyA9IFtdO1xuXHRcdFx0Zm9yKHZhciBqID0gMDsgaiA8IGl0ZW0ucGFydHMubGVuZ3RoOyBqKyspIHtcblx0XHRcdFx0cGFydHMucHVzaChhZGRTdHlsZShpdGVtLnBhcnRzW2pdLCBvcHRpb25zKSk7XG5cdFx0XHR9XG5cdFx0XHRzdHlsZXNJbkRvbVtpdGVtLmlkXSA9IHtpZDogaXRlbS5pZCwgcmVmczogMSwgcGFydHM6IHBhcnRzfTtcblx0XHR9XG5cdH1cbn1cblxuZnVuY3Rpb24gbGlzdFRvU3R5bGVzKGxpc3QpIHtcblx0dmFyIHN0eWxlcyA9IFtdO1xuXHR2YXIgbmV3U3R5bGVzID0ge307XG5cdGZvcih2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG5cdFx0dmFyIGl0ZW0gPSBsaXN0W2ldO1xuXHRcdHZhciBpZCA9IGl0ZW1bMF07XG5cdFx0dmFyIGNzcyA9IGl0ZW1bMV07XG5cdFx0dmFyIG1lZGlhID0gaXRlbVsyXTtcblx0XHR2YXIgc291cmNlTWFwID0gaXRlbVszXTtcblx0XHR2YXIgcGFydCA9IHtjc3M6IGNzcywgbWVkaWE6IG1lZGlhLCBzb3VyY2VNYXA6IHNvdXJjZU1hcH07XG5cdFx0aWYoIW5ld1N0eWxlc1tpZF0pXG5cdFx0XHRzdHlsZXMucHVzaChuZXdTdHlsZXNbaWRdID0ge2lkOiBpZCwgcGFydHM6IFtwYXJ0XX0pO1xuXHRcdGVsc2Vcblx0XHRcdG5ld1N0eWxlc1tpZF0ucGFydHMucHVzaChwYXJ0KTtcblx0fVxuXHRyZXR1cm4gc3R5bGVzO1xufVxuXG5mdW5jdGlvbiBpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucywgc3R5bGVFbGVtZW50KSB7XG5cdHZhciBoZWFkID0gZ2V0SGVhZEVsZW1lbnQoKTtcblx0dmFyIGxhc3RTdHlsZUVsZW1lbnRJbnNlcnRlZEF0VG9wID0gc3R5bGVFbGVtZW50c0luc2VydGVkQXRUb3Bbc3R5bGVFbGVtZW50c0luc2VydGVkQXRUb3AubGVuZ3RoIC0gMV07XG5cdGlmIChvcHRpb25zLmluc2VydEF0ID09PSBcInRvcFwiKSB7XG5cdFx0aWYoIWxhc3RTdHlsZUVsZW1lbnRJbnNlcnRlZEF0VG9wKSB7XG5cdFx0XHRoZWFkLmluc2VydEJlZm9yZShzdHlsZUVsZW1lbnQsIGhlYWQuZmlyc3RDaGlsZCk7XG5cdFx0fSBlbHNlIGlmKGxhc3RTdHlsZUVsZW1lbnRJbnNlcnRlZEF0VG9wLm5leHRTaWJsaW5nKSB7XG5cdFx0XHRoZWFkLmluc2VydEJlZm9yZShzdHlsZUVsZW1lbnQsIGxhc3RTdHlsZUVsZW1lbnRJbnNlcnRlZEF0VG9wLm5leHRTaWJsaW5nKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0aGVhZC5hcHBlbmRDaGlsZChzdHlsZUVsZW1lbnQpO1xuXHRcdH1cblx0XHRzdHlsZUVsZW1lbnRzSW5zZXJ0ZWRBdFRvcC5wdXNoKHN0eWxlRWxlbWVudCk7XG5cdH0gZWxzZSBpZiAob3B0aW9ucy5pbnNlcnRBdCA9PT0gXCJib3R0b21cIikge1xuXHRcdGhlYWQuYXBwZW5kQ2hpbGQoc3R5bGVFbGVtZW50KTtcblx0fSBlbHNlIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoXCJJbnZhbGlkIHZhbHVlIGZvciBwYXJhbWV0ZXIgJ2luc2VydEF0Jy4gTXVzdCBiZSAndG9wJyBvciAnYm90dG9tJy5cIik7XG5cdH1cbn1cblxuZnVuY3Rpb24gcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCkge1xuXHRzdHlsZUVsZW1lbnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQpO1xuXHR2YXIgaWR4ID0gc3R5bGVFbGVtZW50c0luc2VydGVkQXRUb3AuaW5kZXhPZihzdHlsZUVsZW1lbnQpO1xuXHRpZihpZHggPj0gMCkge1xuXHRcdHN0eWxlRWxlbWVudHNJbnNlcnRlZEF0VG9wLnNwbGljZShpZHgsIDEpO1xuXHR9XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZVN0eWxlRWxlbWVudChvcHRpb25zKSB7XG5cdHZhciBzdHlsZUVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XG5cdHN0eWxlRWxlbWVudC50eXBlID0gXCJ0ZXh0L2Nzc1wiO1xuXHRpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucywgc3R5bGVFbGVtZW50KTtcblx0cmV0dXJuIHN0eWxlRWxlbWVudDtcbn1cblxuZnVuY3Rpb24gY3JlYXRlTGlua0VsZW1lbnQob3B0aW9ucykge1xuXHR2YXIgbGlua0VsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlua1wiKTtcblx0bGlua0VsZW1lbnQucmVsID0gXCJzdHlsZXNoZWV0XCI7XG5cdGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zLCBsaW5rRWxlbWVudCk7XG5cdHJldHVybiBsaW5rRWxlbWVudDtcbn1cblxuZnVuY3Rpb24gYWRkU3R5bGUob2JqLCBvcHRpb25zKSB7XG5cdHZhciBzdHlsZUVsZW1lbnQsIHVwZGF0ZSwgcmVtb3ZlO1xuXG5cdGlmIChvcHRpb25zLnNpbmdsZXRvbikge1xuXHRcdHZhciBzdHlsZUluZGV4ID0gc2luZ2xldG9uQ291bnRlcisrO1xuXHRcdHN0eWxlRWxlbWVudCA9IHNpbmdsZXRvbkVsZW1lbnQgfHwgKHNpbmdsZXRvbkVsZW1lbnQgPSBjcmVhdGVTdHlsZUVsZW1lbnQob3B0aW9ucykpO1xuXHRcdHVwZGF0ZSA9IGFwcGx5VG9TaW5nbGV0b25UYWcuYmluZChudWxsLCBzdHlsZUVsZW1lbnQsIHN0eWxlSW5kZXgsIGZhbHNlKTtcblx0XHRyZW1vdmUgPSBhcHBseVRvU2luZ2xldG9uVGFnLmJpbmQobnVsbCwgc3R5bGVFbGVtZW50LCBzdHlsZUluZGV4LCB0cnVlKTtcblx0fSBlbHNlIGlmKG9iai5zb3VyY2VNYXAgJiZcblx0XHR0eXBlb2YgVVJMID09PSBcImZ1bmN0aW9uXCIgJiZcblx0XHR0eXBlb2YgVVJMLmNyZWF0ZU9iamVjdFVSTCA9PT0gXCJmdW5jdGlvblwiICYmXG5cdFx0dHlwZW9mIFVSTC5yZXZva2VPYmplY3RVUkwgPT09IFwiZnVuY3Rpb25cIiAmJlxuXHRcdHR5cGVvZiBCbG9iID09PSBcImZ1bmN0aW9uXCIgJiZcblx0XHR0eXBlb2YgYnRvYSA9PT0gXCJmdW5jdGlvblwiKSB7XG5cdFx0c3R5bGVFbGVtZW50ID0gY3JlYXRlTGlua0VsZW1lbnQob3B0aW9ucyk7XG5cdFx0dXBkYXRlID0gdXBkYXRlTGluay5iaW5kKG51bGwsIHN0eWxlRWxlbWVudCk7XG5cdFx0cmVtb3ZlID0gZnVuY3Rpb24oKSB7XG5cdFx0XHRyZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KTtcblx0XHRcdGlmKHN0eWxlRWxlbWVudC5ocmVmKVxuXHRcdFx0XHRVUkwucmV2b2tlT2JqZWN0VVJMKHN0eWxlRWxlbWVudC5ocmVmKTtcblx0XHR9O1xuXHR9IGVsc2Uge1xuXHRcdHN0eWxlRWxlbWVudCA9IGNyZWF0ZVN0eWxlRWxlbWVudChvcHRpb25zKTtcblx0XHR1cGRhdGUgPSBhcHBseVRvVGFnLmJpbmQobnVsbCwgc3R5bGVFbGVtZW50KTtcblx0XHRyZW1vdmUgPSBmdW5jdGlvbigpIHtcblx0XHRcdHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpO1xuXHRcdH07XG5cdH1cblxuXHR1cGRhdGUob2JqKTtcblxuXHRyZXR1cm4gZnVuY3Rpb24gdXBkYXRlU3R5bGUobmV3T2JqKSB7XG5cdFx0aWYobmV3T2JqKSB7XG5cdFx0XHRpZihuZXdPYmouY3NzID09PSBvYmouY3NzICYmIG5ld09iai5tZWRpYSA9PT0gb2JqLm1lZGlhICYmIG5ld09iai5zb3VyY2VNYXAgPT09IG9iai5zb3VyY2VNYXApXG5cdFx0XHRcdHJldHVybjtcblx0XHRcdHVwZGF0ZShvYmogPSBuZXdPYmopO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRyZW1vdmUoKTtcblx0XHR9XG5cdH07XG59XG5cbnZhciByZXBsYWNlVGV4dCA9IChmdW5jdGlvbiAoKSB7XG5cdHZhciB0ZXh0U3RvcmUgPSBbXTtcblxuXHRyZXR1cm4gZnVuY3Rpb24gKGluZGV4LCByZXBsYWNlbWVudCkge1xuXHRcdHRleHRTdG9yZVtpbmRleF0gPSByZXBsYWNlbWVudDtcblx0XHRyZXR1cm4gdGV4dFN0b3JlLmZpbHRlcihCb29sZWFuKS5qb2luKCdcXG4nKTtcblx0fTtcbn0pKCk7XG5cbmZ1bmN0aW9uIGFwcGx5VG9TaW5nbGV0b25UYWcoc3R5bGVFbGVtZW50LCBpbmRleCwgcmVtb3ZlLCBvYmopIHtcblx0dmFyIGNzcyA9IHJlbW92ZSA/IFwiXCIgOiBvYmouY3NzO1xuXG5cdGlmIChzdHlsZUVsZW1lbnQuc3R5bGVTaGVldCkge1xuXHRcdHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0LmNzc1RleHQgPSByZXBsYWNlVGV4dChpbmRleCwgY3NzKTtcblx0fSBlbHNlIHtcblx0XHR2YXIgY3NzTm9kZSA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcyk7XG5cdFx0dmFyIGNoaWxkTm9kZXMgPSBzdHlsZUVsZW1lbnQuY2hpbGROb2Rlcztcblx0XHRpZiAoY2hpbGROb2Rlc1tpbmRleF0pIHN0eWxlRWxlbWVudC5yZW1vdmVDaGlsZChjaGlsZE5vZGVzW2luZGV4XSk7XG5cdFx0aWYgKGNoaWxkTm9kZXMubGVuZ3RoKSB7XG5cdFx0XHRzdHlsZUVsZW1lbnQuaW5zZXJ0QmVmb3JlKGNzc05vZGUsIGNoaWxkTm9kZXNbaW5kZXhdKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0c3R5bGVFbGVtZW50LmFwcGVuZENoaWxkKGNzc05vZGUpO1xuXHRcdH1cblx0fVxufVxuXG5mdW5jdGlvbiBhcHBseVRvVGFnKHN0eWxlRWxlbWVudCwgb2JqKSB7XG5cdHZhciBjc3MgPSBvYmouY3NzO1xuXHR2YXIgbWVkaWEgPSBvYmoubWVkaWE7XG5cblx0aWYobWVkaWEpIHtcblx0XHRzdHlsZUVsZW1lbnQuc2V0QXR0cmlidXRlKFwibWVkaWFcIiwgbWVkaWEpXG5cdH1cblxuXHRpZihzdHlsZUVsZW1lbnQuc3R5bGVTaGVldCkge1xuXHRcdHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3M7XG5cdH0gZWxzZSB7XG5cdFx0d2hpbGUoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpIHtcblx0XHRcdHN0eWxlRWxlbWVudC5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCk7XG5cdFx0fVxuXHRcdHN0eWxlRWxlbWVudC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpKTtcblx0fVxufVxuXG5mdW5jdGlvbiB1cGRhdGVMaW5rKGxpbmtFbGVtZW50LCBvYmopIHtcblx0dmFyIGNzcyA9IG9iai5jc3M7XG5cdHZhciBzb3VyY2VNYXAgPSBvYmouc291cmNlTWFwO1xuXG5cdGlmKHNvdXJjZU1hcCkge1xuXHRcdC8vIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9hLzI2NjAzODc1XG5cdFx0Y3NzICs9IFwiXFxuLyojIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxcIiArIGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSkgKyBcIiAqL1wiO1xuXHR9XG5cblx0dmFyIGJsb2IgPSBuZXcgQmxvYihbY3NzXSwgeyB0eXBlOiBcInRleHQvY3NzXCIgfSk7XG5cblx0dmFyIG9sZFNyYyA9IGxpbmtFbGVtZW50LmhyZWY7XG5cblx0bGlua0VsZW1lbnQuaHJlZiA9IFVSTC5jcmVhdGVPYmplY3RVUkwoYmxvYik7XG5cblx0aWYob2xkU3JjKVxuXHRcdFVSTC5yZXZva2VPYmplY3RVUkwob2xkU3JjKTtcbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9hZGRTdHlsZXMuanNcbi8vIG1vZHVsZSBpZCA9IDExXG4vLyBtb2R1bGUgY2h1bmtzID0gMCJdLCJzb3VyY2VSb290IjoiIn0=