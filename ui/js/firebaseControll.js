$(document).ready(function(){
		var config = {
			apiKey: "AIzaSyAlcyUNCvETPB4DPNtD8PWvEsvm_eZutgg",
			authDomain: "project-4150197757802225017.firebaseapp.com",
			databaseURL: "https://project-4150197757802225017.firebaseio.com",
			storageBucket: "project-4150197757802225017.appspot.com",
		};

	var mainApp =  firebase.initializeApp(config);
	var ref = new Firebase("https://project-4150197757802225017.firebaseio.com/");

	$("#send").click(function()
	{
		saveData();
		$("#send_alert").fadeTo( "slow" , 1, function() {
    		setTimeout(function () {
					$("#send_alert").fadeTo( "slow" , 0);
    		}, 1000);
  	});
	})

	function saveData()
	{
			ref.push
			({
					nazwa:
					{
							mail: user.email,
							info: $("#inputEmail3").val()
					}
			});

		 $("#inputEmail3").val("")

	}

})
