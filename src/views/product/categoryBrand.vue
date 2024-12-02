<template>
  <div>
    <div class="search-div">
      <el-form label-width="70px" size="small">
        <el-row>
          <el-col :span="12">
            <el-form-item label="品牌">
              <el-select
                class="m-2"
                placeholder="选择品牌"
                size="small"
                style="width: 100%"
                v-model="queryDto.brandId"
              >
                <el-option
                  v-for="item in brandList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="分类">
              <el-cascader
                :props="categoryProps"
                style="width: 100%"
                v-model="queryDto.categoryId"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row style="display: flex">
          <el-button type="primary" size="small" @click="fetchData">
            搜索
          </el-button>
          <el-button size="small" @click="clearQueryDto">重置</el-button>
        </el-row>
      </el-form>
    </div>

    <div class="tools-div">
      <el-button type="success" size="small" @click="addShow">添 加</el-button>
    </div>

    <el-table :data="list" style="width: 100%">
      <el-table-column prop="categoryName" label="分类" />
      <el-table-column prop="brandName" label="品牌" />
      <el-table-column prop="logo" label="品牌图标" #default="scope">
        <img :src="scope.row.logo" width="50" />
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间" />
      <el-table-column label="操作" align="center" width="200" #default="scope">
        <el-button type="primary" size="small" @click="editShow(scope.row)">
          修改
        </el-button>
        <el-button type="danger" size="small">删除</el-button>
      </el-table-column>
    </el-table>

    <el-pagination
      :page-sizes="[10, 20, 50, 100]"
      layout="total, sizes, prev, pager, next"
      :total="total"
    />

    <el-dialog v-model="dialogVisible" title="添加或修改" width="30%">
      <el-form label-width="120px">
        <el-form-item label="品牌">
          <el-select
            class="m-2"
            placeholder="选择品牌"
            size="small"
            v-model="categoryBrand.brandId"
            :disabled="dialogSelectDisabled"
          >
            <el-option
              v-for="item in brandList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="分类">
          <el-cascader
            :props="categoryProps"
            v-model="categoryBrand.categoryId"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="saveOrUpdate">提交</el-button>
          <el-button @click="dialogVisible = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { GetCategoryListByParentId } from '@/api/product/category.js'
// ================数据模型定义  start ===============================================
import { FindAllBrand } from '@/api/product/brand.js'
import {
  GetCategoryBrandPageList,
  SaveCategoryBrand,
  UpdateCategoryBrandById,
} from '@/api/product/categoryBrand.js'
import { ElMessage } from 'element-plus'

onMounted(() => {
  selectAllBrandList() // 商标下拉框
  fetchData() // 分类品牌数据表格
})

// 定义搜索表单数据模型
const brandList = ref([])

// 分类级联菜单 TODO 看一下这个
const categoryProps = ref({
  lazy: true,
  value: 'id',
  label: 'name',
  leaf: 'leaf',
  async lazyLoad(node, resolve) {
    // 加载数据的方法
    if (typeof node.value == 'undefined') node.value = 0 // 如果没有父节点，查询一级分类
    const { data } = await GetCategoryListByParentId(node.value) // 查询分类列表
    data.forEach(item => {
      item.leaf = !item.hasChildren // 是否显示>,如果是叶子节点不显示>
    })
    resolve(data) // 返回数据
  },
})

// 定义表格数据模型
const queryDto = ref({ brandId: '', categoryId: '' })
const list = ref([])

// 分页条数据模型
const total = ref(0)
const pageParams = ref({
  page: 1,
  limit: 10,
})

// 对话框数据模型
const defaultForm = {
  //页面表单数据
  id: '',
  brandId: '',
  categoryId: '',
}
const categoryBrand = ref(defaultForm)
const dialogVisible = ref(false)
const dialogSelectDisabled = ref(false)

// 添加和修改
const saveOrUpdate = () => {
  // NOTE 这里的处理，包括query函数对queryDto.value.categoryId的处理，都是由 el-cascader 的数据形式引起的
  // el-cascader 的数据形式是数组，而接口需要的是值，所以这里需要处理一下
  // 如果不处理，后端会报错
  if (categoryBrand.value.categoryId.length === 3) {
    categoryBrand.value.categoryId = categoryBrand.value.categoryId[2] // 重新赋值
  } else {
    alert('没有选择分类')
    return
  }
  console.log('categoryBrand.value', categoryBrand.value)
  if (categoryBrand.value.id) {
    // 修改
    UpdateCategoryBrandById(categoryBrand.value).then(response => {
      if (response.code == 200) {
        ElMessage.success('操作成功')
        dialogVisible.value = false
        fetchData()
      } else {
        ElMessage.error('操作失败')
      }
    })
  } else {
    // 添加
    SaveCategoryBrand(categoryBrand.value).then(response => {
      if (response.code == 200) {
        ElMessage.success('操作成功')
        dialogVisible.value = false
        fetchData()
      } else {
        ElMessage.error('操作失败')
      }
    })
  }
}

// 对话框显示
const addShow = () => {
  categoryBrand.value = { ...null }
  dialogVisible.value = true
  dialogSelectDisabled.value = false
}

const editShow = row => {
  categoryBrand.value.id = row.id
  categoryBrand.value.brandId = row.brandId
  categoryBrand.value.categoryId = row.categoryId
  dialogVisible.value = true
  dialogSelectDisabled.value = true
}

// 查询商标
const selectAllBrandList = () => {
  FindAllBrand().then(response => {
    brandList.value = response.data
  })
}
// 查询分类品牌
const fetchData = () => {
  console.log('queryDto.value', queryDto.value)
  if (queryDto.value.categoryId.length === 3) {
    queryDto.value.categoryId = queryDto.value.categoryId[2] // 重新赋值
  }

  GetCategoryBrandPageList(
    pageParams.value.page,
    pageParams.value.limit,
    queryDto.value
  ).then(response => {
    list.value = response.data.list
    total.value = response.data.total
  })
}

function clearQueryDto() {
  queryDto.value = { brandId: '', categoryId: '' }
  fetchData()
}

// =========   数据模型定义 end======================================================================
</script>

<style scoped>
.search-div {
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ebeef5;
  border-radius: 3px;
  background-color: #fff;
}

.tools-div {
  margin: 10px 0;
  padding: 10px;
  border: 1px solid #ebeef5;
  border-radius: 3px;
  background-color: #fff;
}
</style>