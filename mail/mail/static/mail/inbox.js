document.addEventListener('DOMContentLoaded', function() {

	// Use buttons to toggle between views
	document.querySelector('#inbox').addEventListener('click', () => load_mailbox('inbox'));
	document.querySelector('#sent').addEventListener('click', () => load_mailbox('sent'));
	document.querySelector('#archived').addEventListener('click', () => load_mailbox('archive'));
	document.querySelector('#compose').addEventListener('click', compose_email);
	document.querySelector('#single-mail-view').addEventListener('click', load_single_mail);

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
			console.log(result);
		})

		// Once the email has been sent, prevent the DOM from reloading and then load the user’s sent mailbox.
		event.preventDefault();
		load_mailbox('sent');
	})

	document.querySelectorAll('.mail-link').forEach(mail => {
		mail.onclick = () => {
			console.log("Got here");
		}
	})

	// By default, load the inbox
	load_mailbox('inbox');
});

function load_single_mail() {

	// Show single mail view and hide other views
	document.querySelector('#single-mail-view').style.display = 'block';
	document.querySelector('#emails-view').style.display = 'none';
	document.querySelector('#compose-view').style.display = 'none';
}

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
  
	// Show a spinner and hide other views
	document.querySelector('#compose-view').style.display = 'none';
	document.querySelector('#single-mail-view').style.display = 'none';
	document.querySelector('#spinner').style.display = 'flex';

	// let element = document.createElement('div');
	// document.querySelector('#single-mail-view').append(element);

	// Show the mailbox name
	document.querySelector('#emails-view').innerHTML = `<h3>${mailbox.charAt(0).toUpperCase() + mailbox.slice(1)}</h3>`;

	// Make an API GET request to get the emails in this mailbox
	fetch(`/emails/${mailbox}`)
	.then(response => response.json())
	.then(emails => {

		// Hide the spinner and show the mailbox
		document.querySelector('#spinner').style.display = 'none';
		document.querySelector('#emails-view').style.display = 'block';

		// Create a mailbox
		let mailBox = document.createElement('div');
		mailBox.className = "list-group";

		// Add all the available mails to the mailbox
		emails.forEach(email => {

			// Create a mail
			let mail = document.createElement('a');
			mail.href = '#';

			// Unread emails should appear with a white background and read ones should appear with gray
			if (email.read === false) {
				mail.className = 'list-group-item list-group-item-action list-group-item-light mail-link';
			} else {
				mail.className = 'list-group-item list-group-item-action list-group-item-secondary mail-link';
			}

			// Add the name of the sender to the mail
			let sender = document.createElement('div');
			sender.className = 'sender';
			sender.innerText = email.sender;
			mail.append(sender);

			// Add the subject and body to the mail
			let subjectBody = document.createElement('div');
			subjectBody.className = 'subject-body';
			subjectBody.innerText = email.subject + ' ' + email.body;
			mail.append(subjectBody);

			// Add a timestamp to the mail
			let timestampContainer = document.createElement('div');
			let timestamp = document.createElement('small');
			timestampContainer.className = 'timestamp';
			timestamp.innerText = email.timestamp;
			timestampContainer.append(timestamp);
			mail.append(timestampContainer);

			// Add a delete button to the mail
			let button = document.createElement('button');
			button.className = 'delete';
			button.innerText = 'Delete';
			mail.append(button);

			// Add this mail to the mailbox
			mailBox.append(mail)
		})

		console.log(document.querySelectorAll('.mail-link'));

		document.querySelector('#emails-view').append(mailBox);
	})
}