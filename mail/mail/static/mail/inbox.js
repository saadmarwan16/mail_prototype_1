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

	// Delete the contents of the previous view (if any)
	if (document.querySelector('.contents-container') != null) {
		const elem = document.querySelector('.contents-container');
		document.querySelector('#single-mail-view').removeChild(elem);
	}
  
	// Show a spinner and hide other views
	document.querySelector('#compose-view').style.display = 'none';
	document.querySelector('#single-mail-view').style.display = 'none';
	document.querySelector('#spinner').style.display = 'flex';

	// Show the mailbox name
	document.querySelector('#emails-view').innerHTML = `<h3>${mailbox.charAt(0).toUpperCase() + mailbox.slice(1)}</h3>`;

	// Make an API GET request to get the emails in this mailbox
	fetch(`/emails/${mailbox}`)
	.then(response => response.json())
	.then(emails => {

		// Hide the spinner and show the mailbox
		document.querySelector('#spinner').style.display = 'none';
		document.querySelector('#emails-view').style.display = 'block';
		// document.querySelector('#single-mail-view') = 'display';

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

			// Create a new class and give it a name
			let subjectBody = document.createElement('div');
			subjectBody.className = 'subject-body';

			// Add the subject to the mail
			let subject = document.createElement('span');
			subject.className = 'subject';
			subject.innerText = email.subject;

			// Add the body to the mail
			let body = document.createElement('span');
			body.className = 'body';
			body.innerText = email.body;
			
			// Add the subject and body to 'subject-body' and add 'subject-body' to the mail
			subjectBody.append(subject);
			subjectBody.append(body);
			mail.append(subjectBody);
			
			// Add a timestamp to the mail
			let timestampContainer = document.createElement('div');
			let timestamp = document.createElement('small');
			timestampContainer.className = `timestamp timestamp${email.id}`;
			timestamp.innerText = email.timestamp;
			timestampContainer.append(timestamp);
			mail.append(timestampContainer);

			// Add icons container to each mail
			let iconsContainer = document.createElement('div');
			iconsContainer.className = `w3-padding w3-xlarge w3-text-blue icons icons${email.id}`;
			mail.append(iconsContainer);

			// Add a delete icon
			let deleteMail = document.createElement('a');
			let deleteMailIcon = document.createElement('i');
			deleteMail.title = 'Delete';
			deleteMailIcon.innerText = 'delete';
			deleteMailIcon.className = 'material-icons';
			deleteMail.append(deleteMailIcon);
			iconsContainer.append(deleteMail)

			// Add an archive icon if the message is unarchive else add an unarchive icon
			if (email.archived === false) {

			// Add an archive icon
			let archive = document.createElement('a');
			let archiveIcon = document.createElement('i');
			archive.title = 'Archive';
			archiveIcon.innerText = 'archive';
			archiveIcon.className = 'material-icons';
			archive.append(archiveIcon);
			iconsContainer.append(archive)
			} else {

			// Add an unarchive icon
			let unarchive = document.createElement('a');
			let unarchiveIcon = document.createElement('i');
			unarchive.title = 'Unarchive';
			unarchiveIcon.innerText = 'unarchive';
			unarchiveIcon.className = 'material-icons';
			unarchive.append(unarchiveIcon);
			iconsContainer.append(unarchive)
			}

			// Add a mark as read icon if the mail is not read else add a mark as a mark as read icon
			if (email.read === false) {

			// Add a mark as read icon
			let mailRead = document.createElement('a');
			let mailReadIcon = document.createElement('i');
			mailRead.title = 'Mark as read';
			mailReadIcon.innerText = 'mark_email_read';
			mailReadIcon.className = 'material-icons';
			mailRead.append(mailReadIcon);
			iconsContainer.append(mailRead)
			} else {

			// Add a mark as unread icon
			let mailUnread = document.createElement('a');
			let mailUnreadIcon = document.createElement('i');
			mailUnread.title = 'Mark as unread';
			mailUnreadIcon.innerText = 'mark_email_unread';
			mailUnreadIcon.className = 'material-icons';
			mailUnread.append(mailUnreadIcon);
			iconsContainer.append(mailUnread)
			}

			mail.addEventListener('mouseover', () => {
				document.querySelector(`.timestamp${email.id}`).style.display = 'none'
				document.querySelector(`.icons${email.id}`).style.display = 'flex';
			})

			mail.addEventListener('mouseout', () => {
				document.querySelector(`.icons${email.id}`).style.display = 'none';
				document.querySelector(`.timestamp${email.id}`).style.display = 'flex'
			})

			mail.addEventListener('click', () => {
				console.log("Got here");
				loadSingleMail(email.id, mailbox);
			})

			// Add this mail to the mailbox
			mailBox.append(mail)
		})

		document.querySelector('#emails-view').append(mailBox);
	})
}