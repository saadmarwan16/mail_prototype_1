document.addEventListener('DOMContentLoaded', function() {

	// Use buttons to toggle between views
	document.querySelector('#inbox').addEventListener('click', () => load_mailbox('inbox'));
	document.querySelector('#sent').addEventListener('click', () => load_mailbox('sent'));
	document.querySelector('#archived').addEventListener('click', () => load_mailbox('archive'));
	document.querySelector('#compose').addEventListener('click', compose_email);

	// Listen to clicks on the submit button and attempt to send email(s)
	document.querySelector('#compose-form').addEventListener('submit', () => {
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
			// Once the email has been sent, load the user’s sent mailbox.
			// load_mailbox('sent');
			// return false;
			console.log(result);
		})

		// Once the email has been sent, load the user’s sent mailbox.
		load_mailbox('sent');
		return false;
	})

	document.querySelector('.mail-link').forEach(mail => {
		mail.addEventListener('mouseover', () => {
			// TODO
		})
	})

	// By default, load the inbox
	load_mailbox('inbox');
});

function compose_email() {

	// Show compose view and hide other views
	document.querySelector('#emails-view').style.display = 'none';
	document.querySelector('#compose-view').style.display = 'block';

	// Clear out composition fields
	document.querySelector('#compose-recipients').value = '';
	document.querySelector('#compose-subject').value = '';
	document.querySelector('#compose-body').value = '';
}

function load_mailbox(mailbox) {
  
	// Show the mailbox and hide other views
	document.querySelector('#emails-view').style.display = 'block';
	document.querySelector('#compose-view').style.display = 'none';

	// Show the mailbox name
	document.querySelector('#emails-view').innerHTML = `<h3>${mailbox.charAt(0).toUpperCase() + mailbox.slice(1)}</h3>`;

	// Make an API GET request to get the last emails in this mailbox
	fetch(`/emails/${mailbox}`)
	.then(response => response.json())
	.then(emails => {
			// TODO
			// console.log(result);
			let li = document.createElement('li');
			li.innerHTML = '<a class="mail-link"> <div class="sender">Marwansssssssssssssssssssssssssssssssssssssssssssss</div> <div class="subject-body">Meeting? It is a beautiful day</div> <div class="timestamp">20-Feb</div> <button class="delete">Delete</button> </a>';
			li.className = 'mail';
			document.querySelector('#emails-view').append(li);

			li = document.createElement('li');
			li.innerHTML = '<div class="sender">Marwan</div> <div class="subject-body">Meeting? It is a beautiful day</div> <div class="timestamp">20-Feb</div> <button class="delete">Delete</button>';
			li.className = 'mail';
			document.querySelector('#emails-view').append(li);
		})
}