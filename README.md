# frontend (Vite + React)

最简单的 Vite + React 项目，页面上会自动请求后端 `/api/hello`，显示连接是否成功。

## 本地运行

先启动[后端](../backend)（端口 8000），然后：

```bash
npm install
npm run dev
```

打开 http://localhost:5173 即可。开发服务器会把 `/api` 代理到 `http://localhost:8000`，所以不会跨域。

## 构建 & 本地预览

```bash
npm run build
npm run preview
```

`preview` 同样带 `/api` 代理，方便在上服务器前先本地验证「生产构建 + 后端」是否通。

## 部署到服务器

两种最简单的方式，任选其一：

1. **同域名反向代理（推荐）**
   用 Nginx 托管 `dist/`，并把 `/api/` 反代到 FastAPI：

   ```nginx
   server {
     listen 80;
     root /var/www/frontend/dist;
     index index.html;

     location / {
       try_files $uri $uri/ /index.html;
     }

     location /api/ {
       proxy_pass http://127.0.0.1:8000;
       proxy_set_header Host $host;
     }
   }
   ```

   这种方式前端不用改任何配置，相对路径 `/api` 直接能用。

2. **前后端分开部署（不同端口/域名）**
   构建时指定后端地址，后端已开启 CORS：

   ```bash
   VITE_API_BASE_URL=http://<服务器IP>:8000/api npm run build
   ```

   > 注意：Vite 的环境变量是**构建时**写入的，改地址后需要重新 build。
