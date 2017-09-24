import { Component } from '@stencil/core';

@Component({
  tag: 'badge-page',
})
export class BadgePage {
  badgeTypes = [
    'primary',
    'secondary',
    'success',
    'danger',
    'warning',
    'info',
    'light',
    'dark',
  ];
  render() {
    return [
      <div>
        <h1>
          Example Heading <scb-badge>New</scb-badge>
        </h1>
        <h2>
          Example Heading <scb-badge>New</scb-badge>
        </h2>
        <h3>
          Example Heading <scb-badge>New</scb-badge>
        </h3>
        <h4>
          Example Heading <scb-badge>New</scb-badge>
        </h4>
        <h5>
          Example Heading <scb-badge>New</scb-badge>
        </h5>
        <h6>
          Example Heading <scb-badge>New</scb-badge>
        </h6>
      </div>,

      <button class="btn">
        Notifications <scb-badge>4</scb-badge>
      </button>,

      <div>
        <h1>Contextual Variations</h1>
        {this.badgeTypes.map(type =>
          [
            <scb-badge type={type}>
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </scb-badge>,
            ' ',
          ],
        )}
      </div>,

      <div>
        <h1>Pill Badges</h1>
        {this.badgeTypes.map(type =>
          [
            <scb-badge type={type} pill>
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </scb-badge>,
            ' ',
          ],
        )}
      </div>,

      <div>
        <h1>Links</h1>
        {this.badgeTypes.map(type =>
          [
            <scb-badge type={type} link="#">
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </scb-badge>,
            ' ',
          ],
        )}
      </div>,
    ];
  }
}
