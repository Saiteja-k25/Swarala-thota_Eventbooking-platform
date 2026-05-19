import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyCjnFyUvN49loc-odcD6PiPzF90-s4Hc0A",
  authDomain: "swaralathota.firebaseapp.com",
  projectId: "swaralathota",
  storageBucket: "swaralathota.firebasestorage.app",
  messagingSenderId: "819785803261",
  appId: "1:819785803261:web:4976dca6d152049af6e594",
  measurementId: "G-PN9JTFFK6W"
};

initializeApp(firebaseConfig);

document.addEventListener('DOMContentLoaded', () => {
    const auth = getAuth();

    const authOverlay = document.getElementById('authOverlay');
    const adminTabBar = document.getElementById('adminTabBar');
    const adminMain = document.getElementById('adminMain');
    const tbody = document.getElementById('bookingsTableBody');
    const searchInput = document.getElementById('searchInput');
    const loadMoreIndicator = document.getElementById('loadMoreIndicator');
    const endOfList = document.getElementById('endOfList');
    const eventSelector = document.getElementById('eventSelector');

    // Tabs
    const tabEvents = document.getElementById('tabEvents');
    const tabScanner = document.getElementById('tabScanner');
    const tabAddEvent = document.getElementById('tabAddEvent');
    const viewEvents = document.getElementById('viewEvents');
    const viewScanner = document.getElementById('viewScanner');
    const viewAddEvent = document.getElementById('viewAddEvent');

    // Add Event Form
    const addEventForm = document.getElementById('addEventForm');
    const submitEventBtn = document.getElementById('submitEventBtn');

    // QR Scanner
    const scanResult = document.getElementById('scanResult');
    const resultApproved = document.getElementById('resultApproved');
    const resultRejected = document.getElementById('resultRejected');
    const scanAgainBtn = document.getElementById('scanAgainBtn');

    const PAGE_LIMIT = 10;
    let allBookings = [];
    let currentOffset = 0;
    let totalBookings = 0;
    let hasMore = false;
    let isLoading = false;
    let isSearching = false;
    let html5QrCode = null;
    let scannerActive = false;

    window.API_BASE = "https://swaralathota-backend.ourancientheroes.workers.dev";

    // --- Tab switching ---
    function switchTab(activeTab, activeView) {
        [tabEvents, tabScanner, tabAddEvent].forEach(t => t.classList.remove('active'));
        [viewEvents, viewScanner, viewAddEvent].forEach(v => { v.classList.remove('active'); v.style.display = 'none'; });
        activeTab.classList.add('active');
        activeView.classList.add('active');
        activeView.style.display = 'block';

        // Stop scanner if leaving scanner tab
        if (activeView !== viewScanner && scannerActive) {
            stopScanner();
        }
        // Start scanner if entering scanner tab
        if (activeView === viewScanner) {
            startScanner();
        }
    }

    tabEvents.addEventListener('click', () => switchTab(tabEvents, viewEvents));
    tabScanner.addEventListener('click', () => switchTab(tabScanner, viewScanner));
    tabAddEvent.addEventListener('click', () => switchTab(tabAddEvent, viewAddEvent));

    // --- Auth (uses cached admin status from auth.js) ---
    onAuthStateChanged(auth, async (user) => {
        if (!user) {
            window.location.href = "index.html";
            return;
        }

        window.currentUser = user;

        // Use the cached admin flag set by auth.js during login
        let isAdmin = false;
        const cachedAdmin = sessionStorage.getItem('st_isAdmin');

        if (cachedAdmin !== null) {
            // Cache exists — use it instantly, no network call
            isAdmin = cachedAdmin === 'true';
        } else {
            // Cache miss (direct navigation / cleared storage) — verify once
            try {
                const verifyRes = await fetch(`${window.API_BASE}/api/users`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ uuid: user.uid, email: user.email, name: user.displayName || 'User' })
                });
                const verifyData = await verifyRes.json();
                isAdmin = !!verifyData.isAdmin;
                sessionStorage.setItem('st_isAdmin', String(isAdmin));
            } catch (err) {
                console.error("Admin verification failed", err);
                window.location.href = "index.html";
                return;
            }
        }

        if (!isAdmin) {
            alert("Unauthorized Access");
            window.location.href = "events.html";
            return;
        }

        authOverlay.classList.add('hidden');
        adminTabBar.style.display = 'flex';
        adminMain.style.display = 'block';

        await loadEventSelector();
        fetchBookings(true);
    });

    // --- Events selector ---
    async function loadEventSelector() {
        try {
            const res = await fetch(`${window.API_BASE}/api/events`);
            const data = await res.json();
            if (data.success && data.events) {
                eventSelector.innerHTML = '<option value="all">All Events</option>';
                data.events.forEach(ev => {
                    const option = document.createElement('option');
                    option.value = ev.id;
                    option.textContent = ev.name;
                    eventSelector.appendChild(option);
                });
            }
        } catch (e) {
            console.error("Failed to load events", e);
        }
    }

    eventSelector.addEventListener('change', () => fetchBookings(true));

    // --- Bookings ---
    async function fetchBookings(reset = false) {
        if (!window.currentUser || isLoading) return;
        isLoading = true;

        if (reset) {
            currentOffset = 0;
            allBookings = [];
            tbody.innerHTML = '';
            endOfList.style.display = 'none';
        }

        loadMoreIndicator.style.display = 'block';

        try {
            const eventId = eventSelector.value;
            let url = `${window.API_BASE}/api/admin/bookings?email=${window.currentUser.email}&limit=${PAGE_LIMIT}&offset=${currentOffset}`;
            if (eventId !== 'all') url += `&event_id=${eventId}`;

            const res = await fetch(url);
            const data = await res.json();
            
            if (data.success) {
                totalBookings = data.total;
                hasMore = data.hasMore;
                allBookings = [...allBookings, ...data.bookings];
                
                
                appendRows(data.bookings);
                if (!hasMore) endOfList.style.display = 'block';
                currentOffset += data.bookings.length;
            } else {
                tbody.innerHTML = `<tr><td colspan="5" style="text-align:center; padding:2rem; color:#f87171;">${data.error || "Failed to load"}</td></tr>`;
            }
        } catch (err) {
            console.error(err);
            if (allBookings.length === 0) {
                tbody.innerHTML = `<tr><td colspan="5" style="text-align:center; padding:2rem; color:#f87171;">Network Error</td></tr>`;
            }
        } finally {
            isLoading = false;
            loadMoreIndicator.style.display = 'none';
        }
    }

    function appendRows(bookings) {
        if (bookings.length === 0 && allBookings.length === 0) {
            tbody.innerHTML = `<tr><td colspan="5" style="text-align:center; padding:2rem; color:#8FA89B;">No confirmed bookings found.</td></tr>`;
            return;
        }
        bookings.forEach(b => {
            const tr = document.createElement('tr');
            let dateStr = 'Unknown';
            if (b.created_at) {
                dateStr = new Date(b.created_at).toLocaleString('en-IN', {
                    day: '2-digit', month: 'short', year: 'numeric',
                    hour: '2-digit', minute: '2-digit', hour12: true
                });
            }
            tr.innerHTML = `
                <td><span style="font-weight:600;">${b.user_name || 'N/A'}</span><br><span style="font-size:0.7rem; color:#8FA89B;">${b.email}</span></td>
                <td><span style="color:var(--color-gold); font-weight:600;">${b.ticket_type || 'General'}</span><br><span style="font-size:0.7rem; color:#8FA89B;">Qty: ${b.ticket_count || 1}</span></td>
                <td style="font-size:0.8rem;">${b.event_name || '—'}</td>
                <td style="font-size:0.7rem; color:#8FA89B; font-family: monospace;">${b.cashfree_payment_id || 'N/A'}</td>
                <td style="text-align:right;"><span style="color:#4ade80; font-size:0.7rem; font-weight:700;">✓ Approved</span></td>
            `;
            tbody.appendChild(tr);
        });
    }

    // --- Search ---
    function handleSearch(e) {
        const query = e.target.value.toLowerCase();
        if (query.trim() === '') {
            isSearching = false;
            tbody.innerHTML = '';
            endOfList.style.display = 'none';
            if (allBookings.length > 0) {
                appendRows(allBookings);
                if (!hasMore) endOfList.style.display = 'block';
            } else {
                fetchBookings(true);
            }
            return;
        }
        isSearching = true;
        const filtered = allBookings.filter(b => 
            (b.email && b.email.toLowerCase().includes(query)) || 
            (b.user_name && b.user_name.toLowerCase().includes(query)) ||
            (b.ticket_type && b.ticket_type.toLowerCase().includes(query))
        );
        tbody.innerHTML = '';
        endOfList.style.display = 'none';
        appendRows(filtered);
        if (filtered.length === 0) {
            tbody.innerHTML = `<tr><td colspan="5" style="text-align:center; padding:2rem; color:#8FA89B;">No results for "${query}"</td></tr>`;
        }
    }
    if (searchInput) searchInput.addEventListener('input', handleSearch);

    // Infinite scroll
    window.addEventListener('scroll', () => {
        if (isSearching) return;
        const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
        if (scrollTop + clientHeight >= scrollHeight - 50) {
            if (hasMore && !isLoading && viewEvents.classList.contains('active')) {
                fetchBookings(false);
            }
        }
    });

    // --- Image Upload Box ---
    const imageUploadBox = document.getElementById('imageUploadBox');
    const imagePreview = document.getElementById('imagePreview');
    const imageUploadPlaceholder = document.getElementById('imageUploadPlaceholder');
    const removeImageBtn = document.getElementById('removeImageBtn');
    const fileInput = document.getElementById('eventImage');

    imageUploadBox.addEventListener('click', (e) => {
        if (e.target === removeImageBtn) return;
        fileInput.click();
    });

    fileInput.addEventListener('change', () => {
        if (fileInput.files.length > 0) {
            const reader = new FileReader();
            reader.onload = (e) => {
                imagePreview.src = e.target.result;
                imagePreview.style.display = 'block';
                imageUploadPlaceholder.style.display = 'none';
                removeImageBtn.style.display = 'block';
                imageUploadBox.style.borderColor = 'rgba(200,168,75,0.4)';
            };
            reader.readAsDataURL(fileInput.files[0]);
        }
    });

    removeImageBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        fileInput.value = '';
        imagePreview.src = '';
        imagePreview.style.display = 'none';
        imageUploadPlaceholder.style.display = 'flex';
        removeImageBtn.style.display = 'none';
        imageUploadBox.style.borderColor = 'rgba(200,168,75,0.25)';
    });

    // --- Character Counters ---
    const titleInput = document.getElementById('eventTitle');
    const descInput = document.getElementById('eventDesc');
    const titleCount = document.getElementById('titleCount');
    const descCount = document.getElementById('descCount');

    titleInput.addEventListener('input', () => {
        const len = titleInput.value.length;
        titleCount.textContent = `${len} / 20`;
        titleCount.style.color = len >= 20 ? '#f87171' : '#7a8a72';
    });
    descInput.addEventListener('input', () => {
        const len = descInput.value.length;
        descCount.textContent = `${len} / 100`;
        descCount.style.color = len >= 100 ? '#f87171' : '#7a8a72';
    });

    // --- Add Event ---
    addEventForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        submitEventBtn.disabled = true;
        const originalText = submitEventBtn.innerHTML;
        submitEventBtn.textContent = 'Publishing...';

        try {
            let imageUrl = null;
            
            if (fileInput.files.length > 0) {
                const formData = new FormData();
                formData.append('image', fileInput.files[0]);
                const uploadRes = await fetch(`${window.API_BASE}/api/upload`, { method: 'POST', body: formData });
                const uploadData = await uploadRes.json();
                if (uploadData.success) {
                    imageUrl = window.API_BASE + uploadData.url;
                } else {
                    throw new Error(uploadData.error || "Image upload failed");
                }
            }

            const payload = {
                admin_email: window.currentUser.email,
                name: document.getElementById('eventTitle').value,
                description: document.getElementById('eventDesc').value,
                date: document.getElementById('eventDate').value,
                time: document.getElementById('eventTime').value,
                location: document.getElementById('eventLocation').value,
                singer_band: document.getElementById('eventSinger').value,
                image_url: imageUrl
            };

            const eventRes = await fetch(`${window.API_BASE}/api/events`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            const eventData = await eventRes.json();

            if (eventData.success) {
                alert("Event created!");
                addEventForm.reset();
                // Reset image preview
                imagePreview.src = '';
                imagePreview.style.display = 'none';
                imageUploadPlaceholder.style.display = 'flex';
                removeImageBtn.style.display = 'none';
                imageUploadBox.style.borderColor = 'rgba(200,168,75,0.25)';
                titleCount.textContent = '0 / 20';
                descCount.textContent = '0 / 100';
                titleCount.style.color = '#7a8a72';
                descCount.style.color = '#7a8a72';
                await loadEventSelector();
                switchTab(tabEvents, viewEvents);
            } else {
                throw new Error(eventData.error || "Failed to create event");
            }
        } catch (err) {
            console.error(err);
            alert("Error: " + err.message);
        } finally {
            submitEventBtn.disabled = false;
            submitEventBtn.innerHTML = originalText;
        }
    });

    // --- QR Scanner ---
    function startScanner() {
        scanResult.classList.remove('show');
        if (!html5QrCode) {
            html5QrCode = new Html5Qrcode("qr-reader");
        }
        const config = { fps: 10, qrbox: { width: 250, height: 250 } };
        html5QrCode.start({ facingMode: "environment" }, config, onScanSuccess, () => {})
            .then(() => { scannerActive = true; })
            .catch(err => {
                console.error("Camera error:", err);
                alert("Could not start camera.");
            });
    }

    function stopScanner() {
        if (html5QrCode && html5QrCode.isScanning) {
            html5QrCode.stop().catch(err => console.error("Error stopping scanner", err));
        }
        scannerActive = false;
    }

    async function onScanSuccess(decodedText) {
        if (html5QrCode.isScanning) await html5QrCode.stop();
        scannerActive = false;

        scanResult.classList.add('show');
        resultApproved.style.display = 'none';
        resultRejected.style.display = 'none';

        try {
            const qrData = JSON.parse(decodedText);
            if (!qrData.id || !qrData.email) throw new Error("Invalid QR format");

            const currentEventId = eventSelector.value;
            const res = await fetch(`${window.API_BASE}/api/verify-qr`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: qrData.id, event_id: currentEventId })
            });
            const data = await res.json();

            if (data.success && data.verified) {
                document.getElementById('resultName').textContent = data.booking.user_name || 'User';
                document.getElementById('resultEmail').textContent = data.booking.email;
                document.getElementById('resultTicketType').textContent = data.booking.ticket_type || 'General';
                document.getElementById('resultTicketCount').textContent = data.booking.ticket_count || 1;
                document.getElementById('resultStatusText').textContent = "Valid ticket (" + (data.booking.event_name || 'General') + ")";
                resultApproved.style.display = 'block';
            } else {
                document.getElementById('rejectedMessage').textContent = data.message || "Ticket not valid for this event.";
                resultRejected.style.display = 'block';
            }
        } catch (e) {
            console.error(e);
            document.getElementById('rejectedMessage').textContent = "Unrecognized QR Code";
            resultRejected.style.display = 'block';
        }
    }

    scanAgainBtn.addEventListener('click', () => {
        scanResult.classList.remove('show');
        startScanner();
    });
});
