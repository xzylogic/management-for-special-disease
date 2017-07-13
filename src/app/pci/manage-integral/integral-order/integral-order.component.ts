import { Component, OnInit } from '@angular/core';

import { TableOption } from '../../../libs/dtable/dtable.entity';
import { IntegralOrderTableService } from './_service/integral-order-table.service';
import { IntegralOrderService } from './_service/integral-order.service';

@Component({
  selector: 'app-integral-order',
  templateUrl: 'integral-order.component.html'
})
export class IntegralOrderComponent implements OnInit {

  constructor(
    private _integralOrderService: IntegralOrderService,
    private _integralOrderTableService: IntegralOrderTableService
  ) {
  }

  ngOnInit() {
  }
}
