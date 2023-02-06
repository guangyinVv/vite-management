// 登录功能的相关接口API
import request from '@/utils/request'
import { anyObject } from '@/vite-env'
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
// 用户列表数据接口的参数类型
interface AdminListParams {
  keyword: string
  pageNum: number
  pageSize: number
}
/**
 * 登录接口
 * @param data
 * @returns
 */
export const adminLogin = (data: LoginData): PromiseRes<LoginRes> => {
  return request.post('/admin/login', data)
}
/**
 * 登录后获取的菜单数据
 * @returns
 */
export const getAdminInfo = (): PromiseRes<AdminInfoRes> => {
  return request.get('/admin/info')
}
// 用户列表数据类型
export interface TableType {
  id: number
  username: string
  nickName: string
  email: string
  createTime: string
  loginTime: string
  status: 1 | 0
}
/**
 * 获取用户列表数据
 * @param data
 * @returns
 */
export const getAdminLists = (data: AdminListParams): PromiseRes<{ list: TableType[] }> => {
  return request('/admin/list', { params: data })
}
