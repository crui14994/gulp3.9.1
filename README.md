# gulp3.9.1

## 使用gulp工具构建前端项目（基于gulp版本3.9.1）

### 配置详情

1. 自动加载插件
2. 编译less  压缩合并css
3. es6转es5 压缩合并js
4. 删除dist目录下文件
5. 压缩image
6. 压缩html
7. 构建本地服务器 浏览器自动刷新  监听文件变化
> cnpm install -g gulp@3  全局安装gulp@3     
  cnpm install  安装依赖     
  gulp server 运行gulp工具     
  


### 问题
> gulp-babel编译时出现Cannot find module '@babel/core'

百度上找了一圈，一直在折腾babel-core，安装顺序也试了，一直不行。后来发现gulp-babel版本是8.x;
试着用webpack的解决方式，安装了7.x，然后就解决了。

```
cnpm install gulp-babel@7 --save-dev
```

> gulp-imagemin 

如果gulp-imagemin 报错，试着将版本降低4x，若还是出现throw er; // Unhandled 'error' event 的问题
试着用rebuild重新构建包

```
npm rebuild gulp-imagemin --save-dev
```
