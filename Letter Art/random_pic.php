<?php

header('Content-Type: application/json');

   //Check to see if there is a folder name present and that it's not an empty string
   if(isset($_GET['folder']) && $_GET['folder'] !== '') {
      $folder = $_GET['folder'];	//set the value of the folder name
      $folderlen = strlen($folder);	//find the length of the value of the folder name
      $files = array();
      
      //Check that the value of the folder name is a capitalized letter and that there's only one
      if(ctype_upper($folder) && $folderlen === 1) {
         $dir = 'letterArtPics/' . $folder . '/';		//set the directory in which to look for files
         
         if (is_dir($dir)) {
            //Check to see if this is a real directory
            if ($dh = opendir($dir)) {		//If there is a directory handle -> continue
               while (($file = readdir($dh)) !== false) {	//Do the following steps as long as there is still a file to read
                  if ($file != "." && $file != ".." && $file != "BW") {
                     array_push($files, $file);		//create an array of files from the directory
                  }
               }
               closedir($dh);		//close the directory when finished creating the array
            }
         }
            
         $rand_key = array_rand($files, 1);
         echo '{ "filePath" : "' . $dir . $files[$rand_key] . '" }';
      }
   }
	   	
?>