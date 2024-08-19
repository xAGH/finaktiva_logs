import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Filter } from '../../data/models/Filter';
import { FilterGroup } from '../../data/models/FilterGroup';

@Component({
  selector: 'app-filters',
  standalone: true,
  imports: [],
  templateUrl: './filters.component.html',
  styleUrl: './filters.component.scss',
})
export class FiltersComponent {
  @Input() filters: FilterGroup = {};
  @Output() remove: EventEmitter<Filter> = new EventEmitter();

  getFilters() {
    return Object.entries(this.filters);
  }
}
