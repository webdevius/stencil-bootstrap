import { Component, Prop } from '@stencil/core';
import { IBreadcrumbItem } from './../../common/index';

@Component({
  tag: 'scb-breadcrumb',
})
export class ScbBreadcrumb {
  @Prop({ mutable: true }) items: IBreadcrumbItem[] = [];

  render() {
    return (
      <nav class="breadcrumb">
        {this.items.map(item =>
          item.active
            ? this.getSpanBreadcrumb(item)
            : this.getAnchorBreadcrumb(item),
        )}
      </nav>
    );
  }

  private getSpanBreadcrumb(item: IBreadcrumbItem) {
    return (
      <span class="breadcrumb-item active">
        {item.title}
      </span>
    );
  }

  private getAnchorBreadcrumb(item: IBreadcrumbItem) {
    return (
      <a class="breadcrumb-item" href={item.href} target={item.target}>
        {item.title}
      </a>
    );
  }
}
