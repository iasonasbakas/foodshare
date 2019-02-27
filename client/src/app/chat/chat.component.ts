    import { Component, ViewChild } from '@angular/core';

    import { AuthService } from '../auth.service';
    import { UserService } from '../user.service';
    import { User } from '../user';

    import Chatkit from '@pusher/chatkit-client';
    import axios from 'axios';


    @Component({
      selector: 'chat-root',
      templateUrl: './chat.component.html',
      styleUrls: ['./chat.component.css']
    })

    export class ChatComponent {
      messages = [];
      users = [];
      currentUser: any;
      currentRoom = <any>{};
      usersWhoAreTyping = [];
      attachment = null;

    constructor(private auth: AuthService, private userService: UserService) { }

      ngOnInit() {
        if(localStorage.getItem('foodshare-jwt-access-token')){
        this.auth.isLoggedIn = true;
        }
      }

      @ViewChild('form') form;

      _username: string = '';
      get username(): string {
        return this._username;
      }

      set username(value: string) {
        this._username = value;
      }

      _message: string = '';
      get message(): string {
        return this._message;
      }

      set message(value: string) {
        this.sendTypingEvent();
        this._message = value;
      }

      reset() {
        this.form.nativeElement.reset()
      }

      fileChangedHandler(event) {
        const file = event.target.files[0];
        this.attachment = file;
      }

      sendMessage() {
        const { message, currentUser, attachment } = this;

        if (message.trim() === '') return;

        const messageObj = <any>{
          text: message,
          roomId: '28713335',
        };

        if (attachment) {
          messageObj.attachment = {
            file: attachment,
            name: attachment.name,
          };
        }

        currentUser.sendMessage(messageObj);
        this.reset();
        this.attachment = null;
      }

      sendTypingEvent() {
        const { currentUser, currentRoom } = this;
        currentUser
        .isTypingIn({ roomId: currentRoom.id });
      }

      addUser() {
        const { username } = this;
        axios.post('http://localhost:5200/users', { username })
          .then(() => {
            const tokenProvider = new Chatkit.TokenProvider({
              url: 'http://localhost:5200/authenticate'
            });
            const chatManager = new Chatkit.ChatManager({
              instanceLocator: 'v1:us1:f34b0384-5571-4a03-b5db-31f2c8a502b1',
              userId: username,
              tokenProvider
            });
            return chatManager
              .connect()
              .then(currentUser => {
                currentUser.subscribeToRoom({
                  roomId: '28713335',
                  messageLimit: 100,
                  hooks: {
                    onMessage: message => {
                      this.messages.push(message);
                    },
                    onPresenceChanged: (state, user) => {
                      this.users = currentUser.users.sort((a) => {
                        if (a.presence.state === 'online') return -1;
                        return 1;
                      });
                    },
                    onUserStartedTyping: user => {
                      this.usersWhoAreTyping.push(user.name);
                    },
                    onUserStoppedTyping: user => {
                      this.usersWhoAreTyping = this.usersWhoAreTyping.filter(username => username !== user.name);
                    }
                  },
                })
                .then(currentRoom => {
                  this.currentRoom = currentRoom;
                });

                this.currentUser = currentUser;
                this.users = currentUser.users;
              });
          })
            .catch(error => console.error(error))
      }
    }