function resetWord() {
   //Clear the word in the text box and change back to default word

   document.getElementById("selectedWord").value = '';
   setWord();
}

function setWord() {
   //Take the word typed in and convert to uppercase and get its length
   //If there is no word typed in - automatically use "WHIZZBANGS"

   var word;
   var wordLength;

   if (document.getElementById("selectedWord").value !== '') {
      clearWord();
      word = document.getElementById("selectedWord").value;
      word = word.toUpperCase();
   }
   else {
      clearWord();
      word = "WHIZZBANGS";
   }
   //Take out any spaces that may have been entered into the word
   word = word.replace(/\s+/g, '');
   wordLength = word.length;

   //Add the word to the hidden input field in the form to post

   //Call the setLetters function from below, giving it the word typed and its length
   setLetters(word, wordLength);
}

function createDivs(length) {
   //Determine the number of divs that will be needed to show the letters
   //Expand the mat around the divs so they're centered within the frame

   var mat = document.getElementById("mat");
   var newDiv;
   var marginLeft;
   var i = 1;

   if (length == 1) {
      alert("We're sorry, but the word must be at least 2 letters long.");
   }
   else if (length >= 11) {
      alert("We're sorry, but the word cannot be longer than 10 letters long.");
   }
   else {
      mat.style.width = length * 100 + "px";

      //Create a new div for every letter that is in the word, giving it an id and a class name
      for (i; i <= length; i++) {
         newDiv = document.createElement("div");
         newDiv.className = "letterArt";
         newDiv.id = "div_img_" + i;
         mat.appendChild(newDiv);
      }
   }
}

function setLetters(fullword, length) {
   //Break the typed word into its individual letters

   var letters = fullword.split("");
   var i = 0;
   var imageDiv;
   var newImage;

   //Call the createDivs function from above, giving it the length of the word
   createDivs(length);

   for (i; i < length; i++) {
      //Call the getLetters function from below, giving it the current number i and letter from the array
      //Get the div that the image should be displayed in and add the image to it
      newImage = getLetters(i, letters[i]);
      imageDiv = document.getElementById("div_img_" + (i + 1));
      imageDiv.appendChild(newImage);
   }
}

function getLetters(i, letter) {
	//This will take the number and letter given and find a random image associated with that letter based on whether the user wants color or bw pictures

	var image = document.createElement("img");
	var filename;		//The file that the php will randomly choose a letter for
	var folderLocation = letter;		//The folder that the php will randomly choose a file from
        var choosePic = function() {
           //Get the id of the picture clicked, find the length of the id and get the last letter from it

           var imageId = this.id;
           var length = imageId.length;
           var folderLocation = imageId.charAt(length - 1);

           //Call the iFrame() function from below, giving it the folder location to look in
           iFrame(folderLocation, imageId);
        };

	filename = $.get(
			'random_pic.php',
			{ folder : folderLocation },
			function(data) {
				image.src = "/" + data.filePath;
				image.id = "img_" + i + "_" + letter;
				image.className = "images";
                                image.onclick = choosePic;
				image.name = "img_" + (i + 1);
			},
			"json");
	return image;
}

function clearWord() {
	//This will clear out any word that is showing in the frame

	var mat = document.getElementById("mat");
	while (mat.hasChildNodes()) {
		mat.removeChild(mat.lastChild);
	}
}

function formReset() {
	//This resets the form, allowing the user to start over and clears the frame

	var wordBox = document.getElementById("selectedWord");

	document.getElementById("choose").reset();
	wordBox.value = '';
	wordBox.focus();

	clearWord();
	setWord();
}

/*function choosePic() {
	//Get the id of the picture clicked, find the length of the id and get the last letter from it

	var imageId = this.id;
	var length = imageId.length;
	var folderLocation = image.Id.charAt(length - 1);

	//Call the iFrame() function from below, giving it the folder location to look in
	iFrame(folderLocation, imageId);
}*/

function iFrame(folderLocation, id) {
	//Creates an iframe that shows all of the images available in a particular folder

	var ifrm = document.createElement("iframe");
	var background = document.createElement("div");
	var img = document.createElement("img");

	ifrm.setAttribute("class", "iframefloat");
	ifrm.setAttribute("id", "iframe" + id);
	background.id = "hide"
	img.src = "graphics/close_button.png";
	img.id = "close";

	ifrm.setAttribute("src","choose_pic.php?folder=" + folderLocation);

        document.body.appendChild(background);
	document.body.appendChild(ifrm);
	document.body.appendChild(img);

	background.onclick = function() {
		document.body.removeChild(background);
		document.body.removeChild(ifrm);
		document.body.removeChild(img);
	};

	img.onclick = function() {
		document.body.removeChild(background);
		document.body.removeChild(ifrm);
		document.body.removeChild(img);
	};
}

function letterSelected(folder, file) {
   var ifrmid = findIframeId();
   var ifrm = document.getElementById(ifrmid);
   var imageReplace = ifrmid.replace("iframe", "");
   var newSrc;
   var background = document.getElementById("hide");
   var close = document.getElementById("close");
   
   newSrc = "letterArtPics/" + folder + "/" + file;

   document.body.removeChild(background);
   document.body.removeChild(close);
   document.body.removeChild(ifrm);
   
   document.getElementById(imageReplace).src = newSrc;
}

function findIframeId() {
   var iframes = document.getElementsByTagName("iframe");
   var number = iframes.length;
   var ifrmid = iframes[number - 1].getAttribute("id");
   
   return ifrmid;
}

$(".choose").submit(function() {
   setWord();
   return false;
});

$("#selectedWord").keyup(function(event){
    if(event.keyCode == 13){
        //$("#changeWord").click();
        setWord();
        return false;
    }
});

/* -------- Directions Scroller ---------- */
function animations(n) {
   var div = '.js-dir' + n;
   $(div).animate({top: "25px", opacity: 1}, 1750, 'linear');
   $(div).animate({top: 0, opacity: 0}, 1750, 'linear');
   setTimeout(function() {
      n++;
      if (n <= 2) {
         animations(n);
      }
      else if (n == 3) {
         div = '.js-dir' + n;
         $(div).animate({top: "25px", opacity: 1}, 1750, 'linear');
      }
   }, 4000);
}

function repeatDirections() {
   $('.directions').css("top", "50px");
   $('.repeat').css({"opacity": "0", "top": "50px"});
   animations(0);
}

$(document).ready(function() {
   setWord();
   animations(0);
});