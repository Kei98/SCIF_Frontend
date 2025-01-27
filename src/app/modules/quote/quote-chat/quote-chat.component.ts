import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-quote-chat',
  templateUrl: './quote-chat.component.html',
  styleUrls: ['./quote-chat.component.scss']
})
export class QuoteChatComponent {
  @Input() quoteId!: number;
  @Output() closeChat = new EventEmitter<void>(); // Emit event to close chat
  chatMessages: any[] = [];
  currentUserId = 'currentUserId'; // Replace with actual logged-in user ID
  editMessageId: number | null = null; // Track the message being edited
  editMessageText: string = '';

  constructor() {}

  ngOnInit(): void {
    this.loadChat();
  }

  loadChat(): void {
    this.chatMessages = [
      { id: 1, message: 'Request: I want water pupm HOWE-14, also I would like it installed at my home', sentByMe: true },
      { id: 2, message: 'Hi, the price for it would be $500 USD, plus the installation $100. For a total of $600', sentByMe: false },
      { id: 3, message: 'I will take it, please get it', sentByMe: true },
    ];
  }

  deleteMessage(id: number): void {
    this.chatMessages = this.chatMessages.filter((message) => message.id !== id);
  }

  startEditMessage(id: number, text: string): void {
    this.editMessageId = id;
    this.editMessageText = text;
  }

  saveEditedMessage(): void {
    if (this.editMessageId !== null) {
      const updatedMessage = {
        text: this.editMessageText,
      };

      // API call to update the message
        const message = this.chatMessages.find((msg) => msg.id === this.editMessageId);
        if (message) {
          message.text = this.editMessageText;
        }
        this.editMessageId = null;
        this.editMessageText = '';

    }
  }

  cancelEdit(): void {
    this.editMessageId = null;
    this.editMessageText = '';
  }

  goBack(): void {
    this.closeChat.emit();
  }
}

