let request = new XMLHttpRequest();
let url = "https://pokeapi.co/api/v2/pokemon?limit=100";

request.open("GET", url, true);
request.onload = function(){
    let data = JSON.parse(this.response);
    
    let pokeList = document.getElementById('pokeList');
    
    let pokemonCounter = 0;
    if (request.status >= 200 && request.status < 400){
        data.results.forEach(pokemon => {
            
            if(pokemonCounter % 4 == 0){
                row = document.createElement('div');
                row.className = 'row';
                pokeList.appendChild(row);
            }
            
            let card = document.createElement('div');
            card.className = 'col-3 pokemon';
            
            let pokemonRequest = new XMLHttpRequest();
            let pokemonUrl = pokemon.url;
            
            pokemonRequest.open('GET', pokemonUrl, true);
            
            pokemonRequest.onload = function(){
                let pokemonData = JSON.parse(this.response);
                console.log(pokemonData);
            
                let p = document.createElement('p')
                p.textContent = pokemon.name;
            
                let pokemonImage = document.createElement('img');
                pokemonImage.src = pokemonData.sprites.front_default;
                
                card.onclick = function(){
                    pokemonImage.src = pokemonData.sprites.front_shiny;
                }
                
                //card.onclick = function(){
                   // pokemonImage.src = pokemonData.sprites.back_shiny;
                //}
                
                card.appendChild(p);
                card.appendChild(pokemonImage);
                row.appendChild(card);
            };
            
            pokemonRequest.send();
            
            pokemonCounter++;
        })
    }
};

request.send();