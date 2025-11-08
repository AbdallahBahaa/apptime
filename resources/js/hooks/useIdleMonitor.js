import { useEffect, useRef, useState } from 'react';
import { useAuth } from './useAuth';
import api from '../services/api';

export const useIdleMonitor = () => {
    const { user, logout } = useAuth();
    const timeoutRef = useRef(null);
    const [idleCount, setIdleCount] = useState(0);
    const [systemSettings, setSystemSettings] = useState(null);

    // Fetch system settings on mount and periodically refresh
    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const response = await api.getSystemSettings();
                setSystemSettings(response.data);
            } catch (error) {
                console.error('Failed to fetch system settings:', error);
                // Keep previous settings or set default if none
                if (!systemSettings) {
                    setSystemSettings({ default_idle_timeout: 5 });
                }
            }
        };

        fetchSettings();

        // Refresh settings every 10 seconds to pick up admin changes
        const settingsInterval = setInterval(fetchSettings, 10000);

        return () => clearInterval(settingsInterval);
    }, []);

    useEffect(() => {
        if (!user || !systemSettings || !systemSettings.default_idle_timeout) return;

        const idleTimeoutSeconds = systemSettings.default_idle_timeout;
        const idleTimeoutMs = idleTimeoutSeconds * 1000;

        const resetIdle = () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
            setIdleCount(0);
            timeoutRef.current = setTimeout(() => {
                setIdleCount(prev => {
                    const newCount = prev + 1;
                    handleIdleEvent(newCount);
                    return newCount;
                });
            }, idleTimeoutMs);
        };

        const handleIdleEvent = async (count) => {
            if (count === 1) {
                alert(`Idle Alert: You have been inactive for ${idleTimeoutSeconds} seconds. Please continue working.`);
            } else if (count === 2) {
                const continueWorking = confirm(`Idle Warning: You have been inactive again. This is your second warning.\n\nClick OK to continue working or Cancel to logout now.`);
                if (!continueWorking) {
                    await logout();
                    return;
                }
            } else if (count === 3) {
                alert('You have been logged out due to repeated inactivity.');
                try {
                    await api.applyIdlePenalty({ user_id: user.id, idle_duration: idleTimeoutSeconds });
                } catch (error) {
                    console.error('Failed to apply penalty:', error);
                }
                await logout();
                return;
            }

            // Reset timer for next idle period
            resetIdle();
        };

        const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click'];
        const handleActivity = () => resetIdle();

        events.forEach(event => document.addEventListener(event, handleActivity, true));

        resetIdle();

        return () => {
            events.forEach(event => document.removeEventListener(event, handleActivity, true));
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, [user, logout, systemSettings]);

    return null;
};
