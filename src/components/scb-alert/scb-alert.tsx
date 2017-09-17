import { Component } from '@stencil/core';

@Component({
  tag: 'scb-alert',
})
export class ScbAlert {
  render() {
    return (
      <div class="alert alert-success" role="alert">
        <slot />
      </div>
    );
  }
}
