<template>
  <div :style="{ height: waveHeight }" class="v-wave">
    <div :style="itemStyle" class="liquid" />
    <div :style="itemStyle" class="liquid" />
    <div :style="itemStyle" class="liquid" />
  </div>
</template>

<script>
export default {
  name: 'Wave',
  data() {
    return {
      waveHeight: '300px',
      itemStyle: {
        width: '2100px',
        height: '2100px',
        marginLeft: '-1050px',
        top: '-1875px'
      }
    }
  },
  mounted() {
    const that = this
    const winWidth = document.body.offsetWidth
    const waveWidth = winWidth + 180
    let per = waveWidth / 2100
    if (per < 0.4) {
      per = 0.4
    }
    that.waveHeight = per * 300 + 'px'
    that.itemStyle.width = per * 2100 + 'px'
    that.itemStyle.height = per * 2100 + 'px'
    that.itemStyle.marginLeft = '-' + per * 2100 / 2 + 'px'
    that.itemStyle.top = '-' + per * 1875 + 'px'

    window.onresize = () => {
      return (() => {
        const winWidth = document.body.offsetWidth
        const waveWidth = winWidth + 180
        let per = waveWidth / 2100
        if (per < 0.4) {
          per = 0.4
        }
        that.waveHeight = per * 300 + 'px'
        that.itemStyle.width = per * 2100 + 'px'
        that.itemStyle.height = per * 2100 + 'px'
        that.itemStyle.marginLeft = '-' + per * 2100 / 2 + 'px'
        that.itemStyle.top = '-' + per * 1875 + 'px'
      })()
    }
  }
}
</script>

<style scoped lang="scss">
  .v-wave {
    width: 100%;
    height: 300px;
    overflow: hidden;
    position: relative
  }

  .v-wave .liquid {
    width: 2000px;
    height: 2000px;
    margin-left: -1000px;
    background-color: #00bfff;
    border-radius: 43%;
    filter: opacity(.4);
    position: absolute;
    top: -1750px;
    left: 50%;
    animation: drift linear infinite;
    transform-origin: 50% 48%
  }

  .v-wave .liquid:first-of-type {
    animation-duration: 5s
  }

  .v-wave .liquid:nth-of-type(2) {
    animation-duration: 7s
  }

  .v-wave .liquid:nth-of-type(3) {
    background-color: #ff4500;
    filter: opacity(.1);
    animation-duration: 9s
  }

  @keyframes drift {
    0% {
      transform: rotate(1turn)
    }
  }

</style>
