import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

declare module '@neylorxt/react-request' {
  export interface RequestConfig extends AxiosRequestConfig {
    name: string;
    axios?: AxiosInstance;
  }

  export interface RequestResponse<T = any> extends AxiosResponse<T> {}

  export function useRequest<T = any>(): {
    loading: boolean;
    error: any;
    request: (config: RequestConfig) => Promise<RequestResponse<T>>;
  };
}
