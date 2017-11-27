# amwares-web-api
## 运行
* 下载项目
* 初始化
```
    #安装依赖
    npm i
    #添加数据库
    mysql
    CREATE DATABASE amwares_web_development CHARACTER SET='utf8';
    #运行程序
    npm start
    #填充数据
    npm run development-seeds
```

## 目录
* [用户相关](#用户相关) 
    * [获取用户信息](#获取用户信息)
    * [添加用户](#添加用户)
    * [修改指定用户](#修改指定用户)
    * [修改指定用户头像](#修改指定用户头像)
    * [删除用户](#删除用户)
    * [用户登录](#用户登录)
    * [用户登出](#用户登出)
* [基本配置相关](#基本配置相关)
    * [获取基本信息](#获取基本信息)
    * [基本信息修改](#基本信息修改)
* [轮播图相关](#轮播图相关)
    * [获取轮播图信息](#获取轮播图信息)
    * [添加轮播图](#添加轮播图)
    * [修改轮播图](#修改轮播图)
    * [删除轮播图](#删除轮播图)
    * [改变轮播图顺序](#改变轮播图顺序)
* [合作伙伴相关](#合作伙伴相关)
    * [获取合作伙伴信息](#获取合作伙伴信息)
    * [添加合作伙伴](#添加合作伙伴)
    * [修改合作伙伴](#修改合作伙伴)
    * [删除合作伙伴](#删除合作伙伴)
* [联系方式相关](#联系方式相关)
    * [获取联系方式信息](#获取联系方式信息)
    * [修改联系方式](#修改联系方式)
* [我们的优势相关](#我们的优势相关)
    * [获取我们的优势信息](#获取我们的优势信息)
    * [添加我们的优势](#添加我们的优势)
    * [修改我们的优势](#修改我们的优势)
    * [删除我们的优势](#删除我们的优势)
* [友情链接相关](#友情链接相关)
    * [获取友情链接信息](#获取友情链接信息)
    * [添加友情链接](#添加友情链接)
    * [修改友情链接](#修改友情链接)
    * [删除友情链接](#删除友情链接)
* [产品与服务相关](#产品与服务相关)
    * [获取产品分类](#获取产品分类)
    * [根据名称获取产品分类](#根据名称获取产品分类)
    * [根据id获取产品分类](#根据id获取产品分类)
    * [添加产品分类](#添加产品分类)
    * [修改产品分类](#修改产品分类)
    * [删除产品分类](#删除产品分类)
    * [获取产品](#获取产品)
    * [根据名称获取产品](#根据名称获取产品)
    * [根据id获取产品](#根据id获取产品)
    * [添加产品](#添加产品)
    * [修改产品](#修改产品)
    * [删除产品](#删除产品)
    * [获取内容块](#获取内容块)
    * [添加内容块](#添加内容块)
    * [修改内容块](#修改内容块)
    * [删除内容块](#删除内容块)
    * [调整内容块](#调整内容块)
* [公司简闻相关](#公司简闻相关)
    * [获取公司简闻](#获取公司简闻)
    * [添加公司简闻](#添加公司简闻)
    * [修改公司简闻](#修改公司简闻)
    * [删除公司简闻](#删除公司简闻)
* [网站访问数据相关](#网站访问数据相关)
    * [获取网站访问数据](#获取网站访问数据)
    * [添加访客信息](#添加访客信息)
    * [按时间段查询访客量](#按时间段查询访客量)
    * [获取访问设备类型信息](#获取访问设备类型信息)
    * [获取访问城市信息](#获取访问城市信息)
    * [获取指定ip访问数量](#获取指定ip访问数量)
* [网站搜索相关](#网站搜索相关)
    * [获取指定类型数据](#获取指定类型数据)

## api说明文档`所有接口需用户登录后才能调用`

### 状态码(status)说明
* 200 - 请求成功状态码
* 400 - 异常请求状态码
* 404 - 找不到请求状态码

### 用户相关

---

#### 获取用户信息

##### 请求URL:
* ```/user```

##### 请求方法:
* GET

##### 返回示例:
```json
{
    "status": 200,
    "data": [
        {
            "id": 1,
            "username": "admin",
            "avatarUrl": "/images/avatar/avatar.png"
        }
    ]
}
```

##### 返回参数说明
|  参数名   |     说明     |
|-----------|--------------|
| avatarUrl | 用户头像地址 |

---

#### 添加用户

`添加用户自动添加默认头像地址/images/avatar/avatar.png`

##### 请求URL:
* ```/user/add```

##### 请求方法:
* POST

##### 参数:
|  参数名  | 必填 |  类型  |      说明      |
|----------|------|--------|----------------|
| username | y    | string | 用户名必须唯一 |
| password | y    | string | 密码           |


##### 返回示例:
```json
{
    "status": 200,
    "data": "添加用户成功"
}
```

---

#### 修改指定用户:

##### 请求URL:
* ```/user/edit/:id```

##### 请求方法:
* POST

##### 参数:
|  参数名  | 必填 |  类型  |      说明      |
|----------|------|--------|----------------|
| id       | y    | int    | 用户id         |
| password | y    | string | 密码           |

##### 返回示例:
```json
{
    "status": 200,
    "data": "用户修改密码成功"
}
```

---

#### 修改指定用户头像:

##### 请求URL:
* ```/user/edit/avatar/:id```

##### 请求方法:
* POST

##### 参数:
|  参数名   | 必填 | 类型 |   说明   |
|-----------|------|------|----------|
| id        | y    | int  | 用户id   |
| avatarUrl | y    | file | 头像图片 |

##### 返回示例:
```json
{
    "status": 200,
    "data": "修改头像成功"
}
```

---

#### 删除用户

##### 请求URL:
* ```/user/del/:id```

##### 请求方法:
* POST

##### 参数:
| 参数名 | 必填 | 类型 |            说明           |
|--------|------|------|---------------------------|
| id     | y    | int  | 用户id 不能删除已登录用户 |

##### 返回示例:
```json
{
    "status": 200,
    "data": "删除用户成功"
}
```

---

#### 用户登录

##### 请求URL:
* ```/user/login```

##### 请求方法:
* POST

##### 参数:
|  参数名  | 必填 |  类型  |  说明  |
|----------|------|--------|--------|
| username | y    | string | 用户名 |
| password | y    | string | 密码   |

##### 返回示例:
```json
{
    "status": 200,
    "data": "登录成功"
}
```

---

#### 用户登出

##### 请求URL:
* ```/user/logout```

##### 请求方法:
* POST

##### 返回示例:
```json
{
    "status": 200,
    "data": "登出成功"
}
```

---

### 基本配置相关

---

#### 获取基本信息

##### 请求URL:
* ```/baseInfo```

##### 请求方法:
* GET

##### 返回示例:
```json
{
    "status": 200,
    "data": [
        {
            "id": 1,
            "logoUrl": "/images/baseInfo/pic01.jpg",
            "name": "广州辂轺信息科技有限公司",
            "description": "广州辂轺信息科技2013年成立于广州,是一家专注于汽车ECU（电子控制单元）产品开发的科技企业。 依托于自行开发的AUTOSAR汽车软件架构和OSEK实时操作系统，凭借自身多年的技术积累，为广大客户提供各种ECU解决方案和产品。",
            "copyright": "© 2014-2017 广州辂轺信息科技有限公司 版权所有",
            "createdAt": "2017-11-09T04:17:39.000Z",
            "updatedAt": "2017-11-09T04:17:39.000Z"
        }
    ]
}
```

##### 返回参数说明
|  参数名   |     说明     |
|-----------|--------------|
| logoUrl | 公司logo地址 |

---

#### 基本信息修改

##### 请求URL:
* ```/baseInfo/edit```

##### 请求方法:
* POST

##### 参数:
|   参数名    | 必填 |  类型  |   说明   |
|-------------|------|--------|----------|
| name        | n    | string | 公司名   |
| description | n    | string | 描述     |
| copyright   | n    | string | 注册商标 |
| logoUrl      | n    | file   | 头像文件 |

##### 返回示例:
```json
{
    "status": 200,
    "data": "修改网站基本信息成功"
}
```

---

### 轮播图相关
---

#### 获取轮播图信息

##### 请求URL:
* ```/slideShow```

##### 请求方法:
* GET

##### 返回示例:
```json
{
    "status": 200,
    "data": [
        {
            "id": 1,
            "title": "轮播图",
            "description": "我是轮播图",
            "link": "https://www.google.com",
            "slideshowUrl": "/images/slideShow/32864.jpg",
            "sort": 1,
            "createdAt": "2017-11-09T06:45:30.000Z",
            "updatedAt": "2017-11-09T06:45:30.000Z"
        }
    ]
}
```

##### 返回参数说明
|    参数名    |    说明    |
|--------------|------------|
| slideshowUrl | 轮播图地址 |
| sort         | 排序标识   |

---

#### 添加轮播图

##### 请求URL:
* ```/slideShow/add```

##### 请求方法:
* POST

##### 参数:
|    参数名    | 必填 |  类型  |    说明    |
|--------------|------|--------|------------|
| title        | n    | string | 标题       |
| description  | n    | string | 描述       |
| link         | n    | string | 链接       |
| slideshowUrl | n    | file   | 轮播图文件 |

##### 返回示例:
```json
{
    "status": 200,
    "data": "添加轮播图成功"
}
```

---

#### 修改轮播图

##### 请求URL:
* ```/slideShow/edit/:id```

##### 请求方法:
* POST

##### 参数:
|    参数名    | 必填 |  类型  |    说明    |
|--------------|------|--------|------------|
| id           | y    | int    | 轮播图id   |
| title        | n    | string | 标题       |
| description  | n    | string | 描述       |
| link         | n    | string | 链接       |
| slideshowUrl | n    | file   | 轮播图文件 |

##### 返回示例:
```json
{
    "status": 200,
    "data": "修改轮播图成功"
}
```

---

#### 删除轮播图

##### 请求URL:
* ```/slideShow/del/:id```

##### 请求方法:
* POST

##### 参数:
| 参数名 | 必填 | 类型 |   说明   |
|--------|------|------|----------|
| id     | y    | int  | 轮播图id |

##### 返回示例:
```json
{
    "status": 200,
    "data": "删除轮播图成功"
}
```

---

#### 改变轮播图顺序

##### 请求URL:
* ```/slideShow/change```

##### 请求方法:
* POST

##### 参数:
| 参数名 | 必填 |  类型 |          说明          |
|--------|------|-------|------------------------|
| change | y    | array | 轮播图改变顺序后id数组 |

##### 返回示例:
```json
{
    "status": 200,
    "data": "顺序交换成功"
}
```

---

### 合作伙伴相关

---

#### 获取合作伙伴信息

##### 请求URL:
* ```/partner```

##### 请求方法:
* GET

##### 返回示例:
```json
{
    "status": 200,
    "data": [
        {
            "id": 1,
            "name": "zhangsan",
            "province": "广东",
            "city": "广州",
            "createdAt": "2017-11-09T06:59:06.000Z",
            "updatedAt": "2017-11-09T06:59:06.000Z"
        }
    ]
}
```

---

#### 添加合作伙伴

##### 请求URL:
* ```/partner/add```

##### 请求方法:
* POST

##### 参数:
|  参数名  | 必填 |  类型  |     说明     |
|----------|------|--------|--------------|
| name     | y    | string | 合作伙伴名称 |
| province | y    | string | 省份         |
| city     | y    | string | 城市         |

##### 返回示例:
```json
{
    "status": 200,
    "data": "添加合作伙伴成功"
}
```

---

#### 修改合作伙伴

##### 请求URL:
* ```/partner/edit/:id```

##### 请求方法:
* POST

##### 参数:
|  参数名  | 必填 |  类型  |     说明     |
|----------|------|--------|--------------|
| id       | y    | int    | 合作伙伴id   |
| name     | n    | string | 合作伙伴名称 |
| province | n    | string | 省份         |
| city     | n    | string | 城市         |

##### 返回示例:
```json
{
    "status": 200,
    "data": "修改合作伙伴成功"
}
```

---

#### 删除合作伙伴

##### 请求URL:
* ```/partner/del/:id```

##### 请求方法:
* POST

##### 参数:
|  参数名  | 必填 |  类型  |     说明     |
|----------|------|--------|--------------|
| id       | y    | int    | 合作伙伴id   |

##### 返回示例:
```json
{
    "status": 200,
    "data": "删除合作伙伴成功"
}
```

---

### 联系方式相关

---

#### 获取联系方式信息

##### 请求URL:
* ```/contact```

##### 请求方法:
* GET

##### 返回示例:
```json
{
    "status": 200,
    "data": [
        {
            "id": 1,
            "address": "广州市天河区天河东路242号601室",
            "tel": "+86 020 87519370",
            "fax": "+86 020 85262282",
            "email": "info@amwares.com",
            "createdAt": "2017-11-09T06:33:10.000Z",
            "updatedAt": "2017-11-09T06:33:10.000Z"
        }
    ]
}
```

---

#### 修改联系方式

##### 请求URL:
* ```/contact/edit```

##### 请求方法:
* POST

##### 参数:
| 参数名  | 必填 |  类型  |   说明   |
|---------|------|--------|----------|
| address | n    | string | 地址     |
| tel     | n    | string | 电话     |
| fax     | n    | string | 传真     |
| email   | n    | string | 邮箱地址 |

##### 返回示例:
```json
{
    "status": 200,
    "data": "修改联系方式成功"
}
```

---

### 我们的优势相关

---

#### 获取我们的优势信息

##### 请求URL:
* ```/advantage```

##### 请求方法:
* GET

##### 返回示例:
```json
{
    "status": 200,
    "data": [
        {
            "id": 1,
            "description": "description",
            "icon": "icon",
            "createdAt": "2017-11-09T07:09:21.000Z",
            "updatedAt": "2017-11-09T07:09:21.000Z"
        }
    ]
}
```

---

#### 添加我们的优势

##### 请求URL:
* ```/advantage/add```

##### 请求方法:
* POST

##### 参数:
|   参数名    | 必填 |  类型  | 说明 |
|-------------|------|--------|------|
| description | n    | string | 描述 |
| icon        | n    | string | 标签 |

##### 返回示例:
```json
{
    "status": 200,
    "data": "添加我们的优势成功"
}
```

---

#### 修改我们的优势

##### 请求URL:
* ```/advantage/edit/:id```

##### 请求方法:
* POST

##### 参数:
|   参数名    | 必填 |  类型  |     说明     |
|-------------|------|--------|--------------|
| id          | y    | int    | 我们的优势id |
| description | n    | string | 描述         |
| icon        | n    | string | 标签         |

##### 返回示例:
```json
{
    "status": 200,
    "data": "修改我们的优势成功"
}
```

---

#### 删除我们的优势

## ### 请求URL:
* ```/advantage/del/:id```

##### 请求方法:
* POST

##### 参数:
|   参数名    | 必填 |  类型  |     说明     |
|-------------|------|--------|--------------|
| id          | y    | int    | 我们的优势id |

##### 返回示例:
```json
{
    "status": 200,
    "data": "删除我们的优势成功"
}
```

---

### 友情链接相关

---

#### 获取友情链接信息

##### 请求URL:
* ```/link```

##### 请求方法:
* GET

##### 返回示例:
```json
{
    "status": 200,
    "data": [
        {
            "id": 1,
            "name": "google",
            "url": "https://www.google.com",
            "createdAt": "2017-11-09T07:18:23.000Z",
            "updatedAt": "2017-11-09T07:18:23.000Z"
        }
    ]
}
```

---

#### 添加友情链接

##### 请求URL:
* ```/advantage/add```

##### 请求方法:
* POST

##### 参数:
| 参数名 | 必填 |  类型  |     说明     |
|--------|------|--------|--------------|
| name   | y    | string | 友情链接名称 |
| url    | y    | string | 友情链接     |

##### 返回示例:
```json
{
    "status": 200,
    "data": "添加友情链接成功"
}
```

---

#### 修改友情链接

##### 请求URL:
* ```/link/edit/:id```

##### 请求方法:
* POST

##### 参数:
| 参数名 | 必填 |  类型  |     说明     |
|--------|------|--------|--------------|
| id     | y    | int    | 友情链接id   |
| name   | n    | string | 友情链接名称 |
| url    | n    | string | 友情链接     |


##### 返回示例:
```json
{
    "status": 200,
    "data": "修改友情链接成功"
}
```

---

#### 删除友情链接

##### 请求URL:
* ```/link/del/:id```

##### 请求方法:
* POST

##### 参数:
| 参数名 | 必填 |  类型  |     说明     |
|--------|------|--------|--------------|
| id     | y    | int    | 友情链接id   |

##### 返回示例:
```json
{
    "status": 200,
    "data": "删除友情链接成功"
}
```

---

### 产品与服务相关

---

#### 获取产品分类

##### 请求URL:
* ```/classify/:currentPage```

##### 请求方法:
* GET

##### 参数:
|   参数名    | 必填 |  类型  |     说明     |
|-------------|------|--------|--------------|
| currentPage | y    | int    | 当前页码     |
| name        | n    | string | 产品分类名称 |

##### 返回示例:
```json
{
    "status": 200,
    "data": {
        "count": 1,
        "rows": [
            {
                "id": 1,
                "name": "name",
                "classifyUrl": "/images/classify/111280.jpg",
                "description": "description",
                "createdAt": "2017-11-09T07:27:19.000Z",
                "updatedAt": "2017-11-09T07:29:17.000Z"
            }
        ]
    }
}
```

##### 返回参数说明
|   参数名   |     说明     |
|------------|--------------|
| classifyUrl | 产品分类图片地址 |

---

#### 根据名称获取产品分类

##### 请求URL:
* ```/classify/getByName```

##### 请求方法:
* GET

##### 参数:
| 参数名 | 必填 | 类型 |   说明   |
|--------|------|------|----------|
| name   | y    | string  | 产品分类名称 |

##### 返回示例:
```json
{
    "status": 200,
    "data": {
        "id": 1,
        "name": "classify",
        "classifyUrl": null,
        "description": "i am classify",
        "createdAt": "2017-11-20T04:06:45.000Z",
        "updatedAt": "2017-11-20T04:06:45.000Z"
    }
}
```

##### 返回参数说明
|   参数名   |     说明     |
|------------|--------------|
| classifyUrl | 产品分类图片地址 |

---

#### 根据id获取产品分类

##### 请求URL:
* ```/classify/getById```

##### 请求方法:
* GET

##### 参数:
| 参数名 | 必填 | 类型 |    说明    |
|--------|------|------|------------|
| id     | y    | int  | 产品分类id |

##### 返回示例:
```json
{
    "status": 200,
    "data": {
        "id": 1,
        "name": "classify",
        "classifyUrl": null,
        "description": "i am classify",
        "createdAt": "2017-11-20T04:06:45.000Z",
        "updatedAt": "2017-11-20T04:06:45.000Z"
    }
}
```

##### 返回参数说明
|   参数名   |     说明     |
|------------|--------------|
| classifyUrl | 产品分类图片地址 |

---

#### 添加产品分类

##### 请求URL:
* ```/classify/add```

##### 请求方法:
* POST

##### 参数:
|   参数名    | 必填 |  类型  |      说明      |
|-------------|------|--------|----------------|
| name        | y    | string | 产品分类名称   |
| description | n    | string | 描述           |
| classifyUrl | n    | file   | 产品分类图文件 |

##### 返回示例:
```json
{
    "status": 200,
    "data": "添加产品分类成功"
}
```

---

#### 修改产品分类

##### 请求URL:
* ```/classify/edit/:id```

##### 请求方法:
* POST

##### 参数:
|   参数名    | 必填 |  类型  |      说明      |
|-------------|------|--------|----------------|
| id          | y    | int    | 产品分类id     |
| name        | y    | string | 产品分类名称   |
| description | n    | string | 描述           |
| classifyUrl | n    | file   | 产品分类图文件 |

##### 返回示例:
```json
{
    "status": 200,
    "data": "修改产品分类成功"
}
```

---

#### 删除产品分类

##### 请求URL:
* ```/classify/del/:id```

##### 请求方法:
* POST

##### 参数:
|   参数名    | 必填 |  类型  |      说明      |
|-------------|------|--------|----------------|
| id          | y    | int    | 产品分类id     |

##### 返回示例:
```json
{
    "status": 200,
    "data": "删除产品分类成功"
}
```

---

#### 获取产品

##### 请求URL:
* ```/product/:ClassifyId/:currentPage```

##### 请求方法:
* GET

##### 参数:
|   参数名    | 必填 |  类型  |    说明    |
|-------------|------|--------|------------|
| ClassifyId  | y    | int    | 所属分类id |
| currentPage | y    | int    | 当前页码   |
| name        | n    | string | 产品名称   |

##### 返回示例:
```json
{
    "status": 200,
    "data": {
        "count": 1,
        "rows": [
            {
                "id": 1,
                "name": "name",
                "productUrl": "/images/product/114932.jpg",
                "createdAt": "2017-11-09T07:34:38.000Z",
                "updatedAt": "2017-11-09T07:36:28.000Z",
                "ClassifyId": 2
            }
        ]
    }
}
```

##### 返回参数说明
|   参数名   |     说明     |
|------------|--------------|
| productUrl | 产品图片地址 |
| ClassifyId | 所属类型id   |

---

#### 根据名称获取产品

##### 请求URL:
* ```/product/getByName```

##### 请求方法:
* GET

##### 参数:
| 参数名 | 必填 |  类型  |   说明   |
|--------|------|--------|----------|
| name   | y    | string | 产品名称 |

##### 返回示例:
```json
{
    "status": 200,
    "data": {
        "id": 1,
        "name": "product",
        "productUrl": null,
        "createdAt": "2017-11-20T04:20:16.000Z",
        "updatedAt": "2017-11-20T04:20:16.000Z",
        "ClassifyId": 1
    }
}
```

##### 返回参数说明
|   参数名   |     说明     |
|------------|--------------|
| productUrl | 产品图片地址 |
| ClassifyId | 所属类型id   |

---

#### 根据id获取产品

##### 请求URL:
* ```/product/getById```

##### 请求方法:
* GET

##### 参数:
| 参数名 | 必填 | 类型 |  说明  |
|--------|------|------|--------|
| id     | y    | int  | 产品id |

##### 返回示例:
```json
{
    "status": 200,
    "data": {
        "id": 1,
        "name": "product",
        "productUrl": null,
        "createdAt": "2017-11-20T04:20:16.000Z",
        "updatedAt": "2017-11-20T04:20:16.000Z",
        "ClassifyId": 1
    }
}
```

##### 返回参数说明
|   参数名   |     说明     |
|------------|--------------|
| productUrl | 产品图片地址 |
| ClassifyId | 所属类型id   |

---

#### 添加产品

##### 请求URL:
* ```/product/add/:ClassifyId```

##### 请求方法:
* POST

##### 参数:
|   参数名   | 必填 |  类型  |    说明    |
|------------|------|--------|------------|
| ClassifyId | y    | int    | 所属分类id |
| name       | y    | string | 产品名称   |
| productUrl | n    | file   | 产品图文件 |

##### 返回示例:
```json
{
    "status": 200,
    "data": "添加产品成功"
}
```

---

#### 修改产品

##### 请求URL:
* ```/product/edit/:id```

##### 请求方法:
* POST

##### 参数:
|   参数名   | 必填 |  类型  |    说明    |
|------------|------|--------|------------|
| id         | y    | int    | 产品id     |
| name       | y    | string | 产品名称   |
| productUrl | n    | file   | 产品图文件 |

##### 返回示例:
```json
{
    "status": 200,
    "data": "修改产品成功"
}
```

---

#### 删除产品

##### 请求URL:
* ```/product/del/:id```

##### 请求方法:
* POST

##### 参数:
|   参数名   | 必填 |  类型  |    说明    |
|------------|------|--------|------------|
| id         | y    | int    | 产品id     |

##### 返回示例:
```json
{
    "status": 200,
    "data": "删除产品成功"
}
```

---

#### 获取内容块

##### 请求URL:
* ```/content/:ProductId```

##### 请求方法:
* GET

##### 参数:
|   参数名    | 必填 | 类型 |    说明    |
|-------------|------|------|------------|
| ProductId   | y    | int  | 所属产品id |

##### 返回示例:
```json
{
    "status": 200,
    "data": {
        "count": 1,
        "rows": [
            {
                "id": 1,
                "title": "title",
                "contentUrl": "/images/content/114932.jpg",
                "description": "description",
                "sort": 1,
                "createdAt": "2017-11-09T07:41:10.000Z",
                "updatedAt": "2017-11-09T07:41:10.000Z",
                "ProductId": 2
            }
        ]
    }
}
```

##### 返回参数说明
|   参数名   |      说明      |
|------------|----------------|
| contentUrl | 内容块图片地址 |
| sort       | 排序标识       |
| ProductId  | 所属产品id     |

---

#### 添加内容块

##### 请求URL:
* ```/content/add/:ProductId```

##### 请求方法:
* POST

##### 参数:
|   参数名    | 必填 |  类型  |     说明     |
|-------------|------|--------|--------------|
| ProductId   | y    | int    | 所属产品id   |
| title       | y    | string | 内容块标题     |
| description | n    | string | 描述         |
| contentUrl  | n    | file   | 内容块图文件 |

##### 返回示例:
```json
{
    "status": 200,
    "data": "添加内容块成功"
}
```

---

#### 修改内容块

##### 请求URL:
* ```/content/edit/:id```

##### 请求方法:
* POST

##### 参数:
|   参数名   | 必填 |  类型  |    说明    |
|------------|------|--------|------------|
| id         | y    | int    | 产品id     |
| title       | y    | string | 内容块标题     |
| description | n    | string | 描述         |
| contentUrl  | n    | file   | 内容块图文件 |

##### 返回示例:
```json
{
    "status": 200,
    "data": "修改内容块成功"
}
```

---

#### 删除内容块

##### 请求URL:
* ```/content/del/:id```

##### 请求方法:
* POST

##### 参数:
| 参数名 | 必填 | 类型 |   说明   |
|--------|------|------|----------|
| id     | y    | int  | 内容块id |

##### 返回示例:
```json
{
    "status": 200,
    "data": "删除内容块成功"
}
```

---

#### 调整内容块

##### 请求URL:
* ```/content/change```

##### 请求方法:
* POST

##### 参数:
| 参数名 | 必填 |  类型 |          说明          |
|--------|------|-------|------------------------|
| change | y    | array | 内容块改变顺序后id数组 |

##### 返回示例:
```json
{
    "status": 200,
    "data": "顺序交换成功"
}
```

---

### 公司简闻相关

---

#### 获取公司简闻

##### 请求URL:
* ```/introduction```

##### 请求方法:
* GET

##### 返回示例:
```json
{
    "status": 200,
    "data": {
        "count": 1,
        "rows": [
            {
                "id": 1,
                "description": "hello",
                "imageUrl": "/images/introduction/111280.jpg",
                "createdAt": "2017-11-09T08:07:17.000Z",
                "updatedAt": "2017-11-09T08:08:49.000Z"
            }
        ]
    }
}
```

##### 返回参数说明
|   参数名   |     说明     |
|------------|--------------|
| imageUrl | 公司简闻图片地址 |

---

#### 添加公司简闻

##### 请求URL:
* ```/introduction/add```

##### 请求方法:
* POST

##### 参数:
|   参数名    | 必填 |  类型  |       说明       |
|-------------|------|--------|------------------|
| description | n    | string | 描述             |
| imageUrl    | n    | file   | 公司简闻图片文件 |

##### 返回示例:
```json
{
    "status": 200,
    "data": "添加公司简闻成功"
}
```

---

#### 修改公司简闻

##### 请求URL:
* ```/introduction/edit/:id```

##### 请求方法:
* POST

##### 参数:
|   参数名    | 必填 |  类型  |       说明       |
|-------------|------|--------|------------------|
| id          | y    | int    | 公司简闻id       |
| description | n    | string | 描述             |
| imageUrl    | n    | file   | 公司简闻图片文件 |

##### 返回示例:
```json
{
    "status": 200,
    "data": "修改公司简闻成功"
}
```

---

#### 删除公司简闻

##### 请求URL:
* ```/introduction/del/:id```

##### 请求方法:
* POST

##### 参数:
|   参数名    | 必填 |  类型  |       说明       |
|-------------|------|--------|------------------|
| id          | y    | int    | 公司简闻id       |

##### 返回示例:
```json
{
    "status": 200,
    "data": "删除公司简闻成功"
}
```

---

### 网站访问数据相关

---

#### 获取网站访问数据

##### 请求URL:
* ```/visitor/:currentPage```

##### 请求方法:
* GET

##### 参数:
|   参数名    | 必填 |  类型  |                     说明                     |
|-------------|------|--------|----------------------------------------------|
| currentPage | y    | int    | 当前页码                                     |
| ip          | n    | string | ip                                           |
| city        | n    | string | 城市                                         |
| cap         | n    | string | 结束时间`格式为 20171109 && 与floor成对出现` |
| floor       | n    | string | 开始时间`不得超过结束时间 && 与cap成对出现`  |

```json
{
    "cap":"20171121",
    "floor":"20171119"
}
```

##### 返回示例:
```json
{
    "status": 200,
    "data": {
        "count": 2,
        "rows": [
            {
                "id": 8,
                "ip": "678",
                "province": "hunan",
                "city": "changsha",
                "device": "iphone",
                "type": 1,
                "createdAt": "2017-11-22T03:35:30.000Z",
                "updatedAt": "2017-11-22T03:35:30.000Z",
                "updated": "2017-11-22T03:35:30.000Z",
                "ipCount": 1
            },
            {
                "id": 2,
                "ip": "345",
                "province": "guangdong",
                "city": "guangzhou",
                "device": "iphone",
                "type": 2,
                "createdAt": "2017-11-21T03:47:54.000Z",
                "updatedAt": "2017-11-21T03:47:54.000Z",
                "updated": "2017-11-21T06:29:59.000Z",
                "ipCount": 6
            }
        ]
    }
}
```

##### 返回参数说明
| 参数名  |             说明            |
|---------|-----------------------------|
| type    | 1代表pc,2代表手机,3代表平板 |
| updated | ip访问最新时间              |
| ipCount | ip访问总次数                |

---

#### 添加访客信息

##### 请求URL:
* ```/visitor/add```

##### 请求方法:
* POST

##### 参数:
|  参数名  | 必填 |  类型  |             说明            |
|----------|------|--------|-----------------------------|
| ip       | y    | string | 访客ip                      |
| province | y    | string | 省份                        |
| city     | y    | string | 城市                        |
| device   | y    | string | 设备名称                    |
| type     | y    | int    | 1代表pc,2代表手机,3代表平板 |

##### 返回示例:
```json
{
    "status": 200,
    "data": "删除公司简闻成功"
}
```

---

#### 按时间段查询访客量

##### 请求URL:
* ```/visitor/interval```

##### 请求方法:
* POST

##### 参数:
| 参数名 | 必填 |  类型  |            说明            |
|--------|------|--------|----------------------------|
| cap    | n    | string | 结束时间`格式为 20171109` |
| floor  | n    | string | 开始时间`不得超过结束时间` |

```json
{
    "cap":"20171121",
    "floor":"20171119"
}
```

##### 返回示例:
```json
{
    "status": 200,
    "data": [
        0,
        0,
        7
    ]
}
```

---

#### 获取访问设备类型信息

##### 请求URL:
* ```/visitor/device```

##### 请求方法:
* GET

##### 返回示例:
```json
{
    "status": 200,
    "data": {
        "pc": 0,
        "phone": 1,
        "ipad": 0
    }
}
```

---

#### 获取访问城市信息

##### 请求URL:
* ```/visitor/city```

##### 请求方法:
* GET

##### 返回示例:
```json
{
    "status": 200,
    "data": [
        {
            "name": "广州",
            "value": 1
        }
    ]
}
```

---

#### 获取指定ip访问数量

##### 请求URL:
* ```/visitor/count/:ip```

##### 请求方法:
* GET

##### 参数:
| 参数名 | 必填 |  类型  |  说明  |
|--------|------|--------|--------|
| ip     | y    | string | 访客ip |

##### 返回示例:
```json
{
    "status": 200,
    "data": 1
}
```

---

### 网站搜索相关

#### 获取指定类型数据

##### 请求URL:
* ```/search```

##### 请求方法:
* GET

##### 参数:
| 参数名  | 必填 |  类型  |                          说明                          |
|---------|------|--------|--------------------------------------------------------|
| type    | n    | string | "1"代表产品分类,"2"代表产品,"3"代表简闻,不传则全部搜索 |
| content | y    | string | 搜索匹配内容                                                       |

##### 返回示例:
```json
{
    "status": 200,
    "data": [
        {
            "id": 1,
            "name": "classify",
            "classifyUrl": null,
            "description": "i am classify",
            "createdAt": "2017-11-20T04:06:45.000Z",
            "updatedAt": "2017-11-20T04:06:45.000Z",
            "model": "classify"
        },
        {
            "id": 1,
            "name": "product",
            "productUrl": null,
            "createdAt": "2017-11-20T04:20:16.000Z",
            "updatedAt": "2017-11-20T04:20:16.000Z",
            "ClassifyId": 1,
            "model": "product"
        }
    ]
}
```

##### 返回参数说明
| 参数名  |                            说明                           |
|---------|-----------------------------------------------------------|
| model   | classify代表产品分类,product代表产品,introduction代表简闻 |