!(function (e) {
    /*babel未编译Object.keys,补丁*/
    if(!(Object.keys&&typeof Object.keys === 'function')){
        Object.keys=(obj)=>{
            let keysArr=[];
            for(let i in obj){
                keysArr.push(i)
            }
            // console.log(9,keysArr)
            return keysArr
        }
    }

    /*兼容ie8及下forEach补丁，其实没用，本插件主要依赖于trasnform和borderRadius，ie8及下不支持*/
    if(!(Array.prototype.forEach)){
        Array.prototype.forEach=function(fn){
            if(typeof fn ==='function'){
                this.valueArr=[];
                try {
                    for(let i in this){
                        this.valueArr.push(this[i])
                        fn(this[i],i,this.valueArr)
                    }
                } catch (error) {
                    console.error(error.message)
                }
            }else{
                console.error(`forEach传入的参数不为funcion`)
            }
        }
    }

    const GroupHeadImg = (dom, options = {}) => {
        let { width = '50px', images = [], upperLimit = 5, haveAnimation = false, dealLast = true, boxStyle = {}, itemStyle = {} } = options;
        /*类型校验*/
        if (!(images && (images instanceof Array))) {
            console.error(`image为限制为Array类型,目前接收到的为————`, images);
            return
        }
        if (typeof width != 'string') {
            console.error(`itemStyle为限制为String类型,目前接收到的为————`, width);
            width = '50px'
        }
        if (typeof upperLimit != 'number') {
            console.error(`itemStyle为限制为Number类型,目前接收到的为————`, upperLimit);
            upperLimit = 10
        }
        if (typeof boxStyle != 'object') {
            console.error(`itemStyle为限制为Object类型,目前接收到的为————`, boxStyle);
            boxStyle = {}
        }
        if (typeof itemStyle != 'object') {
            console.error(`itemStyle为限制为Object类型,目前接收到的为————`, itemStyle);
            itemStyle = {}
        }

        const widthVal = parseFloat(width),
            unitVal = width.replace(`${widthVal}`, ''),
            length = images.length,
            upFistWord = (word='')=>{
                let res=`${word}`;
                if(word){
                    let firstWord=word.substr(0,1);
                    // console.log(44,word)
                    res=word.replace(firstWord,firstWord.toUpperCase())
                }
                return res
            },
            addStyleAttr = (ele, options = {}) => {
                Object.keys(options).forEach(key => {
                    const val = options[key];
                    if (val) {
                        ele.style[key] = val;

                        switch(key){
                            case 'transform':{
                                ele.style[`webkit${upFistWord(key)}`]=val;
                                ele.style[`ms${upFistWord(key)}`]=val;
                                break
                            }
                            case 'transition':{
                                ele.style[`webkit${upFistWord(key)}`]=val;
                                break
                            }
                            case 'boxSizing:':{
                                ele.style[`webkit${upFistWord(key)}`]=val;
                                ele.style[`moz${upFistWord(key)}`]=val;
                                break;
                            }
                        }

                        // console.log(72,`moz${upFistWord(key)}`)
                    }

                })

                // console.log(77,ele.style)
            },
            calcPositon = (index, total, translateScale) => {
                let res;
                switch (total) {
                    case 1: {
                        break
                    }
                    default: {
                        index = total - 1 - index;//保证第一个在图层最上面
                        let itemDeg = 360 / total,
                            reviseDeg = total == 2 ? 0 : 90,//矫正值
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
                    imgItemWidthVal,
                    borderWidth,
                    translateScale = 1;//每个图片边框大小
                const l = arr.length,
                    setVal = (scale, borderWidthScale = 10) => {
                        imgItemWidthScale = scale;
                        imgItemWidth = (widthVal) / 2 * imgItemWidthScale + unitVal;
                        imgItemWidthVal = parseFloat(imgItemWidth);
                        borderWidth = imgItemWidthVal / borderWidthScale + unitVal;
                        translateScale = (widthVal - imgItemWidthVal) / 2;

                        // console.log(imgItemWidthVal, scale, translateScale)
                    };

                switch (l) {
                    case 1: {
                        imgItemWidth = width;
                        borderWidth = 0;
                        break
                    }
                    case 2: {
                        setVal(1.2, 20);
                        break
                    }
                    case 3: {
                        setVal(1.03, 15);
                        break
                    }
                    case 4: {
                        setVal(1, 12);
                        break
                    }
                    default: {
                        setVal(0.95, 12);
                        break
                    }
                }

                for (let i = 0; i < l; i++) {
                    const div = document.createElement('div'),
                        divChild = document.createElement('div'),
                        isLast = (l - i == 1) &&l>=3&& dealLast;//是否最后一个并且要处理
                    div.className = `groupHeadImgItem-${i}`;

                    //设置样式对象
                    let divStyle = {
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%,-50%)'
                    },
                        divChildStyle = {
                            transform: haveAnimation ? undefined : calcPositon(i, l, translateScale),
                            transition: haveAnimation ? 'transform 1000ms' : undefined,
                            backgroundColor: '#fff',
                            // boxShadow: `0 0 ${borderWidth} #000`,
                            ...itemStyle,
                            position: 'relative',
                            width: imgItemWidth,
                            height: imgItemWidth,
                            borderRadius: '50%',
                            backgroundImage: `url(${arr[i]})`,
                            backgroundPosition: 'center',
                            backgroundSize: 'cover',
                            backgroundRepeat: 'no-repeat',
                            border: `${borderWidth} solid #ffffff`,
                            boxSizing: 'border-box',

                        };

                    div.appendChild(divChild);
                    dom.appendChild(div);
                    addStyleAttr(div, divStyle)
                    addStyleAttr(divChild, divChildStyle);

                    let divFirstChild,//准备放在dom最靠前的子元素的子元素
                        divLastRightWrap,//最后图片item右半边容器
                        divLastLeftWrap;//最后图片item左半边容器
                    if (isLast) {
                        const divLastRight = document.createElement('div'),
                            divLastLeft = document.createElement('div'),
                            groupHeadImgItem0 = dom.querySelector('.groupHeadImgItem-0'),
                            divFirst = document.createElement('div');//准备放在dom最靠前的子元素

                        divLastRightWrap = document.createElement('div');
                        divLastLeftWrap = document.createElement('div');
                        divFirstChild = document.createElement('div');//准备放在dom最靠前的子元素的子元素

                        //设置样式对象
                        let divChildStyle_cover = {
                            backgroundColor: 'rgba(0,0,0,0)',
                            backgroundImage: 'none',
                            border: 'none',
                            overflow: 'hidden',
                        },
                            divLastRightStyle = {
                                position: "absolute",
                                right: '0',
                                top: '0',
                                width: imgItemWidth,
                                height: imgItemWidth,
                                borderRadius: '50%',
                                backgroundImage: `url(${arr[i]})`,
                                backgroundPosition: 'center',
                                backgroundSize: 'cover',
                                backgroundRepeat: 'no-repeat',
                                border: `${borderWidth} solid #ffffff`,
                                boxSizing: 'border-box',


                            },
                            divLastRightWrapStyle = {
                                position: 'absolute',
                                right: '0',
                                top: '0',
                                // transition: haveAnimation ? 'width 1000ms' : undefined,
                                width: haveAnimation ? imgItemWidth : (Math.ceil(parseFloat(imgItemWidth) / 2) + unitVal),
                                height: imgItemWidth,
                                overflow: 'hidden',

                            };

                        addStyleAttr(divChild, divChildStyle_cover);

                        divChild.appendChild(divLastRightWrap);
                        divLastRightWrap.appendChild(divLastRight);

                        addStyleAttr(divLastRightWrap, divLastRightWrapStyle)
                        addStyleAttr(divLastRight, divLastRightStyle)
                        dom.insertBefore(divFirst, groupHeadImgItem0);
                        divFirst.appendChild(divFirstChild)
                        divFirstChild.appendChild(divLastLeftWrap);
                        divLastLeftWrap.appendChild(divLastLeft);


                        addStyleAttr(divFirst, divStyle)

                        addStyleAttr(divFirstChild, { ...divChildStyle, ...divChildStyle_cover });

                        addStyleAttr(divLastLeftWrap, {
                            ...divLastRightWrapStyle,
                            right: 'auto',
                            left: '0'
                        })
                        addStyleAttr(divLastLeft, {
                            ...divLastRightStyle,
                            right: 'auto',
                            left: '0'
                        })
                    }

                    if (haveAnimation) {
                        setTimeout(() => {

                            let divChildStyleAimation = {
                                transform: calcPositon(i, l, translateScale)
                            }

                            addStyleAttr(divChild, divChildStyleAimation)

                            if (isLast && divFirstChild) {
                                let divLastWrapStyle = {
                                    width: Math.ceil(parseFloat(imgItemWidth) / 2) + unitVal,
                                }
                                // console.log(223,divFirstChild)
                                addStyleAttr(divFirstChild, divChildStyleAimation)

                                setTimeout(() => {

                                    addStyleAttr(divLastLeftWrap, divLastWrapStyle)

                                    addStyleAttr(divLastRightWrap, divLastWrapStyle)

                                }, 1000);
                            }

                        }, 0)
                    }
                }
            };;
        if (dom) {
            addStyleAttr(dom, {
                ...boxStyle,
                /*boxStyle不接受以下属性*/
                position: 'relative',
                width,
                height: width,
                borderRadius: '50%',
                boxSizing: 'border-box'
            })
        } else {
            console.error(`缺少dom对象`);
            return;
        }
        if (!length) {
            console.error(`图片个数为0`);
            return;
        } else {
            dom.innerHTML = '';//防止多次调用
            createEle(images.slice(0, Math.min(length, upperLimit)))
        }

    }
    e.GroupHeadImg = GroupHeadImg;
})(window)
// export default GroupHeadImg