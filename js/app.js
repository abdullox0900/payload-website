async function fetchAboutData() {
    try {
        const response = await fetch('https://a-abdullox.uz/api/about')
        const data = await response.json()
        const aboutData = data.docs[0]

        console.log(aboutData)

        document.getElementById('about-title').textContent = aboutData?.title
        document.getElementById('about-subtitle').textContent = aboutData?.subtitle

        document.getElementById('form-title').textContent = aboutData?.form?.title
        document.getElementById('form-subtitle').textContent = aboutData?.form?.subtitle

        document.getElementById('image1').src = 'https://a-abdullox.uz/' + aboutData?.image1?.url
        document.getElementById('image2').src = 'https://a-abdullox.uz/' + aboutData?.image2?.url

        document.getElementById('title-card').textContent = aboutData?.cards_title

        const cardsContainer = document.getElementById('about-cards')
        aboutData.cards.forEach(card => {
            console.log('https://a-abdullox.uz' + card.icon.url)
            cardsContainer.innerHTML += `
                <div class="relative">
                    <div class="bg-white rounded-2xl shadow-lg p-8 relative z-10 h-full">
                        <div class="w-12 h-12 bg-brand-100 rounded-2xl flex items-center justify-center mb-6">
                                <img src="${'https://a-abdullox.uz/' + card?.icon?.url}" alt="${card?.title}-icon">
                        </div>
                        <h3 class="text-xl font-bold text-gray-900 mb-4">${card?.title}</h3>
                        <p class="text-gray-600">
                            ${card?.description}</p>
                    </div>
                </div>
        `
        })
    } catch (error) {
        console.error('Error fetching about data:', error)
    }
}

fetchAboutData()

document.getElementById('ctaForm').addEventListener('submit', async function (e) {
    e.preventDefault()

    const formData = {
        fullName: document.getElementById('cta-name').value,
        email: document.getElementById('cta-email').value,
        websiteUrl: document.getElementById('cta-website').value,
        phoneNumber: document.getElementById('cta-phone').value,
        submittedAt: new Date()
    }

    try {
        const response = await fetch('https://a-abdullox.uz/api/forms', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        })

        if (response.ok) {
            // Clear form after successful submission
            this.reset()
            alert('Thank you! Your form has been submitted successfully.')
        } else {
            throw new Error('Form submission failed')
        }
    } catch (error) {
        console.error('Error submitting form:', error)
        alert('Sorry, there was an error submitting your form. Please try again.')
    }
})