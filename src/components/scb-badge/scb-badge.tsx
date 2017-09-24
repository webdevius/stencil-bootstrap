import { Component, Prop } from '@stencil/core';
import { BootstrapThemeColor } from './../../common/index';

@Component({
  tag: 'scb-badge',
})
export class ScbBadge {
  @Prop() type: BootstrapThemeColor = 'secondary';
  @Prop() pill = false;
  @Prop() link: string;

  render() {
    return this.link
      ? <a class={this.getClassList()} href={this.link}>
          <slot />
        </a>
      : <span class={this.getClassList()}>
          <slot />
        </span>;
  }

  private getClassList() {
    return {
      badge: true,
      [`badge-${this.type}`]: true,
      'badge-pill': this.pill,
    };
  }
}
