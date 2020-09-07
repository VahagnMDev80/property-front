<style scoped>

</style>

<template>
  <el-header>
    <el-menu mode="horizontal" router>
      <el-menu-item :route="{name: 'home', path: '/'}" index="/">Home</el-menu-item>
    </el-menu>
  </el-header>
</template>

<script>
export default {
  name: "NavBar",
  data: () => ({}),
  methods: {}
}
</script>
