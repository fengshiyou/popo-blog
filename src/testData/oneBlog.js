{
    "url": "https://api.github.com/repos/axuebin/articles/issues/26",
    "repository_url": "https://api.github.com/repos/axuebin/articles",
    "labels_url": "https://api.github.com/repos/axuebin/articles/issues/26/labels{/name}",
    "comments_url": "https://api.github.com/repos/axuebin/articles/issues/26/comments",
    "events_url": "https://api.github.com/repos/axuebin/articles/issues/26/events",
    "html_url": "https://github.com/axuebin/articles/issues/26",
    "id": 300506283,
    "number": 26,
    "title": "JavaScript复制内容到剪贴板",
    "user": {
    "login": "axuebin",
        "id": 13316392,
        "avatar_url": "https://avatars0.githubusercontent.com/u/13316392?v=4",
        "gravatar_id": "",
        "url": "https://api.github.com/users/axuebin",
        "html_url": "https://github.com/axuebin",
        "followers_url": "https://api.github.com/users/axuebin/followers",
        "following_url": "https://api.github.com/users/axuebin/following{/other_user}",
        "gists_url": "https://api.github.com/users/axuebin/gists{/gist_id}",
        "starred_url": "https://api.github.com/users/axuebin/starred{/owner}{/repo}",
        "subscriptions_url": "https://api.github.com/users/axuebin/subscriptions",
        "organizations_url": "https://api.github.com/users/axuebin/orgs",
        "repos_url": "https://api.github.com/users/axuebin/repos",
        "events_url": "https://api.github.com/users/axuebin/events{/privacy}",
        "received_events_url": "https://api.github.com/users/axuebin/received_events",
        "type": "User",
        "site_admin": false
},
    "labels": [
    {
        "id": 720884127,
        "url": "https://api.github.com/repos/axuebin/articles/labels/JavaScript",
        "name": "JavaScript",
        "color": "ff9900",
        "default": false
    },
    {
        "id": 720882955,
        "url": "https://api.github.com/repos/axuebin/articles/labels/blog",
        "name": "blog",
        "color": "0052cc",
        "default": false
    },
    {
        "id": 720884524,
        "url": "https://api.github.com/repos/axuebin/articles/labels/%E5%89%8D%E7%AB%AF",
        "name": "前端",
        "color": "d93f0b",
        "default": false
    }
],
    "state": "open",
    "locked": false,
    "assignee": null,
    "assignees": [

],
    "milestone": null,
    "comments": 1,
    "created_at": "2018-02-27T06:16:18Z",
    "updated_at": "2018-03-07T03:53:43Z",
    "closed_at": null,
    "author_association": "OWNER",
    "body": "最近一个活动页面中有一个小需求，用户点击或者长按就可以复制内容到剪贴板，记录一下实现过程和遇到的坑。\r\n\r\n## 常见方法\r\n\r\n查了一下万能的Google，现在常见的方法主要是以下两种：\r\n\r\n- 第三方库：clipboard.js\r\n- 原生方法：document.execCommand()\r\n\r\n分别来看看这两种方法是如何使用的。\r\n\r\n## clipboard.js\r\n\r\n这是clipboard的官网：[https://clipboardjs.com/](https://clipboardjs.com/)，看起来就是这么的简单。\r\n\r\n### 引用\r\n\r\n直接引用： `<script src=\"dist/clipboard.min.js\"></script>`\r\n\r\n包： `npm install clipboard --save` ，然后 `import Clipboard from 'clipboard';`\r\n\r\n### 使用\r\n\r\n#### 从输入框复制\r\n\r\n现在页面上有一个 `<input>` 标签，我们需要复制其中的内容，我们可以这样做：\r\n\r\n```html\r\n<input id=\"demoInput\" value=\"hello world\">\r\n<button class=\"btn\" data-clipboard-target=\"#demoInput\">点我复制</button>\r\n```\r\n\r\n```javascript\r\nimport Clipboard from 'clipboard';\r\nconst btnCopy = new Clipboard('btn');\r\n```\r\n\r\n注意到，在 `<button>` 标签中添加了一个 `data-clipboard-target` 属性，它的值是需要复制的 `<input>` 的 `id`，顾名思义是从整个标签中复制内容。\r\n\r\n#### 直接复制\r\n\r\n有的时候，我们并不希望从 `<input>` 中复制内容，仅仅是直接从变量中取值。如果在 `Vue` 中我们可以这样做：\r\n\r\n```html\r\n<button class=\"btn\" :data-clipboard-text=\"copyValue\">点我复制</button>\r\n``` \r\n\r\n```javascript\r\nimport Clipboard from 'clipboard';\r\nconst btnCopy = new Clipboard('btn');\r\nthis.copyValue = 'hello world';\r\n```\r\n\r\n#### 事件\r\n\r\n有的时候我们需要在复制后做一些事情，这时候就需要回调函数的支持。\r\n\r\n在处理函数中加入以下代码：\r\n\r\n```javascript\r\n// 复制成功后执行的回调函数\r\nclipboard.on('success', function(e) {\r\n    console.info('Action:', e.action); // 动作名称，比如：Action: copy\r\n    console.info('Text:', e.text); // 内容，比如：Text：hello word\r\n    console.info('Trigger:', e.trigger); // 触发元素：比如：<button class=\"btn\" :data-clipboard-text=\"copyValue\">点我复制</button>\r\n    e.clearSelection(); // 清除选中内容\r\n});\r\n\r\n// 复制失败后执行的回调函数\r\nclipboard.on('error', function(e) {\r\n    console.error('Action:', e.action);\r\n    console.error('Trigger:', e.trigger);\r\n});\r\n```\r\n\r\n### 小结\r\n\r\n文档中还提到，如果在单页面中使用 `clipboard` ，为了使得生命周期管理更加的优雅，在使用完之后记得 `btn.destroy()` 销毁一下。\r\n\r\n`clipboard` 使用起来是不是很简单。但是，就为了一个 `copy` 功能就使用额外的第三方库是不是不够优雅，这时候该怎么办？那就用原生方法实现呗。\r\n\r\n## document.execCommand()方法\r\n\r\n先看看这个方法在 `MDN` 上是怎么定义的：\r\n\r\n> which allows one to run commands to manipulate the contents of the editable region.\r\n\r\n意思就是可以允许运行命令来操作可编辑区域的内容，注意，是**可编辑区域**。\r\n\r\n### 定义\r\n\r\n> bool = document.execCommand(aCommandName, aShowDefaultUI, aValueArgument)\r\n\r\n方法返回一个 `Boolean` 值，表示操作是否成功。\r\n\r\n- `aCommandName` ：表示命令名称，比如： `copy`, `cut` 等（更多命令见[命令](https://developer.mozilla.org/en-US/docs/Web/API/Document/execCommand#%E5%91%BD%E4%BB%A4)）；\r\n- `aShowDefaultUI`：是否展示用户界面，一般情况下都是 `false`；\r\n- `aValueArgument`：有些命令需要额外的参数，一般用不到；\r\n\r\n### 兼容性\r\n\r\n这个方法在之前的兼容性其实是不太好的，但是好在现在已经基本兼容所有主流浏览器了，在移动端也可以使用。\r\n\r\n![兼容性](http://omufjr5bv.bkt.clouddn.com/execCommand.png)\r\n\r\n### 使用\r\n\r\n#### 从输入框复制\r\n\r\n现在页面上有一个 `<input>` 标签，我们想要复制其中的内容，我们可以这样做：\r\n\r\n```html\r\n<input id=\"demoInput\" value=\"hello world\">\r\n<button id=\"btn\">点我复制</button>\r\n```\r\n\r\n```javascript\r\nconst btn = document.querySelector('#btn');\r\nbtn.addEventListener('click', () => {\r\n\tconst input = document.querySelector('#demoInput');\r\n\tinput.select();\r\n\tif (document.execCommand('copy')) {\r\n\t\tdocument.execCommand('copy');\r\n\t\tconsole.log('复制成功');\r\n\t}\r\n})\r\n```\r\n\r\n#### 其它地方复制\r\n\r\n有的时候页面上并没有 `<input>` 标签，我们可能需要从一个 `<div>` 中复制内容，或者直接复制变量。\r\n\r\n还记得在 `execCommand()` 方法的定义中提到，它只能操作**可编辑区域**，也就是意味着除了 `<input>`、`<textarea>` 这样的输入域以外，是无法使用这个方法的。\r\n\r\n这时候我们需要曲线救国。\r\n\r\n```html\r\n<button id=\"btn\">点我复制</button>\r\n```\r\n\r\n```javascript\r\nconst btn = document.querySelector('#btn');\r\nbtn.addEventListener('click',() => {\r\n\tconst input = document.createElement('input');\r\n\tdocument.body.appendChild(input);\r\n \tinput.setAttribute('value', '听说你想复制我');\r\n\tinput.select();\r\n\tif (document.execCommand('copy')) {\r\n\t\tdocument.execCommand('copy');\r\n\t\tconsole.log('复制成功');\r\n\t}\r\n    document.body.removeChild(input);\r\n})\r\n```\r\n\r\n算是曲线救国成功了吧。在使用这个方法时，遇到了几个坑。\r\n\r\n#### 遇到的坑\r\n\r\n在Chrome下调试的时候，这个方法时完美运行的。然后到了移动端调试的时候，坑就出来了。\r\n\r\n对，没错，就是你，ios。。。\r\n\r\n1. 点击复制时屏幕下方会出现白屏抖动，仔细看是拉起键盘又瞬间收起\r\n\r\n\t知道了抖动是由于什么产生的就比较好解决了。既然是拉起键盘，那就是聚焦到了输入域，那只要让输入域不可输入就好了，在代码中添加 `input.setAttribute('readonly', 'readonly');` 使这个 `<input>` 是只读的，就不会拉起键盘了。\r\n\r\n2. 无法复制\r\n\r\n\t这个问题是由于 `input.select()` 在ios下并没有选中全部内容，我们需要使用另一个方法来选中内容，这个方法就是 `input.setSelectionRange(0, input.value.length);`。\r\n\t\r\n完整代码如下：\r\n\r\n```javascript\r\nconst btn = document.querySelector('#btn');\r\nbtn.addEventListener('click',() => {\r\n\tconst input = document.createElement('input');\r\n    input.setAttribute('readonly', 'readonly');\r\n    input.setAttribute('value', 'hello world');\r\n    document.body.appendChild(input);\r\n\tinput.setSelectionRange(0, 9999);\r\n\tif (document.execCommand('copy')) {\r\n\t\tdocument.execCommand('copy');\r\n\t\tconsole.log('复制成功');\r\n\t}\r\n    document.body.removeChild(input);\r\n})\r\n```\r\n\r\n## 总结\r\n\r\n以上就是关于JavaScript如何实现复制内容到剪贴板，附上几个链接：\r\n\r\n[execCommand MDN](https://developer.mozilla.org/en-US/docs/Web/API/Document/execCommand)\r\n\r\n[execCommand兼容性](https://caniuse.com/#search=execCommand)\r\n\r\n[clipboard.js](https://github.com/zenorocha/clipboard.js)",
    "closed_by": null
}
