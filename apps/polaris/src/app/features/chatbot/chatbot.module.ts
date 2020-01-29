import { NgModule }      from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from 'app/app-matierial.module';
import { CommonModule } from '@angular/common';
import { MessageFormComponent } from './message-form.component';
import { MessageListComponent } from './message-list/message-list.component';
import { MessageItemComponent } from './message-item/message-item.component';
import { ChatbotComponent } from './chatbot.component';
import { AutoFocusDirective } from './auto-focus.directive';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
   ],
  declarations: [ MessageFormComponent,MessageListComponent,MessageItemComponent,ChatbotComponent, AutoFocusDirective],
  exports: [ MessageFormComponent,MessageListComponent,MessageItemComponent,ChatbotComponent, AutoFocusDirective],

})
export class ChatbotModule { }