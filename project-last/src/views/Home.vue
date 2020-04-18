<template>
  <div class="home">
    <div class="home-left">
      <router-link to="/task">任务</router-link>
      <router-link to="/bianqian">便签</router-link>
      <router-link to="/project">项目</router-link>
      <router-link to="/city">地点</router-link>
      <router-link to="/biaoqian">标签</router-link>
    </div>
    <div class="home-right">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "home",
  components: {},
};
</script>

<style lang="scss">
.home {
  width: 100%;
  height: 100%;
  display: flex;
  .home-left {
    flex: 1;
    height: 100%;
    background: #011;
    a {
      width: 100%;
      height: 50px;
      display: flex;
      justify-content: center;
      align-items: center;
      color: white;
      &.router-link-exact-active {
        color: blue;
        background: #999;
      }
    }
  }
  .home-right {
    flex: 9;
  }
}
</style>