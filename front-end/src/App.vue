<template>
  <div id="app">
    <router-view/>
    <Footer />
  </div>
</template>

<script type="text/javascript">
import NavBar from "@/components/NavBar.vue" ;
import Footer from "@/components/Footer.vue" ;


export default {
  components: {
    NavBar,
    Footer,
   
   
    
  },
  
};
</script>


