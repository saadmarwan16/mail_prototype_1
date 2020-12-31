// Creates icons for commands such as going back to mailbox
function createCommands(mailbox, email) {

    // Put all the icons inside an icons container
    let iconsContainer = document.createElement('div');
    iconsContainer.className = 'w3-padding w3-xlarge w3-text-blue single-mail-icons';

    // Add a go back icon for users to be able to go back to inbox
    let back = createSingleCommand('Go back', 'west');
    iconsContainer.append(back);

    // Listen to clicks and go back once the back icon is clicked
    back.addEventListener('click', () => {
        const elem = document.querySelector('.contents-container');
        document.querySelector('#single-mail-view').removeChild(elem);
        load_mailbox(mailbox);
    })

    // Add a delete icon for deleting of current message
    let deleteMail = createSingleCommand('Delete', 'delete');
    iconsContainer.append(deleteMail);

    // Add a mark as unread icon to make this message unread
    let mailUnread = createSingleCommand('Mark as unread', 'mark_email_unread');
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

    // Put all the icons inside the icons container
    iconsContainer.append(back)
    iconsContainer.append(deleteMail)
    iconsContainer.append(mailUnread)
    
    // Only append archive and unarchive options when the user is not the one who sent the email
    if (mailbox !== 'sent') {

        // Add an archived icon if the message is not archived otherwise unarchive icon
        if (email.archived === false) {
            
            // Add an archive icon to give users the option to archive current email
            var archive = createSingleCommand('Archive', 'archive');
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
            var unarchive = createSingleCommand('Unarchive', 'unarchive');
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


// Creates the boiler plate code for each icon
function createSingleCommand(title, text) {
    let command = document.createElement('a');
    let commandIcon = document.createElement('i');
    command.className = 'single-mail-icon';
    command.title = title;
    commandIcon.innerText = text;
    commandIcon.className = 'material-icons single-mail-icon-icon';
    command.append(commandIcon);

    return command
}