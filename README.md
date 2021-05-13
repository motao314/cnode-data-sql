#kkb-cnodekkb-cnode

项目需求分析（成品/仿照品） -> 模块设计（架构图）-> 技术选型 -> 数据库设计(UML) -> 开发规范制定 -> 测试用例编写 -> 业务逻辑代码编写 -> apiDoc（api文档生成器）-> 部署(PM2)

## 项目选型

技术栈：
    - node
        - webserver: Koa2
        - 静态资源代理：koa-static-cache
        - 路由：koa-router
        - 正文数据解析：koa-body
        - 用户鉴权：jsonwebtoken
        - 数据库：mysql2
        - 其它各种自定义的中间件
    - TDD
        - mocha
        - supertest
    - mysql
    - doc
        - apidoc
    - pm2
开发规范：
    - 目录文件组织结构
    - 命名规范（命名语义化）【包括路径、文件夹、文件、代码、数据库】
TDD：
    - 测试驱动开发
        - 规范前后端接口开发
        - 减少错误
        - 减少沟通成本和开发时间（前后端根据具体的接口开发规范并行开发）


## 项目难点（亮点）

- 技术选型
    - 完成需求（解决问题）
    - 项目目的 
        - 针对某种技术的落地验证
            - 选择感兴趣的技术解决方案
        - 商用
            - 保证的稳定
- 项目规划（规范）

- code:
    - 10**: auth
    - 20**: user
    - 30**: article & category
    - 40**: reply
    
