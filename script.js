// Pole s projekty
const projects = [
    {
        title: "Webová stránka pro portfolio",
        description: "Jednoduchá statická stránka na GitHub Pages pro prezentaci projektů.",
        url: "https://github.com/tvujgithub/portfolio",
        type: "web"
    },
    {
        title: "Netradiční data, tradiční modely",
        description: "Projekt zaměřený na analýzu netradičních dat pomocí tradičních statistických modelů časových řad.",
        url: "https://github.com/tvujgithub/tsla_pred",
        type: "analysis"
    },
    {
        title: "Netradiční data, netradiční modely",
        description: "Projekt zaměřený na analýzu netradičních dat pomocí netradičních modelů, jako jsou neuronové sítě.",
        url: "https://github.com/tvujgithub/tsla_pred",
        type: "analysis"
    },
    {
        title: "Predikce cen akcií podniků v simulované kolektivní VŠ hře",
        description: "Projekt zaměřený na predikci cen akcií v simulované kolektivní hře mezi studenty VŠ.",
        url: "https://github.com/tvujgithub/manahra_scraping_prediction",
        type: "analysis"
    },
    {
        title: "Webová aplikace pro správu kalorií a cvičení",
        description: "Aplikace umožňující uživatelům sledovat příjem kalorií a cvičební aktivity. Web je dostupný zde: https://fitapp-mo2k.onrender.com/",
        url: "https://github.com/tvujgithub/fitapp",
        type: "web"
    },
    {
        title: "Bakalářská práce: Analýza vlivu nekonvenčních nástrojů centrálních bank na inflační očekávání",
        description: "Studie zkoumající dopady nekonvenčních měnových politik na inflační očekávání pomocí ekonometrických modelů časových řad.",
        // TODO: pridat odkaz na Bakal v isu
        url: "https://github.com/tvujgithub/bakalarka",
        type: "analysis"
    },
    {
        title: "Analýza dat o cenách akcií TSLA",
        description: "Projekt využívající ARIMA a VAR modely pro predikci vývoje ceny akcií Tesla s využitím sentimentu z Twitteru.",
        url: "https://github.com/tvujgithub/tsla-analysis",
        type: "analysis"
    },
    {
        title: "Machine Learning model pro klasifikaci obrázků",
        description: "Model založený na TensorFlow pro rozpoznání objektů ve fotografiích.",
        url: "https://github.com/tvujgithub/image-classifier",
        type: "ml"
    }
]


const filterOptions = [
    "Vše",
    "Web",
    "Data",
    "Machine Learning"
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
}


function renderProjects(filter = "Vše") {
    // Odstranit staré projekty
    projectsSection.querySelectorAll('.project').forEach(e => e.remove())
    projects.forEach((proj, idx) => {
        // Filtrování podle typu
        if (
            filter === "Vše" ||
            (filter === "Web" && proj.type == "web") ||
            (filter === "Data" && proj.type == "analysis") ||
            (filter === "Machine Learning" && proj.type == "ml")
        ) {
            const div = document.createElement('div')
            div.className = 'project'
            div.style.animationDelay = `${0.25 + idx * 0.1}s`

            const h3 = document.createElement('h3')
            h3.textContent = proj.title

            const p = document.createElement('p')
            p.textContent = proj.description

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
