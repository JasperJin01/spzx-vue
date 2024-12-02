import request from '@/utils/request'

const prefix = '/admin/product/brand'

// 分页列表
export const GetBrandPageList = (page, limit) => {
  return request({
    url: `${prefix}/${page}/${limit}`,
    method: 'get'
  })
}

// 保存品牌
export const SaveBrand = brand => {
  return request({
    url: `${prefix}/save`,
    method: 'post',
    data: brand,
  })
}

// 修改信息
export const UpdateBrandById = brand => {
  return request({
    url: `${prefix}/updateById`,
    method: 'put',
    data: brand,
  })
}

// 查询所有的品牌数据
export const FindAllBrand = () => {
  return request({
    url: `${prefix}/findAll`,
    method: 'get',
  })
}