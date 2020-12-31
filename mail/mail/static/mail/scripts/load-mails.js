function loadMails(mailbox) {

    // Make an API GET request to get the emails in this mailbox
    fetch(`/emails/${mailbox}`)
    .then(response => response.json())
    .then(emails => {

        // Hide other other views and show the mailbox
        document.querySelector('#spinner').style.display = 'none';
        document.querySelector('#single-mail-view').style.display = 'none';
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