<template>
<!-- eslint-disable -->

<div class="carousel">

    <slot :currentSlide="currentSlide"/>

    <!-- Navigation -->
    <div class="flex justify-between">
        <div>
            <button @click="prevSlide" class="pt-1 pb-1 pl-3 pr-3 bg-green-700 rounded xl:text-xl text-md text-white">
                Previous
            </button>
        </div>

        <div>
            <button @click="nextSlide" class="pt-1 pb-1 pl-3 pr-3 bg-green-700 rounded xl:text-xl text-md text-white">
                Next
            </button>
        </div>
    </div>

</div>

</template>

<script>
import { ref, onMounted } from 'vue';

export default {
    setup() {
        const currentSlide = ref(1);
        const getSlideCount = ref(null);

        // next slide 
        const nextSlide = () => {
            if (currentSlide.value === getSlideCount.value) {
                currentSlide.value = 1;
                return ; 
            }
            currentSlide.value += 1;
        };

        // prev slide 
        const prevSlide = () => {
            if (currentSlide.value === 1 ){
                currentSlide.value = 1; 
                return ; 
            } 
            currentSlide.value -= 1; 
        };

        onMounted( () => {
            getSlideCount.value = document.querySelectorAll(".slide").length ; 
        })

        return { currentSlide , nextSlide, prevSlide } ; 
    } 
}
</script>