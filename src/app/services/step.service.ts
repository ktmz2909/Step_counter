import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { StepEntry } from '../models/step-counter.interface';

@Injectable({
  providedIn: 'root'
})
export class StepService {
  private stepEntries: StepEntry[] = [];
  private stepEntriesSubject = new BehaviorSubject<StepEntry[]>([]);

  constructor() {
    // Initialize with some sample data
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const twoDaysAgo = new Date(today);
    twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);

    this.addEntry({
      date: twoDaysAgo,
      steps: 8543,
      goal: 10000,
      distance: 6.5,
      calories: 320
    });

    this.addEntry({
      date: yesterday,
      steps: 12350,
      goal: 10000,
      distance: 9.4,
      calories: 480
    });

    this.addEntry({
      date: today,
      steps: 4200,
      goal: 10000,
      distance: 3.2,
      calories: 160
    });
  }

  getStepEntries(): Observable<StepEntry[]> {
    return this.stepEntriesSubject.asObservable();
  }

  getCurrentEntry(): StepEntry {
    const today = new Date();
    const todayEntry = this.stepEntries.find(entry => 
      entry.date.getDate() === today.getDate() && 
      entry.date.getMonth() === today.getMonth() && 
      entry.date.getFullYear() === today.getFullYear()
    );

    if (todayEntry) {
      return todayEntry;
    } else {
      // Create a new entry for today if none exists
      const newEntry: StepEntry = {
        date: today,
        steps: 0,
        goal: 10000,
        distance: 0,
        calories: 0
      };
      this.addEntry(newEntry);
      return newEntry;
    }
  }

  addEntry(entry: StepEntry): void {
    const existingIndex = this.stepEntries.findIndex(e => 
      e.date.getDate() === entry.date.getDate() && 
      e.date.getMonth() === entry.date.getMonth() && 
      e.date.getFullYear() === entry.date.getFullYear()
    );

    if (existingIndex >= 0) {
      this.stepEntries[existingIndex] = entry;
    } else {
      this.stepEntries.push(entry);
    }
    
    // Sort entries by date (newest first)
    this.stepEntries.sort((a, b) => b.date.getTime() - a.date.getTime());
    
    // Emit the updated array
    this.stepEntriesSubject.next([...this.stepEntries]);
  }

  updateSteps(steps: number): void {
    const currentEntry = this.getCurrentEntry();
    const updatedEntry: StepEntry = {
      ...currentEntry,
      steps: steps,
      distance: this.calculateDistance(steps),
      calories: this.calculateCalories(steps)
    };
    this.addEntry(updatedEntry);
  }

  updateGoal(goal: number): void {
    const currentEntry = this.getCurrentEntry();
    const updatedEntry: StepEntry = {
      ...currentEntry,
      goal: goal
    };
    this.addEntry(updatedEntry);
  }

  // Calculate distance based on steps (average stride length)
  private calculateDistance(steps: number): number {
    // Average stride length is about 0.762 meters
    // 1 km = 1312 steps (approximate)
    return parseFloat((steps / 1312).toFixed(1));
  }

  // Calculate calories based on steps (approximate)
  private calculateCalories(steps: number): number {
    // Average calorie burn is about 0.04 calories per step
    return Math.round(steps * 0.04);
  }
}