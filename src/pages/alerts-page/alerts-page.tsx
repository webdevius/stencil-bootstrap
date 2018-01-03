import { Component, State } from '@stencil/core';
import { BootstrapThemeColor } from '../../common/bootstrap-theme-color.type';

@Component({
  tag: 'alerts-page',
})
export class AlertsPage {
  @State() hasAnimatableDismissibleAlert = true;
  @State() hasDismissibleAlert = true;

  alertTypes: BootstrapThemeColor[] = [
    'primary',
    'secondary',
    'success',
    'danger',
    'warning',
    'info',
    'light',
    'dark',
  ];

  onAnimatableAlertDismiss() {
    this.hasAnimatableDismissibleAlert = false;
  }

  onAlertDismiss() {
    this.hasDismissibleAlert = false;
  }

  render() {
    return [
      this.alertTypes.map(type =>
        <scb-alert type={type}>
          This is a {type} alert-check it out!
        </scb-alert>,
      ),

      <div>
        <h2>Content Projection</h2>
        <h4>Link Color</h4>
        <scb-alert type="primary">
          This is a primary alert with <a href="#" class="alert-link">an example link</a>.
          Give it a click if you like.
        </scb-alert>

        <h4>More Content</h4>
        <scb-alert type="success">
          <h4 class="alert-heading">Well done!</h4>
          <p>
            Aww yeah, you successfully read this important alert message.
            This example text is going to run a bit longer so that you can
            see how spacing within an alert works with this kind of content.
          </p>
          <hr />
          <p class="mb-0">
            Whenever you need to, be sure to use margin utilities to keep things nice and tidy.
          </p>
        </scb-alert>
      </div>,

      <div id="dismissible-alert-container">
        <h2>Dismissable Alerts</h2>
        <h4>With fade transition</h4>
        {this.hasAnimatableDismissibleAlert
          ? this.getDismissibleAlert(true)
          : this.getCreateAlertButton(true)
        }
        <h4>Without fade transition</h4>
        {this.hasDismissibleAlert
          ? this.getDismissibleAlert(false)
          : this.getCreateAlertButton(false)
        }
      </div>,
    ];
  }

  private getDismissibleAlert(animatable: boolean) {
    const onDismiss = () =>
      animatable
        ? this.onAnimatableAlertDismiss()
        : this.onAlertDismiss();

    return (
      <scb-alert type="warning"
        dismissible
        onDismiss={onDismiss.bind(this)}
        animatable={animatable}
      >
        <strong>Holy guacamole!</strong> You should check in on some of those fields below.
      </scb-alert>
    );
  }

  private getCreateAlertButton(animatable: boolean) {
    const onClick = () =>
      animatable
        ? (this.hasAnimatableDismissibleAlert = true)
        : (this.hasDismissibleAlert = true);
    return (
      <button class="btn btn-link"
        onClick={onClick.bind(this)}
      >
        Show {animatable && 'Animatable '} Dismissible Alert
      </button>
    );
  }
}
