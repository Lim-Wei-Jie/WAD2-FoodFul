<template>

<div class="slide">
    <transition name="slide">
        <slot />
    </transition>
</div>
  
</template>

<script>
export default {

}
</script>

<style>

.slide-enter-active, 
.slide-leave-active{
    opacity: 0;
}

.slide-enter-from,
.slide-leave-to{
    opacity: 0;
}

.slide-enter-to,
.slide-leave-from{
    opacity: 0;
}

</style>