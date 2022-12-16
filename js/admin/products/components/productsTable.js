var productsTable = {
    data(){
        return {
            upProduct:[] ,  
        }
    },
    props:["products","loading"], 
    template : 
    `
    <div class="container rounded shadow table-container">
        <table>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Image</th>
                    <th colspan="2">operations</th>
                </tr>
            </thead>
            <tbody>
                <tr v-if="loading">
                    <td class="basic"></td>
                </tr>
                <tr is="product-row" v-for="(product,number) in products" @delete="$emit('delete',number)" @update="$emit('update',number)"
                :number="number" :key="number"  :product="product" ></tr>
            </tbody>
        </table>
    </div>    
    `
};
export default productsTable;