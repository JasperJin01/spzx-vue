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
  <!---搜索表单-->
  <div class="search-div">
    <el-form label-width="70px" size="small">
      <el-row>
        <el-col :span="12">
          <el-form-item label="关键字">
            <el-input
              v-model="queryDto.keyword"
              style="width: 100%"
              placeholder="用户名、姓名、手机号码"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="创建时间">
            <el-date-picker
              v-model="createTimes"
              type="daterange"
              range-separator="To"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
              format="YYYY-MM-DD"
              value-format="YYYY-MM-DD"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row style="display:flex">
        <el-button type="primary" size="small" @click="searchSysUser">
          搜索
        </el-button>
        <el-button size="small" @click="resetData">重置</el-button>
      </el-row>
    </el-form>
  </div>

  <!--添加按钮-->
  <div class="tools-div">
    <el-button type="success" size="small" @click="addShow">添 加</el-button>
  </div>

  <!---数据表格-->
  <el-table :data="list" style="width: 100%">
    <el-table-column prop="username" label="账号" />
    <el-table-column prop="name" label="用户昵称" />
    <el-table-column prop="phone" label="手机" />
    <el-table-column prop="avatar" label="头像" #default="scope">
      <img :src="scope.row.avatar" width="50" />
    </el-table-column>
    <el-table-column prop="description" label="描述" />
    <el-table-column
      prop="status"
      label="状态"
      #default="scope"
    ></el-table-column>
    <el-table-column prop="createTime" label="创建时间" />
    <el-table-column label="操作" align="center" width="280" #default="scope">
      <el-button type="primary" size="small" @click="editShow(scope.row)">
        修改
      </el-button>
      <el-button type="danger" size="small" @click="deleteSysUser">
        删除
      </el-button>
      <el-button type="warning" size="small" @click="assignRoleShow(scope.row)">
        分配角色
      </el-button>
    </el-table-column>
  </el-table>

  <el-pagination
    :page-sizes="[10, 20, 50, 100]"
    layout="total, sizes, prev, pager, next"
    :total="total"
  />

  <!--  修改用户信息-->
  <el-dialog v-model="dialogVisible" title="添加或修改" width="40%">
    <el-form label-width="120px">
      <el-form-item label="账号">
        <el-input v-model="sysUser.username" />
      </el-form-item>
      <el-form-item label="密码">
        <el-input type="password" show-password v-model="sysUser.password" />
      </el-form-item>
      <el-form-item label="用户昵称">
        <el-input v-model="sysUser.name" />
      </el-form-item>
      <el-form-item label="手机">
        <el-input v-model="sysUser.phone" />
      </el-form-item>
      <el-form-item label="头像">
        <el-upload
          class="avatar-uploader"
          action="http://localhost:8501/admin/system/fileUpload"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :headers="headers"
        >
          <img v-if="sysUser.avatar" :src="sysUser.avatar" class="avatar" />
          <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
        </el-upload>
      </el-form-item>
      <el-form-item label="描述">
        <el-input v-model="sysUser.description" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submit">提交</el-button>
        <el-button @click="dialogVisible = false">取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>

  <!--分配角色-->
  <el-dialog v-model="dialogRoleVisible" title="分配角色" width="40%">
    <el-form label-width="80px">
      <el-form-item label="账号（用户名）">
        <el-input disabled :value="sysUser.username"></el-input>
      </el-form-item>

      <el-form-item label="角色列表">
        <el-checkbox-group v-model="userRoleIds">
          <el-checkbox
            v-for="role in allRoles"
            :key="role.id"
            :label="role.id"
          >
            {{ role.roleName }}
          </el-checkbox>
        </el-checkbox-group>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitRole">提交</el-button>
        <el-button @click="dialogRoleVisible = false">取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>

</template>

<script setup>
import { ref, onMounted } from 'vue'
import { GetSysUserListByPage, UpdateSysUser, DeleteSysUserById, AddSysUser, DoAssignRoleToUser} from '@/api/system/sysUser'
import { GetAllRoleList } from '@/api/system/sysRole'
import { ElMessage } from "element-plus";
import { useApp } from '@/pinia/modules/app'

const headers = {
  token: useApp().authorization.token,
}

// 头像图片回显
function handleAvatarSuccess (response) {
  sysUser.value.avatar = response.data
}

// 表格数据模型
const list = ref([])

// 分页条数据模型
const total = ref(0)

// 分页参数
const pageParams = ref({
  page: 1,
  limit: 10,
})

// 关键字参数（queryDto）
const queryDto = ref({
  keyword: '',
  createTimeBegin: '',
  createTimeEnd: '',
})

// 时间参数
const createTimes = ref([])

// 表单对象
const sysUser = ref({
  name: '',
  username: '',
  password: '',
  phone: '',
  avatar: '',
  description: '',
})

// 角色列表和用户角色id
const userRoleIds = ref([])
const allRoles = ref([])

onMounted(() => {
  // 加载初始化list数据
  fetchData()
})

function fetchData() {
  // 处理时间参数
  if (createTimes.value.length > 0) {
    queryDto.value.createTimeBegin = createTimes.value[0]
    queryDto.value.createTimeEnd = createTimes.value[1]
  }
  // else {
  //   queryDto.value.createTimeBegin = ''
  //   queryDto.value.createTimeEnd = ''
  // }

  // 调用接口获取数据
  GetSysUserListByPage(queryDto.value, pageParams.value.page, pageParams.value.limit).then(res => {
    list.value = res.data.list
    total.value = res.data.total
  })
}

function searchSysUser() {
  fetchData()
}

function resetData() {
  queryDto.value.keyword = ''
  createTimes.value = []
  fetchData()
}

const dialogVisible = ref(false)
const dialogRoleVisible = ref(false)

const addShow = () => {
  sysUser.value = {...null}
  dialogVisible.value = true
}

const editShow = (row) => {
  sysUser.value = {...row}
  dialogVisible.value = true
}

const deleteSysUser = () => {
  console.log('deleteSysUser')
}

const assignRoleShow = (row) => {
  dialogRoleVisible.value = true
  sysUser.value = {...row}
  GetAllRoleList(row.id).then(res => {
    allRoles.value = res.data.allRoles
    userRoleIds.value = res.data.userRoleIds
  })

}

// 添加或修改
async function submit () {
  let code
  if (sysUser.value.id) {
    let response = await UpdateSysUser(sysUser.value)
    code = response.code
  } else {
    let response = await AddSysUser(sysUser.value)
    code = response.code
  }

  if (code === 200) {
    ElMessage.success('操作成功')
    dialogVisible.value = false
    fetchData()
  } else {
    ElMessage.error('操作失败')
  }
}

function submitRole () {
  let assignRoleDto = {
    userId: sysUser.value.id,
    roleIds: userRoleIds.value
  }

  DoAssignRoleToUser(assignRoleDto).then(res => {
    if (res.code === 200) {
      ElMessage.success('操作成功')
      dialogRoleVisible.value = false
      // fetchData()
    } else {
      ElMessage.error('操作失败')
    }
  })

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
<style scoped>
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
