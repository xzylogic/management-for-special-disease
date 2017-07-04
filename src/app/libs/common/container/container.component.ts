import { Component, Input } from '@angular/core';

export class ContainerConfig {
  title: string;
  subTitle: string;
  ifHome: boolean;
  homeRouter: string;
  currentRouter: string;

  constructor(obj?: ContainerConfig) {
    this.title = obj.title || '';
    this.subTitle = obj.subTitle || '';
    this.ifHome = obj.ifHome || true;
    this.homeRouter = obj.homeRouter || '';
    this.currentRouter = obj.currentRouter || '';
  }
}

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss']
})
export class ContainerComponent {
  @Input() config: ContainerConfig;
}
