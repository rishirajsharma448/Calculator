const clocksContainer = document.getElementById('clocksContainer');
const timezoneSelect = document.getElementById('timezone');
const addBtn = document.getElementById('addBtn');

let clocks = [];

// Add clock on button click
addBtn.addEventListener('click', addClock);

// Add clock on Enter key in select
timezoneSelect.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addClock();
});

function addClock() {
    const timezone = timezoneSelect.value;
    
    if (!timezone) {
        alert('Please select a time zone');
        return;
    }
    
    // Check if clock already exists
    if (clocks.some(c => c.timezone === timezone)) {
        alert(`Clock for ${timezone} is already displayed`);
        return;
    }
    
    const clockId = `clock-${Date.now()}`;
    const clockObj = {
        id: clockId,
        timezone: timezone,
        element: null
    };
    
    // Create clock element
    const clockDiv = document.createElement('div');
    clockDiv.className = 'clock';
    clockDiv.id = clockId;
    
    const clockContent = document.createElement('div');
    clockContent.className = 'clock-content';
    
    const timezoneName = document.createElement('div');
    timezoneName.className = 'timezone-name';
    timezoneName.textContent = timezone.replace(/_/g, ' ');
    
    const timeDisplay = document.createElement('div');
    timeDisplay.className = 'time-display';
    
    const dateDisplay = document.createElement('div');
    dateDisplay.className = 'date-display';
    
    const removeBtn = document.createElement('button');
    removeBtn.className = 'remove-btn';
    removeBtn.textContent = 'Remove';
    removeBtn.addEventListener('click', () => removeClock(clockId));
    
    clockContent.appendChild(timezoneName);
    clockContent.appendChild(timeDisplay);
    clockContent.appendChild(dateDisplay);
    clockContent.appendChild(removeBtn);
    
    clockDiv.appendChild(clockContent);
    clocksContainer.appendChild(clockDiv);
    
    clockObj.element = { timeDisplay, dateDisplay };
    clocks.push(clockObj);
    
    // Update time immediately
    updateClock(clockObj);
    
    // Reset select
    timezoneSelect.value = '';
}

function removeClock(clockId) {
    const element = document.getElementById(clockId);
    if (element) {
        element.style.animation = 'clockAppear 0.3s ease-out reverse';
        setTimeout(() => {
            element.remove();
        }, 300);
    }
    
    clocks = clocks.filter(c => c.id !== clockId);
    
    if (clocks.length === 0) {
        showEmptyMessage();
    }
}

function updateClock(clockObj) {
    try {
        const now = new Date();
        const formatter = new Intl.DateTimeFormat('en-US', {
            timeZone: clockObj.timezone,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
        });
        
        const dateFormatter = new Intl.DateTimeFormat('en-US', {
            timeZone: clockObj.timezone,
            weekday: 'short',
            month: 'short',
            day: '2-digit',
            year: 'numeric'
        });
        
        const time = formatter.format(now);
        const date = dateFormatter.format(now);
        
        clockObj.element.timeDisplay.textContent = time;
        clockObj.element.dateDisplay.textContent = date;
    } catch (error) {
        console.error(`Error updating clock for ${clockObj.timezone}:`, error);
    }
}

function updateAllClocks() {
    if (clocks.length === 0) {
        showEmptyMessage();
        return;
    }
    
    clocks.forEach(updateClock);
}

function showEmptyMessage() {
    if (clocksContainer.children.length === 0) {
        clocksContainer.innerHTML = '<div class="empty-message">Select a time zone and click "Add Clock" to get started</div>';
    }
}

// Update clocks every second
setInterval(updateAllClocks, 1000);

// Initial display
showEmptyMessage();