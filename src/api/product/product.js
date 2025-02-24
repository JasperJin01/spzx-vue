import request from '@/utils/request'

const prefix = '/admin/product/product'

// 分页列表
export const GetProductPageList = (page, limit, queryDto) => {
  return request({
    url: `${prefix}/${page}/${limit}`,
    method: 'get',
    params: queryDto,
  })
}


// 保存信息
export const SaveProduct = product => {
  return request({
    url: `${prefix}/save`,
    method: 'post',
    data: product,
  })
}

// 修改信息
export const UpdateProductById = product => {
  return request({
    url: `${prefix}/updateById`,
    method: 'put',
    data: product,
  })
}

// 根据id获取信息
export const GetProductById = id => {
  return request({
    url: `${prefix}/getById/${id}`,
    method: 'get',
  })
}


// 根据id删除商品
export const DeleteProductById = id => {
  return request({
    url: `${prefix}/deleteById/${id}`,
    method: 'delete',
  })
}


//审核
export const UpdateProductAuditStatus = (id, auditStatus) => {
  return request({
    url: `${prefix}/updateAuditStatus/${id}/${auditStatus}`,
    method: 'get',
  })
}

//上下架
export const UpdateProductStatus = (id, status) => {
  return request({
    url: `${prefix}/updateStatus/${id}/${status}`,
    method: 'get',
  })
}