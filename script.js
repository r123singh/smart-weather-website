document.addEventListener('DOMContentLoaded', () => {
    const chatBox = document.getElementById('chatBox');
    const chatbotToggle = document.getElementById('chatbotToggle');
    const minimizeChat = document.getElementById('minimizeChat');
    const chatMessages = document.getElementById('chatMessages');
    const chatInput = document.getElementById('chatInput');
    const sendBtn = document.querySelector('.send-btn');
    const personaSelector = document.querySelector('.persona-selector');
    const personaBtn = document.querySelector('.persona-btn');
    const personaDropdown = document.querySelector('.persona-dropdown.persona-tabs');
    const personaOptions = document.querySelectorAll('.persona-option');
    // chatbot configurations as per persona
    const chatPersona = {
        "weather-enthusiast": {
            "personaName": "Weather Enthusiast",
            "personaDescription": "A weather enthusiast who loves to track weather patterns and share their insights with others.",
            "emoji": "🌤️",
            "sampleResponses": [
                "Today's dew point and cloud cover patterns are fascinating!",
                "Did you know this week's pressure drop could trigger a storm front?"
            ],
            "preDefinedQuestions": [
                "Any cool weather anomalies today?",
                "What's the current barometric pressure?",
                "How does today's weather compare to the average?",
            ]
        },
        "farmer": {
            "personaName": "Farmer",
            "personaDescription": "A farmer who needs to know the weather to plan their crops and irrigation.",
            "emoji": "🌾",
            "sampleResponses": [
                "Perfect day for sowing! Low winds and rich soil moisture expected.",
                "Heads up! A dry spell is coming—consider irrigation planning.",
            ],
            "preDefinedQuestions": [
                "Will it rain in the next few days?",
                "Is it a good week to plant seeds?",
                "How's the soil moisture forecast?",
            ]
        },
        "tourist": {
            "personaName": "Tourist",
            "personaDescription": "A tourist who needs to know the weather to plan their activities.",
            "emoji": "🧳",
            "sampleResponses": [
                "Pack your sunglasses! It's going to be sunny in Rome all week.",
                "Might want to reschedule that beach trip—showers ahead.",
            ],
            "preDefinedQuestions": [
                "What's the weather like in Paris this weekend?",
                "Should I carry an umbrella in Tokyo today?",
                "Is it good weather for sightseeing tomorrow?",
            ]
        },
        "student": {
            "personaName": "Student",
            "personaDescription": "A student who needs to know the weather to plan their activities.",
            "emoji": "🎓",
            "sampleResponses": [
                "No excuse to skip class—it's sunny and 22°C!",
                "Rainy day ahead—don't forget your raincoat before heading to campus.",
            ],
            "preDefinedQuestions": [
                "Do I need an umbrella for my walk to school?",
                "What's the temperature right now?",
                "How's the weather this week?",
            ]
        },
        "disaster-management": {    
            "personaName": "Disaster Management",
            "personaDescription": "A disaster management team who needs to know the weather to plan their activities.",
            "emoji": "🚨",
            "sampleResponses": [
                "Severe weather alert: high wind gusts and potential flash floods in your area.",
                "Monitoring cyclone path—landfall expected in 48 hours.",
            ],
            "preDefinedQuestions": [
                "Any extreme weather warnings?",
                "Is there a risk of flooding this week?",
                "Can you provide storm tracking updates?",
            ]
        },
        "athlete": {
            "personaName": "Athlete/Sports Enthusiast",
            "personaDescription": "An athlete who needs to know the weather to plan their activities.",
            "emoji": "🏃‍♂️",
            "sampleResponses": [
                "Great day for a run—cool breeze and low humidity.",
                "Caution: high UV index during peak afternoon hours.",
            ],
            "preDefinedQuestions": [
                "Is it good weather for outdoor training?",
                "Will the wind affect my cycling route?",
                "How's the air quality today?",
            ]
        },
        "event-planner": {
            "personaName": "Outdoor Event Planner",
            "personaDescription": "An event planner who needs to know the weather to plan their activities.",
            "emoji": "🎪",
            "sampleResponses": [
                "Mild skies and calm winds—perfect setup for an open-air event.",
                "Forecast shows rain right during your planned hours—consider a backup tent!",
            ],
            "preDefinedQuestions": [
                "Will it rain during my event?",
                "Is it safe to plan an outdoor wedding this Saturday?",
                "What's the wind forecast like?",
            ]
        },
        "photographer": {
            "personaName": "Photographer",
            "personaDescription": "A photographer who needs to know the weather to plan their activities.",
            "emoji": "📸",
            "sampleResponses": [
                "Golden hour's going to be magical today—clear skies and crisp light.",
                "Expect moody skies and scattered clouds—perfect for dramatic shots.",
            ],
            "preDefinedQuestions": [
                "When's golden hour today?",
                "Is the sky clear for astrophotography tonight?",
                "Will there be fog in the morning?",
            ]
        },
        "construction-worker": {
            "personaName": "Construction Worker",
            "personaDescription": "A construction worker who needs to know the weather to plan their activities.",
            "emoji": "🏗️",
            "sampleResponses": [
                "Clear skies—ideal for concrete pouring and roofing.",
                "High winds expected—crane operations may need rescheduling.",
            ],
            "preDefinedQuestions": [
                "Any rain forecast that may affect site work?",
                "Can we schedule exterior painting this week?",
                "Will high winds affect our timeline?",
            ]
        },
        "pilot": {
            "personaName": "Pilot/Aviation Professional",
            "personaDescription": "A pilot who needs to know the weather to plan their activities.",
            "emoji": "✈️",
            "sampleResponses": [
                "Visibility is great today—no significant turbulence reported.",
                "Be cautious: thunderstorms expected near your flight path.",
            ],
            "preDefinedQuestions": [
                "What's the wind shear like around the airport?",
                "Any turbulence expected on the route to NYC?",
                "What's the cloud ceiling currently?",
            ]
        },
        "marine": {
            "personaName": "Marine Professional",
            "personaDescription": "A marine professional who needs to know the weather to plan their activities.",
            "emoji": "🌊",
            "sampleResponses": [
                "Waves are steady at 1.5 meters with low swell—smooth sailing ahead.",
                "Storm surge warning issued—harbor activity should be paused.",
            ],
            "preDefinedQuestions": [
                "What's the tide forecast today?",
                "Is it safe to sail this weekend?",
                "What's the wind speed on open waters?",
            ]
        },
        "healthcare": {
            "personaName": "Healthcare Worker",
            "personaDescription": "A healthcare worker who needs to know the weather to plan their activities.",
            "emoji": "🏥",
            "sampleResponses": [
                "Air quality is poor today—recommend limiting outdoor exposure.",
                "Cold front incoming—prepare for a rise in respiratory issues.",
            ],
            "preDefinedQuestions": [
                "Is today high-risk for asthma patients?",
                "Any weather alerts relevant to health?",
                "What's the pollen count today?",
            ]
        },
        "pet-owner": {
            "personaName": "Pet Owner",
            "personaDescription": "A pet owner who needs to know the weather to plan their activities.",
            "emoji": "🐶",
            "sampleResponses": [
                "Your furry friend will enjoy today's mild weather—perfect for a long walk.",
                "Heavy rain expected—might want to skip the dog park.",
            ],
            "preDefinedQuestions": [
                "Is it safe for a walk with my pet?",
                "What's the UV index like?",
                "Will it be too hot for my dog today?",
            ]
        },
        "commuter": {
            "personaName": "Commuter",
            "personaDescription": "A commuter who needs to know the weather to plan their activities.",
            "emoji": "🚗",
            "sampleResponses": [
                "Light showers expected during morning commute—leave a bit early.",
                "Roads look clear with no visibility issues—smooth drive ahead.",
            ],
            "preDefinedQuestions": [
                "Will it rain during rush hour?",
                "Any fog or snow warnings?",
                "How's the traffic weather?",
            ]
        },
        "gardener": {
            "personaName": "Home Gardener",
            "personaDescription": "A home gardener who needs to know the weather to plan their activities.",
            "emoji": "🌱",
            "sampleResponses": [
                "Soil's going to love this gentle rain—ideal for your herbs and flowers.",
                "Dry week ahead—remember to water your plants!",
            ],
            "preDefinedQuestions": [
                "Will it rain enough for my garden?",
                "What's the temperature range this week?",
                "How's the humidity level for my plants?",
            ]
        }
    } ;
    
    // Toggle chat box
    chatbotToggle.addEventListener('click', () => {
        chatBox.classList.add('active');        
        showWelcomeMessage();
    });

    minimizeChat.addEventListener('click', () => {
        chatBox.classList.remove('active');
    });

    // Function to show welcome message with persona-specific questions
    function showWelcomeMessage() {
        const activePersona = document.querySelector('.persona-option.active')?.getAttribute('data-persona') || 'weather-enthusiast';
        const persona = chatPersona[activePersona];
        
        // Add welcome message
        const welcomeMessage = `Hello! I'm your ${persona.personaName} weather assistant ${persona.emoji}. ${persona.personaDescription}`;
        addMessage(welcomeMessage, 'bot');

        // Add pre-defined questions
        const questionsContainer = document.createElement('div');
        questionsContainer.classList.add('predefined-questions');
        
        persona.preDefinedQuestions.forEach(question => {
            const questionBtn = document.createElement('button');
            questionBtn.classList.add('predefined-question');
            questionBtn.textContent = question;
            questionBtn.addEventListener('click', () => {
                chatInput.value = question;
                sendMessage();
            });
            questionsContainer.appendChild(questionBtn);
        });

        chatMessages.appendChild(questionsContainer);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Set initial persona text and active state
    const activePersona = document.querySelector('.persona-option.active');
    if (activePersona) {
        personaBtn.textContent = activePersona.textContent;
    } else {
        // Set default persona if none is active
        const defaultPersona = document.querySelector('.persona-option[data-persona="weather-enthusiast"]');
        if (defaultPersona) {
            defaultPersona.classList.add('active');
            personaBtn.textContent = defaultPersona.textContent;
        }
    }

    // Ensure dropdown is hidden on load
    personaDropdown.classList.remove('show');

    // Toggle dropdown
    personaBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        personaDropdown.classList.toggle('show');
    });

    // Hide dropdown when clicking outside
    document.addEventListener('click', (e) => {
        if (!personaSelector.contains(e.target)) {
            personaDropdown.classList.remove('show');
        }
    });

    // Hide dropdown when selecting a persona
    personaOptions.forEach(option => {
        option.addEventListener('click', (e) => {
            e.stopPropagation();
            personaOptions.forEach(opt => opt.classList.remove('active'));
            option.classList.add('active');
            personaBtn.textContent = option.textContent;
            // Always close dropdown after selection
            personaDropdown.classList.remove('show');
            // Add switch persona message
            addMessage(`Switching to ${option.textContent} mode...`, 'bot');
        });
    });

    // Send message function
    function sendMessage() {
        const message = chatInput.value.trim();
        if (message) {
            // Add user message
            addMessage(message, 'user');
            chatInput.value = '';

            // Show typing animation
            const typingDiv = showTypingAnimation();

            // Simulate bot response
            setTimeout(() => {
                // Remove typing animation
                typingDiv.remove();
                
                const responses = [
                    "I'm checking the weather forecast for you! ⛅",
                    "The weather is looking great today! 🌞",
                    "Don't forget your umbrella, there's a chance of rain! 🌧️",
                    "The temperature will be perfect for outdoor activities! 🌤️",
                    "Expect some clouds but no rain today! ☁️"
                ];
                // get sample response from the active persona
                const personaKey = document.querySelector('.persona-option.active')?.getAttribute('data-persona') || 'weather-enthusiast';
                const sampleResponse = chatPersona[personaKey]?.sampleResponses[Math.floor(Math.random() * chatPersona[personaKey]?.sampleResponses.length)];
                addMessage(sampleResponse, 'bot');
            }, 1000);
        }
    }

    // Add message to chat
    function addMessage(message, sender) {
        let icon = '';
        if (sender === 'bot') {
            // Get the current persona's emoji
            const personaKey = document.querySelector('.persona-option.active')?.getAttribute('data-persona') || 'weather-enthusiast';
            icon = chatPersona[personaKey]?.emoji || '🤖';
        } else if (sender === 'user') {
            icon = '🧑';
        }
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', `${sender}-message`);
        messageDiv.innerHTML = `
            <div class="message-content">
                <span class="message-icon">${icon}</span> ${message}
            </div>
        `;
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Send message on button click
    sendBtn.addEventListener('click', sendMessage);

    // Send message on Enter key
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    // Add weather-themed typing animation
    let weatherEmojis = ['☀️', '🌤️', '⛈️', '🌧️', '⛅'];
    let currentEmojiIndex = 0;

    function updateTypingAnimation() {
        const typingDiv = document.createElement('div');
        typingDiv.classList.add('message', 'bot-message', 'typing');
        typingDiv.innerHTML = `
            <div class="message-content">
                ${weatherEmojis[currentEmojiIndex]}
            </div>
        `;
        
        currentEmojiIndex = (currentEmojiIndex + 1) % weatherEmojis.length;
        return typingDiv;
    }

    // Show typing animation when user sends message
    function showTypingAnimation() {
        const typingDiv = updateTypingAnimation();
        chatMessages.appendChild(typingDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        return typingDiv;
    }

    // Add smooth hover effect to chatbot toggle
    chatbotToggle.addEventListener('mouseover', () => {
        const radarRing = document.querySelector('.radar-ring');
        radarRing.style.animation = 'radar 1s linear infinite';
    });

    chatbotToggle.addEventListener('mouseout', () => {
        const radarRing = document.querySelector('.radar-ring');
        radarRing.style.animation = 'radar 2s linear infinite';
    });

    // Temperature Graph
    const canvas = document.getElementById('temperatureGraph');
    const ctx = canvas.getContext('2d');
    const temperatures = [32, 29, 28, 26, 26, 28, 33, 36, 39, 39, 39, 36];
    const feelsLike = [30, 27, 26, 24, 24, 26, 31, 34, 37, 37, 37, 34];

    // Set canvas size
    function resizeCanvas() {
        canvas.width = canvas.parentElement.offsetWidth;
        canvas.height = canvas.parentElement.offsetHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Draw temperature graph
    function drawGraph(temps, color = '#3498db', fill = true) {
        const width = canvas.width;
        const height = canvas.height;
        const padding = 20;
        const maxTemp = 50;
        const minTemp = 10;

        ctx.beginPath();
        ctx.moveTo(padding, height - ((temps[0] - minTemp) / (maxTemp - minTemp) * height));

        // Draw curved line
        for (let i = 0; i < temps.length - 1; i++) {
            const x1 = padding + (i * (width - padding * 2) / (temps.length - 1));
            const x2 = padding + ((i + 1) * (width - padding * 2) / (temps.length - 1));
            const y1 = height - ((temps[i] - minTemp) / (maxTemp - minTemp) * height);
            const y2 = height - ((temps[i + 1] - minTemp) / (maxTemp - minTemp) * height);
            
            const xc = (x1 + x2) / 2;
            const yc = (y1 + y2) / 2;
            
            ctx.quadraticCurveTo(x1, y1, xc, yc);
        }

        // Complete the curve
        const lastX = padding + ((temps.length - 1) * (width - padding * 2) / (temps.length - 1));
        const lastY = height - ((temps[temps.length - 1] - minTemp) / (maxTemp - minTemp) * height);
        ctx.quadraticCurveTo(lastX, lastY, lastX, lastY);

        if (fill) {
            ctx.lineTo(width - padding, height);
            ctx.lineTo(padding, height);
            ctx.fillStyle = `${color}33`;
            ctx.fill();
        }

        ctx.strokeStyle = color;
        ctx.lineWidth = 2;
        ctx.stroke();
    }

    // Draw initial graph
    function updateGraph() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw grid lines
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
        ctx.lineWidth = 1;
        for (let i = 0; i <= 4; i++) {
            const y = i * (canvas.height / 4);
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(canvas.width, y);
            ctx.stroke();
        }

        // Draw temperature lines
        if (document.getElementById('feelsLikeToggle').checked) {
            drawGraph(temperatures, '#3498db', false);
            drawGraph(feelsLike, '#e74c3c');
        } else {
            drawGraph(temperatures, '#3498db');
        }
    }

    // Toggle feels like temperature
    document.getElementById('feelsLikeToggle').addEventListener('change', updateGraph);

    // Initial draw
    updateGraph();
}); 