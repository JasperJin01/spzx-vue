import request from '@/utils/request'

export const GetSysUserListByPage = (queryDto, page, limit) => {
  return request({
    url: `/admin/system/sysUser/getSysUserListByPage/${page}/${limit}`,
    method: 'get',
    params: queryDto,
  })
}


// 修改
export const UpdateSysUser = (sysUser) => {
  return request({
    url: `/admin/system/sysUser/updateSysUser`,
    method: 'put',
    data: sysUser,
  })
}

export const AddSysUser = (sysUser) => {
  return request({
    url: `/admin/system/sysUser/addSysUser`,
    method: 'post',
    data: sysUser,
  })
}

export const DeleteSysUserById = (id) => {
  return request({
    url: `/admin/system/sysUser/deleteSysUserById/${id}`,
    method: 'delete',
  })
}
