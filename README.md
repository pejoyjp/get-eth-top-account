# 使用说明：抓取以太坊大户地址的脚本


## 第一步：安装 Node.js

1. 前往 [Node.js 官网](https://nodejs.org/)。
2. 下载适合您操作系统的最新稳定版本。
3. 安装 Node.js，安装过程中选择默认设置即可。

安装完成后，通过以下命令验证安装是否成功：

```bash
node -v
npm -v
```

如果上述命令返回版本号，则表示安装成功。

## 第二步：安装依赖

1. 打开命令提示符或终端，导航到存放脚本的目录。
2. 运行以下命令初始化一个新的 Node.js 项目（如果还没有 `package.json` 文件）：

    ```bash
    npm init -y
    ```

3. 安装 Puppeteer 依赖：

    ```bash
    npm install puppeteer
    ```

## 第三步：使用脚本

1. 将脚本内容保存到一个文件中，例如 `scrape-addresses.js`。
2. 根据需要修改脚本中的 `startPage` 和 `endPage` 值，以指定要抓取的 Etherscan 页数范围：

    ```javascript
    const startPage = 90;  // 起始页
    const endPage = 100;   // 结束页
    ```

3. 运行脚本：

    ```bash
    node scrape-addresses.js
    ```

## 第四步：脚本执行和结果

- 脚本运行时，将会打开一个浏览器窗口（因为 `headless: false`），模拟用户访问 Etherscan 网站。
- 脚本会逐页访问指定范围内的页面，并抓取每页中的以太坊地址。
- 抓取的地址将保存在 `addresses.txt` 文件中，文件位于脚本所在的目录。

## 注意事项

- 由于脚本需要访问网络，请确保您的网络连接稳定。
- Puppeteer 默认会下载一个适用于 Chrome 的浏览器，确保您的磁盘有足够的空间。
- 如果 Etherscan 网站页面结构发生变化，可能需要修改脚本中的选择器，例如 `await page.waitForSelector('a.me-1 > span', { timeout: 20000 });` 和 `document.querySelectorAll('a.me-1 > span')`。

## 额外提示

- 如果需要无界面模式运行，请将 `headless: false` 修改为 `headless: true`。
- 为了避免被网站屏蔽，建议在每次请求之间增加延迟，例如使用 `await page.waitForTimeout(1000);` 添加 1 秒的延迟。
