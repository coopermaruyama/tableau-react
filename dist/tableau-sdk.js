'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var tableauSoftware = {};
/*! tableau-2.9.1 */

/*! BEGIN MscorlibSlim */

////////////////////////////////////////////////////////////////////////////////
// Globals and assembly registration
////////////////////////////////////////////////////////////////////////////////

var global = {};

(function (global) {
  'use strict';

  var ss = { __assemblies: {} };

  ss.initAssembly = function (obj, name, res) {
    res = res || {};
    obj.name = name;
    obj.toString = function () {
      return this.name;
    };
    obj.__types = {};
    obj.getResourceNames = function () {
      return Object.keys(res);
    };
    obj.getResourceDataBase64 = function (name) {
      return res[name] || null;
    };
    obj.getResourceData = function (name) {
      var r = res[name];return r ? ss.dec64(r) : null;
    };
    ss.__assemblies[name] = obj;
  };
  ss.initAssembly(ss, 'mscorlib');

  ////////////////////////////////////////////////////////////////////////////////
  // Utility methods (generated via Script.IsNull, etc.)
  ////////////////////////////////////////////////////////////////////////////////


  ss.getAssemblies = function () {
    return Object.keys(ss.__assemblies).map(function (n) {
      return ss.__assemblies[n];
    });
  };

  ss.isNullOrUndefined = function (o) {
    return o === null || o === undefined;
  };

  ss.isValue = function (o) {
    return o !== null && o !== undefined;
  };

  ss.referenceEquals = function (a, b) {
    return ss.isValue(a) ? a === b : !ss.isValue(b);
  };

  ss.mkdict = function () {
    var a = arguments.length !== 1 ? arguments : arguments[0];
    var r = {};
    for (var i = 0; i < a.length; i += 2) {
      r[a[i]] = a[i + 1];
    }
    return r;
  };

  ss.clone = function (t, o) {
    return o ? t.$clone(o) : o;
  };

  ss.coalesce = function (a, b) {
    return ss.isValue(a) ? a : b;
  };

  ss.isDate = function (obj) {
    return Object.prototype.toString.call(obj) === '[object Date]';
  };

  ss.isArray = function (obj) {
    return Object.prototype.toString.call(obj) === '[object Array]';
  };

  ss.isTypedArrayType = function (type) {
    return ['Float32Array', 'Float64Array', 'Int8Array', 'Int16Array', 'Int32Array', 'Uint8Array', 'Uint16Array', 'Uint32Array', 'Uint8ClampedArray'].indexOf(ss.getTypeFullName(type)) >= 0;
  };

  ss.isArrayOrTypedArray = function (obj) {
    return ss.isArray(obj) || ss.isTypedArrayType(ss.getInstanceType(obj));
  };

  ss.equals = function (a, b) {
    if (!ss.isValue(a)) throw new ss_NullReferenceException('Object is null');else if (a !== ss && typeof a.equals === 'function') return a.equals(b);
    if (ss.isDate(a) && ss.isDate(b)) return a.valueOf() === b.valueOf();else if (typeof a === 'function' && typeof b === 'function') return ss.delegateEquals(a, b);else if (ss.isNullOrUndefined(a) && ss.isNullOrUndefined(b)) return true;else return a === b;
  };

  ss.compare = function (a, b) {
    if (!ss.isValue(a)) throw new ss_NullReferenceException('Object is null');else if (typeof a === 'number' || typeof a === 'string' || typeof a === 'boolean') return ss.isValue(b) ? a < b ? -1 : a > b ? 1 : 0 : 1;else if (ss.isDate(a)) return ss.isValue(b) ? ss.compare(a.valueOf(), b.valueOf()) : 1;else return a.compareTo(b);
  };

  ss.equalsT = function (a, b) {
    if (!ss.isValue(a)) throw new ss_NullReferenceException('Object is null');else if (typeof a === 'number' || typeof a === 'string' || typeof a === 'boolean') return a === b;else if (ss.isDate(a)) return a.valueOf() === b.valueOf();else return a.equalsT(b);
  };

  ss.staticEquals = function (a, b) {
    if (!ss.isValue(a)) return !ss.isValue(b);else return ss.isValue(b) ? ss.equals(a, b) : false;
  };

  ss.shallowCopy = function () {
    try {
      var x = Object.getOwnPropertyDescriptor({ a: 0 }, 'a').value;return true;
    } catch (ex) {
      return false;
    }
  }() ? function (source, target) {
    var keys = Object.keys(source);
    for (var i = 0, l = keys.length; i < l; i++) {
      Object.defineProperty(target, keys[i], Object.getOwnPropertyDescriptor(source, keys[i]));
    }
  } : function (source, target) {
    var keys = Object.keys(source);
    for (var i = 0, l = keys.length; i < l; i++) {
      target[keys[i]] = source[keys[i]];
    }
  };

  if ((typeof window === 'undefined' ? 'undefined' : _typeof(window)) == 'object') {
    // Browser-specific stuff that could go into the Web assembly, but that assembly does not have an associated JS file.
    if (!window.Element) {
      // IE does not have an Element constructor. This implementation should make casting to elements work.
      window.Element = function () {};
      window.Element.isInstanceOfType = function (instance) {
        return instance && typeof instance.constructor === 'undefined' && typeof instance.tagName === 'string';
      };
    }
    window.Element.__typeName = 'Element';

    ss.parseXml = function (markup) {
      var domParser = new DOMParser();
      return domParser.parseFromString(markup, 'text/xml');
    };
  }

  ///////////////////////////////////////////////////////////////////////////////
  // Object Extensions

  ss.clearKeys = function (d) {
    for (var n in d) {
      if (d.hasOwnProperty(n)) delete d[n];
    }
  };

  ss.keyExists = function (d, key) {
    return d[key] !== undefined;
  };

  if (!Object.keys) {
    Object.keys = function () {
      'use strict';

      var hasOwnProperty = Object.prototype.hasOwnProperty,
          hasDontEnumBug = !{ toString: null }.propertyIsEnumerable('toString'),
          dontEnums = ['toString', 'toLocaleString', 'valueOf', 'hasOwnProperty', 'isPrototypeOf', 'propertyIsEnumerable', 'constructor'],
          dontEnumsLength = dontEnums.length;

      return function (obj) {
        if ((typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) !== 'object' && (typeof obj !== 'function' || obj === null)) {
          throw new TypeError('Object.keys called on non-object');
        }

        var result = [],
            prop,
            i;

        for (prop in obj) {
          if (hasOwnProperty.call(obj, prop)) {
            result.push(prop);
          }
        }

        if (hasDontEnumBug) {
          for (i = 0; i < dontEnumsLength; i++) {
            if (hasOwnProperty.call(obj, dontEnums[i])) {
              result.push(dontEnums[i]);
            }
          }
        }
        return result;
      };
    }();
  }

  ss.getKeyCount = function (d) {
    return Object.keys(d).length;
  };

  ////////////////////////////////////////////////////////////////////////////////
  // Type System Implementation
  ////////////////////////////////////////////////////////////////////////////////

  // When FULL_TYPE_SYSTEM is not defined, then the code is not the full-blown
  // type system. It's Just enough to allow us to call base class methods.

  ss.__genericCache = {};

  ss._makeGenericTypeName = function (genericType, typeArguments) {
    var result = ss.getTypeFullName(genericType);
    for (var i = 0; i < typeArguments.length; i++) {
      result += (i === 0 ? '[' : ',') + '[' + ss.getTypeFullName(typeArguments[i]) + ']';
    }result += ']';
    return result;
  };

  ss.makeGenericType = function (genericType, typeArguments) {
    var name = ss._makeGenericTypeName(genericType, typeArguments);
    return ss.__genericCache[ss._makeQName(name, genericType.__assembly)] || genericType.apply(null, typeArguments);
  };

  ss._registerGenericInstance = function (genericType, typeArguments, instance, members, statics, init) {
    if (!instance) {
      instance = function instance() {};
    }
    var name = ss._makeGenericTypeName(genericType, typeArguments);
    ss.__genericCache[ss._makeQName(name, genericType.__assembly)] = instance;
    instance.__typeName = name;
    instance.__assembly = genericType.__assembly;
    instance.__genericTypeDefinition = genericType;
    instance.__typeArguments = typeArguments;
    if (statics) {
      ss.shallowCopy(statics, instance);
    }
    init(instance);
    if (members) {
      ss.shallowCopy(members, instance.prototype);
    }
    return instance;
  };

  ss.registerGenericClassInstance = function (genericType, typeArguments, instance, members, statics, baseType, getInterfaceTypesFunc) {
    return ss._registerGenericInstance(genericType, typeArguments, instance, members, statics, function (inst) {
      ss.initClass(inst, baseType ? baseType() : null, getInterfaceTypesFunc ? getInterfaceTypesFunc() : null);
    });
  };

  ss.registerGenericStructInstance = function (genericType, typeArguments, instance, members, statics, getInterfaceTypesFunc) {
    return ss._registerGenericInstance(genericType, typeArguments, instance, members, statics, function (inst) {
      ss.initStruct(inst, getInterfaceTypesFunc ? getInterfaceTypesFunc() : null);
    });
  };

  ss.registerGenericInterfaceInstance = function (genericType, typeArguments, members, getBaseInterfacesFunc) {
    return ss._registerGenericInstance(genericType, typeArguments, null, members, null, function (instance) {
      ss.initInterface(instance, members, getBaseInterfacesFunc ? getBaseInterfacesFunc() : null);
    });
  };

  ss.isGenericTypeDefinition = function (type) {
    return type.__isGenericTypeDefinition || false;
  };

  ss.getGenericTypeDefinition = function (type) {
    return type.__genericTypeDefinition || null;
  };

  ss.getGenericParameterCount = function (type) {
    return type.__typeArgumentCount || 0;
  };

  ss.getGenericArguments = function (type) {
    return type.__typeArguments || null;
  };

  ss.__anonymousCache = {};
  ss.anonymousType = function () {
    var members = Array.prototype.slice.call(arguments);
    var name = 'Anonymous<' + members.map(function (m) {
      return m[1] + ':' + ss.getTypeFullName(m[0]);
    }).join(',') + '>';
    var type = ss.__anonymousCache[name];
    if (!type) {
      type = new Function(members.map(function (m) {
        return m[1];
      }).join(','), members.map(function (m) {
        return 'this.' + m[1] + '=' + m[1] + ';';
      }).join(''));
      type.__typeName = name;
      var infos = members.map(function (m) {
        return {
          name: m[1],
          typeDef: type,
          type: 16,
          returnType: m[0],
          getter: { name: 'get_' + m[1], typeDef: type, params: [], returnType: m[0], fget: m[1] }
        };
      });
      infos.push({ name: '.ctor', typeDef: type, type: 1, params: members.map(function (m) {
          return m[0];
        }) });
      type.__metadata = { members: infos };
      ss.__anonymousCache[name] = type;
    }
    return type;
  };

  ss.setMetadata = function (type, metadata) {
    if (metadata.members) {
      for (var i = 0; i < metadata.members.length; i++) {
        var m = metadata.members[i];
        m.typeDef = type;
        if (m.adder) m.adder.typeDef = type;
        if (m.remover) m.remover.typeDef = type;
        if (m.getter) m.getter.typeDef = type;
        if (m.setter) m.setter.typeDef = type;
      }
    }
    type.__metadata = metadata;
    if (metadata.variance) {
      type.isAssignableFrom = function (source) {
        var check = function check(target, type) {
          if (type.__genericTypeDefinition === target.__genericTypeDefinition && type.__typeArguments.length === target.__typeArguments.length) {
            for (var i = 0; i < target.__typeArguments.length; i++) {
              var v = target.__metadata.variance[i],
                  t = target.__typeArguments[i],
                  s = type.__typeArguments[i];
              switch (v) {
                case 1:
                  if (!ss.isAssignableFrom(t, s)) return false;break;
                case 2:
                  if (!ss.isAssignableFrom(s, t)) return false;break;
                default:
                  if (s !== t) return false;
              }
            }
            return true;
          }
          return false;
        };

        if (source.__interface && check(this, source)) return true;
        var ifs = ss.getInterfaces(source);
        for (var i = 0; i < ifs.length; i++) {
          if (ifs[i] === this || check(this, ifs[i])) return true;
        }
        return false;
      };
    }
  };
  ss.setMetadata = function (type, metadata) {};

  ss.mkType = function (asm, typeName, ctor, members, statics) {
    if (!ctor) ctor = function ctor() {};
    ctor.__assembly = asm;
    ctor.__typeName = typeName;
    if (asm) asm.__types[typeName] = ctor;
    if (members) ctor.__members = members;
    if (statics) ss.shallowCopy(statics, ctor);
    return ctor;
  };

  ss.mkEnum = function (asm, typeName, values, namedValues) {
    var result = ss.mkType(asm, typeName);
    ss.shallowCopy(values, result.prototype);
    result.__enum = true;
    result.getDefaultValue = result.createInstance = function () {
      return namedValues ? null : 0;
    };
    result.isInstanceOfType = function (instance) {
      return (typeof instance === 'undefined' ? 'undefined' : _typeof(instance)) === (namedValues ? 'string' : 'number');
    };
    return result;
  };

  ss.initClass = function (ctor, baseType, interfaces) {
    ctor.__class = true;
    if (baseType && baseType !== Object) {
      var f = function f() {};
      f.prototype = baseType.prototype;
      ctor.prototype = new f();
      ctor.prototype.constructor = ctor;
    }
    if (ctor.__members) {
      ss.shallowCopy(ctor.__members, ctor.prototype);
      delete ctor.__members;
    }
    if (interfaces) ctor.__interfaces = interfaces;
  };

  ss.initStruct = function (ctor, interfaces) {
    ss.initClass(ctor, null, interfaces);
    ctor.__class = false;
    ctor.getDefaultValue = ctor.getDefaultValue || ctor.createInstance || function () {
      return new ctor();
    };
  };

  ss.initGenericClass = function (ctor, typeArgumentCount) {
    ctor.__class = true;
    ctor.__typeArgumentCount = typeArgumentCount;
    ctor.__isGenericTypeDefinition = true;
  };

  ss.initGenericStruct = function (ctor, typeArgumentCount) {
    ss.initGenericClass(ctor, typeArgumentCount);
    ctor.__class = false;
  };

  ss.initInterface = function (ctor, members, baseInterfaces) {
    ctor.__interface = true;
    if (baseInterfaces) {
      ctor.__interfaces = baseInterfaces;
    }
    ss.shallowCopy(members, ctor.prototype);
    ctor.isAssignableFrom = function (type) {
      return ss.contains(ss.getInterfaces(type), this);
    };
  };

  ss.initGenericInterface = function (ctor, typeArgumentCount) {
    ctor.__interface = true;
    ctor.__typeArgumentCount = typeArgumentCount;
    ctor.__isGenericTypeDefinition = true;
  };

  ss.getBaseType = function (type) {
    if (type === Object || type.__interface) {
      return null;
    } else if (Object.getPrototypeOf) {
      return Object.getPrototypeOf(type.prototype).constructor;
    } else {
      var p = type.prototype;
      if (Object.prototype.hasOwnProperty.call(p, 'constructor')) {
        var ownValue = p.constructor;
        try {
          delete p.constructor;
          return p.constructor;
        } finally {
          p.constructor = ownValue;
        }
      }
      return p.constructor;
    }
  };

  ss.getTypeFullName = function (type) {
    return type.__typeName || type.name || (type.toString().match(/^\s*function\s*([^\s(]+)/) || [])[1] || 'Object';
  };

  ss._makeQName = function (name, asm) {
    return name + (asm ? ', ' + asm.name : '');
  };

  ss.getTypeQName = function (type) {
    return ss._makeQName(ss.getTypeFullName(type), type.__assembly);
  };

  ss.getTypeName = function (type) {
    var fullName = ss.getTypeFullName(type);
    var bIndex = fullName.indexOf('[');
    var nsIndex = fullName.lastIndexOf('.', bIndex >= 0 ? bIndex : fullName.length);
    return nsIndex > 0 ? fullName.substr(nsIndex + 1) : fullName;
  };

  ss.getTypeNamespace = function (type) {
    var fullName = ss.getTypeFullName(type);
    var bIndex = fullName.indexOf('[');
    var nsIndex = fullName.lastIndexOf('.', bIndex >= 0 ? bIndex : fullName.length);
    return nsIndex > 0 ? fullName.substr(0, nsIndex) : '';
  };

  ss.getTypeAssembly = function (type) {
    if (ss.contains([Date, Number, Boolean, String, Function, Array], type)) return ss;else return type.__assembly || null;
  };

  ss._getAssemblyType = function (asm, name) {
    if (asm.__types) {
      return asm.__types[name] || null;
    } else {
      var a = name.split('.');
      for (var i = 0; i < a.length; i++) {
        asm = asm[a[i]];
        if (!ss.isValue(asm)) return null;
      }
      if (typeof asm !== 'function') return null;
      return asm;
    }
  };

  ss.getAssemblyTypes = function (asm) {
    var result = [];
    if (asm.__types) {
      for (var t in asm.__types) {
        if (asm.__types.hasOwnProperty(t)) result.push(asm.__types[t]);
      }
    } else {
      var traverse = function traverse(s, n) {
        for (var c in s) {
          if (s.hasOwnProperty(c)) traverse(s[c], c);
        }
        if (typeof s === 'function' && ss.isUpper(n.charCodeAt(0))) result.push(s);
      };
      traverse(asm, '');
    }
    return result;
  };

  ss.createAssemblyInstance = function (asm, typeName) {
    var t = ss.getType(typeName, asm);
    return t ? ss.createInstance(t) : null;
  };

  ss.getInterfaces = function (type) {
    if (type.__interfaces) return type.__interfaces;else if (type === Date || type === Number) return [ss_IEquatable, ss_IComparable, ss_IFormattable];else if (type === Boolean || type === String) return [ss_IEquatable, ss_IComparable];else if (type === Array || ss.isTypedArrayType(type)) return [ss_IEnumerable, ss_ICollection, ss_IList, ss_IReadOnlyCollection, ss_IReadOnlyList];else return [];
  };

  ss.isInstanceOfType = function (instance, type) {
    if (ss.isNullOrUndefined(instance)) return false;

    if (typeof type.isInstanceOfType === 'function') return type.isInstanceOfType(instance);

    return ss.isAssignableFrom(type, ss.getInstanceType(instance));
  };

  ss.isAssignableFrom = function (target, type) {
    return target === type || typeof target.isAssignableFrom === 'function' && target.isAssignableFrom(type) || type.prototype instanceof target;
  };

  ss.isClass = function (type) {
    return type.__class === true || type === Array || type === Function || type === RegExp || type === String || type === Error || type === Object;
  };

  ss.isEnum = function (type) {
    return !!type.__enum;
  };

  ss.isFlags = function (type) {
    return type.__metadata && type.__metadata.enumFlags || false;
  };

  ss.isInterface = function (type) {
    return !!type.__interface;
  };

  ss.safeCast = function (instance, type) {
    if (type === true) return instance;else if (type === false) return null;else return ss.isInstanceOfType(instance, type) ? instance : null;
  };

  ss.cast = function (instance, type) {
    if (instance === null || typeof instance === 'undefined') return instance;else if (type === true || type !== false && ss.isInstanceOfType(instance, type)) return instance;
    throw new ss_InvalidCastException('Cannot cast object to type ' + ss.getTypeFullName(type));
  };

  ss.getInstanceType = function (instance) {
    if (!ss.isValue(instance)) throw new ss_NullReferenceException('Cannot get type of null');

    // NOTE: We have to catch exceptions because the constructor
    //       cannot be looked up on native COM objects
    try {
      return instance.constructor;
    } catch (ex) {
      return Object;
    }
  };

  ss._getType = function (typeName, asm, re) {
    var outer = !re;
    re = re || /[[,\]]/g;
    var last = re.lastIndex,
        m = re.exec(typeName),
        tname,
        targs = [];
    var t;
    if (m) {
      tname = typeName.substring(last, m.index);
      switch (m[0]) {
        case '[':
          if (typeName[m.index + 1] !== '[') return null;
          for (;;) {
            re.exec(typeName);
            t = ss._getType(typeName, global, re);
            if (!t) return null;
            targs.push(t);
            m = re.exec(typeName);
            if (m[0] === ']') break;else if (m[0] !== ',') return null;
          }
          m = re.exec(typeName);
          if (m && m[0] === ',') {
            re.exec(typeName);
            if (!(asm = ss.__assemblies[(re.lastIndex > 0 ? typeName.substring(m.index + 1, re.lastIndex - 1) : typeName.substring(m.index + 1)).trim()])) return null;
          }
          break;

        case ']':
          break;

        case ',':
          re.exec(typeName);
          if (!(asm = ss.__assemblies[(re.lastIndex > 0 ? typeName.substring(m.index + 1, re.lastIndex - 1) : typeName.substring(m.index + 1)).trim()])) return null;
          break;
      }
    } else {
      tname = typeName.substring(last);
    }

    if (outer && re.lastIndex) return null;

    t = ss._getAssemblyType(asm, tname.trim());
    return targs.length ? ss.makeGenericType(t, targs) : t;
  };

  ss.getType = function (typeName, asm) {
    return typeName ? ss._getType(typeName, asm || global) : null;
  };

  ss.getDefaultValue = function (type) {
    if (typeof type.getDefaultValue === 'function') return type.getDefaultValue();else if (type === Boolean) return false;else if (type === Date) return new Date(0);else if (type === Number) return 0;
    return null;
  };

  ss.createInstance = function (type) {
    if (typeof type.createInstance === 'function') return type.createInstance();else if (type === Boolean) return false;else if (type === Date) return new Date(0);else if (type === Number) return 0;else if (type === String) return '';else return new type();
  };

  ///////////////////////////////////////////////////////////////////////////////
  // IFormattable

  var ss_IFormattable = ss.IFormattable = ss.mkType(ss, 'ss.IFormattable');
  ss.initInterface(ss_IFormattable, { format: null });

  ///////////////////////////////////////////////////////////////////////////////
  // IComparable

  var ss_IComparable = ss.IComparable = ss.mkType(ss, 'ss.IComparable');
  ss.initInterface(ss_IComparable, { compareTo: null });

  ///////////////////////////////////////////////////////////////////////////////
  // IEquatable

  var ss_IEquatable = ss.IEquatable = ss.mkType(ss, 'ss.IEquatable');
  ss.initInterface(ss_IEquatable, { equalsT: null });

  ///////////////////////////////////////////////////////////////////////////////
  // Number Extensions


  ///////////////////////////////////////////////////////////////////////////////
  // String Extensions


  ss.isNullOrEmptyString = function (s) {
    return !s || !s.length;
  };

  if (!String.prototype.trim) {
    String.prototype.trim = function () {
      return ss.trimStartString(ss.trimEndString(this));
    };
  }

  ss.trimEndString = function (s, chars) {
    return s.replace(chars ? new RegExp('[' + String.fromCharCode.apply(null, chars) + ']+$') : /\s*$/, '');
  };

  ss.trimStartString = function (s, chars) {
    return s.replace(chars ? new RegExp('^[' + String.fromCharCode.apply(null, chars) + ']+') : /^\s*/, '');
  };

  ss.trimString = function (s, chars) {
    return ss.trimStartString(ss.trimEndString(s, chars), chars);
  };

  ///////////////////////////////////////////////////////////////////////////////
  // Math Extensions


  ///////////////////////////////////////////////////////////////////////////////
  // IFormatProvider

  ///////////////////////////////////////////////////////////////////////////////
  // NumberFormatInfo

  ///////////////////////////////////////////////////////////////////////////////
  // DateTimeFormatInfo

  ///////////////////////////////////////////////////////////////////////////////
  // Array Extensions


  ss.arrayClone = function (arr) {
    if (arr.length === 1) {
      return [arr[0]];
    } else {
      return Array.apply(null, arr);
    }
  };

  if (!Array.prototype.map) {
    Array.prototype.map = function (callback, instance) {
      var length = this.length;
      var mapped = new Array(length);
      for (var i = 0; i < length; i++) {
        if (i in this) {
          mapped[i] = callback.call(instance, this[i], i, this);
        }
      }
      return mapped;
    };
  }

  if (!Array.prototype.some) {
    Array.prototype.some = function (callback, instance) {
      var length = this.length;
      for (var i = 0; i < length; i++) {
        if (i in this && callback.call(instance, this[i], i, this)) {
          return true;
        }
      }
      return false;
    };
  }

  // Production steps of ECMA-262, Edition 5, 15.4.4.18
  // Reference: http://es5.github.io/#x15.4.4.18
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach
  if (!Array.prototype.forEach) {
    Array.prototype.forEach = function (callback, thisArg) {
      var T, k;

      if (this == null) {
        throw new TypeError(' this is null or not defined');
      }

      // 1. Let O be the result of calling ToObject passing the |this| value as the argument.
      var O = Object(this);

      // 2. Let lenValue be the result of calling the Get internal method of O with the argument "length".
      // 3. Let len be ToUint32(lenValue).
      var len = O.length >>> 0;

      // 4. If IsCallable(callback) is false, throw a TypeError exception.
      // See: http://es5.github.com/#x9.11
      if (typeof callback !== 'function') {
        throw new TypeError(callback + ' is not a function');
      }

      // 5. If thisArg was supplied, let T be thisArg; else let T be undefined.
      if (arguments.length > 1) {
        T = thisArg;
      }

      // 6. Let k be 0
      k = 0;

      // 7. Repeat, while k < len
      while (k < len) {
        var kValue;

        // a. Let Pk be ToString(k).
        //   This is implicit for LHS operands of the in operator
        // b. Let kPresent be the result of calling the HasProperty internal method of O with argument Pk.
        //   This step can be combined with c
        // c. If kPresent is true, then
        if (k in O) {
          // i. Let kValue be the result of calling the Get internal method of O with argument Pk.
          kValue = O[k];

          // ii. Call the Call internal method of callback with T as the this value and
          // argument list containing kValue, k, and O.
          callback.call(T, kValue, k, O);
        }
        // d. Increase k by 1.
        k++;
      }
      // 8. return undefined
    };
  }

  // Production steps of ECMA-262, Edition 5
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
  if (!Array.prototype.filter) {
    Array.prototype.filter = function (fun /*, thisArg*/) {
      if (this === void 0 || this === null) {
        throw new TypeError();
      }

      var t = Object(this);
      var len = t.length >>> 0;
      if (typeof fun !== 'function') {
        throw new TypeError();
      }

      var res = [];
      var thisArg = arguments.length >= 2 ? arguments[1] : void 0;
      for (var i = 0; i < len; i++) {
        if (i in t) {
          var val = t[i];

          // NOTE: Technically this should Object.defineProperty at
          //       the next index, as push can be affected by
          //       properties on Object.prototype and Array.prototype.
          //       But that method's new, and collisions should be
          //       rare, so use the more-compatible alternative.
          if (fun.call(thisArg, val, i, t)) {
            res.push(val);
          }
        }
      }

      return res;
    };
  }

  ///////////////////////////////////////////////////////////////////////////////
  // Date Extensions


  ///////////////////////////////////////////////////////////////////////////////
  // Function Extensions

  ss._delegateContains = function (targets, object, method) {
    for (var i = 0; i < targets.length; i += 2) {
      if (targets[i] === object && targets[i + 1] === method) {
        return true;
      }
    }
    return false;
  };

  ss._mkdel = function (targets) {
    var delegate = function delegate() {
      if (targets.length === 2) {
        return targets[1].apply(targets[0], arguments);
      } else {
        var clone = ss.arrayClone(targets);
        for (var i = 0; i < clone.length; i += 2) {
          if (ss._delegateContains(targets, clone[i], clone[i + 1])) {
            clone[i + 1].apply(clone[i], arguments);
          }
        }
        return null;
      }
    };
    delegate._targets = targets;

    return delegate;
  };

  ss.mkdel = function (object, method) {
    if (!object) {
      return method;
    }
    if (typeof method === 'string') {
      method = object[method];
    }
    return ss._mkdel([object, method]);
  };

  ss.delegateCombine = function (delegate1, delegate2) {
    if (!delegate1) {
      if (!delegate2._targets) {
        return ss.mkdel(null, delegate2);
      }
      return delegate2;
    }
    if (!delegate2) {
      if (!delegate1._targets) {
        return ss.mkdel(null, delegate1);
      }
      return delegate1;
    }

    var targets1 = delegate1._targets ? delegate1._targets : [null, delegate1];
    var targets2 = delegate2._targets ? delegate2._targets : [null, delegate2];

    return ss._mkdel(targets1.concat(targets2));
  };

  ss.delegateRemove = function (delegate1, delegate2) {
    if (!delegate1 || delegate1 === delegate2) {
      return null;
    }

    var targets = delegate1._targets;
    if (!delegate2 || !targets) {
      return delegate1;
    }

    var object = null;
    var method;
    if (delegate2._targets) {
      object = delegate2._targets[0];
      method = delegate2._targets[1];
    } else {
      method = delegate2;
    }

    for (var i = 0; i < targets.length; i += 2) {
      if (targets[i] === object && targets[i + 1] === method) {
        if (targets.length === 2) {
          return null;
        }
        var t = ss.arrayClone(targets);
        t.splice(i, 2);
        return ss._mkdel(t);
      }
    }

    return delegate1;
  };

  ss.delegateEquals = function (a, b) {
    if (a === b) return true;
    if (!a._targets && !b._targets) return false;
    var ta = a._targets || [null, a],
        tb = b._targets || [null, b];
    if (ta.length !== tb.length) return false;
    for (var i = 0; i < ta.length; i++) {
      if (ta[i] !== tb[i]) return false;
    }
    return true;
  };

  ///////////////////////////////////////////////////////////////////////////////
  // RegExp Extensions


  ///////////////////////////////////////////////////////////////////////////////
  // Debug Extensions


  ///////////////////////////////////////////////////////////////////////////////
  // Enum

  var ss_Enum = ss.Enum = ss.mkType(ss, 'ss.Enum', {});
  ss.initClass(ss_Enum);

  ss_Enum.getValues = function Enum$getValues(enumType) {
    var parts = [];
    var values = enumType.prototype;
    for (var i in values) {
      if (values.hasOwnProperty(i)) parts.push(values[i]);
    }
    return parts;
  };

  ///////////////////////////////////////////////////////////////////////////////
  // CultureInfo


  ///////////////////////////////////////////////////////////////////////////////
  // IEnumerator

  var ss_IEnumerator = ss.IEnumerator = ss.mkType(ss, 'ss.IEnumerator');
  ss.initInterface(ss_IEnumerator, { current: null, moveNext: null, reset: null }, [ss_IDisposable]);

  ///////////////////////////////////////////////////////////////////////////////
  // IEnumerable

  var ss_IEnumerable = ss.IEnumerable = ss.mkType(ss, 'ss.IEnumerable');
  ss.initInterface(ss_IEnumerable, { getEnumerator: null });

  ss.getEnumerator = function (obj) {
    return obj.getEnumerator ? obj.getEnumerator() : new ss_ArrayEnumerator(obj);
  };

  ///////////////////////////////////////////////////////////////////////////////
  // ICollection

  var ss_ICollection = ss.ICollection = ss.mkType(ss, 'ss.ICollection');
  ss.initInterface(ss_ICollection, { get_count: null, add: null, clear: null, remove: null, contains: null }, [ss_IEnumerable]);

  ss.count = function (obj) {
    return obj.get_count ? obj.get_count() : obj.length;
  };

  ss.add = function (obj, item) {
    if (obj.add) obj.add(item);else if (ss.isArray(obj)) obj.push(item);else throw new ss_NotSupportedException();
  };

  ss.clear = function (obj) {
    if (obj.clear) obj.clear();else if (ss.isArray(obj)) obj.length = 0;else throw new ss_NotSupportedException();
  };

  ss.remove = function (obj, item) {
    if (obj.remove) return obj.remove(item);else if (ss.isArray(obj)) {
      var index = ss.indexOf(obj, item);
      if (index >= 0) {
        obj.splice(index, 1);
        return true;
      }
      return false;
    } else throw new ss_NotSupportedException();
  };

  ss.contains = function (obj, item) {
    if (obj.contains) return obj.contains(item);else return ss.indexOf(obj, item) >= 0;
  };

  ///////////////////////////////////////////////////////////////////////////////
  // IReadOnlyCollection

  var ss_IReadOnlyCollection = ss.IReadOnlyCollection = ss.mkType(ss, 'ss.IReadOnlyCollection');
  ss.initInterface(ss_IReadOnlyCollection, { get_count: null, contains: null }, [ss_IEnumerable]);

  //#include "TimeSpan.js"

  ///////////////////////////////////////////////////////////////////////////////
  // IEqualityComparer

  var ss_IEqualityComparer = ss.IEqualityComparer = ss.mkType(ss, 'ss.IEqualityComparer');
  ss.initInterface(ss_IEqualityComparer, { areEqual: null, getObjectHashCode: null });

  ///////////////////////////////////////////////////////////////////////////////
  // IComparer

  var ss_IComparer = ss.IComparer = ss.mkType(ss, 'ss.IComparer');
  ss.initInterface(ss_IComparer, { compare: null });

  ///////////////////////////////////////////////////////////////////////////////
  // Nullable

  ss.unbox = function (instance) {
    if (!ss.isValue(instance)) throw new ss_InvalidOperationException('Nullable object must have a value.');
    return instance;
  };

  var ss_Nullable$1 = ss.Nullable$1 = ss.mkType(ss, 'ss.Nullable$1', function (T) {
    var $type = ss.registerGenericClassInstance(ss_Nullable$1, [T], null, {}, {
      isInstanceOfType: function isInstanceOfType(instance) {
        return ss.isInstanceOfType(instance, T);
      }
    });
    return $type;
  }, null, {
    eq: function eq(a, b) {
      return !ss.isValue(a) ? !ss.isValue(b) : a === b;
    },
    ne: function ne(a, b) {
      return !ss.isValue(a) ? ss.isValue(b) : a !== b;
    },
    le: function le(a, b) {
      return ss.isValue(a) && ss.isValue(b) && a <= b;
    },
    ge: function ge(a, b) {
      return ss.isValue(a) && ss.isValue(b) && a >= b;
    },
    lt: function lt(a, b) {
      return ss.isValue(a) && ss.isValue(b) && a < b;
    },
    gt: function gt(a, b) {
      return ss.isValue(a) && ss.isValue(b) && a > b;
    },
    sub: function sub(a, b) {
      return ss.isValue(a) && ss.isValue(b) ? a - b : null;
    },
    add: function add(a, b) {
      return ss.isValue(a) && ss.isValue(b) ? a + b : null;
    },
    mod: function mod(a, b) {
      return ss.isValue(a) && ss.isValue(b) ? a % b : null;
    },
    div: function div(a, b) {
      return ss.isValue(a) && ss.isValue(b) ? a / b : null;
    },
    mul: function mul(a, b) {
      return ss.isValue(a) && ss.isValue(b) ? a * b : null;
    },
    band: function band(a, b) {
      return ss.isValue(a) && ss.isValue(b) ? a & b : null;
    },
    bor: function bor(a, b) {
      return ss.isValue(a) && ss.isValue(b) ? a | b : null;
    },
    bxor: function bxor(a, b) {
      return ss.isValue(a) && ss.isValue(b) ? a ^ b : null;
    },
    shl: function shl(a, b) {
      return ss.isValue(a) && ss.isValue(b) ? a << b : null;
    },
    srs: function srs(a, b) {
      return ss.isValue(a) && ss.isValue(b) ? a >> b : null;
    },
    sru: function sru(a, b) {
      return ss.isValue(a) && ss.isValue(b) ? a >>> b : null;
    },
    and: function and(a, b) {
      if (a === true && b === true) return true;else if (a === false || b === false) return false;else return null;
    },
    or: function or(a, b) {
      if (a === true || b === true) return true;else if (a === false && b === false) return false;else return null;
    },
    xor: function xor(a, b) {
      return ss.isValue(a) && ss.isValue(b) ? !!(a ^ b) : null;
    },
    not: function not(a) {
      return ss.isValue(a) ? !a : null;
    },
    neg: function neg(a) {
      return ss.isValue(a) ? -a : null;
    },
    pos: function pos(a) {
      return ss.isValue(a) ? +a : null;
    },
    cpl: function cpl(a) {
      return ss.isValue(a) ? ~a : null;
    },
    lift1: function lift1(f, o) {
      return ss.isValue(o) ? f(o) : null;
    },
    lift2: function lift2(f, a, b) {
      return ss.isValue(a) && ss.isValue(b) ? f(a, b) : null;
    },
    liftcmp: function liftcmp(f, a, b) {
      return ss.isValue(a) && ss.isValue(b) ? f(a, b) : false;
    },
    lifteq: function lifteq(f, a, b) {
      var va = ss.isValue(a),
          vb = ss.isValue(b);
      return !va && !vb || va && vb && f(a, b);
    },
    liftne: function liftne(f, a, b) {
      var va = ss.isValue(a),
          vb = ss.isValue(b);
      return va !== vb || va && f(a, b);
    }
  });

  ss.initGenericClass(ss_Nullable$1, 1);

  ///////////////////////////////////////////////////////////////////////////////
  // IList

  var ss_IList = ss.IList = ss.mkType(ss, 'ss.IList');
  ss.initInterface(ss_IList, { get_item: null, set_item: null, indexOf: null, insert: null, removeAt: null }, [ss_ICollection, ss_IEnumerable]);

  ss.getItem = function (obj, index) {
    return obj.get_item ? obj.get_item(index) : obj[index];
  };

  ss.setItem = function (obj, index, value) {
    obj.set_item ? obj.set_item(index, value) : obj[index] = value;
  };

  ss.indexOf = function (obj, item) {
    if ((!item || typeof item.equals !== 'function') && typeof obj.indexOf === 'function') {
      // use indexOf if item is null or if item does not implement an equals function
      return obj.indexOf(item);
    } else if (ss.isArrayOrTypedArray(obj)) {
      for (var i = 0; i < obj.length; i++) {
        if (ss.staticEquals(obj[i], item)) {
          return i;
        }
      }
      return -1;
    } else return obj.indexOf(item);
  };

  ss.insert = function (obj, index, item) {
    if (obj.insert) obj.insert(index, item);else if (ss.isArray(obj)) obj.splice(index, 0, item);else throw new ss_NotSupportedException();
  };

  ss.removeAt = function (obj, index) {
    if (obj.removeAt) obj.removeAt(index);else if (ss.isArray(obj)) obj.splice(index, 1);else throw new ss_NotSupportedException();
  };

  ///////////////////////////////////////////////////////////////////////////////
  // IReadOnlyList

  var ss_IReadOnlyList = ss.IReadOnlyList = ss.mkType(ss, 'ss.IReadOnlyList');
  ss.initInterface(ss_IReadOnlyList, { get_item: null }, [ss_IReadOnlyCollection, ss_IEnumerable]);

  // #include "IDictionary.js"

  // #include "IReadOnlyDictionary.js"

  ///////////////////////////////////////////////////////////////////////////////
  // Int32

  var defInt = function defInt(name, min, max) {
    var type = ss[name] = ss.mkType(ss, 'ss.' + name, function () {}, null, {
      isInstanceOfType: function isInstanceOfType(instance) {
        return typeof instance === 'number' && Math.round(instance, 0) === instance && instance >= min && instance <= max;
      },
      createInstance: function createInstance() {
        return 0;
      }
    });
    ss.initStruct(type, [ss_IEquatable, ss_IComparable, ss_IFormattable]);
    return type;
  };

  var ss_Byte = defInt('Byte', 0, 255);
  var ss_SByte = defInt('SByte', -128, 127);
  var ss_Int16 = defInt('Int16', -32768, 32767);
  var ss_UInt16 = defInt('UInt16', 0, 65535);
  var ss_Int32 = defInt('Int32', -2147483648, 2147483647);
  var ss_UInt32 = defInt('UInt32', 0, 4294967295);
  var ss_Int64 = defInt('Int64', -9223372036854775808, 9223372036854775807);
  var ss_UInt64 = defInt('UInt64', 0, 18446744073709551615);
  var ss_Char = defInt('Char', 0, 65535);

  ss.sxb = function (x) {
    return x | (x & 0x80 ? 0xffffff00 : 0);
  };

  ss.sxs = function (x) {
    return x | (x & 0x8000 ? 0xffff0000 : 0);
  };

  ss.clip8 = function (x) {
    return ss.isValue(x) ? ss.sxb(x & 0xff) : null;
  };

  ss.clipu8 = function (x) {
    return ss.isValue(x) ? x & 0xff : null;
  };

  ss.clip16 = function (x) {
    return ss.isValue(x) ? ss.sxs(x & 0xffff) : null;
  };

  ss.clipu16 = function (x) {
    return ss.isValue(x) ? x & 0xffff : null;
  };

  ss.clip32 = function (x) {
    return ss.isValue(x) ? x | 0 : null;
  };

  ss.clipu32 = function (x) {
    return ss.isValue(x) ? x >>> 0 : null;
  };

  ss.clip64 = function (x) {
    return ss.isValue(x) ? (Math.floor(x / 0x100000000) | 0) * 0x100000000 + (x >>> 0) : null;
  };

  ss.clipu64 = function (x) {
    return ss.isValue(x) ? (Math.floor(x / 0x100000000) >>> 0) * 0x100000000 + (x >>> 0) : null;
  };

  ss.ck = function (x, tp) {
    if (ss.isValue(x) && !tp.isInstanceOfType(x)) throw new ss_OverflowException();
    return x;
  };

  ss.trunc = function (n) {
    return ss.isValue(n) ? n > 0 ? Math.floor(n) : Math.ceil(n) : null;
  };

  ss.idiv = function (a, b) {
    if (!ss.isValue(a) || !ss.isValue(b)) return null;
    if (!b) throw new ss_DivideByZeroException();
    return ss.trunc(a / b);
  };

  ss.imod = function (a, b) {
    if (!ss.isValue(a) || !ss.isValue(b)) return null;
    if (!b) throw new ss_DivideByZeroException();
    return a % b;
  };

  ///////////////////////////////////////////////////////////////////////////////
  // MutableDateTime

  var ss_JsDate = ss.JsDate = ss.mkType(ss, 'ss.JsDate', function () {}, null, {
    createInstance: function createInstance() {
      return new Date();
    },
    isInstanceOfType: function isInstanceOfType(instance) {
      return instance instanceof Date;
    }
  });

  ss.initClass(ss_JsDate, null, [ss_IEquatable, ss_IComparable]);

  ///////////////////////////////////////////////////////////////////////////////
  // ArrayEnumerator

  var ss_ArrayEnumerator = ss.ArrayEnumerator = ss.mkType(ss, 'ss.ArrayEnumerator', function (array) {
    this._array = array;
    this._index = -1;
  }, {
    moveNext: function moveNext() {
      this._index++;
      return this._index < this._array.length;
    },
    reset: function reset() {
      this._index = -1;
    },
    current: function current() {
      if (this._index < 0 || this._index >= this._array.length) throw 'Invalid operation';
      return this._array[this._index];
    },
    dispose: function dispose() {}
  });

  ss.initClass(ss_ArrayEnumerator, null, [ss_IEnumerator, ss_IDisposable]);

  ///////////////////////////////////////////////////////////////////////////////
  // ObjectEnumerator

  var ss_ObjectEnumerator = ss.ObjectEnumerator = ss.mkType(ss, 'ss.ObjectEnumerator', function (o) {
    this._keys = Object.keys(o);
    this._index = -1;
    this._object = o;
  }, {
    moveNext: function moveNext() {
      this._index++;
      return this._index < this._keys.length;
    },
    reset: function reset() {
      this._index = -1;
    },
    current: function current() {
      if (this._index < 0 || this._index >= this._keys.length) throw new ss_InvalidOperationException('Invalid operation');
      var k = this._keys[this._index];
      return { key: k, value: this._object[k] };
    },
    dispose: function dispose() {}
  });

  ss.initClass(ss_ObjectEnumerator, null, [ss_IEnumerator, ss_IDisposable]);

  ///////////////////////////////////////////////////////////////////////////////
  // EqualityComparer

  var ss_EqualityComparer = ss.EqualityComparer = ss.mkType(ss, 'ss.EqualityComparer', function () {}, {
    areEqual: function areEqual(x, y) {
      return ss.staticEquals(x, y);
    },
    getObjectHashCode: function getObjectHashCode(obj) {
      return ss.isValue(obj) ? ss.getHashCode(obj) : 0;
    }
  });

  ss.initClass(ss_EqualityComparer, null, [ss_IEqualityComparer]);
  ss_EqualityComparer.def = new ss_EqualityComparer();

  ///////////////////////////////////////////////////////////////////////////////
  // Comparer

  var ss_Comparer = ss.Comparer = ss.mkType(ss, 'ss.Comparer', function (f) {
    this.f = f;
  }, {
    compare: function compare(x, y) {
      return this.f(x, y);
    }
  });

  ss.initClass(ss_Comparer, null, [ss_IComparer]);

  ss_Comparer.def = new ss_Comparer(function (a, b) {
    if (!ss.isValue(a)) return !ss.isValue(b) ? 0 : -1;else if (!ss.isValue(b)) return 1;else return ss.compare(a, b);
  });

  ///////////////////////////////////////////////////////////////////////////////
  // KeyValuePair


  //#include "Dictionary.js"

  ///////////////////////////////////////////////////////////////////////////////
  // IDisposable

  var ss_IDisposable = ss.IDisposable = ss.mkType(ss, 'ss.IDisposable');
  ss.initInterface(ss_IDisposable, { dispose: null });

  ///////////////////////////////////////////////////////////////////////////////
  // StringBuilder

  var ss_StringBuilder = ss.StringBuilder = ss.mkType(ss, 'ss.StringBuilder', function (s) {
    this._parts = ss.isValue(s) && s !== '' ? [s] : [];
    this.length = ss.isValue(s) ? s.length : 0;
  }, {
    append: function append(o) {
      if (ss.isValue(o)) {
        var s = o.toString();
        ss.add(this._parts, s);
        this.length += s.length;
      }
      return this;
    },

    appendChar: function appendChar(c) {
      return this.append(String.fromCharCode(c));
    },

    appendLine: function appendLine(s) {
      this.append(s);
      this.append('\r\n');
      return this;
    },

    appendLineChar: function appendLineChar(c) {
      return this.appendLine(String.fromCharCode(c));
    },

    clear: function clear() {
      this._parts = [];
      this.length = 0;
    },

    toString: function toString() {
      return this._parts.join('');
    }
  });

  ss.initClass(ss_StringBuilder);

  ///////////////////////////////////////////////////////////////////////////////
  // Random


  ///////////////////////////////////////////////////////////////////////////////
  // EventArgs

  var ss_EventArgs = ss.EventArgs = ss.mkType(ss, 'ss.EventArgs', function () {});

  ss.initClass(ss_EventArgs);
  ss_EventArgs.Empty = new ss_EventArgs();

  ///////////////////////////////////////////////////////////////////////////////
  // Exception

  var ss_Exception = ss.Exception = ss.mkType(ss, 'ss.Exception', function (message, innerException) {
    this._message = message || 'An error occurred.';
    this._innerException = innerException || null;
    this._error = new Error();
  }, {
    get_message: function get_message() {
      return this._message;
    },
    get_innerException: function get_innerException() {
      return this._innerException;
    },
    get_stack: function get_stack() {
      return this._error.stack;
    },
    toString: function toString() {
      var message = this._message;
      var exception = this;
      if (ss.isNullOrEmptyString(message)) {
        if (ss.isValue(ss.getInstanceType(exception)) && ss.isValue(ss.getTypeFullName(ss.getInstanceType(exception)))) {
          message = ss.getTypeFullName(ss.getInstanceType(exception));
        } else {
          message = '[object Exception]';
        }
      }
      return message;
    }
  }, {
    wrap: function wrap(o) {
      if (ss.isInstanceOfType(o, ss_Exception)) {
        return o;
      } else if (o instanceof TypeError) {
        // TypeError can either be 'cannot read property blah of null/undefined' (proper NullReferenceException), or it can be eg. accessing a non-existent method of an object.
        // As long as all code is compiled, they should with a very high probability indicate the use of a null reference.
        return new ss_NullReferenceException(o.message, new ss_JsErrorException(o));
      } else if (o instanceof RangeError) {
        return new ss_ArgumentOutOfRangeException(null, o.message, new ss_JsErrorException(o));
      } else if (o instanceof Error) {
        return new ss_JsErrorException(o);
      } else {
        return new ss_Exception(o.toString());
      }
    }
  });

  ss.initClass(ss_Exception);

  ////////////////////////////////////////////////////////////////////////////////
  // NotImplementedException

  var ss_NotImplementedException = ss.NotImplementedException = ss.mkType(ss, 'ss.NotImplementedException', function (message, innerException) {
    ss_Exception.call(this, message || 'The method or operation is not implemented.', innerException);
  });

  ss.initClass(ss_NotImplementedException, ss_Exception);

  ////////////////////////////////////////////////////////////////////////////////
  // NotSupportedException

  var ss_NotSupportedException = ss.NotSupportedException = ss.mkType(ss, 'ss.NotSupportedException', function (message, innerException) {
    ss_Exception.call(this, message || 'Specified method is not supported.', innerException);
  });

  ss.initClass(ss_NotSupportedException, ss_Exception);

  ////////////////////////////////////////////////////////////////////////////////
  // AggregateException


  ////////////////////////////////////////////////////////////////////////////////
  // PromiseException


  ////////////////////////////////////////////////////////////////////////////////
  // JsErrorException

  var ss_JsErrorException = ss.JsErrorException = ss.mkType(ss, 'ss.JsErrorException', function (error, message, innerException) {
    ss_Exception.call(this, message || error.message, innerException);
    this.error = error;
  }, {
    get_stack: function get_stack() {
      return this.error.stack;
    }
  });

  ss.initClass(ss_JsErrorException, ss_Exception);

  ////////////////////////////////////////////////////////////////////////////////
  // ArgumentException

  var ss_ArgumentException = ss.ArgumentException = ss.mkType(ss, 'ss.ArgumentException', function (message, paramName, innerException) {
    ss_Exception.call(this, message || 'Value does not fall within the expected range.', innerException);
    this.paramName = paramName || null;
  });

  ss.initClass(ss_ArgumentException, ss_Exception);

  ////////////////////////////////////////////////////////////////////////////////
  // ArgumentNullException

  var ss_ArgumentNullException = ss.ArgumentNullException = ss.mkType(ss, 'ss.ArgumentNullException', function (paramName, message, innerException) {
    if (!message) {
      message = 'Value cannot be null.';
      if (paramName) message += '\nParameter name: ' + paramName;
    }

    ss_ArgumentException.call(this, message, paramName, innerException);
  });

  ss.initClass(ss_ArgumentNullException, ss_ArgumentException);

  ////////////////////////////////////////////////////////////////////////////////
  // ArgumentOutOfRangeException

  var ss_ArgumentOutOfRangeException = ss.ArgumentOutOfRangeException = ss.mkType(ss, 'ss.ArgumentOutOfRangeException', function (paramName, message, innerException, actualValue) {
    if (!message) {
      message = 'Value is out of range.';
      if (paramName) message += '\nParameter name: ' + paramName;
    }

    ss_ArgumentException.call(this, message, paramName, innerException);
    this.actualValue = actualValue || null;
  });

  ss.initClass(ss_ArgumentOutOfRangeException, ss_ArgumentException);

  ////////////////////////////////////////////////////////////////////////////////
  // FormatException

  var ss_FormatException = ss.FormatException = ss.mkType(ss, 'ss.FormatException', function (message, innerException) {
    ss_Exception.call(this, message || 'Invalid format.', innerException);
  });

  ss.initClass(ss_FormatException, ss_Exception);

  ////////////////////////////////////////////////////////////////////////////////
  // ArithmeticException

  var ss_ArithmeticException = ss.ArithmeticException = ss.mkType(ss, 'ss.ArithmeticException', function (message, innerException) {
    ss_Exception.call(this, message || 'Overflow or underflow in the arithmetic operation.', innerException);
  });

  ss.initClass(ss_ArithmeticException, ss_Exception);

  ////////////////////////////////////////////////////////////////////////////////
  // OverflowException

  var ss_OverflowException = ss.OverflowException = ss.mkType(ss, 'ss.OverflowException', function (message, innerException) {
    ss_ArithmeticException.call(this, message || 'Arithmetic operation resulted in an overflow.', innerException);
  });

  ss.initClass(ss_OverflowException, ss_ArithmeticException);

  ////////////////////////////////////////////////////////////////////////////////
  // DivideByZeroException

  var ss_DivideByZeroException = ss.DivideByZeroException = ss.mkType(ss, 'ss.DivideByZeroException', function (message, innerException) {
    ss_ArithmeticException.call(this, message || 'Division by 0.', innerException);
  });

  ss.initClass(ss_DivideByZeroException, ss_ArithmeticException);

  ////////////////////////////////////////////////////////////////////////////////
  // InvalidCastException

  var ss_InvalidCastException = ss.InvalidCastException = ss.mkType(ss, 'ss.InvalidCastException', function (message, innerException) {
    ss_Exception.call(this, message || 'The cast is not valid.', innerException);
  });

  ss.initClass(ss_InvalidCastException, ss_Exception);

  ////////////////////////////////////////////////////////////////////////////////
  // InvalidOperationException

  var ss_InvalidOperationException = ss.InvalidOperationException = ss.mkType(ss, 'ss.InvalidOperationException', function (message, innerException) {
    ss_Exception.call(this, message || 'Operation is not valid due to the current state of the object.', innerException);
  });
  ss.initClass(ss_InvalidOperationException, ss_Exception);

  ////////////////////////////////////////////////////////////////////////////////
  // NullReferenceException

  var ss_NullReferenceException = ss.NullReferenceException = ss.mkType(ss, 'ss.NullReferenceException', function (message, innerException) {
    ss_Exception.call(this, message || 'Object is null.', innerException);
  });

  ss.initClass(ss_NullReferenceException, ss_Exception);

  ////////////////////////////////////////////////////////////////////////////////
  // KeyNotFoundException

  var ss_KeyNotFoundException = ss.KeyNotFoundException = ss.mkType(ss, 'ss.KeyNotFoundException', function (message, innerException) {
    ss_Exception.call(this, message || 'Key not found.', innerException);
  });
  ss.initClass(ss_KeyNotFoundException, ss_Exception);

  ////////////////////////////////////////////////////////////////////////////////
  // InvalidOperationException

  var ss_AmbiguousMatchException = ss.AmbiguousMatchException = ss.mkType(ss, 'ss.AmbiguousMatchException', function (message, innerException) {
    ss_Exception.call(this, message || 'Ambiguous match.', innerException);
  });

  ss.initClass(ss_AmbiguousMatchException, ss_Exception);

  ///////////////////////////////////////////////////////////////////////////////
  // IteratorBlockEnumerable


  ///////////////////////////////////////////////////////////////////////////////
  // IteratorBlockEnumerator


  ///////////////////////////////////////////////////////////////////////////////
  // Lazy


  ///////////////////////////////////////////////////////////////////////////////
  // CancellationTokenRegistration


  ///////////////////////////////////////////////////////////////////////////////
  // CancellationTokenSource


  ///////////////////////////////////////////////////////////////////////////////
  // CancellationToken


  ////////////////////////////////////////////////////////////////////////////////
  // TaskCanceledException


  ///////////////////////////////////////////////////////////////////////////////
  // Task


  ////////////////////////////////////////////////////////////////////////////////
  // TaskStatus

  ///////////////////////////////////////////////////////////////////////////////
  // TaskCompletionSource


  ///////////////////////////////////////////////////////////////////////////////
  // CancelEventArgs


  //#include "Guid.js"

  ////////////////////////////////////////////////////////////////////////////////
  // Global Registration
  ////////////////////////////////////////////////////////////////////////////////

  global.ss = ss;
})(global);

var ss = global.ss;

/*! BEGIN CoreSlim */

(function () {
  'dont use strict';

  var $asm = {};
  global.tab = global.tab || {};
  ss.initAssembly($asm, 'tabcoreslim');
  ////////////////////////////////////////////////////////////////////////////////
  // Tableau.JavaScript.Vql.Core.BaseLogAppender
  var $tab_BaseLogAppender = global.tab.BaseLogAppender = ss.mkType($asm, 'tab.BaseLogAppender', function () {
    this.$filters = null;
    this.$filters = [];
  }, {
    clearFilters: function BaseLogAppender$ClearFilters() {
      ss.clear(this.$filters);
    },
    addFilter: function BaseLogAppender$AddFilter(f) {
      this.$filters.push(f);
    },
    removeFilter: function BaseLogAppender$RemoveFilter(f) {
      ss.remove(this.$filters, f);
    },
    log: function BaseLogAppender$Log(source, level, message, args) {
      for (var $t1 = 0; $t1 < this.$filters.length; $t1++) {
        var filter = this.$filters[$t1];
        if (!filter(source, level)) {
          continue;
        }
        this.logInternal(source, level, message, args);
        return;
      }
    },
    logInternal: null,
    formatMessage: function BaseLogAppender$FormatMessage(message, args) {
      if (ss.isNullOrUndefined(args) || args.length === 0) {
        return message;
      }
      var sb = new ss.StringBuilder();
      var argNum = 0;
      var prevPercent = false;
      for (var i = 0; i < message.length; i++) {
        var currChar = message.charCodeAt(i);
        if (currChar === 37) {
          if (prevPercent) {
            sb.append('%');
            prevPercent = false;
          } else {
            prevPercent = true;
          }
        } else {
          if (prevPercent) {
            switch (currChar) {
              case 98:
              case 115:
              case 100:
              case 110:
              case 111:
                {
                  sb.append(args.length > argNum ? args[argNum] : '');
                  argNum++;
                  break;
                }
            }
          } else {
            sb.appendChar(currChar);
          }
          prevPercent = false;
        }
      }
      return sb.toString();
    }
  });
  ////////////////////////////////////////////////////////////////////////////////
  // Tableau.JavaScript.Vql.Core.ConsoleLogAppender
  var $tab_ConsoleLogAppender = global.tab.ConsoleLogAppender = ss.mkType($asm, 'tab.ConsoleLogAppender', function () {
    this.$levelMethods = null;
    $tab_BaseLogAppender.call(this);
  }, {
    logInternal: function ConsoleLogAppender$LogInternal(source, level, message, args) {
      if (_typeof(window.console) !== 'object') {
        return;
      }
      message = source.get_name() + ': ' + message;
      var consoleArgs = [];
      var $t1 = consoleArgs.concat(message);
      consoleArgs = $t1.concat.apply($t1, args);
      try {
        Function.prototype.apply.call(this.$getConsoleMethod(level), window.console, consoleArgs);
      } catch ($t2) {}
    },
    $getConsoleMethod: function ConsoleLogAppender$GetConsoleMethod(level) {
      var console = window.self['console'];
      if (ss.isNullOrUndefined(this.$levelMethods)) {
        this.$levelMethods = {};
        this.$levelMethods[1 .toString()] = console.log;
        this.$levelMethods[4 .toString()] = console.error;
        this.$levelMethods[2 .toString()] = console.info;
        this.$levelMethods[3 .toString()] = console.warn;
      }
      var $t1 = this.$levelMethods[level.toString()];
      if (ss.isNullOrUndefined($t1)) {
        $t1 = console.log;
      }
      return $t1;
    }
  });
  ////////////////////////////////////////////////////////////////////////////////
  // Tableau.JavaScript.CoreSlim.EscapingUtil
  var $tab_EscapingUtil = global.tab.EscapingUtil = ss.mkType($asm, 'tab.EscapingUtil', null, null, {
    escapeHtml: function EscapingUtil$EscapeHtml(html) {
      var escaped = ss.coalesce(html, '');
      escaped = escaped.replace(new RegExp('&', 'g'), '&amp;');
      escaped = escaped.replace(new RegExp('<', 'g'), '&lt;');
      escaped = escaped.replace(new RegExp('>', 'g'), '&gt;');
      escaped = escaped.replace(new RegExp('"', 'g'), '&quot;');
      escaped = escaped.replace(new RegExp("'", 'g'), '&#39;');
      escaped = escaped.replace(new RegExp('/', 'g'), '&#47;');
      if (new RegExp('^ +$').test(escaped)) {
        escaped = escaped.replace(new RegExp(' ', 'g'), '&nbsp;');
      }
      return escaped;
    }
  });
  ////////////////////////////////////////////////////////////////////////////////
  // Tableau.JavaScript.Vql.Core.Log
  var $tab_Log = global.tab.Log = ss.mkType($asm, 'tab.Log', function () {}, null, {
    get: function Log$Get(o) {
      return $tab_Logger.lazyGetLogger(ss.getInstanceType(o));
    },
    get$1: function Log$Get(t) {
      return $tab_Logger.lazyGetLogger(t);
    }
  });
  ////////////////////////////////////////////////////////////////////////////////
  // Tableau.JavaScript.Vql.Core.LogAppenderInstance<T>
  var $tab_LogAppenderInstance = global.tab.LogAppenderInstance = ss.mkType($asm, 'tab.LogAppenderInstance', function (appenderFactoryFunc) {
    this.$appenderFactoryFunc = null;
    this.$1$InstanceField = null;
    this.$appenderFactoryFunc = appenderFactoryFunc;
  }, {
    get_instance: function LogAppenderInstance$get_Instance() {
      return this.$1$InstanceField;
    },
    set_instance: function LogAppenderInstance$set_Instance(value) {
      this.$1$InstanceField = value;
    },
    enableLogging: function LogAppenderInstance$EnableLogging(filter) {
      if (ss.isNullOrUndefined(this.get_instance())) {
        this.set_instance(this.$appenderFactoryFunc());
        $tab_Logger.addAppender(this.get_instance());
      } else if (!$tab_Logger.hasAppender(this.get_instance())) {
        $tab_Logger.addAppender(this.get_instance());
      }
      this.get_instance().addFilter(ss.coalesce(filter, function (_, __) {
        return true;
      }));
    },
    disableLogging: function LogAppenderInstance$DisableLogging() {
      if (ss.isNullOrUndefined(this.get_instance())) {
        return;
      }
      $tab_Logger.removeAppender(this.get_instance());
      this.set_instance(null);
    }
  });
  ////////////////////////////////////////////////////////////////////////////////
  // Tableau.JavaScript.Vql.Core.Logger
  var $tab_Logger = global.tab.Logger = ss.mkType($asm, 'tab.Logger', function (name) {
    this.$name = null;
    this.$name = name;
  }, {
    get_name: function Logger$get_Name() {
      return this.$name;
    },
    debug: function Logger$Debug(message, args) {
      this.$logInternal(1, message, args);
    },
    info: function Logger$Info(message, args) {
      this.$logInternal(2, message, args);
    },
    warn: function Logger$Warn(message, args) {
      this.$logInternal(3, message, args);
    },
    error: function Logger$Error(message, args) {
      this.$logInternal(4, message, args);
    },
    log: function Logger$Log(level, message, args) {
      this.$logInternal(level, message, args);
    },
    $logInternal: function Logger$LogInternal(level, message, args) {
      try {
        for (var $t1 = 0; $t1 < $tab_Logger.$appenders.length; $t1++) {
          var logAppender = $tab_Logger.$appenders[$t1];
          logAppender.log(this, level, message, args);
        }
      } catch ($t2) {}
    }
  }, {
    get_globalLog: function Logger$get_GlobalLog() {
      return $tab_Logger.global;
    },
    clearFilters: function Logger$ClearFilters() {
      for (var $t1 = 0; $t1 < $tab_Logger.$appenders.length; $t1++) {
        var logAppender = $tab_Logger.$appenders[$t1];
        logAppender.clearFilters();
      }
      $tab_Logger.$filters.splice(0, $tab_Logger.$filters.length);
    },
    filterByLogger: function Logger$FilterByLogger(validLogger, minLogLevel) {
      minLogLevel = minLogLevel || 0;
      $tab_Logger.$addFilter(function (l, ll) {
        return ss.referenceEquals(l, validLogger) && ll >= minLogLevel;
      });
    },
    filterByType: function Logger$FilterByType(t, minLogLevel) {
      minLogLevel = minLogLevel || 0;
      $tab_Logger.$addFilter(function (l, ll) {
        return ll >= minLogLevel && ss.referenceEquals(l.get_name(), ss.getTypeName(t));
      });
    },
    filterByName: function Logger$FilterByName(namePattern, minLogLevel) {
      minLogLevel = minLogLevel || 0;
      var regex = new RegExp(namePattern, 'i');
      $tab_Logger.$addFilter(function (l, ll) {
        return ll >= minLogLevel && ss.isValue(l.get_name().match(regex));
      });
    },
    clearAppenders: function Logger$ClearAppenders() {
      $tab_Logger.$appenders.splice(0, $tab_Logger.$filters.length);
    },
    hasAppender: function Logger$HasAppender(appender) {
      return $tab_Logger.$appenders.indexOf(appender) > -1;
    },
    addAppender: function Logger$AddAppender(appender) {
      for (var $t1 = 0; $t1 < $tab_Logger.$filters.length; $t1++) {
        var filter = $tab_Logger.$filters[$t1];
        appender.addFilter(filter);
      }
      $tab_Logger.$appenders.push(appender);
    },
    removeAppender: function Logger$RemoveAppender(appender) {
      var indexOfAppender = $tab_Logger.$appenders.indexOf(appender);
      if (indexOfAppender > -1) {
        $tab_Logger.$appenders.splice(indexOfAppender, 1);
      }
    },
    lazyGetLogger: function Logger$LazyGetLogger(t) {
      var FieldName = '_logger';
      var logger = t[FieldName];
      if (ss.isNullOrUndefined(logger)) {
        logger = $tab_Logger.getLogger(t, null);
        t[FieldName] = logger;
      }
      return logger;
    },
    getLogger: function Logger$GetLogger(t, ll) {
      var l = $tab_Logger.getLoggerWithName(ss.getTypeName(t));
      if (ss.isValue(ll)) {
        $tab_Logger.filterByLogger(l, ss.unbox(ll));
      }
      return l;
    },
    getLoggerWithName: function Logger$GetLoggerWithName(name) {
      return new $tab_Logger(name);
    },
    $setupUrlFilters: function Logger$SetupUrlFilters() {
      var queryParams = $tab_UriExtensions.getUriQueryParameters(window.self.location.search);
      if (!ss.keyExists(queryParams, $tab_Logger.$logQueryParam)) {
        return;
      }
      $tab_Logger.clearFilters();
      var logParams = queryParams[$tab_Logger.$logQueryParam];
      if (logParams.length === 0) {
        $tab_Logger.filterByName('.*', 0);
      }
      for (var $t1 = 0; $t1 < logParams.length; $t1++) {
        var logParam = logParams[$t1];
        var logVals = logParam.split(String.fromCharCode(58));
        var level = 1;
        if (logVals.length > 0 && ss.isValue(logVals[1])) {
          var key = logVals[1].toLowerCase();
          var index = $tab_Logger.loggerLevelNames.indexOf(key);
          if (index >= 0) {
            level = index;
          }
        }
        $tab_Logger.filterByName(logVals[0], level);
      }
    },
    $addFilter: function Logger$AddFilter(filterFunc) {
      $tab_Logger.$filters.push(filterFunc);
      for (var $t1 = 0; $t1 < $tab_Logger.$appenders.length; $t1++) {
        var logAppender = $tab_Logger.$appenders[$t1];
        logAppender.addFilter(filterFunc);
      }
    }
  });
  ////////////////////////////////////////////////////////////////////////////////
  // Tableau.JavaScript.Vql.Core.LoggerLevel
  var $tab_LoggerLevel = global.tab.LoggerLevel = ss.mkEnum($asm, 'tab.LoggerLevel', { all: 0, debug: 1, info: 2, warn: 3, error: 4, off: 5 });
  ////////////////////////////////////////////////////////////////////////////////
  // Tableau.JavaScript.Vql.Core.ScriptEx
  var $tab_ScriptEx = global.tab.ScriptEx = ss.mkType($asm, 'tab.ScriptEx');
  ////////////////////////////////////////////////////////////////////////////////
  // Tableau.JavaScript.Vql.Core.StringExtensions
  var $tab_StringExtensions = global.tab.StringExtensions = ss.mkType($asm, 'tab.StringExtensions', null, null, {
    decodeUriComponentCorrectly: function StringExtensions$DecodeUriComponentCorrectly(s) {
      return decodeURIComponent(s.replace(new RegExp('\\+', 'g'), ' '));
    }
  });
  ////////////////////////////////////////////////////////////////////////////////
  // Tableau.JavaScript.Vql.Core.UriExtensions
  var $tab_UriExtensions = global.tab.UriExtensions = ss.mkType($asm, 'tab.UriExtensions', null, null, {
    getUriQueryParameters: function UriExtensions$GetUriQueryParameters(uri) {
      var parameters = {};
      if (ss.isNullOrUndefined(uri)) {
        return parameters;
      }
      var indexOfQuery = uri.indexOf('?');
      if (indexOfQuery < 0) {
        return parameters;
      }
      var query = uri.substr(indexOfQuery + 1);
      var indexOfHash = query.indexOf('#');
      if (indexOfHash >= 0) {
        query = query.substr(0, indexOfHash);
      }
      if (ss.isNullOrEmptyString(query)) {
        return parameters;
      }
      var paramPairs = query.split('&');
      for (var $t1 = 0; $t1 < paramPairs.length; $t1++) {
        var pair = paramPairs[$t1];
        var keyValue = pair.split('=');
        var key = $tab_StringExtensions.decodeUriComponentCorrectly(keyValue[0]);
        var values;
        if (ss.keyExists(parameters, key)) {
          values = parameters[key];
        } else {
          values = [];
          parameters[key] = values;
        }
        if (keyValue.length > 1) {
          values.push($tab_StringExtensions.decodeUriComponentCorrectly(keyValue[1]));
        }
      }
      return parameters;
    }
  });
  ////////////////////////////////////////////////////////////////////////////////
  // Tableau.JavaScript.CoreSlim.WindowHelper
  var $tab_WindowHelper = global.tab.WindowHelper = ss.mkType($asm, 'tab.WindowHelper', function (window) {
    this.$window = null;
    this.$window = window;
  }, {
    get_pageXOffset: function WindowHelper$get_PageXOffset() {
      return $tab_WindowHelper.$pageXOffsetFunc(this.$window);
    },
    get_pageYOffset: function WindowHelper$get_PageYOffset() {
      return $tab_WindowHelper.$pageYOffsetFunc(this.$window);
    },
    get_clientWidth: function WindowHelper$get_ClientWidth() {
      return $tab_WindowHelper.$clientWidthFunc(this.$window);
    },
    get_clientHeight: function WindowHelper$get_ClientHeight() {
      return $tab_WindowHelper.$clientHeightFunc(this.$window);
    },
    get_innerWidth: function WindowHelper$get_InnerWidth() {
      return $tab_WindowHelper.$innerWidthFunc(this.$window);
    },
    get_outerWidth: function WindowHelper$get_OuterWidth() {
      return $tab_WindowHelper.$outerWidthFunc(this.$window);
    },
    get_innerHeight: function WindowHelper$get_InnerHeight() {
      return $tab_WindowHelper.$innerHeightFunc(this.$window);
    },
    get_outerHeight: function WindowHelper$get_OuterHeight() {
      return $tab_WindowHelper.$outerHeightFunc(this.$window);
    },
    get_screenLeft: function WindowHelper$get_ScreenLeft() {
      return $tab_WindowHelper.$screenLeftFunc(this.$window);
    },
    get_screenTop: function WindowHelper$get_ScreenTop() {
      return $tab_WindowHelper.$screenTopFunc(this.$window);
    },
    isQuirksMode: function WindowHelper$IsQuirksMode() {
      return document.compatMode === 'BackCompat';
    }
  }, {
    get_windowSelf: function WindowHelper$get_WindowSelf() {
      return window.self;
    },
    get_windowParent: function WindowHelper$get_WindowParent() {
      return window.parent;
    },
    get_selection: function WindowHelper$get_Selection() {
      if (typeof window['getSelection'] === 'function') {
        return window.getSelection();
      }
      if (typeof document['getSelection'] === 'function') {
        return document.getSelection();
      }
      return null;
    },
    close: function WindowHelper$Close(window) {
      window.close();
    },
    getOpener: function WindowHelper$GetOpener(window) {
      return window.opener;
    },
    getLocation: function WindowHelper$GetLocation(window) {
      return window.location;
    },
    getOrigin: function WindowHelper$GetOrigin(window, includePort) {
      return window.location.protocol + '//' + (includePort ? window.location.host : window.location.hostname);
    },
    getPathAndSearch: function WindowHelper$GetPathAndSearch(window) {
      return window.location.pathname + window.location.search;
    },
    setLocationHref: function WindowHelper$SetLocationHref(window, href) {
      window.location.href = href;
    },
    locationReplace: function WindowHelper$LocationReplace(window, url) {
      window.location.replace(url);
    },
    open: function WindowHelper$Open(href, target, options) {
      return window.open(href, target, options);
    },
    reload: function WindowHelper$Reload(w, forceGet) {
      w.location.reload(forceGet);
    },
    requestAnimationFrame: function WindowHelper$RequestAnimationFrame(action) {
      return $tab_WindowHelper.$requestAnimationFrameFunc(action);
    },
    cancelAnimationFrame: function WindowHelper$CancelAnimationFrame(animationId) {
      if (ss.isValue(animationId)) {
        $tab_WindowHelper.$cancelAnimationFrameFunc(animationId);
      }
    },
    setTimeout: function WindowHelper$SetTimeout(callback, milliseconds) {
      return window.setTimeout(callback, milliseconds);
    },
    setInterval: function WindowHelper$SetInterval(callback, milliseconds) {
      return window.setInterval(callback, milliseconds);
    },
    addListener: function WindowHelper$AddListener(windowParam, eventName, messageListener) {
      if ('addEventListener' in windowParam) {
        windowParam.addEventListener(eventName, messageListener, false);
      } else {
        windowParam.attachEvent('on' + eventName, messageListener);
      }
    },
    removeListener: function WindowHelper$RemoveListener(window, eventName, messageListener) {
      if ('removeEventListener' in window) {
        window.removeEventListener(eventName, messageListener, false);
      } else {
        window.detachEvent('on' + eventName, messageListener);
      }
    },
    $setDefaultRequestAnimationFrameImpl: function WindowHelper$SetDefaultRequestAnimationFrameImpl() {
      var lastTime = 0;
      $tab_WindowHelper.$requestAnimationFrameFunc = function (callback) {
        var curTime = new Date().getTime();
        var timeToCall = Math.max(0, 16 - (curTime - lastTime));
        lastTime = curTime + timeToCall;
        var id = window.setTimeout(callback, timeToCall);
        return id;
      };
    },
    clearSelection: function WindowHelper$ClearSelection() {
      var selection = $tab_WindowHelper.get_selection();
      if (ss.isValue(selection)) {
        if (typeof selection['removeAllRanges'] === 'function') {
          selection.removeAllRanges();
        } else if (typeof selection['empty'] === 'function') {
          selection['empty']();
        }
      }
    }
  });
  ss.initClass($tab_BaseLogAppender);
  ss.initClass($tab_ConsoleLogAppender, $tab_BaseLogAppender);
  ss.initClass($tab_EscapingUtil);
  ss.initClass($tab_Log);
  ss.initClass($tab_LogAppenderInstance);
  ss.initClass($tab_Logger);
  ss.initClass($tab_ScriptEx);
  ss.initClass($tab_StringExtensions);
  ss.initClass($tab_UriExtensions);
  ss.initClass($tab_WindowHelper);
  (function () {
    $tab_Logger.global = $tab_Logger.getLoggerWithName('global');
    $tab_Logger.loggerLevelNames = [];
    $tab_Logger.$logQueryParam = ':log';
    $tab_Logger.$appenders = [];
    $tab_Logger.$filters = [];
    $tab_Logger.$nullLog = new $tab_Logger('');
    $tab_Logger.$setupUrlFilters();
    $tab_Logger.loggerLevelNames[0] = 'all';
    $tab_Logger.loggerLevelNames[1] = 'debug';
    $tab_Logger.loggerLevelNames[2] = 'info';
    $tab_Logger.loggerLevelNames[3] = 'warn';
    $tab_Logger.loggerLevelNames[4] = 'error';
    $tab_Logger.loggerLevelNames[5] = 'off';
  })();
  (function () {
    $tab_ConsoleLogAppender.globalAppender = new $tab_LogAppenderInstance(function () {
      return new $tab_ConsoleLogAppender();
    });
    $tab_ConsoleLogAppender.globalAppender.enableLogging(function (_, loggerLevel) {
      return loggerLevel >= 2;
    });
  })();
  (function () {
    $tab_WindowHelper.blank = '_blank';
    $tab_WindowHelper.$innerWidthFunc = null;
    $tab_WindowHelper.$innerHeightFunc = null;
    $tab_WindowHelper.$clientWidthFunc = null;
    $tab_WindowHelper.$clientHeightFunc = null;
    $tab_WindowHelper.$pageXOffsetFunc = null;
    $tab_WindowHelper.$pageYOffsetFunc = null;
    $tab_WindowHelper.$screenLeftFunc = null;
    $tab_WindowHelper.$screenTopFunc = null;
    $tab_WindowHelper.$outerWidthFunc = null;
    $tab_WindowHelper.$outerHeightFunc = null;
    $tab_WindowHelper.$requestAnimationFrameFunc = null;
    $tab_WindowHelper.$cancelAnimationFrameFunc = null;
    if ('innerWidth' in window) {
      $tab_WindowHelper.$innerWidthFunc = function (w) {
        return w.innerWidth;
      };
    } else {
      $tab_WindowHelper.$innerWidthFunc = function (w1) {
        return w1.document.documentElement.offsetWidth;
      };
    }
    if ('outerWidth' in window) {
      $tab_WindowHelper.$outerWidthFunc = function (w2) {
        return w2.outerWidth;
      };
    } else {
      $tab_WindowHelper.$outerWidthFunc = $tab_WindowHelper.$innerWidthFunc;
    }
    if ('innerHeight' in window) {
      $tab_WindowHelper.$innerHeightFunc = function (w3) {
        return w3.innerHeight;
      };
    } else {
      $tab_WindowHelper.$innerHeightFunc = function (w4) {
        return w4.document.documentElement.offsetHeight;
      };
    }
    if ('outerHeight' in window) {
      $tab_WindowHelper.$outerHeightFunc = function (w5) {
        return w5.outerHeight;
      };
    } else {
      $tab_WindowHelper.$outerHeightFunc = $tab_WindowHelper.$innerHeightFunc;
    }
    if ('clientWidth' in window) {
      $tab_WindowHelper.$clientWidthFunc = function (w6) {
        return w6['clientWidth'];
      };
    } else {
      $tab_WindowHelper.$clientWidthFunc = function (w7) {
        return w7.document.documentElement.clientWidth;
      };
    }
    if ('clientHeight' in window) {
      $tab_WindowHelper.$clientHeightFunc = function (w8) {
        return w8['clientHeight'];
      };
    } else {
      $tab_WindowHelper.$clientHeightFunc = function (w9) {
        return w9.document.documentElement.clientHeight;
      };
    }
    if (ss.isValue(window.self.pageXOffset)) {
      $tab_WindowHelper.$pageXOffsetFunc = function (w10) {
        return w10.pageXOffset;
      };
    } else {
      $tab_WindowHelper.$pageXOffsetFunc = function (w11) {
        return w11.document.documentElement.scrollLeft;
      };
    }
    if (ss.isValue(window.self.pageYOffset)) {
      $tab_WindowHelper.$pageYOffsetFunc = function (w12) {
        return w12.pageYOffset;
      };
    } else {
      $tab_WindowHelper.$pageYOffsetFunc = function (w13) {
        return w13.document.documentElement.scrollTop;
      };
    }
    if ('screenLeft' in window) {
      $tab_WindowHelper.$screenLeftFunc = function (w14) {
        return ss.unbox(ss.cast(w14.screenLeft, ss.Int32));
      };
    } else {
      $tab_WindowHelper.$screenLeftFunc = function (w15) {
        return w15.screenX;
      };
    }
    if ('screenTop' in window) {
      $tab_WindowHelper.$screenTopFunc = function (w16) {
        return ss.unbox(ss.cast(w16.screenTop, ss.Int32));
      };
    } else {
      $tab_WindowHelper.$screenTopFunc = function (w17) {
        return w17.screenY;
      };
    }
    {
      var DefaultRequestName = 'requestAnimationFrame';
      var DefaultCancelName = 'cancelAnimationFrame';
      var vendors = ['ms', 'moz', 'webkit', 'o'];
      var requestFuncName = null;
      var cancelFuncName = null;
      if (DefaultRequestName in window) {
        requestFuncName = DefaultRequestName;
      }
      if (DefaultCancelName in window) {
        cancelFuncName = DefaultCancelName;
      }
      for (var ii = 0; ii < vendors.length && (ss.isNullOrUndefined(requestFuncName) || ss.isNullOrUndefined(cancelFuncName)); ++ii) {
        var vendor = vendors[ii];
        var funcName = vendor + 'RequestAnimationFrame';
        if (ss.isNullOrUndefined(requestFuncName) && funcName in window) {
          requestFuncName = funcName;
        }
        if (ss.isNullOrUndefined(cancelFuncName)) {
          funcName = vendor + 'CancelAnimationFrame';
          if (funcName in window) {
            cancelFuncName = funcName;
          }
          funcName = vendor + 'CancelRequestAnimationFrame';
          if (funcName in window) {
            cancelFuncName = funcName;
          }
        }
      }
      if (ss.isValue(requestFuncName)) {
        $tab_WindowHelper.$requestAnimationFrameFunc = function (callback) {
          return window[requestFuncName](callback);
        };
      } else {
        $tab_WindowHelper.$setDefaultRequestAnimationFrameImpl();
      }
      if (ss.isValue(cancelFuncName)) {
        $tab_WindowHelper.$cancelAnimationFrameFunc = function (animationId) {
          window[cancelFuncName](animationId);
        };
      } else {
        $tab_WindowHelper.$cancelAnimationFrameFunc = window.clearTimeout;
      }
    }
  })();
})();

// END CoreSlim

var tab = global.tab;

global.tableauSoftware = global.tableauSoftware || {};

/*! BEGIN ApiShared */

(function () {
  'dont use strict';

  var $asm = {};
  global.tab = global.tab || {};
  global.tableauSoftware = global.tableauSoftware || {};
  ss.initAssembly($asm, 'vqlapishared');
  ////////////////////////////////////////////////////////////////////////////////
  // Tableau.JavaScript.Vql.ApiShared.ApiCommand
  var $tab__ApiCommand = global.tab._ApiCommand = ss.mkType($asm, 'tab._ApiCommand', function (name, commandId, hostId, parameters) {
    this.$1$NameField = null;
    this.$1$HostIdField = null;
    this.$1$CommandIdField = null;
    this.$1$ParametersField = null;
    this.set_name(name);
    this.set_commandId(commandId);
    this.set_hostId(hostId);
    this.set_parameters(parameters);
  }, {
    get_name: function ApiCommand$get_Name() {
      return this.$1$NameField;
    },
    set_name: function ApiCommand$set_Name(value) {
      this.$1$NameField = value;
    },
    get_hostId: function ApiCommand$get_HostId() {
      return this.$1$HostIdField;
    },
    set_hostId: function ApiCommand$set_HostId(value) {
      this.$1$HostIdField = value;
    },
    get_commandId: function ApiCommand$get_CommandId() {
      return this.$1$CommandIdField;
    },
    set_commandId: function ApiCommand$set_CommandId(value) {
      this.$1$CommandIdField = value;
    },
    get_parameters: function ApiCommand$get_Parameters() {
      return this.$1$ParametersField;
    },
    set_parameters: function ApiCommand$set_Parameters(value) {
      this.$1$ParametersField = value;
    },
    get_isApiCommandName: function ApiCommand$get_IsApiCommandName() {
      return this.get_rawName().indexOf('api.', 0) === 0;
    },
    get_isApiEventName: function ApiCommand$get_IsApiEventName() {
      return this.get_isApiCommandName() && ss.endsWithString(this.get_rawName(), 'Event');
    },
    get_rawName: function ApiCommand$get_RawName() {
      return this.get_name().toString();
    },
    serialize: function ApiCommand$Serialize() {
      var message = [];
      message.push(this.get_name());
      message.push(this.get_commandId());
      message.push(this.get_hostId());
      if (ss.isValue(this.get_parameters())) {
        message.push(this.get_parameters());
      }
      var serializedMessage = message.join(',');
      $tab__ApiCommand.lastRequestMessage = serializedMessage;
      return serializedMessage;
    }
  }, {
    generateNextCommandId: function ApiCommand$GenerateNextCommandId() {
      var commandId = 'cmd' + $tab__ApiCommand.$nextCommandId;
      $tab__ApiCommand.$nextCommandId++;
      return commandId;
    },
    parse: function ApiCommand$Parse(serialized) {
      var name;
      var index = serialized.indexOf(String.fromCharCode(44));
      if (index < 0) {
        name = ss.cast(serialized, String);
        return new $tab__ApiCommand(name, null, null, null);
      }
      name = ss.cast(serialized.substr(0, index), String);
      var sourceId;
      var secondPart = serialized.substr(index + 1);
      index = secondPart.indexOf(String.fromCharCode(44));
      if (index < 0) {
        sourceId = secondPart;
        return new $tab__ApiCommand(name, sourceId, null, null);
      }
      sourceId = secondPart.substr(0, index);
      var hostId;
      var thirdPart = secondPart.substr(index + 1);
      index = thirdPart.indexOf(String.fromCharCode(44));
      if (index < 0) {
        hostId = thirdPart;
        return new $tab__ApiCommand(name, sourceId, hostId, null);
      }
      hostId = thirdPart.substr(0, index);
      var parameters = thirdPart.substr(index + 1);
      $tab__ApiCommand.lastResponseMessage = serialized;
      if (name === 'api.GetClientInfoCommand') {
        $tab__ApiCommand.lastClientInfoResponseMessage = serialized;
      }
      return new $tab__ApiCommand(name, sourceId, hostId, parameters);
    }
  });
  ////////////////////////////////////////////////////////////////////////////////
  // Tableau.JavaScript.Vql.ApiShared.ApiObjectRegistry
  var $tab__ApiObjectRegistry = global.tab._ApiObjectRegistry = ss.mkType($asm, 'tab._ApiObjectRegistry', null, null, {
    registerApiMessageRouter: function ApiObjectRegistry$RegisterApiMessageRouter(objectCreationFunc) {
      return $tab__ApiObjectRegistry.$registerType(Object).call(null, objectCreationFunc);
    },
    getApiMessageRouter: function ApiObjectRegistry$GetApiMessageRouter() {
      return $tab__ApiObjectRegistry.$getSingleton(Object).call(null);
    },
    disposeApiMessageRouter: function ApiObjectRegistry$DisposeApiMessageRouter() {
      $tab__ApiObjectRegistry.$clearSingletonInstance(Object).call(null);
    },
    $registerType: function $registerType(T) {
      return function ApiObjectRegistry$RegisterType(objectCreationFunc) {
        var creationRegistry = window._ApiObjectRegistryGlobalState.creationRegistry;
        var interfaceTypeName = ss.getTypeFullName(T);
        var previousType = creationRegistry[interfaceTypeName];
        creationRegistry[interfaceTypeName] = objectCreationFunc;
        return previousType;
      };
    },
    $createType: function $createType(T) {
      return function ApiObjectRegistry$CreateType() {
        var interfaceTypeName = ss.getTypeFullName(T);
        var creationRegistry = window._ApiObjectRegistryGlobalState.creationRegistry;
        var creationFunc = creationRegistry[interfaceTypeName];
        if (ss.isNullOrUndefined(creationFunc)) {
          throw $tab__TableauException.createInternalError("No creation function has been registered for interface type '" + interfaceTypeName + "'.");
        }
        var instance = creationFunc();
        return instance;
      };
    },
    $getSingleton: function $getSingleton(T) {
      return function ApiObjectRegistry$GetSingleton() {
        var singletonInstanceRegistry = window._ApiObjectRegistryGlobalState.singletonInstanceRegistry;
        var interfaceTypeName = ss.getTypeFullName(T);
        var instance = ss.cast(singletonInstanceRegistry[interfaceTypeName], T);
        if (ss.isNullOrUndefined(instance)) {
          instance = $tab__ApiObjectRegistry.$createType(T).call(null);
          singletonInstanceRegistry[interfaceTypeName] = instance;
        }
        return instance;
      };
    },
    $clearSingletonInstance: function $clearSingletonInstance(T) {
      return function ApiObjectRegistry$ClearSingletonInstance() {
        var singletonInstanceRegistry = window._ApiObjectRegistryGlobalState.singletonInstanceRegistry;
        var interfaceTypeName = ss.getTypeFullName(T);
        var instance = ss.cast(singletonInstanceRegistry[interfaceTypeName], T);
        delete singletonInstanceRegistry[interfaceTypeName];
        return instance;
      };
    }
  });
  ////////////////////////////////////////////////////////////////////////////////
  // Tableau.JavaScript.Vql.ApiShared.ApiServerNotification
  var $tab__ApiServerNotification = global.tab._ApiServerNotification = ss.mkType($asm, 'tab._ApiServerNotification', function (workbookName, worksheetName, data) {
    this.$workbookName = null;
    this.$worksheetName = null;
    this.$data = null;
    this.$workbookName = workbookName;
    this.$worksheetName = worksheetName;
    this.$data = data;
  }, {
    get_workbookName: function ApiServerNotification$get_WorkbookName() {
      return this.$workbookName;
    },
    get_worksheetName: function ApiServerNotification$get_WorksheetName() {
      return this.$worksheetName;
    },
    get_data: function ApiServerNotification$get_Data() {
      return this.$data;
    },
    serialize: function ApiServerNotification$Serialize() {
      var serialized = {};
      serialized['api.workbookName'] = this.$workbookName;
      serialized['api.worksheetName'] = this.$worksheetName;
      serialized['api.commandData'] = this.$data;
      return JSON.stringify(serialized);
    }
  }, {
    deserialize: function ApiServerNotification$Deserialize(json) {
      var param = JSON.parse(json);
      var workbookName = ss.cast(param['api.workbookName'], String);
      var worksheetName = ss.cast(param['api.worksheetName'], String);
      var data = param['api.commandData'];
      return new $tab__ApiServerNotification(workbookName, worksheetName, data);
    }
  });
  ////////////////////////////////////////////////////////////////////////////////
  // Tableau.JavaScript.Vql.ApiShared.ApiServerResultParser
  var $tab__ApiServerResultParser = global.tab._ApiServerResultParser = ss.mkType($asm, 'tab._ApiServerResultParser', function (serverResult) {
    this.$commandResult = null;
    this.$commandData = null;
    var param = JSON.parse(serverResult);
    this.$commandResult = ss.cast(param['api.commandResult'], String);
    this.$commandData = param['api.commandData'];
  }, {
    get_result: function ApiServerResultParser$get_Result() {
      return this.$commandResult;
    },
    get_data: function ApiServerResultParser$get_Data() {
      return this.$commandData;
    }
  });
  ////////////////////////////////////////////////////////////////////////////////
  // Tableau.JavaScript.Vql.ApiShared.DoNotUseCollection
  var $tab__CollectionImpl = global.tab._CollectionImpl = ss.mkType($asm, 'tab._CollectionImpl', function () {
    this.$items = [];
    this.$itemMap = {};
  }, {
    get__length: function DoNotUseCollection$get_Length() {
      return this.$items.length;
    },
    get__rawArray: function DoNotUseCollection$get_RawArray() {
      return this.$items;
    },
    get_item: function DoNotUseCollection$get_Item(index) {
      return this.$items[index];
    },
    _get: function DoNotUseCollection$Get(key) {
      var validKey = this.$ensureValidKey(key);
      if (ss.isValue(this.$itemMap[validKey])) {
        return this.$itemMap[validKey];
      }
      return undefined;
    },
    _has: function DoNotUseCollection$Has(key) {
      return ss.isValue(this._get(key));
    },
    _add: function DoNotUseCollection$Add(key, item) {
      this.$verifyKeyAndItemParameters(key, item);
      var validKey = this.$ensureValidKey(key);
      this.$items.push(item);
      this.$itemMap[validKey] = item;
    },
    _addToFirst: function DoNotUseCollection$AddToFirst(key, item) {
      this.$verifyKeyAndItemParameters(key, item);
      var validKey = this.$ensureValidKey(key);
      this.$items.unshift(item);
      this.$itemMap[validKey] = item;
    },
    _remove: function DoNotUseCollection$Remove(key) {
      var validKey = this.$ensureValidKey(key);
      if (ss.isValue(this.$itemMap[validKey])) {
        var item = this.$itemMap[validKey];
        delete this.$itemMap[validKey];
        for (var index = 0; index < this.$items.length; index++) {
          if (ss.referenceEquals(this.$items[index], item)) {
            this.$items.splice(index, 1);
            break;
          }
        }
      }
    },
    _toApiCollection: function DoNotUseCollection$ToApiCollection() {
      var clone = this.$items.concat();
      clone.get = ss.mkdel(this, function (key) {
        return this._get(key);
      });
      clone.has = ss.mkdel(this, function (key1) {
        return this._has(key1);
      });
      return clone;
    },
    $verifyUniqueKeyParameter: function DoNotUseCollection$VerifyUniqueKeyParameter(key) {
      if ($tab__Utility.isNullOrEmpty(key)) {
        throw new ss.Exception('Null key');
      }
      if (this._has(key)) {
        throw new ss.Exception("Duplicate key '" + key + "'");
      }
    },
    $verifyKeyAndItemParameters: function DoNotUseCollection$VerifyKeyAndItemParameters(key, item) {
      this.$verifyUniqueKeyParameter(key);
      if (ss.isNullOrUndefined(item)) {
        throw new ss.Exception('Null item');
      }
    },
    $ensureValidKey: function DoNotUseCollection$EnsureValidKey(key) {
      return '_' + key;
    }
  });
  ////////////////////////////////////////////////////////////////////////////////
  // Tableau.JavaScript.Vql.ApiShared.ColumnImpl
  var $tab__ColumnImpl = global.tab._ColumnImpl = ss.mkType($asm, 'tab._ColumnImpl', function (fieldName, dataType, isReferenced, index) {
    this.$fieldName = null;
    this.$dataType = null;
    this.$isReferenced = false;
    this.$index = 0;
    $tab__Param.verifyString(fieldName, 'Column Field Name');
    this.$fieldName = fieldName;
    this.$dataType = dataType;
    this.$isReferenced = ss.coalesce(isReferenced, false);
    this.$index = index;
  }, {
    get_fieldName: function ColumnImpl$get_FieldName() {
      return this.$fieldName;
    },
    get_dataType: function ColumnImpl$get_DataType() {
      return this.$dataType;
    },
    get_isReferenced: function ColumnImpl$get_IsReferenced() {
      return this.$isReferenced;
    },
    get_index: function ColumnImpl$get_Index() {
      return this.$index;
    }
  });
  ////////////////////////////////////////////////////////////////////////////////
  // Tableau.JavaScript.Vql.ApiShared.DataTableImpl
  var $tab__DataTableImpl = global.tab._DataTableImpl = ss.mkType($asm, 'tab._DataTableImpl', function (rows, isSummaryData, totalRowCount, columns) {
    this.$name = null;
    this.$rows = null;
    this.$totalRowCount = 0;
    this.$columns = null;
    this.$isSummaryData = false;
    this.$rows = rows;
    this.$totalRowCount = totalRowCount;
    this.$columns = columns;
    this.$isSummaryData = isSummaryData;
    this.$name = isSummaryData ? 'Summary Data Table' : 'Underlying Data Table';
  }, {
    get_name: function DataTableImpl$get_Name() {
      return this.$name;
    },
    get_rows: function DataTableImpl$get_Rows() {
      return this.$rows;
    },
    get_columns: function DataTableImpl$get_Columns() {
      return this.$columns;
    },
    get_totalRowCount: function DataTableImpl$get_TotalRowCount() {
      return this.$totalRowCount;
    },
    get_isSummaryData: function DataTableImpl$get_IsSummaryData() {
      return this.$isSummaryData;
    }
  });
  ////////////////////////////////////////////////////////////////////////////////
  // Tableau.JavaScript.Vql.ApiShared.DoNotUseDeferred
  var $tab__DeferredImpl = global.tab._DeferredImpl = ss.mkType($asm, 'tab._DeferredImpl', function () {
    this.$promise = null;
    this.$thenFunc = null;
    this.$listeners = [];
    this.$resolveFunc = null;
    this.$promise = new $tab__PromiseImpl(ss.mkdel(this, this.then));
    this.$thenFunc = ss.mkdel(this, this.$preResolutionThen);
    this.$resolveFunc = ss.mkdel(this, this.$transitionToFulfilled);
  }, {
    get_promise: function DoNotUseDeferred$get_Promise() {
      return this.$promise;
    },
    all: function DoNotUseDeferred$All(promisesOrValues) {
      var allDone = new $tab__DeferredImpl();
      var length = promisesOrValues.length;
      var toResolve = length;
      var results = [];
      if (length === 0) {
        allDone.resolve(results);
        return allDone.get_promise();
      }
      var resolveOne = function resolveOne(promiseOrValue, index) {
        var promise = $tab_$DeferredUtil.$coerceToTrustedPromise(promiseOrValue);
        promise.then(function (returnValue) {
          results[index] = returnValue;
          toResolve--;
          if (toResolve === 0) {
            allDone.resolve(results);
          }
          return null;
        }, function (e) {
          allDone.reject(e);
          return null;
        });
      };
      for (var i = 0; i < length; i++) {
        resolveOne(promisesOrValues[i], i);
      }
      return allDone.get_promise();
    },
    then: function DoNotUseDeferred$Then(callback, errback) {
      return this.$thenFunc(callback, errback);
    },
    resolve: function DoNotUseDeferred$Resolve(promiseOrValue) {
      return this.$resolveFunc(promiseOrValue);
    },
    reject: function DoNotUseDeferred$Reject(e) {
      return this.$resolveFunc($tab_$DeferredUtil.$rejected(e));
    },
    $preResolutionThen: function DoNotUseDeferred$PreResolutionThen(callback, errback) {
      var deferred = new $tab__DeferredImpl();
      this.$listeners.push(function (promise) {
        promise.then(callback, errback).then(ss.mkdel(deferred, deferred.resolve), ss.mkdel(deferred, deferred.reject));
      });
      return deferred.get_promise();
    },
    $transitionToFulfilled: function DoNotUseDeferred$TransitionToFulfilled(completed) {
      var completedPromise = $tab_$DeferredUtil.$coerceToTrustedPromise(completed);
      this.$thenFunc = completedPromise.then;
      this.$resolveFunc = $tab_$DeferredUtil.$coerceToTrustedPromise;
      for (var i = 0; i < this.$listeners.length; i++) {
        var listener = this.$listeners[i];
        listener(completedPromise);
      }
      this.$listeners = null;
      return completedPromise;
    }
  });
  ////////////////////////////////////////////////////////////////////////////////
  // Tableau.JavaScript.Vql.Core.jQueryInterface
  var $tab__jQueryShim = global.tab._jQueryShim = ss.mkType($asm, 'tab._jQueryShim', null, null, {
    isFunction: function jQueryInterface$IsFunction(obj) {
      return ss.referenceEquals($tab__jQueryShim.type(obj), $tab__jQueryShim.$functionType);
    },
    isArray: function jQueryInterface$IsArray(obj) {
      if (ss.isValue(Array['isArray'])) {
        return ss.unbox(ss.cast(Array['isArray'](obj), Boolean));
      }
      return ss.referenceEquals($tab__jQueryShim.type(obj), $tab__jQueryShim.$arrayType);
    },
    type: function jQueryInterface$Type(obj) {
      return ss.isNullOrUndefined(obj) ? String(obj) : $tab__jQueryShim.$class2type[ss.cast($tab__jQueryShim.$toString.call(obj), String)] || $tab__jQueryShim.$objectType;
    },
    trim: function jQueryInterface$Trim(text) {
      if (ss.isValue($tab__jQueryShim.$trim)) {
        return ss.isNullOrUndefined(text) ? '' : ss.cast($tab__jQueryShim.$trim.call(text), String);
      }
      return ss.isNullOrUndefined(text) ? '' : text.toString().replace($tab__jQueryShim.$trimLeft, '').replace($tab__jQueryShim.$trimRight, '');
    },
    parseJSON: function jQueryInterface$ParseJson(data) {
      if (typeof data !== 'string' || ss.isNullOrUndefined(data)) {
        return null;
      }
      data = $tab__jQueryShim.trim(data);
      if (ss.isValue(JSON) && ss.isValue(JSON['parse'])) {
        return JSON.parse(data);
      }
      if ($tab__jQueryShim.$rvalidchars.test(data.replace($tab__jQueryShim.$rvalidescape, '@').replace($tab__jQueryShim.$rvalidtokens, ']').replace($tab__jQueryShim.$rvalidbraces, ''))) {
        return new Function('return ' + data)();
      }
      throw new ss.Exception('Invalid JSON: ' + data);
    }
  });
  ////////////////////////////////////////////////////////////////////////////////
  // Tableau.JavaScript.Vql.ApiShared.Param
  var $tab__Param = global.tab._Param = ss.mkType($asm, 'tab._Param', null, null, {
    verifyString: function Param$VerifyString(argumentValue, argumentName) {
      if (ss.isNullOrUndefined(argumentValue) || argumentValue.length === 0) {
        throw $tab__TableauException.createInternalStringArgumentException(argumentName);
      }
    },
    verifyStringMaxLength: function Param$VerifyStringMaxLength(argumentValue, argumentName) {
      if (argumentValue.length > $tab__Param.$maxChars) {
        throw $tab__TableauException.createMaxCharStringArgumentException(argumentName, $tab__Param.$maxChars);
      }
    },
    verifyValue: function Param$VerifyValue(argumentValue, argumentName) {
      if (ss.isNullOrUndefined(argumentValue)) {
        throw $tab__TableauException.createInternalNullArgumentException(argumentName);
      }
    }
  });
  ////////////////////////////////////////////////////////////////////////////////
  // Tableau.JavaScript.Vql.ApiShared.DoNotUsePromise
  var $tab__PromiseImpl = global.tab._PromiseImpl = ss.mkType($asm, 'tab._PromiseImpl', function (thenFunc) {
    this.then = null;
    this.then = thenFunc;
  }, {
    always: function DoNotUsePromise$Always(callback) {
      return ss.cast(this.then(callback, ss.cast(callback, Function)), $tab__PromiseImpl);
    },
    otherwise: function DoNotUsePromise$Otherwise(errback) {
      return ss.cast(this.then(null, errback), $tab__PromiseImpl);
    }
  });
  ////////////////////////////////////////////////////////////////////////////////
  // Tableau.JavaScript.Vql.ApiShared.TabRect
  var $tab__Rect = global.tab._Rect = ss.mkType($asm, 'tab._Rect', function (left, top, width, height) {
    this.left = 0;
    this.top = 0;
    this.width = 0;
    this.height = 0;
    this.left = left;
    this.top = top;
    this.width = width;
    this.height = height;
  }, {
    intersect: function TabRect$Intersect(other) {
      var left = Math.max(this.left, other.left);
      var top = Math.max(this.top, other.top);
      var right = Math.min(this.left + this.width, other.left + other.width);
      var bottom = Math.min(this.top + this.height, other.top + other.height);
      if (right <= left || bottom <= top) {
        return new $tab__Rect(0, 0, 0, 0);
      }
      return new $tab__Rect(left, top, right - left, bottom - top);
    }
  });
  ////////////////////////////////////////////////////////////////////////////////
  // Tableau.JavaScript.Vql.ApiShared.TableauException
  var $tab__TableauException = global.tab._TableauException = ss.mkType($asm, 'tab._TableauException', null, null, {
    create: function TableauException$Create(id, message) {
      var x = new ss.Exception(message);
      x['tableauSoftwareErrorCode'] = id;
      return x;
    },
    createInternalError: function TableauException$CreateInternalError(details) {
      if (ss.isValue(details)) {
        return $tab__TableauException.create('internalError', 'Internal error. Please contact Tableau support with the following information: ' + details);
      } else {
        return $tab__TableauException.create('internalError', 'Internal error. Please contact Tableau support');
      }
    },
    createInternalNullArgumentException: function TableauException$CreateInternalNullArgumentException(argumentName) {
      return $tab__TableauException.createInternalError("Null/undefined argument '" + argumentName + "'.");
    },
    createInternalStringArgumentException: function TableauException$CreateInternalStringArgumentException(argumentName) {
      return $tab__TableauException.createInternalError("Invalid string argument '" + argumentName + "'.");
    },
    createMaxCharStringArgumentException: function TableauException$CreateMaxCharStringArgumentException(argumentName, maxChars) {
      return $tab__TableauException.createInternalError("Argument '" + argumentName + "' exceeds char limit of '" + maxChars + "'.");
    },
    createServerError: function TableauException$CreateServerError(message) {
      return $tab__TableauException.create('serverError', message);
    },
    createNotActiveSheet: function TableauException$CreateNotActiveSheet() {
      return $tab__TableauException.create('notActiveSheet', 'Operation not allowed on non-active sheet');
    },
    createInvalidCustomViewName: function TableauException$CreateInvalidCustomViewName(customViewName) {
      return $tab__TableauException.create('invalidCustomViewName', 'Invalid custom view name: ' + customViewName);
    },
    createInvalidParameter: function TableauException$CreateInvalidParameter(paramName) {
      return $tab__TableauException.create('invalidParameter', 'Invalid parameter: ' + paramName);
    },
    createInvalidFilterFieldNameOrValue: function TableauException$CreateInvalidFilterFieldNameOrValue(fieldName) {
      return $tab__TableauException.create('invalidFilterFieldNameOrValue', 'Invalid filter field name or value: ' + fieldName);
    },
    createInvalidDateParameter: function TableauException$CreateInvalidDateParameter(paramName) {
      return $tab__TableauException.create('invalidDateParameter', 'Invalid date parameter: ' + paramName);
    },
    createNullOrEmptyParameter: function TableauException$CreateNullOrEmptyParameter(paramName) {
      return $tab__TableauException.create('nullOrEmptyParameter', 'Parameter cannot be null or empty: ' + paramName);
    },
    createMissingMaxSize: function TableauException$CreateMissingMaxSize() {
      return $tab__TableauException.create('missingMaxSize', 'Missing maxSize for SheetSizeBehavior.ATMOST');
    },
    createMissingMinSize: function TableauException$CreateMissingMinSize() {
      return $tab__TableauException.create('missingMinSize', 'Missing minSize for SheetSizeBehavior.ATLEAST');
    },
    createMissingMinMaxSize: function TableauException$CreateMissingMinMaxSize() {
      return $tab__TableauException.create('missingMinMaxSize', 'Missing minSize or maxSize for SheetSizeBehavior.RANGE');
    },
    createInvalidRangeSize: function TableauException$CreateInvalidRangeSize() {
      return $tab__TableauException.create('invalidSize', 'Missing minSize or maxSize for SheetSizeBehavior.RANGE');
    },
    createInvalidSizeValue: function TableauException$CreateInvalidSizeValue() {
      return $tab__TableauException.create('invalidSize', 'Size value cannot be less than zero');
    },
    createInvalidSheetSizeParam: function TableauException$CreateInvalidSheetSizeParam() {
      return $tab__TableauException.create('invalidSize', 'Invalid sheet size parameter');
    },
    createSizeConflictForExactly: function TableauException$CreateSizeConflictForExactly() {
      return $tab__TableauException.create('invalidSize', 'Conflicting size values for SheetSizeBehavior.EXACTLY');
    },
    createInvalidSizeBehaviorOnWorksheet: function TableauException$CreateInvalidSizeBehaviorOnWorksheet() {
      return $tab__TableauException.create('invalidSizeBehaviorOnWorksheet', 'Only SheetSizeBehavior.AUTOMATIC is allowed on Worksheets');
    },
    createNoUrlForHiddenWorksheet: function TableauException$CreateNoUrlForHiddenWorksheet() {
      return $tab__TableauException.create('noUrlForHiddenWorksheet', 'Hidden worksheets do not have a URL.');
    },
    createInvalidAggregationFieldName: function TableauException$CreateInvalidAggregationFieldName(fieldName) {
      return $tab__TableauException.create('invalidAggregationFieldName', "Invalid aggregation type for field '" + fieldName + "'");
    },
    createInvalidToolbarButtonName: function TableauException$CreateInvalidToolbarButtonName(buttonName) {
      return $tab__TableauException.create('invalidToolbarButtonName', "Invalid toolbar button name: '" + buttonName + "'");
    },
    createIndexOutOfRange: function TableauException$CreateIndexOutOfRange(index) {
      return $tab__TableauException.create('indexOutOfRange', "Index '" + index + "' is out of range.");
    },
    createUnsupportedEventName: function TableauException$CreateUnsupportedEventName(eventName) {
      return $tab__TableauException.create('unsupportedEventName', "Unsupported event '" + eventName + "'.");
    },
    createBrowserNotCapable: function TableauException$CreateBrowserNotCapable() {
      return $tab__TableauException.create('browserNotCapable', 'This browser is incapable of supporting the Tableau JavaScript API.');
    }
  });
  ////////////////////////////////////////////////////////////////////////////////
  // Tableau.JavaScript.Vql.ApiShared.Utility
  var $tab__Utility = global.tab._Utility = ss.mkType($asm, 'tab._Utility', null, null, {
    isNullOrEmpty: function Utility$IsNullOrEmpty(value) {
      return ss.isNullOrUndefined(value) || (value['length'] || 0) <= 0;
    },
    isString: function Utility$IsString(value) {
      return typeof value === 'string';
    },
    isNumber: function Utility$IsNumber(value) {
      return typeof value === 'number';
    },
    isDate: function Utility$IsDate(value) {
      if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' && ss.isInstanceOfType(value, ss.JsDate)) {
        return true;
      } else if (Object.prototype.toString.call(value) !== '[object Date]') {
        return false;
      }
      return !isNaN(ss.cast(value, ss.JsDate).getTime());
    },
    isDateValid: function Utility$IsDateValid(dt) {
      return !isNaN(dt.getTime());
    },
    indexOf: function Utility$IndexOf(array, searchElement, fromIndex) {
      if (ss.isValue(Array.prototype['indexOf'])) {
        return ss.unbox(ss.cast(array['indexOf'](searchElement, fromIndex), ss.Int32));
      }
      fromIndex = fromIndex || 0;
      var length = array.length;
      if (length > 0) {
        for (var index = fromIndex; index < length; index++) {
          if (ss.referenceEquals(array[index], searchElement)) {
            return index;
          }
        }
      }
      return -1;
    },
    contains: function Utility$Contains(array, searchElement, fromIndex) {
      var index = $tab__Utility.indexOf(array, searchElement, fromIndex);
      return index >= 0;
    },
    getTopmostWindow: function Utility$GetTopmostWindow() {
      var win = window.self;
      while (ss.isValue(win.parent) && !ss.referenceEquals(win.parent, win)) {
        win = win.parent;
      }
      return win;
    },
    toInt: function Utility$ToInt(value) {
      if ($tab__Utility.isNumber(value)) {
        return ss.trunc(value);
      }
      var number = parseInt(value.toString(), 10);
      if (isNaN(number)) {
        return 0;
      }
      return number;
    },
    hasClass: function Utility$HasClass(element, className) {
      var regexClass = new RegExp('[\\n\\t\\r]', 'g');
      return ss.isValue(element) && (' ' + element.className + ' ').replace(regexClass, ' ').indexOf(' ' + className + ' ') > -1;
    },
    findParentWithClassName: function Utility$FindParentWithClassName(element, className, stopAtElement) {
      var parent = ss.isValue(element) ? ss.cast(element.parentNode, HTMLElement) : null;
      stopAtElement = stopAtElement || document.body;
      while (ss.isValue(parent)) {
        if ($tab__Utility.hasClass(parent, className)) {
          return parent;
        }
        if (ss.referenceEquals(parent, stopAtElement)) {
          parent = null;
        } else {
          parent = ss.cast(parent.parentNode, HTMLElement);
        }
      }
      return parent;
    },
    hasJsonParse: function Utility$HasJsonParse() {
      return !!(ss.isValue(JSON) && ss.isValue(JSON.parse));
    },
    hasWindowPostMessage: function Utility$HasWindowPostMessage() {
      return !!ss.isValue(window.postMessage);
    },
    isPostMessageSynchronous: function Utility$IsPostMessageSynchronous() {
      if ($tab__Utility.isIE()) {
        var msieRegEx = new RegExp('(msie) ([\\w.]+)');
        var matches = msieRegEx.exec(window.navigator.userAgent.toLowerCase());
        var versionStr = matches[2] || '0';
        var version = parseInt(versionStr, 10);
        return version <= 8;
      }
      return false;
    },
    hasDocumentAttachEvent: function Utility$HasDocumentAttachEvent() {
      return !!ss.isValue(document.attachEvent);
    },
    hasWindowAddEventListener: function Utility$HasWindowAddEventListener() {
      return !!ss.isValue(window.addEventListener);
    },
    isElementOfTag: function Utility$IsElementOfTag(element, tagName) {
      return ss.isValue(element) && element.nodeType === 1 && ss.referenceEquals(element.tagName.toLowerCase(), tagName.toLowerCase());
    },
    elementToString: function Utility$ElementToString(element) {
      var str = new ss.StringBuilder();
      str.append(element.tagName.toLowerCase());
      if (!$tab__Utility.isNullOrEmpty(element.id)) {
        str.append('#').append(element.id);
      }
      if (!$tab__Utility.isNullOrEmpty(element.className)) {
        var classes = element.className.split(' ');
        str.append('.').append(classes.join('.'));
      }
      return str.toString();
    },
    tableauGCS: function Utility$TableauGCS(e) {
      if (typeof window['getComputedStyle'] === 'function') {
        return window.getComputedStyle(e);
      } else {
        return e['currentStyle'];
      }
    },
    isIE: function Utility$IsIE() {
      return !!(window.navigator.userAgent.indexOf('MSIE') > -1 && ss.isNullOrUndefined(window.opera));
    },
    isSafari: function Utility$IsSafari() {
      var ua = window.navigator.userAgent;
      var isChrome = ua.indexOf('Chrome') >= 0;
      return ua.indexOf('Safari') >= 0 && !isChrome;
    },
    mobileDetect: function Utility$MobileDetect() {
      var ua = window.navigator.userAgent;
      if (ua.indexOf('iPad') !== -1) {
        return true;
      }
      if (ua.indexOf('Android') !== -1) {
        return true;
      }
      if (ua.indexOf('AppleWebKit') !== -1 && ua.indexOf('Mobile') !== -1) {
        return true;
      }
      return false;
    },
    visibleContentRectInDocumentCoordinates: function Utility$VisibleContentRectInDocumentCoordinates(element) {
      var visibleRect = $tab__Utility.contentRectInDocumentCoordinates(element);
      for (var currentElement = element.parentElement; ss.isValue(currentElement) && ss.isValue(currentElement.parentElement); currentElement = currentElement.parentElement) {
        var overflow = $tab__Utility.$getComputedStyle(currentElement).overflow;
        if (overflow === 'auto' || overflow === 'scroll' || overflow === 'hidden') {
          visibleRect = visibleRect.intersect($tab__Utility.contentRectInDocumentCoordinates(currentElement));
        }
      }
      var viewportRect = $tab__Utility.$getViewportRect();
      return visibleRect.intersect(viewportRect);
    },
    getVisualViewportRect: function Utility$GetVisualViewportRect(window) {
      var visualViewport = window.visualViewport;
      if (ss.isValue(visualViewport)) {
        return new $tab__Rect(ss.trunc(visualViewport.pageLeft), ss.trunc(visualViewport.pageTop), ss.trunc(visualViewport.width), ss.trunc(visualViewport.height));
      } else {
        return null;
      }
    },
    $getViewportRect: function Utility$GetViewportRect() {
      var visualViewportRect = $tab__Utility.getVisualViewportRect(window.self);
      if (ss.isValue(visualViewportRect)) {
        return visualViewportRect;
      } else {
        var viewportRect = $tab__Utility.contentRectInDocumentCoordinates(document.documentElement);
        var win = new tab.WindowHelper(window.self);
        if (win.isQuirksMode()) {
          viewportRect.height = document.body.clientHeight - viewportRect.left;
          viewportRect.width = document.body.clientWidth - viewportRect.top;
        }
        viewportRect.left += win.get_pageXOffset();
        viewportRect.top += win.get_pageYOffset();
        return viewportRect;
      }
    },
    contentRectInDocumentCoordinates: function Utility$ContentRectInDocumentCoordinates(element) {
      var boundingClientRect = $tab__Utility.getBoundingClientRect(element);
      var style = $tab__Utility.$getComputedStyle(element);
      var paddingLeft = $tab__Utility.toInt(style.paddingLeft);
      var paddingTop = $tab__Utility.toInt(style.paddingTop);
      var borderLeft = $tab__Utility.toInt(style.borderLeftWidth);
      var borderTop = $tab__Utility.toInt(style.borderTopWidth);
      var contentSize = $tab__Utility.computeContentSize(element);
      var win = new tab.WindowHelper(window.self);
      var left = boundingClientRect.left + paddingLeft + borderLeft + win.get_pageXOffset();
      var top = boundingClientRect.top + paddingTop + borderTop + win.get_pageYOffset();
      return new $tab__Rect(left, top, contentSize.width, contentSize.height);
    },
    getBoundingClientRect: function Utility$GetBoundingClientRect(element) {
      var rect = element.getBoundingClientRect();
      var top = ss.trunc(rect.top);
      var left = ss.trunc(rect.left);
      var right = ss.trunc(rect.right);
      var bottom = ss.trunc(rect.bottom);
      return new $tab__Rect(left, top, right - left, bottom - top);
    },
    convertRawValue: function Utility$ConvertRawValue(rawValue, dataType) {
      if (ss.isNullOrUndefined(rawValue)) {
        return null;
      }
      switch (dataType) {
        case 'bool':
          {
            return rawValue;
          }
        case 'date':
        case 'number':
          {
            if (ss.isNullOrUndefined(rawValue)) {
              return Number.NaN;
            }
            return rawValue;
          }
        default:
        case 'string':
          {
            return rawValue;
          }
      }
    },
    getDataValue: function Utility$GetDataValue(dv) {
      if (ss.isNullOrUndefined(dv)) {
        return $tab_DataValue.$ctor(null, null, null);
      }
      return $tab_DataValue.$ctor($tab__Utility.convertRawValue(dv.value, dv.type), dv.formattedValue, dv.aliasedValue);
    },
    serializeDateForServer: function Utility$SerializeDateForServer(date) {
      var serializedDate = '';
      if (ss.isValue(date) && $tab__Utility.isDate(date)) {
        var year = date.getUTCFullYear();
        var month = date.getUTCMonth() + 1;
        var day = date.getUTCDate();
        var hh = date.getUTCHours();
        var mm = date.getUTCMinutes();
        var sec = date.getUTCSeconds();
        serializedDate = year + '-' + month + '-' + day + ' ' + hh + ':' + mm + ':' + sec;
      }
      return serializedDate;
    },
    computeContentSize: function Utility$ComputeContentSize(element) {
      var style = $tab__Utility.$getComputedStyle(element);
      var paddingLeft = parseFloat(style.paddingLeft);
      var paddingTop = parseFloat(style.paddingTop);
      var paddingRight = parseFloat(style.paddingRight);
      var paddingBottom = parseFloat(style.paddingBottom);
      var width = element.clientWidth - Math.round(paddingLeft + paddingRight);
      var height = element.clientHeight - Math.round(paddingTop + paddingBottom);
      return $tab_Size.$ctor(width, height);
    },
    $getComputedStyle: function Utility$GetComputedStyle(element) {
      if (typeof window['getComputedStyle'] === 'function') {
        if (ss.isValue(element.ownerDocument.defaultView.opener)) {
          return element.ownerDocument.defaultView.getComputedStyle(element);
        }
        return window.getComputedStyle(element);
      } else if (ss.isValue(element['currentStyle'])) {
        return element['currentStyle'];
      }
      return element.style;
    },
    roundVizSizeInPixels: function Utility$RoundVizSizeInPixels(size) {
      if (ss.isNullOrUndefined(size) || !(size.indexOf('px') !== -1)) {
        return size;
      }
      var sizeValue = parseFloat(size.split('px')[0]);
      return Math.round(sizeValue) + 'px';
    },
    noResultPromiseHelper: function Utility$NoResultPromiseHelper(commandName, cmdParams, messagingOptions) {
      var deferred = new tab._Deferred();
      var returnHandler = new (ss.makeGenericType($tab_CommandReturnHandler$1, [Object]))(commandName, 1, function (result) {
        deferred.resolve();
      }, function (remoteError, message) {
        deferred.reject($tab__TableauException.createServerError(message));
      });
      messagingOptions.sendCommand(Object).call(messagingOptions, cmdParams, returnHandler);
      return deferred.get_promise();
    },
    clone: function clone(T) {
      return function Utility$Clone(src) {
        return JSON.parse(JSON.stringify(src));
      };
    }
  });
  ////////////////////////////////////////////////////////////////////////////////
  // Tableau.JavaScript.Vql.ApiShared.DeferredUtil
  var $tab_$DeferredUtil = ss.mkType($asm, 'tab.$DeferredUtil', null, null, {
    $coerceToTrustedPromise: function DeferredUtil$CoerceToTrustedPromise(promiseOrValue) {
      var promise;
      if (promiseOrValue instanceof tableauSoftware.Promise) {
        promise = ss.cast(promiseOrValue, $tab__PromiseImpl);
      } else {
        if (ss.isValue(promiseOrValue) && typeof promiseOrValue['valueOf'] === 'function') {
          promiseOrValue = promiseOrValue['valueOf']();
        }
        if ($tab_$DeferredUtil.$isPromise(promiseOrValue)) {
          var deferred = new $tab__DeferredImpl();
          ss.cast(promiseOrValue, $tab__PromiseImpl).then(ss.mkdel(deferred, deferred.resolve), ss.mkdel(deferred, deferred.reject));
          promise = deferred.get_promise();
        } else {
          promise = $tab_$DeferredUtil.$resolved(promiseOrValue);
        }
      }
      return promise;
    },
    $reject: function DeferredUtil$Reject(promiseOrValue) {
      return $tab_$DeferredUtil.$coerceToTrustedPromise(promiseOrValue).then(function (value) {
        return $tab_$DeferredUtil.$rejected(ss.cast(value, ss.Exception));
      }, null);
    },
    $resolved: function DeferredUtil$Resolved(value) {
      var p = new $tab__PromiseImpl(function (callback, errback) {
        try {
          return $tab_$DeferredUtil.$coerceToTrustedPromise(ss.isValue(callback) ? callback(value) : value);
        } catch ($t1) {
          var e = ss.Exception.wrap($t1);
          return $tab_$DeferredUtil.$rejected(e);
        }
      });
      return p;
    },
    $rejected: function DeferredUtil$Rejected(reason) {
      var p = new $tab__PromiseImpl(function (callback, errback) {
        try {
          return ss.isValue(errback) ? $tab_$DeferredUtil.$coerceToTrustedPromise(errback(reason)) : $tab_$DeferredUtil.$rejected(reason);
        } catch ($t1) {
          var e = ss.Exception.wrap($t1);
          return $tab_$DeferredUtil.$rejected(e);
        }
      });
      return p;
    },
    $isPromise: function DeferredUtil$IsPromise(promiseOrValue) {
      return ss.isValue(promiseOrValue) && typeof promiseOrValue['then'] === 'function';
    }
  });
  ////////////////////////////////////////////////////////////////////////////////
  // Tableau.JavaScript.Vql.ApiShared.DoNothingCrossDomainHandler
  var $tab_$DoNothingCrossDomainHandler = ss.mkType($asm, 'tab.$DoNothingCrossDomainHandler', function () {
    this.$hostId = null;
    this.$1$StateReadyForQueryField = null;
  }, {
    add_stateReadyForQuery: function DoNothingCrossDomainHandler$add_StateReadyForQuery(value) {
      this.$1$StateReadyForQueryField = ss.delegateCombine(this.$1$StateReadyForQueryField, value);
    },
    remove_stateReadyForQuery: function DoNothingCrossDomainHandler$remove_StateReadyForQuery(value) {
      this.$1$StateReadyForQueryField = ss.delegateRemove(this.$1$StateReadyForQueryField, value);
    },
    get_iframe: function DoNothingCrossDomainHandler$get_Iframe() {
      return null;
    },
    get_hostId: function DoNothingCrossDomainHandler$get_HostId() {
      return this.$hostId;
    },
    set_hostId: function DoNothingCrossDomainHandler$set_HostId(value) {
      this.$hostId = value;
    },
    get_$serverRoot: function DoNothingCrossDomainHandler$get_ServerRoot() {
      return '*';
    },
    handleEventNotification: function DoNothingCrossDomainHandler$HandleEventNotification(eventName, parameters) {},
    $silenceTheCompilerWarning: function DoNothingCrossDomainHandler$SilenceTheCompilerWarning() {
      this.$1$StateReadyForQueryField(null);
    }
  });
  ////////////////////////////////////////////////////////////////////////////////
  // tableauSoftware.ApiDashboardObjectType
  var $tab_ApiDashboardObjectType = global.tab.ApiDashboardObjectType = ss.mkEnum($asm, 'tab.ApiDashboardObjectType', { blank: 'blank', worksheet: 'worksheet', quickFilter: 'quickFilter', parameterControl: 'parameterControl', pageFilter: 'pageFilter', legend: 'legend', title: 'title', text: 'text', image: 'image', webPage: 'webPage', addIn: 'addIn' }, true);
  ////////////////////////////////////////////////////////////////////////////////
  // tableauSoftware.ApiDateRangeType
  var $tab_ApiDateRangeType = global.tab.ApiDateRangeType = ss.mkEnum($asm, 'tab.ApiDateRangeType', { last: 'last', lastn: 'lastn', next: 'next', nextn: 'nextn', curr: 'curr', todate: 'todate' }, true);
  ////////////////////////////////////////////////////////////////////////////////
  // tableauSoftware.ApiDeviceType
  var $tab_ApiDeviceType = global.tab.ApiDeviceType = ss.mkEnum($asm, 'tab.ApiDeviceType', { default: 'default', desktop: 'desktop', tablet: 'tablet', phone: 'phone' }, true);
  ////////////////////////////////////////////////////////////////////////////////
  // Tableau.JavaScript.Vql.ApiShared.ApiEnumConverter
  var $tab_ApiEnumConverter = global.tab.ApiEnumConverter = ss.mkType($asm, 'tab.ApiEnumConverter', null, null, {
    convertDashboardObjectType: function ApiEnumConverter$ConvertDashboardObjectType(crossDomainType) {
      switch (crossDomainType) {
        case 'blank':
          {
            return 'blank';
          }
        case 'image':
          {
            return 'image';
          }
        case 'legend':
          {
            return 'legend';
          }
        case 'pageFilter':
          {
            return 'pageFilter';
          }
        case 'parameterControl':
          {
            return 'parameterControl';
          }
        case 'quickFilter':
          {
            return 'quickFilter';
          }
        case 'text':
          {
            return 'text';
          }
        case 'title':
          {
            return 'title';
          }
        case 'webPage':
          {
            return 'webPage';
          }
        case 'worksheet':
          {
            return 'worksheet';
          }
        default:
          {
            throw $tab__TableauException.createInternalError('Unknown ApiCrossDomainDashboardObjectType: ' + crossDomainType);
          }
      }
    },
    convertDateRange: function ApiEnumConverter$ConvertDateRange(crossDomainType) {
      switch (crossDomainType) {
        case 'curr':
          {
            return 'curr';
          }
        case 'last':
          {
            return 'last';
          }
        case 'lastn':
          {
            return 'lastn';
          }
        case 'next':
          {
            return 'next';
          }
        case 'nextn':
          {
            return 'nextn';
          }
        case 'todate':
          {
            return 'todate';
          }
        default:
          {
            throw $tab__TableauException.createInternalError('Unknown ApiCrossDomainDateRangeType: ' + crossDomainType);
          }
      }
    },
    convertFieldAggregation: function ApiEnumConverter$ConvertFieldAggregation(crossDomainType) {
      switch (crossDomainType) {
        case 'ATTR':
          {
            return 'ATTR';
          }
        case 'AVG':
          {
            return 'AVG';
          }
        case 'COLLECT':
          {
            return 'COLLECT';
          }
        case 'COUNT':
          {
            return 'COUNT';
          }
        case 'COUNTD':
          {
            return 'COUNTD';
          }
        case 'DAY':
          {
            return 'DAY';
          }
        case 'END':
          {
            return 'END';
          }
        case 'HOUR':
          {
            return 'HOUR';
          }
        case 'INOUT':
          {
            return 'INOUT';
          }
        case 'KURTOSIS':
          {
            return 'KURTOSIS';
          }
        case 'MAX':
          {
            return 'MAX';
          }
        case 'MDY':
          {
            return 'MDY';
          }
        case 'MEDIAN':
          {
            return 'MEDIAN';
          }
        case 'MIN':
          {
            return 'MIN';
          }
        case 'MINUTE':
          {
            return 'MINUTE';
          }
        case 'MONTH':
          {
            return 'MONTH';
          }
        case 'MONTHYEAR':
          {
            return 'MONTHYEAR';
          }
        case 'NONE':
          {
            return 'NONE';
          }
        case 'PERCENTILE':
          {
            return 'PERCENTILE';
          }
        case 'QUART1':
          {
            return 'QUART1';
          }
        case 'QUART3':
          {
            return 'QUART3';
          }
        case 'QTR':
          {
            return 'QTR';
          }
        case 'SECOND':
          {
            return 'SECOND';
          }
        case 'SKEWNESS':
          {
            return 'SKEWNESS';
          }
        case 'STDEV':
          {
            return 'STDEV';
          }
        case 'STDEVP':
          {
            return 'STDEVP';
          }
        case 'SUM':
          {
            return 'SUM';
          }
        case 'SUM_XSQR':
          {
            return 'SUM_XSQR';
          }
        case 'TRUNC_DAY':
          {
            return 'TRUNC_DAY';
          }
        case 'TRUNC_HOUR':
          {
            return 'TRUNC_HOUR';
          }
        case 'TRUNC_MINUTE':
          {
            return 'TRUNC_MINUTE';
          }
        case 'TRUNC_MONTH':
          {
            return 'TRUNC_MONTH';
          }
        case 'TRUNC_QTR':
          {
            return 'TRUNC_QTR';
          }
        case 'TRUNC_SECOND':
          {
            return 'TRUNC_SECOND';
          }
        case 'TRUNC_WEEK':
          {
            return 'TRUNC_WEEK';
          }
        case 'TRUNC_YEAR':
          {
            return 'TRUNC_YEAR';
          }
        case 'USER':
          {
            return 'USER';
          }
        case 'VAR':
          {
            return 'VAR';
          }
        case 'VARP':
          {
            return 'VARP';
          }
        case 'WEEK':
          {
            return 'WEEK';
          }
        case 'WEEKDAY':
          {
            return 'WEEKDAY';
          }
        case 'YEAR':
          {
            return 'YEAR';
          }
        default:
          {
            throw $tab__TableauException.createInternalError('Unknown ApiCrossDomainFieldAggregationType: ' + crossDomainType);
          }
      }
    },
    convertFieldRole: function ApiEnumConverter$ConvertFieldRole(crossDomainType) {
      switch (crossDomainType) {
        case 'dimension':
          {
            return 'dimension';
          }
        case 'measure':
          {
            return 'measure';
          }
        case 'unknown':
          {
            return 'unknown';
          }
        default:
          {
            throw $tab__TableauException.createInternalError('Unknown ApiCrossDomainFieldRoleType: ' + crossDomainType);
          }
      }
    },
    convertFilterType: function ApiEnumConverter$ConvertFilterType(crossDomainType) {
      switch (crossDomainType) {
        case 'categorical':
          {
            return 'categorical';
          }
        case 'hierarchical':
          {
            return 'hierarchical';
          }
        case 'quantitative':
          {
            return 'quantitative';
          }
        case 'relativedate':
          {
            return 'relativedate';
          }
        default:
          {
            throw $tab__TableauException.createInternalError('Unknown ApiCrossDomainFilterType: ' + crossDomainType);
          }
      }
    },
    convertParameterAllowableValuesType: function ApiEnumConverter$ConvertParameterAllowableValuesType(crossDomainType) {
      switch (crossDomainType) {
        case 'all':
          {
            return 'all';
          }
        case 'list':
          {
            return 'list';
          }
        case 'range':
          {
            return 'range';
          }
        default:
          {
            throw $tab__TableauException.createInternalError('Unknown ApiCrossDomainParameterAllowableValuesType: ' + crossDomainType);
          }
      }
    },
    convertParameterDataType: function ApiEnumConverter$ConvertParameterDataType(crossDomainType) {
      switch (crossDomainType) {
        case 'boolean':
          {
            return 'boolean';
          }
        case 'date':
          {
            return 'date';
          }
        case 'datetime':
          {
            return 'datetime';
          }
        case 'float':
          {
            return 'float';
          }
        case 'integer':
          {
            return 'integer';
          }
        case 'string':
          {
            return 'string';
          }
        default:
          {
            throw $tab__TableauException.createInternalError('Unknown ApiCrossDomainParameterDataType: ' + crossDomainType);
          }
      }
    },
    convertPeriodType: function ApiEnumConverter$ConvertPeriodType(crossDomainType) {
      switch (crossDomainType) {
        case 'year':
          {
            return 'year';
          }
        case 'quarter':
          {
            return 'quarter';
          }
        case 'month':
          {
            return 'month';
          }
        case 'week':
          {
            return 'week';
          }
        case 'day':
          {
            return 'day';
          }
        case 'hour':
          {
            return 'hour';
          }
        case 'minute':
          {
            return 'minute';
          }
        case 'second':
          {
            return 'second';
          }
        default:
          {
            throw $tab__TableauException.createInternalError('Unknown ApiCrossDomainPeriodType: ' + crossDomainType);
          }
      }
    },
    convertSheetType: function ApiEnumConverter$ConvertSheetType(crossDomainType) {
      switch (crossDomainType) {
        case 'worksheet':
          {
            return 'worksheet';
          }
        case 'dashboard':
          {
            return 'dashboard';
          }
        case 'story':
          {
            return 'story';
          }
        default:
          {
            throw $tab__TableauException.createInternalError('Unknown ApiCrossDomainSheetType: ' + crossDomainType);
          }
      }
    },
    convertDataType: function ApiEnumConverter$ConvertDataType(crossDomainType) {
      switch (crossDomainType) {
        case 'boolean':
          {
            return 'boolean';
          }
        case 'date':
          {
            return 'date';
          }
        case 'datetime':
          {
            return 'datetime';
          }
        case 'float':
          {
            return 'float';
          }
        case 'integer':
          {
            return 'integer';
          }
        case 'string':
          {
            return 'string';
          }
        default:
          {
            throw $tab__TableauException.createInternalError('Unknown ApiCrossDomainParameterDataType: ' + crossDomainType);
          }
      }
    }
  });
  ////////////////////////////////////////////////////////////////////////////////
  // tableauSoftware.ApiErrorCode
  var $tab_ApiErrorCode = global.tab.ApiErrorCode = ss.mkEnum($asm, 'tab.ApiErrorCode', { internalError: 'internalError', serverError: 'serverError', invalidAggregationFieldName: 'invalidAggregationFieldName', invalidToolbarButtonName: 'invalidToolbarButtonName', invalidParameter: 'invalidParameter', invalidUrl: 'invalidUrl', staleDataReference: 'staleDataReference', vizAlreadyInManager: 'vizAlreadyInManager', noUrlOrParentElementNotFound: 'noUrlOrParentElementNotFound', invalidFilterFieldName: 'invalidFilterFieldName', invalidFilterFieldValue: 'invalidFilterFieldValue', invalidFilterFieldNameOrValue: 'invalidFilterFieldNameOrValue', filterCannotBePerformed: 'filterCannotBePerformed', notActiveSheet: 'notActiveSheet', invalidCustomViewName: 'invalidCustomViewName', missingRangeNForRelativeDateFilters: 'missingRangeNForRelativeDateFilters', missingMaxSize: 'missingMaxSize', missingMinSize: 'missingMinSize', missingMinMaxSize: 'missingMinMaxSize', invalidSize: 'invalidSize', invalidSizeBehaviorOnWorksheet: 'invalidSizeBehaviorOnWorksheet', sheetNotInWorkbook: 'sheetNotInWorkbook', indexOutOfRange: 'indexOutOfRange', downloadWorkbookNotAllowed: 'downloadWorkbookNotAllowed', nullOrEmptyParameter: 'nullOrEmptyParameter', browserNotCapable: 'browserNotCapable', unsupportedEventName: 'unsupportedEventName', invalidDateParameter: 'invalidDateParameter', invalidSelectionFieldName: 'invalidSelectionFieldName', invalidSelectionValue: 'invalidSelectionValue', invalidSelectionDate: 'invalidSelectionDate', noUrlForHiddenWorksheet: 'noUrlForHiddenWorksheet', maxVizResizeAttempts: 'maxVizResizeAttempts' }, true);
  ////////////////////////////////////////////////////////////////////////////////
  // tableauSoftware.ApiFieldAggregationType
  var $tab_ApiFieldAggregationType = global.tab.ApiFieldAggregationType = ss.mkEnum($asm, 'tab.ApiFieldAggregationType', { SUM: 'SUM', AVG: 'AVG', MIN: 'MIN', MAX: 'MAX', STDEV: 'STDEV', STDEVP: 'STDEVP', VAR: 'VAR', VARP: 'VARP', COUNT: 'COUNT', COUNTD: 'COUNTD', MEDIAN: 'MEDIAN', ATTR: 'ATTR', NONE: 'NONE', PERCENTILE: 'PERCENTILE', YEAR: 'YEAR', QTR: 'QTR', MONTH: 'MONTH', DAY: 'DAY', HOUR: 'HOUR', MINUTE: 'MINUTE', SECOND: 'SECOND', WEEK: 'WEEK', WEEKDAY: 'WEEKDAY', MONTHYEAR: 'MONTHYEAR', MDY: 'MDY', END: 'END', TRUNC_YEAR: 'TRUNC_YEAR', TRUNC_QTR: 'TRUNC_QTR', TRUNC_MONTH: 'TRUNC_MONTH', TRUNC_WEEK: 'TRUNC_WEEK', TRUNC_DAY: 'TRUNC_DAY', TRUNC_HOUR: 'TRUNC_HOUR', TRUNC_MINUTE: 'TRUNC_MINUTE', TRUNC_SECOND: 'TRUNC_SECOND', QUART1: 'QUART1', QUART3: 'QUART3', SKEWNESS: 'SKEWNESS', KURTOSIS: 'KURTOSIS', INOUT: 'INOUT', SUM_XSQR: 'SUM_XSQR', USER: 'USER', COLLECT: 'COLLECT' }, true);
  ////////////////////////////////////////////////////////////////////////////////
  // tableauSoftware.ApiFieldRoleType
  var $tab_ApiFieldRoleType = global.tab.ApiFieldRoleType = ss.mkEnum($asm, 'tab.ApiFieldRoleType', { dimension: 'dimension', measure: 'measure', unknown: 'unknown' }, true);
  ////////////////////////////////////////////////////////////////////////////////
  // tableauSoftware.ApiFilterType
  var $tab_ApiFilterType = global.tab.ApiFilterType = ss.mkEnum($asm, 'tab.ApiFilterType', { categorical: 'categorical', quantitative: 'quantitative', hierarchical: 'hierarchical', relativedate: 'relativedate' }, true);
  ////////////////////////////////////////////////////////////////////////////////
  // tableauSoftware.ApiFilterUpdateType
  var $tab_ApiFilterUpdateType = global.tab.ApiFilterUpdateType = ss.mkEnum($asm, 'tab.ApiFilterUpdateType', { all: 'all', replace: 'replace', add: 'add', remove: 'remove' }, true);
  ////////////////////////////////////////////////////////////////////////////////
  // tableauSoftware.ApiMenuType
  var $tab_ApiMenuType = global.tab.ApiMenuType = ss.mkEnum($asm, 'tab.ApiMenuType', { ubertip: 'ubertip' }, true);
  ////////////////////////////////////////////////////////////////////////////////
  // Tableau.JavaScript.Vql.ApiShared.ApiMessageHandler
  var $tab_ApiMessageHandler = global.tab.ApiMessageHandler = ss.mkType($asm, 'tab.ApiMessageHandler', function () {}, {
    handleEventNotification: function ApiMessageHandler$HandleEventNotification(eventName, eventParameters) {
      throw new ss.NotImplementedException();
    }
  });
  ////////////////////////////////////////////////////////////////////////////////
  // Tableau.JavaScript.Vql.ApiShared.ApiMessagingOptions
  var $tab_ApiMessagingOptions = global.tab.ApiMessagingOptions = ss.mkType($asm, 'tab.ApiMessagingOptions', function (router, handler) {
    this.$router = null;
    this.$handler = null;
    $tab__Param.verifyValue(router, 'router');
    this.$router = router;
    this.$handler = handler;
  }, {
    get_handler: function ApiMessagingOptions$get_Handler() {
      return this.$handler;
    },
    get_router: function ApiMessagingOptions$get_Router() {
      return this.$router;
    },
    sendCommand: function sendCommand(T) {
      return function ApiMessagingOptions$SendCommand(commandParameters, returnHandler) {
        this.$router.sendCommand(T).call(this.$router, this.$handler, commandParameters, returnHandler);
      };
    },
    dispose: function ApiMessagingOptions$Dispose() {
      this.$router.unregisterHandler(this.$handler);
    }
  });
  ////////////////////////////////////////////////////////////////////////////////
  // tableauSoftware.ApiNullOption
  var $tab_ApiNullOption = global.tab.ApiNullOption = ss.mkEnum($asm, 'tab.ApiNullOption', { nullValues: 'nullValues', nonNullValues: 'nonNullValues', allValues: 'allValues' }, true);
  ////////////////////////////////////////////////////////////////////////////////
  // tableauSoftware.ApiParameterAllowableValuesType
  var $tab_ApiParameterAllowableValuesType = global.tab.ApiParameterAllowableValuesType = ss.mkEnum($asm, 'tab.ApiParameterAllowableValuesType', { all: 'all', list: 'list', range: 'range' }, true);
  ////////////////////////////////////////////////////////////////////////////////
  // tableauSoftware.ApiParameterDataType
  var $tab_ApiParameterDataType = global.tab.ApiParameterDataType = ss.mkEnum($asm, 'tab.ApiParameterDataType', { float: 'float', integer: 'integer', string: 'string', boolean: 'boolean', date: 'date', datetime: 'datetime' }, true);
  ////////////////////////////////////////////////////////////////////////////////
  // tableauSoftware.ApiPeriodType
  var $tab_ApiPeriodType = global.tab.ApiPeriodType = ss.mkEnum($asm, 'tab.ApiPeriodType', { year: 'year', quarter: 'quarter', month: 'month', week: 'week', day: 'day', hour: 'hour', minute: 'minute', second: 'second' }, true);
  ////////////////////////////////////////////////////////////////////////////////
  // tableauSoftware.ApiSelectionUpdateType
  var $tab_ApiSelectionUpdateType = global.tab.ApiSelectionUpdateType = ss.mkEnum($asm, 'tab.ApiSelectionUpdateType', { replace: 'replace', add: 'add', remove: 'remove' }, true);
  ////////////////////////////////////////////////////////////////////////////////
  // tableauSoftware.ApiSheetSizeBehavior
  var $tab_ApiSheetSizeBehavior = global.tab.ApiSheetSizeBehavior = ss.mkEnum($asm, 'tab.ApiSheetSizeBehavior', { automatic: 'automatic', exactly: 'exactly', range: 'range', atleast: 'atleast', atmost: 'atmost' }, true);
  ////////////////////////////////////////////////////////////////////////////////
  // tableauSoftware.ApiSheetType
  var $tab_ApiSheetType = global.tab.ApiSheetType = ss.mkEnum($asm, 'tab.ApiSheetType', { worksheet: 'worksheet', dashboard: 'dashboard', story: 'story' }, true);
  ////////////////////////////////////////////////////////////////////////////////
  // tableauSoftware.ApiTableauEventName
  var $tab_ApiTableauEventName = global.tab.ApiTableauEventName = ss.mkEnum($asm, 'tab.ApiTableauEventName', { custommarkcontextmenu: 'custommarkcontextmenu', customviewload: 'customviewload', customviewremove: 'customviewremove', customviewsave: 'customviewsave', customviewsetdefault: 'customviewsetdefault', filterchange: 'filterchange', firstinteractive: 'firstinteractive', firstvizsizeknown: 'firstvizsizeknown', marksselection: 'marksselection', markshighlight: 'markshighlight', parametervaluechange: 'parametervaluechange', storypointswitch: 'storypointswitch', tabswitch: 'tabswitch', toolbarstatechange: 'toolbarstatechange', urlaction: 'urlaction', vizresize: 'vizresize' }, true);
  ////////////////////////////////////////////////////////////////////////////////
  // tableauSoftware.ApiToolbarButtonName
  var $tab_ApiToolbarButtonName = global.tab.ApiToolbarButtonName = ss.mkEnum($asm, 'tab.ApiToolbarButtonName', { redo: 'redo', undo: 'undo' }, true);
  ////////////////////////////////////////////////////////////////////////////////
  // tableauSoftware.ApiToolbarPosition
  var $tab_ApiToolbarPosition = global.tab.ApiToolbarPosition = ss.mkEnum($asm, 'tab.ApiToolbarPosition', { top: 'top', bottom: 'bottom' }, true);
  ////////////////////////////////////////////////////////////////////////////////
  // Tableau.JavaScript.Vql.ApiShared.CommandReturnHandler<T>
  var $tab_CommandReturnHandler$1 = global.tab.CommandReturnHandler$1 = ss.mkType($asm, 'tab.CommandReturnHandler$1', function (T) {
    var $type = ss.registerGenericClassInstance($tab_CommandReturnHandler$1, [T], function (commandName, successCallbackTiming, successCallback, errorCallback) {
      this.$commandName = null;
      this.$successCallbackTiming = 0;
      this.$successCallback = null;
      this.$errorCallback = null;
      this.$commandName = commandName;
      this.$successCallback = successCallback;
      this.$successCallbackTiming = successCallbackTiming;
      this.$errorCallback = errorCallback;
    }, {
      get_commandName: function CommandReturnHandler$get_CommandName() {
        return this.$commandName;
      },
      get_successCallback: function CommandReturnHandler$get_SuccessCallback() {
        return this.$successCallback;
      },
      get_successCallbackTiming: function CommandReturnHandler$get_SuccessCallbackTiming() {
        return this.$successCallbackTiming;
      },
      get_errorCallback: function CommandReturnHandler$get_ErrorCallback() {
        return this.$errorCallback;
      }
    });
    return $type;
  });
  ss.initGenericClass($tab_CommandReturnHandler$1, 1);
  ////////////////////////////////////////////////////////////////////////////////
  // Tableau.JavaScript.Vql.ApiShared.CrossDomainMessager
  var $tab_CrossDomainMessager = global.tab.CrossDomainMessager = ss.mkType($asm, 'tab.CrossDomainMessager', function (legacyHandler) {
    this.$nextHandlerId = 0;
    this.$handlers = {};
    this.$commandCallbacks = {};
    this.$commandReturnAfterStateReadyQueues = {};
    this.$legacyHandler = null;
    this.$legacyHandler = legacyHandler;
    if ($tab__Utility.hasWindowAddEventListener()) {
      window.addEventListener('message', ss.mkdel(this, this.$handleCrossDomainMessage), false);
    } else if ($tab__Utility.hasDocumentAttachEvent()) {
      var handler = ss.mkdel(this, this.$handleCrossDomainMessage);
      document.attachEvent('onmessage', handler);
      window.attachEvent('onmessage', handler);
    } else {
      window.onmessage = ss.mkdel(this, this.$handleCrossDomainMessage);
    }
    this.$nextHandlerId = 0;
  }, {
    registerHandler: function CrossDomainMessager$RegisterHandler(handler) {
      var uniqueId = 'host' + this.$nextHandlerId;
      if (ss.isValue(handler.get_hostId()) || ss.isValue(this.$handlers[handler.get_hostId()])) {
        throw $tab__TableauException.createInternalError("Host '" + handler.get_hostId() + "' is already registered.");
      }
      this.$nextHandlerId++;
      handler.set_hostId(uniqueId);
      this.$handlers[uniqueId] = handler;
      handler.add_stateReadyForQuery(ss.mkdel(this, this.$handleStateReadyForQuery));
    },
    unregisterHandler: function CrossDomainMessager$UnregisterHandler(handler) {
      if (ss.isValue(handler.get_hostId()) || ss.isValue(this.$handlers[handler.get_hostId()])) {
        delete this.$handlers[handler.get_hostId()];
        handler.remove_stateReadyForQuery(ss.mkdel(this, this.$handleStateReadyForQuery));
      }
    },
    sendCommand: function sendCommand(T) {
      return function CrossDomainMessager$SendCommand(source, commandParameters, returnHandler) {
        var iframe = source.get_iframe();
        var handlerId = source.get_hostId();
        if (!$tab__Utility.hasWindowPostMessage() || ss.isNullOrUndefined(iframe) || ss.isNullOrUndefined(iframe.contentWindow)) {
          return;
        }
        var commandId = $tab__ApiCommand.generateNextCommandId();
        var callbackMap = this.$commandCallbacks[handlerId];
        if (ss.isNullOrUndefined(callbackMap)) {
          callbackMap = {};
          this.$commandCallbacks[handlerId] = callbackMap;
        }
        callbackMap[commandId] = returnHandler;
        var commandName = returnHandler.get_commandName();
        var serializedParams = null;
        if (ss.isValue(commandParameters)) {
          serializedParams = JSON.stringify(commandParameters);
        }
        var command = new $tab__ApiCommand(commandName, commandId, handlerId, serializedParams);
        var message = command.serialize();
        if ($tab__Utility.isPostMessageSynchronous()) {
          window.setTimeout(function () {
            iframe.contentWindow.postMessage(message, '*');
          }, 0);
        } else {
          iframe.contentWindow.postMessage(message, '*');
        }
      };
    },
    $handleStateReadyForQuery: function CrossDomainMessager$HandleStateReadyForQuery(source) {
      var queue = this.$commandReturnAfterStateReadyQueues[source.get_hostId()];
      if ($tab__Utility.isNullOrEmpty(queue)) {
        return;
      }
      while (queue.length > 0) {
        var successCallback = queue.pop();
        if (ss.isValue(successCallback)) {
          successCallback();
        }
      }
    },
    $handleCrossDomainMessage: function CrossDomainMessager$HandleCrossDomainMessage(e) {
      var messageEvent = ss.cast(e, MessageEvent);
      if (ss.isNullOrUndefined(messageEvent.data)) {
        return;
      }
      var command = $tab__ApiCommand.parse(messageEvent.data.toString());
      var hostId = command.get_hostId();
      var handler = this.$handlers[hostId];
      if (ss.isNullOrUndefined(handler) || !ss.referenceEquals(handler.get_hostId(), command.get_hostId())) {
        handler = this.$findHostIdByDomComparison(messageEvent);
      }
      if (command.get_isApiCommandName()) {
        if (ss.referenceEquals(command.get_commandId(), $tab__ApiCommand.crossDomainEventNotificationId)) {
          handler.handleEventNotification(command.get_name(), command.get_parameters());
          if (command.get_name() === 'api.FirstVizSizeKnownEvent') {
            var bootstrapCommand = new $tab_NonApiCommand('tableau.bootstrap', []);
            messageEvent.source.postMessage(bootstrapCommand.serialize(), '*');
          }
        } else {
          this.$handleCrossDomainResponse(command);
        }
      } else if (!ss.isNullOrUndefined(this.$legacyHandler)) {
        var legacyCommand = $tab_NonApiCommand.parse(messageEvent.data.toString());
        this.$legacyHandler(legacyCommand, handler);
      }
    },
    $handleCrossDomainResponse: function CrossDomainMessager$HandleCrossDomainResponse(command) {
      var commandCallbackMap = this.$commandCallbacks[command.get_hostId()];
      var returnHandler = ss.isValue(commandCallbackMap) ? commandCallbackMap[command.get_commandId()] : null;
      if (ss.isNullOrUndefined(returnHandler)) {
        return;
      }
      delete commandCallbackMap[command.get_commandId()];
      if (command.get_name() !== returnHandler.get_commandName()) {
        return;
      }
      var crossDomainResult = new $tab__ApiServerResultParser(command.get_parameters());
      var commandResult = crossDomainResult.get_data();
      if (crossDomainResult.get_result() === 'api.success') {
        switch (returnHandler.get_successCallbackTiming()) {
          case 0:
            {
              if (ss.isValue(returnHandler.get_successCallback())) {
                returnHandler.get_successCallback()(commandResult);
              }
              break;
            }
          case 1:
            {
              var postponedCallback = function postponedCallback() {
                if (ss.isValue(returnHandler.get_successCallback())) {
                  returnHandler.get_successCallback()(commandResult);
                }
              };
              var queue = this.$commandReturnAfterStateReadyQueues[command.get_hostId()];
              if (ss.isNullOrUndefined(queue)) {
                queue = [];
                this.$commandReturnAfterStateReadyQueues[command.get_hostId()] = queue;
              }
              queue.push(postponedCallback);
              break;
            }
          default:
            {
              throw $tab__TableauException.createInternalError('Unknown timing value: ' + returnHandler.get_successCallbackTiming());
            }
        }
      } else if (ss.isValue(returnHandler.get_errorCallback())) {
        var remoteError = crossDomainResult.get_result() === 'api.remotefailed';
        var errorMessage = ss.isValue(commandResult) ? commandResult.toString() : '';
        returnHandler.get_errorCallback()(remoteError, errorMessage);
      }
    },
    $findHostIdByDomComparison: function CrossDomainMessager$FindHostIdByDomComparison(messageEvent) {
      var $t1 = new ss.ObjectEnumerator(this.$handlers);
      try {
        while ($t1.moveNext()) {
          var pair = $t1.current();
          if (this.$handlers.hasOwnProperty(pair.key) && ss.referenceEquals(pair.value.get_iframe().contentWindow, messageEvent.source)) {
            return pair.value;
          }
        }
      } finally {
        $t1.dispose();
      }
      return new $tab_$DoNothingCrossDomainHandler();
    }
  });
  ////////////////////////////////////////////////////////////////////////////////
  // tableauSoftware.DataType
  var $tab_DataType = global.tab.DataType = ss.mkEnum($asm, 'tab.DataType', { float: 'float', integer: 'integer', string: 'string', boolean: 'boolean', date: 'date', datetime: 'datetime' }, true);
  ////////////////////////////////////////////////////////////////////////////////
  // tableauSoftware.DataValue
  var $tab_DataValue = global.tab.DataValue = ss.mkType($asm, 'tab.DataValue', null, null, {
    $ctor: function $ctor(value, formattedValue, aliasedValue) {
      var $this = new Object();
      $this.value = null;
      $this.formattedValue = null;
      $this.value = value;
      if ($tab__Utility.isNullOrEmpty(aliasedValue)) {
        $this.formattedValue = formattedValue;
      } else {
        $this.formattedValue = aliasedValue;
      }
      return $this;
    },
    isInstanceOfType: function isInstanceOfType() {
      return true;
    }
  });
  ////////////////////////////////////////////////////////////////////////////////
  // Tableau.JavaScript.Vql.ApiShared.FilterCommandsBuilder
  var $tab_FilterCommandsBuilder = global.tab.FilterCommandsBuilder = ss.mkType($asm, 'tab.FilterCommandsBuilder', function () {}, {
    buildApplyFiltersCommandParams: function FilterCommandsBuilder$BuildApplyFiltersCommandParams(fieldName, values, updateType, options) {
      if ($tab__Utility.isNullOrEmpty(fieldName)) {
        throw $tab__TableauException.createNullOrEmptyParameter('fieldName');
      }
      updateType = $tab_PublicEnums.normalizeEnum($tab_ApiFilterUpdateType).call(null, updateType, 'updateType');
      var fieldValues = [];
      if ($tab__jQueryShim.isArray(values)) {
        for (var i = 0; i < values.length; i++) {
          fieldValues.push(values[i].toString());
        }
      } else if (ss.isValue(values)) {
        fieldValues.push(values.toString());
      }
      var commandParameters = {};
      commandParameters['api.fieldCaption'] = fieldName;
      commandParameters['api.filterUpdateType'] = updateType;
      commandParameters['api.exclude'] = ss.isValue(options) && options.isExcludeMode ? true : false;
      if (updateType !== 'all') {
        commandParameters['api.filterCategoricalValues'] = fieldValues;
      }
      return commandParameters;
    },
    buildRangeFilterCommandParams: function FilterCommandsBuilder$BuildRangeFilterCommandParams(fieldName, filterOptions) {
      if ($tab__Utility.isNullOrEmpty(fieldName)) {
        throw $tab__TableauException.createNullOrEmptyParameter('fieldName');
      }
      if (ss.isNullOrUndefined(filterOptions)) {
        throw $tab__TableauException.createNullOrEmptyParameter('filterOptions');
      }
      var commandParameters = {};
      commandParameters['api.fieldCaption'] = fieldName;
      if (ss.isValue(filterOptions.min)) {
        if ($tab__Utility.isDate(filterOptions.min)) {
          var dt = ss.cast(filterOptions.min, ss.JsDate);
          if ($tab__Utility.isDateValid(dt)) {
            commandParameters['api.filterRangeMin'] = $tab__Utility.serializeDateForServer(dt);
          } else {
            throw $tab__TableauException.createInvalidDateParameter('filterOptions.min');
          }
        } else {
          commandParameters['api.filterRangeMin'] = filterOptions.min;
        }
      }
      if (ss.isValue(filterOptions.max)) {
        if ($tab__Utility.isDate(filterOptions.max)) {
          var dt1 = ss.cast(filterOptions.max, ss.JsDate);
          if ($tab__Utility.isDateValid(dt1)) {
            commandParameters['api.filterRangeMax'] = $tab__Utility.serializeDateForServer(dt1);
          } else {
            throw $tab__TableauException.createInvalidDateParameter('filterOptions.max');
          }
        } else {
          commandParameters['api.filterRangeMax'] = filterOptions.max;
        }
      }
      if (ss.isValue(filterOptions.nullOption)) {
        commandParameters['api.filterRangeNullOption'] = filterOptions.nullOption;
      }
      return commandParameters;
    },
    buildRelativeDateFilterCommandParams: function FilterCommandsBuilder$BuildRelativeDateFilterCommandParams(fieldName, filterOptions) {
      if ($tab__Utility.isNullOrEmpty(fieldName)) {
        throw $tab__TableauException.createInvalidParameter('fieldName');
      } else if (ss.isNullOrUndefined(filterOptions)) {
        throw $tab__TableauException.createInvalidParameter('filterOptions');
      }
      var commandParameters = {};
      commandParameters['api.fieldCaption'] = fieldName;
      if (ss.isValue(filterOptions)) {
        commandParameters['api.filterPeriodType'] = filterOptions.periodType;
        commandParameters['api.filterDateRangeType'] = filterOptions.rangeType;
        if (filterOptions.rangeType === 'lastn' || filterOptions.rangeType === 'nextn') {
          if (ss.isNullOrUndefined(filterOptions.rangeN)) {
            throw $tab__TableauException.create('missingRangeNForRelativeDateFilters', 'Missing rangeN field for a relative date filter of LASTN or NEXTN.');
          }
          commandParameters['api.filterDateRange'] = filterOptions.rangeN;
        }
        if (ss.isValue(filterOptions.anchorDate)) {
          commandParameters['api.filterDateArchorValue'] = $tab__Utility.serializeDateForServer(filterOptions.anchorDate);
        }
      }
      return commandParameters;
    },
    buildHierarchicalFilterCommandParams: function FilterCommandsBuilder$BuildHierarchicalFilterCommandParams(fieldName, values, updateType, options) {
      if ($tab__Utility.isNullOrEmpty(fieldName)) {
        throw $tab__TableauException.createNullOrEmptyParameter('fieldName');
      }
      updateType = $tab_PublicEnums.normalizeEnum($tab_ApiFilterUpdateType).call(null, updateType, 'updateType');
      var fieldValues = null;
      var levelValues = null;
      if ($tab__jQueryShim.isArray(values)) {
        fieldValues = [];
        var arr = values;
        for (var i = 0; i < arr.length; i++) {
          fieldValues.push(arr[i].toString());
        }
      } else if ($tab__Utility.isString(values)) {
        fieldValues = [];
        fieldValues.push(values.toString());
      } else if (ss.isValue(values) && ss.isValue(values['levels'])) {
        var levelValue = values['levels'];
        levelValues = [];
        if ($tab__jQueryShim.isArray(levelValue)) {
          var levels = levelValue;
          for (var i1 = 0; i1 < levels.length; i1++) {
            levelValues.push(levels[i1].toString());
          }
        } else {
          levelValues.push(levelValue.toString());
        }
      } else if (ss.isValue(values)) {
        throw $tab__TableauException.createInvalidParameter('values');
      }
      var commandParameters = {};
      commandParameters['api.fieldCaption'] = fieldName;
      commandParameters['api.filterUpdateType'] = updateType;
      commandParameters['api.exclude'] = ss.isValue(options) && options.isExcludeMode ? true : false;
      if (ss.isValue(fieldValues)) {
        commandParameters['api.filterHierarchicalValues'] = JSON.stringify(fieldValues);
      }
      if (ss.isValue(levelValues)) {
        commandParameters['api.filterHierarchicalLevels'] = JSON.stringify(levelValues);
      }
      return commandParameters;
    },
    buildClearFilterCommandsParam: function FilterCommandsBuilder$BuildClearFilterCommandsParam(fieldName) {
      if ($tab__Utility.isNullOrEmpty(fieldName)) {
        throw $tab__TableauException.createNullOrEmptyParameter('fieldName');
      }
      var commandParameters = {};
      commandParameters['api.fieldCaption'] = fieldName;
      return commandParameters;
    },
    filterCommandError: function FilterCommandsBuilder$FilterCommandError(rawPm) {
      var commandError = rawPm;
      if (ss.isValue(commandError) && ss.isValue(commandError.errorCode)) {
        var additionalInfo = ss.isValue(commandError.additionalInformation) ? commandError.additionalInformation.toString() : '';
        switch (commandError.errorCode) {
          case 'invalidFilterFieldName':
            {
              return $tab__TableauException.create('invalidFilterFieldName', additionalInfo);
            }
          case 'invalidFilterFieldValue':
            {
              return $tab__TableauException.create('invalidFilterFieldValue', additionalInfo);
            }
          case 'invalidAggregationFieldName':
            {
              return $tab__TableauException.createInvalidAggregationFieldName(additionalInfo);
            }
          default:
            {
              return $tab__TableauException.createServerError(additionalInfo);
            }
        }
      }
      return null;
    },
    normalizeRangeFilterOption: function FilterCommandsBuilder$NormalizeRangeFilterOption(filterOptions) {
      if (ss.isNullOrUndefined(filterOptions)) {
        throw $tab__TableauException.createNullOrEmptyParameter('filterOptions');
      }
      if (ss.isNullOrUndefined(filterOptions.min) && ss.isNullOrUndefined(filterOptions.max) && ss.isNullOrUndefined(filterOptions.nullOption)) {
        throw $tab__TableauException.create('invalidParameter', 'At least one of filterOptions.min or filterOptions.max or filterOptions.nullOption must be specified.');
      }
      var fixedUpFilterOptions = new Object();
      if (ss.isValue(filterOptions.min)) {
        fixedUpFilterOptions.min = filterOptions.min;
      }
      if (ss.isValue(filterOptions.max)) {
        fixedUpFilterOptions.max = filterOptions.max;
      }
      if (ss.isValue(filterOptions.nullOption)) {
        fixedUpFilterOptions.nullOption = $tab_PublicEnums.normalizeEnum($tab_ApiNullOption).call(null, filterOptions.nullOption, 'filterOptions.nullOption');
      }
      return fixedUpFilterOptions;
    },
    normalizeRelativeDateFilterOptions: function FilterCommandsBuilder$NormalizeRelativeDateFilterOptions(filterOptions) {
      if (ss.isNullOrUndefined(filterOptions)) {
        throw $tab__TableauException.createNullOrEmptyParameter('filterOptions');
      }
      var fixedUpFilterOptions = new Object();
      fixedUpFilterOptions.rangeType = $tab_PublicEnums.normalizeEnum($tab_ApiDateRangeType).call(null, filterOptions.rangeType, 'filterOptions.rangeType');
      fixedUpFilterOptions.periodType = $tab_PublicEnums.normalizeEnum($tab_ApiPeriodType).call(null, filterOptions.periodType, 'filterOptions.periodType');
      if (fixedUpFilterOptions.rangeType === 'lastn' || fixedUpFilterOptions.rangeType === 'nextn') {
        if (ss.isNullOrUndefined(filterOptions.rangeN)) {
          throw $tab__TableauException.create('missingRangeNForRelativeDateFilters', 'Missing rangeN field for a relative date filter of LASTN or NEXTN.');
        }
        fixedUpFilterOptions.rangeN = $tab__Utility.toInt(filterOptions.rangeN);
      }
      if (ss.isValue(filterOptions.anchorDate)) {
        if (!$tab__Utility.isDate(filterOptions.anchorDate) || !$tab__Utility.isDateValid(filterOptions.anchorDate)) {
          throw $tab__TableauException.createInvalidDateParameter('filterOptions.anchorDate');
        }
        fixedUpFilterOptions.anchorDate = filterOptions.anchorDate;
      }
      return fixedUpFilterOptions;
    },
    createFilterCommandReturnHandler: function FilterCommandsBuilder$CreateFilterCommandReturnHandler(commandName, fieldName, deferred) {
      return new (ss.makeGenericType($tab_CommandReturnHandler$1, [Object]))(commandName, 0, ss.mkdel(this, function (result) {
        var error = this.filterCommandError(result);
        if (ss.isNullOrUndefined(error)) {
          deferred.resolve(fieldName);
        } else {
          deferred.reject(error);
        }
      }), function (remoteError, message) {
        if (remoteError) {
          deferred.reject($tab__TableauException.createInvalidFilterFieldNameOrValue(fieldName));
        } else {
          var error1 = $tab__TableauException.create('filterCannotBePerformed', message);
          deferred.reject(error1);
        }
      });
    }
  });
  ////////////////////////////////////////////////////////////////////////////////
  // Tableau.JavaScript.Vql.ApiShared.GetDataCommandsBuilder
  var $tab_GetDataCommandsBuilder = global.tab.GetDataCommandsBuilder = ss.mkType($asm, 'tab.GetDataCommandsBuilder', function () {}, {
    getSummaryDataCommandParams: function GetDataCommandsBuilder$GetSummaryDataCommandParams(options) {
      var commandParameters = {};
      options = options || new Object();
      commandParameters['api.ignoreAliases'] = ss.coalesce(options.ignoreAliases, false);
      commandParameters['api.ignoreSelection'] = ss.coalesce(options.ignoreSelection, false);
      commandParameters['api.maxRows'] = ss.coalesce(options.maxRows, 0);
      return commandParameters;
    },
    getUnderlyingDataCommandParams: function GetDataCommandsBuilder$GetUnderlyingDataCommandParams(options) {
      var commandParameters = {};
      options = options || new Object();
      commandParameters['api.ignoreAliases'] = ss.coalesce(options.ignoreAliases, false);
      commandParameters['api.ignoreSelection'] = ss.coalesce(options.ignoreSelection, false);
      commandParameters['api.includeAllColumns'] = ss.coalesce(options.includeAllColumns, false);
      commandParameters['api.maxRows'] = ss.coalesce(options.maxRows, 0);
      return commandParameters;
    },
    getUnderlyingTablesCommandParams: function GetDataCommandsBuilder$GetUnderlyingTablesCommandParams() {
      return {};
    },
    getUnderlyingTableDataCommandParams: function GetDataCommandsBuilder$GetUnderlyingTableDataCommandParams(tableId, options) {
      var commandParameters = {};
      options = options || new Object();
      commandParameters['api.ignoreAliases'] = ss.coalesce(options.ignoreAliases, false);
      commandParameters['api.ignoreSelection'] = ss.coalesce(options.ignoreSelection, false);
      commandParameters['api.includeAllColumns'] = ss.coalesce(options.includeAllColumns, false);
      commandParameters['api.maxRows'] = ss.coalesce(options.maxRows, 0);
      commandParameters['api.tableId'] = ss.coalesce(tableId, '');
      return commandParameters;
    },
    getSummaryDataResponseHandler: function GetDataCommandsBuilder$GetSummaryDataResponseHandler(deferred) {
      return new (ss.makeGenericType($tab_CommandReturnHandler$1, [Object]))('api.GetSummaryTableCommand', 0, ss.mkdel(this, function (result) {
        var dataResult = result;
        var dt = this.processGetDataPresModel(dataResult);
        deferred.resolve(dt);
      }), function (remoteError, message) {
        deferred.reject($tab__TableauException.createServerError(message));
      });
    },
    getUnderlyingDataResponseHandler: function GetDataCommandsBuilder$GetUnderlyingDataResponseHandler(deferred) {
      return new (ss.makeGenericType($tab_CommandReturnHandler$1, [Object]))('api.GetUnderlyingTableCommand', 0, ss.mkdel(this, function (result) {
        var dataResult = result;
        var dt = this.processGetDataPresModel(dataResult);
        deferred.resolve(dt);
      }), function (remoteError, message) {
        deferred.reject($tab__TableauException.createServerError(message));
      });
    },
    processGetDataPresModel: function GetDataCommandsBuilder$ProcessGetDataPresModel(model) {
      var clientTable = this.$processUnderlyingTable(model.dataTable);
      var clientColumns = this.$processUnderlyingColumns(model.headers);
      var clientDataTableImpl = new $tab__DataTableImpl(clientTable, model.isSummary, clientTable.length, clientColumns);
      return new $tableauSoftware_DataTable(clientDataTableImpl);
    },
    $processUnderlyingTable: function GetDataCommandsBuilder$ProcessUnderlyingTable(apiTable) {
      var clientTable = [];
      for (var $t1 = 0; $t1 < apiTable.length; $t1++) {
        var row = apiTable[$t1];
        var clientRow = [];
        for (var $t2 = 0; $t2 < row.length; $t2++) {
          var apiValue = row[$t2];
          clientRow.push($tab__Utility.getDataValue(apiValue));
        }
        clientTable.push(clientRow);
      }
      return clientTable;
    },
    $processUnderlyingColumns: function GetDataCommandsBuilder$ProcessUnderlyingColumns(apiColumns) {
      var clientColumns = [];
      for (var $t1 = 0; $t1 < apiColumns.length; $t1++) {
        var apiColumn = apiColumns[$t1];
        var clientColumn = new $tab__ColumnImpl(apiColumn.fieldName, $tab_ApiEnumConverter.convertDataType(apiColumn.dataType), apiColumn.isReferenced, apiColumn.index);
        clientColumns.push(new $tableauSoftware_Column(clientColumn));
      }
      return clientColumns;
    },
    $appendErrorMessageIfNeededThenLog: function GetDataCommandsBuilder$AppendErrorMessageIfNeededThenLog(remoteError, message) {
      var errorMessage = message;
      if (!remoteError) {
        var sb = new ss.StringBuilder(message);
        sb.append('\nPossible reasons:');
        sb.append('\nCalling newer version of API against an older version of Tableau Server');
        errorMessage = sb.toString();
      }
      console.error(errorMessage);
      return errorMessage;
    },
    getUnderlyingTablesResponseHandler: function GetDataCommandsBuilder$GetUnderlyingTablesResponseHandler(deferred) {
      return new (ss.makeGenericType($tab_CommandReturnHandler$1, [Object]))('api.GetUnderlyingTablesCommand', 0, ss.mkdel(this, function (result) {
        var tablesResult = result;
        var logicalTables = this.$processGetLogicalTablesPresModel(tablesResult);
        deferred.resolve(logicalTables._toApiCollection());
      }), ss.mkdel(this, function (remoteError, message) {
        deferred.reject($tab__TableauException.createServerError(this.$appendErrorMessageIfNeededThenLog(remoteError, message)));
      }));
    },
    $processGetLogicalTablesPresModel: function GetDataCommandsBuilder$ProcessGetLogicalTablesPresModel(model) {
      var logicalTables = new tab._Collection();
      for (var $t1 = 0; $t1 < model.logicalTables.length; $t1++) {
        var pm = model.logicalTables[$t1];
        logicalTables._add(pm.tableId, new $tableauSoftware_LogicalTable(pm.tableId, pm.caption));
      }
      return logicalTables;
    },
    getUnderlyingTableDataResponseHandler: function GetDataCommandsBuilder$GetUnderlyingTableDataResponseHandler(deferred) {
      return new (ss.makeGenericType($tab_CommandReturnHandler$1, [Object]))('api.GetUnderlyingTableDataCommand', 0, ss.mkdel(this, function (result) {
        var dataResult = result;
        var dt = this.processGetDataPresModel(dataResult);
        deferred.resolve(dt);
      }), ss.mkdel(this, function (remoteError, message) {
        deferred.reject($tab__TableauException.createServerError(this.$appendErrorMessageIfNeededThenLog(remoteError, message)));
      }));
    }
  });
  ////////////////////////////////////////////////////////////////////////////////
  // Tableau.JavaScript.Vql.ApiShared.HostedApiMessageHandler
  var $tab_HostedApiMessageHandler = global.tab.HostedApiMessageHandler = ss.mkType($asm, 'tab.HostedApiMessageHandler', function () {
    this.$2$StateReadyForQueryField = null;
    $tab_ApiMessageHandler.call(this);
  }, {
    add_stateReadyForQuery: function HostedApiMessageHandler$add_StateReadyForQuery(value) {
      this.$2$StateReadyForQueryField = ss.delegateCombine(this.$2$StateReadyForQueryField, value);
    },
    remove_stateReadyForQuery: function HostedApiMessageHandler$remove_StateReadyForQuery(value) {
      this.$2$StateReadyForQueryField = ss.delegateRemove(this.$2$StateReadyForQueryField, value);
    },
    get_hostId: function HostedApiMessageHandler$get_HostId() {
      return null;
    },
    set_hostId: function HostedApiMessageHandler$set_HostId(value) {},
    get_iframe: function HostedApiMessageHandler$get_Iframe() {
      return null;
    }
  });
  ////////////////////////////////////////////////////////////////////////////////
  // Tableau.JavaScript.Vql.ApiShared.HostedApiMessageRouter
  var $tab_HostedApiMessageRouter = global.tab.HostedApiMessageRouter = ss.mkType($asm, 'tab.HostedApiMessageRouter', function () {
    this.$crossDomainMessager = null;
    this.$crossDomainMessager = new $tab_CrossDomainMessager(null);
  }, {
    registerHandler: function HostedApiMessageRouter$RegisterHandler(handler) {
      this.$crossDomainMessager.registerHandler(handler);
    },
    unregisterHandler: function HostedApiMessageRouter$UnregisterHandler(handler) {
      this.$crossDomainMessager.unregisterHandler(handler);
    },
    sendCommand: function sendCommand(T) {
      return function HostedApiMessageRouter$SendCommand(source, commandParameters, returnHandler) {
        this.$crossDomainMessager.sendCommand(T).call(this.$crossDomainMessager, source, commandParameters, returnHandler);
      };
    }
  });
  ////////////////////////////////////////////////////////////////////////////////
  // Tableau.JavaScript.Vql.ApiShared.MarkImpl
  var $tab_MarkImpl = global.tab.MarkImpl = ss.mkType($asm, 'tab.MarkImpl', function (tupleIdOrPairs) {
    this.$clonedPairs = null;
    this.$collection = new tab._Collection();
    this.$tupleId = 0;
    if ($tab__jQueryShim.isArray(tupleIdOrPairs)) {
      var pairArr = tupleIdOrPairs;
      for (var i = 0; i < pairArr.length; i++) {
        var pair = pairArr[i];
        if (!ss.isValue(pair.fieldName)) {
          throw $tab__TableauException.createInvalidParameter('pair.fieldName');
        }
        if (!ss.isValue(pair.value)) {
          throw $tab__TableauException.createInvalidParameter('pair.value');
        }
        var p = new $tableauSoftware_Pair(pair.fieldName, pair.value);
        this.$collection._add(p.fieldName, p);
      }
    } else {
      this.$tupleId = tupleIdOrPairs;
    }
  }, {
    get_pairs: function MarkImpl$get_Pairs() {
      return this.$collection;
    },
    get_tupleId: function MarkImpl$get_TupleId() {
      return this.$tupleId;
    },
    get_$clonedPairs: function MarkImpl$get_ClonedPairs() {
      if (ss.isNullOrUndefined(this.$clonedPairs)) {
        this.$clonedPairs = this.$collection._toApiCollection();
      }
      return this.$clonedPairs;
    },
    $addPair: function MarkImpl$AddPair(pair) {
      this.$collection._add(pair.fieldName, pair);
    }
  }, {
    processActiveMarks: function MarkImpl$ProcessActiveMarks(marksPresModel) {
      var marks = new tab._Collection();
      if (ss.isNullOrUndefined(marksPresModel) || $tab__Utility.isNullOrEmpty(marksPresModel.marks)) {
        return marks;
      }
      for (var $t1 = 0; $t1 < marksPresModel.marks.length; $t1++) {
        var markPresModel = marksPresModel.marks[$t1];
        var tupleId = markPresModel.tupleId;
        var mark = new $tableauSoftware_Mark(tupleId);
        marks._add(tupleId.toString(), mark);
        for (var $t2 = 0; $t2 < markPresModel.pairs.length; $t2++) {
          var pairPresModel = markPresModel.pairs[$t2];
          var value = $tab__Utility.convertRawValue(pairPresModel.value, pairPresModel.valueDataType);
          var pair = new $tableauSoftware_Pair(pairPresModel.fieldName, value);
          pair.formattedValue = pairPresModel.formattedValue;
          if (!mark.impl.get_pairs()._has(pair.fieldName)) {
            mark.impl.$addPair(pair);
          }
        }
      }
      return marks;
    }
  });
  ////////////////////////////////////////////////////////////////////////////////
  // Tableau.JavaScript.Vql.ApiShared.NonApiCommand
  var $tab_NonApiCommand = global.tab.NonApiCommand = ss.mkType($asm, 'tab.NonApiCommand', function (name, parameters) {
    this.$parameters = null;
    this.$1$NameField = null;
    this.set_name(name);
    this.$parameters = parameters;
  }, {
    get_name: function NonApiCommand$get_Name() {
      return this.$1$NameField;
    },
    set_name: function NonApiCommand$set_Name(value) {
      this.$1$NameField = value;
    },
    get_parameters: function NonApiCommand$get_Parameters() {
      return this.$parameters;
    },
    serialize: function NonApiCommand$Serialize() {
      var message = [];
      message.push(this.get_name().toString());
      message = message.concat.apply(message, this.$parameters);
      return message.join(',');
    }
  }, {
    parse: function NonApiCommand$Parse(serialized) {
      var args = serialized.split(String.fromCharCode(44));
      var name = ss.cast(args[0], String);
      var parameters = args.slice(1);
      return new $tab_NonApiCommand(name, parameters);
    }
  });
  ////////////////////////////////////////////////////////////////////////////////
  // tableauSoftware.Point
  var $tab_Point = global.tab.Point = ss.mkType($asm, 'tab.Point', null, null, {
    $ctor: function $ctor(x, y) {
      var $this = new Object();
      $this.x = 0;
      $this.y = 0;
      $this.x = x;
      $this.y = y;
      return $this;
    },
    isInstanceOfType: function isInstanceOfType() {
      return true;
    }
  });
  ////////////////////////////////////////////////////////////////////////////////
  // tableauSoftware.PublicEnums
  var $tab_PublicEnums = global.tab.PublicEnums = ss.mkType($asm, 'tab.PublicEnums', null, null, {
    tryNormalizeEnum: function tryNormalizeEnum(T) {
      return function PublicEnums$TryNormalizeEnum(rawValue, value) {
        if (ss.isValue(rawValue)) {
          var lookup = rawValue.toString().toUpperCase();
          var $t1 = ss.Enum.getValues(T);
          for (var $t2 = 0; $t2 < $t1.length; $t2++) {
            var name = ss.cast($t1[$t2], String);
            var compareValue = name.toUpperCase();
            if (ss.referenceEquals(lookup, compareValue)) {
              value.$ = name;
              return true;
            }
          }
        }
        value.$ = ss.getDefaultValue(T);
        return false;
      };
    },
    normalizeEnum: function normalizeEnum(T) {
      return function PublicEnums$NormalizeEnum(rawValue, paramName) {
        var value = {};
        if (!$tab_PublicEnums.tryNormalizeEnum(T).call(null, rawValue, value)) {
          throw $tab__TableauException.createInvalidParameter(paramName);
        }
        return value.$;
      };
    },
    isValidEnum: function isValidEnum(T) {
      return function PublicEnums$IsValidEnum(rawValue) {
        var value = {};
        var valid = $tab_PublicEnums.tryNormalizeEnum(T).call(null, rawValue, value);
        return valid;
      };
    }
  });
  ////////////////////////////////////////////////////////////////////////////////
  // Tableau.JavaScript.Vql.ApiShared.SharedUtils
  var $tab_SharedUtils = global.tab.SharedUtils = ss.mkType($asm, 'tab.SharedUtils', function () {}, {
    addVisualIdForWorksheet: function SharedUtils$AddVisualIdForWorksheet(commandParameters, worksheetName, dashboardName) {
      commandParameters['api.worksheetName'] = worksheetName;
      if (ss.isValue(dashboardName)) {
        commandParameters['api.dashboardName'] = dashboardName;
      }
    }
  });
  ////////////////////////////////////////////////////////////////////////////////
  // tableauSoftware.SheetSize
  var $tab_SheetSize = global.tab.SheetSize = ss.mkType($asm, 'tab.SheetSize', null, null, {
    $ctor: function $ctor(behavior, minSize, maxSize) {
      var $this = new Object();
      $this.behavior = null;
      $this.minSize = null;
      $this.maxSize = null;
      $this.behavior = ss.coalesce(behavior, 'automatic');
      if (ss.isValue(minSize)) {
        $this.minSize = minSize;
      } else {
        delete $this['minSize'];
      }
      if (ss.isValue(maxSize)) {
        $this.maxSize = maxSize;
      } else {
        delete $this['maxSize'];
      }
      return $this;
    },
    isInstanceOfType: function isInstanceOfType() {
      return true;
    }
  });
  ////////////////////////////////////////////////////////////////////////////////
  // tableauSoftware.SheetSizeFactory
  var $tab_SheetSizeFactory = global.tab.SheetSizeFactory = ss.mkType($asm, 'tab.SheetSizeFactory', null, null, {
    createAutomatic: function SheetSizeFactory$CreateAutomatic() {
      var size = $tab_SheetSize.$ctor('automatic', null, null);
      return size;
    },
    fromSizeConstraints: function SheetSizeFactory$FromSizeConstraints(vizSizePresModel) {
      var minHeight = vizSizePresModel.minHeight;
      var minWidth = vizSizePresModel.minWidth;
      var maxHeight = vizSizePresModel.maxHeight;
      var maxWidth = vizSizePresModel.maxWidth;
      var behavior = 'automatic';
      var minSize = null;
      var maxSize = null;
      if (minHeight === 0 && minWidth === 0) {
        if (maxHeight === 0 && maxWidth === 0) {} else {
          behavior = 'atmost';
          maxSize = $tab_Size.$ctor(maxWidth, maxHeight);
        }
      } else if (maxHeight === 0 && maxWidth === 0) {
        behavior = 'atleast';
        minSize = $tab_Size.$ctor(minWidth, minHeight);
      } else if (maxHeight === minHeight && maxWidth === minWidth && minWidth > 0) {
        behavior = 'exactly';
        minSize = $tab_Size.$ctor(minWidth, minHeight);
        maxSize = $tab_Size.$ctor(minWidth, minHeight);
      } else {
        behavior = 'range';
        if (minWidth === 0 && maxWidth === 0) {
          maxWidth = 2147483647;
        }
        minSize = $tab_Size.$ctor(minWidth, minHeight);
        maxSize = $tab_Size.$ctor(maxWidth, maxHeight);
      }
      return $tab_SheetSize.$ctor(behavior, minSize, maxSize);
    }
  });
  ////////////////////////////////////////////////////////////////////////////////
  // tableauSoftware.Size
  var $tab_Size = global.tab.Size = ss.mkType($asm, 'tab.Size', null, null, {
    $ctor: function $ctor(width, height) {
      var $this = new Object();
      $this.width = 0;
      $this.height = 0;
      $this.width = width;
      $this.height = height;
      return $this;
    },
    isInstanceOfType: function isInstanceOfType() {
      return true;
    }
  });
  ////////////////////////////////////////////////////////////////////////////////
  // tableauSoftware.Column
  var $tableauSoftware_Column = global.tableauSoftware.Column = ss.mkType($asm, 'tableauSoftware.Column', function (impl) {
    this.$impl = null;
    this.$impl = impl;
  }, {
    getFieldName: function Column$GetFieldName() {
      return this.$impl.get_fieldName();
    },
    getDataType: function Column$GetDataType() {
      return this.$impl.get_dataType();
    },
    getIsReferenced: function Column$GetIsReferenced() {
      return this.$impl.get_isReferenced();
    },
    getIndex: function Column$GetIndex() {
      return this.$impl.get_index();
    }
  });
  ////////////////////////////////////////////////////////////////////////////////
  // tableauSoftware.DataTable
  var $tableauSoftware_DataTable = global.tableauSoftware.DataTable = ss.mkType($asm, 'tableauSoftware.DataTable', function (impl) {
    this.$impl = null;
    this.$impl = impl;
  }, {
    getName: function DataTable$GetName() {
      return this.$impl.get_name();
    },
    getData: function DataTable$GetData() {
      return this.$impl.get_rows();
    },
    getColumns: function DataTable$GetColumns() {
      return this.$impl.get_columns();
    },
    getTotalRowCount: function DataTable$GetTotalRowCount() {
      return this.$impl.get_totalRowCount();
    },
    getIsSummaryData: function DataTable$GetIsSummaryData() {
      return this.$impl.get_isSummaryData();
    }
  });
  ////////////////////////////////////////////////////////////////////////////////
  // tableauSoftware.LogicalTable
  var $tableauSoftware_LogicalTable = global.tableauSoftware.LogicalTable = ss.mkType($asm, 'tableauSoftware.LogicalTable', function (tableId, caption) {
    this.$tableId = null;
    this.$caption = null;
    this.$tableId = tableId;
    this.$caption = caption;
  }, {
    getTableId: function LogicalTable$GetTableId() {
      return this.$tableId;
    },
    getCaption: function LogicalTable$GetCaption() {
      return this.$caption;
    }
  });
  ////////////////////////////////////////////////////////////////////////////////
  // tableauSoftware.Mark
  var $tableauSoftware_Mark = global.tableauSoftware.Mark = ss.mkType($asm, 'tableauSoftware.Mark', function (tupleId) {
    this.impl = null;
    this.impl = new $tab_MarkImpl(tupleId);
  }, {
    getPairs: function Mark$GetPairs() {
      return this.impl.get_$clonedPairs();
    }
  });
  ////////////////////////////////////////////////////////////////////////////////
  // tableauSoftware.Pair
  var $tableauSoftware_Pair = global.tableauSoftware.Pair = ss.mkType($asm, 'tableauSoftware.Pair', function (fieldName, value) {
    this.fieldName = null;
    this.value = null;
    this.formattedValue = null;
    this.fieldName = fieldName;
    this.value = value;
    this.formattedValue = ss.isValue(value) ? value.toString() : '';
  });
  ss.initClass($tab__ApiCommand);
  ss.initClass($tab__ApiObjectRegistry);
  ss.initClass($tab__ApiServerNotification);
  ss.initClass($tab__ApiServerResultParser);
  ss.initClass($tab__CollectionImpl);
  ss.initClass($tab__ColumnImpl);
  ss.initClass($tab__DataTableImpl);
  ss.initClass($tab__DeferredImpl);
  ss.initClass($tab__jQueryShim);
  ss.initClass($tab__Param);
  ss.initClass($tab__PromiseImpl);
  ss.initClass($tab__Rect);
  ss.initClass($tab__TableauException);
  ss.initClass($tab__Utility);
  ss.initClass($tab_$DeferredUtil);
  ss.initClass($tab_$DoNothingCrossDomainHandler);
  ss.initClass($tab_ApiEnumConverter);
  ss.initClass($tab_ApiMessageHandler);
  ss.initClass($tab_ApiMessagingOptions);
  ss.initClass($tab_CrossDomainMessager);
  ss.initClass($tab_DataValue, Object);
  ss.initClass($tab_FilterCommandsBuilder);
  ss.initClass($tab_GetDataCommandsBuilder);
  ss.initClass($tab_HostedApiMessageHandler, $tab_ApiMessageHandler);
  ss.initClass($tab_HostedApiMessageRouter);
  ss.initClass($tab_MarkImpl);
  ss.initClass($tab_NonApiCommand);
  ss.initClass($tab_Point, Object);
  ss.initClass($tab_PublicEnums);
  ss.initClass($tab_SharedUtils);
  ss.initClass($tab_SheetSize, Object);
  ss.initClass($tab_SheetSizeFactory);
  ss.initClass($tab_Size, Object);
  ss.initClass($tableauSoftware_Column);
  ss.initClass($tableauSoftware_DataTable);
  ss.initClass($tableauSoftware_LogicalTable);
  ss.initClass($tableauSoftware_Mark);
  ss.initClass($tableauSoftware_Pair);
  (function () {
    $tab__ApiCommand.crossDomainEventNotificationId = 'xdomainSourceId';
    $tab__ApiCommand.lastRequestMessage = null;
    $tab__ApiCommand.lastResponseMessage = null;
    $tab__ApiCommand.lastClientInfoResponseMessage = null;
    $tab__ApiCommand.$nextCommandId = 0;
  })();
  (function () {
    var globalState = window['_ApiObjectRegistryGlobalState'];
    var $t1 = globalState;
    if (ss.isNullOrUndefined($t1)) {
      $t1 = new Object();
    }
    window['_ApiObjectRegistryGlobalState'] = $t1;
    window._ApiObjectRegistryGlobalState.creationRegistry = window._ApiObjectRegistryGlobalState.creationRegistry || {};
    window._ApiObjectRegistryGlobalState.singletonInstanceRegistry = window._ApiObjectRegistryGlobalState.singletonInstanceRegistry || {};
  })();
  (function () {
    $tab__Param.$maxChars = 128;
  })();
  (function () {
    $tab__jQueryShim.$arrayType = 'array';
    $tab__jQueryShim.$booleanType = 'boolean';
    $tab__jQueryShim.$dateType = 'date';
    $tab__jQueryShim.$functionType = 'function';
    $tab__jQueryShim.$numberType = 'number';
    $tab__jQueryShim.$objectType = 'object';
    $tab__jQueryShim.$regExpType = 'regexp';
    $tab__jQueryShim.$stringType = 'string';
    $tab__jQueryShim.$class2type = ss.mkdict(['[object Boolean]', $tab__jQueryShim.$booleanType, '[object Number]', $tab__jQueryShim.$numberType, '[object String]', $tab__jQueryShim.$stringType, '[object Function]', $tab__jQueryShim.$functionType, '[object Array]', $tab__jQueryShim.$arrayType, '[object Date]', $tab__jQueryShim.$dateType, '[object RegExp]', $tab__jQueryShim.$regExpType, '[object Object]', $tab__jQueryShim.$objectType]);
    $tab__jQueryShim.$trim = ss.cast(String.prototype['trim'], Function);
    $tab__jQueryShim.$toString = ss.cast(Object.prototype['toString'], Function);
    $tab__jQueryShim.$trimLeft = new RegExp('^[\\s\\xA0]+');
    $tab__jQueryShim.$trimRight = new RegExp('[\\s\\xA0]+$');
    $tab__jQueryShim.$rvalidchars = new RegExp('^[\\],:{}\\s]*$');
    $tab__jQueryShim.$rvalidescape = new RegExp('\\\\(?:["\\\\\\/bfnrt]|u[0-9a-fA-F]{4})', 'g');
    $tab__jQueryShim.$rvalidtokens = new RegExp('"[^"\\\\\\n\\r]*"|true|false|null|-?\\d+(?:\\.\\d*)?(?:[eE][+\\-]?\\d+)?', 'g');
    $tab__jQueryShim.$rvalidbraces = new RegExp('(?:^|:|,)(?:\\s*\\[)+', 'g');
  })();
  (function () {
    var ns = global.tableauSoftware;
    ns.DeviceType = { DEFAULT: 'default', DESKTOP: 'desktop', TABLET: 'tablet', PHONE: 'phone' };
    ns.DashboardObjectType = { BLANK: 'blank', WORKSHEET: 'worksheet', QUICK_FILTER: 'quickFilter', PARAMETER_CONTROL: 'parameterControl', PAGE_FILTER: 'pageFilter', LEGEND: 'legend', TITLE: 'title', TEXT: 'text', IMAGE: 'image', WEB_PAGE: 'webPage', ADDIN: 'addIn' };
    ns.DataType = { FLOAT: 'float', INTEGER: 'integer', STRING: 'string', BOOLEAN: 'boolean', DATE: 'date', DATETIME: 'datetime' };
    ns.DateRangeType = { LAST: 'last', LASTN: 'lastn', NEXT: 'next', NEXTN: 'nextn', CURR: 'curr', TODATE: 'todate' };
    ns.ErrorCode = { INTERNAL_ERROR: 'internalError', SERVER_ERROR: 'serverError', INVALID_AGGREGATION_FIELD_NAME: 'invalidAggregationFieldName', INVALID_TOOLBAR_BUTTON_NAME: 'invalidToolbarButtonName', INVALID_PARAMETER: 'invalidParameter', INVALID_URL: 'invalidUrl', STALE_DATA_REFERENCE: 'staleDataReference', VIZ_ALREADY_IN_MANAGER: 'vizAlreadyInManager', NO_URL_OR_PARENT_ELEMENT_NOT_FOUND: 'noUrlOrParentElementNotFound', INVALID_FILTER_FIELDNAME: 'invalidFilterFieldName', INVALID_FILTER_FIELDVALUE: 'invalidFilterFieldValue', INVALID_FILTER_FIELDNAME_OR_VALUE: 'invalidFilterFieldNameOrValue', FILTER_CANNOT_BE_PERFORMED: 'filterCannotBePerformed', NOT_ACTIVE_SHEET: 'notActiveSheet', INVALID_CUSTOM_VIEW_NAME: 'invalidCustomViewName', MISSING_RANGEN_FOR_RELATIVE_DATE_FILTERS: 'missingRangeNForRelativeDateFilters', MISSING_MAX_SIZE: 'missingMaxSize', MISSING_MIN_SIZE: 'missingMinSize', MISSING_MINMAX_SIZE: 'missingMinMaxSize', INVALID_SIZE: 'invalidSize', INVALID_SIZE_BEHAVIOR_ON_WORKSHEET: 'invalidSizeBehaviorOnWorksheet', SHEET_NOT_IN_WORKBOOK: 'sheetNotInWorkbook', INDEX_OUT_OF_RANGE: 'indexOutOfRange', DOWNLOAD_WORKBOOK_NOT_ALLOWED: 'downloadWorkbookNotAllowed', NULL_OR_EMPTY_PARAMETER: 'nullOrEmptyParameter', BROWSER_NOT_CAPABLE: 'browserNotCapable', UNSUPPORTED_EVENT_NAME: 'unsupportedEventName', INVALID_DATE_PARAMETER: 'invalidDateParameter', INVALID_SELECTION_FIELDNAME: 'invalidSelectionFieldName', INVALID_SELECTION_VALUE: 'invalidSelectionValue', INVALID_SELECTION_DATE: 'invalidSelectionDate', NO_URL_FOR_HIDDEN_WORKSHEET: 'noUrlForHiddenWorksheet', MAX_VIZ_RESIZE_ATTEMPTS: 'maxVizResizeAttempts' };
    ns.FieldAggregationType = { SUM: 'SUM', AVG: 'AVG', MIN: 'MIN', MAX: 'MAX', STDEV: 'STDEV', STDEVP: 'STDEVP', VAR: 'VAR', VARP: 'VARP', COUNT: 'COUNT', COUNTD: 'COUNTD', MEDIAN: 'MEDIAN', ATTR: 'ATTR', NONE: 'NONE', PERCENTILE: 'PERCENTILE', YEAR: 'YEAR', QTR: 'QTR', MONTH: 'MONTH', DAY: 'DAY', HOUR: 'HOUR', MINUTE: 'MINUTE', SECOND: 'SECOND', WEEK: 'WEEK', WEEKDAY: 'WEEKDAY', MONTHYEAR: 'MONTHYEAR', MDY: 'MDY', END: 'END', TRUNC_YEAR: 'TRUNC_YEAR', TRUNC_QTR: 'TRUNC_QTR', TRUNC_MONTH: 'TRUNC_MONTH', TRUNC_WEEK: 'TRUNC_WEEK', TRUNC_DAY: 'TRUNC_DAY', TRUNC_HOUR: 'TRUNC_HOUR', TRUNC_MINUTE: 'TRUNC_MINUTE', TRUNC_SECOND: 'TRUNC_SECOND', QUART1: 'QUART1', QUART3: 'QUART3', SKEWNESS: 'SKEWNESS', KURTOSIS: 'KURTOSIS', INOUT: 'INOUT', SUM_XSQR: 'SUM_XSQR', USER: 'USER', COLLECT: 'COLLECT' };
    ns.FieldRoleType = { DIMENSION: 'dimension', MEASURE: 'measure', UNKNOWN: 'unknown' };
    ns.FilterUpdateType = { ALL: 'all', REPLACE: 'replace', ADD: 'add', REMOVE: 'remove' };
    ns.FilterType = { CATEGORICAL: 'categorical', QUANTITATIVE: 'quantitative', HIERARCHICAL: 'hierarchical', RELATIVEDATE: 'relativedate' };
    ns.NullOption = { NULL_VALUES: 'nullValues', NON_NULL_VALUES: 'nonNullValues', ALL_VALUES: 'allValues' };
    ns.ParameterAllowableValuesType = { ALL: 'all', LIST: 'list', RANGE: 'range' };
    ns.ParameterDataType = { FLOAT: 'float', INTEGER: 'integer', STRING: 'string', BOOLEAN: 'boolean', DATE: 'date', DATETIME: 'datetime' };
    ns.PeriodType = { YEAR: 'year', QUARTER: 'quarter', MONTH: 'month', WEEK: 'week', DAY: 'day', HOUR: 'hour', MINUTE: 'minute', SECOND: 'second' };
    ns.SelectionUpdateType = { REPLACE: 'replace', ADD: 'add', REMOVE: 'remove' };
    ns.SheetSizeBehavior = { AUTOMATIC: 'automatic', EXACTLY: 'exactly', RANGE: 'range', ATLEAST: 'atleast', ATMOST: 'atmost' };
    ns.SheetType = { WORKSHEET: 'worksheet', DASHBOARD: 'dashboard', STORY: 'story' };
    ns.TableauEventName = { CUSTOM_MARK_CONTEXT_MENU: 'custommarkcontextmenu', CUSTOM_VIEW_LOAD: 'customviewload', CUSTOM_VIEW_REMOVE: 'customviewremove', CUSTOM_VIEW_SAVE: 'customviewsave', CUSTOM_VIEW_SET_DEFAULT: 'customviewsetdefault', FILTER_CHANGE: 'filterchange', FIRST_INTERACTIVE: 'firstinteractive', FIRST_VIZ_SIZE_KNOWN: 'firstvizsizeknown', MARKS_SELECTION: 'marksselection', MARKS_HIGHLIGHT: 'markshighlight', PARAMETER_VALUE_CHANGE: 'parametervaluechange', STORY_POINT_SWITCH: 'storypointswitch', TAB_SWITCH: 'tabswitch', TOOLBAR_STATE_CHANGE: 'toolbarstatechange', URL_ACTION: 'urlaction', VIZ_RESIZE: 'vizresize' };
    ns.ToolbarPosition = { TOP: 'top', BOTTOM: 'bottom' };
    ns.ToolbarButtonName = { REDO: 'redo', UNDO: 'undo' };
    ns.MenuType = { UBERTIP: 'ubertip' };
  })();
})();
// END ApiShared

/*! API */
(function () {
  'use strict';

  var $asm = {};
  global.tab = global.tab || {};
  global.tableauSoftware = global.tableauSoftware || {};
  ss.initAssembly($asm, 'Tableau.JavaScript.Vql.Api');
  ////////////////////////////////////////////////////////////////////////////////
  // Tableau.JavaScript.Vql.Api.ApiBootstrap
  var $tab__ApiBootstrap = global.tab._ApiBootstrap = ss.mkType($asm, 'tab._ApiBootstrap', null, null, {
    initialize: function ApiBootstrap$Initialize() {
      // Register the default implementations for all of the interfaces.
      // The test code will register mocks, which will overwrite these
      // registrations.
      tab._ApiObjectRegistry.registerApiMessageRouter(function () {
        return new $tab_JsApiMessageRouter();
      });
    }
  });
  ////////////////////////////////////////////////////////////////////////////////
  // Tableau.JavaScript.Vql.Api.CustomViewImpl
  var $tab__CustomViewImpl = global.tab._CustomViewImpl = ss.mkType($asm, 'tab._CustomViewImpl', function (workbookImpl, name, messagingOptions) {
    this.$customView = null;
    this.$presModel = null;
    this.$workbookImpl = null;
    this.$messagingOptions = null;
    this.$name = null;
    this.$ownerName = null;
    this.$url = null;
    this.$isPublic = false;
    this.$isDefault = false;
    this.$isStale = false;
    this.$workbookImpl = workbookImpl;
    this.$name = name;
    this.$messagingOptions = messagingOptions;
    this.$isPublic = false;
    this.$isDefault = false;
    this.$isStale = false;
  }, {
    get_$customView: function CustomViewImpl$get_CustomView() {
      if (ss.isNullOrUndefined(this.$customView)) {
        this.$customView = new $tableauSoftware_CustomView(this);
      }
      return this.$customView;
    },
    get_$workbook: function CustomViewImpl$get_Workbook() {
      return this.$workbookImpl.get_workbook();
    },
    get_$url: function CustomViewImpl$get_Url() {
      return this.$url;
    },
    get_$name: function CustomViewImpl$get_Name() {
      return this.$name;
    },
    set_$name: function CustomViewImpl$set_Name(value) {
      if (this.$isStale) {
        throw tab._TableauException.create('staleDataReference', 'Stale data');
      }
      this.$name = value;
    },
    get_$ownerName: function CustomViewImpl$get_OwnerName() {
      return this.$ownerName;
    },
    get_$advertised: function CustomViewImpl$get_Advertised() {
      return this.$isPublic;
    },
    set_$advertised: function CustomViewImpl$set_Advertised(value) {
      if (this.$isStale) {
        throw tab._TableauException.create('staleDataReference', 'Stale data');
      }
      this.$isPublic = value;
    },
    get_$isDefault: function CustomViewImpl$get_IsDefault() {
      return this.$isDefault;
    },
    saveAsync: function CustomViewImpl$SaveAsync() {
      if (this.$isStale || ss.isNullOrUndefined(this.$presModel)) {
        throw tab._TableauException.create('staleDataReference', 'Stale data');
      }
      this.$presModel.isPublic = this.$isPublic;
      this.$presModel.name = this.$name;
      var deferred = new tab._Deferred();
      // prepare the parameter
      var param = {};
      param['api.customViewParam'] = this.$presModel;
      // send the command
      var returnHandler = $tab__CustomViewImpl.$createCustomViewCommandReturnHandler('api.UpdateCustomViewCommand', deferred, ss.mkdel(this, function (result) {
        $tab__CustomViewImpl._processCustomViewUpdate(this.$workbookImpl, this.$messagingOptions, result, true);
        deferred.resolve(this.get_$customView());
      }));
      this.$messagingOptions.sendCommand(Object).call(this.$messagingOptions, param, returnHandler);
      return deferred.get_promise();
    },
    $removeAsync: function CustomViewImpl$RemoveAsync() {
      var deferred = new tab._Deferred();
      var param = {};
      param['api.customViewParam'] = this.$presModel;
      // send the command
      var returnHandler = $tab__CustomViewImpl.$createCustomViewCommandReturnHandler('api.RemoveCustomViewCommand', deferred, ss.mkdel(this, function (result) {
        this.$isStale = true;
        $tab__CustomViewImpl._processCustomViews(this.$workbookImpl, this.$messagingOptions, result);
        deferred.resolve(this.get_$customView());
      }));
      this.$messagingOptions.sendCommand(Object).call(this.$messagingOptions, param, returnHandler);
      return deferred.get_promise();
    },
    _showAsync: function CustomViewImpl$ShowAsync() {
      // check if server's CustomizedView present
      if (this.$isStale || ss.isNullOrUndefined(this.$presModel)) {
        throw tab._TableauException.create('staleDataReference', 'Stale data');
      }
      return $tab__CustomViewImpl._showCustomViewAsync(this.$workbookImpl, this.$messagingOptions, this.$presModel);
    }
  }, {
    _getAsync: function CustomViewImpl$GetAsync(eventContext) {
      var deferred = new tab._Deferred();
      deferred.resolve(eventContext.get__customViewImpl().get_$customView());
      return deferred.get_promise();
    },
    _createNew: function CustomViewImpl$CreateNew(workbookImpl, messagingOptions, apiPresModel, defaultId) {
      var cv = new $tab__CustomViewImpl(workbookImpl, apiPresModel.name, messagingOptions);
      cv.$isPublic = apiPresModel.isPublic;
      cv.$url = apiPresModel.url;
      cv.$ownerName = apiPresModel.owner.friendlyName;
      cv.$isDefault = ss.isValue(defaultId) && ss.unbox(defaultId) === apiPresModel.id;
      cv.$presModel = apiPresModel;
      return cv;
    },
    _saveNewAsync: function CustomViewImpl$SaveNewAsync(workbookImpl, messagingOptions, name) {
      var deferred = new tab._Deferred();
      // prepare the parameter, if cv is null, show the original view
      var param = {};
      param['api.customViewName'] = name;
      // send the command
      var returnHandler = $tab__CustomViewImpl.$createCustomViewCommandReturnHandler('api.SaveNewCustomViewCommand', deferred, function (result) {
        $tab__CustomViewImpl._processCustomViewUpdate(workbookImpl, messagingOptions, result, true);
        // get the first view on the list. There should be only one in the list
        var newView = null;
        if (ss.isValue(workbookImpl.get_$updatedCustomViews())) {
          newView = workbookImpl.get_$updatedCustomViews().get_item(0);
        }
        deferred.resolve(newView);
      });
      messagingOptions.sendCommand(Object).call(messagingOptions, param, returnHandler);
      return deferred.get_promise();
    },
    _showCustomViewAsync: function CustomViewImpl$ShowCustomViewAsync(workbookImpl, messagingOptions, serverCustomizedView) {
      var deferred = new tab._Deferred();
      // prepare the parameter, if cv is null, show the original view
      var param = {};
      if (ss.isValue(serverCustomizedView)) {
        param['api.customViewParam'] = serverCustomizedView;
      }
      // send the command
      var returnHandler = $tab__CustomViewImpl.$createCustomViewCommandReturnHandler('api.ShowCustomViewCommand', deferred, function (result) {
        var cv = workbookImpl.get_activeCustomView();
        deferred.resolve(cv);
      });
      messagingOptions.sendCommand(Object).call(messagingOptions, param, returnHandler);
      return deferred.get_promise();
    },
    _makeCurrentCustomViewDefaultAsync: function CustomViewImpl$MakeCurrentCustomViewDefaultAsync(workbookImpl, messagingOptions) {
      var deferred = new tab._Deferred();
      // prepare the parameter, if cv is null, show the original view
      var param = {};
      // send the command
      var returnHandler = $tab__CustomViewImpl.$createCustomViewCommandReturnHandler('api.MakeCurrentCustomViewDefaultCommand', deferred, function (result) {
        var cv = workbookImpl.get_activeCustomView();
        deferred.resolve(cv);
      });
      messagingOptions.sendCommand(Object).call(messagingOptions, param, returnHandler);
      return deferred.get_promise();
    },
    _getCustomViewsAsync: function CustomViewImpl$GetCustomViewsAsync(workbookImpl, messagingOptions) {
      var deferred = new tab._Deferred();
      var returnHandler = new (ss.makeGenericType(tab.CommandReturnHandler$1, [Object]))('api.FetchCustomViewsCommand', 0, function (result) {
        $tab__CustomViewImpl._processCustomViews(workbookImpl, messagingOptions, result);
        deferred.resolve(workbookImpl.get_$customViews()._toApiCollection());
      }, function (remoteError, message) {
        deferred.reject(tab._TableauException.create('serverError', message));
      });
      messagingOptions.sendCommand(Object).call(messagingOptions, null, returnHandler);
      return deferred.get_promise();
    },
    _processCustomViews: function CustomViewImpl$ProcessCustomViews(workbookImpl, messagingOptions, info) {
      $tab__CustomViewImpl._processCustomViewUpdate(workbookImpl, messagingOptions, info, false);
    },
    _processCustomViewUpdate: function CustomViewImpl$ProcessCustomViewUpdate(workbookImpl, messagingOptions, customViewsInfo, shouldUpdateList) {
      workbookImpl.set_$currentCustomView(null);
      workbookImpl.set_$removedCustomViews(workbookImpl.get_$customViews());
      workbookImpl.set_$customViews(new tab._Collection());
      if (shouldUpdateList) {
        workbookImpl.set_$updatedCustomViews(new tab._Collection());
        if (ss.isValue(customViewsInfo.newView)) {
          // ReSharper disable once ConditionIsAlwaysTrueOrFalse
          $tab__CustomViewImpl.$processOneCustomViewUpdate(workbookImpl, messagingOptions, customViewsInfo, customViewsInfo.newView, shouldUpdateList);
        }
      }
      if (ss.isValue(customViewsInfo.customViews)) {
        for (var $t1 = 0; $t1 < customViewsInfo.customViews.length; $t1++) {
          var customView = customViewsInfo.customViews[$t1];
          $tab__CustomViewImpl.$processOneCustomViewUpdate(workbookImpl, messagingOptions, customViewsInfo, customView, shouldUpdateList);
        }
      }
    },
    buildCustomViewKeyForDuplicate: function CustomViewImpl$BuildCustomViewKeyForDuplicate(customViewName, userName) {
      // TFSID 1135015 - TODO: When removing user names for the URL we will likely also want to remove it
      // from this key. Note that doing so might break backwards compatibility with the API.
      // Do not use string.Format() as this doesn't transpile correctly.
      return customViewName + '/' + userName;
    },
    $processOneCustomViewUpdate: function CustomViewImpl$ProcessOneCustomViewUpdate(workbookImpl, messagingOptions, customViewsInfo, customView, shouldUpdateList) {
      var currentViewName = null;
      var currentOwnerName = null;
      if (ss.isValue(customViewsInfo.currentView)) {
        currentViewName = customViewsInfo.currentView.name;
        currentOwnerName = customViewsInfo.currentView.owner.friendlyName;
      }
      var defaultCustomViewId = customViewsInfo.defaultCustomViewId;
      var customViewImpl = $tab__CustomViewImpl._createNew(workbookImpl, messagingOptions, customView, defaultCustomViewId);
      // TFSID 783674: Since we use the custom view name as the unique key when storing custom views, an
      // exception will be thrown if two custom views with the same name exists. This can happen when two
      // different authors create a custom view with the same name. To avoid this problem in a way which
      // does not break backwards compatibility, we append the owner name as well to the key in this case
      // to distinguish each view in the internal collection.
      var customViewKey = customViewImpl.get_$name();
      if (workbookImpl.get_$customViews()._has(customViewKey)) {
        customViewKey = $tab__CustomViewImpl.buildCustomViewKeyForDuplicate(customViewImpl.get_$name(), customView.owner.username);
      }
      workbookImpl.get_$customViews()._add(customViewKey, customViewImpl.get_$customView());
      if (workbookImpl.get_$removedCustomViews()._has(customViewKey)) {
        workbookImpl.get_$removedCustomViews()._remove(customViewKey);
      } else if (shouldUpdateList && !workbookImpl.get_$updatedCustomViews()._has(customViewKey)) {
        workbookImpl.get_$updatedCustomViews()._add(customViewKey, customViewImpl.get_$customView());
      }
      if (ss.isValue(currentViewName) && ss.referenceEquals(customViewImpl.get_$name(), currentViewName) && ss.referenceEquals(customViewImpl.get_$ownerName(), currentOwnerName)) {
        workbookImpl.set_$currentCustomView(customViewImpl.get_$customView());
      }
    },
    $createCustomViewCommandReturnHandler: function CustomViewImpl$CreateCustomViewCommandReturnHandler(commandName, deferred, successCallback) {
      // BUGBUG: how to detect error??
      var errorCallback = function errorCallback(remoteError, message) {
        deferred.reject(tab._TableauException.create('serverError', message));
      };
      return new (ss.makeGenericType(tab.CommandReturnHandler$1, [Object]))(commandName, 0, successCallback, errorCallback);
    }
  });
  ////////////////////////////////////////////////////////////////////////////////
  // Tableau.JavaScript.Vql.Api.DashboardImpl
  var $tab__DashboardImpl = global.tab._DashboardImpl = ss.mkType($asm, 'tab._DashboardImpl', function (sheetInfoImpl, workbookImpl, messagingOptions) {
    this.$dashboard = null;
    this.$worksheets = new tab._Collection();
    this.$dashboardObjects = new tab._Collection();
    this.$filterCommandsBuilder = new tab.FilterCommandsBuilder();
    this.$sharedUtils = new tab.SharedUtils();
    $tab__SheetImpl.call(this, sheetInfoImpl, workbookImpl, messagingOptions);
  }, {
    get_sheet: function DashboardImpl$get_Sheet() {
      return this.get_dashboard();
    },
    get_dashboard: function DashboardImpl$get_Dashboard() {
      if (ss.isNullOrUndefined(this.$dashboard)) {
        this.$dashboard = new $tableauSoftware_Dashboard(this);
      }
      return this.$dashboard;
    },
    get_worksheets: function DashboardImpl$get_Worksheets() {
      return this.$worksheets;
    },
    get_objects: function DashboardImpl$get_Objects() {
      return this.$dashboardObjects;
    },
    $addObjects: function DashboardImpl$AddObjects(zones, findSheetFunc) {
      // Clear any existing objects.
      this.$dashboardObjects = new tab._Collection();
      this.$worksheets = new tab._Collection();
      for (var i = 0; i < zones.length; i++) {
        var zone = zones[i];
        var worksheet = null;
        if (zones[i].objectType === 'worksheet') {
          // ignore frames with null name
          var name = zone.name;
          if (ss.isNullOrUndefined(name)) {
            continue;
          }
          // The index of the contained sheet corresponds to how many
          // worksheets are in the dashboard.
          var index = this.$worksheets.get__length();
          // Contained sheets are always AUTOMATIC size.
          var size = tab.SheetSizeFactory.createAutomatic();
          // Contained sheets aren't active - the containing sheet is active.
          var isActive = false;
          // The contained sheet is hidden if it's not one of the published sheets.
          // The url is blank if the sheet is hidden.
          var publishedSheetInfo = findSheetFunc(name);
          var isHidden = ss.isNullOrUndefined(publishedSheetInfo);
          var url = isHidden ? '' : publishedSheetInfo.getUrl();
          var sheetInfoImpl = $tab__SheetInfoImpl.$ctor(name, 'worksheet', index, size, this.get_workbook(), url, isActive, isHidden, zone.zoneId);
          var worksheetImpl = new $tab__WorksheetImpl(sheetInfoImpl, this.get_workbookImpl(), this.get_messagingOptions(), this);
          worksheet = worksheetImpl.get_worksheet();
          this.$worksheets._add(name, worksheetImpl.get_worksheet());
        }
        var obj = new $tableauSoftware_DashboardObject(zone, this.get_dashboard(), worksheet);
        this.$dashboardObjects._add(i.toString(), obj);
      }
    },
    $getFiltersAsync: function DashboardImpl$GetFiltersAsync() {
      var deferred = new tab._Deferred();
      var commandParameters = {};
      var returnHandler = new (ss.makeGenericType(tab.CommandReturnHandler$1, [Object]))('api.GetDashboardFiltersListCommand', 0, ss.mkdel(this, function (result) {
        var sheetNames = Object.keys(result.filters);
        var filters = new Array();
        var $t1 = ss.getEnumerator(sheetNames);
        try {
          while ($t1.moveNext()) {
            var sheetName = $t1.current();
            for (var i = 0; i < this.get_worksheets().get__length(); i++) {
              if (ss.referenceEquals(this.get_worksheets().get_item(i)._impl.get_name(), sheetName)) {
                var $t2 = new Object();
                $t2.filters = Array.prototype.slice.call(result.filters[sheetName]);
                var worksheetFiltersPM = $t2;
                var worksheetFilters = $tableauSoftware_Filter.processFiltersList(this.get_worksheets().get_item(i)._impl, worksheetFiltersPM);
                filters = filters.concat(worksheetFilters._toApiCollection());
              }
            }
          }
        } finally {
          $t1.dispose();
        }
        deferred.resolve(filters);
      }), function (remoteError, message) {
        deferred.reject(tab._TableauException.createServerError(message));
      });
      this.sendCommand(Object).call(this, commandParameters, returnHandler);
      return deferred.get_promise();
    },
    $applyFilterAsync: function DashboardImpl$ApplyFilterAsync(fieldName, values, updateType, options) {
      this.$verifyActiveDashboard();
      var commandParameters = this.$filterCommandsBuilder.buildApplyFiltersCommandParams(fieldName, values, updateType, options);
      commandParameters['api.dashboardName'] = this.get_name();
      var deferred = new tab._Deferred();
      var returnHandler = this.$filterCommandsBuilder.createFilterCommandReturnHandler('api.ApplyDashboardCategoricalFilterCommand', fieldName, deferred);
      this.sendCommand(Object).call(this, commandParameters, returnHandler);
      return deferred.get_promise();
    },
    $verifyActiveDashboard: function DashboardImpl$VerifyActiveDashboard() {
      var isRootAndActiveDashboard = this.get_isActive();
      var isWithinActiveStoryPoint = ss.isValue(this.get_parentStoryPointImpl()) && this.get_parentStoryPointImpl().get_parentStoryImpl().get_isActive();
      if (!isRootAndActiveDashboard && !isWithinActiveStoryPoint) {
        throw tab._TableauException.createNotActiveSheet();
      }
    }
  });
  ////////////////////////////////////////////////////////////////////////////////
  // Tableau.JavaScript.Vql.Api.DataSourceImpl
  var $tab__DataSourceImpl = global.tab._DataSourceImpl = ss.mkType($asm, 'tab._DataSourceImpl', function (name, isPrimary) {
    this.$name = null;
    this.$fields = new tab._Collection();
    this.$isPrimary = false;
    this.$dataSource = null;
    tab._Param.verifyString(name, 'name');
    this.$name = name;
    this.$isPrimary = isPrimary;
  }, {
    get_dataSource: function DataSourceImpl$get_DataSource() {
      if (ss.isNullOrUndefined(this.$dataSource)) {
        this.$dataSource = new $tableauSoftware_DataSource(this);
      }
      return this.$dataSource;
    },
    get_name: function DataSourceImpl$get_Name() {
      return this.$name;
    },
    get_fields: function DataSourceImpl$get_Fields() {
      return this.$fields;
    },
    get_isPrimary: function DataSourceImpl$get_IsPrimary() {
      return this.$isPrimary;
    },
    addField: function DataSourceImpl$AddField(field) {
      this.$fields._add(field.getName(), field);
    }
  }, {
    processDataSource: function DataSourceImpl$ProcessDataSource(dataSourcePm) {
      var dataSourceImpl = new $tab__DataSourceImpl(dataSourcePm.name, dataSourcePm.isPrimary);
      // Add the fields.
      var fields = ss.coalesce(dataSourcePm.fields, []);
      for (var $t1 = 0; $t1 < fields.length; $t1++) {
        var fieldPm = fields[$t1];
        var fieldRole = tab.ApiEnumConverter.convertFieldRole(fieldPm.role);
        var fieldAggregation = tab.ApiEnumConverter.convertFieldAggregation(fieldPm.aggregation);
        var field = new $tableauSoftware_Field(dataSourceImpl.get_dataSource(), fieldPm.name, fieldRole, fieldAggregation);
        dataSourceImpl.addField(field);
      }
      return dataSourceImpl;
    },
    processDataSourcesForWorksheet: function DataSourceImpl$ProcessDataSourcesForWorksheet(pm) {
      var dataSources = new tab._Collection();
      var primaryDataSourceImpl = null;
      for (var $t1 = 0; $t1 < pm.dataSources.length; $t1++) {
        var dataSourcePm = pm.dataSources[$t1];
        var dataSourceImpl = $tab__DataSourceImpl.processDataSource(dataSourcePm);
        if (dataSourcePm.isPrimary) {
          // The primary data source is always the first one in the collection, so save it off
          // in a variable so we can insert it in the front later.
          primaryDataSourceImpl = dataSourceImpl;
        } else {
          dataSources._add(dataSourcePm.name, dataSourceImpl.get_dataSource());
        }
      }
      // Insert the primary data source to be the first element in the collection. This is the
      // convention specified in the API design.
      if (ss.isValue(primaryDataSourceImpl)) {
        dataSources._addToFirst(primaryDataSourceImpl.get_name(), primaryDataSourceImpl.get_dataSource());
      }
      return dataSources;
    }
  });
  ////////////////////////////////////////////////////////////////////////////////
  // Tableau.JavaScript.Vql.Api.SheetImpl
  var $tab__SheetImpl = global.tab._SheetImpl = ss.mkType($asm, 'tab._SheetImpl', function (sheetInfoImpl, workbookImpl, messagingOptions) {
    this.$name = null;
    this.$index = 0;
    this.$isActive = false;
    this.$isHidden = false;
    this.$sheetType = null;
    this.$size = null;
    this.$url = null;
    this.$workbookImpl = null;
    this.$messagingOptions = null;
    this.$parentStoryPointImpl = null;
    this.$zoneId = 0;
    tab._Param.verifyValue(sheetInfoImpl, 'sheetInfoImpl');
    tab._Param.verifyValue(workbookImpl, 'workbookImpl');
    tab._Param.verifyValue(messagingOptions, 'messagingOptions');
    this.$name = sheetInfoImpl.name;
    this.$index = sheetInfoImpl.index;
    this.$isActive = sheetInfoImpl.isActive;
    this.$isHidden = sheetInfoImpl.isHidden;
    this.$sheetType = sheetInfoImpl.sheetType;
    this.$size = sheetInfoImpl.size;
    this.$url = sheetInfoImpl.url;
    this.$workbookImpl = workbookImpl;
    this.$messagingOptions = messagingOptions;
    this.$zoneId = sheetInfoImpl.zoneId;
  }, {
    get_sheet: null,
    get_name: function SheetImpl$get_Name() {
      return this.$name;
    },
    get_index: function SheetImpl$get_Index() {
      return this.$index;
    },
    get_workbookImpl: function SheetImpl$get_WorkbookImpl() {
      return this.$workbookImpl;
    },
    get_workbook: function SheetImpl$get_Workbook() {
      return this.$workbookImpl.get_workbook();
    },
    get_url: function SheetImpl$get_Url() {
      if (this.$isHidden) {
        throw tab._TableauException.createNoUrlForHiddenWorksheet();
      }
      return this.$url;
    },
    get_size: function SheetImpl$get_Size() {
      return this.$size;
    },
    get_isHidden: function SheetImpl$get_IsHidden() {
      return this.$isHidden;
    },
    get_isActive: function SheetImpl$get_IsActive() {
      return this.$isActive;
    },
    set_isActive: function SheetImpl$set_IsActive(value) {
      this.$isActive = value;
    },
    get_isDashboard: function SheetImpl$get_IsDashboard() {
      return this.$sheetType === 'dashboard';
    },
    get_isStory: function SheetImpl$get_IsStory() {
      return this.$sheetType === 'story';
    },
    get_sheetType: function SheetImpl$get_SheetType() {
      return this.$sheetType;
    },
    get_parentStoryPoint: function SheetImpl$get_ParentStoryPoint() {
      if (ss.isValue(this.$parentStoryPointImpl)) {
        return this.$parentStoryPointImpl.get_storyPoint();
      }
      return null;
    },
    get_parentStoryPointImpl: function SheetImpl$get_ParentStoryPointImpl() {
      return this.$parentStoryPointImpl;
    },
    set_parentStoryPointImpl: function SheetImpl$set_ParentStoryPointImpl(value) {
      if (this.$sheetType === 'story') {
        throw tab._TableauException.createInternalError('A story cannot be a child of another story.');
      }
      this.$parentStoryPointImpl = value;
    },
    get_zoneId: function SheetImpl$get_ZoneId() {
      return this.$zoneId;
    },
    get_messagingOptions: function SheetImpl$get_MessagingOptions() {
      return this.$messagingOptions;
    },
    changeSizeAsync: function SheetImpl$ChangeSizeAsync(newSize) {
      newSize = $tab__SheetImpl.$normalizeSheetSize(newSize);
      if (this.$sheetType === 'worksheet' && newSize.behavior !== 'automatic') {
        throw tab._TableauException.createInvalidSizeBehaviorOnWorksheet();
      }
      var deferred = new tab._Deferred();
      if (this.$size.behavior === newSize.behavior && newSize.behavior === 'automatic') {
        deferred.resolve(newSize);
        return deferred.get_promise();
        // nothing to do
      }
      var dict = this.$processSheetSize(newSize);
      // prepare the parameter
      var param = {};
      param['api.setSheetSizeName'] = this.$name;
      param['api.minWidth'] = dict['api.minWidth'];
      param['api.minHeight'] = dict['api.minHeight'];
      param['api.maxWidth'] = dict['api.maxWidth'];
      param['api.maxHeight'] = dict['api.maxHeight'];
      // call cross domain
      var returnHandler = new (ss.makeGenericType(tab.CommandReturnHandler$1, [Object]))('api.SetSheetSizeCommand', 0, ss.mkdel(this, function (result) {
        // B66878
        // set sheet size updates the layout
        // load the updated workbook info from client
        this.get_workbookImpl()._update(ss.mkdel(this, function () {
          var updatedSize = this.get_workbookImpl().get_publishedSheets()._get(this.get_name()).getSize();
          deferred.resolve(updatedSize);
        }));
      }), function (remoteError, message) {
        deferred.reject(tab._TableauException.createServerError(message));
      });
      this.sendCommand(Object).call(this, param, returnHandler);
      return deferred.get_promise();
    },
    sendCommand: function sendCommand(T) {
      return function SheetImpl$SendCommand(commandParameters, returnHandler) {
        this.$messagingOptions.sendCommand(T).call(this.$messagingOptions, commandParameters, returnHandler);
      };
    },
    $processSheetSize: function SheetImpl$ProcessSheetSize(newSize) {
      var fixedSheetSize = null;
      if (ss.isNullOrUndefined(newSize) || ss.isNullOrUndefined(newSize.behavior) || newSize.behavior !== 'automatic' && ss.isNullOrUndefined(newSize.minSize) && ss.isNullOrUndefined(newSize.maxSize)) {
        throw tab._TableauException.createInvalidSheetSizeParam();
      }
      var minWidth = 0;
      var minHeight = 0;
      var maxWidth = 0;
      var maxHeight = 0;
      var dict = {};
      dict['api.minWidth'] = 0;
      dict['api.minHeight'] = 0;
      dict['api.maxWidth'] = 0;
      dict['api.maxHeight'] = 0;
      if (newSize.behavior === 'automatic') {
        fixedSheetSize = tab.SheetSize.$ctor('automatic', undefined, undefined);
      } else if (newSize.behavior === 'atmost') {
        if (ss.isNullOrUndefined(newSize.maxSize) || ss.isNullOrUndefined(newSize.maxSize.width) || ss.isNullOrUndefined(newSize.maxSize.height)) {
          throw tab._TableauException.createMissingMaxSize();
        }
        if (newSize.maxSize.width < 0 || newSize.maxSize.height < 0) {
          throw tab._TableauException.createInvalidSizeValue();
        }
        dict['api.maxWidth'] = newSize.maxSize.width;
        dict['api.maxHeight'] = newSize.maxSize.height;
        fixedSheetSize = tab.SheetSize.$ctor('atmost', undefined, newSize.maxSize);
      } else if (newSize.behavior === 'atleast') {
        if (ss.isNullOrUndefined(newSize.minSize) || ss.isNullOrUndefined(newSize.minSize.width) || ss.isNullOrUndefined(newSize.minSize.height)) {
          throw tab._TableauException.createMissingMinSize();
        }
        if (newSize.minSize.width < 0 || newSize.minSize.height < 0) {
          throw tab._TableauException.createInvalidSizeValue();
        }
        dict['api.minWidth'] = newSize.minSize.width;
        dict['api.minHeight'] = newSize.minSize.height;
        fixedSheetSize = tab.SheetSize.$ctor('atleast', newSize.minSize, undefined);
      } else if (newSize.behavior === 'range') {
        if (ss.isNullOrUndefined(newSize.minSize) || ss.isNullOrUndefined(newSize.maxSize) || ss.isNullOrUndefined(newSize.minSize.width) || ss.isNullOrUndefined(newSize.maxSize.width) || ss.isNullOrUndefined(newSize.minSize.height) || ss.isNullOrUndefined(newSize.maxSize.height)) {
          throw tab._TableauException.createMissingMinMaxSize();
        }
        if (newSize.minSize.width < 0 || newSize.minSize.height < 0 || newSize.maxSize.width < 0 || newSize.maxSize.height < 0 || newSize.minSize.width > newSize.maxSize.width || newSize.minSize.height > newSize.maxSize.height) {
          throw tab._TableauException.createInvalidRangeSize();
        }
        dict['api.minWidth'] = newSize.minSize.width;
        dict['api.minHeight'] = newSize.minSize.height;
        dict['api.maxWidth'] = newSize.maxSize.width;
        dict['api.maxHeight'] = newSize.maxSize.height;
        fixedSheetSize = tab.SheetSize.$ctor('range', newSize.minSize, newSize.maxSize);
      } else if (newSize.behavior === 'exactly') {
        if (ss.isValue(newSize.minSize) && ss.isValue(newSize.maxSize) && ss.isValue(newSize.minSize.width) && ss.isValue(newSize.maxSize.width) && ss.isValue(newSize.minSize.height) && ss.isValue(newSize.maxSize.height)) {
          minWidth = newSize.minSize.width;
          minHeight = newSize.minSize.height;
          maxWidth = newSize.maxSize.width;
          maxHeight = newSize.maxSize.height;
          if (minWidth !== maxWidth || minHeight !== maxHeight) {
            throw tab._TableauException.createSizeConflictForExactly();
          }
        } else if (ss.isValue(newSize.minSize) && ss.isValue(newSize.minSize.width) && ss.isValue(newSize.minSize.height)) {
          minWidth = newSize.minSize.width;
          minHeight = newSize.minSize.height;
          maxWidth = minWidth;
          maxHeight = minHeight;
        } else if (ss.isValue(newSize.maxSize) && ss.isValue(newSize.maxSize.width) && ss.isValue(newSize.maxSize.height)) {
          maxWidth = newSize.maxSize.width;
          maxHeight = newSize.maxSize.height;
          minWidth = maxWidth;
          minHeight = maxHeight;
        }
        dict['api.minWidth'] = minWidth;
        dict['api.minHeight'] = minHeight;
        dict['api.maxWidth'] = maxWidth;
        dict['api.maxHeight'] = maxHeight;
        fixedSheetSize = tab.SheetSize.$ctor('exactly', tab.Size.$ctor(minWidth, minHeight), tab.Size.$ctor(maxWidth, maxHeight));
      }
      this.$size = fixedSheetSize;
      return dict;
    }
  }, {
    $convertValueToIntIfValid: function SheetImpl$ConvertValueToIntIfValid(value) {
      if (ss.isValue(value)) {
        return tab._Utility.toInt(value);
      }
      return value;
    },
    $normalizeSheetSize: function SheetImpl$NormalizeSheetSize(size) {
      var behavior = tab.PublicEnums.normalizeEnum(tab.ApiSheetSizeBehavior).call(null, size.behavior, 'size.behavior');
      // make sure we convert the value to int if not null or undefined
      var minSize = size.minSize;
      if (ss.isValue(minSize)) {
        minSize = tab.Size.$ctor($tab__SheetImpl.$convertValueToIntIfValid(size.minSize.width), $tab__SheetImpl.$convertValueToIntIfValid(size.minSize.height));
      }
      var maxSize = size.maxSize;
      if (ss.isValue(maxSize)) {
        maxSize = tab.Size.$ctor($tab__SheetImpl.$convertValueToIntIfValid(size.maxSize.width), $tab__SheetImpl.$convertValueToIntIfValid(size.maxSize.height));
      }
      return tab.SheetSize.$ctor(behavior, minSize, maxSize);
    }
  });
  ////////////////////////////////////////////////////////////////////////////////
  // Tableau.JavaScript.Vql.Api.ApiSheetInfoImpl
  var $tab__SheetInfoImpl = global.tab._SheetInfoImpl = ss.mkType($asm, 'tab._SheetInfoImpl', null, null, {
    $ctor: function $ctor(name, sheetType, index, size, workbook, url, isActive, isHidden, zoneId) {
      var $this = new Object();
      $this.name = null;
      $this.index = 0;
      $this.workbook = null;
      $this.url = null;
      $this.isHidden = false;
      $this.sheetType = null;
      $this.zoneId = 0;
      $this.size = null;
      $this.isActive = false;
      $this.name = name;
      $this.sheetType = sheetType;
      $this.index = index;
      $this.size = size;
      $this.workbook = workbook;
      $this.url = url;
      $this.isActive = isActive;
      $this.isHidden = isHidden;
      $this.zoneId = zoneId;
      return $this;
    },
    isInstanceOfType: function isInstanceOfType() {
      return true;
    }
  });
  ////////////////////////////////////////////////////////////////////////////////
  // Tableau.JavaScript.Vql.Api.StoryImpl
  var $tab__StoryImpl = global.tab._StoryImpl = ss.mkType($asm, 'tab._StoryImpl', function (sheetInfoImpl, workbookImpl, messagingOptions, storyPm, findSheetFunc) {
    this.$activeStoryPointImpl = null;
    this.$findSheetFunc = null;
    this.$story = null;
    this.$storyPointsInfo = null;
    this.$2$ActiveStoryPointChangeField = null;
    $tab__SheetImpl.call(this, sheetInfoImpl, workbookImpl, messagingOptions);
    tab._Param.verifyValue(storyPm, 'storyPm');
    tab._Param.verifyValue(findSheetFunc, 'findSheetFunc');
    this.$findSheetFunc = findSheetFunc;
    this.update(storyPm);
  }, {
    add_activeStoryPointChange: function StoryImpl$add_ActiveStoryPointChange(value) {
      this.$2$ActiveStoryPointChangeField = ss.delegateCombine(this.$2$ActiveStoryPointChangeField, value);
    },
    remove_activeStoryPointChange: function StoryImpl$remove_ActiveStoryPointChange(value) {
      this.$2$ActiveStoryPointChangeField = ss.delegateRemove(this.$2$ActiveStoryPointChangeField, value);
    },
    get_activeStoryPointImpl: function StoryImpl$get_ActiveStoryPointImpl() {
      return this.$activeStoryPointImpl;
    },
    get_sheet: function StoryImpl$get_Sheet() {
      return this.get_story();
    },
    get_story: function StoryImpl$get_Story() {
      if (ss.isNullOrUndefined(this.$story)) {
        this.$story = new $tableauSoftware_Story(this);
      }
      return this.$story;
    },
    get_storyPointsInfo: function StoryImpl$get_StoryPointsInfo() {
      return this.$storyPointsInfo;
    },
    update: function StoryImpl$Update(storyPm) {
      var activeStoryPointContainedSheetInfo = null;
      var newActiveStoryPointInfoImpl = null;
      // Initialize the story points. This will preserve any existing state
      // that has already been initialized and will add any new story points.
      this.$storyPointsInfo = this.$storyPointsInfo || new Array(storyPm.storyPoints.length);
      for (var i = 0; i < storyPm.storyPoints.length; i++) {
        var storyPointPm = storyPm.storyPoints[i];
        var caption = storyPointPm.caption;
        var isActive = i === storyPm.activeStoryPointIndex;
        var storyPointInfoImpl = $tab__StoryPointInfoImpl.$ctor(caption, i, storyPointPm.storyPointId, isActive, storyPointPm.isUpdated, this);
        // Add the new story point info to the collection (remember that in
        // JavaScript you can index an array out of bounds).
        if (ss.isNullOrUndefined(this.$storyPointsInfo[i])) {
          this.$storyPointsInfo[i] = new $tableauSoftware_StoryPointInfo(storyPointInfoImpl);
        } else if (this.$storyPointsInfo[i]._impl.storyPointId === storyPointInfoImpl.storyPointId) {
          // Just update the state.
          var existing = this.$storyPointsInfo[i]._impl;
          existing.caption = storyPointInfoImpl.caption;
          existing.index = storyPointInfoImpl.index;
          existing.isActive = isActive;
          existing.isUpdated = storyPointInfoImpl.isUpdated;
        } else {
          // Replace the existing info with a new one.
          this.$storyPointsInfo[i] = new $tableauSoftware_StoryPointInfo(storyPointInfoImpl);
        }
        if (isActive) {
          activeStoryPointContainedSheetInfo = storyPointPm.containedSheetInfo;
          newActiveStoryPointInfoImpl = storyPointInfoImpl;
        }
      }
      // Remove any story points that have been removed.
      var deleteCount = this.$storyPointsInfo.length - storyPm.storyPoints.length;
      this.$storyPointsInfo.splice(storyPm.storyPoints.length, deleteCount);
      // See if a new story point has become active.
      var activeStoryPointChanged = ss.isNullOrUndefined(this.$activeStoryPointImpl) || this.$activeStoryPointImpl.get_storyPointId() !== newActiveStoryPointInfoImpl.storyPointId;
      // If a new story point has become active, mark the old instance as inactive.
      if (ss.isValue(this.$activeStoryPointImpl) && activeStoryPointChanged) {
        this.$activeStoryPointImpl.set_isActive(false);
      }
      // Initialize the active story point only if the state has changed for the active story point.
      var previouslyActiveStoryPoint = this.$activeStoryPointImpl;
      if (activeStoryPointChanged) {
        var containedSheetImpl = $tab__StoryPointImpl.createContainedSheet(activeStoryPointContainedSheetInfo, this.get_workbookImpl(), this.get_messagingOptions(), this.$findSheetFunc);
        this.$activeStoryPointImpl = new $tab__StoryPointImpl(newActiveStoryPointInfoImpl, containedSheetImpl);
      } else {
        // Update the state of the active story point.
        this.$activeStoryPointImpl.set_isActive(newActiveStoryPointInfoImpl.isActive);
        this.$activeStoryPointImpl.set_isUpdated(newActiveStoryPointInfoImpl.isUpdated);
      }
      // Raise an event if the active story point has changed (it won't get
      // raised the first time this object is initialized, which is what we want).
      if (activeStoryPointChanged && ss.isValue(previouslyActiveStoryPoint)) {
        this.$raiseActiveStoryPointChange(this.$storyPointsInfo[previouslyActiveStoryPoint.get_index()], this.$activeStoryPointImpl.get_storyPoint());
      }
    },
    activatePreviousStoryPointAsync: function StoryImpl$ActivatePreviousStoryPointAsync() {
      return this.$activatePreviousNextStoryPointAsync('api.ActivatePreviousStoryPoint');
    },
    activateNextStoryPointAsync: function StoryImpl$ActivateNextStoryPointAsync() {
      return this.$activatePreviousNextStoryPointAsync('api.ActivateNextStoryPoint');
    },
    activateStoryPointAsync: function StoryImpl$ActivateStoryPointAsync(index) {
      var deferred = new tab._Deferred();
      if (index < 0 || index >= this.$storyPointsInfo.length) {
        throw tab._TableauException.createIndexOutOfRange(index);
      }
      // Create the cross-domain command parameters.
      var commandParameters = {};
      commandParameters['api.storyPointIndex'] = index;
      // Set up the command processing upon completion.
      var returnHandler = new (ss.makeGenericType(tab.CommandReturnHandler$1, [Object]))('api.ActivateStoryPoint', 0, ss.mkdel(this, function (result) {
        this.$updateActiveState(result);
        deferred.resolve(this.$activeStoryPointImpl.get_storyPoint());
      }), function (remoteError, errorMessage) {
        deferred.reject(tab._TableauException.createServerError(errorMessage));
      });
      // Send the command to the iframe code.
      this.sendCommand(Object).call(this, commandParameters, returnHandler);
      return deferred.get_promise();
    },
    revertStoryPointAsync: function StoryImpl$RevertStoryPointAsync(index) {
      // Use the current story point if index is not supplied.
      index = index || this.$activeStoryPointImpl.get_index();
      if (index < 0 || index >= this.$storyPointsInfo.length) {
        throw tab._TableauException.createIndexOutOfRange(index);
      }
      var deferred = new tab._Deferred();
      // Create the cross-domain command parameters.
      var commandParameters = {};
      commandParameters['api.storyPointIndex'] = index;
      // Set up the command processing upon completion.
      var returnHandler = new (ss.makeGenericType(tab.CommandReturnHandler$1, [Object]))('api.RevertStoryPoint', 0, ss.mkdel(this, function (result) {
        this.$updateStoryPointInfo(index, result);
        deferred.resolve(this.$storyPointsInfo[index]);
      }), function (remoteError, errorMessage) {
        deferred.reject(tab._TableauException.createServerError(errorMessage));
      });
      // Send the command to the iframe code.
      this.sendCommand(Object).call(this, commandParameters, returnHandler);
      return deferred.get_promise();
    },
    $activatePreviousNextStoryPointAsync: function StoryImpl$ActivatePreviousNextStoryPointAsync(commandName) {
      // Make sure the command name is one that we expect.
      if (commandName !== 'api.ActivatePreviousStoryPoint' && commandName !== 'api.ActivateNextStoryPoint') {
        throw tab._TableauException.createInternalError("commandName '" + commandName + "' is invalid.");
      }
      var deferred = new tab._Deferred();
      // Create the cross-domain command parameters.
      var commandParameters = {};
      // Set up the command processing upon completion.
      var returnHandler = new (ss.makeGenericType(tab.CommandReturnHandler$1, [Object]))(commandName, 0, ss.mkdel(this, function (result) {
        this.$updateActiveState(result);
        deferred.resolve(this.$activeStoryPointImpl.get_storyPoint());
      }), function (remoteError, errorMessage) {
        deferred.reject(tab._TableauException.createServerError(errorMessage));
      });
      // Send the command to the iframe code.
      this.sendCommand(Object).call(this, commandParameters, returnHandler);
      return deferred.get_promise();
    },
    $updateStoryPointInfo: function StoryImpl$UpdateStoryPointInfo(index, newStoryPointPm) {
      // Make sure we're updating the same story point.
      var existingImpl = this.$storyPointsInfo[index]._impl;
      if (existingImpl.storyPointId !== newStoryPointPm.storyPointId) {
        throw tab._TableauException.createInternalError("We should not be updating a story point where the IDs don't match. Existing storyPointID=" + existingImpl.storyPointId + ', newStoryPointID=' + newStoryPointPm.storyPointId);
      }
      existingImpl.caption = newStoryPointPm.caption;
      existingImpl.isUpdated = newStoryPointPm.isUpdated;
      // Update the active StoryPoint if necessary.
      if (newStoryPointPm.storyPointId === this.$activeStoryPointImpl.get_storyPointId()) {
        this.$activeStoryPointImpl.set_isUpdated(newStoryPointPm.isUpdated);
      }
    },
    $updateActiveState: function StoryImpl$UpdateActiveState(newActiveStoryPointPm) {
      // Compare updates to the current state of the story
      var previouslyActiveStoryPointImpl = this.$activeStoryPointImpl;
      var newActiveIndex = newActiveStoryPointPm.index;
      // No need to do anything if we didn't switch story points.
      if (previouslyActiveStoryPointImpl.get_index() === newActiveIndex) {
        return;
      }
      var oldStoryPointInfo = this.$storyPointsInfo[previouslyActiveStoryPointImpl.get_index()];
      var newStoryPointInfoImpl = this.$storyPointsInfo[newActiveIndex]._impl;
      var containedSheetImpl = $tab__StoryPointImpl.createContainedSheet(newActiveStoryPointPm.containedSheetInfo, this.get_workbookImpl(), this.get_messagingOptions(), this.$findSheetFunc);
      // Change the active state for the new and the old.
      newStoryPointInfoImpl.isActive = true;
      this.$activeStoryPointImpl = new $tab__StoryPointImpl(newStoryPointInfoImpl, containedSheetImpl);
      previouslyActiveStoryPointImpl.set_isActive(false);
      oldStoryPointInfo._impl.isActive = false;
      this.$raiseActiveStoryPointChange(oldStoryPointInfo, this.$activeStoryPointImpl.get_storyPoint());
    },
    $raiseActiveStoryPointChange: function StoryImpl$RaiseActiveStoryPointChange(oldStoryPointInfo, newStoryPoint) {
      if (!ss.staticEquals(this.$2$ActiveStoryPointChangeField, null)) {
        this.$2$ActiveStoryPointChangeField(oldStoryPointInfo, newStoryPoint);
      }
    }
  });
  ////////////////////////////////////////////////////////////////////////////////
  // Tableau.JavaScript.Vql.Api.StoryPointImpl
  var $tab__StoryPointImpl = global.tab._StoryPointImpl = ss.mkType($asm, 'tab._StoryPointImpl', function (storyPointInfoImpl, containedSheetImpl) {
    this.$caption = null;
    this.$index = 0;
    this.$isActive = false;
    this.$isUpdated = false;
    this.$containedSheetImpl = null;
    this.$parentStoryImpl = null;
    this.$storyPoint = null;
    this.$storyPointId = 0;
    this.$isActive = storyPointInfoImpl.isActive;
    this.$isUpdated = storyPointInfoImpl.isUpdated;
    this.$caption = storyPointInfoImpl.caption;
    this.$index = storyPointInfoImpl.index;
    this.$parentStoryImpl = storyPointInfoImpl.parentStoryImpl;
    this.$storyPointId = storyPointInfoImpl.storyPointId;
    this.$containedSheetImpl = containedSheetImpl;
    // Set the parent pointers back to this instance.
    if (ss.isValue(containedSheetImpl)) {
      this.$containedSheetImpl.set_parentStoryPointImpl(this);
      if (containedSheetImpl.get_sheetType() === 'dashboard') {
        var containedDashboardImpl = ss.cast(this.$containedSheetImpl, $tab__DashboardImpl);
        for (var i = 0; i < containedDashboardImpl.get_worksheets().get__length(); i++) {
          var worksheet = containedDashboardImpl.get_worksheets().get_item(i);
          worksheet._impl.set_parentStoryPointImpl(this);
        }
      }
    }
  }, {
    get_caption: function StoryPointImpl$get_Caption() {
      return this.$caption;
    },
    get_containedSheetImpl: function StoryPointImpl$get_ContainedSheetImpl() {
      return this.$containedSheetImpl;
    },
    get_index: function StoryPointImpl$get_Index() {
      return this.$index;
    },
    get_isActive: function StoryPointImpl$get_IsActive() {
      return this.$isActive;
    },
    set_isActive: function StoryPointImpl$set_IsActive(value) {
      this.$isActive = value;
    },
    get_isUpdated: function StoryPointImpl$get_IsUpdated() {
      return this.$isUpdated;
    },
    set_isUpdated: function StoryPointImpl$set_IsUpdated(value) {
      this.$isUpdated = value;
    },
    get_parentStoryImpl: function StoryPointImpl$get_ParentStoryImpl() {
      return this.$parentStoryImpl;
    },
    get_storyPoint: function StoryPointImpl$get_StoryPoint() {
      if (ss.isNullOrUndefined(this.$storyPoint)) {
        this.$storyPoint = new $tableauSoftware_StoryPoint(this);
      }
      return this.$storyPoint;
    },
    get_storyPointId: function StoryPointImpl$get_StoryPointId() {
      return this.$storyPointId;
    },
    $toInfoImpl: function StoryPointImpl$ToInfoImpl() {
      return $tab__StoryPointInfoImpl.$ctor(this.$caption, this.$index, this.$storyPointId, this.$isActive, this.$isUpdated, this.$parentStoryImpl);
    }
  }, {
    createContainedSheet: function StoryPointImpl$CreateContainedSheet(containedSheetInfo, workbookImpl, messagingOptions, findSheetFunc) {
      //The story is blank and does not contain a sheet.
      if (ss.isNullOrUndefined(containedSheetInfo) || ss.isNullOrUndefined(containedSheetInfo.name)) {
        return null;
      }
      var containedSheetType = tab.ApiEnumConverter.convertSheetType(containedSheetInfo.sheetType);
      // Index doesn't mean anything for a contained sheet.
      var index = -1;
      // Contained sheets are always AUTOMATIC size.
      var size = tab.SheetSizeFactory.createAutomatic();
      // Contained sheets aren't active - the containing sheet is active.
      var isActive = false;
      // The contained sheet is hidden if it's not one of the published sheets.
      // The url is blank if the sheet is hidden.
      var publishedSheetInfo = findSheetFunc(containedSheetInfo.name);
      var isHidden = ss.isNullOrUndefined(publishedSheetInfo);
      var url = isHidden ? '' : publishedSheetInfo.getUrl();
      var sheetInfoImpl = $tab__SheetInfoImpl.$ctor(containedSheetInfo.name, containedSheetType, index, size, workbookImpl.get_workbook(), url, isActive, isHidden, containedSheetInfo.zoneId);
      if (containedSheetInfo.sheetType === 'worksheet') {
        var parentDashboardImpl = null;
        var worksheetImpl = new $tab__WorksheetImpl(sheetInfoImpl, workbookImpl, messagingOptions, parentDashboardImpl);
        return worksheetImpl;
      } else if (containedSheetInfo.sheetType === 'dashboard') {
        var dashboardImpl = new $tab__DashboardImpl(sheetInfoImpl, workbookImpl, messagingOptions);
        // Add all of the dashboard objects.
        var dashboardZones = $tab__WorkbookImpl.$createDashboardZones(containedSheetInfo.dashboardZones);
        dashboardImpl.$addObjects(dashboardZones, findSheetFunc);
        return dashboardImpl;
      } else if (containedSheetInfo.sheetType === 'story') {
        throw tab._TableauException.createInternalError('Cannot have a story embedded within another story.');
      } else {
        throw tab._TableauException.createInternalError("Unknown sheet type '" + containedSheetInfo.sheetType + "'");
      }
    }
  });
  ////////////////////////////////////////////////////////////////////////////////
  // Tableau.JavaScript.Vql.Api.StoryPointInfoImpl
  var $tab__StoryPointInfoImpl = global.tab._StoryPointInfoImpl = ss.mkType($asm, 'tab._StoryPointInfoImpl', null, null, {
    $ctor: function $ctor(caption, index, storyPointId, isActive, isUpdated, parentStoryImpl) {
      var $this = new Object();
      $this.storyPointId = 0;
      $this.parentStoryImpl = null;
      $this.caption = null;
      $this.index = 0;
      $this.isActive = false;
      $this.isUpdated = false;
      $this.caption = caption;
      $this.index = index;
      $this.storyPointId = storyPointId;
      $this.isActive = isActive;
      $this.isUpdated = isUpdated;
      $this.parentStoryImpl = parentStoryImpl;
      return $this;
    },
    isInstanceOfType: function isInstanceOfType() {
      return true;
    }
  });
  ////////////////////////////////////////////////////////////////////////////////
  // Tableau.JavaScript.Vql.Api.ToolbarStateImpl
  var $tab__ToolbarStateImpl = global.tab._ToolbarStateImpl = ss.mkType($asm, 'tab._ToolbarStateImpl', function (vizImpl, toolbarStatePresModel) {
    this.$toolbarState = null;
    this.$vizImpl = null;
    this.$toolbarStatePresModel = null;
    this.$vizImpl = vizImpl;
    this.$toolbarStatePresModel = toolbarStatePresModel;
  }, {
    get_toolbarState: function ToolbarStateImpl$get_ToolbarState() {
      if (ss.isNullOrUndefined(this.$toolbarState)) {
        this.$toolbarState = new $tableauSoftware_ToolbarState(this);
      }
      return this.$toolbarState;
    },
    get_viz: function ToolbarStateImpl$get_Viz() {
      return this.$vizImpl.get_$viz();
    },
    isButtonEnabled: function ToolbarStateImpl$IsButtonEnabled(toolbarButtonName) {
      switch (toolbarButtonName) {
        case 'redo':
          {
            return this.$toolbarStatePresModel.canRedo;
          }
        case 'undo':
          {
            return this.$toolbarStatePresModel.canUndo;
          }
        default:
          {
            throw tab._TableauException.createInvalidToolbarButtonName(toolbarButtonName);
          }
      }
    }
  });
  ////////////////////////////////////////////////////////////////////////////////
  // Tableau.JavaScript.Vql.Api.VizManagerImpl
  var $tab__VizManagerImpl = ss.mkType($asm, 'tab._VizManagerImpl', null, null, {
    get_$clonedVizs: function VizManagerImpl$get_ClonedVizs() {
      return $tab__VizManagerImpl.$vizs.concat();
    },
    $registerViz: function VizManagerImpl$RegisterViz(viz) {
      $tab__VizManagerImpl.$verifyVizNotAlreadyParented(viz);
      $tab__VizManagerImpl.$vizs.push(viz);
    },
    $unregisterViz: function VizManagerImpl$UnregisterViz(viz) {
      for (var i = 0, len = $tab__VizManagerImpl.$vizs.length; i < len; i++) {
        if (ss.referenceEquals($tab__VizManagerImpl.$vizs[i], viz)) {
          // Remove the viz from the array.
          $tab__VizManagerImpl.$vizs.splice(i, 1);
          break;
        }
      }
    },
    $sendVisibleRects: function VizManagerImpl$SendVisibleRects() {
      for (var i = 0, len = $tab__VizManagerImpl.$vizs.length; i < len; i++) {
        $tab__VizManagerImpl.$vizs[i]._impl.$sendVisibleRect();
      }
    },
    $verifyVizNotAlreadyParented: function VizManagerImpl$VerifyVizNotAlreadyParented(viz) {
      var parent = viz.getParentElement();
      for (var i = 0, len = $tab__VizManagerImpl.$vizs.length; i < len; i++) {
        if (ss.referenceEquals($tab__VizManagerImpl.$vizs[i].getParentElement(), parent)) {
          var message = "Another viz is already present in element '" + tab._Utility.elementToString(parent) + "'.";
          throw tab._TableauException.create('vizAlreadyInManager', message);
        }
      }
    }
  });
  ////////////////////////////////////////////////////////////////////////////////
  // Tableau.JavaScript.Vql.Api.VizParameters
  var $tab__VizParameters = global.tab._VizParameters = ss.mkType($asm, 'tab._VizParameters', function (element, url, options) {
    this.name = '';
    this.host_url = null;
    this.tabs = false;
    this.toolbar = false;
    this.toolBarPosition = null;
    this.device = null;
    this.hostId = null;
    this.width = null;
    this.height = null;
    this.parentElement = null;
    this.userSuppliedParameters = null;
    this.staticImageUrl = null;
    this.fixedSize = false;
    this.displayStaticImage = false;
    this.$urlFromApi = null;
    this.$createOptions = null;
    this.$disableUrlActionsPopups = false;
    if (ss.isNullOrUndefined(element) || ss.isNullOrUndefined(url)) {
      throw tab._TableauException.create('noUrlOrParentElementNotFound', 'URL is empty or Parent element not found');
    }
    if (ss.isNullOrUndefined(options)) {
      options = new Object();
      options.hideTabs = false;
      options.hideToolbar = false;
      options.onFirstInteractive = null;
    }
    if (ss.isValue(options.height) || ss.isValue(options.width)) {
      this.fixedSize = true;
      // B87467: when width/height is integer, convert that into 'px'
      if (tab._Utility.isNumber(options.height)) {
        options.height = options.height.toString() + 'px';
      }
      if (tab._Utility.isNumber(options.width)) {
        options.width = options.width.toString() + 'px';
      }
      this.height = ss.isValue(options.height) ? tab._Utility.roundVizSizeInPixels(options.height.toString()) : null;
      this.width = ss.isValue(options.width) ? tab._Utility.roundVizSizeInPixels(options.width.toString()) : null;
    } else {
      this.fixedSize = false;
    }
    this.displayStaticImage = options.displayStaticImage || false;
    this.staticImageUrl = options.staticImageUrl || '';
    this.tabs = !(options.hideTabs || false);
    this.toolbar = !(options.hideToolbar || false);
    this.device = options.device;
    this.parentElement = element;
    this.$createOptions = options;
    this.toolBarPosition = options.toolbarPosition;
    this.$disableUrlActionsPopups = options.disableUrlActionsPopups === true;
    var urlParts = url.split('?');
    // remove parameters from the URL, we don't support params in url
    this.$urlFromApi = urlParts[0];
    if (urlParts.length === 2) {
      this.userSuppliedParameters = urlParts[1];
    } else {
      this.userSuppliedParameters = '';
    }
    var r = new RegExp('.*?[^/:]/', '').exec(this.$urlFromApi);
    if (ss.isNullOrUndefined(r) || r[0].toLowerCase().indexOf('http://') === -1 && r[0].toLowerCase().indexOf('https://') === -1) {
      throw tab._TableauException.create('invalidUrl', 'Invalid url');
    }
    this.host_url = r[0].toLowerCase();
    this.name = this.$urlFromApi.replace(r[0], '');
    this.name = this.name.replace('views/', '');
  }, {
    get_url: function VizParameters$get_Url() {
      return this.$constructUrl();
    },
    get_baseUrl: function VizParameters$get_BaseUrl() {
      return this.$urlFromApi;
    },
    $constructUrl: function VizParameters$ConstructUrl() {
      var url = [];
      url.push(this.get_baseUrl());
      url.push('?');
      if (this.userSuppliedParameters.length > 0) {
        url.push(this.userSuppliedParameters);
        url.push('&');
      }
      // TFSID: 541417
      // If we haven't already added it, and we aren't fixed size, add a :size param to the url
      // with the container size.  This way, we can choose the correct layout to get the correct composite sizing info
      // when loading a dsd enabled dashboard.  This is the mechinism VizPortal uses (for example) to correctly
      // relay sizing information.
      var addClientDimensionForDsd = !this.fixedSize && !(this.userSuppliedParameters.indexOf(':size=') !== -1) && this.parentElement.clientWidth * this.parentElement.clientHeight > 0;
      if (addClientDimensionForDsd) {
        url.push(':size=');
        url.push(this.parentElement.clientWidth + ',' + this.parentElement.clientHeight);
        url.push('&');
      }
      // TFSID:1063503 - multiple :embed parameters can be a problem
      if (!(this.userSuppliedParameters.indexOf(':embed=y') !== -1)) {
        url.push(':embed=y');
      }
      // Suppress the viz home page in Tableau Public.
      url.push('&:showVizHome=n');
      // We don't support mixed mode where the API script file is debug
      // and the iframe code is release. Force to debug in this case
      url.push('&:jsdebug=y');
      if (!this.fixedSize) {
        url.push('&:bootstrapWhenNotified=y');
      }
      if (!this.tabs) {
        url.push('&:tabs=n');
      }
      if (this.displayStaticImage) {
        url.push('&:display_static_image=y');
      }
      if (this.$disableUrlActionsPopups) {
        url.push('&:disableUrlActionsPopups=y');
      }
      // Let toolBar = n take precedence over toolbarPosition
      if (!this.toolbar) {
        url.push('&:toolbar=n');
      } else if (!ss.isNullOrUndefined(this.toolBarPosition)) {
        url.push('&:toolbar=');
        url.push(this.toolBarPosition.toString());
      }
      if (ss.isValue(this.device)) {
        url.push('&:device=');
        url.push(this.device.toString());
      }
      var userOptions = this.$createOptions;
      var $t1 = new ss.ObjectEnumerator(userOptions);
      try {
        while ($t1.moveNext()) {
          var entry = $t1.current();
          // Ignore values that are handled in other parts of the code
          if (entry.key !== 'embed' && entry.key !== 'height' && entry.key !== 'width' && entry.key !== 'device' && entry.key !== 'autoSize' && entry.key !== 'hideTabs' && entry.key !== 'hideToolbar' && entry.key !== 'onFirstInteractive' && entry.key !== 'onFirstVizSizeKnown' && entry.key !== 'toolbarPosition' && entry.key !== 'instanceIdToClone' && entry.key !== 'navType' && entry.key !== 'display_static_image' && entry.key !== 'disableUrlActionsPopups') {
            url.push('&');
            url.push(encodeURIComponent(entry.key));
            url.push('=');
            url.push(encodeURIComponent(entry.value.toString()));
          }
        }
      } finally {
        $t1.dispose();
      }
      url.push('&:apiID=' + this.hostId);
      url.push('#');
      if (ss.isValue(this.$createOptions.instanceIdToClone)) {
        url.push(this.$createOptions.instanceIdToClone + '&');
      }
      if (ss.isValue(this.$createOptions.navType) && this.$createOptions.navType.length > 0) {
        // Navigation type was specified in options so push it to URL and set options as the source of navigation.
        url.push('navType=' + this.$createOptions.navType.toString() + '&');
        url.push('navSrc=' + 'Opt'.toString());
      } else {
        // Navigation Type was omitted in viz create options, get it from the browser and set parameter parsing as the source of navigation.
        // W3C standard for this API does not distinguish between navigations initiated by UI versus script.
        // So this will return the most recent navigation on the web page, whether initiated by user or script.
        // User navigating followed by script refreshing the page should still be good to not clone the session.
        // User refreshing the page followed by script navigation will be detected as navigate and will waste a cloned session.
        if (window.performance && window.performance.navigation && window.performance.navigation.type) {
          url.push('navType=' + window.performance.navigation.type.toString() + '&');
        }
        url.push('navSrc=' + 'Parse'.toString());
      }
      return url.join('');
    }
  });
  ////////////////////////////////////////////////////////////////////////////////
  // Tableau.JavaScript.Vql.Api.WorkbookImpl
  var $tab__WorkbookImpl = global.tab._WorkbookImpl = ss.mkType($asm, 'tab._WorkbookImpl', function (vizImpl, messagingOptions, callback) {
    this.$workbook = null;
    this.$vizImpl = null;
    this.$name = null;
    this.$activeSheetImpl = null;
    this.$activatingHiddenSheetImpl = null;
    this.$publishedSheetsInfo = new tab._Collection();
    this.$isDownloadAllowed = false;
    this.$messagingOptions = null;
    this.$currentCustomView = null;
    this.$customViews = new tab._Collection();
    this.$updatedCustomViews = new tab._Collection();
    this.$removedCustomViews = new tab._Collection();
    this.$parameters = null;
    this.$lastChangedParameterImpl = null;
    this.$vizImpl = vizImpl;
    this.$messagingOptions = messagingOptions;
    this.$getClientInfo(callback);
  }, {
    get_workbook: function WorkbookImpl$get_Workbook() {
      if (ss.isNullOrUndefined(this.$workbook)) {
        this.$workbook = new $tableauSoftware_Workbook(this);
      }
      return this.$workbook;
    },
    get_viz: function WorkbookImpl$get_Viz() {
      return this.$vizImpl.get_$viz();
    },
    get_publishedSheets: function WorkbookImpl$get_PublishedSheets() {
      return this.$publishedSheetsInfo;
    },
    get_name: function WorkbookImpl$get_Name() {
      return this.$name;
    },
    get_activeSheetImpl: function WorkbookImpl$get_ActiveSheetImpl() {
      return this.$activeSheetImpl;
    },
    get_activeCustomView: function WorkbookImpl$get_ActiveCustomView() {
      return this.$currentCustomView;
    },
    get_isDownloadAllowed: function WorkbookImpl$get_IsDownloadAllowed() {
      return this.$isDownloadAllowed;
    },
    $findActiveSheetOrSheetWithinActiveDashboard: function WorkbookImpl$FindActiveSheetOrSheetWithinActiveDashboard(sheetOrInfoOrName) {
      // If nothing's active yet, there nothing to find.
      if (ss.isNullOrUndefined(this.$activeSheetImpl)) {
        return null;
      }
      var sheetName = $tab__WorkbookImpl.$extractSheetName(sheetOrInfoOrName);
      if (ss.isNullOrUndefined(sheetName)) {
        return null;
      }
      // Is the sheet the active sheet?
      if (ss.referenceEquals(sheetName, this.$activeSheetImpl.get_name())) {
        return this.$activeSheetImpl;
      }
      // Look in the worksheets within the dashboard
      if (this.$activeSheetImpl.get_isDashboard()) {
        var dashboardImpl = ss.cast(this.$activeSheetImpl, $tab__DashboardImpl);
        var sheet = dashboardImpl.get_worksheets()._get(sheetName);
        if (ss.isValue(sheet)) {
          return sheet._impl;
        }
      }
      // The active sheet is not the one we're looking for, nor is one of
      // the worksheets within the dashboard.
      return null;
    },
    _setActiveSheetAsync: function WorkbookImpl$ActivateSheetAsync(sheetNameOrInfoOrIndex) {
      if (tab._Utility.isNumber(sheetNameOrInfoOrIndex)) {
        var index = sheetNameOrInfoOrIndex;
        if (index < this.$publishedSheetsInfo.get__length() && index >= 0) {
          return this.$activateSheetWithInfoAsync(this.$publishedSheetsInfo.get_item(index).$impl);
        } else {
          throw tab._TableauException.createIndexOutOfRange(index);
        }
      }
      var sheetName = $tab__WorkbookImpl.$extractSheetName(sheetNameOrInfoOrIndex);
      // check if sheet is one of the embedded worksheet
      var sheetInfo = this.$publishedSheetsInfo._get(sheetName);
      if (ss.isValue(sheetInfo)) {
        return this.$activateSheetWithInfoAsync(sheetInfo.$impl);
      } else if (this.$activeSheetImpl.get_isDashboard()) {
        var d = ss.cast(this.$activeSheetImpl, $tab__DashboardImpl);
        var sheet = d.get_worksheets()._get(sheetName);
        if (ss.isValue(sheet)) {
          this.$activatingHiddenSheetImpl = null;
          var sheetUrl = '';
          if (sheet.getIsHidden()) {
            // B64570
            // When we switch to a hidden sheet, the server does not give us details
            // about the sheet so we can later populate the sheets collection. We have
            // the information now, so we'll cache the sheet in a member variable,
            // which will be used in InitializeActiveSheet.
            this.$activatingHiddenSheetImpl = sheet._impl;
          } else {
            sheetUrl = sheet._impl.get_url();
          }
          return this.$activateSheetInternalAsync(sheet._impl.get_name(), sheetUrl);
        }
      }
      throw tab._TableauException.create('sheetNotInWorkbook', 'Sheet is not found in Workbook');
    },
    _revertAllAsync: function WorkbookImpl$RevertAllAsync() {
      var deferred = new tab._Deferred();
      var returnHandler = new (ss.makeGenericType(tab.CommandReturnHandler$1, [Object]))('api.RevertAllCommand', 1, function (result) {
        deferred.resolve();
      }, function (remoteError, message) {
        deferred.reject(tab._TableauException.createServerError(message));
      });
      this.$sendCommand(Object).call(this, null, returnHandler);
      return deferred.get_promise();
    },
    _update: function WorkbookImpl$Update(callback) {
      this.$getClientInfo(callback);
    },
    $activateSheetWithInfoAsync: function WorkbookImpl$ActivateSheetWithInfoAsync(sheetInfoImpl) {
      return this.$activateSheetInternalAsync(sheetInfoImpl.name, sheetInfoImpl.url);
    },
    $activateSheetInternalAsync: function WorkbookImpl$ActivateSheetInternalAsync(sheetName, sheetUrl) {
      var deferred = new tab._Deferred();
      // Check to see if the sheet is already active.
      if (ss.isValue(this.$activeSheetImpl) && ss.referenceEquals(sheetName, this.$activeSheetImpl.get_name())) {
        deferred.resolve(this.$activeSheetImpl.get_sheet());
        return deferred.get_promise();
      }
      // prepare the parameter
      var param = {};
      param['api.switchToSheetName'] = sheetName;
      param['api.switchToRepositoryUrl'] = sheetUrl;
      param['api.oldRepositoryUrl'] = this.$activeSheetImpl.get_url();
      // call cross domain
      var returnHandler = new (ss.makeGenericType(tab.CommandReturnHandler$1, [Object]))('api.SwitchActiveSheetCommand', 0, ss.mkdel(this, function (result) {
        this.$vizImpl.$workbookTabSwitchHandler = ss.mkdel(this, function () {
          this.$vizImpl.$workbookTabSwitchHandler = null;
          // remove the handler
          deferred.resolve(this.$activeSheetImpl.get_sheet());
          // return the active sheet
        });
      }), function (remoteError, message) {
        deferred.reject(tab._TableauException.createServerError(message));
      });
      this.$sendCommand(Object).call(this, param, returnHandler);
      return deferred.get_promise();
    },
    _updateActiveSheetAsync: function WorkbookImpl$UpdateActiveSheetAsync() {
      var deferred = new tab._Deferred();
      // prepare the parameter
      var param = {};
      param['api.switchToSheetName'] = this.$activeSheetImpl.get_name();
      param['api.switchToRepositoryUrl'] = this.$activeSheetImpl.get_url();
      param['api.oldRepositoryUrl'] = this.$activeSheetImpl.get_url();
      // call cross domain
      var returnHandler = new (ss.makeGenericType(tab.CommandReturnHandler$1, [Object]))('api.UpdateActiveSheetCommand', 0, ss.mkdel(this, function (result) {
        deferred.resolve(this.$activeSheetImpl.get_sheet());
      }), function (remoteError, message) {
        deferred.reject(tab._TableauException.createServerError(message));
      });
      this.$sendCommand(Object).call(this, param, returnHandler);
      return deferred.get_promise();
    },
    $sendCommand: function $sendCommand(T) {
      return function WorkbookImpl$SendCommand(commandParameters, returnHandler) {
        this.$messagingOptions.sendCommand(T).call(this.$messagingOptions, commandParameters, returnHandler);
      };
    },
    $getClientInfo: function WorkbookImpl$GetClientInfo(callback) {
      // get layout info (workbook, views, and filters) from baseClient
      var returnHandler = new (ss.makeGenericType(tab.CommandReturnHandler$1, [Object]))('api.GetClientInfoCommand', 0, ss.mkdel(this, function (result) {
        this.$processInfo(result);
        // tell the parent viz we are done loading
        if (ss.isValue(callback)) {
          callback();
        }
      }), function (remoteError, message) {
        throw tab._TableauException.createInternalError(message);
      });
      this.$sendCommand(Object).call(this, null, returnHandler);
    },
    $processInfo: function WorkbookImpl$ProcessInfo(clientInfo) {
      this.$name = clientInfo.workbookName;
      this.$isDownloadAllowed = clientInfo.isDownloadAllowed;
      this.$vizImpl.$setAreAutomaticUpdatesPaused(!clientInfo.isAutoUpdate);
      this.$vizImpl.set_instanceId(clientInfo.instanceId);
      // Create all sheets in collection
      this.$createSheetsInfo(clientInfo);
      this.$initializeActiveSheet(clientInfo);
    },
    $initializeActiveSheet: function WorkbookImpl$InitializeActiveSheet(clientInfo) {
      var currentSheetName = clientInfo.currentSheetName;
      // active sheet should be a published sheet or a switched to hidden sheet.
      // If the activate sheet is hidden, the activatingHiddenSheetImpl should not be null
      var newActiveSheetInfo = this.$publishedSheetsInfo._get(currentSheetName);
      if (ss.isNullOrUndefined(newActiveSheetInfo) && ss.isNullOrUndefined(this.$activatingHiddenSheetImpl)) {
        throw tab._TableauException.createInternalError('The active sheet was not specified in baseSheets');
      }
      // No need to do anything if we're already on the current sheet.
      if (ss.isValue(this.$activeSheetImpl) && ss.referenceEquals(this.$activeSheetImpl.get_name(), currentSheetName)) {
        return;
      }
      if (ss.isValue(this.$activeSheetImpl)) {
        // Set the old sheet (and SheetInfo) to be inactive.
        this.$activeSheetImpl.set_isActive(false);
        var oldActiveSheetInfo = this.$publishedSheetsInfo._get(this.$activeSheetImpl.get_name());
        if (ss.isValue(oldActiveSheetInfo)) {
          oldActiveSheetInfo.$impl.isActive = false;
        }
        // Remove event listeners on the active sheet before switching.
        if (this.$activeSheetImpl.get_sheetType() === 'story') {
          var storyImpl = ss.cast(this.$activeSheetImpl, $tab__StoryImpl);
          storyImpl.remove_activeStoryPointChange(ss.mkdel(this.$vizImpl, this.$vizImpl.raiseStoryPointSwitch));
        }
      }
      // active sheet is a hidden sheet
      if (ss.isValue(this.$activatingHiddenSheetImpl)) {
        // B63959
        // create a new worksheet object based on the hidden sheet object
        var infoImpl = $tab__SheetInfoImpl.$ctor(this.$activatingHiddenSheetImpl.get_name(), 'worksheet', -1, this.$activatingHiddenSheetImpl.get_size(), this.get_workbook(), '', true, true, $tab__SheetImpl.noZoneId);
        this.$activatingHiddenSheetImpl = null;
        this.$activeSheetImpl = new $tab__WorksheetImpl(infoImpl, this, this.$messagingOptions, null);
      } else {
        // Find the active base sheet.
        var baseSheet = null;
        for (var i = 0, len = clientInfo.publishedSheets.length; i < len; i++) {
          if (ss.referenceEquals(clientInfo.publishedSheets[i].name, currentSheetName)) {
            baseSheet = clientInfo.publishedSheets[i];
            break;
          }
        }
        if (ss.isNullOrUndefined(baseSheet)) {
          throw tab._TableauException.createInternalError('No base sheet was found corresponding to the active sheet.');
        }
        var findSheetFunc = ss.mkdel(this, function (sheetName) {
          return this.$publishedSheetsInfo._get(sheetName);
        });
        // Create the new sheet.
        if (baseSheet.sheetType === 'dashboard') {
          var dashboardImpl = new $tab__DashboardImpl(newActiveSheetInfo.$impl, this, this.$messagingOptions);
          this.$activeSheetImpl = dashboardImpl;
          // Add all of the dashboard objects.
          var dashboardFrames = $tab__WorkbookImpl.$createDashboardZones(clientInfo.dashboardZones);
          dashboardImpl.$addObjects(dashboardFrames, findSheetFunc);
        } else if (baseSheet.sheetType === 'story') {
          var storyImpl1 = new $tab__StoryImpl(newActiveSheetInfo.$impl, this, this.$messagingOptions, clientInfo.story, findSheetFunc);
          this.$activeSheetImpl = storyImpl1;
          // Listen to the story point switch event.
          storyImpl1.add_activeStoryPointChange(ss.mkdel(this.$vizImpl, this.$vizImpl.raiseStoryPointSwitch));
        } else {
          this.$activeSheetImpl = new $tab__WorksheetImpl(newActiveSheetInfo.$impl, this, this.$messagingOptions, null);
        }
        newActiveSheetInfo.$impl.isActive = true;
      }
      // Set the active sheet's (and info) flag to true.
      this.$activeSheetImpl.set_isActive(true);
    },
    $createSheetsInfo: function WorkbookImpl$CreateSheetsInfo(clientInfo) {
      var baseSheets = clientInfo.publishedSheets;
      if (ss.isNullOrUndefined(baseSheets)) {
        return;
      }
      for (var index = 0; index < baseSheets.length; index++) {
        var baseSheet = baseSheets[index];
        var sheetName = baseSheet.name;
        // Create the SheetInfo
        var sheetInfo = this.$publishedSheetsInfo._get(sheetName);
        var size = $tab__WorkbookImpl.$createSheetSize(baseSheet);
        if (ss.isNullOrUndefined(sheetInfo)) {
          var isActive = ss.referenceEquals(sheetName, clientInfo.currentSheetName);
          var sheetType = tab.ApiEnumConverter.convertSheetType(baseSheet.sheetType);
          var sheetInfoImpl = $tab__SheetInfoImpl.$ctor(sheetName, sheetType, index, size, this.get_workbook(), baseSheet.repositoryUrl, isActive, false, $tab__SheetImpl.noZoneId);
          sheetInfo = new $tableauSoftware_SheetInfo(sheetInfoImpl);
          this.$publishedSheetsInfo._add(sheetName, sheetInfo);
        } else {
          sheetInfo.$impl.size = size;
        }
      }
    },
    get_$customViews: function WorkbookImpl$get_CustomViews() {
      return this.$customViews;
    },
    set_$customViews: function WorkbookImpl$set_CustomViews(value) {
      this.$customViews = value;
    },
    get_$updatedCustomViews: function WorkbookImpl$get_UpdatedCustomViews() {
      return this.$updatedCustomViews;
    },
    set_$updatedCustomViews: function WorkbookImpl$set_UpdatedCustomViews(value) {
      this.$updatedCustomViews = value;
    },
    get_$removedCustomViews: function WorkbookImpl$get_RemovedCustomViews() {
      return this.$removedCustomViews;
    },
    set_$removedCustomViews: function WorkbookImpl$set_RemovedCustomViews(value) {
      this.$removedCustomViews = value;
    },
    get_$currentCustomView: function WorkbookImpl$get_CurrentCustomView() {
      return this.$currentCustomView;
    },
    set_$currentCustomView: function WorkbookImpl$set_CurrentCustomView(value) {
      this.$currentCustomView = value;
    },
    $getCustomViewsAsync: function WorkbookImpl$GetCustomViewsAsync() {
      return $tab__CustomViewImpl._getCustomViewsAsync(this, this.$messagingOptions);
    },
    $showCustomViewAsync: function WorkbookImpl$ShowCustomViewAsync(customViewName) {
      // if customViewName is null or empty
      if (ss.isNullOrUndefined(customViewName) || tab._Utility.isNullOrEmpty(customViewName)) {
        return $tab__CustomViewImpl._showCustomViewAsync(this, this.$messagingOptions, null);
      } else {
        var cv = this.$customViews._get(customViewName);
        if (ss.isNullOrUndefined(cv)) {
          var deferred = new tab._Deferred();
          deferred.reject(tab._TableauException.createInvalidCustomViewName(customViewName));
          return deferred.get_promise();
        }
        return cv._impl._showAsync();
      }
    },
    $removeCustomViewAsync: function WorkbookImpl$RemoveCustomViewAsync(customViewName) {
      // if customViewName is null or empty
      if (tab._Utility.isNullOrEmpty(customViewName)) {
        throw tab._TableauException.createNullOrEmptyParameter('customViewName');
      }
      var cv = this.$customViews._get(customViewName);
      if (ss.isNullOrUndefined(cv)) {
        var deferred = new tab._Deferred();
        deferred.reject(tab._TableauException.createInvalidCustomViewName(customViewName));
        return deferred.get_promise();
      }
      return cv._impl.$removeAsync();
    },
    $rememberCustomViewAsync: function WorkbookImpl$RememberCustomViewAsync(customViewName) {
      // if customViewName is null or empty
      if (tab._Utility.isNullOrEmpty(customViewName)) {
        throw tab._TableauException.createInvalidParameter('customViewName');
      }
      return $tab__CustomViewImpl._saveNewAsync(this, this.$messagingOptions, customViewName);
    },
    $setActiveCustomViewAsDefaultAsync: function WorkbookImpl$SetActiveCustomViewAsDefaultAsync() {
      return $tab__CustomViewImpl._makeCurrentCustomViewDefaultAsync(this, this.$messagingOptions);
    },
    get_$lastChangedParameterImpl: function WorkbookImpl$get_LastChangedParameterImpl() {
      return this.$lastChangedParameterImpl;
    },
    set_$lastChangedParameterImpl: function WorkbookImpl$set_LastChangedParameterImpl(value) {
      this.$lastChangedParameterImpl = value;
    },
    get_$parameters: function WorkbookImpl$get_Parameters() {
      return this.$parameters;
    },
    $getSingleParameterAsync: function WorkbookImpl$GetSingleParameterAsync(parameterName) {
      var deferred = new tab._Deferred();
      // Use the locally cached-parameter if available.
      // TODO: BUGZID 105718: jrockwood-2014-03-29: This is not a good idea.
      // This doesn't take into account asynchronous behavior and we could
      // be returning a parameter that doesn't correspond to the last call.
      // Ugly and it needs to be reworked.
      if (ss.isValue(this.$lastChangedParameterImpl)) {
        deferred.resolve(this.$lastChangedParameterImpl.get_$parameter());
        return deferred.get_promise();
      }
      var commandParameters = {};
      // send the command
      var returnHandler = new (ss.makeGenericType(tab.CommandReturnHandler$1, [Object]))('api.FetchParametersCommand', 0, ss.mkdel(this, function (result) {
        var parameterImpl = $tab__WorkbookImpl.$findAndCreateParameterImpl(parameterName, result);
        this.$lastChangedParameterImpl = parameterImpl;
        deferred.resolve(parameterImpl.get_$parameter());
      }), function (remoteError, message) {
        deferred.reject(tab._TableauException.createServerError(message));
      });
      this.$sendCommand(Object).call(this, commandParameters, returnHandler);
      return deferred.get_promise();
    },
    $getParametersAsync: function WorkbookImpl$GetParametersAsync() {
      var deferred = new tab._Deferred();
      var commandParameters = {};
      // send the command
      var returnHandler = new (ss.makeGenericType(tab.CommandReturnHandler$1, [Object]))('api.FetchParametersCommand', 0, ss.mkdel(this, function (result) {
        this.$parameters = $tab__WorkbookImpl.$processParameters(result);
        deferred.resolve(this.get_$parameters()._toApiCollection());
      }), function (remoteError, message) {
        deferred.reject(tab._TableauException.createServerError(message));
      });
      this.$sendCommand(Object).call(this, commandParameters, returnHandler);
      return deferred.get_promise();
    },
    $changeParameterValueAsync: function WorkbookImpl$ChangeParameterValueAsync(parameterName, value) {
      var deferred = new tab._Deferred();
      // check the name and value if this.parameters is available
      var parameterImpl = null;
      if (ss.isValue(this.$parameters)) {
        // check if named parameter exist
        if (ss.isNullOrUndefined(this.$parameters._get(parameterName))) {
          deferred.reject(tab._TableauException.createInvalidParameter(parameterName));
          return deferred.get_promise();
        }
        parameterImpl = this.$parameters._get(parameterName)._impl;
        if (ss.isNullOrUndefined(parameterImpl)) {
          deferred.reject(tab._TableauException.createInvalidParameter(parameterName));
          return deferred.get_promise();
        }
      }
      var param = {};
      param['api.setParameterName'] = ss.isValue(this.$parameters) ? parameterImpl.get_$name() : parameterName;
      if (ss.isValue(value) && tab._Utility.isDate(value)) {
        var date = ss.cast(value, ss.JsDate);
        var dateStr = tab._Utility.serializeDateForServer(date);
        param['api.setParameterValue'] = dateStr;
      } else {
        param['api.setParameterValue'] = ss.isValue(value) ? value.toString() : null;
      }
      this.$lastChangedParameterImpl = null;
      // send the command
      var returnHandler = new (ss.makeGenericType(tab.CommandReturnHandler$1, [Object]))('api.SetParameterValueCommand', 0, ss.mkdel(this, function (result) {
        if (ss.isNullOrUndefined(result)) {
          deferred.reject(tab._TableauException.create('serverError', 'server error'));
          return;
        }
        // B64774
        // server spits CommandValidationPresModel.value=false
        if (!result.isValidPresModel) {
          deferred.reject(tab._TableauException.createInvalidParameter(parameterName));
          return;
        }
        var paramUpdated = new $tab_$ParameterImpl(result);
        this.$lastChangedParameterImpl = paramUpdated;
        deferred.resolve(paramUpdated.get_$parameter());
      }), function (remoteError, message) {
        // B64774
        // Server throws exception for invalid fieldname or value. We convert it to
        // Invalid parameter error for better error reporting instead of "internal server error".
        deferred.reject(tab._TableauException.createInvalidParameter(parameterName));
      });
      this.$sendCommand(Object).call(this, param, returnHandler);
      return deferred.get_promise();
    }
  }, {
    $createDashboardZones: function WorkbookImpl$CreateDashboardZones(zones) {
      zones = ss.coalesce(zones, []);
      var zonesInfo = [];
      for (var i = 0; i < zones.length; i++) {
        var zone = zones[i];
        var objectType = tab.ApiEnumConverter.convertDashboardObjectType(zone.zoneType);
        // parse the frame size
        var size = tab.Size.$ctor(zone.width, zone.height);
        // parse the frame position
        var position = tab.Point.$ctor(zone.x, zone.y);
        // frame name
        var name = zone.name;
        var zoneInfo = { name: name, objectType: objectType, position: position, size: size, zoneId: zone.zoneId };
        zonesInfo.push(zoneInfo);
      }
      return zonesInfo;
    },
    $extractSheetName: function WorkbookImpl$ExtractSheetName(sheetOrInfoOrName) {
      if (ss.isNullOrUndefined(sheetOrInfoOrName)) {
        return null;
      }
      if (tab._Utility.isString(sheetOrInfoOrName)) {
        return sheetOrInfoOrName;
      }
      var sheet = ss.safeCast(sheetOrInfoOrName, $tableauSoftware_Sheet);
      if (ss.isValue(sheet)) {
        return sheet.getName();
      }
      var info = ss.safeCast(sheetOrInfoOrName, $tableauSoftware_SheetInfo);
      if (ss.isValue(info)) {
        return info.getName();
      }
      // The incoming parameter is nothing that we recognize.
      return null;
    },
    $createSheetSize: function WorkbookImpl$CreateSheetSize(sheetInfo) {
      if (ss.isNullOrUndefined(sheetInfo)) {
        return tab.SheetSizeFactory.createAutomatic();
      }
      return tab.SheetSizeFactory.fromSizeConstraints(sheetInfo.sizeConstraints);
    },
    $processParameters: function WorkbookImpl$ProcessParameters(paramList) {
      var parameters = new tab._Collection();
      for (var $t1 = 0; $t1 < paramList.parameters.length; $t1++) {
        var model = paramList.parameters[$t1];
        var paramImpl = new $tab_$ParameterImpl(model);
        parameters._add(paramImpl.get_$name(), paramImpl.get_$parameter());
      }
      return parameters;
    },
    $findAndCreateParameterImpl: function WorkbookImpl$FindAndCreateParameterImpl(parameterName, paramList) {
      for (var $t1 = 0; $t1 < paramList.parameters.length; $t1++) {
        var model = paramList.parameters[$t1];
        if (ss.referenceEquals(model.name, parameterName)) {
          return new $tab_$ParameterImpl(model);
        }
      }
      return null;
    }
  });
  ////////////////////////////////////////////////////////////////////////////////
  // Tableau.JavaScript.Vql.Api.WorksheetImpl
  var $tab__WorksheetImpl = global.tab._WorksheetImpl = ss.mkType($asm, 'tab._WorksheetImpl', function (sheetInfoImpl, workbookImpl, messagingOptions, parentDashboardImpl) {
    this.$worksheet = null;
    this.$parentDashboardImpl = null;
    this.$getDataCommandsBuilder = new tab.GetDataCommandsBuilder();
    this.$filterCommandsBuilder = new tab.FilterCommandsBuilder();
    this.$sharedUtils = new tab.SharedUtils();
    this.$filters = new tab._Collection();
    this.$selectedMarks = new tab._Collection();
    this.highlightedMarks = null;
    $tab__SheetImpl.call(this, sheetInfoImpl, workbookImpl, messagingOptions);
    this.$parentDashboardImpl = parentDashboardImpl;
  }, {
    $appendContextMenuAsync: function WorksheetImpl$AppendContextMenuAsync(sheetName, targetMenu, config) {
      tab._Param.verifyStringMaxLength(config.displayName, 'Display Name');
      var deferred = new tab._Deferred();
      var commandParameters = {};
      commandParameters['api.targetMenu'] = targetMenu;
      commandParameters['api.menuItemDisplayName'] = config.displayName;
      commandParameters['api.worksheetName'] = sheetName;
      var returnHandler = new (ss.makeGenericType(tab.CommandReturnHandler$1, [Object]))('api.AppendContextMenu', 0, function (result) {
        deferred.resolve(result.menuItemId);
      }, function (remoteError, message) {
        deferred.reject(tab._TableauException.createServerError(message));
      });
      this.sendCommand(Object).call(this, commandParameters, returnHandler);
      return deferred.get_promise();
    },
    $removeContextMenuAsync: function WorksheetImpl$RemoveContextMenuAsync(sheetName, targetMenu, menuItemId) {
      var deferred = new tab._Deferred();
      var commandParameters = {};
      commandParameters['api.targetMenu'] = targetMenu;
      commandParameters['api.menuItemId'] = menuItemId;
      commandParameters['api.worksheetName'] = sheetName;
      var returnHandler = new (ss.makeGenericType(tab.CommandReturnHandler$1, [Object]))('api.RemoveContextMenu', 0, function (result) {
        deferred.resolve();
      }, function (remoteError, message) {
        deferred.reject(tab._TableauException.createServerError(message));
      });
      this.sendCommand(Object).call(this, commandParameters, returnHandler);
      return deferred.get_promise();
    },
    $executeContextMenuAsync: function WorksheetImpl$ExecuteContextMenuAsync(sheetName, targetMenu, menuItemId) {
      var deferred = new tab._Deferred();
      var commandParameters = {};
      commandParameters['api.worksheetName'] = sheetName;
      commandParameters['api.targetMenu'] = targetMenu;
      commandParameters['api.menuItemId'] = menuItemId;
      var returnHandler = new (ss.makeGenericType(tab.CommandReturnHandler$1, [Object]))('api.ExecuteContextMenu', 0, function (result) {
        deferred.resolve();
      }, function (remoteError, message) {
        deferred.reject(tab._TableauException.createServerError(message));
      });
      this.sendCommand(Object).call(this, commandParameters, returnHandler);
      return deferred.get_promise();
    },
    get_sheet: function WorksheetImpl$get_Sheet() {
      return this.get_worksheet();
    },
    get_worksheet: function WorksheetImpl$get_Worksheet() {
      if (ss.isNullOrUndefined(this.$worksheet)) {
        this.$worksheet = new $tableauSoftware_Worksheet(this);
      }
      return this.$worksheet;
    },
    get_parentDashboardImpl: function WorksheetImpl$get_ParentDashboardImpl() {
      return this.$parentDashboardImpl;
    },
    get_parentDashboard: function WorksheetImpl$get_ParentDashboard() {
      if (ss.isValue(this.$parentDashboardImpl)) {
        return this.$parentDashboardImpl.get_dashboard();
      }
      return null;
    },
    $getDataSourcesAsync: function WorksheetImpl$GetDataSourcesAsync() {
      this.$verifyActiveSheetOrEmbeddedInActiveDashboard();
      var deferred = new tab._Deferred();
      // Prepare the command parameters.
      var commandParameters = {};
      commandParameters['api.worksheetName'] = this.get_name();
      // send the command
      var returnHandler = new (ss.makeGenericType(tab.CommandReturnHandler$1, [Object]))('api.GetDataSourcesCommand', 0, function (result) {
        var dataSources = $tab__DataSourceImpl.processDataSourcesForWorksheet(result);
        deferred.resolve(dataSources._toApiCollection());
      }, function (remoteError, message) {
        deferred.reject(tab._TableauException.createServerError(message));
      });
      this.sendCommand(Object).call(this, commandParameters, returnHandler);
      return deferred.get_promise();
    },
    $getDataSourceAsync: function WorksheetImpl$GetDataSourceAsync(dataSourceName) {
      this.$verifyActiveSheetOrEmbeddedInActiveDashboard();
      var deferred = new tab._Deferred();
      // Prepare the command parameters.
      var commandParameters = {};
      commandParameters['api.dataSourceName'] = dataSourceName;
      commandParameters['api.worksheetName'] = this.get_name();
      // send the command
      var returnHandler = new (ss.makeGenericType(tab.CommandReturnHandler$1, [Object]))('api.GetDataSourceCommand', 0, function (result) {
        var dataSourceImpl = $tab__DataSourceImpl.processDataSource(result);
        if (ss.isValue(dataSourceImpl)) {
          deferred.resolve(dataSourceImpl.get_dataSource());
        } else {
          deferred.reject(tab._TableauException.createServerError("Data source '" + dataSourceName + "' not found"));
        }
      }, function (remoteError, message) {
        deferred.reject(tab._TableauException.createServerError(message));
      });
      this.sendCommand(Object).call(this, commandParameters, returnHandler);
      return deferred.get_promise();
    },
    $verifyActiveSheetOrEmbeddedInActiveDashboard: function WorksheetImpl$VerifyActiveSheetOrEmbeddedInActiveDashboard() {
      var isRootAndActiveWorksheet = this.get_isActive();
      var isWithinActiveDashboard = ss.isValue(this.$parentDashboardImpl) && this.$parentDashboardImpl.get_isActive();
      var isWithinActiveStoryPoint = ss.isValue(this.get_parentStoryPointImpl()) && this.get_parentStoryPointImpl().get_parentStoryImpl().get_isActive();
      if (!isRootAndActiveWorksheet && !isWithinActiveDashboard && !isWithinActiveStoryPoint) {
        throw tab._TableauException.createNotActiveSheet();
      }
    },
    $addVisualIdToCommand: function WorksheetImpl$AddVisualIdToCommand(commandParameters) {
      // If we're on a story point, then we need to use the VisualId.
      // Otherwise, we use the old style.
      if (ss.isValue(this.get_parentStoryPointImpl())) {
        var visualId = {};
        visualId.worksheet = this.get_name();
        // We always need to have a dashboard parameter, so either use the "real" dashboard
        // name or the current sheet name.
        visualId.dashboard = ss.isValue(this.get_parentDashboardImpl()) ? this.$parentDashboardImpl.get_name() : this.get_name();
        visualId.flipboardZoneId = this.get_parentStoryPointImpl().get_containedSheetImpl().get_zoneId();
        visualId.storyboard = this.get_parentStoryPointImpl().get_parentStoryImpl().get_name();
        visualId.storyPointId = this.get_parentStoryPointImpl().get_storyPointId();
        commandParameters['api.visualId'] = visualId;
      } else {
        var dashboardName = ss.isValue(this.get_parentDashboardImpl()) ? this.get_parentDashboardImpl().get_name() : null;
        this.$sharedUtils.addVisualIdForWorksheet(commandParameters, this.get_name(), dashboardName);
      }
    },
    get__filters: function WorksheetImpl$get_Filters() {
      return this.$filters;
    },
    set__filters: function WorksheetImpl$set_Filters(value) {
      this.$filters = value;
    },
    $getFilterAsync: function WorksheetImpl$GetFilterAsync(fieldName, fieldCaption, options) {
      // We only allow one of fieldName or fieldCaption, but not both. If you have a choice, use fieldName since
      // it's faster on the server.
      if (!tab._Utility.isNullOrEmpty(fieldName) && !tab._Utility.isNullOrEmpty(fieldCaption)) {
        throw tab._TableauException.createInternalError('Only fieldName OR fieldCaption is allowed, not both.');
      }
      options = options || new Object();
      var deferred = new tab._Deferred();
      // Prepare the command parameters.
      var commandParameters = {};
      this.$addVisualIdToCommand(commandParameters);
      if (!tab._Utility.isNullOrEmpty(fieldCaption) && tab._Utility.isNullOrEmpty(fieldName)) {
        commandParameters['api.fieldCaption'] = fieldCaption;
      }
      if (!tab._Utility.isNullOrEmpty(fieldName)) {
        commandParameters['api.fieldName'] = fieldName;
      }
      commandParameters['api.filterHierarchicalLevels'] = 0;
      // no depth details to be consistent
      commandParameters['api.ignoreDomain'] = options.ignoreDomain || false;
      commandParameters['api.filterRelevantValuesOnly'] = ss.isNullOrUndefined(options.relevantValuesOnly) ? true : options.relevantValuesOnly;
      // send the command
      var returnHandler = new (ss.makeGenericType(tab.CommandReturnHandler$1, [Object]))('api.GetOneFilterInfoCommand', 0, ss.mkdel(this, function (result) {
        // Check for an error first.
        var error = $tab__WorksheetImpl.$filterCommandError(result);
        if (ss.isNullOrUndefined(error)) {
          var filterJson = result;
          var filter = $tableauSoftware_Filter.$createFilter(this, filterJson);
          deferred.resolve(filter);
        } else {
          deferred.reject(error);
        }
      }), function (remoteError, message) {
        deferred.reject(tab._TableauException.createServerError(message));
      });
      this.sendCommand(Object).call(this, commandParameters, returnHandler);
      return deferred.get_promise();
    },
    $getFiltersAsync: function WorksheetImpl$GetFiltersAsync(options) {
      this.$verifyActiveSheetOrEmbeddedInActiveDashboard();
      options = options || new Object();
      // prepare the command parameters
      var deferred = new tab._Deferred();
      var commandParameters = {};
      this.$addVisualIdToCommand(commandParameters);
      commandParameters['api.ignoreDomain'] = options.ignoreDomain || false;
      commandParameters['api.filterRelevantValuesOnly'] = ss.isNullOrUndefined(options.relevantValuesOnly) ? true : options.relevantValuesOnly;
      // send the command
      var returnHandler = new (ss.makeGenericType(tab.CommandReturnHandler$1, [Object]))('api.GetFiltersListCommand', 0, ss.mkdel(this, function (result) {
        this.set__filters($tableauSoftware_Filter.processFiltersList(this, result));
        deferred.resolve(this.get__filters()._toApiCollection());
      }), function (remoteError, message) {
        deferred.reject(tab._TableauException.createServerError(message));
      });
      this.sendCommand(Object).call(this, commandParameters, returnHandler);
      return deferred.get_promise();
    },
    $applyFilterAsync: function WorksheetImpl$ApplyFilterAsync(fieldName, values, updateType, options) {
      return this.$applyFilterWithValuesInternalAsync(fieldName, values, updateType, options);
    },
    $clearFilterAsync: function WorksheetImpl$ClearFilterAsync(fieldName) {
      return this.$clearFilterInternalAsync(fieldName);
    },
    $getAppliedWorksheetsAsync: function WorksheetImpl$GetAppliedWorksheetsAsync(worksheetName, filterFieldName) {
      var deferred = new tab._Deferred();
      var successCallback = function successCallback(result) {
        var pm = result;
        var appliedWorksheets = [];
        if (ss.isValue(pm.sharedFilterWorksheetInfoList)) {
          for (var $t1 = 0; $t1 < pm.sharedFilterWorksheetInfoList.length; $t1++) {
            var item = pm.sharedFilterWorksheetInfoList[$t1];
            if (item.isSelected) {
              appliedWorksheets.push(item.worksheetName);
            }
          }
        }
        deferred.resolve(appliedWorksheets);
      };
      var errorCallback = function errorCallback(remoteError, message) {
        deferred.reject(tab._TableauException.createServerError(message));
      };
      this.$getSharedFilterWorksheets(Array).call(this, worksheetName, filterFieldName, successCallback, errorCallback);
      return deferred.get_promise();
    },
    $setAppliedWorksheetsAsync: function WorksheetImpl$SetAppliedWorksheetsAsync(applyToWorksheets, currentWorksheet, filterFieldName, filterFieldCaption) {
      if (ss.isNullOrUndefined(applyToWorksheets)) {
        throw tab._TableauException.createInvalidParameter('Worksheet');
      }
      var deferred = new tab._Deferred();
      applyToWorksheets = this.$getDistinctWorksheets(applyToWorksheets);
      var getAppliedWorksheetsSuccessCallback = ss.mkdel(this, function (result) {
        var pm = result;
        var activeWorksheet = new String();
        var selectedWorksheets = [];
        var nonSelectedWorksheets = [];
        if (!ss.isValue(pm.sharedFilterWorksheetInfoList)) {
          deferred.reject(tab._TableauException.createServerError('The server returned empty pres model for getAppliedWorksheetsAsync()'));
          return;
        }
        for (var $t1 = 0; $t1 < pm.sharedFilterWorksheetInfoList.length; $t1++) {
          var item = pm.sharedFilterWorksheetInfoList[$t1];
          // Get active worksheet
          if (item.isActive) {
            activeWorksheet = item.worksheetName;
          }
          // Populate selected & non-selected worksheets
          if (item.isSelected) {
            selectedWorksheets.push(item.worksheetName);
          } else if (item.isEnabled) {
            nonSelectedWorksheets.push(item.worksheetName);
          }
        }
        if (!ss.contains(applyToWorksheets, activeWorksheet)) {
          var message = activeWorksheet + ' must be included in the applied worksheets';
          deferred.reject(tab._TableauException.createInternalError(message));
          return;
        }
        for (var $t2 = 0; $t2 < applyToWorksheets.length; $t2++) {
          var sheet = applyToWorksheets[$t2];
          // check if it's present within compatible sheets
          if (!ss.contains(selectedWorksheets, sheet) && !ss.contains(nonSelectedWorksheets, sheet)) {
            var message1 = 'The field ' + filterFieldCaption + " isn't applicable to the worksheet " + sheet;
            deferred.reject(tab._TableauException.createInternalError(message1));
            return;
          }
        }
        var commandParameters = {};
        commandParameters['api.fieldName'] = filterFieldName;
        commandParameters['api.sharedFilterSheets'] = applyToWorksheets;
        this.$addVisualIdToCommand(commandParameters);
        // define callbacks for setAppliedWorksheetsAsync command
        var setAppliedWorksheetSuccessCallback = function setAppliedWorksheetSuccessCallback(setAppliedWorksheetResult) {
          deferred.resolve(applyToWorksheets);
        };
        var setAppliedWorksheetErrorCallback = function setAppliedWorksheetErrorCallback(remoteError, message2) {
          deferred.reject(tab._TableauException.createServerError(message2));
        };
        var returnHandler = new (ss.makeGenericType(tab.CommandReturnHandler$1, [Object]))('api.SetAppliedWorksheetsCommand', 0, setAppliedWorksheetSuccessCallback, setAppliedWorksheetErrorCallback);
        this.sendCommand(Object).call(this, commandParameters, returnHandler);
      });
      var getAppliedWorksheetsErrorCallback = function getAppliedWorksheetsErrorCallback(remoteError1, message3) {
        deferred.reject(tab._TableauException.createServerError(message3));
      };
      // This is the first call to get the list of applicable worksheets
      this.$getSharedFilterWorksheets(Array).call(this, currentWorksheet, filterFieldName, getAppliedWorksheetsSuccessCallback, getAppliedWorksheetsErrorCallback);
      return deferred.get_promise();
    },
    $getDistinctWorksheets: function WorksheetImpl$GetDistinctWorksheets(applyToWorksheets) {
      var check = new Set();
      var result = [];
      for (var $t1 = 0; $t1 < applyToWorksheets.length; $t1++) {
        var ws = applyToWorksheets[$t1];
        if (check.has(ws)) {
          continue;
        }
        check.add(ws);
        result.push(ws);
      }
      return result;
    },
    $getSharedFilterWorksheets: function $getSharedFilterWorksheets(T) {
      return function WorksheetImpl$GetSharedFilterWorksheets(worksheetName, filterFieldName, successCallback, errorCallback) {
        var commandParameters = {};
        commandParameters['api.fieldName'] = filterFieldName;
        this.$addVisualIdToCommand(commandParameters);
        var returnHandler = new (ss.makeGenericType(tab.CommandReturnHandler$1, [Object]))('api.GetAppliedWorksheetsCommand', 0, successCallback, errorCallback);
        this.sendCommand(Object).call(this, commandParameters, returnHandler);
      };
    },
    $applyRangeFilterAsync: function WorksheetImpl$ApplyRangeFilterAsync(fieldName, options) {
      var fixedUpFilterOptions = this.$filterCommandsBuilder.normalizeRangeFilterOption(options);
      return this.$applyRangeFilterInternalAsync(fieldName, fixedUpFilterOptions);
    },
    $applyRelativeDateFilterAsync: function WorksheetImpl$ApplyRelativeDateFilterAsync(fieldName, options) {
      var fixedUpFilterOptions = this.$filterCommandsBuilder.normalizeRelativeDateFilterOptions(options);
      return this.$applyRelativeDateFilterInternalAsync(fieldName, fixedUpFilterOptions);
    },
    $applyHierarchicalFilterAsync: function WorksheetImpl$ApplyHierarchicalFilterAsync(fieldName, values, updateType, options) {
      if (ss.isNullOrUndefined(values) && updateType !== 'all') {
        throw tab._TableauException.createInvalidParameter('values');
      }
      return this.$applyHierarchicalFilterInternalAsync(fieldName, values, updateType, options);
    },
    $clearFilterInternalAsync: function WorksheetImpl$ClearFilterInternalAsync(fieldName) {
      this.$verifyActiveSheetOrEmbeddedInActiveDashboard();
      var deferred = new tab._Deferred();
      var commandParameters = this.$filterCommandsBuilder.buildClearFilterCommandsParam(fieldName);
      this.$addVisualIdToCommand(commandParameters);
      // Send the command
      var returnHandler = this.$filterCommandsBuilder.createFilterCommandReturnHandler('api.ClearFilterCommand', fieldName, deferred);
      this.sendCommand(Object).call(this, commandParameters, returnHandler);
      return deferred.get_promise();
    },
    $applyFilterWithValuesInternalAsync: function WorksheetImpl$ApplyFilterWithValuesInternalAsync(fieldName, values, updateType, options) {
      this.$verifyActiveSheetOrEmbeddedInActiveDashboard();
      var deferred = new tab._Deferred();
      var commandParameters = this.$filterCommandsBuilder.buildApplyFiltersCommandParams(fieldName, values, updateType, options);
      this.$addVisualIdToCommand(commandParameters);
      var returnHandler = this.$filterCommandsBuilder.createFilterCommandReturnHandler('api.ApplyCategoricalFilterCommand', fieldName, deferred);
      this.sendCommand(Object).call(this, commandParameters, returnHandler);
      return deferred.get_promise();
    },
    $applyRangeFilterInternalAsync: function WorksheetImpl$ApplyRangeFilterInternalAsync(fieldName, filterOptions) {
      this.$verifyActiveSheetOrEmbeddedInActiveDashboard();
      var commandParameters = this.$filterCommandsBuilder.buildRangeFilterCommandParams(fieldName, filterOptions);
      this.$addVisualIdToCommand(commandParameters);
      var deferred = new tab._Deferred();
      var returnHandler = this.$filterCommandsBuilder.createFilterCommandReturnHandler('api.ApplyRangeFilterCommand', fieldName, deferred);
      this.sendCommand(Object).call(this, commandParameters, returnHandler);
      return deferred.get_promise();
    },
    $applyRelativeDateFilterInternalAsync: function WorksheetImpl$ApplyRelativeDateFilterInternalAsync(fieldName, filterOptions) {
      this.$verifyActiveSheetOrEmbeddedInActiveDashboard();
      var commandParameters = this.$filterCommandsBuilder.buildRelativeDateFilterCommandParams(fieldName, filterOptions);
      this.$addVisualIdToCommand(commandParameters);
      var deferred = new tab._Deferred();
      var returnHandler = this.$filterCommandsBuilder.createFilterCommandReturnHandler('api.ApplyRelativeDateFilterCommand', fieldName, deferred);
      this.sendCommand(Object).call(this, commandParameters, returnHandler);
      return deferred.get_promise();
    },
    $applyHierarchicalFilterInternalAsync: function WorksheetImpl$ApplyHierarchicalFilterInternalAsync(fieldName, values, updateType, options) {
      this.$verifyActiveSheetOrEmbeddedInActiveDashboard();
      var commandParameters = this.$filterCommandsBuilder.buildHierarchicalFilterCommandParams(fieldName, values, updateType, options);
      this.$addVisualIdToCommand(commandParameters);
      // call the client code
      var deferred = new tab._Deferred();
      var returnHandler = this.$filterCommandsBuilder.createFilterCommandReturnHandler('api.ApplyHierarchicalFilterCommand', fieldName, deferred);
      this.sendCommand(Object).call(this, commandParameters, returnHandler);
      return deferred.get_promise();
    },
    get_selectedMarks: function WorksheetImpl$get_SelectedMarks() {
      return this.$selectedMarks;
    },
    set_selectedMarks: function WorksheetImpl$set_SelectedMarks(value) {
      this.$selectedMarks = value;
    },
    $clearSelectedMarksAsync: function WorksheetImpl$ClearSelectedMarksAsync() {
      this.$verifyActiveSheetOrEmbeddedInActiveDashboard();
      var deferred = new tab._Deferred();
      var commandParameters = {};
      this.$addVisualIdToCommand(commandParameters);
      // send the command
      var returnHandler = new (ss.makeGenericType(tab.CommandReturnHandler$1, [Object]))('api.ClearSelectedMarksCommand', 0, function (result) {
        deferred.resolve();
      }, function (remoteError, message) {
        deferred.reject(tab._TableauException.createServerError(message));
      });
      this.sendCommand(Object).call(this, commandParameters, returnHandler);
      return deferred.get_promise();
    },
    $selectMarksAsync: function WorksheetImpl$SelectMarksAsync(fieldNameOrFieldValuesMap, valueOrUpdateType, updateType) {
      this.$verifyActiveSheetOrEmbeddedInActiveDashboard();
      if (ss.isNullOrUndefined(fieldNameOrFieldValuesMap) && ss.isNullOrUndefined(valueOrUpdateType)) {
        return this.$clearSelectedMarksAsync();
      }
      // if the first param is string and the second param is either string or array or not 'FilterUpdateType',
      // we assume it is the simple case
      if (tab._Utility.isString(fieldNameOrFieldValuesMap) && (tab._jQueryShim.isArray(valueOrUpdateType) || tab._Utility.isString(valueOrUpdateType) || !tab.PublicEnums.isValidEnum(tab.ApiSelectionUpdateType).call(null, valueOrUpdateType))) {
        // Supporting signatures:
        //   selectMarks(fieldName, value,   updateType, callbackOption);
        //   selectMarks(fieldName, value[], updaeType), callbackOption;
        return this.$selectMarksWithFieldNameAndValueAsync(ss.cast(fieldNameOrFieldValuesMap, String), valueOrUpdateType, updateType);
      } else if (tab._jQueryShim.isArray(fieldNameOrFieldValuesMap)) {
        // Supporting signatures:
        //   selectMarks(marks[], updateType, callbackOption);
        return this.$selectMarksWithMarksArrayAsync(fieldNameOrFieldValuesMap, ss.cast(valueOrUpdateType, String));
      } else {
        // Supporting signature:
        //   selectMarks({fieldName: value, fieldName: value[]}, updateType, callbackOption);
        return this.$selectMarksWithMultiDimOptionAsync(fieldNameOrFieldValuesMap, ss.cast(valueOrUpdateType, String));
      }
    },
    $getSelectedMarksAsync: function WorksheetImpl$GetSelectedMarksAsync() {
      this.$verifyActiveSheetOrEmbeddedInActiveDashboard();
      // prepare the command parameters
      var deferred = new tab._Deferred();
      var commandParameters = {};
      this.$addVisualIdToCommand(commandParameters);
      // send the command
      var returnHandler = new (ss.makeGenericType(tab.CommandReturnHandler$1, [Object]))('api.FetchSelectedMarksCommand', 0, ss.mkdel(this, function (result) {
        this.$selectedMarks = tab.MarkImpl.processActiveMarks(result);
        deferred.resolve(this.$selectedMarks._toApiCollection());
      }), function (remoteError, message) {
        deferred.reject(tab._TableauException.createServerError(message));
      });
      this.sendCommand(Object).call(this, commandParameters, returnHandler);
      return deferred.get_promise();
    },
    $selectMarksWithFieldNameAndValueAsync: function WorksheetImpl$SelectMarksWithFieldNameAndValueAsync(fieldName, value, updateType) {
      var catNameList = [];
      var catValueList = [];
      var hierNameList = [];
      var hierValueList = [];
      var rangeNameList = [];
      var rangeValueList = [];
      this.$parseMarksParam(catNameList, catValueList, hierNameList, hierValueList, rangeNameList, rangeValueList, fieldName, value);
      return this.$selectMarksWithValuesAsync(null, catNameList, catValueList, hierNameList, hierValueList, rangeNameList, rangeValueList, updateType);
    },
    $selectMarksWithMultiDimOptionAsync: function WorksheetImpl$SelectMarksWithMultiDimOptionAsync(fieldValuesMap, updateType) {
      var dict = fieldValuesMap;
      var catNameList = [];
      var catValueList = [];
      var hierNameList = [];
      var hierValueList = [];
      var rangeNameList = [];
      var rangeValueList = [];
      var $t1 = new ss.ObjectEnumerator(dict);
      try {
        while ($t1.moveNext()) {
          var ent = $t1.current();
          if (fieldValuesMap.hasOwnProperty(ent.key)) {
            if (!tab._jQueryShim.isFunction(dict[ent.key])) {
              this.$parseMarksParam(catNameList, catValueList, hierNameList, hierValueList, rangeNameList, rangeValueList, ent.key, ent.value);
            }
          }
        }
      } finally {
        $t1.dispose();
      }
      return this.$selectMarksWithValuesAsync(null, catNameList, catValueList, hierNameList, hierValueList, rangeNameList, rangeValueList, updateType);
    },
    $selectMarksWithMarksArrayAsync: function WorksheetImpl$SelectMarksWithMarksArrayAsync(marksArray, updateType) {
      var catNameList = [];
      var catValueList = [];
      var hierNameList = [];
      var hierValueList = [];
      var rangeNameList = [];
      var rangeValueList = [];
      var tupleIdList = [];
      for (var i = 0; i < marksArray.length; i++) {
        var mark = marksArray[i];
        // if tupleid exists, use it and don't worry about the rest in the mark object
        if (ss.isValue(mark.impl.get_tupleId()) && mark.impl.get_tupleId() > 0) {
          tupleIdList.push(mark.impl.get_tupleId());
        } else {
          var pairs = mark.impl.get_pairs();
          for (var j = 0; j < pairs.get__length(); j++) {
            var pair = pairs.get_item(j);
            if (pair.hasOwnProperty('fieldName') && pair.hasOwnProperty('value') && !tab._jQueryShim.isFunction(pair.fieldName) && !tab._jQueryShim.isFunction(pair.value)) {
              this.$parseMarksParam(catNameList, catValueList, hierNameList, hierValueList, rangeNameList, rangeValueList, pair.fieldName, pair.value);
            }
          }
        }
      }
      return this.$selectMarksWithValuesAsync(tupleIdList, catNameList, catValueList, hierNameList, hierValueList, rangeNameList, rangeValueList, updateType);
    },
    $parseMarksParam: function WorksheetImpl$ParseMarksParam(catNameList, catValueList, hierNameList, hierValueList, rangeNameList, rangeValueList, fieldName, value) {
      var sourceOptions = value;
      // hierarchical field format: "[Time].[All Time].[1998].[Quarter 1]"
      if ($tab__WorksheetImpl.$regexHierarchicalFieldName.test(fieldName)) {
        this.$addToParamLists(hierNameList, hierValueList, fieldName, value);
      } else if (ss.isValue(sourceOptions.min) || ss.isValue(sourceOptions.max)) {
        var range = new Object();
        if (ss.isValue(sourceOptions.min)) {
          // if 'Min' is a Date, serialize it in Server expected format
          if (tab._Utility.isDate(sourceOptions.min)) {
            var dt = ss.cast(sourceOptions.min, ss.JsDate);
            if (tab._Utility.isDateValid(dt)) {
              range.min = tab._Utility.serializeDateForServer(dt);
            } else {
              throw tab._TableauException.createInvalidDateParameter('options.min');
            }
          } else {
            range.min = sourceOptions.min;
          }
        }
        if (ss.isValue(sourceOptions.max)) {
          // if 'Max' is a Date, serialize it in Server expected format
          if (tab._Utility.isDate(sourceOptions.max)) {
            var dt1 = ss.cast(sourceOptions.max, ss.JsDate);
            if (tab._Utility.isDateValid(dt1)) {
              range.max = tab._Utility.serializeDateForServer(dt1);
            } else {
              throw tab._TableauException.createInvalidDateParameter('options.max');
            }
          } else {
            range.max = sourceOptions.max;
          }
        }
        if (ss.isValue(sourceOptions.nullOption)) {
          var nullOption = tab.PublicEnums.normalizeEnum(tab.ApiNullOption).call(null, sourceOptions.nullOption, 'options.nullOption');
          range.nullOption = nullOption;
        } else {
          // if nullOptions is not provided, use ALL_VALUES
          range.nullOption = 'allValues';
        }
        var jsonValue = JSON.stringify(range);
        this.$addToParamLists(rangeNameList, rangeValueList, fieldName, jsonValue);
      } else {
        this.$addToParamLists(catNameList, catValueList, fieldName, value);
      }
    },
    $addToParamLists: function WorksheetImpl$AddToParamLists(paramNameList, paramValueList, paramName, paramValue) {
      var markValues = [];
      if (tab._jQueryShim.isArray(paramValue)) {
        var values = ss.cast(paramValue, Array);
        for (var i = 0; i < values.length; i++) {
          markValues.push(values[i].toString());
        }
      } else {
        markValues.push(paramValue.toString());
      }
      paramValueList.push(markValues);
      paramNameList.push(paramName);
    },
    $selectMarksWithValuesAsync: function WorksheetImpl$SelectMarksWithValuesAsync(tupleIdList, catNameList, catValueList, hierNameList, hierValueList, rangeNameList, rangeValueList, updateType) {
      var commandParameters = {};
      this.$addVisualIdToCommand(commandParameters);
      updateType = tab.PublicEnums.normalizeEnum(tab.ApiSelectionUpdateType).call(null, updateType, 'updateType');
      commandParameters['api.filterUpdateType'] = updateType;
      if (!tab._Utility.isNullOrEmpty(tupleIdList)) {
        commandParameters['api.tupleIds'] = JSON.stringify(tupleIdList);
      }
      if (!tab._Utility.isNullOrEmpty(catNameList) && !tab._Utility.isNullOrEmpty(catValueList)) {
        commandParameters['api.categoricalFieldCaption'] = JSON.stringify(catNameList);
        var markValues = [];
        for (var i = 0; i < catValueList.length; i++) {
          var values = JSON.stringify(catValueList[i]);
          markValues.push(values);
        }
        commandParameters['api.categoricalMarkValues'] = JSON.stringify(markValues);
      }
      if (!tab._Utility.isNullOrEmpty(hierNameList) && !tab._Utility.isNullOrEmpty(hierValueList)) {
        commandParameters['api.hierarchicalFieldCaption'] = JSON.stringify(hierNameList);
        var markValues1 = [];
        for (var i1 = 0; i1 < hierValueList.length; i1++) {
          var values1 = JSON.stringify(hierValueList[i1]);
          markValues1.push(values1);
        }
        commandParameters['api.hierarchicalMarkValues'] = JSON.stringify(markValues1);
      }
      if (!tab._Utility.isNullOrEmpty(rangeNameList) && !tab._Utility.isNullOrEmpty(rangeValueList)) {
        commandParameters['api.rangeFieldCaption'] = JSON.stringify(rangeNameList);
        var markValues2 = [];
        for (var i2 = 0; i2 < rangeValueList.length; i2++) {
          var values2 = JSON.stringify(rangeValueList[i2]);
          markValues2.push(values2);
        }
        commandParameters['api.rangeMarkValues'] = JSON.stringify(markValues2);
      }
      // nothing to do
      if (tab._Utility.isNullOrEmpty(commandParameters['api.tupleIds']) && tab._Utility.isNullOrEmpty(commandParameters['api.categoricalFieldCaption']) && tab._Utility.isNullOrEmpty(commandParameters['api.hierarchicalFieldCaption']) && tab._Utility.isNullOrEmpty(commandParameters['api.rangeFieldCaption'])) {
        throw tab._TableauException.createInvalidParameter('fieldNameOrFieldValuesMap');
      }
      var deferred = new tab._Deferred();
      // send the command
      var returnHandler = new (ss.makeGenericType(tab.CommandReturnHandler$1, [Object]))('api.SelectMarksCommand', 0, function (result) {
        var error = $tab__WorksheetImpl.$createSelectionCommandError(result);
        if (ss.isNullOrUndefined(error)) {
          // Don't return the selected marks because it requires
          // a round trip to the server. The programmer is free
          // to call getSelectedMarksAsync() to get them.
          deferred.resolve();
        } else {
          // report error
          deferred.reject(error);
        }
      }, function (remoteError, message) {
        deferred.reject(tab._TableauException.createServerError(message));
      });
      this.sendCommand(Object).call(this, commandParameters, returnHandler);
      return deferred.get_promise();
    },
    $getSummaryDataAsync: function WorksheetImpl$GetSummaryDataAsync(options) {
      this.$verifyActiveSheetOrEmbeddedInActiveDashboard();
      var deferred = new tab._Deferred();
      //Prepare the command parameters
      var commandParameters = this.$getDataCommandsBuilder.getSummaryDataCommandParams(options);
      this.$addVisualIdToCommand(commandParameters);
      var returnHandler = this.$getDataCommandsBuilder.getSummaryDataResponseHandler(deferred);
      this.sendCommand(Object).call(this, commandParameters, returnHandler);
      return deferred.get_promise();
    },
    $getUnderlyingDataAsync: function WorksheetImpl$GetUnderlyingDataAsync(options) {
      this.$verifyActiveSheetOrEmbeddedInActiveDashboard();
      var deferred = new tab._Deferred();
      //Prepare the command parameters
      var commandParameters = this.$getDataCommandsBuilder.getUnderlyingDataCommandParams(options);
      this.$addVisualIdToCommand(commandParameters);
      var returnHandler = this.$getDataCommandsBuilder.getUnderlyingDataResponseHandler(deferred);
      this.sendCommand(Object).call(this, commandParameters, returnHandler);
      return deferred.get_promise();
    },
    $getUnderlyingTablesAsync: function WorksheetImpl$GetUnderlyingTablesAsync() {
      this.$verifyActiveSheetOrEmbeddedInActiveDashboard();
      var deferred = new tab._Deferred();
      // Prepare the command parameters
      var commandParameters = this.$getDataCommandsBuilder.getUnderlyingTablesCommandParams();
      this.$addVisualIdToCommand(commandParameters);
      var returnHandler = this.$getDataCommandsBuilder.getUnderlyingTablesResponseHandler(deferred);
      this.sendCommand(Object).call(this, commandParameters, returnHandler);
      return deferred.get_promise();
    },
    $getUnderlyingTableDataAsync: function WorksheetImpl$GetUnderlyingTableDataAsync(tableId, options) {
      this.$verifyActiveSheetOrEmbeddedInActiveDashboard();
      var deferred = new tab._Deferred();
      //Prepare the command parameters
      var commandParameters = this.$getDataCommandsBuilder.getUnderlyingTableDataCommandParams(tableId, options);
      this.$addVisualIdToCommand(commandParameters);
      var returnHandler = this.$getDataCommandsBuilder.getUnderlyingTableDataResponseHandler(deferred);
      this.sendCommand(Object).call(this, commandParameters, returnHandler);
      return deferred.get_promise();
    },
    $clearHighlightedMarksAsync: function WorksheetImpl$ClearHighlightedMarksAsync() {
      this.$verifyActiveSheetOrEmbeddedInActiveDashboard();
      var deferred = new tab._Deferred();
      var commandParameters = {};
      this.$addVisualIdToCommand(commandParameters);
      // send the command
      var returnHandler = new (ss.makeGenericType(tab.CommandReturnHandler$1, [Object]))('api.ClearHighlightedMarksCommand', 0, function (result) {
        deferred.resolve();
      }, function (remoteError, message) {
        deferred.reject(tab._TableauException.createServerError(message));
      });
      this.sendCommand(Object).call(this, commandParameters, returnHandler);
      return deferred.get_promise();
    },
    $highlightMarksAsync: function WorksheetImpl$HighlightMarksAsync(fieldName, values) {
      tab._Param.verifyString(fieldName, 'fieldName');
      this.$verifyActiveSheetOrEmbeddedInActiveDashboard();
      var deferred = new tab._Deferred();
      var commandParameters = {};
      commandParameters['api.fieldCaption'] = fieldName;
      commandParameters['api.ObjectTextIDs'] = values;
      this.$addVisualIdToCommand(commandParameters);
      //send the command
      var returnHandler = new (ss.makeGenericType(tab.CommandReturnHandler$1, [Object]))('api.HighlightMarksCommand', 0, function (result) {
        deferred.resolve();
      }, function (remoteError, message) {
        deferred.reject(tab._TableauException.createServerError(message));
      });
      this.sendCommand(Object).call(this, commandParameters, returnHandler);
      return deferred.get_promise();
    },
    $highlightMarksByPatternMatchAsync: function WorksheetImpl$HighlightMarksByPatternMatchAsync(fieldName, patternMatch) {
      tab._Param.verifyString(fieldName, 'fieldName');
      tab._Param.verifyString(patternMatch, 'patternMatch');
      this.$verifyActiveSheetOrEmbeddedInActiveDashboard();
      var deferred = new tab._Deferred();
      var commandParameters = {};
      commandParameters['api.filterUpdateType'] = 'replace';
      commandParameters['api.fieldCaption'] = fieldName;
      commandParameters['api.Pattern'] = patternMatch;
      this.$addVisualIdToCommand(commandParameters);
      // send the command
      var returnHandler = new (ss.makeGenericType(tab.CommandReturnHandler$1, [Object]))('api.HighlightMarksByPatternMatch', 0, function (result) {
        deferred.resolve();
      }, function (remoteError, message) {
        deferred.reject(tab._TableauException.createServerError(message));
      });
      this.sendCommand(Object).call(this, commandParameters, returnHandler);
      return deferred.get_promise();
    },
    $getHighlightedMarksAsync: function WorksheetImpl$GetHighlightedMarksAsync() {
      this.$verifyActiveSheetOrEmbeddedInActiveDashboard();
      // prepare the command parameters
      var deferred = new tab._Deferred();
      var commandParameters = {};
      this.$addVisualIdToCommand(commandParameters);
      // send the command
      var returnHandler = new (ss.makeGenericType(tab.CommandReturnHandler$1, [Object]))('api.FetchHighlightedMarksCommand', 0, ss.mkdel(this, function (result) {
        this.highlightedMarks = tab.MarkImpl.processActiveMarks(result);
        deferred.resolve(this.highlightedMarks._toApiCollection());
      }), function (remoteError, message) {
        deferred.reject(tab._TableauException.createServerError(message));
      });
      this.sendCommand(Object).call(this, commandParameters, returnHandler);
      return deferred.get_promise();
    }
  }, {
    $filterCommandError: function WorksheetImpl$FilterCommandError(rawPm) {
      var commandError = rawPm;
      if (ss.isValue(commandError) && ss.isValue(commandError.errorCode)) {
        var additionalInfo = ss.isValue(commandError.additionalInformation) ? commandError.additionalInformation.toString() : '';
        switch (commandError.errorCode) {
          case 'invalidFilterFieldName':
            {
              return tab._TableauException.create('invalidFilterFieldName', additionalInfo);
            }
          case 'invalidFilterFieldValue':
            {
              return tab._TableauException.create('invalidFilterFieldValue', additionalInfo);
            }
          case 'invalidAggregationFieldName':
            {
              return tab._TableauException.createInvalidAggregationFieldName(additionalInfo);
            }
          default:
            {
              return tab._TableauException.createServerError(additionalInfo);
            }
        }
      }
      return null;
    },
    $createSelectionCommandError: function WorksheetImpl$CreateSelectionCommandError(rawPm) {
      var commandError = rawPm;
      if (ss.isValue(commandError) && ss.isValue(commandError.errorCode)) {
        var additionalInfo = ss.isValue(commandError.additionalInformation) ? commandError.additionalInformation.toString() : '';
        switch (commandError.errorCode) {
          case 'invalidSelectionFieldName':
            {
              return tab._TableauException.create('invalidSelectionFieldName', additionalInfo);
            }
          case 'invalidSelectionValue':
            {
              return tab._TableauException.create('invalidSelectionValue', additionalInfo);
            }
          case 'invalidSelectionDate':
            {
              return tab._TableauException.create('invalidSelectionDate', additionalInfo);
            }
        }
      }
      return null;
    }
  });
  ////////////////////////////////////////////////////////////////////////////////
  // tableauSoftware.CustomViewEventContext
  var $tab_$CustomViewEventContext = ss.mkType($asm, 'tab.$CustomViewEventContext', function (workbook, customViewImpl) {
    this.$customViewImpl = null;
    $tab_EventContext.call(this, workbook, null);
    this.$customViewImpl = customViewImpl;
  }, {
    get__customViewImpl: function CustomViewEventContext$get_CustomViewImpl() {
      return this.$customViewImpl;
    }
  });
  ////////////////////////////////////////////////////////////////////////////////
  // Tableau.JavaScript.Vql.Api.DashboardZoneInfo
  var $tab_$DashboardZoneInfo = ss.mkType($asm, 'tab.$DashboardZoneInfo', null, null, {
    isInstanceOfType: function isInstanceOfType() {
      return true;
    }
  });
  ////////////////////////////////////////////////////////////////////////////////
  // tableauSoftware.FilterEventContext
  var $tab_$FilterEventContext = ss.mkType($asm, 'tab.$FilterEventContext', function (workbookImpl, worksheetImpl, fieldFieldName, filterCaption) {
    this.$fieldFieldName = null;
    this.$filterCaption = null;
    $tab_EventContext.call(this, workbookImpl, worksheetImpl);
    this.$fieldFieldName = fieldFieldName;
    this.$filterCaption = filterCaption;
  }, {
    get__filterFieldName: function FilterEventContext$get_FilterFieldName() {
      return this.$fieldFieldName;
    },
    get_$filterCaption: function FilterEventContext$get_FilterCaption() {
      return this.$filterCaption;
    }
  });
  ////////////////////////////////////////////////////////////////////////////////
  // tableauSoftware.HighlightEventContext
  var $tab_$HighlightEventContext = ss.mkType($asm, 'tab.$HighlightEventContext', function (workbookImpl, worksheetImpl) {
    $tab_EventContext.call(this, workbookImpl, worksheetImpl);
  });
  ////////////////////////////////////////////////////////////////////////////////
  // tableauSoftware.MarksEventContext
  var $tab_$MarksEventContext = ss.mkType($asm, 'tab.$MarksEventContext', function (workbookImpl, worksheetImpl) {
    $tab_EventContext.call(this, workbookImpl, worksheetImpl);
  });
  ////////////////////////////////////////////////////////////////////////////////
  // tableauSoftware.ParameterEventContext
  var $tab_$ParameterEventContext = ss.mkType($asm, 'tab.$ParameterEventContext', function (workbookImpl, parameterName) {
    this.$parameterName = null;
    $tab_EventContext.call(this, workbookImpl, null);
    this.$parameterName = parameterName;
  }, {
    get__parameterName: function ParameterEventContext$get_ParameterName() {
      return this.$parameterName;
    }
  });
  ////////////////////////////////////////////////////////////////////////////////
  // Tableau.JavaScript.Vql.Api.ParameterImpl
  var $tab_$ParameterImpl = ss.mkType($asm, 'tab.$ParameterImpl', function (pm) {
    this.$parameter = null;
    this.$name = null;
    this.$currentValue = null;
    this.$dataType = null;
    this.$allowableValuesType = null;
    this.$allowableValues = null;
    this.$minValue = null;
    this.$maxValue = null;
    this.$stepSize = null;
    this.$dateStepPeriod = null;
    this.$name = pm.name;
    this.$currentValue = tab._Utility.getDataValue(pm.currentValue);
    this.$dataType = tab.ApiEnumConverter.convertParameterDataType(pm.dataType);
    this.$allowableValuesType = tab.ApiEnumConverter.convertParameterAllowableValuesType(pm.allowableValuesType);
    // TODO we actually have allowables values in the "range" case, do we want them
    if (ss.isValue(pm.allowableValues) && this.$allowableValuesType === 'list') {
      this.$allowableValues = [];
      for (var $t1 = 0; $t1 < pm.allowableValues.length; $t1++) {
        var adv = pm.allowableValues[$t1];
        this.$allowableValues.push(tab._Utility.getDataValue(adv));
      }
    }
    if (this.$allowableValuesType === 'range') {
      this.$minValue = tab._Utility.getDataValue(pm.minValue);
      this.$maxValue = tab._Utility.getDataValue(pm.maxValue);
      this.$stepSize = pm.stepSize;
      if ((this.$dataType === 'date' || this.$dataType === 'datetime') && ss.isValue(this.$stepSize) && ss.isValue(pm.dateStepPeriod)) {
        this.$dateStepPeriod = tab.ApiEnumConverter.convertPeriodType(pm.dateStepPeriod);
      }
    }
  }, {
    get_$parameter: function ParameterImpl$get_Parameter() {
      if (ss.isNullOrUndefined(this.$parameter)) {
        this.$parameter = new $tableauSoftware_Parameter(this);
      }
      return this.$parameter;
    },
    get_$name: function ParameterImpl$get_Name() {
      return this.$name;
    },
    get_$currentValue: function ParameterImpl$get_CurrentValue() {
      return this.$currentValue;
    },
    get_$dataType: function ParameterImpl$get_DataType() {
      return this.$dataType;
    },
    get_$allowableValuesType: function ParameterImpl$get_AllowableValuesType() {
      return this.$allowableValuesType;
    },
    get_$allowableValues: function ParameterImpl$get_AllowableValues() {
      return this.$allowableValues;
    },
    get_$minValue: function ParameterImpl$get_MinValue() {
      return this.$minValue;
    },
    get_$maxValue: function ParameterImpl$get_MaxValue() {
      return this.$maxValue;
    },
    get_$stepSize: function ParameterImpl$get_StepSize() {
      return this.$stepSize;
    },
    get_$dateStepPeriod: function ParameterImpl$get_DateStepPeriod() {
      return this.$dateStepPeriod;
    }
  });
  ////////////////////////////////////////////////////////////////////////////////
  // tableauSoftware.CustomMarkContextMenuEvent
  var $tab_CustomMarkContextMenuEvent = global.tab.CustomMarkContextMenuEvent = ss.mkType($asm, 'tab.CustomMarkContextMenuEvent', function (eventName, viz, contextMenuId, worksheetImpl) {
    this.$contextMenuId = null;
    this.$worksheetImpl = null;
    $tab_TableauEvent.call(this, eventName, viz);
    this.$contextMenuId = contextMenuId;
    this.$worksheetImpl = worksheetImpl;
  }, {
    getContextMenuId: function CustomMarkContextMenuEvent$GetContextMenuId() {
      return this.$contextMenuId;
    },
    getSelectedMarksAsync: function CustomMarkContextMenuEvent$GetSelectedMarksAsync() {
      var worksheetImpl = this.$worksheetImpl;
      if (ss.isValue(worksheetImpl.get_selectedMarks())) {
        var deferred = new tab._Deferred();
        return deferred.resolve(worksheetImpl.get_selectedMarks()._toApiCollection());
      }
      return worksheetImpl.$getSelectedMarksAsync();
    }
  });
  ////////////////////////////////////////////////////////////////////////////////
  // tableauSoftware.CustomViewEvent
  var $tab_CustomViewEvent = global.tab.CustomViewEvent = ss.mkType($asm, 'tab.CustomViewEvent', function (eventName, viz, customViewImpl) {
    this.$context = null;
    $tab_TableauEvent.call(this, eventName, viz);
    this.$context = new $tab_$CustomViewEventContext(viz._impl.get__workbookImpl(), customViewImpl);
  }, {
    getCustomViewAsync: function CustomViewEvent$GetCustomViewAsync() {
      var deferred = new tab._Deferred();
      var customView = null;
      if (ss.isValue(this.$context.get__customViewImpl())) {
        customView = this.$context.get__customViewImpl().get_$customView();
      }
      deferred.resolve(customView);
      return deferred.get_promise();
    }
  });
  ////////////////////////////////////////////////////////////////////////////////
  // tableauSoftware.EventContext
  var $tab_EventContext = global.tab.EventContext = ss.mkType($asm, 'tab.EventContext', function (workbookImpl, worksheetImpl) {
    this.$workbookImpl = null;
    this.$worksheetImpl = null;
    this.$workbookImpl = workbookImpl;
    this.$worksheetImpl = worksheetImpl;
  }, {
    get__workbookImpl: function EventContext$get_WorkbookImpl() {
      return this.$workbookImpl;
    },
    get__worksheetImpl: function EventContext$get_WorksheetImpl() {
      return this.$worksheetImpl;
    }
  });
  ////////////////////////////////////////////////////////////////////////////////
  // tableauSoftware.FilterEvent
  var $tab_FilterEvent = global.tab.FilterEvent = ss.mkType($asm, 'tab.FilterEvent', function (eventName, viz, worksheetImpl, fieldName, filterCaption) {
    this.$filterCaption = null;
    this.$context = null;
    $tab_WorksheetEvent.call(this, eventName, viz, worksheetImpl);
    this.$filterCaption = filterCaption;
    this.$context = new $tab_$FilterEventContext(viz._impl.get__workbookImpl(), worksheetImpl, fieldName, filterCaption);
  }, {
    getFieldName: function FilterEvent$GetFieldName() {
      return this.$filterCaption;
    },
    getFilterAsync: function FilterEvent$GetFilterAsync() {
      return this.$context.get__worksheetImpl().$getFilterAsync(this.$context.get__filterFieldName(), null, null);
    }
  });
  ////////////////////////////////////////////////////////////////////////////////
  // tableauSoftware.FirstVizSizeKnownEvent
  var $tab_FirstVizSizeKnownEvent = global.tab.FirstVizSizeKnownEvent = ss.mkType($asm, 'tab.FirstVizSizeKnownEvent', function (eventName, viz, vizSize) {
    this.$vizSize = null;
    $tab_TableauEvent.call(this, eventName, viz);
    this.$vizSize = vizSize;
  }, {
    getVizSize: function FirstVizSizeKnownEvent$GetVizSize() {
      return this.$vizSize;
    }
  });
  ////////////////////////////////////////////////////////////////////////////////
  // tableauSoftware.HighlightEvent
  var $tab_HighlightEvent = global.tab.HighlightEvent = ss.mkType($asm, 'tab.HighlightEvent', function (eventName, viz, worksheetImpl) {
    this.$context = null;
    $tab_WorksheetEvent.call(this, eventName, viz, worksheetImpl);
    this.$context = new $tab_$HighlightEventContext(viz._impl.get__workbookImpl(), worksheetImpl);
  }, {
    getHighlightedMarksAsync: function HighlightEvent$GetHighlightedMarksAsync() {
      var worksheetImpl = this.$context.get__worksheetImpl();
      return worksheetImpl.$getHighlightedMarksAsync();
    }
  });
  ////////////////////////////////////////////////////////////////////////////////
  // Tableau.JavaScript.Vql.Api.IJsApiMessageHandler
  var $tab_IJsApiMessageHandler = global.tab.IJsApiMessageHandler = ss.mkType($asm, 'tab.IJsApiMessageHandler');
  ////////////////////////////////////////////////////////////////////////////////
  // Tableau.JavaScript.Vql.Api.JsApiMessageRouter
  var $tab_JsApiMessageRouter = global.tab.JsApiMessageRouter = ss.mkType($asm, 'tab.JsApiMessageRouter', function () {
    this.$customViewLoadCallbacks = {};
    this.$crossDomainMessager = null;
    var legacyHandler = ss.mkdel(this, function (command, handler) {
      var jsApiMessageHandler = ss.safeCast(handler, $tab_IJsApiMessageHandler);
      this.$handleLegacyNotifications(command, jsApiMessageHandler);
    });
    this.$crossDomainMessager = new tab.CrossDomainMessager(legacyHandler);
  }, {
    registerHandler: function JsApiMessageRouter$RegisterHandler(handler) {
      this.$crossDomainMessager.registerHandler(handler);
      handler.add_customViewsListLoad(ss.mkdel(this, this.$handleCustomViewsListLoad));
    },
    unregisterHandler: function JsApiMessageRouter$UnregisterHandler(handler) {
      this.$crossDomainMessager.unregisterHandler(handler);
      handler.remove_customViewsListLoad(ss.mkdel(this, this.$handleCustomViewsListLoad));
    },
    sendCommand: function sendCommand(T) {
      return function JsApiMessageRouter$SendCommand(source, commandParameters, returnHandler) {
        this.$crossDomainMessager.sendCommand(T).call(this.$crossDomainMessager, source, commandParameters, returnHandler);
        // jrockwood-2012-12-19:
        // Special case: The ShowCustomView command will actually reload the
        // iframe's content. This means that there's no code to actually send
        // us a response back because the JavaScript is reloaded and a new
        // bootstrap happens. To get around this problem, we cache the callback
        // in a separate list. Whenever we hear a Load event, we just call
        // all of these callbacks. It's kind of a round-about way of doing
        // things, but it works. However, it's not very maintainable and
        // should be refactored.
        if (returnHandler.get_commandName() === 'api.ShowCustomViewCommand') {
          var customViewCallbacks = this.$customViewLoadCallbacks[source.get_hostId()];
          if (ss.isNullOrUndefined(customViewCallbacks)) {
            customViewCallbacks = [];
            this.$customViewLoadCallbacks[source.get_hostId()] = customViewCallbacks;
          }
          customViewCallbacks.push(returnHandler);
        }
      };
    },
    $handleCustomViewsListLoad: function JsApiMessageRouter$HandleCustomViewsListLoad(source) {
      var handlerId = source.get_hostId();
      var customViewCallbacks = this.$customViewLoadCallbacks[handlerId];
      if (ss.isNullOrUndefined(customViewCallbacks)) {
        return;
      }
      for (var $t1 = 0; $t1 < customViewCallbacks.length; $t1++) {
        var returnHandler = customViewCallbacks[$t1];
        if (!ss.staticEquals(returnHandler.get_successCallback(), null)) {
          returnHandler.get_successCallback()(null);
        }
      }
      // Delete the cache
      delete this.$customViewLoadCallbacks[handlerId];
    },
    $handleLegacyNotifications: function JsApiMessageRouter$HandleLegacyNotifications(command, handler) {
      if (command.get_name() === 'layoutInfoReq') {
        $tab__VizManagerImpl.$sendVisibleRects();
      } else if (ss.isValue(handler)) {
        if (command.get_name() === 'tableau.completed' || command.get_name() === 'completed') {
          // Backwards compatibility requires checking for "completed".
          handler.handleVizLoad();
        } else if (command.get_name() === 'tableau.listening') {
          handler.handleVizListening();
        } else if (command.get_name() === 'sf?') {
          if (ss.count(command.get_parameters()) > 0) {
            var requestId = ss.getItem(command.get_parameters(), 0);
            handler.sendScaleFactor(requestId);
          }
        }
      }
    }
  });
  ////////////////////////////////////////////////////////////////////////////////
  // Tableau.JavaScript.Vql.Api.JsApiMessagingOptions
  var $tab_JsApiMessagingOptions = global.tab.JsApiMessagingOptions = ss.mkType($asm, 'tab.JsApiMessagingOptions', function (router, handler) {
    this.$router = null;
    this.$handler = null;
    tab._Param.verifyValue(router, 'router');
    tab._Param.verifyValue(handler, 'handler');
    this.$router = router;
    this.$handler = handler;
  }, {
    get_handler: function JsApiMessagingOptions$get_Handler() {
      return this.$handler;
    },
    get_router: function JsApiMessagingOptions$get_Router() {
      return this.$router;
    },
    sendCommand: function sendCommand(T) {
      return function JsApiMessagingOptions$SendCommand(commandParameters, returnHandler) {
        this.$router.sendCommand(T).call(this.$router, this.$handler, commandParameters, returnHandler);
      };
    },
    dispose: function JsApiMessagingOptions$Dispose() {
      this.$router.unregisterHandler(this.$handler);
    }
  });
  ////////////////////////////////////////////////////////////////////////////////
  // tableauSoftware.MarksEvent
  var $tab_MarksEvent = global.tab.MarksEvent = ss.mkType($asm, 'tab.MarksEvent', function (eventName, viz, worksheetImpl) {
    this.$context = null;
    $tab_WorksheetEvent.call(this, eventName, viz, worksheetImpl);
    this.$context = new $tab_$MarksEventContext(viz._impl.get__workbookImpl(), worksheetImpl);
  }, {
    getMarksAsync: function MarksEvent$GetMarksAsync() {
      var worksheetImpl = this.$context.get__worksheetImpl();
      if (ss.isValue(worksheetImpl.get_selectedMarks())) {
        var deferred = new tab._Deferred();
        return deferred.resolve(worksheetImpl.get_selectedMarks()._toApiCollection());
      }
      return worksheetImpl.$getSelectedMarksAsync();
    }
  });
  ////////////////////////////////////////////////////////////////////////////////
  // tableauSoftware.ParameterEvent
  var $tab_ParameterEvent = global.tab.ParameterEvent = ss.mkType($asm, 'tab.ParameterEvent', function (eventName, viz, parameterName) {
    this.$context = null;
    $tab_TableauEvent.call(this, eventName, viz);
    this.$context = new $tab_$ParameterEventContext(viz._impl.get__workbookImpl(), parameterName);
  }, {
    getParameterName: function ParameterEvent$GetParameterName() {
      return this.$context.get__parameterName();
    },
    getParameterAsync: function ParameterEvent$GetParameterAsync() {
      return this.$context.get__workbookImpl().$getSingleParameterAsync(this.$context.get__parameterName());
    }
  });
  ////////////////////////////////////////////////////////////////////////////////
  // Tableau.JavaScript.Vql.Api.StoryPointInfoImplUtil
  var $tab_StoryPointInfoImplUtil = global.tab.StoryPointInfoImplUtil = ss.mkType($asm, 'tab.StoryPointInfoImplUtil', null, null, {
    clone: function StoryPointInfoImplUtil$Clone(impl) {
      return $tab__StoryPointInfoImpl.$ctor(impl.caption, impl.index, impl.storyPointId, impl.isActive, impl.isUpdated, impl.parentStoryImpl);
    }
  });
  ////////////////////////////////////////////////////////////////////////////////
  // tableauSoftware.StoryPointSwitchEvent
  var $tab_StoryPointSwitchEvent = global.tab.StoryPointSwitchEvent = ss.mkType($asm, 'tab.StoryPointSwitchEvent', function (eventName, viz, oldStoryPointInfo, newStoryPoint) {
    this.$oldStoryPointInfo = null;
    this.$newStoryPoint = null;
    $tab_TableauEvent.call(this, eventName, viz);
    this.$oldStoryPointInfo = oldStoryPointInfo;
    this.$newStoryPoint = newStoryPoint;
  }, {
    getOldStoryPointInfo: function StoryPointSwitchEvent$GetOldStoryPointInfo() {
      return this.$oldStoryPointInfo;
    },
    getNewStoryPoint: function StoryPointSwitchEvent$GetNewStoryPoint() {
      return this.$newStoryPoint;
    }
  });
  ////////////////////////////////////////////////////////////////////////////////
  // tableauSoftware.TableauEvent
  var $tab_TableauEvent = global.tab.TableauEvent = ss.mkType($asm, 'tab.TableauEvent', function (eventName, viz) {
    this.$viz = null;
    this.$eventName = null;
    this.$viz = viz;
    this.$eventName = eventName;
  }, {
    getViz: function TableauEvent$GetViz() {
      return this.$viz;
    },
    getEventName: function TableauEvent$GetEventName() {
      return this.$eventName;
    }
  });
  ////////////////////////////////////////////////////////////////////////////////
  // tableauSoftware.TabSwitchEvent
  var $tab_TabSwitchEvent = global.tab.TabSwitchEvent = ss.mkType($asm, 'tab.TabSwitchEvent', function (eventName, viz, oldName, newName) {
    this.$oldName = null;
    this.$newName = null;
    $tab_TableauEvent.call(this, eventName, viz);
    this.$oldName = oldName;
    this.$newName = newName;
  }, {
    getOldSheetName: function TabSwitchEvent$GetOldSheetName() {
      return this.$oldName;
    },
    getNewSheetName: function TabSwitchEvent$GetNewSheetName() {
      return this.$newName;
    }
  });
  ////////////////////////////////////////////////////////////////////////////////
  // tableauSoftware.ToolbarStateEvent
  var $tab_ToolbarStateEvent = global.tab.ToolbarStateEvent = ss.mkType($asm, 'tab.ToolbarStateEvent', function (eventName, viz, toolbarStateImpl) {
    this.$toolbarStateImpl = null;
    $tab_TableauEvent.call(this, eventName, viz);
    this.$toolbarStateImpl = toolbarStateImpl;
  }, {
    getToolbarState: function ToolbarStateEvent$GetToolbarState() {
      return this.$toolbarStateImpl.get_toolbarState();
    }
  });
  ////////////////////////////////////////////////////////////////////////////////
  // tableauSoftware.UrlActionEvent
  var $tab_UrlActionEvent = global.tab.UrlActionEvent = ss.mkType($asm, 'tab.UrlActionEvent', function (eventName, viz, url, target) {
    this.$url = null;
    this.$target = null;
    $tab_TableauEvent.call(this, eventName, viz);
    this.$url = url;
    this.$target = target;
  }, {
    getUrl: function UrlActionEvent$GetUrl() {
      return this.$url;
    },
    getTarget: function UrlActionEvent$GetTarget() {
      return this.$target;
    }
  });
  ////////////////////////////////////////////////////////////////////////////////
  // Tableau.JavaScript.Vql.Api.VizImpl
  var $tab_VizImpl = global.tab.VizImpl = ss.mkType($asm, 'tab.VizImpl', function (messageRouter, viz, parentElement, url, options) {
    this.$workbookTabSwitchHandler = null;
    this.$viz = null;
    this.$iframe = null;
    this.$staticImage = null;
    this.$parameters = null;
    this.$initialAvailableSize = null;
    this.$instanceId = null;
    this.$workbookImpl = null;
    this.$onFirstInteractiveCallback = null;
    this.$onFirstVizSizeKnownCallback = null;
    this.$onFirstInteractiveAlreadyCalled = false;
    this.$areTabsHidden = false;
    this.$isToolbarHidden = false;
    this.$areAutomaticUpdatesPaused = false;
    this.$messagingOptions = null;
    this.$vizSize = null;
    this.$windowResizeHandler = null;
    this.$initializingWorkbookImpl = false;
    this.$1$CustomViewsListLoadField = null;
    this.$1$StateReadyForQueryField = null;
    this.$1$MarksSelectionField = null;
    this.$1$MarksHighlightField = null;
    this.$1$FilterChangeField = null;
    this.$1$ParameterValueChangeField = null;
    this.$1$CustomViewLoadField = null;
    this.$1$CustomViewSaveField = null;
    this.$1$CustomViewRemoveField = null;
    this.$1$CustomViewSetDefaultField = null;
    this.$1$TabSwitchField = null;
    this.$1$ToolbarStateChangeField = null;
    this.$1$StoryPointSwitchField = null;
    this.$1$VizResizeField = null;
    this.$1$UrlActionField = null;
    this.$1$CustomMarkContextMenuField = null;
    if (!tab._Utility.hasWindowPostMessage() || !tab._Utility.hasJsonParse()) {
      throw tab._TableauException.createBrowserNotCapable();
    }
    this.$messagingOptions = new $tab_JsApiMessagingOptions(messageRouter, this);
    this.$viz = viz;
    if (ss.isNullOrUndefined(parentElement) || parentElement.nodeType !== 1) {
      parentElement = document.body;
    }
    this.$parameters = new $tab__VizParameters(parentElement, url, options);
    if (ss.isValue(options)) {
      this.$onFirstInteractiveCallback = options.onFirstInteractive;
      this.$onFirstVizSizeKnownCallback = options.onFirstVizSizeKnown;
    }
  }, {
    add_customViewsListLoad: function VizImpl$add_CustomViewsListLoad(value) {
      this.$1$CustomViewsListLoadField = ss.delegateCombine(this.$1$CustomViewsListLoadField, value);
    },
    remove_customViewsListLoad: function VizImpl$remove_CustomViewsListLoad(value) {
      this.$1$CustomViewsListLoadField = ss.delegateRemove(this.$1$CustomViewsListLoadField, value);
    },
    add_stateReadyForQuery: function VizImpl$add_StateReadyForQuery(value) {
      this.$1$StateReadyForQueryField = ss.delegateCombine(this.$1$StateReadyForQueryField, value);
    },
    remove_stateReadyForQuery: function VizImpl$remove_StateReadyForQuery(value) {
      this.$1$StateReadyForQueryField = ss.delegateRemove(this.$1$StateReadyForQueryField, value);
    },
    add_$marksSelection: function VizImpl$add_MarksSelection(value) {
      this.$1$MarksSelectionField = ss.delegateCombine(this.$1$MarksSelectionField, value);
    },
    remove_$marksSelection: function VizImpl$remove_MarksSelection(value) {
      this.$1$MarksSelectionField = ss.delegateRemove(this.$1$MarksSelectionField, value);
    },
    add_$marksHighlight: function VizImpl$add_MarksHighlight(value) {
      this.$1$MarksHighlightField = ss.delegateCombine(this.$1$MarksHighlightField, value);
    },
    remove_$marksHighlight: function VizImpl$remove_MarksHighlight(value) {
      this.$1$MarksHighlightField = ss.delegateRemove(this.$1$MarksHighlightField, value);
    },
    add_$filterChange: function VizImpl$add_FilterChange(value) {
      this.$1$FilterChangeField = ss.delegateCombine(this.$1$FilterChangeField, value);
    },
    remove_$filterChange: function VizImpl$remove_FilterChange(value) {
      this.$1$FilterChangeField = ss.delegateRemove(this.$1$FilterChangeField, value);
    },
    add_$parameterValueChange: function VizImpl$add_ParameterValueChange(value) {
      this.$1$ParameterValueChangeField = ss.delegateCombine(this.$1$ParameterValueChangeField, value);
    },
    remove_$parameterValueChange: function VizImpl$remove_ParameterValueChange(value) {
      this.$1$ParameterValueChangeField = ss.delegateRemove(this.$1$ParameterValueChangeField, value);
    },
    add_$customViewLoad: function VizImpl$add_CustomViewLoad(value) {
      this.$1$CustomViewLoadField = ss.delegateCombine(this.$1$CustomViewLoadField, value);
    },
    remove_$customViewLoad: function VizImpl$remove_CustomViewLoad(value) {
      this.$1$CustomViewLoadField = ss.delegateRemove(this.$1$CustomViewLoadField, value);
    },
    add_$customViewSave: function VizImpl$add_CustomViewSave(value) {
      this.$1$CustomViewSaveField = ss.delegateCombine(this.$1$CustomViewSaveField, value);
    },
    remove_$customViewSave: function VizImpl$remove_CustomViewSave(value) {
      this.$1$CustomViewSaveField = ss.delegateRemove(this.$1$CustomViewSaveField, value);
    },
    add_$customViewRemove: function VizImpl$add_CustomViewRemove(value) {
      this.$1$CustomViewRemoveField = ss.delegateCombine(this.$1$CustomViewRemoveField, value);
    },
    remove_$customViewRemove: function VizImpl$remove_CustomViewRemove(value) {
      this.$1$CustomViewRemoveField = ss.delegateRemove(this.$1$CustomViewRemoveField, value);
    },
    add_$customViewSetDefault: function VizImpl$add_CustomViewSetDefault(value) {
      this.$1$CustomViewSetDefaultField = ss.delegateCombine(this.$1$CustomViewSetDefaultField, value);
    },
    remove_$customViewSetDefault: function VizImpl$remove_CustomViewSetDefault(value) {
      this.$1$CustomViewSetDefaultField = ss.delegateRemove(this.$1$CustomViewSetDefaultField, value);
    },
    add_$tabSwitch: function VizImpl$add_TabSwitch(value) {
      this.$1$TabSwitchField = ss.delegateCombine(this.$1$TabSwitchField, value);
    },
    remove_$tabSwitch: function VizImpl$remove_TabSwitch(value) {
      this.$1$TabSwitchField = ss.delegateRemove(this.$1$TabSwitchField, value);
    },
    add_$toolbarStateChange: function VizImpl$add_ToolbarStateChange(value) {
      this.$1$ToolbarStateChangeField = ss.delegateCombine(this.$1$ToolbarStateChangeField, value);
    },
    remove_$toolbarStateChange: function VizImpl$remove_ToolbarStateChange(value) {
      this.$1$ToolbarStateChangeField = ss.delegateRemove(this.$1$ToolbarStateChangeField, value);
    },
    add_$storyPointSwitch: function VizImpl$add_StoryPointSwitch(value) {
      this.$1$StoryPointSwitchField = ss.delegateCombine(this.$1$StoryPointSwitchField, value);
    },
    remove_$storyPointSwitch: function VizImpl$remove_StoryPointSwitch(value) {
      this.$1$StoryPointSwitchField = ss.delegateRemove(this.$1$StoryPointSwitchField, value);
    },
    add_$vizResize: function VizImpl$add_VizResize(value) {
      this.$1$VizResizeField = ss.delegateCombine(this.$1$VizResizeField, value);
    },
    remove_$vizResize: function VizImpl$remove_VizResize(value) {
      this.$1$VizResizeField = ss.delegateRemove(this.$1$VizResizeField, value);
    },
    add_$urlAction: function VizImpl$add_UrlAction(value) {
      this.$1$UrlActionField = ss.delegateCombine(this.$1$UrlActionField, value);
    },
    remove_$urlAction: function VizImpl$remove_UrlAction(value) {
      this.$1$UrlActionField = ss.delegateRemove(this.$1$UrlActionField, value);
    },
    add_$customMarkContextMenu: function VizImpl$add_CustomMarkContextMenu(value) {
      this.$1$CustomMarkContextMenuField = ss.delegateCombine(this.$1$CustomMarkContextMenuField, value);
    },
    remove_$customMarkContextMenu: function VizImpl$remove_CustomMarkContextMenu(value) {
      this.$1$CustomMarkContextMenuField = ss.delegateRemove(this.$1$CustomMarkContextMenuField, value);
    },
    get_hostId: function VizImpl$get_HostId() {
      return this.$parameters.hostId;
    },
    set_hostId: function VizImpl$set_HostId(value) {
      this.$parameters.hostId = value;
    },
    get_iframe: function VizImpl$get_Iframe() {
      return this.$iframe;
    },
    get_instanceId: function VizImpl$get_InstanceId() {
      return this.$instanceId;
    },
    set_instanceId: function VizImpl$set_InstanceId(value) {
      this.$instanceId = value;
    },
    get_$viz: function VizImpl$get_Viz() {
      return this.$viz;
    },
    get_$areTabsHidden: function VizImpl$get_AreTabsHidden() {
      return this.$areTabsHidden;
    },
    get_$isToolbarHidden: function VizImpl$get_IsToolbarHidden() {
      return this.$isToolbarHidden;
    },
    get_$isHidden: function VizImpl$get_IsHidden() {
      return this.$iframe.style.display === 'none';
    },
    get_$parentElement: function VizImpl$get_ParentElement() {
      return this.$parameters.parentElement;
    },
    get_$url: function VizImpl$get_Url() {
      return this.$parameters.get_baseUrl();
    },
    get_$workbook: function VizImpl$get_Workbook() {
      return this.$workbookImpl.get_workbook();
    },
    get__workbookImpl: function VizImpl$get_WorkbookImpl() {
      return this.$workbookImpl;
    },
    get_$areAutomaticUpdatesPaused: function VizImpl$get_AreAutomaticUpdatesPaused() {
      return this.$areAutomaticUpdatesPaused;
    },
    get_$vizSize: function VizImpl$get_VizSize() {
      return this.$vizSize;
    },
    getCurrentUrlAsync: function VizImpl$GetCurrentUrlAsync() {
      var deferred = new tab._Deferred();
      var returnHandler = new (ss.makeGenericType(tab.CommandReturnHandler$1, [String]))('api.GetCurrentUrlCommand', 0, function (result) {
        deferred.resolve(result);
      }, function (remoteError, message) {
        deferred.reject(tab._TableauException.createInternalError(message));
      });
      this._sendCommand(String).call(this, null, returnHandler);
      return deferred.get_promise();
    },
    handleVizListening: function VizImpl$HandleVizListening() {
      this.$enableVisibleRectCommunication();
    },
    handleVizLoad: function VizImpl$HandleVizLoad() {
      if (ss.isNullOrUndefined(this.$vizSize)) {
        this.$setFrameSize(this.$initialAvailableSize.width + 'px', this.$initialAvailableSize.height + 'px');
        this.$show();
      }
      if (ss.isValue(this.$staticImage)) {
        this.$staticImage.style.display = 'none';
      }
      // instantiate/update the workbook associated with the viz
      if (ss.isNullOrUndefined(this.$workbookImpl)) {
        this.$workbookImpl = new $tab__WorkbookImpl(this, this.$messagingOptions, ss.mkdel(this, function () {
          this.$onWorkbookInteractive(null);
        }));
      } else if (!this.$initializingWorkbookImpl) {
        this.$workbookImpl._update(ss.mkdel(this, function () {
          this.$onWorkbookInteractive(null);
        }));
      }
      // Send the current scale factor, which initializes the scale factor communication
      this.sendScaleFactor('-1');
    },
    $calculateFrameSize: function VizImpl$CalculateFrameSize(availableSize) {
      var chromeHeight = this.$vizSize.chromeHeight;
      var sheetSize = this.$vizSize.sheetSize;
      var width = 0;
      var height = 0;
      // If it's an exact size, use it. The size of the container is disregarded.
      if (sheetSize.behavior === 'exactly') {
        width = sheetSize.maxSize.width;
        height = sheetSize.maxSize.height + chromeHeight;
      } else {
        var minWidth;
        var maxWidth;
        var minHeight;
        var maxHeight;
        switch (sheetSize.behavior) {
          case 'range':
            {
              // The iframe should obey the range. As the size of the container changes,
              // the iframe changes size if it can remain within the range
              minWidth = sheetSize.minSize.width;
              maxWidth = sheetSize.maxSize.width;
              minHeight = sheetSize.minSize.height + chromeHeight;
              maxHeight = sheetSize.maxSize.height + chromeHeight;
              width = Math.max(minWidth, Math.min(maxWidth, availableSize.width));
              height = Math.max(minHeight, Math.min(maxHeight, availableSize.height));
              break;
            }
          case 'atleast':
            {
              // The iframe should be no smaller than the minimum. As the size of the container changes,
              // the iframe changes size if it can remain above the minimum size.
              minWidth = sheetSize.minSize.width;
              minHeight = sheetSize.minSize.height + chromeHeight;
              width = Math.max(minWidth, availableSize.width);
              height = Math.max(minHeight, availableSize.height);
              break;
            }
          case 'atmost':
            {
              // The iframe should be no larger than the maximum. As the size of the container changes,
              // the iframe changes size if it can remain below the maximum size
              maxWidth = sheetSize.maxSize.width;
              maxHeight = sheetSize.maxSize.height + chromeHeight;
              width = Math.min(maxWidth, availableSize.width);
              height = Math.min(maxHeight, availableSize.height);
              break;
            }
          case 'automatic':
            {
              // the iframe should fill the containing element
              width = availableSize.width;
              height = Math.max(availableSize.height, chromeHeight);
              break;
            }
          default:
            {
              // We should never get here. The given size behavior is not one we know about. That would be a bug
              throw tab._TableauException.createInternalError('Unknown SheetSizeBehavior for viz: ' + sheetSize.behavior.toString());
            }
        }
      }
      return tab.Size.$ctor(width, height);
    },
    $getNewFrameSize: function VizImpl$GetNewFrameSize() {
      var availableSize;
      // Use the initial available size once and set it to null so we don't use it again
      if (ss.isValue(this.$initialAvailableSize)) {
        availableSize = this.$initialAvailableSize;
        this.$initialAvailableSize = null;
      } else {
        availableSize = tab._Utility.computeContentSize(this.get_$parentElement());
      }
      // The user may change the availableSize values in this event
      this.$raiseVizResizeEvent(availableSize);
      return this.$calculateFrameSize(availableSize);
    },
    $refreshSize: function VizImpl$RefreshSize() {
      if (!ss.isValue(this.$vizSize)) {
        // we have nothing to do if we don't know the viz size yet. TFSID 381702
        return;
      }
      var frameSize = this.$getNewFrameSize();
      if (frameSize.height === this.$vizSize.chromeHeight) {
        // Chrome on Mac receives resize event before fully exiting from fullscreen mode
        // Causing viz to disappear since parent element still has height 0 (defect 570417)
        return;
      }
      this.$setFrameSize(frameSize.width + 'px', frameSize.height + 'px');
      // The act of changing the frame's size might change the available space. For example,
      // scroll bars appear when reducing the size of the window but disappear as soon when
      // the iframe is resized. We need to re-calculate until the size stabilizes. BUGZID:138377
      var resizeAttempts = 10;
      for (var i = 0; i < resizeAttempts; i++) {
        var newFrameSize = this.$getNewFrameSize();
        if (ss.referenceEquals(JSON.stringify(frameSize), JSON.stringify(newFrameSize))) {
          // Frame size is stabilized, so no need to re-calculate.
          return;
        }
        // The new frame size is different from the old frame size. Try again.
        frameSize = newFrameSize;
        this.$setFrameSize(frameSize.width + 'px', frameSize.height + 'px');
      }
      throw tab._TableauException.create('maxVizResizeAttempts', 'Viz resize limit hit. The calculated iframe size did not stabilize after ' + resizeAttempts + ' resizes.');
    },
    handleEventNotification: function VizImpl$HandleEventNotification(eventName, eventParameters) {
      var notification = tab._ApiServerNotification.deserialize(eventParameters);
      switch (eventName) {
        case 'api.FirstVizSizeKnownEvent':
          {
            this.$handleFirstVizSizeKnownEvent(notification);
            break;
          }
        case 'api.VizInteractiveEvent':
          {
            this.$handleVizInteractiveEvent(notification);
            break;
          }
        case 'api.MarksSelectionChangedEvent':
          {
            this.$handleMarksSelectionChangedEvent(notification);
            break;
          }
        case 'api.MarksHighlightChangedEvent':
          {
            this.$handleMarksHighlightChangedEvent(notification);
            break;
          }
        case 'api.FilterChangedEvent':
          {
            this.$handleFilterChangedEvent(notification);
            break;
          }
        case 'api.ParameterChangedEvent':
          {
            this.$handleParameterChangedEvent(notification);
            break;
          }
        case 'api.CustomViewsListLoadedEvent':
          {
            this.$handleCustomViewsListLoadedEvent(notification);
            break;
          }
        case 'api.CustomViewUpdatedEvent':
          {
            this.$handleCustomViewUpdatedEvent(notification);
            break;
          }
        case 'api.CustomViewRemovedEvent':
          {
            this.$handleCustomViewRemovedEvent();
            break;
          }
        case 'api.CustomViewSetDefaultEvent':
          {
            this.$handleCustomViewSetDefaultEvent(notification);
            break;
          }
        case 'api.TabSwitchEvent':
          {
            this.$handleTabSwitchEvent(notification);
            break;
          }
        case 'api.ToolbarStateChangedEvent':
          {
            this.$handleToolbarStateChangeEvent(notification);
            break;
          }
        case 'api.StorytellingStateChangedEvent':
          {
            this.$handleStorytellingStateChangedEvent(notification);
            break;
          }
        case 'api.UrlActionEvent':
          {
            this.$handleUrlActionEvent(notification);
            break;
          }
        case 'api.CustomMarkMenuEvent':
          {
            this.$handleCustomMarkContextMenuEvent(notification);
            break;
          }
      }
    },
    addEventListener: function VizImpl$AddEventListener(eventName, handler) {
      var normalizedEventName = {};
      if (!tab.PublicEnums.tryNormalizeEnum(tab.ApiTableauEventName).call(null, eventName, normalizedEventName)) {
        throw tab._TableauException.createUnsupportedEventName(eventName.toString());
      }
      switch (normalizedEventName.$) {
        case 'marksselection':
          {
            this.add_$marksSelection(ss.cast(handler, Function));
            break;
          }
        case 'markshighlight':
          {
            this.add_$marksHighlight(ss.cast(handler, Function));
            break;
          }
        case 'parametervaluechange':
          {
            this.add_$parameterValueChange(ss.cast(handler, Function));
            break;
          }
        case 'filterchange':
          {
            this.add_$filterChange(ss.cast(handler, Function));
            break;
          }
        case 'customviewload':
          {
            this.add_$customViewLoad(ss.cast(handler, Function));
            break;
          }
        case 'customviewsave':
          {
            this.add_$customViewSave(ss.cast(handler, Function));
            break;
          }
        case 'customviewremove':
          {
            this.add_$customViewRemove(ss.cast(handler, Function));
            break;
          }
        case 'customviewsetdefault':
          {
            this.add_$customViewSetDefault(ss.cast(handler, Function));
            break;
          }
        case 'tabswitch':
          {
            this.add_$tabSwitch(ss.cast(handler, Function));
            break;
          }
        case 'storypointswitch':
          {
            this.add_$storyPointSwitch(ss.cast(handler, Function));
            break;
          }
        case 'toolbarstatechange':
          {
            this.add_$toolbarStateChange(ss.cast(handler, Function));
            break;
          }
        case 'vizresize':
          {
            this.add_$vizResize(ss.cast(handler, Function));
            break;
          }
        case 'urlaction':
          {
            this.add_$urlAction(ss.cast(handler, Function));
            break;
          }
        case 'custommarkcontextmenu':
          {
            this.add_$customMarkContextMenu(ss.cast(handler, Function));
            break;
          }
      }
    },
    removeEventListener: function VizImpl$RemoveEventListener(eventName, handler) {
      var normalizedEventName = {};
      if (!tab.PublicEnums.tryNormalizeEnum(tab.ApiTableauEventName).call(null, eventName, normalizedEventName)) {
        throw tab._TableauException.createUnsupportedEventName(eventName.toString());
      }
      switch (normalizedEventName.$) {
        case 'marksselection':
          {
            this.remove_$marksSelection(ss.cast(handler, Function));
            break;
          }
        case 'markshighlight':
          {
            this.remove_$marksHighlight(ss.cast(handler, Function));
            break;
          }
        case 'parametervaluechange':
          {
            this.remove_$parameterValueChange(ss.cast(handler, Function));
            break;
          }
        case 'filterchange':
          {
            this.remove_$filterChange(ss.cast(handler, Function));
            break;
          }
        case 'customviewload':
          {
            this.remove_$customViewLoad(ss.cast(handler, Function));
            break;
          }
        case 'customviewsave':
          {
            this.remove_$customViewSave(ss.cast(handler, Function));
            break;
          }
        case 'customviewremove':
          {
            this.remove_$customViewRemove(ss.cast(handler, Function));
            break;
          }
        case 'customviewsetdefault':
          {
            this.remove_$customViewSetDefault(ss.cast(handler, Function));
            break;
          }
        case 'tabswitch':
          {
            this.remove_$tabSwitch(ss.cast(handler, Function));
            break;
          }
        case 'toolbarstatechange':
          {
            this.remove_$toolbarStateChange(ss.cast(handler, Function));
            break;
          }
        case 'storypointswitch':
          {
            this.remove_$storyPointSwitch(ss.cast(handler, Function));
            break;
          }
        case 'vizresize':
          {
            this.remove_$vizResize(ss.cast(handler, Function));
            break;
          }
        case 'urlaction':
          {
            this.remove_$urlAction(ss.cast(handler, Function));
            break;
          }
        case 'custommarkcontextmenu':
          {
            this.remove_$customMarkContextMenu(ss.cast(handler, Function));
            break;
          }
      }
    },
    $dispose: function VizImpl$Dispose() {
      // Remove the iframe
      if (ss.isValue(this.$iframe)) {
        this.$iframe.parentNode.removeChild(this.$iframe);
        this.$iframe = null;
      }
      $tab__VizManagerImpl.$unregisterViz(this.$viz);
      this.$messagingOptions.get_router().unregisterHandler(this);
      this.$removeWindowResizeHandler();
    },
    $show: function VizImpl$Show() {
      this.$iframe.style.display = 'block';
      this.$iframe.style.visibility = 'visible';
    },
    $hide: function VizImpl$Hide() {
      this.$iframe.style.display = 'none';
    },
    $makeInvisible: function VizImpl$MakeInvisible() {
      this.$iframe.style.visibility = 'hidden';
    },
    $showDownloadDialog: function VizImpl$ShowDownloadDialog() {
      this.$invokeCommand('showDownloadDialog');
    },
    $showExportImageDialog: function VizImpl$ShowExportImageDialog() {
      this.$invokeCommand('showExportImageDialog');
    },
    $showExportDataDialog: function VizImpl$ShowExportDataDialog(sheetOrInfoOrName) {
      var sheetName = this.$verifyOperationAllowedOnActiveSheetOrSheetWithinActiveDashboard(sheetOrInfoOrName);
      this.$invokeCommand('showExportDataDialog', sheetName);
    },
    $showExportCrossTabDialog: function VizImpl$ShowExportCrossTabDialog(sheetOrInfoOrName) {
      var sheetName = this.$verifyOperationAllowedOnActiveSheetOrSheetWithinActiveDashboard(sheetOrInfoOrName);
      this.$invokeCommand('showExportCrosstabDialog', sheetName);
    },
    $showExportPDFDialog: function VizImpl$ShowExportPDFDialog() {
      this.$invokeCommand('showExportPDFDialog');
    },
    $showExportPowerPointDialog: function VizImpl$ShowExportPowerPointDialog() {
      this.$invokeCommand('showExportPowerPointDialog');
    },
    $exportCrossTabToExcel: function VizImpl$ExportCrossTabToExcel(sheetOrInfoOrName) {
      var sheetName = this.$verifyOperationAllowedOnActiveSheetOrSheetWithinActiveDashboard(sheetOrInfoOrName);
      this.$invokeCommand('exportCrosstabToExcel', sheetName);
    },
    $revertAllAsync: function VizImpl$RevertAllAsync() {
      return tab._Utility.noResultPromiseHelper('api.RevertAllCommand', null, this.$messagingOptions);
    },
    $refreshDataAsync: function VizImpl$RefreshDataAsync() {
      return tab._Utility.noResultPromiseHelper('api.RefreshDataCommand', null, this.$messagingOptions);
    },
    $showShareDialog: function VizImpl$ShowShareDialog() {
      this.$invokeCommand('showShareDialog');
    },
    $showDownloadWorkbookDialog: function VizImpl$ShowDownloadWorkbookDialog() {
      if (this.get__workbookImpl().get_isDownloadAllowed()) {
        this.$invokeCommand('showDownloadWorkbookDialog');
      } else {
        throw tab._TableauException.create('downloadWorkbookNotAllowed', 'Download workbook is not allowed');
      }
    },
    $pauseAutomaticUpdatesAsync: function VizImpl$PauseAutomaticUpdatesAsync() {
      return this.$invokeAutomaticUpdatesCommandAsync('pauseAutomaticUpdates');
    },
    $resumeAutomaticUpdatesAsync: function VizImpl$ResumeAutomaticUpdatesAsync() {
      return this.$invokeAutomaticUpdatesCommandAsync('resumeAutomaticUpdates');
    },
    $toggleAutomaticUpdatesAsync: function VizImpl$ToggleAutomaticUpdatesAsync() {
      return this.$invokeAutomaticUpdatesCommandAsync('toggleAutomaticUpdates');
    },
    $setFrameSizeAndUpdate: function VizImpl$SetFrameSizeAndUpdate(width, height) {
      // availableSize is irrelevant in this case so send special size
      this.$raiseVizResizeEvent(tab.Size.$ctor(-1, -1));
      this.$setFrameSize(width, height);
      if (ss.isValue(this.$workbookImpl)) {
        this.$workbookImpl._updateActiveSheetAsync();
      }
    },
    $setAreAutomaticUpdatesPaused: function VizImpl$SetAreAutomaticUpdatesPaused(value) {
      this.$areAutomaticUpdatesPaused = value;
    },
    $contentRootElement: function VizImpl$ContentRootElement() {
      return this.$parameters.parentElement;
    },
    $create: function VizImpl$Create() {
      // Register first, so that we don't do work if we can't insert the viz
      try {
        $tab__VizManagerImpl.$registerViz(this.$viz);
      } catch ($t1) {
        var e = ss.Exception.wrap($t1);
        this.$dispose();
        throw e;
      }
      if (!this.$parameters.fixedSize) {
        this.$initialAvailableSize = tab._Utility.computeContentSize(this.get_$parentElement());
        // If the parent element does not have a set width and height, default to an available space
        // of 800 x 600
        if (this.$initialAvailableSize.width === 0 || this.$initialAvailableSize.height === 0) {
          this.$initialAvailableSize = tab.Size.$ctor(800, 600);
        }
        this.$iframe = this.$createIframe();
        // Keep the viz invisible until the size of the frame is set
        this.$makeInvisible();
        if (this.$parameters.displayStaticImage) {
          this.$staticImage = this.$createStaticImageElement(this.$initialAvailableSize.width + 'px', this.$initialAvailableSize.height + 'px');
          this.$staticImage.style.display = 'block';
        }
      } else {
        if (this.$parameters.displayStaticImage) {
          this.$staticImage = this.$createStaticImageElement(this.$parameters.width, this.$parameters.height);
          this.$staticImage.style.display = 'block';
        }
        this.$iframe = this.$createIframe();
        this.$show();
      }
      if (!tab._Utility.hasWindowPostMessage()) {
        // only use these methods if postMessage isn't available
        if (tab._Utility.isIE()) {
          this.$iframe['onreadystatechange'] = this.$getOnCheckForDoneDelegate();
        } else {
          this.$iframe.onload = this.$getOnCheckForDoneDelegate();
        }
      }
      this.$isToolbarHidden = !this.$parameters.toolbar;
      this.$areTabsHidden = !this.$parameters.tabs;
      this.$messagingOptions.get_router().registerHandler(this);
      this.$iframe.src = this.$parameters.get_url();
    },
    $sendVisibleRect: function VizImpl$SendVisibleRect() {
      // B397767: IE8: access to contentWindow can throw an exception
      try {
        if (!tab._Utility.hasWindowPostMessage() || ss.isNullOrUndefined(this.$iframe) || !ss.isValue(this.$iframe.contentWindow)) {
          return;
        }
      } catch ($t1) {
        return;
      }
      var visibleRect = tab._Utility.visibleContentRectInDocumentCoordinates(this.get_iframe());
      var iframeContentRect = tab._Utility.contentRectInDocumentCoordinates(this.get_iframe());
      // translate visible rect from this document's coordinates to the iframe's
      // document coordinates
      var command = new tab.NonApiCommand('layoutInfoResp', [(visibleRect.left - iframeContentRect.left).toString(), (visibleRect.top - iframeContentRect.top).toString(), visibleRect.width.toString(), visibleRect.height.toString()]);
      this.$iframe.contentWindow.postMessage(command.serialize(), '*');
    },
    $enableVisibleRectCommunication: function VizImpl$EnableVisibleRectCommunication() {
      if (!tab._Utility.hasWindowPostMessage() || ss.isNullOrUndefined(this.$iframe) || !ss.isValue(this.$iframe.contentWindow)) {
        return;
      }
      var command = new tab.NonApiCommand('tableau.enableVisibleRectCommunication', []);
      this.$iframe.contentWindow.postMessage(command.serialize(), '*');
    },
    $redoAsync: function VizImpl$RedoAsync() {
      return tab._Utility.noResultPromiseHelper('api.Redo', null, this.$messagingOptions);
    },
    $undoAsync: function VizImpl$UndoAsync() {
      return tab._Utility.noResultPromiseHelper('api.Undo', null, this.$messagingOptions);
    },
    sendScaleFactor: function VizImpl$SendScaleFactor(requestId) {
      var scaleFactor = document.documentElement.clientWidth / window.innerWidth;
      // These scroll values had meaningful values once upon a time, but were changed to always be 0 when they
      // were no longer needed. We still include them here to help maintain backwards compatibility, however.
      var scrollX = 0;
      var scrollY = 0;
      var command = new tab.NonApiCommand('sf', [requestId, scaleFactor.toString(), scrollX.toString(), scrollY.toString()]);
      if (ss.isValue(this.$iframe) && ss.isValue(this.$iframe.contentWindow)) {
        this.$iframe.contentWindow.postMessage(command.serialize(), '*');
      }
    },
    _sendCommand: function _sendCommand(T) {
      return function VizImpl$SendCommand(commandParameters, returnHandler) {
        this.$messagingOptions.sendCommand(T).call(this.$messagingOptions, commandParameters, returnHandler);
      };
    },
    $raiseParameterValueChange: function VizImpl$RaiseParameterValueChange(parameterName) {
      if (!ss.staticEquals(this.$1$ParameterValueChangeField, null)) {
        this.$1$ParameterValueChangeField(new $tab_ParameterEvent('parametervaluechange', this.$viz, parameterName));
      }
    },
    $raiseCustomViewLoad: function VizImpl$RaiseCustomViewLoad(customView) {
      // Get latest client info before firing event
      this.get__workbookImpl()._update(ss.mkdel(this, function () {
        if (!ss.staticEquals(this.$1$CustomViewLoadField, null)) {
          // customView is null for default view
          this.$1$CustomViewLoadField(new $tab_CustomViewEvent('customviewload', this.$viz, ss.isValue(customView) ? customView._impl : null));
        }
      }));
    },
    $raiseCustomViewSave: function VizImpl$RaiseCustomViewSave(customView) {
      // Get latest client info before firing event
      this.get__workbookImpl()._update(ss.mkdel(this, function () {
        if (!ss.staticEquals(this.$1$CustomViewSaveField, null)) {
          this.$1$CustomViewSaveField(new $tab_CustomViewEvent('customviewsave', this.$viz, customView._impl));
        }
      }));
    },
    $raiseCustomViewRemove: function VizImpl$RaiseCustomViewRemove(customView) {
      if (!ss.staticEquals(this.$1$CustomViewRemoveField, null)) {
        this.$1$CustomViewRemoveField(new $tab_CustomViewEvent('customviewremove', this.$viz, customView._impl));
      }
    },
    $raiseCustomViewSetDefault: function VizImpl$RaiseCustomViewSetDefault(customView) {
      if (!ss.staticEquals(this.$1$CustomViewSetDefaultField, null)) {
        this.$1$CustomViewSetDefaultField(new $tab_CustomViewEvent('customviewsetdefault', this.$viz, customView._impl));
      }
    },
    $raiseTabSwitch: function VizImpl$RaiseTabSwitch(oldSheetName, newSheetName) {
      if (!ss.staticEquals(this.$1$TabSwitchField, null)) {
        this.$1$TabSwitchField(new $tab_TabSwitchEvent('tabswitch', this.$viz, oldSheetName, newSheetName));
      }
    },
    raiseStoryPointSwitch: function VizImpl$RaiseStoryPointSwitch(oldStoryPointInfo, newStoryPoint) {
      if (!ss.staticEquals(this.$1$StoryPointSwitchField, null)) {
        this.$1$StoryPointSwitchField(new $tab_StoryPointSwitchEvent('storypointswitch', this.$viz, oldStoryPointInfo, newStoryPoint));
      }
    },
    $raiseStateReadyForQuery: function VizImpl$RaiseStateReadyForQuery() {
      if (!ss.staticEquals(this.$1$StateReadyForQueryField, null)) {
        this.$1$StateReadyForQueryField(this);
      }
    },
    $raiseCustomViewsListLoad: function VizImpl$RaiseCustomViewsListLoad() {
      if (!ss.staticEquals(this.$1$CustomViewsListLoadField, null)) {
        this.$1$CustomViewsListLoadField(this);
      }
    },
    $raiseVizResizeEvent: function VizImpl$RaiseVizResizeEvent(availableSize) {
      if (!ss.staticEquals(this.$1$VizResizeField, null)) {
        this.$1$VizResizeField(new $tab_VizResizeEvent('vizresize', this.$viz, availableSize));
      }
    },
    $raiseCustomMarkContextMenuEvent: function VizImpl$RaiseCustomMarkContextMenuEvent(notification) {
      if (!ss.staticEquals(this.$1$CustomMarkContextMenuField, null)) {
        var worksheetImpl = null;
        var activeSheetImpl = this.$workbookImpl.get_activeSheetImpl();
        // If the marks occurred on a sheet within the story
        if (activeSheetImpl.get_isStory()) {
          activeSheetImpl = ss.cast(activeSheetImpl, $tab__StoryImpl).get_activeStoryPointImpl().get_containedSheetImpl();
        }
        if (ss.referenceEquals(activeSheetImpl.get_name(), notification.get_worksheetName())) {
          worksheetImpl = ss.cast(activeSheetImpl, $tab__WorksheetImpl);
        } else if (activeSheetImpl.get_isDashboard()) {
          // If the marks occurred on a sheet inside of the dashboard.
          var dashboardImpl = ss.cast(activeSheetImpl, $tab__DashboardImpl);
          worksheetImpl = dashboardImpl.get_worksheets()._get(notification.get_worksheetName())._impl;
        }
        if (ss.isValue(worksheetImpl)) {
          worksheetImpl.set_selectedMarks(null);
          this.$1$CustomMarkContextMenuField(new $tab_CustomMarkContextMenuEvent('custommarkcontextmenu', this.$viz, notification.get_data().toString(), worksheetImpl));
        }
      }
    },
    $raiseUrlAction: function VizImpl$RaiseUrlAction(url, target) {
      if (!ss.staticEquals(this.$1$UrlActionField, null)) {
        this.$1$UrlActionField(new $tab_UrlActionEvent('urlaction', this.$viz, url, target));
      }
    },
    $setFrameSize: function VizImpl$SetFrameSize(width, height) {
      this.$parameters.width = width;
      this.$parameters.height = height;
      this.$iframe.style.width = this.$parameters.width;
      this.$iframe.style.height = this.$parameters.height;
    },
    $verifyOperationAllowedOnActiveSheetOrSheetWithinActiveDashboard: function VizImpl$VerifyOperationAllowedOnActiveSheetOrSheetWithinActiveDashboard(sheetOrInfoOrName) {
      // A missing parameter is fine - it signals working against the active
      // sheet or zone within a dashboard.
      if (ss.isNullOrUndefined(sheetOrInfoOrName)) {
        return null;
      }
      var sheetImpl = this.$workbookImpl.$findActiveSheetOrSheetWithinActiveDashboard(sheetOrInfoOrName);
      if (ss.isNullOrUndefined(sheetImpl)) {
        throw tab._TableauException.createNotActiveSheet();
      }
      return sheetImpl.get_name();
    },
    $invokeAutomaticUpdatesCommandAsync: function VizImpl$InvokeAutomaticUpdatesCommandAsync(command) {
      if (command !== 'pauseAutomaticUpdates' && command !== 'resumeAutomaticUpdates' && command !== 'toggleAutomaticUpdates') {
        throw tab._TableauException.createInternalError(null);
      }
      // prepare the parameter
      var param = {};
      param['api.invokeCommandName'] = command;
      // call cross domain
      var deferred = new tab._Deferred();
      var returnHandler = new (ss.makeGenericType(tab.CommandReturnHandler$1, [Object]))('api.InvokeCommandCommand', 0, ss.mkdel(this, function (result) {
        if (ss.isValue(result) && ss.isValue(result.isAutoUpdate)) {
          this.$areAutomaticUpdatesPaused = !result.isAutoUpdate;
        }
        deferred.resolve(this.$areAutomaticUpdatesPaused);
      }), function (remoteError, message) {
        deferred.reject(tab._TableauException.createServerError(message));
      });
      this._sendCommand(Object).call(this, param, returnHandler);
      return deferred.get_promise();
    },
    $invokeCommand: function VizImpl$InvokeCommand(command, sheetName) {
      if (command !== 'showDownloadDialog' && command !== 'showExportImageDialog' && command !== 'showExportDataDialog' && command !== 'showExportCrosstabDialog' && command !== 'showExportPDFDialog' && command !== 'showShareDialog' && command !== 'showExportPowerPointDialog' && command !== 'exportCrosstabToExcel' && command !== 'showDownloadWorkbookDialog') {
        throw tab._TableauException.createInternalError(null);
      }
      // prepare the parameter
      var param = {};
      param['api.invokeCommandName'] = command;
      if (ss.isValue(sheetName)) {
        param['api.invokeCommandParam'] = sheetName;
      }
      // call cross domain
      var returnHandler = new (ss.makeGenericType(tab.CommandReturnHandler$1, [Object]))('api.InvokeCommandCommand', 0, null, null);
      this._sendCommand(Object).call(this, param, returnHandler);
    },
    $handleFirstVizSizeKnownEvent: function VizImpl$HandleFirstVizSizeKnownEvent(notification) {
      var size = JSON.parse(ss.cast(notification.get_data(), String));
      this.$handleInitialVizSize(size);
    },
    $handleVizInteractiveEvent: function VizImpl$HandleVizInteractiveEvent(notification) {
      // let the programmer know viz is interactive
      if (ss.isValue(this.$workbookImpl) && ss.referenceEquals(this.$workbookImpl.get_name(), notification.get_workbookName())) {
        this.$onWorkbookInteractive(null);
      } else {
        // Raise the state ready change event so that deferred callbacks are called.
        // OnWorkbookInteractive calls this, so do this conditionally
        this.$raiseStateReadyForQuery();
      }
    },
    $handleMarksSelectionChangedEvent: function VizImpl$HandleMarksSelectionChangedEvent(notification) {
      // Don't raise an event if nobody is listening or if the workbook doesn't match.
      if (ss.staticEquals(this.$1$MarksSelectionField, null) || !ss.referenceEquals(this.$workbookImpl.get_name(), notification.get_workbookName())) {
        return;
      }
      var worksheetImpl = null;
      var activeSheetImpl = this.$workbookImpl.get_activeSheetImpl();
      // If the marks occurred on a sheet within the story, then we have to check the
      // contained sheet first.
      if (activeSheetImpl.get_isStory()) {
        activeSheetImpl = ss.cast(activeSheetImpl, $tab__StoryImpl).get_activeStoryPointImpl().get_containedSheetImpl();
      }
      // Are we lucky enough to have found the right sheet?
      if (ss.referenceEquals(activeSheetImpl.get_name(), notification.get_worksheetName())) {
        worksheetImpl = ss.cast(activeSheetImpl, $tab__WorksheetImpl);
      } else if (activeSheetImpl.get_isDashboard()) {
        // See if the sheet is inside of the dashboard.
        var dashboardImpl = ss.cast(activeSheetImpl, $tab__DashboardImpl);
        worksheetImpl = dashboardImpl.get_worksheets()._get(notification.get_worksheetName())._impl;
      }
      if (ss.isValue(worksheetImpl)) {
        worksheetImpl.set_selectedMarks(null);
        this.$1$MarksSelectionField(new $tab_MarksEvent('marksselection', this.$viz, worksheetImpl));
      }
    },
    $handleMarksHighlightChangedEvent: function VizImpl$HandleMarksHighlightChangedEvent(notification) {
      // Don't raise an event if nobody is listening or if the workbook doesn't match.
      if (ss.staticEquals(this.$1$MarksHighlightField, null) || !ss.referenceEquals(this.$workbookImpl.get_name(), notification.get_workbookName())) {
        return;
      }
      var worksheetImpl = null;
      var activeSheetImpl = this.$workbookImpl.get_activeSheetImpl();
      // If the marks occurred on a sheet within the story, then we have to check the
      // contained sheet first.
      if (activeSheetImpl.get_isStory()) {
        activeSheetImpl = ss.cast(activeSheetImpl, $tab__StoryImpl).get_activeStoryPointImpl().get_containedSheetImpl();
      }
      // Are we lucky enough to have found the right sheet?
      if (ss.referenceEquals(activeSheetImpl.get_name(), notification.get_worksheetName())) {
        worksheetImpl = ss.cast(activeSheetImpl, $tab__WorksheetImpl);
      } else if (activeSheetImpl.get_isDashboard()) {
        // See if the sheet is inside of the dashboard.
        var dashboardImpl = ss.cast(activeSheetImpl, $tab__DashboardImpl);
        worksheetImpl = dashboardImpl.get_worksheets()._get(notification.get_worksheetName())._impl;
      }
      if (ss.isValue(worksheetImpl)) {
        worksheetImpl.highlightedMarks = null;
        this.$1$MarksHighlightField(new $tab_HighlightEvent('markshighlight', this.$viz, worksheetImpl));
      }
    },
    $handleFilterChangedEvent: function VizImpl$HandleFilterChangedEvent(notification) {
      if (ss.staticEquals(this.$1$FilterChangeField, null) || !ss.referenceEquals(this.$workbookImpl.get_name(), notification.get_workbookName())) {
        return;
      }
      // let the programmer know filter changed
      var worksheetImpl = null;
      var activeSheetImpl = this.$workbookImpl.get_activeSheetImpl();
      if (ss.referenceEquals(activeSheetImpl.get_name(), notification.get_worksheetName())) {
        worksheetImpl = ss.cast(activeSheetImpl, $tab__WorksheetImpl);
      } else if (activeSheetImpl.get_isDashboard()) {
        // cannot find the sheet, see if it is a dashboard's worksheet
        var db = ss.cast(activeSheetImpl, $tab__DashboardImpl);
        worksheetImpl = db.get_worksheets()._get(notification.get_worksheetName())._impl;
      } else if (activeSheetImpl.get_isStory()) {
        var story = ss.cast(activeSheetImpl, $tab__StoryImpl);
        var activeStoryPoint = story.get_activeStoryPointImpl();
        var containedSheet = activeStoryPoint.get_containedSheetImpl();
        if (containedSheet.get_isDashboard()) {
          var db1 = ss.cast(containedSheet, $tab__DashboardImpl);
          worksheetImpl = db1.get_worksheets()._get(notification.get_worksheetName())._impl;
        } else if (ss.referenceEquals(containedSheet.get_name(), notification.get_worksheetName())) {
          worksheetImpl = ss.cast(containedSheet, $tab__WorksheetImpl);
        }
      }
      if (ss.isValue(worksheetImpl)) {
        var results = ss.cast(JSON.parse(ss.cast(notification.get_data(), String)), Array);
        var filterFieldName = results[0];
        var filterCaption = results[1];
        this.$1$FilterChangeField(new $tab_FilterEvent('filterchange', this.$viz, worksheetImpl, filterFieldName, filterCaption));
      }
    },
    $handleParameterChangedEvent: function VizImpl$HandleParameterChangedEvent(notification) {
      // let the programmer know state changed
      if (!ss.staticEquals(this.$1$ParameterValueChangeField, null)) {
        if (ss.referenceEquals(this.$workbookImpl.get_name(), notification.get_workbookName())) {
          this.$workbookImpl.set_$lastChangedParameterImpl(null);
          var parameterName = ss.cast(notification.get_data(), String);
          // param[2] is the parameter
          this.$raiseParameterValueChange(parameterName);
        }
      }
    },
    $handleCustomViewsListLoadedEvent: function VizImpl$HandleCustomViewsListLoadedEvent(notification) {
      var info = JSON.parse(ss.cast(notification.get_data(), String));
      var process = ss.mkdel(this, function () {
        $tab__CustomViewImpl._processCustomViews(this.$workbookImpl, this.$messagingOptions, info);
      });
      var raiseEvents = ss.mkdel(this, function () {
        // Raise the event so that the message router can call deferred
        // listeners. See the comments in CrossDomainMessageRouter for
        // details on why we have to do this.
        this.$raiseCustomViewsListLoad();
        // let the programmer know CustomView loaded
        // note: dict["customViewLoaded"]==false when viz is first loaded
        if (!ss.staticEquals(this.$1$CustomViewLoadField, null) && !info.customViewLoaded) {
          this.$raiseCustomViewLoad(this.$workbookImpl.get_activeCustomView());
        }
      });
      // Create the workbook if does not exist
      if (ss.isNullOrUndefined(this.$workbookImpl)) {
        this.$initializingWorkbookImpl = true;
        this.$workbookImpl = new $tab__WorkbookImpl(this, this.$messagingOptions, ss.mkdel(this, function () {
          // Order is important: process the custom views first,
          // then raise the workbook interactive event, then
          // raise the custom views events.
          process();
          this.$onWorkbookInteractive(raiseEvents);
          this.$initializingWorkbookImpl = false;
        }));
      } else {
        process();
        this.$ensureCalledAfterFirstInteractive(raiseEvents);
      }
    },
    $handleCustomViewUpdatedEvent: function VizImpl$HandleCustomViewUpdatedEvent(notification) {
      var info = JSON.parse(ss.cast(notification.get_data(), String));
      // Create the workbook if does not exist
      if (ss.isNullOrUndefined(this.$workbookImpl)) {
        this.$workbookImpl = new $tab__WorkbookImpl(this, this.$messagingOptions, null);
      }
      if (ss.isValue(this.$workbookImpl)) {
        $tab__CustomViewImpl._processCustomViewUpdate(this.$workbookImpl, this.$messagingOptions, info, true);
      }
      // let the programmer know CustomView loaded
      if (!ss.staticEquals(this.$1$CustomViewSaveField, null)) {
        var updated = this.$workbookImpl.get_$updatedCustomViews()._toApiCollection();
        for (var i = 0, len = updated.length; i < len; i++) {
          this.$raiseCustomViewSave(updated[i]);
        }
      }
    },
    $handleCustomViewRemovedEvent: function VizImpl$HandleCustomViewRemovedEvent() {
      // let the programmer know CustomView was removed
      if (!ss.staticEquals(this.$1$CustomViewRemoveField, null)) {
        var removed = this.$workbookImpl.get_$removedCustomViews()._toApiCollection();
        for (var i = 0, len = removed.length; i < len; i++) {
          this.$raiseCustomViewRemove(removed[i]);
        }
      }
    },
    $handleCustomViewSetDefaultEvent: function VizImpl$HandleCustomViewSetDefaultEvent(notification) {
      var info = JSON.parse(ss.cast(notification.get_data(), String));
      if (ss.isValue(this.$workbookImpl)) {
        $tab__CustomViewImpl._processCustomViews(this.$workbookImpl, this.$messagingOptions, info);
      }
      // let the programmer know CustomView set default
      if (!ss.staticEquals(this.$1$CustomViewSetDefaultField, null) && ss.isValue(info.defaultCustomViewId)) {
        var views = this.$workbookImpl.get_$customViews();
        for (var i = 0; i < views.get__length(); i++) {
          var view = views.get_item(i);
          if (view.getDefault()) {
            this.$raiseCustomViewSetDefault(view);
            break;
          }
        }
      }
    },
    $handleTabSwitchEvent: function VizImpl$HandleTabSwitchEvent(notification) {
      this.$workbookImpl._update(ss.mkdel(this, function () {
        if (ss.isValue(this.$workbookTabSwitchHandler)) {
          this.$workbookTabSwitchHandler();
        }
        // let the programmer know state changed
        if (ss.referenceEquals(this.$workbookImpl.get_name(), notification.get_workbookName())) {
          var oldSheetName = notification.get_worksheetName();
          // the old sheet name
          var currSheetName = ss.cast(notification.get_data(), String);
          // the curr sheet name
          this.$raiseTabSwitch(oldSheetName, currSheetName);
        }
        this.$onWorkbookInteractive(null);
      }));
    },
    $handleToolbarStateChangeEvent: function VizImpl$HandleToolbarStateChangeEvent(notification) {
      var toolbarStatePresModel = JSON.parse(ss.cast(notification.get_data(), String));
      var toolbarStateImpl = new $tab__ToolbarStateImpl(this, toolbarStatePresModel);
      if (!ss.staticEquals(this.$1$ToolbarStateChangeField, null)) {
        this.$1$ToolbarStateChangeField(new $tab_ToolbarStateEvent('toolbarstatechange', this.$viz, toolbarStateImpl));
      }
    },
    $handleStorytellingStateChangedEvent: function VizImpl$HandleStorytellingStateChangedEvent(notification) {
      var storyImpl = ss.cast(this.$workbookImpl.get_activeSheetImpl(), $tab__StoryImpl);
      if (storyImpl.get_sheetType() === 'story') {
        storyImpl.update(JSON.parse(ss.cast(notification.get_data(), String)));
      }
    },
    $handleUrlActionEvent: function VizImpl$HandleUrlActionEvent(notification) {
      if (!ss.staticEquals(this.$1$UrlActionField, null)) {
        // url and target correspond to the first two arguments passed into function window.open().
        var pm = JSON.parse(ss.cast(notification.get_data(), String));
        this.$raiseUrlAction(pm.url, pm.target);
      }
    },
    $handleCustomMarkContextMenuEvent: function VizImpl$HandleCustomMarkContextMenuEvent(notification) {
      this.$raiseCustomMarkContextMenuEvent(notification);
    },
    $onWorkbookInteractive: function VizImpl$OnWorkbookInteractive(actionAfterFirstInteractive) {
      // let the subscriber know the viz is ready
      if (!this.$onFirstInteractiveAlreadyCalled) {
        // Invoke the callback on a timer so that we unwind the stack properly.
        var callback = this.$onFirstInteractiveCallback;
        window.setTimeout(ss.mkdel(this, function () {
          // don't call again
          if (this.$onFirstInteractiveAlreadyCalled) {
            return;
          }
          if (!ss.staticEquals(callback, null)) {
            callback(new $tab_TableauEvent('firstinteractive', this.$viz));
          }
          if (!ss.staticEquals(actionAfterFirstInteractive, null)) {
            actionAfterFirstInteractive();
          }
          // We only need to call onFistInteractive once.
          this.$onFirstInteractiveAlreadyCalled = true;
        }), 0);
      }
      // Raise the state ready change event so that deferred callbacks are called.
      this.$raiseStateReadyForQuery();
    },
    $ensureCalledAfterFirstInteractive: function VizImpl$EnsureCalledAfterFirstInteractive(action) {
      var start = new Date();
      var poll = null;
      poll = ss.mkdel(this, function () {
        var now = new Date();
        // Call the action if we're ready, time out if we've waited too
        // long, or try again in a few milliseconds.
        if (this.$onFirstInteractiveAlreadyCalled) {
          action();
        } else if (now - start > 5 * 60 * 1000) {
          throw tab._TableauException.createInternalError('Timed out while waiting for the viz to become interactive');
        } else {
          window.setTimeout(poll, 10);
        }
      });
      poll();
    },
    $checkForDone: function VizImpl$CheckForDone() {
      if (tab._Utility.isIE()) {
        if (this.$iframe['readyState'] === 'complete') {
          this.handleVizLoad();
        }
      } else {
        this.handleVizLoad();
      }
    },
    $onCheckForDone: function VizImpl$OnCheckForDone() {
      window.setTimeout(ss.mkdel(this, this.$checkForDone), 3000);
    },
    $createStaticImageElement: function VizImpl$CreateStaticImageElement(width, height) {
      //<div class="wcStaticImage" id="staticImage" style="background-color:transparent;
      // background: no-repeat url('<e:html value='${staticImageHtml}'/>');
      // left: 8px; top:${showTabs ? 31 : 9}px; width:auto; height:auto;">
      //</div>
      var $t1 = document.createElement('div');
      var img = ss.cast($t1, ss.isValue($t1) && ss.isInstanceOfType($t1, Element) && $t1.tagName === 'DIV');
      img.style.background = "transparent url('" + this.$parameters.staticImageUrl + "') no-repeat scroll 0 0";
      img.style.left = '8px';
      img.style.top = this.$parameters.tabs ? '31px' : '9px';
      img.style.position = 'absolute';
      img.style.width = width;
      img.style.height = height;
      this.$contentRootElement().appendChild(img);
      return img;
    },
    $createIframe: function VizImpl$CreateIframe() {
      if (ss.isNullOrUndefined(this.$contentRootElement())) {
        return null;
      }
      var $t1 = document.createElement('IFrame');
      var ifr = ss.cast($t1, ss.isValue($t1) && ss.isInstanceOfType($t1, window.Element) && $t1.tagName === 'IFRAME');
      ifr.frameBorder = '0';
      ifr.setAttribute('allowTransparency', 'true');
      ifr.setAttribute('allowFullScreen', 'true');
      ifr.setAttribute('title', this.$getLocalizedTitle());
      ifr.marginHeight = '0';
      ifr.marginWidth = '0';
      ifr.style.display = 'block';
      if (this.$parameters.fixedSize) {
        ifr.style.width = this.$parameters.width;
        ifr.style.height = this.$parameters.height;
        ifr.setAttribute('scrolling', 'no');
      } else {
        // 1px by 1px since we don't know what size to be until the viz tells use
        ifr.style.width = '1px';
        ifr.style.height = '1px';
        // Scrollbars can appear on window resize, and this causes the viz to be sized
        // one-scrollbar-width/height too small, so disable them. Scrollbars aren't
        // needed for non-fixed-size vizs anyway since the iframe is sized
        // exactly how the viz wants it to be sized.
        ifr.setAttribute('scrolling', 'no');
      }
      // B89134 add no-op mousewheel handler to iframe so that Safari 6.1.1+ will send mousewheel
      // events to content nested in overflow:hidden containers within the iframe
      if (tab._Utility.isSafari()) {
        ifr.addEventListener('mousewheel', ss.mkdel(this, this.$onIframeMouseWheel), false);
      }
      // add the iframe as a child of the placeholder div
      this.$contentRootElement().appendChild(ifr);
      return ifr;
    },
    $getLocalizedTitle: function VizImpl$GetLocalizedTitle() {
      var lang;
      if (ss.isValue(window.navigator.language)) {
        lang = window.navigator.language;
      } else if (ss.isValue(window.navigator['userLanguage'])) {
        lang = window.navigator['userLanguage'];
      } else if (ss.isValue(window.navigator['browserLanguage'])) {
        lang = window.navigator['browserLanguage'];
      } else {
        lang = 'en-US';
      }
      // localized strings copied over from Strings.AccessibilityDataVisualizationTitleAttr
      if (lang === 'zh-CN') {
        return 'æ•°æ®å¯è§†åŒ–';
      } else if (lang === 'zh-TW') {
        return 'è³‡æ–™å¯è¦–åŒ–';
      } else if (lang === 'en-GB') {
        return 'Data Visualisation';
      }
      switch (lang.substr(0, 2)) {
        case 'fr':
          {
            return 'Visualisation de donnÃ©es';
          }
        case 'es':
          {
            return 'VisualizaciÃ³n de datos';
          }
        case 'it':
          {
            return 'Visualizzazione dati';
          }
        case 'pt':
          {
            return 'VisualizaÃ§Ã£o de dados';
          }
        case 'ja':
          {
            return 'ãƒ‡ãƒ¼ã‚¿ ãƒ“ã‚¸ãƒ¥ã‚¢ãƒ©ã‚¤ã‚¼ãƒ¼ã‚·ãƒ§ãƒ³';
          }
        case 'de':
          {
            return 'Datenvisualisierung';
          }
        case 'ko':
          {
            return 'ë°ì´í„° ë¹„ì£¼ì–¼ë¦¬ì œì´ì…˜';
          }
        case 'en':
        default:
          {
            return 'Data Visualization';
          }
      }
    },
    $onIframeMouseWheel: function VizImpl$OnIframeMouseWheel(e) {
      // no-op
    },
    $getOnCheckForDoneDelegate: function VizImpl$GetOnCheckForDoneDelegate() {
      return ss.mkdel(this, function (e) {
        this.$onCheckForDone();
      });
    },
    $handleInitialVizSize: function VizImpl$HandleInitialVizSize(vizAndChromeSize) {
      var sheetSize = tab.SheetSizeFactory.fromSizeConstraints(vizAndChromeSize.sizeConstraints);
      this.$vizSize = $tab_VizSize.$ctor(sheetSize, vizAndChromeSize.chromeHeight);
      if (ss.isValue(this.$onFirstVizSizeKnownCallback)) {
        this.$onFirstVizSizeKnownCallback(new $tab_FirstVizSizeKnownEvent('firstvizsizeknown', this.$viz, this.$vizSize));
      }
      if (this.$parameters.fixedSize) {
        return;
      }
      this.$refreshSize();
      this.$addWindowResizeHandler();
      this.$show();
    },
    $removeWindowResizeHandler: function VizImpl$RemoveWindowResizeHandler() {
      if (ss.isNullOrUndefined(this.$windowResizeHandler)) {
        return;
      }
      if (tab._Utility.hasWindowAddEventListener()) {
        window.removeEventListener('resize', this.$windowResizeHandler, false);
      } else {
        window.self.detachEvent('onresize', this.$windowResizeHandler);
      }
      this.$windowResizeHandler = null;
    },
    $addWindowResizeHandler: function VizImpl$AddWindowResizeHandler() {
      if (ss.isValue(this.$windowResizeHandler)) {
        return;
      }
      this.$windowResizeHandler = ss.mkdel(this, function () {
        this.$refreshSize();
      });
      if (tab._Utility.hasWindowAddEventListener()) {
        window.addEventListener('resize', this.$windowResizeHandler, false);
      } else {
        window.self.attachEvent('onresize', this.$windowResizeHandler);
      }
    }
  });
  ////////////////////////////////////////////////////////////////////////////////
  // tableauSoftware.VizResizeEvent
  var $tab_VizResizeEvent = global.tab.VizResizeEvent = ss.mkType($asm, 'tab.VizResizeEvent', function (eventName, viz, availableSize) {
    this.$availableSize = null;
    $tab_TableauEvent.call(this, eventName, viz);
    this.$availableSize = availableSize;
  }, {
    getAvailableSize: function VizResizeEvent$GetAvailableSize() {
      return this.$availableSize;
    }
  });
  ////////////////////////////////////////////////////////////////////////////////
  // tableauSoftware.VizSize
  var $tab_VizSize = global.tab.VizSize = ss.mkType($asm, 'tab.VizSize', null, null, {
    $ctor: function $ctor(sheetSize, chromeHeight) {
      var $this = new Object();
      $this.sheetSize = null;
      $this.chromeHeight = 0;
      $this.sheetSize = sheetSize;
      $this.chromeHeight = chromeHeight;
      return $this;
    },
    isInstanceOfType: function isInstanceOfType() {
      return true;
    }
  });
  ////////////////////////////////////////////////////////////////////////////////
  // tableauSoftware.WorksheetEvent
  var $tab_WorksheetEvent = global.tab.WorksheetEvent = ss.mkType($asm, 'tab.WorksheetEvent', function (eventName, viz, worksheetImpl) {
    this.$worksheetImpl = null;
    $tab_TableauEvent.call(this, eventName, viz);
    this.$worksheetImpl = worksheetImpl;
  }, {
    getWorksheet: function WorksheetEvent$GetWorksheet() {
      return this.$worksheetImpl.get_worksheet();
    }
  });
  ////////////////////////////////////////////////////////////////////////////////
  // tableauSoftware.CategoricalFilter
  var $tableauSoftware_CategoricalFilter = global.tableauSoftware.CategoricalFilter = ss.mkType($asm, 'tableauSoftware.CategoricalFilter', function (worksheetImpl, pm) {
    this.$isExclude = false;
    this.$isAllSelected = false;
    this.$appliedValues = null;
    $tableauSoftware_Filter.call(this, worksheetImpl, pm);
    this.$initializeFromJson$1(pm);
  }, {
    getIsExcludeMode: function CategoricalFilter$GetIsExcludeMode() {
      return this.$isExclude;
    },
    getIsAllSelected: function CategoricalFilter$GetIsAllSelected() {
      return this.$isAllSelected;
    },
    getAppliedValues: function CategoricalFilter$GetAppliedValues() {
      return this.$appliedValues;
    },
    _updateFromJson: function CategoricalFilter$UpdateFromJson(pm) {
      this.$initializeFromJson$1(pm);
    },
    $initializeFromJson$1: function CategoricalFilter$InitializeFromJson(pm) {
      this.$isExclude = pm.isExclude;
      this.$isAllSelected = pm.isAllSelected;
      if (ss.isValue(pm.appliedValues)) {
        this.$appliedValues = [];
        for (var $t1 = 0; $t1 < pm.appliedValues.length; $t1++) {
          var v = pm.appliedValues[$t1];
          this.$appliedValues.push(tab._Utility.getDataValue(v));
        }
      }
    }
  });
  ////////////////////////////////////////////////////////////////////////////////
  // tableauSoftware.CustomView
  var $tableauSoftware_CustomView = global.tableauSoftware.CustomView = ss.mkType($asm, 'tableauSoftware.CustomView', function (customViewImpl) {
    this._impl = null;
    this._impl = customViewImpl;
  }, {
    getWorkbook: function CustomView$GetWorkbook() {
      return this._impl.get_$workbook();
    },
    getUrl: function CustomView$GetUrl() {
      return this._impl.get_$url();
    },
    getName: function CustomView$GetName() {
      return this._impl.get_$name();
    },
    setName: function CustomView$SetName(value) {
      this._impl.set_$name(value);
    },
    getOwnerName: function CustomView$GetOwnerName() {
      return this._impl.get_$ownerName();
    },
    getAdvertised: function CustomView$GetAdvertised() {
      return this._impl.get_$advertised();
    },
    setAdvertised: function CustomView$SetAdvertised(value) {
      this._impl.set_$advertised(value);
    },
    getDefault: function CustomView$GetDefault() {
      return this._impl.get_$isDefault();
    },
    saveAsync: function CustomView$SaveAsync() {
      return this._impl.saveAsync();
    }
  });
  ////////////////////////////////////////////////////////////////////////////////
  // tableauSoftware.Dashboard
  var $tableauSoftware_Dashboard = global.tableauSoftware.Dashboard = ss.mkType($asm, 'tableauSoftware.Dashboard', function (dashboardImpl) {
    this._impl = null;
    $tableauSoftware_Sheet.call(this, dashboardImpl);
  }, {
    getParentStoryPoint: function Dashboard$GetParentStoryPoint() {
      return this._impl.get_parentStoryPoint();
    },
    getObjects: function Dashboard$GetObjects() {
      return this._impl.get_objects()._toApiCollection();
    },
    getWorksheets: function Dashboard$GetWorksheets() {
      return this._impl.get_worksheets()._toApiCollection();
    },
    getFiltersAsync: function Dashboard$GetFiltersAsync() {
      return this._impl.$getFiltersAsync();
    },
    applyFilterAsync: function Dashboard$ApplyFilterAsync(fieldName, values, updateType, options) {
      return this._impl.$applyFilterAsync(fieldName, values, updateType, options);
    }
  });
  ////////////////////////////////////////////////////////////////////////////////
  // tableauSoftware.DashboardObject
  var $tableauSoftware_DashboardObject = global.tableauSoftware.DashboardObject = ss.mkType($asm, 'tableauSoftware.DashboardObject', function (frameInfo, dashboard, worksheet) {
    this.$zoneInfo = null;
    this.$dashboard = null;
    this.$worksheet = null;
    if (frameInfo.objectType === 'worksheet' && ss.isNullOrUndefined(worksheet)) {
      throw tab._TableauException.createInternalError('worksheet parameter is required for WORKSHEET objects');
    } else if (frameInfo.objectType !== 'worksheet' && ss.isValue(worksheet)) {
      throw tab._TableauException.createInternalError('worksheet parameter should be undefined for non-WORKSHEET objects');
    }
    this.$zoneInfo = frameInfo;
    this.$dashboard = dashboard;
    this.$worksheet = worksheet;
  }, {
    getObjectType: function DashboardObject$GetObjectType() {
      return this.$zoneInfo.objectType;
    },
    getDashboard: function DashboardObject$GetDashboard() {
      return this.$dashboard;
    },
    getWorksheet: function DashboardObject$GetWorksheet() {
      return this.$worksheet;
    },
    getPosition: function DashboardObject$GetPosition() {
      return this.$zoneInfo.position;
    },
    getSize: function DashboardObject$GetSize() {
      return this.$zoneInfo.size;
    }
  });
  ////////////////////////////////////////////////////////////////////////////////
  // tableauSoftware.DataSource
  var $tableauSoftware_DataSource = global.tableauSoftware.DataSource = ss.mkType($asm, 'tableauSoftware.DataSource', function (impl) {
    this.$impl = null;
    this.$impl = impl;
  }, {
    getName: function DataSource$GetName() {
      return this.$impl.get_name();
    },
    getFields: function DataSource$GetFields() {
      return this.$impl.get_fields()._toApiCollection();
    },
    getIsPrimary: function DataSource$GetIsPrimary() {
      return this.$impl.get_isPrimary();
    }
  });
  ////////////////////////////////////////////////////////////////////////////////
  // tableauSoftware.Field
  var $tableauSoftware_Field = global.tableauSoftware.Field = ss.mkType($asm, 'tableauSoftware.Field', function (dataSource, name, fieldRoleType, fieldAggrType) {
    this.$dataSource = null;
    this.$name = null;
    this.$fieldRoleType = null;
    this.$fieldAggrType = null;
    this.$dataSource = dataSource;
    this.$name = name;
    this.$fieldRoleType = fieldRoleType;
    this.$fieldAggrType = fieldAggrType;
  }, {
    getDataSource: function Field$GetDataSource() {
      return this.$dataSource;
    },
    getName: function Field$GetName() {
      return this.$name;
    },
    getRole: function Field$GetRole() {
      return this.$fieldRoleType;
    },
    getAggregation: function Field$GetAggregation() {
      return this.$fieldAggrType;
    }
  });
  ////////////////////////////////////////////////////////////////////////////////
  // tableauSoftware.Filter
  var $tableauSoftware_Filter = global.tableauSoftware.Filter = ss.mkType($asm, 'tableauSoftware.Filter', function (worksheetImpl, pm) {
    this.$worksheetImpl = null;
    this.$type = null;
    this.$fieldCaption = null;
    this.$fieldName = null;
    this.$field = null;
    this.$dataSourceName = null;
    this.$fieldRole = null;
    this.$fieldAggregation = null;
    this.$worksheetImpl = worksheetImpl;
    this.$initializeFromJson(pm);
  }, {
    getFilterType: function Filter$GetFilterType() {
      return this.$type;
    },
    getFieldName: function Filter$GetFieldName() {
      return this.$fieldCaption;
    },
    getWorksheet: function Filter$GetWorksheet() {
      return this.$worksheetImpl.get_worksheet();
    },
    getFieldAsync: function Filter$GetFieldAsync() {
      var deferred = new tab._Deferred();
      // if field is not instantiated yet,
      // get the datasource of the field and then create the field
      if (ss.isNullOrUndefined(this.$field)) {
        var rejected = function rejected(e) {
          // pass along the exception
          deferred.reject(e);
          return null;
        };
        var fulfilled = ss.mkdel(this, function (value) {
          // instantiate the field object using the dataSource instance in 'value'
          this.$field = new $tableauSoftware_Field(value, this.$fieldCaption, this.$fieldRole, this.$fieldAggregation);
          deferred.resolve(this.$field);
          return null;
        });
        this.$worksheetImpl.$getDataSourceAsync(this.$dataSourceName).then(fulfilled, rejected);
      } else {
        // return the field via a timer thread
        window.setTimeout(ss.mkdel(this, function () {
          deferred.resolve(this.$field);
        }), 0);
      }
      return deferred.get_promise();
    },
    getAppliedWorksheetsAsync: function Filter$GetAppliedWorksheetsAsync() {
      return this.$worksheetImpl.$getAppliedWorksheetsAsync(this.getWorksheet().getName(), this.$fieldName);
    },
    setAppliedWorksheetsAsync: function Filter$SetAppliedWorksheetsAsync(applyToWorksheets) {
      return this.$worksheetImpl.$setAppliedWorksheetsAsync(applyToWorksheets, this.getWorksheet().getName(), this.$fieldName, this.$fieldCaption);
    },
    _update: function Filter$Update(pm) {
      this.$initializeFromJson(pm);
      this._updateFromJson(pm);
    },
    _addFieldParams: function Filter$AddFieldParams(param) {},
    _updateFromJson: null,
    $initializeFromJson: function Filter$InitializeFromJson(pm) {
      this.$fieldName = pm.fieldName;
      this.$fieldCaption = pm.caption;
      this.$type = tab.ApiEnumConverter.convertFilterType(pm.filterType);
      // extract the field details info for later use
      this.$field = null;
      this.$dataSourceName = pm.dataSourceName;
      this.$fieldRole = tab.ApiEnumConverter.convertFieldRole(ss.coalesce(pm.fieldRole, 'unknown'));
      this.$fieldAggregation = tab.ApiEnumConverter.convertFieldAggregation(ss.coalesce(pm.fieldAggregation, 'NONE'));
    }
  }, {
    $createFilter: function Filter$CreateFilter(worksheetImpl, pm) {
      switch (pm.filterType) {
        case 'categorical':
          {
            return new $tableauSoftware_CategoricalFilter(worksheetImpl, pm);
          }
        case 'relativedate':
          {
            return new $tableauSoftware_RelativeDateFilter(worksheetImpl, pm);
          }
        case 'hierarchical':
          {
            return new $tableauSoftware_HierarchicalFilter(worksheetImpl, pm);
          }
        case 'quantitative':
          {
            return new $tableauSoftware_QuantitativeFilter(worksheetImpl, pm);
          }
      }
      return null;
    },
    processFiltersList: function Filter$ProcessFiltersList(worksheetImpl, filtersListDict) {
      var filterCaptions = new tab._Collection();
      for (var $t1 = 0; $t1 < filtersListDict.filters.length; $t1++) {
        var filterPm = filtersListDict.filters[$t1];
        if (!filterCaptions._has(filterPm.caption)) {
          filterCaptions._add(filterPm.caption, filterPm.caption);
        }
      }
      var filters = new tab._Collection();
      for (var $t2 = 0; $t2 < filtersListDict.filters.length; $t2++) {
        var filterPm1 = filtersListDict.filters[$t2];
        var filter = $tableauSoftware_Filter.$createFilter(worksheetImpl, filterPm1);
        if (!filters._has(filterPm1.caption)) {
          filters._add(filterPm1.caption, filter);
          continue;
        }
        //if key already exists, append filter type
        var filterCollectionKey = filterPm1.caption.toString() + '_' + filterPm1.filterType.toString();
        //ensure that the user doesn't already have a field that matches the new field i.e. filter_Categorical
        var filterCollectionKeyNumbered = filterCollectionKey;
        var numberLabel = 1;
        while (filterCaptions._has(filterCollectionKeyNumbered)) {
          filterCollectionKeyNumbered = filterCollectionKey + '_' + numberLabel;
          numberLabel++;
        }
        filters._add(filterCollectionKeyNumbered, filter);
      }
      return filters;
    }
  });
  ////////////////////////////////////////////////////////////////////////////////
  // tableauSoftware.HierarchicalFilter
  var $tableauSoftware_HierarchicalFilter = global.tableauSoftware.HierarchicalFilter = ss.mkType($asm, 'tableauSoftware.HierarchicalFilter', function (worksheetImpl, pm) {
    this.$levels = 0;
    $tableauSoftware_Filter.call(this, worksheetImpl, pm);
    this.$initializeFromJson$1(pm);
  }, {
    _addFieldParams: function HierarchicalFilter$AddFieldParams(param) {
      param['api.filterHierarchicalLevels'] = this.$levels;
    },
    _updateFromJson: function HierarchicalFilter$UpdateFromJson(pm) {
      this.$initializeFromJson$1(pm);
    },
    $initializeFromJson$1: function HierarchicalFilter$InitializeFromJson(pm) {
      this.$levels = pm.levels;
    }
  });
  ////////////////////////////////////////////////////////////////////////////////
  // tableauSoftware.Parameter
  var $tableauSoftware_Parameter = global.tableauSoftware.Parameter = ss.mkType($asm, 'tableauSoftware.Parameter', function (impl) {
    this._impl = null;
    this._impl = impl;
  }, {
    getName: function Parameter$GetName() {
      return this._impl.get_$name();
    },
    getCurrentValue: function Parameter$GetCurrentValue() {
      return this._impl.get_$currentValue();
    },
    getDataType: function Parameter$GetDataType() {
      return this._impl.get_$dataType();
    },
    getAllowableValuesType: function Parameter$GetAllowableValuesType() {
      return this._impl.get_$allowableValuesType();
    },
    getAllowableValues: function Parameter$GetAllowableValues() {
      return this._impl.get_$allowableValues();
    },
    getMinValue: function Parameter$GetMinValue() {
      return this._impl.get_$minValue();
    },
    getMaxValue: function Parameter$GetMaxValue() {
      return this._impl.get_$maxValue();
    },
    getStepSize: function Parameter$GetStepSize() {
      return this._impl.get_$stepSize();
    },
    getDateStepPeriod: function Parameter$GetDateStepPeriod() {
      return this._impl.get_$dateStepPeriod();
    }
  });
  ////////////////////////////////////////////////////////////////////////////////
  // tableauSoftware.QuantitativeFilter
  var $tableauSoftware_QuantitativeFilter = global.tableauSoftware.QuantitativeFilter = ss.mkType($asm, 'tableauSoftware.QuantitativeFilter', function (worksheetImpl, pm) {
    this.$domainMin = null;
    this.$domainMax = null;
    this.$min = null;
    this.$max = null;
    this.$includeNullValues = false;
    $tableauSoftware_Filter.call(this, worksheetImpl, pm);
    this.$initializeFromJson$1(pm);
  }, {
    getMin: function QuantitativeFilter$GetMin() {
      return this.$min;
    },
    getMax: function QuantitativeFilter$GetMax() {
      return this.$max;
    },
    getIncludeNullValues: function QuantitativeFilter$GetIncludeNullValues() {
      return this.$includeNullValues;
    },
    getDomainMin: function QuantitativeFilter$GetDomainMin() {
      return this.$domainMin;
    },
    getDomainMax: function QuantitativeFilter$GetDomainMax() {
      return this.$domainMax;
    },
    _updateFromJson: function QuantitativeFilter$UpdateFromJson(pm) {
      this.$initializeFromJson$1(pm);
    },
    $initializeFromJson$1: function QuantitativeFilter$InitializeFromJson(pm) {
      this.$domainMin = tab._Utility.getDataValue(pm.domainMinValue);
      this.$domainMax = tab._Utility.getDataValue(pm.domainMaxValue);
      this.$min = tab._Utility.getDataValue(pm.minValue);
      this.$max = tab._Utility.getDataValue(pm.maxValue);
      this.$includeNullValues = pm.includeNullValues;
    }
  });
  ////////////////////////////////////////////////////////////////////////////////
  // tableauSoftware.RelativeDateFilter
  var $tableauSoftware_RelativeDateFilter = global.tableauSoftware.RelativeDateFilter = ss.mkType($asm, 'tableauSoftware.RelativeDateFilter', function (worksheetImpl, pm) {
    this.$periodType = null;
    this.$rangeType = null;
    this.$rangeN = 0;
    $tableauSoftware_Filter.call(this, worksheetImpl, pm);
    this.$initializeFromJson$1(pm);
  }, {
    getPeriod: function RelativeDateFilter$GetPeriod() {
      return this.$periodType;
    },
    getRange: function RelativeDateFilter$GetRange() {
      return this.$rangeType;
    },
    getRangeN: function RelativeDateFilter$GetRangeN() {
      return this.$rangeN;
    },
    _updateFromJson: function RelativeDateFilter$UpdateFromJson(pm) {
      this.$initializeFromJson$1(pm);
    },
    $initializeFromJson$1: function RelativeDateFilter$InitializeFromJson(pm) {
      if (ss.isValue(pm.periodType)) {
        this.$periodType = tab.ApiEnumConverter.convertPeriodType(ss.unbox(pm.periodType));
      }
      if (ss.isValue(pm.rangeType)) {
        this.$rangeType = tab.ApiEnumConverter.convertDateRange(ss.unbox(pm.rangeType));
      }
      if (ss.isValue(pm.rangeN)) {
        this.$rangeN = ss.unbox(pm.rangeN);
      }
    }
  });
  ////////////////////////////////////////////////////////////////////////////////
  // tableauSoftware.Sheet
  var $tableauSoftware_Sheet = global.tableauSoftware.Sheet = ss.mkType($asm, 'tableauSoftware.Sheet', function (sheetImpl) {
    this._impl = null;
    tab._Param.verifyValue(sheetImpl, 'sheetImpl');
    this._impl = sheetImpl;
  }, {
    getName: function Sheet$GetName() {
      return this._impl.get_name();
    },
    getIndex: function Sheet$GetIndex() {
      return this._impl.get_index();
    },
    getWorkbook: function Sheet$GetWorkbook() {
      return this._impl.get_workbookImpl().get_workbook();
    },
    getSize: function Sheet$GetSize() {
      return this._impl.get_size();
    },
    getIsHidden: function Sheet$GetIsHidden() {
      return this._impl.get_isHidden();
    },
    getIsActive: function Sheet$GetIsActive() {
      return this._impl.get_isActive();
    },
    getSheetType: function Sheet$GetSheetType() {
      return this._impl.get_sheetType();
    },
    getUrl: function Sheet$GetUrl() {
      return this._impl.get_url();
    },
    changeSizeAsync: function Sheet$ChangeSizeAsync(size) {
      return this._impl.changeSizeAsync(size);
    }
  });
  ////////////////////////////////////////////////////////////////////////////////
  // tableauSoftware.ApiSheetInfo
  var $tableauSoftware_SheetInfo = global.tableauSoftware.SheetInfo = ss.mkType($asm, 'tableauSoftware.SheetInfo', function (impl) {
    this.$impl = null;
    this.$impl = impl;
  }, {
    getName: function ApiSheetInfo$GetName() {
      return this.$impl.name;
    },
    getSheetType: function ApiSheetInfo$GetSheetType() {
      return this.$impl.sheetType;
    },
    getSize: function ApiSheetInfo$GetSize() {
      return this.$impl.size;
    },
    getIndex: function ApiSheetInfo$GetIndex() {
      return this.$impl.index;
    },
    getUrl: function ApiSheetInfo$GetUrl() {
      return this.$impl.url;
    },
    getIsActive: function ApiSheetInfo$GetIsActive() {
      return this.$impl.isActive;
    },
    getIsHidden: function ApiSheetInfo$GetIsHidden() {
      return this.$impl.isHidden;
    },
    getWorkbook: function ApiSheetInfo$GetWorkbook() {
      return this.$impl.workbook;
    }
  });
  ////////////////////////////////////////////////////////////////////////////////
  // tableauSoftware.Story
  var $tableauSoftware_Story = global.tableauSoftware.Story = ss.mkType($asm, 'tableauSoftware.Story', function (storyImpl) {
    this._impl = null;
    $tableauSoftware_Sheet.call(this, storyImpl);
  }, {
    getActiveStoryPoint: function Story$GetActiveStoryPoint() {
      return this._impl.get_activeStoryPointImpl().get_storyPoint();
    },
    getStoryPointsInfo: function Story$GetStoryPointsInfo() {
      return this._impl.get_storyPointsInfo();
    },
    activatePreviousStoryPointAsync: function Story$ActivatePreviousStoryPointAsync() {
      return this._impl.activatePreviousStoryPointAsync();
    },
    activateNextStoryPointAsync: function Story$ActivateNextStoryPointAsync() {
      return this._impl.activateNextStoryPointAsync();
    },
    activateStoryPointAsync: function Story$ActivateStoryPointAsync(index) {
      return this._impl.activateStoryPointAsync(index);
    },
    revertStoryPointAsync: function Story$RevertStoryPointAsync(index) {
      return this._impl.revertStoryPointAsync(index);
    }
  });
  ////////////////////////////////////////////////////////////////////////////////
  // tableauSoftware.StoryPoint
  var $tableauSoftware_StoryPoint = global.tableauSoftware.StoryPoint = ss.mkType($asm, 'tableauSoftware.StoryPoint', function (impl) {
    this.$impl = null;
    this.$impl = impl;
  }, {
    getCaption: function StoryPoint$GetCaption() {
      return this.$impl.get_caption();
    },
    getContainedSheet: function StoryPoint$GetContainedSheet() {
      return ss.isValue(this.$impl.get_containedSheetImpl()) ? this.$impl.get_containedSheetImpl().get_sheet() : null;
    },
    getIndex: function StoryPoint$GetIndex() {
      return this.$impl.get_index();
    },
    getIsActive: function StoryPoint$GetIsActive() {
      return this.$impl.get_isActive();
    },
    getIsUpdated: function StoryPoint$GetIsUpdated() {
      return this.$impl.get_isUpdated();
    },
    getParentStory: function StoryPoint$GetParentStory() {
      return this.$impl.get_parentStoryImpl().get_story();
    }
  });
  ////////////////////////////////////////////////////////////////////////////////
  // tableauSoftware.StoryPointInfo
  var $tableauSoftware_StoryPointInfo = global.tableauSoftware.StoryPointInfo = ss.mkType($asm, 'tableauSoftware.StoryPointInfo', function (impl) {
    this._impl = null;
    this._impl = impl;
  }, {
    getCaption: function StoryPointInfo$GetCaption() {
      return this._impl.caption;
    },
    getIndex: function StoryPointInfo$GetIndex() {
      return this._impl.index;
    },
    getIsActive: function StoryPointInfo$GetIsActive() {
      return this._impl.isActive;
    },
    getIsUpdated: function StoryPointInfo$GetIsUpdated() {
      return this._impl.isUpdated;
    },
    getParentStory: function StoryPointInfo$GetParentStory() {
      return this._impl.parentStoryImpl.get_story();
    }
  });
  ////////////////////////////////////////////////////////////////////////////////
  // tableauSoftware.ToolbarState
  var $tableauSoftware_ToolbarState = global.tableauSoftware.ToolbarState = ss.mkType($asm, 'tableauSoftware.ToolbarState', function (toolbarStateImpl) {
    this._impl = null;
    this._impl = toolbarStateImpl;
  }, {
    getViz: function ToolbarState$GetViz() {
      return this._impl.get_viz();
    },
    isButtonEnabled: function ToolbarState$IsButtonEnabled(toolbarButtonName) {
      return this._impl.isButtonEnabled(toolbarButtonName);
    }
  });
  ////////////////////////////////////////////////////////////////////////////////
  // tableauSoftware.Version
  var $tableauSoftware_Version = global.tableauSoftware.Version = ss.mkType($asm, 'tableauSoftware.Version', function (major, minor, patch, metadata) {
    this.$major = 0;
    this.$minor = 0;
    this.$patch = 0;
    this.$metadata = null;
    this.$major = major;
    this.$minor = minor;
    this.$patch = patch;
    this.$metadata = ss.coalesce(metadata, null);
  }, {
    getMajor: function Version$GetMajor() {
      return this.$major;
    },
    getMinor: function Version$GetMinor() {
      return this.$minor;
    },
    getPatch: function Version$GetPatch() {
      return this.$patch;
    },
    getMetadata: function Version$GetMetadata() {
      return this.$metadata;
    },
    toString: function Version$ToString() {
      var version = this.$major + '.' + this.$minor + '.' + this.$patch;
      if (ss.isValue(this.$metadata) && this.$metadata.length > 0) {
        version += '-' + this.$metadata;
      }
      return version;
    }
  }, {
    getCurrent: function Version$GetCurrent() {
      return $tableauSoftware_Version.$currentVersion;
    }
  });
  ////////////////////////////////////////////////////////////////////////////////
  // tableauSoftware.Viz
  var $tableauSoftware_Viz = global.tableauSoftware.Viz = ss.mkType($asm, 'tableauSoftware.Viz', function (parentElement, url, options) {
    this._impl = null;
    var messageRouter = tab._ApiObjectRegistry.getApiMessageRouter();
    this._impl = new $tab_VizImpl(messageRouter, this, parentElement, url, options);
    this._impl.$create();
  }, {
    getAreTabsHidden: function Viz$GetAreTabsHidden() {
      return this._impl.get_$areTabsHidden();
    },
    getIsToolbarHidden: function Viz$GetIsToolbarHidden() {
      return this._impl.get_$isToolbarHidden();
    },
    getIsHidden: function Viz$GetIsHidden() {
      return this._impl.get_$isHidden();
    },
    getInstanceId: function Viz$GetInstanceId() {
      return this._impl.get_instanceId();
    },
    getParentElement: function Viz$GetParentElement() {
      return this._impl.get_$parentElement();
    },
    getUrl: function Viz$GetUrl() {
      return this._impl.get_$url();
    },
    getVizSize: function Viz$GetVizSize() {
      return this._impl.get_$vizSize();
    },
    getWorkbook: function Viz$GetWorkbook() {
      return this._impl.get_$workbook();
    },
    getAreAutomaticUpdatesPaused: function Viz$GetAreAutomaticUpdatesPaused() {
      return this._impl.get_$areAutomaticUpdatesPaused();
    },
    getCurrentUrlAsync: function Viz$GetCurrentUrlAsync() {
      return this._impl.getCurrentUrlAsync();
    },
    addEventListener: function Viz$AddEventListener(eventName, handler) {
      this._impl.addEventListener(eventName, handler);
    },
    removeEventListener: function Viz$RemoveEventListener(eventName, handler) {
      this._impl.removeEventListener(eventName, handler);
    },
    dispose: function Viz$Dispose() {
      this._impl.$dispose();
    },
    show: function Viz$Show() {
      this._impl.$show();
    },
    hide: function Viz$Hide() {
      this._impl.$hide();
    },
    showExportDataDialog: function Viz$ShowExportDataDialog(worksheetWithinDashboard) {
      this._impl.$showExportDataDialog(worksheetWithinDashboard);
    },
    showDownloadDialog: function Viz$ShowDownloadDialog() {
      this._impl.$showDownloadDialog();
    },
    showExportCrossTabDialog: function Viz$ShowExportCrossTabDialog(worksheetWithinDashboard) {
      this._impl.$showExportCrossTabDialog(worksheetWithinDashboard);
    },
    showExportImageDialog: function Viz$ShowExportImageDialog() {
      this._impl.$showExportImageDialog();
    },
    showExportPDFDialog: function Viz$ShowExportPDFDialog() {
      this._impl.$showExportPDFDialog();
    },
    showExportPowerPointDialog: function Viz$ShowExportPowerPointDialog() {
      this._impl.$showExportPowerPointDialog();
    },
    exportCrossTabToExcel: function Viz$ExportCrossTabToExcel(worksheetWithinDashboard) {
      this._impl.$exportCrossTabToExcel(worksheetWithinDashboard);
    },
    revertAllAsync: function Viz$RevertAllAsync() {
      return this._impl.$revertAllAsync();
    },
    refreshDataAsync: function Viz$RefreshDataAsync() {
      return this._impl.$refreshDataAsync();
    },
    showShareDialog: function Viz$ShowShareDialog() {
      this._impl.$showShareDialog();
    },
    showDownloadWorkbookDialog: function Viz$ShowDownloadWorkbookDialog() {
      this._impl.$showDownloadWorkbookDialog();
    },
    pauseAutomaticUpdatesAsync: function Viz$PauseAutomaticUpdatesAsync() {
      return this._impl.$pauseAutomaticUpdatesAsync();
    },
    resumeAutomaticUpdatesAsync: function Viz$ResumeAutomaticUpdatesAsync() {
      return this._impl.$resumeAutomaticUpdatesAsync();
    },
    toggleAutomaticUpdatesAsync: function Viz$ToggleAutomaticUpdatesAsync() {
      return this._impl.$toggleAutomaticUpdatesAsync();
    },
    refreshSize: function Viz$RefreshSize() {
      this._impl.$refreshSize();
    },
    setFrameSize: function Viz$SetFrameSize(width, height) {
      var widthString = width;
      var heightString = height;
      if (tab._Utility.isNumber(width)) {
        widthString = width.toString() + 'px';
      }
      if (tab._Utility.isNumber(height)) {
        heightString = height.toString() + 'px';
      }
      this._impl.$setFrameSizeAndUpdate(widthString, heightString);
    },
    redoAsync: function Viz$RedoAsync() {
      return this._impl.$redoAsync();
    },
    undoAsync: function Viz$UndoAsync() {
      return this._impl.$undoAsync();
    }
  }, {
    getLastRequestMessage: function Viz$GetLastRequestMessage() {
      return tab._ApiCommand.lastRequestMessage;
    },
    getLastResponseMessage: function Viz$GetLastResponseMessage() {
      return tab._ApiCommand.lastResponseMessage;
    },
    getLastClientInfoResponseMessage: function Viz$GetLastClientInfoResponseMessage() {
      return tab._ApiCommand.lastClientInfoResponseMessage;
    }
  });
  ////////////////////////////////////////////////////////////////////////////////
  // tableauSoftware.VizManager
  var $tableauSoftware_VizManager = global.tableauSoftware.VizManager = ss.mkType($asm, 'tableauSoftware.VizManager', null, null, {
    getVizs: function VizManager$GetVizs() {
      return $tab__VizManagerImpl.get_$clonedVizs();
    }
  });
  ////////////////////////////////////////////////////////////////////////////////
  // tableauSoftware.Workbook
  var $tableauSoftware_Workbook = global.tableauSoftware.Workbook = ss.mkType($asm, 'tableauSoftware.Workbook', function (workbookImpl) {
    this.$workbookImpl = null;
    this.$workbookImpl = workbookImpl;
  }, {
    getViz: function Workbook$GetViz() {
      return this.$workbookImpl.get_viz();
    },
    getPublishedSheetsInfo: function Workbook$GetPublishedSheetsInfo() {
      return this.$workbookImpl.get_publishedSheets()._toApiCollection();
    },
    getName: function Workbook$GetName() {
      return this.$workbookImpl.get_name();
    },
    getActiveSheet: function Workbook$GetActiveSheet() {
      return this.$workbookImpl.get_activeSheetImpl().get_sheet();
    },
    getActiveCustomView: function Workbook$GetActiveCustomView() {
      return this.$workbookImpl.get_activeCustomView();
    },
    activateSheetAsync: function Workbook$ActivateSheetAsync(sheetNameOrIndex) {
      return this.$workbookImpl._setActiveSheetAsync(sheetNameOrIndex);
    },
    revertAllAsync: function Workbook$RevertAllAsync() {
      return this.$workbookImpl._revertAllAsync();
    },
    getCustomViewsAsync: function Workbook$GetCustomViewsAsync() {
      return this.$workbookImpl.$getCustomViewsAsync();
    },
    showCustomViewAsync: function Workbook$ShowCustomViewAsync(customViewName) {
      return this.$workbookImpl.$showCustomViewAsync(customViewName);
    },
    removeCustomViewAsync: function Workbook$RemoveCustomViewAsync(customViewName) {
      return this.$workbookImpl.$removeCustomViewAsync(customViewName);
    },
    rememberCustomViewAsync: function Workbook$RememberCustomViewAsync(customViewName) {
      return this.$workbookImpl.$rememberCustomViewAsync(customViewName);
    },
    setActiveCustomViewAsDefaultAsync: function Workbook$SetActiveCustomViewAsDefaultAsync() {
      return this.$workbookImpl.$setActiveCustomViewAsDefaultAsync();
    },
    getParametersAsync: function Workbook$GetParametersAsync() {
      return this.$workbookImpl.$getParametersAsync();
    },
    changeParameterValueAsync: function Workbook$ChangeParameterValueAsync(parameterName, value) {
      return this.$workbookImpl.$changeParameterValueAsync(parameterName, value);
    }
  });
  ////////////////////////////////////////////////////////////////////////////////
  // tableauSoftware.Worksheet
  var $tableauSoftware_Worksheet = global.tableauSoftware.Worksheet = ss.mkType($asm, 'tableauSoftware.Worksheet', function (impl) {
    this._impl = null;
    $tableauSoftware_Sheet.call(this, impl);
  }, {
    getParentDashboard: function Worksheet$GetParentDashboard() {
      return this._impl.get_parentDashboard();
    },
    getParentStoryPoint: function Worksheet$GetParentStoryPoint() {
      return this._impl.get_parentStoryPoint();
    },
    getDataSourcesAsync: function Worksheet$GetDataSourcesAsync() {
      return this._impl.$getDataSourcesAsync();
    },
    getFilterAsync: function Worksheet$GetFilterAsync(fieldName, options) {
      // Remember that "fieldName" in the API is actually the caption.
      return this._impl.$getFilterAsync(null, fieldName, options);
    },
    getFiltersAsync: function Worksheet$GetFiltersAsync(options) {
      return this._impl.$getFiltersAsync(options);
    },
    applyFilterAsync: function Worksheet$ApplyFilterAsync(fieldName, values, updateType, options) {
      return this._impl.$applyFilterAsync(fieldName, values, updateType, options);
    },
    clearFilterAsync: function Worksheet$ClearFilterAsync(fieldName) {
      return this._impl.$clearFilterAsync(fieldName);
    },
    applyRangeFilterAsync: function Worksheet$ApplyRangeFilterAsync(fieldName, options) {
      return this._impl.$applyRangeFilterAsync(fieldName, options);
    },
    applyRelativeDateFilterAsync: function Worksheet$ApplyRelativeDateFilterAsync(fieldName, options) {
      return this._impl.$applyRelativeDateFilterAsync(fieldName, options);
    },
    applyHierarchicalFilterAsync: function Worksheet$ApplyHierarchicalFilterAsync(fieldName, values, updateType, options) {
      return this._impl.$applyHierarchicalFilterAsync(fieldName, values, updateType, options);
    },
    clearSelectedMarksAsync: function Worksheet$ClearSelectedMarksAsync() {
      return this._impl.$clearSelectedMarksAsync();
    },
    selectMarksAsync: function Worksheet$SelectMarksAsync(fieldNameOrFieldValuesMap, valueOrUpdateType, updateType) {
      return this._impl.$selectMarksAsync(fieldNameOrFieldValuesMap, valueOrUpdateType, updateType);
    },
    getSelectedMarksAsync: function Worksheet$GetSelectedMarksAsync() {
      return this._impl.$getSelectedMarksAsync();
    },
    getSummaryDataAsync: function Worksheet$GetSummaryDataAsync(options) {
      return this._impl.$getSummaryDataAsync(options);
    },
    getUnderlyingDataAsync: function Worksheet$GetUnderlyingDataAsync(options) {
      console.warn('Method getUnderlyingDataAsync is deprecated. Please use getUnderlyingTableDataAsync instead.');
      return this._impl.$getUnderlyingDataAsync(options);
    },
    getUnderlyingTablesAsync: function Worksheet$GetUnderlyingTablesAsync() {
      return this._impl.$getUnderlyingTablesAsync();
    },
    getUnderlyingTableDataAsync: function Worksheet$GetUnderlyingTableDataAsync(tableId, options) {
      return this._impl.$getUnderlyingTableDataAsync(tableId, options);
    },
    clearHighlightedMarksAsync: function Worksheet$ClearHighlightedMarksAsync() {
      return this._impl.$clearHighlightedMarksAsync();
    },
    highlightMarksAsync: function Worksheet$HighlightMarksAsync(fieldName, values) {
      return this._impl.$highlightMarksAsync(fieldName, values);
    },
    highlightMarksByPatternMatchAsync: function Worksheet$HighlightMarksByPatternMatchAsync(fieldName, patternMatch) {
      return this._impl.$highlightMarksByPatternMatchAsync(fieldName, patternMatch);
    },
    getHighlightedMarksAsync: function Worksheet$GetHighlightedMarksAsync() {
      return this._impl.$getHighlightedMarksAsync();
    },
    appendContextMenuAsync: function Worksheet$AppendContextMenuAsync(targetMenu, config) {
      return this._impl.$appendContextMenuAsync(this.getName(), targetMenu, config);
    },
    removeContextMenuAsync: function Worksheet$RemoveContextMenuAsync(targetMenu, menuItemId) {
      return this._impl.$removeContextMenuAsync(this.getName(), targetMenu, menuItemId);
    },
    executeContextMenuAsync: function Worksheet$ExecuteContextMenuAsync(targetMenu, menuItemId) {
      return this._impl.$executeContextMenuAsync(this.getName(), targetMenu, menuItemId);
    }
  });
  ss.initClass($tab__ApiBootstrap);
  ss.initClass($tab__CustomViewImpl);
  ss.initClass($tab__SheetImpl);
  ss.initClass($tab__DashboardImpl, $tab__SheetImpl);
  ss.initClass($tab__DataSourceImpl);
  ss.initClass($tab__SheetInfoImpl, Object);
  ss.initClass($tab__StoryImpl, $tab__SheetImpl);
  ss.initClass($tab__StoryPointImpl);
  ss.initClass($tab__StoryPointInfoImpl, Object);
  ss.initClass($tab__ToolbarStateImpl);
  ss.initClass($tab__VizManagerImpl);
  ss.initClass($tab__VizParameters);
  ss.initClass($tab__WorkbookImpl);
  ss.initClass($tab__WorksheetImpl, $tab__SheetImpl);
  ss.initClass($tab_EventContext);
  ss.initClass($tab_$CustomViewEventContext, $tab_EventContext);
  ss.initClass($tab_$DashboardZoneInfo);
  ss.initClass($tab_$FilterEventContext, $tab_EventContext);
  ss.initClass($tab_$HighlightEventContext, $tab_EventContext);
  ss.initClass($tab_$MarksEventContext, $tab_EventContext);
  ss.initClass($tab_$ParameterEventContext, $tab_EventContext);
  ss.initClass($tab_$ParameterImpl);
  ss.initClass($tab_TableauEvent);
  ss.initClass($tab_CustomMarkContextMenuEvent, $tab_TableauEvent);
  ss.initClass($tab_CustomViewEvent, $tab_TableauEvent);
  ss.initClass($tab_WorksheetEvent, $tab_TableauEvent);
  ss.initClass($tab_FilterEvent, $tab_WorksheetEvent);
  ss.initClass($tab_FirstVizSizeKnownEvent, $tab_TableauEvent);
  ss.initClass($tab_HighlightEvent, $tab_WorksheetEvent);
  ss.initInterface($tab_IJsApiMessageHandler, { add_customViewsListLoad: null, remove_customViewsListLoad: null, handleVizLoad: null, handleVizListening: null, sendScaleFactor: null });
  ss.initClass($tab_JsApiMessageRouter);
  ss.initClass($tab_JsApiMessagingOptions);
  ss.initClass($tab_MarksEvent, $tab_WorksheetEvent);
  ss.initClass($tab_ParameterEvent, $tab_TableauEvent);
  ss.initClass($tab_StoryPointInfoImplUtil);
  ss.initClass($tab_StoryPointSwitchEvent, $tab_TableauEvent);
  ss.initClass($tab_TabSwitchEvent, $tab_TableauEvent);
  ss.initClass($tab_ToolbarStateEvent, $tab_TableauEvent);
  ss.initClass($tab_UrlActionEvent, $tab_TableauEvent);
  ss.initClass($tab_VizImpl, null, [$tab_IJsApiMessageHandler]);
  ss.initClass($tab_VizResizeEvent, $tab_TableauEvent);
  ss.initClass($tab_VizSize, Object);
  ss.initClass($tableauSoftware_Filter);
  ss.initClass($tableauSoftware_CategoricalFilter, $tableauSoftware_Filter);
  ss.initClass($tableauSoftware_CustomView);
  ss.initClass($tableauSoftware_Sheet);
  ss.initClass($tableauSoftware_Dashboard, $tableauSoftware_Sheet);
  ss.initClass($tableauSoftware_DashboardObject);
  ss.initClass($tableauSoftware_DataSource);
  ss.initClass($tableauSoftware_Field);
  ss.initClass($tableauSoftware_HierarchicalFilter, $tableauSoftware_Filter);
  ss.initClass($tableauSoftware_Parameter);
  ss.initClass($tableauSoftware_QuantitativeFilter, $tableauSoftware_Filter);
  ss.initClass($tableauSoftware_RelativeDateFilter, $tableauSoftware_Filter);
  ss.initClass($tableauSoftware_SheetInfo);
  ss.initClass($tableauSoftware_Story, $tableauSoftware_Sheet);
  ss.initClass($tableauSoftware_StoryPoint);
  ss.initClass($tableauSoftware_StoryPointInfo);
  ss.initClass($tableauSoftware_ToolbarState);
  ss.initClass($tableauSoftware_Version);
  ss.initClass($tableauSoftware_Viz);
  ss.initClass($tableauSoftware_VizManager);
  ss.initClass($tableauSoftware_Workbook);
  ss.initClass($tableauSoftware_Worksheet, $tableauSoftware_Sheet);
  (function () {
    $tab__VizManagerImpl.$vizs = [];
  })();
  (function () {
    $tab__SheetImpl.noZoneId = 4294967295;
  })();
  (function () {
    $tab__WorksheetImpl.$regexHierarchicalFieldName = new RegExp('\\[[^\\]]+\\]\\.', 'g');
  })();
  (function () {
    $tableauSoftware_Version.$currentVersion = new $tableauSoftware_Version(2, 9, 1, 'null');
  })();
})();

window.tableau = window.tableauSoftware = global.tableauSoftware;
var tableauSoftware = global.tableauSoftware;
tableauSoftware.Promise = tab._PromiseImpl;
tab._Deferred = tab._DeferredImpl;
tab._Collection = tab._CollectionImpl;

tab._ApiBootstrap.initialize();

window.tableau._apiLoaded = true;

module.exports = tableauSoftware;