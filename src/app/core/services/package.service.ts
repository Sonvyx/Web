import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Package {
  id: string;
  name: string;
  price: number;
  features?: string[];
}

@Injectable({
  providedIn: 'root'
})
export class PackageService {
  private selectedPackageSubject = new BehaviorSubject<Package | null>(null);

  constructor() {
    const savedPackage = localStorage.getItem('selectedPackage');
    if (savedPackage) {
      this.selectedPackageSubject.next(JSON.parse(savedPackage));
    }
  }

  setSelectedPackage(pkg: Package): void {
    localStorage.setItem('selectedPackage', JSON.stringify(pkg));
    this.selectedPackageSubject.next(pkg);
  }

  getSelectedPackage(): Package | null {
    return this.selectedPackageSubject.value;
  }

  getSelectedPackageObservable(): Observable<Package | null> {
    return this.selectedPackageSubject.asObservable();
  }
} 