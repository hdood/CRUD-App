import addModal from "./components/addModal.js";
import deleteConfirm from "./components/deleteConfirm.js";
import formErrorMessage from "./components/formErrorMessage.js";
import productRow from "./components/productRow.js";
import productsTable from "./components/productsTable.js";
import sideNavbar from "./components/sideNavbar.js";
import updateModal from "./components/updateModal.js";
import navbar from "./components/navbar.js";


Vue.component("add-modal", addModal);
Vue.component("delete-confirm", deleteConfirm);
Vue.component("err-msg", formErrorMessage);
Vue.component("product-row", productRow);
Vue.component("products-table", productsTable);
Vue.component("side-navbar", sideNavbar);
Vue.component("update-modal", updateModal);
Vue.component("navbar", navbar);


var element = new Vue({
    el: "#app",
    data: {
      products: [],
      productsTemp : "",
      add: false,
      fadd: false,
      fup: false,
      del: false,
      up: false,
      loading: true,
      operation: null,
      upProduct: {
        number: "",
        name: "",
        price: 22500,
        quantity: 0,
        img: "",
      },
      msg: "",
    },
    methods: {
      All() {
        var xml = new XMLHttpRequest();
        xml.open("POST", "products_api/read");
        xml.send();
        xml.onreadystatechange = function () {
          if (xml.status == 200 && xml.readyState == 4) {
            element.loading = false;
            console.log(xml.response);
            let response = JSON.parse(xml.response);
            if (response.error) {
              element.fadd = true;
              return;
            } else {
              element.products = response.data;
              element.saving();
            }
          }
        };
      },
      saving(){
        this.productsTemp = this.products  ;  
      }
    },
    mounted() {
      this.All(); 
    },
  });
  