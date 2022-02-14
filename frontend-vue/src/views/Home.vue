<template>
	<div class="content">
    <navbar></navbar>
    <grid></grid>
    <footer-component></footer-component>
	</div>
</template>

<script>
// @ is an alias to /src
import Navbar from '@/components/Navbar.vue'
import Grid from '@/components/Grid.vue'
import FooterComponent from '@/components/Footer.vue'

export default {
  name: 'Home',
  components: {
    Navbar,
    FooterComponent,
    Grid
  }
}
</script>

<style>
  .content{
    display: flex;
    flex-direction: column;
    height: 100vh;
  }
</style>
