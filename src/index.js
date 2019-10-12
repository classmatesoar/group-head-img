'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

!function (e) {
    var GroupHeadImg = function GroupHeadImg(dom) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        var _options$width = options.width,
            width = _options$width === undefined ? '50px' : _options$width,
            _options$images = options.images,
            images = _options$images === undefined ? [] : _options$images,
            _options$upperLimit = options.upperLimit,
            upperLimit = _options$upperLimit === undefined ? 10 : _options$upperLimit,
            _options$haveAnimatio = options.haveAnimation,
            haveAnimation = _options$haveAnimatio === undefined ? true : _options$haveAnimatio,
            _options$boxStyle = options.boxStyle,
            boxStyle = _options$boxStyle === undefined ? {} : _options$boxStyle,
            _options$itemStyle = options.itemStyle,
            itemStyle = _options$itemStyle === undefined ? {} : _options$itemStyle;
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
            addStyleAttr = function addStyleAttr(ele) {
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

            Object.keys(options).forEach(function (key) {
                var val = options[key];
                if (val) {
                    ele.style[key] = val;
                }
            });
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
                        setVal(1.1, 15);
                        break;
                    }
                case 4:
                    {
                        setVal(1, 12);
                        break;
                    }
                default:
                    {
                        setVal(0.98, 12);
                        break;
                    }
            }

            var _loop = function _loop(i) {
                var div = document.createElement('div'),
                    divChild = document.createElement('div');
                div.className = 'groupHeadImgItem-' + i;

                div.appendChild(divChild);
                dom.appendChild(div);
                addStyleAttr(div, {
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%,-50%)'
                });
                addStyleAttr(divChild, _extends({
                    transform: haveAnimation ? undefined : calcPositon(i, l, translateScale),
                    transition: haveAnimation ? 'all 1000ms' : undefined,
                    backgroundColor: '#fff'
                }, itemStyle, {
                    position: 'relative',
                    width: imgItemWidth,
                    height: imgItemWidth,
                    borderRadius: '50%',
                    backgroundImage: 'url(' + arr[i] + ')',
                    backgroundPosition: 'center',
                    backgroundSize: 'contain',
                    backgroundRepeat: 'no-repeat',
                    border: borderWidth + ' solid #ffffff',
                    boxSizing: 'border-box'

                }));

                if (haveAnimation) {
                    setTimeout(function () {
                        addStyleAttr(divChild, {
                            transform: calcPositon(i, l, translateScale)
                        });
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