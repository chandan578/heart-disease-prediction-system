import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgChartsModule } from 'ng2-charts';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { Router } from '@angular/router';
import { HttpService } from '../../core/service/http.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, NgChartsModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  patientInfo: any;
  patientSymptoms: any;

  // Patient Information
  patientName: string = '';
  patientAge: number = 45;
  patientGender: string = 'Male';
  bloodPressure: string = '120/80';
  heartRate: number = 72;
  weight: number = 75;
  bmi: number = 24.5;

  // Prediction Data
  predictionData: any;
  symptomsData: any;
  heartDiseaseRiskScore: number = 0;
  riskCategory: 'low' | 'medium' | 'high' = 'low';
  prediction: number = 0; // 0 or 1

  // Appointment Information
  nextAppointment: boolean = true;
  nextAppointmentDate: Date = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  nextAppointmentLocation: string = 'Main Cardiology Clinic';

  constructor(private router: Router, private apiService: HttpService) {}

  ngOnInit() {
    this.patientInfo = JSON.parse(localStorage.getItem('userData') || '{}');
    console.log(this.patientInfo);

    // Load all data first, then initialize
    this.loadPatientData()
      .then(() => {
        this.updateDashboardData();
      })
      .catch(() => {
        this.initializeWithDefaultData(); // Fallback if API fails
      });
  }

  async loadPatientData() {
    try {
      // Fetch patient symptoms and details (adjust API endpoint as needed)
      const res = await this.apiService
        .get(`patient/${this.patientInfo.email}`)
        .toPromise();

      console.log('API response:', res);
      this.patientSymptoms = res;

      // Now update all UI elements dynamically
      this.updatePatientInfo();
      this.updatePredictionData();
      this.updateCharts();
    } catch (error) {
      console.error('Error fetching patient data:', error);
      // Fallback to default data if API fails
      this.initializeWithDefaultData();
    }
  }

  private updatePatientInfo() {
    if (this.patientSymptoms) {
      // Basic Info
      this.patientName = this.patientInfo?.name || 'N/A';
      this.patientAge =
        this.patientInfo?.age || this.patientSymptoms?.symptoms_data.age || 0;
      this.patientGender =
        this.patientInfo?.gender ||
        (this.patientSymptoms?.symptoms_data.sex === 1 ? 'Male' : 'Female') ||
        'N/A';

      // Vital Signs (fallback to hardcoded if API doesn't provide)
      this.bloodPressure =
        this.patientSymptoms?.symptoms_data.trestbps + '/80' || '120/80'; // Adjust if API provides diastolic
      this.heartRate = this.patientSymptoms?.symptoms_data.thalach || 72;
      this.weight = this.patientSymptoms?.symptoms_data.weight || 75;

      // Calculate BMI dynamically (if height is available)
      const heightMeters = this.patientSymptoms.symptoms_data?.height
        ? this.patientSymptoms.symptoms_data.height / 100
        : 1.75;
      this.bmi = this.weight / (heightMeters * heightMeters);
    }
  }

  private updatePredictionData() {
    if (this.patientSymptoms?.symptoms_data) {
      const data = this.patientSymptoms.symptoms_data;

      // Set values
      this.prediction = data.prediction; // Binary (0/1)
      this.heartDiseaseRiskScore = Math.round((data.probability || 0) * 100);

      // Determine risk category (customize thresholds as needed)
      this.determineRiskCategory();
    }
  }

  private updateCharts() {
    if (this.patientSymptoms) {
      this.lineChartData = {
        labels: ['Before', 'After Prediction'],
        datasets: [
          {
            data: [
              this.patientSymptoms.symptoms_data.thalach || 72,
              this.patientSymptoms.predicted_heart_rate || 0,
            ],
            label: 'Heart Rate (bpm)',
            borderColor: '#3f51b5',
            backgroundColor: 'rgba(63,81,181,0.3)',
            fill: true,
            tension: 0.4,
          },
          {
            data: [
              this.patientSymptoms.symptoms_data.trestbps || 120,
              this.patientSymptoms.predicted_bp || 0,
            ],
            label: 'Blood Pressure (mmHg)',
            borderColor: '#f44336',
            backgroundColor: 'rgba(244,67,54,0.3)',
            fill: true,
            tension: 0.4,
          },
        ],
      };
    }
  }

  // Replace hardcoded status indicators with dynamic data
  get statusIndicators() {
    return [
      {
        label: 'Blood Pressure',
        status: this.getBloodPressureStatus(),
        value: this.bloodPressure,
      },
      {
        label: 'Cholesterol',
        status:
          this.patientSymptoms?.symptoms_data.chol > 200
            ? 'abnormal'
            : 'normal',
        value: `${this.patientSymptoms?.symptoms_data.chol || 0} mg/dL`,
      },
      {
        label: 'Blood Sugar',
        status:
          this.patientSymptoms?.symptoms_data.fbs === 1 ? 'abnormal' : 'normal',
        value: this.patientSymptoms?.symptoms_data.fbs
          ? '>120 mg/dL'
          : '<120 mg/dL',
      },
      {
        label: 'BMI',
        status: this.bmi > 25 ? 'abnormal' : 'normal',
        value: this.bmi.toFixed(1),
      },
    ];
  }

  private getBloodPressureStatus() {
    const systolic = parseInt(this.bloodPressure.split('/')[0]);
    return systolic > 130 ? 'abnormal' : 'normal';
  }

  get alerts() {
    return (
      this.patientSymptoms?.alerts || [
        // Fallback hardcoded alerts if API doesn't provide
        {
          type: 'medication',
          title: 'Take Metformin',
          message: 'Take 500mg with breakfast',
          time: new Date(),
          read: false,
        },
      ]
    );
  }

  lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: ['Before', 'After Prediction'],
    datasets: [
      {
        data: [0, 0],
        label: 'Heart Rate (bpm)',
        borderColor: '#3f51b5',
        backgroundColor: 'rgba(63,81,181,0.3)',
        fill: true,
        tension: 0.4,
      },
      {
        data: [0, 0],
        label: 'Blood Pressure (mmHg)',
        borderColor: '#f44336',
        backgroundColor: 'rgba(244,67,54,0.3)',
        fill: true,
        tension: 0.4,
      },
    ],
  };

  lineChartOptions: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: true, position: 'top' },
      title: { display: true, text: 'Health Metrics Comparison' },
    },
    scales: {
      y: {
        title: { display: true, text: 'Value' },
        min: 0,
      },
      x: {
        title: { display: true, text: 'Timeline' },
      },
    },
  };

  private updateDashboardData() {
    if (this.predictionData) {
      // Set risk score and category
      this.heartDiseaseRiskScore = this.predictionData.riskScore || 0;
      this.determineRiskCategory();

      // Update patient info from symptoms
      if (this.symptomsData) {
        this.weight = this.symptomsData.weight || this.weight;
        this.patientAge = this.symptomsData.age || this.patientAge;
        this.patientGender = this.symptomsData.sex === 1 ? 'Male' : 'Female';

        // Calculate BMI (example calculation)
        const heightMeters = 1.75; // You would get this from patient data
        this.bmi = this.weight / (heightMeters * heightMeters);
      }

      // Update charts with prediction data
      this.updateCharts();
    }
  }

  private initializeWithDefaultData() {
    // Default chart data
    // this.lineChartData = {
    //   labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    //   datasets: [
    //     {
    //       data: [120, 125, 118, 122, 130, 128, 125],
    //       label: 'Blood Pressure (Systolic)',
    //       borderColor: '#3f51b5',
    //       backgroundColor: 'rgba(63,81,181,0.3)',
    //       fill: true,
    //       tension: 0.4
    //     },
    //     {
    //       data: [72, 75, 70, 68, 74, 76, 72],
    //       label: 'Heart Rate',
    //       borderColor: '#f44336',
    //       backgroundColor: 'rgba(244,67,54,0.3)',
    //       fill: true,
    //       tension: 0.4
    //     }
    //   ]
    // };
  }

  private determineRiskCategory() {
    if (this.heartDiseaseRiskScore >= 70 && this.prediction === 1) {
      this.riskCategory = 'high';
    } else if (this.heartDiseaseRiskScore >= 30) {
      this.riskCategory = 'medium';
    } else {
      this.riskCategory = 'low';
    }
  }

  enterSymptoms() {
    this.router.navigate(['/patient']);
  }

  bookConsultation() {
    this.router.navigate(['/patient/consultation']);
  }

  viewLatestReport() {
    this.router.navigate(['/patient/reports']);
  }
}
