<?php 

namespace App; 

class Product {
  
    
 
    //insert a product 
    public static function insert($name, $price, $quantity, $img, $imgType){
        $db = new DB() ;
        $conn = $db->connect() ; 
        $query = "INSERT INTO `produit`(`nomProduit`, `Prix`, `qtt_stk`, `imgProduit`) VALUES (?, ?, ?, ?)" ;
        $stmt = mysqli_stmt_init($conn);
        if(!mysqli_stmt_prepare($stmt, $query)){
            echo('error :  failed to prepare statment . ') ; 
        }else {
            $imgName = $name. "." . $imgType;
            mysqli_stmt_bind_param($stmt, "siis", $name, $price, $quantity, $imgName) ; 
            if(!mysqli_stmt_execute($stmt)){
                return json_encode(array("error" => true)) ; 
            } else {
                move_uploaded_file($img['tmp_name'],"images/" . $imgName) ;  
                return json_encode(array("error" => false)) ;
            } 
        } 
        mysqli_close($conn) ;  
    }

    // check if product exist
    public static function check($number){
        $db = new DB() ;
        $conn = $db->connect() ; 
        $query = "SELECT * FROM produit WHERE `noProduit` = ? " ; 
        $stmt = mysqli_stmt_init($conn) ;
        if(!mysqli_stmt_prepare($stmt, $query)){
            echo('error at check() :  failed to prepare statment . ') ; 
        } else {
            mysqli_stmt_bind_param($stmt,"s", $number) ; 
            mysqli_stmt_execute($stmt) ; 
            mysqli_stmt_store_result($stmt) ;
            if(mysqli_stmt_num_rows($stmt) == 0 ){
                return false ; 
            }
            else {
                return true ; 
            }    
        }
    }

    // update product informations
    public function update(){
        $db = new DB() ;
        $conn = $db->connect() ; 
        if(!Product::check(null)){
            echo  json_encode(array("error" => true,"msg" => "Product don't exist . ")) ;
        } else {
            $query = "UPDATE `produit` SET `nomProduit`= ?, `Prix`= ?, `qtt_stk`= ?, `imgProduit`= ? WHERE `noProduit` = ?  ; " ; 
            $stmt = mysqli_stmt_init($conn) ; 
            if(!mysqli_stmt_prepare($stmt, $query)){
                echo "error : error at update()  failed to prepare statment . " ; 
            } else {
                mysqli_stmt_bind_param($stmt, "siiss",$this->name, $this->price, $this->quantity, $this->img, $this->number) ; 
                if(!mysqli_stmt_execute($stmt)){
                    return json_encode(array("error" => true,"msg" => mysqli_stmt_error($stmt))) ; 
                } else {
                    return json_encode(array("error" => false )) ; 
                }
            }  
        }
        mysqli_close($conn) ; 
    }

    // read all productba
    public static function readall(){
        $db = new DB() ;
        $conn = $db->connect() ; 
        $data = array() ; 
        $query = "SELECT * FROM  `produit`" ; 
        $result =  mysqli_query($conn, $query) ; 
        if(!$result){
            return json_encode(array("error" => true)) ; 
        }else {
            while ($row = mysqli_fetch_array($result)){
                extract($row) ; 
                $data[$noProduit] = array("name"  => $nomProduit, "price" => $Prix, "quantity" => $qtt_stk, "img" => $imgProduit); 
            }
            return json_encode($data);     
        }
        mysqli_close($conn) ; 
    }
    // read single product .
    public static function read_product($number, $echo = true){
        $db = new DB(); 
        $conn = $db->connect() ;
        $data = array() ;  
            $query = "SELECT * FROM `produit` WHERE `noProduit` = ?" ;
            $stmt = mysqli_stmt_init($conn) ;
            if(mysqli_stmt_prepare($stmt,$query)){
                mysqli_stmt_bind_param($stmt,"s",$number) ;
                mysqli_stmt_execute($stmt) ; 
                mysqli_stmt_store_result($stmt) ; 
                if(mysqli_stmt_num_rows($stmt) == 0 ){
                    echo json_encode(array("error" => true , "error_msg" => "product don't exist")) ; 
                }
                else {
                    mysqli_stmt_bind_result($stmt, $number, $name, $price, $quantity, $img) ; 
                    mysqli_stmt_fetch($stmt); 
                    $response = array("number" => $number, "name" => $name, "price" => $price, "quantity" => $quantity, "img" => $img); 
                    if($echo){
                        echo json_encode(array("error" => false, "data" => $response )) ; 
                        return; 
                    }
                    return $response; 
                }
            } 
        }
    // Delete single product .
    public static function delete($number){
        if(Product::check($number)){
            $db = new DB() ; 
            $conn = $db->connect() ; 
            $query = "DELETE from `produit` WHERE `noProduit` = ? " ; 
            $product = Product::read_product($number, false); 
            $imgName = $product['img']; 
            $stmt = mysqli_stmt_init($conn) ; 
            if (!mysqli_stmt_prepare($stmt,$query)) {
                return json_encode(array("error" => true, "msg" => "error : error at update()  failed to prepare statment .")) ; 
            } else {
                mysqli_stmt_bind_param($stmt,"s",$number) ; 
                if(!mysqli_stmt_execute($stmt)){
                    return json_encode(array("error" => true)) ; 
                } else {
                    unlink("images/" . $imgName); 
                    return json_encode(array("error" => false)) ;
                } 
            }
        } else {
            return  json_encode(array("error" => true,"msg" => "Product don't exist.")) ;
        }
    }
    public static function deleteFile($conn ,$number){
        $stmt = mysqli_stmt_init($conn); 
        $query = "SELECT `imgProduit` FROM `produit` WHERE `noProduit` = ?"; 
        if(mysqli_stmt_prepare($stmt, $query)){
            mysqli_stmt_bind_param($stmt ,"s", $number); 
            mysqli_stmt_execute($stmt); 
            mysqli_stmt_store_result($stmt);
            mysqli_stmt_bind_result($stmt, $imgName); 
            mysqli_stmt_fetch($stmt);
            return $imgName; 
        }
    }
} 
