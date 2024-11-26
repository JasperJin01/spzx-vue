import request from '@/utils/request'

export const GetSysRoleListByPage = (queryDto, page, limit) => {
    return request({
      url: `/admin/system/sysRole/getSysRoleListByPage/${page}/${limit}`,
      method: 'get',
      params: queryDto
    })
  }