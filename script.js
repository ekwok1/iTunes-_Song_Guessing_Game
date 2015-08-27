$(function() {
	startButton();
	submitButton();
	submitForm();
	nextButton();
});

var songIds = ["995535015", "966411602", "823593456", "956689796", "943946671",
               "982388023", "907242704", "201281527", "656801339", "910038357",
               "250038575", "878000348",  "794095205",  "1645339",  "400835962",
               "325618", "169003415",  "51958108",
               "76532142", "192688540", "684811768", "344799464", "217633921",
               "192811017", "640047583", "517438248"];

function nextButton(){
	$("#nextButton").on("click", function(){
		nextSong();
		$artistName.html("");
		$songName.html("");
		$(".coverArt").empty();
	});
}

function nextSong(){
	randomSong();
}

function submitButton(){
	$("#submitButton").on("click", function(){
		checkAnswer();
	});
}

function submitForm(){
	$("#submitForm").on("submit", function(){
		checkAnswer();
	});
}

var correct = 0;
var incorrect = 0;

var $artistName;
var $songName;
var $coverArt;

function checkAnswer(){
	var $formValue = $("#guess").val();
	var $object = object.results[0];

	$artistName = $("#artistName");
	$songName = $("#songName");
	$coverArt = $(".coverArt");

	$artistName.html($object.artistName);
	$songName.html($object.trackName.split(" (")[0]);
	$coverArt.html('<img src='+$object.artworkUrl100+' id="coverArt">');

	if ($formValue === object.results[0].trackName) {
		correct++;
		$("#correct").html(correct);
	} else {
		incorrect++;
		$("#incorrect").html(incorrect);
	}
}

function startButton(){
	$("#startGame").on("click", function(){
		randomSong();
	});
}

var object;
function randomSong(){
	$.ajax({
		url: "https://itunes.apple.com/lookup?id="+songIds[randomNum()],
		jsonp: "callback",
		dataType: "jsonp"
	}).done(function(data){
		$("#audioContainer").empty();
		object = data;
		console.log(object);
		$("#audioContainer").append($('<audio id="audio_preview" src='+object.results[0].previewUrl+' autoplay </audio>'));
	});
}

function randomNum(){
	return _.random(songIds.length-1);
}

// function testAjax(){
// 	$.ajax({
//    	url: "https://itunes.apple.com/lookup?id=794095205",
//    	jsonp: "callback",
//    	dataType: "jsonp"
// 	}).done(function(data) {
//   	console.log(data);
// 	});
// }