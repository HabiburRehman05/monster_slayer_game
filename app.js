function getRandoValue(max, min){
    return Math.floor(Math.random() * (max - min)) + min;
}

Vue.createApp({
    data() {
        return {
            playerHealth : 100,
            monsterHealth : 100                
        } 
    },
    methods : {
        attackMonster(){
            const attackValue = getRandoValue(12, 5);
            this.monsterHealth -= attackValue;
            this.attackPlayer();
        },
        attackPlayer(){
            const attackValue = getRandoValue(15, 8);
            this.playerHealth -= attackValue;
        }
    }
}).mount("#game")