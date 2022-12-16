var deleteConfirm = {
  template: `
        <div class="modal fade" id="delete-confirm" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog " role="document">
            <div class="modal-content">
            <div class="modal-header bg-myblack text-light">
                <h5 class="modal-title" id="exampleModalLabel">Delete {{product.name}}</h5>
                <button type="button" class="close bg-myblack text-light" style="border: none ; " data-dismiss="modal" aria-label="Close">
                <span   aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body bg-mygray">
                are you Sure Want To delete this product?
                </div>
                <div class="modal-footer">
                <button type="button" @click="loading = false"  class="btn btn-outline-danger" id="del-btn" data-dismiss="modal">Cancel</button>
                <button type="button" @click="del()"   class="btn btn-primary">
                <span v-if="!loading">Delete</span> 
                <div class="update-loading" v-if="loading"></div>
                </button>
                </div>
                </div>
                </div>
                </div>
                `,
  props: ["product"],
  data() {
    return {
      loading: false,
    };
  },
  methods: {
    del() {
      this.loading = true;

      var that = this;

      let data = new FormData();
      data.append("number", this.product.number);

      let xhr = new XMLHttpRequest();
      xhr.open("POST", "products_api/delete");
      xhr.send(data);

      xhr.onreadystatechange = function () {
        if (xhr.status == 200 && xhr.readyState == 4) {
          console.log(xhr.response);
          let response = JSON.parse(xhr.response);
          if (response.error) {
            console.log("somthing went wrong");
            that.loading = false;
            let btn = document.querySelector("#del-btn");
            btn.click();
          } else {
            that.$root.All();
            that.loading = false;
            let btn = document.querySelector("#del-btn");
            that.$vs.notification({
              position:"bottom-right", 
              color:"#39314b", 
              title:"Product deleted succefully",
            }); 
            btn.click();
          }
        }
      };
    },
  },
};
export default deleteConfirm;
