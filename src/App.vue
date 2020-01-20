<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>


export default {
  name: 'app',

}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  width: 100%;
  height: 100%;

}
.table_pagination {
  flex: 1;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  overflow: hidden;
  /*padding: 0 20px 20px 20px;*/
}
.tableClass {
  flex: 1;
  overflow-y: scroll;
}

.pagination_clumun {
  margin-top: 20px;
  box-sizing: border-box;
  width: 100%;
  background: #ffffff;
  align-items: center;
  display: flex;
}
.pagination_clumun span{
  font-size: 13px;
  font-weight: 400;
  color: #606266;
}

</style>
