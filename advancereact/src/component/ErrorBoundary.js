import React from 'react';
class GlobalErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hasError: false,
            error: '',
            info: '',
        };
    }
    componentDidCatch(error, info) {
        if (error) {
            this.setState({
                hasError: true,
                error,
                info,
            });

            console.log({ error, info });
        }
    }

    render() {
        const { hasError, error, info } = this.state;
        if (hasError) {
            return <h1>Something Went wrong</h1>;
        }
        return this.props.children;
    }
}

export default GlobalErrorBoundary;
