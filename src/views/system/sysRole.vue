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
      <el-button type="success" size="small">添 加</el-button>
    </div>

    <!--- 角色表格数据 -->
    <el-table :data="list" style="width: 100%">
      <el-table-column prop="roleName" label="角色名称" width="180" />
      <el-table-column prop="roleCode" label="角色code" width="180" />
      <el-table-column prop="createTime" label="创建时间" />
      <el-table-column label="操作" align="center" width="280">
        <el-button type="primary" size="small">
          修改
        </el-button>
        <el-button type="danger" size="small">
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
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { GetSysRoleListByPage } from '@/api/system'

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

// 查询
function fetchData() {
  console.log("打印queryDto")
  console.log(queryDto.value.roleName)
  // alert("查询数据表格")
  GetSysRoleListByPage(queryDto.value, pageParams.value.page, pageParams.value.limit)
    .then(response => { // FIXME 这个response 应该就是这个函数返回的结果，命名为response
      list.value = response.data.list
      total.value = response.data.total
  })
  // TODO 这个then是什么用法？课件中用的await，asite？是什么用法？
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