var sideNavbar = {
  template: `
          <div class="col-2 shadow-lg   sidenav bg-myblack rounded">
                 <div class="row p-3">
                      <span class="text-muted">ANALYTICS</span>
                 </div>    
                 <div class="row text-center justify-content-center">
                      <a class="mb-3 p-2 w-75" href="#">
                          <i class="fa-solid fa-gauge"></i>&nbsp; 
                          Dashboard
                      </a>
                 </div>
                 <div class="row text-center justify-content-center">
                      <a class=" mb-3 p-2 w-75" href="#">
                          &nbsp;
                          <i class="fa-solid fa-chart-line"></i>&nbsp; 
                          Performance
                      </a>
                 </div>
                 <div class="row p-3">
                      <span class="text-muted">CONTENT</span>
                 </div>    
                 <div class="row text-center justify-content-center">
                      <a class="mb-3 p-2 w-75" href="products">
                         <i class="fa-solid fa-shirt"></i>&nbsp; 
                          Products
                      </a>
                 </div>
                 <div class="row text-center justify-content-center">
                      <a class=" mb-3 p-2 w-75" href="Orders">
                          <i class="fa-solid fa-file-pen"></i>&nbsp; 
                          Orders
                      </a>
                 </div>
                 <div class="row p-3">
                      <span class="text-muted">CUSTOMIZATION</span>
                 </div>    
                 <div class="row text-center justify-content-center">
                      <a class="mb-3 p-2 w-75" href="#">
                          <i class="fa-solid fa-brush"></i>&nbsp; 
                          Themes
                      </a>
                 </div>
          </div>
      `,
};
export default sideNavbar;