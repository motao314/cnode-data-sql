define({ "api": [
  {
    "type": "GET",
    "url": "/article/:id",
    "title": "获取文章详情",
    "name": "getArticle",
    "group": "Article",
    "version": "0.1.0",
    "parameter": {
      "fields": {
        "params": [
          {
            "group": "params",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>文章ID</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>文章ID</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>文章标题</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "categoryId",
            "description": "<p>文章分类ID</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "isTop",
            "description": "<p>是否置顶（1=置顶，0=非置顶）</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "userId",
            "description": "<p>文章所属用户ID</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "viewCount",
            "description": "<p>文章点击次数</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "replyCount",
            "description": "<p>文章回复次数</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "createdAt",
            "description": "<p>文章发表时间</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>文章作者名称</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "avatar",
            "description": "<p>文章作者头像</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "content",
            "description": "<p>文章详情</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>业务逻辑错误码</p>"
          },
          {
            "group": "Error 4xx",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>业务逻辑错误描述</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "3011",
          "content": "HTTP/1.1 404 Not Found\n{\n    \"code\": 3011,\n    \"message\": \"文章不存在\"\n}",
          "type": "json"
        },
        {
          "title": "3012",
          "content": "HTTP/1.1 404 Not Found\n{\n    \"code\": 3012,\n    \"message\": \"文章内容不存在\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/controllers/article.js",
    "groupTitle": "Article",
    "sampleRequest": [
      {
        "url": "http://localhost:8888/api/article/:id"
      }
    ]
  },
  {
    "type": "GET",
    "url": "/articles",
    "title": "获取文章列表",
    "name": "getArticles",
    "group": "Article",
    "version": "0.1.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "categoryId",
            "description": "<p>文章分类ID</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "top",
            "description": "<p>是否为置顶文章（1=置顶，0=非置顶，注：与categoryId互斥，且优先级高于categoryId）</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "page",
            "defaultValue": "1",
            "description": "<p>当前页码数</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "limit",
            "defaultValue": "5",
            "description": "<p>每页显示数据条数</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "page",
            "description": "<p>当前页码数</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>每页显示数据条数</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "count",
            "description": "<p>总数据条数</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "pages",
            "description": "<p>总页码数</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "articles[]",
            "description": "<p>文章数组</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "articles.id",
            "description": "<p>文章ID</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "articles.title",
            "description": "<p>文章标题</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "articles.categoryId",
            "description": "<p>文章分类ID</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "articles.isTop",
            "description": "<p>是否置顶（1=置顶，0=非置顶）</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "articles.userId",
            "description": "<p>文章所属用户ID</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "articles.viewCount",
            "description": "<p>文章点击次数</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "articles.replyCount",
            "description": "<p>文章回复次数</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "articles.createdAt",
            "description": "<p>文章发表时间</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "articles.username",
            "description": "<p>文章作者名称</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "articles.avatar",
            "description": "<p>文章作者头像</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>业务逻辑错误码</p>"
          },
          {
            "group": "Error 4xx",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>业务逻辑错误描述</p>"
          }
        ]
      }
    },
    "filename": "src/controllers/article.js",
    "groupTitle": "Article",
    "sampleRequest": [
      {
        "url": "http://localhost:8888/api/articles"
      }
    ]
  },
  {
    "type": "PATCH",
    "url": "/article/:id/top",
    "title": "置顶设置",
    "name": "patchArticleTop",
    "group": "Article",
    "version": "0.1.0",
    "parameter": {
      "fields": {
        "params": [
          {
            "group": "params",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>文章ID</p>"
          }
        ],
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "isTop",
            "description": "<p>是否置顶（1=置顶，0=取消置顶）</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>文章</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>业务逻辑错误码</p>"
          },
          {
            "group": "Error 4xx",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>业务逻辑错误描述</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "3041",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"code\": 3041,\n    \"message\": \"缺少参数\"\n}",
          "type": "json"
        },
        {
          "title": "3042",
          "content": "HTTP/1.1 404 Not Found\n{\n    \"code\": 3042,\n    \"message\": \"文章不存在\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/controllers/article.js",
    "groupTitle": "Article",
    "sampleRequest": [
      {
        "url": "http://localhost:8888/api/article/:id/top"
      }
    ]
  },
  {
    "type": "PATCH",
    "url": "/article/:id/view_count",
    "title": "更新 viewCount",
    "name": "patchArticleViewCount",
    "group": "Article",
    "version": "0.1.0",
    "parameter": {
      "fields": {
        "params": [
          {
            "group": "params",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>文章ID</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>文章</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "viewCount",
            "description": "<p>文章当前查看总数</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>业务逻辑错误码</p>"
          },
          {
            "group": "Error 4xx",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>业务逻辑错误描述</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "3031",
          "content": "HTTP/1.1 404 Not Found\n{\n    \"code\": 3031,\n    \"message\": \"文章不存在\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/controllers/article.js",
    "groupTitle": "Article",
    "sampleRequest": [
      {
        "url": "http://localhost:8888/api/article/:id/view_count"
      }
    ]
  },
  {
    "type": "POST",
    "url": "/article",
    "title": "发布文章",
    "name": "postArticle",
    "group": "Article",
    "version": "0.1.0",
    "permission": [
      {
        "name": "User"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>用户登录授权 token</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "categoryId",
            "description": "<p>文章分类ID</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>文章标题</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "content",
            "description": "<p>文章内容</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>添加成功后的文章ID</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>业务逻辑错误码</p>"
          },
          {
            "group": "Error 4xx",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>业务逻辑错误描述</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "3021",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"code\": 3021,\n    \"message\": \"缺少参数\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/controllers/article.js",
    "groupTitle": "Article",
    "sampleRequest": [
      {
        "url": "http://localhost:8888/api/article"
      }
    ]
  },
  {
    "type": "POST",
    "url": "/auth/login",
    "title": "用户登录",
    "name": "AuthLogin",
    "group": "Auth",
    "version": "0.1.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>登录用户名</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>登录密码</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>用户id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>用户名</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "isAdmin",
            "description": "<p>是否为管理员 1=是，0=否</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "avatar",
            "description": "<p>用户头像</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "createdAt",
            "description": "<p>用户注册时间戳</p>"
          }
        ],
        "header": [
          {
            "group": "header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>登录成功后返回token</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>业务逻辑错误码</p>"
          },
          {
            "group": "Error 4xx",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>业务逻辑错误描述</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "1021",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"code\": 1021,\n    \"message\": \"登录用户名和密码不允许为空\"\n}",
          "type": "json"
        },
        {
          "title": "1022",
          "content": "HTTP/1.1 404 Not Found\n{\n    \"code\": 1022,\n    \"message\": \"用户不存在\"\n}",
          "type": "json"
        },
        {
          "title": "1023",
          "content": "HTTP/1.1 401 Unauthorized\n{\n    \"code\": 1023,\n    \"message\": \"密码错误\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/controllers/auth.js",
    "groupTitle": "Auth",
    "sampleRequest": [
      {
        "url": "http://localhost:8888/api/auth/login"
      }
    ]
  },
  {
    "type": "POST",
    "url": "/auth/register",
    "title": "用户注册",
    "name": "AuthRegister",
    "group": "Auth",
    "version": "0.1.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>登录用户名</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>登录密码</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "repassword",
            "description": "<p>重复密码</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>用户id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>用户名</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "createdAt",
            "description": "<p>注册时间戳</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>业务逻辑错误码</p>"
          },
          {
            "group": "Error 4xx",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>业务逻辑错误描述</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "1011",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"code\": 1011,\n    \"message\": \"注册用户名和密码不允许为空\"\n}",
          "type": "json"
        },
        {
          "title": "1012",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"code\": 1012,\n    \"message\": \"两次输入密码不一致\"\n}",
          "type": "json"
        },
        {
          "title": "1013",
          "content": "HTTP/1.1 409 CONFLICT\n{\n    \"code\": 1013,\n    \"message\": \"用户名已经被注册了\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/controllers/auth.js",
    "groupTitle": "Auth",
    "sampleRequest": [
      {
        "url": "http://localhost:8888/api/auth/register"
      }
    ]
  },
  {
    "type": "GET",
    "url": "/categories",
    "title": "获取分类列表",
    "name": "getCategories",
    "group": "Category",
    "version": "0.1.0",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>分类ID</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>分类名称</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "createdAt",
            "description": "<p>分类添加时间</p>"
          }
        ]
      }
    },
    "filename": "src/controllers/category.js",
    "groupTitle": "Category",
    "sampleRequest": [
      {
        "url": "http://localhost:8888/api/categories"
      }
    ]
  },
  {
    "type": "GET",
    "url": "/user/articles",
    "title": "获取指定用户创建的所有文章列表",
    "name": "getArticles",
    "group": "User",
    "version": "0.1.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "userId",
            "description": "<p>用户ID</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "page",
            "defaultValue": "1",
            "description": "<p>当前页码数</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "limit",
            "defaultValue": "5",
            "description": "<p>每页显示数据条数</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "page",
            "description": "<p>当前页码数</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>每页显示数据条数</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "count",
            "description": "<p>总数据条数</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "pages",
            "description": "<p>总页码数</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "articles[]",
            "description": "<p>文章数组</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "articles.id",
            "description": "<p>文章ID</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "articles.title",
            "description": "<p>文章标题</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "articles.categoryId",
            "description": "<p>文章分类ID</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "articles.isTop",
            "description": "<p>是否置顶（1=置顶，0=非置顶）</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "articles.userId",
            "description": "<p>文章所属用户ID</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "articles.viewCount",
            "description": "<p>文章点击次数</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "articles.replyCount",
            "description": "<p>文章回复次数</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "articles.createdAt",
            "description": "<p>文章发表时间</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "articles.username",
            "description": "<p>文章作者名称</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "articles.avatar",
            "description": "<p>文章作者头像</p>"
          }
        ]
      }
    },
    "filename": "src/controllers/user.js",
    "groupTitle": "User",
    "sampleRequest": [
      {
        "url": "http://localhost:8888/api/user/articles"
      }
    ]
  },
  {
    "type": "GET",
    "url": "/user/replies",
    "title": "获取指定用户参与的所有话题文章列表",
    "name": "getReplies",
    "group": "User",
    "version": "0.1.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "userId",
            "description": "<p>用户ID</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "page",
            "defaultValue": "1",
            "description": "<p>当前页码数</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "limit",
            "defaultValue": "5",
            "description": "<p>每页显示数据条数</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "page",
            "description": "<p>当前页码数</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>每页显示数据条数</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "count",
            "description": "<p>总数据条数</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "pages",
            "description": "<p>总页码数</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "articles[]",
            "description": "<p>文章数组</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "articles.id",
            "description": "<p>文章ID</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "articles.title",
            "description": "<p>文章标题</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "articles.userId",
            "description": "<p>文章所属用户ID</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "articles.viewCount",
            "description": "<p>文章点击次数</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "articles.replyCount",
            "description": "<p>文章回复次数</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "articles.createdAt",
            "description": "<p>文章发表时间</p>"
          }
        ]
      }
    },
    "filename": "src/controllers/user.js",
    "groupTitle": "User",
    "sampleRequest": [
      {
        "url": "http://localhost:8888/api/user/replies"
      }
    ]
  },
  {
    "type": "GET",
    "url": "/user/profile",
    "title": "获取用户基本信息",
    "name": "getUserProfile",
    "group": "User",
    "version": "0.1.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "type",
            "defaultValue": "0",
            "description": "<p>获取用户信息的查询字段类型，0=通过id获取，1=通过username获取</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "value",
            "description": "<p>获取用户信息的查询字段值</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>用户ID</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>用户名</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "avatar",
            "description": "<p>头像</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "createdAt",
            "description": "<p>注册时间</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "lastLoginedAt",
            "description": "<p>最后一次时间</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>业务逻辑错误码</p>"
          },
          {
            "group": "Error 4xx",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>业务逻辑错误描述</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "2011",
          "content": "HTTP/1.1 404 Not Found\n{\n    \"code\": 2011,\n    \"message\": \"用户不存在\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/controllers/user.js",
    "groupTitle": "User",
    "sampleRequest": [
      {
        "url": "http://localhost:8888/api/user/profile"
      }
    ]
  },
  {
    "type": "POST",
    "url": "/user/avatar",
    "title": "上传头像",
    "name": "postAvatar",
    "group": "User",
    "version": "0.1.0",
    "permission": [
      {
        "name": "User"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>用户登录授权 token</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>上传成功后的文件名</p>"
          }
        ]
      }
    },
    "filename": "src/controllers/user.js",
    "groupTitle": "User",
    "sampleRequest": [
      {
        "url": "http://localhost:8888/api/user/avatar"
      }
    ]
  },
  {
    "type": "GET",
    "url": "/replies",
    "title": "获取文章回复列表",
    "name": "getReplies",
    "group": "reply",
    "version": "0.1.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "articleId",
            "description": "<p>文章ID</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "page",
            "defaultValue": "1",
            "description": "<p>当前页码数</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "limit",
            "defaultValue": "5",
            "description": "<p>每页显示数据条数</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "page",
            "description": "<p>当前页码数</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>每页显示数据条数</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "count",
            "description": "<p>总数据条数</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "pages",
            "description": "<p>总页码数</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "replies[]",
            "description": "<p>回复数组</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "replies.id",
            "description": "<p>回复ID</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "replies.articleId",
            "description": "<p>被回复文章ID</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "replies.userId",
            "description": "<p>回复人ID</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "replies.content",
            "description": "<p>回复内容</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "replies.createdAt",
            "description": "<p>回复时间</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "replies.username",
            "description": "<p>回复人名称</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "replies.avatar",
            "description": "<p>回复人头像</p>"
          }
        ]
      }
    },
    "filename": "src/controllers/reply.js",
    "groupTitle": "reply",
    "sampleRequest": [
      {
        "url": "http://localhost:8888/api/replies"
      }
    ]
  },
  {
    "type": "POST",
    "url": "/reply",
    "title": "提交回复",
    "name": "postReply",
    "group": "reply",
    "version": "0.1.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "articleId",
            "description": "<p>文章ID</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "content",
            "description": "<p>回复内容</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>回复成功的ID</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>业务逻辑错误码</p>"
          },
          {
            "group": "Error 4xx",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>业务逻辑错误描述</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "4020",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"code\": 4020,\n    \"message\": \"参数错误\"\n}",
          "type": "json"
        },
        {
          "title": "4021",
          "content": "HTTP/1.1 404 Not Found\n{\n    \"code\": 4021,\n    \"message\": \"文章不存在\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/controllers/reply.js",
    "groupTitle": "reply",
    "sampleRequest": [
      {
        "url": "http://localhost:8888/api/reply"
      }
    ]
  }
] });
