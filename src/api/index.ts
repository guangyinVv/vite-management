// 登录功能的相关接口API
import request from '@/utils/request'
import { anyObject } from '@/vite-env'
import { stringify } from 'querystring'
// 统一泛型
interface ManageResult<T = {}> {
  data: {
    code: number
    data: T
    message: string
  }
}
type PromiseRes<T = {}> = Promise<ManageResult<T>>
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
  password: string
  note: string
}
/**
 * 获取用户列表数据
 * @param data
 * @returns
 */
export const getAdminLists = (data: AdminListParams): PromiseRes<{ list: TableType[] }> => {
  return request('/admin/list', { params: data })
}
/**
// 更新用户列表界面的用户信息
 * 
 * @param data 
 * @returns 
 */
export const updateAdmin = (data: TableType): PromiseRes => {
  return request.post('/admin/update/' + data.id, data)
}
// 角色数据的类型
export interface RoleListType {
  id: number
  name: string
}
/**
 * 获取所有角色（管理员，超级管理员等）数据
 * @returns
 */
export const getAllRoleList = (): PromiseRes<RoleListType[]> => {
  return request.get('/role/listAll')
}
/**
 *
 * @param id 根据id获取用户当前的用户类型
 * @returns
 */
export const getAdminRoleById = (id: number): PromiseRes<RoleListType[]> => {
  return request.get('/admin/role/' + id)
}
/**
 * 更新用户类型
 * @param adminId
 * @param roleIds
 * @returns
 */
export const updateAdminRole = (adminId: number, roleIds: number[]): PromiseRes => {
  return request.post('/admin/role/update', null, { params: { adminId, roleIds: roleIds.join(',') } })
}
export const getAdminStat = (): PromiseRes<{ saleMap: anyObject[]; salePie: anyObject[] }> => {
  return request.get('http://kumanxuan1.f3322.net:8360/admin/stat')
}
