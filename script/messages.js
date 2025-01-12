const Titles = Object.freeze({
    LOGIN: 0
});

class Message{
    constructor(title, content){
        if(Titles[title]){
            this.title = Titles[title]; 
        }else{
            throw new Error("this title is unsupported, please enter a supported title or this message wont be sent to the server")
        }
        this.content = content;
    }
}