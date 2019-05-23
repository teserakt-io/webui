import * as React from 'react'
import Layout from "../components/layouts/Layout";
// import TopicsTableProvider from '../components/TopicsTable/TopicsTableProvider'

class Topics extends React.Component<{}> {
    render() {
        return (
            <Layout>
                <React.Fragment>
                    <h1>Topics</h1>
                    {/*<TopicsTableProvider/>*/}
                </React.Fragment>
            </Layout>
        )
    }
}

export default Topics
