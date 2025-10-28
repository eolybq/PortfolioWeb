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

// Pole s projekty
const projects = [
    {
        title: "Netradiční data, tradiční modely",
        description: "Projekt v R, zaměřený na analýzu netradičních finančních dat (získaných z NLP sentiment analýzy) pomocí tradičních statistických modelů časových řad. Projekt využívá zahrnutí exogenních proměnných pro získání přehledu výkonnosti predikcí při různém nastavení modelů. V projektu je také provedena PCA analýza pro snížení dimenzionality dat. Projekt nachází nejjednodušší ARIMA model jako nejlepší volbu pro predikci ceny akcie TSLA.",
        url: "https://github.com/eolybq/tsla_sentiment_prediction",
        type: "analysis"
    },
    {
        title: "Netradiční data, netradiční modely",
        description: "Projekt rozšiřující předchozí analýzu (Netradiční data, tradiční modely) o využití pythonu a modelů strojového učení (Gradient Descent Linear Regression, Gradient Descent Logistic Regression) pro predikci ceny TSLA s využitím netradičních dat získaných z NLP sentiment analýzy. Projekt je zatím in-progress, prozatím jsou sestrojeny regresní modely s využitím gradient descent metody a v plánu je zahrnutí LSTM sítí a vyhodnocení analýzy.",
        url: "https://github.com/eolybq/tsla_sentiment_prediction",
        type: ["analysis", "ml"]
    },
    {
        title: "Bakalářská práce: Analýza vlivu nekonvenčních nástrojů centrálních bank na inflační očekávání",
        description: "Analýza v R, pokládající si za cíl prozkoumat, jak nekonvenční monetární politika ovlivnila inflační očekávání v České republice, eurozóně a Švédsku. K naplnění tohoto cíle je využit VAR model, případně rozšířený o exogenní proměnné. Práce zahrnuje také manuální sestrojení unikátních dat z veřejných prohlášení centrálních bank a manuelní sestrojení funkcí impulsních odezev pro exogenní proměnné. Výsledky ukazují, že kvantitativní uvolňování nemá žádný statisticky významný dopad na inflační očekávání jednotlivých agentů. Oproti tomu forward guidance směřující k uvolnění politiky vykazuje většinově významný vliv, a to jak pozitivní, tak negativní. Forward guidance signalizující zpřísnění měnové politiky pak ukazuje významný vliv negativní. Práce je také veřejně dostupná na: <a href = 'https://is.muni.cz/th/dzkyy/?fakulta=1421;obdobi=181;lang=cs;id=300358' target='_blank'>is.muni.cz</a>.",
        url: "https://github.com/eolybq/bachelors_thesis",
        type: "analysis"
    },
    {
        title: "Predikce cen akcií podniků v simulované kolektivní VŠ hře",
        description: "Projekt v R zaměřený na predikci cen akcií v simulované kolektivní hře mezi studenty Masarykovy univerzity (Manahra). Tato hra simuluje trh se společnostmi vyrábějícími auta a v rámci hry byl dostupný i trh s akciemi těchto společností. Cílem projektu bylo pomocí web scrapingu získat data z této hry a následně sestrojit Lineárně regresní model pro testování predikcí ceny akcie podniku v tomto simulovaném prostředí.",
        url: "https://github.com/eolybq/market_sim_prediction",
        type: "analysis"
    },
    {
        title: "Webová aplikace pro testování různých modelů s různými hyperparametry",
        description: "Aplikace umožňující uživatelům testovat různé modely (zatím ARIMA, Gradient Descent Linear Regression, Gradient Descent Logistic Regression, LSTM) s různě zadanými hyperparametry. Uživatelé si zvolí jakoukoliv akcii, server stáhne historická data a provede trénink a testování modelů. Výsledky trénování a testování jsou následně zobrazeny uživateli v přehledných grafech. Tento projekt je in-progress a plánuje se přidání dalších modelů a funkcí a designu. A nejspíš i jeho nasazení na veřejný server.",
        url: "https://github.com/eolybq/ModelApp",
        type: ["web", "analysis"]
    },
    {
        title: "Webová aplikace pro správu kalorií a aktivit",
        description: "Aplikace umožňující uživatelům sledovat příjem kalorií, makroživin a různé sportovní aktivity. Aplikace získává tato data z API a následně je ukládá do SQL databáze tak, aby uživatelé mohli přistupovat i ke starším datům. Stránka má je dostupná skrz Render hosting zde: <a href = 'https://fitapp-mo2k.onrender.com/' target='_blank'>fitapp-mo2k.onrender.com</a>.",
        url: "https://github.com/eolybq/FitApp",
        type: "web"
    },
    {
        title: "Webová stránka pro živý chat s využitím WebSocketů",
        description: "Webová aplikace umožňující uživatelům komunikovat v reálném čase pomocí WebSocketů. Uživatelé mohou zakládat, mazat a připojit se do různých chatovacích místností a posílat si zprávy, emoji a GIFy. Bohužel, free tier hosting podporující Socket.io v době vytváření nebyl k nalezení, a tak je tento projekt nedokončen (prozatím). Po funkční stránce má aplikace vše potřebné hotové, avšak deployment je funkční jen napůl. Stránce také chybí dodělat design. Stránka je ve své polo-funkční verzi dostupná zde (neukazují se nové zprávy, nelze mazat místnosti): <a href = 'https://chatapp-three-orpin.vercel.app/login' target='_blank'>chatapp-three-orpin.vercel.app/login</a>.",
        url: "https://github.com/eolybq/ChatApp",
        type: "web"
    },
    {
        title: "Webová stránka pro portfolio",
        description: "Stránka na které se právě nacházíte! :). Jednoduchá statická stránka s deployment na GitHub Pages pro prezentaci mých projektů.",
        url: "https://github.com/eolybq/PortfolioWeb",
        type: "web"
    },
]


