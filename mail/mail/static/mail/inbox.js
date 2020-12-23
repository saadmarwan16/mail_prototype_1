"use strict";

document.addEventListener('DOMContentLoaded', function() {

	// Use buttons to toggle between views
	document.querySelector('#inbox').addEventListener('click', () => load_mailbox('inbox'));
	document.querySelector('#sent').addEventListener('click', () => load_mailbox('sent'));
	document.querySelector('#archived').addEventListener('click', () => load_mailbox('archive'));
	document.querySelector('#compose').addEventListener('click', compose_email);

	// Listen to clicks on the submit button and attempt to send email(s)
	document.querySelector('#submit-btn').addEventListener('click', event => {
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

	const mails = document.querySelectorAll('.mail-link');
	mails.forEach(mail => {
		mail.onmouseover = () => {
			mail.style.backgroundColor = "green";
		}
	})
	// document.querySelectorAll('.mail-link').forEach(mail => {
	// 	// mail.onmouseover = () => {
	// 	// 	console.log("Got here");
	// 	// }
	// 	// console.log(mail);
	// 	mail.style.backgroundColor = "green";
	// 	// mail.addEventListener('mouseover', () => {
	// 	// 	this.style.backgroundColor = "green";
	// 	// })
	// })

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

	// Make an API GET request to get the emails in this mailbox
	fetch(`/emails/${mailbox}`)
	.then(response => response.json())
	.then(emails => {
		console.log(emails)
		// TODO
		emails.forEach(email => {
			let li = document.createElement('li');
			li.innerHTML = `<a class="mail-link"> <div class="sender">${email.sender}</div> <div class="subject-body">${email.subject} ${email.body}</div> <div class="timestamp">${email.timestamp}</div> <button class="delete">Delete</button></a>`;
			li.className = 'mail';
			document.querySelector('#emails-view').append(li);
		})
	})
}