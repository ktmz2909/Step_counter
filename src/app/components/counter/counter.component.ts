import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StepService } from '../../services/step.service';
import { StepEntry } from '../../models/step-counter.interface';

@Component({
  selector: 'app-counter',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.css']
})
export class CounterComponent implements OnInit {
  currentEntry: StepEntry | null = null;
  stepInput: number = 0;
  goalInput: number = 10000;
  
  constructor(private stepService: StepService) { }

  ngOnInit(): void {
    this.currentEntry = this.stepService.getCurrentEntry();
    this.stepInput = this.currentEntry.steps;
    this.goalInput = this.currentEntry.goal;
  }

  updateSteps(): void {
    if (this.stepInput < 0) this.stepInput = 0;
    this.stepService.updateSteps(this.stepInput);
    this.currentEntry = this.stepService.getCurrentEntry();
  }

  updateGoal(): void {
    if (this.goalInput < 1000) this.goalInput = 1000;
    this.stepService.updateGoal(this.goalInput);
    this.currentEntry = this.stepService.getCurrentEntry();
  }

  addSteps(amount: number): void {
    this.stepInput += amount;
    if (this.stepInput < 0) this.stepInput = 0;
    this.updateSteps();
  }

  resetSteps(): void {
    this.stepInput = 0;
    this.updateSteps();
  }

  getProgressPercentage(): number {
    if (!this.currentEntry) return 0;
    return Math.min(100, Math.round((this.currentEntry.steps / this.currentEntry.goal) * 100));
  }

  decreaseGoal(): void {
  this.goalInput -= 1000;
  if (this.goalInput < 1000) this.goalInput = 1000;
  this.updateGoal();
}

increaseGoal(): void {
  this.goalInput += 1000;
  this.updateGoal();
}
}