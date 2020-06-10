<template>
  <div class="app-container">
    <div class="filter-container">
      <el-button type="primary" @click="handleCreateArticle">新建文章</el-button>
    </div>
    <el-table v-loading="listLoading" :data="list" fit highlight-current-row style="width: 100%">
      <el-table-column align="center" fixed="left" label="#" width="55">
        <template slot-scope="scope">
          <span>{{ scope.$index+(listQuery.page - 1) * listQuery.limit + 1 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="标题" prop="title" show-overflow-tooltip min-width="180px">
        <template slot-scope="scope">
          <el-button type="text" @click="goDetail(scope.row.id)">{{ scope.row.title }}</el-button>
        </template>
      </el-table-column>
      <el-table-column label="摘要" prop="summary" show-overflow-tooltip min-width="180px" />
      <el-table-column label="状态" prop="status_name" width="100px" align="center" />
      <el-table-column label="阅读量" prop="reads_count" width="100px" align="center" />
      <el-table-column label="点赞量" prop="like_count" width="100px" align="center" />
      <el-table-column label="置顶" width="120px" fixed="right" align="center">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.is_top" @change="handleUpdateIsTop($event, scope.row.id)" />
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
  </div>
</template>

<script>
import { fetchAllList, updateIsTop } from '@/api/article'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

export default {
  name: 'ArticleList',
  components: { Pagination },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'info',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      fetchAllList(this.listQuery).then(response => {
        this.list = response.data.list
        this.total = response.data.total
        this.listLoading = false
      }).catch(() => {
        this.listLoading = false
      })
    },
    handleUpdateIsTop(val, id) {
      updateIsTop({ id: id, isTop: val }).then(res => {
        this.$message.success('操作成功')
      }).catch(() => {
        this.getList()
      })
    },
    goDetail(id) {
      this.$router.push({ path: 'edit/' + id })
    },
    handleCreateArticle() {
      this.$router.push({ path: 'create' })
    }
  },
  beforeRouteEnter(to, from, next) {
    if (from.name === 'EditArticle' || from.name === 'CreateArticle') {
      next(vm => {
        vm.getList()
        return
      })
    }
    next()
  }
}
</script>

<style scoped>
.edit-input {
  padding-right: 100px;
}
.cancel-btn {
  position: absolute;
  right: 15px;
  top: 10px;
}
</style>
