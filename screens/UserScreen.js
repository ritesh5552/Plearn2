// screens/UserScreen.js

import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, AsyncStorage } from 'react-native';
import ProgressCircle from 'react-native-progress-circle'
import firebase from '../database/firebaseDb';

import { FlatGrid } from 'react-native-super-grid';
import {
  BallIndicator,
 
  
} from 'react-native-indicators';
import { ScrollView } from 'react-native-gesture-handler';
class UserScreen extends Component {

  constructor() {
    super();
    this.firestoreRef = firebase.firestore().collection('Category');
    this.state = {
      isLoading: true,
      score:'',
      cat:'',
      play: false,
      userArr: []
    };
   
    this.state = {
      bgColor: [
        'red',
        'blue',
        'yellow',
      ],
      selectedColor: '',
    };

   
  }

  componentDidMount() {
    this.unsubscribe = this.firestoreRef.onSnapshot(this.getCollection);
    this._getRandomColor();
    this.retrieveData();
  }

  componentWillUnmount(){
    this.unsubscribe();

  }
  _getRandomColor(){
    var item = this.state.bgColor[Math.floor(Math.random()*this.state.bgColor.length)];
    this.setState({
      selectedColor: item,
    })
  }
  getCollection = (querySnapshot) => {
    const userArr = [];
    querySnapshot.forEach((res) => {
      const { c_id, c_name } = res.data();
      userArr.push({
        key: res.id,
        res,
        c_id,
        c_name,
       
      });
    });
    this.setState({
      userArr,
      isLoading: false,
   });
  }

  retrieveData = async () => {
    try {
      const finalscore = await AsyncStorage.getItem('finalscore','');
      const category = await AsyncStorage.getItem('category','');
      if (finalscore !== undefined && finalscore !== null) {
        // We have data!!
        console.log("Final Score"+finalscore);
        this.setState({
          score:finalscore,
          cat: category,
          play: true,
       });
      }
      else{
        this.setState({
          score:'',
          cat: '',
          play: false,
       });
      }
     } catch (error) {
       // Error retrieving data
       this.setState({
        score:'',
        cat: '',
        play: false,
     });
     }
  }



