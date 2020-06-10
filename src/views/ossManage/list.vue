<template>
  <div class="app-container imgList">
    <Sticky :z-index="10">
      <div class="nav-wrap">
        <el-button v-for="(path, index) in navList" :key="index" type="text" class="navItem" @click="handleClickNav(path)">/{{ path.split('/')[path.split('/').length-1] }}</el-button>
        <el-button size="mini" type="primary" style="position: absolute;right: 100px;top:5px;" @click="handleMkdir">新建目录</el-button>
        <el-button size="mini" type="primary" class="uploadBtn" @click="handleUpload">上传文件</el-button>
      </div>
    </Sticky>
    <el-table
      :data="list"
    >
      <el-table-column label="资源名称">
        <template slot-scope="scope">
          <div v-if="scope.row.type === 'folder'">
            <svg-icon icon-class="folder" />
            <span :class="{ folder: scope.row.type === 'folder'}" @dblclick="enterFolder(scope.row.path+ '/' + scope.row.name)">{{ scope.row.name }}</span>
          </div>
          <div v-else>
            <viewer>
              <img :src="scope.row.path + '/' + scope.row.name | imageFilter" :alt="scope.row.name" style="width: 22px;height: 22px;vertical-align: middle;">
              <span style="cursor: pointer;" @click="handleCopyFileLink(scope.row, $event)">{{ scope.row.name }}</span>
            </viewer>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="更新时间" align="center" width="200px">
        <template slot-scope="scope">
          <span>{{ scope.row.time | timeFilter }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="100" fixed="right">
        <template slot-scope="scope">
          <el-button v-if="scope.row.type !== 'folder'" size="mini" type="danger" icon="el-icon-delete" circle @click="deleteFile(scope.row.path+ '/' + scope.row.name, scope.row.name)" />
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="新建目录" :visible.sync="dialogVisible" width="600px">
      <el-form ref="dirForm" :model="dirForm" :rules="dirFormRules" label-width="100px">
        <el-form-item label="目录名" prop="dirName">
          <el-input v-model.trim="dirForm.dirName" />
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="dialogVisible=false">取消</el-button>
        <el-button type="primary" @click="handleSubmitMkdir">确定</el-button>
      </div>
    </el-dialog>
    <el-dialog
      :title="`上传文件到: ${curPath}`"
      :visible.sync="uploadDialogVisible"
      class="uploadDialog"
      @close="$nextTick((vm) => {
        vm.$refs['upload'].clearFiles()
      })"
    >
      <el-upload
        ref="upload"
        :on-success="uploadSuccess"
        :data="{ path: curPath }"
        class="upload-file"
        drag
        action="/api/file/upload"
        multiple
      >
        <i class="el-icon-upload" />
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div slot="tip" class="el-upload__tip">文件大小不超过500kb</div>
      </el-upload>
    </el-dialog>
  </div>
</template>

<script>
import { getAllOSS, removeFile, mkdir } from '@/api/ossManage'
import Sticky from '@/components/Sticky' // 粘性header组件
import { parseTime } from '@/utils'
import clip from '@/utils/clipboard'
export default {
  name: 'List',
  components: {
    Sticky
  },
  filters: {
    imageFilter(str) {
      return str.replace('/home/ubuntu/oss', 'http://oss.iclould.xyz')
    },
    timeFilter(timestamp) {
      return parseTime(timestamp)
    }
  },
  data() {
    return {
      initPath: '/home/ubuntu/oss',
      curPath: '/home/ubuntu/oss',
      list: [],
      folderList: [
        { name: 'oss', path: '/home/ubuntu/oss' }
      ],
      navList: ['/home/ubuntu/oss'],
      dialogVisible: false,
      dirForm: {
        dirName: ''
      },
      dirFormRules: {
        dirName: [{ required: true, message: '请输入目录名', trigger: 'blur' }]
      },
      uploadDialogVisible: false
    }
  },
  created() {
    this.getList(this.initPath)
  },
  methods: {
    // 获取当前目录下的文件加及文件
    getList(path) {
      getAllOSS({ path: path }).then(res => {
        this.list = res.data.sort((a, b) => {
          return a.time > b.time ? 1 : -1
        })
      })
    },
    enterFolder(path) {
      getAllOSS({ path: path }).then(res => {
        this.list = res.data.sort((a, b) => {
          return a.time > b.time ? 1 : -1
        })
        this.navList.push(path)
        this.curPath = path
      })
    },
    handleClickNav(path) {
      getAllOSS({ path: path }).then(res => {
        this.list = res.data.sort((a, b) => {
          return a.time > b.time ? 1 : -1
        })
        const _navList = this.navList.slice(0, this.navList.indexOf(path) + 1)
        this.navList = Object.assign([], _navList)
        this.curPath = path
      })
    },
    deleteFile(path) {
      this.$confirm('确定要删除该资源吗？', '提示', { type: 'warning' }).then(() => {
        removeFile({ path: path }).then(() => {
          this.$message.success('资源删除成功')
          this.getList(this.curPath)
        })
      })
    },
    handleMkdir() {
      this.dialogVisible = true
      this.$nextTick(() => {
        this.$refs['dirForm'].resetFields()
        this.$refs['dirForm'].clearValidate()
      })
    },
    handleSubmitMkdir() {
      this.$refs['dirForm'].validate(valid => {
        if (valid) {
          const data = {
            path: this.curPath,
            dirName: this.dirForm.dirName
          }
          mkdir(data).then(() => {
            this.$message.success('新建目录成功')
            this.getList(this.curPath)
            this.dialogVisible = false
          })
        }
      })
    },
    handleCopyFileLink(row, event) {
      const link = (row.path + '/' + row.name).replace('/home/ubuntu/oss', 'https://oss.iclould.xyz')
      clip(link, event)
    },
    handleUpload() {
      this.uploadDialogVisible = true
      this.$nextTick(() => {
        this.$refs['upload'].clearFiles()
      })
    },
    uploadSuccess(res) {
      if (res.success) {
        this.getList(this.curPath)
      }
    }
  }
}
</script>

<style scoped lang="scss">
.imgList{
  overflow: hidden;
}
.img{
  width: 200px;
  height: auto;
}
.nav-wrap{
  position: relative;
  padding: 0 190px 0 10px;
  background-color: #fff;
  border: 1px solid #99a9bf;
  .uploadBtn{
    position: absolute;
    top: 4px;
    right: 10px;
  }
  /deep/ .el-button{
    margin-left: 0;
  }
}
.navItem{
    max-width: 100px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.folder{
    color: #1890ff;
    cursor: pointer;
    text-decoration: underline;
    -moz-user-select:none;
    user-select:none;
    -webkit-user-select:none;
    -ms-user-select:none;
    -khtml-user-select:none;
}
.uploadDialog{
  /deep/
  .el-upload{
    display: block;
    .el-upload-dragger{
      width: 100%;
    }
  }
}

</style>
