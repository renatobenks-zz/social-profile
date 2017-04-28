import React, { Component } from 'react'
import { Grid } from 'semantic-ui-react'

class Content extends Component {
    static Row = Grid.Row;
    static Column = Grid.Column;
    render () {
        return (
            <div className="App-content">
                <Grid {...this.props}>
                    {this.props.children}
                </Grid>
            </div>
        )
    }
}

export default Content
