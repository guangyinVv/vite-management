// 用户名
export const validateUsername = (rule: any, value: string | undefined, callback: (msg?: string) => void) => {
  if (!value) {
    callback('请输入用户名')
  } else {
    // 用户名长度在5-16之间
    if (!/^[A-Za-z0-9_]{4,16}$/.exec(value)) {
      callback('用户名长度应在4-16之间，不包含不合法字符')
    }
    callback()
  }
}
export const validatePassword = (rule: any, value: string | undefined, callback: (msg?: string) => void) => {
  if (!value) {
    callback('请输入密码')
  } else {
    // 密码长度在6-16之间
    if (!/^[A-Za-z0-9_]{6,16}$/.exec(value)) {
      callback('密码长度应在6-16之间，不包含不合法字符')
    }
    callback()
  }
}
