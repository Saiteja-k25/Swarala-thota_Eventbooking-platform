document.addEventListener('DOMContentLoaded', () => {
    const eventsGrid = document.getElementById('eventsGrid');
    if (!eventsGrid) return;
    
    fetchEvents();

    async function fetchEvents() {
        try {
            const res = await fetch(`${window.API_BASE || 'https://swaralathota-backend.ourancientheroes.workers.dev'}/api/events`);
            const data = await res.json();
            
            if (!data.success || !data.events || data.events.length === 0) {
                eventsGrid.innerHTML = `
                    <div style="grid-column: 1 / -1; text-align: center; padding: 4rem 2rem; background: rgba(200,168,75,0.05); border-radius: 16px; border: 1px dashed rgba(200,168,75,0.2);">
                        <p style="color:#8FA89B; font-size: 1.2rem; font-family: var(--font-display);">No events yet. Stay tuned!</p>
                    </div>
                `;
                return;
            }

            eventsGrid.innerHTML = '';
            
            data.events.forEach(event => {
                const card = document.createElement('div');
                card.className = 'event-card-v2';
                card.onclick = () => window.location.href = `event.html?id=${event.id}`;

                const coverHtml = event.image_url 
                    ? `<div class="event-card-img-wrapper"><img src="${event.image_url}" class="event-card-img" alt="${event.name}"></div>` 
                    : `<div class="event-card-img-wrapper" style="background: rgba(200,168,75,0.1); display:flex; align-items:center; justify-content:center;"><i class="ph ph-image" style="font-size:3rem; color:rgba(200,168,75,0.5);"></i></div>`;

                card.innerHTML = `
                    ${coverHtml}
                    <div class="event-card-content">
                        <h2 class="event-card-title">${event.name}</h2>
                        <p class="event-card-desc">${event.description}</p>
                        
                        <div class="event-card-meta">
                            <div class="event-card-meta-item">
                                <i class="ph-fill ph-map-pin event-card-meta-icon"></i>
                                <span>${event.location}</span>
                            </div>
                            <div class="event-card-meta-item">
                                <i class="ph-fill ph-calendar-blank event-card-meta-icon"></i>
                                <span>${event.date} | ${event.time}</span>
                            </div>
                        </div>
                    </div>
                `;
                eventsGrid.appendChild(card);
            });
            
        } catch (error) {
            console.error('Error fetching events:', error);
            eventsGrid.innerHTML = '<p style="color:#ef4444; text-align:center; grid-column: 1/-1;">Failed to load events. Please try again later.</p>';
        }
    }
});
