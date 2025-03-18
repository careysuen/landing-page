function validateAndDownload() {
    const fullName = document.getElementById('full-name').value.trim();
    const email = document.getElementById('email').value.trim();
    const whatsappNumber = document.getElementById('whatsapp-number').value.trim();

    if (fullName === "" || email === "" || whatsappNumber === "") {
        alert("⚠️ Please fill in all required fields before downloading.");
        return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        alert("⚠️ Please enter a valid email address.");
        return;
    }

    const data = {
        fullName,
        email,
        whatsappNumber
    };

    fetch('/api/submit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
        // Optionally redirect or trigger download here
    })
    .catch(error => {
        alert("⚠️ Something went wrong. Please try again later.");
    });
}
