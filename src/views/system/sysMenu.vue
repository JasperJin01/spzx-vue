<!--
 * @Descripttion: 
 * @version: 
 * @Date: 2021-04-20 11:06:21
 * @LastEditors: huzhushan@126.com
 * @LastEditTime: 2022-09-24 18:18:43
 * @Author: huzhushan@126.com
 * @HomePage: https://huzhushan.gitee.io/vue3-element-admin
 * @Github: https://github.com/huzhushan/vue3-element-admin
 * @Donate: https://huzhushan.gitee.io/vue3-element-admin/donate/
-->
<template>
  <div class="tools-div">
    <el-button type="success" size="small" @click="addShow">添 加</el-button>
  </div>

  <el-table
    :data="list"
    style="width: 100%; margin-bottom: 20px"
    row-key="id"
    border
    default-expand-all
  >
    <el-table-column prop="title" label="菜单标题" />
    <el-table-column prop="component" label="路由名称" />
    <el-table-column prop="sortValue" label="排序" />
    <el-table-column prop="status" label="状态" #default="scope">

    </el-table-column>
    <el-table-column prop="createTime" label="创建时间" />
    <el-table-column label="操作" align="center" width="280" #default="scope">
      <el-button type="success" size="small" @click="addSubNodeShow(scope.row)">
        添加下级节点
      </el-button>
      <el-button type="primary" size="small" @click="editShow(scope.row)">
        修改
      </el-button>
      <el-button type="danger" size="small" @click="deleteShow(scope.row)">
        删除
      </el-button>
    </el-table-column>
  </el-table>

  <!-- 添加或修改菜单 -->
  <el-dialog v-model="dialogVisible" :title="dialogTitle" width="30%">
    <el-form label-width="120px">
      <el-form-item label="菜单标题">
        <el-input v-model="sysMenu.title"/>
      </el-form-item>
      <el-form-item label="路由名称">
        <el-input v-model="sysMenu.component"/>
      </el-form-item>
      <el-form-item label="排序">
        <el-input v-model="sysMenu.sortValue"/>
      </el-form-item>
      <el-form-item label="状态">
        <el-radio-group v-model="sysMenu.status">
          <el-radio :label="1">正常</el-radio>
          <el-radio :label="0">停用</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="saveOrUpdate" >提交</el-button>
        <el-button @click="dialogVisible = false">取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>



</template>

<script setup>
import { ref, onMounted} from "vue"
import { FindNodes, AddSysMenu, UpdateSysMenu } from '@/api/system/sysMenu'
import { ElMessage } from 'element-plus'

// 菜单表单数据
const list = ref([])

// 页面表单数据
const defaultForm = {
  id: '',
  parentId: 0,
  title: '',
  url: '',
  component: '',
  icon: '',
  sortValue: 1,
  status: 1,
}
// 表单响应式数据模型对象
const sysMenu = ref(defaultForm)

onMounted(() => {
  fetchData()
})
const dialogVisible = ref(false)
const dialogTitle = ref("")

// 获取菜单
const fetchData = () => {
  FindNodes().then(res => {
      list.value = res.data
    }
  )
}
function addShow() {
  sysMenu.value = {...null}
  dialogTitle.value = "添加顶级菜单"
  dialogVisible.value = true
}
function addSubNodeShow(row) {
  sysMenu.value = {...null}
  sysMenu.value.parentId = row.id
  dialogTitle.value = "添加" + row.title + "的下级菜单"
  dialogVisible.value = true
}
function editShow(row) {
  sysMenu.value = {...row}
  dialogTitle.value = "修改菜单"
  dialogVisible.value = true
}
function deleteShow(row) {
  ElMessage({
    message: '删除成功',
    type: 'success',
  })
}

// 提交 添加 或 添加下一级 或 修改
async function saveOrUpdate() {
  let code = 0
  let message = ""
  if (sysMenu.value.id) { // update
    const response = await UpdateSysMenu(sysMenu.value)
    code = response.code
    message = response.message
  } else { // save
    const response = await AddSysMenu(sysMenu.value)
    code = response.code
    message = response.message
  }
  console.log(code, message)
  if (code === 200) {
    ElMessage.success("操作成功")
    dialogVisible.value = false
    fetchData()
  } else {
    ElMessage.error(message)
  }
}


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

