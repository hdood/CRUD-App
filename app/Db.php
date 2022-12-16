<?php
namespace App; 

class DB {
    
    // const  HOST_NAME = 'localhost' ; 
    // const USER_NAME = "root" ; 
    // const USER_PWD = "" ; 
    // const DB_NAME = "livr" ;
    public $conn ;  

    public function connect(){

        $this->conn = mysqli_connect("localhost","root","","livr") or 

        die ("error : " . $this->conn->error) ;         
        
        return $this->conn ; 
    } 
}
?> 