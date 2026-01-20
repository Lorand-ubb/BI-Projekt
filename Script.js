// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Simple contact form handling
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        // Here you would normally send the data to a server
        
        // Simulate success
        const input = this.querySelector('input[type="email"]');
        if (input.value) {
            formMessage.textContent = `Köszönjük a feliratkozást, ${input.value}! Hamarosan küldjük az első elemzésünket.`;
            formMessage.style.color = '#27ae60';
            formMessage.style.marginTop = '15px';
            input.value = '';
        }
    });
}

// Add scroll animation for elements
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.card, .list-group, .feature').forEach(el => {
    el.style.opacity = '0';
    el.style.transition = 'opacity 1s ease-out, transform 1s ease-out';
    el.style.transform = 'translateY(20px)';
    observer.observe(el);
});

// Add the visible class style dynamically or update CSS (Here we inject style logic)
// Updating the elements when they become visible
const addVisibleStyle = () => {
    document.querySelectorAll('.visible').forEach(el => {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
    });
};

// Check for updates periodically or use the mutation observer logic directly in the intersection observer callback above
// The callback above actually does the logic, but we need to ensure the 'visible' class does the style change.
// Since I can't easily edit CSS again without a new tool call, I'll just set styles directly in JS in the observer.

const simpleObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.card, .list-group, .feature').forEach(el => {
    // Reset initial state
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    simpleObserver.observe(el);
});

// Vega-Lite Visualization
const vlSpec = {
    "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
    "data": { "url": "https://raw.githubusercontent.com/Lorand-ubb/BI-Projekt/refs/heads/main/sc.json" },
    "width": "container",
    "height": 400,
    "mark": "bar",
    "encoding": {
      "x": {
        "field": "Department",
        "type": "nominal",
        "title": "Részleg"
      },
      "y": {
        "aggregate": "count",
        "title": "Dolgozók száma"
      },
      "color": {
        "field": "Attrition",
        "type": "nominal",
        "title": "Lemorzsolódás",
        "scale": {"domain": ["Yes", "No"], "range": ["#e74c3c", "#2ecc71"]},
        "legend": {
            "labelExpr": "datum.value == 'Yes' ? 'Igen' : 'Nem'"
        }
      },
      "tooltip": [
        {"field": "Department", "title": "Részleg"},
        {"field": "Attrition", "title": "Lemorzsolódás"},
        {"aggregate": "count", "title": "Létszám"}
      ]
    },
    "title": "Foglalkoztatottak és Lemorzsolódás Részlegek Szerint",
    "config": {
        "background": "#ffffff",
        "view": {"stroke": "transparent"},
        "axis": {
            "labelFont": "Roboto",
            "titleFont": "Roboto"
        },
        "legend": {
            "labelFont": "Roboto",
            "titleFont": "Roboto"
        },
        "title": {
            "font": "Roboto",
            "fontSize": 16
        }
    }
  };
  
  // Embed the visualization
  vegaEmbed('#vis', vlSpec).then(function(result) {
    // Access the Vega view instance (https://vega.github.io/vega/docs/api/view/) as result.view
  }).catch(console.error);
