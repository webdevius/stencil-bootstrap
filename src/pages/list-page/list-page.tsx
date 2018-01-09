import { Component, State, Listen } from '@stencil/core';


@Component({
    tag: 'list-page',
    styleUrls: [
        'list-page.scss'
    ]
})
export class ListPage {

    @State() users: any[] = []

    @Listen('onBottomReach')
    customEventHandler(event) {
        this.initUsersData()
    }

    componentWillLoad() {
        this.initUsersData()
    }


    gettemplate() {
        return (
            <scb-alert type="primary">
                This is a [item.name] alert  with <a href="#[index]" class="alert-link">an example [item.complex.name]</a>.
                    Index of the component: [index]. And data2 is
            </scb-alert>
        )
    }

    getUserTemplate() {
        return (

            <div class="card col-md-6 col-sm-12" >
                <div class="card-body">
                    <div class="media">
                        <img class="d-flex mr-3 rounded" src="[[user.picture.medium]]" alt="Generic placeholder image" />
                        <div class="media-body">
                            <h5 class="mt-0 capitalized">[[user.name.first]] [[user.name.last]]</h5>

                            <div>
                                <span class="capitalized">
                                    [[user.location.city]], [[user.location.state]],
                                </span>
                                <span> [[user.location.street]] </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    initUsersData() {
        this.getUsers().then(
            users => this.users = this.users.concat(users)
        )
    }

    getUsersPage(): number {
        return this.users.length / 10 + 1
    }

    getUsers() {

        return new Promise((resolve, reject) => {

            let request = new XMLHttpRequest();
            let count = this.users.length == 0
                ? 20
                : 10

            request.open('GET', `https://randomuser.me/api/?page=${this.getUsersPage()}&results=${count}&seed=abc`, true);
            request.onload = () => {
                if (request.status >= 200 && request.status < 400) {
                    let data = JSON.parse(request.responseText);
                    let users = data.results
                    resolve(users)
                } else {
                    resolve(false)
                    console.error("Users endpoint can't be reached. Status: ", request.status)

                }
            };

            request.onerror = () => console.error("Users endpoint can't be reached.")

            request.send();
        })
    }



    render() {
        return (

            <div class="container">

                <h3>Infinite list of users with data from <a href="randomuser.me">randomuser.me</a>: </h3>
                <br />
                <div class="row">

                    <scb-list
                        items={this.users}
                        itemAs='user'
                        template={this.getUserTemplate()}
                        bindToList={false}
                        wrapperClass='row'
                        addClass='custom'
                        addClassEven='custom-even'
                        addClassFirst='custom-first'>

                    </scb-list>
                </div>
            </div>
        )
    }
}