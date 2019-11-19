import * as React from 'react';
import TopicsTableProvider from '../components/TopicsTable/TopicsTableProvider';

class Topics extends React.Component<{}> {
    render() {
        return (
            <React.Fragment>
                <h1>Topics</h1>
                <TopicsTableProvider />
            </React.Fragment>
        )
    }
}

export default Topics
