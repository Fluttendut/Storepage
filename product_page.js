// Retrieve elements


const enquiryButton = document.getElementById("enquiry-button");
const closeButton = document.getElementById("close-button");
const enquiryDialog = document.getElementById("enquiry-dialog");
const enquiryForm = document.getElementById("enquiry-form");
const commentInput = document.getElementById("comment-input");
const nameInput = document.getElementById("name-input");
const emailInput = document.getElementById("email-input");
const submitButton = document.getElementById("submit-button");

const productDetails = document.querySelector('.product-details');
const productName = productDetails.querySelector('h1').textContent;
const productImages = Array.from(document.querySelectorAll('.product-images img')).map(img => img.outerHTML).join('');


// Define email sending function
async function sendEmail(to, comment, name, email) {
    // Set SendGrid API key and email data
    const apiKey = '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';
    const sgMail = require('@sendgrid/mail');
    sgMail.setApiKey(apiKey);
    const msg = {
        to: to,
        from: 'Stickweeds@stick.dk',
        subject: 'Product Enquiry',
        text: `Comment: ${comment}\nName: ${name}\nEmail: ${email}`,
    };
    // Send email
    try {
        await sgMail.send(msg);
        console.log('Email sent successfully');
    } catch (error) {
        console.error(`Error sending email: ${error}`);
    }
}

// async function sendEmail(to, comment, name, email, productInfo) {
//     // Set SendGrid API key and email data
//     const apiKey = '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';
//     const sgMail = require('@sendgrid/mail');
//     sgMail.setApiKey(apiKey);
//     const msg = {
//         to: to,
//         from: 'Stickweeds@stick.dk',
//         subject: 'Product Enquiry',
//         html: `
//       <h1>Product Enquiry</h1>
//       <p><strong>Name:</strong> ${nameInput}</p>
//       <p><strong>Email:</strong> ${emailInput}</p>
//       <p><strong>Comment:</strong> ${commentInput}</p>
//       <p><strong>Product:</strong> ${productName}</p>
//       <div><strong>Images:</strong></div>
//       ${productImages}
//     `
//     };
//
//     try {
//         await sendGrid.send(message);
//         console.log('Email sent successfully!');
//         // clear form fields on success
//         document.getElementById('enquiry-form').reset();
//         // close dialog
//         document.getElementById('enquiry-dialog').close();
//     } catch (error) {
//         console.error(error);
//     }
// };

// Add event listeners
enquiryButton.addEventListener("click", () => {
    enquiryDialog.showModal();
});
closeButton.addEventListener("click", () => {
    enquiryDialog.close();
});
enquiryForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const toEmail = emailInput.value;
    const comment = commentInput.value;
    const name = nameInput.value;
    const email = emailInput.value;
    sendEmail(toEmail, comment, name, email);
    enquiryDialog.close();
});

enquiryForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const toEmail = emailInput.value;
    const comment = commentInput.value;
    const name = nameInput.value;
    const email = emailInput.value;
    const productInfo = {
        name: "Product Name",
        price: "Product Price",
        description: "Product Description",
    };
    sendEmail(toEmail, comment, name, email, productInfo);
    enquiryDialog.close();
});
