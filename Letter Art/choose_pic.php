<html>
<head>
   <link rel="stylesheet" type="text/css" href="css/photoArt.css" />
   <link rel="stylesheet" type="text/css" href="css/responsive.css" />
</head>
<body>

<?php

	include 'database_connect.php';
	$con = dbconnect("tdsheets_letter_art.sql");

   //Check to see if there is a folder name present and that it's not an empty string
   if(isset($_GET['folder']) && $_GET['folder'] !== '') {
      $folder = $_GET['folder'];		//set the value of the folder name
      $folderlen = strlen($folder);		//find the length of the value of the folder name
      $i = 1;					//increments for element ids
      
      //Check that the value of the folder name is a capitalized letter and that there's only one
      if(ctype_upper($folder) && $folderlen === 1) {
         $dir = 'letterArtPics/' . $folder;		//set the directory in which to look for files
         
         if (is_dir($dir)) {	//Check to see if this is a real directory
            if ($dh = opendir($dir)) {	//If there is a directory handle -> continue
               echo "<table><tr class='letterRow'>";
               while (($file = readdir($dh)) !== false) {	//Do the following steps as long as there is still a file to read
                  if ($file != "." && $file != ".." && $file != "BW") {
                     $sel = "select PhotoSource from letterFiles where Photo='$file'";
                     $run_sel = mysqli_query($con, $sel);
                     $source = mysqli_fetch_array($run_sel, MYSQLI_NUM);
                     
                     $id = $folder . '_' . $i;		//create an id for the file on the page
                     echo '<td><center><img src="' . $dir . '/' . $file . '" class="imageChoices" id="' . $id . '" onclick="parent.letterSelected(\'' . $folder . '\', \'' . $file. '\');" />';
                     echo '<a href="' . $source[0] . '" target="_blank" class="source">Source</a></center></td>';
                  }
                  $i++;
               }
               echo "</tr></table>";
               closedir($dh);		//close the directory when finished creating the array
            }
         }
      }
   }
	   	
?>
</body>
</html>