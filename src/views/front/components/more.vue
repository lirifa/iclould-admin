<template>
  <div class="more">
    <button v-if="!done" @click="loading">加载更多</button>
    <p v-else>- 我是有底线的 -</p>
  </div>
</template>

<script>
export default {
  name: 'LoadMore',
  props: {
    done: {
      required: true,
      type: Boolean,
      default: false
    }
  },
  methods: {
    loading() {
      this.$emit('load')
    }
  }
}
</script>

<style scoped lang="scss">
  .more {
    display: flex;
    justify-content: center;
    width: 100%;
    padding-top: 20px;
    button{
      width: 90px;
      height: 30px;
      border: 1px solid #666;
      background-color: transparent;
      outline: none;
      cursor: pointer;
    }
    p{
      font-size: 12px;
      color: #6f6f6f;
    }
  }

</style>
