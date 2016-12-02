/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    ActivityIndicator,
    Image,
} from 'react-native';
// 动态数据
var REQUEST_URL = 'https://raw.githubusercontent.com/facebook/react-native/master/docs/MoviesExample.json';
export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            movies: null,
        };
    }
    // 当组件加载完成，开始请求数据
    componentDidMount() {
        this.fetchData();
    }
    // 请求数据的功能
    fetchData() {
        fetch(REQUEST_URL)
            .then((response) => response.json())
            .then((responseData) => {
                this.setState({
                    movies: responseData.movies,
                });
            })
            .done();
    }
    // 数据还没到，处于加载阶段
    load() {
        return (
            <View  style={styles.container}>
                <ActivityIndicator style={ {height: 80}} size="large"/>
            </View>
        )
    }
    // 数据到了，重新渲染视图; 且将数据放入标签内
    renderMovie(movie) {
        return (
            <View style={styles.container}>
                <Image
                    source={{uri: movie.posters.thumbnail}}
                    style={{width: 100, height: 100}}
                />
                <View style={styles.rightContainer}>
                    <Text style={styles.title}>{movie.title}</Text>
                    <Text style={styles.year}>{movie.year}</Text>
                </View>
            </View>
        );
    }
    render() {
        // 判断是否有数据
        if(!this.state.movies) {
            return this.load();
        }
        var movie = this.state.movies[0];
        return this.renderMovie(movie);

    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },

});

AppRegistry.registerComponent('App', () => App);
