var productRow = {
  props: ["product", "number"],
  template: `
          <tr>
              <td>{{ number }}</td>
              <td>{{ product.name }}</td>
              <td>{{ product.price }} </td>
              <td>{{ product.quantity }}</td>
              <td>
                  <img :src="'images/'+product.img" width="100" height="100" :alt="product.name+' Image'">
              </td>
              <td>
                  <button @click="$emit('update')" type="button" data-toggle="modal" data-target="#form" class="op-btn shadow update">Update</button>
                  <button @click="$emit('delete')" type="button" data-toggle="modal" data-target="#delete-confirm" class="op-btn shadow delete">Delete</button>
              </td> 
          </tr> 
      `,
};
export default productRow;
