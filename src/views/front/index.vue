<template>
  <div class="front">
    <router-view />
    <Footer />
  </div>
</template>

<script>
import Footer from './components/footer'
export default {
  name: 'FrontLayout',
  components: {
    Footer
  }
}
</script>
