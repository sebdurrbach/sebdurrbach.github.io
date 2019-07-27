<?php

	if ($_POST) {

		$lastname = $_POST['lastname'];
		$firstname = $_POST['firstname'];
		$email = $_POST['email'];

		if (!empty($_POST['company'])) {
			$company = $_POST['company'];
		} else {
			$company = 'N/A';
		}

		if (!empty($_POST['country'])) {
			$country = $_POST['country'];
		} else {
			$country = 'N/A';
		}

		$message = wordwrap($_POST['message'], 70, "\r\n");
		$message .= "\r\n\r\n".$firstname." ".$lastname."\r\n";
		$message .= $email."\r\n";
		$message .= $company." - ".$country."\r\n";

		$to = 'sebastien.durrbach@gmail.com';
		$subject = "Message Portfolio";
		
		$header = "From: ".$firstname." ".$lastname."<$email> \r\n";
      $header .= "Reply-to: ".$email."\r\n";
      $header .= "MIME-Version: 1.0 \r\n"; 
      $header .= "X-Mailer: PHP/".phpversion();

		if (mail($to, $subject, $message, $header)) {
			echo 1;
		};
		
	}

?>


