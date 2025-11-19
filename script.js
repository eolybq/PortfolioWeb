import { translations } from "./translation.js"

// history.pushState("", document.title, window.location.pathname + window.location.search)

if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual'
}

window.addEventListener('DOMContentLoaded', () => {
    window.scrollTo(0, 0) // drží stránku nahoře
    // odstranění hash
    if (window.location.hash) {
        history.replaceState(null, '', window.location.pathname + window.location.search)
    }
})



// Dark Mode
const toggleBtn = document.getElementById("theme-toggle")
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches

if (prefersDark) {
    document.body.classList.add("dark-mode")
    toggleBtn.textContent = "☀️"
}

toggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode")
    const dark = document.body.classList.contains("dark-mode")
    toggleBtn.textContent = dark ? "☀️" : "🌙"
    localStorage.setItem("theme", dark ? "dark" : "light")
})

const savedTheme = localStorage.getItem("theme")
if (savedTheme) {
    document.body.classList.toggle("dark-mode", savedTheme === "dark")
    toggleBtn.textContent = savedTheme === "dark" ? "☀️" : "🌙"
}









// Pole s projekty
const projects = [
    {
        // project_title_0: "Netradiční data, tradiční modely",
        url: "https://github.com/eolybq/tsla_sentiment_prediction",
        type: "analysis"
    },
    {
        // project_title_1: "Netradiční data, netradiční modely",
        url: "https://github.com/eolybq/tsla_sentiment_prediction",
        type: ["analysis", "ml"]
    },
    {
        // project_title_2: "Bakalářská práce: Analýza vlivu nekonvenčních nástrojů centrálních bank na inflační očekávání",
        url: "https://github.com/eolybq/bachelors_thesis",
        type: "analysis"
    },
    {
        // project_title_3: "Predikce cen akcií podniků v simulované kolektivní VŠ hře",
        url: "https://github.com/eolybq/market_sim_prediction",
        type: "analysis"
    },
    {
        // project_title_4: "RAG LLM ChatBOT pro dokumentaci python knihoven",
        url: "https://github.com/eolybq/docs_rag_chat_bot",
        type: ["ml"]
    },
    {
        // project_title_5: "Webová aplikace pro testování různých modelů s různými hyperparametry",
        url: "https://github.com/eolybq/ModelApp",
        type: ["web", "analysis", "ml"]
    },
    {
        // project_title_6: "Webová aplikace pro správu kalorií a aktivit",
        url: "https://github.com/eolybq/FitApp",
        type: "web"
    },
    {
        // project_title_7: "Webová stránka pro živý chat s využitím WebSocketů",
        url: "https://github.com/eolybq/ChatApp",
        type: "web"
    },
    {
        // project_title_8: "Webová stránka pro portfolio",
        url: "https://github.com/eolybq/PortfolioWeb",
        type: "web"
    },
]


const projectsSection = document.getElementById('projects')
// Filter div
const filterDiv = document.createElement('div')
filterDiv.className = 'project-filter'
projectsSection.appendChild(filterDiv)

function renderFilterButtons() {
    const filterOptions = translations[currentLang].filters
    filterDiv.innerHTML = ''
    filterOptions.forEach(opt => {
        const btn = document.createElement('button')
        btn.textContent = opt
        btn.onclick = () => renderProjects(opt)
        filterDiv.appendChild(btn)
    })
}



function handleEsc(event) {
    if (event.key === "Escape") {
        modal.style.display = 'none'
        document.removeEventListener("keydown", handleEsc)
    }
}

// Modal pro detail projektu
const modal = document.createElement('div')
modal.className = 'modal'
modal.innerHTML = `<div class="modal-content"><span class="close">&times</span><div class="modal-body"></div></div>`
document.body.appendChild(modal)
modal.querySelector('.close').onclick = () => modal.style.display = 'none'


function showModal(project, idx) {
    const modalBody = modal.querySelector('.modal-body')
    const keyTitle = `project_title_${idx}`
    const keyDesc = `project_desc_${idx}`
    modalBody.innerHTML = `
        <h3>${translations[currentLang][keyTitle] || project.title}</h3>
        <p>${translations[currentLang][keyDesc] || project.description}</p>
        <a href="${project.url}" target="_blank" rel="noopener noreferrer">GitHub Repo</a>
    `
    modal.style.display = 'block'
    document.addEventListener("keydown", handleEsc)
}



function renderProjects(filter = translations[currentLang].filters[0]) {
    projectsSection.querySelectorAll('.project').forEach(e => e.remove())

    projects.forEach((proj, idx) => {
        const types = Array.isArray(proj.type) ? proj.type : [proj.type]

        // map filter labels na typy
        const filterMap = {
            CS: { "Vše": null, "Webový vývoj": "web", "Datová analýza": "analysis", "Strojové učení": "ml" },
            EN: { "All": null, "Web Development": "web", "Data Analysis": "analysis", "Machine Learning": "ml" }
        }
        const selectedType = filterMap[currentLang][filter]

        if (!selectedType || types.includes(selectedType)) {
            const div = document.createElement('div')
            div.className = 'project'
            div.style.animationDelay = `${0.25 + idx * 0.1}s`

            const h3 = document.createElement('h3')
            const titleKey = `project_title_${idx}`
            h3.textContent = translations[currentLang][titleKey] || proj.title
            h3.setAttribute("data-i18n", titleKey)

            const p = document.createElement('p')
            const descKey = `project_desc_${idx}`
            p.textContent = (translations[currentLang][descKey] || proj.description).substring(0, 100) + '...'
            p.setAttribute("data-i18n", descKey)

            const a = document.createElement('a')
            a.href = proj.url
            a.textContent = 'GitHub Repo'
            a.target = '_blank'
            a.rel = 'noopener noreferrer'

            div.appendChild(h3)
            div.appendChild(p)
            div.appendChild(a)

            div.onclick = () => showModal(proj, idx)

            projectsSection.appendChild(div)
        }
    })
}







// EN verze
function applyTranslations(lang) {
    document.querySelectorAll("[data-i18n]").forEach(el => {
        const key = el.getAttribute("data-i18n")
        el.textContent = translations[lang][key] || el.textContent
    })
    renderFilterButtons()
    renderProjects()
}
const langBtn = document.getElementById("lang-toggle")
let currentLang = localStorage.getItem("lang") || "CS"
applyTranslations(currentLang)

langBtn.textContent = currentLang === "CS" ? "EN" : "CS"

langBtn.addEventListener("click", () => {
    currentLang = currentLang === "CS" ? "EN" : "CS"
    localStorage.setItem("lang", currentLang)
    langBtn.textContent = currentLang === "CS" ? "EN" : "CS"
    applyTranslations(currentLang)
})