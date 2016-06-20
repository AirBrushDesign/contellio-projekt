// This is called with the results from from FB.getLoginStatus().
function statusChangeCallback( response ) {
  console.log('statusChangeCallback' );
  console.log( response );

  if ( response.status === 'connected' ) {
      testAPI();
    //  loadData(response)

  } else if ( response.status === 'not_authorized' ) {
    // The person is logged into Facebook, but not your app.
      $( "#status" ).html( 'Please log ' +'into this app.' );

  } else {
    // The person is not logged into Facebook, so we're not sure if
    // they are logged into this app or not.
     $("#status").html( 'Please log ' +'into Facebook. ' );

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
  version    : 'v2.6' // use graph api version 2.5
});


FB.getLoginStatus( function( response ) {
  statusChangeCallback( response );
});

};

function login() {
          FB.login(function( response ) {
            // user is now logged out
            console.log( response );
            checkLoginState();

          }, { scope: 'email' });
      }

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
function testAPI() {
  console.log( 'Welcome!  Fetching your information.... ' );
  FB.api('/me?fields=id,name,email',{ fields: ['email','name'] }, function( response ) {
    console.log( 'Successful login for: ' + response.email );

    $( location ).attr( "href","/contellio" )          // route when user is login

  });
}
