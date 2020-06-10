<template>
  <el-dropdown :show-timeout="100" trigger="click">
    <el-button plain>
      编辑器：{{ editor_type_opt[editor_type] }}
      <i class="el-icon-caret-bottom el-icon--right" />
    </el-button>
    <el-dropdown-menu slot="dropdown" class="no-padding">
      <el-dropdown-item>
        <el-radio-group v-model="editor_type" style="padding: 10px;">
          <el-radio label="html">富文本</el-radio>
          <el-radio label="markdown">Markdown</el-radio>
        </el-radio-group>
      </el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: 'html'
    }
  },
  data() {
    return {
      editor_type_opt: {
        'html': '富文本',
        'markdown': 'Markdown'
      }
    }
  },
  computed: {
    editor_type: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit('input', val)
      }
    }
  }
}
</script>
