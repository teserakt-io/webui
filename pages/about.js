import * as React from 'react';

class About extends React.Component<{}> {
    render() {
        return (
            <React.Fragment>
                <h1>About</h1>
                <p>
                    This application is a demonstration version of the web
                    console of <a href="https://teserakt.io/#e4">E4</a>,
                    Teserakt's IoT data protection solution.
                </p>
                <div>

                    E4 consists of the:
                    <ul>
                        <li>
                            <b>E4 client library</b>, available on <a
                                href="https://github.com/teserakt-io">our GitHub</a> under the APLv2 license.
                        </li>
                        <li>
                            <b>Command-and-control (C2) server</b>, offered
                            under commercial terms including maintenance and
                            support.
                        </li>
                    </ul>
                    Detailed information about E4 is available on our <a
                        href="https://e4.teserakt.io">documentation
                    site</a>.
                </div>
                <p>
                    For all enquiries, please contact us at <a
                        href="mailto:contact@teserakt.io">contact@teserakt.io</a>.
                </p>
                <h2>Using the console</h2>
                <p>
                    You can create an MQTT client supporting E4 by
                    following the instructions in our <a
                        href="https://github.com/teserakt-io/e4go"> client software repository</a>.
    The client must use the broker mqtt.demo.teserakt.io:1883, and
                    must subscribe to its control topic (<code>e4/devicename</code>).
                </p>
                <p>
                    After registering your client in the console ("Add
                    Client" button) you can use the console to assign
                    topic keys to your device and to define key
                    rotation policies.
                </p>
                <h2>Disclaimer</h2>
                <p>
                    This demonstration application is open to anyone
                    without identification or authentication.
                    We provide no availability guarantees nor privacy
                    guarantees (all the content entered in the
                    application will be visible to other users).
                    Teserakt is not liable for any loss or damage
                    related to the usage of the application.
                    Teserakt is not liable for any content which may be
                    considered offensive.
                </p>
            </React.Fragment>
        )
    }
}

export default About
