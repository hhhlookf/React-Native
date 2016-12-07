import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    Animated,
    TouchableHighlight,
    Easing,
    ScrollView,
    RefreshControl
} from 'react-native';

class Row extends Component {
    render() {
        return (
            <View style={styles.row}>
                <Text style={styles.text}>
                    {this.props.data.text}
                </Text>
            </View>
        );
    }
}
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isRefreshing: false,
            loaded: 0,
            rowData: Array.from(new Array(3)).map(
                (val, i) => ({text: '初始行 ' + i})),
        }
    }
    onRefresh() {
        this.setState({isRefreshing: true});
        setTimeout(() => {
            // 准备下拉刷新的5条数据
            const rowData = Array.from(new Array(5))
                .map((val, i) => ({
                    text: '刷新行 ' + (+this.state.loaded + i)
                }))
                .concat(this.state.rowData);

            this.setState({
                loaded: this.state.loaded + 5,
                isRefreshing: false,
                rowData: rowData,
            });
        }, 2000);
    }
    render() {
        const rows = this.state.rowData.map((row, ii) => {
            return <Row key={ii} data={row}/>;
        });
        return (
            <ScrollView
                style={styles.scrollview}
                refreshControl={
                    <RefreshControl
                        refreshing={this.state.isRefreshing}
                        onRefresh={this.onRefresh.bind(this)}
                        colors={['#ff0000', '#00ff00', '#0000ff','#3ad564']}
                        progressBackgroundColor="#ffffff"
                    />
                }>
                {rows}
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    row: {
        borderColor: 'red',
        borderWidth: 5,
        padding: 20,
        backgroundColor: '#3a5795',
        margin: 5,
    },
    text: {
        alignSelf: 'center',
        color: '#fff',
    },
    scrollview: {
        flex: 1,
    },
});

AppRegistry.registerComponent('App', () => App);