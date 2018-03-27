import axios from 'axios';

var script = document.createElement('script');
script.src = 'http://code.jquery.com/jquery-1.11.0.min.js';
script.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(script);

export default class Pokemon {
    constructor(name, url, level=null) {
        var readyDeferred = new $.Deferred();
        this.ready = readyDeferred
        this.name = name.charAt(0).toUpperCase() + name.slice(1);
        this.url = url;
        this.level = level != null ? level : 0;
        this.evolution_url = '';
        this.evolves_to_name = '';
        this.evolves_to_url = '';
        this.min_evolution_level = null;
        this.evolution_item = null;

        axios.get(this.url)
            .then(response => {
                this.evolution_url = response.data.evolution_chain.url;
                axios.get(this.evolution_url)
                    .then(response => {
                        var response_string = 'response.data.chain';
                        var name = eval(response_string + '.species.name').charAt(0).toUpperCase() + eval(response_string + '.species.name').slice(1);
                        while(name != this.name){
                            response_string += '.evolves_to[0]'
                            name = eval(response_string + '.species.name').charAt(0).toUpperCase() + eval(response_string + '.species.name').slice(1);
                        }
                        if(eval(response_string + '.evolves_to').length > 0){   
                            response_string += '.evolves_to[0]'
                            if(eval(response_string + '.evolution_details[0].item') != null){
                                this.evolution_item = eval(response_string + '.evolution_details[0].item.name');
                            }
                            if(eval(response_string + '.evolution_details[0].min_level') != null){
                                this.min_evolution_level = eval(response_string + '.evolution_details[0].min_level');
                            }
                            if(this.min_evolution_level != null){
                                this.level = level != null ? level : Math.floor((Math.random() * (this.min_evolution_level-1)) + 1)
                            } else {
                                this.level = level != null ? level : Math.floor((Math.random() * 100) + 1)
                            }
                            this.evolves_to_url = eval(response_string + '.species.url');
                            this.evolves_to_name = eval(response_string + '.species.name')
                            this.evolves_to_name = this.evolves_to_name.charAt(0).toUpperCase() + this.evolves_to_name.slice(1);
                        } else{
                            if(this.min_evolution_level != null){
                                this.level = level != null ? level : Math.floor((Math.random() * (this.min_evolution_level-1)) + 1)
                            } else {
                                this.level = level != null ? level : Math.floor((Math.random() * 100) + 1)
                            }
                            this.evolves_to_name = 'FINAL'
                        }
                        this.ready.resolve()
                    })
                    .catch(function(e) {
                        console.log('There was an ERROR: ', e);
                    });
            })
            .catch(function(e) {
                console.log('There was an ERROR: ', e);
            });
    }

    evolvable(heldItemNames) {
        if(this.min_evolution_level != null){
            if(this.level >= this.min_evolution_level){
                return true
            }
        } else if(this.evolution_item != null){
            if(heldItemNames.indexOf(this.evolution_item) > -1){
                return true
            }
        }
        return false
    }
    evolvable_by_level() {
        if(this.min_evolution_level != null){
            if(this.level >= this.min_evolution_level){
                return true
            }
        }
        return false
    }

    evolve(){
        return (new Pokemon(this.evolves_to_name, this.evolves_to_url, this.level))
    }
}