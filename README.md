# group-head-img

#### 介绍
群组动态头像

![image Text](./image/havealook.png)

### 兼容
现代浏览器 及 ie9+

#### 软件架构
软件架构说明


#### 安装教程

1. npm install groupheadimg --save
2. import 'groupheadimg' 或通过script引入

#### 使用说明

1. GroupHeadImg(dom:DOM节点,options:Object)
2. dom必传项
3. options配置项

| key | 描述 | 数据类型 | 默认值 | 说明 |
| :-: | :-: | :-: | :-: | :-: |
| width | 容器宽度 | String | 50px | 带上单位px或rem【em不推荐】 |
| images | 图片数组 | Array | - | 必填 |
| upperLimit | 渲染图片数量上限 | Number | 5 | - |
| dealLast | 最后一个头像是否嵌套第一个头像| Boolean | true | - |
| haveAnimation | 是否开启动画 | Boolean | true | - |
| boxStyle | 容器style属性 | Object | {} | - |
| itemStyle | 图片item容器属性 | Object | {} | - |
| borderImportant | border-width是否加important【兼容公司项目】 | Boolean | true | - |

#### 参与贡献

1. Fork 本仓库
2. 新建 Feat_xxx 分支
3. 提交代码
4. 新建 Pull Request


#### 码云特技

1. 使用 Readme\_XXX.md 来支持不同的语言，例如 Readme\_en.md, Readme\_zh.md
2. 码云官方博客 [blog.gitee.com](https://blog.gitee.com)
3. 你可以 [https://gitee.com/explore](https://gitee.com/explore) 这个地址来了解码云上的优秀开源项目
4. [GVP](https://gitee.com/gvp) 全称是码云最有价值开源项目，是码云综合评定出的优秀开源项目
5. 码云官方提供的使用手册 [https://gitee.com/help](https://gitee.com/help)
6. 码云封面人物是一档用来展示码云会员风采的栏目 [https://gitee.com/gitee-stars/](https://gitee.com/gitee-stars/)