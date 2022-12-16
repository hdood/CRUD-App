var navbar = {
    props:['title'] , 
    methods: {
      displayCart(){ 
        var cart = document.querySelector('.cart') ; 
        cart.style.left = "" ; 
        
        cart.style.top = "4rem" ; 
        cart.style.right = "2rem" ;
        cart.style.opacity = "1" ;
      }
    },
    template:
     `
     <vs-navbar center-collapsed>
     <template #left>
       <img src="/logo2.png" alt="">
     </template>
     <vs-navbar-item active="true" id="guide">
       Guide
     </vs-navbar-item>
     <vs-navbar-item active="false'" id="docs">
       Documents
     </vs-navbar-item>
     <vs-navbar-item active="false'" id="components">
       Components
     </vs-navbar-item>
     <vs-navbar-item active="false" id="license">
       license
     </vs-navbar-item>
     <template #right>
       <vs-button flat >Login</vs-button>
       <vs-button>Get Started</vs-button>
     </template>
    </vs-navbar>
     `
}; 
export default navbar ; 