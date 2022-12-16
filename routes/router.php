<?php
use App\Controllers\ProductsController; 

$router = new AltoRouter();

$router->setBasePath('/GL/');

$router->map('GET','', 'views/home.php', 'home');
$router->map('GET','products', 'views/admin/products.php', 'admin_products');
$router->map('GET','product/[i:id]', 'views/product.php', 'product');
$router->map('GET', 'products_api', function(){
    $controller = new ProductsController(); 
    $controller->index(); 
}, 'product_api');


$match = $router->match(); 

if($match){
    if(is_string($match['target'])){

        require $match['target'];
        return; 
    }
    call_user_func($match['target']);
    return;  
}
else{
    require '404.php'; 
}
