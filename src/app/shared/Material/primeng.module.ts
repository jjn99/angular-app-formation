import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {CarouselModule} from "primeng/carousel";
import {ButtonModule} from "primeng/button";
import {ConfirmationService, MessageService} from "primeng/api";
import {DialogModule} from "primeng/dialog";
import {TooltipModule} from "primeng/tooltip";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {MessageModule} from "primeng/message";
import {ToastModule} from "primeng/toast";
import {MessagesModule} from "primeng/messages";
import {DropdownModule} from "primeng/dropdown";
import {CardModule} from "primeng/card";
import { AvatarModule } from 'primeng/avatar';
import { AccordionModule } from 'primeng/accordion';
import { DividerModule } from 'primeng/divider';
import {StepsModule} from 'primeng/steps';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import {OverlayPanelModule} from 'primeng/overlaypanel';
import {ToolbarModule} from "primeng/toolbar";
import {SplitButtonModule} from "primeng/splitbutton";
import {ChartModule} from "primeng/chart";
import {MultiSelectModule} from "primeng/multiselect";
import {CalendarModule} from "primeng/calendar";
import {PasswordModule} from "primeng/password";
import {InputMaskModule} from "primeng/inputmask";
import {FileUploadModule} from "primeng/fileupload";
import {InputNumberModule} from "primeng/inputnumber";
import {ChipsModule} from "primeng/chips";
import {AutoCompleteModule} from "primeng/autocomplete";
import {CheckboxModule} from "primeng/checkbox";
import {RatingModule} from "primeng/rating";
import {PaginatorModule} from "primeng/paginator";
import {DataViewModule} from "primeng/dataview";
import {TableModule} from "primeng/table";
import {KnobModule} from "primeng/knob";
import { ProgressBarModule } from 'primeng/progressbar';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    CarouselModule,
    CardModule,
    ButtonModule,
    DialogModule,
    DropdownModule,
    TooltipModule,
    ConfirmDialogModule,
    MessageModule,
    MessagesModule,
    ToastModule,
    AvatarModule,
    DividerModule,
    AccordionModule,
    StepsModule,
    InputTextareaModule,
    InputTextModule,
    OverlayPanelModule,
    ToolbarModule,
    SplitButtonModule,
    ChartModule,
    MultiSelectModule,
    CalendarModule,
    PasswordModule,
    InputMaskModule,
    FileUploadModule,
    InputNumberModule,
    MultiSelectModule,
    ChipsModule,
    AutoCompleteModule,
    CheckboxModule,
    RatingModule,
    PaginatorModule,
    DataViewModule,
    TableModule,
    KnobModule,
    ProgressBarModule
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    AutoCompleteModule,
    KnobModule,
    TableModule,
    FormsModule,
    TableModule,
    RatingModule,
    DataViewModule,
    PaginatorModule,
    HttpClientModule,
    CarouselModule,
    CardModule,
    ButtonModule,
    DialogModule,
    DropdownModule,
    TooltipModule,
    ConfirmDialogModule,
    MessageModule,
    MessagesModule,
    ToastModule,
    AvatarModule,
    DividerModule,
    AccordionModule,
    StepsModule,
    InputTextModule,
    InputTextareaModule,
    OverlayPanelModule,
    ToolbarModule,
    SplitButtonModule,
    ChartModule,
    MultiSelectModule,
    CalendarModule,
    PasswordModule,
    InputMaskModule,
    FileUploadModule,
    InputNumberModule,
    MultiSelectModule,
    ChipsModule,
    CheckboxModule,
    ProgressBarModule
  ],

  providers: [
    ConfirmationService,
    MessageService,
  ]
})
export class SharedCommonsModule { }
