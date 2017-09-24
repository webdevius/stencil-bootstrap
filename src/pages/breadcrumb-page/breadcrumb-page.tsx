import { Component } from '@stencil/core';
import { IBreadcrumbItem } from '../../common/index';

@Component({
  tag: 'breadcrumb-page',
  shadow: true,
})
export class BreadcrumbPage {
  breadcrumbItems: IBreadcrumbItem[] = [
    { active: false, href: '/alerts', target: 'blank', title: 'Alerts' },
    { active: false, href: '/badge', target: 'blank', title: 'Badge' },
    { active: true, href: '/breadcrumb', target: 'blank', title: 'Breadcrumbs' },
  ];

  render() {
    return (
      <scb-breadcrumb items={this.breadcrumbItems}>
      </scb-breadcrumb>
    );
  }
}
