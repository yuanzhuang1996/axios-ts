# 基于提示的封装
### 使用方法
```
export const home =()=>{
  // unknown 传递参数的类型  string 返回的数据类型
  return http.get<unknown,string>('/api/article')
}
```