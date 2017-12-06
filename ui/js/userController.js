$(document).ready(function(){
		user = {
			token : null,
			email : null,			//global object user
			name: null,
		}
		// This is called with the results from from FB.getLoginStatus().
		function statusChangeCallback( response ) {
			console.log( 'statusChangeCallback' );
			console.log( response );

			if (response.status === 'connected' ) {
				// Logged into your app and Facebook.
					user.token = response.authResponse.accessToken;
					testAPI( user.token );
				//  loadData(response)

			} else if ( response.status === 'not_authorized' ) {
					$( location ).attr( "href","login" )
				// The person is logged into Facebook, but not your app.

			} else {
					$( location ).attr( "href","login" )
				// The person is not logged into Facebook, so we're not sure if
				// they are logged into this app or not.

			}
		}


		// This function is called when someone finishes with the Login
		// Button.  See the onlogin handler attached to it in the sample
		// code below.
		function checkLoginState() {
			FB.getLoginStatus( function( response ) {
				statusChangeCallback( response );
			});
		}

		window.fbAsyncInit = function() {
		FB.init({
			appId      : '1344877882193777',
			cookie     : true,  // enable cookies to allow the server to access  the session
			xfbml      : true,  // parse social plugins on this page
			version    : 'v2.6'
		});


		FB.getLoginStatus(function( response ) {
			statusChangeCallback( response );
		});

		};

		// Load the SDK asynchronously
		(function(d, s, id){
			 var js, fjs = d.getElementsByTagName(s)[0];
			 if (d.getElementById(id)) {return;}
			 js = d.createElement(s); js.id = id;
			 js.src = "//connect.facebook.net/en_US/sdk.js";
			 fjs.parentNode.insertBefore(js, fjs);
		 }(document, 'script', 'facebook-jssdk'));

		// Here we run a very simple test of the Graph API after login is
		// successful.  See statusChangeCallback() for when this call is made.
		function testAPI( token ) {
			console.log('Welcome!  Fetching your information.... ');
			FB.api('/me?fields=id,name,email',{ fields: ['email','name'] }, function(response) {

				user.name = response.name;
				user.email = response.email.trim(); // "MyEmailAddress@example.com"
				md =  md5( user.email );
				$.ajax({
							 type: "GET",
							 url: 'http://pl.gravatar.com/'+md+'.json',
							 dataType: "JSONP",
							 success: function( response )
								{
										$( "#gravatar" ).attr( "src", response.entry[0].thumbnailUrl );
							 	},
							 	error: function ( xhr )
								{
									 alert( xhr.responseText )
							 	}
						});

				$( "#u_name" ).html( user.name ); 			// Show user name

				console.log( 'Successful login for: ' + response.name );
				console.log( token )
				$.ajax({
							 type: "GET",
							 url: "/contellio/controller/" + token,
							 dataType: "JSON",
							 success: function ( response )
							 {

										$("#viewer").append("<img class='img-responsive' src='"+response.cover_url+"'>")
										$( "#i_id" ).html( response.item_id);
										$( "#i_title" ).html( response.title);
										$( "#i_format" ).html( response.format);
										$( "#loading_page" ).hide();
										console.log( response )

							 },
							 error: function ( xhr ) {

									 console.log( xhr.responseText )
							 }
						});
			});
		}
		$("#fb-out").click(function(){
					FB.logout( function( response )
					{
						checkLoginState();
					});
			});
});
