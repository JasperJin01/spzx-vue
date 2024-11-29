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

export const GetAllRoleList = (userId) => {
  return request({
    url: `/admin/system/sysRole/getAllRoleList/${userId}`,
    method: 'get',
  })
}

// 根据角色id，返回菜单树 和 角色拥有的菜单ids
export const GetSysMenuTreeIds = (roleId) => {
  return request({
    url: `/admin/system/sysRole/getSysMenuTreeIds/${roleId}`,
    method: 'get',
  })
}

export const AssignRoleMenu = (assignMenuDto) => {
  return request({
    url: `/admin/system/sysRoleMenu/assignMenuToRole`,
    method: 'post',
    data: assignMenuDto,
  })
}