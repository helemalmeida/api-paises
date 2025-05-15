const countriesList = document.getElementById('countries-list');
const countryDetails = document.getElementById('country-details');
const searchInput = document.getElementById('search');
let countriesData = [];

fetch('https://restcountries.com/v3.1/all')
  .then(res => res.json())
  .then(data => {
    countriesData = data;
    showCountries(data);
  })
  .catch(err => {
    console.error("Erro ao carregar países:", err);
    countriesList.innerHTML = "<p>Erro ao carregar os países.</p>";
  });

function showCountries(countries) {
  countriesList.innerHTML = '';

  countries.forEach(country => {
    const div = document.createElement('div');
    div.className = 'country-item';
    div.textContent = country.name?.common || 'Sem nome';
    div.addEventListener('click', () => showDetails(country));
    countriesList.appendChild(div);
  });
}

function showDetails(country) {
  const flag = country.flags?.svg || '';
  const name = country.name?.common || 'Desconhecido';
  const capital = country.capital?.[0] || 'N/A';
  const region = country.region || 'N/A';
  const population = country.population?.toLocaleString() || 'N/A';
  const languages = country.languages ? Object.values(country.languages).join(', ') : 'N/A';

  countryDetails.innerHTML = `
    <h2>${name}</h2>
    <img src="${flag}" alt="Bandeira de ${name}" width="200">
    <p><strong>Capital:</strong> ${capital}</p>
    <p><strong>Região:</strong> ${region}</p>
    <p><strong>População:</strong> ${population}</p>
    <p><strong>Idiomas:</strong> ${languages}</p>
  `;
}

searchInput.addEventListener('input', () => {
  const value = searchInput.value.toLowerCase();

  if (value === '') {
    showCountries(countriesData);
    countryDetails.innerHTML = '';
    return;
  }

  const filtered = countriesData.filter(c =>
    c.name?.common?.toLowerCase().includes(value)
  );

  showCountries(filtered);

  if (filtered.length === 1) {
    showDetails(filtered[0]);
  } else {
    countryDetails.innerHTML = '';
  }
}
);
