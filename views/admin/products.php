<!DOCTYPE html> 
<html> 
    <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="author" content="Bouguerzi Mahdi"> 
        <title>Admin Panel</title>  
        <link rel="stylesheet" href="css/admin/products/main.css">
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.2/css/all.min.css" integrity="sha512-1sCRPdkRXhBV2PBLUdRb4tMg1w2YPf37qatUFeS7zlBy7jJI8Lf4VHwWfZZfpXtYSLy85pkm9GaYVYMfw5BC1A==" crossorigin="anonymous" referrerpolicy="no-referrer" />
        <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
        <script src="https://cdn.jsdelivr.net/npm/popper.js@1.14.7/dist/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
        <link href="https://unpkg.com/vuesax@4.0.1-alpha.16/dist/vuesax.min.css" rel="stylesheet">
    </head>
    <body> 
    
        <div id="app">
            <navbar title="Admin Panel"></navbar>
            <div class="row main">
            <side-navbar ></side-navbar>
                    <div class="container mt-3 mb-3">
                        <div class="row">
                            <div class="col">
                                <p class="h3">Products</p>
                            </div>
                            <div class="col">
                                <a style="float:right" type="button" data-toggle="modal" data-target="#add-form" class="shadow btn btn-primary">+ Add product</a>
                            </div> 
                        </div>
                        <hr>
                    </div>
                    <products-table :products="products" @delete="upProduct = products[$event],upProduct.number = $event" @update="upProduct = products[$event],upProduct.number = $event" :loading="loading" ></products-table>
                </div>
            </div>
                <update-modal @close="products[upProduct.number] = productsTemp[upProduct.number]" :product="upProduct"></update-modal>
                <add-modal></add-modal>
                <delete-confirm  :product="upProduct"></delete-confirm>
        </div>
        <script src="js/vuejs/vue.js"></script>
        <script src="https://unpkg.com/vuesax@4.0.1-alpha.16/dist/vuesax.min.js"></script>
        <script type="module" src='js/admin/products/main.js'></script>
    </body>     
</html> 
