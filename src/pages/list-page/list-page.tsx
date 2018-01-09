import { Component, State, Listen } from '@stencil/core';


@Component({
    tag: 'list-page',
    styleUrls: [
        'list-page.scss'
    ]
})
export class ListPage {

    @State() users1: any[] = []
    @State() users2: any[] = []

    @Listen('onBottomReach')
    customEventHandler(event) {

        if (event.detail == 'users-infinite') {
            this.initUsers1Data()
        }

        if (event.detail == 'users-boxed') {
            this.initUsers2Data()
        }

    }

    componentWillLoad() {
        this.initUsers1Data(20)
        this.initUsers2Data(20)
    }




    initUsers1Data(count?: number) {
        this.getUsers(count).then(
            users => this.users1 = this.users1.concat(users)
        )
    }
    initUsers2Data(count?: number) {
        this.getUsers(count).then(
            users =>
                this.users2 = this.users2.concat(users)

        )
    }

    getUser2Template() {
        return (
            <div class="card card-18" >
                <img class="card-img-top" src="[[user.picture.large]]" alt="Card image cap" />
                <div class="card-body">
                    <h5 class="card-title capitalized">[[user.name.first]] [[user.name.last]]</h5>
                    <a href="#" class="btn btn-primary">Send message</a>
                </div>
            </div>
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

    getUsersPage(): number {
        return (this.users1.length + this.users2.length) / 10 + 1
    }

    getUsers(count = 10) {

        return new Promise((resolve, reject) => {

            let request = new XMLHttpRequest();
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

                <h2>Infinite list component</h2>
                {/* <h3 class="mt-4">API and usage</h3>

                <p>Basic usage: </p>
                <pre>
                    <code>
                        <scb-list id="users-boxed"
                            items={this.users2}
                            itemAs='user'
                            template={this.getUser2Template()}
                            bindToList={true}
                            wrapperClass='row d-flex justify-content-around mx-0'
                            addClass='my-3'> </scb-list>
                    </code>
                </pre>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius voluptatum ullam qui explicabo vero. Sequi iusto adipisci, accusantium id aut ex, odio eius, consequuntur explicabo sapiente molestiae fugiat ipsa reprehenderit.</p> */}


                <h3 class="mt-5">Boxed list of users with random data: </h3> <br />
                {/* <div class='container'> */}

                <scb-list id="users-boxed"
                    items={this.users2}
                    itemAs='user'
                    template={this.getUser2Template()}
                    bindToList={true}
                    wrapperClass='row d-flex justify-content-around mx-0'
                    addClass='my-3'> </scb-list>
                {/* </div> */}
                <br /><br />

                <h3>Infinite list of users with data from <a href="randomuser.me">randomuser.me</a>: </h3>
                <br />
                <div >

                    <scb-list id="users-infinite"
                        items={this.users1}
                        itemAs='user'
                        template={this.getUserTemplate()}
                        bindToList={false}
                        wrapperClass='row'
                        addClass='custom mxy-2'
                        addClassEven='custom-even'
                        addClassFirst='custom-first'>

                    </scb-list>
                </div>
            </div>
        )
    }
}