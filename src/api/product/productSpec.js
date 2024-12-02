import request from '@/utils/request'

const prefix = '/admin/product/productSpec'

// 分页列表
export const GetProductSpecPageList = (page, limit) => {
  return request({
    url: `${prefix}/${page}/${limit}`,
    method: 'get'
  })
}

// 修改信息
export const UpdateProductSpecById = productSpec => {
  return request({
    url: `${prefix}/updateById`,
    method: 'put',
    data: productSpec,
  })
}

// 保存信息
export const SaveProductSpec = productSpec => {
  return request({
    url: `${prefix}/save`,
    method: 'post',
    data: productSpec,
  })
}

export const FindAllProductSpec = () => {
  return request({
    url: `${prefix}/findAllProductSpec`,
    method: 'get'
  })
}