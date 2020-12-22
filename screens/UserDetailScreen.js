import React, { Component } from 'react';
import { AsyncStorage, Alert, Button, StyleSheet, TextInput, ScrollView,TouchableOpacity, ActivityIndicator, View, Text } from 'react-native';
import firebase from '../database/firebaseDb';
import Toast from 'react-native-toast-message';
import { ConfirmDialog  } from 'react-native-simple-dialogs';
import ProgressCircle from 'react-native-progress-circle';
import AwesomeAlert from 'react-native-awesome-alerts';
import {
  BallIndicator,
  BarIndicator,
  
} from 'react-native-indicators';
class UserDetailScreen extends Component {

  constructor() {
    super();
   
    this.state = {
      isLoading: true,
      size: 10,
      totalCount: 10,
      rightAnswer:0,
      activeQuestionIndex: 0,
      randomquestion: 0,
      rd: 0,
      buttonColor: '#ffffff',
      nextquestionflag:true,
      update:false,
      selectedButton: null,
      color1: '#2196f3',
      color2: '#2196f3',
    quit:false,
      userArr: []
    };
  }
  
  componentDidMount() {
    this.firestoreRef = firebase.firestore().collection('Maindata').where('Car_Id', '==', this.props.route.params.userkey);
    this.unsubscribe = this.firestoreRef.onSnapshot(this.getCollection);

  }

  componentWillUnmount(){
    this.unsubscribe();
  }

