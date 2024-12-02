<template>
  <div class="tools-div">
    <el-button type="success" size="small" @click="exportData">导出</el-button>
    <el-button type="primary" size="small" @click="importData">导入</el-button>
  </div>

  <!---懒加载的树形表格-->
  <el-table
    :data="list"
    style="width: 100%"
    row-key="id"
    border
    lazy
    :load="fetchData"
    :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
  >
    <el-table-column prop="name" label="分类名称" />
    <el-table-column prop="imageUrl" label="图标" #default="scope">
      <img :src="scope.row.imageUrl" width="50" />
    </el-table-column>
    <el-table-column prop="orderNum" label="排序" />
    <el-table-column prop="status" label="状态" #default="scope">
      {{ scope.row.status == 1 ? '正常' : '停用' }}
    </el-table-column>
    <el-table-column prop="createTime" label="创建时间" />
  </el-table>

  <!-- 导入对话框 -->
  <el-dialog v-model="dialogImportVisible" title="导入" width="30%">
    <el-form label-width="120px">
      <el-form-item label="分类文件">
        <el-upload
          class="upload-demo"
          action="http://localhost:8501/admin/product/category/importData"
          :on-success="onUploadSuccess"
          :headers="headers"
        >
          <el-button type="primary">上传</el-button>
        </el-upload>
      </el-form-item>
    </el-form>
  </el-dialog>


</template>

<script setup>
import { ref, onMounted } from 'vue';
import { ExportCategoryData, GetCategoryListByParentId } from "@/api/product/category.js";
import { ElMessage } from "element-plus";
import { useApp } from "@/pinia/modules/app";


const headers = {
  token: useApp().authorization.token,
}

// 定义list属性模型
const list = ref([])

onMounted(() => {
  initFetchData()
})

// 第一次加载，加载父品牌列表
function initFetchData() {

  // 向后端发送请求获取数据
  GetCategoryListByParentId(0).then(res => {
    list.value = res.data
  })

}

// 懒加载数据的方法 TODO 这个 treeNode 必须加！不加的话加载不出页面来！
const fetchData = (row, treeNode, resolve) => { // FIXME resolve是什么？
  // 模拟异步加载数据，根据parentId加载下一级菜单
  let parentId = row.id
  GetCategoryListByParentId(parentId).then(response=>{
    // 返回数据
    resolve(response.data)
  })
}

const exportData = () => {
  ExportCategoryData().then(res=>{
    // 创建 Blob 对象，用于包含二进制数据
    const blob = new Blob([res]);
    // 创建 a 标签元素，并将 Blob 对象转换成 URL
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    // 设置下载文件的名称
    link.download = '分类数据.xlsx';
    // 模拟点击下载链接
    link.click();
  })
}

// 导入对话框
const dialogImportVisible = ref(false)
const importData = ()=>{
  dialogImportVisible.value = true;
}

const onUploadSuccess = (response, uploadFile)=>{
  if(response.code==200){
    ElMessage.success("上传资料成功")
    dialogImportVisible.value = false;
    initFetchData()
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