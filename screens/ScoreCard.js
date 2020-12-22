import React, { Component } from 'react';
import {  Button, StyleSheet, TouchableOpacity, ScrollView, Image, View, Text } from 'react-native';
import ProgressCircle from 'react-native-progress-circle'



class ScoreCard extends Component {

  constructor() {
    super();
    this.state = {
    
      sub:0,
    
    };
   
  }
  
  componentDidMount() {
    
    this.setState({
     sub:10-this.props.route.params.userkey,
   });
  }



  render() {

   


      return (
        <ScrollView contentContainerStyle={{   flexGrow: 1, justifyContent: 'center' }} >


<View style={styles.container}>
<View style={styles.fullWidthButtonTextHeader}>
<ProgressCircle
            percent= {this.props.route.params.userkey+'0'} 
            radius={100}
            borderWidth={50}
            color="#FFAB00"
            shadowColor="#ffffff"
            bgColor="#484848"
        >
            <Text style={{ fontSize: 40,color:"#ffffff" }}> {this.props.route.params.userkey+'0%'} </Text>
        </ProgressCircle>
</View>


  <Text style={styles.fullWidthButtonTextHeader2}>
  {'Right - '+this.props.route.params.userkey+'     Wrong - '+this.state.sub} 
      </Text>
      <Text style={styles.fullWidthButtonTextHeader}>
  {this.props.route.params.userkey+'/10'} 
      </Text>
      <View style={styles.container}>
      <TouchableOpacity    
      style={{
         height:70,
         marginTop: 30,  shadowOpacity: 3,shadowRadius: 3,flexDirection: 'row',elevation: 2,
         flexDirection: 'row',
         justifyContent: 'center',
         alignItems: 'center',
         marginTop:10,
    paddingTop:15,
    paddingBottom:15,
    marginLeft:30,
    marginRight:30,
    backgroundColor:'#2196f3',
    borderRadius:30,
    borderWidth: 1,
    borderColor: '#fff',
                
                     
              }}


              onPress={() => { 
                this.props.navigation.reset({
                  index: 0,
                  routes: [{ name: 'UserScreen' }],
                });
             }}
      >
          <Text
              
          >
              <Text style={styles.loginText}>{'Home'}</Text>
          </Text>
      </TouchableOpacity>
    
        </View>


  
        </View>

        </ScrollView>
      );
  
    } 



  
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#484848',
    alignItems: 'stretch',
    paddingTop:20,
    marginTop:20,

  },
  buttonContainer2: {  
    marginVertical: 10,
    textAlign: 'center', // <-- the magic
     
      fontSize: 20,
    marginHorizontal: 20,
  
  
    flex: 1,
  
    color: 'white',
  
    justifyContent: 'center',
    alignItems: 'center', 
  
  },  
  SubmitButtonStyle: {
 
    marginTop:10,
    paddingTop:15,
    paddingBottom:15,
    marginLeft:30,
    marginRight:30,
    backgroundColor:'#ef5350',
    borderRadius:10,
    borderWidth: 1,
    borderColor: '#fff'
  },
buttonContainer: {  
  marginVertical: 10,
  textAlign: 'center', // <-- the magic
    fontWeight: 'bold',
    fontSize: 40,
  marginHorizontal: 20,


  color: 'white',



  justifyContent: 'center',
  alignItems: 'center', 

},  
btnSize:{
  width:"100%"
},
backgroundImage: {
  flex: 1,
  width: null,
  height: null,
  },
multiButtonContainer: {  
    margin: 20,  
    backgroundColor:'#1E6738',
    flexDirection: 'row',  
    justifyContent: 'space-between'  
}  ,
loginScreenButton:{
  marginRight:40,
  marginLeft:40,
 marginTop:10,
  paddingTop:10,
  paddingBottom:10,
  backgroundColor:'#455a64',
  borderRadius:10,
  borderWidth: 1,
  borderColor: '#fff'
},
loginText:{
    color:'#ffffff',
    alignSelf: 'stretch',
    textAlign:'center',
    paddingLeft : 10,
    fontSize:25,
    paddingRight : 10
},
container2: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  
  backgroundColor: '#F5FCFF',
},
welcome: {
  fontSize: 20,
  textAlign: 'center',
  margin: 10,
},
// Flex to fill, position absolute, 
// Fixed left/top, and the width set to the window width
overlay: {
  flex: 1,
  position: 'absolute',
  left: 0,
  top: 0,
  opacity: 0.5,
  backgroundColor: 'black',
  width: 300
},
fullWidthButtonHeader: {
  backgroundColor: '#263238',
  height:40,
  marginTop:40,
  alignSelf: 'stretch',  shadowOpacity: 3,shadowRadius: 3,flexDirection: 'row',elevation: 2,
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center'
},
fullWidthButtonTextHeader: {
  fontSize:100,
  flex: 1,
  textAlign: 'center',
  justifyContent: 'center',
  alignItems: 'stretch',
  flexDirection: 'row',
  color: 'white'
},

fullWidthButtonTextHeader2: {
  fontSize:20,
  flex: 1,
  textAlign: 'center',
  justifyContent: 'center',
  alignItems: 'stretch',
  flexDirection: 'row',
  color: 'white'
}
});

  
export default ScoreCard;