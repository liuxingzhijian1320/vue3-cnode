# vue3-cnode

node version : 14.5.0

## 访问地址

[demo 访问](http://cnode.zhooson.cn/#/index)

## Project setup

```
yarn install

yarn serve

yarn build
```

## vue3 的文档

[文档入口](https://www.vue3js.cn/docs/zh/)

## nginx.conf

```
    server {
        listen       80;
        server_name  cnode.zhooson.cn;
        access_log off;

        location / {
            root   /workspace/cnodejs/;
            index index.html index.htm;
		    try_files $uri $uri/ /index.html;
         }
    }

```

## 百度统计

下载后请 删除`public/index.html` 的统计代码


## 发布流程
把 dist/*， cnodejs-2312.js 的文件传入服务器
然后 npm init -y && npm i express -D && pm2 start cnodejs-2312.js
