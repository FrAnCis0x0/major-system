import { v4 as uuidv4 } from 'uuid';
import { listType } from '../types/mnemonicType';

export class Mnemonic {
    private textMap: Map<number, string>;
    constructor(){
        this.textMap = new Map<number, string>();
        this.fillMap();
    }
    private fillMap(): void {
        
        this.textMap.set(100, "Zues");
        this.textMap.set(101, "Seed");
        this.textMap.set(102, "Snow");
        this.textMap.set(103, "Sumo");
        this.textMap.set(104, "Sewer");
        this.textMap.set(105, "Soul");
        this.textMap.set(106, "Sushi");
        this.textMap.set(107, "Sauce");
        this.textMap.set(108, "Sofa");
        this.textMap.set(109, "Soup");

        this.textMap.set(0, "Hose");
        this.textMap.set(1, "Hat");
        this.textMap.set(2, "Honey");
        this.textMap.set(3, "Ammo");
        this.textMap.set(4, "Ray");
        this.textMap.set(5, "Whale");
        this.textMap.set(6, "Shoe");
        this.textMap.set(7, "Cow");
        this.textMap.set(8, "Fox");
        this.textMap.set(9, "Pie");
                
        this.textMap.set(10, "Ads");
        this.textMap.set(11, "Todd");
        this.textMap.set(12, "Tuna");
        this.textMap.set(13, "Tom");
        this.textMap.set(14, "Door");
        this.textMap.set(15, "Tail");
        this.textMap.set(16, "Watch");
        this.textMap.set(17, "Deck");
        this.textMap.set(18, "Dove");
        this.textMap.set(19, "Tape");

        this.textMap.set(20, "Noise");
        this.textMap.set(21, "Ant");
        this.textMap.set(22, "Onion");
        this.textMap.set(23, "Name");
        this.textMap.set(24, "Narrow");
        this.textMap.set(25, "Nail");
        this.textMap.set(26, "Nacho");
        this.textMap.set(27, "Neck");
        this.textMap.set(28, "Knife");
        this.textMap.set(29, "Honey-Bee");

        this.textMap.set(30, "Mouse");
        this.textMap.set(31, "Mat");
        this.textMap.set(32, "Money");
        this.textMap.set(33, "Mime");
        this.textMap.set(34, "Hammer");
        this.textMap.set(35, "Mole");
        this.textMap.set(36, "Mocha");
        this.textMap.set(37, "Mug");
        this.textMap.set(38, "Mafia");
        this.textMap.set(39, "Map");

        this.textMap.set(40, "Rose");
        this.textMap.set(41, "Rat");
        this.textMap.set(42, "Rune");
        this.textMap.set(43, "Romeo");
        this.textMap.set(44, "Warrior");
        this.textMap.set(45, "Roll");
        this.textMap.set(46, "Rash");
        this.textMap.set(47, "Rick");
        this.textMap.set(48, "Ref");
        this.textMap.set(49, "Rope");

        this.textMap.set(50, "Loise");
        this.textMap.set(51, "Lady");
        this.textMap.set(52, "Lion");
        this.textMap.set(53, "Lime");
        this.textMap.set(54, "Lawyer");
        this.textMap.set(55, "Oil-Well");
        this.textMap.set(56, "Leech");
        this.textMap.set(57, "Hulk");
        this.textMap.set(58, "Wolf");
        this.textMap.set(59, "Lip");
        

        this.textMap.set(60, "Chess");
        this.textMap.set(61, "cheetah");
        this.textMap.set(62, "Chain");
        this.textMap.set(63, "Jam");
        this.textMap.set(64, "Jerry");
        this.textMap.set(65, "Shell");
        this.textMap.set(66, "Cho-Cho");
        this.textMap.set(67, "Jug");
        this.textMap.set(68, "Chief");
        this.textMap.set(69, "Sheep");

        this.textMap.set(70, "Goose");
        this.textMap.set(71, "Cat");
        this.textMap.set(72, "Gun");
        this.textMap.set(73, "Gum");
        this.textMap.set(74, "Hacker");
        this.textMap.set(75, "Koala");
        this.textMap.set(76, "Cash");
        this.textMap.set(77, "Cake");
        this.textMap.set(78, "Cave");
        this.textMap.set(79, "Cop");

        this.textMap.set(80, "Vase");
        this.textMap.set(81, "Void");
        this.textMap.set(82, "Phone");
        this.textMap.set(83, "Fume");
        this.textMap.set(84, "Fire");
        this.textMap.set(85, "Fuel");
        this.textMap.set(86, "Fish");
        this.textMap.set(87, "Fuck");
        this.textMap.set(88, "FIFA");
        this.textMap.set(89, "FBI");

        this.textMap.set(90, "Pizza");
        this.textMap.set(91, "Bed");
        this.textMap.set(92, "Bunny");
        this.textMap.set(93, "Puma");
        this.textMap.set(94, "Bear");
        this.textMap.set(95, "Bell");
        this.textMap.set(96, "Bush");
        this.textMap.set(97, "Book");
        this.textMap.set(98, "Bee-Hive");
        this.textMap.set(99, "Bob");
    }

    public getNumberList(): string[] {
        //array to store list
        const tempList:string[] = [];

        //generate random numbers
        while(tempList.length < 110){
            let randNumber = Math.floor(Math.random() * 110);
            if(!tempList.includes(randNumber.toString()) || tempList.length < 50){
                tempList.push(this.getDoubleDigit(randNumber));
                // console.log(`Adding : ${this.getDoubleDigit(randNumber)}`)
            }
        }

        return tempList;

    }

    public getWordList(): listType[] {
        let myNumberList = this.getNumberList();
        let tempwordList: listType[] = [];

        //convert numbers to words
        myNumberList.forEach((element) => {
            let word = this.getWord(this.getProperNumber(element));
            if(word != undefined){
                //generate unique id
                let id = uuidv4();
                //add word to list
                tempwordList.push({id, answer: element, word, index: myNumberList.indexOf(element)});
            }
        });
        return tempwordList;
    }

    private getWord(number: number): string | undefined {
        return this.textMap.get(number);
    }

    private getDoubleDigit(n : number): string{
        if(n > 99){
            //remove first digit 100 == 00
            n = n % 100;
            return "0"+n.toString();
        }
        return n.toString();
    }

    private getProperNumber(n : string): number{
        //if 00-09 return 100-109
        if(n[0] == "0" && n.length == 2){
            return parseInt(n) + 100;
        }
        return parseInt(n);
    }

    //validate the number or word
    public validateNumber(wordNumber : string, word: string): boolean{
        let currentNumber = this.getProperNumber(wordNumber);
        let currentWord = this.getWord(currentNumber);
        if(currentWord?.toLowerCase() === word.toLowerCase()){
            return true;
        }else{
            return false;
        }
    }
}