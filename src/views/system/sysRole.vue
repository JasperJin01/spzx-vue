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
  <div class="search-div">
    <!-- 搜索表单 -->
    <el-form label-width="70px" size="small">
      <el-form-item label="角色名称">
        <el-input
          style="width: 100%"
          placeholder="角色名称"
          v-model="queryDto.roleName"
        />
      </el-form-item>
      <el-row style="display:flex">
        <el-button type="primary" size="small" @click="searchSysRole">
          搜索
        </el-button>
        <el-button size="small" @click="resetData">重置</el-button>
      </el-row>
    </el-form>

    <!-- 添加按钮 -->
    <div class="tools-div">
      <el-button type="success" size="small" @click="addShow()">
        添 加
      </el-button>
    </div>

    <!--- 角色表格数据 -->
    <el-table :data="list" style="width: 100%">
      <el-table-column prop="roleName" label="角色名称" width="180" />
      <el-table-column prop="roleCode" label="角色code" width="180" />
      <el-table-column prop="description" label="描述" />
      <el-table-column prop="createTime" label="创建时间" />
      <el-table-column label="操作" align="center" width="280" #default="scope">
        <!-- TODO 作用域? 啥是作用域啊？-->
        <el-button type="primary" size="small" @click="editShow(scope.row)">
          修改
        </el-button>
        <el-button type="danger" size="small" @click="deleteById(scope.row)">
          删除
        </el-button>
      </el-table-column>
    </el-table>

    <!--分页条-->
    <el-pagination
      :page-sizes="[10, 20, 50, 100]"
      layout="total, sizes, prev, pager, next"
      :total="total"
    />

    <!-- 页面表单 -->
    <el-dialog v-model="dialogVisible" title="添加或修改角色" width="30%">
      <el-form label-width="120px">
        <el-form-item label="角色名称">
          <el-input v-model="sysRole.roleName" />
        </el-form-item>
        <el-form-item label="角色Code">
          <el-input v-model="sysRole.roleCode" />
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="sysRole.description" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submit">提交</el-button>
          <el-button @click="dialogVisible = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import {
  GetSysRoleListByPage,
  UpdateSysRole,
  AddSysRole,
  DeleteSysRoleById,
} from '@/api/system/sysRole'
import { ElMessage, ElMessageBox } from 'element-plus'

onMounted(() => {
  // 加载初始化list数据
  fetchData()
})

// 分页条总记录数
let total = ref(0)

// 定义表格数据模型
let list = ref([])

// 表单参数
const queryDto = ref({
  roleName: '', // FIXME 这个前面的key到底用不用加 "" 符号啊？
})

// 分页参数
const pageParams = ref({
  page: 1,
  limit: 10,
})

// 搜索按钮点击事件处理函数
const searchSysRole = () => {
  fetchData()
}

// 对话框
const dialogVisible = ref(false)

// 表单对象
const sysRole = ref({
  roleName: '',
  roleCode: '',
  description: '',
})

// 查询
function fetchData() {
  console.log('打印queryDto')
  console.log(queryDto.value.roleName)
  // alert("查询数据表格")
  GetSysRoleListByPage(
    queryDto.value,
    pageParams.value.page,
    pageParams.value.limit
  ).then(response => {
    // FIXME 这个response 应该就是这个函数返回的结果，命名为response
    list.value = response.data.list
    total.value = response.data.total
  })
  // NOTE 这个then是什么用法？课件中用的 async 是什么用法？
}

// 打开对话框
function addShow() {
  sysRole.value = { ...null }
  dialogVisible.value = true
}

// 修改对话框
function editShow(row) {
  console.log('打印row')
  console.log(row)
  sysRole.value = { ...row } // NOTE 这里必须使用解构赋值，直接 sysRole.value = row 是指针
  dialogVisible.value = true
}

// 添加或修改
const submit = async () => {
  // NOTE 这里是 async用法

  let code = 0
  let message = ''
  if (sysRole.value.id) {
    // FIXME 为啥没有 sysRole.value.id 就是添加啊？
    // 修改
    let response = await UpdateSysRole(sysRole.value)
    code = response.code
    message = response.message
  } else {
    // 添加
    let response = await AddSysRole(sysRole.value)
    code = response.code
    message = response.message
  }
  if (code === 200) {
    ElMessage.success('操作成功')
    dialogVisible.value = false
    fetchData()
  } else {
    ElMessage.error(message)
  }
}

// 删除
const deleteById = row => {
  // then实现
  ElMessageBox.confirm('此操作将永久删除该记录, 是否继续?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  })
    .then(() => {
      DeleteSysRoleById(row.id).then(response => {
        if (response.code === 200) {
          ElMessage.success('删除成功')
          fetchData()
        } else {
          ElMessage.error(response.message)
        }
      })
    })
    .catch(() => {
      ElMessage.info('取消删除')
    })

  // NOTE 这里是await用法
  // ElMessageBox.confirm('此操作将永久删除该记录, 是否继续?', '提示', {
  //   confirmButtonText: '确定',
  //   cancelButtonText: '取消',
  //   type: 'warning',
  // })
  //   .then(async () => {
  //     let response = await DeleteSysRoleById(row.id)
  //     if (response.code === 200) {
  //       ElMessage.success('删除成功')
  //       fetchData()
  //     } else {
  //       ElMessage.error('删除失败')
  //     }
  //   })
  //   .catch(() => {
  //     ElMessage.info('取消删除')
  //   })

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