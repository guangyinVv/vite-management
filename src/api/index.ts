// 登录功能的相关接口API
import request from '@/utils/request'
// 统一泛型
interface ManageResult<T> {
  data: {
    code: number
    data: T
    message: string
  }
}
type PromiseRes<T> = Promise<ManageResult<T>>
// 登录需要的账号密码
interface LoginData {
  username: string
  password: string
}
// 登录后的返回信息
interface LoginRes {
  token: string
  tokenHead: string
}
// 获取用户信息后的返回信息
export interface MenuType {
  createTime: string
  hidden: number
  icon: 'string'
  id: number
  level: number
  name: string
  parentId: number
  sort: number
  title: string
  children?: MenuType[]
}
interface AdminInfoRes {
  menus: MenuType[]
}

/**
 * 登录接口
 * @param data
 * @returns
 */
export const adminLogin = (data: LoginData): PromiseRes<LoginRes> => {
  return request.post('/admin/login', data)
}
export const getAdminInfo = (): PromiseRes<AdminInfoRes> => {
  return request.get('/admin/info')
}
