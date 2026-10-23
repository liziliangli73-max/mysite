# 这个项目是什么

个人网站。纯静态，单文件，零依赖。

- 仓库：`git@github.com:liziliangli73-max/mysite.git`（本目录就是）
- 线上：https://liziliangli73-max.github.io/mysite/
- 子项目：`iphone17/` → https://liziliangli73-max.github.io/mysite/iphone17/

# 结构

```
index.html      ← 主站，约 86KB，CSS 和 JS 全部内联在这一个文件里
photos/         ← 9 张照片（已压缩到 1200px）
iphone17/       ← iPhone 17 三维拆解（Three.js，独立子项目）
```

**没有任何构建步骤。** 改完 `index.html` 直接推。

# 设计语言（重要，改之前先读）

风格是照着 **Apple 官网**学的：

- 标题 `font-weight: 600`，负字距（`letter-spacing: -0.02em` 起）
- **不要边框、不要阴影** —— 靠色块和留白分区
- 分区用交替的底色，不要用线条切
- 导航用 `backdrop-filter` 做毛玻璃
- 按钮/标签用**药丸形**（`border-radius: 980px`）
- 动效克制，`transition` 控制在 0.2–0.3s

配色：

```css
--paper:  #faf9f5   /* 暖纸色背景 */
--ink:    #1a1a17   /* 墨色文字 */
--jade:   #4b6f64   /* 青瓷绿，强调色，全文只用 2 处 */
--tint:   #f3f2ec   /* 暖灰，分区底色 */
```

**强调色克制**：全文只在学校那一行、诗句第二行用绿色。别乱加彩色。

# 多语言

中文直接写在 HTML 里，英文放 `data-en`，日文放 `data-ja`：

```html
<h1 data-en="Hello" data-ja="こんにちは">你好</h1>
```

- 图片的 lightbox 标题用 `data-cap-ja`
- 切换语言会触发 `langchange` 事件

**改文案时三种语言都要改。**

# 部署

```bash
git add -A && git commit -m "说明改了什么" && git push
```

推完 GitHub Pages 自动构建，**等 1–2 分钟**。

**验证必须加时间戳绕缓存**，否则会看到旧版本：

```bash
curl -s -o /dev/null -w "%{http_code} %{size_download}\n" \
  "https://liziliangli73-max.github.io/mysite/?v=$(date +%s)"
```

# 硬规矩

1. **不要引入任何外部依赖** —— 不加 CDN、不加框架、不加字体文件
2. **不要动个人信息区**：学校（河科职大 · 2024 级）、微信号（Bygone_verse）、邮箱
3. **改完必须验证**：线上返回 200，且文件体积有变化（说明真的推上去了）
4. **一次只改一件事**，改完让用户看，别连着堆一堆改动
5. 用户说"恢复"就是真的退回上一版，别自己发挥

# 另外两个站点（不在这个仓库里）

| 站点 | 位置 | 说明 |
|---|---|---|
| 主站 | 服务器 `/var/www/html/` | 手动部署的一份拷贝 |
| 副站 | 服务器 `/var/www/html/go/` | 已关闭（返回 410），文件保留 |

**这个仓库是源**，服务器上的那份是手动 scp 过去的。改完仓库记得同步服务器。
