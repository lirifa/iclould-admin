<template>
  <div class="app-container">
    <el-tabs v-model="activeName" type="border-card">
      <el-tab-pane label="营业资质" name="yyzz">
        <keep-alive>
          <yyzz-pane />
        </keep-alive>
      </el-tab-pane>
      <!-- <el-tab-pane label="电子合同" name="dzht">
        <keep-alive>
          <dzht-pane/>
        </keep-alive>
      </el-tab-pane>
      <el-tab-pane label="相关协议" name="xgxy">
        <keep-alive>
          <xgxy-pane/>
        </keep-alive>
      </el-tab-pane>
      <el-tab-pane label="管理规范" name="glgf">
        <keep-alive>
          <glgf-pane/>
        </keep-alive>
      </el-tab-pane> -->
    </el-tabs>
  </div>
</template>

<script>
import yyzzPane from './components/yyzzPane'
// import dzhtPane from './components/dzhtPane'
// import xgxyPane from './components/xgxyPane'
// import glgfPane from './components/glgfPane'
export default {
  name: 'Index',
  components: {
    yyzzPane
    // dzhtPane,
    // xgxyPane,
    // glgfPane
  },
  data() {
    return {
      activeName: 'yyzz'
    }
  }
}
</script>

<style scoped lang="scss">
.el-tabs{
  min-height: 100%;
}
</style>
