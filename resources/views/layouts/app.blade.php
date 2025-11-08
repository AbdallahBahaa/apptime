<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'AppTime') }} - Employee Activity Monitoring</title>

    <!-- Fonts -->
    <link rel="dns-prefetch" href="//fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=Nunito" rel="stylesheet">

    <!-- Scripts -->
    @vite(['resources/css/app.css', 'resources/js/app.js'])

    <script>
        console.log('Blade template loaded - checking for React app');

        // Idle monitoring script - only runs for authenticated users
        @auth
        (function() {
            console.log('Idle monitor script starting for authenticated user...');

            let idleTimeout;
            let warningTimeout;
            let logoutTimeout;
            let modal;

            // Create modal element
            function createModal() {
                modal = document.createElement('div');
                modal.id = 'idle-modal';
                modal.style.cssText = `
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.5);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 9999;
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                `;

                const modalContent = document.createElement('div');
                modalContent.style.cssText = `
                    background: white;
                    border-radius: 12px;
                    padding: 24px;
                    max-width: 400px;
                    width: 90%;
                    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
                    text-align: center;
                `;

                const title = document.createElement('h3');
                title.id = 'modal-title';
                title.style.cssText = `
                    font-size: 18px;
                    font-weight: 600;
                    color: #1f2937;
                    margin-bottom: 12px;
                `;

                const message = document.createElement('p');
                message.id = 'modal-message';
                message.style.cssText = `
                    color: #6b7280;
                    margin-bottom: 20px;
                    line-height: 1.5;
                `;

                const buttonContainer = document.createElement('div');
                buttonContainer.id = 'modal-buttons';
                buttonContainer.style.cssText = `
                    display: flex;
                    gap: 12px;
                    justify-content: center;
                `;

                modalContent.appendChild(title);
                modalContent.appendChild(message);
                modalContent.appendChild(buttonContainer);
                modal.appendChild(modalContent);
                document.body.appendChild(modal);
            }

            function showModal(title, message, buttons = []) {
                if (!modal) createModal();

                document.getElementById('modal-title').textContent = title;
                document.getElementById('modal-message').textContent = message;

                const buttonContainer = document.getElementById('modal-buttons');
                buttonContainer.innerHTML = '';

                buttons.forEach(btn => {
                    const button = document.createElement('button');
                    button.textContent = btn.text;
                    button.style.cssText = `
                        padding: 8px 16px;
                        border-radius: 6px;
                        font-weight: 500;
                        cursor: pointer;
                        border: none;
                        transition: all 0.2s;
                        ${btn.primary ? 'background: #3b82f6; color: white;' : 'background: #f3f4f6; color: #374151;'}
                    `;
                    button.onmouseover = () => {
                        button.style.transform = 'translateY(-1px)';
                        button.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
                    };
                    button.onmouseout = () => {
                        button.style.transform = 'translateY(0)';
                        button.style.boxShadow = 'none';
                    };
                    button.onclick = () => {
                        hideModal();
                        btn.action();
                    };
                    buttonContainer.appendChild(button);
                });

                modal.style.display = 'flex';
            }

            function hideModal() {
                if (modal) {
                    modal.style.display = 'none';
                }
            }

            function resetTimers() {
                console.log('Resetting idle timers');

                // Clear existing timers
                if (idleTimeout) clearTimeout(idleTimeout);
                if (warningTimeout) clearTimeout(warningTimeout);
                if (logoutTimeout) clearTimeout(logoutTimeout);

                // Set alert timer (5 seconds)
                idleTimeout = setTimeout(() => {
                    console.log('Alert timer triggered - showing modal');
                    showModal(
                        'Idle Alert',
                        'You have been inactive for a while. Please continue working to avoid being logged out.',
                        [{
                            text: 'Continue Working',
                            primary: true,
                            action: () => {
                                console.log('User chose to continue working');
                                resetTimers();
                            }
                        }]
                    );

                    // Set warning timer (5 more seconds = 10 total)
                    warningTimeout = setTimeout(() => {
                        console.log('Warning timer triggered - showing confirm modal');
                        showModal(
                            'Idle Warning',
                            'You have been inactive again. This is your second warning. You will be automatically logged out if you remain inactive.',
                            [{
                                text: 'Continue Working',
                                primary: true,
                                action: () => {
                                    console.log('User chose to continue working');
                                    resetTimers();
                                }
                            }, {
                                text: 'Logout Now',
                                primary: false,
                                action: () => {
                                    console.log('User chose to logout now');
                                    applyPenaltyAndLogout();
                                }
                            }]
                        );

                        // Set logout timer (5 more seconds = 15 total)
                        logoutTimeout = setTimeout(() => {
                            console.log('Logout timer triggered - auto logout');
                            hideModal();
                            showModal(
                                'Auto Logout',
                                'You have been logged out due to repeated inactivity.',
                                [{
                                    text: 'OK',
                                    primary: true,
                                    action: () => {
                                        applyPenaltyAndLogout();
                                    }
                                }]
                            );
                        }, 5000);
                    }, 5000);
                }, 5000);
            }

            // Function to apply penalty and logout
            function applyPenaltyAndLogout() {
                console.log('Applying penalty and logging out...');

                // Get CSRF token
                const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');

                if (csrfToken) {
                    // Apply penalty via API
                    fetch('/api/apply-penalty-logout', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'X-CSRF-TOKEN': csrfToken,
                            'Accept': 'application/json',
                            'X-Requested-With': 'XMLHttpRequest'
                        },
                        body: JSON.stringify({
                            user_id: {{ auth()->id() }},
                            idle_duration: 15
                        })
                    })
                    .then(response => {
                        console.log('Penalty API response:', response.status);
                        if (!response.ok) {
                            throw new Error('API request failed');
                        }
                        return response.json().catch(() => ({}));
                    })
                    .then(data => {
                        console.log('Penalty applied successfully:', data);
                    })
                    .catch(error => {
                        console.error('Error applying penalty:', error);
                    })
                    .finally(() => {
                        // Always logout after attempting to apply penalty
                        setTimeout(() => {
                            const logoutForm = document.getElementById('logout-form');
                            if (logoutForm) {
                                logoutForm.submit();
                            } else {
                                window.location.href = '/logout';
                            }
                        }, 1000);
                    });
                } else {
                    console.error('No CSRF token found');
                    // Fallback to direct logout
                    const logoutForm = document.getElementById('logout-form');
                    if (logoutForm) {
                        logoutForm.submit();
                    } else {
                        window.location.href = '/logout';
                    }
                }
            }

            // Activity events
            const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click'];

            function handleActivity() {
                console.log('Activity detected, resetting timers');
                resetTimers();
            }

            // Add event listeners
            events.forEach(event => {
                document.addEventListener(event, handleActivity, true);
            });

            // Start timers
            resetTimers();

            console.log('Idle monitor script initialized for authenticated user');
        })();
        @endauth
    </script>
