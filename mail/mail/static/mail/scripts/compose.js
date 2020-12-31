function compose_email(recipient=null, subject=null) {

	// Show compose view and hide other views
	document.querySelector('#emails-view').style.display = 'none';
	document.querySelector('#single-mail-view').style.display = 'none';
	document.querySelector('#compose-view').style.display = 'block';

	// if (recipient !== null && subject !== null) {
	// 	console.log('old');
	// 	console.log(recipient);
	// 	console.log(subject);
	// 	document.querySelector('#compose-recipients').disabled = 'true';
	// 	document.querySelector('#compose-subject').disabled = 'true';
	// 	document.querySelector('#compose-recipients').value = recipient;
	// 	document.querySelector('#compose-subject').value = subject;
	// 	document.querySelector('#compose-body').value = '';
	// } else {

		// Clear out composition fields
		console.log("new");
		// document.querySelector('#compose-recipients').disabled = 'false';
		// document.querySelector('#compose-subject').disabled = 'false';
		document.querySelector('#compose-recipients').value = '';
		document.querySelector('#compose-subject').value = '';
		document.querySelector('#compose-body').value = '';
	// }
}

function send_email(event) {

    // Send an API POST request to insert the data into the database
    fetch('/emails', {
        method: 'POST',
        body: JSON.stringify ({
            recipients: document.querySelector('#compose-recipients').value,
            subject: document.querySelector('#compose-subject').value,
            body: document.querySelector('#compose-body').value
        })
    })
    .then(response => response.json())
    .then(result => {
        console.log(result);    // DO SOMETHING
    })

    // Once the email has been sent, prevent the DOM from reloading and then load the user’s sent mailbox.
    event.preventDefault();
    load_mailbox('sent');
}