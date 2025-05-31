import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { HttpService } from '../../core/service/http.service';
import Swal from "sweetalert2";
import { error } from 'console';

@Component({
  selector: 'app-symptoms',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './symptoms.component.html',
  styleUrl: './symptoms.component.css',
})
export class SymptomsComponent {
  predictionForm!: FormGroup;
  predictionResult: string | null = null;
  patientInfo: any;

  constructor(
    private fb: FormBuilder, 
    private apiService: HttpService,
    private router: Router
  ) {
  }

  
  ngOnInit(){
    this.predictionForm = this.fb.group({
      weight: ['', [Validators.required]],
      // sex: ['', Validators.required],
      cp: ['', Validators.required],
      trestbps: ['', [Validators.required, Validators.min(90), Validators.max(200)]],
      chol: ['', [Validators.required, Validators.min(126), Validators.max(564)]],
      fbs: ['', Validators.required],
      restecg: ['', Validators.required],
      thalach: ['', [Validators.required, Validators.min(71), Validators.max(202)]],
      exang: ['', Validators.required],
      oldpeak: ['', [Validators.required, Validators.min(0), Validators.max(6.2)]],
      slope: ['', Validators.required],
      ca: ['', [Validators.required, Validators.min(0), Validators.max(4)]],
      thal: ['', Validators.required],
    });
    this.patientInfo = localStorage.getItem("userData");
    this.patientInfo = this.patientInfo ? JSON.parse(this.patientInfo) : null;
    console.log(this.patientInfo);
    console.log(this.patientInfo.email)
  }

  // submitForm() {

  //   if (this.predictionForm.invalid) {
  //     this.predictionForm.markAllAsTouched(); // Show validation errors
  //     return;
  //   }


  //   const formData = this.predictionForm.value;
  //   // console.log(formData)
  //   const formattedData = {
  //     age: parseInt(this.patientInfo.age, 10),
  //     sex: (this.patientInfo.gender == 'Male')? 1 : 0,
  //     cp: parseInt(formData.cp, 10),
  //     trestbps: parseInt(formData.trestbps, 10),
  //     chol: parseInt(formData.chol, 10),
  //     fbs: parseInt(formData.fbs, 10),
  //     restecg: parseInt(formData.restecg, 10),
  //     thalach: parseInt(formData.thalach, 10),
  //     exang: parseInt(formData.exang, 10),
  //     oldpeak: parseFloat(formData.oldpeak), // Convert to float
  //     slope: parseInt(formData.slope, 10),
  //     ca: parseInt(formData.ca, 10),
  //     thal: parseInt(formData.thal, 10),
  //     weight: parseInt(formData.weight, 10),
      
  //   };
  //   // formattedData.weight = this.predictionForm.value.weight;
  //   console.log(formattedData)

  //   const sendData = {
  //     "features" : [formattedData.age, formattedData.sex, formattedData.cp, formattedData.trestbps, formattedData.chol, formattedData.fbs, formattedData.restecg, formattedData.thalach, formattedData.exang, formattedData.oldpeak, formattedData.slope, formattedData.ca, formattedData.thal]
  //   }
  //   console.log(sendData)
  //   this.apiService.post('predict', sendData).subscribe((res:any)=>{
  //     console.log(res);
  //     const combineData = {
  //       email_id: this.patientInfo.email,
  //       symptoms_data: {...formattedData, ...res.prediction}
  //     };
  //     console.log(combineData);

  //     this.apiService.post('patient', combineData).subscribe((respond) =>{
  //       console.log(respond)
  //     })
  //     // this.router.navigate(['/result'], {state: {responseData: res}});
  //     // this.getPaitent();
  //   })
  // }





submitForm(){
  if (this.predictionForm.invalid) {
    this.predictionForm.markAllAsTouched();
    return;
  }

  // Show loading indicator
  Swal.fire({
    title: 'Processing your data...',
    allowOutsideClick: false,
    didOpen: () => Swal.showLoading()
  });

  const formData = this.predictionForm.value;
  const formattedData = {
    age: parseInt(this.patientInfo.age, 10),
    sex: (this.patientInfo.gender == 'Male') ? 1 : 0,
    cp: parseInt(formData.cp, 10),
    trestbps: parseInt(formData.trestbps, 10),
    chol: parseInt(formData.chol, 10),
    fbs: parseInt(formData.fbs, 10),
    restecg: parseInt(formData.restecg, 10),
    thalach: parseInt(formData.thalach, 10),
    exang: parseInt(formData.exang, 10),
    oldpeak: parseFloat(formData.oldpeak),
    slope: parseInt(formData.slope, 10),
    ca: parseInt(formData.ca, 10),
    thal: parseInt(formData.thal, 10),
    weight: parseInt(formData.weight, 10),
  };

  const sendData = {
    features: Object.values(formattedData).slice(0, 13)
  };

  // first api
  this.apiService.post('predict', sendData).subscribe((res:any) =>{
    const combineData = {
      email_id: this.patientInfo.email,
      symptoms_data:{...formattedData, ...res.prediction}
    };

    console.log(combineData)

    // second api
    this.apiService.post('patient', combineData).subscribe((res: any)=>{
      Swal.fire({
        icon: 'success',
        title: "Success!",
        text: 'Your prediction has been processed and saved.',
        showConfirmButton: true,
        willClose: () =>{
          this.router.navigate(['/patient/dashboard'])
        }
      });
    }, (error)=>{
      Swal.fire({
        icon: 'warning',
        title: error.error.message,
        text: 'You already enter your symptoms..',
        showConfirmButton: true,
        willClose: () =>{
          this.router.navigate(['/patient/dashboard'])
        }
      })
    });
  }, (error)=>{
    Swal.fire({
      icon: 'error',
      title: "Prediction failed!!",
      text: 'Failed to process your health data'
    })
  })
  
}

  submitData(){
    const saveValue = {
      patient_id: '1',
      first_name: "chandan",
      last_name: "kumar",
      birth_date: '2000-10-26',
      gender: "Male",
      contact_number: '7254054084',
      email: "chandankumar26102000@gmail.com",
      registration_date: "2025-03-29"
    };
    this.apiService.post('patients', saveValue).subscribe((res: any) =>{
      console.log(res);
    })
  }
}