</head>
<body class="bg-gray-50">
    <div id="app">
        <nav class="bg-white shadow-sm border-b border-gray-200">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex justify-between h-16">
                    <div class="flex">
                        <!-- Logo -->
                        <div class="shrink-0 flex items-center">
                            <a href="{{ url('/') }}" class="flex items-center">
                                <div class="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center mr-3">
                                    <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"></path>
                                    </svg>
                                </div>
                                <span class="text-xl font-bold text-gray-900">{{ config('app.name', 'AppTime') }}</span>
                            </a>
                        </div>
                    </div>

                    <div class="flex items-center">
                        <!-- Authentication Links -->
                        @guest
                            @if (Route::has('login'))
                                <a href="{{ route('login') }}" class="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium transition duration-200">
                                    {{ __('Login') }}
                                </a>
                            @endif

                            @if (Route::has('register'))
                                <a href="{{ route('register') }}" class="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium transition duration-200">
                                    {{ __('Register') }}
                                </a>
                            @endif
                        @else
                            <div class="relative ml-3">
                                <div class="flex items-center space-x-4">
                                    <!-- Navigation Links -->
                                    @auth
                                        <a href="{{ route('dashboard') }}" class="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium transition duration-200">
                                            Dashboard
                                        </a>
                                        @if(Auth::user()->isAdmin())
                                        <a href="{{ route('admin.dashboard') }}" class="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-md text-sm font-medium transition duration-200">
                                            Admin Panel
                                        </a>
                                        @endif
                                    @endauth

                                    <span class="text-sm text-gray-700">{{ Auth::user()->name }}</span>
                                    <form id="logout-form" action="{{ route('logout') }}" method="POST" class="inline">
                                        @csrf
                                        <button type="submit" class="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium transition duration-200">
                                            {{ __('Logout') }}
                                        </button>
                                    </form>
                                </div>
                            </div>
                        @endguest
                    </div>
                </div>
            </div>
        </nav>

        <main>
            @yield('content')
        </main>
    </div>
</body>
</html>
