<?php
// Replace this email with your own email address
$to_email = "karthick.mindtek@gmail.com";



// Get the form fields and remove whitespace
$name = strip_tags(trim($_POST["name"]));
$email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
$subject = trim($_POST["subject"]);
$message = trim($_POST["message"]);

// Check if the data is valid
if (empty($name) || empty($subject) || empty($message) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo "Please complete all the fields and provide a valid email address.";
    exit;
}

// Build the email content
$email_content = "Name: $name\n";
$email_content .= "Email: $email\n\n";
$email_content .= "Message:\n$message\n";

// Set headers
$headers = "From: $name <$email>";

// Send the email
if (mail($to_email, $subject, $email_content, $headers)) {
    http_response_code(200);
    echo "Thank you! Your message has been sent.";
} else {
    http_response_code(500);
    echo "Oops! Something went wrong and we couldn't send your message.";
}

ini_set('display_errors', 1);
error_reporting(E_ALL);
?>