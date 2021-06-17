/**
 * Parse the time to string
 * @param {(Object|string|number)} time
 * @param {string} cFormat
 * @returns {string | null}
 */
export function parseTime(time: any, cFormat: any) {
  if (arguments.length === 0 || !time) {
    return null;
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}';
  let date;
  if (typeof time === 'object') {
    date = time;
  } else {
    if (typeof time === 'string') {
      if (/^[0-9]+$/.test(time)) {
        // support "1548221490638"
        time = parseInt(time);
      } else {
        time = time.replace(new RegExp(/-/gm), '/');
      }
    }

    if (typeof time === 'number' && time.toString().length === 10) {
      time = time * 1000;
    }
    date = new Date(time);
  }
  const formatObj: any = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  };
  const timeStr = format.replace(
    /{([ymdhisa])+}/g,
    (result: any, key: string) => {
      const value = formatObj[key];
      // Note: getDay() returns 0 on Sunday
      if (key === 'a') {
        return ['日', '一', '二', '三', '四', '五', '六'][value];
      }
      return value.toString().padStart(2, '0');
    }
  );
  return timeStr;
}

/**
 * @param {number} time
 * @param {string} option
 * @returns {string}
 */
export function formatTime(time: any, option: any) {
  if (('' + time).length === 10) {
    time = parseInt(time) * 1000;
  } else {
    time = +time;
  }
  const d: any = new Date(time);
  const now = Date.now();

  const diff = (now - d) / 1000;

  if (diff < 30) {
    return '刚刚';
  } else if (diff < 3600) {
    // less 1 hour
    return Math.ceil(diff / 60) + '分钟前';
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前';
  } else if (diff < 3600 * 24 * 2) {
    return '1天前';
  }
  if (option) {
    return parseTime(time, option);
  } else {
    return (
      d.getMonth() +
      1 +
      '月' +
      d.getDate() +
      '日' +
      d.getHours() +
      '时' +
      d.getMinutes() +
      '分'
    );
  }
}

/**
 * @param {string} url
 * @returns {Object}
 */
export function getQueryObject(url: string) {
  url = url == null ? window.location.href : url;
  const search = url.substring(url.lastIndexOf('?') + 1);
  const obj = Object.create(null);
  const reg = /([^?&=]+)=([^?&=]*)/g;
  search.replace(reg, (rs, $1, $2) => {
    const name: string = decodeURIComponent($1);
    let val = decodeURIComponent($2);
    val = String(val);
    obj[name] = val;
    return rs;
  });
  return obj;
}

/**
 * @param {string} input value
 * @returns {number} output value
 */
export function byteLength(str: string) {
  // returns the byte length of an utf8 string
  let s = str.length;
  for (let i = str.length - 1; i >= 0; i--) {
    const code = str.charCodeAt(i);
    if (code > 0x7f && code <= 0x7ff) s++;
    else if (code > 0x7ff && code <= 0xffff) s += 2;
    if (code >= 0xdc00 && code <= 0xdfff) i--;
  }
  return s;
}

// /**
//  * @param {Array} actual
//  * @returns {Array}
//  */
// export function cleanArray(actual: any) {
//   const newArray = [];
//   for (let i = 0; i < actual.length; i++) {
//     if (actual[i]) {
//       newArray.push(actual[i]);
//     }
//   }
//   return newArray;
// }

/**
//  * @param {Object} json
//  * @returns {Array}
//  */
// export function param(json: { [x: string]: string | number | boolean }) {
//   if (!json) return '';
//   return cleanArray(
//     Object.keys(json).map((key: string) => {
//       if (json[key] === undefined) return '';
//       return encodeURIComponent(key) + '=' + encodeURIComponent(json[key]);
//     })
//   ).join('&');
// }

/**
 * @param {string} url
 * @returns {Object}
 */
export function param2Obj(url: string) {
  const search = decodeURIComponent(url.split('?')[1]).replace(/\+/g, ' ');
  if (!search) {
    return {};
  }
  const obj = Object.create(null);
  const searchArr = search.split('&');
  searchArr.forEach(v => {
    const index = v.indexOf('=');
    if (index !== -1) {
      const name = v.substring(0, index).toString();
      const val = v.substring(index + 1, v.length);
      obj[name] = val;
    }
  });
  return obj;
}

/**
 * @param {string} val
 * @returns {string}
 */
export function html2Text(val: string) {
  const div = document.createElement('div');
  div.innerHTML = val;
  return div.textContent || div.innerText;
}

/**
 * 合并两个对象，使最后一个优先
 * @param {Object} target
 * @param {(Object|Array)} source
 * @returns {Object}
 */
export function objectMerge(
  target: { [x: string]: any },
  source: string | any[]
) {
  if (typeof target !== 'object') {
    target = {};
  }
  if (Array.isArray(source)) {
    return source.slice();
  }
  Object.keys(source).forEach((property: any) => {
    const sourceProperty = source[property];
    if (typeof sourceProperty === 'object') {
      target[property] = objectMerge(target[property], sourceProperty);
    } else {
      target[property] = sourceProperty;
    }
  });
  return target;
}

/**
 * @param {HTMLElement} element
 * @param {string} className
 */
export function toggleClass(
  element: { className: any },
  className: string | any[]
) {
  if (!element || !className) {
    return;
  }
  let classString = element.className;
  const nameIndex = classString.indexOf(className);
  if (nameIndex === -1) {
    classString += '' + className;
  } else {
    classString =
      classString.substr(0, nameIndex) +
      classString.substr(nameIndex + className.length);
  }
  element.className = classString;
}

