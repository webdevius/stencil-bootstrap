import { Component } from '@stencil/core';

@Component({
  tag: 'stencil-bootstrap-demo',
})
export class StencilBootstrapDemo {
  render() {
    return (
      <div class="container">
        <div class="row">
          <div class="col-sm text-center">
            <h1>
              Web Components for Bootstrap 4
            </h1>

            <p>
              Built with <a href="https://stenciljs.com" target="blank">Stencil</a> &lt;3
            </p>
          </div>
        </div>

        <div class="row">
          <div class="col-md-3 push-md-9">
            <ul>
              <li>
                <stencil-route-link
                  url="/alerts"
                  urlMatch={['/', '/alerts']}
                  activeClass="active"
                  exact={true}
                >
                  Alerts
                </stencil-route-link>
              </li>
            </ul>
          </div>

          <div class="col-md-9 pull-md-3">
            <stencil-router id="router">
              <stencil-route
                url={['/', '/alerts']}
                component="alerts-page"
                exact={true}
              >
              </stencil-route>
            </stencil-router>
          </div>
        </div>
      </div>
    );
  }
}
