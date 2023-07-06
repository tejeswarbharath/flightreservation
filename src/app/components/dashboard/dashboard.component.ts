import { Component, OnInit, ViewChild, NgZone, ElementRef } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import {map, startWith} from 'rxjs/operators';
import { Observable } from 'rxjs-compat/Observable';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import {take} from 'rxjs/operators';
import { FlightInfoService } from 'src/app/shared/services/flight-info.service';
import {MatDialog,MatDialogRef} from '@angular/material/dialog';
import { SuccessDialogComponent } from '../success-dialog/success-dialog.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})

export class DashboardComponent implements OnInit {
  reservationVisible: boolean = true;
  profileVisible: boolean = false;
  registerForm: any = FormGroup;
  submitted = false;
  numberOfGuests: Number = 0;
  filterAirlineList: Observable<string[]> = new Observable<string[]>();
  typeofTrip: string="";
  airlineList: string[] = [
    'Delta',
    'United Airlines',
    'Southwest Airlines',
    'Emirates',
    'Qatar',
    'American Airlines',
    'British Airways',
    'Air India',
    'Air NewZealand',
    'Alaska',
    'Jet Blue',
    'Singapore Airlines'
  ];

  constructor(public authService: AuthService, private formBuilder: FormBuilder,private _ngZone: NgZone,private flightInfoService: FlightInfoService,private dialog: MatDialog) { }

  get f() { return this.registerForm.controls; }
  
  onSubmit() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }
    if (this.submitted) {
      this.flightInfoService.submitFlightInfo(this.registerForm.value).subscribe(value=>{
        console.log(value);
        if(value){
          console.log("Inside loop");
          const dialogRef = this.dialog.open(SuccessDialogComponent);
          dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
          });
        }
      })
    }
  }
  
  @ViewChild('autosize')
  autosize!: CdkTextareaAutosize;

  triggerResize() {
    // Wait for changes to be applied, then trigger textarea resize.
    this._ngZone.onStable.pipe(take(1)).subscribe(() => this.autosize.resizeToFitContent(true));
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      airline: ['', [Validators.required]],
      arrivalDate: ['', [Validators.required]],
      arrivalTime: ['', [Validators.required]],
      flightNumber: ['', [Validators.required]],
      numOfGuests: ['', [Validators.required]],
      comments: ['']
    });
    this.filterAirlineList = this.registerForm.controls['airline'].valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
  }

  private _filter(value:any): string[] {
    const filterValue = value.toLowerCase();
    return this.airlineList.filter(option => option.toLowerCase().includes(filterValue));
  }
  
  displayReservation() {
    if (this.profileVisible && !this.reservationVisible) {
      this.reservationVisible = true;
      this.profileVisible = false;
    }
  }

  displayProfile() {
    if (!this.profileVisible && this.reservationVisible) {
      this.profileVisible = true;
      this.reservationVisible = false;
    }
  }
}