  render() {
    
    if(this.state.isLoading){
      return(

        <View style={{ flex: 1, justifyContent: "center", alignItems: "center",backgroundColor:'#2196f3' }}>
      <BallIndicator color='#ffffff' />
    </View>
      
      )
    } 







    return (
      <ScrollView style={{ backgroundColor: '#484848',marginTop:20}}>
      <View style={styles.container2}>
         

          <View style={styles.itemContainer3}>
       
        
        <View style={{ margin: 20,flexDirection: 'column', justifyContent: 'center',
    alignItems: 'center'}}>
        <Text style={styles.itemCode2}>{'WelCome To Quizz App'}</Text>
          <Text style={styles.fullWidthButton3}>
          {'Discover new way to learn and practice MCQs for SSC, IBPS, Bank PO, Campus selection and other aptitude based exams. Ask questions and be sure for the answers.'} 
         </Text>
              
              </View>
              </View>
              <Text style={styles.fullWidthButton}>{'Last Score'}</Text>
          <View style={styles.itemContainer2}>
        <View style={styles.fullWidthButtonTextHeader}>
        <ProgressCircle
                    percent= {this.state.score+'0'} 
                    radius={50}
                    borderWidth={15}
                    color="#FFAB00"
                    shadowColor="#424242"
                    bgColor="#FFFFFF"
                >
                    <Text style={{ fontSize: 20,color:"#484848" }}> {this.state.score+'0%'} </Text>
                </ProgressCircle>
        </View>
        
        <View style={{ margin: 20,flexDirection: 'column', justifyContent: 'center',
    alignItems: 'center'}}>
        <Text style={styles.fullWidthButton2}>{'Score'}</Text>
          <Text style={styles.itemCode}>
          {this.state.score+'/10'} 
              </Text>
              <Text style={styles.fullWidthButton2}>{'Category'}</Text>
              <Text style={styles.itemCode}>
          {this.state.cat} 
              </Text>
              </View>
              </View>
       <Text style={styles.fullWidthButton}>{'All Categories'}</Text>
      <FlatGrid
        itemDimension={130}
        data={this.state.userArr}
        
        
        keyExtractor={(item, index) => index}

        style={styles.gridView}
        // staticDimension={300}
        // fixed
        spacing={3}
        renderItem={({ item,index }) => (
          <View style={[styles.itemContainer]}>
           
            <Text style={styles.itemCode}>{item.c_name}</Text>






                <View style={styles.container}>
      <TouchableOpacity    
      style={{
         height:40,
        
         flexDirection: 'row',
         justifyContent: 'center',
         alignItems: 'center',
         shadowColor: '#000',
         shadowOffset: { width: 0, height: 2 },
         shadowOpacity: 0.5,
         shadowRadius: 2,
         elevation: 2,

    color:'#ffffff',
    marginLeft:20,
    marginRight:20,
    backgroundColor:'#2196f3',
    borderRadius:20,
    borderWidth: 2,
    borderColor: '#fff',
        
                     
              }}


              onPress={() => {
                this.props.navigation.navigate('UserDetailScreen', {
                  userkey: item.c_id, uservalue: item.c_name,
                });
              }}
      >
          <Text
              
          >
              <Text style={styles.fullWidthButtonTextHeader}>{'Play'}</Text>
          </Text>
      </TouchableOpacity>
        </View>







          </View>
        )}
      />
   </View>
   </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  gridView: {
    
    backgroundColor:'#484848',
    flex: 1,
  },
  container: {  
    flex: 1,  
  
    justifyContent: 'center',  
},  

container2: {  
  flex: 1,  
  backgroundColor:'#484848',
  justifyContent: 'center',  
},  
buttonContainer: {  
    margin: 20 ,
  
    backgroundColor:'#0097A7',
},  
  itemContainer: {
    shadowColor: '#000',
         shadowOffset: { width: 0, height: 2 },
         shadowOpacity: 0.5,
         shadowRadius: 2,
         elevation: 2,
    borderRadius: 10,
    padding: 10,

margin:3,
backgroundColor:'#ffffff',
    height: 120,
  },

  itemContainer2: {
    shadowColor: '#000',
         shadowOffset: { width: 0, height: 2 },
         shadowOpacity: 0.5,
         shadowRadius: 2,
         elevation: 2,
    borderRadius: 10,
    padding: 10,
    flexDirection: 'row',
margin:3,
backgroundColor:'#ffffff',
    height: 120,
  },

  itemContainer3: {
    shadowColor: '#000',
         shadowOffset: { width: 0, height: 2 },
         shadowOpacity: 0.5,
         shadowRadius: 2,
         elevation: 2,
    borderRadius: 10,

    flexDirection: 'row',
margin:5,
backgroundColor:'#EF5350',
  
  },
  itemName: {
    fontSize: 20,
    color: '#fff',
    
    fontWeight: '600',
  },
  itemCode: {
    textAlign: 'center', // <-- the magic
    fontWeight: 'bold',
   
textAlignVertical: "center",
    fontSize: 15,
    color: '#212121',
  },
  itemCode2: {
    textAlign: 'center', // <-- the magic
    fontWeight: 'bold',
    marginBottom:20,
   
textAlignVertical: "center",
    fontSize: 25,
    color: '#ffffff',
  },
  fullWidthButtonHeader: {
    backgroundColor: '#263238',
    height:30,
    alignSelf: 'stretch',  shadowOpacity: 3,shadowRadius: 3,flexDirection: 'row',elevation: 2,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  fullWidthButtonTextHeader: {
    fontSize:14,
    color: 'white',
    marginRight:20,
    marginLeft:20,
    textAlign: 'center', // <-- the magic
    fontWeight: 'bold',
  
  },

  fullWidthButton: {
    fontSize:18,
    color: '#9E9E9E',
    margin:10,
    backgroundColor:'#484848',
    fontWeight: 'bold',
  },
  fullWidthButton2: {
    fontSize:15,
    color: '#2196f3',

    color: '#9E9E9E',
    fontWeight: 'bold',
  },
  fullWidthButton3: {
    fontSize:14,
    color: '#ffffff',

   
   
  }
});


export default UserScreen;