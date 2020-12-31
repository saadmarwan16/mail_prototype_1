// Creates icons for commands such as going back to mailbox
function createCommands(mailbox, email) {

    // Put all the icons inside an icons container
    let iconsContainer = document.createElement('div');
    iconsContainer.className = 'w3-padding w3-xlarge w3-text-blue single-mail-icons';
    iconsContainer.append(back)
    iconsContainer.append(deleteMail)
    iconsContainer.append(mailUnread)

    // Add a go back icon for users to be able to go back to inbox
    // let back = document.createElement('a');
    // let backIcon = document.createElement('i');
    // back.title = 'Go back';
    // backIcon.innerText = 'west';
    // back.className = 'single-mail-icon west';
    // backIcon.className = 'material-icons single-mail-icon-icon';
    // back.append(backIcon);

    let back = createSingleCommand('Go back', 'west');
    back.className = 'single-mail-icon';
    iconsContainer.append(back);

    // Listen to clicks and go back once the back icon is clicked
    back.addEventListener('click', () => {
        const elem = document.querySelector('.contents-container');
        document.querySelector('#single-mail-view').removeChild(elem);
        load_mailbox(mailbox);
    })

    // Add a delete icon for deleting of current message
    // let deleteMail = document.createElement('a');
    // let deleteMailIcon = document.createElement('i');
    // deleteMail.title = 'Delete';
    // deleteMailIcon.innerText = 'delete';
    // deleteMail.className = 'single-mail-icon';
    // deleteMailIcon.className = 'material-icons single-mail-icon-icon';
    // deleteMail.append(deleteMailIcon);

    let deleteMail = createSingleCommand('Delete', 'delete');
    deleteMail.className = 'single-mail-icon';
    iconsContainer.append(deleteMail);

    // Add a mark as unread icon to make this message unread
    // let mailUnread = document.createElement('a');
    // let mailUnreadIcon = document.createElement('i');
    // mailUnread.title = 'Mark as unread';
    // mailUnreadIcon.innerText = 'mark_email_unread';
    // mailUnread.className = 'single-mail-icon';
    // mailUnreadIcon.className = 'material-icons single-mail-icon-icon';
    // mailUnread.append(mailUnreadIcon);

    let mailUnread = createSingleCommand('Mark as unread', 'mark_email_unread');
    mailUnread.className = 'single-mail-icon';
    iconsContainer.append(mailUnread);

    // User clicks on mark as unreaad
    mailUnread.addEventListener('click', () => {

        // Change the status of the message to unread
        fetch(`/emails/${id}`, {
            method: 'PUT',
            body: JSON.stringify({
                read: false
            })
        })

        load_mailbox(mailbox);
    })

    // Only append archive and unarchive options when the user is not the one who sent the email
    if (mailbox !== 'sent') {

        // Add an archived icon if the message is not archived otherwise unarchive icon
        if (email.archived === false) {
            
            // Add an archive icon to give users the option to archive current email
            // var archive = document.createElement('a');
            // let archiveIcon = document.createElement('i');
            // archive.title = 'Archive';
            // archiveIcon.innerText = 'archive';
            // archive.className = 'single-mail-icon';
            // archiveIcon.className = 'material-icons single-mail-icon-icon';
            // archive.append(archiveIcon);
            // iconsContainer.append(archive);

            var archive = createSingleCommand('Archive', 'archive');
            archive.className = 'single-mail-icon';
            iconsContainer.append(archive);

            // User clicks on archive
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
            // var unarchive = document.createElement('a');
            // let unarchiveIcon = document.createElement('i');
            // unarchive.title = 'Unarchive';
            // unarchiveIcon.innerText = 'unarchive';
            // unarchive.className = 'single-mail-icon';
            // unarchiveIcon.className = 'material-icons single-mail-icon-icon';
            // unarchive.append(unarchiveIcon);
            // iconsContainer.append(unarchive);

            var unarchive = createSingleCommand('Unarchive', 'unarchive');
            unarchive.className = 'single-mail-icon';
            iconsContainer.append(unarchive);

            // User clicks on unarchive
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
    
    // Put the icons container inside a row of it's own
    let commands = document.createElement('div');
    commands.className = 'row commands';
    commands.append(iconsContainer);

    return commands
}


function createSingleCommand(title, text) {
    let command = document.createElement('a');
    let commandIcon = document.createElement('i');
    command.title = title;
    commandIcon.innerText = text;
    commandIcon.className = 'material-icons single-mail-icon-icon';
    command.append(commandIcon);

    return command
}