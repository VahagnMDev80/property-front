<template>
  <el-container>
    <router-view name="navbar"/>

    <router-view name="navside"/>

    <el-main>
      <router-view/>
    </el-main>
  </el-container>
</template>

<script>
import NavBar from "@/components/NavBar";

export default {
  name: 'app',
  components: {
    NavBar
  }
}
</script>

<style>
body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #212529;
  text-align: left;
  background-color: #fff;
}
</style>
