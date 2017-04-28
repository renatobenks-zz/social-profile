import React, { Component } from 'react'
import { Breadcrumb, Icon } from 'semantic-ui-react'

class BreadcrumbRoute extends Component {
    constructor (props) {
        super(props);
        this.state = {
            route: props.default ? '/feed/status' : window.location.pathname
        };
    }

    componentWillMount () {
        let routes = [];
        this.state.route.split('/').map(route => {
            if (routes.includes(route)) return;
            routes.push(route)
        });

        this.setState({
            routes: routes.map(route => ({
                name: !route ? 'home' : route,
                path: '/'
            }))
        });
    }

    onDirectionLink (indexRoute) {
        window.location.href = this.state.routes[indexRoute].path;
    }

    render () {
        const { routes } = this.state;
        return (
            <Breadcrumb>
                {routes.map((route, index) => [
                    <Breadcrumb.Section
                        onClick={(e) => {
                            e.preventDefault();
                            return this.onDirectionLink(index)
                        }} link
                        >
                        <Icon name={route.name === 'status' ? 'browser' : route.name} />
                        {route.name}
                    </Breadcrumb.Section>,
                    <Breadcrumb.Divider content="/"/>
                ])}
            </Breadcrumb>
        );
    }
}

export default BreadcrumbRoute
