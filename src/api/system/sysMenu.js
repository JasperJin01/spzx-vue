import request from '@/utils/request'

const api_name = '/admin/system/sysMenu'

// 分页列表
export const FindNodes = () => {
  return request({
    url: `${api_name}/findNodes`,
    method: 'get',
  })
}


export const UpdateSysMenu = (sysMenu) => {
  return request({
    url: `${api_name}/updateSysMenu`,
    method: 'put',
    data: sysMenu,
  })
}

export const AddSysMenu = (sysMenu) => {
  return request({
    url: `${api_name}/addSysMenu`,
    method: 'post',
    data: sysMenu,
  })
}