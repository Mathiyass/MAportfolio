/**
 * WeatherWidget.js
 * Displays weather (mocked for now, can connect to OpenWeatherMap).
 */

export class WeatherWidget {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        if (!this.container) return;
        this.init();
    }

    init() {
        this.render();
        // Here we would fetch real data
    }

    render() {
        // Mock Data
        const data = {
            temp: '24°C',
            condition: 'Clear Sky',
            icon: 'fa-sun',
            location: 'Tokyo, JP'
        };

        this.container.innerHTML = `
            <div class="flex items-center gap-4 text-white">
                <i class="fas ${data.icon} text-3xl text-yellow-400"></i>
                <div>
                    <div class="text-2xl font-bold font-orbitron">${data.temp}</div>
                    <div class="text-xs text-gray-400">${data.condition} • ${data.location}</div>
                </div>
            </div>
        `;
    }
}
