import React, { Component } from 'react';
import {StyleSheet, View, Text, TextInput, Image, TouchableOpacity, Alert,
  Dimensions, WebView
} from 'react-native'; 
import {timeToFr} from '../../config';

// import Icon from 'react-native-vector-icons/FontAwesome'; 
import MdCom from 'react-native-vector-icons/MaterialCommunityIcons';
// import MdIcon from 'react-native-vector-icons/MaterialIcons'

import Moment from 'moment';

export default class Post extends Component{
  constructor(props) {
    super(props);

    this.state = {
      uId: '',
      imgHeight: 10,
      videoHeight: 301,
    }
  } 

  onShouldStartLoadWithRequest = (navigator) => {
    if (navigator.url.indexOf('embed') !== -1
    ) {
        return true;
    } else {
        // this.videoPlayer.stopLoading(); //Some reference to your WebView to make it stop loading that URL
        return false;
    }    
}

  matchYoutubeUrl=(url)=>{
    const p = /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
    if(url.match(p)) return url.match(p)[1];
    return false;
  }

  componentDidMount() {
    // IF POST IMAGE FROM ASSETS
    // const img = require('../assets/imgs/post.png');
    // let source = Image.resolveAssetSource(img);
    // const screenWidth = Dimensions.get('window').width;
    // const imageHeight = source.height / (source.width / (screenWidth-40));
    // this.setState({imgHeight: imageHeight});
 
    // IF post img url EXIST
    if(this.props.post.images.length==1 && this.props.post.images[0])
    Image.getSize(this.props.post.images[0].url, (width, height) => {
      const screenWidth = Dimensions.get('window').width
      this.setState({imgHeight: height / (width / (screenWidth-40))});
    })
  }
  
  YouTubeGetID=(url)=>{
    let ID = '';
    url = url.replace(/(>|<)/gi,'').split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
    if(url[2] !== undefined) {
      ID = url[2].split(/[^0-9a-z_\-]/i);
      return ID[0];
    }
    return url;
  }
  
  renderImg=(post)=>{
    try {
      return <Image source={require('../assets/imgs/profile.png')} style={styles.imgUser} />
    } catch (error) {
      return <Image source={require('../assets/imgs/user.png')} style={styles.imgUser} />
    }
  }

  renderName = (post)=>{
    if(post.author) return post.author.name;
  }


