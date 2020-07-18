import React from 'react';
import { StyleSheet, Dimensions, ScrollView } from 'react-native';
import { Block, theme } from 'galio-framework';
import Button from '../components/Button'
import { Card } from '../components';
import articles from '../constants/articles';
const { width } = Dimensions.get('screen');
import AttendanceBtn from './AttendanceBtn'

class Home extends React.Component {
  renderArticles = () => {
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.articles}>
        <Block flex>
          <AttendanceBtn screenName="Attendance" />
          <Card item={articles[0]} horizontal screenName="Home"/>
          <Block flex row>
            <Card item={articles[1]} style={{ marginRight: theme.SIZES.BASE }} screenName="Home"/>
            <Card item={articles[2]} screenName="Home"/>
          </Block>
          <Card item={articles[3]} horizontal screenName="Home"/>
          <Card item={articles[4]} full screenName="Home"/>
        </Block>
      </ScrollView>
    )
  }

  render() {
    // const navigation = useNavigation();
    return (

      <Block flex center style={styles.home}>
        {this.renderArticles()}
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  home: {
    width: width,
  },
  articles: {
    width: width - theme.SIZES.BASE * 2,
    paddingVertical: theme.SIZES.BASE,
  },
});

export default Home;
