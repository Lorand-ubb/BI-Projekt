// Dark Mode Toggle
const darkModeToggle = document.getElementById('darkModeToggle');
const body = document.body;

// Check for saved dark mode preference
const isDarkMode = localStorage.getItem('darkMode') === 'enabled';

if (isDarkMode) {
    body.classList.add('dark-mode');
}

// Toggle dark mode
darkModeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    
    // Save preference to localStorage
    if (body.classList.contains('dark-mode')) {
        localStorage.setItem('darkMode', 'enabled');
    } else {
        localStorage.setItem('darkMode', 'disabled');
    }
});

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

// Vega-Lite Visualizations

// Visualization 1: Department Attrition
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
  
vegaEmbed('#vis', vlSpec).then(function(result) {
}).catch(console.error);

// Visualization 2: Age Group Attrition (Stacked Bar)
const vlSpecAge = {
    "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
    "data": { "url": "HR_Analytics.csv" },
    "width": "container",
    "height": 400,
    "mark": "bar",
    "encoding": {
      "x": {
        "field": "AgeGroup",
        "type": "ordinal",
        "title": "Korcsoport",
        "sort": ["18-25", "26-35", "36-45", "46-55", "55+"]
      },
      "y": {
        "aggregate": "count",
        "title": "Dolgozók száma",
        "stack": "normalize"
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
        {"field": "AgeGroup", "title": "Korcsoport"},
        {"field": "Attrition", "title": "Lemorzsolódás"},
        {"aggregate": "count", "title": "Létszám"}
      ]
    },
    "title": "Lemorzsolódás Korcsoportok Szerint (Százalékos)",
    "config": {
        "background": "#ffffff",
        "view": {"stroke": "transparent"},
        "axis": {
            "labelFont": "Roboto",
            "titleFont": "Roboto",
            "format": "%"
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

vegaEmbed('#vis-age', vlSpecAge).then(function(result) {
}).catch(console.error);

// Visualization 3: Job Satisfaction (Donut Chart)
const vlSpecSatisfaction = {
    "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
    "data": { "url": "HR_Analytics.csv" },
    "width": "container",
    "height": 400,
    "mark": {"type": "arc", "innerRadius": 80},
    "encoding": {
      "theta": {
        "aggregate": "count",
        "type": "quantitative"
      },
      "color": {
        "field": "JobSatisfaction",
        "type": "ordinal",
        "title": "Elégedettségi szint",
        "scale": {"scheme": "redyellowgreen"},
        "legend": {
            "labelExpr": "datum.value + ' (1=Alacsony, 4=Magas)'"
        }
      },
      "tooltip": [
        {"field": "JobSatisfaction", "title": "Elégedettség"},
        {"aggregate": "count", "title": "Létszám"}
      ]
    },
    "title": "Munkahelyi Elégedettség Megoszlása",
    "config": {
        "background": "#ffffff",
        "view": {"stroke": "transparent"},
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

vegaEmbed('#vis-satisfaction', vlSpecSatisfaction).then(function(result) {
}).catch(console.error);

// Visualization 4: Work-Life Balance (Area Chart)
const vlSpecWorkLife = {
    "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
    "data": { "url": "HR_Analytics.csv" },
    "width": "container",
    "height": 400,
    "mark": "area",
    "encoding": {
      "x": {
        "field": "WorkLifeBalance",
        "type": "ordinal",
        "title": "Munka-magánélet egyensúly (1=Rossz, 4=Kiváló)"
      },
      "y": {
        "aggregate": "count",
        "title": "Dolgozók száma",
        "stack": "center"
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
      "opacity": {"value": 0.7},
      "tooltip": [
        {"field": "WorkLifeBalance", "title": "Egyensúly"},
        {"field": "Attrition", "title": "Lemorzsolódás"},
        {"aggregate": "count", "title": "Létszám"}
      ]
    },
    "title": "Munka-Magánélet Egyensúly Hatása",
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

vegaEmbed('#vis-worklife', vlSpecWorkLife).then(function(result) {
}).catch(console.error);

// Visualization 5: Overtime Impact (Pie Chart)
const vlSpecOvertime = {
    "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
    "data": { "url": "HR_Analytics.csv" },
    "width": "container",
    "height": 400,
    "transform": [
        {"filter": "datum.Attrition == 'Yes'"}
    ],
    "mark": {"type": "arc", "outerRadius": 150},
    "encoding": {
      "theta": {
        "aggregate": "count",
        "type": "quantitative"
      },
      "color": {
        "field": "OverTime",
        "type": "nominal",
        "title": "Túlóra",
        "scale": {"domain": ["Yes", "No"], "range": ["#e74c3c", "#3498db"]},
        "legend": {
            "labelExpr": "datum.value == 'Yes' ? 'Túlórával' : 'Túlóra nélkül'"
        }
      },
      "tooltip": [
        {"field": "OverTime", "title": "Túlóra"},
        {"aggregate": "count", "title": "Távozók száma"}
      ]
    },
    "title": "Túlóra Hatása a Lemorzsolódásra (Távozók Megoszlása)",
    "config": {
        "background": "#ffffff",
        "view": {"stroke": "transparent"},
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

vegaEmbed('#vis-overtime', vlSpecOvertime).then(function(result) {
}).catch(console.error);

// Visualization 6: Monthly Income by Department (Horizontal Bar)
const vlSpecIncome = {
    "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
    "data": { "url": "HR_Analytics.csv" },
    "width": "container",
    "height": 300,
    "mark": "bar",
    "encoding": {
      "y": {
        "field": "Department",
        "type": "nominal",
        "title": "Részleg",
        "sort": "-x"
      },
      "x": {
        "field": "MonthlyIncome",
        "aggregate": "mean",
        "title": "Átlagos havi jövedelem ($)"
      },
      "color": {
        "field": "MonthlyIncome",
        "aggregate": "mean",
        "type": "quantitative",
        "title": "Jövedelem",
        "scale": {"scheme": "blues"}
      },
      "tooltip": [
        {"field": "Department", "title": "Részleg"},
        {"field": "MonthlyIncome", "aggregate": "mean", "title": "Átlagos jövedelem", "format": ".2f"}
      ]
    },
    "title": "Átlagos Havi Jövedelem Részlegek Szerint",
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

vegaEmbed('#vis-income', vlSpecIncome).then(function(result) {
}).catch(console.error);
