'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

!function (e) {
    /*babel未编译Object.keys,补丁*/
    if (!(Object.keys && typeof Object.keys === 'function')) {
        Object.keys = function (obj) {
            var keysArr = [];
            for (var i in obj) {
                keysArr.push(i);
            }
            // console.log(9,keysArr)
            return keysArr;
        };
    }

    /*兼容ie8及下forEach补丁，其实没用，本插件主要依赖于trasnform和borderRadius，ie8及下不支持*/
    if (!Array.prototype.forEach) {
        Array.prototype.forEach = function (fn) {
            if (typeof fn === 'function') {
                this.valueArr = [];
                try {
                    for (var i in this) {
                        this.valueArr.push(this[i]);
                        fn(this[i], i, this.valueArr);
                    }
                } catch (error) {
                    console.error(error.message);
                }
            } else {
                console.error('forEach\u4F20\u5165\u7684\u53C2\u6570\u4E0D\u4E3Afuncion');
            }
        };
    }

    var GroupHeadImg = function GroupHeadImg(dom) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        var _options$width = options.width,
            width = _options$width === undefined ? '50px' : _options$width,
            _options$images = options.images,
            images = _options$images === undefined ? [] : _options$images,
            _options$upperLimit = options.upperLimit,
            upperLimit = _options$upperLimit === undefined ? 5 : _options$upperLimit,
            _options$haveAnimatio = options.haveAnimation,
            haveAnimation = _options$haveAnimatio === undefined ? false : _options$haveAnimatio,
            _options$dealLast = options.dealLast,
            dealLast = _options$dealLast === undefined ? true : _options$dealLast,
            _options$boxStyle = options.boxStyle,
            boxStyle = _options$boxStyle === undefined ? {} : _options$boxStyle,
            _options$itemStyle = options.itemStyle,
            itemStyle = _options$itemStyle === undefined ? {} : _options$itemStyle,
            _options$borderImport = options.borderImportant,
            borderImportant = _options$borderImport === undefined ? true : _options$borderImport;
        /*类型校验*/

        if (!(images && images instanceof Array)) {
            console.error('image\u4E3A\u9650\u5236\u4E3AArray\u7C7B\u578B,\u76EE\u524D\u63A5\u6536\u5230\u7684\u4E3A\u2014\u2014\u2014\u2014', images);
            return;
        }
        if (typeof width != 'string') {
            console.error('itemStyle\u4E3A\u9650\u5236\u4E3AString\u7C7B\u578B,\u76EE\u524D\u63A5\u6536\u5230\u7684\u4E3A\u2014\u2014\u2014\u2014', width);
            width = '50px';
        }
        if (typeof upperLimit != 'number') {
            console.error('itemStyle\u4E3A\u9650\u5236\u4E3ANumber\u7C7B\u578B,\u76EE\u524D\u63A5\u6536\u5230\u7684\u4E3A\u2014\u2014\u2014\u2014', upperLimit);
            upperLimit = 10;
        }
        if ((typeof boxStyle === 'undefined' ? 'undefined' : _typeof(boxStyle)) != 'object') {
            console.error('itemStyle\u4E3A\u9650\u5236\u4E3AObject\u7C7B\u578B,\u76EE\u524D\u63A5\u6536\u5230\u7684\u4E3A\u2014\u2014\u2014\u2014', boxStyle);
            boxStyle = {};
        }
        if ((typeof itemStyle === 'undefined' ? 'undefined' : _typeof(itemStyle)) != 'object') {
            console.error('itemStyle\u4E3A\u9650\u5236\u4E3AObject\u7C7B\u578B,\u76EE\u524D\u63A5\u6536\u5230\u7684\u4E3A\u2014\u2014\u2014\u2014', itemStyle);
            itemStyle = {};
        }

        var widthVal = parseFloat(width),
            unitVal = width.replace('' + widthVal, ''),
            length = images.length,
            upFistWord = function upFistWord() {
            var word = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

            var res = '' + word;
            if (word) {
                var firstWord = word.substr(0, 1);
                // console.log(44,word)
                res = word.replace(firstWord, firstWord.toUpperCase());
            }
            return res;
        },
            addStyleAttr = function addStyleAttr(ele) {
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

            Object.keys(options).forEach(function (key) {
                var val = options[key];
                if (val) {
                    ele.style[key] = val;

                    switch (key) {
                        case 'transform':
                            {
                                ele.style['webkit' + upFistWord(key)] = val;
                                ele.style['ms' + upFistWord(key)] = val;
                                break;
                            }
                        case 'transition':
                            {
                                ele.style['webkit' + upFistWord(key)] = val;
                                break;
                            }
                        case 'boxSizing:':
                            {
                                ele.style['webkit' + upFistWord(key)] = val;
                                ele.style['moz' + upFistWord(key)] = val;
                                break;
                            }
                        case 'border':
                            {
                                if (borderImportant) {
                                    ele.style.setProperty(key, val, "important");
                                }
                                break;
                            }
                    }

                    // console.log(72,`moz${upFistWord(key)}`)
                }
            });

            // console.log(77,ele.style)
        },
            calcPositon = function calcPositon(index, total, translateScale) {
            var res = void 0;
            switch (total) {
                case 1:
                    {
                        break;
                    }
                default:
                    {
                        index = total - 1 - index; //保证第一个在图层最上面
                        var itemDeg = 360 / total,
                            reviseDeg = total == 2 ? 0 : 90,
                            //矫正值
                        resDeg = itemDeg * index - reviseDeg,
                            itemHd = resDeg / 180 * Math.PI,
                            cosVal = Math.cos(itemHd) * translateScale + unitVal,
                            sinVal = Math.sin(itemHd) * translateScale + unitVal;

                        // console.log(`${index + 1}/${total}`, resDeg)

                        res = 'translate(' + cosVal + ',' + sinVal + ')';
                    }
            }
            return res;
        },
            createEle = function createEle(arr) {
            var imgItemWidthScale = 1,
                imgItemWidth = void 0,
                //每个图片大小
            imgItemWidthVal = void 0,
                borderWidth = void 0,
                translateScale = 1; //每个图片边框大小
            var l = arr.length,
                setVal = function setVal(scale) {
                var borderWidthScale = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 10;

                imgItemWidthScale = scale;
                imgItemWidth = widthVal / 2 * imgItemWidthScale + unitVal;
                imgItemWidthVal = parseFloat(imgItemWidth);
                borderWidth = imgItemWidthVal / borderWidthScale + unitVal;
                translateScale = (widthVal - imgItemWidthVal) / 2;

                // console.log(imgItemWidthVal, scale, translateScale)
            };

            switch (l) {
                case 1:
                    {
                        imgItemWidth = width;
                        borderWidth = 0;
                        break;
                    }
                case 2:
                    {
                        setVal(1.2, 20);
                        break;
                    }
                case 3:
                    {
                        setVal(1.03, 15);
                        break;
                    }
                case 4:
                    {
                        setVal(1, 12);
                        break;
                    }
                default:
                    {
                        setVal(0.95, 12);
                        break;
                    }
            }

            var _loop = function _loop(i) {
                var div = document.createElement('div'),
                    divChild = document.createElement('div'),
                    isLast = l - i == 1 && l >= 3 && dealLast; //是否最后一个并且要处理
                div.className = 'groupHeadImgItem-' + i;

                //设置样式对象
                var divStyle = {
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%,-50%)'
                },
                    divChildStyle = _extends({
                    transform: haveAnimation ? undefined : calcPositon(i, l, translateScale),
                    transition: haveAnimation ? 'transform 1000ms' : undefined,
                    backgroundColor: '#fff'
                }, itemStyle, {
                    position: 'relative',
                    width: imgItemWidth,
                    height: imgItemWidth,
                    borderRadius: '50%',
                    backgroundImage: 'url(' + arr[i] + ')',
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    border: borderWidth + ' solid #ffffff',
                    boxSizing: 'border-box'

                });

                div.appendChild(divChild);
                dom.appendChild(div);
                addStyleAttr(div, divStyle);
                addStyleAttr(divChild, divChildStyle);

                var divFirstChild = void 0,
                    //准备放在dom最靠前的子元素的子元素
                divLastRightWrap = void 0,
                    //最后图片item右半边容器
                divLastLeftWrap = void 0; //最后图片item左半边容器
                if (isLast) {
                    var divLastRight = document.createElement('div'),
                        divLastLeft = document.createElement('div'),
                        groupHeadImgItem0 = dom.querySelector('.groupHeadImgItem-0'),
                        divFirst = document.createElement('div'); //准备放在dom最靠前的子元素

                    divLastRightWrap = document.createElement('div');
                    divLastLeftWrap = document.createElement('div');
                    divFirstChild = document.createElement('div'); //准备放在dom最靠前的子元素的子元素

                    //设置样式对象
                    var divChildStyle_cover = {
                        backgroundColor: 'rgba(0,0,0,0)',
                        backgroundImage: 'none',
                        border: 'none',
                        overflow: 'hidden'
                    },
                        divLastRightStyle = {
                        position: "absolute",
                        right: '0',
                        top: '0',
                        width: imgItemWidth,
                        height: imgItemWidth,
                        borderRadius: '50%',
                        backgroundImage: 'url(' + arr[i] + ')',
                        backgroundPosition: 'center',
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                        border: borderWidth + ' solid #ffffff',
                        boxSizing: 'border-box'

                    },
                        divLastRightWrapStyle = {
                        position: 'absolute',
                        right: '0',
                        top: '0',
                        // transition: haveAnimation ? 'width 1000ms' : undefined,
                        width: haveAnimation ? imgItemWidth : Math.ceil(parseFloat(imgItemWidth) / 2) + unitVal,
                        height: imgItemWidth,
                        overflow: 'hidden'

                    };

                    addStyleAttr(divChild, divChildStyle_cover);

                    divChild.appendChild(divLastRightWrap);
                    divLastRightWrap.appendChild(divLastRight);

                    addStyleAttr(divLastRightWrap, divLastRightWrapStyle);
                    addStyleAttr(divLastRight, divLastRightStyle);
                    dom.insertBefore(divFirst, groupHeadImgItem0);
                    divFirst.appendChild(divFirstChild);
                    divFirstChild.appendChild(divLastLeftWrap);
                    divLastLeftWrap.appendChild(divLastLeft);

                    addStyleAttr(divFirst, divStyle);

                    addStyleAttr(divFirstChild, _extends({}, divChildStyle, divChildStyle_cover));

                    addStyleAttr(divLastLeftWrap, _extends({}, divLastRightWrapStyle, {
                        right: 'auto',
                        left: '0'
                    }));
                    addStyleAttr(divLastLeft, _extends({}, divLastRightStyle, {
                        right: 'auto',
                        left: '0'
                    }));
                }

                if (haveAnimation) {
                    setTimeout(function () {

                        var divChildStyleAimation = {
                            transform: calcPositon(i, l, translateScale)
                        };

                        addStyleAttr(divChild, divChildStyleAimation);

                        if (isLast && divFirstChild) {
                            var divLastWrapStyle = {
                                width: Math.ceil(parseFloat(imgItemWidth) / 2) + unitVal
                                // console.log(223,divFirstChild)
                            };addStyleAttr(divFirstChild, divChildStyleAimation);

                            setTimeout(function () {

                                addStyleAttr(divLastLeftWrap, divLastWrapStyle);

                                addStyleAttr(divLastRightWrap, divLastWrapStyle);
                            }, 1000);
                        }
                    }, 0);
                }
            };

            for (var i = 0; i < l; i++) {
                _loop(i);
            }
        };;
        if (dom) {
            addStyleAttr(dom, _extends({}, boxStyle, {
                /*boxStyle不接受以下属性*/
                position: 'relative',
                width: width,
                height: width,
                borderRadius: '50%',
                boxSizing: 'border-box'
            }));
        } else {
            console.error('\u7F3A\u5C11dom\u5BF9\u8C61');
            return;
        }
        if (!length) {
            console.error('\u56FE\u7247\u4E2A\u6570\u4E3A0');
            return;
        } else {
            dom.innerHTML = ''; //防止多次调用
            createEle(images.slice(0, Math.min(length, upperLimit)));
        }
    };
    e.GroupHeadImg = GroupHeadImg;
}(window);
// export default GroupHeadImg