  render(){
    const { post } = this.props;
    let imageURLs = [];
    imageURLs = post.images.map((img) => ({
        URI:        img.url,
        thumbnail:  img.url,
        id:         img.url,
      })
    )

    return(
      <View style={styles.wrap}> 
        <View style={styles.wrapUser}>
          <TouchableOpacity style={styles.wrapImgUser}>
          { this.renderImg(post) }

          </TouchableOpacity> 
          
          <View style={styles.info}>
            <Text style={styles.name}>{this.renderName(post)}</Text>
            <Text style={styles.time} >{timeToFr(Moment(post.datetime).fromNow())}</Text>
          </View>
        </View> 

        <Text style={styles.Subtitle}> {post.title} </Text> 

        {/* {this.matchYoutubeUrl(post.content) && 
          <TouchableOpacity onPress={() => this.props.navigation.navigate('Play', {uId: this.YouTubeGetID(post.content)})}>
          <Image style={{width: "100%", height: 300}} source={{uri: "https://img.youtube.com/vi/"+this.YouTubeGetID(post.content)+"/0.jpg"}}/>
          </TouchableOpacity>
        }  */}

        {/* {post.images.length>1 && <ImageBrowser images={imageURLs} />} */}
{post.images.length==1 &&
<View>
{ post.images[0].article_id==5 &&
        <Image source={{uri:"http://137.74.197.248:8069/web/content/405"}}  style={{ width: '100%',
                height: 500}} 
        /> 
        }
        { post.images[0].article_id==4 &&
        <Image source={{uri:"http://137.74.197.248:8069/web/content/404"}}  style={{ width: '100%',
                height: 500}} 
        /> 
        }
     {post.images[0].article_id==3 &&
                <Image source={{uri:"http://137.74.197.248:8069/web/content/403"}}  style={{ width: '100%',
                        height: 500}} 
                      /> 
     }
        {post.images[0].article_id==2 &&
     <Image source={{uri:"http://137.74.197.248:8069/web/content/375"}}  style={{ width: '100%',
                                height: 500}} 
        /> }
       
          {/* <Image source={{uri: post.images[0].url}}  style={{ width: '100%',
            height: this.state.imgHeight}} 
          /> */}
     
        </View>}
        <Text style={styles.descPost}> {post.content} </Text> 


        {/* <Image source={require('../assets/imgs/post.png')}  style={{ width: '100%',
          height: this.state.imgHeight}} 
        /> */}

        {post.like_count>0 &&
        <View style={styles.wrapActions}> 
          {post.like_count>0 &&
          <TouchableOpacity style={styles.wrapIcon}>
            <Text>{post.like_count} commentaires</Text>
          </TouchableOpacity>
          }
        </View>
        }

        <View style={styles.wrapActions}>
          <TouchableOpacity  style={styles.wrapIcon}>
            <MdCom name={post.likes ? "thumb-up":"pencil"} size={25} color="#1b59a2" style={styles.actionIcon}/>
            <Text>commenter</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  wrap: {
    backgroundColor: '#fff',
    // minHeight: 200,
    borderWidth: 1,
    borderColor: '#1b59a2',
    
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 15,
    paddingLeft: 15,

    marginBottom: 10,
    marginRight: 8,
    marginLeft: 8,
    borderRadius: 3,
    
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 1,  
    elevation: 2
  },


  wrapUser: {
    flexDirection:'row',
    justifyContent: 'center',
    // alignItems: 'center',
    marginBottom: 15,
  },
  wrapImgUser: {
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#eadbe6', 
    overflow: 'hidden',
    width: 57, height: 57,
    marginRight: 5,
  },
  imgUser: {
    width: 55, height: 55,
  },
  info: {
    flex: 1,
    minHeight: 30,
  },
  name:{
    fontWeight: 'bold',
    color: '#626262',
    fontSize: 17
    
  },

  Subtitle:{
    fontWeight: 'bold',
    color: '#ef723a',
    fontSize: 16 ,
    marginBottom: 10
  },
  desc:{
    maxHeight: 18,
    overflow: 'hidden',
    fontSize: 12
  },
  time:{
    color: '#a2a2a2'
  },
  more: { paddingLeft: 5 },

  descPost: {
    marginBottom: 5
  },
  imgPost: {
    // flex: 1
    width: '100%',
    // height: 'auto'
  },
  wrapActions:{
    flexDirection:'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
  },
  wrapIcon:{
    paddingLeft: 8,
    width: 100,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  wrapIconCenter:{
    paddingLeft: 8,
    width: 100,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  wrapIconLast:{
    paddingLeft: 8,
    width: 100,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  actionIcon: { 
  //  color:"#fff",
    paddingRight: 5 },

  textSection: {
    width: '100%',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 9,
    borderWidth: 1,
    borderColor: 'gray',
    marginTop: 10
  },
  sendIcon: { padding: 5 },
  input: {
    flex: 1,
    paddingTop: 5,
    paddingLeft: 5,
    paddingBottom: 5,
    paddingRight: 0,
    backgroundColor: '#fff',
    color: '#424242',
    borderRadius: 9
  },

  cmtWrap:{
    backgroundColor: "#f2f3f5",
    padding: 5,
    marginTop: 15, 
    borderRadius: 3
  },
  comment:{
    flexDirection:'row',
    justifyContent: 'center',
  },
  cmtText:{
    padding: 5,
    fontSize: 15
  }
});