  getCollection = (querySnapshot) => {
    const userArr = [];

    querySnapshot.forEach((res) => {
      const { Car_Id, Question, OpA, OpB, OpC, OpD} = res.data();
      userArr.push({
        key: res.id,
        res,
        Car_Id,
        Question,
        OpA,
        OpB,
        OpC,
        OpD,
       
      });
    });
   


 this.setState({
      userArr,
      size:userArr.length-1,
      nextquestionflag:true,
      isLoading: false,
   });

   var RandomQuestiong = Math.floor(Math.random() * this.state.size) + 1 ;
   this.setState({ randomquestion: RandomQuestiong }); 
   var RandomNumber = Math.floor(Math.random() * 4) + 1 ;
   this.setState({ rd: RandomNumber }); 
   console.log( this.state.size);

  }


  
  nextQuestion = () => {
    this.setState(state => {
      const nextIndex = state.activeQuestionIndex + 1;
      if (nextIndex >= state.totalCount) {
        Alert.alert('Quiz Over!')  
        setTimeout(() => {
          this.props.navigation.navigate('UserScreen');
          }, 1000);
      }

      return {
        activeQuestionIndex: nextIndex,
       
      };
    });
  };

//testing

_onItemPress2(myId,Op) {
  console.log( this.state.randomquestion);
  setTimeout(() => {
  
    this.setState({ isLoading: true }); 
    this.setState({ nextquestionflag: false }); 
    }, 4000);
  
  this.setState({ update: true }); 
  this.setState({ selectedButton: Op });
  if(this.state.userArr[this.state.randomquestion].OpA === myId)
  {
    this.setState({ buttonColor: '#009688' }); 
    Toast.show({
      type: 'success',
      position: 'bottom',
      text1: 'You Are Right 👋',
      text2: 'You selected right answer :'+this.state.userArr[this.state.randomquestion].OpA,
      visibilityTime: 3000,
      autoHide: true,
      topOffset: 50,
      bottomOffset: 50,
      onShow: () => {},
      onHide: () => {}
    })
    this.setState({ color1: '#009688' });
    this.setState({ color2: '#424242' });
    this.setState({
      rightAnswer: this.state.rightAnswer + 1,
   });
  }
  else{
    this.setState({ buttonColor: '#ef5350' }); 
    this.setState({ color2: '#424242' });
    this.setState({ color1: '#EF5350' });
    Toast.show({
      type: 'error',
      position: 'bottom',
      text1: 'Wrong Answer 😞',
      text2: 'Right answer is :'+this.state.userArr[this.state.randomquestion].OpA,
      visibilityTime: 3000,
      autoHide: true,
      topOffset: 50,
      bottomOffset: 50,
      onShow: () => {},
      onHide: () => {}
    })
  }
   



  setTimeout(() => {
    this.setState({ buttonColor: '#FFFFFF' }); 
    this.setState({ selectedButton: 'Op' });
    this.setState({ color2: '#2196f3' });
    this.setState({ color1: '#2196f3' });
    this.setState({ nextquestionflag: true }); 
    var RandomQuestiong = Math.floor(Math.random() * this.state.size) + 1 ;
    this.setState({ randomquestion: RandomQuestiong }); 
    var RandomNumber = Math.floor(Math.random() * 4) + 1 ;
    this.setState({ rd: RandomNumber }); 

    this.setState({ isLoading: false }); 
    this.setState(state => {
      const nextIndex = state.activeQuestionIndex + 1;
      if (nextIndex >= state.totalCount) {
  this.storeData();
      

        this.props.navigation.navigate('ScoreCard', {
          userkey: this.state.rightAnswer
        });

        

       

      }

      return {

        
        activeQuestionIndex: nextIndex,
       
      };
    });

    }, 5000);


}

  
setDialog() {

  this.setState({

    quit: true,
 });

}



storeData = async () => {
  const asyncStorageKeys = await AsyncStorage.getAllKeys();
  if (asyncStorageKeys.length > 0) {
    if (Platform.OS === 'android') {
      await AsyncStorage.clear();
    }
    if (Platform.OS === 'web') {
      await AsyncStorage.clear();
    }
    if (Platform.OS === 'ios') {
      await AsyncStorage.multiRemove(asyncStorageKeys);
    }
  }
  try {
    await AsyncStorage.setItem('finalscore', ''+this.state.rightAnswer);
    await AsyncStorage.setItem('category', ''+this.props.route.params.uservalue);
  } catch (error) {
    // Error saving data
  }
}
  
hideAlert = () => {
  this.setState({
    quit: false
  });
};
  render() {
  
    
      var acbc = this.state.activeQuestionIndex + 1 ;
    
      if(this.state.quit){
        return(
  
    
   
          <AwesomeAlert
          backdrop= 'transparent'
            show={this.state.quit}
            showProgress={false}
            title="Quit?"
            message="Are You Sure Want To Quit!"
            closeOnTouchOutside={false}
            closeOnHardwareBackPress={false}
            showCancelButton={true}
            showConfirmButton={true}
            cancelText="No"
            confirmText="Yes"
            cancelButtonColor="#009688"
            confirmButtonColor="#DD6B55"
            onCancelPressed={() => {
              this.hideAlert();
            }}
            onConfirmPressed={() => {
              this.hideAlert();
              this.props.navigation.navigate('UserScreen')
            }}
          />
      
        
        )
      }  

    if(this.state.isLoading){
      return(

        <View style={{ flex: 1, justifyContent: "center", alignItems: "center",backgroundColor:'#212121' }}>
      <BarIndicator color='#ffffff' />
    </View>
      
      )
    }    
    if(this.state.nextquestionflag){
       
      if (this.state.rd == '1') {
        return (
          <ScrollView contentContainerStyle={{ marginTop:20, backgroundColor: '#484848', flexGrow: 1, justifyContent: 'center' }} >
          <View style={styles.fullWidthButtonTextHeader}>
<ProgressCircle
            percent= {acbc+'0'} 
            radius={40}
            borderWidth={15}
            color="#2196f3"
            shadowColor="#ffffff"
            bgColor="#484848"
        >
            <Text style={{ fontSize: 14,color:"#ffffff" }}> {' Q\n'+acbc+'/10'} </Text>
        </ProgressCircle>
</View>
    
    
    
          <View style={styles.container}>
            <Text style={styles.buttonContainer}>
            {this.state.userArr[this.state.randomquestion].Question} 
            </Text>
            <View style={styles.container}>
            <TouchableOpacity    
            style={{
               height:70,
               margin: 10,  shadowOpacity: 3,shadowRadius: 3,flexDirection: 'row',elevation: 2,
               flexDirection: 'row',
               justifyContent: 'center',
               alignItems: 'center',
                        backgroundColor:
                            this.state.selectedButton === "A"
                                ? this.state.color1
                                : this.state.color2
                    }}


                onPress={() => this._onItemPress2(this.state.userArr[this.state.randomquestion].OpA,"A")}
            >
                <Text
                    style={{
                        backgroundColor:
                            this.state.selectedButton === "A"
                                ? this.state.color1
                                : this.state.color2
                    }}
                >
                    <Text style={styles.fullWidthButtonText}>{this.state.userArr[this.state.randomquestion].OpA}</Text>
                </Text>
            </TouchableOpacity>

            <TouchableOpacity  style={{
               height:70,
               margin: 10,  shadowOpacity: 3,shadowRadius: 3,flexDirection: 'row',elevation: 2,
               flexDirection: 'row',
               justifyContent: 'center',
               alignItems: 'center',
                        backgroundColor:
                            this.state.selectedButton === "B"
                                ? this.state.color1
                                : this.state.color2
                    }}
              onPress={() => this._onItemPress2(this.state.userArr[this.state.randomquestion].OpB,"B")}
            >
                <Text
                    style={{
                        backgroundColor:
                            this.state.selectedButton === "B"
                            ? this.state.color1
                            : this.state.color2
                    }}
                >
                   <Text style={styles.fullWidthButtonText}>{this.state.userArr[this.state.randomquestion].OpB}</Text>
                </Text>
            </TouchableOpacity>

            <TouchableOpacity  style={{
               height:70,
               margin: 10,  shadowOpacity: 3,shadowRadius: 3,flexDirection: 'row',elevation: 2,
               flexDirection: 'row',
               justifyContent: 'center',
               alignItems: 'center',
                        backgroundColor:
                            this.state.selectedButton === "C"
                                ? this.state.color1
                                : this.state.color2
                    }}
                onPress={() => this._onItemPress2(this.state.userArr[this.state.randomquestion].OpC,"C")}
            >
                <Text
                    style={{
                        backgroundColor:
                            this.state.selectedButton === "C"
                            ? this.state.color1
                            : this.state.color2
                    }}
                >
                     <Text style={styles.fullWidthButtonText}>{this.state.userArr[this.state.randomquestion].OpC}</Text>
                </Text>
            </TouchableOpacity>
            <TouchableOpacity  style={{
               height:70,
               margin: 10,  shadowOpacity: 3,shadowRadius: 3,flexDirection: 'row',elevation: 2,
               flexDirection: 'row',
               justifyContent: 'center',
               alignItems: 'center',
                        backgroundColor:
                            this.state.selectedButton === "D"
                                ? this.state.color1
                                : this.state.color2
                    }}
                onPress={() => this._onItemPress2(this.state.userArr[this.state.randomquestion].OpD,"D")}
            >
                <Text
                    style={{
                        backgroundColor:
                            this.state.selectedButton === "D"
                            ? this.state.color1
                            : this.state.color2
                    }}
                >
                     <Text style={styles.fullWidthButtonText}>{this.state.userArr[this.state.randomquestion].OpD}</Text>
                </Text>
            </TouchableOpacity>
        </View>
        <TouchableOpacity    
      style={{
        height:50,
       
        marginRight:120,marginLeft:120,
         flexDirection: 'row',
         justifyContent: 'center',
         alignItems: 'center',
         shadowColor: '#000',
         shadowOffset: { width: 0, height: 2 },
         shadowOpacity: 0.5,
         shadowRadius: 2,
         elevation: 2,
marginBottom:20,

color:'#ffffff',

    backgroundColor:'#EC407A',
    borderRadius:20,
    borderWidth: 2,
    borderColor: '#fff',
        
                     
              }}


              onPress={() => { this.setDialog()
              }}
      >
          <Text
              
          >
              <Text style={styles.fullWidthButtonTextHeader2}>{'Quit'}</Text>
          </Text>
      </TouchableOpacity>

        </View>
          </ScrollView>
        );
      } else  if (this.state.rd == '2') {
        return (
          <ScrollView contentContainerStyle={{ marginTop:20, backgroundColor: '#484848', flexGrow: 1, justifyContent: 'center' }} >
                            <View style={styles.fullWidthButtonTextHeader}>
                           
<ProgressCircle
            percent= {acbc+'0'} 
            radius={40}
            borderWidth={15}
            color="#2196f3"
            shadowColor="#ffffff"
            bgColor="#484848"
        >
            <Text style={{ fontSize: 14,color:"#ffffff" }}> {' Q\n'+acbc+'/10'} </Text>
        </ProgressCircle>
</View>
    
            
            
                  <View style={styles.container}>
                    <Text style={styles.buttonContainer}>
                    {this.state.userArr[this.state.randomquestion].Question} 
                    </Text>
                    <View style={styles.container}>
                    <TouchableOpacity   style={{
               height:70,
               margin: 10,  shadowOpacity: 3,shadowRadius: 3,flexDirection: 'row',elevation: 2,
               flexDirection: 'row',
               justifyContent: 'center',
               alignItems: 'center',
                        backgroundColor:
                            this.state.selectedButton === "A"
                                ? this.state.color1
                                : this.state.color2
                    }}
                        onPress={() => this._onItemPress2(this.state.userArr[this.state.randomquestion].OpB,"A")}
                    >
                        <Text
                            style={{
                                backgroundColor:
                                    this.state.selectedButton === "A"
                                        ? this.state.color1
                                        : this.state.color2
                            }}
                        >
                            <Text style={styles.fullWidthButtonText}>{this.state.userArr[this.state.randomquestion].OpB}</Text>
                        </Text>
                    </TouchableOpacity>
        
                    <TouchableOpacity  style={{
               height:70,
               margin: 10,  shadowOpacity: 3,shadowRadius: 3,flexDirection: 'row',elevation: 2,
               flexDirection: 'row',
               justifyContent: 'center',
               alignItems: 'center',
                        backgroundColor:
                            this.state.selectedButton === "B"
                                ? this.state.color1
                                : this.state.color2
                    }}
                      onPress={() => this._onItemPress2(this.state.userArr[this.state.randomquestion].OpA,"B")}
                    >
                        <Text
                            style={{
                                backgroundColor:
                                    this.state.selectedButton === "B"
                                    ? this.state.color1
                                    : this.state.color2
                            }}
                        >
                           <Text style={styles.fullWidthButtonText}>{this.state.userArr[this.state.randomquestion].OpA}</Text>
                        </Text>
                    </TouchableOpacity>
        
                    <TouchableOpacity  style={{
               height:70,
               margin: 10,  shadowOpacity: 3,shadowRadius: 3,flexDirection: 'row',elevation: 2,
               flexDirection: 'row',
               justifyContent: 'center',
               alignItems: 'center',
                        backgroundColor:
                            this.state.selectedButton === "C"
                                ? this.state.color1
                                : this.state.color2
                    }}
                        onPress={() => this._onItemPress2(this.state.userArr[this.state.randomquestion].OpC,"C")}
                    >
                        <Text
                            style={{
                                backgroundColor:
                                    this.state.selectedButton === "C"
                                    ? this.state.color1
                                    : this.state.color2
                            }}
                        >
                             <Text style={styles.fullWidthButtonText}>{this.state.userArr[this.state.randomquestion].OpC}</Text>
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity  style={{
               height:70,
               margin: 10,  shadowOpacity: 3,shadowRadius: 3,flexDirection: 'row',elevation: 2,
               flexDirection: 'row',
               justifyContent: 'center',
               alignItems: 'center',
                        backgroundColor:
                            this.state.selectedButton === "D"
                                ? this.state.color1
                                : this.state.color2
                    }}
                        onPress={() => this._onItemPress2(this.state.userArr[this.state.randomquestion].OpD,"D")}
                    >
                        <Text
                            style={{
                                backgroundColor:
                                    this.state.selectedButton === "D"
                                    ? this.state.color1
                                    : this.state.color2
                            }}
                        >
                             <Text style={styles.fullWidthButtonText}>{this.state.userArr[this.state.randomquestion].OpD}</Text>
                        </Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity    
      style={{
        height:50,
       
        marginRight:120,marginLeft:120,
         flexDirection: 'row',
         justifyContent: 'center',
         alignItems: 'center',
         shadowColor: '#000',
         shadowOffset: { width: 0, height: 2 },
         shadowOpacity: 0.5,
         shadowRadius: 2,
         elevation: 2,
marginBottom:20,

color:'#ffffff',

    backgroundColor:'#EC407A',
    borderRadius:20,
    borderWidth: 2,
    borderColor: '#fff',
        
                     
              }}


              onPress={() => { this.setDialog()
              }}
      >
          <Text
              
          >
              <Text style={styles.fullWidthButtonTextHeader2}>{'Quit'}</Text>
          </Text>
      </TouchableOpacity>
                </View>
                  </ScrollView>
        );
      } 
      else  if (this.state.rd == '3') {
        return (
          <ScrollView contentContainerStyle={{ marginTop:20, backgroundColor: '#484848', flexGrow: 1, justifyContent: 'center' }} >
                       <View style={styles.fullWidthButtonTextHeader}>
                  
<ProgressCircle
            percent= {acbc+'0'} 
            radius={40}
            borderWidth={15}
            color="#2196f3"
            shadowColor="#ffffff"
            bgColor="#484848"
        >
            <Text style={{ fontSize: 14,color:"#ffffff" }}> {' Q\n'+acbc+'/10'} </Text>
        </ProgressCircle>
</View>
    
            
            
                  <View style={styles.container}>
                    <Text style={styles.buttonContainer}>
                    {this.state.userArr[this.state.randomquestion].Question} 
                    </Text>
                    <View style={styles.container}>
                    <TouchableOpacity  style={{
               height:70,
               margin: 10,  shadowOpacity: 3,shadowRadius: 3,flexDirection: 'row',elevation: 2,
               flexDirection: 'row',
               justifyContent: 'center',
               alignItems: 'center',
                        backgroundColor:
                            this.state.selectedButton === "A"
                                ? this.state.color1
                                : this.state.color2
                    }}
                        onPress={() => this._onItemPress2(this.state.userArr[this.state.randomquestion].OpC,"A")}
                    >
                        <Text
                            style={{
                                backgroundColor:
                                    this.state.selectedButton === "A"
                                        ? this.state.color1
                                        : this.state.color2
                            }}
                        >
                            <Text style={styles.fullWidthButtonText}>{this.state.userArr[this.state.randomquestion].OpC}</Text>
                        </Text>
                    </TouchableOpacity>
        
                    <TouchableOpacity  style={{
               height:70,
               margin: 10,  shadowOpacity: 3,shadowRadius: 3,flexDirection: 'row',elevation: 2,
               flexDirection: 'row',
               justifyContent: 'center',
               alignItems: 'center',
                        backgroundColor:
                            this.state.selectedButton === "B"
                                ? this.state.color1
                                : this.state.color2
                    }}
                      onPress={() => this._onItemPress2(this.state.userArr[this.state.randomquestion].OpB,"B")}
                    >
                        <Text
                            style={{
                                backgroundColor:
                                    this.state.selectedButton === "B"
                                    ? this.state.color1
                                    : this.state.color2
                            }}
                        >
                           <Text style={styles.fullWidthButtonText}>{this.state.userArr[this.state.randomquestion].OpB}</Text>
                        </Text>
                    </TouchableOpacity>
        
                    <TouchableOpacity style={{
               height:70,
               margin: 10,  shadowOpacity: 3,shadowRadius: 3,flexDirection: 'row',elevation: 2,
               flexDirection: 'row',
               justifyContent: 'center',
               alignItems: 'center',
                        backgroundColor:
                            this.state.selectedButton === "C"
                                ? this.state.color1
                                : this.state.color2
                    }}
                        onPress={() => this._onItemPress2(this.state.userArr[this.state.randomquestion].OpA,"C")}
                    >
                        <Text
                            style={{
                                backgroundColor:
                                    this.state.selectedButton === "C"
                                    ? this.state.color1
                                    : this.state.color2
                            }}
                        >
                             <Text style={styles.fullWidthButtonText}>{this.state.userArr[this.state.randomquestion].OpA}</Text>
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity  style={{
               height:70,
               margin: 10,  shadowOpacity: 3,shadowRadius: 3,flexDirection: 'row',elevation: 2,
               flexDirection: 'row',
               justifyContent: 'center',
               alignItems: 'center',
                        backgroundColor:
                            this.state.selectedButton === "D"
                                ? this.state.color1
                                : this.state.color2
                    }}
                        onPress={() => this._onItemPress2(this.state.userArr[this.state.randomquestion].OpD,"D")}
                    >
                        <Text
                            style={{
                                backgroundColor:
                                    this.state.selectedButton === "D"
                                    ? this.state.color1
                                    : this.state.color2
                            }}
                        >
                             <Text style={styles.fullWidthButtonText}>{this.state.userArr[this.state.randomquestion].OpD}</Text>
                        </Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity    
      style={{
        height:50,
       
        marginRight:120,marginLeft:120,
         flexDirection: 'row',
         justifyContent: 'center',
         alignItems: 'center',
         shadowColor: '#000',
         shadowOffset: { width: 0, height: 2 },
         shadowOpacity: 0.5,
         shadowRadius: 2,
         elevation: 2,
marginBottom:20,

color:'#ffffff',

    backgroundColor:'#EC407A',
    borderRadius:20,
    borderWidth: 2,
    borderColor: '#fff',
        
                     
              }}


              onPress={() => { this.setDialog()
              }}
      >
          <Text
              
          >
              <Text style={styles.fullWidthButtonTextHeader2}>{'Quit'}</Text>
          </Text>
      </TouchableOpacity>

                </View>
                  </ScrollView>
        );
      } 
      else  {
        return (
          <ScrollView contentContainerStyle={{ marginTop:20, backgroundColor: '#484848', flexGrow: 1, justifyContent: 'center' }} >
                       <View style={styles.fullWidthButtonTextHeader}>
                     
<ProgressCircle
            percent= {acbc+'0'} 
            radius={40}
            borderWidth={15}
            color="#2196f3"
            shadowColor="#ffffff"
            bgColor="#484848"
        >
            <Text style={{ fontSize: 14,color:"#ffffff" }}> {' Q\n'+acbc+'/10'} </Text>
        </ProgressCircle>
</View>
    
            
            
                  <View style={styles.container}>
                    <Text style={styles.buttonContainer}>
                    {this.state.userArr[this.state.randomquestion].Question} 
                    </Text>
                    <View style={styles.container}>
                    <TouchableOpacity   style={{
               height:70,
               margin: 10,  shadowOpacity: 3,shadowRadius: 3,flexDirection: 'row',elevation: 2,
               flexDirection: 'row',
               justifyContent: 'center',
               alignItems: 'center',
                        backgroundColor:
                            this.state.selectedButton === "A"
                                ? this.state.color1
                                : this.state.color2
                    }}
                        onPress={() => this._onItemPress2(this.state.userArr[this.state.randomquestion].OpD,"A")}
                    >
                        <Text
                            style={{
                                backgroundColor:
                                    this.state.selectedButton === "A"
                                        ? this.state.color1
                                        : this.state.color2
                            }}
                        >
                            <Text style={styles.fullWidthButtonText}>{this.state.userArr[this.state.randomquestion].OpD}</Text>
                        </Text>
                    </TouchableOpacity>
        
                    <TouchableOpacity  style={{
               height:70,
               margin: 10,  shadowOpacity: 3,shadowRadius: 3,flexDirection: 'row',elevation: 2,
               flexDirection: 'row',
               justifyContent: 'center',
               alignItems: 'center',
                        backgroundColor:
                            this.state.selectedButton === "B"
                                ? this.state.color1
                                : this.state.color2
                    }}
                      onPress={() => this._onItemPress2(this.state.userArr[this.state.randomquestion].OpB,"B")}
                    >
                        <Text
                            style={{
                                backgroundColor:
                                    this.state.selectedButton === "B"
                                    ? this.state.color1
                                    : this.state.color2
                            }}
                        >
                           <Text style={styles.fullWidthButtonText}>{this.state.userArr[this.state.randomquestion].OpB}</Text>
                        </Text>
                    </TouchableOpacity>
        
                    <TouchableOpacity  style={{
               height:70,
               margin: 10,  shadowOpacity: 3,shadowRadius: 3,flexDirection: 'row',elevation: 2,
               flexDirection: 'row',
               justifyContent: 'center',
               alignItems: 'center',
                        backgroundColor:
                            this.state.selectedButton === "C"
                                ? this.state.color1
                                : this.state.color2
                    }}
                        onPress={() => this._onItemPress2(this.state.userArr[this.state.randomquestion].OpC,"C")}
                    >
                        <Text
                            style={{
                                backgroundColor:
                                    this.state.selectedButton === "C"
                                    ? this.state.color1
                                    : this.state.color2
                            }}
                        >
                             <Text style={styles.fullWidthButtonText}>{this.state.userArr[this.state.randomquestion].OpC}</Text>
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity  style={{
               height:70,
               margin: 10,  shadowOpacity: 3,shadowRadius: 3,flexDirection: 'row',elevation: 2,
               flexDirection: 'row',
               justifyContent: 'center',
               alignItems: 'center',
                        backgroundColor:
                            this.state.selectedButton === "D"
                                ? this.state.color1
                                : this.state.color2
                    }}
                        onPress={() => this._onItemPress2(this.state.userArr[this.state.randomquestion].OpA,"D")}
                    >
                        <Text
                            style={{
                                backgroundColor:
                                    this.state.selectedButton === "D"
                                    ? this.state.color1
                                    : this.state.color2
                            }}
                        >
                             <Text style={styles.fullWidthButtonText}>{this.state.userArr[this.state.randomquestion].OpA}</Text>
                        </Text>
                    </TouchableOpacity>
                </View>


               
                <TouchableOpacity    
      style={{
        height:50,
       
        marginRight:120,marginLeft:120,
         flexDirection: 'row',
         justifyContent: 'center',
         alignItems: 'center',
         shadowColor: '#000',
         shadowOffset: { width: 0, height: 2 },
         shadowOpacity: 0.5,
         shadowRadius: 2,
         elevation: 2,
marginBottom:20,

color:'#ffffff',

    backgroundColor:'#EC407A',
    borderRadius:20,
    borderWidth: 2,
    borderColor: '#fff',
        
                     
              }}


              onPress={() => { this.setDialog()
              }}
      >
          <Text
              
          >
              <Text style={styles.fullWidthButtonTextHeader2}>{'Quit'}</Text>
          </Text>
      </TouchableOpacity>


                </View>




                  </ScrollView>
        );
      } 
    }    

    
    return(
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {this.state.isLoading && <ActivityIndicator color={"#fff"} />}
    </View>
    )
  
  

    }






    




  }



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#484848',
    alignItems: 'stretch',


  },

