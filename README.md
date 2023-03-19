# Autofocus Nest 泛用模板框架

## 介绍

基于 [Nest](https://github.com/nestjs/nest) 框架进行二次开发的通用后端框架，分为业务、鉴权、运维等核心模块

## 安装

```bash
$ npm install
```

## 环境

```bash
# 请在项目根目录新建文件 .env

# 运行配置
PORT="[运行端口]"

# Mysql数据库配置
# 请参考实际使用邮箱以及nodemailer官方文档修改配置和ops/mail/mail.service.ts
SQL_HOST="[数据库主机地址]"
SQL_PORT="[数据库端口]"
SQL_BASE="[数据库名]"

SQL_USER='[数据库用户名]'
SQL_PASS='[数据库密码]'

# 邮箱配置
MAIL_SERVICE= '[邮箱供应商服务]'
MAIL_USER='[邮箱号]'
MAIL_PASS='[邮箱密码]'
```

## 运行

````bash
# 启动
$ npm run start

# 热重载
$ npm run start:dev
````

## 架构

````bash
# 程序入口
src/app.module.ts

# 业务
app/[下属各模块]

# 运维
# 日志模块 用于记录系统以及运行情况，日志打印为定时输出和事件触发输出
ops/log/

# 邮件模块 日志可以通过此发送至运维者，同时还提供邮件分发功能
ops/mail/
