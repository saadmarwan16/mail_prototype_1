// Displays an email once it is clicked from a mailbox
function loadSingleMail(id, mailbox) {

    // Hide the emails views and show a spinner
	document.querySelector('#emails-view').style.display = 'none';
    document.querySelector('#spinner').style.display = 'flex';
    
    // Send a GET request to get information about this current email
    fetch(`/emails/${id}`)
    .then(response => response.json())
    .then(email => {
        
        // Hide the spinner and show the email
        document.querySelector('#spinner').style.display = 'none';
        document.querySelector('#single-mail-view').style.display = 'block';

        // Add a go back icon for users to be able to go back to inbox
        let back = document.createElement('a');
        let backIcon = document.createElement('i');
        back.title = 'Go back';
        backIcon.innerText = 'west';
        back.className = 'single-mail-icon west';
        backIcon.className = 'material-icons single-mail-icon-icon';
        back.append(backIcon);

        // Listen to clicks and go back once the back icon is clicked
        back.addEventListener('click', () => {
            const elem = document.querySelector('.contents-container');
            document.querySelector('#single-mail-view').removeChild(elem);
            load_mailbox(mailbox);
        })

        // Add a delete icon for deleting of current message
        let deleteMail = document.createElement('a');
        let deleteMailIcon = document.createElement('i');
        deleteMail.title = 'Delete';
        deleteMailIcon.innerText = 'delete';
        deleteMail.className = 'single-mail-icon';
        deleteMailIcon.className = 'material-icons single-mail-icon-icon';
        deleteMail.append(deleteMailIcon);

        // Users cannot archive or unarchive the emails they sent themselves
        if (mailbox !== 'sent') {

            // Add an archived icon if the message is not archived otherwise unarchive icon
            if (email.archived === false) {
                
                // Add an archive icon to give users the option to archive current email
                var archive = document.createElement('a');
                let archiveIcon = document.createElement('i');
                archive.title = 'Archive';
                archiveIcon.innerText = 'archive';
                archive.className = 'single-mail-icon';
                archiveIcon.className = 'material-icons single-mail-icon-icon';
                archive.append(archiveIcon);

                archive.addEventListener('click', () => {

                    // Send a PUT request to change a mail to archived
                    fetch(`/emails/${id}`, {
                        method: 'PUT',
                        body: JSON.stringify({
                            archived: true
                        })
                    })

                    // After the email has been archived send the user back to the inbox
                    load_mailbox('inbox');
                })

            } else {
                
                // Add an unarchive icon to give users the option to unarchive the current email
                var unarchive = document.createElement('a');
                let unarchiveIcon = document.createElement('i');
                unarchive.title = 'Unarchive';
                unarchiveIcon.innerText = 'unarchive';
                unarchive.className = 'single-mail-icon';
                unarchiveIcon.className = 'material-icons single-mail-icon-icon';
                unarchive.append(unarchiveIcon);

                unarchive.addEventListener('click', () => {

                    // Send a PUT request to change a mail to unarchived
                    fetch(`/emails/${id}`, {
                        method: 'PUT',
                        body: JSON.stringify({
                            archived: false
                        })
                    })

                    // After the email has been unarchived send the user back to the inbox
                    load_mailbox('inbox');
                })
            }
        }

        // Add a mark as unread icon to make this message unread
        let mailUnread = document.createElement('a');
        let mailUnreadIcon = document.createElement('i');
        mailUnread.title = 'Mark as unread';
        mailUnreadIcon.innerText = 'mark_email_unread';
        mailUnread.className = 'single-mail-icon';
        mailUnreadIcon.className = 'material-icons single-mail-icon-icon';
        mailUnread.append(mailUnreadIcon);

        // Put all the icons inside an icons container
        let iconsContainer = document.createElement('div');
        iconsContainer.className = 'w3-padding w3-xlarge w3-text-blue single-mail-icons';
        iconsContainer.append(back)
        iconsContainer.append(deleteMail)

        // Only append archive and unarchive options when the user is not the one who sent the email
        if (mailbox !== 'sent') {
            
            // Append archive icon to unarchive emails and vice versa
            if (email.archived === false) {
                iconsContainer.append(archive);
            } else {
                iconsContainer.append(unarchive);

            }
        }
        
        iconsContainer.append(mailUnread)

        // Put the icons container inside a row of it's own
        let commands = document.createElement('div');
        commands.className = 'row commands';
        commands.append(iconsContainer);

        // Add the subject of the message to the DOM in a row of it's own
        let subjectContainer = document.createElement('div');
        let subject = document.createElement('h2');
        subjectContainer.className = 'row single-mail-subject';
        subject.innerText = email.subject;
        subjectContainer.append(subject);

        // Add a mark a person icon to the DOM
        let person = document.createElement('a');
        let personIcon = document.createElement('i');
        person.title = 'Sender';
        personIcon.innerText = 'person';
        person.className = 'single-mail-icon person-icon-container';
        personIcon.className = 'material-icons single-mail-icon-icon';
        person.append(personIcon);

        // Add the name of the sender to the DOM
        let sender = document.createElement('div');
        sender.className = 'sender';
        sender.innerText = email.sender;
        
        // Add a timestamp to the DOM
        let timestampContainer = document.createElement('div');
        let timestamp = document.createElement('small');
        timestampContainer.className = 'timestamp single-mail-timestamp';
        timestamp.innerText = email.timestamp;
        timestampContainer.append(timestamp);

        // Add a reply icon to give users the option of replying to the message
        let reply = document.createElement('a');
        let replyIcon = document.createElement('i');
        reply.title = 'Reply';
        replyIcon.innerText = 'reply';
        reply.className = 'single-mail-icon reply-icon-container';
        replyIcon.className = 'material-icons single-mail-icon-icon';
        reply.append(replyIcon);

        // Put the person icon, sender, timestamp and reply icon into a container in a row
        let content = document.createElement('div');
        content.className = 'row content';
        content.append(person);
        content.append(sender);
        content.append(timestampContainer);
        content.append(reply);

        // Add the body of the email into a container in a row
        let body = document.createElement('div');
        body.className = 'row main-body jumbotron';
        let bodyContent = document.createElement('p');
        bodyContent.className = 'main-body-content';
        bodyContent.innerText = email.body;
        body.append(bodyContent);

        // Add all the contents into a container and put it in the single-mail-view
        let singleMail = document.querySelector('#single-mail-view');
        let contentsContainer = document.createElement('div');
        contentsContainer.className = 'contents-container';
        contentsContainer.append(commands);
        contentsContainer.append(subjectContainer);
        contentsContainer.append(content);
        contentsContainer.append(body);
        singleMail.append(contentsContainer);
    })
}