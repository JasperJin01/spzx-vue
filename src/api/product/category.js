import request from '@/utils/request'

const prefix = '/admin/product/category'

export const GetCategoryListByParentId = (parentId) => {
  return request({
    url: `${prefix}/findByParentId/${parentId}`,
    method: 'get',
  })
}

// 导出接口
export const ExportCategoryData = () => {
  return request({
    url: `/admin/product/category/exportData`,
    method: 'get',
    responseType: 'blob'
  })
}