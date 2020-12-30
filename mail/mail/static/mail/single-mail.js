document.addEventListener('DOMContentLoaded', () => {
    let element = document.createElement('div');
	element.className = 'row commands';
    document.querySelector('#single-mail-view').append(element);

    // element.style {
    //     display: block;
    //     cursor: pointer;
    // }

    // Add icons container to each mail
    let iconsContainer = document.createElement('div');
    iconsContainer.className = 'w3-padding w3-xlarge w3-text-blue single-mail-icons';
    element.append(iconsContainer);

    // Add a delete icon
    let back = document.createElement('a');
    let backIcon = document.createElement('i');
    back.title = 'Go back';
    backIcon.innerText = 'west';
    back.className = 'single-mail-icon west';
    backIcon.className = 'material-icons single-mail-icon-icon';
    back.append(backIcon);
    iconsContainer.append(back)

    // Add a delete icon
    let deleteMail = document.createElement('a');
    let deleteMailIcon = document.createElement('i');
    deleteMail.title = 'Delete';
    deleteMailIcon.innerText = 'delete';
    deleteMail.className = 'single-mail-icon';
    deleteMailIcon.className = 'material-icons single-mail-icon-icon';
    deleteMail.append(deleteMailIcon);
    iconsContainer.append(deleteMail)

    // Add an archive icon
    let archive = document.createElement('a');
    let archiveIcon = document.createElement('i');
    archive.title = 'Archive';
    archiveIcon.innerText = 'archive';
    archive.className = 'single-mail-icon';
    archiveIcon.className = 'material-icons single-mail-icon-icon';
    archive.append(archiveIcon);
    iconsContainer.append(archive)

    // Add a mark as unread icon
    let mailUnread = document.createElement('a');
    let mailUnreadIcon = document.createElement('i');
    mailUnread.title = 'Mark as unread';
    mailUnreadIcon.innerText = 'mark_email_unread';
    mailUnread.className = 'single-mail-icon';
    mailUnreadIcon.className = 'material-icons single-mail-icon-icon';
    mailUnread.append(mailUnreadIcon);
    iconsContainer.append(mailUnread)

    // Add the subject to the DOM
    let subjectContainer = document.createElement('div');
    let subject = document.createElement('span');
	subjectContainer.className = 'row single-mail-subject';
    document.querySelector('#single-mail-view').append(subjectContainer);
    subject.innerText = 'Create huh?';
    subjectContainer.append(subject);

    let content = document.createElement('div');
	content.className = 'row content';
    document.querySelector('#single-mail-view').append(content);

    // Add the name of the sender to the mail
    let sender = document.createElement('div');
    sender.className = 'sender';
    sender.innerText = 'foo@example.com';
    content.append(sender);

    // Create a new class and give it a name
    let subjectBody = document.createElement('div');
    subjectBody.className = 'subject-body';

    // Add the body to the mail
    let body = document.createElement('span');
    body.className = 'body';
    body.innerText = 'Dont worry';
    
    // Add the subject and body to 'subject-body' and add 'subject-body' to the mail
    subjectBody.append(body);
    content.append(subjectBody);
    
    // Add a timestamp to the mail
    let timestampContainer = document.createElement('div');
    let timestamp = document.createElement('small');
    timestampContainer.className = 'timestamp';
    timestamp.innerText = 2020;
    timestampContainer.append(timestamp);
    content.append(timestampContainer);
});