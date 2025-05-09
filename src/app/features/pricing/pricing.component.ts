import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule, RouterOutlet, Router } from '@angular/router';
import { Package, PackageService } from '../../core/services/package.service';

@Component({
  selector: 'app-pricing',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterModule],
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.scss']
})
export class PricingComponent {
  constructor(
    private _packageService: PackageService,
    private _router: Router
  ) {}

  selectAndNavigate(pkg: Package): void {
    this._packageService.setSelectedPackage(pkg);
    this._router.navigate(['/register']);
  }
}