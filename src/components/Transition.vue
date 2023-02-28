<script >


</script>

<template>
  <!-- 包装内置的 Transition 组件 -->
  <Transition
    name="my-transition"
    @enter="onEnter"
    @leave="onLeave"
    mode="out-in"
    appear>
    <slot></slot> <!-- 向内传递插槽内容 -->
  </Transition>

</template>

<style scss>
/*
  必要的 CSS...
  注意：避免在这里使用 <style scoped>
  因为那不会应用到插槽内容上
*/

/*
  进入和离开动画可以使用不同
  持续时间和速度曲线。
*/
.my-transition-enter-active {
  transition: all 0.8s ease-out;
  /* transition-delay: */
}

.my-transition-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.my-transition-enter-from,
.my-transition-leave-to {
  transform: translateY(50px);
  opacity: 0;
}
</style>
