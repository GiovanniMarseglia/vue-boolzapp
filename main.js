
const { createApp } = Vue

  createApp({

    data() {
      return {
        stato:null,
        word:null,
        presente:[],
        ricerca:null,
        posizione: 0,
        newmessage: null,
        visible:false,
        contacts: [
          {
          name: 'Michele',
          avatar: './img/avatar_1.jpg',
          visible: true,
          messages: [
            {
            date: '10/01/2020 15:30:55',
            message: 'Hai portato a spasso il cane?',
            status: 'sent'
            },
            {
            date: '10/01/2020 15:50:00',
            message: 'Ricordati di stendere i panni',
            status: 'sent'
            },
            {
            date: '10/01/2020 16:15:22',
            message: 'Tutto fatto!',
            status: 'received'
            }
            ],
          },
          {
          name: 'Fabio',
          avatar: './img/avatar_2.jpg',
          visible: true,
          messages: [
            {
            date: '20/03/2020 16:30:00',
            message: 'Ciao come stai?',
            status: 'sent'
            },
            {
            date: '20/03/2020 16:30:55',
            message: 'Bene grazie! Stasera ci vediamo?',
            status: 'received'
            },
            {
            date: '20/03/2020 16:35:00',
            message: 'Mi piacerebbe ma devo andare a fare la spesa.',
            status: 'sent'
            }
            ],
          },
          {
          name: 'Samuele',
          avatar: './img/avatar_3.jpg',
          visible: true,
          messages: [
            {
            date: '28/03/2020 10:10:40',
            message: 'La Marianna va in campagna',
            status: 'received'
            },
            {
            date: '28/03/2020 10:20:10',
            message: 'Sicuro di non aver sbagliato chat?',
            status: 'sent'
            },
            {
            date: '28/03/2020 16:15:22',
            message: 'Ah scusa!',
            status: 'received'
            }
            ],
          },
          {
          name: 'Alessandro B.',
          avatar: './img/avatar_4.jpg',
          visible: true,
          messages: [
            {
            date: '10/01/2020 15:30:55',
            message: 'Lo sai che ha aperto una nuova pizzeria?',
            status: 'sent'
            },
            {
            date: '10/01/2020 15:50:00',
            message: 'Si, ma preferirei andare al cinema',
            status: 'received'
            }
            ],
          },
          {
          name: 'Alessandro L.',
          avatar: './img/avatar_5.jpg',
          visible: true,
          messages: [
            {
            date: '10/01/2020 15:30:55',
            message: 'Ricordati di chiamare la nonna',
            status: 'sent'
            },
            {
            date: '10/01/2020 15:50:00',
            message: 'Va bene, stasera la sento',
            status: 'received'
            }
            ],
          },
          {
          name: 'Claudia',
          avatar: './img/avatar_6.jpg',
          visible: true,
          messages: [
            {
            date: '10/01/2020 15:30:55',
            message: 'Ciao Claudia, hai novità?',
            status: 'sent'
            },
            {
            date: '10/01/2020 15:50:00',
            message: 'Non ancora',
            status: 'received'
            },
            {
            date: '10/01/2020 15:51:00',
            message: 'Nessuna nuova, buona nuova',
            status: 'sent'
            }
            ],
          },
          {
          name: 'Federico',
          avatar: './img/avatar_7.jpg',
          visible: true,
          messages: [
            {
            date: '10/01/2020 15:30:55',
            message: 'Fai gli auguri a Martina che è il suo compleanno!',
            status: 'sent'
            },
            {
            date: '10/01/2020 15:50:00',
            message: 'Grazie per avermelo ricordato, le scrivo subito!',
            status: 'received'
            }
            ],
          },
          {
          name: 'Davide',
          avatar: './img/avatar_8.jpg',
          visible: true,
          messages: [
            {
            date: '10/01/2020 15:30:55',
            message: 'Ciao, andiamo a mangiare la pizza stasera?',
            status: 'received'
            },
            {
            date: '10/01/2020 15:50:00',
            message: 'No, l\'ho già mangiata ieri, ordiniamo sushi!',
            status: 'sent'
            },
            {
            date: '10/01/2020 15:51:00',
            message: 'OK!!',
            status: 'received'
            }
            ],
          }
          ],

      }
    },
    methods: {
      removeUser(word){
        this.presente=[]
        this.contacts.forEach((element, index) =>{
        if(word != ""){
          
        
          if(element.name.toLowerCase().includes(word.toLowerCase())){
            if(this.presente.includes(index)){
              this.presente=[]
            }
          
          }else{
            this.presente.push(index)
          }
        }
        })
        console.log(this.presente,word)
        
      },

      orario(index) {
        const ora = this.contacts[this.posizione].messages[index].date.split(" ");
        return ora[1].split(":").slice(0, 2).join(":");
      },

      lstorario(index){
        if(this.contacts[index].messages.length > 0){
        const ora = this.contacts[index].messages[this.contacts[index].messages.length-1].date.split(" ");
        return ora[1].split(":").slice(0, 2).join(":");
        }
      },
      
      
      add(){
        const now = luxon.DateTime.local();
        const formattedDateTime = now.toFormat('dd/MM/yyyy HH:mm:ss');
        
       
        this.contacts[this.posizione].messages.push({date:formattedDateTime,message:this.newmessage,status:"sent"})
        setTimeout(()=>{
          this.contacts[this.posizione].messages.push({date:formattedDateTime,message:"ok",status:"received"})
        },1000)
        this.newmessage=""
      },
      change(event){
        event.target.setAttribute("class","cambio1");
      },
      statoup(index){
        if(this.stato==index){
          this.stato=null
        }else{
          this.stato=index
        }
        
      },
      removemsg(index){
        this.contacts[this.posizione].messages.splice(index, 1)
        this.stato=null
      },
      
    },
    watch:{
      ricerca(word){
        // aggiungere la funzione remove presa dal methods
        
        
        this.removeUser(word)
      }
    },
    computed:{
      
      ultimoaccesso(){
        let messages = this.contacts[this.posizione].messages;
        let i = messages.length;
      
        while (i > 0) {
          i--;
          if (messages[i].status === "received") {
            return "Ultimo accesso oggi alle " + this.orario(i);
          }
        }
        return "non visibile";
      }
      },
    

  }).mount('#app')
