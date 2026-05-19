document.addEventListener('DOMContentLoaded', () => {
    const content = document.getElementById('event-content');
    if (!content) return;

    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');

    if (!id) {
        showError("Event ID not specified.");
        return;
    }

    fetchEventDetails(id);

    async function fetchEventDetails(eventId) {
        try {
            const res = await fetch(`${window.API_BASE || 'https://swaralathota-backend.ourancientheroes.workers.dev'}/api/event?id=${encodeURIComponent(eventId)}`);
            const data = await res.json();

            if (!data.success || !data.event) {
                showError("Event not found or has been removed.");
                return;
            }

            renderEvent(data.event);
        } catch (error) {
            console.error('Error fetching event details:', error);
            showError("Failed to load event details. Please try again later.");
        }
    }

    function showError(message) {
        content.innerHTML = `
            <div style="text-align: center; padding: 5rem 0;">
                <p style="color: #8FA89B; margin-bottom: 2rem; font-size: 1.1rem;">${message}</p>
                <a href="events.html" style="color: var(--color-gold); text-decoration: underline;">Browse All Events</a>
            </div>
        `;
    }

    function renderEvent(event) {
        const imageHtml = event.image_url
            ? `<img src="${event.image_url}" alt="${event.name}" style="width:100%; height:300px; object-fit:cover; border-radius:16px; margin-bottom:1.25rem; border:1px solid rgba(200,168,75,0.2);">`
            : '';

        const singerHtml = event.singer_band ? `
            <p style="color: #E8F3EC; display: flex; align-items: center; gap: 0.5rem; font-size: 1rem;">
                <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24" style="color: var(--color-gold);"><path d="M9 18V5l12-2v13"></path><circle cx="6" cy="18" r="3"></circle><circle cx="18" cy="16" r="3"></circle></svg>
                <span style="font-weight: 600;">${event.singer_band}</span>
            </p>
        ` : '';

        content.innerHTML = `
            ${imageHtml}
            <h1 style="font-family: var(--font-display); font-size: clamp(1.8rem, 5vw, 3rem); font-weight: bold; color: #f0ead6; margin-bottom: 1rem; line-height: 1.1;">${event.name}</h1>
            
            <div style="color: #c4d0b8; font-size: 1rem; line-height: 1.7; margin-bottom: 1.5rem;">
                <p style="white-space: pre-wrap;">${event.description}</p>
            </div>

            <div style="display: flex; flex-direction: column; gap: 0.5rem; margin-bottom: 5rem; padding-top: 1.25rem; border-top: 1px solid rgba(200, 168, 75, 0.15);">
                ${singerHtml}
                <p style="color: #9aab8a; display: flex; align-items: center; gap: 0.5rem; font-size: 0.95rem;">
                    <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24" style="color: var(--color-gold);"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                    ${event.location}
                </p>
                <p style="color: #9aab8a; display: flex; align-items: center; gap: 0.5rem; font-size: 0.95rem;">
                    <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24" style="color: var(--color-gold);"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                    ${event.date} | ${event.time}
                </p>
            </div>
        `;

        // Add the book button directly to the body (not inside any container)
        const bookBtn = document.createElement('button');
        bookBtn.className = 'app-book-btn';
        bookBtn.textContent = 'BOOK TICKETS';
        bookBtn.onclick = () => window.location.href = `booking.html?event_id=${event.id}`;
        document.body.appendChild(bookBtn);
    }
});
