function getRandomValue(max, min){
    return Math.floor(Math.random() * (max - min)) + min;
}

Vue.createApp({
    data() {
        return {
            playerHealth : 100,
            monsterHealth : 100,
            currentRound : 0, 
            winner : null,   
            logs : [],          
        } 
    },
    computed : {
        monsterBarStyles() {
            if(this.monsterHealth < 0 ) return {width : '0%'}
            return {width : this.monsterHealth + '%'};
        },
        playerBarStyles() { 
            if(this.playerHealth < 0 ) return {width : '0%'}
            return {width : this.playerHealth + '%'};
        },
        checkCurrentRound() {
            return this.currentRound % 3 !== 0;
        }
    },
    watch : {
        playerHealth(value) {
            if(value <= 0 && this.monsterHealth <=0){
                // draw
                this.winner = "Draw";
            } else if (value <= 0) {
                // player lost
                this.winner = "Monster";
            }
        },
        monsterHealth(value) {
            if(value <= 0 && this.playerHealth <=0){
                // draw
                this.winner = "Draw";
            } else if (value <= 0) {
                // monster lost
                this.winner = "Player";
            }
        }
    },
    methods : {
        attackMonster(){
            this.currentRound++;
            const attackValue = getRandomValue(12, 5);
            this.monsterHealth -= attackValue;
            this.attackPlayer();
            this.addLogMessage('Player', 'Attack', attackValue);
        },
        attackPlayer(){
            const attackValue = getRandomValue(15, 8);
            this.playerHealth -= attackValue;
            this.addLogMessage('Monster', 'Attack', attackValue);
        },
        specialAttackMonster(){
            this.currentRound++;
            const attackValue = getRandomValue(25, 10);
            this.monsterHealth -= attackValue;
            this.attackPlayer();
            this.addLogMessage('Player', 'SpecialAttack', attackValue);
        },
        healPlayer() {
            this.currentRound++;
            const healValue = getRandomValue(20, 8);
            if(this.playerHealth + healValue > 100){
                this.playerHealth = 100;
            }else {
                this.playerHealth += healValue;
            }
            this.attackPlayer();
            
            this.addLogMessage('Player', 'Heal', healValue);
        },
        restartGame(){
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.currentRound = 0;
            this.winner = null;
            this.logs = [];
        },
        surrender() { 
            this.winner = 'Monster';
        },
        addLogMessage(who, what , value){
            this.logs.unshift({
                actionBy : who,
                actionType : what,
                actionValue : value,
            })
        }
    }
}).mount("#game")