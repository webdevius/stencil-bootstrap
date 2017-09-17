import { Component } from '@stencil/core';

@Component({
  tag: 'alerts-page',
})
export class AlertsPage {
  render() {
    return (
      <scb-alert>
        <strong>Hello World</strong>
      </scb-alert>
    );
  }
}
