import request from '@/utils/request'

export const GetSysRoleListByPage = (queryDto, page, limit) => {
  return request({
    url: `/admin/system/sysRole/getSysRoleListByPage/${page}/${limit}`,
    method: 'get',
    params: queryDto,
  })
}


// 修改
export const UpdateSysRole = (sysRole) => {
  return request({
    url: `/admin/system/sysRole/updateSysRole`,
    method: 'put',
    data: sysRole,
  })
}

export const AddSysRole = (sysRole) => {
  return request({
    url: `/admin/system/sysRole/addSysRole`,
    method: 'post',
    data: sysRole,
  })
}

export const DeleteSysRoleById = (id) => {
  return request({
    url: `/admin/system/sysRole/deleteSysRoleById/${id}`,
    method: 'delete',
  })
}