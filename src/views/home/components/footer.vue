<template>
  <footer class="v-foot">
    <div class="copyright">
      <span class="year">&copy;2018-2019</span>
      <span class="v-heart" style="cursor: pointer;vertical-align: middle;" @click="$router.push({ path: '/dashboard' })">
        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="-1 -1 26 26" stroke="#ff6666" fill="#ff6666">
          <path d="M12 4.435c-1.989-5.399-12-4.597-12 3.568 0 4.068 3.06 9.481 12 14.997 8.94-5.516 12-10.929 12-14.997 0-8.118-10-8.999-12-3.568z" />
        </svg>
      </span>
      <span class="owner">能力有限青年</span>
    </div>
    <a class="record" href="http://www.beian.miit.gov.cn" target="_blank" rel="noopener noreferrer nofollow">{粤ICP备18023626号}</a>
  </footer>
</template>

<script>
export default {
  name: 'Footer'
}
</script>

<style scoped lang="scss">
.v-foot{
  padding: 10px 0;
  text-align: center;
  font-size: 12px;
  line-height: 1;
  .copyright{
    line-height: 1.5;
    margin-bottom: 10px;
    vertical-align: top;
  }
  .v-heard{
    margin: 0 5px;
  }
  .record{
    margin-top: 5px;
    font-size: 10px;
    color: #9f9f9f;
  }
}
</style>
