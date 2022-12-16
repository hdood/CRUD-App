var updateModal = {
  data(){
    return {
        state : {
          msg : "" ,
          succes : null , 
        } ,
        loading : false ,
      }
  },
  props: ["product"],
  methods:{
    Update() {
      let uploadedImg = document.getElementById("img-input").files[0];
      this.loading = true ; 
        console.log("number: "+this.product.number+" name" + this.product.name + " price" + this.product.price + " quantity" + this.product.quantity); 

      if (this.product.name == "") {
        this.state.msg = "Product name cannot be empty !";
        return;
      }
      console.log("passed name checking")
      if (parseInt(this.product.price) == 0 || this.product.price == "") {
        this.state.msg = "Price cannot Be 0";
        return;
      }
      
      console.log("passed price checking")
      if (
        uploadedImg &&
        uploadedImg.type != "image/png" &&
        uploadedImg.type != "image/jpeg" &&
        uploadedImg.type != "image/svg" &&
        uploadedImg.type != "image/jpg"
        ) {
          this.state.msg = "file must be an image";
          return;
        } else {
          uploadedImg = this.product.img;
        }
    
      this.post(
        this.product.number,
        this.product.name,
        this.product.price,
        this.product.quantity,
        uploadedImg
      );
    },
    post(number, name, price, quantity, img) {
      let xhr = new XMLHttpRequest();
      let data = new FormData();
    
      that  = this ;  
      data.append("number", number);
      data.append("name", name);
      data.append("price", price);
      data.append("quantity", quantity);
      data.append("img", img);

      xhr.open("POST", "products_api/update");
      xhr.send(data);
      xhr.onreadystatechange = function () {
        if (xhr.status == 200 && xhr.readyState == 4) {
          console.log(xhr.response);
          let response = JSON.parse(xhr.response);
          that.loading = false ; 
          if (response.error) {
            that.state.succes = false ; 
            that.state.msg = "failed to Update product";
            
          } else {
            that.state.succes = true ; 
            that.state.msg = "product updated succefuly";
            element.All();             
          }
        }
      };
    },
    selectfile() {
      var input = document.getElementById("img-input");
      input.click();
    },
  },
  template: `
    <div class="modal fade" id="form" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog " role="document">
        <div class="modal-content">
        <div class="modal-header bg-myblack text-light">
            <h5 class="modal-title" id="exampleModalLabel">Update product</h5>
            <button type="button" class="close bg-myblack text-light" style="border: none ; " data-dismiss="modal" aria-label="Close">
            <span   aria-hidden="true">&times;</span>
            </button>
        </div>
        <div class="modal-body bg-mygray">
            <err-msg @close="state.msg =''" :msg="state.msg" :succes="state.succes" >{{state.msg}}</err-msg>
        <form>
            <div class="form-group mb-2">
                <label for="name">Product Name</label>
                <input type="text" name="name" class="form-control" v-model="product.name"   id="name" aria-describedby="emailHelp" placeholder="Enter Product name">
            </div>
            <div class="row mb-4">
                <div class="col">
                    <label for="price">Price</label>
                    <input type="number"  name="price" v-model="product.price"  class="form-control w-75" id="price" placeholder="Price">
                </div>
                <div class="col">
                    <label for="quantity">Quantity</label>
                    <input type="number" name="quantity" v-model="product.quantity" class="form-control w-75" id="quantity" placeholder="Quantity">
                </div>
            </div>
            <div class="row">
                <div class="col">
                    <a href="#" @click="selectfile()" class="btn btn-secondary">Select Image</a>
                    <input style="display:none"   type="file" name="img" class="form-control-file w-25" id="img-input">
                </div>
            </div>
            <a class="btn btn-outline-secondary" >Reset</a>
        </form>
        </div>
        <div class="modal-footer">
            <button type="button" @click="$emit('close')" class="btn btn-outline-danger" data-dismiss="modal">Close</button>
            <button type="button" @click="Update()" class="btn btn-primary">
            <span v-if="!loading">Update</span> 
            <div class="update-loading" v-if="loading"></div>
            </button>
        </div>
        </div>
    </div>
    </div>
    
    `,
};
export default updateModal;
