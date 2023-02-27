import axios, { AxiosInstance,  AxiosResponse,  AxiosRequestConfig } from 'axios';

interface HttpConfig extends AxiosRequestConfig {
  hideLoading?: boolean; // 是否隐藏 loading，默认为 false
  showToast?: boolean; // 是否显示提示信息，默认为 true
}
/** 请求参数类型*/
type paramsType=object | null | unknown

class HttpClient {
  private http: AxiosInstance;
  constructor(baseURL?: string) {
    this.http = axios.create({
      baseURL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
    });

    this.http.interceptors.request.use((config:HttpConfig):any => {
      // 处理请求配置
      if (!config.hideLoading) {
        // 显示 loading
      }
      return config;
    }, (error) => {
      // 处理请求错误
      return Promise.reject(error);
    });

    this.http.interceptors.response.use((response:AxiosResponse) => {
      // 处理响应数据
      const { data,status } = response;
      if (status == 200) {
          // 显示成功提示信息
          return  data
      } else {
        return Promise.reject(new Error(response.toString()));
      }
    }, (error) => {
      // 处理响应错误
      if (!error.config.hideLoading) {
        // 隐藏 loading
      }
      // 显示错误提示信息
      return Promise.reject(error);
    });
  }

  public get<T extends paramsType, K>(url: string, params?: T, config?: HttpConfig): Promise<K> {
    return this.http.get(url, { params, ...config });
  }
  public post<T extends paramsType, K>(url: string, data?: T, config?: HttpConfig): Promise<K> {
    return this.http.post(url, data, config);
  }
  public put<T extends paramsType, K>(url: string, data?: T, config?: HttpConfig): Promise<K> {
    return this.http.put(url, data, config);
  }
  public delete<T extends object , K>(url: string, params: T, config?: HttpConfig): Promise<K> {
    return this.http.delete(url, { params, ...config });
  }
}


const http = new HttpClient(); // 创建一个全局的 axios 实例

export default http;