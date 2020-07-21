import { param2Obj } from './utils'

const tokens = {
  admin: {
    token: 'admin-token'
  },
  editor: {
    token: 'editor-token'
  }
}

const users = {
  'admin-token': {
    roles: ['admin'],
    introduction: 'I am a super administrator',
    avatar: 'web/static/images/overview/heartlogo.jpg',
    name: 'Super Admin'
  },
  'editor-token': {
    roles: ['editor'],
    introduction: 'I am an editor',
    avatar: 'web/static/images/overview/heartlogo.jpg',
    name: 'Normal Editor'
  }
}

export default {
  login: res => {
    const { username } = JSON.parse(res.body)
    const data = tokens[username]

    if (data) {
      return {
        code: 200,
        data
      }
    }
    return {
      code: 60204,
      message: 'Account and password are incorrect.'
    }
  },
  getInfo: res => {
    const { token } = param2Obj(res.url)
    const info = users[token]

    if (info) {
      return {
        code: 200,
        data: token
        //data: info
      }
    }
  //return {
   // code: 50008,
   // message: 'Login failed, unable to get user details.'
 // }
    return {
      code: 200,
      data: token
    }
  },
  logout: () => {
    return {
      code: 200,
      data: 'success'
    }
  }
}
