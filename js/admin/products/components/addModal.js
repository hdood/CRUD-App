var addModal = {
  data() {
    return {
      product: {
        name: "",
        price: null,
        quantity: null,
      },
      state: {
        msg: "",
        succes: null,
      },
      loading: false,
    };
  },
  methods: {
    Add() {

      let name = this.$refs.nameInput.value;
      let price = this.$refs.priceInput.value; 
      let quantity = this.$refs.quantityInput.value;
      let uploadedImg = document.getElementById("img-input-add").files[0];
      this.loading = true;


      if (name == "") {
        this.state.msg = "Product name cannot be empty !";
        return;
      }
      if (parseInt(price) == 0 || price == "") {
        this.state.msg = "Price cannot Be 0";
        return;
      }
      if (!uploadedImg) {
        this.state.msg = "Please Select an Image to the product ! ";
        return;
      }

      if (
        uploadedImg &&
        uploadedImg.type != "image/png" &&
        uploadedImg.type != "image/jpeg" &&
        uploadedImg.type != "image/svg" &&
        uploadedImg.type != "image/jpg"
      ) {
        this.state.msg = "file must be an image";
        return;
      }
      let imgType = uploadedImg.type.split("/")[1];


      this.post({
        "name" : name,
        "price" : price,
        "quantity"  : quantity, 
        "img" : uploadedImg,
        "type" : imgType  
      });
    },

    post({name, price, quantity, img, type}) {
      let xhr = new XMLHttpRequest();
      let data = new FormData();

      var that = this;
      data.append("name", name);
      data.append("price", price);
      data.append("quantity", quantity);
      data.append("img", img);
      data.append("type", type);

      xhr.open("POST", "products_api/add");
      xhr.send(data);
      xhr.onreadystatechange = function () {
        if (xhr.status == 200 && xhr.readyState == 4) {
          that.loading = false;
          let response = JSON.parse(xhr.response);
          if (response.error) {
              console.error("failed to add"); 
          } else {

            that.$refs.close.click(); 
            that.$root.All();
            that.$vs.notification({
              position:"bottom-right", 
              color:"#39314b", 
              title:"Product Added succefully",
            }); 
          }
        }
      };
    },
    selectfile() {
      var input = document.getElementById("img-input-add");
      input.click();
    },
  },
  template: `   
    <div class="modal fade" id="add-form" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog " role="document">
            <div class="modal-content">
            <div class="modal-header bg-myblack text-light">
                <h5 class="modal-title" id="exampleModalLabel">Add product</h5>
                <button type="button" class="close bg-myblack text-light" style="border: none ; " data-dismiss="modal" aria-label="Close">
                <span   aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body bg-mygray">
                <err-msg @close="state.msg =''" :msg="state.msg" :succes="state.succes" >{{state.msg}}</err-msg>
            <form>
                <div class="form-group mb-2">
                    <label for="name">Product Name</label>
                    <input type="text" ref="nameInput" name="name" class="form-control"    id="name" aria-describedby="emailHelp" placeholder="Enter Product name">
                </div>
                <div class="row mb-4">
                    <div class="col">
                        <label for="price">Price</label>
                        <input type="number" ref="priceInput"  name="price"  class="form-control w-75" id="price" placeholder="Price">
                    </div>
                    <div class="col">
                        <label for="quantity">Quantity</label>
                        <input type="number" ref="quantityInput" name="quantity" class="form-control w-75" id="quantity" placeholder="Quantity">
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <a href="#" @click="selectfile()" class="btn btn-secondary">Select Image</a>
                        <input style="display:none"   type="file" name="img" class="form-control-file w-25" id="img-input-add">
                    </div>
                </div>
                <a class="btn btn-outline-secondary" >Reset</a>
            </form>
            </div>
            <div class="modal-footer">
                <button type="button" ref="close" class="btn btn-outline-danger" data-dismiss="modal">Close</button>
                <button type="button" @click="Add()" class="btn btn-primary">
                <span v-if="!loading">Add</span> 
                <div class="update-loading" v-if="loading"></div>
                </button>
            </div>
            </div>
        </div>
    </div>
    
    
    `,
};
export default addModal;
