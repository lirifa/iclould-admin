<template>
  <div class="front">
    <div class="home">
      <Cover />
      <div class="content">
        <div class="list">
          <a v-for="(item, index) in articleList" :key="index" href="" class="card">
            <div class="title">
              <span class="name">{{ item.title }}</span>
              <span class="time">{{ 1234 }}</span>
            </div>
            <div class="info">
              <div class="acts">
                <div class="act">
                  <span class="key">喜欢</span>
                  <span class="num">{{ item.like_count }}</span>
                </div>
                <div class="act">
                  <span class="key">点击量</span>
                  <span class="num">{{ item.reads_count }}</span>
                </div>
              </div>
            </div>
            <div>{{ }}</div>
          </a>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import Footer from './components/footer'
import Cover from './components/cover'

import { fetchList } from '@/api/article'
export default {
  name: 'Index',
  components: {
    Footer,
    Cover
  },
  data() {
    return {
      articleList: []
    }
  },
  created() {
    document.title = 'iclould'
    this.getList()
  },
  methods: {
    getList() {
      fetchList().then(res => {
        this.articleList = res.data.list
      })
    }
  }
}
</script>

<style scoped lang="scss">
.home{
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  overflow: hidden;
  .content{
    width: calc(100% - 20px);
    max-width: 960px;
    min-height: 50vh;
    margin: 0 auto;
    position: relative;
  }
  .card{
    display: block;
    padding: 20px;
    margin: 10px 0;
    border-radius: 2px;
    font-size: 16px;
    background-color: #fff;
    box-shadow: 0 0 3px rgba(26,26,26,.1);
    overflow: hidden;
    .title{
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-bottom: 40px;
      .name{
        font-size: 24px;
      }
      .time{
        color: #9f9f9f;
      }
    }
    .acts{
      display: flex;
      .act{
        display: flex;
        .num{
          margin-left: 8px;
        }
        &:first-child{
          margin-right: 50px;
        }
      }
    }
  }
}
</style>
