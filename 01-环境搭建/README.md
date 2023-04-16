

# 环境搭建

## 创建存储库

## 制作 .devcontainer 开发容器

> [VSCode 开发容器文档](https://containers.dev/implementors/json_reference/)

内容详见 .devcontainer

## 安装TypeScript 

1. 安装 Node   -- nodejs.org
2. 安装Type Script拓展 -- `npm install -g typescript`

## 编译TS文件

使用最简单的方式 - `tsc index.ts`
指定输出目录 -- `tsc --outFile ./js/index.js index.ts`

## 运行单个TS文件

1. 先编译为js 在使用node运行
2. 使用插件运行

安装插件 ts-node -- `npm install -g ts-node`  
使用插件运行 -- `ts-node index.ts`


## 初始化

使用 `tsc --init` 初始化项目
使用 `npm init` 初始化项目