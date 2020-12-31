document.addEventListener('DOMContentLoaded', function() {

	// Use buttons to toggle between views
	document.querySelector('#inbox').addEventListener('click', () => load_mailbox('inbox'));
	document.querySelector('#sent').addEventListener('click', () => load_mailbox('sent'));
	document.querySelector('#archived').addEventListener('click', () => load_mailbox('archive'));
	document.querySelector('#compose').addEventListener('click', compose_email);

	// Listen to clicks on the submit button and attempt to send email(s)
	document.querySelector('#submit-btn').addEventListener('click', event => {

		// Send an API POST request to store the data into the database
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
	})

	// By default, load the inbox
	load_mailbox('inbox');
});

function compose_email() {

	// Show compose view and hide other views
	document.querySelector('#emails-view').style.display = 'none';
	document.querySelector('#single-mail-view').style.display = 'none';
	document.querySelector('#compose-view').style.display = 'block';

	// Clear out composition fields
	document.querySelector('#compose-recipients').value = '';
	document.querySelector('#compose-subject').value = '';
	document.querySelector('#compose-body').value = '';
}

function load_mailbox(mailbox) {

	// Delete the contents of the previous view (if any)
	if (document.querySelector('.contents-container') != null) {
		const elem = document.querySelector('.contents-container');
		document.querySelector('#single-mail-view').removeChild(elem);
	}
  
	// Show the mailbox name
	document.querySelector('#emails-view').innerHTML = `<h3>${mailbox.charAt(0).toUpperCase() + mailbox.slice(1)}</h3>`;

	// Show a spinner and hide other views
	document.querySelector('#compose-view').style.display = 'none';
	document.querySelector('#single-mail-view').style.display = 'none';
	document.querySelector('#spinner').style.display = 'flex';

	// Artificially wait for 1 second and load mailbox
	setTimeout(loadMails(mailbox), 1000);
}