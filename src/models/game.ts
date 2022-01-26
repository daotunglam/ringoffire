export class Game {
    //everything of this class go to game.component.ts in new Game()
    public players: string[] = [];
    public avatars: string[] = [];
    public stack: string[] = [];
    public dummyStack = [0, 1, 2, 3, 4];
    public playedCards: string[] = [];
    public currentPlayer: number = 0;
    public pickCardAnimation = false;
    public currentCard: any = '';   //  <>currentCard: string = ''<> doesn't work with <>this.game.currentCard = this.game.stack.pop();<>
    //  it has to be <>:any='';<>  not <>:any;<>

    constructor() {
        this.makeStackFull();
        this.shuffle(this.stack);
    }

    /**
     * 
     * @returns JSON of game
     */
    public toJSON() {
        return {
            players: this.players,
            avatars: this.avatars,
            stack: this.stack,
            dummyStack: this.dummyStack,
            playedCards: this.playedCards,
            currentPlayer: this.currentPlayer,
            pickCardAnimation: this.pickCardAnimation,
            currentCard: this.currentCard,
        };
    }

    /**
     * refills the stack with 52 cards
     */
    makeStackFull(){
        this.stack = [];
        for (let i = 1; i < 14; i++) {
            this.stack.push('ace_' + i);
            this.stack.push('clubs_' + i);
            this.stack.push('diamonds_' + i);
            this.stack.push('hearts_' + i);
        }
    }

    public shuffle(array: any) { //ERROR Parameter 'array' implicitly has an 'any' type. // SOLUTION: add :any after array
        let currentIndex = array.length, randomIndex;

        // While there remain elements to shuffle...
        while (currentIndex != 0) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            // And swap it with the current element.
            [array[currentIndex], array[randomIndex]] = [
                array[randomIndex], array[currentIndex]];
        }

        return array;
    }

}