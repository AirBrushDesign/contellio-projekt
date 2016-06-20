<?php

// Kickstart the framework
require( 'lib/request.php' );
$f3=require( 'lib/base.php' );
$f3->config( 'config.ini' );
$f3->route( 'GET /',
	function($f3 ) {
		$classes=array(
			'Base'=>
				array(
					'hash',
					'json',
					'session'
				),
			'Cache'=>
				array(
					'apc',
					'memcache',
					'wincache',
					'xcache'
				),
			'DB\SQL'=>
				array(
					'pdo',
					'pdo_dblib',
					'pdo_mssql',
					'pdo_mysql',
					'pdo_odbc',
					'pdo_pgsql',
					'pdo_sqlite',
					'pdo_sqlsrv'
				),
			'DB\Jig'=>
				array('json'),
			'DB\Mongo'=>
				array(
					'json',
					'mongo'
				),
			'Auth'=>
				array('ldap','pdo'),
			'Bcrypt'=>
				array(
					'mcrypt',
					'openssl'
				),
			'Image'=>
				array('gd'),
			'Lexicon'=>
				array('iconv'),
			'SMTP'=>
				array('openssl'),
			'Web'=>
				array('curl','openssl','simplexml'),
			'Web\Geo'=>
				array('geoip','json'),
			'Web\OpenID'=>
				array('json','simplexml'),
			'Web\Pingback'=>
				array('dom','xmlrpc')
		);

			$f3->set( 'content', 'welcome.htm' );
			echo View::instance()->render( 'layout.htm' );

	}
);

$f3->route('GET /login',
	function( $f3 ) {
		$f3->set( 'content','login.html' );
		echo View::instance()->render( 'layout.htm' );
	}
);


$f3->route( 'GET /controller/@token',
    function( $f3, $params ) {

			$graph_url = "https://graph.facebook.com/me?access_token=".$params[ 'token' ];
			$req = new Request( $graph_url );
			$response = $req->DownloadToString();
			$decoded_response = json_decode( $response );																								// controller, send items

  			  if ( $decoded_response->error )
					{
  			  	echo "Błąd";
  			  }
  				else
					{
						$f = file_get_contents( "http://app.contellio.com/api/public/random-item" );
						echo $f;
   				}
    }
);

$f3->run();