/**
 * @param {string} type
 * @returns {Date}
 */
export function getTime(type: string) {
  if (type === 'start') {
    return new Date().getTime() - 3600 * 1000 * 24 * 90;
  } else {
    return new Date(new Date().toDateString());
  }
}

/**
 * @param {Function} func
 * @param {number} wait
 * @param {boolean} immediate
 * @return {*}
 */
// export function debounce<T>(func: { apply: (arg0: any, arg1: any[]) => any }, wait: number, immediate: any) {
//   let timeout: NodeJS.Timeout | null, args: any, context: null, timestamp: number, result: any

//   const later = function () {
//     // 据上一次触发时间间隔
//     const last = +new Date() - timestamp

//     // 上次被包装函数被调用时间间隔 last 小于设定时间间隔 wait
//     if (last < wait && last > 0) {
//       timeout = setTimeout(later, wait - last)
//     } else {
//       timeout = null
//       // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
//       if (!immediate) {
//         result = func.apply(context, args)
//         if (!timeout) context = args = null
//       }
//     }
//   }

//   return (...args: []) => {
//     context =  this
//     timestamp = +new Date()
//     const callNow = immediate && !timeout
//     // 如果延时不存在，重新设定延时
//     if (!timeout) timeout = setTimeout(later, wait)
//     if (callNow) {
//       result = func.apply(context, args)
//       context = args
//     }
//     return result
//   }
// }

/**
 * 简单的深度复制
 * @param {Object} source
 * @returns {Object}
 */
export function deepClone(source: { [x: string]: any; constructor?: any }) {
  if (!source && typeof source !== 'object') {
    throw new Error('error arguments deepClone');
  }
  const targetObj = source.constructor === Array ? [] : {};
  Object.keys(source).forEach(keys => {
    if (source[keys] && typeof source[keys] === 'object') {
      targetObj[keys] = deepClone(source[keys]);
    } else {
      targetObj[keys] = source[keys];
    }
  });
  return targetObj;
}

/**
 * @param {Array} arr
 * @returns {Array}
 */
export function uniqueArr(arr: Iterable<unknown> | null | undefined) {
  return Array.from(new Set(arr));
}

/**
 * @returns {string}
 */
export function createUniqueString() {
  const timestamp = +new Date() + '';
  const randomNum = parseInt((1 + Math.random() * 65536).toString()) + '';
  return (+(randomNum + timestamp)).toString(32);
}

/**
 * 检查元素是否有类
 * @param {HTMLElement} elm
 * @param {string} cls
 * @returns {boolean}
 */
export function hasClass(ele: { className: string }, cls: string) {
  return !!ele.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
}

/**
 * 添加元素样式
 * @param {HTMLElement} elm
 * @param {string} cls
 */
export function addClass(ele: { className: string }, cls: string) {
  if (!hasClass(ele, cls)) ele.className += ' ' + cls;
}

/**
 * 移除元素样式
 * @param {HTMLElement} elm
 * @param {string} cls
 */
export function removeClass(ele: { className: string }, cls: string) {
  if (hasClass(ele, cls)) {
    const reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
    ele.className = ele.className.replace(reg, ' ');
  }
}

/**
 * 正则表达
 */
export const usernameReg = /^[A-Za-z]{4,14}$/;
export const phoneReg = /^1[3-9]\d{9}$/;
export const mailReg = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
export const passwordReg = /^[\w]{8,14}$/;

/**
 * 获取随机字符
 * @param {number} length
 */

export function randomString(length?: number): string {
  length = length || 32;
  const str = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let result = '';
  for (let i = length; i > 0; --i) {
    result += str[Math.floor(Math.random() * str.length)];
  }
  return result;
}

export const validateEmail = (rule, value, callback) => {
  if (!value) {
    return callback(new Error('请输入邮箱账号！'));
  }
  const isEmail = mailReg.test(value);
  if (!isEmail) {
    callback(new Error('邮箱格式不正确！'));
  } else {
    callback();
  }
};

export const validatePhone = (rule, value, callback) => {
  if (!value) {
    return callback(new Error('请输入手机号！'));
  }
  const isPhone = phoneReg.test(value);
  if (!isPhone) {
    callback(new Error('手机号格式错误！'));
  } else {
    callback();
  }
};
export const validateUsername = (rule, value, callback) => {
  if (!value) {
    return callback(new Error('请设置账户名！'));
  }
  const isUsername = usernameReg.test(value);
  if (!isUsername) {
    callback(new Error('请输入4-14个英文!'));
  } else {
    callback();
  }
};

export const validateSetPassword = (rule, value, callback) => {
  if (!value) {
    return callback(new Error('请设置密码！'));
  }
  const isPassword = passwordReg.test(value);
  if (!isPassword) {
    callback(new Error('密码为8-14个字符！'));
  } else {
    callback();
  }
};
export const validatePassword = (rule, value, callback) => {
  if (!value) {
    return callback(new Error('请输入密码！'));
  }
  const isPassword = passwordReg.test(value);
  if (!isPassword) {
    callback(new Error('密码为8-14个字符！'));
  } else {
    callback();
  }
};
// export function getUserInfo() {
//   return new Promise((resolve) => {
//     API.getUserInfo().then((res: any) => {
//       if (res.data.ideUser) {
//         resolve(res.data.ideUser);
//       }
//     });
//   })
// }
