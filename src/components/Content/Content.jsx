import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react'

class Content extends Component {
    render () {
        const { children } = this.props;
        return (
            <div className="App-content">
                <Grid>
                    <Grid.Row>
                        {!Array.isArray(children) ? children : children
                            .map(content => {
                                if (children.length <= 3) {
                                    const index = children
                                        .indexOf(content);
                                    const width = index % 2 === 0 ? 4 : 8;
                                    return (
                                        <Grid.Column
                                            key={content.key}
                                            width={width}
                                            >
                                            {content}
                                        </Grid.Column>
                                    )
                                } else {
                                    return ''
                                }
                            })
                        }
                    </Grid.Row>
                </Grid>
            </div>
        )
    }
}

export default Content