buttonContainer: {  
  marginVertical: 10,
  textAlign: 'center', // <-- the magic
    fontWeight: 'bold',
    fontSize: 18,
  marginHorizontal: 20,
color:'white',

  flex: 1,



  justifyContent: 'center',
  alignItems: 'center', 

},  
btnSize:{
  width:"100%"
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
} ,
text: {
  alignSelf: 'stretch',flex: 1,color:'#ffffff', width: "100%",height: 80, shadowColor: 'rgba(0,0,0, .4)',shadowOffset: { height: 1, width: 1 }, margin: 10,  shadowOpacity: 5,shadowRadius: 5,flexDirection: 'row',elevation: 5, backgroundColor: "#2196f3", alignItems: 'center', justifyContent: 'center',

  
},
inputsContainer: {
  flex: 1
},
fullWidthButton: {
  backgroundColor: '#2196f3',
  height:70,
  margin: 10,  shadowOpacity: 3,shadowRadius: 3,flexDirection: 'row',elevation: 2,
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center'
},
fullWidthButtonText: {
  fontSize:24,
  color: 'white'
},
fullWidthButtonHeader: {
  backgroundColor: '#212121',
  height:40,
  alignSelf: 'stretch',  shadowOpacity: 3,shadowRadius: 3,flexDirection: 'row',elevation: 2,
  flexDirection: 'row',
  justifyContent: 'center',
  borderColor: '#fff',
  alignItems: 'center'
},
fullWidthButtonTextHeader: {
  fontSize:24,
 marginTop:20,
  flex: 1,
  textAlign: 'center',
  justifyContent: 'center',
  alignItems: 'stretch',
  flexDirection: 'row',
  color: '#484848'
},
fullWidthButtonTextHeader2: {
  fontSize:20,

  flex: 1,

  textAlign: 'center',
  justifyContent: 'center',
  alignItems: 'stretch',
  flexDirection: 'row',
  color: '#ffffff'
},
acontainer: {
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#fff',
},
abutton: {
  margin: 10,
  paddingHorizontal: 10,
  paddingVertical: 7,
  borderRadius: 5,
  backgroundColor: "#AEDEF4",
},
atext: {
  color: '#fff',
  fontSize: 15
}
});

  
export default UserDetailScreen;