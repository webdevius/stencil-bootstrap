import {
  Component,
  Element,
  HostElement,
  Prop,
  PropWillChange,
  State,
  Method,
} from '@stencil/core';
import { BootstrapThemeColor } from './../../common/index';

@Component({
  tag: 'scb-alert',
})
export class ScbAlert {
  @Element() el: HostElement;

  @Prop() type: BootstrapThemeColor = 'info';
  @Prop() dismissible = false;
  @Prop() animatable = true;
  @Prop() onDismiss: (hostEl: HostElement) => void;

  @State() show: boolean;
  @State() fade: boolean;

  @Method()
  dismiss() {
    if (!this.dismissible) {
      return console.warn('This alert is not dismissible!', this.el);
    }

    if (!this.onDismiss) {
      return console.warn('No onDismiss callback for this alert.', this.el);
    }

    if (!this.animatable) {
      return this.onDismiss(this.el);
    }

    this.show = false;
    setTimeout(() => {
      this.onDismiss(this.el);
    },         150); // TODO Replace with configurable value?
  }

  @PropWillChange('animatable')
  componentWillLoad() {
    this.setShowFadeState();
  }

  render() {
    return (
      <div class={{
        alert: true,
        [`alert-${this.type}`]: true,
        'alert-dismissible': this.dismissible,
        show: this.animatable && this.show,
        fade: this.animatable && this.fade,
      }} role="alert">
        {this.getDismissButton()}
        <slot />
      </div>
    );
  }

  private setShowFadeState() {
    if (this.animatable) {
      this.show = true;
      this.fade = true;
    }
  }

  private getDismissButton() {
    if (!this.dismissible) return null;

    return (
      <button type="button"
        class="close"
        aria-label="Close"
        onClick={this.dismiss.bind(this)}
      >
        <span aria-hidden="true">&times;</span>
      </button>
    );
  }
}
