import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {
  Router,
  Route,
  IndexRoute,
  Link,
  hashHistory
}
from 'react-router'
import {
  Tabs,
  Tab
}
from 'material-ui/Tabs';
import {
  Card,
  CardHeader,
  CardText
}
from 'material-ui/Card';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import AppBar from 'material-ui/AppBar';
import FontIcon from 'material-ui/FontIcon';
import MapsPersonPin from 'material-ui/svg-icons/maps/person-pin';
import injectTapEventPlugin from 'react-tap-event-plugin';
import 'normalize.css';
import data from '../data.json';
import io from 'socket.io-client';
import {blue500, red500, greenA200} from 'material-ui/styles/colors';


injectTapEventPlugin();

const styles = {
  title: {
    textAlign: 'center',
  },
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  gridList: {
    display: 'flex',
    flexWrap: 'nowrap',
    flexDirection: 'row',
    overflowX: 'auto',
  },
  gridTitle: {
    textDecoration: 'underline'
  },
  gridItem: {
    padding: '0 3em'
  },
  titleStyle: {
    color: 'rgb(0, 188, 212)',
  },
};

class App extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      text:"",
      textReceived:"",
      connected:false
    }
    this.handleTextChange = this.handleTextChange.bind(this);
    this.chat = this.chat.bind(this);

    //register socket connection
    this.socket = io("http://remote-keyboard-itechdom.c9users.io:8082");
  }

  componentDidMount(){
    //listen in on change
    this.socket.on('init',(msg)=>{
      console.log("connected to the server:",msg);
      this.setState({connected:true});
    })
    this.socket.on('chat',(msg)=>{
      this.setState({textReceived:msg});
    })
  }

  chat(){
    this.socket.emit('chat',this.state.text)
  }

  handleTextChange(event,newVal){
    this.setState({text:newVal})
  }

  render() {
    return (
      <MuiThemeProvider>
      <div>
        <AppBar
          style={{textAlign:"center"}}
          title={<span style={styles.title}>Remote Keyboard</span>}
        />
        <FontIcon
          className="material-icons"
          color={this.state.connected?greenA200:red500}
          >
          cast_connected
        </FontIcon>
        <div style={{display:'flex',flex:1,flexDirection:'column',justifyContent:'center'}}>
          <TextField
          hintText="Enter your message"
          fullWidth={true}
          onChange={this.handleTextChange}
          />
          <RaisedButton label="Submit" primary={true} onClick={this.chat} />
          <Paper zDepth={4}>
            <p>{this.state.textReceived}</p>
          </Paper>
        </div>
      </div>
      </MuiThemeProvider>
    );
  }
  componentWillReceiveProps() {

  }

};

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
