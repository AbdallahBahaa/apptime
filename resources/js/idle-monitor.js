document.addEventListener('DOMContentLoaded', function() {
    // Only run idle monitoring if user is authenticated and not on login/register pages
    if (!isAuthenticatedPage()) {
        return;
    }

    let idleTimer;
    let idleCount = 0;
    let idleTimeout = 5000; // Default 5 seconds, will be updated from server

    // Fetch user idle timeout from server
    fetch('/api/user/idle-timeout')
        .then(response => response.json())
        .then(data => {
            idleTimeout = data.idle_timeout * 1000;
            resetIdleTimer();
        })
        .catch(() => {
            resetIdleTimer(); // Use default if fetch fails
        });

    function resetIdleTimer() {
        clearTimeout(idleTimer);
        idleTimer = setTimeout(showIdleAlert, idleTimeout);
    }

    function showIdleAlert() {
        idleCount++;
        if (idleCount === 1) {
            showModal('Idle Alert', 'You have been idle for ' + (idleTimeout / 1000) + ' seconds. Please interact with the page.');
            // Log idle detection
            logIdleActivity('idle_alert');
        } else if (idleCount === 2) {
            showModal('Idle Warning', 'This is your second idle period. One more and you will be logged out.');
            // Log idle detection
            logIdleActivity('idle_warning');
        } else if (idleCount >= 3) {
            // Apply penalty and auto logout
            applyPenaltyAndLogout();
        }
    }

    function logIdleActivity(action) {
        fetch('/api/log-idle', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
            },
            body: JSON.stringify({ action: action })
        });
    }

    function applyPenaltyAndLogout() {
        fetch('/api/apply-penalty-logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
            }
        }).then(() => {
            window.location.href = '/';
        });
    }

    function showModal(title, message) {
        // Create modal
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50';
        modal.innerHTML = `
            <div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                <div class="mt-3 text-center">
                    <h3 class="text-lg font-medium text-gray-900">${title}</h3>
                    <div class="mt-2 px-7 py-3">
                        <p class="text-sm text-gray-500">${message}</p>
                    </div>
                    <div class="flex items-center px-4 py-3">
                        <button id="close-modal" class="px-4 py-2 bg-blue-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300">
                            OK
                        </button>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(modal);

        // Close modal on button click
        document.getElementById('close-modal').addEventListener('click', function() {
            modal.remove();
        });
    }

    function isAuthenticatedPage() {
        // Check if we're on login or register pages
        const currentPath = window.location.pathname;
        return !currentPath.includes('/login') && !currentPath.includes('/register') && currentPath !== '/';
    }

    // Event listeners for user activity
    document.addEventListener('mousemove', resetIdleTimer);
    document.addEventListener('keypress', resetIdleTimer);
    document.addEventListener('click', resetIdleTimer);
    document.addEventListener('scroll', resetIdleTimer);

    // Start the idle timer
    resetIdleTimer();
});
