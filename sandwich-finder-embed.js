/**
 * Sandwich Finder Widget - Embeddable Version
 * For Square Online Store Integration
 * 
 * Usage: Add this script tag to your Square Online store:
 * <script src="https://your-domain.com/sandwich-finder-embed.js"></script>
 * <div id="sandwich-finder-widget-container"></div>
 */

(function() {
    'use strict';

    // Widget Configuration
    const WIDGET_CONFIG = {
        // Replace with your actual API endpoint or proxy service
        API_ENDPOINT: 'https://your-api-domain.com/api/search-sandwiches',
        // Alternative: Use Google Places API, Yelp API, or similar
        GOOGLE_PLACES_API_KEY: 'YOUR_GOOGLE_PLACES_API_KEY',
        CONTAINER_ID: 'sandwich-finder-widget-container'
    };

    // CSS Styles (embedded to make widget self-contained)
    const WIDGET_STYLES = `
        .sandwich-finder-widget {
            max-width: 600px;
            margin: 20px auto;
            padding: 20px;
            border: 2px solid #e67e22;
            border-radius: 12px;
            background: linear-gradient(135deg, #fff8e1 0%, #ffffff 100%);
            font-family: 'Arial', sans-serif;
            box-shadow: 0 4px 15px rgba(230, 126, 34, 0.1);
            box-sizing: border-box;
        }

        .sandwich-finder-widget * {
            box-sizing: border-box;
        }

        .widget-header {
            text-align: center;
            margin-bottom: 25px;
        }

        .widget-title {
            color: #d35400;
            font-size: 28px;
            font-weight: bold;
            margin: 0;
            text-shadow: 1px 1px 2px rgba(0,0,0,0.1);
        }

        .widget-subtitle {
            color: #7f8c8d;
            font-size: 14px;
            margin: 5px 0 0 0;
        }

        .search-form {
            display: grid;
            gap: 15px;
            margin-bottom: 20px;
        }

        .form-group {
            display: flex;
            flex-direction: column;
        }

        .form-label {
            font-weight: bold;
            color: #2c3e50;
            margin-bottom: 5px;
            font-size: 14px;
        }

        .form-input, .form-select {
            padding: 12px;
            border: 2px solid #bdc3c7;
            border-radius: 8px;
            font-size: 16px;
            transition: border-color 0.3s ease;
            width: 100%;
        }

        .form-input:focus, .form-select:focus {
            outline: none;
            border-color: #e67e22;
            box-shadow: 0 0 5px rgba(230, 126, 34, 0.3);
        }

        .search-button {
            background: linear-gradient(135deg, #e67e22 0%, #d35400 100%);
            color: white;
            border: none;
            padding: 15px 30px;
            font-size: 18px;
            font-weight: bold;
            border-radius: 8px;
            cursor: pointer;
            transition: all 0.3s ease;
            text-transform: uppercase;
            letter-spacing: 1px;
            width: 100%;
        }

        .search-button:hover {
            background: linear-gradient(135deg, #d35400 0%, #c0392b 100%);
            transform: translateY(-2px);
            box-shadow: 0 4px 10px rgba(211, 84, 0, 0.3);
        }

        .search-button:disabled {
            background: #95a5a6;
            cursor: not-allowed;
            transform: none;
            box-shadow: none;
        }

        .loading {
            text-align: center;
            padding: 20px;
            color: #7f8c8d;
            font-style: italic;
            animation: pulse 1.5s ease-in-out infinite;
        }

        @keyframes pulse {
            0% { opacity: 0.6; }
            50% { opacity: 1; }
            100% { opacity: 0.6; }
        }

        .results-container {
            margin-top: 25px;
        }

        .results-header {
            color: #2c3e50;
            font-size: 20px;
            font-weight: bold;
            margin-bottom: 15px;
            border-bottom: 2px solid #e67e22;
            padding-bottom: 5px;
        }

        .shop-card {
            background: white;
            border: 1px solid #ecf0f1;
            border-radius: 8px;
            padding: 15px;
            margin-bottom: 15px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
            transition: transform 0.2s ease;
        }

        .shop-card:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        }

        .shop-name {
            color: #e67e22;
            font-size: 18px;
            font-weight: bold;
            margin-bottom: 5px;
        }

        .shop-rating {
            color: #f39c12;
            font-size: 14px;
            margin-bottom: 8px;
        }

        .shop-address {
            color: #7f8c8d;
            font-size: 14px;
            margin-bottom: 8px;
        }

        .shop-specialty {
            color: #27ae60;
            font-weight: bold;
            font-size: 14px;
            margin-bottom: 8px;
        }

        .shop-details {
            color: #34495e;
            font-size: 13px;
            line-height: 1.4;
        }

        .error-message {
            background: #e74c3c;
            color: white;
            padding: 15px;
            border-radius: 8px;
            margin: 15px 0;
            text-align: center;
        }

        .no-results {
            text-align: center;
            color: #7f8c8d;
            font-style: italic;
            padding: 30px;
            background: #f8f9fa;
            border-radius: 8px;
            margin: 15px 0;
        }

        @media (max-width: 768px) {
            .sandwich-finder-widget {
                margin: 10px;
                padding: 15px;
            }
            
            .widget-title {
                font-size: 24px;
            }
        }
    `;

    // HTML Template
    const WIDGET_HTML = `
        <div class="sandwich-finder-widget">
            <div class="widget-header">
                <h2 class="widget-title">🥪 Sandwich Finder</h2>
                <p class="widget-subtitle">Find the perfect sandwich shop near you!</p>
            </div>

            <form class="search-form" id="sandwichForm">
                <div class="form-group">
                    <label class="form-label" for="location">📍 Your Location</label>
                    <input 
                        type="text" 
                        id="location" 
                        class="form-input" 
                        placeholder="Enter city, zip code, or address..."
                        required
                    >
                </div>

                <div class="form-group">
                    <label class="form-label" for="sandwichType">🥪 What sandwich are you craving?</label>
                    <select id="sandwichType" class="form-select" required>
                        <option value="">Choose your sandwich...</option>
                        <option value="Italian sub">Italian Sub</option>
                        <option value="Philly cheesesteak">Philly Cheesesteak</option>
                        <option value="Reuben">Reuben</option>
                        <option value="BLT">BLT</option>
                        <option value="Club sandwich">Club Sandwich</option>
                        <option value="Pastrami">Pastrami</option>
                        <option value="Roast beef">Roast Beef</option>
                        <option value="Turkey sandwich">Turkey Sandwich</option>
                        <option value="Ham sandwich">Ham Sandwich</option>
                        <option value="Grilled cheese">Grilled Cheese</option>
                        <option value="Panini">Panini</option>
                        <option value="Cubano">Cuban Sandwich</option>
                        <option value="Meatball sub">Meatball Sub</option>
                        <option value="Chicken sandwich">Chicken Sandwich</option>
                        <option value="Veggie sandwich">Veggie Sandwich</option>
                        <option value="custom">Other (I'll specify)</option>
                    </select>
                </div>

                <div class="form-group" id="customSandwichGroup" style="display: none;">
                    <label class="form-label" for="customSandwich">Specify your sandwich:</label>
                    <input 
                        type="text" 
                        id="customSandwich" 
                        class="form-input" 
                        placeholder="e.g., Po' boy, Banh mi, etc."
                    >
                </div>

                <div class="form-group">
                    <label class="form-label" for="radius">📏 Search Radius</label>
                    <select id="radius" class="form-select">
                        <option value="1">Within 1 mile</option>
                        <option value="3" selected>Within 3 miles</option>
                        <option value="5">Within 5 miles</option>
                        <option value="10">Within 10 miles</option>
                    </select>
                </div>

                <button type="submit" class="search-button" id="searchButton">
                    🔍 Find Sandwich Shops
                </button>
            </form>

            <div id="loadingMessage" class="loading" style="display: none;">
                Searching for delicious sandwiches near you...
            </div>

            <div id="resultsContainer" class="results-container" style="display: none;">
                <div class="results-header">🎯 Sandwich Shops Found:</div>
                <div id="resultsContent"></div>
            </div>
        </div>
    `;

    // Widget Class
    class SandwichFinderWidget {
        constructor(container) {
            this.container = container;
            this.init();
        }

        init() {
            // Inject styles
            this.injectStyles();
            
            // Inject HTML
            this.container.innerHTML = WIDGET_HTML;
            
            // Initialize event listeners
            this.initializeEventListeners();
        }

        injectStyles() {
            if (!document.getElementById('sandwich-finder-styles')) {
                const styleSheet = document.createElement('style');
                styleSheet.id = 'sandwich-finder-styles';
                styleSheet.textContent = WIDGET_STYLES;
                document.head.appendChild(styleSheet);
            }
        }

        initializeEventListeners() {
            const form = this.container.querySelector('#sandwichForm');
            const sandwichTypeSelect = this.container.querySelector('#sandwichType');
            const customSandwichGroup = this.container.querySelector('#customSandwichGroup');

            form.addEventListener('submit', (e) => this.handleSubmit(e));
            
            sandwichTypeSelect.addEventListener('change', (e) => {
                if (e.target.value === 'custom') {
                    customSandwichGroup.style.display = 'block';
                    this.container.querySelector('#customSandwich').required = true;
                } else {
                    customSandwichGroup.style.display = 'none';
                    this.container.querySelector('#customSandwich').required = false;
                }
            });
        }

        async handleSubmit(e) {
            e.preventDefault();
            
            const location = this.container.querySelector('#location').value.trim();
            const sandwichType = this.getSandwichType();
            const radius = this.container.querySelector('#radius').value;

            if (!location || !sandwichType) {
                this.showError('Please fill in all required fields.');
                return;
            }

            this.showLoading();
            
            try {
                const results = await this.searchSandwichShops(location, sandwichType, radius);
                this.displayResults(results);
            } catch (error) {
                this.showError('Sorry, we encountered an error while searching. Please try again.');
                console.error('Search error:', error);
            }
        }

        getSandwichType() {
            const selectValue = this.container.querySelector('#sandwichType').value;
            if (selectValue === 'custom') {
                return this.container.querySelector('#customSandwich').value.trim();
            }
            return selectValue;
        }

        async searchSandwichShops(location, sandwichType, radius) {
            // Option 1: Use your own backend API
            if (WIDGET_CONFIG.API_ENDPOINT && WIDGET_CONFIG.API_ENDPOINT !== 'https://your-api-domain.com/api/search-sandwiches') {
                return this.searchViaAPI(location, sandwichType, radius);
            }
            
            // Option 2: Use Google Places API (requires API key)
            if (WIDGET_CONFIG.GOOGLE_PLACES_API_KEY && WIDGET_CONFIG.GOOGLE_PLACES_API_KEY !== 'YOUR_GOOGLE_PLACES_API_KEY') {
                return this.searchViaGooglePlaces(location, sandwichType, radius);
            }
            
            // Option 3: Fallback to mock data for demonstration
            return this.getMockResults(location, sandwichType);
        }

        async searchViaAPI(location, sandwichType, radius) {
            const response = await fetch(WIDGET_CONFIG.API_ENDPOINT, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    location: location,
                    sandwichType: sandwichType,
                    radius: radius
                })
            });

            if (!response.ok) {
                throw new Error('API request failed');
            }

            return await response.json();
        }

        async searchViaGooglePlaces(location, sandwichType, radius) {
            // Note: This requires CORS proxy or server-side implementation
            // Google Places API doesn't allow direct client-side calls due to CORS
            const query = `${sandwichType} sandwich shop near ${location}`;
            const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(query)}&radius=${radius * 1609}&key=${WIDGET_CONFIG.GOOGLE_PLACES_API_KEY}`;
            
            // This would need to go through a CORS proxy or your backend
            throw new Error('Google Places API requires server-side implementation');
        }

        getMockResults(location, sandwichType) {
            // Mock data for demonstration
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve([
                        {
                            name: "Tony's Sandwich Shop",
                            rating: 4.5,
                            reviewCount: 234,
                            address: "123 Main St, " + location,
                            specialty: `Delicious ${sandwichType} made fresh daily`,
                            hours: "Mon-Sat 10AM-8PM",
                            phone: "(555) 123-4567",
                            website: "tonyssandwiches.com"
                        },
                        {
                            name: "The Sandwich Corner",
                            rating: 4.2,
                            reviewCount: 156,
                            address: "456 Oak Ave, " + location,
                            specialty: `Award-winning ${sandwichType} with premium ingredients`,
                            hours: "Daily 9AM-9PM",
                            phone: "(555) 987-6543",
                            website: "sandwichcorner.com"
                        }
                    ]);
                }, 2000);
            });
        }

        showLoading() {
            const searchButton = this.container.querySelector('#searchButton');
            const loadingMessage = this.container.querySelector('#loadingMessage');
            const resultsContainer = this.container.querySelector('#resultsContainer');

            searchButton.disabled = true;
            searchButton.textContent = 'Searching...';
            loadingMessage.style.display = 'block';
            resultsContainer.style.display = 'none';
            this.clearError();
        }

        displayResults(results) {
            const searchButton = this.container.querySelector('#searchButton');
            const loadingMessage = this.container.querySelector('#loadingMessage');
            const resultsContainer = this.container.querySelector('#resultsContainer');
            const resultsContent = this.container.querySelector('#resultsContent');

            searchButton.disabled = false;
            searchButton.textContent = '🔍 Find Sandwich Shops';
            loadingMessage.style.display = 'none';

            if (!results || results.length === 0) {
                this.showNoResults();
                return;
            }

            resultsContent.innerHTML = results.map(shop => this.createShopCard(shop)).join('');
            resultsContainer.style.display = 'block';
        }

        createShopCard(shop) {
            const stars = '⭐'.repeat(Math.floor(shop.rating));
            
            return `
                <div class="shop-card">
                    <div class="shop-name">${this.escapeHtml(shop.name)}</div>
                    <div class="shop-rating">${stars} ${shop.rating}/5 (${shop.reviewCount} reviews)</div>
                    <div class="shop-address">📍 ${this.escapeHtml(shop.address)}</div>
                    <div class="shop-specialty">🥪 ${this.escapeHtml(shop.specialty)}</div>
                    <div class="shop-details">
                        <div>🕒 ${this.escapeHtml(shop.hours)}</div>
                        <div>📞 ${this.escapeHtml(shop.phone)}</div>
                        ${shop.website ? `<div>🌐 <a href="http://${this.escapeHtml(shop.website)}" target="_blank" rel="noopener">${this.escapeHtml(shop.website)}</a></div>` : ''}
                    </div>
                </div>
            `;
        }

        showNoResults() {
            const resultsContent = this.container.querySelector('#resultsContent');
            const resultsContainer = this.container.querySelector('#resultsContainer');

            resultsContent.innerHTML = `
                <div class="no-results">
                    No sandwich shops found matching your criteria. Try expanding your search radius or choosing a different sandwich type.
                </div>
            `;
            resultsContainer.style.display = 'block';
        }

        showError(message) {
            this.clearError();
            const form = this.container.querySelector('.search-form');
            const errorDiv = document.createElement('div');
            errorDiv.className = 'error-message';
            errorDiv.textContent = message;
            form.appendChild(errorDiv);
            
            const searchButton = this.container.querySelector('#searchButton');
            const loadingMessage = this.container.querySelector('#loadingMessage');
            
            searchButton.disabled = false;
            searchButton.textContent = '🔍 Find Sandwich Shops';
            loadingMessage.style.display = 'none';
        }

        clearError() {
            const existingError = this.container.querySelector('.error-message');
            if (existingError) {
                existingError.remove();
            }
        }

        escapeHtml(text) {
            const div = document.createElement('div');
            div.textContent = text;
            return div.innerHTML;
        }
    }

    // Auto-initialize when DOM is ready
    function initializeWidget() {
        const container = document.getElementById(WIDGET_CONFIG.CONTAINER_ID);
        if (container) {
            new SandwichFinderWidget(container);
        } else {
            console.warn('Sandwich Finder Widget: Container element not found. Make sure you have a div with id="sandwich-finder-widget-container"');
        }
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeWidget);
    } else {
        initializeWidget();
    }

    // Make widget available globally
    window.SandwichFinderWidget = SandwichFinderWidget;
    window.SANDWICH_FINDER_CONFIG = WIDGET_CONFIG;

})();
