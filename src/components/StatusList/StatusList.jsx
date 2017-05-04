import React, { Component } from 'react'
import { Feed } from 'semantic-ui-react'

import { ENDPOINTS } from '../../constants'
import { FETCH_REQUEST } from '../../middlewares/callAPImiddleware'
import Status from '../Status/Status.jsx'
class StatusList extends Component {
    constructor (props) {
        super(props);
        this.state = {
            status: []
        };

        this._get = this._get.bind(this);
        this.updateStatusList = this.updateStatusList.bind(this);
        this.getFriendFromStatus = this.getFriendFromStatus.bind(this);
        this.getNewStatusToList = this.getNewStatusToList.bind(this);
    }

    static getEventDate (date) {
        let now = parseInt(new Date().getSeconds(), 10);
        date = parseInt(new Date(date - 1000).getSeconds(), 10); // add 1s
        return now - date;
    }

    static countTotalRowsList () {
        return FETCH_REQUEST(ENDPOINTS
            .get_endpoint(ENDPOINTS.STATUS))
                .then(data => data.totalRows);
    }

    static async getLastPageNumberList () {
        const { pageSize } = ENDPOINTS.STATUS.params;
        const totalRows = await StatusList.countTotalRowsList();
        return Math.ceil(totalRows/pageSize);
    }

    getNewStatusToList (data) {
        const { status } = this.state;
        const ids = status.map(status => status.id);
        return data.filter(status => {
            return !ids.includes(status.id);
        });
    }

    getFriendFromStatus (user) {
        const { users } = this.props;
        const friend = users.filter(friend => friend.id === Math.abs(user, 10));
        if (friend.length <= 0 || !user)
            return {user: 'Desconhecido', image: '/public/images/02.avatar.png'};
        return {...friend[0]}
    }

    async _get (ENDPOINT) {
        let date = Date.now();
        return await FETCH_REQUEST(ENDPOINTS.get_endpoint(ENDPOINT))
            .then(STATUS => ({
                ...STATUS,
                ...ENDPOINT.params,
                data: STATUS.data.map(item => {
                    date = date - 1000;
                    return {
                        ...item,
                        user: this.getFriendFromStatus(item.user),
                        date: String(StatusList.getEventDate(date)),
                        like: { value: 0, active: false }
                    };
                })
            }));
    }

    async updateStatusList (ENDPOINT) {
        return await this._get(ENDPOINT)
            .then(status => {
                const data = this.getNewStatusToList(status.data);
                if (data.length > 0)
                    this.setState({
                        ...status,
                        status: [...this.state.status, ...data]
                    });
                return [...data];
            });
    }

    async componentWillMount () {
        const { set_page_number, STATUS } = ENDPOINTS;
        const pages = await StatusList.getLastPageNumberList();
        for (let i = 0; i < 2; i++) {
            if (i >= pages) return;
            this.updateStatusList(set_page_number(STATUS, pages-i));
        }
    }

    componentDidMount () {
        const { set_page_number, STATUS } = ENDPOINTS;
        this.updatingStatusList = setInterval(async () => {
            this.updateStatusList(set_page_number(
                STATUS, await StatusList.getLastPageNumberList()
            ));
        }, 10000);
    }

    componentWillUnmount () {
        clearInterval(this.updatingStatusList);
    }

    render () {
        const { status } = this.state;
        return (
            <Feed>
                {status.map(status =>
                    <Status key={status.id} status={status} />
                )}
            </Feed>
        );
    }
}

export default StatusList
