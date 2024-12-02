<template>
  <div>
    <div class="tools-div">
      <el-button type="success" size="small" @click="addShow">添 加</el-button>
    </div>

    <el-table :data="list" style="width: 100%">
      <el-table-column prop="specName" label="规格名称" />
      <el-table-column label="规格值" #default="scope">
        <div
          v-for="(item1, index1) in scope.row.specValue"
          :key="index1"
          style="padding: 5px; margin: 0; width: 100%"
        >
          {{ item1.key }}：
          <span
            v-for="(item2, index2) in item1.valueList"
            :key="index2"
            class="div-atrr"
          >
            {{ item2 }}
          </span>
        </div>
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

    <el-dialog v-model="dialogVisible" title="添加或修改" width="40%">
      <el-form label-width="120px">
        <el-form-item label="规格名称">
          <el-input v-model="productSpec.specName" />
        </el-form-item>
        <el-form-item>
          <el-button size="default" type="success" @click="addSpecValue">
            添加新规格值
          </el-button>
        </el-form-item>
        <el-form-item
          label=""
          v-for="(item, index) in productSpec.specValue"
          :key="index"
        >
          <el-row>
            <el-col :span="10">
              <el-input
                v-model="item.key"
                placeholder="规格"
                style="width: 90%"
              />
            </el-col>
            <el-col :span="10">
              <el-input
                v-model="item.valueList"
                placeholder="规格值(如:白色,红色)"
                style="width: 90%"
              />
            </el-col>
            <el-col :span="4">
              <el-button
                size="default"
                type="danger"
                @click="delSpecValue(index)"
              >
                删除
              </el-button>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item align="right">
          <el-button type="primary" @click="saveOrUpdate">提交</el-button>
          <el-button @click="dialogVisible = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import {
  GetProductSpecPageList,
  UpdateProductSpecById,
  SaveProductSpec,
} from '@/api/product/productSpec.js'
import { ElMessage } from 'element-plus'

// 钩子函数
onMounted(() => {
  fetchData()
})

// 分页模型
const pageParamsForm = {
  page: 1, // 页码
  limit: 10, // 每页记录数
}
const pageParams = ref(pageParamsForm)

// 表格数据模型
const list = ref([])

// 分页条数据模型
const total = ref(0)

// 对话框模型
const dialogVisible = ref(false)
const productSpec = ref({
  id: '',
  specName: '',
  specValue: [],
})

// 提交规格
function saveOrUpdate() {
  // 规格值数据处理
  let productSpecClone = JSON.parse(JSON.stringify(productSpec.value))
  productSpecClone.specValue.forEach(item => {
    if (typeof item.valueList === 'string') {
      item.valueList = item.valueList.split(',')
    }
  })
  console.log('productSpecClone', productSpecClone)
  productSpecClone.specValue = JSON.stringify(productSpecClone.specValue)

  if (productSpec.value.id) {
    //alert("修改")
    UpdateProductSpecById(productSpecClone).then(response => {
      if (response.code === 200) {
        ElMessage.success('修改成功')
        dialogVisible.value = false
        fetchData()
      } else {
        ElMessage.error('修改失败')
      }
    })
  } else {
    //alert("添加")
    SaveProductSpec(productSpecClone).then(response => {
      if (response.code === 200) {
        ElMessage.success('修改成功')
        dialogVisible.value = false
        fetchData()
      } else {
        ElMessage.error('修改失败')
      }
    })
  }
}

//对话框操作
const addSpecValue = () => {
  productSpec.value.specValue.push({})
}
const delSpecValue = index => {
  productSpec.value.specValue.splice(index, 1)
}
const addShow = () => {
  dialogVisible.value = true
  productSpec.value = {
    id: '',
    specName: '',
    specValue: [],
  }
}

const editShow = row => {
  productSpec.value = { ...row }
  dialogVisible.value = true
}

// 初始化列表
const fetchData = async () => {
  const { data } = await GetProductSpecPageList(pageParams.value.page, pageParams.value.limit)
  data.list.forEach(item => {
    // NOTE JSON.parse方法用于将json解析成js对象
    item.specValue = JSON.parse(item.specValue)
  })
  list.value = data.list
  total.value = data.total
}
</script>

<style scoped>
.tools-div {
  margin: 10px 0;
  padding: 10px;
  border: 1px solid #ebeef5;
  border-radius: 3px;
  background-color: #fff;
}

.div-atrr {
  padding: 5px 10px;
  margin: 0 10px;
  background-color: powderblue;
  border-radius: 10px;
}
</style>