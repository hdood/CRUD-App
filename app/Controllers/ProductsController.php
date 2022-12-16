<?php 
namespace App\Controllers; 

use App\Product;  
use App\DB; 


class ProductsController {
    public function index(){
        echo Product::readall(); 
    }
    public function save($request){
        $response = Product::insert($request['name'], $$request['price'], $request['quantity'], $request["img"], $request["type"]); 
        echo $response ; 
    }
    public function update($request){
    }
    public function delete($number){
        $number = $number; 
        echo Product::delete($number); 
    }
    public function show($number){
        $number = $number ; 
        $resault = Product::read_product($number) ; 
    }
}


   