import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';
import _ from 'lodash';

import YOUTUBE_API_KEY from './keys'
import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';

const API_KEY = YOUTUBE_API_KEY;

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      videos: [],
      selectedVideo: null
    }; //searchBar results

    this.videoSearch('surfboards');
  }

  videoSearch(term) {
    YTSearch({key: API_KEY, term: term}, (videos) => {
      this.setState({
        videos: videos,
        selectedVideo: videos[0]
      });
      //this will get resolved as this.setState(videos: videos) use when key and prop are same
    });
  }
  render() {
    //using debounce to call new search term every 300ms
    const videoSearch = _.debounce((term) => {this.videoSearch(term)}, 300);
    return(
      <div>
        <SearchBar onSearchTermChanged={videoSearch}/>
        <VideoDetail video={this.state.selectedVideo}/>
        <VideoList
          onVideoSelect={selectedVideo => this.setState({selectedVideo})}
          videos={this.state.videos}/>
      </div>
    );
  }
}

// Put this Component in the DOM(on the page)
ReactDOM.render(<App />, document.querySelector('.container'));
