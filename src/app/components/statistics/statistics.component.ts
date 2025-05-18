import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StepService } from '../../services/step.service';
import { StepEntry } from '../../models/step-counter.interface';

@Component({
  selector: 'app-statistics',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {
  stepEntries: StepEntry[] = [];
  weeklyTotal: number = 0;
  weeklyAverage: number = 0;
  bestDay: StepEntry | null = null;
  totalDistance: number = 0;
  totalCalories: number = 0;
  goalAchievementRate: number = 0;
  
  constructor(private stepService: StepService) { }

  ngOnInit(): void {
    this.stepService.getStepEntries().subscribe(entries => {
      this.stepEntries = entries;
      this.calculateStatistics();
    });
  }

  calculateStatistics(): void {
    if (this.stepEntries.length === 0) return;

    // Calculate total and find best day
    this.weeklyTotal = 0;
    this.totalDistance = 0;
    this.totalCalories = 0;
    let goalsAchieved = 0;
    
    this.bestDay = this.stepEntries[0];
    
    this.stepEntries.forEach(entry => {
      this.weeklyTotal += entry.steps;
      this.totalDistance += entry.distance;
      this.totalCalories += entry.calories;
      
      if (entry.steps >= entry.goal) {
        goalsAchieved++;
      }
      
      if (entry.steps > (this.bestDay?.steps || 0)) {
        this.bestDay = entry;
      }
    });
    
    // Calculate average and goal achievement rate
    this.weeklyAverage = Math.round(this.weeklyTotal / this.stepEntries.length);
    this.goalAchievementRate = Math.round((goalsAchieved / this.stepEntries.length) * 100);
  }

  formatDate(date: Date): string {
    return new Date(date).toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric'
    });
  }

  getTrend(index: number): string {
    if (index === this.stepEntries.length - 1 || this.stepEntries.length < 2) {
      return 'neutral';
    }
    
    const current = this.stepEntries[index].steps;
    const previous = this.stepEntries[index + 1].steps;
    
    if (current > previous) return 'up';
    if (current < previous) return 'down';
    return 'neutral';
  }

  getProgressClass(entry: StepEntry): string {
    const percentage = (entry.steps / entry.goal) * 100;
    if (percentage >= 100) return 'excellent';
    if (percentage >= 75) return 'good';
    if (percentage >= 50) return 'average';
    return 'below';
  }
}