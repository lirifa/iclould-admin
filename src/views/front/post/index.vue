<template>
  <div>
    <Wave />
    <div class="v-post">
      <div class="caption">
        <div class="title-wrap">
          <span class="title">{{ title }}</span>
          <span class="underscore" />
        </div>
      </div>
      <div class="author" v-html="author" />
      <div class="time" v-html="create_dt" />
      <div class="paper v-markdown">
        <div v-highlight v-html="markdownContent" />
      </div>
    </div>
  </div>
</template>

<script>
import Wave from '../components/wave'
import showdown from 'showdown'
import { fetchArticle } from '@/api/article'
export default {
  name: 'PostIndex',
  components: {
    Wave
  },
  data() {
    return {
      title: '',
      author: '',
      markdownContent: ''
    }
  },
  created() {
    this.getArticle(this.$route.params.id)
  },
  methods: {
    getArticle(id) {
      fetchArticle(id).then((res) => {
        this.title = res.data.title
        this.author = res.data.author
        this.create_dt = res.data.create_dt
        const converter = new showdown.Converter()
        this.markdownContent = converter.makeHtml(res.data.content)
      })
    }
  }
}
</script>

<style scoped lang="scss">
.v-post{
  width: 100%;
  max-width: 960px;
  padding: 0 10px 50px;
  margin: 0 auto;
  .caption{
    width: 100%;
    margin: 40px 0;
    display: flex;
    justify-content: center;
    .title-wrap{
      position: relative;
      .title{
        font-size: 24px;
      }
      .underscore{
        width: 100%;
        height: .5em;
        background: #eed14e;
        position: absolute;
        bottom: 3px;
        left: 0;
        z-index: -1;
      }
    }
  }
  .author{
    margin-top: 10px;
    text-align: center;
  }
  .time{
    margin-top: 10px;
    text-align: center;
    color: #9f9f9f;
  }
  .v-markdown{
  /deep/  pre{
      border: 1px solid #dfdfdf;
      padding: 16px;
      margin: 1em 0;
      line-height: 1.45;
      border-radius: 4px;
      background-color: #282c34;
      overflow: auto;
    }
  }

}
</style>
<style>
  .v-markdown h1, .v-markdown h2, .v-markdown h3, .v-markdown h4, .v-markdown h5, .v-markdown h6 {
    margin:1.2em 0;
    line-height:1;
    word-break:break-all
  }
  .v-markdown h1, .v-markdown h2 {
    padding-bottom:.4em;
    border-bottom:1px solid #eaecef
  }
  .v-markdown h3:before, .v-markdown h4:before {
    content:"#";
    margin-right:2px;
    font-size:18px;
    color:#f66
  }
  .v-markdown p {
    margin:.3em 0;
    line-height:2
  }
  .v-markdown code {
    padding:2px 4px 0;
    margin:0 2px;
    border-radius:3px;
    font-size:14px;
    color:#f55;
    background-color:#fff5f5;
    word-break:break-all
  }
  .v-markdown pre {
    padding:16px;
    margin:1em 0;
    line-height:1.45;
    border-radius:2px;
    background-color:#282823;
    overflow:auto
  }
  .v-markdown pre code {
    padding:0;
    margin:0;
    line-height:1.6;
    border-radius:none;
    font-size:15px;
    color:#ccc;
    background-color:transparent
  }
  @media screen and (max-width:960px) {
    .paper.v-markdown h1, .paper.v-markdown h2, .paper.v-markdown h3, .paper.v-markdown h4, .paper.v-markdown h5, .paper.v-markdown h6, .paper.v-markdown p, .paper.v-markdown table, .v-post .label {
      padding-left:14px;
      padding-right:14px
    }
    .paper.v-markdown ol, .paper.v-markdown ul {
      padding-left:calc(2em + 14px);
      padding-right:14px
    }
    .paper.v-markdown ol li p, .paper.v-markdown ul li p {
      padding-left:0;
      padding-right:0
    }
    .v-markdown pre {
      padding:12px;
      border-radius:0
    }
    .v-markdown pre code {
      font-size:14px
    }
    .v-markdown table {
      width:calc(100% - 28px);
      margin-left:14px;
      margin-right:14px
    }
  }
</style>
