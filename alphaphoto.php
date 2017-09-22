<html>
<head>
 <link rel="stylesheet" type="text/css" href="photoArt.css" />
 <script src="jquery-2.0.3.min.js"></script>
 <script src="wordArt.js"></script>
        
<title>Letter Art</title>
</head>
<body>
<main>
<div id="options">
   <form id="choose">
      <table id="directions">
         <tr>
            <td>1.</td>
            <td><label><span>Enter a name</span> or word in the box below</label></td>
         </tr>
         <tr>
            <td>2.</td>
            <td><label><span>Click Go</span> to transform your word into</label></td>
         </tr>
         <tr>
            <td></td>
            <td><label>Letter Art</label></td>
         </tr>
         <tr>
            <td>3.</td>
            <td><label><span>Click a photo</span> to view image choices</label></td>
         </tr>
         <tr>
            <td colspan="2"><input type="text" id="selectedWord" /><button type="button" id="changeWord" onclick="setWord()">Go</button></td>
            <td></td>
         </tr>
      </table>
   </form>
</div>

<div id="changes">
   <span onclick="setWord()">Shuffle Letters</span> | <span onclick="clearWord()">Clear Word</span>
</div>

<div id="frame">
   <div id="mat">
   </div>
</div>

<div id="info">
   <p>Click on a letter to change it.</p>
</div>
</main>
<footer>
        <div class="row">
            <p>
                <a href="index.html">SheetsNGeekles.com</a>
            </p>
            </div>
            <p>
                Copyright &copy; 2016 by Tara Sheets. All rights reserved.
            </p>
            <div class="row social-links clear-fix">
                <a href="https://www.linkedin.com/in/tdsheets" target="_blank"><i class="ion-social-linkedin"></i></a>
            </div>
    </footer>

</body>
</html>