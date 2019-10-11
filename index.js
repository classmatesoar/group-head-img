!(function (e) {
    const GroupHeadImg = (dom, options = {}) => {
        const { width = '10rem', images = [] } = options,
            widthVal = parseFloat(width),
            unitVal = width.replace(`${widthVal}`, ''),
            length = images.length,
            addStyleAttr = (ele, options = {}) => {
                Object.keys(options).forEach(key => {
                    const val = options[key];
                    if (val) {
                        ele.style[key] = val;
                    }
                })
            },
            calcPositon = (index, total, translateScale) => {
                let res;
                switch (total) {
                    case 1: {
                        break
                    }
                    default: {
                        index = total - 1 - index;
                        let itemDeg = 360 / total,
                            reviseDeg = 0,//矫正值
                            resDeg = itemDeg * index - reviseDeg,
                            itemHd = resDeg / 180 * Math.PI,
                            cosVal = Math.cos(itemHd) * translateScale + unitVal,
                            sinVal = Math.sin(itemHd) * translateScale + unitVal;

                        // console.log(`${index + 1}/${total}`, resDeg)

                        res = `translate(${cosVal},${sinVal})`
                    }
                }
                return res

            },
            createEle = (arr) => {
                let imgItemWidthScale = 1,
                    imgItemWidth,//每个图片大小
                    borderWidth,
                    translateScale = 1;//每个图片边框大小
                const l = arr.length,
                    setVal = (scale,borderWidthScale=10) => {
                        let tsfmVal = widthVal * 0.5 * 0.5;

                        imgItemWidthScale = scale;
                        imgItemWidth = (widthVal) / 2 * imgItemWidthScale + unitVal;
                        imgItemWidthVal = parseFloat(imgItemWidth);
                        borderWidth = imgItemWidthVal / borderWidthScale + unitVal;
                        translateScale = (widthVal - imgItemWidthVal) /2;

                        console.log(imgItemWidthVal, scale, translateScale)
                    };

                switch (l) {
                    case 1: {
                        imgItemWidth = width;
                        borderWidth = 0;
                        break
                    }
                    case 2: {
                        setVal(1.2,20);
                        break
                    }
                    case 3: {
                        setVal(1.1,15);
                        break
                    }
                    case 4: {
                        setVal(0.95,12);
                        break
                    }
                    default: {
                        setVal(0.95,12);
                        break
                    }
                }

                for (let i = 0; i < l; i++) {
                    const div = document.createElement('div'),
                        divChild = document.createElement('div');
                    div.className = `groupHeadImgItem-${i}`;
                    addStyleAttr(div, {
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%,-50%)'
                    })
                    addStyleAttr(divChild, {
                        position: 'relative',
                        transform: calcPositon(i, l, translateScale),
                        width: imgItemWidth,
                        height: imgItemWidth,
                        borderRadius: '50%',
                        backgroundColor: '#f4f4f4',
                        backgroundImage: `url(${arr[i]})`,
                        backgroundPosition: 'center',
                        backgroundSize: 'contain',
                        backgroundRepeat: 'no-repeat',
                        border: `${borderWidth} solid #ffffff`,
                        boxSizing: 'border-box',
                        boxShadow: `0 0 ${borderWidth} #000`
                    });
                    div.appendChild(divChild);
                    dom.appendChild(div)
                }
            };;
        if (dom) {
            addStyleAttr(dom, {
                position: 'relative',
                width,
                height: width,
                borderRadius: '50%',
                backgroundColor: '#f4f4f4',
                // overflow: 'hidden',
                boxSizing: 'border-box'
            })
        } else {
            console.warn('缺少dom对象')
        }
        if (!length) {
            console.warn('图片个数为0')
        } else {
            dom.innerHTML = '';//防止多次调用
            createEle(images.slice(0, Math.min(length, 5)))
        }

    }
    e.GroupHeadImg = GroupHeadImg;
})(window)
// export default GroupHeadImg