<template>
  <div class="home">
    <Cover />
    <div class="content">
      <div class="list">
        <a v-for="(item, index) in articleList" :key="index" :href="'/post/'+ item.id" target="_blank" class="card">
          <div class="title">
            <span class="name">{{ item.title }}</span>
            <span class="time">{{ item.create_dt }}</span>
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
    <More :done="total === articleList.length" @load="getList" />
  </div>
</template>

<script>
import Cover from './components/cover'
import More from '../components/more'

import { fetchList } from '@/api/article'
export default {
  name: 'Index',
  components: {
    Cover,
    More
  },
  data() {
    return {
      total: '',
      listQuery: {
        limit: 10,
        page: 1
      },
      articleList: []
    }
  },
  created() {
    document.title = 'iclould'
    this.getList()
  },
  methods: {
    getList() {
      fetchList(this.listQuery).then(res => {
        this.articleList = this.articleList.concat(res.data.list)
        this.total = res.data.total
        this.listQuery.page++
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
@media screen and (max-width: 960px){
  .home .card{
    padding: 15px;
    font-size: 14px;
    .title{
      padding-bottom: 30px;
      .name{
        font-size: 18px;
      }
      .time {
        display: none;
      }
    }
    .acts{
      .act:first-child{
        margin-right: 20px;
      }
    }
  }
}
</style>
