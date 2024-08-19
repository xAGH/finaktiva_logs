import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Subscription } from 'rxjs';
import { ButtonComponent } from '../../components/button/button.component';
import { DropdownComponent } from '../../components/dropdown/dropdown.component';
import { FiltersComponent } from '../../components/filters/filters.component';
import { InputComponent } from '../../components/input/input.component';
import { SeverityDropdownComponent } from '../../components/severity-dropdown/severity-dropdown.component';
import { TypeDropdownComponent } from '../../components/type-dropdown/type-dropdown.component';
import {
  FilterOptions,
  HomologatedFilterOptions,
} from '../../data/constants/filter-options';
import { Filter } from '../../data/models/Filter';
import { FilterGroup } from '../../data/models/FilterGroup';
import { EventService } from '../../services/event/event.service';
import { now, today } from '../../utils/date.utils';

@Component({
  selector: 'app-event-search',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    InputComponent,
    SeverityDropdownComponent,
    TypeDropdownComponent,
    DropdownComponent,
    ButtonComponent,
    FiltersComponent,
  ],
  templateUrl: './event-search.component.html',
  styleUrl: './event-search.component.scss',
})
export class EventSearchComponent {
  filterOptions = FilterOptions;
  filterSelected: string = '';
  filterForm: FormGroup;
  showFilters: boolean = false;
  filterValid = false;
  filters: FilterGroup = {};
  maxDateValue: string = '';
  today: string = today();
  now: string = now();
  $fieldChanges?: Subscription;

  constructor(private fb: FormBuilder, private eventSrv: EventService) {
    this.filterForm = this.fb.group({
      id: [''],
      description: [''],
      timeMin: [''],
      timeMax: [''],
      severity: [''],
      type: [''],
      dateMin: [''],
      dateMax: [''],
    });
  }

  handleButtonClick() {
    if (!this.showFilters) {
      this.showFilters = true;
      return;
    }

    if (this.filterValid) this.addFilter();
    else this.resetFilter();
  }

  applyFilters() {
    this.eventSrv.filterEvents(this.filters).subscribe({
      next: () => {
        this.eventSrv.events();
        this.eventSrv.updateHasFilters(Object.values(this.filters).length > 0);
      },
    });
  }

  addFilter() {
    const filter = this.filterSelected;
    const value = this.filterForm.get(this.filterSelected)!.value;
    const homologatedFilter = Object.keys(HomologatedFilterOptions).find(
      (key) => HomologatedFilterOptions[key] === filter
    )!;
    if (filter.includes('date')) {
      this.filters[homologatedFilter] = [value];
      if (filter.includes('Max')) {
        this.maxDateValue = value;
      }
    } else if (filter.includes('time')) {
      this.filters[homologatedFilter] = [value];
    } else {
      this.filters[homologatedFilter] = [
        ...(this.filters[homologatedFilter] ?? []),
        value,
      ];
    }
    this.applyFilters();
    this.resetFilter();
  }

  resetFilter() {
    if (this.$fieldChanges) {
      this.$fieldChanges.unsubscribe();
    }
    this.showFilters = false;
    this.filterValid = false;
    this.filterForm.reset();
    this.filterForm.clearValidators();
    this.filterSelected = '';
  }

  resetFilteronSelectOption() {
    if (this.$fieldChanges) {
      this.$fieldChanges.unsubscribe();
    }
    this.filterValid = false;
    this.filterForm.reset();
    this.filterForm.clearValidators();
  }

  onFilterSelected(option: string) {
    this.resetFilteronSelectOption();
    this.filterSelected = HomologatedFilterOptions[option];
    const formControl = this.filterForm.get(this.filterSelected);
    formControl?.setValidators([Validators.required]);
    this.$fieldChanges = formControl?.statusChanges.subscribe((status) => {
      this.filterValid = status === 'VALID';
    });
  }

  getFilters() {
    return Object.entries(this.filters);
  }

  onRemove({ key, value }: Filter) {
    this.filters[key] = this.filters[key].filter((f) => f != value);
    if (this.filters[key].length === 0) {
      delete this.filters[key];
    }
    this.applyFilters();
  }
}
