// Pole s projekty - uprav si podle sebe
const projects = [
  {
    title: "Webová stránka pro portfolio",
    description: "Jednoduchá statická stránka na GitHub Pages pro prezentaci projektů.",
    url: "https://github.com/tvujgithub/portfolio"
  },
  {
    title: "Analýza dat o cenách akcií TSLA",
    description: "Projekt využívající ARIMA a VAR modely pro predikci vývoje ceny akcií Tesla s využitím sentimentu z Twitteru.",
    url: "https://github.com/tvujgithub/tsla-analysis"
  },
  {
    title: "Machine Learning model pro klasifikaci obrázků",
    description: "Model založený na TensorFlow pro rozpoznání objektů ve fotografiích.",
    url: "https://github.com/tvujgithub/image-classifier"
  }
];

const projectsSection = document.getElementById('projects');

projects.forEach(proj => {
  const div = document.createElement('div');
  div.className = 'project';

  const h3 = document.createElement('h3');
  h3.textContent = proj.title;

  const p = document.createElement('p');
  p.textContent = proj.description;

  const a = document.createElement('a');
  a.href = proj.url;
  a.textContent = 'GitHub Repo';
  a.target = '_blank';
  a.rel = 'noopener noreferrer';

  div.appendChild(h3);
  div.appendChild(p);
  div.appendChild(a);

  projectsSection.appendChild(div);
});
