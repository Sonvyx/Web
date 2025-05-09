import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Package {
  id: string;
  name: string;
  price: number;
  features: string[];
}

@Injectable({
  providedIn: 'root'
})
export class PackageService {
  private selectedPackageSubject = new BehaviorSubject<Package | null>(null);
  selectedPackage$ = this.selectedPackageSubject.asObservable();

  setSelectedPackage(pkg: Package | null) {
    this.selectedPackageSubject.next(pkg);
  }

  getSelectedPackage(): Package | null {
    return this.selectedPackageSubject.value;
  }
} 