const filterOptions = [
    "Vše",
    "Webový vývoj",
    "Datová analýza",
    "Strojové učení"
]

const projectsSection = document.getElementById('projects')

// Vytvoření filtru
const filterDiv = document.createElement('div')
filterDiv.className = 'project-filter'
filterOptions.forEach(opt => {
    const btn = document.createElement('button')
    btn.textContent = opt
    btn.onclick = () => renderProjects(opt)
    filterDiv.appendChild(btn)
})
projectsSection.appendChild(filterDiv)


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

function showModal(project) {
    modal.querySelector('.modal-body').innerHTML = `
    <h3>${project.title}</h3>
    <p>${project.description}</p>
    <a href="${project.url}" target="_blank" rel="noopener noreferrer">GitHub Repo</a>
  `
    modal.style.display = 'block'

    document.addEventListener("keydown", handleEsc)
}


function renderProjects(filter = "Vše") {
    // Odstranit staré projekty
    projectsSection.querySelectorAll('.project').forEach(e => e.remove())
    projects.forEach((proj, idx) => {
        const types = Array.isArray(proj.type) ? proj.type : [proj.type]
        // Filtrování podle typu
        if (
            filter === "Vše" ||
            (filter === "Webový vývoj" && types.includes("web")) ||
            (filter === "Datová analýza" && types.includes("analysis")) ||
            (filter === "Strojové učení" && types.includes("ml"))
        ) {
            const div = document.createElement('div')
            div.className = 'project'
            div.style.animationDelay = `${0.25 + idx * 0.1}s`

            const h3 = document.createElement('h3')
            h3.textContent = proj.title

            const p = document.createElement('p')
            p.textContent = proj.description.substring(0, 100) + '...'

            const a = document.createElement('a')
            a.href = proj.url
            a.textContent = 'GitHub Repo'
            a.target = '_blank'
            a.rel = 'noopener noreferrer'

            div.appendChild(h3)
            div.appendChild(p)
            div.appendChild(a)

            div.onclick = () => showModal(proj)

            projectsSection.appendChild(div)
        }
    })
}

renderProjects()
