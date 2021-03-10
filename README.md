# vue3-cnode

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
