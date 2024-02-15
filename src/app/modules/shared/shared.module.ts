import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { CoreModule } from '../core/core.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, MaterialModule],
  exports: [CommonModule, MaterialModule, MatSelectModule, ReactiveFormsModule],
})
export class SharedModule {}
